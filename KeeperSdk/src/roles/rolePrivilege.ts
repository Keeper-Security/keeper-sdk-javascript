import {
    encryptKey,
    generateEncryptionKey,
    managedNodePrivilegeAddCommand,
    managedNodePrivilegeRemoveCommand,
    platform,
    type Auth,
    type ManagedNodeMspKey,
    type ManagedNodePrivilegeAddRequest,
    type ManagedNodeRoleKey,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseRoleUserLink,
    type EnterpriseUser,
} from '../teams/enterpriseData'
import { applyDecryptedNodeNames, applyEnterpriseNameToRoot, resolveParentNode } from '../teams/teamUtils'
import {
    applyDecryptedRoleNames,
    assertCommandSucceeded,
    nodePathOrFallback,
    normalizeIdentifiers,
    resolveExistingRoles,
} from './roleUtils'
import {
    buildRoleKeysFromProvidedPublicKeys,
    encryptForUserPublicKey,
    fetchUserPublicKeys,
    getMissingRoleKeyMap,
} from './roleCrypto'

/**
 * API: transfer_account requires role key material (RSA fields deprecated for EC migration but
 * still required for Commander/bridge). manage_companies uses msp_keys, not role keys.
 */
const TRANSFER_ACCOUNT = 'transfer_account'
const MANAGE_COMPANIES = 'manage_companies'

const ROLE_PRIVILEGE_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Nodes,
    EnterpriseDataInclude.Roles,
    EnterpriseDataInclude.ManagedNodes,
    EnterpriseDataInclude.Users,
    EnterpriseDataInclude.RoleUsers,
]

const ROLE_PRIVILEGE_TABLE_HEADERS = ['#', 'Status', 'Action', 'Privilege', 'Detail']

export enum RolePrivilegeStatus {
    Added = 'added',
    Removed = 'removed',
    Skipped = 'skipped',
    Failed = 'failed',
}

export type ChangeRolePrivilegesInput = {
    role: string
    node: string | number
    add?: string[]
    remove?: string[]
    /** Required by API when adding manage_companies. */
    mspKeys?: ManagedNodeMspKey[]
}

export type RolePrivilegeItemResult = {
    privilege: string
    action: 'add' | 'remove'
    status: RolePrivilegeStatus
    message?: string
}

export type ChangeRolePrivilegesResult = {
    success: boolean
    roleId: number
    roleName: string
    nodeId: number
    nodeName: string
    items: RolePrivilegeItemResult[]
    succeeded: number
    skipped: number
    failed: number
}

export type FormattedRolePrivilegeTable = {
    headers: string[]
    rows: string[][]
    parentLabel: string
    summary: string
}

type RoleKeyMaterial = {
    roleKey: Uint8Array
    role_key_enc_with_tree_key: string
    role_public_key: string
    role_private_key: string
    role_keys?: ManagedNodeRoleKey[]
}

async function buildRoleKeyMaterial(
    auth: Auth,
    treeKey: Uint8Array,
    roleKey: Uint8Array,
    roleUserLinks: EnterpriseRoleUserLink[],
    usersById: Map<number, EnterpriseUser>,
    roleId: number
): Promise<RoleKeyMaterial> {
    const roleKeyEncWithTreeKey = await encryptKey(roleKey, treeKey)
    const { privateKey, publicKey } = await platform.generateRSAKeyPair()
    const rolePrivateKey = await encryptKey(privateKey, roleKey)

    const memberIds = roleUserLinks.filter((link) => link.role_id === roleId).map((link) => link.enterprise_user_id)
    const emails = memberIds.map((id) => usersById.get(id)?.username).filter((email): email is string => !!email)
    const publicKeyMap = await fetchUserPublicKeys(auth, emails)

    const roleKeys: ManagedNodeRoleKey[] = []
    for (const userId of memberIds) {
        const user = usersById.get(userId)
        if (!user?.username) continue
        const publicKeys = publicKeyMap.get(user.username.toLowerCase())
        if (!publicKeys) continue
        const encrypted = await encryptForUserPublicKey(roleKey, publicKeys)
        if (!encrypted) continue
        roleKeys.push({
            enterprise_user_id: userId,
            role_key: encrypted.ciphertext,
            tree_key_type: encrypted.keyType,
        })
    }

    return {
        roleKey,
        role_key_enc_with_tree_key: roleKeyEncWithTreeKey,
        role_public_key: platform.bytesToBase64(publicKey),
        role_private_key: rolePrivateKey,
        role_keys: roleKeys.length > 0 ? roleKeys : undefined,
    }
}

async function addTransferAccountPrivilege(
    auth: Auth,
    payload: ManagedNodePrivilegeAddRequest,
    roleKeyMaterial: RoleKeyMaterial
): Promise<void> {
    Object.assign(payload, {
        role_key_enc_with_tree_key: roleKeyMaterial.role_key_enc_with_tree_key,
        role_public_key: roleKeyMaterial.role_public_key,
        role_private_key: roleKeyMaterial.role_private_key,
        role_keys: roleKeyMaterial.role_keys,
    })

    try {
        const addResponse = await auth.executeRestCommand(managedNodePrivilegeAddCommand(payload))
        assertCommandSucceeded(
            addResponse,
            `managed_node_privilege_add failed for privilege=${TRANSFER_ACCOUNT}`,
            ResultCodes.ROLE_PRIVILEGE_ADD_FAILED
        )
    } catch (err) {
        const missing = getMissingRoleKeyMap(err)
        if (!missing) throw err
        // API: encrypt role_key for missing admins and resend.
        const extraKeys = buildRoleKeysFromProvidedPublicKeys(roleKeyMaterial.roleKey, missing)
        payload.role_keys = [...(payload.role_keys || []), ...extraKeys]
        const retryResponse = await auth.executeRestCommand(managedNodePrivilegeAddCommand(payload))
        assertCommandSucceeded(
            retryResponse,
            `managed_node_privilege_add retry failed for privilege=${TRANSFER_ACCOUNT}`,
            ResultCodes.ROLE_PRIVILEGE_ADD_FAILED
        )
    }
}

export async function changeRolePrivileges(
    auth: Auth,
    input: ChangeRolePrivilegesInput
): Promise<ChangeRolePrivilegesResult> {
    const roleIdentifiers = normalizeIdentifiers([input.role])
    if (roleIdentifiers.length === 0) {
        throw new KeeperSdkError('A role is required.', ResultCodes.ROLE_REQUIRED)
    }
    if (input.node === undefined || input.node === null || input.node === '') {
        throw new KeeperSdkError('A managed node is required.', ResultCodes.NO_NODES_FOR_ROLE_OP)
    }

    const addPrivileges = normalizeIdentifiers(input.add ?? []).map((p) => p.toLowerCase())
    const removePrivileges = normalizeIdentifiers(input.remove ?? []).map((p) => p.toLowerCase())
    if (addPrivileges.length === 0 && removePrivileges.length === 0) {
        throw new KeeperSdkError('No privileges specified. Use add and/or remove.', ResultCodes.NO_PRIVILEGES_SPECIFIED)
    }

    if (addPrivileges.includes(MANAGE_COMPANIES) && (!input.mspKeys || input.mspKeys.length === 0)) {
        throw new KeeperSdkError(
            'manage_companies requires mspKeys (mc_enterprise_id + tree_key per managed company).',
            ResultCodes.NO_PRIVILEGES_SPECIFIED
        )
    }

    const enterpriseData = new EnterpriseDataManager(auth)
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData(ROLE_PRIVILEGE_INCLUDES),
        enterpriseData.getDisplayNames(),
    ])

    const nodes = response.nodes || []
    applyDecryptedNodeNames(nodes, displayNames.nodes)
    applyEnterpriseNameToRoot(nodes, response.enterprise_name)
    await enterpriseData.decryptNodeNames(nodes)

    const roles = response.roles || []
    applyDecryptedRoleNames(roles, displayNames.roles)
    const resolvedRoles = resolveExistingRoles(roles, roleIdentifiers)
    const role = resolvedRoles[0]
    const roleName = (role.displayName || '').trim() || String(role.role_id)

    const node = resolveParentNode(nodes, input.node)
    const nodeName = nodePathOrFallback(nodes, node)

    const managedNodeLink = (response.managed_nodes || []).find(
        (link) => link.role_id === role.role_id && link.managed_node_id === node.node_id
    )
    if (!managedNodeLink) {
        throw new KeeperSdkError(
            `Role "${roleName}" does not manage node "${nodeName}". Add the role to the node first.`,
            ResultCodes.MANAGED_NODE_NOT_MANAGED_BY_ROLE
        )
    }

    const needsTransferKeys = addPrivileges.includes(TRANSFER_ACCOUNT)
    let roleKeyMaterial: RoleKeyMaterial | null = null
    if (needsTransferKeys) {
        const treeKey = await enterpriseData.getTreeKey()
        if (!treeKey) {
            throw new KeeperSdkError(
                'Enterprise tree key is unavailable; cannot grant transfer_account.',
                ResultCodes.ENTERPRISE_TREE_KEY_UNAVAILABLE
            )
        }
        const roleKey = (await enterpriseData.getRoleKey(role.role_id)) ?? generateEncryptionKey()
        const usersById = new Map<number, EnterpriseUser>()
        for (const user of response.users || []) usersById.set(user.enterprise_user_id, user)
        roleKeyMaterial = await buildRoleKeyMaterial(
            auth,
            treeKey,
            roleKey,
            response.role_users || [],
            usersById,
            role.role_id
        )
    }

    const items: RolePrivilegeItemResult[] = []

    for (const privilege of removePrivileges) {
        try {
            const removeResponse = await auth.executeRestCommand(
                managedNodePrivilegeRemoveCommand({
                    role_id: role.role_id,
                    managed_node_id: node.node_id,
                    privilege,
                })
            )
            assertCommandSucceeded(
                removeResponse,
                `managed_node_privilege_remove failed for privilege=${privilege}`,
                ResultCodes.ROLE_PRIVILEGE_REMOVE_FAILED
            )
            items.push({
                privilege,
                action: 'remove',
                status: RolePrivilegeStatus.Removed,
            })
        } catch (err) {
            items.push({
                privilege,
                action: 'remove',
                status: RolePrivilegeStatus.Failed,
                message: extractErrorMessage(err),
            })
        }
    }

    for (const privilege of addPrivileges) {
        try {
            const payload: ManagedNodePrivilegeAddRequest = {
                role_id: role.role_id,
                managed_node_id: node.node_id,
                privilege,
            }
            if (privilege === MANAGE_COMPANIES && input.mspKeys) {
                payload.msp_keys = input.mspKeys
            }
            if (privilege === TRANSFER_ACCOUNT && roleKeyMaterial) {
                await addTransferAccountPrivilege(auth, payload, roleKeyMaterial)
            } else {
                const addResponse = await auth.executeRestCommand(managedNodePrivilegeAddCommand(payload))
                assertCommandSucceeded(
                    addResponse,
                    `managed_node_privilege_add failed for privilege=${privilege}`,
                    ResultCodes.ROLE_PRIVILEGE_ADD_FAILED
                )
            }
            items.push({
                privilege,
                action: 'add',
                status: RolePrivilegeStatus.Added,
            })
        } catch (err) {
            items.push({
                privilege,
                action: 'add',
                status: RolePrivilegeStatus.Failed,
                message: extractErrorMessage(err),
            })
        }
    }

    return finalizeResult(role.role_id, roleName, node.node_id, nodeName, items)
}

function finalizeResult(
    roleId: number,
    roleName: string,
    nodeId: number,
    nodeName: string,
    items: RolePrivilegeItemResult[]
): ChangeRolePrivilegesResult {
    let succeeded = 0
    let failed = 0
    for (const item of items) {
        if (item.status === RolePrivilegeStatus.Added || item.status === RolePrivilegeStatus.Removed) succeeded++
        else if (item.status === RolePrivilegeStatus.Failed) failed++
    }
    return {
        success: failed === 0 && succeeded > 0,
        roleId,
        roleName,
        nodeId,
        nodeName,
        items,
        succeeded,
        skipped: 0,
        failed,
    }
}

export function formatChangeRolePrivilegesResult(result: ChangeRolePrivilegesResult): FormattedRolePrivilegeTable {
    const rows = result.items.map((item, index) => [
        String(index + 1),
        item.status,
        item.action,
        item.privilege,
        item.message || '',
    ])
    return {
        headers: [...ROLE_PRIVILEGE_TABLE_HEADERS],
        rows,
        parentLabel: `Role: ${result.roleName}  Node: ${result.nodeName}`,
        summary: `Succeeded: ${result.succeeded}  Failed: ${result.failed}`,
    }
}

export function renderChangeRolePrivilegesAsciiTable(table: FormattedRolePrivilegeTable): string {
    const { headers, rows } = table
    const widths = headers.map((header, columnIndex) =>
        Math.max(header.length, ...rows.map((row) => (row[columnIndex] || '').length))
    )
    const padCell = (cell: string, columnIndex: number): string =>
        cell + ' '.repeat(Math.max(0, widths[columnIndex] - cell.length))
    const formatRow = (cells: string[]): string =>
        cells.map((cell, columnIndex) => padCell(cell, columnIndex)).join('  ')

    return [
        table.parentLabel,
        formatRow(headers),
        formatRow(widths.map((w) => '-'.repeat(w))),
        ...rows.map(formatRow),
        table.summary,
    ].join('\n')
}

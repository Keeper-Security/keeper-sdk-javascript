import {
    encryptForStorage,
    encryptKey,
    generateEncryptionKey,
    managedNodePrivilegeAddCommand,
    managedNodePrivilegeRemoveCommand,
    platform,
    type Auth,
    type ManagedNodePrivilegeAddRequest,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../utils'
import { EnterpriseDataInclude, EnterpriseDataManager } from '../teams/enterpriseData'
import { applyDecryptedNodeNames, applyEnterpriseNameToRoot, resolveParentNode } from '../teams/teamUtils'
import {
    applyDecryptedRoleNames,
    assertCommandSucceeded,
    nodePathOrFallback,
    normalizeIdentifiers,
    resolveExistingRoles,
} from './roleUtils'

/**
 * Privileges that grant the underlying managed node the ability to act on the enterprise's
 * behalf (transfer another user's vault, or administer managed companies). Commander protects
 * these operations with a per-role AES key (encrypted with the enterprise tree key) plus an
 * RSA keypair for the role. The exact wire contract for `role_key_enc_with_tree_key` /
 * `role_public_key` / `role_private_key` has not been verified against a live server in this
 * SDK; treat this path as best-effort/experimental. Regular privileges do not need any of this.
 */
const SPECIAL_PRIVILEGES = new Set(['transfer_account', 'manage_companies'])

const ROLE_PRIVILEGE_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Nodes,
    EnterpriseDataInclude.Roles,
    EnterpriseDataInclude.ManagedNodes,
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
    role_key_enc_with_tree_key: string
    role_public_key: string
    role_private_key: string
}

async function buildRoleKeyMaterial(treeKey: Uint8Array): Promise<RoleKeyMaterial> {
    const roleKey = generateEncryptionKey()
    const roleKeyEncWithTreeKey = await encryptKey(roleKey, treeKey)
    const { privateKey, publicKey } = await platform.generateRSAKeyPair()
    return {
        role_key_enc_with_tree_key: roleKeyEncWithTreeKey,
        role_public_key: platform.bytesToBase64(publicKey),
        role_private_key: await encryptForStorage(privateKey, roleKey),
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

    const needsRoleKeyMaterial = addPrivileges.some((p) => SPECIAL_PRIVILEGES.has(p))
    const treeKey = needsRoleKeyMaterial ? await enterpriseData.getTreeKey() : null
    if (needsRoleKeyMaterial && !treeKey) {
        throw new KeeperSdkError(
            'Enterprise tree key is unavailable; cannot grant transfer_account/manage_companies.',
            ResultCodes.ENTERPRISE_TREE_KEY_UNAVAILABLE
        )
    }
    const roleKeyMaterial = treeKey ? await buildRoleKeyMaterial(treeKey) : null

    const items: RolePrivilegeItemResult[] = []

    for (const privilege of removePrivileges) {
        try {
            const response = await auth.executeRestCommand(
                managedNodePrivilegeRemoveCommand({
                    role_id: role.role_id,
                    managed_node_id: node.node_id,
                    privilege,
                })
            )
            assertCommandSucceeded(
                response,
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
            if (SPECIAL_PRIVILEGES.has(privilege) && roleKeyMaterial) {
                Object.assign(payload, roleKeyMaterial)
            }
            const response = await auth.executeRestCommand(managedNodePrivilegeAddCommand(payload))
            assertCommandSucceeded(
                response,
                `managed_node_privilege_add failed for privilege=${privilege}`,
                ResultCodes.ROLE_PRIVILEGE_ADD_FAILED
            )
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

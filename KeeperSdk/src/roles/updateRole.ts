import {
    encryptObjectForStorage,
    roleUpdateCommand,
    type Auth,
    type RoleEditRequest,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../utils'
import { EnterpriseDataInclude, EnterpriseDataManager, type EnterpriseRole } from '../teams/enterpriseData'
import {
    applyDecryptedNodeNames,
    applyEnterpriseNameToRoot,
    parentNeedsNameLookup,
    resolveParentNode,
} from '../teams/teamUtils'
import {
    applyDecryptedRoleNames,
    applyRoleEnforcements,
    assertCommandSucceeded,
    buildRoleResultRows,
    normalizeIdentifiers,
    parseEnforcements,
    renderRoleResultTable,
    resolveExistingRoles,
    resolveToggle,
    ROLE_TABLE_HEADERS,
    type RoleToggleInput,
} from './roleUtils'

const UPDATE_ROLE_INCLUDES: EnterpriseDataInclude[] = [EnterpriseDataInclude.Nodes, EnterpriseDataInclude.Roles]

export enum UpdateRoleStatus {
    Updated = 'updated',
    Failed = 'failed',
}

export type UpdateRoleInput = {
    roles: string[]
    name?: string
    parent?: string | number | null
    newUser?: RoleToggleInput
    visibleBelow?: RoleToggleInput
    enforcements?: string[]
}

export type UpdateRoleItemResult = {
    roleId: number
    roleName: string
    nodeId: number
    status: UpdateRoleStatus
    message?: string
}

export type UpdateRoleResult = {
    success: boolean
    items: UpdateRoleItemResult[]
    updated: number
    failed: number
}

export type FormattedUpdateRoleTable = {
    headers: string[]
    rows: string[][]
    summary: string
}

export async function updateRoles(auth: Auth, input: UpdateRoleInput): Promise<UpdateRoleResult> {
    const identifiers = normalizeIdentifiers(input.roles)
    if (identifiers.length === 0) {
        throw new KeeperSdkError('No roles to update.', ResultCodes.NO_ROLES_TO_UPDATE)
    }

    const newName = input.name?.trim() || undefined
    if (newName && identifiers.length > 1) {
        throw new KeeperSdkError(
            'Cannot rename more than one role in a single update.',
            ResultCodes.ROLE_RENAME_MULTI_NOT_ALLOWED
        )
    }

    const newUserInherit = resolveToggle(input.newUser)
    const visibleBelow = resolveToggle(input.visibleBelow)
    const enforcements = parseEnforcements(input.enforcements ?? [])

    const enterpriseData = new EnterpriseDataManager(auth)
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData(UPDATE_ROLE_INCLUDES),
        enterpriseData.getDisplayNames(),
    ])

    const nodes = response.nodes || []
    applyDecryptedNodeNames(nodes, displayNames.nodes)
    applyEnterpriseNameToRoot(nodes, response.enterprise_name)
    if (parentNeedsNameLookup(input.parent ?? null)) await enterpriseData.decryptNodeNames(nodes)

    const roles = response.roles || []
    applyDecryptedRoleNames(roles, displayNames.roles)
    const resolvedRoles = resolveExistingRoles(roles, identifiers)

    let overrideNodeId: number | null = null
    if (input.parent !== undefined && input.parent !== null && input.parent !== '') {
        overrideNodeId = resolveParentNode(nodes, input.parent).node_id
    }

    const needsTreeKey = Boolean(newName) || resolvedRoles.some((role) => !role.encrypted_data)
    const treeKey = needsTreeKey ? await enterpriseData.getTreeKey() : null

    const items: UpdateRoleItemResult[] = []
    for (const role of resolvedRoles) {
        const targetNodeId = overrideNodeId ?? role.node_id ?? 0
        const currentName = (role.displayName || '').trim() || String(role.role_id)

        try {
            const payload: RoleEditRequest = {
                role_id: role.role_id,
                node_id: targetNodeId,
                encrypted_data: await resolveEncryptedData(role, newName, currentName, treeKey),
                visible_below: visibleBelow ?? role.visible_below ?? false,
                new_user_inherit: newUserInherit ?? role.new_user_inherit ?? false,
            }
            await sendRoleUpdate(auth, payload)
            await applyRoleEnforcements(auth, role.role_id, enforcements)
            items.push({ roleId: role.role_id, roleName: newName || currentName, nodeId: targetNodeId, status: UpdateRoleStatus.Updated })
        } catch (err) {
            items.push({ roleId: role.role_id, roleName: currentName, nodeId: role.node_id ?? 0, status: UpdateRoleStatus.Failed, message: extractErrorMessage(err) })
        }
    }

    return finalizeResult(items)
}

export function formatUpdateRoleResult(result: UpdateRoleResult): FormattedUpdateRoleTable {
    return {
        headers: [...ROLE_TABLE_HEADERS],
        rows: buildRoleResultRows(result.items, (item) => item.message || ''),
        summary: `Updated: ${result.updated}  Failed: ${result.failed}`,
    }
}

export function renderUpdateRoleAsciiTable(table: FormattedUpdateRoleTable): string {
    return renderRoleResultTable(table.headers, table.rows, table.summary)
}

async function resolveEncryptedData(
    role: EnterpriseRole,
    newName: string | undefined,
    currentName: string,
    treeKey: Uint8Array | null
): Promise<string> {
    if (!newName && role.encrypted_data) return role.encrypted_data
    if (!treeKey) {
        throw new KeeperSdkError(
            `Enterprise tree key is unavailable; cannot ${newName ? 'rename role' : 'preserve role name'}.`,
            ResultCodes.ENTERPRISE_TREE_KEY_UNAVAILABLE
        )
    }
    return encryptObjectForStorage({ displayname: newName || currentName }, treeKey)
}

async function sendRoleUpdate(auth: Auth, payload: RoleEditRequest): Promise<void> {
    const response = await auth.executeRestCommand(roleUpdateCommand(payload))
    assertCommandSucceeded(response, `role_update failed for role_id=${payload.role_id}`, ResultCodes.ROLE_UPDATE_FAILED)
}

function finalizeResult(items: UpdateRoleItemResult[]): UpdateRoleResult {
    const updated = items.filter((item) => item.status === UpdateRoleStatus.Updated).length
    const failed = items.filter((item) => item.status === UpdateRoleStatus.Failed).length
    return { success: failed === 0 && updated > 0, items, updated, failed }
}

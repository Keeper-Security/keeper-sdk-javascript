import {
    encryptObjectForStorage,
    enterpriseAllocateIdsCommand,
    roleAddCommand,
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
    buildRolesByLowerName,
    nodePathOrFallback,
    normalizeIdentifiers,
    parseEnforcements,
    renderRoleResultTable,
    resolveToggle,
    ROLE_TABLE_HEADERS,
    validateRoleName,
    type RoleToggleInput,
} from './roleUtils'

const ADD_ROLE_INCLUDES: EnterpriseDataInclude[] = [EnterpriseDataInclude.Nodes, EnterpriseDataInclude.Roles]

export enum AddRoleStatus {
    Created = 'created',
    Skipped = 'skipped',
    Failed = 'failed',
}

export enum AddRoleSkipReason {
    AlreadyExistsInParent = 'already_exists_in_parent',
    ExistsElsewhereDeclined = 'exists_elsewhere_declined',
}

export type AddRoleConflictPrompt = {
    roleName: string
    parentNodeId: number
    parentNodeName: string
    existingRoleId: number
    existingRoleName: string
    existingNodeId: number
}

export type AddRoleConfirm = (prompt: AddRoleConflictPrompt) => boolean | Promise<boolean>

export type AddRoleInput = {
    roles: string[]
    parent?: string | number | null
    newUser?: RoleToggleInput
    visibleBelow?: RoleToggleInput
    enforcements?: string[]
    force?: boolean
    confirm?: AddRoleConfirm
}

export type AddRoleItemResult = {
    roleId: number
    roleName: string
    nodeId: number
    status: AddRoleStatus
    skipReason?: AddRoleSkipReason
    message?: string
}

export type AddRoleResult = {
    success: boolean
    parentNodeId: number
    parentNodeName: string
    items: AddRoleItemResult[]
    created: number
    skipped: number
    failed: number
}

export type FormattedAddRoleTable = {
    headers: string[]
    rows: string[][]
    parentNodeName: string
    summary: string
}

export async function addRoles(auth: Auth, input: AddRoleInput): Promise<AddRoleResult> {
    const requestedNames = normalizeIdentifiers(input.roles)
    if (requestedNames.length === 0) {
        throw new KeeperSdkError('No roles to add.', ResultCodes.NO_ROLES_TO_ADD)
    }
    requestedNames.forEach(validateRoleName)

    const force = input.force === true
    const newUserInherit = resolveToggle(input.newUser) ?? false
    const visibleBelow = resolveToggle(input.visibleBelow) ?? false
    const enforcements = parseEnforcements(input.enforcements ?? [])

    const enterpriseData = new EnterpriseDataManager(auth)
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData(ADD_ROLE_INCLUDES),
        enterpriseData.getDisplayNames(),
    ])

    const nodes = response.nodes || []
    applyDecryptedNodeNames(nodes, displayNames.nodes)
    applyEnterpriseNameToRoot(nodes, response.enterprise_name)
    if (parentNeedsNameLookup(input.parent ?? null)) await enterpriseData.decryptNodeNames(nodes)

    const roles = response.roles || []
    applyDecryptedRoleNames(roles, displayNames.roles)
    const rolesByLowerName = buildRolesByLowerName(roles)

    const parentNode = resolveParentNode(nodes, input.parent ?? null)
    const parentNodeId = parentNode.node_id
    const parentNodeName = nodePathOrFallback(nodes, parentNode)

    const treeKey = await enterpriseData.getTreeKey()
    if (!treeKey) {
        throw new KeeperSdkError(
            'Enterprise tree key is unavailable. The current user may not have permission to administer roles.',
            ResultCodes.ENTERPRISE_TREE_KEY_UNAVAILABLE
        )
    }

    const items: AddRoleItemResult[] = []
    const seenLowerNames = new Set<string>()
    for (const name of requestedNames) {
        const lower = name.toLowerCase()
        if (seenLowerNames.has(lower)) continue
        seenLowerNames.add(lower)

        const conflicts = rolesByLowerName.get(lower) || []
        const sameParent = conflicts.find((role) => role.node_id === parentNodeId)
        if (sameParent) {
            items.push(skippedItem(sameParent.role_id, name, sameParent.node_id, AddRoleSkipReason.AlreadyExistsInParent,
                `Role "${name}" already exists in parent node ${parentNodeId}.`))
            continue
        }

        if (conflicts.length > 0 && !force) {
            const confirmed = await confirmCrossNode(input.confirm, conflicts[0], { roleName: name, parentNodeId, parentNodeName })
            if (!confirmed) {
                items.push(skippedItem(conflicts[0].role_id, name, conflicts[0].node_id, AddRoleSkipReason.ExistsElsewhereDeclined,
                    `Role "${name}" exists in node ${conflicts[0].node_id}; creation declined.`))
                continue
            }
        }

        try {
            const roleId = await allocateRoleId(auth)
            const encryptedData = await encryptObjectForStorage({ displayname: name }, treeKey)
            await sendRoleAdd(auth, {
                role_id: roleId,
                node_id: parentNodeId,
                encrypted_data: encryptedData,
                visible_below: visibleBelow,
                new_user_inherit: newUserInherit,
            })
            await applyRoleEnforcements(auth, roleId, enforcements)
            items.push({ roleId, roleName: name, nodeId: parentNodeId, status: AddRoleStatus.Created })
        } catch (err) {
            items.push({ roleId: 0, roleName: name, nodeId: parentNodeId, status: AddRoleStatus.Failed, message: extractErrorMessage(err) })
        }
    }

    return finalizeResult(items, parentNodeId, parentNodeName)
}

export function formatAddRoleResult(result: AddRoleResult): FormattedAddRoleTable {
    return {
        headers: [...ROLE_TABLE_HEADERS],
        rows: buildRoleResultRows(result.items, (item) => item.message || (item.skipReason ?? '')),
        parentNodeName: result.parentNodeName,
        summary: `Created: ${result.created}  Skipped: ${result.skipped}  Failed: ${result.failed}`,
    }
}

export function renderAddRoleAsciiTable(table: FormattedAddRoleTable): string {
    return renderRoleResultTable(table.headers, table.rows, table.summary, [`Parent: ${table.parentNodeName}`])
}

async function allocateRoleId(auth: Auth): Promise<number> {
    const response = await auth.executeRestCommand(enterpriseAllocateIdsCommand({ number_requested: 1 }))
    if (!response.base_id) {
        throw new KeeperSdkError('Failed to allocate enterprise ID for new role.', ResultCodes.ROLE_ID_ALLOCATION_FAILED)
    }
    return response.base_id
}

async function sendRoleAdd(auth: Auth, payload: RoleEditRequest): Promise<void> {
    const response = await auth.executeRestCommand(roleAddCommand(payload))
    assertCommandSucceeded(response, `role_add failed for role_id=${payload.role_id}`, ResultCodes.ROLE_ADD_FAILED)
}

async function confirmCrossNode(
    confirm: AddRoleConfirm | undefined,
    existing: EnterpriseRole,
    context: { roleName: string; parentNodeId: number; parentNodeName: string }
): Promise<boolean> {
    if (!confirm) return false
    return (await confirm({
        ...context,
        existingRoleId: existing.role_id,
        existingRoleName: (existing.displayName || '').trim() || String(existing.role_id),
        existingNodeId: existing.node_id ?? 0,
    })) === true
}

function skippedItem(
    roleId: number,
    roleName: string,
    nodeId: number,
    skipReason: AddRoleSkipReason,
    message: string
): AddRoleItemResult {
    return { roleId, roleName, nodeId, status: AddRoleStatus.Skipped, skipReason, message }
}

function finalizeResult(items: AddRoleItemResult[], parentNodeId: number, parentNodeName: string): AddRoleResult {
    const created = items.filter((item) => item.status === AddRoleStatus.Created).length
    const skipped = items.filter((item) => item.status === AddRoleStatus.Skipped).length
    const failed = items.filter((item) => item.status === AddRoleStatus.Failed).length
    return { success: failed === 0 && created > 0, parentNodeId, parentNodeName, items, created, skipped, failed }
}

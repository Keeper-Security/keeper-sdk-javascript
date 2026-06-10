import { roleDeleteCommand, type Auth } from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../utils'
import { EnterpriseDataInclude, EnterpriseDataManager } from '../teams/enterpriseData'
import {
    applyDecryptedRoleNames,
    assertCommandSucceeded,
    buildRoleResultRows,
    normalizeIdentifiers,
    renderRoleResultTable,
    resolveExistingRoles,
    ROLE_TABLE_HEADERS,
} from './roleUtils'

const DELETE_ROLE_INCLUDES: EnterpriseDataInclude[] = [EnterpriseDataInclude.Roles]

export enum DeleteRoleStatus {
    Deleted = 'deleted',
    Failed = 'failed',
}

export type DeleteRoleInput = {
    roles: string[]
}

export type DeleteRoleItemResult = {
    roleId: number
    roleName: string
    nodeId: number
    status: DeleteRoleStatus
    message?: string
}

export type DeleteRoleResult = {
    success: boolean
    items: DeleteRoleItemResult[]
    deleted: number
    failed: number
}

export type FormattedDeleteRoleTable = {
    headers: string[]
    rows: string[][]
    summary: string
}

export async function deleteRoles(auth: Auth, input: DeleteRoleInput): Promise<DeleteRoleResult> {
    const identifiers = normalizeIdentifiers(input.roles)
    if (identifiers.length === 0) {
        throw new KeeperSdkError('No roles to delete.', ResultCodes.NO_ROLES_TO_DELETE)
    }

    const enterpriseData = new EnterpriseDataManager(auth)
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData(DELETE_ROLE_INCLUDES),
        enterpriseData.getDisplayNames(),
    ])

    const roles = response.roles || []
    applyDecryptedRoleNames(roles, displayNames.roles)
    const resolvedRoles = resolveExistingRoles(roles, identifiers)

    const items: DeleteRoleItemResult[] = []
    for (const role of resolvedRoles) {
        const roleName = (role.displayName || '').trim() || String(role.role_id)
        const nodeId = role.node_id ?? 0
        try {
            await sendRoleDelete(auth, role.role_id)
            items.push({ roleId: role.role_id, roleName, nodeId, status: DeleteRoleStatus.Deleted })
        } catch (err) {
            items.push({ roleId: role.role_id, roleName, nodeId, status: DeleteRoleStatus.Failed, message: extractErrorMessage(err) })
        }
    }

    return finalizeResult(items)
}

export function formatDeleteRoleResult(result: DeleteRoleResult): FormattedDeleteRoleTable {
    return {
        headers: [...ROLE_TABLE_HEADERS],
        rows: buildRoleResultRows(result.items, (item) => item.message || ''),
        summary: `Deleted: ${result.deleted}  Failed: ${result.failed}`,
    }
}

export function renderDeleteRoleAsciiTable(table: FormattedDeleteRoleTable): string {
    return renderRoleResultTable(table.headers, table.rows, table.summary)
}

async function sendRoleDelete(auth: Auth, roleId: number): Promise<void> {
    const response = await auth.executeRestCommand(roleDeleteCommand({ role_id: roleId }))
    assertCommandSucceeded(response, `role_delete failed for role_id=${roleId}`, ResultCodes.ROLE_DELETE_FAILED)
}

function finalizeResult(items: DeleteRoleItemResult[]): DeleteRoleResult {
    const deleted = items.filter((item) => item.status === DeleteRoleStatus.Deleted).length
    const failed = items.filter((item) => item.status === DeleteRoleStatus.Failed).length
    return { success: failed === 0 && deleted > 0, items, deleted, failed }
}

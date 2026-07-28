import type { Auth } from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../utils'
import { EnterpriseDataInclude, EnterpriseDataManager } from '../teams/enterpriseData'
import {
    applyDecryptedRoleNames,
    applyRoleEnforcements,
    buildRoleResultRows,
    normalizeIdentifiers,
    parseEnforcements,
    renderRoleResultTable,
    resolveExistingRoles,
    ROLE_TABLE_HEADERS,
} from './roleUtils'

const ROLE_ENFORCEMENT_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Roles,
    EnterpriseDataInclude.RoleEnforcements,
]

export enum RoleEnforcementStatus {
    Applied = 'applied',
    Failed = 'failed',
}

export type SetRoleEnforcementsInput = {
    roles: string[]
    enforcements: string[]
}

export type RoleEnforcementItemResult = {
    roleId: number
    roleName: string
    nodeId: number
    status: RoleEnforcementStatus
    message?: string
}

export type SetRoleEnforcementsResult = {
    success: boolean
    items: RoleEnforcementItemResult[]
    applied: number
    failed: number
}

export type FormattedRoleEnforcementTable = {
    headers: string[]
    rows: string[][]
    summary: string
}

export async function setRoleEnforcements(
    auth: Auth,
    input: SetRoleEnforcementsInput
): Promise<SetRoleEnforcementsResult> {
    const identifiers = normalizeIdentifiers(input.roles)
    if (identifiers.length === 0) {
        throw new KeeperSdkError('No roles specified.', ResultCodes.ROLE_REQUIRED)
    }

    const enforcements = parseEnforcements(input.enforcements ?? [])
    if (enforcements.length === 0) {
        throw new KeeperSdkError(
            'No enforcements to apply. Use KEY:VALUE pairs (VALUE=false removes an enforcement).',
            ResultCodes.NO_ENFORCEMENTS_TO_APPLY
        )
    }

    const enterpriseData = new EnterpriseDataManager(auth)
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData(ROLE_ENFORCEMENT_INCLUDES),
        enterpriseData.getDisplayNames(),
    ])

    const roles = response.roles || []
    applyDecryptedRoleNames(roles, displayNames.roles)
    const resolvedRoles = resolveExistingRoles(roles, identifiers)

    const items: RoleEnforcementItemResult[] = []
    for (const role of resolvedRoles) {
        const roleName = (role.displayName || '').trim() || String(role.role_id)
        const nodeId = role.node_id ?? 0
        try {
            await applyRoleEnforcements(auth, role.role_id, enforcements, response.role_enforcements || [])
            items.push({
                roleId: role.role_id,
                roleName,
                nodeId,
                status: RoleEnforcementStatus.Applied,
            })
        } catch (err) {
            items.push({
                roleId: role.role_id,
                roleName,
                nodeId,
                status: RoleEnforcementStatus.Failed,
                message: extractErrorMessage(err),
            })
        }
    }

    return finalizeResult(items)
}

export function formatSetRoleEnforcementsResult(result: SetRoleEnforcementsResult): FormattedRoleEnforcementTable {
    return {
        headers: [...ROLE_TABLE_HEADERS],
        rows: buildRoleResultRows(result.items, (item) => item.message || ''),
        summary: `Applied: ${result.applied}  Failed: ${result.failed}`,
    }
}

export function renderRoleEnforcementAsciiTable(table: FormattedRoleEnforcementTable): string {
    return renderRoleResultTable(table.headers, table.rows, table.summary)
}

function finalizeResult(items: RoleEnforcementItemResult[]): SetRoleEnforcementsResult {
    const applied = items.filter((item) => item.status === RoleEnforcementStatus.Applied).length
    const failed = items.filter((item) => item.status === RoleEnforcementStatus.Failed).length
    return { success: failed === 0 && applied > 0, items, applied, failed }
}

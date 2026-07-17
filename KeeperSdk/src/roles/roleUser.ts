import { roleUserAddCommand, roleUserRemoveCommand, type Auth } from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseRole,
    type EnterpriseRoleUserLink,
    type EnterpriseUser,
} from '../teams/enterpriseData'
import { resolveExistingUsers } from '../users/userTypes'
import {
    applyDecryptedRoleNames,
    assertCommandSucceeded,
    normalizeIdentifiers,
    resolveExistingRoles,
} from './roleUtils'

const ROLE_USER_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Roles,
    EnterpriseDataInclude.Users,
    EnterpriseDataInclude.RoleUsers,
]

const ROLE_USER_TABLE_HEADERS = ['#', 'Status', 'User Email', 'User ID', 'Role Name', 'Role ID', 'Detail']

export enum RoleUserStatus {
    Added = 'added',
    Removed = 'removed',
    Skipped = 'skipped',
    Failed = 'failed',
}

export enum RoleUserSkipReason {
    AlreadyMember = 'already_member',
    NotMember = 'not_member',
}

export type AddUsersToRolesInput = {
    roles: string[]
    users: string[]
}

export type RemoveUsersFromRolesInput = {
    roles: string[]
    users: string[]
}

export type RoleUserItemResult = {
    username: string
    enterpriseUserId: number
    roleId: number
    roleName: string
    status: RoleUserStatus
    skipReason?: RoleUserSkipReason
    message?: string
}

export type RoleUserResult = {
    success: boolean
    items: RoleUserItemResult[]
    succeeded: number
    skipped: number
    failed: number
}

export type FormattedRoleUserTable = {
    headers: string[]
    rows: string[][]
    summary: string
}

type RoleUserContext = {
    roles: EnterpriseRole[]
    users: EnterpriseUser[]
    membership: Set<string>
}

const membershipKey = (roleId: number, userId: number): string => `${roleId}:${userId}`

async function loadRoleUserContext(auth: Auth, rawRoles: string[], rawUsers: string[]): Promise<RoleUserContext> {
    const roleIdentifiers = normalizeIdentifiers(rawRoles)
    if (roleIdentifiers.length === 0) {
        throw new KeeperSdkError('No roles specified.', ResultCodes.ROLE_REQUIRED)
    }
    const userIdentifiers = normalizeIdentifiers(rawUsers)
    if (userIdentifiers.length === 0) {
        throw new KeeperSdkError('No users specified.', ResultCodes.NO_USERS_FOR_ROLE_OP)
    }

    const enterpriseData = new EnterpriseDataManager(auth)
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData(ROLE_USER_INCLUDES),
        enterpriseData.getDisplayNames(),
    ])

    const roles = response.roles || []
    applyDecryptedRoleNames(roles, displayNames.roles)

    return {
        roles: resolveExistingRoles(roles, roleIdentifiers),
        users: resolveExistingUsers(response.users || [], userIdentifiers),
        membership: buildMembershipSet(response.role_users),
    }
}

function buildMembershipSet(roleUsers: EnterpriseRoleUserLink[] | undefined): Set<string> {
    const membership = new Set<string>()
    for (const link of roleUsers || []) {
        membership.add(membershipKey(link.role_id, link.enterprise_user_id))
    }
    return membership
}

function roleDisplayName(role: EnterpriseRole): string {
    return (role.displayName || '').trim() || String(role.role_id)
}

function buildItemBase(user: EnterpriseUser, role: EnterpriseRole): Omit<RoleUserItemResult, 'status'> {
    return {
        username: user.username,
        enterpriseUserId: user.enterprise_user_id,
        roleId: role.role_id,
        roleName: roleDisplayName(role),
    }
}

export async function addUsersToRoles(auth: Auth, input: AddUsersToRolesInput): Promise<RoleUserResult> {
    const ctx = await loadRoleUserContext(auth, input.roles, input.users)
    const items: RoleUserItemResult[] = []

    for (const role of ctx.roles) {
        for (const user of ctx.users) {
            const base = buildItemBase(user, role)
            if (ctx.membership.has(membershipKey(role.role_id, user.enterprise_user_id))) {
                items.push({
                    ...base,
                    status: RoleUserStatus.Skipped,
                    skipReason: RoleUserSkipReason.AlreadyMember,
                })
                continue
            }

            try {
                const response = await auth.executeRestCommand(
                    roleUserAddCommand({
                        role_id: role.role_id,
                        enterprise_user_id: user.enterprise_user_id,
                    })
                )
                assertCommandSucceeded(
                    response,
                    `role_user_add failed for role_id=${role.role_id}, user=${user.username}`,
                    ResultCodes.ROLE_USER_ADD_FAILED
                )
                items.push({ ...base, status: RoleUserStatus.Added })
            } catch (err) {
                items.push({
                    ...base,
                    status: RoleUserStatus.Failed,
                    message: extractErrorMessage(err),
                })
            }
        }
    }

    return finalizeResult(items)
}

export async function removeUsersFromRoles(auth: Auth, input: RemoveUsersFromRolesInput): Promise<RoleUserResult> {
    const ctx = await loadRoleUserContext(auth, input.roles, input.users)
    const items: RoleUserItemResult[] = []

    for (const role of ctx.roles) {
        for (const user of ctx.users) {
            const base = buildItemBase(user, role)
            if (!ctx.membership.has(membershipKey(role.role_id, user.enterprise_user_id))) {
                items.push({
                    ...base,
                    status: RoleUserStatus.Skipped,
                    skipReason: RoleUserSkipReason.NotMember,
                })
                continue
            }

            try {
                const response = await auth.executeRestCommand(
                    roleUserRemoveCommand({
                        role_id: role.role_id,
                        enterprise_user_id: user.enterprise_user_id,
                    })
                )
                assertCommandSucceeded(
                    response,
                    `role_user_remove failed for role_id=${role.role_id}, user=${user.username}`,
                    ResultCodes.ROLE_USER_REMOVE_FAILED
                )
                items.push({ ...base, status: RoleUserStatus.Removed })
            } catch (err) {
                items.push({
                    ...base,
                    status: RoleUserStatus.Failed,
                    message: extractErrorMessage(err),
                })
            }
        }
    }

    return finalizeResult(items)
}

function finalizeResult(items: RoleUserItemResult[]): RoleUserResult {
    let succeeded = 0
    let skipped = 0
    let failed = 0
    for (const item of items) {
        if (item.status === RoleUserStatus.Added || item.status === RoleUserStatus.Removed) succeeded++
        else if (item.status === RoleUserStatus.Skipped) skipped++
        else failed++
    }
    return {
        success: failed === 0 && succeeded > 0,
        items,
        succeeded,
        skipped,
        failed,
    }
}

export function formatRoleUserResult(result: RoleUserResult): FormattedRoleUserTable {
    const rows = result.items.map((item, index) => [
        String(index + 1),
        item.status,
        item.username,
        String(item.enterpriseUserId),
        item.roleName,
        String(item.roleId),
        item.message || item.skipReason || '',
    ])
    return {
        headers: [...ROLE_USER_TABLE_HEADERS],
        rows,
        summary: `Succeeded: ${result.succeeded}  Skipped: ${result.skipped}  Failed: ${result.failed}`,
    }
}

export function renderRoleUserAsciiTable(table: FormattedRoleUserTable): string {
    const { headers, rows } = table
    const widths = headers.map((header, columnIndex) =>
        Math.max(header.length, ...rows.map((row) => (row[columnIndex] || '').length))
    )
    const padCell = (cell: string, columnIndex: number): string =>
        cell + ' '.repeat(Math.max(0, widths[columnIndex] - cell.length))
    const formatRow = (cells: string[]): string =>
        cells.map((cell, columnIndex) => padCell(cell, columnIndex)).join('  ')

    return [
        formatRow(headers),
        formatRow(widths.map((w) => '-'.repeat(w))),
        ...rows.map(formatRow),
        table.summary,
    ].join('\n')
}

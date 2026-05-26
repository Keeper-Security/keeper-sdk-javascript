import type { Auth } from '@keeper-security/keeperapi'
import { isNumber, TOKEN_SEPARATOR_PATTERN } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseDisplayNames,
    type EnterpriseNode,
    type EnterpriseQueuedTeamRecord,
    type EnterpriseQueuedTeamUserLink,
    type EnterpriseRole,
    type EnterpriseRoleTeamLink,
    type EnterpriseRoleUserLink,
    type EnterpriseTeamRecord,
    type EnterpriseTeamUserLink,
    type EnterpriseUser,
    type EnterpriseUserAliasLink,
} from '../teams/enterpriseData'
import { applyDecryptedNodeNames } from '../teams/teamUtils'
import {
    formatUserStatus,
    formatTransferStatus,
    UserColumn,
    type UserColumnInput,
    type ListUsersOptions,
    type ListUserRow,
    type FormattedUsersTable,
    type FormatUsersTableOptions,
} from './userTypes'

export { UserColumn }
export type { UserColumnInput, ListUsersOptions, ListUserRow, FormattedUsersTable, FormatUsersTableOptions }

export const SUPPORTED_USER_COLUMNS: readonly UserColumn[] = Object.values(UserColumn)

export const DEFAULT_USER_COLUMNS: readonly UserColumn[] = [
    UserColumn.Name,
    UserColumn.Status,
    UserColumn.TransferStatus,
    UserColumn.Node,
]

const NODE_PATH_SEPARATOR = '\\'
const MIN_ASCII_COL_WIDTH = 2
const ALL_COLUMNS_WILDCARD = '*'

const HEADER_BY_COLUMN: Record<UserColumn, string> = {
    [UserColumn.Name]: 'Name',
    [UserColumn.Status]: 'Status',
    [UserColumn.TransferStatus]: 'Transfer Status',
    [UserColumn.Node]: 'Node',
    [UserColumn.TeamCount]: 'Team Count',
    [UserColumn.Teams]: 'Teams',
    [UserColumn.QueuedTeamCount]: 'Queued Team Count',
    [UserColumn.QueuedTeams]: 'Queued Teams',
    [UserColumn.RoleCount]: 'Role Count',
    [UserColumn.Roles]: 'Roles',
    [UserColumn.Alias]: 'Alias',
    [UserColumn.TwoFaEnabled]: '2FA Enabled',
}

type DecorateContext = {
    nodePaths: Map<number, string>
    userTeams: Map<number, Set<string>>
    userQueuedTeams: Map<number, Set<string>>
    userRoles: Map<number, Set<number>>
    teamNameByUid: Map<string, string>
    queuedTeamNameByUid: Map<string, string>
    roleNameById: Map<number, string>
    userAliases: Map<number, string[]>
}

export async function listUsers(auth: Auth, options: ListUsersOptions = {}): Promise<ListUserRow[]> {
    const columns = resolveColumns(options.columns)
    const includes = includesForColumns(columns)
    const wantsDisplayNames = columns.includes(UserColumn.Node)

    const enterpriseData = new EnterpriseDataManager(auth)
    const emptyDisplayNames: EnterpriseDisplayNames = { nodes: new Map(), roles: new Map() }
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData(includes),
        wantsDisplayNames ? enterpriseData.getDisplayNames() : Promise.resolve(emptyDisplayNames),
    ])

    const nodes = response.nodes || []
    applyDecryptedNodeNames(nodes, displayNames.nodes)

    const context: DecorateContext = {
        nodePaths: buildNodePathLookup(nodes),
        userTeams: buildUserTeamMap(response.team_users || []),
        userQueuedTeams: buildUserQueuedTeamMap(response.queued_team_users || []),
        userRoles: buildUserRolesMap(
            response.role_users || [],
            response.role_teams || [],
            response.team_users || []
        ),
        teamNameByUid: buildTeamNameMap(response.teams || []),
        queuedTeamNameByUid: buildTeamNameMap(response.queued_teams || []),
        roleNameById: buildRoleNameMap(response.roles || [], displayNames.roles),
        userAliases: buildUserAliasMap(response.user_aliases || []),
    }

    const pattern = options.pattern?.trim() || null
    const rows: ListUserRow[] = []
    for (const user of response.users || []) {
        const row: ListUserRow = {
            enterprise_user_id: user.enterprise_user_id,
            username: user.username,
        }
        decorateRow(row, user, columns, context)
        if (pattern && !rowMatchesPattern(row, pattern)) continue
        rows.push(row)
    }

    rows.sort((a, b) => a.username.localeCompare(b.username, undefined, { sensitivity: 'base' }))
    return rows
}

export function formatUsersTable(
    rows: ListUserRow[],
    options: FormatUsersTableOptions = {}
): FormattedUsersTable {
    const columns = resolveColumns(options.columns)
    const headers: string[] = ['#', 'User ID', 'Email', ...columns.map((col) => HEADER_BY_COLUMN[col])]

    const outRows: string[][] = rows.map((row, idx) => {
        const cells: string[] = [String(idx + 1), String(row.enterprise_user_id), row.username]
        for (const col of columns) cells.push(formatCell(row, col))
        return cells
    })

    return { headers, rows: outRows }
}

export function renderUsersAsciiTable(
    table: FormattedUsersTable,
    options: { minColWidth?: number } = {}
): string {
    const { minColWidth = MIN_ASCII_COL_WIDTH } = options
    const { headers, rows } = table
    const columnCount = headers.length

    const expandedRows: string[][][] = rows.map((row) =>
        row.map((cell) => (cell.includes('\n') ? cell.split('\n') : [cell]))
    )

    const columnWidths = new Array<number>(columnCount).fill(0)
    for (let ci = 0; ci < columnCount; ci += 1) {
        columnWidths[ci] = Math.max(headers[ci].length, minColWidth)
    }
    for (const row of expandedRows) {
        for (let ci = 0; ci < columnCount; ci += 1) {
            for (const line of row[ci]) {
                columnWidths[ci] = Math.max(columnWidths[ci], line.length, minColWidth)
            }
        }
    }

    const padCell = (cell: string, ci: number): string => cell.padEnd(columnWidths[ci])
    const formatPhysicalRow = (cells: string[]): string =>
        cells.map((cell, ci) => padCell(cell, ci)).join('  ')

    const ruleRow = formatPhysicalRow(columnWidths.map((w) => '-'.repeat(w)))
    const lines: string[] = [formatPhysicalRow(headers), ruleRow]

    for (const row of expandedRows) {
        const physicalLineCount = Math.max(...row.map((cell) => cell.length))
        for (let li = 0; li < physicalLineCount; li += 1) {
            lines.push(formatPhysicalRow(row.map((cell) => cell[li] ?? '')))
        }
    }
    return lines.join('\n')
}

function includesForColumns(columns: readonly UserColumn[]): EnterpriseDataInclude[] {
    const set = new Set<EnterpriseDataInclude>([EnterpriseDataInclude.Users])
    for (const col of columns) {
        switch (col) {
            case UserColumn.Node:
                set.add(EnterpriseDataInclude.Nodes)
                break
            case UserColumn.TeamCount:
                set.add(EnterpriseDataInclude.TeamUsers)
                break
            case UserColumn.Teams:
                set.add(EnterpriseDataInclude.TeamUsers)
                set.add(EnterpriseDataInclude.Teams)
                break
            case UserColumn.QueuedTeamCount:
                set.add(EnterpriseDataInclude.QueuedTeamUsers)
                break
            case UserColumn.QueuedTeams:
                set.add(EnterpriseDataInclude.QueuedTeamUsers)
                set.add(EnterpriseDataInclude.QueuedTeams)
                set.add(EnterpriseDataInclude.Teams)
                break
            case UserColumn.RoleCount:
            case UserColumn.Roles:
                set.add(EnterpriseDataInclude.RoleUsers)
                set.add(EnterpriseDataInclude.RoleTeams)
                set.add(EnterpriseDataInclude.TeamUsers)
                if (col === UserColumn.Roles) set.add(EnterpriseDataInclude.Roles)
                break
            case UserColumn.Alias:
                set.add(EnterpriseDataInclude.UserAliases)
                break
        }
    }
    return Array.from(set)
}

function resolveColumns(input: ListUsersOptions['columns']): UserColumn[] {
    if (input == null) return [...DEFAULT_USER_COLUMNS]
    if (input === ALL_COLUMNS_WILDCARD) return [...SUPPORTED_USER_COLUMNS]

    const requested = Array.isArray(input) ? input : input.split(',').map((p) => p.trim())
    const allowed = new Set<string>(SUPPORTED_USER_COLUMNS)
    const seen = new Set<UserColumn>()
    for (const col of requested) {
        if (col && allowed.has(col)) seen.add(col as UserColumn)
    }
    if (seen.size === 0) return [...DEFAULT_USER_COLUMNS]
    return SUPPORTED_USER_COLUMNS.filter((col) => seen.has(col))
}

function rowMatchesPattern(row: ListUserRow, pattern: string): boolean {
    const lowered = pattern.toLowerCase()
    const tokens: string[] = [String(row.enterprise_user_id)]

    const addText = (value: string | undefined): void => {
        if (value) tokens.push(...value.toLowerCase().split(TOKEN_SEPARATOR_PATTERN).filter(Boolean))
    }
    const addList = (values: string[] | undefined): void => {
        values?.forEach((v) => addText(v))
    }

    addText(row.username)
    addText(row.name)
    addText(row.status)
    addText(row.transfer_status)
    addText(row.node)
    if (row.team_count != null) tokens.push(String(row.team_count))
    if (row.queued_team_count != null) tokens.push(String(row.queued_team_count))
    if (row.role_count != null) tokens.push(String(row.role_count))
    if (row.tfa_enabled != null) tokens.push(String(row.tfa_enabled))
    addList(row.teams)
    addList(row.queued_teams)
    addList(row.roles)
    addList(row.alias)

    return tokens.some((t) => t.includes(lowered))
}

function buildNodePathLookup(nodes: EnterpriseNode[]): Map<number, string> {
    return new Map(
        nodes.map((node) => [
            node.node_id,
            EnterpriseDataManager.getNodePath(nodes, node.node_id, {
                omitRoot: true,
                separator: NODE_PATH_SEPARATOR,
            }),
        ])
    )
}

function buildUserTeamMap(links: EnterpriseTeamUserLink[]): Map<number, Set<string>> {
    const map = new Map<number, Set<string>>()
    for (const link of links) {
        if (!link.team_uid) continue
        const set = map.get(link.enterprise_user_id)
        if (set) set.add(link.team_uid)
        else map.set(link.enterprise_user_id, new Set([link.team_uid]))
    }
    return map
}

function buildUserQueuedTeamMap(links: EnterpriseQueuedTeamUserLink[]): Map<number, Set<string>> {
    const map = new Map<number, Set<string>>()
    for (const link of links) {
        if (!link.team_uid) continue
        const set = map.get(link.enterprise_user_id)
        if (set) set.add(link.team_uid)
        else map.set(link.enterprise_user_id, new Set([link.team_uid]))
    }
    return map
}

function buildUserRolesMap(
    roleUsers: EnterpriseRoleUserLink[],
    roleTeams: EnterpriseRoleTeamLink[],
    teamUsers: EnterpriseTeamUserLink[]
): Map<number, Set<number>> {
    const map = new Map<number, Set<number>>()

    for (const link of roleUsers) {
        const set = map.get(link.enterprise_user_id)
        if (set) set.add(link.role_id)
        else map.set(link.enterprise_user_id, new Set([link.role_id]))
    }

    const rolesForTeam = new Map<string, Set<number>>()
    for (const link of roleTeams) {
        if (!link.team_uid) continue
        const set = rolesForTeam.get(link.team_uid)
        if (set) set.add(link.role_id)
        else rolesForTeam.set(link.team_uid, new Set([link.role_id]))
    }

    for (const link of teamUsers) {
        if (!link.team_uid) continue
        const teamRoles = rolesForTeam.get(link.team_uid)
        if (!teamRoles) continue
        const userRoles = map.get(link.enterprise_user_id)
        if (userRoles) {
            for (const roleId of teamRoles) userRoles.add(roleId)
        } else {
            map.set(link.enterprise_user_id, new Set(teamRoles))
        }
    }

    return map
}

function buildTeamNameMap(teams: Array<EnterpriseTeamRecord | EnterpriseQueuedTeamRecord>): Map<string, string> {
    const map = new Map<string, string>()
    for (const team of teams) {
        if (team.team_uid) map.set(team.team_uid, (team.name || team.team_uid).trim() || team.team_uid)
    }
    return map
}

function buildRoleNameMap(roles: EnterpriseRole[], decrypted: Map<number, string>): Map<number, string> {
    const map = new Map<number, string>()
    for (const role of roles) {
        if (!isNumber(role.role_id)) continue
        const display = (role.displayName || decrypted.get(role.role_id) || '').trim()
        map.set(role.role_id, display || String(role.role_id))
    }
    return map
}

function buildUserAliasMap(links: EnterpriseUserAliasLink[]): Map<number, string[]> {
    const map = new Map<number, Set<string>>()
    for (const link of links) {
        if (!link.username) continue
        const set = map.get(link.enterprise_user_id)
        if (set) set.add(link.username)
        else map.set(link.enterprise_user_id, new Set([link.username]))
    }
    const result = new Map<number, string[]>()
    for (const [userId, aliases] of map) {
        result.set(userId, [...aliases].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })))
    }
    return result
}

function resolveSortedNames<K>(keys: Set<K>, nameByKey: Map<K, string>): string[] {
    const names: string[] = []
    for (const key of keys) {
        const name = nameByKey.get(key)
        if (name) names.push(name)
    }
    return names.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
}

function resolveQueuedTeamNames(
    teamUids: Set<string>,
    teamNameByUid: Map<string, string>,
    queuedTeamNameByUid: Map<string, string>
): string[] {
    const names = new Set<string>()
    for (const uid of teamUids) {
        const fromTeams = teamNameByUid.get(uid)
        if (fromTeams) names.add(fromTeams)
        const fromQueued = queuedTeamNameByUid.get(uid)
        if (fromQueued) names.add(fromQueued)
    }
    return [...names].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
}

function decorateRow(
    row: ListUserRow,
    user: EnterpriseUser,
    columns: readonly UserColumn[],
    ctx: DecorateContext
): void {
    for (const col of columns) {
        switch (col) {
            case UserColumn.Name:
                row.name = (user.full_name || '').trim()
                break
            case UserColumn.Status:
                row.status = formatUserStatus(user)
                break
            case UserColumn.TransferStatus:
                row.transfer_status = formatTransferStatus(user)
                break
            case UserColumn.Node:
                row.node = user.node_id != null ? (ctx.nodePaths.get(user.node_id) ?? '') : ''
                break
            case UserColumn.TeamCount:
                row.team_count = ctx.userTeams.get(user.enterprise_user_id)?.size ?? 0
                break
            case UserColumn.Teams: {
                const teamUids = ctx.userTeams.get(user.enterprise_user_id)
                row.teams = teamUids ? resolveSortedNames(teamUids, ctx.teamNameByUid) : []
                break
            }
            case UserColumn.QueuedTeamCount:
                row.queued_team_count = ctx.userQueuedTeams.get(user.enterprise_user_id)?.size ?? 0
                break
            case UserColumn.QueuedTeams: {
                const queuedUids = ctx.userQueuedTeams.get(user.enterprise_user_id)
                row.queued_teams = queuedUids
                    ? resolveQueuedTeamNames(queuedUids, ctx.teamNameByUid, ctx.queuedTeamNameByUid)
                    : []
                break
            }
            case UserColumn.RoleCount:
                row.role_count = ctx.userRoles.get(user.enterprise_user_id)?.size ?? 0
                break
            case UserColumn.Roles: {
                const roleIds = ctx.userRoles.get(user.enterprise_user_id)
                row.roles = roleIds ? resolveSortedNames(roleIds, ctx.roleNameById) : []
                break
            }
            case UserColumn.Alias: {
                const aliases = ctx.userAliases.get(user.enterprise_user_id)
                row.alias = aliases
                    ? aliases.filter((a) => a.toLowerCase() !== user.username.toLowerCase())
                    : []
                break
            }
            case UserColumn.TwoFaEnabled:
                row.tfa_enabled = user.tfa_enabled ?? false
                break
        }
    }
}

function formatListCell(values: string[] | undefined): string {
    return values && values.length > 0 ? values.join('\n') : ''
}

function formatCell(row: ListUserRow, col: UserColumn): string {
    switch (col) {
        case UserColumn.Name:            return row.name ?? ''
        case UserColumn.Status:          return row.status ?? ''
        case UserColumn.TransferStatus:  return row.transfer_status ?? ''
        case UserColumn.Node:            return row.node ?? ''
        case UserColumn.TeamCount:       return row.team_count == null ? '' : String(row.team_count)
        case UserColumn.Teams:           return formatListCell(row.teams)
        case UserColumn.QueuedTeamCount: return row.queued_team_count == null ? '' : String(row.queued_team_count)
        case UserColumn.QueuedTeams:     return formatListCell(row.queued_teams)
        case UserColumn.RoleCount:       return row.role_count == null ? '' : String(row.role_count)
        case UserColumn.Roles:           return formatListCell(row.roles)
        case UserColumn.Alias:           return formatListCell(row.alias)
        case UserColumn.TwoFaEnabled:    return row.tfa_enabled == null ? '' : String(row.tfa_enabled)
    }
}

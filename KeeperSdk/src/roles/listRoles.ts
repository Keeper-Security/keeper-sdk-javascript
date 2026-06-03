import type { Auth } from '@keeper-security/keeperapi'
import { isNumber, TOKEN_SEPARATOR_PATTERN } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseDisplayNames,
    type EnterpriseNode,
    type EnterpriseRole,
    type EnterpriseRolePrivilegeLink,
    type EnterpriseRoleTeamLink,
    type EnterpriseRoleUserLink,
    type EnterpriseTeamRecord,
    type EnterpriseUser,
} from '../teams/enterpriseData'
import { applyDecryptedNodeNames } from '../teams/teamUtils'
import {
    ALL_COLUMNS_WILDCARD,
    DEFAULT_ROLE_COLUMNS,
    RoleColumn,
    SUPPORTED_ROLE_COLUMNS,
    type FormatRolesTableOptions,
    type FormattedRolesTable,
    type ListRoleRow,
    type ListRolesOptions,
} from './roleTypes'

const NODE_PATH_SEPARATOR = '\\'
const MIN_ASCII_COL_WIDTH = 2

const HEADER_BY_COLUMN: Record<RoleColumn, string> = {
    [RoleColumn.VisibleBelow]: 'Visible Below',
    [RoleColumn.DefaultRole]: 'Default Role',
    [RoleColumn.Admin]: 'Admin',
    [RoleColumn.Node]: 'Node',
    [RoleColumn.UserCount]: 'User Count',
    [RoleColumn.Users]: 'Users',
    [RoleColumn.TeamCount]: 'Team Count',
    [RoleColumn.Teams]: 'Teams',
}

type DecorateContext = {
    nodePaths: Map<number, string>
    adminRoleIds: Set<number>
    roleUsers: Map<number, Set<number>>
    roleTeams: Map<number, Set<string>>
    usernameById: Map<number, string>
    teamNameById: Map<string, string>
}

export async function listRoles(auth: Auth, options: ListRolesOptions = {}): Promise<ListRoleRow[]> {
    const columns = resolveColumns(options.columns)
    const includes = includesForColumns(columns)
    const wantsDisplayNames =
        columns.includes(RoleColumn.Node) ||
        columns.includes(RoleColumn.Teams) ||
        columns.includes(RoleColumn.TeamCount)

    const enterpriseData = new EnterpriseDataManager(auth)
    const emptyDisplayNames: EnterpriseDisplayNames = { nodes: new Map(), roles: new Map() }
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData(includes),
        wantsDisplayNames ? enterpriseData.getDisplayNames() : Promise.resolve(emptyDisplayNames),
    ])

    const roles = response.roles || []
    const nodes = response.nodes || []
    applyDecryptedNodeNames(nodes, displayNames.nodes)

    for (const role of roles) {
        const display = displayNames.roles.get(role.role_id)
        if (display) role.displayName = display
    }

    const context: DecorateContext = {
        nodePaths: buildNodePathLookup(nodes),
        adminRoleIds: buildAdminRoleIds(response.role_privileges || []),
        roleUsers: buildRoleUserMap(response.role_users || []),
        roleTeams: buildRoleTeamMap(response.role_teams || []),
        usernameById: buildUsernameMap(response.users || []),
        teamNameById: buildTeamNameMap(response.teams || []),
    }

    const pattern = options.pattern?.trim() || null
    const rows: ListRoleRow[] = []
    for (const role of roles) {
        const row = decorateRow(role, columns, context)
        if (pattern && !rowMatchesPattern(row, pattern)) continue
        rows.push(row)
    }

    rows.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
    return rows
}

export function formatRolesTable(
    rows: ListRoleRow[],
    options: FormatRolesTableOptions = {}
): FormattedRolesTable {
    const columns = resolveColumns(options.columns)
    const headers: string[] = ['#', 'Role ID', 'Name', ...columns.map((col) => HEADER_BY_COLUMN[col])]

    const outRows: string[][] = rows.map((row, rowIndex) => {
        const cells: string[] = [String(rowIndex + 1), String(row.role_id), row.name]
        for (const col of columns) cells.push(formatCell(row, col))
        return cells
    })

    return { headers, rows: outRows }
}

export function renderRolesAsciiTable(
    table: FormattedRolesTable,
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

    const padCell = (cell: string, ci: number): string =>
        cell + ' '.repeat(columnWidths[ci] - cell.length)
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

function includesForColumns(columns: readonly RoleColumn[]): EnterpriseDataInclude[] {
    const set = new Set<EnterpriseDataInclude>([EnterpriseDataInclude.Roles])
    for (const col of columns) {
        switch (col) {
            case RoleColumn.Node:
                set.add(EnterpriseDataInclude.Nodes)
                break
            case RoleColumn.Admin:
                set.add(EnterpriseDataInclude.RolePrivileges)
                break
            case RoleColumn.UserCount:
            case RoleColumn.Users:
                set.add(EnterpriseDataInclude.RoleUsers)
                if (col === RoleColumn.Users) set.add(EnterpriseDataInclude.Users)
                break
            case RoleColumn.TeamCount:
            case RoleColumn.Teams:
                set.add(EnterpriseDataInclude.RoleTeams)
                if (col === RoleColumn.Teams) set.add(EnterpriseDataInclude.Teams)
                break
        }
    }
    return Array.from(set)
}

function resolveColumns(input: ListRolesOptions['columns']): RoleColumn[] {
    if (input == null) return [...DEFAULT_ROLE_COLUMNS]
    if (input === ALL_COLUMNS_WILDCARD) return [...SUPPORTED_ROLE_COLUMNS]

    const requested = Array.isArray(input) ? input : input.split(',').map((p) => p.trim())
    const allowed = new Set<string>(SUPPORTED_ROLE_COLUMNS)
    const seen = new Set<RoleColumn>()
    for (const col of requested) {
        if (col && allowed.has(col)) seen.add(col as RoleColumn)
    }
    if (seen.size === 0) return [...DEFAULT_ROLE_COLUMNS]
    return SUPPORTED_ROLE_COLUMNS.filter((col) => seen.has(col))
}

function roleDisplayName(role: EnterpriseRole): string {
    return (role.displayName || '').trim() || String(role.role_id)
}

function tokenize(text: string): string[] {
    return text.split(TOKEN_SEPARATOR_PATTERN).filter((t) => t.length > 0)
}

function rowMatchesPattern(row: ListRoleRow, pattern: string): boolean {
    const lower = pattern.toLowerCase()
    const tokens: string[] = [String(row.role_id), ...tokenize(row.name.toLowerCase())]
    if (row.node) tokens.push(...tokenize(row.node.toLowerCase()))
    if (row.user_count != null) tokens.push(String(row.user_count))
    if (row.team_count != null) tokens.push(String(row.team_count))
    for (const list of [row.users, row.teams]) {
        if (!list) continue
        for (const v of list) tokens.push(...tokenize(v.toLowerCase()))
    }
    return tokens.some((t) => t.includes(lower))
}

function buildNodePathLookup(nodes: EnterpriseNode[]): Map<number, string> {
    return new Map(
        nodes.map((node) => [
            node.node_id,
            EnterpriseDataManager.getNodePath(nodes, node.node_id, { separator: NODE_PATH_SEPARATOR }),
        ])
    )
}

function buildAdminRoleIds(privileges: EnterpriseRolePrivilegeLink[]): Set<number> {
    const set = new Set<number>()
    for (const p of privileges) set.add(p.role_id)
    return set
}

function buildRoleUserMap(links: EnterpriseRoleUserLink[]): Map<number, Set<number>> {
    const map = new Map<number, Set<number>>()
    for (const link of links) {
        const set = map.get(link.role_id)
        if (set) set.add(link.enterprise_user_id)
        else map.set(link.role_id, new Set([link.enterprise_user_id]))
    }
    return map
}

function buildRoleTeamMap(links: EnterpriseRoleTeamLink[]): Map<number, Set<string>> {
    const map = new Map<number, Set<string>>()
    for (const link of links) {
        const set = map.get(link.role_id)
        if (set) set.add(link.team_uid)
        else map.set(link.role_id, new Set([link.team_uid]))
    }
    return map
}

function buildUsernameMap(users: EnterpriseUser[]): Map<number, string> {
    const map = new Map<number, string>()
    for (const user of users) {
        if (isNumber(user.enterprise_user_id) && user.username) {
            map.set(user.enterprise_user_id, user.username)
        }
    }
    return map
}

function buildTeamNameMap(teams: EnterpriseTeamRecord[]): Map<string, string> {
    const map = new Map<string, string>()
    for (const team of teams) {
        if (team.team_uid) map.set(team.team_uid, (team.name || team.team_uid).trim())
    }
    return map
}

function resolveSortedNames<K>(ids: Set<K>, nameById: Map<K, string>): string[] {
    const result: string[] = []
    for (const id of ids) {
        const name = nameById.get(id)
        if (name) result.push(name)
    }
    return result.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
}

function decorateRow(
    role: EnterpriseRole,
    columns: readonly RoleColumn[],
    context: DecorateContext
): ListRoleRow {
    const row: ListRoleRow = { role_id: role.role_id, name: roleDisplayName(role) }

    for (const col of columns) {
        switch (col) {
            case RoleColumn.VisibleBelow:
                row.visible_below = role.visible_below ?? false
                break
            case RoleColumn.DefaultRole:
                row.default_role = role.new_user_inherit ?? false
                break
            case RoleColumn.Admin:
                row.admin = context.adminRoleIds.has(role.role_id)
                break
            case RoleColumn.Node:
                row.node = context.nodePaths.get(role.node_id ?? 0) ?? ''
                break
            case RoleColumn.UserCount:
                row.user_count = context.roleUsers.get(role.role_id)?.size ?? 0
                break
            case RoleColumn.Users: {
                const ids = context.roleUsers.get(role.role_id)
                row.users = ids ? resolveSortedNames(ids, context.usernameById) : []
                break
            }
            case RoleColumn.TeamCount:
                row.team_count = context.roleTeams.get(role.role_id)?.size ?? 0
                break
            case RoleColumn.Teams: {
                const uids = context.roleTeams.get(role.role_id)
                row.teams = uids ? resolveSortedNames(uids, context.teamNameById) : []
                break
            }
        }
    }
    return row
}

function formatListCell(values: string[] | undefined): string {
    return values?.length ? values.join('\n') : ''
}

function formatCell(row: ListRoleRow, col: RoleColumn): string {
    switch (col) {
        case RoleColumn.VisibleBelow:
            return row.visible_below == null ? '' : row.visible_below ? 'Yes' : 'No'
        case RoleColumn.DefaultRole:
            return row.default_role == null ? '' : row.default_role ? 'Yes' : 'No'
        case RoleColumn.Admin:
            return row.admin == null ? '' : row.admin ? 'Yes' : 'No'
        case RoleColumn.Node:
            return row.node ?? ''
        case RoleColumn.UserCount:
            return row.user_count == null ? '' : String(row.user_count)
        case RoleColumn.Users:
            return formatListCell(row.users)
        case RoleColumn.TeamCount:
            return row.team_count == null ? '' : String(row.team_count)
        case RoleColumn.Teams:
            return formatListCell(row.teams)
    }
}

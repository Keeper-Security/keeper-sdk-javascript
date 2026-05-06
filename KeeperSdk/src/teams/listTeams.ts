import type { Auth } from '@keeper-security/keeperapi'
import { isNumber, TOKEN_SEPARATOR_PATTERN } from '../utils'
import {
    EnterpriseDataInclude,
    getEnterpriseData,
    getEnterpriseDisplayNames,
    getNodePath,
    type DecryptedRoleNames,
    type EnterpriseDisplayNames,
    type EnterpriseNode,
    type EnterpriseRole,
    type EnterpriseTeamRecord,
    type EnterpriseTeamUserLink,
    type EnterpriseUser,
    type GetEnterpriseDataResponse,
} from './enterpriseData'

export enum TeamColumn {
    Restricts = 'restricts',
    Node = 'node',
    UserCount = 'user_count',
    Users = 'users',
    RoleCount = 'role_count',
    Roles = 'roles',
}

export type TeamColumnInput = TeamColumn | `${TeamColumn}`

export const SUPPORTED_TEAM_COLUMNS: readonly TeamColumn[] = Object.values(TeamColumn)

export const DEFAULT_TEAM_COLUMNS: readonly TeamColumn[] = [
    TeamColumn.Restricts,
    TeamColumn.Node,
    TeamColumn.UserCount,
    TeamColumn.RoleCount,
]

const NODE_PATH_SEPARATOR = '\\'
const DEFAULT_COLUMN_WIDTH = 40
const MIN_TRUNCATE_PREFIX = 3
const MIN_ASCII_COL_WIDTH = 2
const ALL_COLUMNS_WILDCARD = '*'

const HEADER_BY_COLUMN: Record<TeamColumn, string> = {
    [TeamColumn.Restricts]: 'Restricts',
    [TeamColumn.Node]: 'Node',
    [TeamColumn.UserCount]: 'User Count',
    [TeamColumn.Users]: 'Users',
    [TeamColumn.RoleCount]: 'Role Count',
    [TeamColumn.Roles]: 'Roles',
}

export type ListTeamsOptions = {
    pattern?: string | null
    columns?: TeamColumnInput[] | typeof ALL_COLUMNS_WILDCARD | string | null
}

export type ListTeamRow = {
    team_uid: string
    name: string
    restricts?: string
    node?: string
    user_count?: number
    users?: string[]
    role_count?: number
    roles?: string[]
}

export type FormattedTeamsTable = {
    headers: string[]
    rows: string[][]
}

export type FormatTeamsTableOptions = {
    verbose?: boolean
    columnWidth?: number
    columns?: ListTeamsOptions['columns']
}

type DecorateContext = {
    nodePaths: Map<number, string>
    teamUsers: Map<string, Set<number>>
    roleTeams: Map<string, Set<number>>
    usernameById: Map<number, string>
    roleNameById: Map<number, string>
}

export function formatTeamRestricts(team: EnterpriseTeamRecord): string {
    const r = team.restrict_view === true ? 'R ' : '  '
    const w = team.restrict_edit === true ? 'W ' : '  '
    const restrictShare = team.restrict_share === true || team.restrict_sharing === true
    const s = restrictShare ? 'S' : ' '
    return r + w + s
}

export async function listTeams(auth: Auth, options: ListTeamsOptions = {}): Promise<ListTeamRow[]> {
    const columns = resolveColumns(options.columns)
    const includes = includesForColumns(columns)
    const wantsDisplayNames = columns.includes(TeamColumn.Node) || columns.includes(TeamColumn.Roles)

    const emptyDisplayNames: EnterpriseDisplayNames = { nodes: new Map(), roles: new Map() }
    const [response, displayNames] = await Promise.all([
        getEnterpriseData(auth, includes),
        wantsDisplayNames ? getEnterpriseDisplayNames(auth) : Promise.resolve(emptyDisplayNames),
    ])

    const teams = response.teams || []
    const nodes = response.nodes || []
    applyDecryptedNodeNames(nodes, displayNames.nodes)

    const context: DecorateContext = {
        nodePaths: buildNodePathLookup(nodes),
        teamUsers: buildTeamUserMap(response.team_users || []),
        roleTeams: buildRoleTeamMap(response),
        usernameById: buildUserUsernameMap(response.users || []),
        roleNameById: buildRoleNameMap(response.roles || [], displayNames.roles),
    }

    const pattern = options.pattern?.trim() || null
    const rows: ListTeamRow[] = []
    for (const team of teams) {
        const row: ListTeamRow = {
            team_uid: team.team_uid,
            name: teamDisplayName(team),
        }
        decorateRow(row, team, columns, context)
        if (pattern && !rowMatchesPattern(row, pattern)) continue
        rows.push(row)
    }

    rows.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
    return rows
}

export function formatTeamsTable(
    rows: ListTeamRow[],
    options: FormatTeamsTableOptions = {}
): FormattedTeamsTable {
    const { verbose = false, columnWidth = DEFAULT_COLUMN_WIDTH } = options
    const maxWidth = verbose ? null : columnWidth
    const columns = resolveColumns(options.columns)
    const headers: string[] = ['#', 'Team UID', 'Name', ...columns.map((column) => HEADER_BY_COLUMN[column])]

    const outRows: string[][] = rows.map((row, rowIndex) => {
        const uid = maxWidth == null ? row.team_uid : truncateText(row.team_uid, maxWidth)
        const name = maxWidth == null ? row.name : truncateText(row.name, maxWidth)
        const cells: string[] = [String(rowIndex + 1), uid, name]
        for (const column of columns) cells.push(formatCell(row, column, maxWidth))
        return cells
    })

    return { headers, rows: outRows }
}

export function renderTeamsAsciiTable(
    table: FormattedTeamsTable,
    options: { minColWidth?: number } = {}
): string {
    const { minColWidth = MIN_ASCII_COL_WIDTH } = options
    const { headers, rows } = table
    const columnCount = headers.length

    const expandedRows: string[][][] = rows.map((row) =>
        row.map((cell) => (cell.includes('\n') ? cell.split('\n') : [cell]))
    )

    const columnWidths = new Array<number>(columnCount).fill(0)
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
        columnWidths[columnIndex] = Math.max(headers[columnIndex].length, minColWidth)
    }
    for (const row of expandedRows) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
            for (const line of row[columnIndex]) {
                columnWidths[columnIndex] = Math.max(columnWidths[columnIndex], line.length, minColWidth)
            }
        }
    }

    const padCell = (cell: string, columnIndex: number): string =>
        cell + ' '.repeat(columnWidths[columnIndex] - cell.length)
    const formatPhysicalRow = (cells: string[]): string =>
        cells.map((cell, columnIndex) => padCell(cell, columnIndex)).join('  ')

    const ruleRow = formatPhysicalRow(columnWidths.map((width) => '-'.repeat(width)))
    const lines: string[] = [formatPhysicalRow(headers), ruleRow]

    for (const row of expandedRows) {
        const physicalLineCount = Math.max(...row.map((cell) => cell.length))
        for (let lineIndex = 0; lineIndex < physicalLineCount; lineIndex += 1) {
            const physicalCells: string[] = row.map((cell) => cell[lineIndex] ?? '')
            lines.push(formatPhysicalRow(physicalCells))
        }
    }
    return lines.join('\n')
}

function includesForColumns(columns: readonly TeamColumn[]): EnterpriseDataInclude[] {
    const set = new Set<EnterpriseDataInclude>([EnterpriseDataInclude.Teams])
    for (const column of columns) {
        switch (column) {
            case TeamColumn.Node:
                set.add(EnterpriseDataInclude.Nodes)
                break
            case TeamColumn.UserCount:
            case TeamColumn.Users:
                set.add(EnterpriseDataInclude.TeamUsers)
                if (column === TeamColumn.Users) set.add(EnterpriseDataInclude.Users)
                break
            case TeamColumn.RoleCount:
            case TeamColumn.Roles:
                set.add(EnterpriseDataInclude.RoleTeams)
                if (column === TeamColumn.Roles) set.add(EnterpriseDataInclude.Roles)
                break
        }
    }
    return Array.from(set)
}

function resolveColumns(input: ListTeamsOptions['columns']): TeamColumn[] {
    if (input == null) return [...DEFAULT_TEAM_COLUMNS]
    if (input === ALL_COLUMNS_WILDCARD) return [...SUPPORTED_TEAM_COLUMNS]

    const requested = Array.isArray(input) ? input : input.split(',').map((part) => part.trim())
    const allowed = new Set<string>(SUPPORTED_TEAM_COLUMNS)
    const seen = new Set<TeamColumn>()
    for (const column of requested) {
        if (column && allowed.has(column)) seen.add(column as TeamColumn)
    }
    if (seen.size === 0) return [...DEFAULT_TEAM_COLUMNS]
    return SUPPORTED_TEAM_COLUMNS.filter((column) => seen.has(column))
}

function teamDisplayName(team: { name?: string; team_uid: string }): string {
    return (team.name || team.team_uid || '').trim() || team.team_uid
}

function tokenize(text: string): string[] {
    return text.split(TOKEN_SEPARATOR_PATTERN).filter((token) => token.length > 0)
}

function rowMatchesPattern(row: ListTeamRow, pattern: string): boolean {
    const lowered = pattern.toLowerCase()
    const tokens: string[] = []
    tokens.push(row.team_uid.toLowerCase())
    tokens.push(...tokenize(row.name.toLowerCase()))
    if (row.restricts) tokens.push(row.restricts.toLowerCase())
    if (row.node) tokens.push(...tokenize(row.node.toLowerCase()))
    if (row.user_count != null) tokens.push(String(row.user_count))
    if (row.role_count != null) tokens.push(String(row.role_count))
    for (const list of [row.users, row.roles]) {
        if (!list) continue
        for (const value of list) tokens.push(...tokenize(value.toLowerCase()))
    }
    return tokens.some((token) => token.includes(lowered))
}

function applyDecryptedNodeNames(nodes: EnterpriseNode[], decrypted: Map<number, string>): void {
    if (decrypted.size === 0) return
    for (const node of nodes) {
        const display = decrypted.get(node.node_id)
        if (display) node.displayName = display
    }
}

function buildNodePathLookup(nodes: EnterpriseNode[]): Map<number, string> {
    return new Map(
        nodes.map((node) => [node.node_id, getNodePath(nodes, node.node_id, { separator: NODE_PATH_SEPARATOR })])
    )
}

function buildTeamUserMap(links: EnterpriseTeamUserLink[]): Map<string, Set<number>> {
    const byTeam = new Map<string, Set<number>>()
    for (const link of links) {
        if (!link.team_uid) continue
        const set = byTeam.get(link.team_uid)
        if (set) set.add(link.enterprise_user_id)
        else byTeam.set(link.team_uid, new Set([link.enterprise_user_id]))
    }
    return byTeam
}

function buildRoleTeamMap(response: GetEnterpriseDataResponse): Map<string, Set<number>> {
    const map = new Map<string, Set<number>>()
    for (const link of response.role_teams || []) {
        if (!link.team_uid) continue
        const set = map.get(link.team_uid)
        if (set) set.add(link.role_id)
        else map.set(link.team_uid, new Set([link.role_id]))
    }
    return map
}

function buildUserUsernameMap(users: EnterpriseUser[]): Map<number, string> {
    const map = new Map<number, string>()
    for (const user of users) {
        if (isNumber(user.enterprise_user_id ) && user.username) {
            map.set(user.enterprise_user_id, user.username)
        }
    }
    return map
}

function buildRoleNameMap(roles: EnterpriseRole[], decrypted: DecryptedRoleNames): Map<number, string> {
    const map = new Map<number, string>()
    for (const role of roles) {
        if (isNumber(role.role_id)) continue
        const display = (role.displayName || decrypted.get(role.role_id) || '').trim()
        map.set(role.role_id, display || String(role.role_id))
    }
    return map
}

function resolveSortedNames(ids: Set<number>, nameById: Map<number, string>): string[] {
    const result: string[] = []
    for (const id of ids) {
        const name = nameById.get(id)
        if (name) result.push(name)
    }
    result.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    return result
}

function decorateRow(
    row: ListTeamRow,
    team: EnterpriseTeamRecord,
    columns: readonly TeamColumn[],
    context: DecorateContext
): void {
    const { nodePaths, teamUsers, roleTeams, usernameById, roleNameById } = context

    for (const column of columns) {
        switch (column) {
            case TeamColumn.Restricts:
                row.restricts = formatTeamRestricts(team)
                break
            case TeamColumn.Node:
                row.node = nodePaths.get(team.node_id) || ''
                break
            case TeamColumn.UserCount:
                row.user_count = teamUsers.get(team.team_uid)?.size ?? 0
                break
            case TeamColumn.Users: {
                const ids = teamUsers.get(team.team_uid)
                row.users = ids ? resolveSortedNames(ids, usernameById) : []
                break
            }
            case TeamColumn.RoleCount:
                row.role_count = roleTeams.get(team.team_uid)?.size ?? 0
                break
            case TeamColumn.Roles: {
                const ids = roleTeams.get(team.team_uid)
                row.roles = ids ? resolveSortedNames(ids, roleNameById) : []
                break
            }
        }
    }
}

function truncateText(text: string, maxLength: number): string {
    if (!text) return ''
    if (text.length <= maxLength) return text
    if (maxLength <= MIN_TRUNCATE_PREFIX) return text.slice(0, maxLength)
    return `${text.slice(0, maxLength - MIN_TRUNCATE_PREFIX)}...`
}

function formatListCell(values: string[] | undefined, maxWidth: number | null): string {
    if (!values || values.length === 0) return ''
    if (maxWidth == null) return values.join('\n')
    return values.map((value) => truncateText(value, maxWidth)).join('\n')
}

function formatCell(row: ListTeamRow, column: TeamColumn, maxWidth: number | null): string {
    switch (column) {
        case TeamColumn.Restricts:
            return row.restricts ?? ''
        case TeamColumn.Node:
            return row.node ?? ''
        case TeamColumn.UserCount:
            return row.user_count == null ? '' : String(row.user_count)
        case TeamColumn.Users:
            return formatListCell(row.users, maxWidth)
        case TeamColumn.RoleCount:
            return row.role_count == null ? '' : String(row.role_count)
        case TeamColumn.Roles:
            return formatListCell(row.roles, maxWidth)
    }
}

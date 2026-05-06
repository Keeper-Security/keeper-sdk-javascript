import type { Auth } from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    getEnterpriseData,
    getEnterpriseDisplayNames,
    getNodePath,
    type EnterpriseDisplayNames,
    type EnterpriseRoleTeamLink,
    type EnterpriseTeamRecord,
    type EnterpriseTeamUserLink,
    type EnterpriseUser,
} from './enterpriseData'

const NODE_PATH_SEPARATOR = '\\'
const VIEW_TEAM_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Teams,
    EnterpriseDataInclude.TeamUsers,
    EnterpriseDataInclude.RoleTeams,
    EnterpriseDataInclude.Roles,
    EnterpriseDataInclude.Users,
    EnterpriseDataInclude.Nodes,
]

export type TeamRoleInfo = {
    role_id: number
    role_name: string
}

export type TeamUserInfo = {
    enterprise_user_id: number
    username: string
}

export type TeamView = {
    team_uid: string
    team_name: string
    node_id: number
    node_name: string
    restrict_view: boolean
    restrict_edit: boolean
    restrict_share: boolean
    team_roles?: TeamRoleInfo[]
    team_users?: TeamUserInfo[]
}

export type FormatTeamViewOptions = {
    verbose?: boolean
}   

export type TeamViewTableRow = {
    label: string
    value: string | string[]
    id?: number | number[]
}

export type FormattedTeamViewTable = {
    rows: TeamViewTableRow[]
    hasIdColumn: boolean
}

export async function viewTeam(auth: Auth, identifier: string): Promise<TeamView> {
    const [response, displayNames] = await Promise.all([
        getEnterpriseData(auth, VIEW_TEAM_INCLUDES),
        getEnterpriseDisplayNames(auth),
    ])

    const team = resolveTeam(response.teams || [], identifier)
    const nodePath = resolveNodePath(response.nodes || [], displayNames, team.node_id)
    const teamUsers = buildTeamUsers(response.users || [], response.team_users || [], team.team_uid)
    const teamRoles = buildTeamRoles(response.role_teams || [], displayNames.roles, team.team_uid)

    const view: TeamView = {
        team_uid: team.team_uid,
        team_name: team.name,
        node_id: team.node_id,
        node_name: nodePath,
        restrict_view: team.restrict_view === true,
        restrict_edit: team.restrict_edit === true,
        restrict_share: team.restrict_share === true || team.restrict_sharing === true,
    }
    if (teamRoles.length > 0) view.team_roles = teamRoles
    if (teamUsers.length > 0) view.team_users = teamUsers
    return view
}

export function formatTeamView(view: TeamView, options: FormatTeamViewOptions = {}): FormattedTeamViewTable {
    const verbose = options.verbose === true
    const rows: TeamViewTableRow[] = [
        { label: 'Team UID', value: view.team_uid },
        { label: 'Team Name', value: view.team_name },
        {
            label: 'Node Name',
            value: view.node_name,
            id: verbose ? view.node_id : undefined,
        },
        { label: 'Restrict Edit', value: boolText(view.restrict_edit) },
        { label: 'Restrict Share', value: boolText(view.restrict_share) },
        { label: 'Restrict View', value: boolText(view.restrict_view) },
    ]

    if (view.team_roles && view.team_roles.length > 0) {
        rows.push({
            label: 'Role(s)',
            value: view.team_roles.map((role) => role.role_name),
            id: verbose ? view.team_roles.map((role) => role.role_id) : undefined,
        })
    }

    if (view.team_users && view.team_users.length > 0) {
        rows.push({
            label: 'User(s)',
            value: view.team_users.map((user) => user.username),
            id: verbose ? view.team_users.map((user) => user.enterprise_user_id) : undefined,
        })
    }

    return { rows, hasIdColumn: verbose }
}

export function teamViewTable(table: FormattedTeamViewTable): string {
    const labelWidth = table.rows.reduce((max, row) => Math.max(max, row.label.length), 0)
    const expandedRows = table.rows.map((row) => ({
        label: row.label,
        valueLines: asLines(row.value),
        idLines: table.hasIdColumn ? asIdLines(row.id) : [],
    }))

    const valueWidth = expandedRows.reduce(
        (max, row) => Math.max(max, ...row.valueLines.map((line) => line.length)),
        0
    )
    const idWidth = table.hasIdColumn
        ? expandedRows.reduce((max, row) => Math.max(max, ...row.idLines.map((line) => line.length)), 0)
        : 0

    const padRight = (text: string, width: number): string =>
        text + ' '.repeat(Math.max(0, width - text.length))
    const padLeft = (text: string, width: number): string =>
        ' '.repeat(Math.max(0, width - text.length)) + text

    const lines: string[] = []
    for (const row of expandedRows) {
        const lineCount = Math.max(row.valueLines.length, table.hasIdColumn ? row.idLines.length : 0, 1)
        for (let lineIndex = 0; lineIndex < lineCount; lineIndex += 1) {
            const isFirstLine = lineIndex === 0
            const labelCell = padLeft(isFirstLine ? row.label : '', labelWidth)
            const valueCell = padRight(row.valueLines[lineIndex] ?? '', valueWidth)
            const cells: string[] = [labelCell, valueCell]
            if (table.hasIdColumn) {
                const idCell = padRight(row.idLines[lineIndex] ?? '', idWidth)
                cells.push(idCell)
            }
            lines.push(cells.join('  ').trimEnd())
        }
    }
    return lines.join('\n')
}

function resolveTeam(teams: EnterpriseTeamRecord[], identifier: string): EnterpriseTeamRecord {
    const trimmed = (identifier ?? '').trim()
    if (!trimmed) {
        throw new KeeperSdkError('Team name or UID is required.', ResultCodes.TEAM_REQUIRED)
    }

    const uidMatch = teams.find((team) => team.team_uid === trimmed)
    if (uidMatch) return uidMatch

    const lowered = trimmed.toLowerCase()
    const nameMatches = teams.filter((team) => (team.name || '').trim().toLowerCase() === lowered)
    if (nameMatches.length === 1) return nameMatches[0]
    if (nameMatches.length > 1) {
        throw new KeeperSdkError(
            `Multiple teams match name "${trimmed}". Specify the team UID instead.`,
            ResultCodes.MULTIPLE_TEAM_MATCHES
        )
    }
    throw new KeeperSdkError(`Team "${trimmed}" does not exist.`, ResultCodes.TEAM_NOT_FOUND)
}

function resolveNodePath(
    nodes: Parameters<typeof getNodePath>[0],
    displayNames: EnterpriseDisplayNames,
    nodeId: number
): string {
    if (displayNames.nodes.size > 0) {
        for (const node of nodes) {
            const display = displayNames.nodes.get(node.node_id)
            if (display) node.displayName = display
        }
    }
    return getNodePath(nodes, nodeId, { omitRoot: false, separator: NODE_PATH_SEPARATOR })
}

function buildTeamUsers(
    users: EnterpriseUser[],
    teamUserLinks: EnterpriseTeamUserLink[],
    teamUid: string
): TeamUserInfo[] {
    const userById = new Map<number, EnterpriseUser>()
    for (const user of users) userById.set(user.enterprise_user_id, user)

    const memberIds = new Set<number>()
    for (const link of teamUserLinks) {
        if (link.team_uid === teamUid) memberIds.add(link.enterprise_user_id)
    }

    const result: TeamUserInfo[] = []
    for (const id of memberIds) {
        const user = userById.get(id)
        if (user && user.username) result.push({ enterprise_user_id: id, username: user.username })
    }
    result.sort((a, b) => a.username.localeCompare(b.username, undefined, { sensitivity: 'base' }))
    return result
}

function buildTeamRoles(
    roleTeamLinks: EnterpriseRoleTeamLink[],
    decryptedRoleNames: Map<number, string>,
    teamUid: string
): TeamRoleInfo[] {
    const roleIds = new Set<number>()
    for (const link of roleTeamLinks) {
        if (link.team_uid === teamUid) roleIds.add(link.role_id)
    }

    const result: TeamRoleInfo[] = []
    for (const id of roleIds) {
        result.push({ role_id: id, role_name: decryptedRoleNames.get(id) || String(id) })
    }
    result.sort((a, b) => a.role_name.localeCompare(b.role_name, undefined, { sensitivity: 'base' }))
    return result
}

function boolText(value: boolean): string {
    return value ? 'True' : 'False'
}

function asLines(value: string | string[]): string[] {
    if (Array.isArray(value)) return value.length > 0 ? value : ['']
    return [value]
}

function asIdLines(id: number | number[] | undefined): string[] {
    if (id == null) return []
    if (Array.isArray(id)) return id.length > 0 ? id.map(String) : ['']
    return [String(id)]
}

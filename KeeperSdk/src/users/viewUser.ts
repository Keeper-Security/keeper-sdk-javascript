import { Enterprise, type Auth } from '@keeper-security/keeperapi'
import { extractErrorMessage, isNumber, KeeperSdkError, ResultCodes, logger } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseQueuedTeamRecord,
    type EnterpriseQueuedTeamUserLink,
    type EnterpriseRoleUserLink,
    type EnterpriseTeamRecord,
    type EnterpriseTeamUserLink,
    type EnterpriseUser,
    type EnterpriseUserAliasLink,
} from '../teams/enterpriseData'
import {
    formatTransferStatus,
    formatUserStatus,
    type FormattedUserViewTable,
    type FormatUserViewOptions,
    type UserRoleInfo,
    type UserTeamInfo,
    type UserView,
    type UserViewTableRow,
} from './userTypes'

const NODE_PATH_SEPARATOR = '\\'

const VIEW_USER_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Users,
    EnterpriseDataInclude.Nodes,
    EnterpriseDataInclude.Teams,
    EnterpriseDataInclude.TeamUsers,
    EnterpriseDataInclude.QueuedTeamUsers,
    EnterpriseDataInclude.QueuedTeams,
    EnterpriseDataInclude.RoleUsers,
    EnterpriseDataInclude.Roles,
    EnterpriseDataInclude.UserAliases,
]

export async function viewUser(auth: Auth, identifier: string): Promise<UserView> {
    const enterpriseData = new EnterpriseDataManager(auth)
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData(VIEW_USER_INCLUDES),
        enterpriseData.getDisplayNames(),
    ])

    const user = resolveUser(response.users || [], identifier)

    const nodes = response.nodes || []
    for (const node of nodes) {
        const display = displayNames.nodes.get(node.node_id)
        if (display) node.displayName = display
    }
    const nodeName = EnterpriseDataManager.getNodePath(nodes, user.node_id ?? 0, {
        omitRoot: false,
        separator: NODE_PATH_SEPARATOR,
    })

    const view: UserView = {
        enterprise_user_id: user.enterprise_user_id,
        username: user.username,
        node_id: user.node_id ?? 0,
        node_name: nodeName,
        full_name: (user.full_name || '').trim(),
        status: formatUserStatus(user),
        tfa_enabled: user.tfa_enabled ?? false,
        transfer_status: formatTransferStatus(user),
    }

    const aliases = buildAliases(response.user_aliases || [], user)
    if (aliases.length > 0) view.aliases = aliases

    const teams = buildUserTeams(response.team_users || [], response.teams || [], user.enterprise_user_id)
    if (teams.length > 0) view.teams = teams

    const queuedTeams = buildUserQueuedTeams(
        response.queued_team_users || [],
        response.teams || [],
        response.queued_teams || [],
        user.enterprise_user_id
    )
    if (queuedTeams.length > 0) view.queued_teams = queuedTeams

    const roles = buildUserRoles(response.role_users || [], displayNames.roles, user.enterprise_user_id)
    if (roles.length > 0) view.roles = roles

    const shareAdmins = await fetchShareAdmins(auth, user.username)
    if (shareAdmins.length > 0) view.share_admins = shareAdmins

    return view
}

export function formatUserView(view: UserView, options: FormatUserViewOptions = {}): FormattedUserViewTable {
    const verbose = options.verbose === true

    const rows: UserViewTableRow[] = [
        { label: 'User ID', value: String(view.enterprise_user_id) },
        { label: 'Email', value: view.username },
        { label: 'Full Name', value: view.full_name },
        { label: 'Node Name', value: view.node_name, id: verbose ? String(view.node_id) : undefined },
        { label: 'Status', value: view.status },
        { label: 'Transfer Status', value: view.transfer_status },
        { label: '2FA Enabled', value: String(view.tfa_enabled) },
    ]

    if (view.aliases && view.aliases.length > 0) {
        rows.push({ label: 'Email Alias(es)', value: view.aliases })
    }
    if (view.teams && view.teams.length > 0) {
        rows.push({
            label: 'Team(s)',
            value: view.teams.map((t) => t.name),
            id: verbose ? view.teams.map((t) => t.team_uid) : undefined,
        })
    }
    if (view.queued_teams && view.queued_teams.length > 0) {
        rows.push({
            label: 'Queued Team(s)',
            value: view.queued_teams.map((t) => t.name),
            id: verbose ? view.queued_teams.map((t) => t.team_uid) : undefined,
        })
    }
    if (view.roles && view.roles.length > 0) {
        rows.push({
            label: 'Role(s)',
            value: view.roles.map((r) => r.role_name),
            id: verbose ? view.roles.map((r) => String(r.role_id)) : undefined,
        })
    }
    if (view.share_admins && view.share_admins.length > 0) {
        rows.push({ label: 'Share Admin(s)', value: view.share_admins })
    }

    return { rows, hasIdColumn: verbose }
}

export function userViewTable(table: FormattedUserViewTable): string {
    const labelWidth = table.rows.reduce((max, row) => Math.max(max, row.label.length), 0)

    const expandedRows = table.rows.map((row) => ({
        label: row.label,
        valueLines: asLines(row.value),
        idLines: table.hasIdColumn ? asLines(row.id ?? []) : [],
    }))

    const valueWidth = expandedRows.reduce(
        (max, row) => Math.max(max, ...row.valueLines.map((l) => l.length)),
        0
    )
    const idWidth = table.hasIdColumn
        ? expandedRows.reduce((max, row) => Math.max(max, ...row.idLines.map((l) => l.length)), 0)
        : 0

    const padLeft = (text: string, width: number): string =>
        ' '.repeat(Math.max(0, width - text.length)) + text
    const padRight = (text: string, width: number): string =>
        text + ' '.repeat(Math.max(0, width - text.length))

    const lines: string[] = []
    for (const row of expandedRows) {
        const lineCount = Math.max(row.valueLines.length, table.hasIdColumn ? row.idLines.length : 0, 1)
        for (let li = 0; li < lineCount; li += 1) {
            const labelCell = padLeft(li === 0 ? row.label : '', labelWidth)
            const valueCell = padRight(row.valueLines[li] ?? '', valueWidth)
            const cells: string[] = [labelCell, valueCell]
            if (table.hasIdColumn) cells.push(padRight(row.idLines[li] ?? '', idWidth))
            lines.push(cells.join('  ').trimEnd())
        }
    }
    return lines.join('\n')
}

function resolveUser(users: EnterpriseUser[], identifier: string): EnterpriseUser {
    const trimmed = (identifier ?? '').trim()
    if (!trimmed) {
        throw new KeeperSdkError('User email or ID is required.', ResultCodes.USER_NOT_FOUND)
    }

    const numericId = Number(trimmed)
    if (Number.isFinite(numericId) && Number.isInteger(numericId)) {
        const byId = users.find((u) => u.enterprise_user_id === numericId)
        if (byId) return byId
    }

    const lowered = trimmed.toLowerCase()
    const byEmail = users.filter((u) => (u.username || '').toLowerCase() === lowered)
    if (byEmail.length === 1) return byEmail[0]
    if (byEmail.length > 1) {
        throw new KeeperSdkError(
            `Multiple users match "${trimmed}". Specify the enterprise user ID instead.`,
            ResultCodes.MULTIPLE_USER_MATCHES
        )
    }

    throw new KeeperSdkError(`User "${trimmed}" does not exist.`, ResultCodes.USER_NOT_FOUND)
}

function buildAliases(links: EnterpriseUserAliasLink[], user: EnterpriseUser): string[] {
    const primary = user.username.toLowerCase()
    return links
        .filter((l) => l.enterprise_user_id === user.enterprise_user_id && l.username.toLowerCase() !== primary)
        .map((l) => l.username)
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
}

function buildUserTeams(
    teamUsers: EnterpriseTeamUserLink[],
    teams: EnterpriseTeamRecord[],
    userId: number
): UserTeamInfo[] {
    const teamByUid = new Map(teams.filter((t) => t.team_uid).map((t) => [t.team_uid, t]))

    return teamUsers
        .filter((link) => link.enterprise_user_id === userId)
        .flatMap((link) => {
            const team = teamByUid.get(link.team_uid)
            return team ? [{ team_uid: team.team_uid, name: team.name || team.team_uid }] : []
        })
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
}

function buildUserQueuedTeams(
    queuedTeamUsers: EnterpriseQueuedTeamUserLink[],
    teams: EnterpriseTeamRecord[],
    queuedTeams: EnterpriseQueuedTeamRecord[],
    userId: number
): UserTeamInfo[] {
    const teamByUid = new Map<string, string>()
    for (const t of teams) {
        if (t.team_uid) teamByUid.set(t.team_uid, t.name || t.team_uid)
    }
    for (const qt of queuedTeams) {
        if (qt.team_uid && !teamByUid.has(qt.team_uid)) teamByUid.set(qt.team_uid, qt.name || qt.team_uid)
    }

    return queuedTeamUsers
        .filter((link) => link.enterprise_user_id === userId)
        .flatMap((link) => {
            const name = teamByUid.get(link.team_uid)
            return name ? [{ team_uid: link.team_uid, name }] : []
        })
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
}

function buildUserRoles(
    roleUsers: EnterpriseRoleUserLink[],
    decryptedRoleNames: Map<number, string>,
    userId: number
): UserRoleInfo[] {
    return roleUsers
        .filter((link) => link.enterprise_user_id === userId && isNumber(link.role_id))
        .map((link) => ({
            role_id: link.role_id,
            role_name: decryptedRoleNames.get(link.role_id) || String(link.role_id),
        }))
        .sort((a, b) => a.role_name.localeCompare(b.role_name, undefined, { sensitivity: 'base' }))
}

async function fetchShareAdmins(auth: Auth, username: string): Promise<string[]> {
    try {
        const message = {
            path: 'enterprise/get_sharing_admins',
            toBytes(): Uint8Array {
                return Enterprise.GetSharingAdminsRequest.encode({ username }).finish()
            },
            fromBytes(data: Uint8Array): Enterprise.IGetSharingAdminsResponse {
                return Enterprise.GetSharingAdminsResponse.decode(data)
            },
        }
        const response = await auth.executeRest(message)
        return (response.userProfileExts || [])
            .map((ext) => ext.email || '')
            .filter((email) => email.length > 0)
            .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    } catch (err) {
        logger.debug(`get_sharing_admins failed for ${username}: ${extractErrorMessage(err)}`)
        return []
    }
}

function asLines(value: string | string[]): string[] {
    if (Array.isArray(value)) return value.length > 0 ? value : ['']
    return value.length > 0 ? [value] : ['']
}

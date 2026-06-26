import type { Auth } from '@keeper-security/keeperapi'
import { getAuditEventReportsCommand } from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import { actionUsers, UserAction } from '../users/actionUser'
import { deleteUsers } from '../users/deleteUser'
import {
    DeleteUserStatus,
    EnterpriseUserStatus,
    formatTransferStatus,
    formatUserStatus,
} from '../users/userTypes'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseNode,
    type EnterpriseRoleTeamLink,
    type EnterpriseRoleUserLink,
    type EnterpriseTeamUserLink,
    type EnterpriseUser,
    type EnterpriseUserAliasLink,
    type GetEnterpriseDataResponse,
} from '../teams/enterpriseData'
import {
    ACTION_COLUMN_LABELS,
    ACTION_DEFAULT_DAYS,
    ACTION_DEFAULT_DAYS_BY_TARGET,
    ACTION_EVENT_SUMMARY_ROW_LIMIT,
    ACTION_REPORT_COLUMN_ORDER,
    ACTION_STATUS_EVENT_TYPES,
    ACTION_USERNAME_BATCH_SIZE,
    ActionReportColumn,
    AdminAction,
    AuditOutputFormat,
    DEFAULT_ACTION_REPORT_COLUMNS,
    SECONDS_PER_DAY,
    SUPPORTED_ACTION_REPORT_COLUMNS,
    TargetUserStatus,
    type ActionReportEntry,
    type ActionReportOptions,
    type ActionReportResult,
    type ActionResult,
    type AuditReportFilterPayload,
    type FormatActionReportOptions,
    type FormattedActionReportTable,
} from './reportTypes'
import { assertSucceeded, chunkArray, formatReportOutput, resolveTimezone } from './reportUtils'

const ACTION_REPORT_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Nodes,
    EnterpriseDataInclude.Users,
    EnterpriseDataInclude.Teams,
    EnterpriseDataInclude.TeamUsers,
    EnterpriseDataInclude.Roles,
    EnterpriseDataInclude.RoleUsers,
    EnterpriseDataInclude.RoleTeams,
    EnterpriseDataInclude.UserAliases,
]

type AuditUsernameField = 'username' | 'to_username'

type TargetAuditConfig = {
    auditColumn: AuditUsernameField
    auditFilterField: AuditUsernameField
    pickCandidates: (users: EnterpriseUser[]) => EnterpriseUser[]
    identity: (user: EnterpriseUser) => string
}

const ALLOWED_ACTIONS: Readonly<Record<TargetUserStatus, ReadonlySet<AdminAction>>> = {
    [TargetUserStatus.NoLogon]: new Set([AdminAction.None, AdminAction.Lock]),
    [TargetUserStatus.NoUpdate]: new Set([AdminAction.None]),
    [TargetUserStatus.Locked]: new Set([AdminAction.None, AdminAction.Delete, AdminAction.Transfer]),
    [TargetUserStatus.Invited]: new Set([AdminAction.None, AdminAction.Delete]),
    [TargetUserStatus.NoRecovery]: new Set([AdminAction.None]),
}

function usernameTargetConfig(
    pickCandidates: (users: EnterpriseUser[]) => EnterpriseUser[]
): TargetAuditConfig {
    return {
        auditColumn: 'username',
        auditFilterField: 'username',
        pickCandidates,
        identity: (user) => user.username,
    }
}

const TARGET_AUDIT_CONFIG: Record<TargetUserStatus, TargetAuditConfig> = {
    [TargetUserStatus.NoLogon]: usernameTargetConfig((users) =>
        users.filter((user) => formatUserStatus(user) === 'Active')
    ),
    [TargetUserStatus.NoUpdate]: usernameTargetConfig((users) =>
        users.filter((user) => formatUserStatus(user) === 'Active')
    ),
    [TargetUserStatus.Locked]: {
        auditColumn: 'to_username',
        auditFilterField: 'to_username',
        pickCandidates: (users) => users.filter((user) => formatUserStatus(user) === 'Locked'),
        identity: (user) => user.username,
    },
    [TargetUserStatus.Invited]: usernameTargetConfig((users) =>
        users.filter((user) => user.status === EnterpriseUserStatus.Invited)
    ),
    [TargetUserStatus.NoRecovery]: usernameTargetConfig((users) =>
        users.filter((user) => formatUserStatus(user) === 'Active')
    ),
}

export async function runActionReport(
    auth: Auth,
    options: ActionReportOptions = {}
): Promise<ActionReportResult> {
    const target = options.target ?? TargetUserStatus.NoLogon
    const daysSince = options.daysSince ?? ACTION_DEFAULT_DAYS_BY_TARGET[target] ?? ACTION_DEFAULT_DAYS
    const applyAction = options.applyAction ?? AdminAction.None
    const outputFormat = options.outputFormat ?? AuditOutputFormat.Table

    validateActionReportOptions(target, applyAction, options.targetUser)

    const enterpriseData = new EnterpriseDataManager(auth)
    const data = await enterpriseData.getData(ACTION_REPORT_INCLUDES)
    await enterpriseData.decryptNodeNames(data.nodes || [])
    await enterpriseData.getDisplayNames()

    const entries = await generateActionReportEntries(auth, data, {
        target,
        daysSince,
        timezone: resolveTimezone(options.timezone),
        nodeIds: resolveNodeFilter(data.nodes || [], options.node),
    })

    const actionResult = await applyAdminAction(auth, entries, {
        applyAction,
        targetUser: options.targetUser,
        dryRun: options.dryRun === true,
    })

    const columns = resolveActionReportColumns(options.columns)
    const headers = columns.map((column) => ACTION_COLUMN_LABELS[column])
    const rows = entries.map((entry) => columns.map((column) => actionReportEntryCell(entry, column)))

    return {
        target,
        headers,
        rows,
        entries,
        formatted: formatReportOutput(headers, rows, outputFormat),
        actionResult,
    }
}

export function formatActionReportResult(
    result: ActionReportResult,
    _options: FormatActionReportOptions = {}
): FormattedActionReportTable {
    return { headers: result.headers, rows: result.rows }
}

export function renderActionReportTable(table: FormattedActionReportTable): string {
    return formatReportOutput(table.headers, table.rows, AuditOutputFormat.Table)
}

export function getAllowedActions(target: TargetUserStatus): AdminAction[] {
    return [...ALLOWED_ACTIONS[target]]
}

export function getDefaultDaysSince(target: TargetUserStatus): number {
    return ACTION_DEFAULT_DAYS_BY_TARGET[target] ?? ACTION_DEFAULT_DAYS
}

async function generateActionReportEntries(
    auth: Auth,
    data: GetEnterpriseDataResponse,
    options: {
        target: TargetUserStatus
        daysSince: number
        timezone: string
        nodeIds: Set<number> | null
    }
): Promise<ActionReportEntry[]> {
    const config = TARGET_AUDIT_CONFIG[options.target]
    let candidates = config.pickCandidates(data.users || [])

    if (options.nodeIds) {
        candidates = candidates.filter(
            (user) => user.node_id != null && options.nodeIds!.has(user.node_id)
        )
    }
    if (candidates.length === 0) return []

    const identities = candidates.map((user) => config.identity(user)).filter(Boolean)
    const recentlyActive = await queryUsersWithRecentEvents(
        auth,
        config,
        identities,
        ACTION_STATUS_EVENT_TYPES[options.target],
        options.daysSince,
        options.timezone
    )

    const context = buildActionEntryContext(data)
    return candidates
        .filter((user) => {
            const identity = config.identity(user).trim().toLowerCase()
            return identity && !recentlyActive.has(identity)
        })
        .map((user) => buildActionEntry(user, context))
}

async function queryUsersWithRecentEvents(
    auth: Auth,
    config: TargetAuditConfig,
    identities: string[],
    eventTypes: readonly string[],
    daysSince: number,
    timezone: string
): Promise<Set<string>> {
    const active = new Set<string>()
    const createdFilter: AuditReportFilterPayload['created'] = {
        min: Math.floor(Date.now() / 1000) - daysSince * SECONDS_PER_DAY,
    }

    for (const batch of chunkArray(identities, ACTION_USERNAME_BATCH_SIZE)) {
        const filter: AuditReportFilterPayload = {
            created: createdFilter,
            audit_event_type: [...eventTypes],
            [config.auditFilterField]: batch,
        }

        const response = await auth.executeRestCommand(
            getAuditEventReportsCommand({
                report_type: 'span',
                scope: 'enterprise',
                timezone,
                limit: ACTION_EVENT_SUMMARY_ROW_LIMIT,
                aggregate: ['last_created'],
                columns: [config.auditColumn],
                filter,
            })
        )
        assertSucceeded(response, 'get_audit_event_reports failed', ResultCodes.ACTION_REPORT_FAILED)

        for (const row of response.audit_event_overview_report_rows ?? []) {
            const value = (row as Record<string, unknown>)[config.auditColumn]
            if (value == null || value === '') continue
            active.add(String(value).trim().toLowerCase())
        }
    }

    return active
}

type ActionEntryContext = {
    nodePaths: Map<number, string>
    userTeams: Map<number, string[]>
    userRoles: Map<number, string[]>
    userAliases: Map<number, string[]>
}

function buildActionEntryContext(data: GetEnterpriseDataResponse): ActionEntryContext {
    const nodes = data.nodes || []
    const nodePaths = new Map(
        nodes.map((node) => [
            node.node_id,
            EnterpriseDataManager.getNodePath(nodes, node.node_id, { omitRoot: false }),
        ])
    )
    const teamNames = new Map((data.teams || []).map((team) => [team.team_uid, team.name]))
    const roleNames = new Map((data.roles || []).map((role) => [role.role_id, role.displayName || String(role.role_id)]))

    return {
        nodePaths,
        userTeams: buildUserTeamNames(data.team_users || [], teamNames),
        userRoles: buildUserRoleNames(data.role_users || [], data.role_teams || [], data.team_users || [], roleNames),
        userAliases: buildUserAliases(data.user_aliases || []),
    }
}

function buildActionEntry(user: EnterpriseUser, context: ActionEntryContext): ActionReportEntry {
    return {
        enterpriseUserId: user.enterprise_user_id,
        email: user.username,
        fullName: user.full_name || '',
        status: formatUserStatus(user),
        transferStatus: formatTransferStatus(user),
        nodePath: context.nodePaths.get(user.node_id || 0) || '',
        teams: context.userTeams.get(user.enterprise_user_id) || [],
        roles: context.userRoles.get(user.enterprise_user_id) || [],
        aliases: context.userAliases.get(user.enterprise_user_id) || [],
        tfaEnabled: user.tfa_enabled === true,
    }
}

function buildUserTeamNames(
    links: EnterpriseTeamUserLink[],
    teamNames: Map<string, string>
): Map<number, string[]> {
    const map = new Map<number, Set<string>>()
    for (const link of links) {
        if (!link.team_uid) continue
        const name = teamNames.get(link.team_uid) || link.team_uid
        const names = map.get(link.enterprise_user_id) ?? new Set<string>()
        names.add(name)
        map.set(link.enterprise_user_id, names)
    }
    return new Map([...map.entries()].map(([id, names]) => [id, [...names].sort()]))
}

function buildUserRoleNames(
    roleUsers: EnterpriseRoleUserLink[],
    roleTeams: EnterpriseRoleTeamLink[],
    teamUsers: EnterpriseTeamUserLink[],
    roleNames: Map<number, string>
): Map<number, string[]> {
    const map = new Map<number, Set<number>>()

    for (const link of roleUsers) {
        const roles = map.get(link.enterprise_user_id) ?? new Set<number>()
        roles.add(link.role_id)
        map.set(link.enterprise_user_id, roles)
    }

    const rolesForTeam = new Map<string, Set<number>>()
    for (const link of roleTeams) {
        if (!link.team_uid) continue
        const roles = rolesForTeam.get(link.team_uid) ?? new Set<number>()
        roles.add(link.role_id)
        rolesForTeam.set(link.team_uid, roles)
    }

    for (const link of teamUsers) {
        if (!link.team_uid) continue
        const teamRoles = rolesForTeam.get(link.team_uid)
        if (!teamRoles) continue
        const userRoles = map.get(link.enterprise_user_id) ?? new Set<number>()
        teamRoles.forEach((roleId) => userRoles.add(roleId))
        map.set(link.enterprise_user_id, userRoles)
    }

    return new Map(
        [...map.entries()].map(([id, roleIds]) => [
            id,
            [...roleIds].map((roleId) => roleNames.get(roleId) || String(roleId)).sort(),
        ])
    )
}

function buildUserAliases(links: EnterpriseUserAliasLink[]): Map<number, string[]> {
    const map = new Map<number, string[]>()
    for (const link of links) {
        if (!link.username) continue
        const aliases = map.get(link.enterprise_user_id)
        if (aliases) aliases.push(link.username)
        else map.set(link.enterprise_user_id, [link.username])
    }
    return map
}

async function applyAdminAction(
    auth: Auth,
    entries: ActionReportEntry[],
    options: { applyAction: AdminAction; targetUser?: string; dryRun: boolean }
): Promise<ActionResult> {
    const { applyAction, targetUser, dryRun } = options

    if (applyAction === AdminAction.None) {
        return { action: AdminAction.None, status: 'none', affectedCount: 0, serverMessage: 'n/a' }
    }
    if (entries.length === 0) {
        return { action: applyAction, status: 'no users matched', affectedCount: 0, serverMessage: 'n/a' }
    }
    if (dryRun) {
        return { action: applyAction, status: 'dry run', affectedCount: entries.length, serverMessage: 'n/a' }
    }

    const emails = entries.map((entry) => entry.email)

    try {
        switch (applyAction) {
            case AdminAction.Lock: {
                const result = await actionUsers(auth, { action: UserAction.Lock, emails })
                return {
                    action: AdminAction.Lock,
                    status: result.success ? 'success' : 'partial',
                    affectedCount: result.succeeded,
                    serverMessage: `Succeeded: ${result.succeeded}, Skipped: ${result.skipped}, Failed: ${result.failed}`,
                }
            }
            case AdminAction.Delete: {
                const result = await deleteUsers(auth, { emails })
                const deleted = result.items.filter((item) => item.status === DeleteUserStatus.Deleted).length
                return {
                    action: AdminAction.Delete,
                    status: result.success ? 'success' : 'partial',
                    affectedCount: deleted,
                    serverMessage: `Deleted: ${deleted}, Failed: ${result.failed}`,
                }
            }
            case AdminAction.Transfer: {
                if (!targetUser?.trim()) {
                    throw new KeeperSdkError(
                        '"targetUser" is required for transfer action.',
                        ResultCodes.ACTION_REPORT_TARGET_USER_REQUIRED
                    )
                }
                throw new KeeperSdkError(
                    'Account transfer is not yet supported in the JavaScript SDK.',
                    ResultCodes.ACTION_REPORT_TRANSFER_NOT_SUPPORTED
                )
            }
            default:
                return { action: applyAction, status: 'unsupported', affectedCount: 0, serverMessage: 'n/a' }
        }
    } catch (err) {
        return {
            action: applyAction,
            status: 'failed',
            affectedCount: 0,
            serverMessage: extractErrorMessage(err),
        }
    }
}

function validateActionReportOptions(
    target: TargetUserStatus,
    applyAction: AdminAction,
    targetUser: string | undefined
): void {
    if (!ALLOWED_ACTIONS[target].has(applyAction)) {
        throw new KeeperSdkError(
            `Action "${applyAction}" is not allowed for target "${target}".`,
            ResultCodes.ACTION_REPORT_INVALID_ACTION
        )
    }
    if (applyAction === AdminAction.Transfer && !targetUser?.trim()) {
        throw new KeeperSdkError(
            '"targetUser" is required when applyAction is "transfer".',
            ResultCodes.ACTION_REPORT_TARGET_USER_REQUIRED
        )
    }
}

function resolveNodeFilter(nodes: EnterpriseNode[], nodeFilter: string | undefined): Set<number> | null {
    if (!nodeFilter?.trim()) return null

    const trimmed = nodeFilter.trim()
    const numericId = Number(trimmed)
    let rootNode: EnterpriseNode | undefined

    if (Number.isInteger(numericId)) {
        rootNode = nodes.find((node) => node.node_id === numericId)
    }
    if (!rootNode) {
        const lowered = trimmed.toLowerCase()
        const matches = nodes.filter((node) => (node.displayName || '').trim().toLowerCase() === lowered)
        if (matches.length === 1) rootNode = matches[0]
        else if (matches.length > 1) {
            throw new KeeperSdkError(`Multiple nodes match "${trimmed}".`, ResultCodes.ACTION_REPORT_NODE_NOT_UNIQUE)
        }
    }
    if (!rootNode) {
        throw new KeeperSdkError(`Node "${trimmed}" was not found.`, ResultCodes.ACTION_REPORT_NODE_NOT_FOUND)
    }

    const children = new Map<number, number[]>()
    for (const node of nodes) {
        const parentId = node.parent_id || 0
        const siblings = children.get(parentId) ?? []
        siblings.push(node.node_id)
        children.set(parentId, siblings)
    }

    const allowed = new Set<number>([rootNode.node_id])
    const queue = [rootNode.node_id]
    while (queue.length > 0) {
        const current = queue.shift()!
        for (const childId of children.get(current) || []) {
            if (allowed.has(childId)) continue
            allowed.add(childId)
            queue.push(childId)
        }
    }

    return allowed
}

function resolveActionReportColumns(input: ActionReportOptions['columns']): ActionReportColumn[] {
    const defaultColumns: ActionReportColumn[] = [ActionReportColumn.UserId, ...DEFAULT_ACTION_REPORT_COLUMNS]
    if (input == null) return defaultColumns

    const requested =
        typeof input === 'string'
            ? input.split(',').map((part) => part.trim())
            : input.map((part) => String(part).trim())

    const allowed = new Set<string>(SUPPORTED_ACTION_REPORT_COLUMNS)
    const seen = new Set<ActionReportColumn>()
    for (const column of requested) {
        if (column && allowed.has(column)) seen.add(column as ActionReportColumn)
    }

    if (seen.size === 0) return defaultColumns

    seen.add(ActionReportColumn.UserId)
    return ACTION_REPORT_COLUMN_ORDER.filter((column) => seen.has(column))
}

function actionReportEntryCell(entry: ActionReportEntry, column: ActionReportColumn): string {
    switch (column) {
        case ActionReportColumn.UserId:
            return String(entry.enterpriseUserId)
        case ActionReportColumn.Email:
            return entry.email
        case ActionReportColumn.Name:
            return entry.fullName
        case ActionReportColumn.Status:
            return entry.status
        case ActionReportColumn.TransferStatus:
            return entry.transferStatus
        case ActionReportColumn.Node:
            return entry.nodePath
        case ActionReportColumn.TeamCount:
            return String(entry.teams.length)
        case ActionReportColumn.Teams:
            return entry.teams.join(', ')
        case ActionReportColumn.RoleCount:
            return String(entry.roles.length)
        case ActionReportColumn.Roles:
            return entry.roles.join(', ')
        case ActionReportColumn.Alias:
            return entry.aliases.join(', ')
        case ActionReportColumn.TwoFaEnabled:
            return entry.tfaEnabled ? 'true' : 'false'
    }
}

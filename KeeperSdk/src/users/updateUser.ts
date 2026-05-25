import {
    encryptObjectForStorage,
    type Auth,
    type KeeperResponse,
    type RestCommand,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, isNumber, KeeperSdkError, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseRole,
    type EnterpriseTeamRecord,
} from '../teams/enterpriseData'
import {
    applyDecryptedNodeNames,
    applyEnterpriseNameToRoot,
    parentNeedsNameLookup,
    resolveParentNode,
} from '../teams/teamUtils'
import {
    normalizeEmailInputs,
    resolveExistingUsers,
    UpdateUserStatus,
    type UpdateUserInput,
    type UpdateUserItemResult,
    type UpdateUserResult,
    type FormattedUpdateUserTable,
} from './userTypes'

export { UpdateUserStatus }
export type { UpdateUserInput, UpdateUserItemResult, UpdateUserResult, FormattedUpdateUserTable }

const USER_UPDATE_COMMAND = 'enterprise_user_update'
const TEAM_USER_REMOVE_COMMAND = 'team_enterprise_user_remove'
const ROLE_USER_REMOVE_COMMAND = 'role_user_remove'

const UPDATE_USER_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Nodes,
    EnterpriseDataInclude.Users,
    EnterpriseDataInclude.Teams,
    EnterpriseDataInclude.QueuedTeams,
    EnterpriseDataInclude.TeamUsers,
    EnterpriseDataInclude.QueuedTeamUsers,
    EnterpriseDataInclude.Roles,
    EnterpriseDataInclude.RoleUsers,
]

const USER_UPDATE_TABLE_HEADERS = ['#', 'Status', 'Email', 'User ID', 'Node ID', 'Detail']

type UserUpdatePayload = {
    enterprise_user_id: number
    enterprise_user_username: string
    node_id: number
    encrypted_data?: string
    full_name?: string
    job_title?: string
}

type TeamUserRemovePayload = {
    enterprise_user_id: number
    team_uid: string
}

type RoleUserRemovePayload = {
    role_id: number
    enterprise_user_id: number
}

export async function updateUsers(auth: Auth, input: UpdateUserInput): Promise<UpdateUserResult> {
    const rawEmails = normalizeEmailInputs(input.emails)

    if (rawEmails.length === 0) {
        throw new KeeperSdkError('No users provided for update.', ResultCodes.NO_USERS_TO_UPDATE)
    }

    const parentIdentifier = input.parent ?? null
    const needsNameLookup = parentNeedsNameLookup(parentIdentifier)
    const hasProfileChange = parentIdentifier !== null || !!input.fullName || !!input.jobTitle

    const enterpriseData = new EnterpriseDataManager(auth)
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData(UPDATE_USER_INCLUDES),
        enterpriseData.getDisplayNames(),
    ])

    const nodes = response.nodes || []
    applyEnterpriseNameToRoot(nodes, response.enterprise_name)

    if (needsNameLookup) {
        applyDecryptedNodeNames(nodes, displayNames.nodes)
        await enterpriseData.decryptNodeNames(nodes)
    }

    const resolvedUsers = resolveExistingUsers(response.users || [], rawEmails)

    const overrideNodeId: number | null =
        parentIdentifier !== null && parentIdentifier !== ''
            ? resolveParentNode(nodes, parentIdentifier).node_id
            : null

    const treeKey = hasProfileChange ? await enterpriseData.getTreeKey() : null
    if (hasProfileChange && !treeKey) {
        throw new KeeperSdkError(
            'Enterprise tree key is unavailable.',
            ResultCodes.ENTERPRISE_TREE_KEY_UNAVAILABLE
        )
    }

    const removeTeamUids = resolveTeamUids(input.removeTeam || [], response.teams || [], response.queued_teams || [])
    const removeRoleIds = resolveRoleIds(input.removeRole || [], response.roles || [], displayNames.roles)

    const fullName = (input.fullName || '').trim() || undefined
    const jobTitle = (input.jobTitle || '').trim() || undefined

    const items: UpdateUserItemResult[] = []

    for (const user of resolvedUsers) {
        const targetNodeId = overrideNodeId ?? (user.node_id ?? 0)

        try {
            if (hasProfileChange && treeKey !== null) {
                const encryptedData = fullName !== undefined
                    ? await encryptObjectForStorage({ displayname: fullName }, treeKey)
                    : undefined
                await sendUserUpdate(auth, {
                    enterprise_user_id: user.enterprise_user_id,
                    enterprise_user_username: user.username,
                    node_id: targetNodeId,
                    encrypted_data: encryptedData,
                    full_name: fullName,
                    job_title: jobTitle,
                })
            }

            for (const teamUid of removeTeamUids) {
                await sendTeamUserRemove(auth, user.enterprise_user_id, teamUid)
            }

            for (const roleId of removeRoleIds) {
                await sendRoleUserRemove(auth, roleId, user.enterprise_user_id)
            }

            items.push({
                username: user.username,
                enterpriseUserId: user.enterprise_user_id,
                nodeId: targetNodeId,
                status: UpdateUserStatus.Updated,
            })
        } catch (err) {
            items.push({
                username: user.username,
                enterpriseUserId: user.enterprise_user_id,
                nodeId: user.node_id ?? 0,
                status: UpdateUserStatus.Failed,
                message: extractErrorMessage(err),
            })
        }
    }

    return finalizeResult(items)
}

async function sendUserUpdate(auth: Auth, payload: UserUpdatePayload): Promise<void> {
    const command: RestCommand<UserUpdatePayload, KeeperResponse> = {
        baseRequest: { command: USER_UPDATE_COMMAND },
        request: payload,
        authorization: {},
    }
    const response = await auth.executeRestCommand(command)
    const result = (response.result || '').toLowerCase()
    if (result && result !== 'success') {
        throw new KeeperSdkError(
            response.message ||
                response.result_code ||
                `${USER_UPDATE_COMMAND} failed for "${payload.enterprise_user_username}"`,
            response.result_code || ResultCodes.USER_UPDATE_FAILED
        )
    }
}

async function sendTeamUserRemove(auth: Auth, enterpriseUserId: number, teamUid: string): Promise<void> {
    const command: RestCommand<TeamUserRemovePayload, KeeperResponse> = {
        baseRequest: { command: TEAM_USER_REMOVE_COMMAND },
        request: { enterprise_user_id: enterpriseUserId, team_uid: teamUid },
        authorization: {},
    }
    const response = await auth.executeRestCommand(command)
    const result = (response.result || '').toLowerCase()
    if (result && result !== 'success') {
        throw new KeeperSdkError(
            response.message ||
                response.result_code ||
                `${TEAM_USER_REMOVE_COMMAND} failed for user=${enterpriseUserId}, team=${teamUid}`,
            response.result_code || ResultCodes.USER_UPDATE_FAILED
        )
    }
}

async function sendRoleUserRemove(auth: Auth, roleId: number, enterpriseUserId: number): Promise<void> {
    const command: RestCommand<RoleUserRemovePayload, KeeperResponse> = {
        baseRequest: { command: ROLE_USER_REMOVE_COMMAND },
        request: { role_id: roleId, enterprise_user_id: enterpriseUserId },
        authorization: {},
    }
    const response = await auth.executeRestCommand(command)
    const result = (response.result || '').toLowerCase()
    if (result && result !== 'success') {
        throw new KeeperSdkError(
            response.message ||
                response.result_code ||
                `${ROLE_USER_REMOVE_COMMAND} failed for user=${enterpriseUserId}, role=${roleId}`,
            response.result_code || ResultCodes.USER_UPDATE_FAILED
        )
    }
}

function resolveTeamUids(
    identifiers: string[],
    teams: EnterpriseTeamRecord[],
    queuedTeams: EnterpriseTeamRecord[]
): string[] {
    if (identifiers.length === 0) return []

    const uidSet = new Set<string>()
    const byLowerName = new Map<string, string>()

    for (const t of teams) {
        if (t.team_uid) {
            uidSet.add(t.team_uid)
            const lower = (t.name || '').trim().toLowerCase()
            if (lower && !byLowerName.has(lower)) byLowerName.set(lower, t.team_uid)
        }
    }
    for (const t of queuedTeams) {
        if (t.team_uid) {
            uidSet.add(t.team_uid)
            const lower = (t.name || '').trim().toLowerCase()
            if (lower && !byLowerName.has(lower)) byLowerName.set(lower, t.team_uid)
        }
    }

    const seen = new Set<string>()
    const result: string[] = []
    for (const id of identifiers) {
        const trimmed = id.trim()
        const uid = (uidSet.has(trimmed) ? trimmed : undefined) ?? byLowerName.get(trimmed.toLowerCase())
        if (!uid) {
            throw new KeeperSdkError(`Team "${trimmed}" does not exist.`, ResultCodes.TEAM_NOT_FOUND)
        }
        if (!seen.has(uid)) {
            seen.add(uid)
            result.push(uid)
        }
    }
    return result
}

function resolveRoleIds(
    identifiers: string[],
    roles: EnterpriseRole[],
    decryptedRoleNames: Map<number, string>
): number[] {
    if (identifiers.length === 0) return []

    const idSet = new Set<number>()
    const byLowerName = new Map<string, number>()

    for (const r of roles) {
        if (!isNumber(r.role_id)) continue
        idSet.add(r.role_id)
        const lower = (decryptedRoleNames.get(r.role_id) || '').trim().toLowerCase()
        if (lower && !byLowerName.has(lower)) byLowerName.set(lower, r.role_id)
    }

    const seen = new Set<number>()
    const result: number[] = []
    for (const id of identifiers) {
        const trimmed = id.trim()
        const numericId = Number(trimmed)
        let roleId: number | undefined

        if (Number.isInteger(numericId)) roleId = idSet.has(numericId) ? numericId : undefined
        if (roleId === undefined) roleId = byLowerName.get(trimmed.toLowerCase())
        if (roleId === undefined) {
            throw new KeeperSdkError(`Role "${trimmed}" does not exist.`, ResultCodes.ROLE_NOT_FOUND)
        }
        if (!seen.has(roleId)) {
            seen.add(roleId)
            result.push(roleId)
        }
    }
    return result
}

function finalizeResult(items: UpdateUserItemResult[]): UpdateUserResult {
    let updated = 0, failed = 0
    for (const item of items) {
        if (item.status === UpdateUserStatus.Updated) updated++
        else failed++
    }
    return { success: failed === 0 && updated > 0, items, updated, failed }
}

export function formatUpdateUserResult(result: UpdateUserResult): FormattedUpdateUserTable {
    const rows = result.items.map((item, index) => [
        String(index + 1),
        item.status,
        item.username,
        String(item.enterpriseUserId),
        String(item.nodeId),
        item.message || '',
    ])
    return {
        headers: [...USER_UPDATE_TABLE_HEADERS],
        rows,
        summary: `Updated: ${result.updated}  Failed: ${result.failed}`,
    }
}

export function renderUpdateUserAsciiTable(table: FormattedUpdateUserTable): string {
    const { headers, rows } = table
    const widths = headers.map((header, index) =>
        Math.max(header.length, ...rows.map((row) => (row[index] || '').length))
    )
    const padCell = (cell: string, columnIndex: number): string =>
        cell + ' '.repeat(Math.max(0, widths[columnIndex] - cell.length))
    const formatRow = (cells: string[]): string =>
        cells.map((cell, columnIndex) => padCell(cell, columnIndex)).join('  ')

    const lines: string[] = [
        formatRow(headers),
        formatRow(widths.map((w) => '-'.repeat(w))),
        ...rows.map(formatRow),
        table.summary,
    ]
    return lines.join('\n')
}

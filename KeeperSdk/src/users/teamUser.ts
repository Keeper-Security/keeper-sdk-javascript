import {
    type Auth,
    type Authentication,
    Enterprise,
    type KeeperResponse,
    type RestCommand,
    decryptKey,
    getPublicKeysMessage,
    normal64Bytes,
    platform,
    teamEnterpriseUserRemoveCommand,
    teamQueueUserCommand,
    teamsEnterpriseUsersAdd,
    webSafe64FromBytes,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, isNumber, KeeperSdkError, logger, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseQueuedTeamRecord,
    type EnterpriseTeamRecord,
    type EnterpriseUser,
    type EnterpriseTeamUserLink,
} from '../teams/enterpriseData'
import { resolveExistingTeams } from '../teams/teamUtils'
import {
    normalizeEmailInputs,
    resolveExistingUsers,
    EnterpriseUserStatus,
    TeamUserStatus,
    TeamUserSkipReason,
    type AddUsersToTeamsInput,
    type RemoveUsersFromTeamsInput,
    type TeamUserItemResult,
    type TeamUserResult,
    type FormattedTeamUserTable,
} from './userTypes'

export { TeamUserStatus, TeamUserSkipReason }
export type {
    AddUsersToTeamsInput,
    RemoveUsersFromTeamsInput,
    TeamUserItemResult,
    TeamUserResult,
    FormattedTeamUserTable,
}

const SUCCESS_RESULT = 'success'
const MAX_TEAM_USERS_PER_REQUEST = 1000
const MAX_USERS_PER_OPERATION = MAX_TEAM_USERS_PER_REQUEST
const MAX_TEAMS_PER_OPERATION = 100
const MAX_RESPONSE_MESSAGE_LENGTH = 500
const UNEXPECTED_TEAM_RESPONSE_MESSAGE = 'Unexpected API response: no team results returned'
const MISSING_TEAM_RESPONSE_MESSAGE = 'Team add response missing for this team'

const TEAM_USER_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Users,
    EnterpriseDataInclude.Teams,
    EnterpriseDataInclude.QueuedTeams,
    EnterpriseDataInclude.TeamUsers,
    EnterpriseDataInclude.QueuedTeamUsers,
]

const TEAM_USER_TABLE_HEADERS = ['#', 'Status', 'User Email', 'User ID', 'Team Name', 'Team UID', 'Detail']

type ResolvedTeam = Pick<EnterpriseTeamRecord, 'team_uid' | 'name' | 'encrypted_team_key'>

type UserPublicKeys = {
    rsaPublicKey: Uint8Array | null
    eccPublicKey: Uint8Array | null
    errorCode?: string
    message?: string
}

type EncryptedTeamKey = {
    key: Uint8Array
    keyType: Enterprise.EncryptedKeyType
}

type PreparedBatchUser = {
    user: EnterpriseUser
    encryptedKey: EncryptedTeamKey
}

type PreparedBatchTeam = {
    team: ResolvedTeam
    prepared: PreparedBatchUser[]
}

type TeamUserContext = {
    enterpriseData: EnterpriseDataManager
    teams: ResolvedTeam[]
    users: EnterpriseUser[]
    membership: Set<string>
}

type InvitedQueueEntry = { user: EnterpriseUser; team: ResolvedTeam }

type AddBatchPreparation = {
    items: TeamUserItemResult[]
    batchTeams: PreparedBatchTeam[]
    invitedQueue: InvitedQueueEntry[]
}

type TeamUserItemBase = Omit<TeamUserItemResult, 'status'>

const membershipKey = (userId: number, teamUid: string): string => `${userId}:${teamUid}`

const buildItemBase = (user: EnterpriseUser, team: ResolvedTeam): TeamUserItemBase => ({
    username: user.username,
    enterpriseUserId: user.enterprise_user_id,
    teamUid: team.team_uid,
    teamName: team.name,
})

const toResolvedTeam = (team: EnterpriseTeamRecord): ResolvedTeam => ({
    team_uid: team.team_uid,
    name: team.name,
    encrypted_team_key: team.encrypted_team_key,
})

const toQueuedTeamRecord = (team: EnterpriseQueuedTeamRecord): EnterpriseTeamRecord => ({
    team_uid: team.team_uid,
    name: team.name,
    node_id: team.node_id,
})

const toPublicKeyBytes = (value: Uint8Array | null | undefined): Uint8Array | null =>
    value && value.length > 0 ? value : null

const normalizeTeamIdentifiers = (teams: string[] | undefined): string[] =>
    (teams || []).map((t) => t.trim()).filter((t) => t.length > 0)

function buildMembershipSet(
    teamUsers: EnterpriseTeamUserLink[] | undefined,
    queuedTeamUsers: EnterpriseTeamUserLink[] | undefined
): Set<string> {
    const membership = new Set<string>()
    for (const link of [...(teamUsers || []), ...(queuedTeamUsers || [])]) {
        membership.add(membershipKey(link.enterprise_user_id, link.team_uid))
    }
    return membership
}

async function fetchUserPublicKeys(auth: Auth, emails: string[]): Promise<Map<string, UserPublicKeys>> {
    const result = new Map<string, UserPublicKeys>()
    if (emails.length === 0) return result

    let response: Authentication.IGetPublicKeysResponse
    try {
        response = await auth.executeRest(getPublicKeysMessage({ usernames: emails }))
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to fetch public keys: ${extractErrorMessage(err)}`,
            ResultCodes.TEAM_USER_ADD_FAILED
        )
    }

    for (const entry of response.keyResponses || []) {
        const username = (entry.username || '').toLowerCase()
        if (!username) continue
        result.set(username, {
            rsaPublicKey: toPublicKeyBytes(entry.publicKey ?? undefined),
            eccPublicKey: toPublicKeyBytes(entry.publicEccKey ?? undefined),
            errorCode: entry.errorCode || undefined,
            message: entry.message || undefined,
        })
    }
    return result
}

async function encryptTeamKeyForUser(
    teamKey: Uint8Array,
    publicKeys: UserPublicKeys
): Promise<EncryptedTeamKey> {
    if (publicKeys.rsaPublicKey) {
        return {
            key: platform.publicEncrypt(teamKey, platform.bytesToBase64(publicKeys.rsaPublicKey)),
            keyType: Enterprise.EncryptedKeyType.KT_ENCRYPTED_BY_PUBLIC_KEY,
        }
    }
    return {
        key: await platform.publicEncryptEC(teamKey, publicKeys.eccPublicKey as Uint8Array),
        keyType: Enterprise.EncryptedKeyType.KT_ENCRYPTED_BY_PUBLIC_KEY_ECC,
    }
}

async function getDecryptedTeamKey(
    team: ResolvedTeam,
    treeKey: Uint8Array,
    cache: Map<string, Uint8Array | null>
): Promise<Uint8Array | null> {
    if (cache.has(team.team_uid)) return cache.get(team.team_uid) ?? null
    if (!team.encrypted_team_key) {
        cache.set(team.team_uid, null)
        return null
    }
    try {
        const key = await decryptKey(team.encrypted_team_key, treeKey)
        cache.set(team.team_uid, key)
        return key
    } catch (err) {
        logger.warn(`Could not decrypt key for team "${team.name}": ${extractErrorMessage(err)}`)
        cache.set(team.team_uid, null)
        return null
    }
}

async function loadTeamUserContext(
    auth: Auth,
    rawUsers: string[],
    rawTeams: string[]
): Promise<TeamUserContext> {
    const emails = normalizeEmailInputs(rawUsers)
    if (emails.length === 0) {
        throw new KeeperSdkError('No users provided.', ResultCodes.NO_USERS_TO_UPDATE)
    }
    const teamIdentifiers = normalizeTeamIdentifiers(rawTeams)
    if (teamIdentifiers.length === 0) {
        throw new KeeperSdkError('No teams provided.', ResultCodes.NO_TEAMS_FOR_USER_OP)
    }
    validateOperationLimits(emails.length, teamIdentifiers.length)

    const enterpriseData = new EnterpriseDataManager(auth)
    const response = await enterpriseData.getData(TEAM_USER_INCLUDES)
    const queuedTeams = (response.queued_teams || []).map(toQueuedTeamRecord)

    return {
        enterpriseData,
        teams: resolveExistingTeams(response.teams || [], teamIdentifiers, queuedTeams).map(toResolvedTeam),
        users: resolveExistingUsers(response.users || [], emails),
        membership: buildMembershipSet(response.team_users, response.queued_team_users),
    }
}

function determineUserType(hideSharedFolders: boolean | undefined): Enterprise.TeamUserType | undefined {
    if (hideSharedFolders === true) return Enterprise.TeamUserType.USER
    if (hideSharedFolders === false) return Enterprise.TeamUserType.ADMIN_ONLY
    return undefined
}

function pickPublicKeyError(publicKeys: UserPublicKeys | undefined, username: string): string {
    return publicKeys?.message || publicKeys?.errorCode || `No public key for "${username}"`
}

function hasUsablePublicKey(publicKeys: UserPublicKeys | undefined): publicKeys is UserPublicKeys {
    return !!publicKeys && !publicKeys.errorCode && !!(publicKeys.eccPublicKey || publicKeys.rsaPublicKey)
}

function sanitizeResponseMessage(value: string): string {
    return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').slice(0, MAX_RESPONSE_MESSAGE_LENGTH)
}

function pickResponseError(
    message?: string | null,
    resultCode?: string | null,
    additionalInfo?: string | null,
    fallback?: string
): string | undefined {
    for (const candidate of [message, resultCode, additionalInfo, fallback]) {
        if (typeof candidate === 'string' && candidate.trim().length > 0) {
            return sanitizeResponseMessage(candidate.trim())
        }
    }
    return undefined
}

function toEnterpriseUserId(value: unknown): number | null {
    const id = typeof value === 'number' ? value : Number(value)
    return isNumber(id) && id > 0 ? Math.trunc(id) : null
}

function validateOperationLimits(userCount: number, teamCount: number): void {
    if (userCount > MAX_USERS_PER_OPERATION) {
        throw new KeeperSdkError(
            `Cannot process more than ${MAX_USERS_PER_OPERATION} users at once.`,
            ResultCodes.NO_USERS_TO_UPDATE
        )
    }
    if (teamCount > MAX_TEAMS_PER_OPERATION) {
        throw new KeeperSdkError(
            `Cannot process more than ${MAX_TEAMS_PER_OPERATION} teams at once.`,
            ResultCodes.NO_TEAMS_FOR_USER_OP
        )
    }
}

function validateBatchUserCount(batchTeams: PreparedBatchTeam[]): void {
    const totalUsers = batchTeams.reduce((count, batch) => count + batch.prepared.length, 0)
    if (totalUsers > MAX_TEAM_USERS_PER_REQUEST) {
        throw new KeeperSdkError(
            `Cannot add more than ${MAX_TEAM_USERS_PER_REQUEST} users in one batch request.`,
            ResultCodes.TEAM_USER_ADD_FAILED
        )
    }
}

async function prepareAddBatches(
    teams: ResolvedTeam[],
    users: EnterpriseUser[],
    membership: Set<string>,
    publicKeyMap: Map<string, UserPublicKeys>,
    treeKey: Uint8Array
): Promise<AddBatchPreparation> {
    const items: TeamUserItemResult[] = []
    const batchTeams: PreparedBatchTeam[] = []
    const invitedQueue: InvitedQueueEntry[] = []
    const teamKeyCache = new Map<string, Uint8Array | null>()

    for (const team of teams) {
        const prepared: PreparedBatchUser[] = []

        for (const user of users) {
            const base = buildItemBase(user, team)

            if (membership.has(membershipKey(user.enterprise_user_id, team.team_uid))) {
                items.push({ ...base, status: TeamUserStatus.Skipped, skipReason: TeamUserSkipReason.AlreadyMember })
                continue
            }

            if (user.status !== EnterpriseUserStatus.Active) {
                invitedQueue.push({ user, team })
                continue
            }

            const publicKeys = publicKeyMap.get(user.username.toLowerCase())
            if (!hasUsablePublicKey(publicKeys)) {
                items.push({
                    ...base,
                    status: TeamUserStatus.MissingPublicKey,
                    message: pickPublicKeyError(publicKeys, user.username),
                })
                continue
            }

            const teamKey = await getDecryptedTeamKey(team, treeKey, teamKeyCache)
            if (!teamKey) {
                items.push({
                    ...base,
                    status: TeamUserStatus.Failed,
                    message: `Team key for "${team.name}" is unavailable.`,
                })
                continue
            }

            try {
                prepared.push({ user, encryptedKey: await encryptTeamKeyForUser(teamKey, publicKeys) })
            } catch (err) {
                items.push({ ...base, status: TeamUserStatus.Failed, message: extractErrorMessage(err) })
            }
        }

        if (prepared.length > 0) batchTeams.push({ team, prepared })
    }

    return { items, batchTeams, invitedQueue }
}

function buildAddTeamRequests(
    batchTeams: PreparedBatchTeam[],
    userType: Enterprise.TeamUserType | undefined
): Enterprise.ITeamsEnterpriseUsersAddTeamRequest[] {
    return batchTeams.map(({ team, prepared }) => ({
        teamUid: normal64Bytes(team.team_uid),
        users: prepared.map(({ user, encryptedKey }) => {
            const userReq: Enterprise.ITeamsEnterpriseUsersAddUserRequest = {
                enterpriseUserId: user.enterprise_user_id,
                typedTeamKey: { key: encryptedKey.key, keyType: encryptedKey.keyType },
            }
            if (userType !== undefined) userReq.userType = userType
            return userReq
        }),
    }))
}

function markAllBatchUsersFailed(batchTeams: PreparedBatchTeam[], message: string): TeamUserItemResult[] {
    return batchTeams.flatMap(({ team, prepared }) =>
        prepared.map(({ user }) => ({ ...buildItemBase(user, team), status: TeamUserStatus.Failed, message }))
    )
}

function mergeTeamResponse(
    prepTeam: PreparedBatchTeam,
    teamResp: Enterprise.ITeamsEnterpriseUsersAddTeamResponse
): TeamUserItemResult[] {
    const userMap = new Map(prepTeam.prepared.map((p) => [p.user.enterprise_user_id, p.user]))
    const teamFailureMessage =
        teamResp.success === false
            ? pickResponseError(teamResp.message, teamResp.resultCode, teamResp.additionalInfo, 'Team add failed')
            : undefined

    const items: TeamUserItemResult[] = []
    for (const userResp of teamResp.users || []) {
        const enterpriseUserId = toEnterpriseUserId(userResp.enterpriseUserId)
        if (enterpriseUserId === null) continue
        const user = userMap.get(enterpriseUserId)
        if (!user) continue
        const success = userResp.success === true
        items.push({
            ...buildItemBase(user, prepTeam.team),
            status: success ? TeamUserStatus.Added : TeamUserStatus.Failed,
            message: success
                ? undefined
                : pickResponseError(
                      userResp.message,
                      userResp.resultCode,
                      userResp.additionalInfo,
                      teamFailureMessage
                  ),
        })
        userMap.delete(enterpriseUserId)
    }

    for (const user of userMap.values()) {
        items.push({
            ...buildItemBase(user, prepTeam.team),
            status: teamFailureMessage ? TeamUserStatus.Failed : TeamUserStatus.Added,
            message: teamFailureMessage,
        })
    }
    return items
}

async function sendTeamsEnterpriseUsersAdd(
    auth: Auth,
    batchTeams: PreparedBatchTeam[],
    userType: Enterprise.TeamUserType | undefined
): Promise<TeamUserItemResult[]> {
    if (batchTeams.length === 0) return []

    validateBatchUserCount(batchTeams)

    let response: Enterprise.ITeamsEnterpriseUsersAddResponse
    try {
        response = await auth.executeRest(
            teamsEnterpriseUsersAdd({ teams: buildAddTeamRequests(batchTeams, userType) })
        )
    } catch (err) {
        return markAllBatchUsersFailed(batchTeams, extractErrorMessage(err))
    }

    const teamResponses = response.teams ?? []
    if (teamResponses.length === 0) {
        return markAllBatchUsersFailed(batchTeams, UNEXPECTED_TEAM_RESPONSE_MESSAGE)
    }

    const items: TeamUserItemResult[] = []
    const teamMap = new Map(batchTeams.map((p) => [p.team.team_uid, p]))

    for (const teamResp of teamResponses) {
        const teamUid = teamResp.teamUid ? webSafe64FromBytes(teamResp.teamUid as Uint8Array) : ''
        const prepTeam = teamMap.get(teamUid)
        if (!prepTeam) continue
        items.push(...mergeTeamResponse(prepTeam, teamResp))
        teamMap.delete(teamUid)
    }

    for (const prepTeam of teamMap.values()) {
        for (const { user } of prepTeam.prepared) {
            items.push({
                ...buildItemBase(user, prepTeam.team),
                status: TeamUserStatus.Failed,
                message: MISSING_TEAM_RESPONSE_MESSAGE,
            })
        }
    }
    return items
}

async function executeTeamUserCommand(
    auth: Auth,
    command: RestCommand<{ enterprise_user_id: number; team_uid: string }, KeeperResponse>,
    fallbackErrorCode: string
): Promise<void> {
    const response = await auth.executeRestCommand(command)
    const result = (response.result || '').toLowerCase()
    if (result && result !== SUCCESS_RESULT) {
        const { enterprise_user_id: userId, team_uid: teamUid } = command.request
        throw new KeeperSdkError(
            response.message ||
                response.result_code ||
                `${command.baseRequest.command} failed for user=${userId}, team=${teamUid}`,
            response.result_code || fallbackErrorCode
        )
    }
}

async function processInvitedQueue(auth: Auth, invitedQueue: InvitedQueueEntry[]): Promise<TeamUserItemResult[]> {
    const items: TeamUserItemResult[] = []
    for (const { user, team } of invitedQueue) {
        const base = buildItemBase(user, team)
        try {
            await executeTeamUserCommand(
                auth,
                teamQueueUserCommand({ enterprise_user_id: user.enterprise_user_id, team_uid: team.team_uid }),
                ResultCodes.TEAM_USER_ADD_FAILED
            )
            items.push({ ...base, status: TeamUserStatus.Added })
        } catch (err) {
            items.push({ ...base, status: TeamUserStatus.Failed, message: extractErrorMessage(err) })
        }
    }
    return items
}

export async function addUsersToTeams(auth: Auth, input: AddUsersToTeamsInput): Promise<TeamUserResult> {
    const ctx = await loadTeamUserContext(auth, input.users, input.teams || [])

    const treeKey = await ctx.enterpriseData.getTreeKey()
    if (!treeKey) {
        throw new KeeperSdkError('Enterprise tree key is unavailable.', ResultCodes.ENTERPRISE_TREE_KEY_UNAVAILABLE)
    }

    const publicKeyMap = await fetchUserPublicKeys(
        auth,
        ctx.users.filter((u) => u.status === EnterpriseUserStatus.Active).map((u) => u.username)
    )

    const { items, batchTeams, invitedQueue } = await prepareAddBatches(
        ctx.teams,
        ctx.users,
        ctx.membership,
        publicKeyMap,
        treeKey
    )

    if (batchTeams.length > 0) {
        items.push(...(await sendTeamsEnterpriseUsersAdd(auth, batchTeams, determineUserType(input.hideSharedFolders))))
    }
    items.push(...(await processInvitedQueue(auth, invitedQueue)))

    return finalizeResult(items)
}

export async function removeUsersFromTeams(
    auth: Auth,
    input: RemoveUsersFromTeamsInput
): Promise<TeamUserResult> {
    const ctx = await loadTeamUserContext(auth, input.users, input.teams || [])
    const items: TeamUserItemResult[] = []

    for (const team of ctx.teams) {
        for (const user of ctx.users) {
            const base = buildItemBase(user, team)

            if (!ctx.membership.has(membershipKey(user.enterprise_user_id, team.team_uid))) {
                items.push({ ...base, status: TeamUserStatus.Skipped, skipReason: TeamUserSkipReason.NotMember })
                continue
            }

            try {
                await executeTeamUserCommand(
                    auth,
                    teamEnterpriseUserRemoveCommand({
                        enterprise_user_id: user.enterprise_user_id,
                        team_uid: team.team_uid,
                    }),
                    ResultCodes.TEAM_USER_REMOVE_FAILED
                )
                items.push({ ...base, status: TeamUserStatus.Removed })
            } catch (err) {
                items.push({ ...base, status: TeamUserStatus.Failed, message: extractErrorMessage(err) })
            }
        }
    }

    return finalizeResult(items)
}

function finalizeResult(items: TeamUserItemResult[]): TeamUserResult {
    let succeeded = 0
    let skipped = 0
    let failed = 0
    for (const item of items) {
        if (item.status === TeamUserStatus.Added || item.status === TeamUserStatus.Removed) succeeded++
        else if (item.status === TeamUserStatus.Skipped) skipped++
        else failed++
    }
    return { success: failed === 0 && succeeded > 0, items, succeeded, skipped, failed }
}

export function formatTeamUserResult(result: TeamUserResult): FormattedTeamUserTable {
    const rows = result.items.map((item, index) => [
        String(index + 1),
        item.status,
        item.username,
        String(item.enterpriseUserId),
        item.teamName,
        item.teamUid,
        item.message || item.skipReason || '',
    ])
    return {
        headers: [...TEAM_USER_TABLE_HEADERS],
        rows,
        summary: `Succeeded: ${result.succeeded}  Skipped: ${result.skipped}  Failed: ${result.failed}`,
    }
}

export function renderTeamUserAsciiTable(table: FormattedTeamUserTable): string {
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

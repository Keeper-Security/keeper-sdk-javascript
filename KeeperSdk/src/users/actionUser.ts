import {
    Enterprise,
    enterpriseUsersLockMessage,
    type Auth,
    type KeeperResponse,
    type RestCommand,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, isNumber, KeeperSdkError, logger, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseUser,
} from '../teams/enterpriseData'
import {
    EnterpriseUserStatus,
    normalizeEmailInputs,
    UserAction,
    UserActionStatus,
    UserActionSkipReason,
    type UserActionInput,
    type UserActionItemResult,
    type UserActionResult,
    type FormattedUserActionTable,
} from './userTypes'

export { UserAction, UserActionStatus, UserActionSkipReason }
export type { UserActionInput, UserActionItemResult, UserActionResult, FormattedUserActionTable }

const EXPIRE_PASSWORD_COMMAND = 'set_master_password_expire'
const ALL_USERS_SENTINEL = '@all'
const ACTIONS_NOT_SUPPORTING_ALL = new Set<UserAction>([UserAction.Lock, UserAction.ExpirePassword])
const LOCK_UNLOCK_BATCH_SIZE = 1000
const SELF_ACTION_MESSAGE = 'This operation cannot be done on yourself.'

const ACTION_USER_INCLUDES: EnterpriseDataInclude[] = [EnterpriseDataInclude.Users]

const USER_ACTION_TABLE_HEADERS = ['#', 'Status', 'Email', 'User ID', 'Detail']

type ExpirePasswordPayload = {
    email: string
}

type ActionUserTarget =
    | { kind: 'user'; user: EnterpriseUser }
    | { kind: 'not_found'; identifier: string }

export async function actionUsers(auth: Auth, input: UserActionInput): Promise<UserActionResult> {
    const identifiers = normalizeEmailInputs(input.emails)

    if (identifiers.length === 0) {
        throw new KeeperSdkError('No users provided.', ResultCodes.NO_USERS_TO_ACTION)
    }

    const isAll = identifiers.includes(ALL_USERS_SENTINEL)

    if (isAll && ACTIONS_NOT_SUPPORTING_ALL.has(input.action)) {
        throw new KeeperSdkError(
            `The '${input.action}' action does not support @all.`,
            ResultCodes.USER_ACTION_ALL_NOT_SUPPORTED
        )
    }

    const enterpriseData = new EnterpriseDataManager(auth)
    const response = await enterpriseData.getData(ACTION_USER_INCLUDES)
    const allUsers = response.users || []

    const targets: ActionUserTarget[] = isAll
        ? allUsers.map((user) => ({ kind: 'user' as const, user }))
        : resolveActionUserTargets(allUsers, identifiers)
    const callerEnterpriseUserId = resolveCallerEnterpriseUserId(auth, allUsers)

    const items: UserActionItemResult[] = []
    const batchTargets = new Map<number, UserActionItemResult>()

    for (const target of targets) {
        if (target.kind === 'not_found') {
            items.push({
                username: target.identifier,
                status: UserActionStatus.Failed,
                message: `User "${target.identifier}" does not exist.`,
            })
            continue
        }

        const user = target.user
        const item: UserActionItemResult = {
            username: user.username,
            enterpriseUserId: user.enterprise_user_id,
            status: UserActionStatus.Failed,
        }

        if (user.status !== EnterpriseUserStatus.Active) {
            const masked = maskEmail(user.username)
            logger.warn(`User "${masked}" is not active and will be skipped.`)
            item.status = UserActionStatus.Skipped
            item.skipReason = UserActionSkipReason.Inactive
            items.push(item)
            continue
        }

        items.push(item)

        if (input.action === UserAction.Lock || input.action === UserAction.Unlock) {
            if (callerEnterpriseUserId !== null && user.enterprise_user_id === callerEnterpriseUserId) {
                logger.warn(`User "${maskEmail(user.username)}" is the logged-in user and will be skipped for lock/unlock.`)
                item.status = UserActionStatus.Failed
                item.message = SELF_ACTION_MESSAGE
                continue
            }
            batchTargets.set(user.enterprise_user_id, item)
            continue
        }

        try {
            await sendExpirePassword(auth, user.username)
            item.status = UserActionStatus.Success
        } catch (err) {
            item.message = extractErrorMessage(err)
        }
    }

    if (input.action === UserAction.Lock || input.action === UserAction.Unlock) {
        await sendBatchLockUnlock(auth, input.action, batchTargets)
    }

    return finalizeResult(items)
}

async function sendBatchLockUnlock(
    auth: Auth,
    action: UserAction.Lock | UserAction.Unlock,
    batchTargets: Map<number, UserActionItemResult>
): Promise<void> {
    if (batchTargets.size === 0) {
        return
    }

    const enterpriseUserIds = [...batchTargets.keys()]

    for (const chunk of chunkArray(enterpriseUserIds, LOCK_UNLOCK_BATCH_SIZE)) {
        const response = await auth.executeRest(
            enterpriseUsersLockMessage({
                lockEnterpriseUserIds: action === UserAction.Lock ? chunk : [],
                disableEnterpriseUserIds: [],
                unlockEnterpriseUserIds: action === UserAction.Unlock ? chunk : [],
                deleteIfPending: false,
            })
        )

        const seen = new Set<number>()
        for (const lockResponse of response.response || []) {
            const enterpriseUserId = toEnterpriseUserId(lockResponse.enterpriseUserId)
            if (enterpriseUserId === null) {
                continue
            }

            seen.add(enterpriseUserId)
            const item = batchTargets.get(enterpriseUserId)
            if (!item) {
                continue
            }

            applyLockUserResponse(item, lockResponse, action)
        }

        for (const enterpriseUserId of chunk) {
            if (seen.has(enterpriseUserId)) {
                continue
            }
            const item = batchTargets.get(enterpriseUserId)
            if (!item) {
                continue
            }
            item.status = UserActionStatus.Failed
            item.message = 'No response received for user.'
        }
    }
}

function applyLockUserResponse(
    item: UserActionItemResult,
    lockResponse: Enterprise.ILockUserResponse,
    action: UserAction.Lock | UserAction.Unlock
): void {
    const status = lockResponse.status ?? Enterprise.UserLockStatus.UNKNOWN_LOCK_STATUS
    const errorMessage = lockResponse.errorMessage || ''

    switch (status) {
        case Enterprise.UserLockStatus.LOCKED:
            if (action === UserAction.Lock) {
                item.status = UserActionStatus.Success
            } else {
                item.status = UserActionStatus.Failed
                item.message = errorMessage || 'User is locked.'
            }
            break
        case Enterprise.UserLockStatus.UNLOCKED:
            if (action === UserAction.Unlock) {
                item.status = UserActionStatus.Success
            } else {
                item.status = UserActionStatus.Failed
                item.message = errorMessage || 'User is unlocked.'
            }
            break
        case Enterprise.UserLockStatus.CANT_BE_PENDING:
            item.status = UserActionStatus.Skipped
            item.skipReason = UserActionSkipReason.Pending
            item.message = errorMessage || 'Pending user was not modified.'
            break
        case Enterprise.UserLockStatus.DELETED:
            item.status = UserActionStatus.Success
            item.message = errorMessage || 'Pending user was deleted.'
            break
        case Enterprise.UserLockStatus.DISABLED:
            item.status = UserActionStatus.Failed
            item.message = errorMessage || 'User was disabled.'
            break
        default:
            item.status = UserActionStatus.Failed
            item.message = errorMessage || 'Lock operation failed.'
    }
}

async function sendExpirePassword(auth: Auth, email: string): Promise<void> {
    const command: RestCommand<ExpirePasswordPayload, KeeperResponse> = {
        baseRequest: { command: EXPIRE_PASSWORD_COMMAND },
        request: { email },
        authorization: {},
    }
    const response = await auth.executeRestCommand(command)
    const result = (response.result || '').toLowerCase()
    if (result && result !== 'success') {
        throw new KeeperSdkError(
            response.message ||
                response.result_code ||
                `${EXPIRE_PASSWORD_COMMAND} failed for "${maskEmail(email)}"`,
            response.result_code || ResultCodes.USER_ACTION_FAILED
        )
    }
}

function chunkArray<T>(values: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let index = 0; index < values.length; index += size) {
        chunks.push(values.slice(index, index + size))
    }
    return chunks
}

function toEnterpriseUserId(value: unknown): number | null {
    if (value == null) {
        return null
    }
    const numericId =
        typeof value === 'object' && 'toNumber' in value
            ? (value as { toNumber(): number }).toNumber()
            : Number(value)
    return isNumber(numericId) && numericId > 0 ? numericId : null
}

function maskEmail(email: string): string {
    return email.includes('@') ? `***@${email.split('@')[1]}` : '***'
}

function resolveActionUserTargets(allUsers: EnterpriseUser[], identifiers: string[]): ActionUserTarget[] {
    const byEmail = new Map<string, EnterpriseUser>()
    const byId = new Map<number, EnterpriseUser>()
    for (const user of allUsers) {
        if (user.username) byEmail.set(user.username.toLowerCase(), user)
        byId.set(user.enterprise_user_id, user)
    }

    const result: ActionUserTarget[] = []
    const seen = new Set<number>()

    for (const identifier of identifiers) {
        const trimmed = identifier.trim()
        const numericId = Number(trimmed)
        let user: EnterpriseUser | undefined

        if (Number.isInteger(numericId)) {
            user = byId.get(numericId)
        }
        if (!user) {
            user = byEmail.get(trimmed.toLowerCase())
        }
        if (!user) {
            result.push({ kind: 'not_found', identifier: trimmed })
            continue
        }
        if (!seen.has(user.enterprise_user_id)) {
            seen.add(user.enterprise_user_id)
            result.push({ kind: 'user', user })
        }
    }

    return result
}

function resolveCallerEnterpriseUserId(auth: Auth, allUsers: EnterpriseUser[]): number | null {
    const username = auth.username.trim().toLowerCase()
    if (!username) {
        return null
    }
    const match = allUsers.find((user) => user.username?.trim().toLowerCase() === username)
    return match?.enterprise_user_id ?? null
}

function finalizeResult(items: UserActionItemResult[]): UserActionResult {
    let succeeded = 0, skipped = 0, failed = 0
    for (const item of items) {
        if (item.status === UserActionStatus.Success) succeeded++
        else if (item.status === UserActionStatus.Skipped) skipped++
        else failed++
    }
    return { success: failed === 0 && succeeded > 0, items, succeeded, skipped, failed }
}

export function formatUserActionResult(result: UserActionResult): FormattedUserActionTable {
    const rows = result.items.map((item, index) => [
        String(index + 1),
        item.status,
        item.username,
        item.enterpriseUserId != null ? String(item.enterpriseUserId) : '',
        item.message || item.skipReason || '',
    ])
    return {
        headers: [...USER_ACTION_TABLE_HEADERS],
        rows,
        summary: `Succeeded: ${result.succeeded}  Skipped: ${result.skipped}  Failed: ${result.failed}`,
    }
}

export function renderUserActionAsciiTable(table: FormattedUserActionTable): string {
    const { headers, rows } = table
    const widths = headers.map((header, index) =>
        Math.max(header.length, ...rows.map((row) => (row[index] || '').length))
    )
    const padCell = (cell: string, columnIndex: number): string =>
        cell.padEnd(widths[columnIndex])
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

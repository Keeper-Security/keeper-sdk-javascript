import {
    type Auth,
    type KeeperResponse,
    type RestCommand,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, logger, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseUser,
} from '../teams/enterpriseData'
import {
    normalizeEmailInputs,
    resolveExistingUsers,
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

const USER_LOCK_COMMAND = 'enterprise_user_lock'
const EXPIRE_PASSWORD_COMMAND = 'set_master_password_expire'
const ALL_USERS_SENTINEL = '@all'
const ACTIONS_NOT_SUPPORTING_ALL = new Set<UserAction>([UserAction.Lock, UserAction.ExpirePassword])

const ACTION_USER_INCLUDES: EnterpriseDataInclude[] = [EnterpriseDataInclude.Users]

const USER_ACTION_TABLE_HEADERS = ['#', 'Status', 'Email', 'User ID', 'Detail']

type UserLockPayload = {
    enterprise_user_id: number
    lock: 'locked' | 'unlocked'
}

type ExpirePasswordPayload = {
    email: string
}

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

    const resolvedUsers = isAll ? allUsers : resolveExistingUsers(allUsers, identifiers)

    const items: UserActionItemResult[] = []

    for (const user of resolvedUsers) {
        if (user.status !== 'active') {
            const masked = maskEmail(user.username)
            logger.warn(`User "${masked}" is not active and will be skipped.`)
            items.push({
                username: user.username,
                enterpriseUserId: user.enterprise_user_id,
                status: UserActionStatus.Skipped,
                skipReason: UserActionSkipReason.Inactive,
            })
            continue
        }

        try {
            await sendUserAction(auth, input.action, user)
            items.push({
                username: user.username,
                enterpriseUserId: user.enterprise_user_id,
                status: UserActionStatus.Success,
            })
        } catch (err) {
            items.push({
                username: user.username,
                enterpriseUserId: user.enterprise_user_id,
                status: UserActionStatus.Failed,
                message: extractErrorMessage(err),
            })
        }
    }

    return finalizeResult(items)
}

async function sendUserAction(auth: Auth, action: UserAction, user: EnterpriseUser): Promise<void> {
    switch (action) {
        case UserAction.Lock:
        case UserAction.Unlock:
            await sendLockUnlock(auth, user.enterprise_user_id, action === UserAction.Lock ? 'locked' : 'unlocked')
            break
        case UserAction.ExpirePassword:
            await sendExpirePassword(auth, user.username)
            break
    }
}

async function sendLockUnlock(auth: Auth, enterpriseUserId: number, lock: 'locked' | 'unlocked'): Promise<void> {
    const command: RestCommand<UserLockPayload, KeeperResponse> = {
        baseRequest: { command: USER_LOCK_COMMAND },
        request: { enterprise_user_id: enterpriseUserId, lock },
        authorization: {},
    }
    const response = await auth.executeRestCommand(command)
    const result = (response.result || '').toLowerCase()
    if (result && result !== 'success') {
        throw new KeeperSdkError(
            response.message ||
                response.result_code ||
                `${USER_LOCK_COMMAND} failed for user_id=${enterpriseUserId}`,
            response.result_code || ResultCodes.USER_ACTION_FAILED
        )
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

function maskEmail(email: string): string {
    return email.includes('@') ? `***@${email.split('@')[1]}` : '***'
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
        String(item.enterpriseUserId),
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
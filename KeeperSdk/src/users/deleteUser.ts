import {
    type Auth,
    type KeeperResponse,
    type RestCommand,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
} from '../teams/enterpriseData'
import {
    normalizeEmailInputs,
    resolveExistingUsers,
    DeleteUserStatus,
    type DeleteUserInput,
    type DeleteUserItemResult,
    type DeleteUserResult,
    type FormattedDeleteUserTable,
} from './userTypes'

export { DeleteUserStatus }
export type { DeleteUserInput, DeleteUserItemResult, DeleteUserResult, FormattedDeleteUserTable }

const USER_DELETE_COMMAND = 'enterprise_user_delete'

const DELETE_USER_INCLUDES: EnterpriseDataInclude[] = [EnterpriseDataInclude.Users]

type UserDeletePayload = {
    enterprise_user_id: number
}

export async function deleteUsers(auth: Auth, input: DeleteUserInput): Promise<DeleteUserResult> {
    const rawEmails = normalizeEmailInputs(input.emails)

    if (rawEmails.length === 0) {
        throw new KeeperSdkError('No users provided for deletion.', ResultCodes.NO_USERS_TO_DELETE)
    }

    const enterpriseData = new EnterpriseDataManager(auth)
    const response = await enterpriseData.getData(DELETE_USER_INCLUDES)
    const allUsers = response.users || []
    const resolvedUsers = resolveExistingUsers(allUsers, rawEmails)

    const items: DeleteUserItemResult[] = []

    for (const user of resolvedUsers) {
        try {
            await sendUserDelete(auth, user.enterprise_user_id)
            items.push({
                username: user.username,
                enterpriseUserId: user.enterprise_user_id,
                status: DeleteUserStatus.Deleted,
            })
        } catch (err) {
            items.push({
                username: user.username,
                enterpriseUserId: user.enterprise_user_id,
                status: DeleteUserStatus.Failed,
                message: extractErrorMessage(err),
            })
        }
    }

    return finalizeResult(items)
}

async function sendUserDelete(auth: Auth, enterpriseUserId: number): Promise<void> {
    const command: RestCommand<UserDeletePayload, KeeperResponse> = {
        baseRequest: { command: USER_DELETE_COMMAND },
        request: { enterprise_user_id: enterpriseUserId },
        authorization: {},
    }
    const response = await auth.executeRestCommand(command)
    const result = (response.result || '').toLowerCase()
    if (result && result !== 'success') {
        throw new KeeperSdkError(
            response.message ||
                response.result_code ||
                `${USER_DELETE_COMMAND} failed for user_id=${enterpriseUserId}`,
            response.result_code || ResultCodes.USER_DELETE_FAILED
        )
    }
}

function finalizeResult(items: DeleteUserItemResult[]): DeleteUserResult {
    let deleted = 0, failed = 0
    for (const item of items) {
        if (item.status === DeleteUserStatus.Deleted) deleted++
        else failed++
    }
    return { success: failed === 0 && deleted > 0, items, deleted, failed }
}

const USER_DELETE_TABLE_HEADERS = ['#', 'Status', 'Email', 'User ID', 'Detail']

export function formatDeleteUserResult(result: DeleteUserResult): FormattedDeleteUserTable {
    const rows = result.items.map((item, index) => [
        String(index + 1),
        item.status,
        item.username,
        String(item.enterpriseUserId),
        item.message || '',
    ])

    return {
        headers: [...USER_DELETE_TABLE_HEADERS],
        rows,
        summary: `Deleted: ${result.deleted}  Failed: ${result.failed}`,
    }
}

export function renderDeleteUserAsciiTable(table: FormattedDeleteUserTable): string {
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

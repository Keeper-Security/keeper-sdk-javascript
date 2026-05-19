import {
    encryptObjectForStorage,
    type Auth,
    type KeeperResponse,
    type RestCommand,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, isNumber, isValidEmail, KeeperSdkError, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseUser,
} from '../teams/enterpriseData'
import {
    applyDecryptedNodeNames,
    applyEnterpriseNameToRoot,
    parentNeedsNameLookup,
    resolveParentNode,
} from '../teams/teamUtils'
import {
    normalizeEmailInputs,
    AddUserStatus,
    AddUserSkipReason,
    type AddUserInput,
    type AddUserItemResult,
    type AddUserResult,
    type FormatAddUserResultOptions,
    type FormattedAddUserTable,
} from './userTypes'

export { AddUserStatus, AddUserSkipReason }
export type { AddUserInput, AddUserItemResult, AddUserResult, FormatAddUserResultOptions, FormattedAddUserTable }

const USER_ADD_COMMAND = 'enterprise_user_add'
const ALLOCATE_IDS_COMMAND = 'enterprise_allocate_ids'

const ADD_USER_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Nodes,
    EnterpriseDataInclude.Users,
]

const USER_TABLE_HEADERS = ['#', 'Status', 'Email', 'User ID', 'Node ID', 'Detail']

type UserAddPayload = {
    enterprise_user_id: number
    enterprise_user_username: string
    node_id: number
    encrypted_data: string
    full_name?: string
    job_title?: string
}

type AllocateIdsPayload = {
    number_requested: number
}

type AllocateIdsResponse = KeeperResponse & {
    base_id: number
    number_allocated: number
}

type UserAddResponse = KeeperResponse & {
    verification_code?: string
}

export async function addUsers(auth: Auth, input: AddUserInput): Promise<AddUserResult> {
    const rawEmails = [
        ...new Map(
            normalizeEmailInputs(input.emails)
                .map((e) => [e.toLowerCase(), e] as const)
        ).values(),
    ]

    if (rawEmails.length === 0) {
        throw new KeeperSdkError('No emails provided.', ResultCodes.NO_USERS_TO_ADD)
    }

    const parentIdentifier = input.parent ?? null
    const needsNameLookup = parentNeedsNameLookup(parentIdentifier)

    const enterpriseData = new EnterpriseDataManager(auth)
    const response = await enterpriseData.getData(ADD_USER_INCLUDES)
    const nodes = response.nodes || []
    const existingUsers = response.users || []

    applyEnterpriseNameToRoot(nodes, response.enterprise_name)

    if (needsNameLookup) {
        const displayNames = await enterpriseData.getDisplayNames()
        applyDecryptedNodeNames(nodes, displayNames.nodes)
        await enterpriseData.decryptNodeNames(nodes)
    }

    const parentNode = resolveParentNode(nodes, parentIdentifier)
    const parentNodeId = parentNode.node_id
    const parentNodeName =
        EnterpriseDataManager.getNodePath(nodes, parentNode.node_id, { omitRoot: false }) ||
        (parentNode.displayName || '').trim() ||
        String(parentNode.node_id)

    const treeKey = await enterpriseData.getTreeKey()
    if (!treeKey) {
        throw new KeeperSdkError(
            'Enterprise tree key is unavailable.',
            ResultCodes.ENTERPRISE_TREE_KEY_UNAVAILABLE
        )
    }

    const existingByEmail = buildExistingByEmail(existingUsers)
    const fullName = (input.fullName || '').trim() || undefined
    const jobTitle = (input.jobTitle || '').trim() || undefined

    const items: AddUserItemResult[] = []

    for (const raw of rawEmails) {
        const email = raw.toLowerCase()

        if (!isValidEmail(email)) {
            items.push({
                username: raw,
                status: AddUserStatus.Skipped,
                skipReason: AddUserSkipReason.InvalidEmail,
                message: `"${raw}" is not a valid email address.`,
            })
            continue
        }

        const existing = existingByEmail.get(email)
        if (existing) {
            items.push({
                username: raw,
                enterpriseUserId: existing.enterprise_user_id,
                nodeId: existing.node_id,
                status: AddUserStatus.Skipped,
                skipReason: AddUserSkipReason.AlreadyExists,
                message: `User "${raw}" already exists.`,
            })
            continue
        }

        try {
            const enterpriseUserId = await allocateEnterpriseId(auth)
            const encryptedData = await encryptObjectForStorage({ displayname: fullName || '' }, treeKey)
            await sendUserAdd(auth, {
                enterprise_user_id: enterpriseUserId,
                enterprise_user_username: email,
                node_id: parentNodeId,
                encrypted_data: encryptedData,
                full_name: fullName,
                job_title: jobTitle,
            })
            items.push({
                username: email,
                enterpriseUserId,
                nodeId: parentNodeId,
                status: AddUserStatus.Added,
            })
        } catch (err) {
            items.push({
                username: raw,
                status: AddUserStatus.Failed,
                message: extractErrorMessage(err),
            })
        }
    }

    return finalizeResult(items, parentNodeId, parentNodeName)
}

async function allocateEnterpriseId(auth: Auth): Promise<number> {
    const command: RestCommand<AllocateIdsPayload, AllocateIdsResponse> = {
        baseRequest: { command: ALLOCATE_IDS_COMMAND },
        request: { number_requested: 1 },
        authorization: {},
    }
    const response = await auth.executeRestCommand(command)
    const result = (response.result || '').toLowerCase()
    if (result && result !== 'success') {
        throw new KeeperSdkError(
            response.message || response.result_code || 'enterprise_allocate_ids failed',
            response.result_code || ResultCodes.USER_ADD_FAILED
        )
    }
    if (!isNumber(response.base_id) || response.base_id === 0) {
        throw new KeeperSdkError('Failed to allocate enterprise user ID.', ResultCodes.USER_ADD_FAILED)
    }
    return response.base_id
}

async function sendUserAdd(auth: Auth, payload: UserAddPayload): Promise<void> {
    const command: RestCommand<UserAddPayload, UserAddResponse> = {
        baseRequest: { command: USER_ADD_COMMAND },
        request: payload,
        authorization: {},
    }
    const response = await auth.executeRestCommand(command)
    const result = (response.result || '').toLowerCase()
    if (result && result !== 'success') {
        throw new KeeperSdkError(
            response.message ||
                response.result_code ||
                `${USER_ADD_COMMAND} failed for "${payload.enterprise_user_username}"`,
            response.result_code || ResultCodes.USER_ADD_FAILED
        )
    }
}

function buildExistingByEmail(users: EnterpriseUser[]): Map<string, EnterpriseUser> {
    const map = new Map<string, EnterpriseUser>()
    for (const u of users) {
        if (u.username) map.set(u.username.toLowerCase(), u)
    }
    return map
}

function finalizeResult(
    items: AddUserItemResult[],
    parentNodeId: number,
    parentNodeName: string
): AddUserResult {
    let added = 0, skipped = 0, failed = 0
    for (const item of items) {
        if (item.status === AddUserStatus.Added) added++
        else if (item.status === AddUserStatus.Skipped) skipped++
        else failed++
    }
    return { success: failed === 0 && added > 0, parentNodeId, parentNodeName, items, added, skipped, failed }
}

export function formatAddUserResult(
    result: AddUserResult,
    options: FormatAddUserResultOptions = {}
): FormattedAddUserTable {
    const showSkipped = options.showSkipped !== false
    const visible = result.items.filter((item) => showSkipped || item.status !== AddUserStatus.Skipped)

    const rows = visible.map((item, index) => [
        String(index + 1),
        item.status,
        item.username,
        item.enterpriseUserId != null ? String(item.enterpriseUserId) : '',
        item.nodeId != null ? String(item.nodeId) : '',
        item.message || item.skipReason || '',
    ])

    return {
        headers: [...USER_TABLE_HEADERS],
        rows,
        parentNodeName: result.parentNodeName,
        summary: `Added: ${result.added}  Skipped: ${result.skipped}  Failed: ${result.failed}`,
    }
}

export function renderAddUserAsciiTable(table: FormattedAddUserTable): string {
    const { headers, rows } = table
    const widths = headers.map((header, index) =>
        Math.max(header.length, ...rows.map((row) => (row[index] || '').length))
    )
    const padCell = (cell: string, columnIndex: number): string =>
        cell + ' '.repeat(Math.max(0, widths[columnIndex] - cell.length))
    const formatRow = (cells: string[]): string =>
        cells.map((cell, columnIndex) => padCell(cell, columnIndex)).join('  ')

    const lines: string[] = []
    lines.push(`Parent: ${table.parentNodeName}`)
    lines.push(formatRow(headers))
    lines.push(formatRow(widths.map((width) => '-'.repeat(width))))
    for (const row of rows) lines.push(formatRow(row))
    lines.push(table.summary)
    return lines.join('\n')
}

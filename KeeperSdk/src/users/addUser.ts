import {
    encryptObjectForStorage,
    enterpriseAllocateIdsCommand,
    enterpriseUserAddCommand,
    resendEnterpriseInviteCommand,
    type Auth,
    type EnterpriseUserAddRequest,
    type KeeperResponse,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, isNumber, isValidEmail, KeeperSdkError, ResultCodes } from '../utils'
import { EnterpriseDataInclude, EnterpriseDataManager, type EnterpriseUser } from '../teams/enterpriseData'
import {
    applyDecryptedNodeNames,
    applyEnterpriseNameToRoot,
    parentNeedsNameLookup,
    resolveParentNode,
} from '../teams/teamUtils'
import {
    EnterpriseUserStatus,
    normalizeEmailInputs,
    validateUserProfileFields,
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

const ADD_USER_INCLUDES: EnterpriseDataInclude[] = [EnterpriseDataInclude.Nodes, EnterpriseDataInclude.Users]

const USER_TABLE_HEADERS = ['#', 'Status', 'Email', 'User ID', 'Node ID', 'Detail']

export async function addUsers(auth: Auth, input: AddUserInput): Promise<AddUserResult> {
    const rawEmails = [
        ...new Map(normalizeEmailInputs(input.emails).map((e) => [e.toLowerCase(), e] as const)).values(),
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
        EnterpriseDataManager.getNodePath(nodes, parentNode.node_id, {
            omitRoot: false,
        }) ||
        (parentNode.displayName || '').trim() ||
        String(parentNode.node_id)

    const treeKey = await enterpriseData.getTreeKey()
    if (!treeKey) {
        throw new KeeperSdkError('Enterprise tree key is unavailable.', ResultCodes.ENTERPRISE_TREE_KEY_UNAVAILABLE)
    }

    const existingByEmail = buildExistingByEmail(existingUsers)
    const fullName = (input.fullName || '').trim() || undefined
    const jobTitle = (input.jobTitle || '').trim() || undefined
    validateUserProfileFields(fullName, jobTitle)

    const items: AddUserItemResult[] = []

    for (const raw of rawEmails) {
        const email = raw.toLowerCase()
        const item: AddUserItemResult = {
            username: raw,
            status: AddUserStatus.Failed,
        }

        if (!isValidEmail(email)) {
            item.status = AddUserStatus.Skipped
            item.skipReason = AddUserSkipReason.InvalidEmail
            item.message = `"${raw}" is not a valid email address.`
            items.push(item)
            continue
        }

        const existing = existingByEmail.get(email)
        if (existing) {
            item.enterpriseUserId = existing.enterprise_user_id
            item.nodeId = existing.node_id

            if (existing.status === EnterpriseUserStatus.Invited) {
                try {
                    await sendReinvite(auth, existing.enterprise_user_id)
                    item.status = AddUserStatus.Reinvited
                    item.message = 'Invitation resent.'
                } catch (err) {
                    item.message = extractErrorMessage(err)
                }
            } else {
                item.status = AddUserStatus.Skipped
                item.skipReason = AddUserSkipReason.AlreadyExists
                item.message = `User "${raw}" has already accepted the invitation.`
            }
            items.push(item)
            continue
        }

        item.username = email
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
            item.enterpriseUserId = enterpriseUserId
            item.nodeId = parentNodeId
            item.status = AddUserStatus.Added
        } catch (err) {
            item.message = extractErrorMessage(err)
        }
        items.push(item)
    }

    return finalizeResult(items, parentNodeId, parentNodeName)
}

async function allocateEnterpriseId(auth: Auth): Promise<number> {
    const response = await auth.executeRestCommand(enterpriseAllocateIdsCommand({ number_requested: 1 }))
    assertCommandSuccess(response, 'enterprise_allocate_ids failed')
    if (!isNumber(response.base_id) || response.base_id === 0) {
        throw new KeeperSdkError('Failed to allocate enterprise user ID.', ResultCodes.USER_ADD_FAILED)
    }
    return response.base_id
}

async function sendUserAdd(auth: Auth, payload: EnterpriseUserAddRequest): Promise<void> {
    const response = await auth.executeRestCommand(enterpriseUserAddCommand(payload))
    assertCommandSuccess(response, `enterprise_user_add failed for "${payload.enterprise_user_username}"`)
}

async function sendReinvite(auth: Auth, enterpriseUserId: number): Promise<void> {
    const response = await auth.executeRestCommand(
        resendEnterpriseInviteCommand({ enterprise_user_id: enterpriseUserId })
    )
    assertCommandSuccess(response, `resend_enterprise_invite failed for user_id=${enterpriseUserId}`)
}

function assertCommandSuccess(response: KeeperResponse, fallbackMessage: string): void {
    const result = (response.result || '').toLowerCase()
    if (result && result !== 'success') {
        throw new KeeperSdkError(
            response.message || response.result_code || fallbackMessage,
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

function finalizeResult(items: AddUserItemResult[], parentNodeId: number, parentNodeName: string): AddUserResult {
    let added = 0,
        reinvited = 0,
        skipped = 0,
        failed = 0
    for (const item of items) {
        if (item.status === AddUserStatus.Added) added++
        else if (item.status === AddUserStatus.Reinvited) reinvited++
        else if (item.status === AddUserStatus.Skipped) skipped++
        else failed++
    }
    return {
        success: failed === 0 && (added > 0 || reinvited > 0),
        parentNodeId,
        parentNodeName,
        items,
        added,
        reinvited,
        skipped,
        failed,
    }
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
        summary: `Added: ${result.added}  Reinvited: ${result.reinvited}  Skipped: ${result.skipped}  Failed: ${result.failed}`,
    }
}

export function renderAddUserAsciiTable(table: FormattedAddUserTable): string {
    const { headers, rows } = table
    const widths = headers.map((header, index) =>
        Math.max(header.length, ...rows.map((row) => (row[index] || '').length))
    )
    const padCell = (cell: string, columnIndex: number): string => cell.padEnd(widths[columnIndex])
    const formatRow = (cells: string[]): string =>
        cells.map((cell, columnIndex) => padCell(cell, columnIndex)).join('  ')

    const lines: string[] = [
        `Parent: ${table.parentNodeName}`,
        formatRow(headers),
        formatRow(widths.map((w) => '-'.repeat(w))),
        ...rows.map(formatRow),
        table.summary,
    ]
    return lines.join('\n')
}

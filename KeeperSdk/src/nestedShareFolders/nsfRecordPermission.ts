import type { Auth, DKdFolderRecord } from '@keeper-security/keeperapi'
import {
    Folder,
    platform,
    record,
    recordsShareV3Message,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { getRecordTitle } from '../records/RecordUtils'
import {
    buildNsfRevokePermissionFromKeys,
    buildNsfSharePermissionFromKeys,
    loadUserShareKeysOrInvite,
    parseRecordSharingStatus,
    preloadNsfUserShareKeys,
    type UserShareKeys,
} from './nsfShareKeys'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import {
    KeeperDriveKind,
    fetchLiveRecordAccessesV3,
    ensureNestedShareFolder,
    getKeeperDriveFolder,
    getKeeperDriveFolders,
    getKeeperDriveRecord,
    getNsfAccessRoleLabel,
    normalizeNsfRecordPermissionRole,
    resolveNsfFolderIdentifier,
    resolveNsfRoleName,
} from './nsfHelpers'
import { NSF_RECORD_PERMISSION_ROLES, NSF_SHARE_BATCH_SIZE } from './nsfConstants'
import { resolveRecordKeyBytes } from './nsfRecordCrypto'
import type { NsfLiveRecordAccessEntry } from './nsfHelpers'
import type {
    NsfRecordPermissionActionInput,
    NsfRecordPermissionFailure,
    NsfRecordPermissionPlan,
    NsfRecordPermissionPlanItem,
    UpdateNsfRecordPermissionInput,
    UpdateNsfRecordPermissionResult,
} from './nsfTypes'
import { NsfPermissionFailureCode, NsfRecordPermissionAction } from './nsfTypes'

type NsfRecordAccessEntry = NsfLiveRecordAccessEntry

type NsfSharePermissionItem = {
    recordUid: string
    email: string
    accessRoleType?: Folder.AccessRoleType
    curRole?: string
    newRole?: string
}

type NsfShareOperationOutcome = {
    recordUid: string
    email: string
    success: boolean
    skipped?: boolean
    message?: string
}

type PermissionChangeBuckets = {
    updates: NsfSharePermissionItem[]
    creates: NsfSharePermissionItem[]
    revokes: NsfSharePermissionItem[]
    skipped: NsfRecordPermissionPlanItem[]
}

function normalizeAction(action: NsfRecordPermissionActionInput): NsfRecordPermissionAction {
    const value = action as NsfRecordPermissionAction
    if (value === NsfRecordPermissionAction.Grant || value === NsfRecordPermissionAction.Revoke) {
        return value
    }
    throw new KeeperSdkError(
        `Invalid action '${action}'. Use: grant, revoke.`,
        ResultCodes.NSF_RECORD_PERMISSION_FAILED
    )
}

function buildFolderRecordMap(storage: InMemoryStorage): Map<string, Set<string>> {
    const map = new Map<string, Set<string>>()
    for (const entry of storage.getAll<DKdFolderRecord>(KeeperDriveKind.FolderRecord)) {
        const folderUid = entry.folderUid
        if (!map.has(folderUid)) map.set(folderUid, new Set())
        map.get(folderUid)!.add(entry.recordUid)
    }
    return map
}

function resolveFolderForPermission(
    storage: InMemoryStorage,
    folderInput?: string
): { folderUid: string | null; displayName: string } {
    const trimmed = folderInput?.trim()
    if (!trimmed) {
        return { folderUid: null, displayName: 'root' }
    }

    const folderUid = resolveNsfFolderIdentifier(storage, trimmed)
    if (!folderUid) {
        throw new KeeperSdkError(`Folder "${trimmed}" not found`, ResultCodes.NSF_NOT_FOUND)
    }
    ensureNestedShareFolder(storage, folderUid, trimmed)
    const folder = getKeeperDriveFolder(storage, folderUid)
    return {
        folderUid,
        displayName: folder?.data.name || trimmed,
    }
}

export function collectNsfRecordUidsInFolder(
    storage: InMemoryStorage,
    folderUid: string | null,
    recursive: boolean
): Set<string> {
    const folders = getKeeperDriveFolders(storage)
    const folderUids = new Set(folders.map((folder) => folder.uid))
    const folderRecords = buildFolderRecordMap(storage)
    const recordUids = new Set<string>()

    const walk = (currentUid: string, visited = new Set<string>()): void => {
        if (visited.has(currentUid)) return
        visited.add(currentUid)
        for (const recordUid of folderRecords.get(currentUid) ?? []) {
            recordUids.add(recordUid)
        }
        if (!recursive) return
        for (const folder of folders) {
            if (folder.parentUid !== currentUid) continue
            if (visited.has(folder.uid)) continue
            walk(folder.uid, visited)
        }
    }

    if (folderUid) {
        walk(folderUid)
        return recordUids
    }

    for (const [fuid, records] of folderRecords.entries()) {
        if (!folderUids.has(fuid)) {
            for (const recordUid of records) recordUids.add(recordUid)
        }
    }
    if (recursive) {
        for (const folder of folders) {
            walk(folder.uid)
        }
    }
    return recordUids
}

function recordTitle(storage: InMemoryStorage, recordUid: string): string {
    const recordEntry = getKeeperDriveRecord(storage, recordUid)
    if (!recordEntry) return ''
    return getRecordTitle(recordEntry).slice(0, 32)
}


async function getRecordAccessesV3(
    auth: Auth,
    storage: InMemoryStorage,
    recordUids: string[]
): Promise<{ recordAccesses: NsfRecordAccessEntry[]; forbiddenRecords: string[] }> {
    if (recordUids.length === 0) {
        throw new KeeperSdkError('At least one record UID required.', ResultCodes.NSF_RECORD_PERMISSION_FAILED)
    }
    return fetchLiveRecordAccessesV3(auth, storage, recordUids)
}

async function requireRecordKey(
    storage: InMemoryStorage,
    auth: Auth,
    recordUid: string
): Promise<Uint8Array> {
    const recordKey = await resolveRecordKeyBytes(storage, auth, recordUid)
    if (!recordKey) {
        throw new KeeperSdkError(
            `Record key not available for ${recordUid}. Run sync() first.`,
            ResultCodes.NSF_MISSING_KEY
        )
    }
    return recordKey
}

async function buildSharePermission(
    storage: InMemoryStorage,
    auth: Auth,
    item: NsfSharePermissionItem,
    userKeysByEmail: Map<string, UserShareKeys>
): Promise<record.v3.sharing.IPermissions> {
    const recordKey = await requireRecordKey(storage, auth, item.recordUid)
    const emailKey = item.email.trim().toLowerCase()
    let userKeys = userKeysByEmail.get(emailKey)
    if (!userKeys) {
        userKeys = await loadUserShareKeysOrInvite(auth, item.email, ResultCodes.NSF_RECORD_PERMISSION_FAILED)
        userKeysByEmail.set(emailKey, userKeys)
    }
    return buildNsfSharePermissionFromKeys(
        item.recordUid,
        recordKey,
        item.accessRoleType ?? Folder.AccessRoleType.VIEWER,
        userKeys
    )
}

async function buildRevokePermission(
    item: NsfSharePermissionItem,
    userKeysByEmail: Map<string, UserShareKeys>
): Promise<record.v3.sharing.IPermissions> {
    const emailKey = item.email.trim().toLowerCase()
    const userKeys = userKeysByEmail.get(emailKey)
    if (!userKeys) {
        throw new KeeperSdkError(
            `User ${item.email} not found`,
            ResultCodes.NSF_RECORD_PERMISSION_FAILED
        )
    }
    return buildNsfRevokePermissionFromKeys(item.recordUid, userKeys)
}

async function preloadUserShareKeys(
    auth: Auth,
    items: NsfSharePermissionItem[],
    inviteMissing: boolean
): Promise<Map<string, UserShareKeys>> {
    return preloadNsfUserShareKeys(
        auth,
        items.map((item) => item.email),
        inviteMissing,
        ResultCodes.NSF_RECORD_PERMISSION_FAILED
    )
}

async function executeShareBatch(
    auth: Auth,
    request: record.v3.sharing.IRequest,
    statusField: 'updatedSharingStatus' | 'createdSharingStatus' | 'revokedSharingStatus'
): Promise<Array<{ recordUid: string; success: boolean; message: string }>> {
    const response = await auth.executeRest(recordsShareV3Message(request))
    const statuses = response[statusField] ?? []
    return statuses.map((status) => parseRecordSharingStatus(status))
}

async function runShareBatch<T extends NsfSharePermissionItem>(
    auth: Auth,
    items: T[],
    buildPermission: (item: T, userKeysByEmail: Map<string, UserShareKeys>) => Promise<record.v3.sharing.IPermissions>,
    applyToRequest: (request: record.v3.sharing.IRequest, permission: record.v3.sharing.IPermissions) => void,
    statusField: 'updatedSharingStatus' | 'createdSharingStatus' | 'revokedSharingStatus',
    inviteMissingKeys: boolean
): Promise<NsfShareOperationOutcome[]> {
    const outcomes: NsfShareOperationOutcome[] = []

    for (let index = 0; index < items.length; index += NSF_SHARE_BATCH_SIZE) {
        const chunk = items.slice(index, index + NSF_SHARE_BATCH_SIZE)
        const userKeysByEmail = await preloadUserShareKeys(auth, chunk, inviteMissingKeys)
        const request: record.v3.sharing.IRequest = {}
        const built: T[] = []

        for (const item of chunk) {
            try {
                const permission = await buildPermission(item, userKeysByEmail)
                applyToRequest(request, permission)
                built.push(item)
            } catch (err) {
                outcomes.push({
                    recordUid: item.recordUid,
                    email: item.email,
                    success: false,
                    skipped: true,
                    message: extractErrorMessage(err),
                })
            }
        }

        if (built.length === 0) continue

        try {
            const statusList = await executeShareBatch(auth, request, statusField)
            for (let itemIndex = 0; itemIndex < built.length; itemIndex++) {
                const item = built[itemIndex]
                const status = statusList[itemIndex]
                outcomes.push({
                    recordUid: item.recordUid,
                    email: item.email,
                    success: status?.success ?? false,
                    message: status?.message ?? 'No status returned',
                })
            }
        } catch (err) {
            const message = extractErrorMessage(err)
            for (const item of built) {
                outcomes.push({
                    recordUid: item.recordUid,
                    email: item.email,
                    success: false,
                    message,
                })
            }
        }
    }

    return outcomes
}

async function batchUpdateRecordSharesV3(
    storage: InMemoryStorage,
    auth: Auth,
    updates: NsfSharePermissionItem[]
): Promise<NsfShareOperationOutcome[]> {
    return runShareBatch(
        auth,
        updates,
        (item, userKeysByEmail) => buildSharePermission(storage, auth, item, userKeysByEmail),
        (request, permission) => {
            request.updateSharingPermissions = [...(request.updateSharingPermissions ?? []), permission]
        },
        'updatedSharingStatus',
        true
    )
}

async function batchCreateRecordSharesV3(
    storage: InMemoryStorage,
    auth: Auth,
    creates: NsfSharePermissionItem[]
): Promise<NsfShareOperationOutcome[]> {
    return runShareBatch(
        auth,
        creates,
        (item, userKeysByEmail) => buildSharePermission(storage, auth, item, userKeysByEmail),
        (request, permission) => {
            request.createSharingPermissions = [...(request.createSharingPermissions ?? []), permission]
        },
        'createdSharingStatus',
        true
    )
}

async function batchUnshareRecordsV3(
    auth: Auth,
    revokes: NsfSharePermissionItem[]
): Promise<NsfShareOperationOutcome[]> {
    return runShareBatch(
        auth,
        revokes,
        (item, userKeysByEmail) => buildRevokePermission(item, userKeysByEmail),
        (request, permission) => {
            request.revokeSharingPermissions = [...(request.revokeSharingPermissions ?? []), permission]
        },
        'revokedSharingStatus',
        false
    )
}

function computePermissionChanges(
    storage: InMemoryStorage,
    accesses: NsfRecordAccessEntry[],
    forbiddenRecords: string[],
    recordUids: Set<string>,
    currentUser: string,
    action: NsfRecordPermissionAction,
    role: string | undefined,
    accessRoleType: number | undefined
): PermissionChangeBuckets {
    const updates: NsfSharePermissionItem[] = []
    const creates: NsfSharePermissionItem[] = []
    const revokes: NsfSharePermissionItem[] = []
    const skipped: NsfRecordPermissionPlanItem[] = []

    const forbidden = new Set(forbiddenRecords)
    const ownerFlags = new Map<string, boolean>()
    const currentUserLower = currentUser.toLowerCase()

    for (const access of accesses) {
        if (access.accessorName.toLowerCase() === currentUserLower) {
            ownerFlags.set(access.recordUid, access.owner || access.canUpdateAccess)
        }
    }

    for (const recordUid of recordUids) {
        if (!forbidden.has(recordUid)) continue
        skipped.push({
            recordUid,
            title: recordTitle(storage, recordUid),
            email: '',
            curRole: '',
            reason: 'No access — record is forbidden',
        })
    }

    for (const access of accesses) {
        const recordUid = access.recordUid
        if (!recordUids.has(recordUid) || access.owner) continue

        const email = access.accessorName
        if (!email || email.toLowerCase() === currentUserLower) continue

        const curRole = getNsfAccessRoleLabel(access)
        const isInherited = access.inherited
        const title = recordTitle(storage, recordUid)

        if (!ownerFlags.get(recordUid)) {
            skipped.push({
                recordUid,
                title,
                email,
                curRole,
                reason: 'Insufficient permission (can_update_access is false)',
            })
            continue
        }

        if (action === NsfRecordPermissionAction.Grant) {
            if (curRole === role) continue
            const entry: NsfSharePermissionItem = {
                recordUid,
                email,
                curRole,
                newRole: role,
                accessRoleType,
            }
            if (isInherited) {
                creates.push(entry)
            } else {
                updates.push(entry)
            }
            continue
        }

        if (role && curRole !== role) continue
        if (isInherited) {
            skipped.push({
                recordUid,
                title,
                email,
                curRole,
                reason: 'Inherited from a shared folder — revoke at the parent shared folder',
            })
            continue
        }
        revokes.push({ recordUid, email, curRole })
    }

    return { updates, creates, revokes, skipped }
}

function planItemFromShare(
    storage: InMemoryStorage,
    item: NsfSharePermissionItem,
    inherited = false
): NsfRecordPermissionPlanItem {
    return {
        recordUid: item.recordUid,
        title: recordTitle(storage, item.recordUid),
        email: item.email,
        curRole: inherited ? `${item.curRole || ''} (inherited)`.trim() : item.curRole || '',
        newRole: item.newRole,
    }
}

export function buildNsfRecordPermissionPlan(
    storage: InMemoryStorage,
    buckets: PermissionChangeBuckets
): NsfRecordPermissionPlan {
    return {
        grants: [
            ...buckets.updates.map((item) => planItemFromShare(storage, item)),
            ...buckets.creates.map((item) => planItemFromShare(storage, item, true)),
        ],
        revokes: buckets.revokes.map((item) => ({
            recordUid: item.recordUid,
            title: recordTitle(storage, item.recordUid),
            email: item.email,
            curRole: item.curRole || '',
        })),
        skipped: buckets.skipped,
    }
}

function formatPermissionPlanTable(
    title: string,
    headers: string[],
    rows: string[][]
): string[] {
    if (rows.length === 0) return []

    const columnCount = headers.length
    const widths = headers.map((header, columnIndex) => {
        let width = header.length
        for (const row of rows) {
            width = Math.max(width, (row[columnIndex] ?? '').length)
        }
        return width
    })
    const pad = (cell: string, columnIndex: number) =>
        cell + ' '.repeat(Math.max(0, widths[columnIndex] - cell.length))
    const formatRow = (cells: string[]) => cells.map((cell, columnIndex) => pad(cell, columnIndex)).join('  ')
    const rule = widths.map((width, columnIndex) => pad('-'.repeat(width), columnIndex)).join('  ')

    return [title, '', formatRow(headers), rule, ...rows.map((row) => formatRow(row)), '']
}

export function formatNsfRecordPermissionRequestHeader(
    action: NsfRecordPermissionActionInput,
    role: string | undefined,
    folderDisplayName: string,
    recursive: boolean
): string {
    const normalizedAction = normalizeAction(action)
    const scope = recursive ? 'and sub-folders' : 'only'
    if (normalizedAction === NsfRecordPermissionAction.Grant) {
        return `Request to GRANT "${role ?? ''}" permission(s) in "${folderDisplayName}" folder ${scope}`
    }
    const roleSuffix = role ? ` matching "${role}"` : ''
    return `Request to REVOKE record permission(s)${roleSuffix} in "${folderDisplayName}" folder ${scope}`
}

export function formatNsfRecordPermissionPlan(plan: NsfRecordPermissionPlan): string {
    const lines: string[] = []

    if (plan.skipped.length > 0) {
        lines.push(
            ...formatPermissionPlanTable(
                'SKIP — Record permission(s). Not permitted',
                ['Record UID', 'Title', 'Email', 'Current Role', 'Reason'],
                plan.skipped.map((item) => [
                    item.recordUid,
                    item.title || '—',
                    item.email || '—',
                    item.curRole || '—',
                    item.reason || 'Unknown',
                ])
            )
        )
    }

    if (plan.grants.length > 0) {
        lines.push(
            ...formatPermissionPlanTable(
                'GRANT Record permission(s)',
                ['#', 'Record UID', 'Title', 'Email', 'Current Role', 'New Role'],
                plan.grants.map((item, index) => [
                    String(index + 1),
                    item.recordUid,
                    item.title || '—',
                    item.email,
                    item.curRole || '—',
                    item.newRole || '—',
                ])
            )
        )
        lines.push('WARNING: Review the planned changes carefully before confirming.')
        lines.push('')
    }

    if (plan.revokes.length > 0) {
        lines.push(
            ...formatPermissionPlanTable(
                'REVOKE — Record share(s)',
                ['#', 'Record UID', 'Title', 'Email', 'Current Role'],
                plan.revokes.map((item, index) => [
                    String(index + 1),
                    item.recordUid,
                    item.title || '—',
                    item.email,
                    item.curRole || '—',
                ])
            )
        )
        lines.push('WARNING: Review the planned changes carefully before confirming.')
        lines.push('')
    }

    return lines.join('\n').trimEnd()
}

function mapFailures(
    outcomes: NsfShareOperationOutcome[],
    defaultCode: string
): NsfRecordPermissionFailure[] {
    return outcomes
        .filter((outcome) => !outcome.success)
        .map((outcome) => ({
            recordUid: outcome.recordUid,
            email: outcome.email,
            code: outcome.skipped ? NsfPermissionFailureCode.Skipped : defaultCode,
            message: outcome.message || 'Unknown error',
        }))
}

export async function updateNestedShareRecordPermissions(
    storage: InMemoryStorage,
    auth: Auth,
    input: UpdateNsfRecordPermissionInput
): Promise<UpdateNsfRecordPermissionResult> {
    const action = normalizeAction(input.action)
    const recursive = input.recursive ?? false
    const dryRun = input.dryRun ?? false
    const normalizedRole = normalizeNsfRecordPermissionRole(input.role)

    if (action === NsfRecordPermissionAction.Grant) {
        if (!normalizedRole) {
            throw new KeeperSdkError('Role is required for grant action.', ResultCodes.NSF_RECORD_PERMISSION_FAILED)
        }
        if (!(NSF_RECORD_PERMISSION_ROLES as readonly string[]).includes(normalizedRole)) {
            throw new KeeperSdkError(
                `Invalid role '${input.role}'. Use: ${NSF_RECORD_PERMISSION_ROLES.join(', ')}.`,
                ResultCodes.NSF_RECORD_PERMISSION_FAILED
            )
        }
    } else if (input.role) {
        normalizeNsfRecordPermissionRole(input.role)
    }

    const accessRoleType =
        action === NsfRecordPermissionAction.Grant && normalizedRole
            ? resolveNsfRoleName(normalizedRole)
            : undefined

    const { folderUid, displayName } = resolveFolderForPermission(storage, input.folder)
    const recordUids = collectNsfRecordUidsInFolder(storage, folderUid, recursive)
    if (recordUids.size === 0) {
        throw new KeeperSdkError('No records found in the specified folder.', ResultCodes.NSF_NOT_FOUND)
    }

    try {
        const accessesResult = await getRecordAccessesV3(auth, storage, [...recordUids])
        const buckets = computePermissionChanges(
            storage,
            accessesResult.recordAccesses,
            accessesResult.forbiddenRecords,
            recordUids,
            auth.username,
            action,
            normalizedRole,
            accessRoleType
        )
        const plan = buildNsfRecordPermissionPlan(storage, buckets)

        if (buckets.updates.length === 0 && buckets.creates.length === 0 && buckets.revokes.length === 0) {
            return {
                confirmed: false,
                dryRun,
                folderDisplayName: displayName,
                plan,
                grantFailures: [],
                revokeFailures: [],
                message: plan.skipped.length
                    ? 'No permission changes can be made.'
                    : 'No permission changes are needed.',
            }
        }

        if (dryRun || !input.force) {
            return {
                confirmed: false,
                dryRun,
                folderDisplayName: displayName,
                plan,
                grantFailures: [],
                revokeFailures: [],
                message: dryRun
                    ? undefined
                    : 'Confirmation required. Set force=true to proceed.',
            }
        }

        const grantOutcomes: NsfShareOperationOutcome[] = []
        if (buckets.updates.length > 0) {
            grantOutcomes.push(...(await batchUpdateRecordSharesV3(storage, auth, buckets.updates)))
        }
        if (buckets.creates.length > 0) {
            grantOutcomes.push(...(await batchCreateRecordSharesV3(storage, auth, buckets.creates)))
        }

        const revokeOutcomes =
            buckets.revokes.length > 0 ? await batchUnshareRecordsV3(auth, buckets.revokes) : []

        return {
            confirmed: true,
            dryRun: false,
            folderDisplayName: displayName,
            plan,
            grantFailures: mapFailures(grantOutcomes, 'error'),
            revokeFailures: mapFailures(revokeOutcomes, 'error'),
            message: 'Record permission changes applied.',
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to update nested share record permissions: ${extractErrorMessage(err)}`,
            ResultCodes.NSF_RECORD_PERMISSION_FAILED
        )
    }
}

export function formatNsfRecordPermissionFailures(
    failures: NsfRecordPermissionFailure[],
    kind: 'GRANT' | 'REVOKE'
): string {
    if (failures.length === 0) return ''
    const lines = [`Failed to ${kind} — Record permission(s)`]
    for (const failure of failures) {
        lines.push(`  ${failure.recordUid}  ${failure.email}  ${failure.code}  ${failure.message}`)
    }
    return lines.join('\n')
}

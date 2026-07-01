import type {
    Auth,
    DRecord,
    DUser,
    DKdFolder,
    DKdFolderAccess,
    DKdFolderRecord,
    DKdRecordAccess,
} from '@keeper-security/keeperapi'
import {
    Folder,
    Records,
    getFolderAccessMessage,
    getRecordAccessMessage,
    getShareObjectsMessage,
    normal64Bytes,
    webSafe64FromBytes,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { VaultObjectKind } from '../folders/folderHelpers'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import { getRecordTitle } from '../records/RecordUtils'
import {
    NSF_ACCESS_ROLE_LABELS,
    NSF_ACCESS_TYPE_LABELS,
    NSF_LEGACY_FOLDER_MSG,
    NSF_LEGACY_RECORD_MSG,
    NSF_NOTE_FIELD_TYPES,
    NSF_PATH_SENTINEL,
    NSF_RECORD_DESCRIPTION_MAX_LENGTH,
    NSF_SENSITIVE_FIELD_TYPES,
} from './nsfConstants'

export enum KeeperDriveKind {
    Folder = 'keeper_drive_folder',
    FolderAccess = 'keeper_drive_folder_access',
    FolderRecord = 'keeper_drive_folder_record',
    RecordAccess = 'keeper_drive_record_access',
}

export enum NsfItemType {
    Folder = 'Folder',
    Record = 'Record',
}

export function nsfToNumber(
    value: number | { toNumber: () => number } | null | undefined,
    fallback?: number
): number | undefined {
    if (value == null) return fallback
    return typeof value === 'number' ? value : value.toNumber()
}

export function requireAuthAccountUid(auth: Auth): Uint8Array {
    const accountUid = auth.accountUid
    if (!accountUid?.length) {
        throw new KeeperSdkError('Not logged in. Call login() first.', ResultCodes.NOT_LOGGED_IN)
    }
    return accountUid
}

export function requireAuthDataKey(auth: Auth): Uint8Array {
    if (!auth.dataKey?.length) {
        throw new KeeperSdkError('Data key not available. Ensure you are logged in.', ResultCodes.NSF_MISSING_KEY)
    }
    return auth.dataKey
}

export function buildFolderOwnerInfo(auth: Auth): Folder.IUserInfo | undefined {
    if (!auth.accountUid?.length) return undefined
    return {
        accountUid: auth.accountUid,
        username: auth.username,
    }
}

export function parseFolderModifyStatus(
    result: Folder.IFolderModifyResult | null | undefined,
    failureCode: string
): string {
    if (!result) {
        throw new KeeperSdkError('No results from folder operation.', failureCode)
    }
    const status = result.status ?? Folder.FolderModifyStatus.SUCCESS
    const statusName = Folder.FolderModifyStatus[status] ?? String(status)
    if (status !== Folder.FolderModifyStatus.SUCCESS) {
        throw new KeeperSdkError(
            result.message || `Folder operation failed (${statusName}).`,
            failureCode
        )
    }
    return result.message || 'Folder operation succeeded'
}

export function parseRecordModifyStatus(
    result: Records.IRecordModifyStatus | null | undefined,
    failureCode: string
): { statusName: string; message: string } {
    if (!result) {
        throw new KeeperSdkError('No results from record operation.', failureCode)
    }
    const status = result.status ?? Records.RecordModifyResult.RS_SUCCESS
    const statusName =
        status === Records.RecordModifyResult.RS_SUCCESS
            ? 'SUCCESS'
            : (Records.RecordModifyResult[status] ?? String(status))
    if (status !== Records.RecordModifyResult.RS_SUCCESS) {
        throw new KeeperSdkError(
            result.message || `Record operation failed (${statusName}).`,
            failureCode
        )
    }
    return {
        statusName,
        message: result.message || 'Record operation succeeded',
    }
}

export function isNestedShareRecord(storage: InMemoryStorage, recordUid: string): boolean {
    return !!getKeeperDriveRecord(storage, recordUid)
}

function getKnownKeeperDriveFolderUids(storage: InMemoryStorage): Set<string> {
    return new Set(getKeeperDriveFolders(storage).map((folder) => folder.uid))
}

/** Per-account drive root UID inferred from sync (parentUid of top-level folders). */
export function resolveKeeperDriveRootParentUid(storage: InMemoryStorage): string | undefined {
    const knownFolderUids = getKnownKeeperDriveFolderUids(storage)
    for (const folder of getKeeperDriveFolders(storage)) {
        const parentUid = folder.parentUid?.trim()
        if (parentUid && !knownFolderUids.has(parentUid)) {
            return parentUid
        }
    }
    return undefined
}

export function isRootFolderUid(
    storage: InMemoryStorage,
    folderUid: string | undefined | null
): boolean {
    const value = (folderUid ?? '').trim()
    if (!value) return true
    const driveRoot = resolveKeeperDriveRootParentUid(storage)
    return !!driveRoot && value === driveRoot
}

export function normalizeParentUid(
    storage: InMemoryStorage,
    parentUid: string | undefined | null
): string {
    return isRootFolderUid(storage, parentUid) ? 'root' : (parentUid ?? '').trim()
}

export function isNestedShareFolder(storage: InMemoryStorage, folderUid: string): boolean {
    if (isRootFolderUid(storage, folderUid)) return true
    return !!getKeeperDriveFolder(storage, folderUid)
}

export function ensureNestedShareRecord(storage: InMemoryStorage, recordUid: string, identifier?: string): void {
    if (isNestedShareRecord(storage, recordUid)) return
    const ident = identifier ?? recordUid
    throw new KeeperSdkError(NSF_LEGACY_RECORD_MSG.replace('{0}', ident), ResultCodes.NSF_LEGACY_RECORD)
}

export function ensureNestedShareFolder(storage: InMemoryStorage, folderUid: string, identifier?: string): void {
    if (isNestedShareFolder(storage, folderUid)) return
    const ident = identifier ?? folderUid
    throw new KeeperSdkError(NSF_LEGACY_FOLDER_MSG.replace('{0}', ident), ResultCodes.NSF_LEGACY_FOLDER)
}

function resolveByUidOrName<T>(
    items: T[],
    identifier: string,
    getUid: (item: T) => string,
    getName: (item: T) => string
): T | undefined {
    const trimmed = identifier.trim()
    if (!trimmed) return undefined

    const byUid = items.find((item) => getUid(item) === trimmed)
    if (byUid) return byUid

    const lower = trimmed.toLowerCase()
    const nameMatches = items.filter((item) => getName(item).toLowerCase() === lower)
    if (nameMatches.length === 1) return nameMatches[0]
    if (nameMatches.length > 1) {
        throw new KeeperSdkError(
            `Multiple matches found for "${identifier}". Use a UID instead.`,
            ResultCodes.MULTIPLE_NSF_MATCHES
        )
    }
    return undefined
}

function resolveRecordByTitleSearch(storage: InMemoryStorage, identifier: string): DRecord | undefined {
    const lower = identifier.toLowerCase()
    const matches = getKeeperDriveRecords(storage).filter((record) => {
        const title = getRecordTitle(record)
        return title && lower.length > 0 && title.toLowerCase().includes(lower)
    })
    if (matches.length === 1) return matches[0]
    if (matches.length > 1) {
        throw new KeeperSdkError(
            `Multiple records matched "${identifier}". Use a UID instead.`,
            ResultCodes.MULTIPLE_NSF_MATCHES
        )
    }
    return undefined
}

function resolveFolderByPath(storage: InMemoryStorage, identifier: string): string | undefined {
    const trimmed = identifier.trim().replace(/^\/+/, '')
    if (!trimmed) return resolveKeeperDriveRootParentUid(storage) ?? ''

    const targetPath = `/${trimmed.toLowerCase()}`
    for (const folder of getKeeperDriveFolders(storage)) {
        if (buildFolderPath(storage, folder.uid).toLowerCase() === targetPath) {
            return folder.uid
        }
    }
    return undefined
}

export function resolveNsfRecordIdentifier(storage: InMemoryStorage, identifier: string): string | undefined {
    const trimmed = identifier.trim()
    if (!trimmed) return undefined

    const kdRecord = getKeeperDriveRecord(storage, trimmed)
    if (kdRecord) return kdRecord.uid

    const anyRecord = storage.getByUid<DRecord>(VaultObjectKind.Record, trimmed)
    if (anyRecord) return anyRecord.uid

    return resolveRecordByTitleSearch(storage, trimmed)?.uid
}

export function resolveNsfFolderIdentifier(storage: InMemoryStorage, identifier: string): string | undefined {
    const trimmed = identifier.trim()
    if (!trimmed) return undefined

    if (trimmed.toLowerCase() === 'root' || trimmed === '/') {
        return resolveKeeperDriveRootParentUid(storage) ?? ''
    }
    const driveRoot = resolveKeeperDriveRootParentUid(storage)
    if (driveRoot && trimmed === driveRoot) return driveRoot

    const byUidOrName = resolveByUidOrName(
        getKeeperDriveFolders(storage),
        trimmed,
        (folder) => folder.uid,
        (folder) => folder.data.name || ''
    )
    if (byUidOrName) return byUidOrName.uid

    return resolveFolderByPath(storage, trimmed)
}

export function resolveNsfFolderUidOrName(storage: InMemoryStorage, identifier: string): string | undefined {
    const trimmed = identifier.trim()
    if (!trimmed) return undefined

    if (getKeeperDriveFolder(storage, trimmed)) return trimmed

    return resolveByUidOrName(
        getKeeperDriveFolders(storage),
        trimmed,
        (folder) => folder.uid,
        (folder) => folder.data.name || ''
    )?.uid
}

export function parseNsfPath(folderPath: string): string[] {
    const collapsed = folderPath.replace(/\/\//g, NSF_PATH_SENTINEL)
    const segments: string[] = []
    for (const raw of collapsed.split('/')) {
        const name = raw.replace(new RegExp(NSF_PATH_SENTINEL, 'g'), '/').trim()
        if (name) segments.push(name)
    }
    if (segments.length === 0) {
        throw new KeeperSdkError('Invalid folder name.', ResultCodes.NSF_MKDIR_FAILED)
    }
    return segments
}

function isVirtualDriveRootParent(storage: InMemoryStorage, parentUid: string | undefined | null): boolean {
    const trimmed = parentUid?.trim()
    if (!trimmed || isRootFolderUid(storage, trimmed)) return true
    return !getKnownKeeperDriveFolderUids(storage).has(trimmed)
}

function isRootLevelParent(storage: InMemoryStorage, parentUid: string | undefined | null): boolean {
    return isVirtualDriveRootParent(storage, parentUid)
}

function folderParentsMatch(
    storage: InMemoryStorage,
    folderParentUid: string | undefined,
    searchParentUid: string | null | undefined
): boolean {
    if (normalizeParentUid(storage, folderParentUid) === normalizeParentUid(storage, searchParentUid)) {
        return true
    }
    return isRootLevelParent(storage, searchParentUid) && isRootLevelParent(storage, folderParentUid)
}

export function findExistingChildFolder(
    storage: InMemoryStorage,
    segment: string,
    parentUid: string | null | undefined
): string | undefined {
    const byUid = getKeeperDriveFolder(storage, segment)
    if (byUid) {
        if (parentUid == null || parentUid === '') {
            return segment
        }
        if (normalizeParentUid(storage, byUid.parentUid) === normalizeParentUid(storage, parentUid)) {
            return segment
        }
        return undefined
    }

    const lower = segment.toLowerCase()
    const exactMatches: string[] = []
    const rootMatches: string[] = []

    for (const folder of getKeeperDriveFolders(storage)) {
        const name = folder.data.name || ''
        if (name.toLowerCase() !== lower) continue

        if (normalizeParentUid(storage, folder.parentUid) === normalizeParentUid(storage, parentUid)) {
            exactMatches.push(folder.uid)
            continue
        }
        if (folderParentsMatch(storage, folder.parentUid, parentUid)) {
            rootMatches.push(folder.uid)
        }
    }

    if (exactMatches.length > 0) return exactMatches[0]
    if (rootMatches.length > 0) return rootMatches[0]
    return undefined
}

export function resolveKeeperDriveParentUid(
    storage: InMemoryStorage,
    parentUid: string | null | undefined
): string | null {
    if (parentUid && !isRootFolderUid(storage, parentUid)) return parentUid
    return resolveKeeperDriveRootParentUid(storage) ?? null
}

export async function cacheNewNsfFolder(
    storage: InMemoryStorage,
    auth: { username?: string; accountUid?: Uint8Array },
    folderUid: string,
    name: string,
    parentUid: string | null | undefined,
    inheritPermissions: boolean
): Promise<void> {
    const normalizedParent =
        parentUid && !isRootFolderUid(storage, parentUid)
            ? parentUid.trim()
            : resolveKeeperDriveRootParentUid(storage)
    await storage.put({
        kind: 'keeper_drive_folder',
        uid: folderUid,
        data: { name },
        parentUid: normalizedParent,
        ownerInfo: {
            accountUid: auth.accountUid?.length ? webSafe64FromBytes(auth.accountUid) : undefined,
            username: auth.username,
        },
        type: Folder.FolderUsageType.UT_NORMAL,
        inheritUserPermissions: inheritPermissions
            ? Folder.SetBooleanValue.BOOLEAN_TRUE
            : Folder.SetBooleanValue.BOOLEAN_FALSE,
    })
}

export function checkFolderDeletePermission(
    storage: InMemoryStorage,
    folderUid: string,
    username: string,
    accountUid: Uint8Array
): void {
    if (isRootFolderUid(storage, folderUid)) {
        throw new KeeperSdkError('The root folder cannot be removed.', ResultCodes.NSF_PERMISSION_DENIED)
    }

    const accountUidStr = toRequiredAccountUidStr(accountUid)
    const entries = getFolderAccessEntries(storage, folderUid)
    if (entries.length === 0) return

    for (const entry of entries) {
        if (!isCurrentUserFolderAccess(storage, entry, username, accountUidStr)) continue
        if (entry.accessType === Folder.AccessType.AT_OWNER || entry.permission?.canDelete) return
        throw new KeeperSdkError(
            'You do not have permission to delete this folder.',
            ResultCodes.NSF_PERMISSION_DENIED
        )
    }
    throw new KeeperSdkError(
        'You do not have permission to delete this folder.',
        ResultCodes.NSF_PERMISSION_DENIED
    )
}

export function findNestedShareFoldersForRecord(storage: InMemoryStorage, recordUid: string): string[] {
    return storage
        .getAll<DKdFolderRecord>(KeeperDriveKind.FolderRecord)
        .filter((entry) => entry.recordUid === recordUid)
        .map((entry) => entry.folderUid)
}

function toRequiredAccountUidStr(accountUid: Uint8Array): string {
    if (!accountUid.length) {
        throw new KeeperSdkError('Not logged in. Call login() first.', ResultCodes.NOT_LOGGED_IN)
    }
    return webSafe64FromBytes(accountUid)
}

function isCurrentUserRecordAccess(
    storage: InMemoryStorage,
    entry: DKdRecordAccess,
    username: string,
    accountUidStr: string
): boolean {
    return (
        (entry.accessType === Folder.AccessType.AT_USER && entry.accessTypeUid === accountUidStr) ||
        (username.length > 0 &&
            storage.getAll<DUser>('user').some(
                (user) =>
                    user.username === username &&
                    webSafe64FromBytes(user.accountUid) === entry.accessTypeUid
            ))
    )
}

function isCurrentUserFolderAccess(
    storage: InMemoryStorage,
    entry: DKdFolderAccess,
    username: string,
    accountUidStr: string
): boolean {
    if (
        entry.accessType !== Folder.AccessType.AT_USER &&
        entry.accessType !== Folder.AccessType.AT_OWNER
    ) {
        return false
    }
    return (
        entry.accessTypeUid === accountUidStr ||
        (username.length > 0 &&
            storage.getAll<DUser>('user').some(
                (user) =>
                    user.username === username &&
                    webSafe64FromBytes(user.accountUid) === entry.accessTypeUid
            ))
    )
}

function isFolderOwnerAccount(storage: InMemoryStorage, folderUid: string, accountUidStr: string): boolean {
    if (isRootFolderUid(storage, folderUid)) return true
    const folder = getKeeperDriveFolder(storage, folderUid)
    return folder?.ownerInfo?.accountUid === accountUidStr
}

type FolderPermissionFlag = 'canRemove' | 'canDelete'

function hasFolderPermission(
    storage: InMemoryStorage,
    folderUid: string,
    username: string,
    accountUid: Uint8Array,
    permission: FolderPermissionFlag
): boolean {
    const accountUidStr = toRequiredAccountUidStr(accountUid)
    if (isFolderOwnerAccount(storage, folderUid, accountUidStr)) return true

    for (const entry of getFolderAccessEntries(storage, folderUid)) {
        if (!isCurrentUserFolderAccess(storage, entry, username, accountUidStr)) continue
        if (entry.permission?.[permission]) return true
    }
    return false
}

function getRecordAccessEntries(storage: InMemoryStorage, recordUid: string): DKdRecordAccess[] {
    return storage
        .getAll<DKdRecordAccess>(KeeperDriveKind.RecordAccess)
        .filter((entry) => entry.recordUid === recordUid)
}

function canRecordBeDeleted(
    storage: InMemoryStorage,
    recordUid: string,
    username: string,
    accountUid: Uint8Array,
    folderUid?: string
): boolean {
    const accountUidStr = toRequiredAccountUidStr(accountUid)
    const entries = getRecordAccessEntries(storage, recordUid)
    if (entries.length === 0) return true

    for (const entry of entries) {
        if (!isCurrentUserRecordAccess(storage, entry, username, accountUidStr)) continue
        if (entry.owner || entry.canDelete) return true
        if (
            folderUid &&
            !isRootFolderUid(storage, folderUid) &&
            hasFolderPermission(storage, folderUid, username, accountUid, 'canDelete')
        ) {
            return true
        }
        return false
    }

    return (
        !!folderUid &&
        !isRootFolderUid(storage, folderUid) &&
        hasFolderPermission(storage, folderUid, username, accountUid, 'canDelete')
    )
}

export function checkFolderRemovePermission(
    storage: InMemoryStorage,
    folderUid: string,
    recordUid: string,
    username: string,
    accountUid: Uint8Array
): void {
    if (hasFolderPermission(storage, folderUid, username, accountUid, 'canRemove')) return
    // Folder-trash and unlink are less destructive than owner-trash. Allow when the user
    // can permanently delete the record, or owns it without explicit record-access entries
    // (common for records in a personal drive root with no folder-access sync data).
    if (canRecordBeDeleted(storage, recordUid, username, accountUid, folderUid)) return
    throw new KeeperSdkError(
        'You do not have permission to remove records from this folder.',
        ResultCodes.NSF_PERMISSION_DENIED
    )
}

export function checkRecordDeletePermission(
    storage: InMemoryStorage,
    recordUid: string,
    username: string,
    accountUid: Uint8Array,
    folderUid?: string
): void {
    if (canRecordBeDeleted(storage, recordUid, username, accountUid, folderUid)) return
    throw new KeeperSdkError(
        'You do not have permission to delete this record.',
        ResultCodes.NSF_PERMISSION_DENIED
    )
}

export function checkRecordEditPermission(
    storage: InMemoryStorage,
    recordUid: string,
    username: string,
    accountUid: Uint8Array
): void {
    const accountUidStr = toRequiredAccountUidStr(accountUid)
    const entries = getRecordAccessEntries(storage, recordUid)
    if (entries.length === 0) return

    for (const entry of entries) {
        if (!isCurrentUserRecordAccess(storage, entry, username, accountUidStr)) continue
        if (entry.owner || entry.canEdit) return
        throw new KeeperSdkError(
            'You do not have permission to edit this record.',
            ResultCodes.NSF_PERMISSION_DENIED
        )
    }
    throw new KeeperSdkError(
        'You do not have permission to edit this record.',
        ResultCodes.NSF_PERMISSION_DENIED
    )
}

export function formatAccessRoleType(role: Folder.AccessRoleType | null | undefined): string {
    if (role == null) return 'unknown'
    return NSF_ACCESS_ROLE_LABELS[role] ?? `role-${role}`
}

export function formatAccessType(type: Folder.AccessType | null | undefined): string {
    if (type == null) return 'unknown'
    return NSF_ACCESS_TYPE_LABELS[type] ?? `type-${type}`
}

export function getKeeperDriveFolders(storage: InMemoryStorage): DKdFolder[] {
    return storage.getAll<DKdFolder>(KeeperDriveKind.Folder)
}

export function getKeeperDriveRecords(storage: InMemoryStorage): DRecord[] {
    return storage.getRecords().filter((record) => record.isKeeperDriveData)
}

export function getKeeperDriveFolder(storage: InMemoryStorage, folderUid: string): DKdFolder | undefined {
    return storage.getByUid<DKdFolder>(KeeperDriveKind.Folder, folderUid)
}

export function getKeeperDriveRecord(storage: InMemoryStorage, recordUid: string): DRecord | undefined {
    const record = storage.getByUid<DRecord>('record', recordUid)
    return record?.isKeeperDriveData ? record : undefined
}

export function getFolderAccessEntries(storage: InMemoryStorage, folderUid: string): DKdFolderAccess[] {
    return storage
        .getAll<DKdFolderAccess>(KeeperDriveKind.FolderAccess)
        .filter((entry) => entry.folderUid === folderUid)
}

export function getFolderDisplayName(storage: InMemoryStorage, folderUid: string): string {
    if (isRootFolderUid(storage, folderUid)) return 'root'
    return getKeeperDriveFolder(storage, folderUid)?.data.name ?? folderUid
}

export function findRecordFolderLocation(storage: InMemoryStorage, recordUid: string): string {
    const folderUids = findNestedShareFoldersForRecord(storage, recordUid)
    if (folderUids.length === 0) return 'root'
    return getFolderDisplayName(storage, folderUids[0])
}

export function buildFolderPath(storage: InMemoryStorage, folderUid: string): string {
    if (isRootFolderUid(storage, folderUid)) return '/'

    const segments: string[] = []
    let currentUid: string | undefined = folderUid
    const seen = new Set<string>()

    while (currentUid && !isRootFolderUid(storage, currentUid) && !seen.has(currentUid)) {
        seen.add(currentUid)
        const folder = getKeeperDriveFolder(storage, currentUid)
        if (!folder) break
        segments.unshift(folder.data.name || folder.uid)
        currentUid = folder.parentUid
    }

    return `/${segments.join('/')}`
}

export function collectRecordsInFolder(storage: InMemoryStorage, folderUid: string): DRecord[] {
    const targetIsRoot = isRootFolderUid(storage, folderUid)
    const records: DRecord[] = []
    for (const entry of storage.getAll<DKdFolderRecord>(KeeperDriveKind.FolderRecord)) {
        const entryIsRoot = isRootFolderUid(storage, entry.folderUid)
        if (targetIsRoot ? !entryIsRoot : entry.folderUid !== folderUid) continue
        const record = getKeeperDriveRecord(storage, entry.recordUid)
        if (record) records.push(record)
    }
    return records
}

export function getRecordDescription(record: DRecord): string {
    const data = record.data
    if (!data || typeof data !== 'object') return ''

    const fields = Array.isArray(data.fields) ? data.fields : []
    for (const field of fields) {
        if (!NSF_NOTE_FIELD_TYPES.has(field?.type)) continue
        const value = Array.isArray(field.value) ? field.value[0] : field.value
        if (typeof value === 'string' && value.trim()) {
            return value.trim().slice(0, NSF_RECORD_DESCRIPTION_MAX_LENGTH)
        }
    }

    if (typeof data.notes === 'string' && data.notes.trim()) {
        return data.notes.trim().slice(0, NSF_RECORD_DESCRIPTION_MAX_LENGTH)
    }
    return ''
}

export function isSensitiveFieldType(fieldType: string): boolean {
    return NSF_SENSITIVE_FIELD_TYPES.has(fieldType)
}

export function resolveAccessUsername(
    storage: InMemoryStorage,
    accessTypeUid: string,
    folder?: DKdFolder,
    shareUsers?: Map<string, string>
): string {
    const fromShare = shareUsers?.get(accessTypeUid)
    if (fromShare) return fromShare

    for (const user of storage.getAll<DUser>('user')) {
        if (webSafe64FromBytes(user.accountUid) === accessTypeUid) {
            return user.username
        }
    }
    if (folder?.ownerInfo?.accountUid === accessTypeUid && folder.ownerInfo.username) {
        return folder.ownerInfo.username
    }
    return accessTypeUid
}

function toFolderAccessEntry(folderUid: string, accessor: Folder.IFolderAccessData): DKdFolderAccess {
    return {
        kind: 'keeper_drive_folder_access',
        accessUid: `${folderUid}:${webSafe64FromBytes(accessor.accessTypeUid!)}`,
        folderUid,
        accessTypeUid: webSafe64FromBytes(accessor.accessTypeUid!),
        accessType: accessor.accessType!,
        accessRoleType: accessor.accessRoleType!,
        permission: accessor.permissions ?? {},
        inherited: accessor.inherited ?? undefined,
        hidden: accessor.hidden ?? undefined,
    }
}

export async function loadShareUserMap(auth: Auth, storage: InMemoryStorage): Promise<Map<string, string>> {
    const map = new Map<string, string>()

    for (const user of storage.getAll<DUser>('user')) {
        if (user.accountUid?.length && user.username) {
            map.set(webSafe64FromBytes(user.accountUid), user.username)
        }
    }

    try {
        const response = await auth.executeRest(getShareObjectsMessage())
        for (const list of [
            response.shareEnterpriseUsers,
            response.shareFamilyUsers,
            response.shareRelationships,
            response.shareMCEnterpriseUsers,
        ]) {
            for (const entry of list ?? []) {
                if (entry.userAccountUid?.length && entry.username) {
                    map.set(webSafe64FromBytes(entry.userAccountUid), entry.username)
                }
            }
        }
    } catch {
        // Fall back to vault user cache only.
    }

    return map
}

export async function fetchLiveFolderAccessEntries(auth: Auth, folderUid: string): Promise<DKdFolderAccess[]> {
    try {
        const response = await auth.executeRest(
            getFolderAccessMessage({ folderUid: [normal64Bytes(folderUid)] })
        )
        const result = response.folderAccessResults?.find(
            (entry) => entry.folderUid?.length && webSafe64FromBytes(entry.folderUid) === folderUid
        )
        return (result?.accessors ?? [])
            .filter(
                (accessor) =>
                    accessor.accessTypeUid?.length &&
                    accessor.accessType != null &&
                    accessor.accessRoleType != null
            )
            .map((accessor) => toFolderAccessEntry(folderUid, accessor))
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to fetch folder permissions for ${folderUid}: ${extractErrorMessage(err)}`,
            ResultCodes.NSF_DETAILS_FAILED
        )
    }
}

export function isFolderOwnerAccessor(
    folder: DKdFolder,
    entry: DKdFolderAccess,
    username: string
): boolean {
    const ownerUsername = folder.ownerInfo?.username?.trim().toLowerCase()
    if (ownerUsername && username.toLowerCase() === ownerUsername) return true
    if (folder.ownerInfo?.accountUid && folder.ownerInfo.accountUid === entry.accessTypeUid) return true
    return entry.accessType === Folder.AccessType.AT_OWNER
}

export function recordAccessDisplayRole(data: Folder.IRecordAccessData): string {
    return formatAccessRoleType(data.accessRoleType)
}

export async function fetchLiveRecordAccessEntries(
    auth: Auth,
    storage: InMemoryStorage,
    recordUid: string
): Promise<
    {
        username: string
        accountUid?: string
        data: Folder.IRecordAccessData
    }[]
> {
    try {
        const [response, shareUsers] = await Promise.all([
            auth.executeRest(getRecordAccessMessage({ recordUids: [normal64Bytes(recordUid)] })),
            loadShareUserMap(auth, storage),
        ])

        return (response.recordAccesses ?? [])
            .filter((entry) => {
                const accessType = entry.data?.accessType
                return (
                    accessType === Folder.AccessType.AT_USER ||
                    accessType === Folder.AccessType.AT_OWNER ||
                    !!entry.data?.owner
                )
            })
            .map((entry) => {
                const data = entry.data
                if (!data?.accessTypeUid?.length || data.accessType == null) return undefined

                const accountUid = webSafe64FromBytes(data.accessTypeUid)
                const username =
                    entry.accessorInfo?.name?.trim() ||
                    shareUsers.get(accountUid) ||
                    resolveAccessUsername(storage, accountUid)

                return { username, accountUid, data }
            })
            .filter((entry): entry is NonNullable<typeof entry> => !!entry && entry.username.length > 0)
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to fetch record permissions for ${recordUid}: ${extractErrorMessage(err)}`,
            ResultCodes.NSF_DETAILS_FAILED
        )
    }
}

export function folderAccessDisplayRole(entry: DKdFolderAccess): string {
    if (entry.accessType === Folder.AccessType.AT_OWNER) return 'owner'
    return formatAccessRoleType(entry.accessRoleType)
}

export function isFolderShareAdministrator(entry: DKdFolderAccess): boolean {
    return (
        entry.accessType === Folder.AccessType.AT_OWNER ||
        entry.accessRoleType === Folder.AccessRoleType.MANAGER ||
        entry.accessRoleType === Folder.AccessRoleType.CONTENT_SHARE_MANAGER ||
        entry.accessRoleType === Folder.AccessRoleType.SHARED_MANAGER
    )
}

export function isFolderUserPermission(entry: DKdFolderAccess): boolean {
    return (
        entry.accessType === Folder.AccessType.AT_USER ||
        entry.accessType === Folder.AccessType.AT_OWNER
    )
}

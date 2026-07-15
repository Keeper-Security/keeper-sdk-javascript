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
    record,
    webSafe64FromBytes,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { VaultObjectKind } from '../folders/folderHelpers'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import { getRecordTitle } from '../records/RecordUtils'
import {
    NSF_ACCESS_TYPE_LABELS,
    NSF_LEGACY_FOLDER_MSG,
    NSF_LEGACY_RECORD_MSG,
    NSF_NOTE_FIELD_TYPES,
    NSF_PATH_SENTINEL,
    NSF_RECORD_DESCRIPTION_MAX_LENGTH,
    NSF_RECORD_PERMISSION_ROLE_LABELS,
    NSF_RECORD_PERMISSION_ROLE_MAP,
    NSF_RECORD_PERMISSION_ROLES,
    NSF_SENSITIVE_FIELD_TYPES,
    NSF_SHARE_BATCH_SIZE,
    MIN_SHARE_EXPIRATION_MS,
    NSF_TLA_EXPIRATION_TOLERANCE_MS,
    NSF_SHARE_EXPIRATION_RE,
    NSF_SHARE_EXPIRATION_UNIT_MS,
    NSF_SHARE_EXPIRATION_NEVER,
    NsfShareCommandName,
} from './nsfConstants'
import { NsfAccessRoleLabel, NSF_ACCESS_ROLE_LABELS, type ParseShareExpirationInput } from './nsfTypes'

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
                    user.username.toLowerCase() === username.toLowerCase() &&
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

type FolderPermissionFlag =
    | 'canRemove'
    | 'canDelete'
    | 'canUpdateAccess'
    | 'canEditRecords'
    | 'canUpdateSetting'
    | 'canChangeOwnership'

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

function canShareRecord(
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
        if (entry.owner || entry.canUpdateAccess) return true
        if (
            folderUid &&
            !isRootFolderUid(storage, folderUid) &&
            hasFolderPermission(storage, folderUid, username, accountUid, 'canUpdateAccess')
        ) {
            return true
        }
        for (const parentFolderUid of findNestedShareFoldersForRecord(storage, recordUid)) {
            if (
                !isRootFolderUid(storage, parentFolderUid) &&
                hasFolderPermission(storage, parentFolderUid, username, accountUid, 'canUpdateAccess')
            ) {
                return true
            }
        }
        return false
    }

    for (const parentFolderUid of findNestedShareFoldersForRecord(storage, recordUid)) {
        if (
            !isRootFolderUid(storage, parentFolderUid) &&
            hasFolderPermission(storage, parentFolderUid, username, accountUid, 'canUpdateAccess')
        ) {
            return true
        }
    }

    return (
        !!folderUid &&
        !isRootFolderUid(storage, folderUid) &&
        hasFolderPermission(storage, folderUid, username, accountUid, 'canUpdateAccess')
    )
}

function canChangeRecordOwnership(
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
        if (entry.owner || entry.canChangeOwnership) return true
        if (
            folderUid &&
            !isRootFolderUid(storage, folderUid) &&
            hasFolderPermission(storage, folderUid, username, accountUid, 'canChangeOwnership')
        ) {
            return true
        }
        for (const parentFolderUid of findNestedShareFoldersForRecord(storage, recordUid)) {
            if (
                !isRootFolderUid(storage, parentFolderUid) &&
                hasFolderPermission(storage, parentFolderUid, username, accountUid, 'canChangeOwnership')
            ) {
                return true
            }
        }
        return false
    }

    for (const parentFolderUid of findNestedShareFoldersForRecord(storage, recordUid)) {
        if (
            !isRootFolderUid(storage, parentFolderUid) &&
            hasFolderPermission(storage, parentFolderUid, username, accountUid, 'canChangeOwnership')
        ) {
            return true
        }
    }

    return (
        !!folderUid &&
        !isRootFolderUid(storage, folderUid) &&
        hasFolderPermission(storage, folderUid, username, accountUid, 'canChangeOwnership')
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

export function formatAccessRoleType(role: Folder.AccessRoleType | null | undefined): NsfAccessRoleLabel {
    if (role == null) return NsfAccessRoleLabel.Unknown
    return NSF_ACCESS_ROLE_LABELS[role] ?? NsfAccessRoleLabel.Unknown
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
    }

    return map
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

export function recordAccessDisplayRole(data: Folder.IRecordAccessData): NsfAccessRoleLabel {
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

export function folderAccessDisplayRole(entry: DKdFolderAccess): NsfAccessRoleLabel {
    if (entry.accessType === Folder.AccessType.AT_OWNER) return NsfAccessRoleLabel.Owner
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

export async function patchNsfFolderMetadata(
    storage: InMemoryStorage,
    folderUid: string,
    metadata: { name: string; color?: string }
): Promise<void> {
    const folder = getKeeperDriveFolder(storage, folderUid)
    if (!folder) return
    await storage.put({
        ...folder,
        data: {
            ...folder.data,
            name: metadata.name,
            ...(metadata.color ? { color: metadata.color } : {}),
        },
    })
}

export function checkFolderEditPermission(
    storage: InMemoryStorage,
    folderUid: string,
    username: string,
    accountUid: Uint8Array
): void {
    if (hasFolderPermission(storage, folderUid, username, accountUid, 'canUpdateSetting')) return
    throw new KeeperSdkError(
        'You do not have permission to edit this folder.',
        ResultCodes.NSF_PERMISSION_DENIED
    )
}

export function checkFolderSharePermission(
    storage: InMemoryStorage,
    folderUid: string,
    username: string,
    accountUid: Uint8Array
): void {
    if (hasFolderPermission(storage, folderUid, username, accountUid, 'canUpdateAccess')) return
    throw new KeeperSdkError(
        'You do not have permission to share this folder.',
        ResultCodes.NSF_PERMISSION_DENIED
    )
}

export function checkRecordSharePermission(
    storage: InMemoryStorage,
    recordUid: string,
    username: string,
    accountUid: Uint8Array
): void {
    if (canShareRecord(storage, recordUid, username, accountUid)) return
    throw new KeeperSdkError(
        'You do not have permission to share this record.',
        ResultCodes.NSF_PERMISSION_DENIED
    )
}

export function checkRecordChangeOwnershipPermission(
    storage: InMemoryStorage,
    recordUid: string,
    username: string,
    accountUid: Uint8Array
): void {
    if (canChangeRecordOwnership(storage, recordUid, username, accountUid)) return
    throw new KeeperSdkError(
        'You do not have permission to transfer ownership of this record.',
        ResultCodes.NSF_PERMISSION_DENIED
    )
}

export function findFolderAccessEntry(
    storage: InMemoryStorage,
    folderUid: string,
    accessTypeUid: string,
    accessType: Folder.AccessType
): DKdFolderAccess | undefined {
    return getFolderAccessEntries(storage, folderUid).find(
        (entry) => entry.accessTypeUid === accessTypeUid && entry.accessType === accessType
    )
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

export async function fetchLiveFolderAccessEntries(
    auth: Auth,
    folderUid: string
): Promise<DKdFolderAccess[]> {
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

export async function findFolderAccessEntryOrLive(
    storage: InMemoryStorage,
    auth: Auth,
    folderUid: string,
    accessTypeUid: string,
    accessType: Folder.AccessType
): Promise<DKdFolderAccess | undefined> {
    const fromStorage = findFolderAccessEntry(storage, folderUid, accessTypeUid, accessType)
    if (fromStorage) return fromStorage

    try {
        const liveEntries = await fetchLiveFolderAccessEntries(auth, folderUid)
        return liveEntries.find(
            (entry) => entry.accessTypeUid === accessTypeUid && entry.accessType === accessType
        )
    } catch {
        return undefined
    }
}

export function collectExistingFolderShareTargets(
    storage: InMemoryStorage,
    folderUid: string,
    currentUsername: string
): Array<{ recipient: string; isTeam: boolean; accountUid?: string }> {
    const targets: Array<{ recipient: string; isTeam: boolean; accountUid?: string }> = []
    for (const entry of getFolderAccessEntries(storage, folderUid)) {
        if (entry.accessType === Folder.AccessType.AT_TEAM) {
            targets.push({ recipient: entry.accessTypeUid, isTeam: true, accountUid: entry.accessTypeUid })
            continue
        }
        if (entry.accessType !== Folder.AccessType.AT_USER) continue
        const username = resolveAccessUsername(storage, entry.accessTypeUid)
        if (!username || username.toLowerCase() === currentUsername.toLowerCase()) continue
        targets.push({ recipient: username, isTeam: false, accountUid: entry.accessTypeUid })
    }
    return targets
}

export function resolveNsfRoleName(role: string): Folder.AccessRoleType {
    const normalized = role.trim().toLowerCase().replace(/\s+/g, '-')
    const mapped = NSF_RECORD_PERMISSION_ROLE_MAP[normalized]
    if (mapped != null) return mapped
    throw new KeeperSdkError(
        `Invalid role '${role}'. Use: ${NSF_RECORD_PERMISSION_ROLES.join(', ')}.`,
        ResultCodes.NSF_SHARE_FAILED
    )
}

export function getNsfRecordPermissionRoleLabel(
    accessRoleType: Folder.AccessRoleType | number | null | undefined
): string {
    if (accessRoleType == null) return 'unresolved'
    return NSF_RECORD_PERMISSION_ROLE_LABELS[accessRoleType] ?? `role-${accessRoleType}`
}

export type NsfRecordAccessFlags = {
    accessRoleType?: number
    owner?: boolean
}

export function getNsfAccessRoleLabel(access: NsfRecordAccessFlags): string {
    if (access.owner) return NsfAccessRoleLabel.Owner
    return getNsfRecordPermissionRoleLabel(access.accessRoleType)
}

export function normalizeNsfRecordPermissionRole(role?: string): string | undefined {
    if (!role?.trim()) return undefined
    const normalized = role.trim().toLowerCase().replace(/\s+/g, '-')
    if ((NSF_RECORD_PERMISSION_ROLES as readonly string[]).includes(normalized)) return normalized
    if (normalized in NSF_RECORD_PERMISSION_ROLE_MAP) return normalized
    throw new KeeperSdkError(
        `Invalid role '${role}'. Use: ${NSF_RECORD_PERMISSION_ROLES.join(', ')}.`,
        ResultCodes.NSF_RECORD_PERMISSION_FAILED
    )
}

export type NsfLiveRecordAccessEntry = {
    recordUid: string
    accessorName: string
    accessTypeUid: string
    owner: boolean
    inherited: boolean
    accessRoleType: number
    canViewTitle: boolean
    canEdit: boolean
    canView: boolean
    canListAccess: boolean
    canUpdateAccess: boolean
    canDelete: boolean
    canChangeOwnership: boolean
    canRequestAccess: boolean
    canApproveAccess: boolean
}

function mapLiveRecordAccessEntry(
    storage: InMemoryStorage,
    shareUsers: Map<string, string>,
    entry: record.v3.details.IRecordAccess
): NsfLiveRecordAccessEntry | undefined {
    const data = entry.data
    if (!data?.recordUid?.length || !data.accessTypeUid?.length || data.accessType == null) return undefined

    const accessType = data.accessType
    if (
        accessType !== Folder.AccessType.AT_USER &&
        accessType !== Folder.AccessType.AT_OWNER &&
        !data.owner
    ) {
        return undefined
    }

    const recordUid = webSafe64FromBytes(data.recordUid)
    const accessTypeUid = webSafe64FromBytes(data.accessTypeUid)
    const accessorName =
        entry.accessorInfo?.name?.trim() ||
        shareUsers.get(accessTypeUid) ||
        resolveAccessUsername(storage, accessTypeUid)

    if (!accessorName) return undefined

    return {
        recordUid,
        accessorName,
        accessTypeUid,
        owner: !!data.owner,
        inherited: !!data.inherited,
        accessRoleType: data.accessRoleType ?? Folder.AccessRoleType.UNRESOLVED,
        canViewTitle: data.canViewTitle ?? true,
        canEdit: !!data.canEdit,
        canView: !!data.canView,
        canListAccess: !!data.canListAccess,
        canUpdateAccess: !!data.canUpdateAccess,
        canDelete: !!data.canDelete,
        canChangeOwnership: !!data.canChangeOwnership,
        canRequestAccess: !!data.canRequestAccess,
        canApproveAccess: !!data.canApproveAccess,
    }
}

export async function fetchLiveRecordAccessesV3(
    auth: Auth,
    storage: InMemoryStorage,
    recordUids: string[]
): Promise<{ recordAccesses: NsfLiveRecordAccessEntry[]; forbiddenRecords: string[] }> {
    if (recordUids.length === 0) {
        return { recordAccesses: [], forbiddenRecords: [] }
    }

    const shareUsers = await loadShareUserMap(auth, storage)
    const recordAccesses: NsfLiveRecordAccessEntry[] = []
    const forbiddenRecords: string[] = []

    for (let index = 0; index < recordUids.length; index += NSF_SHARE_BATCH_SIZE) {
        const chunk = recordUids.slice(index, index + NSF_SHARE_BATCH_SIZE)
        let response: record.v3.details.IRecordAccessResponse
        try {
            response = await auth.executeRest(
                getRecordAccessMessage({ recordUids: chunk.map((uid) => normal64Bytes(uid)) })
            )
        } catch (err) {
            throw new KeeperSdkError(
                `Failed to fetch record permissions: ${extractErrorMessage(err)}`,
                ResultCodes.NSF_RECORD_PERMISSION_FAILED
            )
        }

        for (const uid of response.forbiddenRecords ?? []) {
            forbiddenRecords.push(webSafe64FromBytes(uid))
        }

        for (const entry of response.recordAccesses ?? []) {
            const mapped = mapLiveRecordAccessEntry(storage, shareUsers, entry)
            if (mapped) recordAccesses.push(mapped)
        }
    }

    return { recordAccesses, forbiddenRecords }
}

export function findUserRecordShareEntry(
    storage: InMemoryStorage,
    recordUid: string,
    email: string,
    accountUidStr?: string,
    shareUsers?: Map<string, string>
): DKdRecordAccess | undefined {
    const lower = email.toLowerCase()
    const normalizedUid = accountUidStr?.trim()
    for (const entry of getRecordAccessEntries(storage, recordUid)) {
        if (entry.owner || entry.accessType !== Folder.AccessType.AT_USER) continue
        if (normalizedUid && entry.accessTypeUid === normalizedUid) {
            return entry
        }
        const accessorName = resolveAccessUsername(storage, entry.accessTypeUid, undefined, shareUsers)
        if (accessorName.toLowerCase() === lower) return entry
    }
    return undefined
}

export function findDirectUserRecordShare(
    storage: InMemoryStorage,
    recordUid: string,
    email: string
): { recordUid: string; email: string; accessRoleType: number; expiration?: number } | undefined {
    const entry = findUserRecordShareEntry(storage, recordUid, email)
    if (!entry || entry.inherited) return undefined
    return {
        recordUid,
        email,
        accessRoleType: entry.accessRoleType ?? Folder.AccessRoleType.UNRESOLVED,
        expiration: entry.tlaProperties?.expiration ?? undefined,
    }
}

export function validateShareExpirationTimestamp(
    expirationMs: number | null | undefined,
    cmdName: string
): void {
    if (expirationMs == null || expirationMs === -1) return
    const minAllowed = Date.now() + MIN_SHARE_EXPIRATION_MS
    if (expirationMs < minAllowed) {
        throw new KeeperSdkError(
            `[${cmdName}] Share expiration must be at least 1 minute.`,
            ResultCodes.NSF_SHARE_FAILED
        )
    }
}

export function parseShareExpiration(input: ParseShareExpirationInput): number | undefined {
    const { expireAt, expireIn, expirationTimestamp, cmdName = NsfShareCommandName.FolderShare } = input
    const expireAtValue = expireAt?.trim()
    const expireInValue = expireIn?.trim()

    if (expireAtValue && expireInValue) {
        throw new KeeperSdkError(
            `[${cmdName}] Cannot specify both expire-at and expire-in.`,
            ResultCodes.NSF_SHARE_FAILED
        )
    }

    if (expirationTimestamp != null && (expireAtValue || expireInValue)) {
        throw new KeeperSdkError(
            `[${cmdName}] Cannot specify both expirationTimestamp and expire-at/expire-in.`,
            ResultCodes.NSF_SHARE_FAILED
        )
    }

    if (expirationTimestamp != null) {
        validateShareExpirationTimestamp(expirationTimestamp, cmdName)
        return expirationTimestamp
    }

    const raw = expireAtValue || expireInValue
    if (!raw) return undefined

    if (raw.toLowerCase() === NSF_SHARE_EXPIRATION_NEVER) return -1

    if (expireAtValue) {
        const normalized = raw.replace('Z', '+00:00')
        const dt = new Date(normalized)
        if (Number.isNaN(dt.getTime())) {
            throw new KeeperSdkError(
                `[${cmdName}] Invalid expire-at datetime '${raw}'.`,
                ResultCodes.NSF_SHARE_FAILED
            )
        }
        const expirationMs = dt.getTime()
        validateShareExpirationTimestamp(expirationMs, cmdName)
        return expirationMs
    }

    const match = NSF_SHARE_EXPIRATION_RE.exec(raw)
    if (!match) {
        throw new KeeperSdkError(
            `[${cmdName}] Invalid expire-in period '${raw}'. Use e.g. 30d, 6mo, 1y, 24h, 30mi.`,
            ResultCodes.NSF_SHARE_FAILED
        )
    }

    const amount = Number.parseInt(match[1], 10)
    const unitMs = NSF_SHARE_EXPIRATION_UNIT_MS[match[2].toLowerCase()]
    if (!unitMs) {
        throw new KeeperSdkError(
            `[${cmdName}] Invalid expire-in period '${raw}'.`,
            ResultCodes.NSF_SHARE_FAILED
        )
    }

    const expirationMs = Date.now() + amount * unitMs
    validateShareExpirationTimestamp(expirationMs, cmdName)
    return expirationMs
}

export function parseShareExpirationValue(
    value: string,
    cmdName: string = NsfShareCommandName.FolderShare
): number | undefined {
    const raw = value.trim()
    if (!raw) return undefined
    if (NSF_SHARE_EXPIRATION_RE.test(raw)) {
        return parseShareExpiration({ expireIn: raw, cmdName })
    }
    return parseShareExpiration({ expireAt: raw, cmdName })
}

export function isShareExpirationNoop(
    existingExpiration: number | undefined,
    requestedExpiration: number | undefined
): boolean {
    if (requestedExpiration == null) return true
    if (requestedExpiration === -1) {
        return existingExpiration == null || existingExpiration === -1 || existingExpiration === 0
    }
    if (existingExpiration == null || existingExpiration === 0) return false
    return Math.abs(existingExpiration - requestedExpiration) <= NSF_TLA_EXPIRATION_TOLERANCE_MS
}

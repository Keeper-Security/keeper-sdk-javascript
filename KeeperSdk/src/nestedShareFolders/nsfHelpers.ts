import type {
    DRecord,
    DUser,
    DKdFolder,
    DKdFolderAccess,
    DKdFolderRecord,
    DKdRecordAccess,
    Dependency,
} from '@keeper-security/keeperapi'
import { Folder, webSafe64FromBytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { VaultObjectKind } from '../folders/folderHelpers'
import { KeeperSdkError, ResultCodes } from '../utils'
import { getRecordTitle } from '../records/RecordUtils'

const LEGACY_RECORD_MSG =
    "Record '{0}' is a legacy vault record. Nested Share Folder commands operate only on Nested Share Records."
const LEGACY_FOLDER_MSG =
    "Folder '{0}' is a legacy folder. Nested Share Folder commands operate only on Nested Share Folders."

const ACCESS_ROLE_LABELS: Record<number, string> = {
    [Folder.AccessRoleType.NAVIGATOR]: 'navigator',
    [Folder.AccessRoleType.REQUESTOR]: 'requestor',
    [Folder.AccessRoleType.VIEWER]: 'viewer',
    [Folder.AccessRoleType.SHARED_MANAGER]: 'shared-manager',
    [Folder.AccessRoleType.CONTENT_MANAGER]: 'content-manager',
    [Folder.AccessRoleType.CONTENT_SHARE_MANAGER]: 'content-share-manager',
    [Folder.AccessRoleType.MANAGER]: 'manager',
    [Folder.AccessRoleType.UNRESOLVED]: 'unresolved',
}

const ACCESS_TYPE_LABELS: Record<number, string> = {
    [Folder.AccessType.AT_USER]: 'user',
    [Folder.AccessType.AT_TEAM]: 'team',
    [Folder.AccessType.AT_OWNER]: 'owner',
    [Folder.AccessType.AT_ENTERPRISE]: 'enterprise',
    [Folder.AccessType.AT_FOLDER]: 'folder',
    [Folder.AccessType.AT_APPLICATION]: 'application',
}

const SENSITIVE_FIELD_TYPES = new Set(['password', 'secret', 'pinCode'])
const NOTE_FIELD_TYPES = new Set(['note', 'multiline'])
const RECORD_DESCRIPTION_MAX_LENGTH = 120

export const ROOT_FOLDER_UID = 'AAAAAAAAAAAAAAAAAPmtNA'

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

export function isNestedShareRecord(storage: InMemoryStorage, recordUid: string): boolean {
    return !!getKeeperDriveRecord(storage, recordUid)
}

export function isNestedShareFolder(storage: InMemoryStorage, folderUid: string): boolean {
    if (!folderUid) return false
    if (isRootFolderUid(folderUid)) return true
    return !!getKeeperDriveFolder(storage, folderUid)
}

export function ensureNestedShareRecord(storage: InMemoryStorage, recordUid: string, identifier?: string): void {
    if (isNestedShareRecord(storage, recordUid)) return
    const ident = identifier ?? recordUid
    throw new KeeperSdkError(LEGACY_RECORD_MSG.replace('{0}', ident), ResultCodes.NSF_LEGACY_RECORD)
}

export function ensureNestedShareFolder(storage: InMemoryStorage, folderUid: string, identifier?: string): void {
    if (isNestedShareFolder(storage, folderUid)) return
    const ident = identifier ?? folderUid
    throw new KeeperSdkError(LEGACY_FOLDER_MSG.replace('{0}', ident), ResultCodes.NSF_LEGACY_FOLDER)
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
    if (!trimmed) return ROOT_FOLDER_UID

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

    if (isRootFolderUid(trimmed) || trimmed.toLowerCase() === 'root') return ROOT_FOLDER_UID

    const byUidOrName = resolveByUidOrName(
        getKeeperDriveFolders(storage),
        trimmed,
        (folder) => folder.uid,
        (folder) => folder.data.name || ''
    )
    if (byUidOrName) return byUidOrName.uid

    return resolveFolderByPath(storage, trimmed)
}

export function findNestedShareFoldersForRecord(storage: InMemoryStorage, recordUid: string): string[] {
    return storage
        .getAll<DKdFolderRecord>(KeeperDriveKind.FolderRecord)
        .filter((entry) => entry.recordUid === recordUid)
        .map((entry) => entry.folderUid)
}

export function checkRecordDeletePermission(
    storage: InMemoryStorage,
    recordUid: string,
    username: string,
    accountUid?: Uint8Array
): void {
    const entries = storage
        .getAll<DKdRecordAccess>(KeeperDriveKind.RecordAccess)
        .filter((entry) => entry.recordUid === recordUid)
    if (entries.length === 0) return

    const accountUidStr = accountUid?.length ? webSafe64FromBytes(accountUid) : ''
    for (const entry of entries) {
        const isCurrentUser =
            (entry.accessType === Folder.AccessType.AT_USER &&
                entry.accessTypeUid === accountUidStr) ||
            (username &&
                storage.getAll<DUser>('user').some(
                    (user) =>
                        user.username === username &&
                        webSafe64FromBytes(user.accountUid) === entry.accessTypeUid
                ))
        if (!isCurrentUser) continue
        if (entry.owner || entry.canDelete) return
        throw new KeeperSdkError(
            'You do not have permission to delete this record.',
            ResultCodes.NSF_PERMISSION_DENIED
        )
    }
    throw new KeeperSdkError(
        'You do not have permission to delete this record.',
        ResultCodes.NSF_PERMISSION_DENIED
    )
}

export function formatAccessRoleType(role: Folder.AccessRoleType | null | undefined): string {
    if (role == null) return 'unknown'
    return ACCESS_ROLE_LABELS[role] ?? `role-${role}`
}

export function formatAccessType(type: Folder.AccessType | null | undefined): string {
    if (type == null) return 'unknown'
    return ACCESS_TYPE_LABELS[type] ?? `type-${type}`
}

export function normalizeParentUid(parentUid: string | undefined | null): string {
    const value = (parentUid ?? '').trim()
    return !value || value === ROOT_FOLDER_UID ? ROOT_FOLDER_UID : value
}

export function isRootFolderUid(folderUid: string | undefined | null): boolean {
    return normalizeParentUid(folderUid) === ROOT_FOLDER_UID
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
    if (isRootFolderUid(folderUid)) return 'root'
    return getKeeperDriveFolder(storage, folderUid)?.data.name ?? folderUid
}

export function findRecordFolderLocation(storage: InMemoryStorage, recordUid: string): string {
    for (const folder of getKeeperDriveFolders(storage)) {
        const children = storage.getDependenciesSync(folder.uid)
        if (children?.some((child: Dependency) => child.uid === recordUid && child.kind === 'record')) {
            return isRootFolderUid(folder.uid) ? 'root' : folder.data.name || folder.uid
        }
    }
    return 'root'
}

export function buildFolderPath(storage: InMemoryStorage, folderUid: string): string {
    if (isRootFolderUid(folderUid)) return '/'

    const segments: string[] = []
    let currentUid: string | undefined = folderUid
    const seen = new Set<string>()

    while (currentUid && !isRootFolderUid(currentUid) && !seen.has(currentUid)) {
        seen.add(currentUid)
        const folder = getKeeperDriveFolder(storage, currentUid)
        if (!folder) break
        segments.unshift(folder.data.name || folder.uid)
        currentUid = folder.parentUid
    }

    return `/${segments.join('/')}`
}

export function collectRecordsInFolder(storage: InMemoryStorage, folderUid: string): DRecord[] {
    const children = storage.getDependenciesSync(folderUid)
    if (!children?.length) return []

    const records: DRecord[] = []
    for (const child of children) {
        if (child.kind !== 'record') continue
        const record = getKeeperDriveRecord(storage, child.uid)
        if (record) records.push(record)
    }
    return records
}

export function getRecordDescription(record: DRecord): string {
    const data = record.data
    if (!data || typeof data !== 'object') return ''

    const fields = Array.isArray(data.fields) ? data.fields : []
    for (const field of fields) {
        if (!NOTE_FIELD_TYPES.has(field?.type)) continue
        const value = Array.isArray(field.value) ? field.value[0] : field.value
        if (typeof value === 'string' && value.trim()) {
            return value.trim().slice(0, RECORD_DESCRIPTION_MAX_LENGTH)
        }
    }

    if (typeof data.notes === 'string' && data.notes.trim()) {
        return data.notes.trim().slice(0, RECORD_DESCRIPTION_MAX_LENGTH)
    }
    return ''
}

export function isSensitiveFieldType(fieldType: string): boolean {
    return SENSITIVE_FIELD_TYPES.has(fieldType)
}

export function resolveAccessUsername(
    storage: InMemoryStorage,
    accessTypeUid: string,
    folder?: DKdFolder
): string {
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

export function folderAccessDisplayRole(entry: DKdFolderAccess): string {
    if (entry.accessType === Folder.AccessType.AT_OWNER) return 'owner'
    return formatAccessRoleType(entry.accessRoleType)
}

export function isFolderShareAdministrator(entry: DKdFolderAccess): boolean {
    return (
        entry.accessType === Folder.AccessType.AT_OWNER ||
        entry.accessRoleType === Folder.AccessRoleType.MANAGER ||
        entry.accessRoleType === Folder.AccessRoleType.CONTENT_SHARE_MANAGER
    )
}

export function isFolderUserPermission(entry: DKdFolderAccess): boolean {
    return (
        entry.accessType === Folder.AccessType.AT_USER ||
        entry.accessType === Folder.AccessType.AT_OWNER
    )
}

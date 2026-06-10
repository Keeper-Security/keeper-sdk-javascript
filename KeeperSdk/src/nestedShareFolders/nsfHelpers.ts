import type {
    DRecord,
    DUser,
    DKdFolder,
    DKdFolderAccess,
    Dependency,
} from '@keeper-security/keeperapi'
import { Folder, webSafe64FromBytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'

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

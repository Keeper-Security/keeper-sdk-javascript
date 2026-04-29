import type {
    DSharedFolder,
    DSharedFolderFolder,
    DSharedFolderRecord,
    DSharedFolderUser,
    DUserFolder,
} from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError } from '../utils'
import { findParentFolderUid } from './changeDirectory'
import { FolderKind, FolderObjectType, sharedFolderFolderName, userFolderName } from './folderHelpers'

export enum GetFolderFormat {
    Detail = 'detail',
    JSON = 'json',
}

export type GetFolderFormatInput = GetFolderFormat | `${GetFolderFormat}`

export type GetFolderOptions = {
    format?: GetFolderFormatInput
}

export type GetFolderResult = GetFolderResultFolder | GetFolderResultSharedFolder

export type GetFolderResultFolder = {
    objectType: FolderObjectType.Folder
    format: GetFolderFormat
    folder_uid: string
    folder_type: FolderKind.UserFolder | FolderKind.SharedFolderFolder
    name: string
    parent_uid: string | null
    shared_folder_scope_uid?: string
    json?: Record<string, unknown>
}

export type GetFolderResultSharedFolder = {
    objectType: FolderObjectType.SharedFolder
    format: GetFolderFormat
    shared_folder_uid: string
    name: string
    default_can_edit: boolean
    default_can_share: boolean
    default_manage_records: boolean
    default_manage_users: boolean
    record_permissions?: {
        record_uid: string
        can_edit: boolean
        can_share: boolean
        owner: boolean
    }[]
    user_permissions?: {
        account_username?: string
        manage_records: boolean
        manage_users: boolean
    }[]
    json?: Record<string, unknown>
}

export type FoundFolder =
    | { kind: FolderKind.UserFolder; folder: DUserFolder }
    | { kind: FolderKind.SharedFolder; folder: DSharedFolder }
    | { kind: FolderKind.SharedFolderFolder; folder: DSharedFolderFolder }

function findByUidOrName<T>(
    items: Iterable<T>,
    needle: string,
    getUid: (item: T) => string,
    getName: (item: T) => string
): T | undefined {
    const trimmedNeedle = needle.trim()
    if (!trimmedNeedle) return undefined
    const lowerNeedle = trimmedNeedle.toLowerCase()
    let exactNameHit: T | undefined
    let lowerNameHit: T | undefined
    for (const item of items) {
        if (getUid(item) === trimmedNeedle) return item
        if (!exactNameHit) {
            const itemName = getName(item)
            if (itemName === trimmedNeedle) {
                exactNameHit = item
            } else if (!lowerNameHit && itemName.toLowerCase() === lowerNeedle) {
                lowerNameHit = item
            }
        }
    }
    return exactNameHit || lowerNameHit
}

function findSharedFolder(storage: InMemoryStorage, needle: string): DSharedFolder | undefined {
    return findByUidOrName(
        storage.getAll<DSharedFolder>(FolderKind.SharedFolder),
        needle,
        (sharedFolder) => sharedFolder.uid,
        (sharedFolder) => (sharedFolder.name || '').trim()
    )
}

function findUserFolder(storage: InMemoryStorage, needle: string): DUserFolder | undefined {
    return findByUidOrName(
        storage.getAll<DUserFolder>(FolderKind.UserFolder),
        needle,
        (userFolder) => userFolder.uid,
        (userFolder) => userFolderName(userFolder)
    )
}

function findSharedFolderFolder(storage: InMemoryStorage, needle: string): DSharedFolderFolder | undefined {
    return findByUidOrName(
        storage.getAll<DSharedFolderFolder>(FolderKind.SharedFolderFolder),
        needle,
        (sharedFolderFolder) => sharedFolderFolder.uid,
        (sharedFolderFolder) => sharedFolderFolderName(sharedFolderFolder)
    )
}

export function findFolder(storage: InMemoryStorage, needle: string): FoundFolder | undefined {
    const trimmed = needle.trim()
    if (!trimmed) return undefined

    const sharedFolder = findSharedFolder(storage, trimmed)
    if (sharedFolder) return { kind: FolderKind.SharedFolder, folder: sharedFolder }

    const userFolder = findUserFolder(storage, trimmed)
    if (userFolder) return { kind: FolderKind.UserFolder, folder: userFolder }

    const sharedFolderFolder = findSharedFolderFolder(storage, trimmed)
    if (sharedFolderFolder) return { kind: FolderKind.SharedFolderFolder, folder: sharedFolderFolder }

    return undefined
}

async function formatRegularFolder(
    storage: InMemoryStorage,
    folder: DUserFolder | DSharedFolderFolder,
    format: GetFolderFormat
): Promise<GetFolderResultFolder> {
    const isUser = folder.kind === FolderKind.UserFolder
    const folder_uid = folder.uid
    const folder_type: GetFolderResultFolder['folder_type'] = isUser
        ? FolderKind.UserFolder
        : FolderKind.SharedFolderFolder
    const name = isUser ? userFolderName(folder) : sharedFolderFolderName(folder)
    const parent_uid = await findParentFolderUid(storage, folder_uid)

    const base: GetFolderResultFolder = {
        objectType: FolderObjectType.Folder,
        format,
        folder_uid,
        folder_type,
        name,
        parent_uid,
    }
    if (!isUser) {
        base.shared_folder_scope_uid = (folder as DSharedFolderFolder).sharedFolderUid
    }
    if (format === GetFolderFormat.JSON) {
        base.json = { ...base, objectType: FolderObjectType.Folder }
    }
    return base
}

function formatSharedFolder(
    storage: InMemoryStorage,
    sharedFolder: DSharedFolder,
    format: GetFolderFormat
): GetFolderResultSharedFolder {
    const sharedFolderUid = sharedFolder.uid
    const recordPermissions = storage
        .getAll<DSharedFolderRecord>('shared_folder_record')
        .filter((record) => record.sharedFolderUid === sharedFolderUid)
        .map((record) => ({
            record_uid: record.recordUid,
            can_edit: record.canEdit,
            can_share: record.canShare,
            owner: record.owner,
        }))
    const userPermissions = storage
        .getAll<DSharedFolderUser>('shared_folder_user')
        .filter((user) => user.sharedFolderUid === sharedFolderUid)
        .map((user) => ({
            account_username: user.accountUsername,
            manage_records: user.manageRecords,
            manage_users: user.manageUsers,
        }))

    const base: GetFolderResultSharedFolder = {
        objectType: FolderObjectType.SharedFolder,
        format,
        shared_folder_uid: sharedFolder.uid,
        name: (sharedFolder.name || '').trim() || sharedFolder.uid,
        default_can_edit: sharedFolder.defaultCanEdit,
        default_can_share: sharedFolder.defaultCanShare,
        default_manage_records: sharedFolder.defaultManageRecords,
        default_manage_users: sharedFolder.defaultManageUsers,
        record_permissions: recordPermissions.length ? recordPermissions : undefined,
        user_permissions: userPermissions.length ? userPermissions : undefined,
    }
    if (format === GetFolderFormat.JSON) {
        base.json = { ...base, objectType: FolderObjectType.SharedFolder }
    }
    return base
}

function normalizeFormat(format: GetFolderFormatInput | undefined): GetFolderFormat {
    if (format === GetFolderFormat.JSON) return GetFolderFormat.JSON
    return GetFolderFormat.Detail
}

export async function getFolder(
    storage: InMemoryStorage,
    uidOrName: string,
    options: GetFolderOptions = {}
): Promise<GetFolderResult> {
    const trimmed = uidOrName.trim()
    if (!trimmed) {
        throw new KeeperSdkError('Folder UID or name is required.', 'missing_folder_ref')
    }

    const found = findFolder(storage, trimmed)
    if (!found) {
        throw new KeeperSdkError(`"${trimmed}" not found as a folder or shared folder`, 'folder_not_found')
    }

    const format: GetFolderFormat = normalizeFormat(options.format)

    switch (found.kind) {
        case FolderKind.SharedFolder:
            return formatSharedFolder(storage, found.folder, format)
        case FolderKind.UserFolder:
        case FolderKind.SharedFolderFolder:
            return formatRegularFolder(storage, found.folder, format)
    }
}

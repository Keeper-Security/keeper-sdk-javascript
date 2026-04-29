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
import { sharedFolderFolderName, userFolderName } from './folderHelpers'

export type GetFolderFormat = 'detail' | 'json'

export type GetFolderOptions = {
    format?: GetFolderFormat
}

export type GetFolderResult = GetFolderResultFolder | GetFolderResultSharedFolder

export type GetFolderResultFolder = {
    objectType: 'folder'
    format: GetFolderFormat
    folder_uid: string
    folder_type: 'user_folder' | 'shared_folder_folder'
    name: string
    parent_uid: string | null
    shared_folder_scope_uid?: string
    json?: Record<string, unknown>
}

export type GetFolderResultSharedFolder = {
    objectType: 'shared_folder'
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
    | { kind: 'user_folder'; folder: DUserFolder }
    | { kind: 'shared_folder'; folder: DSharedFolder }
    | { kind: 'shared_folder_folder'; folder: DSharedFolderFolder }

function findByUidOrName<T>(
    items: Iterable<T>,
    needle: string,
    getUid: (t: T) => string,
    getName: (t: T) => string
): T | undefined {
    const t = needle.trim()
    if (!t) return undefined
    const lower = t.toLowerCase()
    let exactNameHit: T | undefined
    let lowerNameHit: T | undefined
    for (const item of items) {
        if (getUid(item) === t) return item
        if (!exactNameHit) {
            const n = getName(item)
            if (n === t) {
                exactNameHit = item
            } else if (!lowerNameHit && n.toLowerCase() === lower) {
                lowerNameHit = item
            }
        }
    }
    return exactNameHit ?? lowerNameHit
}

function findSharedFolder(storage: InMemoryStorage, needle: string): DSharedFolder | undefined {
    return findByUidOrName(
        storage.getAll<DSharedFolder>('shared_folder'),
        needle,
        (sf) => sf.uid,
        (sf) => (sf.name || '').trim()
    )
}

function findUserFolder(storage: InMemoryStorage, needle: string): DUserFolder | undefined {
    return findByUidOrName(
        storage.getAll<DUserFolder>('user_folder'),
        needle,
        (f) => f.uid,
        (f) => userFolderName(f)
    )
}

function findSharedFolderFolder(storage: InMemoryStorage, needle: string): DSharedFolderFolder | undefined {
    return findByUidOrName(
        storage.getAll<DSharedFolderFolder>('shared_folder_folder'),
        needle,
        (f) => f.uid,
        (f) => sharedFolderFolderName(f)
    )
}

export function findFolder(storage: InMemoryStorage, needle: string): FoundFolder | undefined {
    const trimmed = needle.trim()
    if (!trimmed) return undefined

    const sf = findSharedFolder(storage, trimmed)
    if (sf) return { kind: 'shared_folder', folder: sf }

    const uf = findUserFolder(storage, trimmed)
    if (uf) return { kind: 'user_folder', folder: uf }

    const sff = findSharedFolderFolder(storage, trimmed)
    if (sff) return { kind: 'shared_folder_folder', folder: sff }

    return undefined
}

async function formatRegularFolder(
    storage: InMemoryStorage,
    folder: DUserFolder | DSharedFolderFolder,
    format: GetFolderFormat
): Promise<GetFolderResultFolder> {
    const isUser = folder.kind === 'user_folder'
    const folder_uid = folder.uid
    const folder_type: GetFolderResultFolder['folder_type'] = isUser ? 'user_folder' : 'shared_folder_folder'
    const name = isUser ? userFolderName(folder) : sharedFolderFolderName(folder)
    const parent_uid = await findParentFolderUid(storage, folder_uid)

    const base: GetFolderResultFolder = {
        objectType: 'folder',
        format,
        folder_uid,
        folder_type,
        name,
        parent_uid,
    }
    if (!isUser) {
        base.shared_folder_scope_uid = (folder as DSharedFolderFolder).sharedFolderUid
    }
    if (format === 'json') {
        base.json = { ...base, objectType: 'folder' }
    }
    return base
}

function formatSharedFolder(
    storage: InMemoryStorage,
    sf: DSharedFolder,
    format: GetFolderFormat
): GetFolderResultSharedFolder {
    const sfUid = sf.uid
    const recordPerms = storage
        .getAll<DSharedFolderRecord>('shared_folder_record')
        .filter((r) => r.sharedFolderUid === sfUid)
        .map((r) => ({
            record_uid: r.recordUid,
            can_edit: r.canEdit,
            can_share: r.canShare,
            owner: r.owner,
        }))
    const userPerms = storage
        .getAll<DSharedFolderUser>('shared_folder_user')
        .filter((u) => u.sharedFolderUid === sfUid)
        .map((u) => ({
            account_username: u.accountUsername,
            manage_records: u.manageRecords,
            manage_users: u.manageUsers,
        }))

    const base: GetFolderResultSharedFolder = {
        objectType: 'shared_folder',
        format,
        shared_folder_uid: sf.uid,
        name: (sf.name || '').trim() || sf.uid,
        default_can_edit: sf.defaultCanEdit,
        default_can_share: sf.defaultCanShare,
        default_manage_records: sf.defaultManageRecords,
        default_manage_users: sf.defaultManageUsers,
        record_permissions: recordPerms.length ? recordPerms : undefined,
        user_permissions: userPerms.length ? userPerms : undefined,
    }
    if (format === 'json') {
        base.json = { ...base, objectType: 'shared_folder' }
    }
    return base
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

    const format: GetFolderFormat = options.format ?? 'detail'

    switch (found.kind) {
        case 'shared_folder':
            return formatSharedFolder(storage, found.folder, format)
        case 'user_folder':
        case 'shared_folder_folder':
            return formatRegularFolder(storage, found.folder, format)
    }
}

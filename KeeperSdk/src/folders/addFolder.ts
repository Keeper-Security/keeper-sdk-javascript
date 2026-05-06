import type { Auth, FolderAddRequest } from '@keeper-security/keeperapi'
import {
    encryptForStorage,
    encryptObjectForStorage,
    folderAddCommand,
    generateEncryptionKey,
    generateUid,
    platform,
} from '@keeper-security/keeperapi'
import type { DSharedFolder, DSharedFolderFolder, DUserFolder } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { isBoolean, KeeperSdkError, extractErrorMessage } from '../utils'
import { listFolder } from './listFolder'
import { tryResolvePath, splitPathComponents, type VaultFolderSession } from './changeDirectory'
import { FolderKind, FolderResultStatus, ParentFolderKind } from './folderHelpers'

type NewFolderKind = FolderKind

export type AddFolderInput = {
    folderName: string
    isSharedFolder?: boolean
    parentUid?: string | null
    manageUsers?: boolean
    manageRecords?: boolean
    canShare?: boolean
    canEdit?: boolean
}

export type AddFolderResult = {
    folderUid: string
    success: boolean
    message?: string
}

export type MkdirOptions = {
    sharedFolder?: boolean
    userFolder?: boolean
    grantAll?: boolean
    manageUsers?: boolean
    manageRecords?: boolean
    canShare?: boolean
    canEdit?: boolean
}

type ParentContext = {
    kind: ParentFolderKind
    sharedScopeUid: string | null
}

function resolveParentContext(storage: InMemoryStorage, parentUid: string | null): ParentContext {
    if (parentUid === null || parentUid === '') {
        return { kind: ParentFolderKind.VirtualRoot, sharedScopeUid: null }
    }
    if (storage.getByUid<DUserFolder>(FolderKind.UserFolder, parentUid)) {
        return { kind: ParentFolderKind.UserFolder, sharedScopeUid: null }
    }
    const sharedFolder = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, parentUid)
    if (sharedFolder) {
        return { kind: ParentFolderKind.SharedFolder, sharedScopeUid: sharedFolder.uid }
    }
    const sharedFolderFolder = storage.getByUid<DSharedFolderFolder>(FolderKind.SharedFolderFolder, parentUid)
    if (sharedFolderFolder) {
        return {
            kind: ParentFolderKind.SharedFolderFolder,
            sharedScopeUid: sharedFolderFolder.sharedFolderUid,
        }
    }
    throw new KeeperSdkError(`Parent folder "${parentUid}" not found`, 'folder_not_found')
}

function decideNewFolderType(parent: ParentContext, isSharedFolder: boolean): NewFolderKind {
    if (isSharedFolder) {
        if (parent.kind !== ParentFolderKind.UserFolder && parent.kind !== ParentFolderKind.VirtualRoot) {
            throw new KeeperSdkError(
                'Shared folders cannot be nested inside other shared folders.',
                'shared_folder_nested'
            )
        }
        return FolderKind.SharedFolder
    }
    if (parent.kind === ParentFolderKind.VirtualRoot || parent.kind === ParentFolderKind.UserFolder) {
        return FolderKind.UserFolder
    }
    return FolderKind.SharedFolderFolder
}

async function getEncryptionKeyForNewFolder(
    auth: Auth,
    storage: InMemoryStorage,
    folderType: NewFolderKind,
    sharedScopeUid: string | null
): Promise<Uint8Array> {
    if (folderType === FolderKind.SharedFolderFolder) {
        if (!sharedScopeUid) {
            throw new KeeperSdkError('Shared folder scope could not be resolved.', 'shared_folder_scope_missing')
        }
        const sharedFolderKey = await storage.getKeyBytes(sharedScopeUid)
        if (!sharedFolderKey) {
            throw new KeeperSdkError(
                'Shared folder encryption key not available. Sync the vault and try again.',
                'shared_folder_key_missing'
            )
        }
        return sharedFolderKey
    }
    if (!auth.dataKey) {
        throw new KeeperSdkError('Data key not available. Ensure you are logged in.', 'data_key_missing')
    }
    return auth.dataKey
}

async function findChildFolderUidByName(
    storage: InMemoryStorage,
    parentUid: string | null,
    name: string
): Promise<string | undefined> {
    const result = await listFolder(storage, {
        folderUid: parentUid === null ? undefined : parentUid,
        showFolders: true,
        showRecords: false,
    })
    const trimmedName = name.trim()
    const lowerName = trimmedName.toLowerCase()
    for (const folder of result.folders) {
        if (folder.uid === trimmedName) return folder.uid
        if (folder.name.trim() === trimmedName) return folder.uid
        if (folder.name.trim().toLowerCase() === lowerName) return folder.uid
    }
    return undefined
}

export async function addFolder(auth: Auth, storage: InMemoryStorage, input: AddFolderInput): Promise<AddFolderResult> {
    const name = input.folderName?.trim()
    if (!name) {
        throw new KeeperSdkError('Folder name cannot be empty.', 'folder_name_required')
    }

    const parentUid = input.parentUid === undefined || input.parentUid === '' ? null : input.parentUid
    const parent = resolveParentContext(storage, parentUid)

    const isShared = input.isSharedFolder === true
    const folderType = decideNewFolderType(parent, isShared)

    const folderUid = generateUid()
    const folderKey = generateEncryptionKey()

    const sharedScope = folderType === FolderKind.SharedFolderFolder ? parent.sharedScopeUid : null

    const encryptionKey = await getEncryptionKeyForNewFolder(auth, storage, folderType, sharedScope)

    const request: FolderAddRequest = {
        folder_uid: folderUid,
        folder_type: folderType,
        key: await encryptForStorage(folderKey, encryptionKey),
        data: await encryptObjectForStorage({ name, title: name }, folderKey),
        link: false,
    }

    if (parentUid) {
        request.parent_uid = parentUid
    }
    if (folderType === FolderKind.SharedFolderFolder && sharedScope) {
        request.shared_folder_uid = sharedScope
    }

    if (folderType === FolderKind.SharedFolder) {
        request.name = await encryptForStorage(platform.stringToBytes(name), folderKey)
        request.manage_users = isBoolean(input.manageUsers) ? input.manageUsers : false
        request.manage_records = isBoolean(input.manageRecords) ? input.manageRecords : false
        request.can_edit = isBoolean(input.canEdit) ? input.canEdit : false
        request.can_share = isBoolean(input.canShare) ? input.canShare : false
    }

    try {
        const response = await auth.executeRestCommand(folderAddCommand(request))
        const succeeded =
            response.result === FolderResultStatus.Success || response.result_code === FolderResultStatus.Success
        if (!succeeded) {
            const reason =
                response.message ||
                response.result_code ||
                `folder_add failed for "${name}" (uid=${folderUid}, type=${folderType}): server returned no message or result_code`
            return {
                folderUid,
                success: false,
                message: reason,
            }
        }
        return { folderUid, success: true }
    } catch (err) {
        return {
            folderUid,
            success: false,
            message: `folder_add failed for "${name}" (uid=${folderUid}, type=${folderType}): ${extractErrorMessage(err)}`,
        }
    }
}

export async function mkdir(
    auth: Auth,
    storage: InMemoryStorage,
    session: VaultFolderSession,
    path: string,
    options: MkdirOptions = {}
): Promise<{ folderUid: string; success: boolean; message?: string }> {
    const trimmed = path.trim()
    if (!trimmed) {
        throw new KeeperSdkError('Folder path cannot be empty.', 'folder_path_required')
    }

    if (options.sharedFolder && options.userFolder) {
        throw new KeeperSdkError('Use only one of sharedFolder (-sf) or userFolder (-uf).', 'mkdir_flags_conflict')
    }

    const { folderUid: baseUid, remaining } = await tryResolvePath(storage, session, trimmed)
    if (!remaining.trim()) {
        throw new KeeperSdkError(`Folder "${trimmed}" already exists.`, 'folder_already_exists')
    }

    const grantAll = options.grantAll === true
    let manageUsers = isBoolean(options.manageUsers) ? options.manageUsers : false
    let manageRecords = isBoolean(options.manageRecords) ? options.manageRecords : false
    let canShare = isBoolean(options.canShare) ? options.canShare : false
    let canEdit = isBoolean(options.canEdit) ? options.canEdit : false
    if (grantAll) {
        manageUsers = true
        manageRecords = true
        canShare = true
        canEdit = true
    }

    const segments = splitPathComponents(remaining)
        .map((segment) => segment.trim())
        .filter((segment) => segment !== '' && segment !== '.')

    if (segments.length === 0) {
        throw new KeeperSdkError(`Folder "${trimmed}" already exists.`, 'folder_already_exists')
    }

    let currentParent: string | null = baseUid
    let lastResult: AddFolderResult = {
        folderUid: '',
        success: false,
        message: 'not run',
    }

    for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
        const segment = segments[segmentIndex]
        const isLastSegment = segmentIndex === segments.length - 1
        const existingChildUid = await findChildFolderUidByName(storage, currentParent, segment)
        if (existingChildUid) {
            if (isLastSegment) {
                throw new KeeperSdkError(`Folder "${segment}" already exists.`, 'folder_already_exists')
            }
            currentParent = existingChildUid
            continue
        }

        const createAsSharedFolder = isLastSegment && options.sharedFolder === true

        const parentContext = resolveParentContext(storage, currentParent)
        if (
            createAsSharedFolder &&
            parentContext.kind !== ParentFolderKind.UserFolder &&
            parentContext.kind !== ParentFolderKind.VirtualRoot
        ) {
            throw new KeeperSdkError(
                'Shared folders can only be created under a personal folder.',
                'shared_folder_invalid_parent'
            )
        }

        lastResult = await addFolder(auth, storage, {
            folderName: segment,
            parentUid: currentParent,
            isSharedFolder: createAsSharedFolder,
            manageUsers: isLastSegment && createAsSharedFolder ? manageUsers : undefined,
            manageRecords: isLastSegment && createAsSharedFolder ? manageRecords : undefined,
            canShare: isLastSegment && createAsSharedFolder ? canShare : undefined,
            canEdit: isLastSegment && createAsSharedFolder ? canEdit : undefined,
        })

        if (!lastResult.success) {
            return {
                folderUid: lastResult.folderUid,
                success: false,
                message: lastResult.message,
            }
        }
        currentParent = lastResult.folderUid
    }

    return { folderUid: lastResult.folderUid, success: true }
}

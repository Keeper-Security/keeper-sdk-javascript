import type { Auth, FolderUpdateRequest } from '@keeper-security/keeperapi'
import {
    encryptForStorage,
    encryptObjectForStorage,
    folderUpdateCommand,
    platform,
} from '@keeper-security/keeperapi'
import type { DSharedFolder, DSharedFolderFolder, DUserFolder } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { anyIsBoolean, isBoolean, isObject, KeeperSdkError, extractErrorMessage } from '../utils'
import { resolveSingleFolder, type VaultFolderSession } from './changeDirectory'
import { FolderKind, FolderResultStatus, validateFolderName } from './folderHelpers'

export type UpdateFolderInput = {
    folderUid: string
    folderName?: string | null
    manageUsers?: boolean | null
    manageRecords?: boolean | null
    canShare?: boolean | null
    canEdit?: boolean | null
}

export type UpdateFolderResult = {
    folderUid: string
    success: boolean
    message?: string
}

export type RenameFolderResult = {
    folderUid: string
    oldName: string
    newName: string
    success: boolean
    message?: string
}

type ResolvedFolder =
    | { kind: FolderKind.UserFolder; folder: DUserFolder }
    | { kind: FolderKind.SharedFolder; folder: DSharedFolder }
    | { kind: FolderKind.SharedFolderFolder; folder: DSharedFolderFolder }

function resolveFolderEntity(storage: InMemoryStorage, folderUid: string): ResolvedFolder | undefined {
    const userFolder = storage.getByUid<DUserFolder>(FolderKind.UserFolder, folderUid)
    if (userFolder) return { kind: FolderKind.UserFolder, folder: userFolder }
    const sharedFolder = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, folderUid)
    if (sharedFolder) return { kind: FolderKind.SharedFolder, folder: sharedFolder }
    const sharedFolderFolder = storage.getByUid<DSharedFolderFolder>(FolderKind.SharedFolderFolder, folderUid)
    if (sharedFolderFolder) return { kind: FolderKind.SharedFolderFolder, folder: sharedFolderFolder }
    return undefined
}

function mergeFolderData(existing: unknown, folderName: string | null | undefined): Record<string, unknown> {
    const base = isObject(existing) ? { ...existing } : {}
    const trimmed = folderName?.trim()
    if (trimmed) {
        base.title = trimmed
        base.name = trimmed
    }
    return base
}

export async function updateFolder(
    auth: Auth,
    storage: InMemoryStorage,
    input: UpdateFolderInput
): Promise<UpdateFolderResult> {
    const folderUid = input.folderUid
    const resolved = resolveFolderEntity(storage, folderUid)
    if (!resolved) {
        throw new KeeperSdkError(`Folder "${folderUid}" does not exist.`, 'folder_not_found')
    }

    const folderKey = await storage.getKeyBytes(folderUid)
    if (!folderKey) {
        throw new KeeperSdkError(
            'Folder encryption key not available. Sync the vault and try again.',
            'folder_key_missing'
        )
    }

    const trimmedName = input.folderName?.trim() || ''
    if (trimmedName) validateFolderName(trimmedName)

    const hasPermissionUpdate = anyIsBoolean(
        input.manageUsers,
        input.manageRecords,
        input.canShare,
        input.canEdit
    )

    if (resolved.kind === FolderKind.UserFolder || resolved.kind === FolderKind.SharedFolderFolder) {
        if (!trimmedName) {
            throw new KeeperSdkError('Folder name is required.', 'folder_name_required')
        }
    } else if (resolved.kind === FolderKind.SharedFolder) {
        if (!trimmedName && !hasPermissionUpdate) {
            throw new KeeperSdkError(
                'Provide a new name or at least one permission to update.',
                'shared_folder_update_empty'
            )
        }
    }

    const effectiveName =
        resolved.kind === FolderKind.SharedFolder ? trimmedName || resolved.folder.name || undefined : trimmedName
    const mergedData = mergeFolderData(resolved.folder.data, effectiveName)

    const request: FolderUpdateRequest = {
        folder_uid: folderUid,
        folder_type: resolved.kind,
        data: await encryptObjectForStorage(mergedData, folderKey),
    }

    if (resolved.kind === FolderKind.SharedFolder) {
        const sharedFolder = resolved.folder
        const displayName = trimmedName || sharedFolder.name || folderUid
        request.shared_folder_uid = folderUid
        request.name = await encryptForStorage(platform.stringToBytes(displayName), folderKey)
        request.manage_users = isBoolean(input.manageUsers) ? input.manageUsers : sharedFolder.defaultManageUsers
        request.manage_records = isBoolean(input.manageRecords)
            ? input.manageRecords
            : sharedFolder.defaultManageRecords
        request.can_edit = isBoolean(input.canEdit) ? input.canEdit : sharedFolder.defaultCanEdit
        request.can_share = isBoolean(input.canShare) ? input.canShare : sharedFolder.defaultCanShare
    } else if (resolved.kind === FolderKind.SharedFolderFolder) {
        request.shared_folder_uid = resolved.folder.sharedFolderUid
    }

    const folderLabel = effectiveName || folderUid

    try {
        const response = await auth.executeRestCommand(folderUpdateCommand(request))
        const succeeded =
            response.result === FolderResultStatus.Success || response.result_code === FolderResultStatus.Success
        if (!succeeded) {
            const reason =
                response.message ||
                response.result_code ||
                `folder_update failed for "${folderLabel}" (uid=${folderUid}, type=${resolved.kind}): server returned no message or result_code`
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
            message: `folder_update failed for "${folderLabel}" (uid=${folderUid}, type=${resolved.kind}): ${extractErrorMessage(err)}`,
        }
    }
}

export async function renameFolder(
    auth: Auth,
    storage: InMemoryStorage,
    session: VaultFolderSession,
    folderPath: string,
    newName: string
): Promise<RenameFolderResult> {
    const trimmedPath = folderPath.trim()
    if (!trimmedPath) {
        throw new KeeperSdkError('Folder cannot be empty.', 'folder_required')
    }
    const trimmedName = newName.trim()
    if (!trimmedName) {
        throw new KeeperSdkError('New folder name is required.', 'folder_name_required')
    }

    const resolved = await resolveSingleFolder(storage, session, trimmedPath)
    if (resolved.folderUid === null) {
        throw new KeeperSdkError('Cannot rename the root folder.', 'folder_root_rename')
    }

    const result = await updateFolder(auth, storage, {
        folderUid: resolved.folderUid,
        folderName: trimmedName,
    })

    return {
        folderUid: resolved.folderUid,
        oldName: resolved.name,
        newName: trimmedName,
        success: result.success,
        message: result.message,
    }
}

export async function updateSharedFolderPermissions(
    auth: Auth,
    storage: InMemoryStorage,
    sharedFolderUid: string,
    permissions: {
        manageUsers?: boolean | null
        manageRecords?: boolean | null
        canShare?: boolean | null
        canEdit?: boolean | null
    }
): Promise<UpdateFolderResult> {
    const sharedFolder = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, sharedFolderUid)
    if (!sharedFolder) {
        throw new KeeperSdkError(`"${sharedFolderUid}" is not a shared folder.`, 'not_shared_folder')
    }
    return updateFolder(auth, storage, {
        folderUid: sharedFolderUid,
        folderName: null,
        ...permissions,
    })
}

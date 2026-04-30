import type { DSharedFolder, DSharedFolderFolder, DUserFolder } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { escapeRegExp } from '../utils'

export enum FolderKind {
    UserFolder = 'user_folder',
    SharedFolder = 'shared_folder',
    SharedFolderFolder = 'shared_folder_folder',
}

export enum ParentFolderKind {
    VirtualRoot = 'virtual_root',
    UserFolder = 'user_folder',
    SharedFolder = 'shared_folder',
    SharedFolderFolder = 'shared_folder_folder',
}

export enum FolderObjectType {
    Folder = 'folder',
    SharedFolder = 'shared_folder',
}

export enum DeleteResolution {
    Unlink = 'unlink',
}

export enum DeleteObjectType {
    Record = 'record',
    UserFolder = 'user_folder',
    SharedFolder = 'shared_folder',
    SharedFolderFolder = 'shared_folder_folder',
}

export enum FolderResultStatus {
    Success = 'success',
    Invited = 'invited',
    Unknown = 'unknown',
}

export enum VaultObjectKind {
    Record = 'record',
    Metadata = 'metadata',
    NonSharedData = 'non_shared_data',
    Team = 'team',
    User = 'user',
    SharedFolderUser = 'shared_folder_user',
    SharedFolderTeam = 'shared_folder_team',
    SharedFolderRecord = 'shared_folder_record',
}

export type FolderKindOrLiteral = FolderKind | `${FolderKind}`

export function folderKindFromString(value: string | undefined | null): FolderKind | undefined {
    if (!value) return undefined
    switch (value) {
        case FolderKind.UserFolder:
            return FolderKind.UserFolder
        case FolderKind.SharedFolder:
            return FolderKind.SharedFolder
        case FolderKind.SharedFolderFolder:
            return FolderKind.SharedFolderFolder
        default:
            return undefined
    }
}

export function userFolderName(folder: DUserFolder): string {
    const data = folder.data as { title?: string; name?: string } | undefined
    return (data?.title || data?.name || folder.uid).trim() || folder.uid
}

export function sharedFolderFolderName(folder: DSharedFolderFolder): string {
    const data = folder.data as { title?: string; name?: string } | undefined
    return (data?.title || data?.name || folder.uid).trim() || folder.uid
}

export function sharedFolderName(folder: DSharedFolder): string {
    return (folder.name || folder.uid).trim() || folder.uid
}

export function globToRegex(pattern: string): RegExp {
    const escapedPattern = escapeRegExp(pattern)
    const regexBody = escapedPattern.replace(/\*/g, '.*').replace(/\?/g, '.')
    return new RegExp(`^${regexBody}$`, 'i')
}

export async function getUserFolderParentMap(storage: InMemoryStorage): Promise<Map<string, string>> {
    const userFolders = storage.getAll<DUserFolder>(FolderKind.UserFolder)
    const childToParent = new Map<string, string>()
    for (const userFolder of userFolders) {
        const dependencies = (await storage.getDependencies(userFolder.uid)) || []
        for (const dependency of dependencies) {
            if (dependency.kind === FolderKind.UserFolder) {
                childToParent.set(dependency.uid, userFolder.uid)
            }
        }
    }
    return childToParent
}

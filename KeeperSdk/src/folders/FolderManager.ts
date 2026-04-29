import type { Auth } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../utils'
import { addFolder, mkdir } from './addFolder'
import type { AddFolderInput, AddFolderResult, MkdirOptions } from './addFolder'
import {
    changeDirectory,
    createVaultFolderSession,
    findParentFolderUid,
    getWorkingFolderDisplayName,
    resolveSingleFolder,
    splitPathComponents,
    tryResolvePath,
} from './changeDirectory'
import type { ChangeDirectoryResult, TryResolvePathResult, VaultFolderSession } from './changeDirectory'
import { buildFolderDeleteObject, deleteFolder, resolveRmdirPatternsToFolderUids, rmdir } from './deleteFolder'
import type { DeleteFolderResult, RmdirOptions } from './deleteFolder'
import { buildFolderTree, folderTreeAscii, renderFolderTreeAscii } from './folderTree'
import type { FolderTreeBuildOptions, FolderTreeResult } from './folderTree'
import { findFolder, getFolder } from './getFolder'
import type { FoundFolder, GetFolderOptions, GetFolderResult } from './getFolder'
import { findFolderUidByNameOrUid, listFolder, listRootUserFolders, listVaultRootFolders } from './listFolder'
import type { ListFolderFolderSimple, ListFolderOptions, ListFolderResult } from './listFolder'
import { renameFolder, updateFolder, updateSharedFolderPermissions } from './updateFolder'
import type { RenameFolderResult, UpdateFolderInput, UpdateFolderResult } from './updateFolder'

export type AuthProvider = () => Auth

export type SharedFolderPermissionsInput = {
    manageUsers?: boolean | null
    manageRecords?: boolean | null
    canShare?: boolean | null
    canEdit?: boolean | null
}

export class FolderManager {
    private readonly storage: InMemoryStorage
    private readonly session: VaultFolderSession
    private readonly authProvider: AuthProvider

    constructor(storage: InMemoryStorage, session: VaultFolderSession, authProvider: AuthProvider) {
        this.storage = storage
        this.session = session
        this.authProvider = authProvider
    }

    public static createSession(): VaultFolderSession {
        return createVaultFolderSession()
    }

    public static splitPathComponents(path: string): string[] {
        return splitPathComponents(path)
    }

    public getSession(): VaultFolderSession {
        return this.session
    }

    public getCurrentFolderUid(): string | null {
        return this.session.currentFolderUid
    }

    public getWorkingFolderDisplayName(): string {
        return getWorkingFolderDisplayName(this.storage, this.session.currentFolderUid)
    }

    private requireAuth(): Auth {
        const auth = this.authProvider()
        if (!auth) {
            throw new KeeperSdkError('Not logged in. Call login() first.', ResultCodes.NOT_LOGGED_IN)
        }
        return auth
    }

    public async listFolder(options: ListFolderOptions = {}): Promise<ListFolderResult> {
        return listFolder(this.storage, options)
    }

    public listRootUserFolders() {
        return listRootUserFolders(this.storage)
    }

    public async listVaultRootFolders(): Promise<{
        rows: ListFolderFolderSimple[]
        promotedRootSharedUids: Set<string>
    }> {
        return listVaultRootFolders(this.storage)
    }

    public findFolderUidByNameOrUid(needle: string): string | undefined {
        return findFolderUidByNameOrUid(this.storage, needle)
    }

    public findFolder(needle: string): FoundFolder | undefined {
        return findFolder(this.storage, needle)
    }

    public async findParentFolderUid(folderUid: string): Promise<string | null> {
        return findParentFolderUid(this.storage, folderUid)
    }

    public async getFolder(uidOrName: string, options: GetFolderOptions = {}): Promise<GetFolderResult> {
        return getFolder(this.storage, uidOrName, options)
    }

    public async changeDirectory(path: string): Promise<ChangeDirectoryResult> {
        return changeDirectory(this.storage, this.session, path)
    }

    public async tryResolvePath(path: string): Promise<TryResolvePathResult> {
        return tryResolvePath(this.storage, this.session, path)
    }

    public async resolveSingleFolder(folderName: string): Promise<ChangeDirectoryResult> {
        return resolveSingleFolder(this.storage, this.session, folderName)
    }

    public async addFolder(input: AddFolderInput): Promise<AddFolderResult> {
        return addFolder(this.requireAuth(), this.storage, input)
    }

    public async mkdir(
        path: string,
        options: MkdirOptions = {}
    ): Promise<{ folderUid: string; success: boolean; message?: string }> {
        return mkdir(this.requireAuth(), this.storage, this.session, path, options)
    }

    public async updateFolder(input: UpdateFolderInput): Promise<UpdateFolderResult> {
        return updateFolder(this.requireAuth(), this.storage, input)
    }

    public async renameFolder(folderPath: string, newName: string): Promise<RenameFolderResult> {
        return renameFolder(this.requireAuth(), this.storage, this.session, folderPath, newName)
    }

    public async updateSharedFolderPermissions(
        sharedFolderUid: string,
        permissions: SharedFolderPermissionsInput
    ): Promise<UpdateFolderResult> {
        return updateSharedFolderPermissions(this.requireAuth(), this.storage, sharedFolderUid, permissions)
    }

    public async deleteFolder(
        folderRefs: string[],
        confirm?: (summary: string) => boolean | Promise<boolean>
    ): Promise<DeleteFolderResult> {
        return deleteFolder(this.requireAuth(), this.storage, folderRefs, confirm)
    }

    public async rmdir(patterns: string[], options: RmdirOptions = {}): Promise<DeleteFolderResult> {
        return rmdir(this.requireAuth(), this.storage, this.session, patterns, options)
    }

    public async resolveRmdirPatternsToFolderUids(pattern: string): Promise<Set<string>> {
        return resolveRmdirPatternsToFolderUids(this.storage, this.session, pattern)
    }

    public async buildFolderDeleteObject(folderUid: string) {
        return buildFolderDeleteObject(this.storage, folderUid)
    }

    public async buildFolderTree(options: FolderTreeBuildOptions = {}): Promise<FolderTreeResult> {
        return buildFolderTree(this.storage, this.session, options)
    }

    public async folderTreeAscii(options: FolderTreeBuildOptions = {}): Promise<string> {
        return folderTreeAscii(this.storage, this.session, options)
    }

    public renderFolderTreeAscii(tree: FolderTreeResult): string {
        return renderFolderTreeAscii(tree)
    }
}

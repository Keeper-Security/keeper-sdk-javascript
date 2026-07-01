import type { Auth, DeleteObject, KeeperPreDeleteResponse } from '@keeper-security/keeperapi'
import { preDeleteCommand, recordDeleteCommand } from '@keeper-security/keeperapi'
import type { DSharedFolder, DSharedFolderFolder, DUserFolder } from '@keeper-security/keeperapi'
import { getSdkPlatform } from '../platform'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, extractErrorMessage, logger } from '../utils'
import { listFolder } from './listFolder'
import type { ListFolderFolderSimple } from './listFolder'
import { tryResolvePath, findParentFolderUid, type VaultFolderSession } from './changeDirectory'
import {
    DeleteResolution,
    FolderKind,
    globToRegex,
    sharedFolderFolderName,
    sharedFolderName,
    userFolderName,
} from './folderHelpers'
import { findFolder } from './getFolder'

export type DeleteFolderResult = {
    success: boolean
    message?: string
    cancelled?: boolean
}

export type RmdirOptions = {
    force?: boolean
    quiet?: boolean
    confirm?: (summary: string) => boolean | Promise<boolean>
    /** Override prompt (e.g. browser shell UI). Defaults to SdkPlatform readline. */
    ask?: (prompt: string) => Promise<string>
}

function isYesAnswer(answer: string): boolean {
    const normalized = answer.trim().toLowerCase()
    return normalized === 'y' || normalized === 'yes'
}

async function defaultAsk(prompt: string): Promise<string> {
    const rl = getSdkPlatform().createReadline()
    try {
        return await rl.question(prompt)
    } finally {
        rl.close()
    }
}

function resolveRmdirConfirm(
    options: RmdirOptions
): ((summary: string) => Promise<boolean>) | undefined {
    if (options.force) return undefined
    if (options.confirm) {
        return async (summary) => Promise.resolve(options.confirm!(summary))
    }
    const ask = options.ask ?? defaultAsk
    return async (summary) => {
        logger.info(`\n${summary}\n`)
        const answer = await ask('Do you want to proceed? (y/n) ')
        return isYesAnswer(answer)
    }
}

function folderKindOfUid(storage: InMemoryStorage, uid: string): FolderKind {
    if (storage.getByUid<DUserFolder>(FolderKind.UserFolder, uid)) return FolderKind.UserFolder
    if (storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, uid)) return FolderKind.SharedFolder
    if (storage.getByUid<DSharedFolderFolder>(FolderKind.SharedFolderFolder, uid)) return FolderKind.SharedFolderFolder
    return FolderKind.UserFolder
}

async function listFolderChildrenFolders(
    storage: InMemoryStorage,
    parentUid: string | null
): Promise<ListFolderFolderSimple[]> {
    const result = await listFolder(storage, {
        folderUid: parentUid === null ? undefined : parentUid,
        showFolders: true,
        showRecords: false,
    })
    return result.folders
}

function folderDisplayName(storage: InMemoryStorage, uid: string): string {
    const userFolder = storage.getByUid<DUserFolder>(FolderKind.UserFolder, uid)
    if (userFolder) return userFolderName(userFolder)
    const sharedFolder = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, uid)
    if (sharedFolder) return sharedFolderName(sharedFolder)
    const sharedFolderFolder = storage.getByUid<DSharedFolderFolder>(FolderKind.SharedFolderFolder, uid)
    if (sharedFolderFolder) return sharedFolderFolderName(sharedFolderFolder)
    return uid
}

export async function buildFolderDeleteObject(
    storage: InMemoryStorage,
    folderUid: string
): Promise<DeleteObject | null> {
    const userFolder = storage.getByUid<DUserFolder>(FolderKind.UserFolder, folderUid)
    if (userFolder) {
        const parentUid = await findParentFolderUid(storage, folderUid)
        const deleteObject: DeleteObject = {
            delete_resolution: DeleteResolution.Unlink,
            object_uid: folderUid,
            object_type: FolderKind.UserFolder,
            from_type: FolderKind.UserFolder,
        }
        if (parentUid) {
            deleteObject.from_uid = parentUid
            deleteObject.from_type = folderKindOfUid(storage, parentUid)
        } else {
            deleteObject.from_uid = ''
        }
        return deleteObject
    }
    const sharedFolder = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, folderUid)
    if (sharedFolder) {
        const parentUid = await findParentFolderUid(storage, folderUid)
        const deleteObject: DeleteObject = {
            delete_resolution: DeleteResolution.Unlink,
            object_uid: folderUid,
            object_type: FolderKind.SharedFolder,
            from_type: FolderKind.UserFolder,
        }
        if (parentUid) {
            deleteObject.from_uid = parentUid
            deleteObject.from_type = folderKindOfUid(storage, parentUid)
        } else {
            deleteObject.from_uid = ''
        }
        return deleteObject
    }
    const sharedFolderFolder = storage.getByUid<DSharedFolderFolder>(FolderKind.SharedFolderFolder, folderUid)
    if (sharedFolderFolder) {
        const parentUid = await findParentFolderUid(storage, folderUid)
        const deleteObject: DeleteObject = {
            delete_resolution: DeleteResolution.Unlink,
            object_uid: folderUid,
            object_type: FolderKind.SharedFolderFolder,
            from_type: FolderKind.SharedFolder,
        }
        if (parentUid) {
            deleteObject.from_uid = parentUid
            deleteObject.from_type = folderKindOfUid(storage, parentUid)
        } else {
            deleteObject.from_uid = sharedFolderFolder.sharedFolderUid
            deleteObject.from_type = FolderKind.SharedFolder
        }
        return deleteObject
    }
    return null
}

async function buildDeleteObjectForFolderRef(
    storage: InMemoryStorage,
    ref: string
): Promise<DeleteObject | null> {
    const trimmed = ref.trim()
    if (!trimmed) return null

    const direct = await buildFolderDeleteObject(storage, trimmed)
    if (direct) return direct

    const found = findFolder(storage, trimmed)
    if (!found) return null
    return buildFolderDeleteObject(storage, found.folder.uid)
}

export async function deleteFolder(
    auth: Auth,
    storage: InMemoryStorage,
    folderRefs: string[],
    confirm?: (summary: string) => boolean | Promise<boolean>
): Promise<DeleteFolderResult> {
    const objects: DeleteObject[] = []
    for (const ref of folderRefs) {
        const deleteObject = await buildDeleteObjectForFolderRef(storage, ref)
        if (deleteObject) objects.push(deleteObject)
    }
    if (objects.length === 0) {
        throw new KeeperSdkError(
            'No folders found to delete (not a folder UID or name).',
            'delete_nothing'
        )
    }

    const targetUids = objects.map((deleteObject) => deleteObject.object_uid).join(', ')

    let preResp: KeeperPreDeleteResponse
    try {
        preResp = await auth.executeRestCommand(preDeleteCommand({ objects }))
    } catch (err) {
        return {
            success: false,
            message: `pre_delete failed for [${targetUids}]: ${extractErrorMessage(err)}`,
        }
    }

    const inner = preResp.pre_delete_response
    let deleteToken = inner?.pre_delete_token
    if (!deleteToken) {
        const reason =
            preResp.message ||
            preResp.result_code ||
            `pre_delete failed for [${targetUids}]: server did not return a pre_delete_token`
        return {
            success: false,
            message: reason,
        }
    }

    if (confirm) {
        const wouldDelete = inner?.would_delete
        const summaryItems = wouldDelete?.deletion_summary
        const summary = Array.isArray(summaryItems) ? summaryItems.join('\n') : ''
        const confirmed = await confirm(summary)
        if (!confirmed) {
            return { success: false, cancelled: true, message: 'Cancelled.' }
        }

        // Interactive confirmation can outlive the pre_delete token; fetch a fresh one.
        try {
            preResp = await auth.executeRestCommand(preDeleteCommand({ objects }))
        } catch (err) {
            return {
                success: false,
                message: `pre_delete refresh failed for [${targetUids}]: ${extractErrorMessage(err)}`,
            }
        }
        deleteToken = preResp.pre_delete_response?.pre_delete_token
        if (!deleteToken) {
            const reason =
                preResp.message ||
                preResp.result_code ||
                `pre_delete refresh failed for [${targetUids}]: server did not return a pre_delete_token`
            return {
                success: false,
                message: reason,
            }
        }
    }

    try {
        await auth.executeRestCommand(recordDeleteCommand({ pre_delete_token: deleteToken }))
    } catch (err) {
        return {
            success: false,
            message: `record_delete failed for [${targetUids}]: ${extractErrorMessage(err)}`,
        }
    }

    for (const deleteObject of objects) {
        try {
            await storage.delete(deleteObject.object_type, deleteObject.object_uid)
        } catch (err) {
            logger.debug(`Failed to purge ${deleteObject.object_type} ${deleteObject.object_uid}:`, extractErrorMessage(err))
        }
    }

    return { success: true }
}

export async function resolveRmdirPatternsToFolderUids(
    storage: InMemoryStorage,
    session: VaultFolderSession,
    pattern: string
): Promise<Set<string>> {
    const matchedUids = new Set<string>()
    const trimmedPattern = pattern.trim()
    if (!trimmedPattern) return matchedUids

    const { folderUid: baseUid, remaining } = await tryResolvePath(storage, session, trimmedPattern)
    const remainingPattern = remaining.trim()

    if (!remainingPattern) {
        if (baseUid !== null) {
            matchedUids.add(baseUid)
        }
        return matchedUids
    }

    const children = await listFolderChildrenFolders(storage, baseUid)
    const exactChild = children.find((child) => child.uid === remainingPattern)
    if (exactChild) {
        matchedUids.add(exactChild.uid)
        return matchedUids
    }

    const matcher = globToRegex(remainingPattern)
    for (const child of children) {
        if (matcher.test(child.name.trim())) {
            matchedUids.add(child.uid)
        }
    }
    return matchedUids
}

async function dedupeNestedFolderDeletes(storage: InMemoryStorage, folderUids: Set<string>): Promise<void> {
    for (const folderUid of [...folderUids]) {
        let current = folderUid
        while (true) {
            const parentUid = await findParentFolderUid(storage, current)
            if (!parentUid) break
            if (folderUids.has(parentUid)) {
                folderUids.delete(folderUid)
                break
            }
            current = parentUid
        }
    }
}

export async function rmdir(
    auth: Auth,
    storage: InMemoryStorage,
    session: VaultFolderSession,
    patterns: string[],
    options: RmdirOptions = {}
): Promise<DeleteFolderResult> {
    const { force = false, quiet = false } = options
    const folderUids = new Set<string>()

    for (const pattern of patterns) {
        const trimmedPattern = pattern.trim()
        if (!trimmedPattern) continue
        const resolved = await resolveRmdirPatternsToFolderUids(storage, session, trimmedPattern)
        for (const matchedUid of resolved) {
            folderUids.add(matchedUid)
        }
    }

    if (folderUids.size === 0) {
        throw new KeeperSdkError('Enter name of an existing folder.', 'rmdir_no_match')
    }

    await dedupeNestedFolderDeletes(storage, folderUids)

    const sortedNames = [...folderUids]
        .map((uid) => folderDisplayName(storage, uid))
        .sort((nameA, nameB) => nameA.localeCompare(nameB, undefined, { sensitivity: 'base' }))

    if (!quiet || !force) {
        logger.info(`\nThe following folder(s) will be removed:\n${sortedNames.join(', ')}\n`)
    }

    return deleteFolder(auth, storage, [...folderUids], resolveRmdirConfirm(options))
}

import type { Auth, DeleteObject, KeeperPreDeleteResponse } from '@keeper-security/keeperapi'
import { preDeleteCommand, recordDeleteCommand } from '@keeper-security/keeperapi'
import type { DSharedFolder, DSharedFolderFolder, DUserFolder } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, extractErrorMessage, logger } from '../utils'
import { listFolder } from './listFolder'
import type { ListFolderFolderSimple } from './listFolder'
import { tryResolvePath, findParentFolderUid, type VaultFolderSession } from './changeDirectory'
import { globToRegex, sharedFolderFolderName, sharedFolderName, userFolderName } from './folderHelpers'
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
}

function folderKindOfUid(
    storage: InMemoryStorage,
    uid: string
): 'user_folder' | 'shared_folder' | 'shared_folder_folder' {
    if (storage.getByUid<DUserFolder>('user_folder', uid)) return 'user_folder'
    if (storage.getByUid<DSharedFolder>('shared_folder', uid)) return 'shared_folder'
    if (storage.getByUid<DSharedFolderFolder>('shared_folder_folder', uid)) return 'shared_folder_folder'
    return 'user_folder'
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
    const uf = storage.getByUid<DUserFolder>('user_folder', uid)
    if (uf) return userFolderName(uf)
    const sf = storage.getByUid<DSharedFolder>('shared_folder', uid)
    if (sf) return sharedFolderName(sf)
    const sff = storage.getByUid<DSharedFolderFolder>('shared_folder_folder', uid)
    if (sff) return sharedFolderFolderName(sff)
    return uid
}

export async function buildFolderDeleteObject(
    storage: InMemoryStorage,
    folderUid: string
): Promise<DeleteObject | null> {
    const uf = storage.getByUid<DUserFolder>('user_folder', folderUid)
    if (uf) {
        const parentUid = await findParentFolderUid(storage, folderUid)
        const o: DeleteObject = {
            delete_resolution: 'unlink',
            object_uid: folderUid,
            object_type: 'user_folder',
            from_type: 'user_folder',
        }
        if (parentUid) {
            o.from_uid = parentUid
            o.from_type = folderKindOfUid(storage, parentUid)
        } else {
            o.from_uid = ''
        }
        return o
    }
    const sf = storage.getByUid<DSharedFolder>('shared_folder', folderUid)
    if (sf) {
        const parentUid = await findParentFolderUid(storage, folderUid)
        const o: DeleteObject = {
            delete_resolution: 'unlink',
            object_uid: folderUid,
            object_type: 'shared_folder',
            from_type: 'user_folder',
        }
        if (parentUid) {
            o.from_uid = parentUid
            o.from_type = folderKindOfUid(storage, parentUid)
        } else {
            o.from_uid = ''
        }
        return o
    }
    const sff = storage.getByUid<DSharedFolderFolder>('shared_folder_folder', folderUid)
    if (sff) {
        const parentUid = await findParentFolderUid(storage, folderUid)
        const o: DeleteObject = {
            delete_resolution: 'unlink',
            object_uid: folderUid,
            object_type: 'shared_folder_folder',
            from_type: 'shared_folder',
        }
        if (parentUid) {
            o.from_uid = parentUid
            o.from_type = folderKindOfUid(storage, parentUid)
        } else {
            o.from_uid = sff.sharedFolderUid
            o.from_type = 'shared_folder'
        }
        return o
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
        const obj = await buildDeleteObjectForFolderRef(storage, ref)
        if (obj) objects.push(obj)
    }
    if (objects.length === 0) {
        throw new KeeperSdkError(
            'No folders found to delete (not a folder UID or name).',
            'delete_nothing'
        )
    }

    let preResp: KeeperPreDeleteResponse
    try {
        preResp = await auth.executeRestCommand(preDeleteCommand({ objects }))
    } catch (err) {
        return { success: false, message: extractErrorMessage(err) }
    }

    const inner = preResp.pre_delete_response
    const token = inner?.pre_delete_token
    if (!token) {
        return {
            success: false,
            message: preResp.message || preResp.result_code || 'pre_delete failed: no token',
        }
    }

    if (confirm) {
        const wd = inner?.would_delete
        const list = wd?.deletion_summary
        if (Array.isArray(list) && list.length > 0) {
            const summary = list.join('\n')
            const ok = await confirm(summary)
            if (!ok) {
                return { success: false, cancelled: true, message: 'Cancelled.' }
            }
        }
    }

    try {
        await auth.executeRestCommand(recordDeleteCommand({ pre_delete_token: token }))
    } catch (err) {
        return { success: false, message: extractErrorMessage(err) }
    }

    return { success: true }
}

export async function resolveRmdirPatternsToFolderUids(
    storage: InMemoryStorage,
    session: VaultFolderSession,
    pattern: string
): Promise<Set<string>> {
    const out = new Set<string>()
    const trimmed = pattern.trim()
    if (!trimmed) return out

    const { folderUid: baseUid, remaining } = await tryResolvePath(storage, session, trimmed)
    const rest = remaining.trim()

    if (!rest) {
        if (baseUid !== null) {
            out.add(baseUid)
        }
        return out
    }

    const children = await listFolderChildrenFolders(storage, baseUid)
    const direct = children.find((c) => c.uid === rest)
    if (direct) {
        out.add(direct.uid)
        return out
    }

    const regex = globToRegex(rest)
    for (const ch of children) {
        if (regex.test(ch.name.trim())) {
            out.add(ch.uid)
        }
    }
    return out
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
    const { force = false, quiet = false, confirm } = options
    if (!force && !confirm) {
        throw new KeeperSdkError(
            'Confirmation is required: pass `confirm` or set `force: true`.',
            'rmdir_confirm_required'
        )
    }
    const folderUids = new Set<string>()

    for (const p of patterns) {
        const part = p.trim()
        if (!part) continue
        const resolved = await resolveRmdirPatternsToFolderUids(storage, session, part)
        for (const u of resolved) {
            folderUids.add(u)
        }
    }

    if (folderUids.size === 0) {
        throw new KeeperSdkError('Enter name of an existing folder.', 'rmdir_no_match')
    }

    await dedupeNestedFolderDeletes(storage, folderUids)

    const sortedNames = [...folderUids]
        .map((uid) => folderDisplayName(storage, uid))
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

    if (!quiet || !force) {
        logger.info(`\nThe following folder(s) will be removed:\n${sortedNames.join(', ')}\n`)
    }

    const confirmFn = force ? undefined : confirm

    return deleteFolder(auth, storage, [...folderUids], confirmFn)
}

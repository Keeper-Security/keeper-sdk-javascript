import type { Auth, KeeperPreDeleteResponse } from '@keeper-security/keeperapi'
import { recordDeleteCommand } from '@keeper-security/keeperapi'
import type { DRecord, DSharedFolder, DSharedFolderFolder, DSharedFolderRecord, DUserFolder } from '@keeper-security/keeperapi'
import type { RestCommand } from '@keeper-security/keeperapi'

/** Matches keeperapi `DeleteObject` (folder/record unlink payload for `pre_delete`). */
export type VaultDeleteObject = {
    object_uid: string
    object_type: 'record' | 'user_folder' | 'shared_folder' | 'shared_folder_folder'
    from_uid?: string
    from_type: 'user_folder' | 'shared_folder' | 'shared_folder_folder'
    delete_resolution: 'unlink'
}
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, extractErrorMessage, logger } from '../utils'
import { getRecordTitle } from '../records/RecordUtils'
import { listFolder } from './listFolder'
import type { ListFolderFolderSimple } from './listFolder'
import {
    tryResolvePath,
    findParentFolderUid,
    type VaultFolderSession,
} from './changeDirectory'

export type DeleteVaultObjectsResult = {
    success: boolean
    message?: string
    cancelled?: boolean
}

export type RmdirOptions = {
    /** Skip confirmation (still runs `pre_delete`). */
    force?: boolean
    /** Suppress listing folder paths before confirm (CLI). */
    quiet?: boolean
    /** Called with server deletion summary; return false to cancel. Not used when `force` is true. */
    confirm?: (summary: string) => boolean | Promise<boolean>
}

function globToRegex(pattern: string): RegExp {
    const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&')
    const body = escaped.replace(/\*/g, '.*').replace(/\?/g, '.')
    return new RegExp(`^${body}$`, 'i')
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
    if (uf) {
        const d = uf.data as { title?: string; name?: string } | undefined
        return (d?.title || d?.name || uf.uid).trim() || uf.uid
    }
    const sf = storage.getByUid<DSharedFolder>('shared_folder', uid)
    if (sf) return (sf.name || sf.uid).trim() || sf.uid
    const sff = storage.getByUid<DSharedFolderFolder>('shared_folder_folder', uid)
    if (sff) {
        const d = sff.data as { title?: string; name?: string } | undefined
        return (d?.title || d?.name || sff.uid).trim() || sff.uid
    }
    return uid
}

/**
 * Build `pre_delete` object for a folder (user, shared, or shared-folder subfolder).
 */
export async function buildFolderDeleteObject(
    storage: InMemoryStorage,
    folderUid: string
): Promise<VaultDeleteObject | null> {
    if (storage.getByUid<DUserFolder>('user_folder', folderUid)) {
        const parentUid = await findParentFolderUid(storage, folderUid)
        const o: VaultDeleteObject = {
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
    if (storage.getByUid<DSharedFolder>('shared_folder', folderUid)) {
        const parentUid = await findParentFolderUid(storage, folderUid)
        const o: VaultDeleteObject = {
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
        const o: VaultDeleteObject = {
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

async function findRecordFolderContext(
    storage: InMemoryStorage,
    recordUid: string
): Promise<{ from_uid: string; from_type: VaultDeleteObject['from_type'] } | null> {
    for (const uf of storage.getAll<DUserFolder>('user_folder')) {
        const deps = (await storage.getDependencies(uf.uid)) || []
        if (deps.some((d) => d.kind === 'record' && d.uid === recordUid)) {
            return { from_uid: uf.uid, from_type: 'user_folder' }
        }
    }
    for (const sf of storage.getAll<DSharedFolder>('shared_folder')) {
        const deps = (await storage.getDependencies(sf.uid)) || []
        if (deps.some((d) => d.kind === 'record' && d.uid === recordUid)) {
            return { from_uid: sf.uid, from_type: 'shared_folder' }
        }
    }
    for (const sff of storage.getAll<DSharedFolderFolder>('shared_folder_folder')) {
        const deps = (await storage.getDependencies(sff.uid)) || []
        if (deps.some((d) => d.kind === 'record' && d.uid === recordUid)) {
            return { from_uid: sff.uid, from_type: 'shared_folder_folder' }
        }
    }
    const sfr = storage.getAll<DSharedFolderRecord>('shared_folder_record').find((r) => r.recordUid === recordUid)
    if (sfr) {
        return { from_uid: sfr.sharedFolderUid, from_type: 'shared_folder' }
    }
    return null
}

async function buildDeleteObjectForRef(
    storage: InMemoryStorage,
    toDelete: string
): Promise<VaultDeleteObject | null> {
    const trimmed = toDelete.trim()
    if (!trimmed) return null

    const folderObj = await buildFolderDeleteObject(storage, trimmed)
    if (folderObj) return folderObj

    const record = storage.getByUid<DRecord>('record', trimmed)
    if (record) {
        const ctx = await findRecordFolderContext(storage, trimmed)
        const o: VaultDeleteObject = {
            delete_resolution: 'unlink',
            object_uid: trimmed,
            object_type: 'record',
            from_type: 'user_folder',
        }
        if (ctx) {
            o.from_uid = ctx.from_uid
            o.from_type = ctx.from_type
        } else {
            o.from_uid = ''
        }
        return o
    }

    const lower = trimmed.toLowerCase()
    for (const r of storage.getAll<DRecord>('record')) {
        if (r.version !== 2 && r.version !== 3) continue
        const title = getRecordTitle(r)
        if (title.trim().toLowerCase() === lower) {
            const ctx = await findRecordFolderContext(storage, r.uid)
            const o: VaultDeleteObject = {
                delete_resolution: 'unlink',
                object_uid: r.uid,
                object_type: 'record',
                from_type: 'user_folder',
            }
            if (ctx) {
                o.from_uid = ctx.from_uid
                o.from_type = ctx.from_type
            } else {
                o.from_uid = ''
            }
            return o
        }
    }

    return null
}

function preDeleteCommandFlexible(objects: VaultDeleteObject[]): RestCommand<{ objects: VaultDeleteObject[] }, KeeperPreDeleteResponse> {
    return {
        baseRequest: { command: 'pre_delete' },
        request: { objects },
        authorization: {},
    }
}

/**
 * Delete vault objects via `pre_delete` then `delete` (two-step protocol).
 * Resolves each string as folder UID, record UID, or record title.
 */
export async function deleteVaultObjects(
    auth: Auth,
    storage: InMemoryStorage,
    refs: string[],
    confirm?: (summary: string) => boolean | Promise<boolean> | null
): Promise<DeleteVaultObjectsResult> {
    const objects: VaultDeleteObject[] = []
    for (const ref of refs) {
        const obj = await buildDeleteObjectForRef(storage, ref)
        if (obj) objects.push(obj)
    }
    if (objects.length === 0) {
        throw new KeeperSdkError(
            'No objects found to delete (not a folder UID, record UID, or record title).',
            'delete_nothing'
        )
    }

    let preResp: KeeperPreDeleteResponse
    try {
        const cmd = preDeleteCommandFlexible(objects)
        preResp = await auth.executeRestCommand(cmd)
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
        const deleteCmd = recordDeleteCommand({ pre_delete_token: token })
        await auth.executeRestCommand(deleteCmd)
    } catch (err) {
        return { success: false, message: extractErrorMessage(err) }
    }

    return { success: true }
}

/**
 * Remove child folders matching path / name / UID / glob (CLI `rmdir`).
 */
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

/**
 * Remove folders by path, UID, name, or glob (`rmdir`). Uses `deleteVaultObjects` with folder UIDs only.
 */
export async function rmdir(
    auth: Auth,
    storage: InMemoryStorage,
    session: VaultFolderSession,
    patterns: string[],
    options: RmdirOptions = {}
): Promise<DeleteVaultObjectsResult> {
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

    const confirmFn = force
        ? null
        : confirm ?? null

    return deleteVaultObjects(auth, storage, [...folderUids], confirmFn)
}

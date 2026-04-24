import type { DRecord, DSharedFolder, DSharedFolderFolder, DSharedFolderRecord, DTeam } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { getRecordTitle } from '../records/RecordUtils'
import { KeeperSdkError } from '../utils'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i

export function isEmailString(s: string): boolean {
    return EMAIL_RE.test(s.trim())
}

/**
 * All shared folder UIDs, or resolve names / UIDs / subfolder UIDs to shared-folder scope UIDs.
 */
export function resolveSharedFolderUids(storage: InMemoryStorage, refs: string[]): Set<string> {
    if (refs.some((r) => r.trim() === '*')) {
        return new Set(storage.getAll<DSharedFolder>('shared_folder').map((f) => f.uid))
    }
    const uids = new Set<string>()
    for (const raw of refs) {
        const s = raw.trim()
        if (!s) continue
        const uid = tryResolveOneSharedFolderUid(storage, s)
        if (uid) uids.add(uid)
    }
    if (uids.size === 0) {
        throw new KeeperSdkError('No shared folders matched the given name(s) or UID(s).', 'shared_folder_not_found')
    }
    return uids
}

function tryResolveOneSharedFolderUid(storage: InMemoryStorage, nameOrUid: string): string | null {
    const t = nameOrUid.trim()
    for (const sf of storage.getAll<DSharedFolder>('shared_folder')) {
        if (sf.uid === t) return sf.uid
        if ((sf.name || '').trim() === t) return sf.uid
        if ((sf.name || '').toLowerCase() === t.toLowerCase()) return sf.uid
    }
    const sff = storage.getByUid<DSharedFolderFolder>('shared_folder_folder', t)
    if (sff) return sff.sharedFolderUid
    for (const f of storage.getAll<DSharedFolderFolder>('shared_folder_folder')) {
        const d = f.data as { title?: string; name?: string } | undefined
        const n = (d?.title || d?.name || '').trim()
        if (n === t || n.toLowerCase() === t.toLowerCase()) return f.sharedFolderUid
    }
    return null
}

/**
 * Find team UID by exact UID or case-insensitive team name.
 */
export function tryResolveTeamUid(storage: InMemoryStorage, nameOrUid: string): string | null {
    const t = nameOrUid.trim()
    for (const team of storage.getAll<DTeam>('team')) {
        if (team.uid === t) return team.uid
        if (team.name.trim() === t) return team.uid
        if (team.name.toLowerCase() === t.toLowerCase()) return team.uid
    }
    return null
}

/**
 * Find record UIDs: by UID, or by title; returns empty if none.
 */
export function findRecordUidsInVault(storage: InMemoryStorage, nameOrUid: string): string[] {
    const t = nameOrUid.trim()
    const byId = storage.getByUid<DRecord>('record', t)
    if (byId) return [byId.uid]
    const uids: string[] = []
    for (const r of storage.getAll<DRecord>('record')) {
        if (getRecordTitle(r).toLowerCase() === t.toLowerCase()) uids.push(r.uid)
    }
    return uids
}

/**
 * All record UIDs currently linked to a shared folder (per local sync data).
 */
export function listRecordUidsInSharedFolder(storage: InMemoryStorage, sharedFolderUid: string): string[] {
    const uids: string[] = []
    for (const r of storage.getAll<DSharedFolderRecord>('shared_folder_record')) {
        if (r.sharedFolderUid === sharedFolderUid) uids.push(r.recordUid)
    }
    return uids
}

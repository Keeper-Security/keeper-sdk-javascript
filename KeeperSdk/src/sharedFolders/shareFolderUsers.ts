import type { Auth, DSharedFolder, DSharedFolderTeam, DSharedFolderUser, DTeam, KeeperResponse } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError } from '../utils'
import { updateSharedFolderPermissions } from '../folders/updateFolder'
import { encryptSharedFolderKeyForUser } from './sharedFolderCrypto'
import { resolveSharedFolderUids, isEmailString, tryResolveTeamUid } from './sharedFolderResolve'
import { encryptedSharedFolderNameB64, getSharedFolderKeyOrThrow, isSuccessResponse, sendSharedFolderUpdate } from './shareFolderUpdateCommon'

export type ShareFolderUsersInput = {
    /** Shared folder UIDs, names, or `*` (all) — same resolution as the Python `share-folder` command. */
    sharedFolderRefs: string[]
    /** `grant` adds/updates; `remove` revokes. */
    action: 'grant' | 'remove'
    /**
     * Corresponds to repeated `-e`: `*` (default user permissions for the folder), `@existing` or `@current`
     * (every user/team already in the folder), an email, or a team name / team UID.
     */
    userTargets: string[]
    /** `-p` / `manage-records` */
    manageRecords?: boolean | null
    /** `-o` / `manage-users` */
    manageUsers?: boolean | null
    /** `-f` / `--force` */
    force?: boolean
}

export type ShareFolderUsersResult = {
    success: boolean
    message?: string
    sharedFolderUids: string[]
    responses: KeeperResponse[]
}

function isExistingToken(s: string): boolean {
    const t = s.trim().toLowerCase()
    return t === '@existing' || t === '@current'
}

type ParsedTargets = {
    setDefaults: boolean
    expandAllExisting: boolean
    explicitEmails: string[]
    teamUids: string[]
}

function parseUserTargetList(
    userTargets: string[]
): { parsed: ParsedTargets; allBlank: boolean } {
    if (!userTargets || userTargets.length === 0) {
        return { parsed: { setDefaults: false, expandAllExisting: false, explicitEmails: [], teamUids: [] }, allBlank: true }
    }
    let hasStar = false
    let expandAllExisting = false
    const explicitEmails: string[] = []
    const teamLabels: string[] = []
    for (const raw of userTargets) {
        const s = raw?.trim() ?? ''
        if (!s) continue
        if (s === '*') {
            hasStar = true
        } else if (isExistingToken(s)) {
            expandAllExisting = true
        } else if (isEmailString(s)) {
            explicitEmails.push(s.toLowerCase())
        } else {
            teamLabels.push(s)
        }
    }
    return {
        parsed: {
            setDefaults: hasStar,
            expandAllExisting,
            explicitEmails,
            teamUids: teamLabels,
        },
        allBlank: !hasStar && !expandAllExisting && explicitEmails.length === 0 && teamLabels.length === 0,
    }
}

function listUsersAndTeamsInFolder(
    storage: InMemoryStorage,
    sharedFolderUid: string
): { emails: string[]; teamUids: string[] } {
    const emails: string[] = []
    for (const u of storage.getAll<DSharedFolderUser>('shared_folder_user')) {
        if (u.sharedFolderUid === sharedFolderUid) {
            const n = (u.accountUsername || '').trim()
            if (n) emails.push(n.toLowerCase())
        }
    }
    const tids: string[] = []
    for (const t of storage.getAll<DSharedFolderTeam>('shared_folder_team')) {
        if (t.sharedFolderUid === sharedFolderUid) tids.push(t.teamUid)
    }
    return { emails, teamUids: tids }
}

function isUserAlreadyInFolder(storage: InMemoryStorage, sharedFolderUid: string, emailLower: string): boolean {
    for (const u of storage.getAll<DSharedFolderUser>('shared_folder_user')) {
        if (u.sharedFolderUid !== sharedFolderUid) continue
        const n = (u.accountUsername || '').trim().toLowerCase()
        if (n && n === emailLower) return true
    }
    return false
}

function emptyUserRow(username: string) {
    return { username, manage_users: false, manage_records: false, shared_folder_key: '' }
}

/**
 * Add/update/remove people on shared folders (`shared_folder_update`). Resolves `*` to all shared folders
 * in the vault. For **teams**, only `remove` is supported when the team is already in the folder; adding
 * a team (encrypted team key) is not implemented here — use a client that already supports it.
 */
export async function shareFolderUsers(
    auth: Auth,
    storage: InMemoryStorage,
    input: ShareFolderUsersInput
): Promise<ShareFolderUsersResult> {
    const { action, userTargets, manageRecords, manageUsers, force = false } = input
    if (!input.sharedFolderRefs || input.sharedFolderRefs.length === 0) {
        throw new KeeperSdkError('At least one shared folder must be specified.', 'shared_folder_required')
    }

    const { parsed, allBlank } = parseUserTargetList(userTargets)
    if (allBlank) {
        return { success: true, message: 'Nothing to do', sharedFolderUids: [], responses: [] }
    }

    if (action === 'remove' && parsed.setDefaults) {
        throw new KeeperSdkError('Removing a user * target is not used for remove. Omit * or use folder targets only.', 'invalid_remove_star')
    }

    for (const label of parsed.teamUids) {
        if (isEmailString(label)) continue
        const teamUid = tryResolveTeamUid(storage, label) ?? storage.getByUid<DTeam>('team', label.trim())?.uid
        if (!teamUid) {
            throw new KeeperSdkError(
                `Not an email, and no team named "${label}" was found. Use a team UID that appears in your vault (sync teams).`,
                'team_not_found'
            )
        }
        if (action === 'grant') {
            throw new KeeperSdkError(
                'Granting a team to a shared folder is not supported in this JavaScript SDK yet. Use a Keeper app or a client that can encrypt the shared folder key for the team.',
                'team_grant_not_implemented'
            )
        }
    }

    const sfUids = Array.from(resolveSharedFolderUids(storage, input.sharedFolderRefs))
    const allResponses: KeeperResponse[] = []

    for (const sharedFolderUid of sfUids) {
        const sf = storage.getByUid<DSharedFolder>('shared_folder', sharedFolderUid)
        if (!sf) continue

        if (parsed.setDefaults) {
            if (typeof manageRecords !== 'boolean' && typeof manageUsers !== 'boolean') {
                throw new KeeperSdkError('When using * as a user target, set -p and/or -o to on|off.', 'default_perm_missing')
            }
            const r = await updateSharedFolderPermissions(auth, storage, sharedFolderUid, {
                manageRecords: typeof manageRecords === 'boolean' ? manageRecords : null,
                manageUsers: typeof manageUsers === 'boolean' ? manageUsers : null,
            })
            if (!r.success) {
                return {
                    success: false,
                    message: r.message,
                    sharedFolderUids: sfUids,
                    responses: allResponses,
                }
            }
        }

        const folderKey = await getSharedFolderKeyOrThrow(storage, sharedFolderUid)
        const encName = await encryptedSharedFolderNameB64(sf, folderKey)

        const emails = new Set<string>(parsed.explicitEmails)
        const teamSet = new Set<string>()
        for (const label of parsed.teamUids) {
            const tid = tryResolveTeamUid(storage, label) ?? (label.trim().length >= 16 ? label.trim() : '')
            if (tid) teamSet.add(tid)
        }
        if (parsed.expandAllExisting) {
            const cur = listUsersAndTeamsInFolder(storage, sharedFolderUid)
            cur.emails.forEach((e) => emails.add(e))
            cur.teamUids.forEach((t) => teamSet.add(t))
        }
        const teams = Array.from(teamSet)

        const mu = typeof manageUsers === 'boolean' ? manageUsers : false
        const mr = typeof manageRecords === 'boolean' ? manageRecords : false

        if (action === 'remove') {
            const addUsers: unknown[] = []
            const updateUsers: unknown[] = []
            const removeUserRows: unknown[] = Array.from(emails).map((e) => emptyUserRow(e))
            const removeTeamRows: unknown[] = teams.map((team_uid) => ({
                team_uid,
                manage_users: false,
                manage_records: false,
                shared_folder_key: '',
            }))

            if (removeUserRows.length === 0 && removeTeamRows.length === 0 && !parsed.setDefaults) {
                continue
            }
            if (removeUserRows.length > 0 || removeTeamRows.length > 0) {
                const rq: Record<string, unknown> = {
                    operation: 'delete',
                    shared_folder_uid: sharedFolderUid,
                    name: encName,
                    revision: sf.revision,
                    from_team_uid: '',
                    force_update: force,
                    add_users: addUsers,
                    add_teams: [],
                    add_records: [],
                    update_users: updateUsers,
                    update_teams: [],
                    update_records: [],
                    remove_users: removeUserRows,
                    remove_teams: removeTeamRows,
                    remove_records: [],
                }
                const resp = await sendSharedFolderUpdate(auth, rq)
                allResponses.push(resp)
                if (!isSuccessResponse(resp)) {
                    return {
                        success: false,
                        message: (resp as KeeperResponse).message,
                        sharedFolderUids: sfUids,
                        responses: allResponses,
                    }
                }
            }
            continue
        }

        const addUsers: unknown[] = []
        const updateUsers: unknown[] = []

        for (const e of emails) {
            if (isUserAlreadyInFolder(storage, sharedFolderUid, e)) {
                updateUsers.push({ ...emptyUserRow(e), manage_users: mu, manage_records: mr })
            } else {
                const enc = await encryptSharedFolderKeyForUser(auth, e, folderKey)
                addUsers.push({
                    username: e,
                    manage_users: mu,
                    manage_records: mr,
                    shared_folder_key: enc,
                })
            }
        }

        if (teams.length > 0) {
            throw new KeeperSdkError('Granting or updating a team in a shared folder is not supported in this JavaScript SDK yet.', 'team_grant_not_implemented')
        }

        const runOne = async (op: 'add' | 'update', add: unknown[], upd: unknown[]): Promise<ShareFolderUsersResult | null> => {
            if (op === 'add' && add.length === 0) return null
            if (op === 'update' && upd.length === 0) return null
            const rq: Record<string, unknown> = {
                operation: op,
                shared_folder_uid: sharedFolderUid,
                name: encName,
                revision: sf.revision,
                from_team_uid: '',
                force_update: force,
                add_users: op === 'add' ? add : [],
                add_teams: [],
                add_records: [],
                update_users: op === 'update' ? upd : [],
                update_teams: [],
                update_records: [],
                remove_users: [],
                remove_teams: [],
                remove_records: [],
            }
            const resp = await sendSharedFolderUpdate(auth, rq)
            allResponses.push(resp)
            if (!isSuccessResponse(resp)) {
                return {
                    success: false,
                    message: (resp as KeeperResponse).message,
                    sharedFolderUids: sfUids,
                    responses: allResponses,
                }
            }
            return null
        }
        if (addUsers.length > 0) {
            const e = await runOne('add', addUsers, [])
            if (e) return e
        }
        if (updateUsers.length > 0) {
            const e = await runOne('update', [], updateUsers)
            if (e) return e
        }
    }

    return { success: true, sharedFolderUids: sfUids, responses: allResponses, message: undefined }
}

export function runShareFolderUsers(
    result: ShareFolderUsersResult
): { ok: boolean; message: string } {
    if (!result.success) {
        return { ok: false, message: result.message || 'shared_folder_update failed' }
    }
    const n = result.responses.length
    return {
        ok: true,
        message: n > 0 ? `Completed shared folder user request(s) (${n}).` : 'No shared_folder_update calls were needed.',
    }
}

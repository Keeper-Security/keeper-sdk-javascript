import type { Auth, DSharedFolder, DSharedFolderTeam, DSharedFolderUser, DTeam } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { FolderKind, VaultObjectKind, sharedFolderName } from '../folders/folderHelpers'
import { updateSharedFolderPermissions } from '../folders/updateFolder'
import { updateSharedFolderMembership, type ShareFolderUserStatus } from './shareFolder'
import { buildAccountUidEmailMap, resolveUserEmail } from './downloadMembership'
import type { MembershipData, MembershipSharedFolder, MembershipTeam } from './downloadMembership'
import { addUsersToTeams, removeUsersFromTeams } from '../users/teamUser'
import { EnterpriseDataInclude, EnterpriseDataManager } from '../teams/enterpriseData'
import { resolveExistingTeams } from '../teams/teamUtils'
import { extractErrorMessage, isValidEmail, KeeperSdkError } from '../utils'

export type ApplyMembershipInput = MembershipData | MembershipSharedFolder[]

export type ApplyMembershipOptions = {
    /**
     * When `true`, also updates permission flags that differ from the JSON
     * and removes users/teams (and team members) that are not present in the
     * JSON. When `false` (default, matches Commander), only missing grants
     * are added; existing membership is left untouched even if permissions differ.
     */
    fullSync?: boolean
}

export type ApplyMembershipCounts = {
    usersAdded: number
    usersUpdated: number
    usersRemoved: number
    teamsAdded: number
    teamsUpdated: number
    teamsRemoved: number
    teamMembersAdded: number
    teamMembersRemoved: number
}

export type ApplyMembershipFolderResult = {
    sharedFolderUid?: string
    path: string
    success: boolean
    message?: string
    counts: ApplyMembershipCounts
    results: ShareFolderUserStatus[]
}

export type ApplyMembershipTeamMembershipResult = {
    teamUid?: string
    name: string
    success: boolean
    message?: string
    added: number
    removed: number
}

export type ApplyMembershipResult = {
    success: boolean
    folders: ApplyMembershipFolderResult[]
    teamMembership: ApplyMembershipTeamMembershipResult[]
    totals: ApplyMembershipCounts
}

function emptyCounts(): ApplyMembershipCounts {
    return {
        usersAdded: 0,
        usersUpdated: 0,
        usersRemoved: 0,
        teamsAdded: 0,
        teamsUpdated: 0,
        teamsRemoved: 0,
        teamMembersAdded: 0,
        teamMembersRemoved: 0,
    }
}

function addCounts(totals: ApplyMembershipCounts, counts: ApplyMembershipCounts): ApplyMembershipCounts {
    return {
        usersAdded: totals.usersAdded + counts.usersAdded,
        usersUpdated: totals.usersUpdated + counts.usersUpdated,
        usersRemoved: totals.usersRemoved + counts.usersRemoved,
        teamsAdded: totals.teamsAdded + counts.teamsAdded,
        teamsUpdated: totals.teamsUpdated + counts.teamsUpdated,
        teamsRemoved: totals.teamsRemoved + counts.teamsRemoved,
        teamMembersAdded: totals.teamMembersAdded + counts.teamMembersAdded,
        teamMembersRemoved: totals.teamMembersRemoved + counts.teamMembersRemoved,
    }
}

function normalizeMembershipData(data: ApplyMembershipInput): MembershipData {
    if (Array.isArray(data)) return { shared_folders: data }
    return { shared_folders: data.shared_folders || [], teams: data.teams }
}

function resolveSharedFolder(storage: InMemoryStorage, entry: MembershipSharedFolder): DSharedFolder | undefined {
    const uid = (entry.uid || '').trim()
    if (uid) {
        const byUid = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, uid)
        if (byUid) return byUid
    }

    const path = (entry.path || '').trim()
    if (!path) return undefined
    const lowerPath = path.toLowerCase()
    const matches = storage
        .getAll<DSharedFolder>(FolderKind.SharedFolder)
        .filter((sharedFolder) => sharedFolderName(sharedFolder).toLowerCase() === lowerPath)
    if (matches.length === 1) return matches[0]
    if (matches.length > 1) {
        throw new KeeperSdkError(
            `Shared folder name "${path}" is not unique. Use the shared folder UID instead.`,
            'shared_folder_ambiguous'
        )
    }
    return undefined
}

function getExistingUsers(
    storage: InMemoryStorage,
    sharedFolderUid: string,
    emailMap: Map<string, string>
): Map<string, DSharedFolderUser> {
    const existing = new Map<string, DSharedFolderUser>()
    for (const sharedUser of storage.getAll<DSharedFolderUser>(VaultObjectKind.SharedFolderUser)) {
        if (sharedUser.sharedFolderUid !== sharedFolderUid) continue
        const email = resolveUserEmail(sharedUser.accountUid, sharedUser.accountUsername, emailMap)
        if (!email) continue
        existing.set(email.toLowerCase(), sharedUser)
    }
    return existing
}

function getExistingTeams(storage: InMemoryStorage, sharedFolderUid: string): Map<string, DSharedFolderTeam> {
    const existing = new Map<string, DSharedFolderTeam>()
    for (const sharedTeam of storage.getAll<DSharedFolderTeam>(VaultObjectKind.SharedFolderTeam)) {
        if (sharedTeam.sharedFolderUid !== sharedFolderUid) continue
        existing.set(sharedTeam.teamUid, sharedTeam)
    }
    return existing
}

/** Resolves team names/uids to team uids, preserving a 1:1 identifier -> uid mapping. */
async function resolveTeamIdentifierMap(
    auth: Auth,
    storage: InMemoryStorage,
    identifiers: string[]
): Promise<Map<string, string>> {
    const resolved = new Map<string, string>()
    if (identifiers.length === 0) return resolved

    const vaultTeams = storage.getAll<DTeam>(VaultObjectKind.Team)
    const byUid = new Set(vaultTeams.map((team) => team.uid))
    const byLowerName = new Map<string, string[]>()
    for (const team of vaultTeams) {
        const name = (team.name || '').trim().toLowerCase()
        if (!name) continue
        const uids = byLowerName.get(name) || []
        uids.push(team.uid)
        byLowerName.set(name, uids)
    }

    const unresolved: string[] = []
    for (const rawIdentifier of identifiers) {
        const identifier = rawIdentifier.trim()
        if (byUid.has(identifier)) {
            resolved.set(rawIdentifier, identifier)
            continue
        }
        const nameMatches = byLowerName.get(identifier.toLowerCase())
        if (nameMatches && nameMatches.length === 1) {
            resolved.set(rawIdentifier, nameMatches[0])
            continue
        }
        if (nameMatches && nameMatches.length > 1) {
            throw new KeeperSdkError(
                `Team name "${rawIdentifier}" is not unique. Use the team UID instead.`,
                'multiple_team_matches'
            )
        }
        unresolved.push(rawIdentifier)
    }

    if (unresolved.length > 0) {
        const enterpriseData = new EnterpriseDataManager(auth)
        const data = await enterpriseData.getData([EnterpriseDataInclude.Teams, EnterpriseDataInclude.QueuedTeams])
        for (const rawIdentifier of unresolved) {
            try {
                const teams = resolveExistingTeams(data.teams || [], [rawIdentifier.trim()], data.queued_teams || [])
                if (teams.length > 0) resolved.set(rawIdentifier, teams[0].team_uid)
            } catch {
                // Leave unresolved; caller reports the missing target per-permission.
            }
        }
    }

    return resolved
}

function tallyCounts(
    addUsers: { email: string }[],
    updateUsers: { email: string }[],
    removeUsers: string[],
    addTeams: { teamUid: string }[],
    updateTeams: { teamUid: string }[],
    removeTeams: string[],
    results: ShareFolderUserStatus[]
): ApplyMembershipCounts {
    const addUserSet = new Set(addUsers.map((grant) => grant.email.toLowerCase()))
    const updateUserSet = new Set(updateUsers.map((grant) => grant.email.toLowerCase()))
    const removeUserSet = new Set(removeUsers.map((email) => email.toLowerCase()))
    const addTeamSet = new Set(addTeams.map((grant) => grant.teamUid))
    const updateTeamSet = new Set(updateTeams.map((grant) => grant.teamUid))
    const removeTeamSet = new Set(removeTeams)

    const counts = emptyCounts()
    for (const result of results) {
        if (!result.success) continue
        const key = (result.email || '').toLowerCase()
        if (addUserSet.has(key)) counts.usersAdded += 1
        else if (updateUserSet.has(key)) counts.usersUpdated += 1
        else if (removeUserSet.has(key)) counts.usersRemoved += 1
        else if (addTeamSet.has(result.email)) counts.teamsAdded += 1
        else if (updateTeamSet.has(result.email)) counts.teamsUpdated += 1
        else if (removeTeamSet.has(result.email)) counts.teamsRemoved += 1
    }
    return counts
}

async function applyFolderMembership(
    auth: Auth,
    storage: InMemoryStorage,
    entry: MembershipSharedFolder,
    fullSync: boolean
): Promise<ApplyMembershipFolderResult> {
    const path = entry.path || entry.uid || '(unknown)'
    const counts = emptyCounts()

    let sharedFolder: DSharedFolder | undefined
    try {
        sharedFolder = resolveSharedFolder(storage, entry)
    } catch (err) {
        return {
            path,
            success: false,
            message: extractErrorMessage(err),
            counts,
            results: [],
        }
    }
    if (!sharedFolder) {
        return {
            path,
            success: false,
            message: `Shared folder "${entry.uid || entry.path}" was not found in the vault.`,
            counts,
            results: [],
        }
    }

    const emailMap = buildAccountUidEmailMap(storage)
    const existingUsers = getExistingUsers(storage, sharedFolder.uid, emailMap)
    const existingTeams = getExistingTeams(storage, sharedFolder.uid)

    const permissions = entry.permissions || []
    const userPermissions = permissions.filter((permission) => isValidEmail(permission.name))
    const teamPermissions = permissions.filter((permission) => !isValidEmail(permission.name))

    let teamIdentifierMap: Map<string, string>
    try {
        teamIdentifierMap = await resolveTeamIdentifierMap(
            auth,
            storage,
            teamPermissions.map((permission) => permission.name)
        )
    } catch (err) {
        return {
            sharedFolderUid: sharedFolder.uid,
            path,
            success: false,
            message: extractErrorMessage(err),
            counts,
            results: [],
        }
    }

    const addUsers: {
        email: string
        manageUsers?: boolean
        manageRecords?: boolean
    }[] = []
    const updateUsers: {
        email: string
        manageUsers?: boolean
        manageRecords?: boolean
    }[] = []
    const seenEmails = new Set<string>()

    for (const permission of userPermissions) {
        const email = permission.name.trim()
        const key = email.toLowerCase()
        if (!key || seenEmails.has(key)) continue
        seenEmails.add(key)
        const wantManageUsers = permission.manage_users === true
        const wantManageRecords = permission.manage_records === true
        const existing = existingUsers.get(key)
        if (!existing) {
            addUsers.push({
                email,
                manageUsers: wantManageUsers,
                manageRecords: wantManageRecords,
            })
        } else if (
            fullSync &&
            (existing.manageUsers !== wantManageUsers || existing.manageRecords !== wantManageRecords)
        ) {
            updateUsers.push({
                email,
                manageUsers: wantManageUsers,
                manageRecords: wantManageRecords,
            })
        }
    }

    const removeUsers: string[] = []
    if (fullSync) {
        const ownerEmail = (sharedFolder.ownerUsername || '').trim().toLowerCase()
        for (const [email] of existingUsers) {
            if (seenEmails.has(email)) continue
            if (ownerEmail && ownerEmail === email) continue
            removeUsers.push(email)
        }
    }

    const addTeams: {
        teamUid: string
        manageUsers?: boolean
        manageRecords?: boolean
    }[] = []
    const updateTeams: {
        teamUid: string
        manageUsers?: boolean
        manageRecords?: boolean
    }[] = []
    const seenTeamUids = new Set<string>()
    const missingTargets: string[] = []

    for (const permission of teamPermissions) {
        const teamUid = teamIdentifierMap.get(permission.name)
        if (!teamUid) {
            missingTargets.push(permission.name)
            continue
        }
        if (seenTeamUids.has(teamUid)) continue
        seenTeamUids.add(teamUid)
        const wantManageUsers = permission.manage_users === true
        const wantManageRecords = permission.manage_records === true
        const existing = existingTeams.get(teamUid)
        if (!existing) {
            addTeams.push({
                teamUid,
                manageUsers: wantManageUsers,
                manageRecords: wantManageRecords,
            })
        } else if (
            fullSync &&
            (existing.manageUsers !== wantManageUsers || existing.manageRecords !== wantManageRecords)
        ) {
            updateTeams.push({
                teamUid,
                manageUsers: wantManageUsers,
                manageRecords: wantManageRecords,
            })
        }
    }

    const removeTeams: string[] = []
    if (fullSync) {
        for (const [teamUid] of existingTeams) {
            if (!seenTeamUids.has(teamUid)) removeTeams.push(teamUid)
        }
    }

    let membershipResult
    try {
        membershipResult = await updateSharedFolderMembership(auth, storage, {
            sharedFolderUid: sharedFolder.uid,
            addUsers,
            updateUsers,
            removeUsers,
            addTeams,
            updateTeams,
            removeTeams,
        })
    } catch (err) {
        return {
            sharedFolderUid: sharedFolder.uid,
            path,
            success: false,
            message: extractErrorMessage(err),
            counts,
            results: [],
        }
    }

    let permissionsMessage: string | undefined
    if (fullSync) {
        const wantManageUsers = entry.manage_users === true
        const wantManageRecords = entry.manage_records === true
        const wantCanEdit = entry.can_edit === true
        const wantCanShare = entry.can_share === true
        const defaultsChanged =
            sharedFolder.defaultManageUsers !== wantManageUsers ||
            sharedFolder.defaultManageRecords !== wantManageRecords ||
            sharedFolder.defaultCanEdit !== wantCanEdit ||
            sharedFolder.defaultCanShare !== wantCanShare
        if (defaultsChanged) {
            try {
                const permissionResult = await updateSharedFolderPermissions(auth, storage, sharedFolder.uid, {
                    manageUsers: wantManageUsers,
                    manageRecords: wantManageRecords,
                    canEdit: wantCanEdit,
                    canShare: wantCanShare,
                })
                if (!permissionResult.success) permissionsMessage = permissionResult.message
            } catch (err) {
                permissionsMessage = extractErrorMessage(err)
            }
        }
    }

    const missingMessage =
        missingTargets.length > 0 ? `Could not resolve team(s): ${missingTargets.join(', ')}` : undefined
    const message =
        [membershipResult.message, permissionsMessage, missingMessage]
            .filter((part): part is string => !!part)
            .join('; ') || undefined

    return {
        sharedFolderUid: sharedFolder.uid,
        path,
        success: membershipResult.success && !permissionsMessage && missingTargets.length === 0,
        message,
        counts: tallyCounts(
            addUsers,
            updateUsers,
            removeUsers,
            addTeams,
            updateTeams,
            removeTeams,
            membershipResult.results
        ),
        results: membershipResult.results,
    }
}

async function applyTeamMembership(
    auth: Auth,
    team: MembershipTeam,
    fullSync: boolean
): Promise<ApplyMembershipTeamMembershipResult> {
    const name = team.name || team.uid || '(unknown)'
    const desired = new Set((team.members || []).map((member) => member.trim().toLowerCase()).filter(Boolean))
    if (desired.size === 0 && !fullSync) {
        return { teamUid: team.uid, name, success: true, added: 0, removed: 0 }
    }

    const enterpriseData = new EnterpriseDataManager(auth)
    let data
    try {
        data = await enterpriseData.getData([
            EnterpriseDataInclude.Users,
            EnterpriseDataInclude.Teams,
            EnterpriseDataInclude.QueuedTeams,
            EnterpriseDataInclude.TeamUsers,
            EnterpriseDataInclude.QueuedTeamUsers,
        ])
    } catch (err) {
        return {
            teamUid: team.uid,
            name,
            success: false,
            message: extractErrorMessage(err),
            added: 0,
            removed: 0,
        }
    }

    const identifier = (team.uid || team.name || '').trim()
    let resolvedTeamUid = ''
    try {
        const resolved = resolveExistingTeams(data.teams || [], identifier ? [identifier] : [], data.queued_teams || [])
        resolvedTeamUid = resolved[0]?.team_uid || ''
    } catch (err) {
        return {
            teamUid: team.uid,
            name,
            success: false,
            message: extractErrorMessage(err),
            added: 0,
            removed: 0,
        }
    }
    if (!resolvedTeamUid) {
        return {
            teamUid: team.uid,
            name,
            success: false,
            message: `Team "${name}" was not found.`,
            added: 0,
            removed: 0,
        }
    }

    const usernameById = new Map<number, string>()
    for (const user of data.users || []) usernameById.set(user.enterprise_user_id, user.username)

    const currentMembers = new Set<string>()
    for (const link of [...(data.team_users || []), ...(data.queued_team_users || [])]) {
        if (link.team_uid !== resolvedTeamUid) continue
        const username = usernameById.get(link.enterprise_user_id)
        if (username) currentMembers.add(username.toLowerCase())
    }

    const toAdd = [...desired].filter((email) => !currentMembers.has(email))
    const toRemove = fullSync ? [...currentMembers].filter((email) => !desired.has(email)) : []

    let added = 0
    let removed = 0
    const messages: string[] = []

    if (toAdd.length > 0) {
        try {
            const result = await addUsersToTeams(auth, {
                users: toAdd,
                teams: [resolvedTeamUid],
            })
            added = result.succeeded
            if (result.failed > 0) messages.push(`${result.failed} member(s) failed to add`)
        } catch (err) {
            messages.push(`add failed: ${extractErrorMessage(err)}`)
        }
    }

    if (toRemove.length > 0) {
        try {
            const result = await removeUsersFromTeams(auth, {
                users: toRemove,
                teams: [resolvedTeamUid],
            })
            removed = result.succeeded
            if (result.failed > 0) messages.push(`${result.failed} member(s) failed to remove`)
        } catch (err) {
            messages.push(`remove failed: ${extractErrorMessage(err)}`)
        }
    }

    return {
        teamUid: resolvedTeamUid,
        name,
        success: messages.length === 0,
        message: messages.length > 0 ? messages.join('; ') : undefined,
        added,
        removed,
    }
}

/**
 * Applies a previously downloaded (Commander-compatible) shared folder
 * membership JSON to the vault: missing users/teams are granted access
 * (and enterprise team membership from `teams[].members` is filled in).
 *
 * With `options.fullSync`, permission flags that differ are also updated and
 * users/teams (and team members) absent from the JSON are removed. Without
 * it (the default, matching Commander), only missing grants are added.
 */
export async function applyMembership(
    auth: Auth,
    storage: InMemoryStorage,
    data: ApplyMembershipInput,
    options: ApplyMembershipOptions = {}
): Promise<ApplyMembershipResult> {
    const fullSync = options.fullSync === true
    const normalized = normalizeMembershipData(data)

    const folders: ApplyMembershipFolderResult[] = []
    for (const entry of normalized.shared_folders || []) {
        folders.push(await applyFolderMembership(auth, storage, entry, fullSync))
    }

    const teamMembership: ApplyMembershipTeamMembershipResult[] = []
    for (const team of normalized.teams || []) {
        teamMembership.push(await applyTeamMembership(auth, team, fullSync))
    }

    let totals = emptyCounts()
    for (const folder of folders) totals = addCounts(totals, folder.counts)
    for (const team of teamMembership) {
        totals.teamMembersAdded += team.added
        totals.teamMembersRemoved += team.removed
    }

    const success = folders.every((folder) => folder.success) && teamMembership.every((team) => team.success)

    return { success, folders, teamMembership, totals }
}

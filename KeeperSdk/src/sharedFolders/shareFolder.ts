import type {
    Auth,
    Authentication,
    DSharedFolder,
    DSharedFolderFolder,
    DSharedFolderTeam,
    DSharedFolderUser,
    DTeam,
    DUserFolder,
} from '@keeper-security/keeperapi'
import {
    Folder,
    getPublicKeysMessage,
    normal64Bytes,
    platform,
    sharedFolderUpdateV3Message,
    webSafe64FromBytes,
    type RestCommand,
} from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { EnterpriseDataInclude, EnterpriseDataManager } from '../teams/enterpriseData'
import { resolveExistingTeams } from '../teams/teamUtils'
import { extractErrorMessage, isBoolean, isObject, isValidEmail, KeeperSdkError } from '../utils'
import { FolderKind, FolderResultStatus, VaultObjectKind } from '../folders/folderHelpers'

export enum ShareFolderAction {
    Grant = 'grant',
    Remove = 'remove',
}

export type ShareFolderActionInput = ShareFolderAction | `${ShareFolderAction}`

export enum ShareFolderUserResultStatus {
    Success = 'success',
    Invited = 'invited',
    MissingPublicKey = 'missing_public_key',
    Unknown = 'unknown',
}

export type ShareFolderInput = {
    folder: string
    emails: string[]
    action?: ShareFolderActionInput
    manageRecords?: boolean
    manageUsers?: boolean
}

export type ShareFolderUserStatus = {
    email: string
    success: boolean
    status: string
    message?: string
}

export type ShareFolderResult = {
    success: boolean
    message?: string
    folderUid: string
    folderKind: FolderKind.SharedFolder
    sharedFolderUid: string
    results: ShareFolderUserStatus[]
}

type ResolvedFolder =
    | {
          kind: FolderKind.SharedFolder
          folderUid: string
          sharedFolderUid: string
          displayName: string
      }
    | {
          kind: FolderKind.SharedFolderFolder
          folderUid: string
          sharedFolderUid: string
          displayName: string
      }
    | { kind: FolderKind.UserFolder; folderUid: string; displayName: string }

type TeamPublicKeys = {
    rsaPublicKey: Uint8Array | null
    eccPublicKey: Uint8Array | null
    aesKey: Uint8Array | null
}

const TEAM_GET_KEYS_BATCH_SIZE = 90

type TeamGetKeysResponse = {
    keys?: Array<{
        team_uid: string
        key: string
        type: number
    }>
}

function teamGetKeysCommand(teams: string[]): RestCommand<{ teams: string[] }, TeamGetKeysResponse> {
    return {
        baseRequest: { command: 'team_get_keys' },
        request: { teams },
        authorization: {},
    }
}

function toSetBoolean(value: boolean | undefined): Folder.SetBooleanValue {
    if (value === true) return Folder.SetBooleanValue.BOOLEAN_TRUE
    if (value === false) return Folder.SetBooleanValue.BOOLEAN_FALSE
    return Folder.SetBooleanValue.BOOLEAN_NO_CHANGE
}

function dataName(data: unknown): string {
    if (isObject(data)) {
        const { title, name } = data as { title?: string; name?: string }
        return (title || name || '').trim()
    }
    return ''
}

function resolveFolder(storage: InMemoryStorage, nameOrUid: string): ResolvedFolder | undefined {
    const trimmedNameOrUid = nameOrUid.trim()
    if (!trimmedNameOrUid) return undefined

    const sharedFolder = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, trimmedNameOrUid)
    if (sharedFolder) {
        return {
            kind: FolderKind.SharedFolder,
            folderUid: sharedFolder.uid,
            sharedFolderUid: sharedFolder.uid,
            displayName: (sharedFolder.name || sharedFolder.uid).trim() || sharedFolder.uid,
        }
    }
    const sharedFolderFolder = storage.getByUid<DSharedFolderFolder>(FolderKind.SharedFolderFolder, trimmedNameOrUid)
    if (sharedFolderFolder) {
        return {
            kind: FolderKind.SharedFolderFolder,
            folderUid: sharedFolderFolder.uid,
            sharedFolderUid: sharedFolderFolder.sharedFolderUid,
            displayName: dataName(sharedFolderFolder.data) || sharedFolderFolder.uid,
        }
    }
    const userFolder = storage.getByUid<DUserFolder>(FolderKind.UserFolder, trimmedNameOrUid)
    if (userFolder) {
        return {
            kind: FolderKind.UserFolder,
            folderUid: userFolder.uid,
            displayName: dataName(userFolder.data) || userFolder.uid,
        }
    }

    const lowerNameOrUid = trimmedNameOrUid.toLowerCase()
    for (const candidateSharedFolder of storage.getAll<DSharedFolder>(FolderKind.SharedFolder)) {
        if ((candidateSharedFolder.name || '').trim().toLowerCase() === lowerNameOrUid) {
            return {
                kind: FolderKind.SharedFolder,
                folderUid: candidateSharedFolder.uid,
                sharedFolderUid: candidateSharedFolder.uid,
                displayName: candidateSharedFolder.name || candidateSharedFolder.uid,
            }
        }
    }
    for (const candidateSharedFolderFolder of storage.getAll<DSharedFolderFolder>(FolderKind.SharedFolderFolder)) {
        const candidateName = dataName(candidateSharedFolderFolder.data)
        if (candidateName && candidateName.toLowerCase() === lowerNameOrUid) {
            return {
                kind: FolderKind.SharedFolderFolder,
                folderUid: candidateSharedFolderFolder.uid,
                sharedFolderUid: candidateSharedFolderFolder.sharedFolderUid,
                displayName: candidateName,
            }
        }
    }
    for (const candidateUserFolder of storage.getAll<DUserFolder>(FolderKind.UserFolder)) {
        const candidateName = dataName(candidateUserFolder.data)
        if (candidateName && candidateName.toLowerCase() === lowerNameOrUid) {
            return {
                kind: FolderKind.UserFolder,
                folderUid: candidateUserFolder.uid,
                displayName: candidateName,
            }
        }
    }

    return undefined
}

async function fetchUserPublicKeys(auth: Auth, emails: string[]): Promise<Map<string, UserPublicKeys>> {
    const usernameToKeys = new Map<string, UserPublicKeys>()
    if (emails.length === 0) return usernameToKeys

    const keysRequest = getPublicKeysMessage({ usernames: emails })
    let response: Authentication.IGetPublicKeysResponse
    try {
        response = await auth.executeRest(keysRequest)
    } catch (err) {
        throw new KeeperSdkError(`Failed to fetch public keys: ${extractErrorMessage(err)}`)
    }
    for (const entry of response.keyResponses || []) {
        const username = (entry.username || '').toLowerCase()
        if (!username) continue
        usernameToKeys.set(username, {
            username: entry.username || '',
            rsaPublicKey: entry.publicKey && entry.publicKey.length > 0 ? (entry.publicKey as Uint8Array) : null,
            eccPublicKey:
                entry.publicEccKey && entry.publicEccKey.length > 0 ? (entry.publicEccKey as Uint8Array) : null,
            errorCode: entry.errorCode || undefined,
            message: entry.message || undefined,
        })
    }
    return usernameToKeys
}

type UserPublicKeys = {
    rsaPublicKey: Uint8Array | null
    eccPublicKey: Uint8Array | null
    errorCode?: string
    message?: string
    username: string
}

function splitShareTargets(targets: string[]): {
    userEmails: string[]
    teamIdentifiers: string[]
} {
    const userEmails: string[] = []
    const teamIdentifiers: string[] = []
    for (const target of targets) {
        if (isValidEmail(target)) userEmails.push(target)
        else teamIdentifiers.push(target)
    }
    return { userEmails, teamIdentifiers }
}

function dedupeTargets(targets: string[]): string[] {
    const seen = new Set<string>()
    const deduped: string[] = []
    for (const rawTarget of targets) {
        const normalized = (rawTarget || '').trim()
        if (!normalized) continue
        const key = isValidEmail(normalized) ? normalized.toLowerCase() : normalized
        if (seen.has(key)) continue
        seen.add(key)
        deduped.push(isValidEmail(normalized) ? key : normalized)
    }
    return deduped
}

async function resolveTeamUids(auth: Auth, storage: InMemoryStorage, identifiers: string[]): Promise<string[]> {
    if (identifiers.length === 0) return []

    const vaultTeams = storage.getAll<DTeam>(VaultObjectKind.Team)
    const byUid = new Map(vaultTeams.map((team) => [team.uid, team.uid]))
    const byLowerName = new Map<string, string>()
    for (const team of vaultTeams) {
        const name = (team.name || '').trim().toLowerCase()
        if (name && !byLowerName.has(name)) byLowerName.set(name, team.uid)
    }

    const toResolve: string[] = []
    const resolved: string[] = []
    for (const raw of identifiers) {
        const id = raw.trim()
        if (byUid.has(id)) {
            resolved.push(byUid.get(id)!)
            continue
        }
        const nameMatch = byLowerName.get(id.toLowerCase())
        if (nameMatch) {
            resolved.push(nameMatch)
            continue
        }
        toResolve.push(id)
    }

    if (toResolve.length > 0) {
        const enterpriseData = new EnterpriseDataManager(auth)
        const data = await enterpriseData.getData([EnterpriseDataInclude.Teams, EnterpriseDataInclude.QueuedTeams])
        const teams = resolveExistingTeams(data.teams || [], toResolve, data.queued_teams || [])
        resolved.push(...teams.map((team) => team.team_uid))
    }

    return [...new Set(resolved)]
}

async function loadTeamKeys(auth: Auth, teamUids: string[]): Promise<Map<string, TeamPublicKeys>> {
    const keysByTeam = new Map<string, TeamPublicKeys>()
    if (teamUids.length === 0) return keysByTeam

    const pending = [...new Set(teamUids)]
    while (pending.length > 0) {
        const batch = pending.splice(0, TEAM_GET_KEYS_BATCH_SIZE)
        let response
        try {
            response = await auth.executeRestCommand(teamGetKeysCommand(batch))
        } catch (err) {
            throw new KeeperSdkError(`Failed to fetch team keys: ${extractErrorMessage(err)}`)
        }

        for (const entry of response.keys || []) {
            const teamUid = (entry.team_uid || '').trim()
            if (!teamUid || !entry.key) continue
            try {
                const encryptedKey = normal64Bytes(entry.key)
                keysByTeam.set(teamUid, await decryptTeamKeyEntry(auth, encryptedKey, entry.type))
            } catch (err) {
                throw new KeeperSdkError(`Failed to decrypt team key for "${teamUid}": ${extractErrorMessage(err)}`)
            }
        }
    }

    return keysByTeam
}

async function decryptTeamKeyEntry(auth: Auth, encryptedKey: Uint8Array, keyType: number): Promise<TeamPublicKeys> {
    const empty: TeamPublicKeys = {
        rsaPublicKey: null,
        eccPublicKey: null,
        aesKey: null,
    }
    switch (keyType) {
        case 1:
            return {
                ...empty,
                aesKey: await platform.aesCbcDecrypt(encryptedKey, auth.dataKey, true),
            }
        case 2:
            if (!auth.privateKey) return empty
            return {
                ...empty,
                aesKey: platform.privateDecrypt(encryptedKey, auth.privateKey),
            }
        case 3:
            return {
                ...empty,
                aesKey: await platform.aesGcmDecrypt(encryptedKey, auth.dataKey),
            }
        case 4:
            if (!auth.eccPrivateKey) return empty
            return {
                ...empty,
                aesKey: await platform.privateDecryptEC(encryptedKey, auth.eccPrivateKey),
            }
        case -1:
            return { ...empty, eccPublicKey: encryptedKey }
        case -3:
            return { ...empty, rsaPublicKey: encryptedKey }
        default:
            return empty
    }
}

async function encryptSharedFolderKeyForTeam(
    sharedFolderKey: Uint8Array,
    teamKeys: TeamPublicKeys
): Promise<Folder.IEncryptedDataKey | undefined> {
    if (teamKeys.aesKey) {
        return {
            encryptedKey: await platform.aesCbcEncrypt(sharedFolderKey, teamKeys.aesKey, true),
            encryptedKeyType: Folder.EncryptedKeyType.encrypted_by_data_key,
        }
    }
    if (teamKeys.eccPublicKey) {
        return {
            encryptedKey: await platform.publicEncryptEC(sharedFolderKey, teamKeys.eccPublicKey),
            encryptedKeyType: Folder.EncryptedKeyType.encrypted_by_public_key_ecc,
        }
    }
    if (teamKeys.rsaPublicKey) {
        return {
            encryptedKey: platform.publicEncrypt(sharedFolderKey, platform.bytesToBase64(teamKeys.rsaPublicKey)),
            encryptedKeyType: Folder.EncryptedKeyType.encrypted_by_public_key,
        }
    }
    return undefined
}

function teamUidFromStatus(teamUid: Uint8Array | null | undefined): string {
    return teamUid && teamUid.length > 0 ? webSafe64FromBytes(teamUid) : ''
}

async function removeFromSharedFolder(
    auth: Auth,
    sharedFolder: DSharedFolder,
    resolved: Extract<ResolvedFolder, { kind: FolderKind.SharedFolder | FolderKind.SharedFolderFolder }>,
    userEmails: string[],
    teamUids: string[]
): Promise<ShareFolderResult> {
    const updateRequest: Folder.ISharedFolderUpdateV3Request = {
        sharedFolderUid: normal64Bytes(sharedFolder.uid),
        revision: sharedFolder.revision,
        forceUpdate: false,
    }
    if (userEmails.length > 0) updateRequest.sharedFolderRemoveUser = userEmails
    if (teamUids.length > 0) {
        updateRequest.sharedFolderRemoveTeam = teamUids.map((teamUid) => normal64Bytes(teamUid))
    }

    if (
        (updateRequest.sharedFolderRemoveUser || []).length === 0 &&
        (updateRequest.sharedFolderRemoveTeam || []).length === 0
    ) {
        throw new KeeperSdkError('Provide at least one user or team to remove.', 'no_targets')
    }

    let response: Folder.ISharedFolderUpdateV3ResponseV2
    try {
        response = await auth.executeRest(sharedFolderUpdateV3Message({ sharedFoldersUpdateV3: [updateRequest] }))
    } catch (err) {
        return {
            success: false,
            folderUid: resolved.folderUid,
            sharedFolderUid: sharedFolder.uid,
            folderKind: FolderKind.SharedFolder,
            message: `shared_folder_update_v3 (remove) failed for "${resolved.displayName}" (uid=${sharedFolder.uid}): ${extractErrorMessage(err)}`,
            results: [],
        }
    }

    const innerResponse = (response.sharedFoldersUpdateV3Response || [])[0]
    const requestOk = !innerResponse?.status || innerResponse.status === FolderResultStatus.Success

    const userResults: ShareFolderUserStatus[] = []
    for (const userStatus of innerResponse?.sharedFolderRemoveUserStatus || []) {
        const status = userStatus.status || ShareFolderUserResultStatus.Unknown
        userResults.push({
            email: userStatus.username || '',
            success: status === FolderResultStatus.Success,
            status,
        })
    }
    for (const teamStatus of innerResponse?.sharedFolderRemoveTeamStatus || []) {
        const status = teamStatus.status || ShareFolderUserResultStatus.Unknown
        userResults.push({
            email: teamUidFromStatus(teamStatus.teamUid as Uint8Array),
            success: status === FolderResultStatus.Success,
            status,
        })
    }

    const allUsersOk = userResults.length === 0 ? requestOk : userResults.every((userResult) => userResult.success)

    const failureReason = !requestOk
        ? innerResponse?.status ||
          `shared_folder_update_v3 (remove) failed for "${resolved.displayName}" (uid=${sharedFolder.uid}): server returned no status`
        : undefined

    return {
        success: requestOk && allUsersOk,
        folderUid: resolved.folderUid,
        sharedFolderUid: sharedFolder.uid,
        folderKind: FolderKind.SharedFolder,
        message: failureReason,
        results: userResults,
    }
}

async function shareWithSharedFolder(
    auth: Auth,
    storage: InMemoryStorage,
    resolved: Extract<ResolvedFolder, { kind: FolderKind.SharedFolder | FolderKind.SharedFolderFolder }>,
    input: ShareFolderInput
): Promise<ShareFolderResult> {
    const sharedFolder = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, resolved.sharedFolderUid)
    if (!sharedFolder) {
        throw new KeeperSdkError(`Shared folder "${resolved.sharedFolderUid}" not found.`, 'shared_folder_not_found')
    }
    const sharedFolderKey = await storage.getKeyBytes(sharedFolder.uid)
    if (!sharedFolderKey) {
        throw new KeeperSdkError(
            'Shared folder encryption key not available. Sync the vault and try again.',
            'shared_folder_key_missing'
        )
    }

    const targets = dedupeTargets(input.emails)
    if (targets.length === 0) {
        throw new KeeperSdkError('Provide at least one user email or team.', 'no_targets')
    }

    const { userEmails, teamIdentifiers } = splitShareTargets(targets)
    const teamUids = await resolveTeamUids(auth, storage, teamIdentifiers)

    if (input.action === ShareFolderAction.Remove) {
        return removeFromSharedFolder(auth, sharedFolder, resolved, userEmails, teamUids)
    }

    const existingMembers = new Set<string>()
    for (const sharedFolderUser of storage.getAll<DSharedFolderUser>(VaultObjectKind.SharedFolderUser)) {
        if (sharedFolderUser.sharedFolderUid === sharedFolder.uid && sharedFolderUser.accountUsername) {
            existingMembers.add(sharedFolderUser.accountUsername.toLowerCase())
        }
    }

    const existingTeams = new Set<string>()
    const existingTeamByUid = new Map<string, DSharedFolderTeam>()
    for (const sharedFolderTeam of storage.getAll<DSharedFolderTeam>(VaultObjectKind.SharedFolderTeam)) {
        if (sharedFolderTeam.sharedFolderUid === sharedFolder.uid && sharedFolderTeam.teamUid) {
            existingTeams.add(sharedFolderTeam.teamUid)
            existingTeamByUid.set(sharedFolderTeam.teamUid, sharedFolderTeam)
        }
    }

    const newEmails = userEmails.filter((email) => !existingMembers.has(email))
    const newTeamUids = teamUids.filter((teamUid) => !existingTeams.has(teamUid))
    const usernameToKeys = await fetchUserPublicKeys(auth, newEmails)
    const teamKeysByUid = await loadTeamKeys(auth, newTeamUids)

    const usersToAdd: Folder.ISharedFolderUpdateUser[] = []
    const usersToUpdate: Folder.ISharedFolderUpdateUser[] = []
    const teamsToAdd: Folder.ISharedFolderUpdateTeam[] = []
    const teamsToUpdate: Folder.ISharedFolderUpdateTeam[] = []
    const userResults: ShareFolderUserStatus[] = []

    const newUserManageRecords = isBoolean(input.manageRecords)
        ? input.manageRecords
        : sharedFolder.defaultManageRecords
    const newUserManageUsers = isBoolean(input.manageUsers) ? input.manageUsers : sharedFolder.defaultManageUsers
    const hasPermissionChange = isBoolean(input.manageRecords) || isBoolean(input.manageUsers)
    const newTeamManageRecords = isBoolean(input.manageRecords)
        ? input.manageRecords
        : sharedFolder.defaultManageRecords === true
    const newTeamManageUsers = isBoolean(input.manageUsers)
        ? input.manageUsers
        : sharedFolder.defaultManageUsers === true

    for (const email of userEmails) {
        if (existingMembers.has(email)) {
            if (hasPermissionChange) {
                usersToUpdate.push({
                    username: email,
                    manageRecords: toSetBoolean(input.manageRecords),
                    manageUsers: toSetBoolean(input.manageUsers),
                })
            } else {
                userResults.push({
                    email,
                    success: true,
                    status: FolderResultStatus.Success,
                })
            }
            continue
        }

        const publicKeys = usernameToKeys.get(email)
        if (!publicKeys) {
            userResults.push({
                email,
                success: false,
                status: ShareFolderUserResultStatus.MissingPublicKey,
                message: `No public key returned for user "${email}" (folder="${resolved.displayName}")`,
            })
            continue
        }
        if (publicKeys.errorCode) {
            userResults.push({
                email,
                success: false,
                status: publicKeys.errorCode,
                message: publicKeys.message || publicKeys.errorCode,
            })
            continue
        }

        let encryptedKey: Uint8Array
        let encryptedKeyType: Folder.EncryptedKeyType
        if (publicKeys.rsaPublicKey) {
            const rsaPublicKeyBase64 = platform.bytesToBase64(publicKeys.rsaPublicKey)
            encryptedKey = platform.publicEncrypt(sharedFolderKey, rsaPublicKeyBase64)
            encryptedKeyType = Folder.EncryptedKeyType.encrypted_by_public_key
        } else if (publicKeys.eccPublicKey) {
            encryptedKey = await platform.publicEncryptEC(sharedFolderKey, publicKeys.eccPublicKey)
            encryptedKeyType = Folder.EncryptedKeyType.encrypted_by_public_key_ecc
        } else {
            userResults.push({
                email,
                success: false,
                status: ShareFolderUserResultStatus.MissingPublicKey,
                message: `No usable public key for user "${email}" (folder="${resolved.displayName}")`,
            })
            continue
        }

        usersToAdd.push({
            username: email,
            manageRecords: toSetBoolean(newUserManageRecords),
            manageUsers: toSetBoolean(newUserManageUsers),
            typedSharedFolderKey: { encryptedKey, encryptedKeyType },
        })
    }

    for (const teamUid of teamUids) {
        if (existingTeams.has(teamUid)) {
            if (hasPermissionChange) {
                const existingTeam = existingTeamByUid.get(teamUid)
                teamsToUpdate.push({
                    teamUid: normal64Bytes(teamUid),
                    manageRecords: isBoolean(input.manageRecords)
                        ? input.manageRecords
                        : existingTeam?.manageRecords === true,
                    manageUsers: isBoolean(input.manageUsers) ? input.manageUsers : existingTeam?.manageUsers === true,
                })
            } else {
                userResults.push({
                    email: teamUid,
                    success: true,
                    status: FolderResultStatus.Success,
                })
            }
            continue
        }

        const teamKeys = teamKeysByUid.get(teamUid)
        const typedSharedFolderKey = teamKeys
            ? await encryptSharedFolderKeyForTeam(sharedFolderKey, teamKeys)
            : undefined
        if (!typedSharedFolderKey) {
            userResults.push({
                email: teamUid,
                success: false,
                status: ShareFolderUserResultStatus.MissingPublicKey,
                message: `No usable team key for "${teamUid}" (folder="${resolved.displayName}")`,
            })
            continue
        }

        teamsToAdd.push({
            teamUid: normal64Bytes(teamUid),
            manageRecords: newTeamManageRecords,
            manageUsers: newTeamManageUsers,
            typedSharedFolderKey,
        })
    }

    if (
        usersToAdd.length === 0 &&
        usersToUpdate.length === 0 &&
        teamsToAdd.length === 0 &&
        teamsToUpdate.length === 0
    ) {
        const allOk = userResults.length > 0 && userResults.every((userResult) => userResult.success)
        return {
            success: allOk,
            folderUid: resolved.folderUid,
            sharedFolderUid: sharedFolder.uid,
            folderKind: FolderKind.SharedFolder,
            message: allOk
                ? undefined
                : `No users or teams could be processed for shared folder "${resolved.displayName}" (uid=${sharedFolder.uid}).`,
            results: userResults,
        }
    }

    const updateRequest: Folder.ISharedFolderUpdateV3Request = {
        sharedFolderUid: normal64Bytes(sharedFolder.uid),
        revision: sharedFolder.revision,
        forceUpdate: false,
    }
    if (usersToAdd.length > 0) updateRequest.sharedFolderAddUser = usersToAdd
    if (usersToUpdate.length > 0) updateRequest.sharedFolderUpdateUser = usersToUpdate
    if (teamsToAdd.length > 0) updateRequest.sharedFolderAddTeam = teamsToAdd
    if (teamsToUpdate.length > 0) updateRequest.sharedFolderUpdateTeam = teamsToUpdate

    let response: Folder.ISharedFolderUpdateV3ResponseV2
    try {
        response = await auth.executeRest(sharedFolderUpdateV3Message({ sharedFoldersUpdateV3: [updateRequest] }))
    } catch (err) {
        return {
            success: false,
            folderUid: resolved.folderUid,
            sharedFolderUid: sharedFolder.uid,
            folderKind: FolderKind.SharedFolder,
            message: `shared_folder_update_v3 (grant) failed for "${resolved.displayName}" (uid=${sharedFolder.uid}): ${extractErrorMessage(err)}`,
            results: userResults,
        }
    }

    const innerResponse = (response.sharedFoldersUpdateV3Response || [])[0]
    const requestOk = !innerResponse?.status || innerResponse.status === FolderResultStatus.Success

    for (const addUserStatus of innerResponse?.sharedFolderAddUserStatus || []) {
        const status = addUserStatus.status || ShareFolderUserResultStatus.Unknown
        const success = status === FolderResultStatus.Success || status === FolderResultStatus.Invited
        userResults.push({
            email: addUserStatus.username || '',
            success,
            status,
        })
    }
    for (const updateUserStatus of innerResponse?.sharedFolderUpdateUserStatus || []) {
        const status = updateUserStatus.status || ShareFolderUserResultStatus.Unknown
        userResults.push({
            email: updateUserStatus.username || '',
            success: status === FolderResultStatus.Success,
            status,
        })
    }
    for (const addTeamStatus of innerResponse?.sharedFolderAddTeamStatus || []) {
        const status = addTeamStatus.status || ShareFolderUserResultStatus.Unknown
        userResults.push({
            email: teamUidFromStatus(addTeamStatus.teamUid as Uint8Array),
            success: status === FolderResultStatus.Success,
            status,
        })
    }
    for (const updateTeamStatus of innerResponse?.sharedFolderUpdateTeamStatus || []) {
        const status = updateTeamStatus.status || ShareFolderUserResultStatus.Unknown
        userResults.push({
            email: teamUidFromStatus(updateTeamStatus.teamUid as Uint8Array),
            success: status === FolderResultStatus.Success,
            status,
        })
    }

    if (requestOk) {
        const reported = new Set(userResults.map((userResult) => (userResult.email || '').toLowerCase()))
        for (const user of [...usersToAdd, ...usersToUpdate]) {
            const email = (user.username || '').trim()
            const key = email.toLowerCase()
            if (!key || reported.has(key)) continue
            userResults.push({
                email,
                success: true,
                status: FolderResultStatus.Success,
            })
            reported.add(key)
        }
        for (const team of [...teamsToAdd, ...teamsToUpdate]) {
            const email = teamUidFromStatus(team.teamUid as Uint8Array)
            const key = email.toLowerCase()
            if (!key || reported.has(key)) continue
            userResults.push({
                email,
                success: true,
                status: FolderResultStatus.Success,
            })
            reported.add(key)
        }
    }

    const allUsersOk = userResults.length === 0 ? requestOk : userResults.every((userResult) => userResult.success)

    const failureReason = !requestOk
        ? innerResponse?.status ||
          `shared_folder_update_v3 (grant) failed for "${resolved.displayName}" (uid=${sharedFolder.uid}): server returned no status`
        : undefined

    return {
        success: requestOk && allUsersOk,
        folderUid: resolved.folderUid,
        sharedFolderUid: sharedFolder.uid,
        folderKind: FolderKind.SharedFolder,
        message: failureReason,
        results: userResults,
    }
}

export async function shareFolder(
    auth: Auth,
    storage: InMemoryStorage,
    input: ShareFolderInput
): Promise<ShareFolderResult> {
    const resolved = resolveFolder(storage, input.folder)
    if (!resolved) {
        throw new KeeperSdkError(`Folder "${input.folder}" was not found.`, 'folder_not_found')
    }

    if (resolved.kind === FolderKind.UserFolder) {
        throw new KeeperSdkError(
            `"${resolved.displayName}" is a personal folder. Only shared folders can be shared.`,
            'not_a_shared_folder'
        )
    }

    return shareWithSharedFolder(auth, storage, resolved, input)
}

export type SharedFolderMembershipUserGrant = {
    email: string
    manageUsers?: boolean
    manageRecords?: boolean
}

export type SharedFolderMembershipTeamGrant = {
    teamUid: string
    manageUsers?: boolean
    manageRecords?: boolean
}

export type UpdateSharedFolderMembershipInput = {
    sharedFolderUid: string
    addUsers?: SharedFolderMembershipUserGrant[]
    updateUsers?: SharedFolderMembershipUserGrant[]
    removeUsers?: string[]
    addTeams?: SharedFolderMembershipTeamGrant[]
    updateTeams?: SharedFolderMembershipTeamGrant[]
    removeTeams?: string[]
}

export type SharedFolderMembershipUpdateResult = {
    success: boolean
    message?: string
    sharedFolderUid: string
    results: ShareFolderUserStatus[]
}

/**
 * Low-level shared-folder membership primitive used by both `shareFolder`
 * and `applyMembership`: a single `shared_folder_update_v3` request that can
 * add, update, and remove users/teams (each with its own permission flags)
 * in one round trip.
 */
export async function updateSharedFolderMembership(
    auth: Auth,
    storage: InMemoryStorage,
    input: UpdateSharedFolderMembershipInput
): Promise<SharedFolderMembershipUpdateResult> {
    const sharedFolder = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, input.sharedFolderUid)
    if (!sharedFolder) {
        throw new KeeperSdkError(`Shared folder "${input.sharedFolderUid}" not found.`, 'shared_folder_not_found')
    }

    const addUsers = input.addUsers || []
    const updateUsers = input.updateUsers || []
    const removeUsers = dedupeTargets(input.removeUsers || [])
    const addTeams = input.addTeams || []
    const updateTeams = input.updateTeams || []
    const removeTeams = [...new Set((input.removeTeams || []).map((uid) => uid.trim()).filter(Boolean))]

    const results: ShareFolderUserStatus[] = []

    let sharedFolderKey: Uint8Array | undefined
    if (addUsers.length > 0 || addTeams.length > 0) {
        sharedFolderKey = await storage.getKeyBytes(sharedFolder.uid)
        if (!sharedFolderKey) {
            throw new KeeperSdkError(
                'Shared folder encryption key not available. Sync the vault and try again.',
                'shared_folder_key_missing'
            )
        }
    }

    const usersToAdd: Folder.ISharedFolderUpdateUser[] = []
    const usersToUpdate: Folder.ISharedFolderUpdateUser[] = []
    const teamsToAdd: Folder.ISharedFolderUpdateTeam[] = []
    const teamsToUpdate: Folder.ISharedFolderUpdateTeam[] = []

    if (addUsers.length > 0) {
        const usernameToKeys = await fetchUserPublicKeys(
            auth,
            addUsers.map((grant) => grant.email)
        )
        for (const grant of addUsers) {
            const publicKeys = usernameToKeys.get(grant.email.toLowerCase())
            if (!publicKeys) {
                results.push({
                    email: grant.email,
                    success: false,
                    status: ShareFolderUserResultStatus.MissingPublicKey,
                    message: `No public key returned for user "${grant.email}"`,
                })
                continue
            }
            if (publicKeys.errorCode) {
                results.push({
                    email: grant.email,
                    success: false,
                    status: publicKeys.errorCode,
                    message: publicKeys.message || publicKeys.errorCode,
                })
                continue
            }

            let encryptedKey: Uint8Array
            let encryptedKeyType: Folder.EncryptedKeyType
            if (publicKeys.rsaPublicKey) {
                encryptedKey = platform.publicEncrypt(sharedFolderKey!, platform.bytesToBase64(publicKeys.rsaPublicKey))
                encryptedKeyType = Folder.EncryptedKeyType.encrypted_by_public_key
            } else if (publicKeys.eccPublicKey) {
                encryptedKey = await platform.publicEncryptEC(sharedFolderKey!, publicKeys.eccPublicKey)
                encryptedKeyType = Folder.EncryptedKeyType.encrypted_by_public_key_ecc
            } else {
                results.push({
                    email: grant.email,
                    success: false,
                    status: ShareFolderUserResultStatus.MissingPublicKey,
                    message: `No usable public key for user "${grant.email}"`,
                })
                continue
            }

            usersToAdd.push({
                username: grant.email,
                manageRecords: toSetBoolean(grant.manageRecords),
                manageUsers: toSetBoolean(grant.manageUsers),
                typedSharedFolderKey: { encryptedKey, encryptedKeyType },
            })
        }
    }

    for (const grant of updateUsers) {
        usersToUpdate.push({
            username: grant.email,
            manageRecords: toSetBoolean(grant.manageRecords),
            manageUsers: toSetBoolean(grant.manageUsers),
        })
    }

    if (addTeams.length > 0) {
        const teamKeysByUid = await loadTeamKeys(
            auth,
            addTeams.map((grant) => grant.teamUid)
        )
        for (const grant of addTeams) {
            const teamKeys = teamKeysByUid.get(grant.teamUid)
            const typedSharedFolderKey = teamKeys
                ? await encryptSharedFolderKeyForTeam(sharedFolderKey!, teamKeys)
                : undefined
            if (!typedSharedFolderKey) {
                results.push({
                    email: grant.teamUid,
                    success: false,
                    status: ShareFolderUserResultStatus.MissingPublicKey,
                    message: `No usable team key for "${grant.teamUid}"`,
                })
                continue
            }
            teamsToAdd.push({
                teamUid: normal64Bytes(grant.teamUid),
                manageRecords: grant.manageRecords === true,
                manageUsers: grant.manageUsers === true,
                typedSharedFolderKey,
            })
        }
    }

    for (const grant of updateTeams) {
        teamsToUpdate.push({
            teamUid: normal64Bytes(grant.teamUid),
            manageRecords: grant.manageRecords === true,
            manageUsers: grant.manageUsers === true,
        })
    }

    const hasServerChange =
        usersToAdd.length > 0 ||
        usersToUpdate.length > 0 ||
        removeUsers.length > 0 ||
        teamsToAdd.length > 0 ||
        teamsToUpdate.length > 0 ||
        removeTeams.length > 0

    if (!hasServerChange) {
        const allOk = results.length === 0 || results.every((result) => result.success)
        return { success: allOk, sharedFolderUid: sharedFolder.uid, results }
    }

    const updateRequest: Folder.ISharedFolderUpdateV3Request = {
        sharedFolderUid: normal64Bytes(sharedFolder.uid),
        revision: sharedFolder.revision,
        forceUpdate: false,
    }
    if (usersToAdd.length > 0) updateRequest.sharedFolderAddUser = usersToAdd
    if (usersToUpdate.length > 0) updateRequest.sharedFolderUpdateUser = usersToUpdate
    if (removeUsers.length > 0) updateRequest.sharedFolderRemoveUser = removeUsers
    if (teamsToAdd.length > 0) updateRequest.sharedFolderAddTeam = teamsToAdd
    if (teamsToUpdate.length > 0) updateRequest.sharedFolderUpdateTeam = teamsToUpdate
    if (removeTeams.length > 0) {
        updateRequest.sharedFolderRemoveTeam = removeTeams.map((teamUid) => normal64Bytes(teamUid))
    }

    let response: Folder.ISharedFolderUpdateV3ResponseV2
    try {
        response = await auth.executeRest(sharedFolderUpdateV3Message({ sharedFoldersUpdateV3: [updateRequest] }))
    } catch (err) {
        return {
            success: false,
            sharedFolderUid: sharedFolder.uid,
            message: `shared_folder_update_v3 failed for shared folder (uid=${sharedFolder.uid}): ${extractErrorMessage(err)}`,
            results,
        }
    }

    const innerResponse = (response.sharedFoldersUpdateV3Response || [])[0]
    const requestOk = !innerResponse?.status || innerResponse.status === FolderResultStatus.Success

    for (const status of innerResponse?.sharedFolderAddUserStatus || []) {
        const value = status.status || ShareFolderUserResultStatus.Unknown
        results.push({
            email: status.username || '',
            success: value === FolderResultStatus.Success || value === FolderResultStatus.Invited,
            status: value,
        })
    }
    for (const status of innerResponse?.sharedFolderUpdateUserStatus || []) {
        const value = status.status || ShareFolderUserResultStatus.Unknown
        results.push({
            email: status.username || '',
            success: value === FolderResultStatus.Success,
            status: value,
        })
    }
    for (const status of innerResponse?.sharedFolderRemoveUserStatus || []) {
        const value = status.status || ShareFolderUserResultStatus.Unknown
        results.push({
            email: status.username || '',
            success: value === FolderResultStatus.Success,
            status: value,
        })
    }
    for (const status of innerResponse?.sharedFolderAddTeamStatus || []) {
        const value = status.status || ShareFolderUserResultStatus.Unknown
        results.push({
            email: teamUidFromStatus(status.teamUid as Uint8Array),
            success: value === FolderResultStatus.Success,
            status: value,
        })
    }
    for (const status of innerResponse?.sharedFolderUpdateTeamStatus || []) {
        const value = status.status || ShareFolderUserResultStatus.Unknown
        results.push({
            email: teamUidFromStatus(status.teamUid as Uint8Array),
            success: value === FolderResultStatus.Success,
            status: value,
        })
    }
    for (const status of innerResponse?.sharedFolderRemoveTeamStatus || []) {
        const value = status.status || ShareFolderUserResultStatus.Unknown
        results.push({
            email: teamUidFromStatus(status.teamUid as Uint8Array),
            success: value === FolderResultStatus.Success,
            status: value,
        })
    }

    if (requestOk) {
        const reported = new Set(results.map((result) => (result.email || '').toLowerCase()))
        for (const user of [...usersToAdd, ...usersToUpdate]) {
            const email = (user.username || '').trim()
            const key = email.toLowerCase()
            if (!key || reported.has(key)) continue
            results.push({
                email,
                success: true,
                status: FolderResultStatus.Success,
            })
            reported.add(key)
        }
        for (const team of [...teamsToAdd, ...teamsToUpdate]) {
            const email = teamUidFromStatus(team.teamUid as Uint8Array)
            const key = email.toLowerCase()
            if (!key || reported.has(key)) continue
            results.push({
                email,
                success: true,
                status: FolderResultStatus.Success,
            })
            reported.add(key)
        }
        for (const email of removeUsers) {
            const key = email.toLowerCase()
            if (!key || reported.has(key)) continue
            results.push({
                email,
                success: true,
                status: FolderResultStatus.Success,
            })
            reported.add(key)
        }
        for (const teamUid of removeTeams) {
            const key = teamUid.toLowerCase()
            if (!key || reported.has(key)) continue
            results.push({
                email: teamUid,
                success: true,
                status: FolderResultStatus.Success,
            })
            reported.add(key)
        }
    }

    const allOk = results.length === 0 ? requestOk : results.every((result) => result.success)

    const failureReason = !requestOk
        ? innerResponse?.status ||
          `shared_folder_update_v3 failed for shared folder (uid=${sharedFolder.uid}): server returned no status`
        : undefined

    return {
        success: requestOk && allOk,
        sharedFolderUid: sharedFolder.uid,
        message: failureReason,
        results,
    }
}

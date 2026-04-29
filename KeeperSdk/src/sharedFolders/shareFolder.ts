import type {
    Auth,
    Authentication,
    DSharedFolder,
    DSharedFolderFolder,
    DSharedFolderUser,
    DUserFolder,
} from '@keeper-security/keeperapi'
import {
    Folder,
    getPublicKeysMessage,
    normal64Bytes,
    platform,
    sharedFolderUpdateV3Message,
} from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { extractErrorMessage, isBoolean, isObject, isValidEmail, KeeperSdkError } from '../utils'
import { FolderKind, FolderResultStatus } from '../folders/folderHelpers'

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

type UserPublicKeys = {
    rsaPublicKey: Uint8Array | null
    eccPublicKey: Uint8Array | null
    errorCode?: string
    message?: string
    username: string
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

function resolveFolder(storage: InMemoryStorage, ref: string): ResolvedFolder | undefined {
    const trimmed = ref.trim()
    if (!trimmed) return undefined

    const sharedFolder = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, trimmed)
    if (sharedFolder) {
        return {
            kind: FolderKind.SharedFolder,
            folderUid: sharedFolder.uid,
            sharedFolderUid: sharedFolder.uid,
            displayName: (sharedFolder.name || sharedFolder.uid).trim() || sharedFolder.uid,
        }
    }
    const sharedFolderFolder = storage.getByUid<DSharedFolderFolder>(FolderKind.SharedFolderFolder, trimmed)
    if (sharedFolderFolder) {
        return {
            kind: FolderKind.SharedFolderFolder,
            folderUid: sharedFolderFolder.uid,
            sharedFolderUid: sharedFolderFolder.sharedFolderUid,
            displayName: dataName(sharedFolderFolder.data) || sharedFolderFolder.uid,
        }
    }
    const userFolder = storage.getByUid<DUserFolder>(FolderKind.UserFolder, trimmed)
    if (userFolder) {
        return {
            kind: FolderKind.UserFolder,
            folderUid: userFolder.uid,
            displayName: dataName(userFolder.data) || userFolder.uid,
        }
    }

    const lowerNeedle = trimmed.toLowerCase()
    for (const candidate of storage.getAll<DSharedFolder>(FolderKind.SharedFolder)) {
        if ((candidate.name || '').trim().toLowerCase() === lowerNeedle) {
            return {
                kind: FolderKind.SharedFolder,
                folderUid: candidate.uid,
                sharedFolderUid: candidate.uid,
                displayName: candidate.name || candidate.uid,
            }
        }
    }
    for (const candidate of storage.getAll<DSharedFolderFolder>(FolderKind.SharedFolderFolder)) {
        const candidateName = dataName(candidate.data)
        if (candidateName && candidateName.toLowerCase() === lowerNeedle) {
            return {
                kind: FolderKind.SharedFolderFolder,
                folderUid: candidate.uid,
                sharedFolderUid: candidate.sharedFolderUid,
                displayName: candidateName,
            }
        }
    }
    for (const candidate of storage.getAll<DUserFolder>(FolderKind.UserFolder)) {
        const candidateName = dataName(candidate.data)
        if (candidateName && candidateName.toLowerCase() === lowerNeedle) {
            return {
                kind: FolderKind.UserFolder,
                folderUid: candidate.uid,
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

function dedupeEmails(emails: string[]): string[] {
    const seen = new Set<string>()
    const dedupedEmails: string[] = []
    for (const rawEmail of emails) {
        const normalized = (rawEmail || '').trim().toLowerCase()
        if (!normalized) continue
        if (seen.has(normalized)) continue
        seen.add(normalized)
        dedupedEmails.push(normalized)
    }
    return dedupedEmails
}

async function removeFromSharedFolder(
    auth: Auth,
    sharedFolder: DSharedFolder,
    resolved: Extract<ResolvedFolder, { kind: FolderKind.SharedFolder | FolderKind.SharedFolderFolder }>,
    emails: string[]
): Promise<ShareFolderResult> {
    const updateRequest: Folder.ISharedFolderUpdateV3Request = {
        sharedFolderUid: normal64Bytes(sharedFolder.uid),
        revision: sharedFolder.revision,
        forceUpdate: false,
        sharedFolderRemoveUser: emails,
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

    const allUsersOk = userResults.length > 0 && userResults.every((userResult) => userResult.success)

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

    const emails = dedupeEmails(input.emails)
    if (emails.length === 0) {
        throw new KeeperSdkError('Provide at least one user email.', 'no_emails')
    }

    const invalidEmails = emails.filter((email) => !isValidEmail(email))
    if (invalidEmails.length > 0) {
        throw new KeeperSdkError(`Invalid email(s): ${invalidEmails.join(', ')}`, 'invalid_email')
    }

    if (input.action === ShareFolderAction.Remove) {
        return removeFromSharedFolder(auth, sharedFolder, resolved, emails)
    }

    const existingMembers = new Set<string>()
    for (const sharedFolderUser of storage.getAll<DSharedFolderUser>('shared_folder_user')) {
        if (sharedFolderUser.sharedFolderUid === sharedFolder.uid && sharedFolderUser.accountUsername) {
            existingMembers.add(sharedFolderUser.accountUsername.toLowerCase())
        }
    }

    const newEmails = emails.filter((email) => !existingMembers.has(email))
    const usernameToKeys = await fetchUserPublicKeys(auth, newEmails)

    const usersToAdd: Folder.ISharedFolderUpdateUser[] = []
    const usersToUpdate: Folder.ISharedFolderUpdateUser[] = []
    const userResults: ShareFolderUserStatus[] = []

    const effectiveManageRecords = isBoolean(input.manageRecords)
        ? input.manageRecords
        : sharedFolder.defaultManageRecords
    const effectiveManageUsers = isBoolean(input.manageUsers) ? input.manageUsers : sharedFolder.defaultManageUsers

    for (const email of emails) {
        if (existingMembers.has(email)) {
            usersToUpdate.push({
                username: email,
                manageRecords: toSetBoolean(input.manageRecords),
                manageUsers: toSetBoolean(input.manageUsers),
            })
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
            manageRecords: toSetBoolean(effectiveManageRecords),
            manageUsers: toSetBoolean(effectiveManageUsers),
            typedSharedFolderKey: { encryptedKey, encryptedKeyType },
        })
    }

    if (usersToAdd.length === 0 && usersToUpdate.length === 0) {
        return {
            success: false,
            folderUid: resolved.folderUid,
            sharedFolderUid: sharedFolder.uid,
            folderKind: FolderKind.SharedFolder,
            message: `No users could be processed for shared folder "${resolved.displayName}" (uid=${sharedFolder.uid}).`,
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

    const allUsersOk = userResults.length > 0 && userResults.every((userResult) => userResult.success)

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

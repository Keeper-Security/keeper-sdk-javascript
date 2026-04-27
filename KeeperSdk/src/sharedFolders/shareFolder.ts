import type {
    Auth,
    Authentication,
    DSharedFolder,
    DSharedFolderFolder,
    DSharedFolderUser,
    DUserFolder,
    RestMessage,
} from '@keeper-security/keeperapi'
import { Folder, getPublicKeysMessage, normal64Bytes, platform } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { extractErrorMessage, KeeperSdkError } from '../utils'

export type ShareFolderAction = 'grant' | 'remove'

export type ShareFolderInput = {
    folder: string
    emails: string[]
    action?: ShareFolderAction
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
    folderKind: 'shared_folder'
    sharedFolderUid: string
    results: ShareFolderUserStatus[]
}

type ResolvedFolder =
    | {
          kind: 'shared_folder'
          folderUid: string
          sharedFolderUid: string
          displayName: string
      }
    | {
          kind: 'shared_folder_folder'
          folderUid: string
          sharedFolderUid: string
          displayName: string
      }
    | { kind: 'user_folder'; folderUid: string; displayName: string }

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

function sharedFolderUpdateV3Message(
    data: Folder.ISharedFolderUpdateV3RequestV2
): RestMessage<Folder.ISharedFolderUpdateV3RequestV2, Folder.ISharedFolderUpdateV3ResponseV2> {
    return {
        path: 'vault/shared_folder_update_v3',
        apiVersion: 1,
        toBytes(): Uint8Array {
            return Folder.SharedFolderUpdateV3RequestV2.encode(data).finish()
        },
        fromBytes(bytes: Uint8Array): Folder.ISharedFolderUpdateV3ResponseV2 {
            return Folder.SharedFolderUpdateV3ResponseV2.decode(bytes)
        },
    }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function dataName(data: unknown): string {
    if (data && typeof data === 'object' && !Array.isArray(data)) {
        const d = data as { title?: string; name?: string }
        return (d.title || d.name || '').trim()
    }
    return ''
}

function resolveFolder(storage: InMemoryStorage, ref: string): ResolvedFolder | undefined {
    const trimmed = ref.trim()
    if (!trimmed) return undefined

    const sf = storage.getByUid<DSharedFolder>('shared_folder', trimmed)
    if (sf) {
        return {
            kind: 'shared_folder',
            folderUid: sf.uid,
            sharedFolderUid: sf.uid,
            displayName: (sf.name || sf.uid).trim() || sf.uid,
        }
    }
    const sff = storage.getByUid<DSharedFolderFolder>('shared_folder_folder', trimmed)
    if (sff) {
        return {
            kind: 'shared_folder_folder',
            folderUid: sff.uid,
            sharedFolderUid: sff.sharedFolderUid,
            displayName: dataName(sff.data) || sff.uid,
        }
    }
    const uf = storage.getByUid<DUserFolder>('user_folder', trimmed)
    if (uf) {
        return {
            kind: 'user_folder',
            folderUid: uf.uid,
            displayName: dataName(uf.data) || uf.uid,
        }
    }

    const lower = trimmed.toLowerCase()
    for (const candidate of storage.getAll<DSharedFolder>('shared_folder')) {
        if ((candidate.name || '').trim().toLowerCase() === lower) {
            return {
                kind: 'shared_folder',
                folderUid: candidate.uid,
                sharedFolderUid: candidate.uid,
                displayName: candidate.name || candidate.uid,
            }
        }
    }
    for (const candidate of storage.getAll<DSharedFolderFolder>('shared_folder_folder')) {
        const n = dataName(candidate.data)
        if (n && n.toLowerCase() === lower) {
            return {
                kind: 'shared_folder_folder',
                folderUid: candidate.uid,
                sharedFolderUid: candidate.sharedFolderUid,
                displayName: n,
            }
        }
    }
    for (const candidate of storage.getAll<DUserFolder>('user_folder')) {
        const n = dataName(candidate.data)
        if (n && n.toLowerCase() === lower) {
            return {
                kind: 'user_folder',
                folderUid: candidate.uid,
                displayName: n,
            }
        }
    }

    return undefined
}

async function fetchUserPublicKeys(auth: Auth, emails: string[]): Promise<Map<string, UserPublicKeys>> {
    const out = new Map<string, UserPublicKeys>()
    if (emails.length === 0) return out

    const msg = getPublicKeysMessage({ usernames: emails })
    let resp: Authentication.IGetPublicKeysResponse
    try {
        resp = await auth.executeRest(msg)
    } catch (err) {
        throw new KeeperSdkError(`Failed to fetch public keys: ${extractErrorMessage(err)}`)
    }
    for (const entry of resp.keyResponses || []) {
        const username = (entry.username || '').toLowerCase()
        if (!username) continue
        out.set(username, {
            username: entry.username || '',
            rsaPublicKey: entry.publicKey && entry.publicKey.length > 0 ? (entry.publicKey as Uint8Array) : null,
            eccPublicKey:
                entry.publicEccKey && entry.publicEccKey.length > 0 ? (entry.publicEccKey as Uint8Array) : null,
            errorCode: entry.errorCode || undefined,
            message: entry.message || undefined,
        })
    }
    return out
}

function dedupeEmails(emails: string[]): string[] {
    const seen = new Set<string>()
    const out: string[] = []
    for (const raw of emails) {
        const e = (raw || '').trim().toLowerCase()
        if (!e) continue
        if (seen.has(e)) continue
        seen.add(e)
        out.push(e)
    }
    return out
}

async function removeFromSharedFolder(
    auth: Auth,
    sf: DSharedFolder,
    resolved: Extract<ResolvedFolder, { kind: 'shared_folder' | 'shared_folder_folder' }>,
    emails: string[]
): Promise<ShareFolderResult> {
    const innerRq: Folder.ISharedFolderUpdateV3Request = {
        sharedFolderUid: normal64Bytes(sf.uid),
        revision: sf.revision,
        forceUpdate: false,
        sharedFolderRemoveUser: emails,
    }

    let resp: Folder.ISharedFolderUpdateV3ResponseV2
    try {
        resp = await auth.executeRest(sharedFolderUpdateV3Message({ sharedFoldersUpdateV3: [innerRq] }))
    } catch (err) {
        return {
            success: false,
            folderUid: resolved.folderUid,
            sharedFolderUid: sf.uid,
            folderKind: 'shared_folder',
            message: extractErrorMessage(err),
            results: [],
        }
    }

    const innerResp = (resp.sharedFoldersUpdateV3Response || [])[0]
    const requestOk = !innerResp?.status || innerResp.status === 'success'

    const perUser: ShareFolderUserStatus[] = []
    for (const st of innerResp?.sharedFolderRemoveUserStatus || []) {
        const status = st.status || 'unknown'
        perUser.push({
            email: st.username || '',
            success: status === 'success',
            status,
        })
    }

    const allUsersOk = perUser.length > 0 && perUser.every((r) => r.success)

    return {
        success: requestOk && allUsersOk,
        folderUid: resolved.folderUid,
        sharedFolderUid: sf.uid,
        folderKind: 'shared_folder',
        message: requestOk ? undefined : innerResp?.status || 'shared_folder_update_v3 failed',
        results: perUser,
    }
}

async function shareWithSharedFolder(
    auth: Auth,
    storage: InMemoryStorage,
    resolved: Extract<ResolvedFolder, { kind: 'shared_folder' | 'shared_folder_folder' }>,
    input: ShareFolderInput
): Promise<ShareFolderResult> {
    const sf = storage.getByUid<DSharedFolder>('shared_folder', resolved.sharedFolderUid)
    if (!sf) {
        throw new KeeperSdkError(`Shared folder "${resolved.sharedFolderUid}" not found.`, 'shared_folder_not_found')
    }
    const sharedFolderKey = await storage.getKeyBytes(sf.uid)
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

    const invalidEmails = emails.filter((e) => !EMAIL_PATTERN.test(e))
    if (invalidEmails.length > 0) {
        throw new KeeperSdkError(`Invalid email(s): ${invalidEmails.join(', ')}`, 'invalid_email')
    }

    if (input.action === 'remove') {
        return removeFromSharedFolder(auth, sf, resolved, emails)
    }

    const existingMembers = new Set<string>()
    for (const u of storage.getAll<DSharedFolderUser>('shared_folder_user')) {
        if (u.sharedFolderUid === sf.uid && u.accountUsername) {
            existingMembers.add(u.accountUsername.toLowerCase())
        }
    }

    const newEmails = emails.filter((e) => !existingMembers.has(e))
    const keys = await fetchUserPublicKeys(auth, newEmails)

    const addUsers: Folder.ISharedFolderUpdateUser[] = []
    const updateUsers: Folder.ISharedFolderUpdateUser[] = []
    const perUser: ShareFolderUserStatus[] = []

    const effectiveManageRecords =
        typeof input.manageRecords === 'boolean' ? input.manageRecords : sf.defaultManageRecords
    const effectiveManageUsers = typeof input.manageUsers === 'boolean' ? input.manageUsers : sf.defaultManageUsers

    for (const email of emails) {
        if (existingMembers.has(email)) {
            updateUsers.push({
                username: email,
                manageRecords: toSetBoolean(input.manageRecords),
                manageUsers: toSetBoolean(input.manageUsers),
            })
            continue
        }

        const k = keys.get(email)
        if (!k) {
            perUser.push({
                email,
                success: false,
                status: 'missing_public_key',
                message: 'No public key returned for user',
            })
            continue
        }
        if (k.errorCode) {
            perUser.push({
                email,
                success: false,
                status: k.errorCode,
                message: k.message || k.errorCode,
            })
            continue
        }

        let encryptedKey: Uint8Array
        let encryptedKeyType: Folder.EncryptedKeyType
        if (k.rsaPublicKey) {
            const rsaB64 = platform.bytesToBase64(k.rsaPublicKey)
            encryptedKey = platform.publicEncrypt(sharedFolderKey, rsaB64)
            encryptedKeyType = Folder.EncryptedKeyType.encrypted_by_public_key
        } else if (k.eccPublicKey) {
            encryptedKey = await platform.publicEncryptEC(sharedFolderKey, k.eccPublicKey)
            encryptedKeyType = Folder.EncryptedKeyType.encrypted_by_public_key_ecc
        } else {
            perUser.push({
                email,
                success: false,
                status: 'missing_public_key',
                message: 'No usable public key for user',
            })
            continue
        }

        addUsers.push({
            username: email,
            manageRecords: toSetBoolean(effectiveManageRecords),
            manageUsers: toSetBoolean(effectiveManageUsers),
            typedSharedFolderKey: { encryptedKey, encryptedKeyType },
        })
    }

    if (addUsers.length === 0 && updateUsers.length === 0) {
        return {
            success: false,
            folderUid: resolved.folderUid,
            sharedFolderUid: sf.uid,
            folderKind: 'shared_folder',
            message: 'No users could be processed.',
            results: perUser,
        }
    }

    const innerRq: Folder.ISharedFolderUpdateV3Request = {
        sharedFolderUid: normal64Bytes(sf.uid),
        revision: sf.revision,
        forceUpdate: false,
    }
    if (addUsers.length > 0) innerRq.sharedFolderAddUser = addUsers
    if (updateUsers.length > 0) innerRq.sharedFolderUpdateUser = updateUsers

    let resp: Folder.ISharedFolderUpdateV3ResponseV2
    try {
        resp = await auth.executeRest(sharedFolderUpdateV3Message({ sharedFoldersUpdateV3: [innerRq] }))
    } catch (err) {
        return {
            success: false,
            folderUid: resolved.folderUid,
            sharedFolderUid: sf.uid,
            folderKind: 'shared_folder',
            message: extractErrorMessage(err),
            results: perUser,
        }
    }

    const innerResp = (resp.sharedFoldersUpdateV3Response || [])[0]
    const requestOk = !innerResp?.status || innerResp.status === 'success'

    for (const st of innerResp?.sharedFolderAddUserStatus || []) {
        const status = st.status || 'unknown'
        const success = status === 'success' || status === 'invited'
        perUser.push({
            email: st.username || '',
            success,
            status,
        })
    }
    for (const st of innerResp?.sharedFolderUpdateUserStatus || []) {
        const status = st.status || 'unknown'
        perUser.push({
            email: st.username || '',
            success: status === 'success',
            status,
        })
    }

    const allUsersOk = perUser.length > 0 && perUser.every((r) => r.success)

    return {
        success: requestOk && allUsersOk,
        folderUid: resolved.folderUid,
        sharedFolderUid: sf.uid,
        folderKind: 'shared_folder',
        message: requestOk ? undefined : innerResp?.status || 'shared_folder_update_v3 failed',
        results: perUser,
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

    if (resolved.kind === 'user_folder') {
        throw new KeeperSdkError(
            `"${resolved.displayName}" is a personal folder. Only shared folders can be shared.`,
            'not_a_shared_folder'
        )
    }

    return shareWithSharedFolder(auth, storage, resolved, input)
}

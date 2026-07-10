import type { Auth, Authentication } from '@keeper-security/keeperapi'
import {
    Folder,
    common,
    getPublicKeysMessage,
    normal64Bytes,
    platform,
    record,
    sendShareInviteMessage,
    webSafe64FromBytes,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError } from '../utils'

const MISSING_PUBLIC_KEY = 'missing_public_key'

export type UserShareKeys = {
    username: string
    accountUid: Uint8Array
    rsaPublicKey: Uint8Array | null
    eccPublicKey: Uint8Array | null
}

function mapUserShareKeysEntry(
    email: string,
    entry: NonNullable<Authentication.IGetPublicKeysResponse['keyResponses']>[number]
): UserShareKeys | null {
    if (!entry || entry.errorCode || !entry.accountUid?.length) return null
    return {
        username: entry.username || email,
        accountUid: entry.accountUid as Uint8Array,
        rsaPublicKey: entry.publicKey?.length ? (entry.publicKey as Uint8Array) : null,
        eccPublicKey: entry.publicEccKey?.length ? (entry.publicEccKey as Uint8Array) : null,
    }
}

function dedupeNsfShareEmails(emails: string[]): string[] {
    const seen = new Set<string>()
    const deduped: string[] = []
    for (const rawEmail of emails) {
        const normalized = rawEmail.trim().toLowerCase()
        if (!normalized || seen.has(normalized)) continue
        seen.add(normalized)
        deduped.push(normalized)
    }
    return deduped
}

async function fetchUserShareKeys(auth: Auth, email: string): Promise<UserShareKeys | null> {
    const response = await auth.executeRest(getPublicKeysMessage({ usernames: [email] }))
    const entry = response.keyResponses?.[0]
    if (!entry) return null
    return mapUserShareKeysEntry(email, entry)
}

export async function loadUserShareKeys(auth: Auth, email: string): Promise<UserShareKeys> {
    const keys = await fetchUserShareKeys(auth, email)
    if (!keys?.accountUid?.length) {
        throw new KeeperSdkError(`User ${email} not found`, MISSING_PUBLIC_KEY)
    }
    return keys
}

export async function loadUserShareKeysOrInvite(
    auth: Auth,
    email: string,
    errorCode: string = MISSING_PUBLIC_KEY
): Promise<UserShareKeys> {
    let keys = await fetchUserShareKeys(auth, email)
    if (!keys?.accountUid?.length) {
        try {
            await auth.executeRestAction(sendShareInviteMessage({ email }))
        } catch (err) {
            throw new KeeperSdkError(
                `Failed to invite ${email}: ${extractErrorMessage(err)}`,
                errorCode
            )
        }
        keys = await fetchUserShareKeys(auth, email)
    }
    if (!keys?.accountUid?.length) {
        throw new KeeperSdkError(`User ${email} not found`, errorCode)
    }
    if (!keys.rsaPublicKey?.length && !keys.eccPublicKey?.length) {
        throw new KeeperSdkError(`No usable public key available for ${email}`, errorCode)
    }
    return keys
}

export async function loadNsfUserShareKeysMap(
    auth: Auth,
    emails: string[]
): Promise<Map<string, UserShareKeys>> {
    const deduped = dedupeNsfShareEmails(emails)
    const keysByEmail = new Map<string, UserShareKeys>()
    if (deduped.length === 0) return keysByEmail

    const response = await auth.executeRest(getPublicKeysMessage({ usernames: deduped }))
    for (const entry of response.keyResponses ?? []) {
        const email = (entry.username || '').trim().toLowerCase()
        if (!email) continue
        const keys = mapUserShareKeysEntry(email, entry)
        if (keys) keysByEmail.set(email, keys)
    }
    return keysByEmail
}

export async function preloadNsfUserShareKeys(
    auth: Auth,
    emails: string[],
    inviteMissing: boolean,
    errorCode: string
): Promise<Map<string, UserShareKeys>> {
    const keysByEmail = await loadNsfUserShareKeysMap(auth, emails)
    if (!inviteMissing) return keysByEmail

    const uniqueEmails = dedupeNsfShareEmails(emails)
    for (const emailKey of uniqueEmails) {
        let userKeys = keysByEmail.get(emailKey)
        if (!userKeys || (!userKeys.rsaPublicKey?.length && !userKeys.eccPublicKey?.length)) {
            userKeys = await loadUserShareKeysOrInvite(auth, emailKey, errorCode)
            keysByEmail.set(emailKey, userKeys)
        }
    }
    return keysByEmail
}

export async function encryptKeyForRecipient(
    key: Uint8Array,
    userKeys: UserShareKeys
): Promise<{ encryptedKey: Uint8Array; useEccKey: boolean }> {
    if (userKeys.eccPublicKey?.length) {
        return {
            encryptedKey: await platform.publicEncryptEC(key, userKeys.eccPublicKey),
            useEccKey: true,
        }
    }
    if (userKeys.rsaPublicKey?.length) {
        const rsaKeyBase64 = platform.bytesToBase64(userKeys.rsaPublicKey)
        return {
            encryptedKey: platform.publicEncrypt(key, rsaKeyBase64),
            useEccKey: false,
        }
    }
    throw new KeeperSdkError(
        `No usable public key available for ${userKeys.username}`,
        MISSING_PUBLIC_KEY
    )
}

export function parseRecordSharingStatus(
    status: record.v3.sharing.IStatus | null | undefined
): { recordUid: string; success: boolean; message: string } {
    if (!status?.recordUid?.length) {
        return { recordUid: '', success: false, message: 'No status returned' }
    }
    const recordUid = webSafe64FromBytes(status.recordUid)
    const sharingStatus = status.status ?? record.v3.sharing.SharingStatus.SUCCESS
    const statusName = record.v3.sharing.SharingStatus[sharingStatus] ?? String(sharingStatus)
    const success =
        sharingStatus === record.v3.sharing.SharingStatus.SUCCESS ||
        sharingStatus === record.v3.sharing.SharingStatus.PENDING_ACCEPT
    return { recordUid, success, message: status.message || statusName }
}

export async function buildNsfSharePermissionFromKeys(
    recordUid: string,
    recordKey: Uint8Array,
    accessRoleType: Folder.AccessRoleType,
    userKeys: UserShareKeys,
    expirationTimestamp?: number
): Promise<record.v3.sharing.IPermissions> {
    const { encryptedKey, useEccKey } = await encryptKeyForRecipient(recordKey, userKeys)
    const recordUidBytes = normal64Bytes(recordUid)
    const rules: Folder.IRecordAccessData = {
        accessTypeUid: userKeys.accountUid,
        accessType: Folder.AccessType.AT_USER,
        recordUid: recordUidBytes,
        owner: false,
        accessRoleType,
    }
    if (expirationTimestamp != null) {
        rules.tlaProperties = { expiration: expirationTimestamp }
        if (expirationTimestamp > 0) {
            rules.tlaProperties.timerNotificationType = common.tla.TimerNotificationType.NOTIFY_OWNER
        }
    }
    return {
        recipientUid: userKeys.accountUid,
        recordUid: recordUidBytes,
        recordKey: encryptedKey,
        useEccKey,
        rules,
    }
}

export function buildNsfRevokePermissionFromKeys(
    recordUid: string,
    userKeys: UserShareKeys
): record.v3.sharing.IPermissions {
    const recordUidBytes = normal64Bytes(recordUid)
    return {
        recipientUid: userKeys.accountUid,
        recordUid: recordUidBytes,
        rules: {
            accessTypeUid: userKeys.accountUid,
            accessType: Folder.AccessType.AT_USER,
            recordUid: recordUidBytes,
        },
    }
}

export async function buildNsfRecordSharePermission(
    auth: Auth,
    recordUid: string,
    recordKey: Uint8Array,
    email: string,
    accessRoleType: Folder.AccessRoleType,
    expirationTimestamp?: number,
    errorCode: string = MISSING_PUBLIC_KEY
): Promise<record.v3.sharing.IPermissions> {
    const userKeys = await loadUserShareKeysOrInvite(auth, email, errorCode)
    return buildNsfSharePermissionFromKeys(
        recordUid,
        recordKey,
        accessRoleType,
        userKeys,
        expirationTimestamp
    )
}

export async function buildNsfRecordRevokePermission(
    auth: Auth,
    recordUid: string,
    email: string,
    errorCode: string = MISSING_PUBLIC_KEY
): Promise<record.v3.sharing.IPermissions> {
    const userKeys = await loadUserShareKeys(auth, email)
    if (!userKeys.accountUid?.length) {
        throw new KeeperSdkError(`User ${email} not found`, errorCode)
    }
    return buildNsfRevokePermissionFromKeys(recordUid, userKeys)
}

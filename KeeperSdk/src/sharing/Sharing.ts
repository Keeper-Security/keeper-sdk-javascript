import {
    Auth,
    Records,
    Authentication,
    platform,
    getPublicKeysMessage,
    webSafe64FromBytes,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError } from '../utils/errors'

enum ShareStatus {
    Success = 'success',
    PendingAccept = 'pending_accept',
    MissingPublicKey = 'missing_public_key',
    Error = 'error',
    Unknown = 'unknown',
}

const SHARE_UPDATE_PATH = 'vault/records_share_update'

export type ShareRecordInput = {
    recordUid: string
    email: string
    canEdit?: boolean
    canShare?: boolean
}

export type ShareRecordResult = {
    recordUid: string
    email: string
    success: boolean
    status: string
    message: string
}

export type RemoveShareInput = {
    recordUid: string
    email: string
}

export type RemoveShareResult = {
    recordUid: string
    email: string
    success: boolean
    status: string
    message: string
}

function recordsShareUpdateMessage(data: Records.IRecordShareUpdateRequest) {
    return {
        path: SHARE_UPDATE_PATH,
        toBytes(): Uint8Array {
            return Records.RecordShareUpdateRequest.encode(
                Records.RecordShareUpdateRequest.create(data)
            ).finish()
        },
        fromBytes(resp: Uint8Array): Records.IRecordShareUpdateResponse {
            return Records.RecordShareUpdateResponse.decode(resp)
        },
    }
}

type UserKeys = {
    username: string
    rsaPublicKey: Uint8Array | null
    eccPublicKey: Uint8Array | null
    errorCode: string | null
}

async function loadUserPublicKey(auth: Auth, email: string): Promise<UserKeys> {
    const msg = getPublicKeysMessage({ usernames: [email] })
    let response: Authentication.IGetPublicKeysResponse

    try {
        response = await auth.executeRest(msg)
    } catch (err) {
        throw new KeeperSdkError(`Failed to fetch public key for ${email}: ${extractErrorMessage(err)}`)
    }

    const keyResponses = response.keyResponses || []
    if (keyResponses.length === 0) {
        throw new KeeperSdkError(`No public key returned for ${email}`, 'missing_public_key')
    }

    const entry = keyResponses[0]
    if (entry.errorCode) {
        throw new KeeperSdkError(
            `Public key lookup failed for ${email}: ${entry.errorCode} - ${entry.message || ''}`,
            entry.errorCode
        )
    }

    return {
        username: entry.username || email,
        rsaPublicKey: entry.publicKey && entry.publicKey.length > 0
            ? entry.publicKey as Uint8Array
            : null,
        eccPublicKey: entry.publicEccKey && entry.publicEccKey.length > 0
            ? entry.publicEccKey as Uint8Array
            : null,
        errorCode: entry.errorCode || null,
    }
}

function uidToBytes(uid: string): Uint8Array {
    return platform.base64ToBytes(
        uid.replace(/-/g, '+').replace(/_/g, '/')
            + '=='.substring(0, (3 * uid.length) % 4)
    )
}

export async function shareRecord(
    auth: Auth,
    recordKey: Uint8Array,
    input: ShareRecordInput
): Promise<ShareRecordResult> {
    const { recordUid, email, canEdit = false, canShare = false } = input

    const userKeys = await loadUserPublicKey(auth, email)

    let encryptedRecordKey: Uint8Array
    let useEccKey = false

    if (userKeys.eccPublicKey) {
        encryptedRecordKey = await platform.publicEncryptEC(recordKey, userKeys.eccPublicKey)
        useEccKey = true
    } else if (userKeys.rsaPublicKey) {
        const rsaKeyBase64 = platform.bytesToBase64(userKeys.rsaPublicKey)
        encryptedRecordKey = platform.publicEncrypt(recordKey, rsaKeyBase64)
        useEccKey = false
    } else {
        return {
            recordUid,
            email,
            success: false,
            status: ShareStatus.MissingPublicKey,
            message: `No usable public key available for ${email}`,
        }
    }

    const sharedRecord: Records.ISharedRecord = {
        toUsername: email,
        recordUid: uidToBytes(recordUid),
        recordKey: encryptedRecordKey,
        editable: canEdit,
        shareable: canShare,
        useEccKey,
    }

    const msg = recordsShareUpdateMessage({ addSharedRecord: [sharedRecord] })

    let response: Records.IRecordShareUpdateResponse
    try {
        response = await auth.executeRest(msg)
    } catch (err) {
        return { recordUid, email, success: false, status: ShareStatus.Error, message: extractErrorMessage(err) }
    }

    const addStatuses = response.addSharedRecordStatus || []
    if (addStatuses.length > 0) {
        const st = addStatuses[0]
        const isSuccess = st.status === ShareStatus.Success || st.status === ShareStatus.PendingAccept
        return {
            recordUid,
            email: st.username || email,
            success: isSuccess,
            status: st.status || ShareStatus.Unknown,
            message: st.message || st.status || '',
        }
    }

    return { recordUid, email, success: true, status: ShareStatus.Success, message: 'Record shared successfully' }
}

export async function removeRecordShare(
    auth: Auth,
    input: RemoveShareInput
): Promise<RemoveShareResult> {
    const { recordUid, email } = input

    const msg = recordsShareUpdateMessage({
        removeSharedRecord: [{
            toUsername: email,
            recordUid: uidToBytes(recordUid),
        }],
    })

    let response: Records.IRecordShareUpdateResponse
    try {
        response = await auth.executeRest(msg)
    } catch (err) {
        return { recordUid, email, success: false, status: ShareStatus.Error, message: extractErrorMessage(err) }
    }

    const removeStatuses = response.removeSharedRecordStatus || []
    if (removeStatuses.length > 0) {
        const st = removeStatuses[0]
        return {
            recordUid,
            email: st.username || email,
            success: st.status === ShareStatus.Success,
            status: st.status || ShareStatus.Unknown,
            message: st.message || st.status || '',
        }
    }

    return { recordUid, email, success: true, status: ShareStatus.Success, message: 'Share removed successfully' }
}

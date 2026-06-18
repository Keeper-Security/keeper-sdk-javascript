import type { Auth } from '@keeper-security/keeperapi'
import { Records, normal64Bytes, platform, webSafe64FromBytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { findNestedShareFoldersForRecord } from './nsfHelpers'

const UNKNOWN_RECORD_LABEL = 'Unknown'

function decodePayload(value: string | Uint8Array | null | undefined): Uint8Array {
    if (!value) return new Uint8Array(0)
    if (value instanceof Uint8Array) return value
    return normal64Bytes(value)
}

async function decryptWithFolderKeys(
    storage: InMemoryStorage,
    recordUid: string,
    encryptedKey: Uint8Array
): Promise<Uint8Array | undefined> {
    for (const folderUid of findNestedShareFoldersForRecord(storage, recordUid)) {
        const folderKey = await storage.getKeyBytes(folderUid)
        if (!folderKey) continue
        try {
            return await platform.aesGcmDecrypt(encryptedKey, folderKey)
        } catch {
            try {
                return await platform.aesCbcDecrypt(encryptedKey, folderKey, true)
            } catch {
                continue
            }
        }
    }
    return undefined
}

export async function resolveRecordKeyBytes(
    storage: InMemoryStorage,
    auth: Auth,
    recordUid: string,
    encryptedKey?: Uint8Array | null,
    keyType?: Records.RecordKeyType | null
): Promise<Uint8Array | undefined> {
    const cached = await storage.getKeyBytes(recordUid)
    if (cached) return cached

    if (!encryptedKey?.length || !auth.dataKey) {
        return decryptWithFolderKeys(storage, recordUid, encryptedKey ?? new Uint8Array(0))
    }

    try {
        if (keyType === Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY) {
            return await platform.aesCbcDecrypt(encryptedKey, auth.dataKey, true)
        }
        return await platform.aesGcmDecrypt(encryptedKey, auth.dataKey)
    } catch {
        return decryptWithFolderKeys(storage, recordUid, encryptedKey)
    }
}

export async function decryptRecordTitleAndType(
    storage: InMemoryStorage,
    auth: Auth,
    recordUid: string,
    recordData: Records.IRecordData
): Promise<{ title: string; type: string }> {
    const uid = recordData.recordUid?.length ? webSafe64FromBytes(recordData.recordUid) : recordUid
    const recordKey = await resolveRecordKeyBytes(
        storage,
        auth,
        uid,
        recordData.recordKey,
        recordData.recordKeyType
    )
    if (!recordKey) {
        return { title: UNKNOWN_RECORD_LABEL, type: UNKNOWN_RECORD_LABEL }
    }

    const encryptedData = decodePayload(recordData.encryptedRecordData)
    if (!encryptedData.length) {
        return { title: UNKNOWN_RECORD_LABEL, type: UNKNOWN_RECORD_LABEL }
    }

    try {
        const decrypted = await platform.aesGcmDecrypt(encryptedData, recordKey)
        const parsed = JSON.parse(platform.bytesToString(decrypted).replace(/\s+$/, '')) as {
            title?: string
            type?: string
        }
        return {
            title: parsed.title?.trim() || UNKNOWN_RECORD_LABEL,
            type: parsed.type?.trim() || UNKNOWN_RECORD_LABEL,
        }
    } catch {
        return { title: UNKNOWN_RECORD_LABEL, type: UNKNOWN_RECORD_LABEL }
    }
}

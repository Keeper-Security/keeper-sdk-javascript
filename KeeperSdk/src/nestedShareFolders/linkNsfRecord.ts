import type { Auth, DRecord, DRecordMetadata } from '@keeper-security/keeperapi'
import {
    Folder,
    Records,
    folderRecordUpdateMessage,
    normal64Bytes,
    platform,
    webSafe64FromBytes,
    type EncryptionType,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { VaultObjectKind } from '../folders/folderHelpers'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import {
    ensureNestedShareFolder,
    ensureNestedShareRecord,
    resolveNsfFolderIdentifier,
    resolveNsfRecordIdentifier,
} from './nsfHelpers'

export type LinkNsfRecordResult = {
    success: boolean
    recordUid: string
    folderUid: string
    status: string
    message: string
}

async function resolveRecordKeyType(
    storage: InMemoryStorage,
    recordUid: string,
    recordVersion: number
): Promise<{ encryptionType: EncryptionType; keyType: Folder.EncryptedKeyType }> {
    const metadata = storage.getByUid<DRecordMetadata>(VaultObjectKind.Metadata, recordUid)
    if (metadata?.recordKeyType === Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY) {
        return {
            encryptionType: 'cbc',
            keyType: Folder.EncryptedKeyType.encrypted_by_data_key,
        }
    }
    if (metadata?.recordKeyType === Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY_GCM || recordVersion >= 3) {
        return {
            encryptionType: 'gcm',
            keyType: Folder.EncryptedKeyType.encrypted_by_data_key_gcm,
        }
    }
    return {
        encryptionType: 'gcm',
        keyType: Folder.EncryptedKeyType.encrypted_by_data_key_gcm,
    }
}

async function buildRecordMetadata(
    storage: InMemoryStorage,
    folderUid: string,
    recordUid: string
): Promise<Folder.IRecordMetadata> {
    const record = storage.getByUid<DRecord>(VaultObjectKind.Record, recordUid)
    const recordKey = await storage.getKeyBytes(recordUid)
    const folderKey = await storage.getKeyBytes(folderUid)
    if (!recordKey) {
        throw new KeeperSdkError(
            `Record key not found for ${recordUid}. Run sync() first.`,
            ResultCodes.NSF_MISSING_KEY
        )
    }
    if (!folderKey) {
        throw new KeeperSdkError(
            `Folder key not found for ${folderUid}. Run sync() first.`,
            ResultCodes.NSF_MISSING_KEY
        )
    }

    const { encryptionType, keyType } = await resolveRecordKeyType(storage, recordUid, record?.version ?? 3)
    const encryptedRecordKey = await platform.wrapKey(recordUid, folderUid, encryptionType, storage)
    return {
        recordUid: normal64Bytes(recordUid),
        encryptedRecordKey,
        encryptedRecordKeyType: keyType,
    }
}

function parseFolderRecordUpdateResponse(
    response: Folder.IFolderRecordUpdateResponse,
    folderUid: string,
    recordUid: string
): LinkNsfRecordResult {
    const result = response.folderRecordUpdateResult?.[0]
    if (!result) {
        return {
            success: true,
            recordUid,
            folderUid,
            status: 'SUCCESS',
            message: 'Record added to folder successfully',
        }
    }
    const statusName = Folder.FolderModifyStatus[result.status ?? Folder.FolderModifyStatus.SUCCESS] ?? 'UNKNOWN'
    const success = result.status === Folder.FolderModifyStatus.SUCCESS
    return {
        success,
        recordUid: result.recordUid?.length ? webSafe64FromBytes(result.recordUid) : recordUid,
        folderUid: response.folderUid?.length ? webSafe64FromBytes(response.folderUid) : folderUid,
        status: statusName,
        message: result.message || (success ? 'Record added to folder successfully' : 'Failed to link record'),
    }
}

export async function linkNestedShareRecord(
    storage: InMemoryStorage,
    auth: Auth,
    recordIdentifier: string,
    folderIdentifier: string
): Promise<LinkNsfRecordResult> {
    const recordUid = resolveNsfRecordIdentifier(storage, recordIdentifier)
    if (!recordUid) {
        throw new KeeperSdkError(`Record '${recordIdentifier}' not found`, ResultCodes.NSF_NOT_FOUND)
    }

    const folderUid = resolveNsfFolderIdentifier(storage, folderIdentifier)
    if (!folderUid) {
        throw new KeeperSdkError(`Folder '${folderIdentifier}' not found`, ResultCodes.NSF_NOT_FOUND)
    }

    ensureNestedShareRecord(storage, recordUid, recordIdentifier)
    ensureNestedShareFolder(storage, folderUid, folderIdentifier)

    try {
        const recordMetadata = await buildRecordMetadata(storage, folderUid, recordUid)
        const response = await auth.executeRest(
            folderRecordUpdateMessage({
                folderUid: normal64Bytes(folderUid),
                addRecords: [recordMetadata],
            })
        )
        const parsed = parseFolderRecordUpdateResponse(response, folderUid, recordUid)
        if (!parsed.success) {
            throw new KeeperSdkError(parsed.message, ResultCodes.NSF_LINK_FAILED)
        }
        return parsed
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to link record to folder: ${extractErrorMessage(err)}`,
            ResultCodes.NSF_LINK_FAILED
        )
    }
}

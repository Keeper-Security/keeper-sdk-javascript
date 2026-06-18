import type { Auth, record as RecordProto } from '@keeper-security/keeperapi'
import {
    Folder,
    Records,
    generateUid,
    keeperDriveRecordsAdd,
    normal64Bytes,
    platform,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import {
    buildNsfRecordData,
    getPaddedJsonBytes,
    type NsfRecordCustomField,
    type NsfRecordFieldMap,
} from './nsfRecordData'
import {
    ensureNestedShareFolder,
    nsfToNumber,
    resolveNsfFolderIdentifier,
} from './nsfHelpers'

const RECORD_KEY_BYTE_LENGTH = 32

export type { NsfRecordFieldMap, NsfRecordCustomField } from './nsfRecordData'

export type AddNsfRecordInput = {
    title: string
    recordType: string
    folder?: string
    notes?: string
    fields?: NsfRecordFieldMap
    custom?: NsfRecordCustomField[]
    recordData?: Record<string, unknown>
    force?: boolean
    hasFileFields?: boolean
}

export type AddNsfRecordResult = {
    recordUid: string
    success: boolean
    status: string
    message?: string
    revision?: number
}

function resolveFolderUid(storage: InMemoryStorage, folderInput?: string): string | undefined {
    const trimmed = folderInput?.trim()
    if (!trimmed) return undefined

    const folderUid = resolveNsfFolderIdentifier(storage, trimmed)
    if (!folderUid) {
        throw new KeeperSdkError(`No such folder: ${trimmed}`, ResultCodes.NSF_NOT_FOUND)
    }
    ensureNestedShareFolder(storage, folderUid, trimmed)
    return folderUid
}

async function resolveFolderKey(storage: InMemoryStorage, folderUid: string): Promise<Uint8Array> {
    const folderKey = await storage.getKeyBytes(folderUid)
    if (folderKey) return folderKey
    throw new KeeperSdkError(
        `Folder key not found for ${folderUid}. Run sync() first.`,
        ResultCodes.NSF_MISSING_KEY
    )
}

async function buildRecordAdd(
    storage: InMemoryStorage,
    auth: Auth,
    recordData: Record<string, unknown>,
    folderUid?: string
): Promise<{ recordUid: string; recordAdd: RecordProto.v3.IRecordAdd }> {
    const recordUid = generateUid()
    const recordKey = platform.getRandomBytes(RECORD_KEY_BYTE_LENGTH)
    await storage.saveKeyBytes(recordUid, recordKey)

    const recordAdd: RecordProto.v3.IRecordAdd = {
        recordUid: normal64Bytes(recordUid),
        clientModifiedTime: Date.now(),
        data: await platform.aesGcmEncrypt(getPaddedJsonBytes(recordData), recordKey),
    }

    if (folderUid) {
        const folderKey = await resolveFolderKey(storage, folderUid)
        recordAdd.folderUid = normal64Bytes(folderUid)
        recordAdd.recordKey = await platform.aesGcmEncrypt(recordKey, folderKey)
        recordAdd.recordKeyEncryptedBy = Folder.FolderKeyEncryptionType.ENCRYPTED_BY_PARENT_KEY
        recordAdd.recordKeyType = Folder.EncryptedKeyType.encrypted_by_data_key_gcm
    } else {
        if (!auth.dataKey) {
            throw new KeeperSdkError('Data key not available. Ensure you are logged in.', ResultCodes.NSF_MISSING_KEY)
        }
        recordAdd.recordKey = await platform.aesGcmEncrypt(recordKey, auth.dataKey)
        recordAdd.recordKeyType = Folder.EncryptedKeyType.encrypted_by_data_key_gcm
    }

    return { recordUid, recordAdd }
}

export async function addNestedShareRecord(
    storage: InMemoryStorage,
    auth: Auth,
    input: AddNsfRecordInput
): Promise<AddNsfRecordResult> {
    if (!input.title?.trim()) {
        throw new KeeperSdkError('Record title is required.', ResultCodes.NSF_ADD_FAILED)
    }
    if (!input.recordType?.trim() && !input.recordData) {
        throw new KeeperSdkError('Record type is required.', ResultCodes.NSF_ADD_FAILED)
    }
    if (input.hasFileFields && !input.force) {
        throw new KeeperSdkError(
            'File attachments are not supported in nested share record add.',
            ResultCodes.NSF_ADD_FAILED
        )
    }

    const recordData =
        input.recordData ??
        buildNsfRecordData({
            title: input.title,
            recordType: input.recordType,
            notes: input.notes,
            fields: input.fields,
            custom: input.custom,
        })

    const folderUid = resolveFolderUid(storage, input.folder)

    try {
        const { recordUid, recordAdd } = await buildRecordAdd(storage, auth, recordData, folderUid)
        const response = await auth.executeRest(
            keeperDriveRecordsAdd({
                records: [recordAdd],
                clientTime: Date.now(),
            })
        )

        const result = response.records?.[0]
        if (!result) {
            throw new KeeperSdkError('No results from record creation.', ResultCodes.NSF_ADD_FAILED)
        }

        const success = result.status === Records.RecordModifyResult.RS_SUCCESS || result.status == null
        const statusName =
            result.status != null ? Records.RecordModifyResult[result.status] ?? String(result.status) : 'RS_SUCCESS'

        if (!success) {
            throw new KeeperSdkError(result.message || `Record creation failed (${statusName}).`, ResultCodes.NSF_ADD_FAILED)
        }

        return {
            recordUid,
            success: true,
            status: statusName,
            message: result.message || 'Record created successfully',
            revision: nsfToNumber(response.revision),
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to add nested share record: ${extractErrorMessage(err)}`,
            ResultCodes.NSF_ADD_FAILED
        )
    }
}

import type { Auth, Records, record as RecordProto } from '@keeper-security/keeperapi'
import {
    Folder,
    generateEncryptionKey,
    generateUid,
    keeperDriveRecordsAdd,
    normal64Bytes,
    platform,
    webSafe64FromBytes,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import { NSF_MAX_RECORD_BATCH } from './nsfConstants'
import { buildNsfRecordData, getPaddedJsonBytes } from './nsfRecordData'
import {
    ensureNestedShareFolder,
    nsfToNumber,
    parseRecordModifyStatus,
    requireAuthDataKey,
    resolveNsfFolderIdentifier,
} from './nsfHelpers'
import { validateNsfRecordType } from './nsfRecordTypes'
import type {
    AddNsfRecordInput,
    AddNsfRecordResult,
    AddNsfRecordsInput,
    AddNsfRecordsResult,
    RecordAddPayload,
} from './nsfTypes'

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

async function requireFolderKey(storage: InMemoryStorage, folderUid: string): Promise<Uint8Array> {
    const folderKey = await storage.getKeyBytes(folderUid)
    if (folderKey) return folderKey
    throw new KeeperSdkError(`Folder key not found for ${folderUid}. Run sync() first.`, ResultCodes.NSF_MISSING_KEY)
}

async function buildRecordAddPayload(
    storage: InMemoryStorage,
    auth: Auth,
    recordData: Record<string, unknown>,
    folderUid?: string
): Promise<RecordAddPayload> {
    const recordUid = generateUid()
    const recordKey = generateEncryptionKey()
    await storage.saveKeyBytes(recordUid, recordKey)

    const recordAdd: RecordProto.v3.IRecordAdd = {
        recordUid: normal64Bytes(recordUid),
        clientModifiedTime: Date.now(),
        data: await platform.aesGcmEncrypt(getPaddedJsonBytes(recordData), recordKey),
    }

    if (folderUid) {
        const folderKey = await requireFolderKey(storage, folderUid)
        recordAdd.folderUid = normal64Bytes(folderUid)
        recordAdd.recordKey = await platform.aesGcmEncrypt(recordKey, folderKey)
        recordAdd.recordKeyEncryptedBy = Folder.FolderKeyEncryptionType.ENCRYPTED_BY_PARENT_KEY
        recordAdd.recordKeyType = Folder.EncryptedKeyType.encrypted_by_data_key_gcm
    } else {
        recordAdd.recordKey = await platform.aesGcmEncrypt(recordKey, requireAuthDataKey(auth))
        recordAdd.recordKeyType = Folder.EncryptedKeyType.encrypted_by_data_key_gcm
    }

    return { recordUid, recordAdd }
}

function validateAddNsfRecordInput(input: AddNsfRecordInput): void {
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
}

function buildRecordDataFromInput(input: AddNsfRecordInput): Record<string, unknown> {
    return (
        input.recordData ??
        buildNsfRecordData({
            title: input.title,
            recordType: input.recordType,
            notes: input.notes,
            fieldEntries: input.fieldEntries,
            customEntries: input.customEntries,
        })
    )
}

export async function addNestedShareRecords(
    storage: InMemoryStorage,
    auth: Auth,
    input: AddNsfRecordsInput
): Promise<AddNsfRecordsResult> {
    const recordInputs = input.records ?? []
    if (recordInputs.length === 0) {
        throw new KeeperSdkError('At least one record is required.', ResultCodes.NSF_ADD_FAILED)
    }
    if (recordInputs.length > NSF_MAX_RECORD_BATCH) {
        throw new KeeperSdkError(
            `Maximum ${NSF_MAX_RECORD_BATCH} records per request.`,
            ResultCodes.NSF_TOO_MANY_RECORDS
        )
    }

    const recordTypes = new Set<string>()
    for (const recordInput of recordInputs) {
        validateAddNsfRecordInput(recordInput)
        if (!recordInput.recordData && recordInput.recordType?.trim()) {
            recordTypes.add(recordInput.recordType.trim())
        }
    }
    for (const recordType of recordTypes) {
        await validateNsfRecordType(auth, recordType, ResultCodes.NSF_ADD_FAILED)
    }

    try {
        const payloads = await Promise.all(
            recordInputs.map(async (recordInput) =>
                buildRecordAddPayload(
                    storage,
                    auth,
                    buildRecordDataFromInput(recordInput),
                    resolveFolderUid(storage, recordInput.folder)
                )
            )
        )

        const response = await auth.executeRest(
            keeperDriveRecordsAdd({
                records: payloads.map((entry) => entry.recordAdd),
                clientTime: Date.now(),
            })
        )
        const revision = nsfToNumber(response.revision)
        const statusByRecordUid = new Map<string, Records.IRecordModifyStatus>()
        for (const status of response.records ?? []) {
            if (!status.recordUid?.length) continue
            statusByRecordUid.set(webSafe64FromBytes(status.recordUid), status)
        }

        const added = payloads.map((payload) => {
            const { statusName, message } = parseRecordModifyStatus(
                statusByRecordUid.get(payload.recordUid),
                ResultCodes.NSF_ADD_FAILED
            )
            return {
                recordUid: payload.recordUid,
                success: true,
                status: statusName,
                message,
                revision,
            }
        })

        return { added, revision }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to add nested share record(s): ${extractErrorMessage(err)}`,
            ResultCodes.NSF_ADD_FAILED
        )
    }
}

export async function addNestedShareRecord(
    storage: InMemoryStorage,
    auth: Auth,
    input: AddNsfRecordInput
): Promise<AddNsfRecordResult> {
    const { added } = await addNestedShareRecords(storage, auth, {
        records: [input],
    })
    if (!added[0]) {
        throw new KeeperSdkError('Failed to add nested share record.', ResultCodes.NSF_ADD_FAILED)
    }
    return added[0]
}

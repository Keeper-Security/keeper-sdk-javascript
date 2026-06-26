import type { Auth, DRecord } from '@keeper-security/keeperapi'
import { keeperDriveRecordsUpdate, normal64Bytes, platform } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { VaultObjectKind } from '../folders/folderHelpers'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import { resolveRecordKeyBytes } from './nsfRecordCrypto'
import { getPaddedJsonBytes, mergeNsfRecordData, type RecordFieldEntry } from './nsfRecordData'
import {
    checkRecordEditPermission,
    ensureNestedShareRecord,
    nsfToNumber,
    parseRecordModifyStatus,
    requireAuthAccountUid,
    resolveNsfRecordIdentifier,
} from './nsfHelpers'

export type { RecordFieldEntry as UpdateNsfRecordFieldEntry } from './nsfRecordData'

export type UpdateNsfRecordInput = {
    records: string[]
    title?: string
    recordType?: string
    notes?: string
    fieldEntries?: RecordFieldEntry[]
    customEntries?: RecordFieldEntry[]
}

export type UpdateNsfRecordResultItem = {
    recordUid: string
    success: boolean
    status: string
    message?: string
    revision?: number
}

export type UpdateNsfRecordResult = {
    updated: UpdateNsfRecordResultItem[]
}

function loadExistingRecordData(storage: InMemoryStorage, recordUid: string): Record<string, unknown> {
    const record = storage.getByUid<DRecord>(VaultObjectKind.Record, recordUid)
    if (record?.data && typeof record.data === 'object') {
        return structuredClone(record.data) as Record<string, unknown>
    }
    return { fields: [] }
}

async function updateSingleRecord(
    storage: InMemoryStorage,
    auth: Auth,
    recordUid: string,
    input: UpdateNsfRecordInput
): Promise<UpdateNsfRecordResultItem> {
    const record = storage.getByUid<DRecord>(VaultObjectKind.Record, recordUid)
    const recordKey = await resolveRecordKeyBytes(storage, auth, recordUid)
    if (!recordKey) {
        throw new KeeperSdkError(
            `Record key not available for ${recordUid}. Run sync() first.`,
            ResultCodes.NSF_MISSING_KEY
        )
    }

    const merged = mergeNsfRecordData(loadExistingRecordData(storage, recordUid), input)
    const response = await auth.executeRest(
        keeperDriveRecordsUpdate({
            records: [
                {
                    recordUid: normal64Bytes(recordUid),
                    clientModifiedTime: Date.now(),
                    revision: record?.revision ?? 0,
                    data: await platform.aesGcmEncrypt(getPaddedJsonBytes(merged), recordKey),
                },
            ],
            clientTime: Date.now(),
        })
    )

    const { statusName, message } = parseRecordModifyStatus(
        response.records?.[0],
        ResultCodes.NSF_UPDATE_FAILED
    )
    const revision = nsfToNumber(response.revision) ?? record?.revision

    if (record) {
        await storage.put({
            ...record,
            data: merged,
            revision: revision ?? record.revision,
            clientModifiedTime: Date.now(),
        })
    }

    return {
        recordUid,
        success: true,
        status: statusName,
        message,
        revision,
    }
}

export async function updateNestedShareRecords(
    storage: InMemoryStorage,
    auth: Auth,
    input: UpdateNsfRecordInput
): Promise<UpdateNsfRecordResult> {
    if (!input.records?.length) {
        throw new KeeperSdkError('Record UID is required.', ResultCodes.NSF_UPDATE_FAILED)
    }

    const accountUid = requireAuthAccountUid(auth)
    const updated: UpdateNsfRecordResultItem[] = []

    try {
        for (const identifier of input.records) {
            const recordUid = resolveNsfRecordIdentifier(storage, identifier)
            if (!recordUid) {
                throw new KeeperSdkError(`Record '${identifier}' not found`, ResultCodes.NSF_NOT_FOUND)
            }
            ensureNestedShareRecord(storage, recordUid, identifier)
            checkRecordEditPermission(storage, recordUid, auth.username, accountUid)
            updated.push(await updateSingleRecord(storage, auth, recordUid, input))
        }
        return { updated }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to update nested share record(s): ${extractErrorMessage(err)}`,
            ResultCodes.NSF_UPDATE_FAILED
        )
    }
}

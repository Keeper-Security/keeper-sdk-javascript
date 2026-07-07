import type { Auth, DRecord, Records } from '@keeper-security/keeperapi'
import { keeperDriveRecordsUpdate, normal64Bytes, platform } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { VaultObjectKind } from '../folders/folderHelpers'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import { NSF_MAX_REMOVALS } from './nsfConstants'
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
import { validateNsfRecordType } from './nsfRecordTypes'

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

type PreparedRecordUpdate = {
    recordUid: string
    record: DRecord | undefined
    merged: Record<string, unknown>
    recordUpdate: Records.IRecordUpdate
}

function loadExistingRecordData(storage: InMemoryStorage, recordUid: string): Record<string, unknown> {
    const record = storage.getByUid<DRecord>(VaultObjectKind.Record, recordUid)
    if (record?.data && typeof record.data === 'object') {
        return structuredClone(record.data) as Record<string, unknown>
    }
    return { fields: [] }
}

async function prepareRecordUpdate(
    storage: InMemoryStorage,
    auth: Auth,
    recordUid: string,
    input: UpdateNsfRecordInput
): Promise<PreparedRecordUpdate> {
    const record = storage.getByUid<DRecord>(VaultObjectKind.Record, recordUid)
    const recordKey = await resolveRecordKeyBytes(storage, auth, recordUid)
    if (!recordKey) {
        throw new KeeperSdkError(
            `Record key not available for ${recordUid}. Run sync() first.`,
            ResultCodes.NSF_MISSING_KEY
        )
    }

    const merged = mergeNsfRecordData(loadExistingRecordData(storage, recordUid), input)
    return {
        recordUid,
        record,
        merged,
        recordUpdate: {
            recordUid: normal64Bytes(recordUid),
            clientModifiedTime: Date.now(),
            revision: record?.revision ?? 0,
            data: await platform.aesGcmEncrypt(getPaddedJsonBytes(merged), recordKey),
        },
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
    if (input.records.length > NSF_MAX_REMOVALS) {
        throw new KeeperSdkError(
            `Maximum ${NSF_MAX_REMOVALS} records per request.`,
            ResultCodes.NSF_TOO_MANY_RECORDS
        )
    }

    if (input.recordType?.trim()) {
        await validateNsfRecordType(auth, input.recordType, ResultCodes.NSF_UPDATE_FAILED)
    }

    const accountUid = requireAuthAccountUid(auth)

    try {
        const prepared: PreparedRecordUpdate[] = []
        for (const identifier of input.records) {
            const recordUid = resolveNsfRecordIdentifier(storage, identifier)
            if (!recordUid) {
                throw new KeeperSdkError(`Record '${identifier}' not found`, ResultCodes.NSF_NOT_FOUND)
            }
            ensureNestedShareRecord(storage, recordUid, identifier)
            checkRecordEditPermission(storage, recordUid, auth.username, accountUid)
            prepared.push(await prepareRecordUpdate(storage, auth, recordUid, input))
        }

        const response = await auth.executeRest(
            keeperDriveRecordsUpdate({
                records: prepared.map((entry) => entry.recordUpdate),
                clientTime: Date.now(),
            })
        )
        const revision = nsfToNumber(response.revision)

        const updated: UpdateNsfRecordResultItem[] = []
        for (let index = 0; index < prepared.length; index++) {
            const entry = prepared[index]
            const { statusName, message } = parseRecordModifyStatus(
                response.records?.[index],
                ResultCodes.NSF_UPDATE_FAILED
            )
            const itemRevision = revision ?? entry.record?.revision

            if (entry.record) {
                await storage.put({
                    ...entry.record,
                    data: entry.merged,
                    revision: itemRevision ?? entry.record.revision,
                    clientModifiedTime: Date.now(),
                })
            }

            updated.push({
                recordUid: entry.recordUid,
                success: true,
                status: statusName,
                message,
                revision: itemRevision,
            })
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

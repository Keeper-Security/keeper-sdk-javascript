import type { Auth, DRecord } from '@keeper-security/keeperapi'
import {
    Records,
    keeperDriveRecordsUpdate,
    normal64Bytes,
    platform,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { VaultObjectKind } from '../folders/folderHelpers'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import {
    checkRecordEditPermission,
    ensureNestedShareRecord,
    resolveNsfRecordIdentifier,
} from './nsfHelpers'
import { resolveRecordKeyBytes } from './nsfRecordCrypto'

export type UpdateNsfRecordFieldMap = Record<string, string | string[]>

export type UpdateNsfRecordInput = {
    records: string[]
    title?: string
    recordType?: string
    notes?: string
    fields?: UpdateNsfRecordFieldMap
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

const MIN_RECORD_PAD_BYTES = 384
const PAD_BLOCK_SIZE = 16

function longToNumber(value: number | { toNumber: () => number } | null | undefined): number | undefined {
    if (value == null) return undefined
    return typeof value === 'number' ? value : value.toNumber()
}

function getPaddedJsonBytes(data: Record<string, unknown>): Uint8Array {
    const json = JSON.stringify(data)
    const paddedLength = Math.ceil(Math.max(MIN_RECORD_PAD_BYTES, json.length) / PAD_BLOCK_SIZE) * PAD_BLOCK_SIZE
    const padded = json.padEnd(paddedLength, ' ')
    return platform.stringToBytes(padded)
}

function normalizeFieldValue(value: string | string[]): string[] {
    return Array.isArray(value) ? value : [value]
}

function mergeRecordData(
    existing: Record<string, unknown>,
    input: Pick<UpdateNsfRecordInput, 'title' | 'recordType' | 'notes' | 'fields'>
): Record<string, unknown> {
    const data: Record<string, unknown> = {
        ...existing,
        fields: Array.isArray(existing.fields) ? [...(existing.fields as Record<string, unknown>[])] : [],
    }

    if (input.title !== undefined) data.title = input.title
    if (input.recordType !== undefined) data.type = input.recordType
    if (input.notes !== undefined) data.notes = input.notes

    if (input.fields) {
        const fields = data.fields as { type?: string; value?: string[] }[]
        const byType = new Map<string, { type?: string; value?: string[] }[]>()
        for (const field of fields) {
            const fieldType = field?.type
            if (!fieldType) continue
            if (!byType.has(fieldType)) byType.set(fieldType, [])
            byType.get(fieldType)!.push(field)
        }

        for (const [fieldType, value] of Object.entries(input.fields)) {
            const normalized = normalizeFieldValue(value)
            const matches = byType.get(fieldType)
            if (matches?.length) {
                matches[0].value = normalized
            } else {
                fields.push({ type: fieldType, value: normalized })
            }
        }
        data.fields = fields
    }

    return data
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

    const merged = mergeRecordData(loadExistingRecordData(storage, recordUid), input)
    const encryptedData = await platform.aesGcmEncrypt(getPaddedJsonBytes(merged), recordKey)

    const response = await auth.executeRest(
        keeperDriveRecordsUpdate({
            records: [
                {
                    recordUid: normal64Bytes(recordUid),
                    clientModifiedTime: Date.now(),
                    revision: record?.revision ?? 0,
                    data: encryptedData,
                },
            ],
            clientTime: Date.now(),
        })
    )

    const result = response.records?.[0]
    const success = result?.status === Records.RecordModifyResult.RS_SUCCESS || result?.status == null
    const statusName =
        result?.status != null ? Records.RecordModifyResult[result.status] ?? String(result.status) : 'RS_SUCCESS'

    if (!success) {
        throw new KeeperSdkError(result?.message || `Record update failed (${statusName}).`, ResultCodes.NSF_UPDATE_FAILED)
    }

    if (record) {
        await storage.put({
            ...record,
            data: merged,
            revision: longToNumber(response.revision) ?? record.revision,
            clientModifiedTime: Date.now(),
        })
    }

    return {
        recordUid,
        success: true,
        status: statusName,
        message: result?.message || 'Record updated successfully',
        revision: longToNumber(response.revision ?? record?.revision),
    }
}

export async function updateNestedShareRecords(
    storage: InMemoryStorage,
    auth: Auth,
    input: UpdateNsfRecordInput
): Promise<UpdateNsfRecordResult> {
    const identifiers = input.records ?? []
    if (identifiers.length === 0) {
        throw new KeeperSdkError('Record UID is required.', ResultCodes.NSF_UPDATE_FAILED)
    }

    const updated: UpdateNsfRecordResultItem[] = []
    try {
        for (const identifier of identifiers) {
            const recordUid = resolveNsfRecordIdentifier(storage, identifier)
            if (!recordUid) {
                throw new KeeperSdkError(`Record '${identifier}' not found`, ResultCodes.NSF_NOT_FOUND)
            }
            ensureNestedShareRecord(storage, recordUid, identifier)
            checkRecordEditPermission(storage, recordUid, auth.username, auth.accountUid)
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

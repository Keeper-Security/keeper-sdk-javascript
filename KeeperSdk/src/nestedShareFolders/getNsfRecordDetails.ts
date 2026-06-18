import type { Auth } from '@keeper-security/keeperapi'
import { normal64Bytes, recordDetailsDataMessage, webSafe64FromBytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import { decryptRecordTitleAndType } from './nsfRecordCrypto'
import { ensureNestedShareRecord, nsfToNumber, resolveNsfRecordIdentifier } from './nsfHelpers'

export enum GetNsfRecordDetailsFormat {
    Table = 'table',
    JSON = 'json',
}

export type GetNsfRecordDetailsFormatInput = GetNsfRecordDetailsFormat | `${GetNsfRecordDetailsFormat}`

export type NsfRecordDetailsItem = {
    recordUid: string
    title: string
    type: string
    revision: number
    version: number
}

export type GetNsfRecordDetailsResult = {
    data: NsfRecordDetailsItem[]
    forbiddenRecords: string[]
}

export type GetNsfRecordDetailsInput = {
    records: string[]
    format?: GetNsfRecordDetailsFormatInput
}

function resolveRecordUids(storage: InMemoryStorage, identifiers: string[]): string[] {
    if (identifiers.length === 0) {
        throw new KeeperSdkError('At least one record UID or title is required.', ResultCodes.NSF_DETAILS_FAILED)
    }

    const recordUids: string[] = []
    for (const identifier of identifiers) {
        const recordUid = resolveNsfRecordIdentifier(storage, identifier)
        if (!recordUid) {
            throw new KeeperSdkError(`Record '${identifier}' not found`, ResultCodes.NSF_NOT_FOUND)
        }
        ensureNestedShareRecord(storage, recordUid, identifier)
        recordUids.push(recordUid)
    }
    return recordUids
}

export function formatNsfRecordDetailsTable(result: GetNsfRecordDetailsResult): string {
    const lines: string[] = []
    for (const record of result.data) {
        lines.push(`Record UID: ${record.recordUid}`)
        lines.push(`  Title: ${record.title}`)
        lines.push(`  Type: ${record.type}`)
        lines.push(`  Version: ${record.version}`)
        lines.push(`  Revision: ${record.revision}`)
        lines.push('')
    }
    if (result.forbiddenRecords.length > 0) {
        lines.push(`Forbidden records: ${result.forbiddenRecords.length}`)
        for (const uid of result.forbiddenRecords) {
            lines.push(`  ${uid}`)
        }
        lines.push('')
    }
    lines.push(`Total records retrieved: ${result.data.length}`)
    return lines.join('\n').trimEnd()
}

export function formatNsfRecordDetailsOutput(
    result: GetNsfRecordDetailsResult,
    format: GetNsfRecordDetailsFormatInput = GetNsfRecordDetailsFormat.Table
): string {
    if (String(format).toLowerCase() === GetNsfRecordDetailsFormat.JSON) {
        return JSON.stringify(result, null, 2)
    }
    return formatNsfRecordDetailsTable(result)
}

export async function getNestedShareRecordDetails(
    storage: InMemoryStorage,
    auth: Auth,
    input: GetNsfRecordDetailsInput
): Promise<GetNsfRecordDetailsResult> {
    const recordUids = resolveRecordUids(storage, input.records)

    try {
        const response = await auth.executeRest(
            recordDetailsDataMessage({
                recordUids: recordUids.map((uid) => normal64Bytes(uid)),
                clientTime: Date.now(),
            })
        )

        const data: NsfRecordDetailsItem[] = []
        for (const item of response.data ?? []) {
            const recordUid = item.recordUid?.length ? webSafe64FromBytes(item.recordUid) : ''
            if (!recordUid) continue
            const { title, type } = await decryptRecordTitleAndType(storage, auth, recordUid, item)
            data.push({
                recordUid,
                title,
                type,
                revision: nsfToNumber(item.revision, 0) ?? 0,
                version: item.version ?? 0,
            })
        }

        return {
            data,
            forbiddenRecords: (response.forbiddenRecords ?? []).map((uid) => webSafe64FromBytes(uid)),
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to get nested share record details: ${extractErrorMessage(err)}`,
            ResultCodes.NSF_DETAILS_FAILED
        )
    }
}

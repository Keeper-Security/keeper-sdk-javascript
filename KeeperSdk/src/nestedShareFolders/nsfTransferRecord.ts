import type { Auth } from '@keeper-security/keeperapi'
import { Records, normal64Bytes, recordsTransferV3Message } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { encryptKeyForRecipient, loadUserShareKeysOrInvite } from '../sharing/Sharing'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import { ensureNestedShareRecord, resolveNsfRecordIdentifier } from './nsfHelpers'
import { resolveRecordKeyBytes } from './nsfRecordCrypto'

const TRANSFER_ERROR = ResultCodes.NSF_TRANSFER_FAILED

export type TransferNestedShareRecordInput = {
    records: string[]
    newOwnerEmail: string
}

export type TransferNestedShareRecordResultItem = {
    recordUid: string
    success: boolean
    message: string
}

export type TransferNestedShareRecordResult = {
    results: TransferNestedShareRecordResultItem[]
    success: boolean
}

async function requireRecordKey(
    storage: InMemoryStorage,
    auth: Auth,
    recordUid: string
): Promise<Uint8Array> {
    const recordKey = await resolveRecordKeyBytes(storage, auth, recordUid)
    if (!recordKey) {
        throw new KeeperSdkError(
            `Record key not available for ${recordUid}. Run sync() first.`,
            ResultCodes.NSF_MISSING_KEY
        )
    }
    return recordKey
}

export async function transferNestedShareRecordOwnership(
    storage: InMemoryStorage,
    auth: Auth,
    recordUid: string,
    newOwnerEmail: string
): Promise<TransferNestedShareRecordResultItem> {
    const email = newOwnerEmail.trim()
    if (!email) {
        throw new KeeperSdkError('New owner email is required.', TRANSFER_ERROR)
    }

    const recordKey = await requireRecordKey(storage, auth, recordUid)
    const userKeys = await loadUserShareKeysOrInvite(auth, email, TRANSFER_ERROR)
    const { encryptedKey, useEccKey } = await encryptKeyForRecipient(recordKey, userKeys)

    const response = await auth.executeRest(
        recordsTransferV3Message({
            transferRecords: [
                Records.TransferRecord.create({
                    username: email,
                    recordUid: normal64Bytes(recordUid),
                    recordKey: encryptedKey,
                    useEccKey,
                }),
            ],
        })
    )

    const status = response.transferRecordStatus?.[0]
    const success = status?.status?.toLowerCase().includes('success') ?? false
    return {
        recordUid,
        success,
        message: status?.message || status?.status || 'Ownership transfer completed',
    }
}

export async function transferNestedShareRecords(
    storage: InMemoryStorage,
    auth: Auth,
    input: TransferNestedShareRecordInput
): Promise<TransferNestedShareRecordResult> {
    const records = input.records.map((record) => record.trim()).filter(Boolean)
    const newOwnerEmail = input.newOwnerEmail.trim()

    if (records.length === 0) {
        throw new KeeperSdkError('At least one record UID or title is required.', TRANSFER_ERROR)
    }
    if (!newOwnerEmail) {
        throw new KeeperSdkError('New owner email is required.', TRANSFER_ERROR)
    }

    const results: TransferNestedShareRecordResultItem[] = []

    try {
        for (const identifier of records) {
            const recordUid = resolveNsfRecordIdentifier(storage, identifier)
            if (!recordUid) {
                throw new KeeperSdkError(`Record '${identifier}' not found`, ResultCodes.NSF_NOT_FOUND)
            }
            ensureNestedShareRecord(storage, recordUid, identifier)
            results.push(
                await transferNestedShareRecordOwnership(storage, auth, recordUid, newOwnerEmail)
            )
        }

        return {
            results,
            success: results.every((item) => item.success),
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to transfer nested share record ownership: ${extractErrorMessage(err)}`,
            TRANSFER_ERROR
        )
    }
}

export function formatTransferNestedShareRecordResults(
    results: TransferNestedShareRecordResultItem[]
): string {
    if (results.length === 0) return ''
    const lines: string[] = []
    for (const item of results) {
        lines.push(
            `${item.recordUid}  ${item.success ? 'success' : 'failed'}  ${item.message}`
        )
    }
    return lines.join('\n')
}

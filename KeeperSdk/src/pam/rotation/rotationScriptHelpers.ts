import * as fs from 'fs'
import * as path from 'path'
import type { Auth, DRecord } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { getRecordTitle, getRecordType } from '../../records/RecordUtils'
import { updateRecord } from '../../records/RecordOperations'
import { KeeperSdkError, ResultCodes } from '../../utils'
import { SCRIPT_FIELD_TYPE } from './rotationConstants'
import type {
    PamRecordData,
    RotationScriptValue,
    ScriptFieldLocation,
    ScriptSearchResult,
} from './rotationScriptTypes'

export function findPamRecordsByName(storage: InMemoryStorage, searchText: string): DRecord[] {
    const results: DRecord[] = []
    const searchLower = searchText.toLowerCase()

    const allRecords = storage.getRecords()
    for (const record of allRecords) {
        if (!record) continue

        const recordType = getRecordType(record)
        if (recordType !== 'pamUser' && recordType !== 'pamDirectory') {
            continue
        }

        const title = getRecordTitle(record) || ''
        if (
            record.uid === searchText ||
            record.uid.toLowerCase().includes(searchLower) ||
            title.toLowerCase().includes(searchLower)
        ) {
            results.push(record)
        }
    }

    return results
}

export function getRecordTitleSafe(record: DRecord): string {
    return getRecordTitle(record) || record.uid
}

export function getSinglePamRecord(storage: InMemoryStorage, recordName: string): DRecord {
    const recordNameTrimmed = recordName?.trim()
    if (!recordNameTrimmed) {
        throw new KeeperSdkError('Record UID or title is required', ResultCodes.INVALID_PATTERN)
    }

    const records = findPamRecordsByName(storage, recordNameTrimmed)
    if (records.length === 0) {
        throw new KeeperSdkError(
            `PAM record not found: ${recordNameTrimmed}`,
            ResultCodes.PAM_CONFIG_NOT_FOUND
        )
    }

    if (records.length > 1) {
        throw new KeeperSdkError(
            `Multiple records match "${recordNameTrimmed}". Use record UID for specificity.`,
            ResultCodes.PAM_MULTIPLE_CONFIG_MATCHES
        )
    }

    const record = records[0]
    const recordType = getRecordType(record)
    if (recordType !== 'pamUser' && recordType !== 'pamDirectory') {
        throw new KeeperSdkError(
            `Record "${recordNameTrimmed}" is not a PAM record (pamUser/pamDirectory)`,
            ResultCodes.PAM_CONFIG_INVALID
        )
    }

    return record
}

export function findScriptFieldsInRecord(recordData: PamRecordData): ScriptFieldLocation[] {
    const results: ScriptFieldLocation[] = []

    const dataFields = recordData.fields || []
    for (let i = 0; i < dataFields.length; i++) {
        const field = dataFields[i]
        if (field.type !== SCRIPT_FIELD_TYPE) continue

        const value = field.value as unknown
        if (!Array.isArray(value)) continue

        for (let j = 0; j < value.length; j++) {
            const script = value[j]
            if (
                script &&
                typeof script === 'object' &&
                'fileRef' in script &&
                typeof (script as any).fileRef === 'string'
            ) {
                results.push({
                    fieldIndex: i,
                    scriptIndex: j,
                    script: script as RotationScriptValue,
                })
            }
        }
    }

    return results
}

export function findScriptByUidOrName(
    storage: InMemoryStorage,
    recordData: PamRecordData,
    searchText: string
): ScriptSearchResult | undefined {
    const scripts = findScriptFieldsInRecord(recordData)

    for (const location of scripts) {
        if (location.script.fileRef === searchText) {
            return { location, matchType: 'uid' }
        }
    }

    const searchLower = searchText.toLowerCase()
    for (const location of scripts) {
        const scriptFile = storage.getByUid<DRecord>(
            VaultObjectKind.Record,
            location.script.fileRef
        )
        if (scriptFile) {
            const title = (getRecordTitle(scriptFile) || '').toLowerCase()
            if (title.includes(searchLower)) {
                return { location, matchType: 'name' }
            }
        }
    }

    return undefined
}

export function expandFilePath(filePath: string): string {
    return filePath.startsWith('~')
        ? path.join(process.env.HOME || '', filePath.slice(1))
        : filePath
}

export function validateScriptFileExists(filePath: string): string {
    const expandedPath = expandFilePath(filePath)
    if (!fs.existsSync(expandedPath)) {
        throw new KeeperSdkError(
            `Script file not found: ${filePath}`,
            ResultCodes.PAM_CONFIG_CREATE_FAILED
        )
    }
    return expandedPath
}

export async function updatePamRecordFields(
    auth: Auth,
    record: DRecord,
    recordType: string,
    fields: unknown[],
    currentRevision: number,
    storage: InMemoryStorage
): Promise<void> {
    const recordKey = await storage.getKeyBytes(record.uid)
    if (!recordKey) {
        throw new KeeperSdkError(
            `Unable to retrieve encryption key for record "${record.uid}"`,
            ResultCodes.PAM_CONFIG_EDIT_FAILED
        )
    }

    const recordData = (record.data as PamRecordData) || { fields: [] }
    const updateResult = await updateRecord(
        auth,
        record.uid,
        {
            type: recordType,
            title: getRecordTitle(record) || '',
            fields: fields as any,
            notes: recordData.notes || '',
        },
        currentRevision,
        recordKey
    )

    if (!updateResult.success) {
        throw new KeeperSdkError(
            `Failed to save changes: ${updateResult.status || 'unknown error'}`,
            ResultCodes.PAM_CONFIG_EDIT_FAILED
        )
    }
    record.revision = currentRevision + 1
}

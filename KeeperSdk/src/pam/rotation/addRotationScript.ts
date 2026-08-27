import type { Auth } from '@keeper-security/keeperapi'
import type { DRecord } from '@keeper-security/keeperapi'
import { generateUid } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { getRecordTitle, getRecordType } from '../../records/RecordUtils'
import type { AddRotationScriptInput, AddRotationScriptResult, RotationScriptValue } from './rotationScriptTypes'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../../utils'
import {
    getSinglePamRecord,
    getRecordTitleSafe,
    validateScriptFileExists,
    updatePamRecordFields,
} from './rotationScriptHelpers'
import { SCRIPT_FIELD_TYPE, SCRIPT_FIELD_LABEL } from './rotationConstants'
import type { PamRecordData } from './rotationScriptTypes'

export async function addRotationScript(
    auth: Auth,
    storage: InMemoryStorage,
    input: AddRotationScriptInput
): Promise<AddRotationScriptResult> {
    const warnings: string[] = []

    try {
        const scriptPath = input.scriptPath?.trim()
        if (!scriptPath) {
            throw new KeeperSdkError(
                'Script file path is required',
                ResultCodes.INVALID_PATTERN
            )
        }

        const expandedPath = validateScriptFileExists(scriptPath)
        const record = getSinglePamRecord(storage, input.record)
        const recordType = getRecordType(record)
        const currentRevision = record.revision || 0

        const recordData = (record.data as PamRecordData) || { fields: [] }
        const dataFields = recordData.fields || []

        const fs = require('fs')
        const path = require('path')
        const fileName = path.basename(expandedPath)

        const fileUid = generateUid()
        const scriptValue: RotationScriptValue = {
            fileRef: fileUid,
            recordRef: [],
            command: input.scriptCommand || '',
        }

        if (Array.isArray(input.credentialUids)) {
            for (const credUid of input.credentialUids) {
                const credRecord = storage.getByUid<DRecord>(1 as any, credUid)
                if (!credRecord) {
                    warnings.push(`Credential record not found: ${credUid}`)
                    continue
                }
                scriptValue.recordRef.push(credUid)
            }
        }

        const newScriptField = {
            type: SCRIPT_FIELD_TYPE,
            label: SCRIPT_FIELD_LABEL,
            value: [scriptValue],
        }

        dataFields.push(newScriptField)
        recordData.fields = dataFields
        ;(record as any).data = recordData

        await updatePamRecordFields(auth, record, recordType, dataFields, currentRevision, storage)

        return {
            success: true,
            recordUid: record.uid,
            scriptFileUid: fileUid,
            message: `Script "${fileName}" added to record "${getRecordTitleSafe(record)}"`,
            warnings,
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) {
            throw err
        }
        throw new KeeperSdkError(
            `Failed to add rotation script: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_CONFIG_CREATE_FAILED
        )
    }
}

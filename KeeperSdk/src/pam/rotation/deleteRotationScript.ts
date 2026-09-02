import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { getRecordType } from '../../records/RecordUtils'
import type { DeleteRotationScriptInput, DeleteRotationScriptResult } from './rotationScriptTypes'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../../utils'
import {
    getSinglePamRecord,
    getRecordTitleSafe,
    findScriptFieldsInRecord,
    findScriptByUidOrName,
    updatePamRecordFields,
} from './rotationScriptHelpers'

/**
 * Delete a rotation script from a PAM record
 */
export async function deleteRotationScript(
    auth: Auth,
    storage: InMemoryStorage,
    input: DeleteRotationScriptInput
): Promise<DeleteRotationScriptResult> {
    const warnings: string[] = []

    try {
        const record = getSinglePamRecord(storage, input.record)
        const recordType = getRecordType(record)
        const currentRevision = record.revision || 0

        const recordData = record.data
        const dataFields = recordData.fields

        const scriptFields = findScriptFieldsInRecord(recordData)
        if (scriptFields.length === 0) {
            throw new KeeperSdkError(
                `Record "${getRecordTitleSafe(record)}" has no rotation scripts`,
                ResultCodes.PAM_CONFIG_NOT_FOUND
            )
        }

        let targetScript = scriptFields[0]
        const scriptName = input.script?.trim()

        if (scriptName) {
            const found = findScriptByUidOrName(storage, recordData, scriptName)
            if (!found) {
                throw new KeeperSdkError(
                    `Record "${getRecordTitleSafe(record)}" does not have script "${scriptName}"`,
                    ResultCodes.PAM_CONFIG_NOT_FOUND
                )
            }
            targetScript = found.location
        }

        const field = dataFields[targetScript.fieldIndex]
        if (!field || field.type !== 'script' || !Array.isArray(field.value)) {
            throw new KeeperSdkError('Rotation script field is invalid', ResultCodes.PAM_CONFIG_INVALID)
        }
        const scriptArray = field.value
        scriptArray.splice(targetScript.scriptIndex, 1)

        if (scriptArray.length === 0) {
            dataFields.splice(targetScript.fieldIndex, 1)
        }

        recordData.fields = dataFields
        record.data = recordData

        await updatePamRecordFields(auth, record, recordType, dataFields, currentRevision, storage)

        return {
            success: true,
            recordUid: record.uid,
            message: `Script "${targetScript.script.fileRef}" deleted from record "${getRecordTitleSafe(record)}"`,
            warnings,
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) {
            throw err
        }
        throw new KeeperSdkError(
            `Failed to delete rotation script: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_CONFIG_EDIT_FAILED
        )
    }
}

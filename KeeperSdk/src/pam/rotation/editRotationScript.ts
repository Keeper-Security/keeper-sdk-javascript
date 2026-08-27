import type { Auth } from '@keeper-security/keeperapi'
import type { DRecord } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { getRecordTitle, getRecordType } from '../../records/RecordUtils'
import type { EditRotationScriptInput, EditRotationScriptResult } from './rotationScriptTypes'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../../utils'
import {
    getSinglePamRecord,
    getRecordTitleSafe,
    findScriptByUidOrName,
    updatePamRecordFields,
} from './rotationScriptHelpers'
import type { PamRecordData } from './rotationScriptTypes'


export async function editRotationScript(
    auth: Auth,
    storage: InMemoryStorage,
    input: EditRotationScriptInput
): Promise<EditRotationScriptResult> {
    const warnings: string[] = []

    try {
        const scriptName = input.script?.trim()
        if (!scriptName) {
            throw new KeeperSdkError(
                'Script UID or name is required',
                ResultCodes.INVALID_PATTERN
            )
        }

        const record = getSinglePamRecord(storage, input.record)
        const recordType = getRecordType(record)
        const currentRevision = record.revision || 0

        const recordData = (record.data as PamRecordData) || { fields: [] }
        const dataFields = recordData.fields || []

        const found = findScriptByUidOrName(storage, recordData, scriptName)
        if (!found) {
            throw new KeeperSdkError(
                `Record "${getRecordTitleSafe(record)}" does not have script "${scriptName}"`,
                ResultCodes.PAM_CONFIG_NOT_FOUND
            )
        }

        const scriptValue = found.location.script
        let modified = false

        const credentialSet = new Set<string>(scriptValue.recordRef || [])

        if (Array.isArray(input.removeCredentials) && input.removeCredentials.length > 0) {
            for (const credUid of input.removeCredentials) {
                credentialSet.delete(credUid)
            }
            modified = true
        }

        if (Array.isArray(input.addCredentials) && input.addCredentials.length > 0) {
            for (const credUid of input.addCredentials) {
                const credRecord = storage.getByUid<DRecord>(VaultObjectKind.Record, credUid)
                if (!credRecord) {
                    warnings.push(`Credential record not found: ${credUid}`)
                    continue
                }
                credentialSet.add(credUid)
            }
            modified = true
        }

        if (modified) {
            scriptValue.recordRef = Array.from(credentialSet)
        }

        if (input.scriptCommand !== undefined && input.scriptCommand !== null) {
            scriptValue.command = input.scriptCommand
            modified = true
        }

        if (!modified) {
            return {
                success: true,
                recordUid: record.uid,
                message: 'No changes specified',
                warnings,
            }
        }

        recordData.fields = dataFields
        ;(record as any).data = recordData

        await updatePamRecordFields(auth, record, recordType, dataFields, currentRevision, storage)

        return {
            success: true,
            recordUid: record.uid,
            message: `Script updated for record "${getRecordTitleSafe(record)}"`,
            warnings,
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) {
            throw err
        }
        throw new KeeperSdkError(
            `Failed to edit rotation script: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_CONFIG_EDIT_FAILED
        )
    }
}

import * as fs from 'fs'
import * as path from 'path'
import type { Auth, DRecord } from '@keeper-security/keeperapi'
import {
    fileAddMessage,
    generateEncryptionKey,
    generateUid,
    normal64Bytes,
    platform,
    Records,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { getRecordType } from '../../records/RecordUtils'
import type { AddRotationScriptInput, AddRotationScriptResult, RotationScriptValue } from './rotationScriptTypes'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../../utils'
import {
    getSinglePamRecord,
    getRecordTitleSafe,
    validateScriptFileExists,
    updatePamRecordFields,
} from './rotationScriptHelpers'
import { SCRIPT_FIELD_TYPE, SCRIPT_FIELD_LABEL } from './rotationConstants'

export async function addRotationScript(
    auth: Auth,
    storage: InMemoryStorage,
    input: AddRotationScriptInput
): Promise<AddRotationScriptResult> {
    const warnings: string[] = []

    try {
        const scriptPath = input.scriptPath?.trim()
        if (!scriptPath) {
            throw new KeeperSdkError('Script file path is required', ResultCodes.INVALID_PATTERN)
        }

        const expandedPath = validateScriptFileExists(scriptPath)
        const record = getSinglePamRecord(storage, input.record)
        const recordType = getRecordType(record)
        const currentRevision = record.revision || 0

        const recordData = record.data
        const dataFields = recordData.fields
        const fileName = path.basename(expandedPath)

        const recordKey = await storage.getKeyBytes(record.uid)
        if (!recordKey) {
            throw new KeeperSdkError(
                `Unable to retrieve encryption key for record "${record.uid}"`,
                ResultCodes.PAM_CONFIG_CREATE_FAILED
            )
        }

        const fileUid = generateUid()
        const fileKey = generateEncryptionKey()
        const scriptData = new Uint8Array(fs.readFileSync(expandedPath))
        const encryptedScript = await platform.aesGcmEncrypt(scriptData, fileKey)
        const fileMetadata = platform.stringToBytes(
            JSON.stringify({
                title: fileName,
                name: fileName,
                type: 'application/octet-stream',
                size: scriptData.length,
            })
        )

        const filesAddResponse = await auth.executeRest(
            fileAddMessage({
                clientTime: Date.now(),
                files: [
                    {
                        recordUid: normal64Bytes(fileUid),
                        recordKey: await platform.aesGcmEncrypt(fileKey, auth.dataKey!),
                        data: await platform.aesGcmEncrypt(fileMetadata, fileKey),
                        fileSize: encryptedScript.length,
                        isScript: true,
                    },
                ],
            })
        )
        const fileStatus = filesAddResponse.files?.[0]
        if (!fileStatus || fileStatus.status !== Records.FileAddResult.FA_SUCCESS || !fileStatus.url) {
            throw new KeeperSdkError('Failed to obtain script file upload URL', ResultCodes.PAM_CONFIG_CREATE_FAILED)
        }

        let uploadParameters: { [key: string]: string }
        try {
            uploadParameters = JSON.parse(fileStatus.parameters || '{}')
        } catch {
            throw new KeeperSdkError('Invalid script file upload parameters', ResultCodes.PAM_CONFIG_CREATE_FAILED)
        }
        const uploadResponse = await platform.fileUpload(fileStatus.url, uploadParameters, encryptedScript)
        if (fileStatus.successStatusCode && uploadResponse?.statusCode !== fileStatus.successStatusCode) {
            throw new KeeperSdkError('Failed to upload script file', ResultCodes.PAM_CONFIG_CREATE_FAILED)
        }

        const scriptValue: RotationScriptValue = {
            fileRef: fileUid,
            recordRef: [],
            command: input.scriptCommand || '',
        }

        if (Array.isArray(input.credentialUids)) {
            for (const credUid of input.credentialUids) {
                const credRecord = storage.getByUid<DRecord>(VaultObjectKind.Record, credUid)
                if (!credRecord) {
                    warnings.push(`Credential record not found: ${credUid}`)
                    continue
                }
                scriptValue.recordRef.push(credUid)
            }
        }

        const scriptField = dataFields.find(
            (field) => field.type === SCRIPT_FIELD_TYPE && Array.isArray(field.value)
        )
        if (scriptField) {
            scriptField.label = SCRIPT_FIELD_LABEL
            scriptField.required = false
            scriptField.value.push(scriptValue)
        } else {
            dataFields.push({
                type: SCRIPT_FIELD_TYPE,
                label: SCRIPT_FIELD_LABEL,
                value: [scriptValue],
                required: false,
            })
        }
        recordData.fields = dataFields
        record.data = recordData

        await updatePamRecordFields(auth, record, recordType, dataFields, currentRevision, storage, [
            {
                recordUid: normal64Bytes(fileUid),
                recordKey: await platform.aesGcmEncrypt(fileKey, recordKey),
            },
        ])

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

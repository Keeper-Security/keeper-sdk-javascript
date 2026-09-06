import type { Auth, DRecord, PAM } from '@keeper-security/keeperapi'
import { normal64Bytes, pamConfigureNetworkGraphMessage } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { updateRecord } from '../../records/RecordOperations'
import { updateNestedShareRecord } from '../../nestedShareFolders/updateNsfRecord'
import { isNestedShareRecord } from '../../nestedShareFolders/nsfHelpers'
import { getRecordType } from '../../records/RecordUtils'
import { KeeperSdkError, ResultCodes } from '../../utils'
import { PAM_RBI_RECORD_TYPE } from './rbiConstants'
import { rbiData, rbiRecordUidBytes, rbiSettingsBytes, resolveRbiRecord, updateRbiSettings, validateRbiInput } from './rbiHelpers'
import type { PamRbiEditInput, PamRbiEditResult } from './rbiTypes'

async function persist(auth: Auth, storage: InMemoryStorage, record: DRecord, data: ReturnType<typeof rbiData>): Promise<boolean> {
    if (isNestedShareRecord(storage, record.uid)) {
        const result = await updateNestedShareRecord(storage, auth, { record: record.uid, recordType: data.type, title: data.title, notes: data.notes, fieldEntries: data.fields, customEntries: data.custom })
        return result.success
    }
    const key = await storage.getKeyBytes(record.uid)
    if (!key) throw new KeeperSdkError(`Record key not available for ${record.uid}.`, ResultCodes.NSF_MISSING_KEY)
    return (await updateRecord(auth, record.uid, data, record.revision, key)).success
}

export async function editPamRbi(auth: Auth, storage: InMemoryStorage, input: PamRbiEditInput): Promise<PamRbiEditResult> {
    validateRbiInput(input)
    const record = resolveRbiRecord(storage, input.record.trim())
    if (!record) throw new KeeperSdkError(`Record "${input.record}" not found.`, ResultCodes.PAM_RBI_RECORD_NOT_FOUND)
    if (getRecordType(record) !== PAM_RBI_RECORD_TYPE) throw new KeeperSdkError(`Record ${record.uid} is not a pamRemoteBrowser record.`, ResultCodes.PAM_RBI_RECORD_INVALID)
    const configRecord = input.configuration ? resolveRbiRecord(storage, input.configuration.trim()) : undefined
    const configUid = configRecord?.uid || input.configuration?.trim() || storage.getByUid<any>('record_rotation', record.uid)?.configurationUid
    if (!configUid) throw new KeeperSdkError('Configuration UID is required or must be linked to the RBI record.', ResultCodes.PAM_RBI_CONFIGURATION_REQUIRED)
    if (input.configuration && !configRecord) throw new KeeperSdkError(`Configuration "${input.configuration}" not found.`, ResultCodes.PAM_RBI_CONFIGURATION_REQUIRED)
    let normalizedInput = input
    if (input.autofillCredentials) {
        const credential = resolveRbiRecord(storage, input.autofillCredentials)
        const credentialType = credential ? getRecordType(credential) : ''
        if (!credential || (credentialType !== 'login' && credentialType !== 'pamUser')) {
            throw new KeeperSdkError('RBI autofill credentials must reference a login or pamUser record.', ResultCodes.PAM_RBI_RECORD_INVALID)
        }
        normalizedInput = { ...input, autofillCredentials: credential.uid }
    }
    const modified = updateRbiSettings(record, normalizedInput)
    const recordUpdated = modified.changed ? await persist(auth, storage, record, modified.data) : false
    const allowedSettings: Record<string, boolean | null> = {}
    const rbi = normalizedInput.remoteBrowserIsolation === 'on' ? true : normalizedInput.remoteBrowserIsolation === 'off' ? false : normalizedInput.remoteBrowserIsolation === 'default' ? null : undefined
    const recording = normalizedInput.connectionsRecording === 'on' ? true : normalizedInput.connectionsRecording === 'off' ? false : normalizedInput.connectionsRecording === 'default' ? null : undefined
    if (rbi !== undefined) allowedSettings.remoteBrowserIsolation = rbi
    if (recording !== undefined) allowedSettings.sessionRecording = recording
    const resource: PAM.IPAMResourceConfig = { recordUid: normal64Bytes(record.uid), networkUid: normal64Bytes(configUid), connectionSettings: rbiSettingsBytes(modified.data) }
    await auth.executeRouterRestAction(pamConfigureNetworkGraphMessage({ recordUid: normal64Bytes(configUid), resources: [resource], networkSettings: Object.keys(allowedSettings).length ? { allowedSettings: new TextEncoder().encode(JSON.stringify(allowedSettings)) } : undefined }))
    return { recordUid: record.uid, changed: recordUpdated || true, recordUpdated, dagUpdated: true, configurationUid: configUid, warnings: [] }
}

import type { DRecord } from '@keeper-security/keeperapi'
import { generateEncryptionKey, normal64Bytes, platform, webSafe64FromBytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { getRecordTitle, getRecordType } from '../../records/RecordUtils'
import { KeeperSdkError, ResultCodes } from '../../utils'
import { PAM_RBI_DEFAULT_SETTINGS, PAM_RBI_RECORD_TYPE } from './rbiConstants'
import type { PamRbiEditInput, PamRbiSetting } from './rbiTypes'

export function resolveRbiRecord(storage: InMemoryStorage, identifier: string): DRecord | undefined {
    const direct = storage.getByUid<DRecord>(VaultObjectKind.Record, identifier)
    if (direct) return direct
    const matches = storage.getRecords().filter((record) => getRecordTitle(record).toLowerCase() === identifier.toLowerCase())
    if (matches.length > 1) throw new KeeperSdkError(`Multiple records match "${identifier}".`, ResultCodes.PAM_RBI_RECORD_AMBIGUOUS)
    return matches[0]
}

export function validateRbiInput(input: PamRbiEditInput): void {
    if (!input.record?.trim()) throw new KeeperSdkError('Record parameter is required.', ResultCodes.PAM_RBI_RECORD_REQUIRED)
    if (input.audioBitDepth != null && input.audioBitDepth !== 8 && input.audioBitDepth !== 16) {
        throw new KeeperSdkError('Audio bit depth must be 8 or 16.', ResultCodes.PAM_RBI_AUDIO_INVALID)
    }
    for (const value of [input.audioChannels, input.audioSampleRate]) {
        if (value != null && (!Number.isInteger(value) || value < 1)) throw new KeeperSdkError('Audio values must be positive integers.', ResultCodes.PAM_RBI_AUDIO_INVALID)
    }
}

export function convertRbiSetting(value: PamRbiSetting | undefined): boolean | null | undefined {
    if (value === undefined) return undefined
    if (value === 'on') return true
    if (value === 'off') return false
    return null
}

export function rbiData(record: DRecord): { type: string; title: string; fields: any[]; custom: any[]; notes: string } {
    const data = record.data && typeof record.data === 'object' ? record.data : {}
    return { type: getRecordType(record), title: data.title || getRecordTitle(record), fields: structuredClone(data.fields || []), custom: structuredClone(data.custom || []), notes: data.notes || '' }
}

export function updateRbiSettings(record: DRecord, input: PamRbiEditInput): { data: ReturnType<typeof rbiData>; changed: boolean } {
    const data = rbiData(record)
    let field = data.fields.find((entry) => entry.type === 'pamRemoteBrowserSettings')
    if (!field) { field = { type: 'pamRemoteBrowserSettings', value: [structuredClone(PAM_RBI_DEFAULT_SETTINGS)] }; data.fields.push(field) }
    if (!Array.isArray(field.value) || !field.value[0]) field.value = [structuredClone(PAM_RBI_DEFAULT_SETTINGS)]
    const root = field.value[0] as Record<string, any>
    if (!root.connection || typeof root.connection !== 'object') root.connection = {}
    const connection = root.connection as Record<string, any>
    let changed = false
    const toggle = (value: PamRbiSetting | undefined, key: string, invert = false) => {
        const converted = convertRbiSetting(value)
        if (converted === undefined) return
        if (converted === null) delete connection[key]
        else connection[key] = invert ? !converted : converted
        changed = true
    }
    toggle(input.remoteBrowserIsolation, 'remoteBrowserIsolation')
    toggle(input.keyEvents, 'recordingIncludeKeys')
    toggle(input.allowUrlNavigation, 'allowUrlManipulation')
    toggle(input.ignoreServerCert, 'ignoreInitialSslCert')
    toggle(input.allowCopy, 'disableCopy', true)
    toggle(input.allowPaste, 'disablePaste', true)
    toggle(input.disableAudio, 'disableAudio')
    const strings: Array<[string[] | undefined, string]> = [[input.allowedUrls, 'allowedUrlPatterns'], [input.allowedResourceUrls, 'allowedResourceUrlPatterns'], [input.autofillTargets, 'autofillConfiguration']]
    for (const [values, key] of strings) if (values !== undefined) { connection[key] = values.join('\n'); changed = true }
    if (input.autofillCredentials) { connection.httpCredentialsUid = input.autofillCredentials; changed = true }
    const ints: Array<[number | undefined, string]> = [[input.audioChannels, 'audioChannels'], [input.audioBitDepth, 'audioBps'], [input.audioSampleRate, 'audioSampleRate']]
    for (const [value, key] of ints) if (value !== undefined) { connection[key] = value; changed = true }
    if (!data.fields.some((entry) => entry.type === 'trafficEncryptionSeed') && !data.custom.some((entry) => entry.type === 'trafficEncryptionSeed')) {
        data.fields.push({ type: 'trafficEncryptionSeed', value: [webSafe64FromBytes(generateEncryptionKey())] }); changed = true
    }
    return { data, changed }
}

export function rbiSettingsBytes(data: ReturnType<typeof rbiData>): Uint8Array {
    const field = data.fields.find((entry) => entry.type === 'pamRemoteBrowserSettings')
    return platform.stringToBytes(JSON.stringify(field?.value?.[0] || PAM_RBI_DEFAULT_SETTINGS))
}

export function rbiRecordUidBytes(uid: string): Uint8Array { return normal64Bytes(uid) }

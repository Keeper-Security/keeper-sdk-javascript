import type { DRecord, DRecordRotation } from '@keeper-security/keeperapi'
import { generateEncryptionKey, normal64Bytes, platform, webSafe64FromBytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { getRecordTitle, getRecordType } from '../../records/RecordUtils'
import { KeeperSdkError, ResultCodes } from '../../utils'
import type { RecordFieldInput } from '../../records/RecordOperations'
import { PAM_CONNECTION_CONFIG_TYPES, PAM_CONNECTION_PROTOCOLS, PAM_CONNECTION_RESOURCE_TYPES } from './connectionConstants'
import type { PamConnectionEditInput, PamConnectionSetting } from './connectionTypes'

export function resolveConnectionRecord(storage: InMemoryStorage, identifier: string): DRecord | undefined {
    const direct = storage.getByUid<DRecord>(VaultObjectKind.Record, identifier)
    if (direct) return direct
    const lower = identifier.toLowerCase()
    const matches = storage.getRecords().filter((record) => getRecordTitle(record).toLowerCase() === lower)
    if (matches.length > 1) throw new KeeperSdkError(`Multiple records match "${identifier}".` , ResultCodes.PAM_CONNECTION_RECORD_AMBIGUOUS)
    return matches[0]
}

export function isConnectionConfig(record: DRecord): boolean {
    return (PAM_CONNECTION_CONFIG_TYPES as readonly string[]).includes(getRecordType(record))
}

export function isConnectionResource(record: DRecord): boolean {
    return (PAM_CONNECTION_RESOURCE_TYPES as readonly string[]).includes(getRecordType(record))
}

export function convertConnectionSetting(value: PamConnectionSetting | undefined): boolean | null | undefined {
    if (value == null) return undefined
    if (value === 'on') return true
    if (value === 'off') return false
    return null
}

export function validateConnectionInput(input: PamConnectionEditInput): void {
    if (!input.record?.trim()) throw new KeeperSdkError('Record UID, title, or path is required.', ResultCodes.PAM_CONNECTION_RECORD_REQUIRED)
    if (input.protocol && !(PAM_CONNECTION_PROTOCOLS as readonly string[]).includes(input.protocol.toLowerCase())) {
        throw new KeeperSdkError(`Unsupported connection protocol "${input.protocol}".`, ResultCodes.PAM_CONNECTION_PROTOCOL_INVALID)
    }
    if (input.connectionsOverridePort != null && (!Number.isInteger(input.connectionsOverridePort) || input.connectionsOverridePort < 1 || input.connectionsOverridePort > 65535)) {
        throw new KeeperSdkError('Connection override port must be an integer from 1 to 65535.', ResultCodes.PAM_CONNECTION_PORT_INVALID)
    }
    if ((input.protocol || input.connectionsOverridePort != null) && input.connections !== 'on') {
        throw new KeeperSdkError('Protocol and connection override port require connections=on.', ResultCodes.PAM_CONNECTION_SETTINGS_INVALID)
    }
}

export function getCachedConfigurationUid(storage: InMemoryStorage, recordUid: string): string | undefined {
    return storage.getByUid<DRecordRotation>('record_rotation', recordUid)?.configurationUid
}

export function resolvePamUserUid(storage: InMemoryStorage, identifier: string | undefined): string | undefined {
    if (!identifier?.trim()) return undefined
    const record = resolveConnectionRecord(storage, identifier.trim())
    if (!record || getRecordType(record) !== 'pamUser') {
        throw new KeeperSdkError(`PAM User "${identifier}" was not found.`, ResultCodes.PAM_CONNECTION_RECORD_NOT_FOUND)
    }
    return record.uid
}

export function getTypedRecordData(record: DRecord): {
    type: string
    title: string
    fields: RecordFieldInput[]
    custom: RecordFieldInput[]
    notes: string
} {
    const data = record.data && typeof record.data === 'object' ? record.data : {}
    return {
        type: getRecordType(record),
        title: typeof data.title === 'string' ? data.title : getRecordTitle(record),
        fields: Array.isArray(data.fields) ? structuredClone(data.fields) as RecordFieldInput[] : [],
        custom: Array.isArray(data.custom) ? structuredClone(data.custom) as RecordFieldInput[] : [],
        notes: typeof data.notes === 'string' ? data.notes : '',
    }
}

function getOrCreateField(fields: Array<Record<string, unknown>>, type: string): Record<string, unknown> {
    let field = fields.find((entry) => entry.type === type)
    if (!field) {
        field = { type, value: [] }
        fields.push(field)
    }
    if (!Array.isArray(field.value) || field.value.length === 0) field.value = [{}]
    if (!field.value[0] || typeof field.value[0] !== 'object') field.value[0] = {}
    return field
}

export function applyResourceRecordSettings(record: DRecord, input: PamConnectionEditInput): { data: ReturnType<typeof getTypedRecordData>; changed: boolean } {
    const data = getTypedRecordData(record)
    let changed = false
    let settings = getOrCreateField(data.custom, 'pamSettings')
    const value = settings.value as Array<Record<string, unknown>>
    const root = value[0]
    if (!root.connection || typeof root.connection !== 'object') root.connection = {}
    if (!root.portForward || typeof root.portForward !== 'object') root.portForward = {}
    const connection = root.connection as Record<string, unknown>

    const setting = convertConnectionSetting(input.keyEvents)
    if (setting !== undefined) {
        if (setting === null) delete connection.recordingIncludeKeys
        else connection.recordingIncludeKeys = setting
        changed = true
    }
    if (input.connections === 'on') {
        if (input.protocol !== undefined) {
            connection.protocol = input.protocol.toLowerCase()
            changed = true
        }
        if (input.connectionsOverridePort !== undefined) {
            connection.port = input.connectionsOverridePort
            changed = true
        }
    }

    if (input.adminUser || input.launchUser) changed = true
    const seedExists = [...data.fields, ...data.custom].some((field) => field.type === 'trafficEncryptionSeed')
    if (!seedExists) {
        const seedField = { type: 'trafficEncryptionSeed', value: [webSafe64FromBytes(generateEncryptionKey())] }
        const target = ['pamMachine', 'pamDatabase', 'pamDirectory', 'pamRemoteBrowser'].includes(data.type) ? data.fields : data.custom
        target.push(seedField)
        changed = true
    }
    return { data, changed }
}

export function makeConnectionSettingsBytes(data: ReturnType<typeof getTypedRecordData>): Uint8Array {
    const settings = data.custom.find((field) => field.type === 'pamSettings')
    return platform.stringToBytes(JSON.stringify(settings?.value?.[0] || { connection: {}, portForward: {} }))
}

export function makeAllowedSettings(input: PamConnectionEditInput): Record<string, boolean | null> {
    const allowed: Record<string, boolean | null> = {}
    const values: Array<[PamConnectionSetting | undefined, string]> = [
        [input.connections, 'connections'],
        [input.connectionsRecording, 'sessionRecording'],
        [input.typescriptRecording, 'typescriptRecording'],
    ]
    for (const [value, key] of values) {
        const converted = convertConnectionSetting(value)
        if (converted !== undefined) allowed[key] = converted
    }
    return allowed
}

export function recordUidBytes(uid: string): Uint8Array {
    return normal64Bytes(uid)
}

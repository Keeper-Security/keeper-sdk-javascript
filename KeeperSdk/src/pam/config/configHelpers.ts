import type { DRecord, DSharedFolder, DSharedFolderRecord } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { FolderKind, VaultObjectKind, sharedFolderName } from '../../folders/folderHelpers'
import { getRecordFields, getRecordTitle, getRecordType } from '../../records/RecordUtils'
import {
    FILE_REF_FIELD_TYPE,
    PAM_CONFIG_ENVIRONMENT_TO_RECORD_TYPE,
    PAM_CONFIGURATION_RECORD_TYPES,
    PAM_RESOURCES_FIELD_TYPE,
    SUPPORTED_PAM_CONFIGURATION_RECORD_VERSIONS,
    type PamConfigEnvironment,
    type PamConfigurationRecordType,
} from './configConstants'
import type { PamConfigurationField, PamResourcesInfo } from './configTypes'

export function isSupportedPamConfigurationRecordVersion(version: number): boolean {
    return (SUPPORTED_PAM_CONFIGURATION_RECORD_VERSIONS as readonly number[]).includes(version)
}

export function isPamConfigurationRecordType(recordType: string): recordType is PamConfigurationRecordType {
    return (PAM_CONFIGURATION_RECORD_TYPES as readonly string[]).includes(recordType)
}

export function isPamConfigEnvironment(value: string): value is PamConfigEnvironment {
    return Object.prototype.hasOwnProperty.call(PAM_CONFIG_ENVIRONMENT_TO_RECORD_TYPE, value)
}

export function resolvePamConfigurationRecordType(environmentOrType: string): PamConfigurationRecordType | undefined {
    const trimmed = environmentOrType.trim()
    if (!trimmed) return undefined
    const lowered = trimmed.toLowerCase()
    if (isPamConfigEnvironment(lowered)) return PAM_CONFIG_ENVIRONMENT_TO_RECORD_TYPE[lowered]
    if (isPamConfigurationRecordType(trimmed)) return trimmed
    return undefined
}

export function isPamConfigurationRecord(record: DRecord): boolean {
    return isSupportedPamConfigurationRecordVersion(record.version) && isPamConfigurationRecordType(getRecordType(record))
}

function fieldValueToStrings(value: unknown): string[] {
    if (value == null) return []
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return [String(value)]
    }
    if (Array.isArray(value)) {
        return value.flatMap((entry) => fieldValueToStrings(entry))
    }
    if (typeof value === 'object') {
        const obj = value as Record<string, unknown>
        if (typeof obj.value === 'string') return [obj.value]
        if (typeof obj.url === 'string') return [obj.url]
        return [JSON.stringify(obj)]
    }
    return [String(value)]
}

export function getPamConfigurationFields(record: DRecord): PamConfigurationField[] {
    return getRecordFields(record)
        .filter((field) => field.type !== PAM_RESOURCES_FIELD_TYPE && field.type !== FILE_REF_FIELD_TYPE)
        .map((field) => ({
            type: field.type,
            label: field.label,
            values: (field.value ?? []).flatMap((entry: unknown) => fieldValueToStrings(entry)),
        }))
}

export function parsePamResources(record: DRecord): PamResourcesInfo {
    const field = getRecordFields(record).find((entry) => entry.type === PAM_RESOURCES_FIELD_TYPE)
    const raw = field?.value?.[0]
    if (!raw || typeof raw !== 'object') {
        return { gatewayUid: '', sharedFolderUid: '', resourceRecordUids: [] }
    }

    const data = raw as {
        controllerUid?: unknown
        folderUid?: unknown
        resourceRef?: unknown
        adminCredentialRef?: unknown
    }

    const resourceRecordUids = Array.isArray(data.resourceRef)
        ? data.resourceRef.map((uid) => String(uid || '')).filter(Boolean)
        : typeof data.resourceRef === 'string' && data.resourceRef
          ? [data.resourceRef]
          : []

    return {
        gatewayUid: data.controllerUid != null ? String(data.controllerUid) : '',
        sharedFolderUid: data.folderUid != null ? String(data.folderUid) : '',
        resourceRecordUids,
        adminCredentialUid:
            data.adminCredentialRef != null && String(data.adminCredentialRef).trim()
                ? String(data.adminCredentialRef).trim()
                : undefined,
    }
}

export function resolveSharedFolderName(storage: InMemoryStorage, sharedFolderUid: string): string {
    if (!sharedFolderUid) return ''
    const folder = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, sharedFolderUid)
    return folder ? sharedFolderName(folder) : sharedFolderUid
}

export function findSharedFolderUidForRecord(storage: InMemoryStorage, recordUid: string): string {
    const sharedFolderRecord = storage
        .getAll<DSharedFolderRecord>(VaultObjectKind.SharedFolderRecord)
        .find((candidate) => candidate.recordUid === recordUid)
    return sharedFolderRecord?.sharedFolderUid || ''
}

export function listPamConfigurationRecords(storage: InMemoryStorage): DRecord[] {
    return storage
        .getRecords()
        .filter((record) => isSupportedPamConfigurationRecordVersion(record.version))
        .filter((record) => isPamConfigurationRecordType(getRecordType(record)))
}

export function getPamConfigurationDisplayName(record: DRecord): string {
    const title = getRecordTitle(record)
    return title && title !== '(untitled)' && title !== '(no data)' ? title : record.uid
}

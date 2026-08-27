import type { DRecord, DRecordRotation, PAM } from '@keeper-security/keeperapi'
import { normal64Bytes, platform, Router } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { getKeeperDriveRecord } from '../../nestedShareFolders/nsfHelpers'
import { getRecordFields, getRecordTitle, getRecordType } from '../../records/RecordUtils'
import { SCHEDULE_FIELD_TYPE } from '../config/configConstants'
import { listPamConfigurationRecords, parsePamResources } from '../config/configHelpers'
import { controllerUidsEqual, webSafeUidFromBytes } from '../gateway/gatewayHelpers'
import {
    DEFAULT_ROTATION_SCHEDULE_LABEL,
    EMPTY_SCHEDULE_LABEL,
    GATEWAY_DOES_NOT_EXIST_LABEL,
    MANUAL_ROTATION_LABEL,
    NO_CONFIG_FOUND_LABEL,
    RECORD_INACCESSIBLE_LABEL,
    RECORD_ROTATION_KIND,
    RECORD_UNKNOWN_TYPE_LABEL,
    RECORD_UNTITLED_LABEL,
    ROTATION_STATUS_ONLINE,
} from './rotationConstants'
import type { PasswordComplexityDetail, RotationScheduleType } from './rotationTypes'

export function getVaultRecord(storage: InMemoryStorage, recordUid: string): DRecord | undefined {
    if (!recordUid) return undefined
    return (
        storage.getByUid<DRecord>(VaultObjectKind.Record, recordUid) || getKeeperDriveRecord(storage, recordUid)
    )
}

export function recordExistsInVault(storage: InMemoryStorage, recordUid: string): boolean {
    return !!getVaultRecord(storage, recordUid)
}

export function getVaultRecordTitleType(storage: InMemoryStorage, recordUid: string): [string, string] {
    const record = getVaultRecord(storage, recordUid)
    if (!record) return [RECORD_INACCESSIBLE_LABEL, RECORD_INACCESSIBLE_LABEL]

    const title = getRecordTitle(record)
    const type = getRecordType(record)
    const displayTitle =
        title && title !== '(untitled)' && title !== '(no data)' ? title : RECORD_UNTITLED_LABEL
    return [displayTitle, type || RECORD_UNKNOWN_TYPE_LABEL]
}

export function formatScheduleDataString(scheduleData: string | null | undefined): string {
    if (!scheduleData) return EMPTY_SCHEDULE_LABEL
    const raw = scheduleData.replace('RotateActionJob|', '')
    const parts = raw.split('.')
    if (parts.length === 4) {
        return `${parts[0]} on ${parts[1]} at ${parts[2]} UTC with interval count of ${parts[3]}`
    }
    if (parts.length === 3) {
        return `${parts[0]} at ${parts[1]} UTC with interval count of ${parts[2]}`
    }
    return scheduleData
}

export function formatRotationSchedule(schedule: PAM.IPAMRotationSchedule): string {
    if (schedule.noSchedule === true) return MANUAL_ROTATION_LABEL
    return formatScheduleDataString(schedule.scheduleData)
}

export function rotationStatusName(status: Router.RouterRotationStatus | number | null | undefined): string {
    if (status == null) return ''
    const name = Router.RouterRotationStatus[status as number]
    return typeof name === 'string' ? name : String(status)
}

export function isRotationOnline(status: Router.RouterRotationStatus | number | null | undefined): boolean {
    return rotationStatusName(status) === ROTATION_STATUS_ONLINE
}

export async function decryptPasswordComplexity(
    storage: InMemoryStorage,
    recordUid: string,
    pwdComplexityRaw: string | null | undefined
): Promise<PasswordComplexityDetail | null> {
    if (!pwdComplexityRaw) return null
    const recordKey = await storage.getKeyBytes(recordUid)
    if (!recordKey) return null
    try {
        const plain = await platform.aesGcmDecrypt(normal64Bytes(pwdComplexityRaw), recordKey)
        const parsed = JSON.parse(platform.bytesToString(plain)) as PasswordComplexityDetail
        return parsed && typeof parsed === 'object' ? parsed : null
    } catch {
        return null
    }
}

export function isAdminResourceValid(
    storage: InMemoryStorage,
    resourceUid: string,
    configurationUid: string
): boolean {
    if (!resourceUid || !configurationUid) return false
    if (!recordExistsInVault(storage, resourceUid)) return false
    const configuration = getVaultRecord(storage, configurationUid)
    if (!configuration) return false
    const resources = parsePamResources(configuration).resourceRecordUids
    return resources.includes(resourceUid)
}

function getDefaultScheduleFromPamConfig(record: DRecord): unknown[] | undefined {
    const fields = getRecordFields(record)
    const byLabel = fields.find(
        (field) => field.type === SCHEDULE_FIELD_TYPE && field.label === DEFAULT_ROTATION_SCHEDULE_LABEL
    )
    const field = byLabel || fields.find((entry) => entry.type === SCHEDULE_FIELD_TYPE)
    if (!field?.value?.length) return undefined
    return field.value
}

export function usesDefaultRotationSchedule(
    storage: InMemoryStorage,
    recordUid: string,
    configurationUid: string
): boolean {
    const config = getVaultRecord(storage, configurationUid)
    if (!config) return false
    const defaultSchedule = getDefaultScheduleFromPamConfig(config)
    if (!defaultSchedule) return false

    const cached = storage.getByUid<DRecordRotation>(RECORD_ROTATION_KIND, recordUid)
    if (!cached?.schedule) return false

    let recordSchedule: unknown
    try {
        recordSchedule = JSON.parse(cached.schedule)
    } catch {
        return false
    }
    if (!Array.isArray(recordSchedule) || recordSchedule.length === 0) return false
    return JSON.stringify(recordSchedule) === JSON.stringify(defaultSchedule)
}

export function resolveScheduleEnrichment(
    schedules: readonly PAM.IPAMRotationSchedule[],
    recordUidBytes: Uint8Array
): { scheduleType: RotationScheduleType | null; scheduleData: string | null } {
    for (const schedule of schedules) {
        if (!controllerUidsEqual(schedule.recordUid, recordUidBytes)) continue
        if (schedule.noSchedule === true) {
            return { scheduleType: 'manual', scheduleData: null }
        }
        return {
            scheduleType: 'scheduled',
            scheduleData: schedule.scheduleData || null,
        }
    }
    return { scheduleType: null, scheduleData: null }
}

export function buildPamConfigurationUidSet(storage: InMemoryStorage): Set<string> {
    return new Set(listPamConfigurationRecords(storage).map((record) => record.uid))
}

export function resolvePamConfigDisplay(
    storage: InMemoryStorage,
    configurationUid: string,
    pamConfigUids: Set<string>
): string {
    if (!configurationUid || !pamConfigUids.has(configurationUid)) return NO_CONFIG_FOUND_LABEL

    const [cfgTitle, cfgType] = getVaultRecordTitleType(storage, configurationUid)
    return `${cfgTitle || RECORD_UNTITLED_LABEL} (${cfgType || RECORD_UNKNOWN_TYPE_LABEL})`
}

export function findGatewayByControllerUid(
    controllers: readonly PAM.IPAMController[],
    controllerUid: Uint8Array | null | undefined
): PAM.IPAMController | undefined {
    if (!controllerUid?.length) return undefined
    return controllers.find((controller) => controllerUidsEqual(controller.controllerUid, controllerUid))
}

export function buildOnlineGatewayUidSet(controllers: readonly PAM.IPAMOnlineController[]): Set<string> {
    const online = new Set<string>()
    for (const controller of controllers) {
        const uid = webSafeUidFromBytes(controller.controllerUid)
        if (uid) online.add(uid)
    }
    return online
}

export function resolveGatewayName(controller: PAM.IPAMController | undefined): string {
    return controller?.controllerName || GATEWAY_DOES_NOT_EXIST_LABEL
}

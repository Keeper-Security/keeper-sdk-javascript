import type { Auth } from '@keeper-security/keeperapi'
import { getRotationInfoMessage, normal64Bytes, pamGetRotationSchedulesMessage } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import { toFiniteNumber, webSafeUidFromBytes } from '../gateway/gatewayHelpers'
import { MISSING_VALUE_LABEL, MANUAL_ROTATION_LABEL } from './rotationConstants'
import {
    decryptPasswordComplexity,
    formatScheduleDataString,
    isAdminResourceValid,
    isRotationOnline,
    resolveScheduleEnrichment,
    rotationStatusName,
    usesDefaultRotationSchedule,
} from './rotationHelpers'
import {
    RotationListFormat,
    type GetRotationInfoInput,
    type RotationInfoJsonPayload,
    type RotationInfoResult,
} from './rotationTypes'

export async function getRotationInfo(
    auth: Auth,
    storage: InMemoryStorage,
    input: GetRotationInfoInput
): Promise<RotationInfoResult> {
    const recordUid = input.recordUid?.trim() || ''
    if (!recordUid) {
        throw new KeeperSdkError(
            'Record UID is required for pam rotation info.',
            ResultCodes.PAM_ROTATION_RECORD_REQUIRED
        )
    }

    let recordUidBytes: Uint8Array
    try {
        recordUidBytes = normal64Bytes(recordUid)
    } catch (err) {
        throw new KeeperSdkError(
            `Invalid record UID "${recordUid}": ${extractErrorMessage(err)}`,
            ResultCodes.PAM_ROTATION_RECORD_REQUIRED
        )
    }

    let rotationInfo
    try {
        rotationInfo = await auth.executeRest(getRotationInfoMessage({ uid: recordUidBytes }))
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to get PAM rotation info: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_ROTATION_INFO_FAILED
        )
    }

    const status = rotationStatusName(rotationInfo.status)
    if (!isRotationOnline(rotationInfo.status)) {
        return {
            status,
            readyToRotate: false,
            useDefaultRotationSchedule: false,
            recordUid,
        }
    }

    const pamConfigUid = webSafeUidFromBytes(rotationInfo.configurationUid)
    const gatewayUid = webSafeUidFromBytes(rotationInfo.controllerUid) || MISSING_VALUE_LABEL
    const adminResourceUid = rotationInfo.resourceUid?.length ? webSafeUidFromBytes(rotationInfo.resourceUid) : null
    const passwordComplexity = rotationInfo.pwdComplexity || null
    const passwordComplexityDetail = await decryptPasswordComplexity(storage, recordUid, passwordComplexity)

    let scheduleType = null as RotationInfoResult['scheduleType']
    let scheduleData = null as string | null
    try {
        const schedulesResponse = await auth.executeRouterRest(pamGetRotationSchedulesMessage({}))
        const enrichment = resolveScheduleEnrichment(schedulesResponse.schedules ?? [], recordUidBytes)
        scheduleType = enrichment.scheduleType
        scheduleData = enrichment.scheduleData
    } catch {
        // Schedule enrichment is optional; REST rotation info remains valid without it.
    }

    let scheduleDisplay: string | null = null
    if (scheduleType === 'manual') scheduleDisplay = MANUAL_ROTATION_LABEL
    else if (scheduleType === 'scheduled') scheduleDisplay = formatScheduleDataString(scheduleData)

    return {
        status,
        readyToRotate: true,
        useDefaultRotationSchedule: usesDefaultRotationSchedule(storage, recordUid, pamConfigUid),
        recordUid,
        pamConfigUid,
        nodeId: toFiniteNumber(rotationInfo.nodeId) || undefined,
        gatewayName: rotationInfo.controllerName || MISSING_VALUE_LABEL,
        gatewayUid,
        adminResourceUid,
        adminResourceValid: adminResourceUid ? isAdminResourceValid(storage, adminResourceUid, pamConfigUid) : null,
        passwordComplexity,
        passwordComplexityDetail,
        scheduleType,
        scheduleData,
        scheduleDisplay,
        disabled: rotationInfo.disabled === true,
        scriptName: rotationInfo.scriptName || null,
    }
}

export function formatRotationInfoJson(result: RotationInfoResult): string {
    const payload: RotationInfoJsonPayload = {
        status: result.status,
        ready_to_rotate: result.readyToRotate,
        use_default_rotation_schedule: result.useDefaultRotationSchedule,
    }

    if (!result.readyToRotate) {
        return JSON.stringify(payload, null, 2)
    }

    payload.record_uid = result.recordUid
    payload.pam_config_uid = result.pamConfigUid
    payload.node_id = result.nodeId
    payload.gateway_name = result.gatewayName
    payload.gateway_uid = result.gatewayUid
    payload.admin_resource_uid = result.adminResourceUid ?? null
    payload.admin_resource_valid = result.adminResourceValid ?? null
    payload.password_complexity = result.passwordComplexity ?? null
    payload.password_complexity_detail = result.passwordComplexityDetail ?? null
    payload.schedule_type = result.scheduleType ?? null
    payload.schedule_data = result.scheduleData ?? null
    payload.disabled = result.disabled === true
    payload.script_name = result.scriptName ?? null

    return JSON.stringify(payload, null, 2)
}

function formatPasswordComplexityData(detail: NonNullable<RotationInfoResult['passwordComplexityDetail']>): string {
    const symbolsChars =
        detail.specialChars != null && String(detail.specialChars).trim() !== '' ? String(detail.specialChars) : 'None'
    return [
        `Length: ${detail.length ?? ''}`,
        `Lowercase: ${detail.lowercase ?? ''}`,
        `Uppercase: ${detail.caps ?? ''}`,
        `Digits: ${detail.digits ?? ''}`,
        `Symbols: ${detail.special ?? ''}`,
        `Symbols Chars: ${symbolsChars}`,
    ].join('; ')
}

function formatRotationStatusLine(result: RotationInfoResult): string {
    if (result.readyToRotate || result.status === 'RRS_ONLINE') {
        return 'Ready to rotate (RRS_ONLINE)'
    }
    return result.status || ''
}

function formatScheduleTypeLine(result: RotationInfoResult): string {
    if (result.scheduleType === 'manual') return 'Manual Rotation'
    if (result.scheduleType === 'scheduled') {
        return result.scheduleDisplay || result.scheduleData || 'Scheduled'
    }
    return ''
}

function formatRotationInfoDetail(result: RotationInfoResult): string {
    const rows: Array<[string, string]> = [['Rotation Status', formatRotationStatusLine(result)]]

    if (result.readyToRotate) {
        rows.push(['PAM Config UID', result.pamConfigUid || ''])
        if (result.nodeId != null) rows.push(['Node ID', String(result.nodeId)])
        rows.push(['Gateway Name where the rotation will be performed', result.gatewayName || MISSING_VALUE_LABEL])
        rows.push(['Gateway Uid', result.gatewayUid || MISSING_VALUE_LABEL])
        if (result.adminResourceUid) rows.push(['Admin Resource Uid', result.adminResourceUid])
        if (result.passwordComplexity) rows.push(['Password Complexity', result.passwordComplexity])
        if (result.passwordComplexityDetail) {
            rows.push(['Password Complexity Data', formatPasswordComplexityData(result.passwordComplexityDetail)])
        }
        rows.push(['Is Rotation Disabled', result.disabled ? 'True' : 'False'])

        const scheduleType = formatScheduleTypeLine(result)
        if (scheduleType) rows.push(['Schedule Type', scheduleType])
    }

    const labelWidth = Math.max(...rows.map(([label]) => label.length), 1)
    return rows.map(([label, value]) => `${label.padStart(labelWidth)}: ${value}`).join('\n')
}

export function formatRotationInfoOutput(
    result: RotationInfoResult,
    options: Pick<GetRotationInfoInput, 'format'> = {}
): string {
    const format = String(options.format || RotationListFormat.Table).toLowerCase()
    if (format === RotationListFormat.Json) return formatRotationInfoJson(result)
    return formatRotationInfoDetail(result)
}

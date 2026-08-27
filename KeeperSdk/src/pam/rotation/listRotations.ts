import type { Auth } from '@keeper-security/keeperapi'
import { pamGetOnlineControllersMessage, pamGetRotationSchedulesMessage } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import { fetchEnterprisePamControllers, webSafeUidFromBytes } from '../gateway/gatewayHelpers'
import {
    EMPTY_ROTATION_SCHEDULES_MESSAGE,
    PAM_USER_RECORD_TYPE,
    RECORD_UNKNOWN_TYPE_LABEL,
    RECORD_UNTITLED_LABEL,
    ROTATION_LIST_DEFAULT_HEADERS,
    ROTATION_LIST_VERBOSE_HEADERS,
} from './rotationConstants'
import {
    buildOnlineGatewayUidSet,
    buildPamConfigurationUidSet,
    findGatewayByControllerUid,
    formatRotationSchedule,
    getVaultRecordTitleType,
    recordExistsInVault,
    resolveGatewayName,
    resolvePamConfigDisplay,
} from './rotationHelpers'
import {
    RotationListFormat,
    type FormatRotationSchedulesTableOptions,
    type FormattedRotationSchedulesTable,
    type ListRotationSchedulesOptions,
    type ListRotationSchedulesResult,
    type RenderRotationSchedulesAsciiTableOptions,
    type RotationListRow,
    type RotationScheduleJsonEntry,
    type RotationSchedulesJsonPayload,
} from './rotationTypes'

export async function listRotationSchedules(
    auth: Auth,
    storage: InMemoryStorage,
    _options: ListRotationSchedulesOptions = {}
): Promise<ListRotationSchedulesResult> {
    let schedules
    try {
        const response = await auth.executeRouterRest(pamGetRotationSchedulesMessage({}))
        schedules = response.schedules ?? []
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to list PAM rotation schedules: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_ROTATION_LIST_FAILED
        )
    }

    let allGateways
    let onlineControllers
    try {
        ;[allGateways, onlineControllers] = await Promise.all([
            fetchEnterprisePamControllers(auth, ResultCodes.PAM_ROTATION_LIST_FAILED),
            auth.executeRouterRest(pamGetOnlineControllersMessage()).then((response) => response.controllers ?? []),
        ])
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to list PAM gateways for rotation schedules: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_ROTATION_LIST_FAILED
        )
    }

    const onlineUids = buildOnlineGatewayUidSet(onlineControllers)
    const pamConfigUids = buildPamConfigurationUidSet(storage)
    const rotations: RotationListRow[] = []

    for (const schedule of schedules) {
        const recordUid = webSafeUidFromBytes(schedule.recordUid)
        const configurationUid = webSafeUidFromBytes(schedule.configurationUid)
        const gatewayUid = webSafeUidFromBytes(schedule.controllerUid)
        const [recordTitle, recordType] = getVaultRecordTitleType(storage, recordUid)

        if (recordType !== PAM_USER_RECORD_TYPE) continue

        const gateway = findGatewayByControllerUid(allGateways, schedule.controllerUid)
        rotations.push({
            recordUid,
            recordTitle: recordTitle || RECORD_UNTITLED_LABEL,
            recordType: recordType || RECORD_UNKNOWN_TYPE_LABEL,
            schedule: formatRotationSchedule(schedule),
            gatewayName: resolveGatewayName(gateway),
            gatewayUid,
            gatewayOnline: !!gatewayUid && onlineUids.has(gatewayUid),
            pamConfigDisplay: resolvePamConfigDisplay(storage, configurationUid, pamConfigUids),
            pamConfigurationUid: configurationUid,
            recordAccessible: recordExistsInVault(storage, recordUid),
        })
    }

    rotations.sort((a, b) => (a.recordTitle || '').localeCompare(b.recordTitle || ''))

    return {
        rotations,
        message: rotations.length === 0 ? EMPTY_ROTATION_SCHEDULES_MESSAGE : undefined,
    }
}

export function formatRotationSchedulesTable(
    result: ListRotationSchedulesResult,
    options: FormatRotationSchedulesTableOptions = {}
): FormattedRotationSchedulesTable {
    const verbose = options.verbose === true
    const headers: string[] = [...ROTATION_LIST_DEFAULT_HEADERS]
    if (verbose) headers.push(...ROTATION_LIST_VERBOSE_HEADERS)

    const rows = result.rotations.map((rotation) => {
        const row: string[] = [
            rotation.recordUid,
            rotation.recordTitle,
            rotation.recordType,
            rotation.schedule,
            rotation.gatewayName,
            rotation.gatewayOnline ? 'Online' : 'Offline',
            rotation.pamConfigDisplay,
        ]
        if (verbose) {
            row.push(rotation.gatewayUid, rotation.pamConfigurationUid)
        }
        return row
    })

    return { headers, rows }
}

export function renderRotationSchedulesAsciiTable(
    table: FormattedRotationSchedulesTable,
    options: RenderRotationSchedulesAsciiTableOptions = {}
): string {
    const minColWidth = options.minColWidth ?? 2
    const widths = table.headers.map((header, col) => {
        let width = Math.max(header.length, minColWidth)
        for (const row of table.rows) {
            width = Math.max(width, (row[col] || '').length)
        }
        return width
    })

    const formatRow = (cells: string[]): string =>
        cells
            .map((cell, i) => (cell || '').padEnd(widths[i]))
            .join('  ')
            .trimEnd()

    return [
        formatRow([...table.headers]),
        widths.map((w) => '-'.repeat(w)).join('  '),
        ...table.rows.map(formatRow),
    ].join('\n')
}

function toJsonEntry(rotation: RotationListRow, verbose: boolean): RotationScheduleJsonEntry {
    const entry: RotationScheduleJsonEntry = {
        record_uid: rotation.recordUid,
        record_title: rotation.recordTitle,
        record_type: rotation.recordType,
        schedule: rotation.schedule,
        gateway_name: rotation.gatewayName,
        gateway_online: rotation.gatewayOnline,
        pam_config: rotation.pamConfigDisplay,
        record_accessible: rotation.recordAccessible,
    }
    if (verbose) {
        entry.gateway_uid = rotation.gatewayUid
        entry.pam_configuration_uid = rotation.pamConfigurationUid
    }
    return entry
}

export function formatRotationSchedulesJson(
    result: ListRotationSchedulesResult,
    options: ListRotationSchedulesOptions = {}
): string {
    const verbose = options.verbose === true
    const payload: RotationSchedulesJsonPayload = {
        rotations: result.rotations.map((rotation) => toJsonEntry(rotation, verbose)),
    }
    if (result.message) payload.message = result.message
    return JSON.stringify(payload, null, 2)
}

export function formatRotationSchedulesOutput(
    result: ListRotationSchedulesResult,
    options: ListRotationSchedulesOptions = {}
): string {
    const format = String(options.format || RotationListFormat.Table).toLowerCase()
    if (format === RotationListFormat.Json) return formatRotationSchedulesJson(result, options)

    if (result.message && result.rotations.length === 0) return result.message

    return renderRotationSchedulesAsciiTable(formatRotationSchedulesTable(result, { verbose: options.verbose }))
}

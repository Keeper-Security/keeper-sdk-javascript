import type { Auth, PAM } from '@keeper-security/keeperapi'
import { getControllers, pamGetOnlineControllersMessage } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import { EMPTY_GATEWAYS_MESSAGE, GATEWAY_LIST_DEFAULT_HEADERS, GATEWAY_LIST_VERBOSE_HEADERS } from './gatewayConstants'
import {
    formatTimestampMs,
    getKeeperRouterBaseUrl,
    getKsmApplicationDisplayInfo,
    groupOnlineGatewaysByControllerUid,
    isKeeperRouterConnectionError,
    parseGatewayVersionString,
    toFiniteNumber,
    webSafeUidFromBytes,
} from './gatewayHelpers'
import {
    GatewayListFormat,
    GatewayStatus,
    type FormatGatewaysTableOptions,
    type FormattedGatewaysTable,
    type GatewayCounts,
    type GatewayJsonEntry,
    type GatewayJsonPoolInstance,
    type GatewayListRow,
    type GatewayPoolInstance,
    type GatewayVersionParts,
    type GatewaysJsonPayload,
    type KsmApplicationDisplayInfo,
    type ListGatewaysOptions,
    type ListGatewaysResult,
    type RenderGatewaysAsciiTableOptions,
} from './gatewayTypes'

const EMPTY_VERSION_PARTS = parseGatewayVersionString(undefined)
const EMPTY_GATEWAY_COUNTS: GatewayCounts = { online: 0, offline: 0, total: 0 }

type ControllerListFields = {
    controllerName: string
    deviceName?: string
    deviceToken?: string
    created: number | null
    lastModified: number | null
    nodeId: number | null
}

function emptyListResult(
    partial: Pick<ListGatewaysResult, 'routerDown' | 'routerHost' | 'aborted' | 'message'> & {
        gatewayCounts?: GatewayCounts
    }
): ListGatewaysResult {
    return {
        gateways: [],
        gatewayCounts: partial.gatewayCounts ?? EMPTY_GATEWAY_COUNTS,
        routerDown: partial.routerDown,
        routerHost: partial.routerHost,
        aborted: partial.aborted,
        message: partial.message,
    }
}

function controllerListFields(controller: PAM.IPAMController): ControllerListFields {
    const nodeIdRaw = controller.nodeId == null ? null : toFiniteNumber(controller.nodeId)
    return {
        controllerName: controller.controllerName || '',
        deviceName: controller.deviceName || undefined,
        deviceToken: controller.deviceToken || undefined,
        created: toFiniteNumber(controller.created) || null,
        lastModified: toFiniteNumber(controller.lastModified) || null,
        nodeId: nodeIdRaw || null,
    }
}

async function loadOnlineControllers(
    auth: Auth,
    force: boolean,
    routerHost: string
): Promise<{ controllers: PAM.IPAMOnlineController[]; routerDown: boolean; abort?: ListGatewaysResult }> {
    try {
        const response = await auth.executeRouterRest(pamGetOnlineControllersMessage())
        return { controllers: response.controllers ?? [], routerDown: false }
    } catch (err) {
        if (!isKeeperRouterConnectionError(err)) {
            throw new KeeperSdkError(
                `Unhandled error during retrieval of connected gateways: ${extractErrorMessage(err)}`,
                ResultCodes.PAM_GATEWAY_LIST_FAILED
            )
        }
        if (!force) {
            return {
                controllers: [],
                routerDown: true,
                abort: emptyListResult({
                    routerDown: true,
                    routerHost,
                    aborted: true,
                    message: `Looks like router is down. Use force (-f) to retrieve gateways associated with your enterprise. Router URL [${routerHost}]`,
                }),
            }
        }
        return { controllers: [], routerDown: true }
    }
}

async function loadEnterpriseControllers(auth: Auth): Promise<PAM.IPAMController[]> {
    try {
        const response = await auth.executeRest(getControllers())
        return response.controllers ?? []
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to list enterprise gateways: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_GATEWAY_LIST_FAILED
        )
    }
}

function resolveConnectivityStatus(routerDown: boolean, connectedCount: number): GatewayListRow['status'] {
    if (routerDown) return GatewayStatus.Unknown
    if (connectedCount === 0) return GatewayStatus.Offline
    if (connectedCount === 1) return GatewayStatus.Online
    return `${GatewayStatus.Online} (${connectedCount} instances)`
}

function toPoolInstances(connectedInstances: PAM.IPAMOnlineController[]): GatewayPoolInstance[] {
    return connectedInstances.map((instance, index) => {
        const versionParts = parseGatewayVersionString(instance.version)
        const connectedOn = toFiniteNumber(instance.connectedOn)
        return {
            instanceNumber: index + 1,
            status: GatewayStatus.Online,
            gatewayVersion: versionParts.gatewayVersion,
            ipAddress: instance.ipAddress || '',
            connectedOn: connectedOn || undefined,
            connectedOnDisplay: connectedOn ? formatTimestampMs(connectedOn) : '',
            os: versionParts.os || undefined,
            osRelease: versionParts.osRelease || undefined,
            machineType: versionParts.machineType || undefined,
            osVersion: versionParts.osVersion || undefined,
        }
    })
}

function toPoolInstanceRows(poolInstances: GatewayPoolInstance[]): GatewayListRow[] {
    return poolInstances.map((instance) => ({
        ksmApplicationName: null,
        ksmApplicationUid: '',
        ksmApplicationAccessible: false,
        ksmApplicationDisplay: '',
        gatewayName: `|- Instance ${instance.instanceNumber} (connected: ${instance.connectedOnDisplay || ''})`,
        gatewayUid: instance.ipAddress,
        status: GatewayStatus.Online,
        gatewayVersion: instance.gatewayVersion,
        os: instance.os,
        osRelease: instance.osRelease,
        machineType: instance.machineType,
        osVersion: instance.osVersion,
        isPoolInstanceRow: true,
        poolInstanceConnectedOnDisplay: instance.connectedOnDisplay,
    }))
}

function buildGatewayListRow(args: {
    fields: ControllerListFields
    gatewayUid: string
    ksmApplicationUid: string
    ksmApplication: KsmApplicationDisplayInfo
    status: GatewayListRow['status']
    gatewayVersion: string
    verbose: boolean
    versionParts: GatewayVersionParts
}): GatewayListRow {
    const { fields, ksmApplication, verbose, versionParts } = args
    const row: GatewayListRow = {
        ksmApplicationName: ksmApplication.name,
        ksmApplicationUid: args.ksmApplicationUid,
        ksmApplicationAccessible: ksmApplication.accessible,
        ksmApplicationDisplay: ksmApplication.display,
        gatewayName: fields.controllerName,
        gatewayUid: args.gatewayUid,
        status: args.status,
        gatewayVersion: args.gatewayVersion,
    }

    if (verbose) {
        row.deviceName = fields.deviceName || ''
        row.deviceToken = fields.deviceToken || ''
        row.createdOn = formatTimestampMs(fields.created)
        row.lastModified = formatTimestampMs(fields.lastModified)
        row.nodeId = fields.nodeId == null ? undefined : fields.nodeId
        row.os = versionParts.os || undefined
        row.osRelease = versionParts.osRelease || undefined
        row.machineType = versionParts.machineType || undefined
        row.osVersion = versionParts.osVersion || undefined
    }

    return row
}

function sortGatewayListRows(gateways: GatewayListRow[]): GatewayListRow[] {
    const groups: GatewayListRow[][] = []
    let current: GatewayListRow[] = []

    for (const row of gateways) {
        if (!row.isPoolInstanceRow) {
            if (current.length) groups.push(current)
            current = [row]
        } else {
            current.push(row)
        }
    }
    if (current.length) groups.push(current)

    groups.sort((a, b) => {
        const statusCmp = (a[0].status || '').localeCompare(b[0].status || '')
        if (statusCmp !== 0) return statusCmp
        return (a[0].ksmApplicationDisplay || '')
            .toLowerCase()
            .localeCompare((b[0].ksmApplicationDisplay || '').toLowerCase())
    })

    return groups.flat()
}

function appendOsFields(
    target: { os?: string; os_release?: string; machine_type?: string; os_version?: string },
    source: { os?: string; osRelease?: string; machineType?: string; osVersion?: string }
): void {
    target.os = source.os || ''
    target.os_release = source.osRelease || ''
    target.machine_type = source.machineType || ''
    target.os_version = source.osVersion || ''
}

export async function listGateways(
    auth: Auth,
    storage: InMemoryStorage,
    options: ListGatewaysOptions = {}
): Promise<ListGatewaysResult> {
    const force = options.force === true
    const verbose = options.verbose === true
    const onlineOnly = options.onlineOnly === true
    const routerHost = getKeeperRouterBaseUrl(String(auth.options.host || ''))

    const online = await loadOnlineControllers(auth, force, routerHost)
    if (online.abort) return online.abort

    const enterpriseControllers = await loadEnterpriseControllers(auth)
    if (!enterpriseControllers.length) {
        return emptyListResult({
            routerDown: online.routerDown,
            routerHost,
            aborted: false,
            message: EMPTY_GATEWAYS_MESSAGE,
        })
    }

    const connectedByUid = groupOnlineGatewaysByControllerUid(online.controllers)
    const gatewayCounts: GatewayCounts = {
        online: 0,
        offline: 0,
        total: enterpriseControllers.length,
    }
    const gateways: GatewayListRow[] = []

    for (const controller of enterpriseControllers) {
        const gatewayUid = webSafeUidFromBytes(controller.controllerUid)
        const connectedInstances = connectedByUid.get(gatewayUid) ?? []
        const isOnline = !online.routerDown && connectedInstances.length > 0

        if (!online.routerDown) {
            if (isOnline) gatewayCounts.online += 1
            else gatewayCounts.offline += 1
        }

        if (onlineOnly && !isOnline) continue

        const ksmApplicationUid = webSafeUidFromBytes(controller.applicationUid)
        const ksmApplication = getKsmApplicationDisplayInfo(storage, ksmApplicationUid)
        const fields = controllerListFields(controller)
        const status = resolveConnectivityStatus(online.routerDown, connectedInstances.length)
        const isPool = connectedInstances.length > 1

        if (!isPool) {
            const versionParts = parseGatewayVersionString(connectedInstances[0]?.version)
            gateways.push(
                buildGatewayListRow({
                    fields,
                    gatewayUid,
                    ksmApplicationUid,
                    ksmApplication,
                    status,
                    gatewayVersion: versionParts.gatewayVersion,
                    verbose,
                    versionParts,
                })
            )
            continue
        }

        const poolInstances = toPoolInstances(connectedInstances)
        const parent = buildGatewayListRow({
            fields,
            gatewayUid,
            ksmApplicationUid,
            ksmApplication,
            status,
            gatewayVersion: '',
            verbose,
            versionParts: EMPTY_VERSION_PARTS,
        })
        parent.poolInstances = poolInstances
        gateways.push(parent, ...toPoolInstanceRows(poolInstances))
    }

    return {
        gateways: sortGatewayListRows(gateways),
        routerDown: online.routerDown,
        routerHost,
        gatewayCounts,
        aborted: false,
    }
}

export function formatGatewaysTable(
    result: ListGatewaysResult,
    options: FormatGatewaysTableOptions = {}
): FormattedGatewaysTable {
    const verbose = options.verbose === true
    const headers: string[] = [...GATEWAY_LIST_DEFAULT_HEADERS]
    if (verbose) headers.push(...GATEWAY_LIST_VERBOSE_HEADERS)

    const rows = result.gateways.map((gateway) => {
        const isInstance = gateway.isPoolInstanceRow === true
        const row: string[] = [
            isInstance ? '' : gateway.ksmApplicationDisplay,
            gateway.gatewayName,
            gateway.gatewayUid,
            gateway.status,
            gateway.gatewayVersion,
        ]
        if (verbose) {
            row.push(
                isInstance ? '' : gateway.deviceName || '',
                isInstance ? '' : gateway.deviceToken || '',
                isInstance ? gateway.poolInstanceConnectedOnDisplay || '' : gateway.createdOn || '',
                isInstance ? '' : gateway.lastModified || '',
                isInstance ? '' : gateway.nodeId != null ? String(gateway.nodeId) : '',
                gateway.os || '',
                gateway.osRelease || '',
                gateway.machineType || '',
                gateway.osVersion || ''
            )
        }
        return row
    })

    return { headers, rows }
}

export function renderGatewaysAsciiTable(
    table: FormattedGatewaysTable,
    options: RenderGatewaysAsciiTableOptions = {}
): string {
    const minColWidth = options.minColWidth ?? 2
    const widths = table.headers.map((header, col) => {
        let width = Math.max(header.length, minColWidth)
        for (const row of table.rows) {
            width = Math.max(width, (row[col] || '').length)
        }
        return width
    })

    const formatRow = (cells: string[]): string => cells.map((cell, i) => (cell || '').padEnd(widths[i])).join('  ')

    return [
        formatRow([...table.headers]),
        widths.map((w) => '-'.repeat(w)).join('  '),
        ...table.rows.map(formatRow),
    ].join('\n')
}

export function formatGatewaysJson(result: ListGatewaysResult, options: ListGatewaysOptions = {}): string {
    const verbose = options.verbose === true
    const onlineOnly = options.onlineOnly === true

    const gateways: GatewayJsonEntry[] = result.gateways
        .filter((g) => !g.isPoolInstanceRow)
        .map((g) => {
            const entry: GatewayJsonEntry = {
                ksm_app_name: g.ksmApplicationName,
                ksm_app_uid: g.ksmApplicationUid,
                ksm_app_accessible: g.ksmApplicationAccessible,
                gateway_name: g.gatewayName,
                gateway_uid: g.gatewayUid,
                status: g.status,
            }

            if (g.poolInstances?.length) {
                entry.instances = g.poolInstances.map((instance): GatewayJsonPoolInstance => {
                    const inst: GatewayJsonPoolInstance = {
                        instance_number: instance.instanceNumber,
                        status: instance.status,
                        gateway_version: instance.gatewayVersion,
                        ip_address: instance.ipAddress,
                        connected_on: instance.connectedOn,
                    }
                    if (verbose) appendOsFields(inst, instance)
                    return inst
                })
            } else {
                entry.gateway_version = g.gatewayVersion
            }

            if (verbose) {
                entry.device_name = g.deviceName || ''
                entry.device_token = g.deviceToken || ''
                entry.created_on = g.createdOn || ''
                entry.last_modified = g.lastModified || ''
                entry.node_id = g.nodeId
                if (!g.poolInstances?.length) appendOsFields(entry, g)
            }
            return entry
        })

    const payload: GatewaysJsonPayload = { gateways }
    if (verbose) payload.router_host = result.routerHost
    if (onlineOnly) payload.gateway_counts = result.gatewayCounts
    if (result.message) payload.message = result.message

    return JSON.stringify(payload, null, 2)
}

export function formatGatewaysOutput(result: ListGatewaysResult, options: ListGatewaysOptions = {}): string {
    const format = String(options.format || GatewayListFormat.Table).toLowerCase()
    if (format === GatewayListFormat.Json) return formatGatewaysJson(result, options)

    const parts: string[] = []
    if (options.verbose) parts.push(`Router Host: ${result.routerHost}`, '')
    if (result.message && result.gateways.length === 0) {
        parts.push(result.message)
        return parts.join('\n')
    }
    parts.push(renderGatewaysAsciiTable(formatGatewaysTable(result, { verbose: options.verbose })))
    if (options.onlineOnly) {
        const { online, offline, total } = result.gatewayCounts
        parts.push('', `Gateways: Online: ${online}, Offline: ${offline}, Total: ${total}`)
    }
    return parts.join('\n')
}

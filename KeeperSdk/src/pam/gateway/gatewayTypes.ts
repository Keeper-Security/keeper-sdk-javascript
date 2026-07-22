import type { DRecord } from '@keeper-security/keeperapi'

export enum GatewayListFormat {
    Table = 'table',
    Json = 'json',
}

export type GatewayListFormatInput = GatewayListFormat | `${GatewayListFormat}`

export enum GatewayStatus {
    Online = 'ONLINE',
    Offline = 'OFFLINE',
    Unknown = 'UNKNOWN',
}

/** Connectivity label; pool gateways use values like `ONLINE (2 instances)`. */
export type GatewayConnectivityStatus = GatewayStatus | `${typeof GatewayStatus.Online} (${number} instances)`

export enum GatewayConfigInitFormat {
    Json = 'json',
    B64 = 'b64',
}

export type GatewayConfigInitFormatInput = GatewayConfigInitFormat | `${GatewayConfigInitFormat}`

export type ListGatewaysOptions = {
    force?: boolean
    verbose?: boolean
    format?: GatewayListFormatInput
    onlineOnly?: boolean
}

export type GatewayCounts = {
    online: number
    offline: number
    total: number
}

export type GatewayOsMetadata = {
    os: string
    osRelease: string
    machineType: string
    osVersion: string
}

export type GatewayVersionParts = GatewayOsMetadata & {
    gatewayVersion: string
}

export type GatewayPoolInstance = GatewayOsMetadata & {
    instanceNumber: number
    status: typeof GatewayStatus.Online
    gatewayVersion: string
    ipAddress: string
    connectedOn?: number
    connectedOnDisplay?: string
}

/** One list row; pool instance rows set `isPoolInstanceRow: true`. */
export type GatewayListRow = {
    ksmApplicationName: string | null
    ksmApplicationUid: string
    ksmApplicationAccessible: boolean
    ksmApplicationDisplay: string
    gatewayName: string
    gatewayUid: string
    status: GatewayConnectivityStatus | string
    gatewayVersion: string
    deviceName?: string
    deviceToken?: string
    createdOn?: string
    lastModified?: string
    nodeId?: number
    os?: string
    osRelease?: string
    machineType?: string
    osVersion?: string
    poolInstances?: GatewayPoolInstance[]
    isPoolInstanceRow?: boolean
    poolInstanceConnectedOnDisplay?: string
}

export type ListGatewaysResult = {
    gateways: GatewayListRow[]
    routerDown: boolean
    routerHost: string
    gatewayCounts: GatewayCounts
    aborted: boolean
    message?: string
}

export type FormattedGatewaysTable = {
    headers: string[]
    rows: string[][]
}

export type FormatGatewaysTableOptions = {
    verbose?: boolean
}

export type RenderGatewaysAsciiTableOptions = {
    minColWidth?: number
}

export type KsmApplicationDisplayInfo = {
    name: string | null
    accessible: boolean
    display: string
}

export type ResolvedKsmApplication = {
    uid: string
    title: string
    record: DRecord
    recordKey: Uint8Array
}

export type CreateGatewayInput = {
    name: string
    application: string
    tokenExpiresInMin?: number
    configInit?: GatewayConfigInitFormatInput
    returnValue?: boolean
}

export type CreateGatewayResult = {
    success: boolean
    gatewayName: string
    applicationUid: string
    applicationTitle: string | null
    tokenOrConfig: string
    isInitializedConfig: boolean
    configInit?: GatewayConfigInitFormat
    tokenExpiresInMin: number
    tokenExpiresOn: string
    deviceToken?: string
    message: string
}

export type EditGatewayInput = {
    gatewayUidOrName: string
    name?: string | null
    nodeIdOrName?: string | number | null
}

export type EditGatewayResult = {
    success: boolean
    gatewayUid: string
    previousName: string
    gatewayName: string
    previousNodeId: number
    nodeId: number
    nameChanged: boolean
    nodeChanged: boolean
    message: string
}

export type GatewayJsonPoolInstance = {
    instance_number: number
    status: typeof GatewayStatus.Online
    gateway_version: string
    ip_address: string
    connected_on?: number
    os?: string
    os_release?: string
    machine_type?: string
    os_version?: string
}

export type GatewayJsonEntry = {
    ksm_app_name: string | null
    ksm_app_uid: string
    ksm_app_accessible: boolean
    gateway_name: string
    gateway_uid: string
    status: string
    gateway_version?: string
    instances?: GatewayJsonPoolInstance[]
    device_name?: string
    device_token?: string
    created_on?: string
    last_modified?: string
    node_id?: number
    os?: string
    os_release?: string
    machine_type?: string
    os_version?: string
}

export type GatewaysJsonPayload = {
    gateways: GatewayJsonEntry[]
    router_host?: string
    gateway_counts?: GatewayCounts
    message?: string
}

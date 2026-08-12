export { GatewayManager } from './GatewayManager'
export type { AuthProvider } from './GatewayManager'

export {
    listGateways,
    formatGatewaysTable,
    renderGatewaysAsciiTable,
    formatGatewaysJson,
    formatGatewaysOutput,
} from './listGateways'

export { createGateway } from './createGateway'
export { editGateway } from './editGateway'
export { removeGateway } from './removeGateway'
export { setGatewayMaxInstances } from './setGatewayMaxInstances'

export { GatewayListFormat, GatewayStatus, GatewayConfigInitFormat } from './gatewayTypes'
export type {
    GatewayListFormatInput,
    GatewayConfigInitFormatInput,
    GatewayConnectivityStatus,
    ListGatewaysOptions,
    GatewayCounts,
    GatewayOsMetadata,
    GatewayVersionParts,
    GatewayPoolInstance,
    GatewayListRow,
    ListGatewaysResult,
    FormattedGatewaysTable,
    FormatGatewaysTableOptions,
    RenderGatewaysAsciiTableOptions,
    KsmApplicationDisplayInfo,
    ResolvedKsmApplication,
    CreateGatewayInput,
    CreateGatewayResult,
    EditGatewayInput,
    EditGatewayResult,
    RemoveGatewayInput,
    RemoveGatewayResult,
    SetGatewayMaxInstancesInput,
    SetGatewayMaxInstancesResult,
    GatewayJsonPoolInstance,
    GatewayJsonEntry,
    GatewaysJsonPayload,
} from './gatewayTypes'

export {
    KSM_APP_RECORD_VERSION,
    SUPPORTED_KSM_APP_RECORD_VERSIONS,
    APP_NOT_ACCESSIBLE_LABEL,
    KSM_CLIENT_ID_MESSAGE,
    DEFAULT_GATEWAY_TOKEN_EXPIRES_IN_MIN,
    MAX_GATEWAY_TOKEN_EXPIRES_IN_MIN,
    MIN_GATEWAY_MAX_INSTANCES,
    MAX_GATEWAY_MAX_INSTANCES,
    EMPTY_GATEWAYS_MESSAGE,
    GATEWAY_LIST_DEFAULT_HEADERS,
    GATEWAY_LIST_VERBOSE_HEADERS,
} from './gatewayConstants'
export type { KsmAppRecordVersion } from './gatewayConstants'

export {
    getKeeperRouterBaseUrl,
    webSafeUidFromBytes,
    controllerUidsEqual,
    toFiniteNumber,
    formatTimestampMs,
    parseGatewayVersionString,
    getKsmApplicationDisplayInfo,
    resolveKsmApplication,
    getKeeperRegionAbbreviation,
    formatGatewayOneTimeToken,
    findEnterpriseGatewayByUidOrName,
    requireEnterpriseGatewayByUidOrName,
    fetchEnterprisePamControllers,
    groupOnlineGatewaysByControllerUid,
    isKeeperRouterConnectionError,
} from './gatewayHelpers'

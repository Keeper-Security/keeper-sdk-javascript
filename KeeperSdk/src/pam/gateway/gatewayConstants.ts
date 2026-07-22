export const KSM_APP_RECORD_VERSION = 5

export const APP_NOT_ACCESSIBLE_LABEL = '[APP NOT ACCESSIBLE OR DELETED]' as const

export const KSM_CLIENT_ID_MESSAGE = 'KEEPER_SECRETS_MANAGER_CLIENT_ID' as const

export const DEFAULT_GATEWAY_TOKEN_EXPIRES_IN_MIN = 60
export const MAX_GATEWAY_TOKEN_EXPIRES_IN_MIN = 1440

export const EMPTY_GATEWAYS_MESSAGE =
    'This Enterprise does not have Gateways yet. To create a new Gateway, use `pam gateway new`. NOTE: If you have added a new Gateway, you might still need to initialize it before it is listed.' as const

export const GATEWAY_LIST_DEFAULT_HEADERS = [
    'KSM Application Name (UID)',
    'Gateway Name',
    'Gateway UID',
    'Status',
    'Gateway Version',
] as const

export const GATEWAY_LIST_VERBOSE_HEADERS = [
    'Device Name',
    'Device Token',
    'Created On',
    'Last Modified',
    'Node ID',
    'OS',
    'OS Release',
    'Machine Type',
    'OS Version',
] as const

export const ROUTER_CONNECTION_ERROR_CODES = [
    'ECONNREFUSED',
    'ENOTFOUND',
    'ETIMEDOUT',
    'ECONNRESET',
    'ENETUNREACH',
] as const

export type RouterConnectionErrorCode = (typeof ROUTER_CONNECTION_ERROR_CODES)[number]

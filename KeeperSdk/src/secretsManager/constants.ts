import { Authentication, Enterprise } from '@keeper-security/keeperapi'

export const SECRETS_MANAGER_APP_LIST_HEADERS = [
    'App name',
    'App UID',
    'Records',
    'Folders',
    'Devices',
    'Last Access',
] as const

export const SECRETS_MANAGER_APP_CLIENT_TYPES: ReadonlySet<Enterprise.AppClientType> = new Set([
    Enterprise.AppClientType.GENERAL,
    Enterprise.AppClientType.DISCOVERY_AND_ROTATION_CONTROLLER,
    Enterprise.AppClientType.KCM_CONTROLLER,
])

export const SECRETS_MANAGER_APP_SHARE_TYPE_LABELS: Readonly<
    Record<Authentication.ApplicationShareType, 'RECORD' | 'FOLDER'>
> = {
    [Authentication.ApplicationShareType.SHARE_TYPE_RECORD]: 'RECORD',
    [Authentication.ApplicationShareType.SHARE_TYPE_FOLDER]: 'FOLDER',
}

export const SECRETS_MANAGER_APP_DETAILS_TITLE = 'Secrets Manager Application'
export const SECRETS_MANAGER_APP_NO_CLIENTS_MESSAGE = 'No client devices registered for this Application'
export const SECRETS_MANAGER_APP_NO_SHARES_MESSAGE = 'There are no shared secrets to this application'
export const SECRETS_MANAGER_APP_CLIENT_ID_LENGTH = 8

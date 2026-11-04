export const KSM_APP_RECORD_TYPE = 'app' as const

export const RECORD_UPDATE_COMMAND = 'record_update' as const

export const RECORD_DELETE_SUCCESS_STATUS = 'success' as const

export const MIN_SHORT_CLIENT_ID_LENGTH = 8

export const DEFAULT_MIN_COLUMN_WIDTH = 2

export const NEVER_LABEL = 'Never' as const

export const EMPTY_SECRETS_MANAGER_APPS_MESSAGE = 'No Applications to list.' as const

export const NO_CLIENT_DEVICES_MESSAGE = 'No client devices registered for this Application' as const

export const NO_APP_SHARES_MESSAGE = 'No shared folders or records' as const

export const APP_NOT_IN_LOCAL_VAULT_LABEL = '[NOT IN LOCAL VAULT]' as const

export const APP_REMOVAL_CANCELLED_MESSAGE = 'Application removal cancelled.' as const

export const SECRETS_MANAGER_APP_LIST_HEADERS = [
    'App Name',
    'App UID',
    'Records',
    'Folders',
    'Devices',
    'Last Access',
] as const

export const SECRETS_MANAGER_APP_USER_HEADERS = ['Username', 'Role', 'Share Admin', 'Shareable', 'Editable'] as const

export const SECRETS_MANAGER_APP_SHARE_HEADERS = ['Type', 'UID', 'Title', 'Permissions'] as const

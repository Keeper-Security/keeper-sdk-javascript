export const SdkDefaults = {
    CLIENT_VERSION: 'c17.0.0',
    DEVICE_NAME: 'JavaScript Keeper SDK',
    CONFIG_DIR: '.keeper',
    LOG_FORMAT: '!',
} as const

export const AuthDefaults = {
    MAX_LOGIN_ATTEMPTS: 5,
    APPROVAL_TIMEOUT_MS: 60_000,
    CODE_VALIDATION_DELAY_MS: 2_000,
} as const

export const ResultCodes = {
    INVALID_CREDENTIALS: 'invalid_credentials',
    MISSING_USERNAME: 'missing_username',
    MISSING_PASSWORD: 'missing_password',
    MAX_ATTEMPTS_EXCEEDED: 'max_attempts_exceeded',
    USER_CANCELLED: 'user_cancelled',
    NOT_LOGGED_IN: 'not_logged_in',
    DEVICE_NOT_REGISTERED: 'device_not_registered',
    NO_PREVIOUS_LOGIN: 'no_previous_login',
    NO_CLONE_CODE: 'no_clone_code',
    PERSISTENT_LOGIN_FAILED: 'persistent_login_failed',
    SESSION_TOKEN_EXPIRED: 'session_token_expired',
    UNSUPPORTED_2FA_CHANNEL: 'unsupported_2fa_channel',
} as const

export const KEEPER_PUBLIC_HOSTS: Record<string, string> = {
    US: 'keepersecurity.com',
    EU: 'keepersecurity.eu',
    AU: 'keepersecurity.com.au',
    CA: 'keepersecurity.ca',
    JP: 'keepersecurity.jp',
    GOV: 'govcloud.keepersecurity.us',
}

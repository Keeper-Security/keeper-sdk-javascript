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

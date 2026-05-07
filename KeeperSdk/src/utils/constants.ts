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

export enum AuthErrorCode {
    InvalidCredentials = 'invalid_credentials',
    MissingUsername = 'missing_username',
    MissingPassword = 'missing_password',
    MaxAttemptsExceeded = 'max_attempts_exceeded',
    UserCancelled = 'user_cancelled',
    Unsupported2FAChannel = 'unsupported_2fa_channel',
}

export enum SessionErrorCode {
    NotLoggedIn = 'not_logged_in',
    DeviceNotRegistered = 'device_not_registered',
    NoPreviousLogin = 'no_previous_login',
    NoCloneCode = 'no_clone_code',
    PersistentLoginFailed = 'persistent_login_failed',
    SessionTokenExpired = 'session_token_expired',
}

export enum TeamErrorCode {
    TeamRequired = 'team_required',
    TeamNotFound = 'team_not_found',
    MultipleTeamMatches = 'multiple_team_matches',
}

export const ResultCodes = {
    INVALID_CREDENTIALS: AuthErrorCode.InvalidCredentials,
    MISSING_USERNAME: AuthErrorCode.MissingUsername,
    MISSING_PASSWORD: AuthErrorCode.MissingPassword,
    MAX_ATTEMPTS_EXCEEDED: AuthErrorCode.MaxAttemptsExceeded,
    USER_CANCELLED: AuthErrorCode.UserCancelled,
    UNSUPPORTED_2FA_CHANNEL: AuthErrorCode.Unsupported2FAChannel,
    NOT_LOGGED_IN: SessionErrorCode.NotLoggedIn,
    DEVICE_NOT_REGISTERED: SessionErrorCode.DeviceNotRegistered,
    NO_PREVIOUS_LOGIN: SessionErrorCode.NoPreviousLogin,
    NO_CLONE_CODE: SessionErrorCode.NoCloneCode,
    PERSISTENT_LOGIN_FAILED: SessionErrorCode.PersistentLoginFailed,
    SESSION_TOKEN_EXPIRED: SessionErrorCode.SessionTokenExpired,
    TEAM_REQUIRED: TeamErrorCode.TeamRequired,
    TEAM_NOT_FOUND: TeamErrorCode.TeamNotFound,
    MULTIPLE_TEAM_MATCHES: TeamErrorCode.MultipleTeamMatches,
} as const

export const KEEPER_PUBLIC_HOSTS: Record<string, string> = {
    US: 'keepersecurity.com',
    EU: 'keepersecurity.eu',
    AU: 'keepersecurity.com.au',
    CA: 'keepersecurity.ca',
    JP: 'keepersecurity.jp',
    GOV: 'govcloud.keepersecurity.us',
}

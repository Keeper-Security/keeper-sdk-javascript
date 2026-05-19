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
    NoTeamsToAdd = 'no_teams_to_add',
    NoTeamsToUpdate = 'no_teams_to_update',
    NoTeamsToDelete = 'no_teams_to_delete',
    ParentNodeRequired = 'parent_node_required',
    ParentNodeNotFound = 'parent_node_not_found',
    MultipleParentNodeMatches = 'multiple_parent_node_matches',
    EnterprisePublicKeyMissing = 'enterprise_public_key_missing',
    EnterpriseTreeKeyUnavailable = 'enterprise_tree_key_unavailable',
    DataKeyMissing = 'data_key_missing',
    TeamAddFailed = 'team_add_failed',
    TeamUpdateFailed = 'team_update_failed',
    TeamDeleteFailed = 'team_delete_failed',
    MultipleTeamRenameNotAllowed = 'multiple_team_rename_not_allowed',
    QueuedTeamNotFound = 'queued_team_not_found',
    TeamNameTooLong = 'team_name_too_long',
}

export enum UserErrorCode {
    NoUsersToUpdate = 'no_users_to_update',
    NoUsersToAdd = 'no_users_to_add',
    NoUsersToDelete = 'no_users_to_delete',
    UserNotFound = 'user_not_found',
    MultipleUserMatches = 'multiple_user_matches',
    UserAddFailed = 'user_add_failed',
    UserUpdateFailed = 'user_update_failed',
    UserDeleteFailed = 'user_delete_failed',
    RoleNotFound = 'role_not_found',
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
    NO_TEAMS_TO_ADD: TeamErrorCode.NoTeamsToAdd,
    NO_TEAMS_TO_UPDATE: TeamErrorCode.NoTeamsToUpdate,
    NO_TEAMS_TO_DELETE: TeamErrorCode.NoTeamsToDelete,
    PARENT_NODE_REQUIRED: TeamErrorCode.ParentNodeRequired,
    PARENT_NODE_NOT_FOUND: TeamErrorCode.ParentNodeNotFound,
    MULTIPLE_PARENT_NODE_MATCHES: TeamErrorCode.MultipleParentNodeMatches,
    ENTERPRISE_PUBLIC_KEY_MISSING: TeamErrorCode.EnterprisePublicKeyMissing,
    ENTERPRISE_TREE_KEY_UNAVAILABLE: TeamErrorCode.EnterpriseTreeKeyUnavailable,
    DATA_KEY_MISSING: TeamErrorCode.DataKeyMissing,
    TEAM_ADD_FAILED: TeamErrorCode.TeamAddFailed,
    TEAM_UPDATE_FAILED: TeamErrorCode.TeamUpdateFailed,
    TEAM_DELETE_FAILED: TeamErrorCode.TeamDeleteFailed,
    MULTIPLE_TEAM_RENAME_NOT_ALLOWED: TeamErrorCode.MultipleTeamRenameNotAllowed,
    QUEUED_TEAM_NOT_FOUND: TeamErrorCode.QueuedTeamNotFound,
    TEAM_NAME_TOO_LONG: TeamErrorCode.TeamNameTooLong,
    NO_USERS_TO_UPDATE: UserErrorCode.NoUsersToUpdate,
    NO_USERS_TO_ADD: UserErrorCode.NoUsersToAdd,
    NO_USERS_TO_DELETE: UserErrorCode.NoUsersToDelete,
    USER_NOT_FOUND: UserErrorCode.UserNotFound,
    MULTIPLE_USER_MATCHES: UserErrorCode.MultipleUserMatches,
    USER_ADD_FAILED: UserErrorCode.UserAddFailed,
    USER_UPDATE_FAILED: UserErrorCode.UserUpdateFailed,
    USER_DELETE_FAILED: UserErrorCode.UserDeleteFailed,
    ROLE_NOT_FOUND: UserErrorCode.RoleNotFound,
} as const

export const KEEPER_PUBLIC_HOSTS: Record<string, string> = {
    US: 'keepersecurity.com',
    EU: 'keepersecurity.eu',
    AU: 'keepersecurity.com.au',
    CA: 'keepersecurity.ca',
    JP: 'keepersecurity.jp',
    GOV: 'govcloud.keepersecurity.us',
}

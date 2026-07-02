const DEFAULT_CLIENT_VERSION = 'c18.0.0'
const DEFAULT_DEVICE_NAME = 'JavaScript Keeper SDK'
const DEFAULT_CONFIG_DIR = '.keeper'
const DEFAULT_LOG_FORMAT = '!'

export const SdkDefaults = {
    CLIENT_VERSION: DEFAULT_CLIENT_VERSION,
    DEVICE_NAME: DEFAULT_DEVICE_NAME,
    CONFIG_DIR: DEFAULT_CONFIG_DIR,
    LOG_FORMAT: DEFAULT_LOG_FORMAT,
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

export enum ValidationErrorCode {
    InvalidPattern = 'invalid_pattern',
}

export enum RoleErrorCode {
    RoleRequired = 'role_required',
    RoleNotFound = 'role_not_found',
    MultipleRoleMatches = 'multiple_role_matches',
    NoRolesToAdd = 'no_roles_to_add',
    NoRolesToUpdate = 'no_roles_to_update',
    NoRolesToDelete = 'no_roles_to_delete',
    RoleAddFailed = 'role_add_failed',
    RoleUpdateFailed = 'role_update_failed',
    RoleDeleteFailed = 'role_delete_failed',
    RoleIdAllocationFailed = 'role_id_allocation_failed',
    RoleRenameMultiNotAllowed = 'role_rename_multi_not_allowed',
    RoleNameEmpty = 'role_name_empty',
    RoleEnforcementFailed = 'role_enforcement_failed',
}

export enum NsfErrorCode {
    NotFound = 'nsf_not_found',
    MultipleMatches = 'nsf_multiple_matches',
    LegacyRecord = 'nsf_legacy_record',
    LegacyFolder = 'nsf_legacy_folder',
    PermissionDenied = 'nsf_permission_denied',
    LinkFailed = 'nsf_link_failed',
    RemoveFailed = 'nsf_remove_failed',
    FolderRequired = 'nsf_folder_required',
    TooManyRecords = 'nsf_too_many_records',
    MissingKey = 'nsf_missing_key',
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

export enum AuditReportErrorCode {
    InvalidReportType = 'audit_invalid_report_type',
    InvalidCreatedFilter = 'audit_invalid_created_filter',
    InvalidFilter = 'audit_invalid_filter',
    InvalidLimit = 'audit_invalid_limit',
    ColumnsRequired = 'audit_columns_required',
    DimensionColumnRequired = 'audit_dimension_column_required',
    DimensionFailed = 'audit_dimension_failed',
    ReportFailed = 'audit_report_failed',
    ReportingNotEnabled = 'audit_reporting_not_enabled',
    LicenseCheckFailed = 'audit_license_check_failed',
}

export enum ActionReportErrorCode {
    ReportFailed = 'action_report_failed',
    InvalidAction = 'action_report_invalid_action',
    TargetUserRequired = 'action_report_target_user_required',
    TransferNotSupported = 'action_report_transfer_not_supported',
    NodeNotFound = 'action_report_node_not_found',
    NodeNotUnique = 'action_report_node_not_unique',
}

export enum PasswordReportErrorCode {
    PolicyRequired = 'password_report_policy_required',
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
    NoUsersToAction = 'no_users_to_action',
    UserActionFailed = 'user_action_failed',
    UserActionAllNotSupported = 'user_action_all_not_supported',
    UserAliasFailed = 'user_alias_failed',
    NoTeamsForUserOp = 'no_teams_for_user_op',
    TeamUserAddFailed = 'team_user_add_failed',
    TeamUserRemoveFailed = 'team_user_remove_failed',
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
    INVALID_PATTERN: ValidationErrorCode.InvalidPattern,
    ROLE_REQUIRED: RoleErrorCode.RoleRequired,
    ROLE_NOT_FOUND: RoleErrorCode.RoleNotFound,
    MULTIPLE_ROLE_MATCHES: RoleErrorCode.MultipleRoleMatches,
    NO_ROLES_TO_ADD: RoleErrorCode.NoRolesToAdd,
    NO_ROLES_TO_UPDATE: RoleErrorCode.NoRolesToUpdate,
    NO_ROLES_TO_DELETE: RoleErrorCode.NoRolesToDelete,
    ROLE_ADD_FAILED: RoleErrorCode.RoleAddFailed,
    ROLE_UPDATE_FAILED: RoleErrorCode.RoleUpdateFailed,
    ROLE_DELETE_FAILED: RoleErrorCode.RoleDeleteFailed,
    ROLE_ID_ALLOCATION_FAILED: RoleErrorCode.RoleIdAllocationFailed,
    ROLE_RENAME_MULTI_NOT_ALLOWED: RoleErrorCode.RoleRenameMultiNotAllowed,
    ROLE_NAME_EMPTY: RoleErrorCode.RoleNameEmpty,
    ROLE_ENFORCEMENT_FAILED: RoleErrorCode.RoleEnforcementFailed,
    NSF_NOT_FOUND: NsfErrorCode.NotFound,
    MULTIPLE_NSF_MATCHES: NsfErrorCode.MultipleMatches,
    NSF_LEGACY_RECORD: NsfErrorCode.LegacyRecord,
    NSF_LEGACY_FOLDER: NsfErrorCode.LegacyFolder,
    NSF_PERMISSION_DENIED: NsfErrorCode.PermissionDenied,
    NSF_LINK_FAILED: NsfErrorCode.LinkFailed,
    NSF_REMOVE_FAILED: NsfErrorCode.RemoveFailed,
    NSF_FOLDER_REQUIRED: NsfErrorCode.FolderRequired,
    NSF_TOO_MANY_RECORDS: NsfErrorCode.TooManyRecords,
    NSF_MISSING_KEY: NsfErrorCode.MissingKey,
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
    NO_USERS_TO_ACTION: UserErrorCode.NoUsersToAction,
    USER_ACTION_FAILED: UserErrorCode.UserActionFailed,
    USER_ACTION_ALL_NOT_SUPPORTED: UserErrorCode.UserActionAllNotSupported,
    USER_ALIAS_FAILED: UserErrorCode.UserAliasFailed,
    NO_TEAMS_FOR_USER_OP: UserErrorCode.NoTeamsForUserOp,
    TEAM_USER_ADD_FAILED: UserErrorCode.TeamUserAddFailed,
    TEAM_USER_REMOVE_FAILED: UserErrorCode.TeamUserRemoveFailed,
    AUDIT_INVALID_REPORT_TYPE: AuditReportErrorCode.InvalidReportType,
    AUDIT_INVALID_CREATED_FILTER: AuditReportErrorCode.InvalidCreatedFilter,
    AUDIT_INVALID_FILTER: AuditReportErrorCode.InvalidFilter,
    AUDIT_INVALID_LIMIT: AuditReportErrorCode.InvalidLimit,
    AUDIT_COLUMNS_REQUIRED: AuditReportErrorCode.ColumnsRequired,
    AUDIT_DIMENSION_COLUMN_REQUIRED: AuditReportErrorCode.DimensionColumnRequired,
    AUDIT_DIMENSION_FAILED: AuditReportErrorCode.DimensionFailed,
    AUDIT_REPORT_FAILED: AuditReportErrorCode.ReportFailed,
    AUDIT_REPORTING_NOT_ENABLED: AuditReportErrorCode.ReportingNotEnabled,
    AUDIT_LICENSE_CHECK_FAILED: AuditReportErrorCode.LicenseCheckFailed,
    ACTION_REPORT_FAILED: ActionReportErrorCode.ReportFailed,
    ACTION_REPORT_INVALID_ACTION: ActionReportErrorCode.InvalidAction,
    ACTION_REPORT_TARGET_USER_REQUIRED: ActionReportErrorCode.TargetUserRequired,
    ACTION_REPORT_TRANSFER_NOT_SUPPORTED: ActionReportErrorCode.TransferNotSupported,
    ACTION_REPORT_NODE_NOT_FOUND: ActionReportErrorCode.NodeNotFound,
    ACTION_REPORT_NODE_NOT_UNIQUE: ActionReportErrorCode.NodeNotUnique,
    PASSWORD_REPORT_POLICY_REQUIRED: PasswordReportErrorCode.PolicyRequired,
} as const

export const KEEPER_PUBLIC_HOSTS: Record<string, string> = {
    US: 'keepersecurity.com',
    EU: 'keepersecurity.eu',
    AU: 'keepersecurity.com.au',
    CA: 'keepersecurity.ca',
    JP: 'keepersecurity.jp',
    GOV: 'govcloud.keepersecurity.us',
}
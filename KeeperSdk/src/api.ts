export { SessionManager } from './auth/SessionManager'
export type {
    KeeperJsonConfig,
    ConfigLoader,
    ConfigurationUser,
    ConfigurationServerConfig,
    ConfigurationDeviceConfig,
} from './auth/SessionManager'
export { connectSdkPlatform, getSdkPlatform, isSdkPlatformConnected } from './platform'
export type { SdkPlatform, SdkReadline, SdkRuntime } from './platform'

export { InMemoryStorage } from './storage/InMemoryStorage'

export {
    Logger,
    ConsoleLogger,
    LogLevel,
    logger,
    setLogger,
    getLogger,
    resetLogger,
    KeeperSdkError,
    isKeeperError,
    extractErrorMessage,
    extractResultCode,
    SdkDefaults,
    AuthDefaults,
    ResultCodes,
    KEEPER_PUBLIC_HOSTS,
    isBoolean,
    isString,
    isNonEmptyString,
    isNumber,
    isObject,
    anyIsBoolean,
    EMAIL_PATTERN,
    EMAIL_LIST_SEPARATOR_PATTERN,
    isValidEmail,
    DEFAULT_PASSWORD_LENGTH,
    PW_SPECIAL_CHARACTERS,
    GEN_PASSWORD_ALGORITHMS,
    KeeperPasswordGenerator,
    generatePasswordFromOptions,
    resolveGenPasswordAlgorithm,
    generatePassword,
    parseGenParametersFromValue,
    isGenerateFieldValue,
    parseGeneratePasswordFlag,
} from './utils'
export type {
    ILogger,
    Nullable,
    Optional,
    DeepPartial,
    Immutable,
    GenPasswordAlgorithm,
    PasswordGenerationOptions,
    PasswordComplexityPolicy,
    PassphraseGenOptions,
} from './utils'

export {
    searchRecords,
    formatRecord,
    formatRecordFields,
    getRecordTitle,
    getRecordType,
    getRecordFields,
    getRecordSummary,
    getRecordDescription,
    getRecordCategory,
    getRecordPassword,
    getRecordLogin,
    getRecordUrl,
    getRecordTotpUrl,
    RecordVersion,
} from './records/RecordUtils'
export type { RecordSummary } from './records/RecordUtils'
export { parseTotpUrl, getTotpCode } from './records/Totp'
export type { TotpAlgorithm, TotpParams, TotpCode } from './records/Totp'
export { addRecord, updateRecord, deleteRecord, getRecordHistory, moveRecord } from './records/RecordOperations'
export type {
    PasswordRecordData,
    TypedRecordData,
    RecordFieldInput,
    NewRecordInput,
    AddRecordResult,
    UpdateRecordResult,
    DeleteRecordResult,
    HistoryEntry,
    RecordHistoryResult,
    MoveRecordInput,
    MoveRecordResult,
} from './records/RecordOperations'

export { shareRecord, removeRecordShare, getRecordShareInfo } from './sharing/Sharing'
export type {
    ShareRecordInput,
    ShareRecordResult,
    RemoveShareInput,
    RemoveShareResult,
    RecordShareInfo,
    RecordUserPermission,
    RecordSharedFolderPermission,
} from './sharing/Sharing'

export { KeeperVault } from './vault/KeeperVault'
export type { KeeperVaultConfig, VaultSummary } from './vault/KeeperVault'

export { buildWhoamiInfo, normalizeServerHost, resolveDataCenter } from './account/whoamiInfo'
export type { WhoamiInfo, BuildWhoamiInfoInput } from './account/whoamiInfo'

export type { SessionRestoreInput } from './auth/sessionRestore'
export {
    toSessionParams,
    validateSessionRestoreInput,
    sessionRestoreFromJson,
    resolveSessionRestorePayload,
} from './auth/sessionRestore'

export { getFolder, findFolder, GetFolderFormat } from './folders/getFolder'
export type {
    GetFolderOptions,
    GetFolderResult,
    GetFolderResultFolder,
    GetFolderResultSharedFolder,
    GetFolderFormatInput,
    FoundFolder,
} from './folders/getFolder'

export {
    FolderKind,
    ParentFolderKind,
    FolderObjectType,
    FolderResultStatus,
    DeleteResolution,
    DeleteObjectType,
    folderKindFromString,
} from './folders/folderHelpers'
export type { FolderKindOrLiteral } from './folders/folderHelpers'

export { listFolder, findFolderUidByNameOrUid, listRootUserFolders } from './folders/listFolder'
export type {
    ListFolderOptions,
    ListFolderResult,
    ListFolderFolderSimple,
    ListFolderRecordSimple,
    ListFolderFolderDetail,
    ListFolderRecordDetail,
} from './folders/listFolder'

export {
    listSharedFolders,
    formatSharedFoldersTable,
    renderSharedFoldersAsciiTable,
} from './sharedFolders/listSharedFolders'
export type {
    ListSharedFoldersOptions,
    ListSharedFolderRow,
    FormattedSharedFoldersTable,
} from './sharedFolders/listSharedFolders'

export { shareFolder, ShareFolderAction, ShareFolderUserResultStatus } from './sharedFolders/shareFolder'
export type {
    ShareFolderActionInput,
    ShareFolderInput,
    ShareFolderResult,
    ShareFolderUserStatus,
} from './sharedFolders/shareFolder'

export {
    changeDirectory,
    createVaultFolderSession,
    tryResolvePath,
    resolveSingleFolder,
    getWorkingFolderDisplayName,
    findParentFolderUid,
    splitPathComponents,
} from './folders/changeDirectory'
export type { VaultFolderSession, ChangeDirectoryResult, TryResolvePathResult } from './folders/changeDirectory'

export { addFolder, mkdir } from './folders/addFolder'
export type { AddFolderInput, AddFolderResult, MkdirOptions } from './folders/addFolder'

export { updateFolder, renameFolder, updateSharedFolderPermissions } from './folders/updateFolder'
export type { UpdateFolderInput, UpdateFolderResult, RenameFolderResult } from './folders/updateFolder'

export {
    deleteFolder,
    rmdir,
    resolveRmdirPatternsToFolderUids,
    buildFolderDeleteObject,
} from './folders/deleteFolder'
export type { DeleteFolderResult, RmdirOptions } from './folders/deleteFolder'

export {
    buildFolderTree,
    renderFolderTreeAscii,
    folderTreeAscii,
    userPermissionToText,
    recordPermissionToText,
} from './folders/folderTree'
export type { FolderTreeBuildOptions, FolderTreeNode, FolderTreeResult } from './folders/folderTree'

export { FolderManager } from './folders/FolderManager'
export type { AuthProvider, SharedFolderPermissionsInput } from './folders/FolderManager'

export { SharedFolderManager } from './sharedFolders/SharedFolderManager'

export {
    listTeams,
    formatTeamsTable,
    renderTeamsAsciiTable,
    formatTeamRestricts,
    TeamColumn,
    SUPPORTED_TEAM_COLUMNS,
    DEFAULT_TEAM_COLUMNS,
} from './teams/listTeams'
export type {
    ListTeamsOptions,
    ListTeamRow,
    TeamColumnInput,
    FormattedTeamsTable,
    FormatTeamsTableOptions,
} from './teams/listTeams'

export { viewTeam, formatTeamView, teamViewTable } from './teams/viewTeam'
export type {
    TeamView,
    TeamRoleInfo,
    TeamUserInfo,
    FormatTeamViewOptions,
    FormattedTeamViewTable,
    TeamViewTableRow,
} from './teams/viewTeam'

export {
    listUsers,
    formatUsersTable,
    renderUsersAsciiTable,
    UserColumn,
    SUPPORTED_USER_COLUMNS,
    DEFAULT_USER_COLUMNS,
} from './users/listUsers'
export type {
    UserColumnInput,
    ListUsersOptions,
    ListUserRow,
    FormattedUsersTable,
    FormatUsersTableOptions,
} from './users/listUsers'

export { viewUser, formatUserView, userViewTable } from './users/viewUser'
export type {
    UserView,
    FormatUserViewOptions,
    FormattedUserViewTable,
    UserViewTableRow,
} from './users/userTypes'

export {
    listRoles,
    formatRolesTable,
    renderRolesAsciiTable,
    RoleColumn,
    SUPPORTED_ROLE_COLUMNS,
    DEFAULT_ROLE_COLUMNS,
    ALL_COLUMNS_WILDCARD,
    viewRole,
    formatRoleView,
    roleViewTable,
} from './roles'
export type {
    ListRolesOptions,
    ListRoleRow,
    RoleColumnInput,
    FormattedRolesTable,
    FormatRolesTableOptions,
    RoleView,
    RoleTeamInfo,
    RoleUserInfo,
    RoleManagedNodeInfo,
    RoleEnforcementInfo,
    FormatRoleViewOptions,
    FormattedRoleViewTable,
    RoleViewTableRow,
} from './roles'

export { Auth, KeeperEnvironment, syncDown, Authentication } from '@keeper-security/keeperapi'

export type {
    DRecord,
    DRecordMetadata,
    DSharedFolder,
    DTeam,
    DUserFolder,
    VaultStorage,
    SyncResult,
    SyncDownOptions,
    ClientConfiguration,
    DeviceConfig,
    SessionStorage,
    AuthUI3,
    KeeperError,
    LoginError,
} from '@keeper-security/keeperapi'

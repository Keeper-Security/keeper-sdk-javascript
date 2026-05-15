export { ConsoleAuthUI } from './auth/ConsoleAuthUI'
export { SessionManager, FileConfigLoader } from './auth/SessionManager'
export type {
    KeeperJsonConfig,
    ConfigLoader,
    ConfigurationUser,
    ConfigurationServerConfig,
    ConfigurationDeviceConfig,
} from './auth/SessionManager'
export { login, cleanup, prompt, suppressLogs, loadKeeperConfig, resolveServer } from './auth/ConsoleLogin'

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
    AuthErrorCode,
    SessionErrorCode,
    TeamErrorCode,
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
} from './utils'
export type { ILogger, Nullable, Optional, DeepPartial, Immutable } from './utils'

export {
    searchRecords,
    formatRecord,
    getRecordTitle,
    getRecordType,
    getRecordFields,
    getRecordSummary,
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

export {
    EnterpriseDataInclude,
    EnterpriseDataManager,
} from './teams/enterpriseData'
export type {
    EnterpriseDataManagerApi,
    GetEnterpriseDataResponse,
    EnterpriseTeamRecord,
    EnterpriseTeamUserLink,
    EnterpriseRoleUserLink,
    EnterpriseRoleTeamLink,
    EnterpriseQueuedTeamRecord,
    EnterpriseUser,
    EnterpriseRole,
    EnterpriseNode,
    DecryptedNodeNames,
    DecryptedRoleNames,
    EnterpriseDisplayNames,
    NodePathOptions,
} from './teams/enterpriseData'

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
    addTeams,
    formatAddTeamResult,
    renderAddTeamAsciiTable,
    AddTeamSourceKind,
    AddTeamSkipReason,
    AddTeamStatus,
    TeamRestriction,
} from './teams/addTeam'
export type {
    AddTeamInput,
    AddTeamResult,
    AddTeamItemResult,
    AddTeamConfirm,
    AddTeamConflictPrompt,
    TeamRestrictionInput,
    FormatAddTeamResultOptions,
    FormattedAddTeamTable,
    FormattedAddTeamRow,
} from './teams/addTeam'

export {
    updateTeams,
    formatUpdateTeamResult,
    renderUpdateTeamAsciiTable,
    UpdateTeamStatus,
} from './teams/updateTeam'
export type {
    UpdateTeamInput,
    UpdateTeamResult,
    UpdateTeamItemResult,
    FormattedUpdateTeamTable,
    FormattedUpdateTeamRow,
} from './teams/updateTeam'

export {
    deleteTeams,
    formatDeleteTeamResult,
    renderDeleteTeamAsciiTable,
    DeleteTeamStatus,
} from './teams/deleteTeam'
export type {
    DeleteTeamInput,
    DeleteTeamResult,
    DeleteTeamItemResult,
    FormattedDeleteTeamTable,
    FormattedDeleteTeamRow,
} from './teams/deleteTeam'

export { TeamManager } from './teams/TeamManager'

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

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
    dispatchCliLine,
    dispatchKeeperCli,
    ensureKeeperCliRegistry,
    registerCliCommand,
    registerCliAlias,
    getCliCommand,
    listCliCommands,
    listCliCommandNames,
    listCliCommandNamesForLoginState,
    listCliCommandsForLoginState,
    isAuthCliCommand,
    listDocumentedCommands,
    getDetailedHelpPage,
    formatDetailedHelpForCommand,
    tokenizeArguments,
    parseCliArgs,
    wantsCliHelp,
    rejectUnknownOptions,
    loginWithCredentials,
    loginWithSessionToken,
    runLoginCommand,
    runLogoutCommand,
    KeeperCliParser,
    createKeeperCliParser,
    getKeeperCliPromptPrefix,
    BUILTIN_CLI_COMMANDS,
    registerBuiltinCliCommands,
    listCommand,
} from './cli'
export type { KeeperCliParserOptions } from './cli'
export type {
    CliResult,
    ParsedCli,
    CliCommandDefinition,
    CliHelpDoc,
    KeeperCliHost,
    KeeperCliVault,
} from './cli'

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

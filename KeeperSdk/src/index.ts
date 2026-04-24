export { ConsoleAuthUI } from './auth/ConsoleAuthUI'
export { SessionManager, FileConfigLoader } from './auth/SessionManager'
export type {
    KeeperJsonConfig,
    ConfigLoader,
    ConfigurationUser,
    ConfigurationServerConfig,
    ConfigurationDeviceConfig,
} from './auth/SessionManager'
export {
    login,
    cleanup,
    prompt,
    suppressLogs,
    loadKeeperConfig,
    resolveServer,
} from './auth/ConsoleLogin'

export { InMemoryStorage } from './storage/InMemoryStorage'

export {
    Logger, ConsoleLogger, LogLevel, logger, setLogger, getLogger, resetLogger,
    KeeperSdkError, isKeeperError, extractErrorMessage, extractResultCode,
    SdkDefaults, AuthDefaults, ResultCodes, KEEPER_PUBLIC_HOSTS,
} from './utils'
export type { ILogger } from './utils'

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
    RecordVersion,
} from './records/RecordUtils'
export type { RecordSummary } from './records/RecordUtils'
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

export { shareRecord, removeRecordShare } from './sharing/Sharing'
export type {
    ShareRecordInput,
    ShareRecordResult,
    RemoveShareInput,
    RemoveShareResult,
} from './sharing/Sharing'

export { KeeperVault } from './vault/KeeperVault'
export type { KeeperVaultConfig, VaultSummary } from './vault/KeeperVault'

export { getKeeperObject, KEEPER_SENSITIVE_FIELD_TYPES } from './folders/getKeeperObject'
export type {
    GetKeeperObjectOptions,
    GetKeeperObjectResult,
    GetKeeperObjectFormat,
    GetKeeperObjectForceType,
    GetKeeperRecordResult,
    GetKeeperFolderResult,
    GetKeeperSharedFolderResult,
    GetKeeperTeamResult,
} from './folders/getKeeperObject'

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
    findSharedFolders,
    matchEntity,
    tokenize,
    formatSharedFoldersTable,
    renderSharedFoldersAsciiTable,
} from './sharedFolders/listSharedFolders'
export type {
    ListSharedFoldersOptions,
    ListSharedFolderRow,
    FormattedSharedFoldersTable,
} from './sharedFolders/listSharedFolders'

export { shareFolderUsers, runShareFolderUsers } from './sharedFolders/shareFolderUsers'
export type { ShareFolderUsersInput, ShareFolderUsersResult } from './sharedFolders/shareFolderUsers'

export { shareFolderRecords, runShareFolderRecords } from './sharedFolders/shareFolderRecords'
export type { ShareFolderRecordsInput, ShareFolderRecordsResult } from './sharedFolders/shareFolderRecords'

export {
    changeDirectory,
    createVaultFolderSession,
    tryResolvePath,
    resolveSingleFolder,
    getWorkingFolderDisplayName,
    findParentFolderUid,
    splitPathComponents,
} from './folders/changeDirectory'
export type {
    VaultFolderSession,
    ChangeDirectoryResult,
    TryResolvePathResult,
} from './folders/changeDirectory'

export { addFolder, mkdir } from './folders/addFolder'
export type { AddFolderInput, AddFolderResult, MkdirOptions } from './folders/addFolder'

export { updateFolder, renameFolder, updateSharedFolderPermissions } from './folders/updateFolder'
export type { UpdateFolderInput, UpdateFolderResult, RenameFolderResult } from './folders/updateFolder'

export {
    deleteVaultObjects,
    rmdir,
    resolveRmdirPatternsToFolderUids,
    buildFolderDeleteObject,
} from './folders/deleteVaultObjects'
export type {
    DeleteVaultObjectsResult,
    RmdirOptions,
    VaultDeleteObject,
} from './folders/deleteVaultObjects'

export {
    buildFolderTree,
    renderFolderTreeAscii,
    folderTreeAscii,
    userPermissionToText,
    recordPermissionToText,
} from './folders/folderTree'
export type { FolderTreeBuildOptions, FolderTreeNode, FolderTreeResult } from './folders/folderTree'

export {
    Auth,
    KeeperEnvironment,
    syncDown,
    Authentication,
} from '@keeper-security/keeperapi'

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

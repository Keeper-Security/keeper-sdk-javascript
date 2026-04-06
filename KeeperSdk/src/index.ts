export { ConsoleAuthUI } from './auth/ConsoleAuthUI'
export { SessionManager } from './auth/SessionManager'
export {
    login,
    cleanup,
    prompt,
    suppressLogs,
    loadKeeperConfig,
    resolveServer,
    KEEPER_PUBLIC_HOSTS
} from './auth/ConsoleLogin'

export { InMemoryStorage } from './storage/InMemoryStorage'

export { Logger, LogLevel, logger } from './utils/Logger'
export { KeeperSdkError, isKeeperError, extractErrorMessage, extractResultCode } from './utils/errors'
export { SdkDefaults } from './utils/constants'

export {
    searchRecords,
    formatRecord,
    getRecordTitle,
    getRecordType,
    getRecordFields,
    getRecordPassword,
    getRecordLogin,
    getRecordUrl,
    RecordVersion,
} from './records/RecordUtils'
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

export { ShareReportGenerator, shareRecord, removeRecordShare } from './sharing/Sharing'
export type {
    ShareReportEntry,
    SharedFolderReportEntry,
    ShareSummaryEntry,
    ShareRecordInput,
    ShareRecordResult,
    RemoveShareInput,
    RemoveShareResult,
} from './sharing/Sharing'

export { KeeperVault } from './vault/KeeperVault'
export type { KeeperVaultConfig, VaultSummary } from './vault/KeeperVault'

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

import {
    Auth,
    KeeperEnvironment,
    syncDown,
    DRecord,
    DRecordMetadata,
    DSharedFolder,
    DTeam,
    DUserFolder,
    Authentication,
    normal64Bytes,
    platform,
} from '@keeper-security/keeperapi'
import type { SyncResult, SyncLogFormat, VaultStorage, SessionStorage, AuthUI3 } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { SessionManager } from '../auth/SessionManager'
import { getSdkPlatform } from '../platform'
import { toSessionParams, type SessionRestoreInput } from '../auth/sessionRestore'
import { searchRecords, formatRecord, getRecordTitle, getRecordType } from '../records/RecordUtils'
import {
    addRecord as addRecordOp,
    updateRecord as updateRecordOp,
    deleteRecord as deleteRecordOp,
    getRecordHistory as getRecordHistoryOp,
    moveRecord as moveRecordOp,
} from '../records/RecordOperations'
import {
    EnterpriseReportManager,
    runPasswordReport,
    type AuditReportOptions,
    type AuditReportResult,
    type ActionReportOptions,
    type ActionReportResult,
    type PasswordReportOptions,
    type PasswordReportResult,
} from '../enterpriseReport'
import type {
    NewRecordInput,
    TypedRecordData,
    AddRecordResult,
    UpdateRecordResult,
    DeleteRecordResult,
    RecordHistoryResult,
    MoveRecordInput,
    MoveRecordResult,
} from '../records/RecordOperations'
import {
    shareRecord as shareRecordOp,
    removeRecordShare as removeRecordShareOp,
    getRecordShareInfo as getRecordShareInfoOp,
} from '../sharing/Sharing'
import type {
    ShareRecordInput,
    ShareRecordResult,
    RemoveShareInput,
    RemoveShareResult,
    RecordShareInfo,
} from '../sharing/Sharing'
import type { ListFolderOptions, ListFolderResult } from '../folders/listFolder'
import { FolderKind, VaultObjectKind } from '../folders/folderHelpers'
import type { ChangeDirectoryResult, TryResolvePathResult, VaultFolderSession } from '../folders/changeDirectory'
import type { AddFolderInput, AddFolderResult, MkdirOptions } from '../folders/addFolder'
import type { UpdateFolderInput, UpdateFolderResult, RenameFolderResult } from '../folders/updateFolder'
import type { DeleteFolderResult, RmdirOptions } from '../folders/deleteFolder'
import type { FolderTreeBuildOptions } from '../folders/folderTree'
import type { GetFolderOptions, GetFolderResult } from '../folders/getFolder'
import type { ListSharedFolderRow, ListSharedFoldersOptions } from '../sharedFolders/listSharedFolders'
import type { ShareFolderInput, ShareFolderResult } from '../sharedFolders/shareFolder'
import type { DownloadMembershipOptions, MembershipData } from '../sharedFolders/downloadMembership'
import type {
    ApplyMembershipInput,
    ApplyMembershipOptions,
    ApplyMembershipResult,
} from '../sharedFolders/applyMembership'
import { FolderManager } from '../folders/FolderManager'
import type { SharedFolderPermissionsInput } from '../folders/FolderManager'
import { SharedFolderManager } from '../sharedFolders/SharedFolderManager'
import { TeamManager } from '../teams/TeamManager'
import type { ListTeamRow, ListTeamsOptions } from '../teams/listTeams'
import type { TeamView } from '../teams/viewTeam'
import type { AddTeamInput, AddTeamResult } from '../teams/addTeam'
import type { UpdateTeamInput, UpdateTeamResult } from '../teams/updateTeam'
import type { DeleteTeamInput, DeleteTeamResult } from '../teams/deleteTeam'
import type { ChangeTeamRolesInput, TeamRoleResult } from '../teams/teamRole'
import {
    RoleManager,
    type AddRoleInput,
    type AddRoleResult,
    type DeleteRoleInput,
    type DeleteRoleResult,
    type ListRoleRow,
    type ListRolesOptions,
    type RoleView,
    type UpdateRoleInput,
    type UpdateRoleResult,
    type SetRoleEnforcementsInput,
    type SetRoleEnforcementsResult,
    type FormattedRoleEnforcementTable,
    type CopyRoleInput,
    type CopyRoleResult,
    type FormattedCopyRoleTable,
    type AddUsersToRolesInput,
    type RemoveUsersFromRolesInput,
    type RoleUserResult,
    type FormattedRoleUserTable,
    type ManageRoleNodesInput,
    type ManageRoleNodesResult,
    type FormattedManageRoleNodesTable,
    type ChangeRolePrivilegesInput,
    type ChangeRolePrivilegesResult,
    type FormattedRolePrivilegeTable,
} from '../roles'
import {
    NodeManager,
    type AddNodeInput,
    type AddNodeResult,
    type DeleteNodeInput,
    type DeleteNodeResult,
    type ListNodeRow,
    type ListNodesOptions,
    type NodeView,
    type UpdateNodeInput,
    type UpdateNodeResult,
} from '../nodes'
import { UserManager } from '../users/UserManager'
import { NestedShareFolderManager } from '../nestedShareFolders/NestedShareFolderManager'
import { isNestedShareFolder } from '../nestedShareFolders/nsfHelpers'
import type {
    AddNsfRecordInput,
    AddNsfRecordResult,
    AddNsfRecordsInput,
    AddNsfRecordsResult,
    FormattedListNsfTable,
    GetNsfOptions,
    GetNsfResult,
    GetNsfRecordDetailsInput,
    GetNsfRecordDetailsResult,
    KeepNsfShortcutInput,
    KeepNsfShortcutResult,
    LinkNsfRecordResult,
    ListNsfFormatInput,
    ListNsfOptions,
    ListNsfRow,
    ListNsfShortcutsOptions,
    MkdirNsfInput,
    MkdirNsfResult,
    NsfShortcutRow,
    RemoveNsfFolderInput,
    RemoveNsfFolderResult,
    RemoveNsfRecordInput,
    RemoveNsfRecordResult,
    ShareNestedShareFolderInput,
    ShareNestedShareFolderResult,
    ShareNestedShareRecordInput,
    ShareNestedShareRecordResult,
    TransferNestedShareRecordInput,
    TransferNestedShareRecordResult,
    UpdateNsfRecordInput,
    UpdateNsfRecordItemInput,
    UpdateNsfRecordsInput,
    UpdateNsfRecordPermissionInput,
    UpdateNsfRecordPermissionResult,
    UpdateNsfRecordResult,
    UpdateNsfRecordResultItem,
} from '../nestedShareFolders/nsfTypes'
import type {
    UpdateNsfFolderBatchItem,
    UpdateNsfFolderInput,
    UpdateNsfFolderResult,
    UpdateNsfFoldersResult,
} from '../nestedShareFolders/updateNsfFolder'
import type {
    ListUserRow,
    ListUsersOptions,
    UserView,
    AddUserInput,
    AddUserResult,
    FormatAddUserResultOptions,
    FormattedAddUserTable,
    UpdateUserInput,
    UpdateUserResult,
    FormattedUpdateUserTable,
    DeleteUserInput,
    DeleteUserResult,
    FormattedDeleteUserTable,
    UserActionInput,
    UserActionResult,
    FormattedUserActionTable,
    AliasUserInput,
    AliasUserResult,
    AddUsersToTeamsInput,
    RemoveUsersFromTeamsInput,
    TeamUserResult,
    FormattedTeamUserTable,
} from '../users/userTypes'
import type {
    UpdateUsersOnTeamsInput,
    UpdateUsersOnTeamsResult,
    FormattedUpdateTeamUserTable,
} from '../users/updateTeamUser'
import { buildWhoamiInfo, type WhoamiInfo } from '../account/whoamiInfo'
import {
    ConsoleLogger,
    LogLevel,
    KeeperSdkError,
    extractErrorMessage,
    extractResultCode,
    SdkDefaults,
    ResultCodes,
} from '../utils'
import type { ILogger } from '../utils'

enum VaultStatus {
    RecordNotFound = 'RECORD_NOT_FOUND',
    RecordKeyNotFound = 'RECORD_KEY_NOT_FOUND',
}

export type KeeperVaultConfig = {
    host?: string
    clientVersion?: string
    configDir?: string
    useConsoleAuth?: boolean
    logFormat?: SyncLogFormat
    logLevel?: LogLevel
    autoSync?: boolean
    storage?: InMemoryStorage
    sessionStorage?: SessionManager
    authUI?: AuthUI3
}

export type VaultSummary = {
    recordCount: number
    sharedFolderCount: number
    teamCount: number
    folderCount: number
}

export class KeeperVault {
    private auth: Auth | null = null
    private readonly storage: InMemoryStorage
    private readonly sessionManager: SessionManager
    private readonly authUI: AuthUI3
    private readonly config: Required<Omit<KeeperVaultConfig, 'storage' | 'sessionStorage' | 'authUI'>>
    private readonly log: ILogger
    private synced = false
    private batchDepth = 0
    private restoredAccountUid: string | null = null
    private readonly folderSession: VaultFolderSession = FolderManager.createSession()
    private readonly folderManager: FolderManager
    private readonly sharedFolderManager: SharedFolderManager
    private readonly teamManager: TeamManager
    private readonly roleManager: RoleManager
    private readonly nodeManager: NodeManager
    private readonly enterpriseReportManager: EnterpriseReportManager
    private readonly userManager: UserManager
    private readonly nestedShareFolderManager: NestedShareFolderManager

    constructor(config?: KeeperVaultConfig) {
        this.config = {
            host: config?.host || KeeperEnvironment.Prod,
            clientVersion: config?.clientVersion || SdkDefaults.CLIENT_VERSION,
            configDir: config?.configDir ?? '',
            useConsoleAuth: config?.useConsoleAuth !== false,
            logFormat: config?.logFormat || SdkDefaults.LOG_FORMAT,
            logLevel: config?.logLevel ?? LogLevel.INFO,
            autoSync: config?.autoSync !== false,
        }

        this.log = new ConsoleLogger(this.config.logLevel)
        this.storage = config?.storage || new InMemoryStorage()
        this.sessionManager = config?.sessionStorage || new SessionManager(this.config.configDir || undefined)
        this.authUI = config?.authUI ?? getSdkPlatform().createAuthUI(this.config.useConsoleAuth)

        const authProvider = () => this.getAuthOrThrow()
        this.folderManager = new FolderManager(this.storage, this.folderSession, authProvider)
        this.sharedFolderManager = new SharedFolderManager(this.storage, authProvider)
        this.teamManager = new TeamManager(authProvider)
        this.roleManager = new RoleManager(authProvider)
        this.nodeManager = new NodeManager(authProvider)
        this.enterpriseReportManager = new EnterpriseReportManager(authProvider)
        this.userManager = new UserManager(authProvider)
        this.nestedShareFolderManager = new NestedShareFolderManager(this.storage, authProvider)
    }

    public getNestedShareFolderManager(): NestedShareFolderManager {
        return this.nestedShareFolderManager
    }

    public getFolderManager(): FolderManager {
        return this.folderManager
    }

    public getSharedFolderManager(): SharedFolderManager {
        return this.sharedFolderManager
    }

    public getTeamManager(): TeamManager {
        return this.teamManager
    }

    public getRoleManager(): RoleManager {
        return this.roleManager
    }

    public getEnterpriseReportManager(): EnterpriseReportManager {
        return this.enterpriseReportManager
    }

    /** @deprecated Use getEnterpriseReportManager() */
    public getAuditReportManager(): EnterpriseReportManager {
        return this.enterpriseReportManager
    }

    /** @deprecated Use getEnterpriseReportManager() */
    public getActionReportManager(): EnterpriseReportManager {
        return this.enterpriseReportManager
    }

    private async createAuth(options?: { useSessionResumption?: boolean }): Promise<Auth> {
        const host = this.config.host
        const baseDeviceConfig = await this.sessionManager.getDeviceConfig(host)
        const deviceConfig = {
            ...baseDeviceConfig,
            deviceName: baseDeviceConfig.deviceName || SdkDefaults.DEVICE_NAME,
        }

        const sessionStorage: SessionStorage =
            options?.useSessionResumption === false
                ? {
                      getCloneCode: async () => null,
                      saveCloneCode: (h, u, c) => this.sessionManager.saveCloneCode(h, u, c),
                      getSessionParameters: () => this.sessionManager.getSessionParameters(),
                      saveSessionParameters: (p) => this.sessionManager.saveSessionParameters(p),
                  }
                : this.sessionManager

        return new Auth({
            host,
            clientVersion: this.config.clientVersion,
            deviceConfig,
            authUI3: this.config.useConsoleAuth ? this.authUI : undefined,
            sessionStorage,
            onDeviceConfig: this.sessionManager.createOnDeviceConfig(host),
            useSessionResumption: options?.useSessionResumption,
        })
    }

    private getAuthOrThrow(): Auth {
        if (!this.auth || !this.auth.sessionToken) {
            throw new KeeperSdkError('Not logged in. Call login() first.', ResultCodes.NOT_LOGGED_IN)
        }
        return this.auth
    }

    public async login(username: string, password: string): Promise<void> {
        this.auth = await this.createAuth({ useSessionResumption: false })
        this.sessionManager.setLastUsername(username)

        await this.auth.loginV3({
            username,
            password,
            loginType: Authentication.LoginType.NORMAL,
            loginMethod: Authentication.LoginMethod.EXISTING_ACCOUNT,
        })

        this.synced = false
        this.log.info(`Logged in as ${username}`)
    }

    public async loginWithSessionToken(username: string, sessionToken: string): Promise<void> {
        const deviceConfig = await this.sessionManager.getDeviceConfig(this.config.host)

        if (!deviceConfig.deviceToken || !deviceConfig.privateKey) {
            throw new KeeperSdkError(
                'Device is not registered for this host. Perform a normal login first to register the device before using session token login.',
                ResultCodes.DEVICE_NOT_REGISTERED
            )
        }

        this.auth = await this.createAuth()
        this.sessionManager.setLastUsername(username)

        await this.auth.loginV3({
            username,
            givenSessionToken: sessionToken,
            loginType: Authentication.LoginType.NORMAL,
            loginMethod: Authentication.LoginMethod.EXISTING_ACCOUNT,
        })

        if (!this.auth.sessionToken) {
            throw new KeeperSdkError(
                'Session token login failed — token may be expired or invalid.',
                ResultCodes.SESSION_TOKEN_EXPIRED
            )
        }

        this.synced = false
        this.log.info(`Logged in as ${username} (via session token)`)
    }

    /**
     * Persist device token and private key for this vault host in session storage so
     * {@link loginWithSessionToken} and {@link resumeSession} work without a prior password login on this machine.
     * Values use the same base64 / base64url decoding as {@link SessionManager} (`normal64Bytes`).
     */
    public async registerDevice(
        deviceToken: string,
        privateKey: string,
        options?: { username?: string }
    ): Promise<void> {
        const host = this.config.host
        const save = this.sessionManager.createOnDeviceConfig(host)
        await save({
            deviceToken: normal64Bytes(deviceToken),
            privateKey: normal64Bytes(privateKey),
        })
        if (options?.username) {
            this.sessionManager.setLastUsername(options.username)
        }
        this.log.info(`Device credentials stored for host ${host}`)
    }

    public getSessionToken(): string | undefined {
        return this.auth?.sessionToken || undefined
    }

    /**
     * Resume a session from extension-exported {@link SessionRestoreInput}.
     * Verifies the token with a lightweight server call so an expired session
     * fails here, not later from `sync()`.
     */
    public async restoreSession(input: SessionRestoreInput): Promise<void> {
        const params = toSessionParams(input)
        await this.sessionManager.saveSessionParameters(params)
        this.sessionManager.setLastUsername(params.username)

        this.auth = await this.createAuth()
        await this.auth.continueSession()

        if (!this.auth.sessionToken) {
            throw new KeeperSdkError(
                'Session restore failed — session token may be expired or invalid.',
                ResultCodes.SESSION_TOKEN_EXPIRED
            )
        }

        try {
            await this.auth.loadAccountSummary()
        } catch (err) {
            const code = extractResultCode(err)
            const msg = extractErrorMessage(err)
            this.disconnect()
            const isExpired = code === ResultCodes.SESSION_TOKEN_EXPIRED
            throw new KeeperSdkError(
                isExpired
                    ? `Session token rejected by server (${code}): ${msg}. Re-export session JSON and try again.`
                    : `Session restore failed: ${msg}`,
                code ?? ResultCodes.SESSION_TOKEN_EXPIRED
            )
        }

        const accountUid = input.accountUid.trim()
        if (this.restoredAccountUid && accountUid && this.restoredAccountUid !== accountUid) {
            await this.storage.clear()
            platform.unloadKeys()
        } else {
            // Preserve vault data and continuation token for incremental sync on the same account.
            platform.unloadNonUserKeys()
        }
        if (accountUid) {
            this.restoredAccountUid = accountUid
        }
        this.synced = false
        this.log.info(`Session restored for ${params.username}`)
    }

    public async getAccountUsername(): Promise<string | undefined> {
        return this.sessionManager.getLastUsername() ?? this.auth?.username ?? undefined
    }

    public async getWhoamiInfo(options?: { includeVaultCounts?: boolean }): Promise<WhoamiInfo> {
        const auth = this.getAuthOrThrow()
        if (!auth.accountSummary) {
            await auth.loadAccountSummary()
        }
        const summary = auth.accountSummary
        if (!summary) {
            throw new KeeperSdkError('Account summary is unavailable.', ResultCodes.SYNC_FAILED)
        }

        const username = auth.username || (await this.getAccountUsername()) || ''

        return buildWhoamiInfo({
            username,
            host: this.host,
            accountSummary: summary,
            vaultSummary: options?.includeVaultCounts ? this.getSummary() : undefined,
        })
    }

    public async resumeSession(): Promise<void> {
        const username = await this.sessionManager.getLastUsername()
        if (!username) {
            throw new KeeperSdkError(
                'No previous login found. Perform a normal login first.',
                ResultCodes.NO_PREVIOUS_LOGIN
            )
        }

        this.sessionManager.setLastUsername(username)

        const deviceConfig = await this.sessionManager.getDeviceConfig(this.config.host)
        if (!deviceConfig.deviceToken || !deviceConfig.privateKey) {
            throw new KeeperSdkError(
                'Device is not registered for this host. Perform a normal login first.',
                ResultCodes.DEVICE_NOT_REGISTERED
            )
        }

        const cloneCode = await this.sessionManager.getCloneCode(this.config.host, username)
        if (!cloneCode) {
            throw new KeeperSdkError(
                'No clone code found. Persistent login not enabled or clone code expired. Perform a normal login.',
                ResultCodes.NO_CLONE_CODE
            )
        }

        this.auth = await this.createAuth({ useSessionResumption: true })

        await this.auth.loginV3({
            loginType: Authentication.LoginType.NORMAL,
            resumeSessionOnly: true,
        })

        if (!this.auth.sessionToken) {
            throw new KeeperSdkError(
                'Persistent login failed — clone code may be expired or persistent login not enabled. Perform a normal login.',
                ResultCodes.PERSISTENT_LOGIN_FAILED
            )
        }

        this.synced = false
        this.log.info(`Session resumed for ${username} (persistent login)`)
    }

    public async sync(): Promise<SyncResult> {
        const auth = this.getAuthOrThrow()

        try {
            const result = await syncDown({
                auth,
                storage: this.storage,
                logFormat: this.config.logFormat,
            })
            if (result.error) {
                this.log.error('Sync error:', result.error)
                throw new KeeperSdkError(`Sync failed: ${result.error}`, ResultCodes.SYNC_FAILED)
            }
            this.synced = true
            return result
        } catch (e) {
            this.log.error('Sync failed:', extractErrorMessage(e))
            throw e
        }
    }

    /** Drop incremental sync cursor and crypto caches so the next sync can restart cleanly. */
    public async clearSyncCheckpoint(): Promise<void> {
        const checkpoint = await this.storage.get('continuationToken')
        if (checkpoint?.token) {
            await this.storage.delete('continuationToken', checkpoint.token)
        }
        platform.unloadNonUserKeys()
        this.synced = false
    }

    public async batch(fn: () => Promise<void>): Promise<void> {
        this.batchDepth++
        try {
            await fn()
        } finally {
            this.batchDepth--
            if (this.batchDepth === 0 && this.config.autoSync) {
                await this.sync()
            }
        }
    }

    private async syncIfNeeded(): Promise<void> {
        if (this.batchDepth > 0) {
            this.synced = false
            return
        }
        if (this.config.autoSync) {
            try {
                await this.sync()
            } catch (err) {
                this.synced = false
                this.log.warn(`Post-mutation sync failed: ${extractErrorMessage(err)}`)
            }
        } else {
            this.synced = false
        }
    }

    public getRecords(): DRecord[] {
        return this.storage.getRecords()
    }

    public getRecordByUid(uid: string): DRecord | undefined {
        const direct = this.storage.getByUid<DRecord>(VaultObjectKind.Record, uid)
        if (direct) return direct
        const lower = uid.toLowerCase()
        return this.getRecords().find((record) => record.uid?.toLowerCase() === lower)
    }

    public findRecord(uidOrTitle: string): DRecord | undefined {
        const byUid = this.getRecordByUid(uidOrTitle)
        if (byUid) return byUid

        const lowerUidOrTitle = uidOrTitle.toLowerCase()
        return this.getRecords().find((record) => getRecordTitle(record).toLowerCase() === lowerUidOrTitle)
    }

    public findRecords(criteria: string): DRecord[] {
        return searchRecords(this.getRecords(), criteria)
    }

    public getRecordsByVersion(version: number): DRecord[] {
        return this.getRecords().filter((record) => record.version === version)
    }

    public getRecordsByType(recordType: string): DRecord[] {
        return this.getRecords().filter((record) => getRecordType(record) === recordType)
    }

    public getRecordMetadata(): DRecordMetadata[] {
        return this.storage.getAll<DRecordMetadata>(VaultObjectKind.Metadata)
    }

    public getRecordMetadataByUid(uid: string): DRecordMetadata | undefined {
        return this.storage.getByUid<DRecordMetadata>(VaultObjectKind.Metadata, uid)
    }

    public getSharedFolders(): DSharedFolder[] {
        return this.storage.getAll<DSharedFolder>(FolderKind.SharedFolder)
    }

    public getTeams(): DTeam[] {
        return this.storage.getAll<DTeam>(VaultObjectKind.Team)
    }

    public getUserFolders(): DUserFolder[] {
        return this.storage.getAll<DUserFolder>(FolderKind.UserFolder)
    }

    public async listFolder(options?: ListFolderOptions): Promise<ListFolderResult> {
        return this.folderManager.listFolder(options ?? {})
    }

    public listSharedFolders(options?: ListSharedFoldersOptions): ListSharedFolderRow[] {
        return this.sharedFolderManager.listSharedFolders(options ?? {})
    }

    public async listTeams(options?: ListTeamsOptions): Promise<ListTeamRow[]> {
        return this.teamManager.listTeams(options ?? {})
    }

    public async listUsers(options?: ListUsersOptions): Promise<ListUserRow[]> {
        return this.userManager.listUsers(options ?? {})
    }

    public async viewUser(identifier: string): Promise<UserView> {
        return this.userManager.viewUser(identifier)
    }

    public async addUsers(input: AddUserInput): Promise<AddUserResult> {
        return this.userManager.addUsers(input)
    }

    public formatAddUserResult(result: AddUserResult, options: FormatAddUserResultOptions = {}): FormattedAddUserTable {
        return this.userManager.formatAddUserResult(result, options)
    }

    public async updateUsers(input: UpdateUserInput): Promise<UpdateUserResult> {
        return this.userManager.updateUsers(input)
    }

    public formatUpdateUserResult(result: UpdateUserResult): FormattedUpdateUserTable {
        return this.userManager.formatUpdateUserResult(result)
    }

    public async deleteUsers(input: DeleteUserInput): Promise<DeleteUserResult> {
        return this.userManager.deleteUsers(input)
    }

    public formatDeleteUserResult(result: DeleteUserResult): FormattedDeleteUserTable {
        return this.userManager.formatDeleteUserResult(result)
    }

    public async actionUsers(input: UserActionInput): Promise<UserActionResult> {
        return this.userManager.actionUsers(input)
    }

    public formatUserActionResult(result: UserActionResult): FormattedUserActionTable {
        return this.userManager.formatUserActionResult(result)
    }

    public async aliasUser(input: AliasUserInput): Promise<AliasUserResult> {
        return this.userManager.aliasUser(input)
    }

    public async addUsersToTeams(input: AddUsersToTeamsInput): Promise<TeamUserResult> {
        return this.userManager.addUsersToTeams(input)
    }

    public async removeUsersFromTeams(input: RemoveUsersFromTeamsInput): Promise<TeamUserResult> {
        return this.userManager.removeUsersFromTeams(input)
    }

    public async updateUsersOnTeams(input: UpdateUsersOnTeamsInput): Promise<UpdateUsersOnTeamsResult> {
        return this.userManager.updateUsersOnTeams(input)
    }

    public formatUpdateTeamUserResult(result: UpdateUsersOnTeamsResult): FormattedUpdateTeamUserTable {
        return this.userManager.formatUpdateTeamUserResult(result)
    }

    public renderUpdateTeamUserAsciiTable(table: FormattedUpdateTeamUserTable): string {
        return this.userManager.renderUpdateTeamUserAsciiTable(table)
    }

    public async changeTeamRoles(input: ChangeTeamRolesInput): Promise<TeamRoleResult> {
        const result = await this.teamManager.changeTeamRoles(input)
        if (result.succeeded > 0) await this.syncIfNeeded()
        return result
    }

    public formatTeamUserResult(result: TeamUserResult): FormattedTeamUserTable {
        return this.userManager.formatTeamUserResult(result)
    }

    public async viewTeam(identifier: string): Promise<TeamView> {
        return this.teamManager.viewTeam(identifier)
    }

    public async addTeams(input: AddTeamInput): Promise<AddTeamResult> {
        const result = await this.teamManager.addTeams(input)
        if (result.created > 0) await this.syncIfNeeded()
        return result
    }

    public async updateTeams(input: UpdateTeamInput): Promise<UpdateTeamResult> {
        const result = await this.teamManager.updateTeams(input)
        if (result.updated > 0) await this.syncIfNeeded()
        return result
    }

    public async deleteTeams(input: DeleteTeamInput): Promise<DeleteTeamResult> {
        const result = await this.teamManager.deleteTeams(input)
        if (result.deleted > 0) await this.syncIfNeeded()
        return result
    }

    public async listRoles(options?: ListRolesOptions): Promise<ListRoleRow[]> {
        return this.roleManager.listRoles(options ?? {})
    }

    public async viewRole(identifier: string): Promise<RoleView> {
        return this.roleManager.viewRole(identifier)
    }

    public async addRoles(input: AddRoleInput): Promise<AddRoleResult> {
        const result = await this.roleManager.addRoles(input)
        if (result.created > 0) await this.syncIfNeeded()
        return result
    }

    public async updateRoles(input: UpdateRoleInput): Promise<UpdateRoleResult> {
        const result = await this.roleManager.updateRoles(input)
        if (result.updated > 0) await this.syncIfNeeded()
        return result
    }

    public async deleteRoles(input: DeleteRoleInput): Promise<DeleteRoleResult> {
        const result = await this.roleManager.deleteRoles(input)
        if (result.deleted > 0) await this.syncIfNeeded()
        return result
    }

    public async setRoleEnforcements(input: SetRoleEnforcementsInput): Promise<SetRoleEnforcementsResult> {
        return this.roleManager.setRoleEnforcements(input)
    }

    public formatSetRoleEnforcementsResult(result: SetRoleEnforcementsResult): FormattedRoleEnforcementTable {
        return this.roleManager.formatSetRoleEnforcementsResult(result)
    }

    public renderRoleEnforcementAsciiTable(table: FormattedRoleEnforcementTable): string {
        return this.roleManager.renderRoleEnforcementAsciiTable(table)
    }

    public async copyRoles(input: CopyRoleInput): Promise<CopyRoleResult> {
        const result = await this.roleManager.copyRoles(input)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public formatCopyRoleResult(result: CopyRoleResult): FormattedCopyRoleTable {
        return this.roleManager.formatCopyRoleResult(result)
    }

    public renderCopyRoleAsciiTable(table: FormattedCopyRoleTable): string {
        return this.roleManager.renderCopyRoleAsciiTable(table)
    }

    public async addUsersToRoles(input: AddUsersToRolesInput): Promise<RoleUserResult> {
        return this.roleManager.addUsersToRoles(input)
    }

    public async removeUsersFromRoles(input: RemoveUsersFromRolesInput): Promise<RoleUserResult> {
        return this.roleManager.removeUsersFromRoles(input)
    }

    public formatRoleUserResult(result: RoleUserResult): FormattedRoleUserTable {
        return this.roleManager.formatRoleUserResult(result)
    }

    public renderRoleUserAsciiTable(table: FormattedRoleUserTable): string {
        return this.roleManager.renderRoleUserAsciiTable(table)
    }

    public async manageRoleNodes(input: ManageRoleNodesInput): Promise<ManageRoleNodesResult> {
        return this.roleManager.manageRoleNodes(input)
    }

    public formatManageRoleNodesResult(result: ManageRoleNodesResult): FormattedManageRoleNodesTable {
        return this.roleManager.formatManageRoleNodesResult(result)
    }

    public renderManageRoleNodesAsciiTable(table: FormattedManageRoleNodesTable): string {
        return this.roleManager.renderManageRoleNodesAsciiTable(table)
    }

    public async changeRolePrivileges(input: ChangeRolePrivilegesInput): Promise<ChangeRolePrivilegesResult> {
        return this.roleManager.changeRolePrivileges(input)
    }

    public formatChangeRolePrivilegesResult(result: ChangeRolePrivilegesResult): FormattedRolePrivilegeTable {
        return this.roleManager.formatChangeRolePrivilegesResult(result)
    }

    public renderChangeRolePrivilegesAsciiTable(table: FormattedRolePrivilegeTable): string {
        return this.roleManager.renderChangeRolePrivilegesAsciiTable(table)
    }

    public async listNodes(options?: ListNodesOptions): Promise<ListNodeRow[]> {
        return this.nodeManager.listNodes(options ?? {})
    }

    public async viewNode(identifier: string): Promise<NodeView> {
        return this.nodeManager.viewNode(identifier)
    }

    public async addNodes(input: AddNodeInput): Promise<AddNodeResult> {
        return this.nodeManager.addNodes(input)
    }

    public async updateNodes(input: UpdateNodeInput): Promise<UpdateNodeResult> {
        return this.nodeManager.updateNodes(input)
    }

    public async deleteNodes(input: DeleteNodeInput): Promise<DeleteNodeResult> {
        return this.nodeManager.deleteNodes(input)
    }

    public async runAuditReport(options?: AuditReportOptions): Promise<AuditReportResult> {
        return this.enterpriseReportManager.runAuditReport(options ?? {})
    }

    public async runActionReport(options?: ActionReportOptions): Promise<ActionReportResult> {
        return this.enterpriseReportManager.runActionReport(options ?? {})
    }

    public async runPasswordReport(options?: PasswordReportOptions): Promise<PasswordReportResult> {
        return runPasswordReport(this.storage, this.folderSession, options ?? {})
    }

    public async changeDirectory(path: string): Promise<ChangeDirectoryResult> {
        return this.folderManager.changeDirectory(path)
    }

    public async tryResolvePath(path: string): Promise<TryResolvePathResult> {
        return this.folderManager.tryResolvePath(path)
    }

    public getCurrentFolderUid(): string | null {
        return this.folderManager.getCurrentFolderUid()
    }

    public getWorkingFolderDisplayName(): string {
        return this.folderManager.getWorkingFolderDisplayName()
    }

    public async getFolder(uidOrName: string, options?: GetFolderOptions): Promise<GetFolderResult> {
        return this.folderManager.getFolder(uidOrName, options ?? {})
    }

    public async addFolder(input: AddFolderInput): Promise<AddFolderResult> {
        const result = await this.folderManager.addFolder(input)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async mkdir(
        path: string,
        options?: MkdirOptions
    ): Promise<{ folderUid: string; success: boolean; message?: string }> {
        const result = await this.folderManager.mkdir(path, options ?? {})
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async updateFolder(input: UpdateFolderInput): Promise<UpdateFolderResult> {
        const result = await this.folderManager.updateFolder(input)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async renameFolder(folderPath: string, newName: string): Promise<RenameFolderResult> {
        const result = await this.folderManager.renameFolder(folderPath, newName)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async updateSharedFolderPermissions(
        sharedFolderUid: string,
        permissions: SharedFolderPermissionsInput
    ): Promise<UpdateFolderResult> {
        const result = await this.folderManager.updateSharedFolderPermissions(sharedFolderUid, permissions)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async deleteFolder(
        folderRefs: string[],
        confirm?: (summary: string) => boolean | Promise<boolean>
    ): Promise<DeleteFolderResult> {
        const result = await this.folderManager.deleteFolder(folderRefs, confirm)
        if (result.success) {
            await this.clearSyncCheckpoint()
            await this.syncIfNeeded()
        }
        return result
    }

    public async rmdir(patterns: string[], options?: RmdirOptions): Promise<DeleteFolderResult> {
        const result = await this.folderManager.rmdir(patterns, options ?? {})
        if (result.success) {
            await this.clearSyncCheckpoint()
            await this.syncIfNeeded()
        }
        return result
    }

    public async tree(options?: FolderTreeBuildOptions): Promise<string> {
        this.getAuthOrThrow()
        return this.folderManager.folderTreeAscii(options ?? {})
    }

    public getSummary(): VaultSummary {
        return {
            recordCount: this.storage.getCount(VaultObjectKind.Record),
            sharedFolderCount: this.storage.getCount(FolderKind.SharedFolder),
            teamCount: this.storage.getCount(VaultObjectKind.Team),
            folderCount: this.storage.getCount(FolderKind.UserFolder),
        }
    }

    public printRecords(showDetails = false): void {
        const records = this.getRecords()
        if (records.length === 0) {
            this.log.info('No records found in vault.')
            return
        }
        this.log.info(`\n=== Vault Records (${records.length}) ===\n`)
        for (const record of records) {
            this.log.info(formatRecord(record, showDetails))
        }
    }

    public async addRecord(input: NewRecordInput): Promise<AddRecordResult> {
        const auth = this.getAuthOrThrow()
        const result = await addRecordOp(auth, input)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async updateRecord(recordUid: string, data: TypedRecordData): Promise<UpdateRecordResult> {
        const auth = this.getAuthOrThrow()

        const record = this.getRecordByUid(recordUid)
        if (!record) {
            return { recordUid, success: false, status: VaultStatus.RecordNotFound }
        }

        const keyBytes = await this.storage.getKeyBytes(recordUid)
        if (!keyBytes) {
            return {
                recordUid,
                success: false,
                status: VaultStatus.RecordKeyNotFound,
            }
        }

        const result = await updateRecordOp(auth, recordUid, data, record.revision, keyBytes)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async deleteRecord(uidOrTitle: string): Promise<DeleteRecordResult> {
        const auth = this.getAuthOrThrow()
        const record = this.getRecordByUid(uidOrTitle) || this.findRecord(uidOrTitle)
        if (!record?.uid) {
            return {
                recordUid: uidOrTitle,
                success: false,
                message: `Record "${uidOrTitle}" not found`,
            }
        }
        const result = await deleteRecordOp(auth, this.storage, record.uid)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async moveRecord(input: MoveRecordInput): Promise<MoveRecordResult> {
        const auth = this.getAuthOrThrow()
        const result = await moveRecordOp(auth, this.storage, input)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async shareRecord(input: ShareRecordInput): Promise<ShareRecordResult> {
        const auth = this.getAuthOrThrow()

        const record = this.getRecordByUid(input.recordUid) || this.findRecord(input.recordUid)
        if (!record) {
            return {
                recordUid: input.recordUid,
                email: input.email,
                success: false,
                status: VaultStatus.RecordNotFound,
                message: `Record "${input.recordUid}" not found`,
            }
        }

        const keyBytes = await this.storage.getKeyBytes(record.uid)
        if (!keyBytes) {
            return {
                recordUid: record.uid,
                email: input.email,
                success: false,
                status: VaultStatus.RecordKeyNotFound,
                message: 'Record key not available',
            }
        }

        const result = await shareRecordOp(auth, keyBytes, {
            ...input,
            recordUid: record.uid,
        })
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async removeRecordShare(input: RemoveShareInput): Promise<RemoveShareResult> {
        const auth = this.getAuthOrThrow()
        const result = await removeRecordShareOp(auth, input)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async getRecordShareInfo(recordUid: string): Promise<RecordShareInfo | null> {
        const auth = this.getAuthOrThrow()
        return getRecordShareInfoOp(auth, recordUid)
    }

    public listNestedShareFolders(options?: ListNsfOptions): ListNsfRow[] {
        this.getAuthOrThrow()
        return this.nestedShareFolderManager.listNestedShareFolders(options ?? {})
    }

    public formatListNsfTable(rows: ListNsfRow[], options?: { columnWidth?: number }): FormattedListNsfTable {
        return this.nestedShareFolderManager.formatListNsfTable(rows, options ?? {})
    }

    public renderListNsfAsciiTable(table: FormattedListNsfTable, options?: { minColWidth?: number }): string {
        return this.nestedShareFolderManager.renderListNsfAsciiTable(table, options ?? {})
    }

    public formatListNsfOutput(rows: ListNsfRow[], format?: ListNsfFormatInput): string {
        return this.nestedShareFolderManager.formatListNsfOutput(rows, format)
    }

    public async getNestedShareFolder(identifier: string, options?: GetNsfOptions): Promise<GetNsfResult> {
        return this.nestedShareFolderManager.getNestedShareFolder(identifier, options ?? {})
    }

    public formatNsfDetail(result: GetNsfResult, verbose?: boolean): string {
        return this.nestedShareFolderManager.formatNsfDetail(result, verbose ?? false)
    }

    public async linkNestedShareRecord(
        recordIdentifier: string,
        folderIdentifier: string
    ): Promise<LinkNsfRecordResult> {
        const result = await this.nestedShareFolderManager.linkNestedShareRecord(recordIdentifier, folderIdentifier)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async removeNestedShareRecords(input: RemoveNsfRecordInput): Promise<RemoveNsfRecordResult> {
        const result = await this.nestedShareFolderManager.removeNestedShareRecords(input)
        if (result.confirmed) await this.syncIfNeeded()
        return result
    }

    public formatRemoveNsfPreview(preview: RemoveNsfRecordResult['preview']): string {
        return this.nestedShareFolderManager.formatRemoveNsfPreview(preview)
    }

    public async mkdirNestedShareFolder(input: Omit<MkdirNsfInput, 'baseFolderUid'>): Promise<MkdirNsfResult> {
        const current = this.folderSession.currentFolderUid
        const baseFolderUid = current && isNestedShareFolder(this.storage, current) ? current : null
        const result = await this.nestedShareFolderManager.mkdirNestedShareFolder({
            ...input,
            baseFolderUid,
        })
        if (result.created) await this.syncIfNeeded()
        return result
    }

    public async updateNestedShareFolder(input: UpdateNsfFolderInput): Promise<UpdateNsfFolderResult> {
        const result = await this.nestedShareFolderManager.updateNestedShareFolder(input)
        if (result.updated) await this.syncIfNeeded()
        return result
    }

    public async updateNestedShareFolders(updates: UpdateNsfFolderBatchItem[]): Promise<UpdateNsfFoldersResult> {
        const result = await this.nestedShareFolderManager.updateNestedShareFolders(updates)
        if (result.anyUpdated) await this.syncIfNeeded()
        return result
    }

    public async shareNestedShareFolder(input: ShareNestedShareFolderInput): Promise<ShareNestedShareFolderResult> {
        const result = await this.nestedShareFolderManager.shareNestedShareFolder(input)
        if (result.results.some((item) => item.success)) await this.syncIfNeeded()
        return result
    }

    public async shareNestedShareRecord(input: ShareNestedShareRecordInput): Promise<ShareNestedShareRecordResult> {
        const result = await this.nestedShareFolderManager.shareNestedShareRecord(input)
        if (!result.dryRun && result.results.some((item) => item.success)) {
            await this.syncIfNeeded()
        }
        return result
    }

    public formatNsfRecordSharePlan(result: ShareNestedShareRecordResult): string {
        return this.nestedShareFolderManager.formatNsfRecordSharePlan(result)
    }

    public formatNsfRecordShareResults(results: ShareNestedShareRecordResult['results']): string {
        return this.nestedShareFolderManager.formatNsfRecordShareResults(results)
    }

    public listNsfShortcuts(options: ListNsfShortcutsOptions = {}): NsfShortcutRow[] {
        return this.nestedShareFolderManager.listNsfShortcuts(options)
    }

    public formatNsfShortcutOutput(rows: NsfShortcutRow[], format?: ListNsfShortcutsOptions['format']): string {
        return this.nestedShareFolderManager.formatNsfShortcutOutput(rows, format)
    }

    public async keepNsfShortcut(input: KeepNsfShortcutInput): Promise<KeepNsfShortcutResult> {
        const current = this.folderSession.currentFolderUid
        const defaultFolderUid = current && isNestedShareFolder(this.storage, current) ? current : undefined
        const result = await this.nestedShareFolderManager.keepNsfShortcut(input, defaultFolderUid)
        if (!result.dryRun && !result.nothingToDo && result.results.some((item) => item.success)) {
            await this.syncIfNeeded()
        }
        return result
    }

    public formatKeepNsfShortcutPlan(result: KeepNsfShortcutResult): string {
        return this.nestedShareFolderManager.formatKeepNsfShortcutPlan(result)
    }

    public async transferNestedShareRecords(
        input: TransferNestedShareRecordInput
    ): Promise<TransferNestedShareRecordResult> {
        const result = await this.nestedShareFolderManager.transferNestedShareRecords(input)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public formatTransferNestedShareRecordResults(results: TransferNestedShareRecordResult['results']): string {
        return this.nestedShareFolderManager.formatTransferNestedShareRecordResults(results)
    }

    public async removeNestedShareFolders(input: RemoveNsfFolderInput): Promise<RemoveNsfFolderResult> {
        const result = await this.nestedShareFolderManager.removeNestedShareFolders(input)
        if (result.confirmed) await this.syncIfNeeded()
        return result
    }

    public formatRemoveNsfFolderPreview(
        preview: RemoveNsfFolderResult['preview'],
        operation: RemoveNsfFolderResult['operation'],
        quiet?: boolean
    ): string {
        return this.nestedShareFolderManager.formatRemoveNsfFolderPreview(preview, operation, quiet)
    }

    public async getNestedShareRecordDetails(input: GetNsfRecordDetailsInput): Promise<GetNsfRecordDetailsResult> {
        return this.nestedShareFolderManager.getNestedShareRecordDetails(input)
    }

    public formatNsfRecordDetailsOutput(
        result: GetNsfRecordDetailsResult,
        format?: GetNsfRecordDetailsInput['format']
    ): string {
        return this.nestedShareFolderManager.formatNsfRecordDetailsOutput(result, format)
    }

    public async updateNestedShareRecords(
        input: UpdateNsfRecordInput | UpdateNsfRecordsInput
    ): Promise<UpdateNsfRecordResult> {
        const result = await this.nestedShareFolderManager.updateNestedShareRecords(input)
        if (result.updated.some((item) => item.success)) await this.syncIfNeeded()
        return result
    }

    public async updateNestedShareRecord(input: UpdateNsfRecordItemInput): Promise<UpdateNsfRecordResultItem> {
        const result = await this.nestedShareFolderManager.updateNestedShareRecord(input)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async addNestedShareRecords(input: AddNsfRecordsInput): Promise<AddNsfRecordsResult> {
        const result = await this.nestedShareFolderManager.addNestedShareRecords(input)
        if (result.added.some((item) => item.success)) await this.syncIfNeeded()
        return result
    }

    public async addNestedShareRecord(input: AddNsfRecordInput): Promise<AddNsfRecordResult> {
        const result = await this.nestedShareFolderManager.addNestedShareRecord(input)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async updateNestedShareRecordPermissions(
        input: UpdateNsfRecordPermissionInput
    ): Promise<UpdateNsfRecordPermissionResult> {
        const result = await this.nestedShareFolderManager.updateNestedShareRecordPermissions(input)
        if (result.confirmed) await this.syncIfNeeded()
        return result
    }

    public formatNsfRecordPermissionPlan(result: UpdateNsfRecordPermissionResult): string {
        return this.nestedShareFolderManager.formatNsfRecordPermissionPlan(result)
    }

    public formatNsfRecordPermissionFailures(
        failures: UpdateNsfRecordPermissionResult['grantFailures'],
        kind: 'GRANT' | 'REVOKE'
    ): string {
        return this.nestedShareFolderManager.formatNsfRecordPermissionFailures(failures, kind)
    }

    public async shareFolder(input: ShareFolderInput): Promise<ShareFolderResult> {
        const result = await this.sharedFolderManager.shareFolder(input)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async downloadMembership(options: DownloadMembershipOptions = {}): Promise<MembershipData> {
        return this.sharedFolderManager.downloadMembership(options)
    }

    public async applyMembership(
        data: ApplyMembershipInput,
        options: ApplyMembershipOptions = {}
    ): Promise<ApplyMembershipResult> {
        const result = await this.sharedFolderManager.applyMembership(data, options)
        await this.syncIfNeeded()
        return result
    }

    public async getRecordHistory(recordUid: string): Promise<RecordHistoryResult> {
        const auth = this.getAuthOrThrow()

        const keyBytes = await this.storage.getKeyBytes(recordUid)
        if (!keyBytes) {
            return { recordUid, history: [] }
        }

        return getRecordHistoryOp(auth, recordUid, keyBytes)
    }

    public getStorage(): VaultStorage {
        return this.storage
    }

    public getAuth(): Auth {
        return this.getAuthOrThrow()
    }

    public disconnect(): void {
        if (this.auth) {
            try {
                this.auth.disconnect()
            } catch (err) {
                this.log.debug('disconnect error:', extractErrorMessage(err))
            }
            this.auth = null
        }
        this.synced = false
        this.folderSession.currentFolderUid = null
    }

    public async logout(): Promise<void> {
        if (this.auth) {
            try {
                await this.auth.logout()
            } catch (err) {
                this.log.debug('logout error:', extractErrorMessage(err))
            }
        }
        this.disconnect()
        this.log.info('Logged out.')
    }

    public get host(): string {
        return this.config.host
    }

    public get isLoggedIn(): boolean {
        return this.auth !== null && !!this.auth.sessionToken
    }

    public get isSynced(): boolean {
        return this.synced
    }
}

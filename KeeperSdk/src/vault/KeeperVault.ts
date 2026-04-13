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
} from '@keeper-security/keeperapi'
import type { SyncResult, SyncLogFormat, VaultStorage, SessionStorage, AuthUI3 } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { SessionManager } from '../auth/SessionManager'
import { ConsoleAuthUI } from '../auth/ConsoleAuthUI'
import { searchRecords, formatRecord, getRecordTitle, getRecordType } from '../records/RecordUtils'
import {
    addRecord as addRecordOp,
    updateRecord as updateRecordOp,
    deleteRecord as deleteRecordOp,
    getRecordHistory as getRecordHistoryOp,
    moveRecord as moveRecordOp,
} from '../records/RecordOperations'
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
} from '../sharing/Sharing'
import type {
    ShareRecordInput,
    ShareRecordResult,
    RemoveShareInput,
    RemoveShareResult,
} from '../sharing/Sharing'
import { ConsoleLogger, LogLevel, KeeperSdkError, extractErrorMessage, SdkDefaults, ResultCodes } from '../utils'
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
        this.authUI = config?.authUI || new ConsoleAuthUI()
    }

    private async createAuth(options?: { useSessionResumption?: boolean }): Promise<Auth> {
        const host = this.config.host
        const baseDeviceConfig = await this.sessionManager.getDeviceConfig(host)
        const deviceConfig = {
            ...baseDeviceConfig,
            deviceName: baseDeviceConfig.deviceName || SdkDefaults.DEVICE_NAME,
        }

        const sessionStorage: SessionStorage = options?.useSessionResumption === false
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

    public getSessionToken(): string | undefined {
        return this.auth?.sessionToken || undefined
    }

    public async resumeSession(): Promise<void> {
        const username = await this.sessionManager.getLastUsername()
        if (!username) {
            throw new KeeperSdkError(
                'No previous login found. Perform a normal login first.',
                ResultCodes.NO_PREVIOUS_LOGIN
            )
        }

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

        const result = await syncDown({
            auth,
            storage: this.storage,
            logFormat: this.config.logFormat,
        })

        this.synced = true
        return result
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
            await this.sync()
        } else {
            this.synced = false
        }
    }

    public getRecords(): DRecord[] {
        return this.storage.getRecords()
    }

    public getRecordByUid(uid: string): DRecord | undefined {
        return this.storage.getByUid<DRecord>('record', uid)
    }

    public findRecord(uidOrTitle: string): DRecord | undefined {
        const byUid = this.getRecordByUid(uidOrTitle)
        if (byUid) return byUid

        const needle = uidOrTitle.toLowerCase()
        return this.getRecords().find((r) => getRecordTitle(r).toLowerCase() === needle)
    }

    public findRecords(criteria: string): DRecord[] {
        return searchRecords(this.getRecords(), criteria)
    }

    public getRecordsByVersion(version: number): DRecord[] {
        return this.getRecords().filter((r) => r.version === version)
    }

    public getRecordsByType(recordType: string): DRecord[] {
        return this.getRecords().filter((r) => getRecordType(r) === recordType)
    }

    public getRecordMetadata(): DRecordMetadata[] {
        return this.storage.getAll<DRecordMetadata>('metadata')
    }

    public getRecordMetadataByUid(uid: string): DRecordMetadata | undefined {
        return this.storage.getByUid<DRecordMetadata>('metadata', uid)
    }

    public getSharedFolders(): DSharedFolder[] {
        return this.storage.getAll<DSharedFolder>('shared_folder')
    }

    public getTeams(): DTeam[] {
        return this.storage.getAll<DTeam>('team')
    }

    public getUserFolders(): DUserFolder[] {
        return this.storage.getAll<DUserFolder>('user_folder')
    }

    public getSummary(): VaultSummary {
        return {
            recordCount: this.storage.getCount('record'),
            sharedFolderCount: this.storage.getCount('shared_folder'),
            teamCount: this.storage.getCount('team'),
            folderCount: this.storage.getCount('user_folder'),
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
            return { recordUid, success: false, status: VaultStatus.RecordKeyNotFound }
        }

        const result = await updateRecordOp(auth, recordUid, data, record.revision, keyBytes)
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async deleteRecord(recordUid: string): Promise<DeleteRecordResult> {
        const auth = this.getAuthOrThrow()
        const result = await deleteRecordOp(auth, recordUid)
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

        const record = this.getRecordByUid(input.recordUid)
            || this.findRecord(input.recordUid)
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

        const result = await shareRecordOp(auth, keyBytes, { ...input, recordUid: record.uid })
        if (result.success) await this.syncIfNeeded()
        return result
    }

    public async removeRecordShare(input: RemoveShareInput): Promise<RemoveShareResult> {
        const auth = this.getAuthOrThrow()
        const result = await removeRecordShareOp(auth, input)
        if (result.success) await this.syncIfNeeded()
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
            try { this.auth.disconnect() } catch (err) {
                this.log.debug('disconnect error:', extractErrorMessage(err))
            }
            this.auth = null
        }
        this.synced = false
    }

    public async logout(): Promise<void> {
        if (this.auth) {
            try { await this.auth.logout() } catch (err) {
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

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
import type { SyncResult, SyncLogFormat, VaultStorage } from '@keeper-security/keeperapi'
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
    ShareReportGenerator,
    shareRecord as shareRecordOp,
    removeRecordShare as removeRecordShareOp,
} from '../sharing/Sharing'
import type {
    ShareReportEntry,
    SharedFolderReportEntry,
    ShareSummaryEntry,
    ShareRecordInput,
    ShareRecordResult,
    RemoveShareInput,
    RemoveShareResult,
} from '../sharing/Sharing'
import { logger, LogLevel } from '../utils/Logger'
import type { Logger } from '../utils/Logger'
import { KeeperSdkError } from '../utils/errors'
import { SdkDefaults } from '../utils/constants'

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
    private readonly authUI: ConsoleAuthUI
    private readonly config: Required<KeeperVaultConfig>
    private readonly log: Logger
    private synced = false

    constructor(config?: KeeperVaultConfig) {
        this.config = {
            host: config?.host || KeeperEnvironment.Prod,
            clientVersion: config?.clientVersion || SdkDefaults.CLIENT_VERSION,
            configDir: config?.configDir || '',
            useConsoleAuth: config?.useConsoleAuth !== false,
            logFormat: config?.logFormat || SdkDefaults.LOG_FORMAT,
            logLevel: config?.logLevel ?? LogLevel.INFO,
        }

        if (config?.logLevel !== undefined) {
            logger.setLevel(config.logLevel)
        }

        this.log = logger
        this.storage = new InMemoryStorage()
        this.sessionManager = new SessionManager(this.config.configDir || undefined)
        this.authUI = new ConsoleAuthUI()
    }

    private createAuth(options?: { useSessionResumption?: boolean }): Auth {
        const host = this.config.host
        const deviceConfig = this.sessionManager.getDeviceConfig(host)

        if (!deviceConfig.deviceName) {
            deviceConfig.deviceName = SdkDefaults.DEVICE_NAME
        }

        return new Auth({
            host,
            clientVersion: this.config.clientVersion,
            deviceConfig,
            authUI3: this.config.useConsoleAuth ? this.authUI : undefined,
            sessionStorage: this.sessionManager,
            onDeviceConfig: this.sessionManager.createOnDeviceConfig(host),
            useSessionResumption: options?.useSessionResumption,
        })
    }

    private getAuthOrThrow(): Auth {
        if (!this.auth || !this.auth.sessionToken) {
            throw new KeeperSdkError('Not logged in. Call login() first.', 'not_logged_in')
        }
        return this.auth
    }

    // Handles device registration, 2FA, and device approval via console prompts when useConsoleAuth is enabled.
    public async login(username: string, password: string): Promise<void> {
        this.auth = this.createAuth()
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

    // Device must already be registered and approved for this host via a prior normal login.
    public async loginWithSessionToken(username: string, sessionToken: string): Promise<void> {
        const deviceConfig = this.sessionManager.getDeviceConfig(this.config.host)

        if (!deviceConfig.deviceToken || !deviceConfig.privateKey) {
            throw new KeeperSdkError(
                'Device is not registered for this host. Perform a normal login first to register the device before using session token login.',
                'device_not_registered'
            )
        }

        this.auth = this.createAuth()
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
                'session_token_expired'
            )
        }

        this.synced = false
        this.log.info(`Logged in as ${username} (via session token)`)
    }

    public getSessionToken(): string | undefined {
        return this.auth?.sessionToken || undefined
    }

    public async resumeSession(): Promise<void> {
        this.auth = this.createAuth({ useSessionResumption: true })
        const username = this.sessionManager.lastUsername || ''

        await this.auth.loginV3({
            username,
            loginType: Authentication.LoginType.NORMAL,
            resumeSessionOnly: true,
        })

        this.synced = false
        this.log.info(`Session resumed for ${username}`)
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

    public getRecords(): DRecord[] {
        return this.storage.getRecords()
    }

    public getRecordByUid(uid: string): DRecord | undefined {
        return this.getRecords().find((r) => r.uid === uid)
    }

    // Tries exact UID match first, then case-insensitive title match.
    public findRecord(uidOrTitle: string): DRecord | undefined {
        const records = this.getRecords()
        const byUid = records.find((r) => r.uid === uidOrTitle)
        if (byUid) return byUid

        const needle = uidOrTitle.toLowerCase()
        return records.find((r) => getRecordTitle(r).toLowerCase() === needle)
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
        return this.getRecordMetadata().find((m) => m.uid === uid)
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
            recordCount: this.getRecords().length,
            sharedFolderCount: this.getSharedFolders().length,
            teamCount: this.getTeams().length,
            folderCount: this.getUserFolders().length,
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
        if (result.success) await this.sync()
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
        if (result.success) await this.sync()
        return result
    }

    public async deleteRecord(recordUid: string): Promise<DeleteRecordResult> {
        const auth = this.getAuthOrThrow()
        const result = await deleteRecordOp(auth, recordUid)
        if (result.success) await this.sync()
        return result
    }

    public async moveRecord(input: MoveRecordInput): Promise<MoveRecordResult> {
        const auth = this.getAuthOrThrow()
        const result = await moveRecordOp(auth, this.storage, input)
        if (result.success) await this.sync()
        return result
    }

    public createShareReportGenerator(): ShareReportGenerator {
        const auth = this.getAuthOrThrow()
        return new ShareReportGenerator(this.storage, auth.username || '')
    }

    public getSharedRecordsReport(): ShareReportEntry[] {
        return this.createShareReportGenerator().generateRecordsReport()
    }

    public getSharedFoldersReport(): SharedFolderReportEntry[] {
        return this.createShareReportGenerator().generateSharedFoldersReport()
    }

    public getShareSummaryReport(): ShareSummaryEntry[] {
        return this.createShareReportGenerator().generateSummaryReport()
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
        if (result.success) await this.sync()
        return result
    }

    public async removeRecordShare(input: RemoveShareInput): Promise<RemoveShareResult> {
        const auth = this.getAuthOrThrow()
        const result = await removeRecordShareOp(auth, input)
        if (result.success) await this.sync()
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

    public async logout(): Promise<void> {
        if (this.auth) {
            try { this.auth.disconnect() } catch {}
            try { await this.auth.logout() } catch {}
            this.auth = null
        }
        this.synced = false
        this.log.info('Logged out.')
    }

    public get isLoggedIn(): boolean {
        return this.auth !== null && !!this.auth.sessionToken
    }

    public get isSynced(): boolean {
        return this.synced
    }
}

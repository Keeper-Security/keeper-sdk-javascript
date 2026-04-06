import fs from 'fs'
import path from 'path'
import os from 'os'
import type { DeviceConfig, SessionStorage, KeeperHost, SessionParams } from '@keeper-security/keeperapi'
import { logger } from '../utils/Logger'
import { SdkDefaults } from '../utils/constants'

type PersistedDeviceConfig = {
    readonly deviceToken?: string
    readonly privateKey?: string
    readonly publicKey?: string
    readonly deviceName?: string
    readonly transmissionKeyId?: number
    readonly mlKemPublicKeyId?: number
    readonly useHpkeTransmission?: boolean
}

type PersistedConfig = {
    lastUsername?: string
    devices: Record<string, PersistedDeviceConfig>
    cloneCodes: Record<string, string>
}

export class SessionManager implements SessionStorage {
    private readonly configPath: string
    private readonly config: PersistedConfig
    private sessionParams: SessionParams | null = null
    private _lastUsername?: string

    constructor(configDir?: string) {
        const dir = configDir || path.join(os.homedir(), SdkDefaults.CONFIG_DIR)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        this.configPath = path.join(dir, SdkDefaults.CONFIG_FILE)
        this.config = this.load()
        this._lastUsername = this.config.lastUsername
    }

    public get lastUsername(): string | undefined {
        return this._lastUsername
    }

    public getDeviceConfig(host: string): DeviceConfig {
        const persisted = this.config.devices[host]
        if (!persisted) return {}

        return {
            deviceToken: persisted.deviceToken ? Buffer.from(persisted.deviceToken, 'base64') : undefined,
            privateKey: persisted.privateKey ? Buffer.from(persisted.privateKey, 'base64') : undefined,
            publicKey: persisted.publicKey ? Buffer.from(persisted.publicKey, 'base64') : undefined,
            deviceName: persisted.deviceName,
            transmissionKeyId: persisted.transmissionKeyId,
            mlKemPublicKeyId: persisted.mlKemPublicKeyId,
            useHpkeTransmission: persisted.useHpkeTransmission,
        }
    }

    public createOnDeviceConfig(host: string): (deviceConfig: DeviceConfig) => Promise<void> {
        return async (deviceConfig: DeviceConfig) => {
            this.config.devices[host] = {
                deviceToken: deviceConfig.deviceToken ? Buffer.from(deviceConfig.deviceToken).toString('base64') : undefined,
                privateKey: deviceConfig.privateKey ? Buffer.from(deviceConfig.privateKey).toString('base64') : undefined,
                publicKey: deviceConfig.publicKey ? Buffer.from(deviceConfig.publicKey).toString('base64') : undefined,
                deviceName: deviceConfig.deviceName,
                transmissionKeyId: deviceConfig.transmissionKeyId,
                mlKemPublicKeyId: deviceConfig.mlKemPublicKeyId,
                useHpkeTransmission: deviceConfig.useHpkeTransmission,
            }
            this.save()
        }
    }

    private cloneCodeKey(host: KeeperHost, username: string): string {
        return `${host}::${username}`
    }

    public async getCloneCode(host: KeeperHost, username: string): Promise<Uint8Array | null> {
        const key = this.cloneCodeKey(host, username)
        const encoded = this.config.cloneCodes[key]
        if (!encoded) return null
        return Buffer.from(encoded, 'base64')
    }

    public async saveCloneCode(host: KeeperHost, username: string, cloneCode: Uint8Array): Promise<void> {
        const key = this.cloneCodeKey(host, username)
        this.config.cloneCodes[key] = Buffer.from(cloneCode).toString('base64')
        this.save()
    }

    public async getSessionParameters(): Promise<SessionParams | null> {
        return this.sessionParams
    }

    public async saveSessionParameters(params: Partial<SessionParams>): Promise<void> {
        this.sessionParams = params as SessionParams
        if (params.username) {
            this.config.lastUsername = params.username
            this._lastUsername = params.username
            this.save()
        }
    }

    public setLastUsername(username: string): void {
        this.config.lastUsername = username
        this._lastUsername = username
        this.save()
    }

    private load(): PersistedConfig {
        try {
            if (fs.existsSync(this.configPath)) {
                const raw = fs.readFileSync(this.configPath, 'utf-8')
                return JSON.parse(raw)
            }
        } catch {}
        return { devices: {}, cloneCodes: {} }
    }

    private save(): void {
        try {
            fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf-8')
        } catch (e) {
            logger.error('Failed to save SDK config:', e)
        }
    }
}

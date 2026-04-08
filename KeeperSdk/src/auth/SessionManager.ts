import fs from 'fs'
import path from 'path'
import os from 'os'
import type { DeviceConfig, SessionStorage, KeeperHost, SessionParams } from '@keeper-security/keeperapi'
import { logger } from '../utils/Logger'
import { extractErrorMessage } from '../utils/errors'
import { SdkDefaults } from '../utils/constants'

export type KeeperJsonConfig = {
    last_login?: string
    last_server?: string
    user?: string
    server?: string
    device_token?: string
    private_key?: string
    clone_code?: string
    users?: Array<{
        user?: string
        server?: string
        last_device?: { device_token?: string }
    }>
    devices?: Array<{
        device_token?: string
        private_key?: string
        server_info?: Array<{
            server?: string
            clone_code?: string
        }>
    }>
}

type ResolvedDevice = {
    deviceToken: Buffer
    privateKey: Buffer
    serverInfo: Array<{ server: string; clone_code: string }>
}

export interface ConfigLoader {
    load(): KeeperJsonConfig
    save(config: KeeperJsonConfig): void
    readonly configDir: string
}

export class FileConfigLoader implements ConfigLoader {
    public readonly configDir: string

    constructor(configDir?: string) {
        this.configDir = configDir || path.join(os.homedir(), SdkDefaults.CONFIG_DIR)
    }

    load(): KeeperJsonConfig {
        const configPath = path.join(this.configDir, 'config.json')
        try {
            if (fs.existsSync(configPath)) {
                const parsed: unknown = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
                if (SessionManager.isValidKeeperConfig(parsed)) {
                    return parsed
                }
            }
        } catch (err) {
            logger.debug('Failed to load keeper config:', extractErrorMessage(err))
        }
        return {}
    }

    save(config: KeeperJsonConfig): void {
        const configPath = path.join(this.configDir, 'config.json')
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), { mode: 0o600 })
    }
}

export class SessionManager implements SessionStorage {
    private readonly configLoader: ConfigLoader
    private sessionParams: SessionParams | null = null
    private _lastUsername?: string
    private _keeperConfig: KeeperJsonConfig | null = null
    private _deviceCache: { username: string; device: ResolvedDevice | null } | null = null
    private sessionDevices = new Map<string, DeviceConfig>()
    private sessionCloneCodes = new Map<string, Uint8Array>()

    constructor(configDir?: string)
    constructor(loader: ConfigLoader)
    constructor(configDirOrLoader?: string | ConfigLoader) {
        if (typeof configDirOrLoader === 'string' || configDirOrLoader === undefined) {
            this.configLoader = new FileConfigLoader(configDirOrLoader as string | undefined)
        } else {
            this.configLoader = configDirOrLoader
        }
    }

    public get configDir(): string {
        return this.configLoader.configDir
    }

    public get lastUsername(): string | undefined {
        if (this._lastUsername) return this._lastUsername
        const kc = this.loadKeeperConfig()
        return kc.last_login || kc.user || undefined
    }

    public getDeviceConfig(host: string): DeviceConfig {
        const username = this.lastUsername
        if (username) {
            const device = this.findDeviceInKeeperConfig(username)
            if (device) {
                return {
                    deviceToken: device.deviceToken,
                    privateKey: device.privateKey,
                }
            }
        }

        return this.sessionDevices.get(host) || {}
    }

    public createOnDeviceConfig(host: string): (deviceConfig: DeviceConfig) => Promise<void> {
        return async (deviceConfig: DeviceConfig) => {
            this.sessionDevices.set(host, { ...deviceConfig })
        }
    }

    private cloneCodeKey(host: KeeperHost, username: string): string {
        return `${host}::${username}`
    }

    public async getCloneCode(host: KeeperHost, username: string): Promise<Uint8Array | null> {
        const hostStr = String(host)

        const key = this.cloneCodeKey(host, username)
        const sessionCode = this.sessionCloneCodes.get(key)
        if (sessionCode) return sessionCode

        const device = this.findDeviceInKeeperConfig(username)
        if (device) {
            const serverInfo = device.serverInfo.find(si => si.server === hostStr)
            if (serverInfo) {
                return SessionManager.base64urlDecode(serverInfo.clone_code)
            }
        }

        return null
    }

    public async saveCloneCode(host: KeeperHost, username: string, cloneCode: Uint8Array): Promise<void> {
        const key = this.cloneCodeKey(host, username)
        this.sessionCloneCodes.set(key, cloneCode)
        this.updateKeeperConfigCloneCode(String(host), username, cloneCode)
    }

    private updateKeeperConfigCloneCode(host: string, username: string, cloneCode: Uint8Array): void {
        try {
            const parsed = this.configLoader.load()
            if (!parsed || Object.keys(parsed).length === 0) return

            let updated = false
            const encodedCloneCode = Buffer.from(cloneCode).toString('base64url')

            const server = parsed.last_server || parsed.server
            if (parsed.user?.toLowerCase() === username.toLowerCase() && server === host) {
                parsed.clone_code = encodedCloneCode
                updated = true
            }

            const user = (parsed.users || []).find(
                u => u.user?.toLowerCase() === username.toLowerCase()
            )
            if (user?.last_device?.device_token) {
                const device = (parsed.devices || []).find(
                    d => d.device_token === user.last_device.device_token
                )
                if (device?.server_info) {
                    const serverInfo = device.server_info.find(si => si.server === host)
                    if (serverInfo) {
                        serverInfo.clone_code = encodedCloneCode
                        updated = true
                    }
                }
            }

            if (updated) {
                this.configLoader.save(parsed)
                this._keeperConfig = null
                this._deviceCache = null
            }
        } catch (err) {
            logger.warn('Failed to update keeper config clone code:', extractErrorMessage(err))
        }
    }

    public async getSessionParameters(): Promise<SessionParams | null> {
        return this.sessionParams
    }

    public async saveSessionParameters(params: Partial<SessionParams>): Promise<void> {
        this.sessionParams = { ...this.sessionParams, ...params } as SessionParams
        if (params.username) {
            this._lastUsername = params.username
        }
    }

    public setLastUsername(username: string): void {
        this._lastUsername = username
    }

    private loadKeeperConfig(): KeeperJsonConfig {
        if (this._keeperConfig) return this._keeperConfig
        this._keeperConfig = this.configLoader.load()
        return this._keeperConfig
    }

    private findDeviceInKeeperConfig(username: string): ResolvedDevice | null {
        const normalizedUsername = username.toLowerCase()
        if (this._deviceCache?.username === normalizedUsername) {
            return this._deviceCache.device
        }

        const device = this.lookupDeviceInKeeperConfig(normalizedUsername)
        this._deviceCache = { username: normalizedUsername, device }
        return device
    }

    private lookupDeviceInKeeperConfig(normalizedUsername: string): ResolvedDevice | null {
        const kc = this.loadKeeperConfig()

        if (kc.device_token && kc.private_key && kc.user?.toLowerCase() === normalizedUsername) {
            const serverInfo: Array<{ server: string; clone_code: string }> = []
            const server = kc.last_server || kc.server
            if (server && kc.clone_code) {
                serverInfo.push({ server, clone_code: kc.clone_code })
            }
            return {
                deviceToken: SessionManager.base64urlDecode(kc.device_token),
                privateKey: SessionManager.base64urlDecode(kc.private_key),
                serverInfo,
            }
        }

        if (kc.users && kc.devices) {
            const user = kc.users.find(u => u.user?.toLowerCase() === normalizedUsername)
            if (user?.last_device?.device_token) {
                const deviceTokenStr = user.last_device.device_token
                const device = kc.devices.find(d => d.device_token === deviceTokenStr)
                if (device?.private_key) {
                    return {
                        deviceToken: SessionManager.base64urlDecode(deviceTokenStr),
                        privateKey: SessionManager.base64urlDecode(device.private_key),
                        serverInfo: (device.server_info || [])
                            .filter((si): si is { server: string; clone_code: string } =>
                                !!si.server && !!si.clone_code
                            ),
                    }
                }
            }
        }

        return null
    }

    public static isValidKeeperConfig(value: unknown): value is KeeperJsonConfig {
        if (typeof value !== 'object' || value === null) return false
        const obj = value as Record<string, unknown>
        if (obj.users !== undefined && !Array.isArray(obj.users)) return false
        if (obj.devices !== undefined && !Array.isArray(obj.devices)) return false
        return true
    }

    private static base64urlDecode(str: string): Buffer {
        return Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/'), 'base64')
    }
}

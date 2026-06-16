import {
    normal64Bytes,
    type DeviceConfig,
    type SessionStorage,
    type KeeperHost,
    type SessionParams,
} from '@keeper-security/keeperapi'
import { getSdkPlatform } from '../platform'
import { logger, extractErrorMessage } from '../utils'
import type { Nullable } from '../utils'
import type {
    ConfigLoader,
    KeeperJsonConfig,
    ConfigurationServerConfig,
    ConfigurationUser,
} from './config'
import { isValidKeeperConfig } from './config'

export type {
    KeeperJsonConfig,
    ConfigLoader,
    ConfigurationUser,
    ConfigurationServerConfig,
    ConfigurationDeviceConfig,
} from './config'

type ResolvedDevice = {
    deviceToken: Uint8Array
    privateKey: Uint8Array
    serverInfo: Array<Required<ConfigurationServerConfig>>
}

type DeviceCacheEntry = {
    username: string
    device: Nullable<ResolvedDevice>
}

export class SessionManager implements SessionStorage {
    private readonly configLoader: ConfigLoader
    private sessionParams: Nullable<SessionParams> = null
    private _lastUsername?: string
    private _keeperConfig: Nullable<KeeperJsonConfig> = null
    private _deviceCache: Nullable<DeviceCacheEntry> = null
    private sessionDevices = new Map<string, DeviceConfig>()
    private sessionCloneCodes = new Map<string, Uint8Array>()

    constructor(configDir?: string)
    constructor(loader: ConfigLoader)
    constructor(configDirOrLoader?: string | ConfigLoader) {
        if (typeof configDirOrLoader === 'string') {
            this.configLoader = getSdkPlatform().createFileConfigLoader(configDirOrLoader)
        } else if (configDirOrLoader === undefined) {
            this.configLoader = getSdkPlatform().createFileConfigLoader()
        } else {
            this.configLoader = configDirOrLoader
        }
    }

    public get configDir(): string {
        return this.configLoader.configDir
    }

    public get lastUsername(): string | undefined {
        return this._lastUsername
    }

    public async getLastUsername(): Promise<string | undefined> {
        if (this._lastUsername) return this._lastUsername
        const keeperConfig = await this.loadKeeperConfig()
        return keeperConfig.last_login || keeperConfig.user || undefined
    }

    public async getDeviceConfig(host: string): Promise<DeviceConfig> {
        const username = await this.getLastUsername()
        if (username) {
            const device = await this.findDeviceInKeeperConfig(username)
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

    public async getCloneCode(host: KeeperHost, username: string): Promise<Nullable<Uint8Array>> {
        const hostStr = String(host)

        const key = this.cloneCodeKey(host, username)
        const sessionCode = this.sessionCloneCodes.get(key)
        if (sessionCode) return sessionCode

        const device = await this.findDeviceInKeeperConfig(username)
        if (device) {
            const serverInfo = device.serverInfo.find((entry) => entry.server === hostStr)
            if (serverInfo) {
                return normal64Bytes(serverInfo.clone_code)
            }
        }

        return null
    }

    public async saveCloneCode(host: KeeperHost, username: string, cloneCode: Uint8Array): Promise<void> {
        const key = this.cloneCodeKey(host, username)
        this.sessionCloneCodes.set(key, cloneCode)
        await this.updateKeeperConfigCloneCode(String(host), username, cloneCode)
    }

    private async updateKeeperConfigCloneCode(host: string, username: string, cloneCode: Uint8Array): Promise<void> {
        try {
            const parsed = await this.configLoader.load()
            if (!parsed || Object.keys(parsed).length === 0) return

            let updated = false
            const encodedCloneCode = Buffer.from(cloneCode).toString('base64url')

            const server = parsed.last_server || parsed.server
            if (parsed.user?.toLowerCase() === username.toLowerCase() && server === host) {
                parsed.clone_code = encodedCloneCode
                updated = true
            }

            const user = (parsed.users || []).find(
                (configUser) => configUser.user?.toLowerCase() === username.toLowerCase()
            )
            if (user?.last_device?.device_token) {
                const device = (parsed.devices || []).find(
                    (configDevice) => configDevice.device_token === user.last_device!.device_token
                )
                if (device?.server_info) {
                    const serverInfo = device.server_info.find((entry) => entry.server === host)
                    if (serverInfo) {
                        serverInfo.clone_code = encodedCloneCode
                        updated = true
                    }
                }
            }

            if (updated) {
                await this.configLoader.save(parsed)
                this._keeperConfig = null
                this._deviceCache = null
            }
        } catch (err) {
            logger.warn('Failed to update keeper config clone code:', extractErrorMessage(err))
        }
    }

    public async getSessionParameters(): Promise<Nullable<SessionParams>> {
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

    private async loadKeeperConfig(): Promise<KeeperJsonConfig> {
        if (this._keeperConfig) return this._keeperConfig
        this._keeperConfig = await this.configLoader.load()
        return this._keeperConfig
    }

    private async findDeviceInKeeperConfig(username: string): Promise<Nullable<ResolvedDevice>> {
        const normalizedUsername = username.toLowerCase()
        if (this._deviceCache?.username === normalizedUsername) {
            return this._deviceCache.device
        }

        const device = await this.lookupDeviceInKeeperConfig(normalizedUsername)
        this._deviceCache = { username: normalizedUsername, device }
        return device
    }

    private async lookupDeviceInKeeperConfig(normalizedUsername: string): Promise<Nullable<ResolvedDevice>> {
        const keeperConfig = await this.loadKeeperConfig()

        if (keeperConfig.users && keeperConfig.devices) {
            const user = keeperConfig.users.find(
                (configUser) => configUser.user?.toLowerCase() === normalizedUsername
            )
            if (user?.last_device?.device_token) {
                const deviceTokenStr = user.last_device.device_token
                const device = keeperConfig.devices.find((configDevice) => configDevice.device_token === deviceTokenStr)
                if (device?.private_key) {
                    return {
                        deviceToken: normal64Bytes(deviceTokenStr),
                        privateKey: normal64Bytes(device.private_key),
                        serverInfo: (device.server_info || []).filter(
                            (entry): entry is Required<ConfigurationServerConfig> =>
                                !!entry.server && !!entry.clone_code
                        ),
                    }
                }
            }
        }

        if (
            keeperConfig.device_token &&
            keeperConfig.private_key &&
            keeperConfig.user?.toLowerCase() === normalizedUsername
        ) {
            const serverInfo: Array<Required<ConfigurationServerConfig>> = []
            const server = keeperConfig.last_server || keeperConfig.server
            if (server && keeperConfig.clone_code) {
                serverInfo.push({ server, clone_code: keeperConfig.clone_code })
            }
            return {
                deviceToken: normal64Bytes(keeperConfig.device_token),
                privateKey: normal64Bytes(keeperConfig.private_key),
                serverInfo,
            }
        }

        return null
    }

    public static isValidKeeperConfig(value: unknown): value is KeeperJsonConfig {
        return isValidKeeperConfig(value)
    }
}

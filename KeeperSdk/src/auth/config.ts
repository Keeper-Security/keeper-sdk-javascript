export type ConfigurationUser = {
    user?: string
    server?: string
    last_device?: { device_token?: string }
}

export type ConfigurationServerConfig = {
    server?: string
    clone_code?: string
}

export type ConfigurationDeviceConfig = {
    device_token?: string
    private_key?: string
    server_info?: Array<ConfigurationServerConfig>
}

export type KeeperJsonConfig = {
    last_login?: string
    last_server?: string
    user?: string
    server?: string
    device_token?: string
    private_key?: string
    clone_code?: string
    users?: Array<ConfigurationUser>
    devices?: Array<ConfigurationDeviceConfig>
}

export interface ConfigLoader {
    load(): Promise<KeeperJsonConfig>
    save(config: KeeperJsonConfig): Promise<void>
    readonly configDir: string
}

export function isValidKeeperConfig(value: unknown): value is KeeperJsonConfig {
    if (typeof value !== 'object' || value === null) return false
    const obj = value as Record<string, unknown>
    if (obj.users !== undefined && !Array.isArray(obj.users)) return false
    if (obj.devices !== undefined && !Array.isArray(obj.devices)) return false
    return true
}

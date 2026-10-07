export type ConfigurationUser = {
    user?: string
    server?: string
    last_device?: { device_token?: string }
}

export type ConfigurationServerConfig = {
    server?: string
    clone_code?: string
}

export type ConfigurationServer = {
    server?: string
    server_key_id?: number
}

export type ConfigurationDeviceConfig = {
    device_token?: string
    private_key?: string
    public_key?: string
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
    servers?: Array<ConfigurationServer>
    devices?: Array<ConfigurationDeviceConfig>
}

export interface ConfigLoader {
    load(): Promise<KeeperJsonConfig>
    save(config: KeeperJsonConfig): Promise<void>
    readonly configDir: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasOptionalStringFields(value: Record<string, unknown>, fields: string[]): boolean {
    return fields.every((field) => value[field] === undefined || typeof value[field] === 'string')
}

function isValidUser(value: unknown): value is ConfigurationUser {
    if (!isRecord(value) || !hasOptionalStringFields(value, ['user', 'server'])) return false
    return value.last_device === undefined ||
        (isRecord(value.last_device) && hasOptionalStringFields(value.last_device, ['device_token']))
}

function isValidServer(value: unknown): value is ConfigurationServer {
    return isRecord(value) &&
        hasOptionalStringFields(value, ['server']) &&
        (value.server_key_id === undefined ||
            (typeof value.server_key_id === 'number' && Number.isFinite(value.server_key_id)))
}

function isValidServerConfig(value: unknown): value is ConfigurationServerConfig {
    return isRecord(value) && hasOptionalStringFields(value, ['server', 'clone_code'])
}

function isValidDevice(value: unknown): value is ConfigurationDeviceConfig {
    if (!isRecord(value) || !hasOptionalStringFields(value, ['device_token', 'private_key', 'public_key'])) {
        return false
    }
    return value.server_info === undefined ||
        (Array.isArray(value.server_info) && value.server_info.every(isValidServerConfig))
}

export function isValidKeeperConfig(value: unknown): value is KeeperJsonConfig {
    if (!isRecord(value) || !hasOptionalStringFields(value, ['last_login', 'last_server', 'user', 'server'])) {
        return false
    }
    if (!hasOptionalStringFields(value, ['device_token', 'private_key', 'clone_code'])) return false
    return (value.users === undefined || (Array.isArray(value.users) && value.users.every(isValidUser))) &&
        (value.servers === undefined || (Array.isArray(value.servers) && value.servers.every(isValidServer))) &&
        (value.devices === undefined || (Array.isArray(value.devices) && value.devices.every(isValidDevice)))
}

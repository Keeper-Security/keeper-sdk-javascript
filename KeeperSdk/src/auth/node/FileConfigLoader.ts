import fs from 'fs/promises'
import path from 'path'
import os from 'os'
import type { ConfigLoader, KeeperJsonConfig } from '../config'
import { isValidKeeperConfig } from '../config'
import { logger, extractErrorMessage, SdkDefaults } from '../../utils'

const commanderKeychainCache = new Map<string, Promise<Partial<KeeperJsonConfig>>>()

/** CAUTION: This is a Node-only class. */
export class FileConfigLoader implements ConfigLoader {
    public readonly configDir: string

    constructor(configDir?: string) {
        this.configDir = configDir || path.join(os.homedir(), SdkDefaults.CONFIG_DIR)
    }

    async load(): Promise<KeeperJsonConfig> {
        const configPath = path.join(this.configDir, 'config.json')
        try {
            const content = await fs.readFile(configPath, 'utf-8')
            const parsed: unknown = JSON.parse(content)
            if (isValidKeeperConfig(parsed)) {
                const keychainConfig = await this.loadCommanderKeychainConfig(parsed)
                return { ...parsed, ...keychainConfig }
            }
        } catch (err) {
            logger.debug('Failed to load keeper config:', extractErrorMessage(err))
        }
        return {}
    }

    async save(config: KeeperJsonConfig): Promise<void> {
        const configPath = path.join(this.configDir, 'config.json')
        await fs.mkdir(this.configDir, { recursive: true, mode: 0o700 })
        const configToSave = config.config_storage?.startsWith('os-keychain://')
            ? { ...config, config_storage: 'file' }
            : config
        await fs.writeFile(this.configPath, JSON.stringify(configToSave, null, 2), {
            mode: 0o600,
        })
    }

    private async loadCommanderKeychainConfig(config: KeeperJsonConfig): Promise<Partial<KeeperJsonConfig>> {
        const storage = config.config_storage
        if (!storage || storage === 'file' || !storage.startsWith('os-keychain://')) return {}

        const account = storage.slice('os-keychain://'.length) || 'config'
        const cached = commanderKeychainCache.get(account)
        if (cached) return cached

        const loadPromise = this.readCommanderKeychainConfig(account)
        commanderKeychainCache.set(account, loadPromise)
        return loadPromise
    }

    private async readCommanderKeychainConfig(account: string): Promise<Partial<KeeperJsonConfig>> {
        try {
            const keytar = await import('keytar')
            const password = await keytar.getPassword('KeeperCommander', account)
            if (!password) return {}

            const keychainConfig: unknown = JSON.parse(password)
            return isValidKeeperConfig(keychainConfig) ? keychainConfig : {}
        } catch (err) {
            logger.debug('Failed to load Commander keychain config:', extractErrorMessage(err))
            return {}
        }
    }
}

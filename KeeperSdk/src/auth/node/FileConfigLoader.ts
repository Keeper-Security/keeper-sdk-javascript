import fs from 'fs/promises'
import path from 'path'
import os from 'os'
import type { ConfigLoader, KeeperJsonConfig } from '../config'
import { isValidKeeperConfig } from '../config'
import { logger, extractErrorMessage, SdkDefaults } from '../../utils'

/** Node-only: read/write `~/.keeper/config.json`. */
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
                return parsed
            }
        } catch (err) {
            logger.debug('Failed to load keeper config:', extractErrorMessage(err))
        }
        return {}
    }

    async save(config: KeeperJsonConfig): Promise<void> {
        const configPath = path.join(this.configDir, 'config.json')
        await fs.writeFile(configPath, JSON.stringify(config, null, 2), {
            mode: 0o600,
        })
    }
}

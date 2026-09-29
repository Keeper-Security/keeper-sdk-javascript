import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import os from 'os'
import type { ConfigLoader, KeeperJsonConfig } from '../config'
import { isValidKeeperConfig } from '../config'
import { logger, extractErrorMessage, SdkDefaults } from '../../utils'

/** CAUTION: This is a Node-only class. */
export class FileConfigLoader implements ConfigLoader {
    public readonly configDir: string
    private readonly configPath: string

    constructor(configDir?: string) {
        const configuredFile = process.env.KEEPER_CONFIG_FILE
        if (configDir) {
            this.configDir = configDir
            this.configPath = path.join(configDir, 'config.json')
        } else if (configuredFile) {
            this.configPath = path.resolve(configuredFile)
            this.configDir = path.dirname(this.configPath)
        } else {
            const currentDirectoryConfig = path.join(process.cwd(), 'config.json')
            this.configPath = existsSync(currentDirectoryConfig)
                ? currentDirectoryConfig
                : path.join(os.homedir(), SdkDefaults.CONFIG_DIR, 'config.json')
            this.configDir = path.dirname(this.configPath)
        }
    }

    async load(): Promise<KeeperJsonConfig> {
        try {
            const content = await fs.readFile(this.configPath, 'utf-8')
            const parsed: unknown = JSON.parse(content)
            if (isValidKeeperConfig(parsed)) {
                return parsed
            }
        } catch (err) {
            if ((err as NodeJS.ErrnoException)?.code === 'ENOENT') {
                try {
                    await this.save({})
                } catch (saveErr) {
                    logger.debug('Failed to create keeper config:', extractErrorMessage(saveErr))
                }
                return {}
            }
            logger.debug('Failed to load keeper config:', extractErrorMessage(err))
        }
        return {}
    }

    async save(config: KeeperJsonConfig): Promise<void> {
        await fs.mkdir(this.configDir, { recursive: true, mode: 0o700 })
        await fs.writeFile(this.configPath, JSON.stringify(config, null, 2), {
            mode: 0o600,
        })
    }
}

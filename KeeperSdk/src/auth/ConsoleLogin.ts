import readline from 'readline/promises'
import { KeeperVault } from '../vault/KeeperVault'
import {
    logger,
    extractResultCode,
    extractErrorMessage,
    KeeperSdkError,
    SdkDefaults,
    AuthDefaults,
    ResultCodes,
    KEEPER_PUBLIC_HOSTS,
} from '../utils'
import { FileConfigLoader } from './SessionManager'
import type { KeeperJsonConfig } from './SessionManager'

const defaultConfigLoader = new FileConfigLoader()

let rlManager: ReadlineManager | null = null
let suppressionDepth = 0
let originals: {
    log: typeof console.log
    warn: typeof console.warn
    debug: typeof console.debug
    error: typeof console.error
    stdoutWrite: typeof process.stdout.write
    stderrWrite: typeof process.stderr.write
} | null = null

enum CliCharAction {
    Submit,
    Cancel,
    Backspace,
    Append,
}

function classifyInputChar(ch: string): CliCharAction {
    if (ch === '\n' || ch === '\r') return CliCharAction.Submit
    if (ch === '\u0003') return CliCharAction.Cancel
    if (ch === '\u007F' || ch === '\b') return CliCharAction.Backspace
    return CliCharAction.Append
}

class ReadlineManager {
    private rl: readline.Interface | null = null

    private getOrCreate(): readline.Interface {
        if (!this.rl) {
            this.rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            })
        }
        return this.rl
    }

    public async question(query: string): Promise<string> {
        const rl = this.getOrCreate()
        const answer = await rl.question(query)
        return answer.trim()
    }

    public close(): void {
        if (this.rl) {
            this.rl.close()
            this.rl = null
        }
    }
}

function getReadlineManager(): ReadlineManager {
    if (!rlManager) {
        rlManager = new ReadlineManager()
    }
    return rlManager
}

export function prompt(question: string, masked = false): Promise<string> {
    const mgr = getReadlineManager()
    if (!masked) {
        return mgr.question(question)
    }

    return new Promise((resolve, reject) => {
        mgr.close()
        process.stdout.write(question)
        let buf = ''
        process.stdin.setRawMode(true)
        process.stdin.resume()
        process.stdin.setEncoding('utf8')

        function exitRawMode() {
            process.stdout.write('\n')
            process.stdin.setRawMode(false)
            process.stdin.pause()
            process.stdin.removeListener('data', onData)
        }

        const onData = (str: string) => {
            for (const ch of str) {
                switch (classifyInputChar(ch)) {
                    case CliCharAction.Submit:
                        exitRawMode()
                        resolve(buf.trim())
                        return
                    case CliCharAction.Cancel:
                        exitRawMode()
                        reject(new KeeperSdkError('Operation cancelled by user.', ResultCodes.USER_CANCELLED))
                        return
                    case CliCharAction.Backspace:
                        if (buf.length > 0) {
                            buf = buf.slice(0, -1)
                            process.stdout.write('\b \b')
                        }
                        break
                    case CliCharAction.Append:
                        buf += ch
                        process.stdout.write('*')
                        break
                }
            }
        }

        process.stdin.on('data', onData)
    })
}

export async function loadKeeperConfig(preloaded?: KeeperJsonConfig): Promise<KeeperJsonConfig> {
    if (preloaded) return preloaded
    return defaultConfigLoader.load()
}

export async function resolveServer(username?: string, preloadedConfig?: KeeperJsonConfig): Promise<string> {
    const config = await loadKeeperConfig(preloadedConfig)
    const configServer = config.last_server || config.server

    if (username) {
        const users = config.users || []
        const userEntry = users.find(
            (u) => u.user?.toLowerCase() === username.toLowerCase()
        )
        if (userEntry?.server) return userEntry.server
    }

    if (configServer) return configServer

    logger.info('Select server region:')
    const entries = Object.entries(KEEPER_PUBLIC_HOSTS)
    entries.forEach(([region, host], i) => {
        logger.info(`  ${i + 1}. ${region} (${host})`)
    })
    logger.info(`  Or enter a hostname directly (e.g. dev.keepersecurity.com)`)

    const choice = await prompt('Region [1 = US]: ')

    if (!choice) return KEEPER_PUBLIC_HOSTS.US

    const idx = parseInt(choice, 10) - 1
    if (idx >= 0 && idx < entries.length) return entries[idx][1]

    const byName = KEEPER_PUBLIC_HOSTS[choice.toUpperCase()]
    if (byName) return byName

    return choice
}

export function suppressLogs(): () => void {
    if (suppressionDepth === 0) {
        originals = {
            log: console.log,
            warn: console.warn,
            debug: console.debug,
            error: console.error,
            stdoutWrite: process.stdout.write.bind(process.stdout),
            stderrWrite: process.stderr.write.bind(process.stderr),
        }
        console.log = () => {}
        console.warn = () => {}
        console.debug = () => {}
        console.error = () => {}
        process.stdout.write = (() => true) as typeof process.stdout.write
        process.stderr.write = (() => true) as typeof process.stderr.write
    }
    suppressionDepth++

    let restored = false
    return () => {
        if (restored) return
        restored = true
        suppressionDepth--
        if (suppressionDepth === 0 && originals) {
            console.log = originals.log
            console.warn = originals.warn
            console.debug = originals.debug
            console.error = originals.error
            process.stdout.write = originals.stdoutWrite
            process.stderr.write = originals.stderrWrite
            originals = null
        }
    }
}

async function withSuppressedOutput<T>(fn: () => Promise<T>): Promise<T> {
    const restore = suppressLogs()
    try {
        return await fn()
    } finally {
        restore()
    }
}

export async function login(): Promise<KeeperVault> {
    const config = await loadKeeperConfig()
    const defaultUsername = config.last_login || config.user || ''

    const host = defaultUsername
        ? await resolveServer(defaultUsername, config)
        : undefined

    if (defaultUsername && host) {
        const vault = await tryPersistentLogin(host, defaultUsername)
        if (vault) return vault
    }

    let username: string
    if (defaultUsername) {
        logger.info(`Enter master password for ${defaultUsername}`)
        username = defaultUsername
    } else {
        username = await prompt('Username (email): ')
    }

    if (!username) {
        throw new KeeperSdkError('Username is required.', ResultCodes.MISSING_USERNAME)
    }

    const resolvedHost = host || await resolveServer(username, config)
    return await interactiveLogin(resolvedHost, username)
}

async function tryPersistentLogin(host: string, username: string): Promise<KeeperVault | null> {
    const vault = new KeeperVault({ host, clientVersion: SdkDefaults.CLIENT_VERSION })
    try {
        await withSuppressedOutput(() => vault.resumeSession())
        logger.info(`Logging in to Keeper as ${username}`)
        logger.info('Successfully authenticated with Persistent Login')
        return await syncVault(vault)
    } catch (err) {
        logger.debug('Persistent login failed:', extractErrorMessage(err))
        vault.disconnect()
        return null
    }
}

async function interactiveLogin(host: string, username: string): Promise<KeeperVault> {
    const vault = new KeeperVault({ host, clientVersion: SdkDefaults.CLIENT_VERSION })

    for (let attempt = 1; attempt <= AuthDefaults.MAX_LOGIN_ATTEMPTS; attempt++) {
        const password = await prompt('Password: ', true)

        if (!password) {
            throw new KeeperSdkError('Password is required.', ResultCodes.MISSING_PASSWORD)
        }

        try {
            await withSuppressedOutput(() => vault.login(username, password))
            logger.info('Successfully authenticated with Master Password\n')
            return await syncVault(vault)
        } catch (err) {
            const resultCode = extractResultCode(err)
            if (resultCode === ResultCodes.INVALID_CREDENTIALS) {
                const remaining = AuthDefaults.MAX_LOGIN_ATTEMPTS - attempt
                if (remaining > 0) {
                    logger.warn(`Invalid credentials (${remaining} attempt${remaining === 1 ? '' : 's'} remaining)`)
                    continue
                }
                throw new KeeperSdkError(
                    `Maximum login attempts (${AuthDefaults.MAX_LOGIN_ATTEMPTS}) exceeded.`,
                    ResultCodes.MAX_ATTEMPTS_EXCEEDED
                )
            }
            throw KeeperSdkError.from(err)
        }
    }

    throw new KeeperSdkError(
        `Maximum login attempts (${AuthDefaults.MAX_LOGIN_ATTEMPTS}) exceeded.`,
        ResultCodes.MAX_ATTEMPTS_EXCEEDED
    )
}

async function syncVault(vault: KeeperVault): Promise<KeeperVault> {
    logger.info('Syncing vault...')
    await withSuppressedOutput(() => vault.sync())
    logger.info(`Vault synced. ${vault.getSummary().recordCount} records loaded.\n`)
    return vault
}

export function cleanup(vault: KeeperVault): void {
    vault.disconnect()
    getReadlineManager().close()
}

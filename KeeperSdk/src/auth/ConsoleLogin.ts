import readline from 'readline'
import fs from 'fs'
import path from 'path'
import os from 'os'
import { KeeperVault } from '../vault/KeeperVault'
import { logger } from '../utils/Logger'
import { extractResultCode, extractErrorMessage, KeeperSdkError } from '../utils/errors'
import { SdkDefaults } from '../utils/constants'

class ReadlineManager {
    private rl: readline.Interface

    constructor() {
        this.rl = this.create()
    }

    private create(): readline.Interface {
        return readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })
    }

    public reopen(): void {
        this.rl = this.create()
    }

    public question(query: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(query, (answer) => resolve(answer.trim()))
        })
    }

    public close(): void {
        this.rl.close()
    }
}

const rlManager = new ReadlineManager()

export function prompt(question: string, masked = false): Promise<string> {
    if (!masked) {
        return rlManager.question(question)
    }

    return new Promise((resolve, reject) => {
        rlManager.close()
        process.stdout.write(question)
        let buf = ''
        process.stdin.setRawMode(true)
        process.stdin.resume()
        process.stdin.setEncoding('utf8')

        const onData = (str: string) => {
            for (const ch of str) {
                if (ch === '\n' || ch === '\r') {
                    process.stdout.write('\n')
                    process.stdin.setRawMode(false)
                    process.stdin.pause()
                    process.stdin.removeListener('data', onData)
                    rlManager.reopen()
                    resolve(buf.trim())
                    return
                } else if (ch === '\u0003') {
                    process.stdout.write('\n')
                    process.stdin.setRawMode(false)
                    process.stdin.pause()
                    process.stdin.removeListener('data', onData)
                    rlManager.reopen()
                    reject(new KeeperSdkError('Operation cancelled by user.', 'user_cancelled'))
                    return
                } else if (ch === '\u007F' || ch === '\b') {
                    if (buf.length > 0) {
                        buf = buf.slice(0, -1)
                        process.stdout.write('\b \b')
                    }
                } else {
                    buf += ch
                    process.stdout.write('*')
                }
            }
        }

        process.stdin.on('data', onData)
    })
}

export const KEEPER_PUBLIC_HOSTS: Record<string, string> = {
    US: 'keepersecurity.com',
    EU: 'keepersecurity.eu',
    AU: 'keepersecurity.com.au',
    GOV: 'govcloud.keepersecurity.us',
    JP: 'keepersecurity.jp',
    CA: 'keepersecurity.ca',
    DEV: 'dev.keepersecurity.com',
}

type KeeperConfig = {
    last_login?: string
    user?: string
    last_server?: string
    server?: string
    users?: { user?: string; server?: string }[]
}

export function loadKeeperConfig(): KeeperConfig {
    const configPath = path.join(os.homedir(), '.keeper', 'config.json')
    try {
        if (fs.existsSync(configPath)) {
            return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
        }
    } catch {}
    return {}
}

export async function resolveServer(username?: string): Promise<string> {
    const config = loadKeeperConfig()
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
    const origLog = console.log
    const origWarn = console.warn
    const origDebug = console.debug
    const origWrite = process.stdout.write.bind(process.stdout)

    console.log = () => {}
    console.warn = () => {}
    console.debug = () => {}
    const boundWrite: typeof process.stdout.write = () => true
    process.stdout.write = boundWrite

    return () => {
        console.log = origLog
        console.warn = origWarn
        console.debug = origDebug
        process.stdout.write = origWrite
    }
}

export async function login(): Promise<KeeperVault> {
    const config = loadKeeperConfig()
    const defaultUsername = config.last_login || config.user || ''

    let username: string
    if (defaultUsername) {
        logger.info(`Enter password for ${defaultUsername}`)
        username = defaultUsername
    } else {
        username = await prompt('Username (email): ')
    }

    if (!username) {
        throw new KeeperSdkError('Username is required.', 'missing_username')
    }

    const host = await resolveServer(username)

    const vault = new KeeperVault({
        host,
        clientVersion: SdkDefaults.CLIENT_VERSION,
    })

    const savedConsoleLog = console.log

    while (true) {
        // Restore console.log in case it was suppressed after a failed attempt
        console.log = savedConsoleLog

        const password = await prompt('Password: ', true)

        if (!password) {
            throw new KeeperSdkError('Password is required.', 'missing_password')
        }

        const restore = suppressLogs()
        try {
            await vault.login(username, password)
            restore()
            break
        } catch (err) {
            restore()
            const resultCode = extractResultCode(err)
            if (resultCode === 'invalid_credentials') {
                logger.warn('Invalid credentials')
                console.log = () => {}
                continue
            }
            throw KeeperSdkError.from(err)
        }
    }

    logger.info('Syncing vault...')

    const restore2 = suppressLogs()
    try {
        await vault.sync()
    } finally {
        restore2()
    }

    logger.info(`Vault synced. ${vault.getSummary().recordCount} records loaded.\n`)

    return vault
}

export async function cleanup(vault: KeeperVault): Promise<void> {
    const restore = suppressLogs()
    try {
        await vault.logout()
    } finally {
        restore()
    }
    rlManager.close()
}

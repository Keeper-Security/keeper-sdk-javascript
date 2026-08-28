import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'
import * as readline from 'readline'
import { login, cleanup, closePrompt, logger, extractErrorMessage, SdkDefaults } from '@keeper-security/keeper-sdk-javascript'
import { commands, splitCommandLine } from './commands'

const HISTORY_FILE = path.join(os.homedir(), SdkDefaults.CONFIG_DIR, 'repl_history')
const MAX_HISTORY = 500
const HISTORY_EVENT_RE = /^!(\d+)$/

// readline keeps history newest-first (index 0 = most recent); the file on disk is oldest-first, bash-style.
function loadHistory(): string[] {
    try {
        return fs
            .readFileSync(HISTORY_FILE, 'utf8')
            .split('\n')
            .filter(Boolean)
            .reverse()
    } catch {
        return []
    }
}

function saveHistory(newestFirst: string[]): void {
    try {
        fs.mkdirSync(path.dirname(HISTORY_FILE), { recursive: true, mode: 0o700 })
        const oldestFirst = [...newestFirst].reverse().slice(-MAX_HISTORY)
        fs.writeFileSync(HISTORY_FILE, oldestFirst.length ? oldestFirst.join('\n') + '\n' : '', { mode: 0o600 })
    } catch (err) {
        logger.debug('Failed to save command history:', extractErrorMessage(err))
    }
}

const NOT_PERSISTED_COMMANDS = new Set(['history', 'exit', 'quit', 'clear'])

function isNotPersistedCommand(line: string): boolean {
    const name = splitCommandLine(line)[0]?.toLowerCase()
    return !!name && NOT_PERSISTED_COMMANDS.has(name)
}

async function main() {
    const vault = await login()
    closePrompt()

    const initialHistory = loadHistory()
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        history: initialHistory,
        historySize: MAX_HISTORY,
    })

    let currentHistory: string[] = initialHistory
    rl.on('history', (h) => {
        // don't let REPL-control commands clutter history, live or persisted
        if (h.length > 0 && isNotPersistedCommand(h[0])) {
            h.shift()
        }
        currentHistory = h
        saveHistory(currentHistory)
    })

    let running = true
    const exit = () => {
        running = false
    }
    const history = () => [...currentHistory].reverse()

    const shutdown = async () => {
        saveHistory(currentHistory)
        rl.close()
        cleanup(vault)
    }
    // once we listen for 'SIGINT' ourselves, readline no longer exits the process on Ctrl+C for us
    rl.on('SIGINT', () => {
        shutdown()
            .catch(() => {})
            .finally(() => process.exit(0))
    })

    logger.info(`Logged in. Type "help" for a list of commands, "exit" to quit.\n`)

    try {
        while (running) {
            const folder = vault.getWorkingFolderDisplayName()
            let line = await new Promise<string>((resolve) => rl.question(`${folder}> `, resolve))

            const eventMatch = line.trim().match(HISTORY_EVENT_RE)
            if (eventMatch) {
                const expanded = history()[Number(eventMatch[1]) - 1]
                if (!expanded) {
                    logger.warn(`${line.trim()}: event not found`)
                    continue
                }
                logger.info(expanded)
                // record the expanded command in history instead of the literal "!n", bash-style
                if (currentHistory[0] === line) {
                    currentHistory[0] = expanded
                    saveHistory(currentHistory)
                }
                line = expanded
            }

            const [name, ...args] = splitCommandLine(line)
            if (!name) continue

            const command = commands[name.toLowerCase()]
            if (!command) {
                logger.warn(`Unknown command "${name}". Type "help" for a list of commands.`)
                continue
            }

            try {
                await command.run({ vault, args, exit, history })
            } catch (err) {
                logger.error(`Error: ${extractErrorMessage(err)}`)
            }
        }
    } finally {
        await shutdown()
    }
}

main().catch((err) => {
    logger.error('Fatal error:', extractErrorMessage(err))
    process.exitCode = 1
})

import * as path from 'path'
import {
    KeeperVault,
    DRecord,
    logger,
    extractErrorMessage,
    formatRecord,
    getRecordTitle,
    getRecordType,
    getRecordLogin,
    getRecordPassword,
    getRecordUrl,
    getRecordTotpUrl,
    getTotpCode,
    fetchEnterprisePamControllers,
    getKeeperRouterBaseUrl,
    webSafeUidFromBytes,
    formatTimestampMs,
    isKeeperRouterConnectionError,
    ResultCodes,
} from '@keeper-security/keeper-sdk-javascript'
import type { ListFolderResult } from '@keeper-security/keeper-sdk-javascript'
import { webSafe64FromBytes, pamGetOnlineControllersMessage } from '@keeper-security/keeperapi'

export type CommandContext = {
    vault: KeeperVault
    args: string[]
    exit: () => void
    history: () => string[]
}

export type Command = {
    usage: string
    description: string
    run: (ctx: CommandContext) => Promise<void>
}

const MASKED_VALUE = '********'
const LABEL_WIDTH = 16

function formatRow(label: string, value: string): string {
    return `${label.padStart(LABEL_WIDTH)}: ${value}`
}

function displayRecordDetail(record: DRecord): void {
    logger.info(`UID: ${record.uid}`)
    logger.info(formatRow('Type', getRecordType(record)))
    logger.info(formatRow('Title', getRecordTitle(record)))

    const loginVal = getRecordLogin(record)
    const password = getRecordPassword(record)
    const url = getRecordUrl(record)

    if (loginVal) logger.info(formatRow('login', loginVal))
    if (password) logger.info(formatRow('password', MASKED_VALUE))
    if (url) logger.info(formatRow('url', url))

    const totpUrl = getRecordTotpUrl(record)
    if (totpUrl) {
        const code = getTotpCode(totpUrl)
        if (code) logger.info(formatRow('Two Factor Code', `${code.code}  (valid ${code.secondsRemaining}s)`))
    }
}

export function splitCommandLine(line: string): string[] {
    return line.trim().split(/\s+/).filter(Boolean)
}

export type ScriptFn = (vault: KeeperVault, args: string[]) => Promise<void>

async function runScript(vault: KeeperVault, filePath: string, args: string[]): Promise<void> {
    const resolved = path.resolve(filePath)
    delete require.cache[resolved]
    const mod = require(resolved)
    const fn: ScriptFn | undefined = typeof mod === 'function' ? mod : mod.default
    if (typeof fn !== 'function') {
        logger.warn(`Script "${filePath}" must export a default async function(vault, args).`)
        return
    }
    await fn(vault, args)
}

function printFolderListing(result: ListFolderResult): void {
    if (result.folders.length === 0 && result.records.length === 0) {
        logger.info('(empty)')
        return
    }
    for (const folder of result.folders) {
        logger.info(`  ${folder.name}/`)
    }
    for (const record of result.records) {
        logger.info(`  ${record.name}  [${record.type}]  ${record.uid}`)
    }
}

export const commands: Record<string, Command> = {
    help: {
        usage: 'help',
        description: 'List available commands',
        run: async () => {
            const width = Math.max(...Object.values(commands).map((c) => c.usage.length))
            logger.info('Available commands:')
            for (const command of Object.values(commands)) {
                logger.info(`  ${command.usage.padEnd(width)}  ${command.description}`)
            }
        },
    },

    whoami: {
        usage: 'whoami',
        description: 'Show current session info',
        run: async ({ vault }) => {
            const auth = vault.getAuth()
            const summary = vault.getSummary()
            logger.info(`  Username:       ${auth.username}`)
            logger.info(`  Server:         ${vault.host}`)
            logger.info(`  Folder:         ${vault.getWorkingFolderDisplayName()}`)
            logger.info(`  Records:        ${summary.recordCount}`)
            logger.info(`  Shared Folders: ${summary.sharedFolderCount}`)
            logger.info(`  Teams:          ${summary.teamCount}`)
            logger.info(`  Folders:        ${summary.folderCount}`)
        },
    },

    pwd: {
        usage: 'pwd',
        description: 'Print current working folder',
        run: async ({ vault }) => {
            logger.info(vault.getWorkingFolderDisplayName())
        },
    },

    ls: {
        usage: 'ls [path]',
        description: 'List contents of the current (or given) folder',
        run: async ({ vault, args }) => {
            let folderUid = vault.getCurrentFolderUid()
            if (args[0]) {
                const resolved = await vault.tryResolvePath(args[0])
                if (resolved.remaining) {
                    logger.warn(`No such folder: ${args[0]}`)
                    return
                }
                folderUid = resolved.folderUid
            }
            const result = await vault.listFolder({ folderUid, showFolders: true, showRecords: true })
            printFolderListing(result)
        },
    },

    cd: {
        usage: 'cd [path]',
        description: 'Change the current working folder (cd / for vault root)',
        run: async ({ vault, args }) => {
            const target = args[0] || '/'
            try {
                const result = await vault.changeDirectory(target)
                logger.info(`Working folder: ${result.name}`)
            } catch (err) {
                logger.warn(`Failed to change directory: ${extractErrorMessage(err)}`)
            }
        },
    },

    tree: {
        usage: 'tree [path]',
        description: 'Show the folder tree from the current (or given) folder',
        run: async ({ vault, args }) => {
            try {
                const ascii = await vault.tree({ folderPath: args[0] || undefined, showRecords: true })
                logger.info(ascii)
            } catch (err) {
                logger.warn(`Failed to render tree: ${extractErrorMessage(err)}`)
            }
        },
    },

    list: {
        usage: 'list',
        description: 'List every record in the vault',
        run: async ({ vault }) => {
            const records = vault.getRecords()
            if (records.length === 0) {
                logger.info('No records found in vault.')
                return
            }
            for (const record of records) {
                logger.info(formatRecord(record))
            }
        },
    },

    find: {
        usage: 'find <text>',
        description: 'Search records by title, login, or URL',
        run: async ({ vault, args }) => {
            const criteria = args.join(' ').trim()
            if (!criteria) {
                logger.warn('Usage: find <text>')
                return
            }
            const matches = vault.findRecords(criteria)
            if (matches.length === 0) {
                logger.info('No matching records.')
                return
            }
            for (const record of matches) {
                logger.info(`  ${getRecordTitle(record)}  [${getRecordType(record)}]  ${record.uid}`)
            }
        },
    },

    get: {
        usage: 'get <uid|title>',
        description: 'Show details for a single record',
        run: async ({ vault, args }) => {
            const target = args.join(' ').trim()
            if (!target) {
                logger.warn('Usage: get <uid|title>')
                return
            }
            const record = vault.findRecord(target)
            if (!record) {
                logger.info(`Record "${target}" not found.`)
                return
            }
            displayRecordDetail(record)
        },
    },

    sync: {
        usage: 'sync',
        description: 'Re-sync the vault with the server',
        run: async ({ vault }) => {
            await vault.sync()
            const summary = vault.getSummary()
            logger.info(`Synced. ${summary.recordCount} records loaded.`)
        },
    },

    get_controllers: {
        usage: 'get_controllers',
        description: 'Call the PAM router API (pam/get_controllers) and list enterprise gateways',
        run: async ({ vault }) => {
            try {
                const controllers = await fetchEnterprisePamControllers(
                    vault.getAuth(),
                    ResultCodes.PAM_GATEWAY_LIST_FAILED
                )
                if (controllers.length === 0) {
                    logger.info('No controllers found.')
                    return
                }
                for (const controller of controllers) {
                    const uid = webSafe64FromBytes(controller.controllerUid ?? new Uint8Array())
                    logger.info(
                        `  ${(controller.controllerName || '(unnamed)').padEnd(24)} uid=${uid}  node=${controller.nodeId ?? ''}  device=${controller.deviceName || ''}`
                    )
                }
            } catch (err) {
                logger.warn(extractErrorMessage(err))
            }
        },
    },

    get_online_controllers: {
        usage: 'get_online_controllers',
        description: 'Call the PAM router API (loadOnlineControllers) and list connected gateways',
        run: async ({ vault }) => {
            const routerHost = getKeeperRouterBaseUrl(vault.host)
            try {
                const response = await vault.getAuth().executeRouterRest(pamGetOnlineControllersMessage())
                const controllers = response.controllers ?? []
                if (controllers.length === 0) {
                    logger.info('No online controllers found.')
                    return
                }
                for (const controller of controllers) {
                    const uid = webSafeUidFromBytes(controller.controllerUid)
                    logger.info(
                        `  uid=${uid}  ip=${controller.ipAddress || ''}  version=${controller.version || ''}  connectedOn=${formatTimestampMs(controller.connectedOn)}`
                    )
                }
            } catch (err) {
                if (isKeeperRouterConnectionError(err)) {
                    logger.warn(`Router appears to be down. Router URL [${routerHost}]`)
                    return
                }
                logger.warn(extractErrorMessage(err))
            }
        },
    },

    run: {
        usage: 'run <script.ts> [args...]',
        description: 'Execute a TypeScript file exporting a default async function(vault, args)',
        run: async ({ vault, args }) => {
            const [filePath, ...scriptArgs] = args
            if (!filePath) {
                logger.warn('Usage: run <script.ts> [args...]')
                return
            }
            try {
                await runScript(vault, filePath, scriptArgs)
            } catch (err) {
                logger.warn(`Failed to run script "${filePath}": ${extractErrorMessage(err)}`)
            }
        },
    },

    history: {
        usage: 'history',
        description: 'Show command history',
        run: async ({ history }) => {
            const entries = history()
            if (entries.length === 0) {
                logger.info('No history yet.')
                return
            }
            const width = String(entries.length).length
            entries.forEach((entry, i) => {
                logger.info(`  ${String(i + 1).padStart(width)}  ${entry}`)
            })
        },
    },

    clear: {
        usage: 'clear',
        description: 'Clear the screen',
        run: async () => {
            process.stdout.write('\x1Bc')
        },
    },

    exit: {
        usage: 'exit',
        description: 'Log out and quit the REPL',
        run: async ({ exit }) => exit(),
    },

    quit: {
        usage: 'quit',
        description: 'Alias for exit',
        run: async ({ exit }) => exit(),
    },
}

import { registerBuiltinCliCommands } from './builtinCommands'
import { registerCliAlias } from './registry'

let registryInitialized = false

/** Register built-in Keeper CLI commands (idempotent). */
export function ensureKeeperCliRegistry(): void {
    if (registryInitialized) return
    registryInitialized = true
    registerBuiltinCliCommands()
    registerCliAlias('?', 'help')
}

ensureKeeperCliRegistry()

export type {
    CliResult,
    ParsedCli,
    CliHelpDoc,
    CliCommandDefinition,
    KeeperCliHost,
    KeeperCliVault,
} from './types'

export {
    tokenizeArguments,
    parseCliArgs,
    hasOpt,
    getOpt,
    wantsCliHelp,
    rejectUnknownOptions,
} from './parse'

export {
    formatDetailedHelp,
    formatDetailedHelpForCommand,
    formatAllCommandsSummary,
    formatShortCommandSummary,
} from './help'
import { getDetailedHelpPageForRegistry } from './help'
import { listCliCommands } from './registry'

export function getDetailedHelpPage(name: string): string | null {
    ensureKeeperCliRegistry()
    return getDetailedHelpPageForRegistry(listCliCommands(), name)
}

export {
    registerCliCommand,
    registerCliAlias,
    resolveCliCommandName,
    getCliCommand,
    listCliCommands,
    listCliCommandNames,
    listDocumentedCommands,
    clearCliRegistry,
} from './registry'

export {
    AUTH_CLI_COMMAND_NAMES,
    isAuthCliCommand,
    filterCliCommandsForLoginState,
    listCliCommandsForLoginState,
    listCliCommandNamesForLoginState,
} from './access'

export { dispatchKeeperCli, dispatchCliLine } from './dispatch'

export { KeeperCliParser, createKeeperCliParser } from './parser'
export type { KeeperCliParserOptions } from './parser'

export {
    runLoginCommand,
    loginWithCredentials,
    loginWithSessionToken,
    ensureLoggedIn,
    loginCommand,
} from './commands/login'

export { runLogoutCommand, logoutCommand } from './commands/logout'
export { vaultCommand } from './commands/vault'
export { helpCommand } from './commands/help'
export { restoreSessionCommand } from './commands/restoreSession'
export { syncCommand, runVaultSync } from './commands/sync'

export { getKeeperCliPromptPrefix } from './prompt'
export { BUILTIN_CLI_COMMANDS, registerBuiltinCliCommands } from './builtinCommands'
export {
    getCommand,
    executeGet,
    listCommand,
    searchCommand,
    listSfCommand,
    whoamiCommand,
    lsCommand,
    cdCommand,
    treeCommand,
    mkdirCommand,
} from './commander'

export { utf8ToBase64Url, recordUid } from './utils'

export type { SessionRestoreInput } from '../auth/sessionRestore'
export {
    toSessionParams,
    validateSessionRestoreInput,
    sessionRestoreFromJson,
    resolveSessionRestorePayload,
} from '../auth/sessionRestore'

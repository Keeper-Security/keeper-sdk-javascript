import type { CliCommandDefinition } from './types'
import { registerCliCommand } from './registry'
import { helpCommand } from './commands/help'
import { loginCommand } from './commands/login'
import { logoutCommand } from './commands/logout'
import { restoreSessionCommand } from './commands/restoreSession'
import { syncCommand } from './commands/sync'
import { vaultCommand } from './commands/vault'
import { getCommand } from './commander/get'
import { cdCommand, lsCommand, mkdirCommand, treeCommand } from './commander/nav'
import { listCommand, listSfCommand, searchCommand, whoamiCommand } from './commander/misc'

/** Built-in CLI commands (Keeper Commander-style vault shell). */
export const BUILTIN_CLI_COMMANDS: readonly CliCommandDefinition[] = [
    helpCommand,
    loginCommand,
    restoreSessionCommand,
    syncCommand,
    vaultCommand,
    getCommand,
    listCommand,
    lsCommand,
    cdCommand,
    treeCommand,
    mkdirCommand,
    searchCommand,
    listSfCommand,
    whoamiCommand,
    logoutCommand,
]

export function registerBuiltinCliCommands(): void {
    for (const def of BUILTIN_CLI_COMMANDS) {
        registerCliCommand(def)
    }
}

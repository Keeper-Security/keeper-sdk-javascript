import type { CliCommandDefinition } from './types'
import { listCliCommands, resolveCliCommandName } from './registry'

/** Commands available before a vault session exists. */
export const AUTH_CLI_COMMAND_NAMES = new Set<string>([
    'help',
    'login',
    'restore-session',
])

export function isAuthCliCommand(name: string): boolean {
    const resolved = resolveCliCommandName(name)
    return resolved != null && AUTH_CLI_COMMAND_NAMES.has(resolved)
}

export function filterCliCommandsForLoginState(
    commands: readonly CliCommandDefinition[],
    loggedIn: boolean
): CliCommandDefinition[] {
    if (loggedIn) return [...commands]
    return commands.filter((c) => AUTH_CLI_COMMAND_NAMES.has(c.name))
}

export function listCliCommandsForLoginState(loggedIn: boolean): CliCommandDefinition[] {
    return filterCliCommandsForLoginState(listCliCommands(), loggedIn)
}

export function listCliCommandNamesForLoginState(loggedIn: boolean): readonly string[] {
    return listCliCommandsForLoginState(loggedIn).map((c) => c.name)
}

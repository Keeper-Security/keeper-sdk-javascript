import type { CliCommandDefinition, KeeperCliHost } from '../types'
import { wantsCliHelp } from '../parse'
import {
    formatAllCommandsSummary,
    formatDetailedHelpForCommand,
    formatShortCommandSummary,
    getDetailedHelpPageForRegistry,
} from '../help'
import { isAuthCliCommand, listCliCommandsForLoginState } from '../access'
import { getCliCommand } from '../registry'

export const helpCommand: CliCommandDefinition = {
    name: 'help',
    order: 0,
    description: 'Show all commands, or full docs for one command (same as COMMAND --help).',
    usage: 'help [command]  (see also: help --help)',
    help: {
        description: 'Show all commands, or full docs for one command (same as COMMAND --help).',
        usage: '[-h] [command]',
        positionals: [{ name: 'command', nargs: '?', help: 'command name' }],
    },
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) {
            return { code: 0, out: formatDetailedHelpForCommand(helpCommand), err: '' }
        }
        if (parsed.opts.size > 0) {
            return { code: 1, out: '', err: 'help: unknown option (try `help --help`)\n' }
        }
        const loggedIn = host.getVault().isLoggedIn
        const visible = listCliCommandsForLoginState(loggedIn)
        const args = parsed.positional
        if (args.length === 0) {
            if (loggedIn) {
                return { code: 0, out: formatAllCommandsSummary(visible), err: '' }
            }
            return {
                code: 0,
                out: formatAllCommandsSummary(visible, {
                    header: 'Not logged in — sign-in commands:\n\n',
                    footer:
                        '\nRun `login` or `restore-session` to open the vault.\n' +
                        'After login, run `help` again for vault commands (get, ls, cd, …).\n',
                }),
                err: '',
            }
        }
        if (args.length > 1) {
            return { code: 1, out: '', err: 'Usage: help [command]\n' }
        }
        const name = args[0]
        if (!loggedIn && !isAuthCliCommand(name)) {
            return {
                code: 1,
                out: '',
                err:
                    `help: "${name}" requires a logged-in session. ` +
                    'Run `help` for sign-in commands (login, restore-session).\n',
            }
        }
        const long = getDetailedHelpPageForRegistry(visible, name)
        if (long) {
            return { code: 0, out: long, err: '' }
        }
        const def = getCliCommand(name)
        if (!def) {
            return { code: 1, out: '', err: `help: unknown command: ${name}\n` }
        }
        return { code: 0, out: formatShortCommandSummary(def), err: '' }
    },
}

import type { CliCommandDefinition, CliResult, KeeperCliHost, ParsedCli } from '../types'
import { wantsCliHelp } from '../parse'
import { formatDetailedHelpForCommand } from '../help'

export async function runLogoutCommand(host: KeeperCliHost, parsed?: ParsedCli): Promise<CliResult> {
    if (parsed && wantsCliHelp(parsed)) {
        return { code: 0, out: formatDetailedHelpForCommand(logoutCommand), err: '' }
    }
    if (parsed && parsed.opts.size > 0) {
        return { code: 1, out: '', err: 'logout: no options (try: logout --help)\n' }
    }
    if (parsed && parsed.positional.length > 0) {
        return { code: 1, out: '', err: 'Usage: logout\n' }
    }
    try {
        const v = host.getVault()
        if (!v.isLoggedIn) {
            return { code: 0, out: 'keeper: already logged out.\n', err: '' }
        }
        await v.logout()
        return { code: 0, out: 'keeper: logged out.\n', err: '' }
    } catch (e) {
        return { code: 1, out: '', err: host.formatError('keeper', e) }
    }
}

export const logoutCommand: CliCommandDefinition = {
    name: 'logout',
    order: 200,
    description: 'Log out of the current Keeper session.',
    usage: 'logout [--help|-h]',
    help: {
        title: 'logout — end the current Keeper session',
        synopsis: '  logout',
        description: '  Ends the current session if one exists.',
        options: '  None.',
    },
    run: (host, parsed) => runLogoutCommand(host, parsed),
}

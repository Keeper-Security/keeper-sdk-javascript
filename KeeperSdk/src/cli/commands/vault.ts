import type { CliCommandDefinition, CliResult, KeeperCliHost, ParsedCli } from '../types'
import { hasOpt, wantsCliHelp } from '../parse'
import { formatDetailedHelpForCommand } from '../help'
import { ensureCapability, ensureSession } from '../commandHelpers'

async function runSummary(host: KeeperCliHost, parsed: ParsedCli): Promise<CliResult> {
    const r = await ensureSession(host)
    if (r) return r
    const v = host.getVault()
    const cap = ensureCapability(v, 'getSummary', 'vault summary')
    if (cap) return cap
    await v.sync!()
    const summary = v.getSummary!()
    if (hasOpt(parsed.opts, 'json')) {
        return { code: 0, out: JSON.stringify(summary, null, 2) + '\n', err: '' }
    }
    const lines = [
        `records:         ${summary.recordCount}`,
        `shared_folders:  ${summary.sharedFolderCount}`,
        `teams:           ${summary.teamCount}`,
        `folders:         ${summary.folderCount}`,
    ]
    return { code: 0, out: lines.join('\n') + '\n', err: '' }
}

export const vaultCommand: CliCommandDefinition = {
    name: 'vault',
    order: 25,
    description: 'Vault summary counts (records, folders, shared folders).',
    usage: 'vault summary [--json] [--help|-h]',
    subcommands: ['summary'],
    flagOptions: ['--json'],
    help: {
        description: 'Vault summary counts (records, folders, shared folders).',
        usage: '[-h] [--json] summary',
        positionals: [{ name: 'summary', help: 'print record, shared folder, and user-folder counts' }],
        options: [{ flags: '--json', help: 'emit JSON' }],
    },
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) {
            return { code: 0, out: formatDetailedHelpForCommand(vaultCommand), err: '' }
        }
        const sub = parsed.positional[0]?.toLowerCase() ?? 'summary'
        if (sub !== 'summary') {
            return { code: 1, out: '', err: 'Usage: vault summary\n' }
        }
        try {
            return await runSummary(host, parsed)
        } catch (e) {
            return { code: 1, out: '', err: host.formatError('vault summary', e) }
        }
    },
}

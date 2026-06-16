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
        title: 'vault — vault-wide statistics',
        synopsis: '  vault summary [--json]',
        description: '  Runs sync, then prints counts from the local vault cache.',
        arguments: '  summary   Print record, shared folder, and user-folder counts.',
        options: '  --json      Emit JSON.\n  --help, -h  Show this help.',
        examples: '  vault summary\n  vault summary --json',
        seeAlso: '  sync, list, tree, whoami',
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

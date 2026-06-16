import type { SyncResult } from '@keeper-security/keeperapi'
import type { CliCommandDefinition, CliResult, KeeperCliHost } from '../types'
import { wantsCliHelp } from '../parse'
import { formatDetailedHelpForCommand } from '../help'
import { ensureLoggedIn } from './login'

function formatSyncSummary(result: SyncResult): string {
    const lines = [`keeper: sync complete for ${result.username}.`, `  pages: ${result.pageCount}`]
    if (result.totalTime) lines.push(`  total: ${result.totalTime}`)
    if (result.networkTime) lines.push(`  network: ${result.networkTime}`)
    const counts = result.counts ?? {}
    const parts = Object.entries(counts)
        .filter(([, n]) => typeof n === 'number' && n > 0)
        .map(([k, n]) => `${k}=${n}`)
    if (parts.length) lines.push(`  counts: ${parts.join(', ')}`)
    if (result.error) lines.push(`  warning: ${result.error}`)
    return lines.join('\n') + '\n'
}

/** Download vault data via keeperapi syncDown (KeeperVault.sync). */
export async function runVaultSync(host: KeeperCliHost): Promise<CliResult> {
    const v = host.getVault()
    if (!v.isLoggedIn) {
        const login = await ensureLoggedIn(host)
        if (login.code !== 0) return login
    }
    const result = await v.sync()
    return { code: 0, out: formatSyncSummary(result), err: '' }
}

export const syncCommand: CliCommandDefinition = {
    name: 'sync',
    order: 20,
    aliases: ['syncdown', 'sync-down', 'd'],
    description: 'Download / refresh vault data from Keeper (syncDown).',
    usage: 'sync [--help|-h]',
    help: {
        title: 'sync — download vault data (syncDown)',
        synopsis: '  sync',
        description: `  Pulls records, folders, and related vault data into local storage.
  Requires an active session (login or restore-session).`,
        options: '  --help, -h    Show this help.',
        seeAlso: '  restore-session --sync, list, ls',
    },
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) {
            return { code: 0, out: formatDetailedHelpForCommand(syncCommand), err: '' }
        }
        if (parsed.opts.size > 0) {
            return { code: 1, out: '', err: 'sync: unknown option (try: sync --help)\n' }
        }
        if (parsed.positional.length > 0) {
            return { code: 1, out: '', err: 'sync: unexpected arguments (try: sync --help)\n' }
        }
        try {
            return await runVaultSync(host)
        } catch (e) {
            return { code: 1, out: '', err: host.formatError('sync', e) }
        }
    },
}

import type { CliCommandDefinition, CliResult, KeeperCliHost, ParsedCli } from '../types'
import { getOpt, hasOpt, wantsCliHelp } from '../parse'
import { formatDetailedHelpForCommand } from '../help'
import { ensureCapability, ensureSession } from '../commandHelpers'
import { formatTable } from '../table'
import { getRecordTitle } from '../../records/RecordUtils'
import { renderRecordsListTable } from '../../records/listRecordsTable'
import { recordUid } from '../utils'
import { formatSharedFoldersTable, renderSharedFoldersAsciiTable } from '../../sharedFolders/listSharedFolders'

async function runList(host: KeeperCliHost, parsed: ParsedCli): Promise<CliResult> {
    const r = await ensureSession(host)
    if (r) return r
    const v = host.getVault()
    await v.sync()
    const records = v.getRecords()
    if (hasOpt(parsed.opts, 'json')) {
        return { code: 0, out: JSON.stringify(records, null, 2) + '\n', err: '' }
    }
    if (records.length === 0) {
        return { code: 0, out: '(no records)\n', err: '' }
    }
    const verbose = hasOpt(parsed.opts, 'verbose') || hasOpt(parsed.opts, 'v')
    const out = renderRecordsListTable(records, { verbose }) + '\n'
    return { code: 0, out, err: '' }
}

async function runSearch(host: KeeperCliHost, parsed: ParsedCli): Promise<CliResult> {
    const pattern = parsed.positional.join(' ') || getOpt(parsed.opts, 'pattern')
    if (!pattern?.trim()) {
        return { code: 1, out: '', err: 'search: missing search terms. Usage: search <terms...>\n' }
    }
    const r = await ensureSession(host)
    if (r) return r
    const v = host.getVault()
    const cap = ensureCapability(v, 'findRecords', 'search')
    if (cap) return cap
    await v.sync()
    const matches = v.findRecords!(pattern)
    if (hasOpt(parsed.opts, 'json')) {
        return { code: 0, out: JSON.stringify(matches, null, 2) + '\n', err: '' }
    }
    if (matches.length === 0) {
        return { code: 0, out: `(no records matched "${pattern}")\n`, err: '' }
    }
    const rows = matches.map((rec) => [recordUid(rec), getRecordTitle(rec)])
    return { code: 0, out: formatTable(['record_uid', 'title'], rows), err: '' }
}

async function runListSf(host: KeeperCliHost, parsed: ParsedCli): Promise<CliResult> {
    const r = await ensureSession(host)
    if (r) return r
    const v = host.getVault()
    const cap = ensureCapability(v, 'listSharedFolders', 'list-sf')
    if (cap) return cap
    await v.sync()
    const pattern = parsed.positional[0] ?? getOpt(parsed.opts, 'pattern') ?? null
    const verbose = hasOpt(parsed.opts, 'verbose') || hasOpt(parsed.opts, 'v')
    const rows = v.listSharedFolders!({ pattern, verbose, includeDetails: verbose })
    if (hasOpt(parsed.opts, 'json')) {
        return { code: 0, out: JSON.stringify(rows, null, 2) + '\n', err: '' }
    }
    if (rows.length === 0) {
        return {
            code: 0,
            out: pattern ? `(no shared folders matched "${pattern}")\n` : '(no shared folders)\n',
            err: '',
        }
    }
    const table = formatSharedFoldersTable(rows, { verbose })
    return { code: 0, out: renderSharedFoldersAsciiTable(table) + '\n', err: '' }
}

async function runWhoami(host: KeeperCliHost): Promise<CliResult> {
    const v = host.getVault()
    if (!v.isLoggedIn) {
        return { code: 1, out: '', err: 'whoami: not logged in\n' }
    }
    const username =
        (await host.getAccountUsername?.()) ?? host.envString('KEEPER_USER') ?? host.envString('KEEPER_USERNAME')
    const summary = v.getSummary?.()
    const lines = [`username: ${username ?? '(unknown)'}`]
    if (summary) {
        lines.push(
            `records: ${summary.recordCount}`,
            `folders: ${summary.folderCount}`,
            `shared_folders: ${summary.sharedFolderCount}`
        )
    }
    return { code: 0, out: lines.join('\n') + '\n', err: '' }
}

export const listCommand: CliCommandDefinition = {
    name: 'list',
    order: 14,
    aliases: ['l'],
    description: 'List all vault records (Commander table).',
    usage: 'list [--verbose|-v] [--json]',
    flagOptions: ['--json', '--verbose', '-v'],
    help: {
        title: 'list — all records (Keeper Commander)',
        synopsis: 'usage: list [--verbose]',
        description:
            '  Syncs and prints every record in a Commander-style table: uid, type, title, description, shared, and record category.',
        options: '  --verbose, -v   Do not truncate long columns (default max width 40).',
        seeAlso: '  get, search, ls',
    },
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) return { code: 0, out: formatDetailedHelpForCommand(listCommand), err: '' }
        try {
            return await runList(host, parsed)
        } catch (e) {
            return { code: 1, out: '', err: host.formatError('list', e) }
        }
    },
}

export const searchCommand: CliCommandDefinition = {
    name: 'search',
    order: 15,
    aliases: ['s'],
    description: 'Search vault records by text.',
    usage: 'search <terms...> [--json]',
    flagOptions: ['--json', '--pattern'],
    help: {
        title: 'search — find records (Keeper Commander)',
        synopsis: 'usage: search <terms...>',
        description:
            '  Space-separated terms; all terms must match somewhere in the record (title, fields, or UID).\n' +
            '  For exact lookup by UID, use get <uid> instead.',
        examples: '  search amazon\n  search bank account\n  get zhJdqy7lb_zIEeCJT7GLlQ',
        seeAlso: '  get, ls',
    },
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) return { code: 0, out: formatDetailedHelpForCommand(searchCommand), err: '' }
        try {
            return await runSearch(host, parsed)
        } catch (e) {
            return { code: 1, out: '', err: host.formatError('search', e) }
        }
    },
}

export const listSfCommand: CliCommandDefinition = {
    name: 'list-sf',
    order: 16,
    aliases: ['lsf'],
    description: 'List shared folders.',
    usage: 'list-sf [pattern] [--verbose] [--json]',
    flagOptions: ['--verbose', '-v', '--json', '--pattern'],
    help: {
        title: 'list-sf — shared folders (Keeper Commander)',
        synopsis: 'usage: list-sf [pattern]',
        seeAlso: '  ls, get',
    },
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) return { code: 0, out: formatDetailedHelpForCommand(listSfCommand), err: '' }
        try {
            return await runListSf(host, parsed)
        } catch (e) {
            return { code: 1, out: '', err: host.formatError('list-sf', e) }
        }
    },
}

export const whoamiCommand: CliCommandDefinition = {
    name: 'whoami',
    order: 18,
    description: 'Display current user and vault counts.',
    usage: 'whoami',
    help: {
        title: 'whoami — current user (Keeper Commander)',
        synopsis: 'usage: whoami',
        seeAlso: '  login, sync-down',
    },
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) return { code: 0, out: formatDetailedHelpForCommand(whoamiCommand), err: '' }
        if (parsed.opts.size > 0 || parsed.positional.length > 0) {
            return { code: 1, out: '', err: 'whoami: unexpected arguments\n' }
        }
        try {
            return await runWhoami(host)
        } catch (e) {
            return { code: 1, out: '', err: host.formatError('whoami', e) }
        }
    },
}

import type { CliCommandDefinition, CliResult, KeeperCliHost, ParsedCli } from '../types'
import { getOpt, hasOpt, wantsCliHelp } from '../parse'
import { formatDetailedHelpForCommand } from '../help'
import { ensureCapability, ensureSession } from '../commandHelpers'
import { formatTable } from '../table'
import { getRecordTitle } from '../../records/RecordUtils'
import { recordUid } from '../utils'
import { formatWhoamiJson, formatWhoamiOutput } from '../account/whoamiFormat'
import { executeList } from './listCore'
import { executeListSf } from './listSfCore'

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

async function runWhoami(host: KeeperCliHost, parsed: ParsedCli): Promise<CliResult> {
    const v = host.getVault()
    if (!v.isLoggedIn) {
        return { code: 1, out: '', err: 'whoami: not logged in\n' }
    }

    const cap = ensureCapability(v, 'getWhoamiInfo', 'whoami')
    if (cap) return cap

    const verbose = hasOpt(parsed.opts, 'verbose') || hasOpt(parsed.opts, 'v')
    if (verbose) {
        const syncCap = ensureCapability(v, 'sync', 'whoami')
        if (syncCap) return syncCap
        await v.sync!()
    }

    const info = await v.getWhoamiInfo!({ includeVaultCounts: verbose })

    if (hasOpt(parsed.opts, 'json')) {
        return { code: 0, out: formatWhoamiJson(info, { verbose }), err: '' }
    }

    return { code: 0, out: formatWhoamiOutput(info, { verbose }), err: '' }
}

export const listCommand: CliCommandDefinition = {
    name: 'list',
    order: 14,
    aliases: ['l'],
    description: 'List all records',
    usage: 'list [--format {table,csv,json,pdf}] [--output OUTPUT] [-v] [-t RECORD_TYPE] [--field FIELD] [pattern]',
    flagOptions: ['--format', '--output', '-v', '--verbose', '-t', '--type', '--field', '--json'],
    valueShortFlags: ['t'],
    help: {
        description: 'List all records',
        usage: '[-h] [--format {table,csv,json,pdf}] [--output OUTPUT] [-v] [-t RECORD_TYPE] [--field FIELD] [pattern]',
        positionals: [{ name: 'pattern', nargs: '?', help: 'search pattern' }],
        options: [
            {
                flags: '--format',
                choices: 'table,csv,json,pdf',
                help: 'format of output',
            },
            {
                flags: '--output',
                metavar: 'OUTPUT',
                help: 'path to resulting output file (ignored for "table" format)',
            },
            { flags: '-v, --verbose', help: 'verbose output' },
            {
                flags: '-t, --type',
                metavar: 'RECORD_TYPE',
                help: 'List records of certain types. Can be repeated',
            },
            {
                flags: '--field',
                metavar: 'FIELD',
                help: 'Filter records by specific field(s). Can be specified multiple times.',
            },
        ],
    },
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) return { code: 0, out: formatDetailedHelpForCommand(listCommand), err: '' }
        try {
            return await executeList(host, parsed)
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
        description: 'Search the vault. Words can be in any order.',
        usage: '[-h] [--json] [pattern ...]',
        positionals: [
            {
                name: 'pattern',
                nargs: '*',
                help: 'search terms (space-separated, order independent)',
            },
        ],
        options: [{ flags: '--json', help: 'emit JSON' }],
        epilog: 'For exact lookup by UID, use get <uid> instead of search.',
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
    description: 'List all shared folders',
    usage: 'list-sf [--format {table,csv,json,pdf}] [--output OUTPUT] [--roe-eligible] [pattern]',
    flagOptions: ['--format', '--output', '--roe-eligible', '--roe', '--json', '--pattern'],
    help: {
        description: 'List all shared folders',
        usage: '[-h] [--format {table,csv,json,pdf}] [--output OUTPUT] [--roe-eligible] [pattern]',
        positionals: [{ name: 'pattern', nargs: '?', help: 'search pattern' }],
        options: [
            {
                flags: '--format',
                choices: 'table,csv,json,pdf',
                help: 'format of output',
            },
            {
                flags: '--output',
                metavar: 'OUTPUT',
                help: 'path to resulting output file (ignored for "table" format)',
            },
            {
                flags: '--roe-eligible',
                help:
                    'only list shared folders eligible for --rotate-on-expiration (contain at least one pamUser record with rotation configured)',
            },
        ],
    },
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) return { code: 0, out: formatDetailedHelpForCommand(listSfCommand), err: '' }
        try {
            return await executeListSf(host, parsed)
        } catch (e) {
            return { code: 1, out: '', err: host.formatError('list-sf', e) }
        }
    },
}

export const whoamiCommand: CliCommandDefinition = {
    name: 'whoami',
    order: 18,
    description: 'Display current user and account information.',
    usage: 'whoami [--verbose|-v] [--json]',
    flagOptions: ['--verbose', '-v', '--json'],
    help: {
        description: 'Display current user and account information.',
        usage: '[-h] [-v] [--json]',
        options: [
            { flags: '-v, --verbose', help: 'include vault counts and reporting status' },
            { flags: '--json', help: 'emit JSON' },
        ],
    },
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) return { code: 0, out: formatDetailedHelpForCommand(whoamiCommand), err: '' }
        try {
            return await runWhoami(host, parsed)
        } catch (e) {
            return { code: 1, out: '', err: host.formatError('whoami', e) }
        }
    },
}

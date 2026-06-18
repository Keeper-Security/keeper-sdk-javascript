import type { CliCommandDefinition, CliResult, KeeperCliHost, ParsedCli } from '../types'
import { hasOpt, wantsCliHelp } from '../parse'
import { formatDetailedHelpForCommand } from '../help'
import { ensureCapability, ensureSession } from '../commandHelpers'
import { executeLs } from './lsCore'

async function runCd(host: KeeperCliHost, parsed: ParsedCli, cmd: string): Promise<CliResult> {
    const target = parsed.positional[0]
    if (!target) return { code: 1, out: '', err: `${cmd}: missing folder path. Usage: ${cmd} <path>\n` }
    const r = await ensureSession(host)
    if (r) return r
    const v = host.getVault()
    const cap = ensureCapability(v, 'changeDirectory', cmd)
    if (cap) return cap
    try {
        const res = await v.changeDirectory!(target)
        return { code: 0, out: `${res.name}\n`, err: '' }
    } catch (e) {
        return { code: 1, out: '', err: host.formatError(`${cmd} ${target}`, e) }
    }
}

async function runTree(host: KeeperCliHost, parsed: ParsedCli, cmd: string): Promise<CliResult> {
    const r = await ensureSession(host)
    if (r) return r
    const v = host.getVault()
    const cap = ensureCapability(v, 'tree', cmd)
    if (cap) return cap
    await v.sync()
    const folderPath = parsed.positional[0]
    const showRecords = hasOpt(parsed.opts, 'records') || hasOpt(parsed.opts, 'r')
    const out = await v.tree!(folderPath ? { folderPath, showRecords } : { showRecords })
    return { code: 0, out: out.endsWith('\n') ? out : out + '\n', err: '' }
}

async function runMkdir(host: KeeperCliHost, parsed: ParsedCli, cmd: string): Promise<CliResult> {
    const target = parsed.positional[0]
    if (!target) {
        return { code: 1, out: '', err: `${cmd}: missing path. Usage: ${cmd} <path> [-sf]\n` }
    }
    const r = await ensureSession(host)
    if (r) return r
    const v = host.getVault()
    const cap = ensureCapability(v, 'mkdir', cmd)
    if (cap) return cap
    const cwd = v.getWorkingFolderDisplayName?.() ?? 'My Vault'
    const shared =
        hasOpt(parsed.opts, 'shared-folder') ||
        hasOpt(parsed.opts, 'sf') ||
        hasOpt(parsed.opts, 'shared')
    try {
        const res = await v.mkdir!(target, { sharedFolder: shared })
        if (!res.success) {
            return { code: 1, out: '', err: `${cmd} [in ${cwd}]: ${res.message ?? 'failed'}\n` }
        }
        return { code: 0, out: `${res.folderUid}\t${target} (in ${cwd})\n`, err: '' }
    } catch (e) {
        return { code: 1, out: '', err: host.formatError(`${cmd} ${target} [in ${cwd}]`, e) }
    }
}

const lsHelp: CliCommandDefinition['help'] = {
    description: 'List folder contents.',
    usage: '[-h] [--format {table,csv,json,pdf}] [--output OUTPUT] [-l] [-f] [-r] [-s] [-v] [-R] [pattern]',
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
        { flags: '-l, --list', help: 'show detailed list' },
        { flags: '-f, --folders', help: 'display folders only' },
        { flags: '-r, --records', help: 'display records only' },
        { flags: '-s, --short', help: 'Do not display record details. (Not used)' },
        { flags: '-v, --verbose', help: 'verbose output' },
        { flags: '-R, --recursive', help: 'list all folders/records in subfolders' },
    ],
}

export const lsCommand: CliCommandDefinition = {
    name: 'ls',
    order: 11,
    description: 'List folder contents.',
    usage: 'ls [--format {table,csv,json,pdf}] [--output OUTPUT] [-l] [-f] [-r] [-s] [-v] [-R] [pattern]',
    flagOptions: [
        '--format',
        '--output',
        '-l',
        '--list',
        '-f',
        '--folders',
        '-r',
        '--records',
        '-s',
        '--short',
        '-v',
        '--verbose',
        '-R',
        '--recursive',
        '--detail',
        '--json',
        '--pattern',
    ],
    help: lsHelp,
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) return { code: 0, out: formatDetailedHelpForCommand(lsCommand), err: '' }
        try {
            return await executeLs(host, parsed, 'ls')
        } catch (e) {
            return { code: 1, out: '', err: host.formatError('ls', e) }
        }
    },
}

export const cdCommand: CliCommandDefinition = {
    name: 'cd',
    order: 12,
    description: 'Change current folder.',
    usage: 'cd <path>',
    help: {
        description: 'Change current folder',
        usage: '[-h] folder',
        positionals: [{ name: 'folder', help: 'folder path or UID' }],
    },
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) return { code: 0, out: formatDetailedHelpForCommand(cdCommand), err: '' }
        try {
            return await runCd(host, parsed, 'cd')
        } catch (e) {
            return { code: 1, out: '', err: host.formatError('cd', e) }
        }
    },
}

export const treeCommand: CliCommandDefinition = {
    name: 'tree',
    order: 13,
    description: 'Display the folder structure.',
    usage: 'tree [PATH] [-r|--records]',
    flagOptions: ['-r', '--records'],
    help: {
        description: 'Display the folder structure.',
        usage: '[-h] [-r] [folder]',
        positionals: [{ name: 'folder', nargs: '?', help: 'folder path or UID' }],
        options: [{ flags: '-r, --records', help: 'show records within each folder' }],
    },
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) return { code: 0, out: formatDetailedHelpForCommand(treeCommand), err: '' }
        try {
            return await runTree(host, parsed, 'tree')
        } catch (e) {
            return { code: 1, out: '', err: host.formatError('tree', e) }
        }
    },
}

export const mkdirCommand: CliCommandDefinition = {
    name: 'mkdir',
    order: 14,
    description: 'Create a folder.',
    usage: 'mkdir <path> [-sf|--shared-folder]',
    flagOptions: ['-sf', '--shared-folder', '--shared'],
    help: {
        description: 'Create a folder',
        usage: '[-h] [-sf] path',
        positionals: [{ name: 'path', help: 'folder path' }],
        options: [{ flags: '-sf, --shared-folder', help: 'create a shared folder' }],
    },
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) return { code: 0, out: formatDetailedHelpForCommand(mkdirCommand), err: '' }
        try {
            return await runMkdir(host, parsed, 'mkdir')
        } catch (e) {
            return { code: 1, out: '', err: host.formatError('mkdir', e) }
        }
    },
}

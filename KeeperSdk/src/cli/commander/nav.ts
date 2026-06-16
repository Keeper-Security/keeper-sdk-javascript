import type { CliCommandDefinition, CliResult, KeeperCliHost, ParsedCli } from '../types'
import { getOpt, hasOpt, wantsCliHelp } from '../parse'
import { formatDetailedHelpForCommand } from '../help'
import { ensureCapability, ensureSession } from '../commandHelpers'
import { formatTable } from '../table'

function lsPath(parsed: ParsedCli): string | undefined {
    return parsed.positional[0]
}

function formatLs(
    result: {
        detail: boolean
        folders: Array<{ uid: string; name: string }>
        records: Array<{ uid: string; name: string; type?: string }>
    },
    detail: boolean
): string {
    if (result.folders.length + result.records.length === 0) return '(empty)\n'

    const headers = detail ? ['flags', 'uid', 'name', 'type'] : ['kind', 'uid', 'name']
    const rows: string[][] = []
    for (const f of result.folders) {
        const flags = ((f as { flags?: string }).flags ?? '').trim()
        rows.push(detail ? [flags || 'f---', f.uid, f.name, ''] : ['dir', f.uid, f.name])
    }
    for (const r of result.records) {
        const flags = ((r as { flags?: string }).flags ?? '').trim()
        const type = r.type ?? ''
        rows.push(detail ? [flags || 'r---', r.uid, r.name, type] : ['rec', r.uid, r.name])
    }
    return formatTable(headers, rows)
}

async function runLs(host: KeeperCliHost, parsed: ParsedCli, cmd: string): Promise<CliResult> {
    const r = await ensureSession(host)
    if (r) return r
    const v = host.getVault()
    const cap = ensureCapability(v, 'listFolder', cmd)
    if (cap) return cap
    await v.sync()

    const detail = hasOpt(parsed.opts, 'detail') || hasOpt(parsed.opts, 'list') || hasOpt(parsed.opts, 'l')
    const foldersOnly = hasOpt(parsed.opts, 'folders') || hasOpt(parsed.opts, 'f')
    const recordsOnly = hasOpt(parsed.opts, 'records') || hasOpt(parsed.opts, 'r')
    const target = lsPath(parsed)

    const listOpts = {
        detail,
        showFolders: recordsOnly ? false : true,
        showRecords: foldersOnly ? false : true,
    }

    if (!target) {
        const result = await v.listFolder!({ ...listOpts })
        return { code: 0, out: formatLs(result, detail), err: '' }
    }

    if (!v.changeDirectory || !v.getCurrentFolderUid) {
        return { code: 1, out: '', err: `${cmd}: host lacks navigation capabilities.\n` }
    }

    const originalUid = v.getCurrentFolderUid()
    let resolvedUid: string | null
    try {
        const cd = await v.changeDirectory(target)
        resolvedUid = cd.folderUid
    } catch (e) {
        return { code: 1, out: '', err: host.formatError(`${cmd} ${target}`, e) }
    }
    try {
        const result = await v.listFolder!({ folderUid: resolvedUid ?? null, ...listOpts })
        return { code: 0, out: formatLs(result, detail), err: '' }
    } finally {
        if (resolvedUid !== originalUid) {
            try {
                await v.changeDirectory(originalUid ?? '/')
            } catch {
                /* best-effort */
            }
        }
    }
}

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
    const out = await v.tree!(folderPath ? { folderPath, showRecords: true } : { showRecords: true })
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
    title: 'ls — list folder contents (Keeper Commander)',
    synopsis: 'usage: ls [-l] [-f] [-r] [pattern]',
    description: '  Lists records and subfolders in the current folder, or in PATH if given.',
    options: `  -l, --list       Detailed list (flags, types).
  -f, --folders    Folders only.
  -r, --records    Records only.
  --help, -h       Show this help.`,
    examples: '  ls\n  ls "Marketing"\n  ls -l',
    seeAlso: '  cd, tree, get',
}

export const lsCommand: CliCommandDefinition = {
    name: 'ls',
    order: 11,
    description: 'List folder contents (current folder or PATH).',
    usage: 'ls [PATH] [-l|--list] [-f|--folders] [-r|--records]',
    flagOptions: ['-l', '--list', '-f', '--folders', '-r', '--records', '--detail'],
    help: lsHelp,
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) return { code: 0, out: formatDetailedHelpForCommand(lsCommand), err: '' }
        try {
            return await runLs(host, parsed, 'ls')
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
        title: 'cd — change current folder (Keeper Commander)',
        synopsis: 'usage: cd <folder>',
        description: '  PATH is a slash-separated folder name/UID sequence, or `/` for vault root.',
        examples: '  cd Marketing\n  cd ..\n  cd /',
        seeAlso: '  ls, tree',
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
    usage: 'tree [PATH]',
    help: {
        title: 'tree — folder structure (Keeper Commander)',
        synopsis: 'usage: tree [folder]',
        description:
            '  Renders an ASCII tree from PATH or the vault root. Each node is tagged [folder], [shared folder], or [record].',
        seeAlso: '  ls, cd',
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
        title: 'mkdir — create folder (Keeper Commander)',
        synopsis: 'usage: mkdir <path> [-sf]',
        description: '  Creates a user folder under the current folder. -sf creates a shared folder.',
        options: '  -sf, --shared-folder    Create a shared folder.',
        examples: '  mkdir Drafts\n  mkdir TeamShare -sf',
        seeAlso: '  cd, ls',
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

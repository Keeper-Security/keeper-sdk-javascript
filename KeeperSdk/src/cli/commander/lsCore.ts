import type { ListFolderResult } from '../../folders/listFolder'
import type { CliResult, KeeperCliHost, KeeperCliVault, ParsedCli } from '../types'
import { getOpt, hasOpt } from '../parse'
import { ensureCapability, ensureSession } from '../commandHelpers'
import { formatTable } from '../table'
import {
    emptyReportResult,
    resolveReportFormat,
    tableToCsv,
    validateReportFormat,
    validateReportOutput,
} from './reportOutput'

function truncateName(name: string, verbose: boolean): string {
    if (verbose || name.length <= 40) return name
    return `${name.slice(0, 25)}...${name.slice(-12)}`
}

async function resolveLsContext(
    v: KeeperCliVault,
    rawPattern?: string
): Promise<{ folderUid: string | null; pattern: string | null }> {
    const trimmed = rawPattern?.trim()
    if (!trimmed) {
        return { folderUid: v.getCurrentFolderUid?.() ?? null, pattern: null }
    }

    if (v.tryResolvePath) {
        const resolved = await v.tryResolvePath(trimmed)
        return {
            folderUid: resolved.folderUid,
            pattern: resolved.remaining.trim() || null,
        }
    }

    if (v.changeDirectory) {
        try {
            const cd = await v.changeDirectory(trimmed)
            return { folderUid: cd.folderUid, pattern: null }
        } catch {
            return { folderUid: v.getCurrentFolderUid?.() ?? null, pattern: trimmed }
        }
    }

    return { folderUid: v.getCurrentFolderUid?.() ?? null, pattern: trimmed }
}

function formatLsSimple(result: ListFolderResult, verbose: boolean): string {
    if (result.folders.length + result.records.length === 0) return '(empty)\n'

    const names: string[] = []
    for (const folder of result.folders) {
        names.push(`${truncateName(folder.name || folder.uid, verbose)}/`)
    }
    for (const record of result.records) {
        names.push(truncateName(record.name || record.uid, verbose))
    }
    names.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

    const maxName = names.reduce((max, name) => Math.max(max, name.length), 0)
    const width = 80
    const cols = Math.max(1, Math.floor(width / (maxName + 2)))
    const lines: string[] = []
    for (let i = 0; i < names.length; i += cols) {
        const row = names.slice(i, i + cols).map((name) => name.padEnd(maxName))
        lines.push(row.join('  '))
    }
    return `${lines.join('\n')}\n`
}

function formatLsDetailTable(result: ListFolderResult): string {
    const chunks: string[] = []
    if (result.folders.length > 0) {
        if (result.detail) {
            const headers = ['folder_uid', 'name', 'flags', 'type']
            const rows = result.folders.map((folder) => [
                folder.uid,
                folder.name,
                folder.flags,
                folder.folderKind,
            ])
            chunks.push(formatTable(headers, rows).trimEnd())
        } else {
            const headers = ['folder_uid', 'name', 'type']
            const rows = result.folders.map((folder) => [folder.uid, folder.name, folder.folderKind])
            chunks.push(formatTable(headers, rows).trimEnd())
        }
    }
    if (result.records.length > 0) {
        if (result.detail) {
            const headers = ['record_uid', 'type', 'title', 'flags']
            const rows = result.records.map((record) => [record.uid, record.type, record.name, record.flags])
            chunks.push(formatTable(headers, rows).trimEnd())
        } else {
            const headers = ['record_uid', 'type', 'title']
            const rows = result.records.map((record) => [record.uid, record.type, record.name])
            chunks.push(formatTable(headers, rows).trimEnd())
        }
    }
    return `${chunks.join('\n')}\n`
}

function formatLsJson(result: ListFolderResult): string {
    const rows: Record<string, string>[] = []
    if (result.detail) {
        for (const folder of result.folders) {
            rows.push({
                type: 'folder',
                uid: folder.uid,
                name: folder.name,
                details: `Flags: ${folder.flags}, Subfolders: ${folder.subfolderCount}, Records: ${folder.recordCount}`,
            })
        }
        for (const record of result.records) {
            rows.push({
                type: 'record',
                uid: record.uid,
                name: record.name,
                details: `Type: ${record.type}, Flags: ${record.flags}`,
            })
        }
    } else {
        for (const folder of result.folders) {
            rows.push({ type: 'folder', uid: folder.uid, name: folder.name, details: '' })
        }
        for (const record of result.records) {
            rows.push({
                type: 'record',
                uid: record.uid,
                name: record.name,
                details: `Type: ${record.type}`,
            })
        }
    }
    rows.sort((a, b) => {
        const typeCmp = a.type.localeCompare(b.type)
        if (typeCmp !== 0) return typeCmp
        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    })
    return `${JSON.stringify(rows, null, 2)}\n`
}

function formatLsCsv(result: ListFolderResult): string {
    const headers = ['type', 'uid', 'name', 'details']
    const rows: string[][] = []
    if (result.detail) {
        for (const folder of result.folders) {
            rows.push([
                'folder',
                folder.uid,
                folder.name,
                `Flags: ${folder.flags}, Subfolders: ${folder.subfolderCount}, Records: ${folder.recordCount}`,
            ])
        }
        for (const record of result.records) {
            rows.push(['record', record.uid, record.name, `Type: ${record.type}, Flags: ${record.flags}`])
        }
    } else {
        for (const folder of result.folders) {
            rows.push(['folder', folder.uid, folder.name, ''])
        }
        for (const record of result.records) {
            rows.push(['record', record.uid, record.name, `Type: ${record.type}`])
        }
    }
    rows.sort((a, b) => {
        const typeCmp = a[0].localeCompare(b[0])
        if (typeCmp !== 0) return typeCmp
        return a[2].localeCompare(b[2], undefined, { sensitivity: 'base' })
    })
    return tableToCsv(headers, rows)
}

export async function executeLs(host: KeeperCliHost, parsed: ParsedCli, cmd = 'ls'): Promise<CliResult> {
    const r = await ensureSession(host)
    if (r) return r

    const v = host.getVault()
    const cap = ensureCapability(v, 'listFolder', cmd)
    if (cap) return cap
    await v.sync()

    let fmt = resolveReportFormat(parsed)
    const badFmt = validateReportFormat(cmd, fmt)
    if (badFmt) return badFmt

    const outputPath = getOpt(parsed.opts, 'output')
    const badOut = validateReportOutput(cmd, fmt, outputPath)
    if (badOut) return badOut

    const foldersOnly = hasOpt(parsed.opts, 'folders', 'f')
    const recordsOnly = hasOpt(parsed.opts, 'records', 'r')
    let detail = hasOpt(parsed.opts, 'detail', 'list', 'l')
    const verbose = hasOpt(parsed.opts, 'verbose', 'v')
    const recursive = hasOpt(parsed.opts, 'recursive', 'R')
    hasOpt(parsed.opts, 'short', 's')

    if (fmt === 'json' || fmt === 'csv') {
        detail = true
    }

    const showFolders = foldersOnly ? true : !recordsOnly
    const showRecords = recordsOnly ? true : !foldersOnly

    const rawPattern = parsed.positional[0] ?? getOpt(parsed.opts, 'pattern')
    const { folderUid, pattern } = await resolveLsContext(v, rawPattern)

    const result = await v.listFolder!({
        folderUid,
        pattern,
        detail,
        showFolders,
        showRecords,
        recursive,
    })

    if (result.folders.length === 0 && result.records.length === 0) {
        if (pattern) {
            return { code: 1, out: '', err: `${cmd}: ${pattern}: No such folder or record\n` }
        }
        return emptyReportResult(cmd, fmt, '(empty)\n', outputPath)
    }

    if (fmt === 'json') {
        return { code: 0, out: formatLsJson(result), err: '' }
    }
    if (fmt === 'csv') {
        return { code: 0, out: formatLsCsv(result), err: '' }
    }

    const out = detail ? formatLsDetailTable(result) : formatLsSimple(result, verbose)
    return { code: 0, out, err: '' }
}

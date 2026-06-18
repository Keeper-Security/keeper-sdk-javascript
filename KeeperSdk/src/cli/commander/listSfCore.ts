import type { CliResult, KeeperCliHost, ParsedCli } from '../types'
import { getOpt, hasOpt } from '../parse'
import { ensureCapability, ensureSession } from '../commandHelpers'
import {
    formatSharedFoldersTable,
    renderSharedFoldersAsciiTable,
    type ListSharedFolderRow,
} from '../../sharedFolders/listSharedFolders'
import {
    emptyReportResult,
    resolveReportFormat,
    tableToCsv,
    validateReportFormat,
    validateReportOutput,
} from './reportOutput'

function sharedFoldersToJson(rows: ListSharedFolderRow[]): Record<string, string>[] {
    return rows.map((row) => ({
        shared_folder_uid: row.shared_folder_uid,
        name: row.name,
    }))
}

export async function executeListSf(host: KeeperCliHost, parsed: ParsedCli): Promise<CliResult> {
    const r = await ensureSession(host)
    if (r) return r

    const v = host.getVault()
    const cap = ensureCapability(v, 'listSharedFolders', 'list-sf')
    if (cap) return cap

    const fmt = resolveReportFormat(parsed)
    const badFmt = validateReportFormat('list-sf', fmt)
    if (badFmt) return badFmt

    const outputPath = getOpt(parsed.opts, 'output')
    const badOut = validateReportOutput('list-sf', fmt, outputPath)
    if (badOut) return badOut

    await v.sync()

    const pattern = parsed.positional[0] ?? getOpt(parsed.opts, 'pattern') ?? null
    const roeEligible = hasOpt(parsed.opts, 'roe-eligible', 'roe')
    const rows = v.listSharedFolders!({ pattern, roeEligible })

    if (rows.length === 0) {
        const message = pattern
            ? `(no shared folders matched "${pattern}")\n`
            : '(no shared folders)\n'
        return emptyReportResult('list-sf', fmt, message, outputPath)
    }

    const table = formatSharedFoldersTable(rows, { verbose: true })

    if (fmt === 'json') {
        return { code: 0, out: `${JSON.stringify(sharedFoldersToJson(rows), null, 2)}\n`, err: '' }
    }

    if (fmt === 'csv') {
        const csvHeaders = ['Shared Folder UID', 'Name']
        const csvRows = rows.map((row) => [row.shared_folder_uid, row.name])
        return { code: 0, out: tableToCsv(csvHeaders, csvRows), err: '' }
    }

    return { code: 0, out: `${renderSharedFoldersAsciiTable(table)}\n`, err: '' }
}

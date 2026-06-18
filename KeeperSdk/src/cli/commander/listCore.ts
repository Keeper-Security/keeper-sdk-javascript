import type { DRecord } from '@keeper-security/keeperapi'
import type { CliResult, KeeperCliHost, ParsedCli } from '../types'
import { getAllOpt, getOpt, hasOpt } from '../parse'
import { ensureSession } from '../commandHelpers'
import {
    formatRecordsListTable,
    renderRecordsListAsciiTable,
} from '../../records/listRecordsTable'
import { getRecordFields, getRecordType, searchRecords } from '../../records/RecordUtils'
import {
    emptyReportResult,
    resolveReportFormat,
    tableToCsv,
    validateReportFormat,
    validateReportOutput,
} from './reportOutput'

function filterByRecordTypes(records: DRecord[], recordTypes: string[]): DRecord[] {
    if (recordTypes.length === 0) return records

    const matchers: Array<(record: DRecord) => boolean> = []

    for (const rt of recordTypes) {
        const key = rt.toLowerCase()
        if (key === 'app') {
            matchers.push((record) => record.version === 5)
        } else if (key === 'file') {
            matchers.push(
                (record) =>
                    (record.version === 3 || record.version === 4) &&
                    getRecordType(record).toLowerCase() === 'file'
            )
        } else if (key === 'general' || key === 'legacy') {
            matchers.push((record) => record.version === 1 || record.version === 2)
        } else if (key === 'pam') {
            matchers.push((record) => record.version === 6)
        } else {
            const typeName = key
            matchers.push((record) => getRecordType(record).toLowerCase() === typeName)
        }
    }

    return records.filter((record) => matchers.some((match) => match(record)))
}

function filterByFields(records: DRecord[], fieldNames: string[]): DRecord[] {
    if (fieldNames.length === 0) return records
    return records.filter((record) => {
        const fields = getRecordFields(record)
        return fieldNames.every((name) => {
            const needle = name.toLowerCase()
            return fields.some((field) => {
                const type = (field.type || '').toLowerCase()
                const label = (field.label || '').toLowerCase()
                return type === needle || label === needle || type.includes(needle) || label.includes(needle)
            })
        })
    })
}

function filterListRecords(records: DRecord[], parsed: ParsedCli): DRecord[] {
    let result = records
    const pattern = parsed.positional[0]?.trim()
    if (pattern) {
        result = searchRecords(result, pattern)
    }
    result = filterByRecordTypes(result, getAllOpt(parsed, 'type', 't'))
    result = filterByFields(result, getAllOpt(parsed, 'field'))
    return result
}

function recordsToJsonRows(records: DRecord[]): Record<string, unknown>[] {
    const table = formatRecordsListTable(records, { verbose: true })
    return table.rows.map((row) => ({
        record_uid: row[1],
        type: row[2],
        title: row[3],
        description: row[4],
        shared: row[5] === 'True',
        record_category: row[6],
    }))
}

export async function executeList(host: KeeperCliHost, parsed: ParsedCli): Promise<CliResult> {
    const r = await ensureSession(host)
    if (r) return r

    const fmt = resolveReportFormat(parsed)
    const badFmt = validateReportFormat('list', fmt)
    if (badFmt) return badFmt

    const outputPath = getOpt(parsed.opts, 'output')
    const badOut = validateReportOutput('list', fmt, outputPath)
    if (badOut) return badOut

    const v = host.getVault()
    await v.sync()
    const records = filterListRecords(v.getRecords(), parsed)
    const verbose = hasOpt(parsed.opts, 'verbose') || hasOpt(parsed.opts, 'v')

    if (records.length === 0) {
        return emptyReportResult('list', fmt, 'No records are found\n', outputPath)
    }

    const table = formatRecordsListTable(records, { verbose })

    if (fmt === 'json') {
        return { code: 0, out: `${JSON.stringify(recordsToJsonRows(records), null, 2)}\n`, err: '' }
    }

    if (fmt === 'csv') {
        return { code: 0, out: tableToCsv(table.headers, table.rows), err: '' }
    }

    return { code: 0, out: `${renderRecordsListAsciiTable(table)}\n`, err: '' }
}

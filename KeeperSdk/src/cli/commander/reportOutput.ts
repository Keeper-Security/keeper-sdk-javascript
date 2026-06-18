import type { CliResult, ParsedCli } from '../types'
import { getOpt, hasOpt } from '../parse'

export const REPORT_FORMATS = new Set(['table', 'csv', 'json', 'pdf'])

export function resolveReportFormat(parsed: ParsedCli): string {
    const fmt = getOpt(parsed.opts, 'format')?.toLowerCase()
    if (fmt) return fmt
    if (hasOpt(parsed.opts, 'json')) return 'json'
    return 'table'
}

export function escapeCsvCell(value: string): string {
    if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`
    return value
}

export function tableToCsv(headers: string[], rows: string[][]): string {
    const lines = [
        headers.map(escapeCsvCell).join(','),
        ...rows.map((row) => row.map((cell) => escapeCsvCell(cell ?? '')).join(',')),
    ]
    return `${lines.join('\n')}\n`
}

export function validateReportFormat(command: string, fmt: string): CliResult | null {
    if (!REPORT_FORMATS.has(fmt)) {
        return { code: 1, out: '', err: `${command}: invalid --format ${fmt} (choose table, csv, json, pdf)\n` }
    }
    if (fmt === 'pdf') {
        return { code: 1, out: '', err: `${command}: pdf output is not supported in this CLI\n` }
    }
    return null
}

export function validateReportOutput(command: string, fmt: string, outputPath?: string): CliResult | null {
    if (outputPath && fmt !== 'table') {
        return {
            code: 1,
            out: '',
            err: `${command}: --output file write is not supported in this host; omit --output to print to stdout\n`,
        }
    }
    return null
}

export function emptyReportResult(command: string, fmt: string, message: string, outputPath?: string): CliResult {
    if (fmt === 'json') {
        const bad = validateReportOutput(command, fmt, outputPath)
        if (bad) return bad
        return { code: 0, out: `${JSON.stringify([], null, 2)}\n`, err: '' }
    }
    if (fmt === 'csv') {
        const bad = validateReportOutput(command, fmt, outputPath)
        if (bad) return bad
    }
    return { code: 0, out: message, err: '' }
}

import {
    AuditOutputFormat,
    type ActionReportResult,
    type AuditReportResult,
    type PasswordReportResult,
    type PasswordReportRow,
} from '@keeper-security/keeper-sdk-javascript'

const PASSWORD_REPORT_BASE_HEADERS = [
    'record_uid',
    'title',
    'description',
    'length',
    'lower',
    'upper',
    'digits',
    'special',
] as const

const PASSWORD_REPORT_VERBOSE_HEADERS = ['score', 'status', 'reused'] as const

export function fieldToTitle(field: string): string {
    return field
        .split('_')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
}

export function formatReportOutput(
    headers: readonly string[],
    rows: readonly string[][],
    outputFormat: AuditOutputFormat
): string {
    if (outputFormat === AuditOutputFormat.Json) {
        return JSON.stringify(
            rows.map((row) =>
                Object.fromEntries(headers.map((header, index) => [header, row[index] ?? '']))
            ),
            null,
            2
        )
    }
    if (outputFormat === AuditOutputFormat.Csv) {
        const escape = (value: string) => `"${value.replace(/"/g, '""')}"`
        return [
            headers.map(escape).join(','),
            ...rows.map((row) => row.map((cell) => escape(cell ?? '')).join(',')),
        ].join('\n')
    }
    const widths = headers.map((header, index) =>
        Math.max(header.length, ...rows.map((row) => (row[index] || '').length), 2)
    )
    const pad = (cell: string, index: number) => cell + ' '.repeat(Math.max(0, widths[index] - cell.length))
    const formatRow = (cells: readonly string[]) => cells.map((cell, index) => pad(cell, index)).join('  ')
    const rule = formatRow(widths.map((width) => '-'.repeat(width)))
    return [formatRow(headers), rule, ...rows.map((row) => formatRow(row))].join('\n')
}

export function formatAuditReportResult(
    result: AuditReportResult,
    outputFormat: AuditOutputFormat = AuditOutputFormat.Table
): string {
    const headers =
        outputFormat === AuditOutputFormat.Json ? result.headers : result.headers.map(fieldToTitle)

    if (result.syntaxHelp && result.eventTypeReference) {
        const reference = formatReportOutput(headers, result.rows, outputFormat)
        return `${result.syntaxHelp}\n\nEvent type ids and names:\n\n${reference}`
    }

    return formatReportOutput(headers, result.rows, outputFormat)
}

export function formatActionReportResult(
    result: ActionReportResult,
    outputFormat: AuditOutputFormat = AuditOutputFormat.Table
): string {
    return formatReportOutput(result.headers, result.rows, outputFormat)
}

function buildPasswordTableHeaders(verbose: boolean, rowNumbers: boolean): string[] {
    const headers: string[] = [...PASSWORD_REPORT_BASE_HEADERS]
    if (verbose) headers.push(...PASSWORD_REPORT_VERBOSE_HEADERS)
    if (rowNumbers) headers.unshift('#')
    return headers
}

function passwordRowToCells(
    row: PasswordReportRow,
    verbose: boolean,
    rowNumbers: boolean,
    rowNumber: number
): string[] {
    const cells = [
        row.recordUid,
        row.title,
        row.description,
        String(row.length),
        String(row.lower),
        String(row.upper),
        String(row.digits),
        String(row.special),
    ]

    if (verbose) {
        cells.push(row.score ?? '', row.status ?? '', row.reused ?? '')
    }
    if (rowNumbers) {
        cells.unshift(String(rowNumber))
    }

    return cells
}

export function formatPasswordReportResult(
    result: PasswordReportResult,
    outputFormat: AuditOutputFormat = AuditOutputFormat.Table,
    rowNumbers = result.rowNumbers
): string {
    const headers = buildPasswordTableHeaders(result.verbose, rowNumbers)
    const rows = result.rows.map((row, index) =>
        passwordRowToCells(row, result.verbose, rowNumbers, index + 1)
    )
    return formatReportOutput(headers, rows, outputFormat)
}

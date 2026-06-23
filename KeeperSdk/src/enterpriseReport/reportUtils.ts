import type { Auth, KeeperResponse } from '@keeper-security/keeperapi'
import { KeeperSdkError } from '../utils'
import { AuditOutputFormat, AuditReportOrder } from './reportTypes'

export type AuthProvider = () => Auth

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
        return [headers.map(escape).join(','), ...rows.map((row) => row.map((cell) => escape(cell ?? '')).join(','))].join(
            '\n'
        )
    }
    const widths = headers.map((header, index) =>
        Math.max(header.length, ...rows.map((row) => (row[index] || '').length), 2)
    )
    const pad = (cell: string, index: number) => cell + ' '.repeat(Math.max(0, widths[index] - cell.length))
    const formatRow = (cells: readonly string[]) => cells.map((cell, index) => pad(cell, index)).join('  ')
    const rule = formatRow(widths.map((width) => '-'.repeat(width)))
    return [formatRow(headers), rule, ...rows.map((row) => formatRow(row))].join('\n')
}

export function resolveTimezone(timezone: string | undefined): string {
    if (timezone?.trim()) return timezone.trim()
    const hours = -new Date().getTimezoneOffset() / 60
    return `Etc/GMT${hours >= 0 ? '+' : ''}${hours}`
}

export function assertSucceeded(
    response: KeeperResponse,
    fallbackMessage: string,
    fallbackCode: string
): void {
    if ((response.result || '').toLowerCase() === 'fail') {
        throw new KeeperSdkError(
            response.message || response.result_code || fallbackMessage,
            response.result_code || fallbackCode
        )
    }
}

export function toAuditApiOrder(order: AuditReportOrder): 'ascending' | 'descending' {
    return order === AuditReportOrder.Asc ? 'ascending' : 'descending'
}

export function chunkArray<T>(values: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let index = 0; index < values.length; index += size) {
        chunks.push(values.slice(index, index + size))
    }
    return chunks
}

export function fieldToTitle(field: string): string {
    return field
        .split('_')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
}

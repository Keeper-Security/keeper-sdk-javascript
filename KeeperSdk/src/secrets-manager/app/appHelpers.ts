import { formatTimestampMs, toFiniteNumber } from '../../pam/gateway/gatewayHelpers'
import { DEFAULT_MIN_COLUMN_WIDTH, NEVER_LABEL } from './appConstants'
import type { FormattedSecretsManagerTable, RenderSecretsManagerAsciiTableOptions } from './appTypes'

export function toOptionalTimestamp(value: number | null | undefined): number | null {
    return toFiniteNumber(value) || null
}

export function formatTimestampOrNever(value: number | null): string {
    return formatTimestampMs(value) || NEVER_LABEL
}

export function renderAsciiTable(
    table: FormattedSecretsManagerTable,
    options: RenderSecretsManagerAsciiTableOptions = {}
): string {
    const minColWidth = options.minColWidth ?? DEFAULT_MIN_COLUMN_WIDTH
    const widths = table.headers.map((header, col) =>
        Math.max(minColWidth, header.length, ...table.rows.map((row) => (row[col] || '').length))
    )
    const formatRow = (cells: string[]): string => cells.map((cell, i) => (cell || '').padEnd(widths[i])).join('  ')
    return [formatRow(table.headers), widths.map((w) => '-'.repeat(w)).join('  '), ...table.rows.map(formatRow)].join(
        '\n'
    )
}

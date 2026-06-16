import type { DRecord } from '@keeper-security/keeperapi'
import {
    getRecordCategory,
    getRecordDescription,
    getRecordTitle,
    getRecordType,
} from './RecordUtils'

const DEFAULT_COLUMN_WIDTH = 40
const MIN_TRUNCATE_PREFIX = 3

export type FormattedRecordsListTable = {
    headers: string[]
    rows: string[][]
}

function truncateText(text: string, maxLength: number | null): string {
    if (!text) return ''
    if (maxLength == null || text.length <= maxLength) return text
    if (maxLength <= MIN_TRUNCATE_PREFIX) return text.slice(0, maxLength)
    return `${text.slice(0, maxLength - MIN_TRUNCATE_PREFIX)}...`
}

function compareByTitle(recordA: DRecord, recordB: DRecord): number {
    const titleA = getRecordTitle(recordA)
    const titleB = getRecordTitle(recordB)
    return titleA.localeCompare(titleB, undefined, { sensitivity: 'base' })
}

export function formatRecordsListTable(
    records: DRecord[],
    options: { verbose?: boolean; columnWidth?: number } = {}
): FormattedRecordsListTable {
    const { verbose = false, columnWidth = DEFAULT_COLUMN_WIDTH } = options
    const maxWidth = verbose ? null : columnWidth
    const sorted = [...records].sort(compareByTitle)
    const headers = [
        '#',
        'Record uid',
        'Type',
        'Title',
        'Description',
        'Shared',
        'Record category',
    ]
    const rows = sorted.map((record, index) => {
        const uid = truncateText(record.uid || '(unknown uid)', maxWidth)
        const type = truncateText(getRecordType(record), maxWidth)
        const title = truncateText(getRecordTitle(record), maxWidth)
        const description = truncateText(getRecordDescription(record), maxWidth)
        const shared = record.shared ? 'True' : 'False'
        const category = getRecordCategory(record)
        return [String(index + 1), uid, type, title, description, shared, category]
    })
    return { headers, rows }
}

export function renderRecordsListAsciiTable(
    table: FormattedRecordsListTable,
    options: { minColWidth?: number } = {}
): string {
    const { minColWidth = 2 } = options
    const { headers, rows } = table
    const columnCount = headers.length
    const columnWidths: number[] = new Array(columnCount).fill(0)
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
        columnWidths[columnIndex] = Math.max(headers[columnIndex].length, minColWidth)
    }
    for (const row of rows) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
            const cell = row[columnIndex] || ''
            columnWidths[columnIndex] = Math.max(columnWidths[columnIndex], cell.length, minColWidth)
        }
    }
    const padCell = (cell: string, columnIndex: number) =>
        cell + ' '.repeat(columnWidths[columnIndex] - cell.length)
    const formatRow = (cells: string[]) => cells.map((cell, columnIndex) => padCell(cell, columnIndex)).join('  ')
    const ruleRow = Array.from({ length: columnCount }, (_unused, columnIndex) =>
        '-'.repeat(columnWidths[columnIndex])
    )
        .map((dashes, columnIndex) => padCell(dashes, columnIndex))
        .join('  ')
    const lines: string[] = [formatRow(headers), ruleRow]
    for (const row of rows) {
        lines.push(formatRow(row))
    }
    return lines.join('\n')
}

export function renderRecordsListTable(
    records: DRecord[],
    options: { verbose?: boolean; columnWidth?: number } = {}
): string {
    return renderRecordsListAsciiTable(formatRecordsListTable(records, options))
}

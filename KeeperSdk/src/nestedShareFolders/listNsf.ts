import type { InMemoryStorage } from '../storage/InMemoryStorage'
import {
    NsfItemType,
    findRecordFolderLocation,
    getKeeperDriveFolders,
    getKeeperDriveRecords,
    getRecordDescription,
    normalizeParentUid,
    resolveKeeperDriveRootParentUid,
} from './nsfHelpers'
import { getRecordTitle, getRecordType } from '../records/RecordUtils'
import {
    NSF_LIST_DEFAULT_COLUMN_WIDTH,
    NSF_LIST_FULL_HEADERS,
    NSF_LIST_MIN_TRUNCATE_PREFIX,
    NSF_LIST_TABLE_HEADERS,
} from './nsfConstants'

export enum ListNsfFormat {
    Table = 'table',
    CSV = 'csv',
    JSON = 'json',
}

export type ListNsfFormatInput = ListNsfFormat | `${ListNsfFormat}`

export type ListNsfOptions = {
    folders?: boolean
    records?: boolean
    format?: ListNsfFormatInput
}

export type ListNsfRow = {
    itemType: NsfItemType
    uid: string
    title: string
    type: string
    description: string
    parentOrFolder: string
}

export type FormattedListNsfTable = {
    headers: string[]
    rows: string[][]
}

function compareRows(a: ListNsfRow, b: ListNsfRow): number {
    const typeCompare = a.itemType.localeCompare(b.itemType)
    return typeCompare !== 0 ? typeCompare : a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
}

function resolveListParentOrFolder(storage: InMemoryStorage, value: string): string {
    if (value !== 'root') return value
    return resolveKeeperDriveRootParentUid(storage) ?? value
}

function collectFolderRows(storage: InMemoryStorage): ListNsfRow[] {
    return getKeeperDriveFolders(storage).map((folder) => ({
        itemType: NsfItemType.Folder,
        uid: folder.uid,
        title: folder.data.name || 'Unnamed',
        type: '',
        description: '',
        parentOrFolder: resolveListParentOrFolder(storage, normalizeParentUid(storage, folder.parentUid)),
    }))
}

function collectRecordRows(storage: InMemoryStorage): ListNsfRow[] {
    return getKeeperDriveRecords(storage).map((record) => ({
        itemType: NsfItemType.Record,
        uid: record.uid,
        title: getRecordTitle(record),
        type: getRecordType(record),
        description: getRecordDescription(record),
        parentOrFolder: resolveListParentOrFolder(
            storage,
            findRecordFolderLocation(storage, record.uid) || 'root'
        ),
    }))
}

export function listNestedShareFolders(storage: InMemoryStorage, options: ListNsfOptions = {}): ListNsfRow[] {
    const showFolders = options.folders ?? options.records == null
    const showRecords = options.records ?? options.folders == null
    const rows: ListNsfRow[] = []
    if (showFolders) rows.push(...collectFolderRows(storage))
    if (showRecords) rows.push(...collectRecordRows(storage))
    return rows.sort(compareRows)
}

function truncateText(text: string, maxLength: number): string {
    if (!text || text.length <= maxLength) return text
    if (maxLength <= NSF_LIST_MIN_TRUNCATE_PREFIX) return text.slice(0, maxLength)
    return `${text.slice(0, maxLength - NSF_LIST_MIN_TRUNCATE_PREFIX)}...`
}

export function formatListNsfTable(
    rows: ListNsfRow[],
    options: { columnWidth?: number } = {}
): FormattedListNsfTable {
    const columnWidth = options.columnWidth ?? NSF_LIST_DEFAULT_COLUMN_WIDTH
    const outRows = rows.map((row, index) => [
        String(index + 1),
        row.itemType,
        truncateText(row.uid, columnWidth),
        truncateText(row.title, columnWidth),
        truncateText(row.type, columnWidth),
        truncateText(row.description, columnWidth),
    ])
    return { headers: [...NSF_LIST_TABLE_HEADERS], rows: outRows }
}

export function renderListNsfAsciiTable(
    table: FormattedListNsfTable,
    options: { minColWidth?: number } = {}
): string {
    const { minColWidth = 2 } = options
    const { headers, rows } = table
    const columnCount = headers.length
    const columnWidths = headers.map((header, columnIndex) => {
        let width = Math.max(header.length, minColWidth)
        for (const row of rows) {
            width = Math.max(width, (row[columnIndex] || '').length, minColWidth)
        }
        return width
    })
    const padCell = (cell: string, columnIndex: number) =>
        cell + ' '.repeat(columnWidths[columnIndex] - cell.length)
    const formatRow = (cells: string[]) => cells.map((cell, columnIndex) => padCell(cell, columnIndex)).join('  ')
    const ruleRow = columnWidths.map((width, columnIndex) => padCell('-'.repeat(width), columnIndex)).join('  ')
    return [formatRow(headers), ruleRow, ...rows.map(formatRow)].join('\n')
}

function escapeCsvCell(value: string): string {
    if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`
    return value
}

export function formatListNsfCsv(rows: ListNsfRow[]): string {
    const lines = [NSF_LIST_FULL_HEADERS.join(',')]
    for (const row of rows) {
        lines.push(
            [
                row.itemType,
                row.uid,
                row.title,
                row.type,
                row.description,
                row.parentOrFolder,
            ]
                .map(escapeCsvCell)
                .join(',')
        )
    }
    return lines.join('\n')
}

function toListNsfJsonRow(row: ListNsfRow): Record<string, string> {
    const out: Record<string, string> = {
        item_type: row.itemType,
        uid: row.uid,
        title: row.title,
        parent_or_folder: row.parentOrFolder,
    }
    if (row.type) out.type = row.type
    if (row.description) out.description = row.description
    return out
}

export function formatListNsfJson(rows: ListNsfRow[]): string {
    return JSON.stringify(rows.map(toListNsfJsonRow), null, 2)
}

export function formatListNsfOutput(rows: ListNsfRow[], format: ListNsfFormatInput = ListNsfFormat.Table): string {
    switch (format) {
        case ListNsfFormat.CSV:
            return formatListNsfCsv(rows)
        case ListNsfFormat.JSON:
            return formatListNsfJson(rows)
        default:
            return renderListNsfAsciiTable(formatListNsfTable(rows))
    }
}

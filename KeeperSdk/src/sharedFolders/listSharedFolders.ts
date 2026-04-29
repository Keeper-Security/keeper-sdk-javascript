import type {
    DSharedFolder,
    DSharedFolderRecord,
    DSharedFolderTeam,
    DSharedFolderUser,
} from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { FolderKind } from '../folders/folderHelpers'

export type ListSharedFoldersOptions = {
    pattern?: string | null
    verbose?: boolean
    includeDetails?: boolean
}

export type ListSharedFolderRow = {
    shared_folder_uid: string
    name: string
    team_count?: number
    user_count?: number
    record_count?: number
    default_manage_records?: boolean
    default_manage_users?: boolean
    default_can_edit?: boolean
    default_can_share?: boolean
}

const DEFAULT_COLUMN_WIDTH = 40
const MIN_TRUNCATE_PREFIX = 3

const TOKEN_SEPARATOR_PATTERN = /[\s\-_.,;:!?@#$%^&*()[\]{}|\\/<>]+/

function sharedFolderDisplayName(folder: DSharedFolder): string {
    return (folder.name || folder.uid).trim() || folder.uid
}

function findSharedFolders(storage: InMemoryStorage, pattern: string): DSharedFolder[] {
    const searchWords = tokenize(pattern.toLowerCase())
    const matches: DSharedFolder[] = []
    for (const sharedFolder of storage.getAll<DSharedFolder>(FolderKind.SharedFolder)) {
        const uid = sharedFolder.uid
        const name = sharedFolderDisplayName(sharedFolder).toLowerCase()
        const entityWords = tokenize(`${uid} ${name}`)
        if (matchEntity(entityWords, searchWords)) {
            matches.push(sharedFolder)
        }
    }
    return matches
}

function matchEntity(entityWords: string[], searchWords: string[]): boolean {
    if (!searchWords || searchWords.length === 0) return true
    if (!entityWords || entityWords.length === 0) return false
    for (const entityWord of entityWords) {
        for (const searchWord of searchWords) {
            if (searchWord.length <= entityWord.length && entityWord.includes(searchWord)) {
                return true
            }
        }
    }
    return false
}

function tokenize(text: string): string[] {
    return text.split(TOKEN_SEPARATOR_PATTERN).filter((token) => token.length > 0)
}

function countBySharedFolderUid<T extends { sharedFolderUid: string }>(items: T[], sharedFolderUid: string): number {
    let count = 0
    for (const item of items) {
        if (item.sharedFolderUid === sharedFolderUid) count += 1
    }
    return count
}

function countTeamsForFolder(storage: InMemoryStorage, sharedFolderUid: string): number {
    return countBySharedFolderUid(storage.getAll<DSharedFolderTeam>('shared_folder_team'), sharedFolderUid)
}

function countUsersForFolder(storage: InMemoryStorage, sharedFolderUid: string): number {
    return countBySharedFolderUid(storage.getAll<DSharedFolderUser>('shared_folder_user'), sharedFolderUid)
}

function countRecordsForFolder(storage: InMemoryStorage, sharedFolderUid: string): number {
    return countBySharedFolderUid(storage.getAll<DSharedFolderRecord>('shared_folder_record'), sharedFolderUid)
}

export function listSharedFolders(
    storage: InMemoryStorage,
    options: ListSharedFoldersOptions = {}
): ListSharedFolderRow[] {
    const { pattern, includeDetails = false } = options
    const sharedFolders: DSharedFolder[] = pattern
        ? findSharedFolders(storage, pattern)
        : storage.getAll<DSharedFolder>(FolderKind.SharedFolder)

    return sharedFolders.map((sharedFolder) => {
        const shared_folder_uid = sharedFolder.uid
        const name = sharedFolderDisplayName(sharedFolder)
        const row: ListSharedFolderRow = { shared_folder_uid, name }
        if (includeDetails) {
            row.record_count = countRecordsForFolder(storage, shared_folder_uid)
            row.user_count = countUsersForFolder(storage, shared_folder_uid)
            row.team_count = countTeamsForFolder(storage, shared_folder_uid)
            row.default_manage_records = sharedFolder.defaultManageRecords
            row.default_manage_users = sharedFolder.defaultManageUsers
            row.default_can_edit = sharedFolder.defaultCanEdit
            row.default_can_share = sharedFolder.defaultCanShare
        }
        return row
    })
}

export type FormattedSharedFoldersTable = {
    headers: string[]
    rows: string[][]
}

function truncateText(text: string, maxLength: number): string {
    if (!text) return ''
    if (text.length <= maxLength) return text
    if (maxLength <= MIN_TRUNCATE_PREFIX) return text.slice(0, maxLength)
    return `${text.slice(0, maxLength - MIN_TRUNCATE_PREFIX)}...`
}

export function formatSharedFoldersTable(
    rows: ListSharedFolderRow[],
    options: { verbose?: boolean; columnWidth?: number } = {}
): FormattedSharedFoldersTable {
    const { verbose = false, columnWidth = DEFAULT_COLUMN_WIDTH } = options
    const maxWidth = verbose ? null : columnWidth
    const headers = ['#', 'Shared Folder UID', 'Name']
    const outRows: string[][] = rows.map((row, rowIndex) => {
        const uid = maxWidth == null ? row.shared_folder_uid : truncateText(row.shared_folder_uid, maxWidth)
        const name = maxWidth == null ? row.name : truncateText(row.name, maxWidth)
        return [String(rowIndex + 1), uid, name]
    })
    return { headers, rows: outRows }
}

export function renderSharedFoldersAsciiTable(
    table: FormattedSharedFoldersTable,
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

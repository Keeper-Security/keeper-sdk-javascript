import type {
    DSharedFolder,
    DSharedFolderRecord,
    DSharedFolderTeam,
    DSharedFolderUser,
} from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'

export type ListSharedFoldersOptions = {
    /** Search pattern (tokenized substring match on UID and name) */
    pattern?: string | null
    /**
     * When true, table columns are not width-limited (see `formatSharedFoldersTable`).
     * @default false
     */
    verbose?: boolean
    /**
     * Include record / user / team counts and default permission flags from the full `DSharedFolder` graph.
     * @default false
     */
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

function sharedFolderDisplayName(folder: DSharedFolder): string {
    return (folder.name || folder.uid).trim() || folder.uid
}

/**
 * Search shared folders by pattern (tokenized substring matching).
 * Matches if any search word is a substring of a token in the folder UID or display name.
 */
export function findSharedFolders(storage: InMemoryStorage, pattern: string): DSharedFolder[] {
    const searchWords = tokenize(pattern.toLowerCase())
    const out: DSharedFolder[] = []
    for (const sf of storage.getAll<DSharedFolder>('shared_folder')) {
        const uid = sf.uid
        const name = sharedFolderDisplayName(sf).toLowerCase()
        const entityWords = tokenize(`${uid} ${name}`)
        if (matchEntity(entityWords, searchWords)) {
            out.push(sf)
        }
    }
    return out
}

/**
 * Tokenized substring matching (aligns with Python `VaultData._match_entity`):
 * any search word with length ≤ an entity word must be contained in that entity word.
 */
export function matchEntity(entityWords: string[], searchWords: string[]): boolean {
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

/** Split a string into searchable words (whitespace and common punctuation). */
export function tokenize(text: string): string[] {
    return text.split(/[\s\-_.,;:!?@#$%^&*()[\]{}|\\/<>]+/).filter((w) => w.length > 0)
}

function countBySharedFolderUid<T extends { sharedFolderUid: string }>(
    items: T[],
    sharedFolderUid: string
): number {
    let n = 0
    for (const it of items) {
        if (it.sharedFolderUid === sharedFolderUid) n += 1
    }
    return n
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

/**
 * List shared folders from the last sync (local storage only; no API calls).
 * Equivalent in spirit to the Python CLI `list-sf` / `lsf` command.
 */
export function listSharedFolders(
    storage: InMemoryStorage,
    options: ListSharedFoldersOptions = {}
): ListSharedFolderRow[] {
    const { pattern, includeDetails = false } = options
    const sfs: DSharedFolder[] = pattern
        ? findSharedFolders(storage, pattern)
        : storage.getAll<DSharedFolder>('shared_folder')

    return sfs.map((sf) => {
        const shared_folder_uid = sf.uid
        const name = sharedFolderDisplayName(sf)
        const row: ListSharedFolderRow = { shared_folder_uid, name }
        if (includeDetails) {
            row.record_count = countRecordsForFolder(storage, shared_folder_uid)
            row.user_count = countUsersForFolder(storage, shared_folder_uid)
            row.team_count = countTeamsForFolder(storage, shared_folder_uid)
            row.default_manage_records = sf.defaultManageRecords
            row.default_manage_users = sf.defaultManageUsers
            row.default_can_edit = sf.defaultCanEdit
            row.default_can_share = sf.defaultCanShare
        }
        return row
    })
}

export type FormattedSharedFoldersTable = {
    /** `#`, then title-cased field labels for the two main columns. */
    headers: string[]
    /** One row per folder: [rowNumber, shared_folder_uid, name, ...] */
    rows: string[][]
}

function truncateText(str: string, maxLen: number): string {
    if (!str) return ''
    if (str.length <= maxLen) return str
    if (maxLen <= 3) return str.slice(0, maxLen)
    return `${str.slice(0, maxLen - 3)}...`
}

/**
 * Build a simple table of shared folder UID and name, with optional column truncation (40 unless `verbose`).
 */
export function formatSharedFoldersTable(
    rows: ListSharedFolderRow[],
    options: { verbose?: boolean; columnWidth?: number } = {}
): FormattedSharedFoldersTable {
    const { verbose = false, columnWidth = DEFAULT_COLUMN_WIDTH } = options
    const maxW = verbose ? null : columnWidth
    const headers = ['#', 'Shared Folder UID', 'Name']
    const outRows: string[][] = rows.map((r, i) => {
        const uid =
            maxW == null
                ? r.shared_folder_uid
                : truncateText(r.shared_folder_uid, maxW)
        const name =
            maxW == null ? r.name : truncateText(r.name, maxW)
        return [String(i + 1), uid, name]
    })
    return { headers, rows: outRows }
}

/** Plain-text table with a header rule row (suitable for console or log output). */
export function renderSharedFoldersAsciiTable(
    table: FormattedSharedFoldersTable,
    options: { minColWidth?: number } = {}
): string {
    const { minColWidth = 2 } = options
    const { headers, rows } = table
    const colCount = headers.length
    const colWidths: number[] = new Array(colCount).fill(0)
    for (let c = 0; c < colCount; c += 1) {
        colWidths[c] = Math.max(headers[c].length, minColWidth)
    }
    for (const r of rows) {
        for (let c = 0; c < colCount; c += 1) {
            const cell = r[c] ?? ''
            colWidths[c] = Math.max(colWidths[c], cell.length, minColWidth)
        }
    }
    const pad = (s: string, c: number) => s + ' '.repeat(colWidths[c] - s.length)
    const line = (cells: string[]) => cells.map((s, c) => pad(s, c)).join('  ')
    const ruleLine = Array.from({ length: colCount }, (_, c) => '-'.repeat(colWidths[c]))
        .map((dash, c) => pad(dash, c))
        .join('  ')
    const segs: string[] = [line(headers), ruleLine]
    for (const r of rows) {
        segs.push(line(r))
    }
    return segs.join('\n')
}

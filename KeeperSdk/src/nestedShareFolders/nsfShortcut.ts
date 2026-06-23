import type { Auth } from '@keeper-security/keeperapi'
import { Folder, folderRecordUpdateMessage, normal64Bytes, webSafe64FromBytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { getRecordTitle } from '../records/RecordUtils'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import { ListNsfFormat, type ListNsfFormatInput } from './listNsf'
import {
    KeeperDriveKind,
    checkFolderRemovePermission,
    ensureNestedShareRecord,
    getKeeperDriveRecord,
    getFolderDisplayName,
    isNestedShareFolder,
    isRootFolderUid,
    normalizeParentUid,
    requireAuthAccountUid,
    resolveNsfFolderIdentifier,
    resolveNsfRecordIdentifier,
} from './nsfHelpers'
import type { DKdFolderRecord } from '@keeper-security/keeperapi'

const SHORTCUT_ERROR = ResultCodes.NSF_SHORTCUT_FAILED
const ROOT_FOLDER_LABEL = 'root'

export type NsfShortcutRow = {
    recordUid: string
    title: string
    folders: string[]
}

export type ListNsfShortcutsOptions = {
    target?: string
    format?: ListNsfFormatInput
}

export type KeepNsfShortcutInput = {
    record: string
    folder?: string
    dryRun?: boolean
}

export type KeepNsfShortcutPlanItem = {
    recordUid: string
    title: string
    keepFolderUid: string
    keepFolderLabel: string
    removeFolderUids: string[]
    removeFolderLabels: string[]
}

export type KeepNsfShortcutResultItem = {
    folderUid: string
    success: boolean
    message: string
}

export type KeepNsfShortcutResult = {
    dryRun: boolean
    plan: KeepNsfShortcutPlanItem
    results: KeepNsfShortcutResultItem[]
    nothingToDo: boolean
}

function isShortcutFolder(storage: InMemoryStorage, folderUid: string): boolean {
    const normalized = normalizeParentUid(folderUid)
    return isRootFolderUid(normalized) || isNestedShareFolder(storage, normalized)
}

function formatFolderLabel(storage: InMemoryStorage, folderUid: string): string {
    const normalized = normalizeParentUid(folderUid)
    if (isRootFolderUid(normalized)) {
        return `root (${ROOT_FOLDER_LABEL})`
    }
    const name = getFolderDisplayName(storage, normalized)
    return `${name} (${normalized})`
}

export function getNsfRecordShortcuts(storage: InMemoryStorage): Map<string, Set<string>> {
    const records = new Map<string, Set<string>>()

    for (const entry of storage.getAll<DKdFolderRecord>(KeeperDriveKind.FolderRecord)) {
        const folderUid = normalizeParentUid(entry.folderUid)
        if (!isShortcutFolder(storage, folderUid)) continue
        if (!entry.recordUid) continue

        const folderSet = records.get(entry.recordUid) ?? new Set<string>()
        folderSet.add(folderUid)
        records.set(entry.recordUid, folderSet)
    }

    return new Map([...records.entries()].filter(([, folders]) => folders.size > 1))
}

function recordTitle(storage: InMemoryStorage, recordUid: string): string {
    const record = getKeeperDriveRecord(storage, recordUid)
    if (!record) return ''
    return getRecordTitle(record).slice(0, 32)
}

function resolveShortcutRecordUids(
    storage: InMemoryStorage,
    target: string,
    shortcuts: Map<string, Set<string>>
): Set<string> {
    const trimmed = target.trim()
    if (!trimmed) return new Set()

    const byUid = shortcuts.get(trimmed)
    if (byUid) return new Set([trimmed])

    const recordUid = resolveNsfRecordIdentifier(storage, trimmed)
    if (recordUid && shortcuts.has(recordUid)) {
        return new Set([recordUid])
    }

    const lower = trimmed.toLowerCase()
    const titleMatches = [...shortcuts.keys()].filter((uid) => {
        const title = recordTitle(storage, uid)
        return title.toLowerCase() === lower
    })
    if (titleMatches.length === 1) return new Set(titleMatches)
    if (titleMatches.length > 1) {
        throw new KeeperSdkError(
            `Multiple records matched "${trimmed}". Use a UID instead.`,
            ResultCodes.MULTIPLE_NSF_MATCHES
        )
    }

    const folderUid = resolveNsfFolderIdentifier(storage, trimmed)
    if (folderUid) {
        const normalized = normalizeParentUid(folderUid)
        const matches = [...shortcuts.entries()]
            .filter(([, folders]) => folders.has(normalized))
            .map(([recordUid]) => recordUid)
        return new Set(matches)
    }

    if (recordUid) {
        throw new KeeperSdkError(
            `Record '${trimmed}' is not linked to multiple folders.`,
            SHORTCUT_ERROR
        )
    }

    throw new KeeperSdkError(`Target '${trimmed}' not found`, ResultCodes.NSF_NOT_FOUND)
}

function collectShortcutRows(
    storage: InMemoryStorage,
    shortcuts: Map<string, Set<string>>,
    target?: string
): NsfShortcutRow[] {
    const recordUids = target?.trim()
        ? resolveShortcutRecordUids(storage, target, shortcuts)
        : new Set(shortcuts.keys())

    return [...recordUids]
        .sort((a, b) => recordTitle(storage, a).localeCompare(recordTitle(storage, b)))
        .map((recordUid) => ({
            recordUid,
            title: recordTitle(storage, recordUid),
            folders: [...(shortcuts.get(recordUid) ?? [])]
                .sort((a, b) =>
                    formatFolderLabel(storage, a).localeCompare(formatFolderLabel(storage, b))
                )
                .map((folderUid) => formatFolderLabel(storage, folderUid)),
        }))
}

function escapeCsvCell(value: string): string {
    if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`
    return value
}

export function formatNsfShortcutTable(rows: NsfShortcutRow[]): string {
    if (rows.length === 0) return 'No multi-folder records found.'
    const headers = ['Record UID', 'Title', 'Folders']
    const tableRows = rows.map((row) => [row.recordUid, row.title, row.folders.join('; ')])
    const columnWidths = headers.map((header, index) =>
        Math.max(header.length, ...tableRows.map((cells) => (cells[index] || '').length))
    )
    const pad = (cell: string, index: number) => cell + ' '.repeat(columnWidths[index] - cell.length)
    const formatRow = (cells: string[]) => cells.map((cell, index) => pad(cell, index)).join('  ')
    const rule = columnWidths.map((width, index) => pad('-'.repeat(width), index)).join('  ')
    return [formatRow(headers), rule, ...tableRows.map(formatRow)].join('\n')
}

export function formatNsfShortcutCsv(rows: NsfShortcutRow[]): string {
    const lines = ['record_uid,title,folders']
    for (const row of rows) {
        lines.push(
            [row.recordUid, row.title, row.folders.join('; ')]
                .map(escapeCsvCell)
                .join(',')
        )
    }
    return lines.join('\n')
}

export function formatNsfShortcutJson(rows: NsfShortcutRow[]): string {
    return JSON.stringify(
        rows.map((row) => ({
            record_uid: row.recordUid,
            title: row.title,
            folders: row.folders,
        })),
        null,
        2
    )
}

export function formatNsfShortcutOutput(
    rows: NsfShortcutRow[],
    format: ListNsfFormatInput = ListNsfFormat.Table
): string {
    const value = format as ListNsfFormat
    if (value === ListNsfFormat.JSON) return formatNsfShortcutJson(rows)
    if (value === ListNsfFormat.CSV) return formatNsfShortcutCsv(rows)
    return formatNsfShortcutTable(rows)
}

export function listNsfShortcuts(
    storage: InMemoryStorage,
    options: ListNsfShortcutsOptions = {}
): NsfShortcutRow[] {
    const shortcuts = getNsfRecordShortcuts(storage)
    return collectShortcutRows(storage, shortcuts, options.target)
}

function resolveKeepFolderUid(
    storage: InMemoryStorage,
    folderArg: string | undefined,
    defaultFolderUid: string | undefined
): string {
    if (folderArg?.trim()) {
        const folderUid = resolveNsfFolderIdentifier(storage, folderArg.trim())
        if (!folderUid) {
            throw new KeeperSdkError(`Folder '${folderArg}' not found`, ResultCodes.NSF_NOT_FOUND)
        }
        if (!isShortcutFolder(storage, folderUid)) {
            throw new KeeperSdkError(
                `Folder '${folderArg}' is not a nested share folder.`,
                ResultCodes.NSF_LEGACY_FOLDER
            )
        }
        return normalizeParentUid(folderUid)
    }

    if (defaultFolderUid && isNestedShareFolder(storage, defaultFolderUid)) {
        return normalizeParentUid(defaultFolderUid)
    }

    throw new KeeperSdkError(
        'Folder to keep record in is required (or set current folder to an NSF folder).',
        ResultCodes.NSF_FOLDER_REQUIRED
    )
}

function parseFolderRecordUpdateResult(
    response: Folder.IFolderRecordUpdateResponse,
    folderUid: string,
    recordUid: string
): KeepNsfShortcutResultItem {
    const result = response.folderRecordUpdateResult?.find((entry) => {
        if (!entry.recordUid?.length) return true
        return webSafe64FromBytes(entry.recordUid) === recordUid
    }) ?? response.folderRecordUpdateResult?.[0]

    if (!result) {
        return {
            folderUid,
            success: true,
            message: 'Record unlinked from folder',
        }
    }

    const status = result.status ?? Folder.FolderModifyStatus.SUCCESS
    const statusName = Folder.FolderModifyStatus[status] ?? String(status)
    return {
        folderUid,
        success: status === Folder.FolderModifyStatus.SUCCESS,
        message: result.message || statusName,
    }
}

async function unlinkRecordFromFolder(
    auth: Auth,
    folderUid: string,
    recordUid: string
): Promise<KeepNsfShortcutResultItem> {
    const response = await auth.executeRest(
        folderRecordUpdateMessage({
            folderUid: normal64Bytes(folderUid),
            removeRecords: [{ recordUid: normal64Bytes(recordUid) }],
        })
    )
    return parseFolderRecordUpdateResult(response, folderUid, recordUid)
}

export function formatKeepNsfShortcutPlan(plan: KeepNsfShortcutPlanItem): string {
    const lines = [
        'Shortcut keep plan',
        `  Record: ${plan.recordUid}  ${plan.title || '—'}`,
        `  Keep in: ${plan.keepFolderLabel}`,
    ]
    if (plan.removeFolderLabels.length === 0) {
        lines.push('  Remove from: (none)')
    } else {
        lines.push('  Remove from:')
        for (const label of plan.removeFolderLabels) {
            lines.push(`    ${label}`)
        }
    }
    return lines.join('\n')
}

export async function keepNsfShortcut(
    storage: InMemoryStorage,
    auth: Auth,
    input: KeepNsfShortcutInput,
    defaultFolderUid?: string
): Promise<KeepNsfShortcutResult> {
    const recordArg = input.record?.trim()
    if (!recordArg) {
        throw new KeeperSdkError('Record UID or title is required.', SHORTCUT_ERROR)
    }

    const shortcuts = getNsfRecordShortcuts(storage)
    const recordMatches = resolveShortcutRecordUids(storage, recordArg, shortcuts)
    if (recordMatches.size !== 1) {
        throw new KeeperSdkError(
            `Record '${recordArg}' could not be resolved uniquely.`,
            recordMatches.size === 0 ? SHORTCUT_ERROR : ResultCodes.MULTIPLE_NSF_MATCHES
        )
    }

    const recordUid = [...recordMatches][0]
    ensureNestedShareRecord(storage, recordUid, recordArg)

    const keepFolderUid = resolveKeepFolderUid(storage, input.folder, defaultFolderUid)
    const folderSet = shortcuts.get(recordUid)
    if (!folderSet || folderSet.size < 2) {
        throw new KeeperSdkError(
            `Record '${recordArg}' is not linked to multiple folders.`,
            SHORTCUT_ERROR
        )
    }
    if (!folderSet.has(keepFolderUid)) {
        throw new KeeperSdkError(
            `Record '${recordArg}' is not in folder '${input.folder ?? keepFolderUid}'.`,
            SHORTCUT_ERROR
        )
    }

    const removeFolderUids = [...folderSet].filter((folderUid) => folderUid !== keepFolderUid)
    const plan: KeepNsfShortcutPlanItem = {
        recordUid,
        title: recordTitle(storage, recordUid),
        keepFolderUid,
        keepFolderLabel: formatFolderLabel(storage, keepFolderUid),
        removeFolderUids,
        removeFolderLabels: removeFolderUids.map((folderUid) => formatFolderLabel(storage, folderUid)),
    }

    if (removeFolderUids.length === 0) {
        return { dryRun: input.dryRun ?? false, plan, results: [], nothingToDo: true }
    }

    if (input.dryRun) {
        return { dryRun: true, plan, results: [], nothingToDo: false }
    }

    const accountUid = requireAuthAccountUid(auth)
    const results: KeepNsfShortcutResultItem[] = []

    try {
        for (const folderUid of removeFolderUids) {
            checkFolderRemovePermission(storage, folderUid, recordUid, auth.username, accountUid)
            results.push(await unlinkRecordFromFolder(auth, folderUid, recordUid))
        }
        return { dryRun: false, plan, results, nothingToDo: false }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to keep nested share record shortcut: ${extractErrorMessage(err)}`,
            SHORTCUT_ERROR
        )
    }
}

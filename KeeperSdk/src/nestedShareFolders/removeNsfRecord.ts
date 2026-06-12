import type { Auth } from '@keeper-security/keeperapi'
import { normal64Bytes, webSafe64FromBytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import {
    checkRecordDeletePermission,
    ensureNestedShareRecord,
    findNestedShareFoldersForRecord,
    resolveNsfFolderIdentifier,
    resolveNsfRecordIdentifier,
} from './nsfHelpers'
import {
    RemoveRecordAction,
    RemoveRecordOperation,
    RemoveRecordStatus,
    removeRecordMessage,
    type RemoveRecordRemovalInput,
    type RemoveRecordResponse,
    type RemoveRecordResultItem,
} from './nsfRemoveMessages'
import { NSF_MAX_REMOVALS } from './nsfConstants'

export enum NsfRemoveOperation {
    OwnerTrash = 'owner-trash',
    FolderTrash = 'folder-trash',
    Unlink = 'unlink',
}

export type NsfRemoveOperationInput = NsfRemoveOperation | `${NsfRemoveOperation}`

export type RemoveNsfRecordInput = {
    records: string[]
    folder?: string
    operation?: NsfRemoveOperationInput
    force?: boolean
    dryRun?: boolean
}

export type NsfRemovePreviewItem = {
    recordUid: string
    folderUid: string
    status: string
    impact?: {
        foldersCount: number
        recordsCount: number
        affectedUsersCount: number
        affectedTeamsCount: number
        warnings: string[]
    }
    error?: { code: number; message: string }
}

export type RemoveNsfRecordResult = {
    confirmed: boolean
    dryRun: boolean
    preview: NsfRemovePreviewItem[]
    message?: string
}

const OPERATION_MAP: Record<NsfRemoveOperation, RemoveRecordOperation> = {
    [NsfRemoveOperation.Unlink]: RemoveRecordOperation.Unlink,
    [NsfRemoveOperation.FolderTrash]: RemoveRecordOperation.FolderTrash,
    [NsfRemoveOperation.OwnerTrash]: RemoveRecordOperation.OwnerTrash,
}

function normalizeOperation(operation: NsfRemoveOperationInput = NsfRemoveOperation.OwnerTrash): NsfRemoveOperation {
    const value = operation as NsfRemoveOperation
    if (value in OPERATION_MAP) return value
    throw new KeeperSdkError(
        `Invalid operation '${operation}'. Use: owner-trash, folder-trash, unlink.`,
        ResultCodes.NSF_REMOVE_FAILED
    )
}

function mapPreviewItem(item: RemoveRecordResultItem): NsfRemovePreviewItem {
    return {
        recordUid: item.recordUid.length ? webSafe64FromBytes(item.recordUid) : '',
        folderUid: item.folderUid.length ? webSafe64FromBytes(item.folderUid) : '',
        status: RemoveRecordStatus[item.status] ?? String(item.status),
        impact: item.impact
            ? {
                  foldersCount: item.impact.foldersCount,
                  recordsCount: item.impact.recordsCount,
                  affectedUsersCount: item.impact.affectedUsersCount,
                  affectedTeamsCount: item.impact.affectedTeamsCount,
                  warnings: [...item.impact.warnings],
              }
            : undefined,
        error: item.error,
    }
}

function mapPreview(response: RemoveRecordResponse): NsfRemovePreviewItem[] {
    return response.results.map(mapPreviewItem)
}

function hasPreviewErrors(preview: NsfRemovePreviewItem[]): boolean {
    return preview.some((item) => item.error != null || item.status !== 'Success')
}

type RemovalSpec = {
    recordUid: string
    folderUid?: string
    operation: RemoveRecordOperation
}

function buildRemovals(
    storage: InMemoryStorage,
    auth: Auth,
    recordIdentifiers: string[],
    folderIdentifier: string | undefined,
    operation: NsfRemoveOperation
): RemovalSpec[] {
    if (recordIdentifiers.length === 0) {
        throw new KeeperSdkError('At least one record UID or title is required.', ResultCodes.NSF_NOT_FOUND)
    }
    if (recordIdentifiers.length > NSF_MAX_REMOVALS) {
        throw new KeeperSdkError(`Maximum ${NSF_MAX_REMOVALS} records per request.`, ResultCodes.NSF_TOO_MANY_RECORDS)
    }
    if (operation === NsfRemoveOperation.Unlink && !folderIdentifier?.trim()) {
        throw new KeeperSdkError(
            '--folder is required when operation is "unlink".',
            ResultCodes.NSF_FOLDER_REQUIRED
        )
    }

    const folderUid = folderIdentifier ? resolveNsfFolderIdentifier(storage, folderIdentifier) : undefined
    if (folderIdentifier && !folderUid) {
        throw new KeeperSdkError(`Folder '${folderIdentifier}' not found`, ResultCodes.NSF_NOT_FOUND)
    }

    const removals: RemovalSpec[] = []
    for (const identifier of recordIdentifiers) {
        const recordUid = resolveNsfRecordIdentifier(storage, identifier)
        if (!recordUid) {
            throw new KeeperSdkError(`Record '${identifier}' not found`, ResultCodes.NSF_NOT_FOUND)
        }
        ensureNestedShareRecord(storage, recordUid, identifier)
        checkRecordDeletePermission(storage, recordUid, auth.username, auth.accountUid)

        let ctxFolder = folderUid
        if (!ctxFolder) {
            const folders = findNestedShareFoldersForRecord(storage, recordUid)
            if (folders.length === 0 && operation !== NsfRemoveOperation.OwnerTrash) {
                throw new KeeperSdkError(
                    `No folder context for record '${identifier}'. Use folder option or owner-trash operation.`,
                    ResultCodes.NSF_NOT_FOUND
                )
            }
            ctxFolder = folders[0]
        }

        removals.push({
            recordUid,
            folderUid: ctxFolder,
            operation: OPERATION_MAP[operation],
        })
    }
    return removals
}

function toRemovalInput(spec: RemovalSpec): RemoveRecordRemovalInput {
    return {
        recordUid: normal64Bytes(spec.recordUid),
        folderUid: spec.folderUid ? normal64Bytes(spec.folderUid) : undefined,
        operation: spec.operation,
    }
}

async function executeRemove(
    auth: Auth,
    removals: RemovalSpec[],
    action: RemoveRecordAction,
    confirmationToken?: Uint8Array
): Promise<RemoveRecordResponse> {
    return auth.executeRest(
        removeRecordMessage({
            action,
            records: removals.map(toRemovalInput),
            confirmationToken,
        })
    )
}

export function formatRemoveNsfPreview(preview: NsfRemovePreviewItem[]): string {
    const lines: string[] = []
    for (const item of preview) {
        lines.push(`Record: ${item.recordUid}`)
        if (item.folderUid) lines.push(`  Folder: ${item.folderUid}`)
        lines.push(`  Status: ${item.status}`)
        if (item.impact) {
            lines.push(
                `  Impact: folders=${item.impact.foldersCount}, records=${item.impact.recordsCount}, users=${item.impact.affectedUsersCount}, teams=${item.impact.affectedTeamsCount}`
            )
            for (const warning of item.impact.warnings) {
                lines.push(`  Warning: ${warning}`)
            }
        }
        if (item.error?.message) {
            lines.push(`  Error: ${item.error.message}`)
        }
        lines.push('')
    }
    return lines.join('\n').trimEnd()
}

export async function removeNestedShareRecords(
    storage: InMemoryStorage,
    auth: Auth,
    input: RemoveNsfRecordInput
): Promise<RemoveNsfRecordResult> {
    const operation = normalizeOperation(input.operation)
    const dryRun = input.dryRun ?? false
    const removals = buildRemovals(storage, auth, input.records, input.folder, operation)

    try {
        const previewResponse = await executeRemove(auth, removals, RemoveRecordAction.Preview)
        const preview = mapPreview(previewResponse)

        if (hasPreviewErrors(preview)) {
            throw new KeeperSdkError(formatRemoveNsfPreview(preview) || 'Removal preview failed.', ResultCodes.NSF_REMOVE_FAILED)
        }

        if (dryRun || !previewResponse.confirmationToken?.length) {
            return { confirmed: false, dryRun, preview }
        }

        if (!input.force) {
            return { confirmed: false, dryRun: false, preview, message: 'Confirmation required. Set force=true to proceed.' }
        }

        await executeRemove(auth, removals, RemoveRecordAction.Confirm, previewResponse.confirmationToken)
        return {
            confirmed: true,
            dryRun: false,
            preview,
            message: `Removed ${removals.length} record(s).`,
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to remove nested share record(s): ${extractErrorMessage(err)}`,
            ResultCodes.NSF_REMOVE_FAILED
        )
    }
}

import type { Auth, folder as FolderProto } from '@keeper-security/keeperapi'
import { folder, normal64Bytes, removeRecordMessage, webSafe64FromBytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import {
    checkFolderRemovePermission,
    checkRecordDeletePermission,
    ensureNestedShareRecord,
    findNestedShareFoldersForRecord,
    isRootFolderUid,
    resolveNsfFolderIdentifier,
    resolveNsfRecordIdentifier,
} from './nsfHelpers'
import { NSF_MAX_REMOVALS } from './nsfConstants'

const { RemoveAction, RecordOperationType, RemoveStatus } = folder.v3.remove
const REMOVE_SUCCESS_STATUS = RemoveStatus[RemoveStatus.REMOVE_STATUS_SUCCESS]

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

const OPERATION_MAP: Record<NsfRemoveOperation, FolderProto.v3.remove.RecordOperationType> = {
    [NsfRemoveOperation.Unlink]: RecordOperationType.UNLINK_FROM_FOLDER,
    [NsfRemoveOperation.FolderTrash]: RecordOperationType.MOVE_TO_FOLDER_TRASH,
    [NsfRemoveOperation.OwnerTrash]: RecordOperationType.MOVE_TO_OWNER_TRASH,
}

function normalizeOperation(operation: NsfRemoveOperationInput = NsfRemoveOperation.OwnerTrash): NsfRemoveOperation {
    const value = operation as NsfRemoveOperation
    if (value in OPERATION_MAP) return value
    throw new KeeperSdkError(
        `Invalid operation '${operation}'. Use: owner-trash, folder-trash, unlink.`,
        ResultCodes.NSF_REMOVE_FAILED
    )
}

function mapPreviewItem(item: FolderProto.v3.remove.IRemoveResult): NsfRemovePreviewItem {
    return {
        recordUid: item.itemUid?.length ? webSafe64FromBytes(item.itemUid) : '',
        folderUid: item.folderUid?.length ? webSafe64FromBytes(item.folderUid) : '',
        status: item.status == null ? 'REMOVE_STATUS_UNKNOWN' : (RemoveStatus[item.status] ?? String(item.status)),
        impact: item.impact
            ? {
                  foldersCount: item.impact.foldersCount ?? 0,
                  recordsCount: item.impact.recordsCount ?? 0,
                  affectedUsersCount: item.impact.affectedUsersCount ?? 0,
                  affectedTeamsCount: item.impact.affectedTeamsCount ?? 0,
                  warnings: [...(item.impact.warnings ?? [])],
              }
            : undefined,
        error: item.error
            ? {
                  code: item.error.code ?? 0,
                  message: item.error.message ?? '',
              }
            : undefined,
    }
}

function hasPreviewErrors(preview: NsfRemovePreviewItem[]): boolean {
    return preview.some((item) => item.error != null || item.status !== REMOVE_SUCCESS_STATUS)
}

type RemovalSpec = {
    recordUid: string
    folderUid?: string
    operation: FolderProto.v3.remove.RecordOperationType
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

    const accountUid = auth.accountUid
    if (!accountUid?.length) {
        throw new KeeperSdkError('Not logged in. Call login() first.', ResultCodes.NOT_LOGGED_IN)
    }

    const removals: RemovalSpec[] = []
    for (const identifier of recordIdentifiers) {
        const recordUid = resolveNsfRecordIdentifier(storage, identifier)
        if (!recordUid) {
            throw new KeeperSdkError(`Record '${identifier}' not found`, ResultCodes.NSF_NOT_FOUND)
        }
        ensureNestedShareRecord(storage, recordUid, identifier)

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

        if (operation === NsfRemoveOperation.OwnerTrash) {
            checkRecordDeletePermission(storage, recordUid, auth.username, accountUid, ctxFolder)
        } else {
            if (!ctxFolder || isRootFolderUid(storage, ctxFolder)) {
                throw new KeeperSdkError(
                    `Folder context is required for '${operation}' operation.`,
                    ResultCodes.NSF_FOLDER_REQUIRED
                )
            }
            checkFolderRemovePermission(storage, ctxFolder, recordUid, auth.username, accountUid)
        }

        removals.push({
            recordUid,
            folderUid: ctxFolder,
            operation: OPERATION_MAP[operation],
        })
    }
    return removals
}

async function executeRemove(
    auth: Auth,
    removals: RemovalSpec[],
    action: FolderProto.v3.remove.RemoveAction,
    confirmationToken?: Uint8Array
): Promise<FolderProto.v3.remove.IRemoveResponse> {
    return auth.executeRest(
        removeRecordMessage({
            action,
            records: removals.map((spec) => ({
                recordUid: normal64Bytes(spec.recordUid),
                folderUid: spec.folderUid ? normal64Bytes(spec.folderUid) : new Uint8Array(0),
                operationType: spec.operation,
            })),
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
        const previewResponse = await executeRemove(auth, removals, RemoveAction.REMOVE_ACTION_PREVIEW)
        const preview = (previewResponse.results ?? []).map(mapPreviewItem)

        if (hasPreviewErrors(preview)) {
            throw new KeeperSdkError(formatRemoveNsfPreview(preview) || 'Removal preview failed.', ResultCodes.NSF_REMOVE_FAILED)
        }

        if (dryRun || !previewResponse.confirmationToken?.length) {
            return { confirmed: false, dryRun, preview }
        }

        if (!input.force) {
            return { confirmed: false, dryRun: false, preview, message: 'Confirmation required. Set force=true to proceed.' }
        }

        await executeRemove(auth, removals, RemoveAction.REMOVE_ACTION_CONFIRM, previewResponse.confirmationToken)
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

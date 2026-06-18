import type { Auth, folder as FolderProto } from '@keeper-security/keeperapi'
import { folder, normal64Bytes, removeFolderMessage, webSafe64FromBytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import { NSF_MAX_FOLDER_REMOVALS } from './nsfConstants'
import {
    checkFolderDeletePermission,
    ensureNestedShareFolder,
    getFolderDisplayName,
    resolveNsfFolderUidOrName,
} from './nsfHelpers'

const { RemoveAction, FolderOperationType, RemoveStatus } = folder.v3.remove
const REMOVE_SUCCESS_STATUS = RemoveStatus[RemoveStatus.REMOVE_STATUS_SUCCESS]
const TRASH_ACTION_LABEL = 'moved to trash'
const PERMANENT_DELETE_ACTION_LABEL = 'permanently deleted'

export enum NsfRemoveFolderOperation {
    FolderTrash = 'folder-trash',
    DeletePermanent = 'delete-permanent',
}

export type NsfRemoveFolderOperationInput = NsfRemoveFolderOperation | `${NsfRemoveFolderOperation}`

export type RemoveNsfFolderInput = {
    folders: string[]
    operation?: NsfRemoveFolderOperationInput
    force?: boolean
    dryRun?: boolean
    quiet?: boolean
}

export type NsfRemoveFolderPreviewItem = {
    folderUid: string
    name: string
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

export type RemoveNsfFolderResult = {
    confirmed: boolean
    dryRun: boolean
    operation: NsfRemoveFolderOperation
    preview: NsfRemoveFolderPreviewItem[]
    message?: string
}

const OPERATION_MAP: Record<NsfRemoveFolderOperation, FolderProto.v3.remove.FolderOperationType> = {
    [NsfRemoveFolderOperation.FolderTrash]: FolderOperationType.FOLDER_MOVE_TO_FOLDER_TRASH,
    [NsfRemoveFolderOperation.DeletePermanent]: FolderOperationType.FOLDER_DELETE_PERMANENT,
}

function normalizeOperation(
    operation: NsfRemoveFolderOperationInput = NsfRemoveFolderOperation.FolderTrash
): NsfRemoveFolderOperation {
    const value = operation as NsfRemoveFolderOperation
    if (value in OPERATION_MAP) return value
    throw new KeeperSdkError(
        `Invalid operation '${operation}'. Use: folder-trash, delete-permanent.`,
        ResultCodes.NSF_REMOVE_FAILED
    )
}

type RemovalSpec = {
    folderUid: string
    name: string
    operation: FolderProto.v3.remove.FolderOperationType
}

function buildRemovals(
    storage: InMemoryStorage,
    auth: Auth,
    folderIdentifiers: string[],
    operation: NsfRemoveFolderOperation
): RemovalSpec[] {
    if (folderIdentifiers.length === 0) {
        throw new KeeperSdkError('Enter the name or UID of at least one folder.', ResultCodes.NSF_NOT_FOUND)
    }
    if (folderIdentifiers.length > NSF_MAX_FOLDER_REMOVALS) {
        throw new KeeperSdkError(
            `Maximum ${NSF_MAX_FOLDER_REMOVALS} folders per request.`,
            ResultCodes.NSF_TOO_MANY_FOLDERS
        )
    }

    const accountUid = auth.accountUid
    if (!accountUid?.length) {
        throw new KeeperSdkError('Not logged in. Call login() first.', ResultCodes.NOT_LOGGED_IN)
    }

    const removals: RemovalSpec[] = []
    for (const identifier of folderIdentifiers) {
        const folderUid = resolveNsfFolderUidOrName(storage, identifier)
        if (!folderUid) {
            throw new KeeperSdkError(`Folder '${identifier}' not found`, ResultCodes.NSF_NOT_FOUND)
        }
        ensureNestedShareFolder(storage, folderUid, identifier)
        checkFolderDeletePermission(storage, folderUid, auth.username, accountUid)
        removals.push({
            folderUid,
            name: getFolderDisplayName(storage, folderUid),
            operation: OPERATION_MAP[operation],
        })
    }
    return removals
}

function toRemovalInput(spec: RemovalSpec): FolderProto.v3.remove.IFolderRemoval {
    return {
        folderUid: normal64Bytes(spec.folderUid),
        operationType: spec.operation,
    }
}

async function executeRemove(
    auth: Auth,
    removals: RemovalSpec[],
    action: FolderProto.v3.remove.RemoveAction,
    confirmationToken?: Uint8Array
): Promise<FolderProto.v3.remove.IRemoveResponse> {
    return auth.executeRest(
        removeFolderMessage({
            action,
            folders: removals.map(toRemovalInput),
            confirmationToken,
        })
    )
}

function mapPreviewItem(spec: RemovalSpec, item: FolderProto.v3.remove.IRemoveResult): NsfRemoveFolderPreviewItem {
    return {
        folderUid: item.itemUid?.length ? webSafe64FromBytes(item.itemUid) : spec.folderUid,
        name: spec.name,
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

function mapPreview(
    removals: RemovalSpec[],
    response: FolderProto.v3.remove.IRemoveResponse
): NsfRemoveFolderPreviewItem[] {
    return (response.results ?? []).map((item, index) => {
        const spec = removals[index]
        if (!spec) {
            throw new KeeperSdkError('Folder removal preview mismatch.', ResultCodes.NSF_REMOVE_FAILED)
        }
        return mapPreviewItem(spec, item)
    })
}

function hasPreviewErrors(preview: NsfRemoveFolderPreviewItem[]): boolean {
    return preview.some((item) => item.error != null || item.status !== REMOVE_SUCCESS_STATUS)
}

export function formatRemoveNsfFolderPreview(
    preview: NsfRemoveFolderPreviewItem[],
    operation: NsfRemoveFolderOperation,
    quiet = false
): string {
    const action =
        operation === NsfRemoveFolderOperation.DeletePermanent
            ? PERMANENT_DELETE_ACTION_LABEL
            : TRASH_ACTION_LABEL
    const lines: string[] = []

    for (const item of preview) {
        lines.push(`\nThe following folder will be ${action}:`)
        lines.push(`  ${item.name} [${item.folderUid}]`)
        if (item.impact && !quiet) {
            const parts = [
                `sub-folders=${item.impact.foldersCount}`,
                `records=${item.impact.recordsCount}`,
                `users=${item.impact.affectedUsersCount}`,
                `teams=${item.impact.affectedTeamsCount}`,
            ]
            lines.push(`  Impact: ${parts.join(', ')}`)
            for (const warning of item.impact.warnings) {
                lines.push(`  Warning: ${warning}`)
            }
        }
        if (item.error?.message) {
            lines.push(`  Error: ${item.error.message}`)
        }
    }

    return lines.join('\n').trimEnd()
}

export async function removeNestedShareFolders(
    storage: InMemoryStorage,
    auth: Auth,
    input: RemoveNsfFolderInput
): Promise<RemoveNsfFolderResult> {
    const operation = normalizeOperation(input.operation)
    const dryRun = input.dryRun ?? false
    const removals = buildRemovals(storage, auth, input.folders, operation)

    try {
        const previewResponse = await executeRemove(auth, removals, RemoveAction.REMOVE_ACTION_PREVIEW)
        const preview = mapPreview(removals, previewResponse)

        if (hasPreviewErrors(preview)) {
            throw new KeeperSdkError(
                formatRemoveNsfFolderPreview(preview, operation, input.quiet) || 'Folder removal preview failed.',
                ResultCodes.NSF_REMOVE_FAILED
            )
        }

        if (dryRun || !previewResponse.confirmationToken?.length) {
            return { confirmed: false, dryRun, operation, preview }
        }

        if (!input.force) {
            return {
                confirmed: false,
                dryRun: false,
                operation,
                preview,
                message: 'Confirmation required. Set force=true to proceed.',
            }
        }

        await executeRemove(auth, removals, RemoveAction.REMOVE_ACTION_CONFIRM, previewResponse.confirmationToken)
        const actionLabel =
            operation === NsfRemoveFolderOperation.DeletePermanent ? 'Permanently deleted' : 'Moved to trash'
        return {
            confirmed: true,
            dryRun: false,
            operation,
            preview,
            message: `${actionLabel} ${removals.length} folder(s).`,
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to remove nested share folder(s): ${extractErrorMessage(err)}`,
            ResultCodes.NSF_REMOVE_FAILED
        )
    }
}

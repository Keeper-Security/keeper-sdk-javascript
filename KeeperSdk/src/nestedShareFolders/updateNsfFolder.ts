import type { Auth } from '@keeper-security/keeperapi'
import { Folder, folderUpdateMessage, normal64Bytes, platform, webSafe64FromBytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import { NSF_FOLDER_COLORS, NSF_MAX_FOLDER_UPDATES, type NsfFolderColor } from './nsfConstants'
import {
    checkFolderEditPermission,
    checkFolderSharePermission,
    ensureNestedShareFolder,
    getFolderDisplayName,
    getKeeperDriveFolder,
    parseFolderModifyStatus,
    patchNsfFolderInheritPermissions,
    patchNsfFolderMetadata,
    requireAuthAccountUid,
    resolveKeeperDriveParentUid,
    resolveNsfFolderIdentifier,
} from './nsfHelpers'
import type { NsfFolderColorInput } from './mkdirNsf'

type NsfFolderMetadata = {
    name: string
    color?: string
}

export type UpdateNsfFolderInput = {
    folder: string
    name?: string
    color?: NsfFolderColorInput
    /** When set, updates whether child folders inherit this folder's user permissions. */
    inheritPermissions?: boolean
    quiet?: boolean
}

export type UpdateNsfFolderResult = {
    folderUid: string
    updated: boolean
    message?: string
}

export type UpdateNsfFolderBatchItem = {
    folder: string
    name?: string
    color?: NsfFolderColorInput
    inheritPermissions?: boolean
}

export type UpdateNsfFolderBatchResultItem = {
    folder: string
    folderUid: string
    updated: boolean
    status?: Folder.FolderModifyStatus
    message?: string
}

export type UpdateNsfFoldersResult = {
    results: UpdateNsfFolderBatchResultItem[]
    anyUpdated: boolean
}

type PreparedFolderUpdate = {
    identifier: string
    folderUid: string
    displayName: string
    newName?: string
    color?: NsfFolderColor
    inheritPermissions?: boolean
    metadata: NsfFolderMetadata
    folderData: Folder.IFolderData
}

function normalizeColor(color: NsfFolderColorInput): NsfFolderColor {
    if (!(NSF_FOLDER_COLORS as readonly string[]).includes(color)) {
        throw new KeeperSdkError(
            `Invalid color '${color}'. Use: ${NSF_FOLDER_COLORS.join(', ')}.`,
            ResultCodes.NSF_UPDATE_FAILED
        )
    }
    return color
}

function readExistingMetadata(folderUid: string, storage: InMemoryStorage): NsfFolderMetadata {
    const folder = getKeeperDriveFolder(storage, folderUid)
    if (!folder) {
        throw new KeeperSdkError(`Folder '${folderUid}' not found`, ResultCodes.NSF_NOT_FOUND)
    }
    const data = folder.data as NsfFolderMetadata
    return {
        name: data.name || '',
        color: data.color,
    }
}

function mergeFolderMetadata(
    existing: NsfFolderMetadata,
    newName: string | undefined,
    color: NsfFolderColor | undefined
): NsfFolderMetadata {
    const metadata: NsfFolderMetadata = {
        name: newName !== undefined ? newName : existing.name,
    }
    if (color !== undefined) {
        if (color !== 'none') metadata.color = color
    } else if (existing.color && existing.color !== 'none') {
        metadata.color = existing.color
    }
    return metadata
}

function normalizeUpdateName(name: string | undefined): string | undefined {
    if (name === undefined) return undefined
    const trimmed = name.trim()
    if (!trimmed) {
        throw new KeeperSdkError('Folder name cannot be empty', ResultCodes.NSF_UPDATE_FAILED)
    }
    return trimmed
}

function assertHasUpdateFields(input: {
    name?: string
    color?: NsfFolderColorInput
    inheritPermissions?: boolean
}): void {
    if (input.name === undefined && input.color === undefined && input.inheritPermissions === undefined) {
        throw new KeeperSdkError(
            'New folder name, color, and/or inheritPermissions parameters are required.',
            ResultCodes.NSF_UPDATE_FAILED
        )
    }
}

async function buildUpdateFolderData(
    storage: InMemoryStorage,
    folderUid: string,
    metadata: NsfFolderMetadata,
    inheritPermissions?: boolean
): Promise<Folder.IFolderData> {
    const folderKey = await storage.getKeyBytes(folderUid)
    if (!folderKey) {
        throw new KeeperSdkError(
            `Folder key not available for ${folderUid}. Run sync() first.`,
            ResultCodes.NSF_MISSING_KEY
        )
    }

    const encryptedData = await platform.aesGcmEncrypt(platform.stringToBytes(JSON.stringify(metadata)), folderKey)

    const stored = getKeeperDriveFolder(storage, folderUid)
    const resolvedParentUid = resolveKeeperDriveParentUid(storage, stored?.parentUid)

    const folderData = Folder.FolderData.create({
        folderUid: normal64Bytes(folderUid),
        parentUid: resolvedParentUid ? normal64Bytes(resolvedParentUid) : undefined,
        data: encryptedData,
    })

    if (inheritPermissions !== undefined) {
        folderData.inheritUserPermissions = inheritPermissions
            ? Folder.SetBooleanValue.BOOLEAN_TRUE
            : Folder.SetBooleanValue.BOOLEAN_FALSE
    }

    return folderData
}

function buildSuccessMessage(
    folderDisplayName: string,
    newName: string | undefined,
    color: NsfFolderColor | undefined,
    inheritPermissions: boolean | undefined,
    quiet?: boolean
): string | undefined {
    if (quiet) return undefined
    if (newName !== undefined) {
        return `Folder "${folderDisplayName}" has been renamed to "${newName}".`
    }
    if (color !== undefined) {
        return `Folder "${folderDisplayName}" color has been updated.`
    }
    if (inheritPermissions !== undefined) {
        return `Folder "${folderDisplayName}" inherit permissions has been updated.`
    }
    return `Folder "${folderDisplayName}" has been updated.`
}

async function prepareFolderUpdate(
    storage: InMemoryStorage,
    auth: Auth,
    input: {
        folder: string
        name?: string
        color?: NsfFolderColorInput
        inheritPermissions?: boolean
    }
): Promise<PreparedFolderUpdate> {
    const folderArg = input.folder?.trim()
    if (!folderArg) {
        throw new KeeperSdkError('Enter the path or UID of existing folder.', ResultCodes.NSF_UPDATE_FAILED)
    }

    assertHasUpdateFields(input)
    const newName = normalizeUpdateName(input.name)
    const color = input.color !== undefined ? normalizeColor(input.color) : undefined
    const inheritPermissions = input.inheritPermissions

    const folderUid = resolveNsfFolderIdentifier(storage, folderArg)
    if (!folderUid) {
        throw new KeeperSdkError(`Folder '${folderArg}' not found`, ResultCodes.NSF_NOT_FOUND)
    }

    ensureNestedShareFolder(storage, folderUid, folderArg)
    const accountUid = requireAuthAccountUid(auth)

    if (newName !== undefined || color !== undefined) {
        checkFolderEditPermission(storage, folderUid, auth.username, accountUid)
    }
    if (inheritPermissions !== undefined) {
        checkFolderSharePermission(storage, folderUid, auth.username, accountUid)
    }

    const displayName = getFolderDisplayName(storage, folderUid)
    const existing = readExistingMetadata(folderUid, storage)
    const metadata = mergeFolderMetadata(existing, newName, color)
    const folderData = await buildUpdateFolderData(storage, folderUid, metadata, inheritPermissions)

    return {
        identifier: folderArg,
        folderUid,
        displayName,
        newName,
        color,
        inheritPermissions,
        metadata,
        folderData,
    }
}

async function persistFolderUpdate(storage: InMemoryStorage, prepared: PreparedFolderUpdate): Promise<void> {
    await patchNsfFolderMetadata(storage, prepared.folderUid, prepared.metadata)
    if (prepared.inheritPermissions !== undefined) {
        await patchNsfFolderInheritPermissions(storage, prepared.folderUid, prepared.inheritPermissions)
    }
}

export async function updateNestedShareFolder(
    storage: InMemoryStorage,
    auth: Auth,
    input: UpdateNsfFolderInput
): Promise<UpdateNsfFolderResult> {
    try {
        const prepared = await prepareFolderUpdate(storage, auth, input)
        const response = await auth.executeRest(folderUpdateMessage({ folderData: [prepared.folderData] }))
        parseFolderModifyStatus(response.folderUpdateResults?.[0], ResultCodes.NSF_UPDATE_FAILED)

        await persistFolderUpdate(storage, prepared)

        return {
            folderUid: prepared.folderUid,
            updated: true,
            message: buildSuccessMessage(
                prepared.displayName,
                prepared.newName,
                prepared.color,
                prepared.inheritPermissions,
                input.quiet
            ),
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to update nested share folder: ${extractErrorMessage(err)}`,
            ResultCodes.NSF_UPDATE_FAILED
        )
    }
}

/**
 * Batch-update Nested Share Folders via `vault/folders/v3/update`.
 * Chunks into requests of at most {@link NSF_MAX_FOLDER_UPDATES} (100) folders.
 * Each item must include folderUid and either encrypted data and/or inheritUserPermissions;
 * parentUid is included from local storage as required by the API.
 */
export async function updateNestedShareFolders(
    storage: InMemoryStorage,
    auth: Auth,
    updates: UpdateNsfFolderBatchItem[]
): Promise<UpdateNsfFoldersResult> {
    if (!updates?.length) {
        throw new KeeperSdkError('At least one folder update is required.', ResultCodes.NSF_UPDATE_FAILED)
    }

    try {
        const preparedAll: PreparedFolderUpdate[] = []
        for (const item of updates) {
            preparedAll.push(await prepareFolderUpdate(storage, auth, item))
        }

        const results: UpdateNsfFolderBatchResultItem[] = []
        let anyUpdated = false

        for (let i = 0; i < preparedAll.length; i += NSF_MAX_FOLDER_UPDATES) {
            const batch = preparedAll.slice(i, i + NSF_MAX_FOLDER_UPDATES)
            const response = await auth.executeRest(
                folderUpdateMessage({
                    folderData: batch.map((item) => item.folderData),
                })
            )
            const remoteResults = response.folderUpdateResults ?? []
            const remoteByFolderUid = new Map<string, Folder.IFolderModifyResult>()
            for (const remote of remoteResults) {
                if (!remote.folderUid?.length) continue
                remoteByFolderUid.set(webSafe64FromBytes(remote.folderUid), remote)
            }

            for (const prepared of batch) {
                const modifyResult = remoteByFolderUid.get(prepared.folderUid)
                if (!modifyResult) {
                    results.push({
                        folder: prepared.identifier,
                        folderUid: prepared.folderUid,
                        updated: false,
                        message: 'No result returned for folder update.',
                    })
                    continue
                }

                const status = modifyResult.status ?? Folder.FolderModifyStatus.SUCCESS
                const success = status === Folder.FolderModifyStatus.SUCCESS
                const statusName = Folder.FolderModifyStatus[status] ?? String(status)
                let message = modifyResult.message ?? undefined
                if (!message) {
                    if (success) {
                        message = buildSuccessMessage(
                            prepared.displayName,
                            prepared.newName,
                            prepared.color,
                            prepared.inheritPermissions
                        )
                    } else {
                        message = `Folder operation failed (${statusName}).`
                    }
                }

                if (success) {
                    anyUpdated = true
                    await persistFolderUpdate(storage, prepared)
                }

                results.push({
                    folder: prepared.identifier,
                    folderUid: prepared.folderUid,
                    updated: success,
                    status,
                    message: message || undefined,
                })
            }
        }

        return { results, anyUpdated }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to update nested share folders: ${extractErrorMessage(err)}`,
            ResultCodes.NSF_UPDATE_FAILED
        )
    }
}

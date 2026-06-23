import type { Auth } from '@keeper-security/keeperapi'
import { Folder, folderUpdateMessage, normal64Bytes, platform } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import { NSF_FOLDER_COLORS, type NsfFolderColor } from './nsfConstants'
import {
    checkFolderEditPermission,
    ensureNestedShareFolder,
    getFolderDisplayName,
    getKeeperDriveFolder,
    parseFolderModifyStatus,
    patchNsfFolderMetadata,
    requireAuthAccountUid,
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
    quiet?: boolean
}

export type UpdateNsfFolderResult = {
    folderUid: string
    updated: boolean
    message?: string
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

async function buildUpdateFolderData(
    storage: InMemoryStorage,
    folderUid: string,
    metadata: NsfFolderMetadata
): Promise<Folder.IFolderData> {
    const folderKey = await storage.getKeyBytes(folderUid)
    if (!folderKey) {
        throw new KeeperSdkError(
            `Folder key not available for ${folderUid}. Run sync() first.`,
            ResultCodes.NSF_MISSING_KEY
        )
    }

    const encryptedData = await platform.aesGcmEncrypt(
        platform.stringToBytes(JSON.stringify(metadata)),
        folderKey
    )

    return Folder.FolderData.create({
        folderUid: normal64Bytes(folderUid),
        data: encryptedData,
    })
}

function buildSuccessMessage(
    folderDisplayName: string,
    newName: string | undefined,
    color: NsfFolderColor | undefined,
    quiet?: boolean
): string | undefined {
    if (quiet) return undefined
    if (newName !== undefined) {
        return `Folder "${folderDisplayName}" has been renamed to "${newName}".`
    }
    if (color !== undefined) {
        return `Folder "${folderDisplayName}" color has been updated.`
    }
    return `Folder "${folderDisplayName}" has been updated.`
}

export async function updateNestedShareFolder(
    storage: InMemoryStorage,
    auth: Auth,
    input: UpdateNsfFolderInput
): Promise<UpdateNsfFolderResult> {
    const folderArg = input.folder?.trim()
    if (!folderArg) {
        throw new KeeperSdkError('Enter the path or UID of existing folder.', ResultCodes.NSF_UPDATE_FAILED)
    }

    let newName = input.name
    if (newName !== undefined) {
        newName = newName.trim()
        if (!newName) {
            throw new KeeperSdkError('Folder name cannot be empty', ResultCodes.NSF_UPDATE_FAILED)
        }
    }

    const color = input.color !== undefined ? normalizeColor(input.color) : undefined
    if (newName === undefined && color === undefined) {
        throw new KeeperSdkError(
            'New folder name and/or color parameters are required.',
            ResultCodes.NSF_UPDATE_FAILED
        )
    }

    const folderUid = resolveNsfFolderIdentifier(storage, folderArg)
    if (!folderUid) {
        throw new KeeperSdkError(`Folder '${folderArg}' not found`, ResultCodes.NSF_NOT_FOUND)
    }

    ensureNestedShareFolder(storage, folderUid, folderArg)
    const accountUid = requireAuthAccountUid(auth)
    checkFolderEditPermission(storage, folderUid, auth.username, accountUid)

    const folderDisplayName = getFolderDisplayName(storage, folderUid)

    try {
        const existing = readExistingMetadata(folderUid, storage)
        const metadata = mergeFolderMetadata(existing, newName, color)
        const folderData = await buildUpdateFolderData(storage, folderUid, metadata)

        const response = await auth.executeRest(folderUpdateMessage({ folderData: [folderData] }))
        parseFolderModifyStatus(response.folderUpdateResults?.[0], ResultCodes.NSF_UPDATE_FAILED)

        await patchNsfFolderMetadata(storage, folderUid, metadata)

        return {
            folderUid,
            updated: true,
            message: buildSuccessMessage(folderDisplayName, newName, color, input.quiet),
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to update nested share folder: ${extractErrorMessage(err)}`,
            ResultCodes.NSF_UPDATE_FAILED
        )
    }
}

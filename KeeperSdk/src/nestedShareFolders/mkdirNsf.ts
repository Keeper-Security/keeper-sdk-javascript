import type { Auth } from '@keeper-security/keeperapi'
import {
    Folder,
    folderAddMessage,
    generateEncryptionKey,
    generateUid,
    normal64Bytes,
    platform,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import { NSF_FOLDER_COLORS, type NsfFolderColor } from './nsfConstants'
import {
    buildFolderOwnerInfo,
    cacheNewNsfFolder,
    findExistingChildFolder,
    isNestedShareFolder,
    parseFolderModifyStatus,
    parseNsfPath,
    requireAuthDataKey,
    resolveKeeperDriveParentUid,
} from './nsfHelpers'

type NsfFolderMetadata = {
    name: string
    color?: string
}

export type NsfFolderColorInput = NsfFolderColor | `${NsfFolderColor}`

export type MkdirNsfInput = {
    folder: string
    color?: NsfFolderColorInput
    noInheritPermissions?: boolean
    baseFolderUid?: string | null
}

export type MkdirNsfResult = {
    folderUid: string
    created: boolean
    message?: string
}

function normalizeColor(color?: NsfFolderColorInput): NsfFolderColor | undefined {
    if (!color) return undefined
    if (!(NSF_FOLDER_COLORS as readonly string[]).includes(color)) {
        throw new KeeperSdkError(
            `Invalid color '${color}'. Use: ${NSF_FOLDER_COLORS.join(', ')}.`,
            ResultCodes.NSF_MKDIR_FAILED
        )
    }
    return color
}

function resolveBaseFolderUid(
    storage: InMemoryStorage,
    baseFolderUid: string | null | undefined
): string | null {
    if (!baseFolderUid) return null
    return isNestedShareFolder(storage, baseFolderUid) ? baseFolderUid : null
}

async function resolveFolderKeyEncryptionKey(
    storage: InMemoryStorage,
    auth: Auth,
    parentUid: string | null
): Promise<Uint8Array> {
    if (parentUid) {
        const parentKey = await storage.getKeyBytes(parentUid)
        if (parentKey) return parentKey
    }
    return requireAuthDataKey(auth)
}

async function prepareFolderData(
    storage: InMemoryStorage,
    auth: Auth,
    folderName: string,
    parentUid: string | null,
    color: NsfFolderColor | undefined,
    inheritPermissions: boolean
): Promise<{ folderUid: string; folderData: Folder.IFolderData }> {
    const folderUid = generateUid()
    const folderKey = generateEncryptionKey()
    await storage.saveKeyBytes(folderUid, folderKey)

    const metadata: NsfFolderMetadata = { name: folderName }
    if (color && color !== 'none') metadata.color = color

    const resolvedParentUid = resolveKeeperDriveParentUid(storage, parentUid)
    const encryptedData = await platform.aesGcmEncrypt(
        platform.stringToBytes(JSON.stringify(metadata)),
        folderKey
    )
    const encryptionKey = await resolveFolderKeyEncryptionKey(storage, auth, resolvedParentUid)
    const encryptedFolderKey = await platform.aesGcmEncrypt(folderKey, encryptionKey)

    return {
        folderUid,
        folderData: Folder.FolderData.create({
            folderUid: normal64Bytes(folderUid),
            parentUid: resolvedParentUid ? normal64Bytes(resolvedParentUid) : undefined,
            data: encryptedData,
            folderKey: encryptedFolderKey,
            type: Folder.FolderUsageType.UT_NORMAL,
            inheritUserPermissions: inheritPermissions
                ? Folder.SetBooleanValue.BOOLEAN_TRUE
                : Folder.SetBooleanValue.BOOLEAN_FALSE,
            ownerInfo: buildFolderOwnerInfo(auth),
        }),
    }
}

async function createFolderV3(
    storage: InMemoryStorage,
    auth: Auth,
    folderName: string,
    parentUid: string | null,
    color: NsfFolderColor | undefined,
    inheritPermissions: boolean
): Promise<{ folderUid: string; message: string }> {
    const { folderUid, folderData } = await prepareFolderData(
        storage,
        auth,
        folderName,
        parentUid,
        color,
        inheritPermissions
    )

    const response = await auth.executeRest(folderAddMessage({ folderData: [folderData] }))
    const message = parseFolderModifyStatus(response.folderAddResults?.[0], ResultCodes.NSF_MKDIR_FAILED)

    await cacheNewNsfFolder(storage, auth, folderUid, folderName, parentUid, inheritPermissions)
    return { folderUid, message }
}

export async function mkdirNestedShareFolder(
    storage: InMemoryStorage,
    auth: Auth,
    input: MkdirNsfInput
): Promise<MkdirNsfResult> {
    const folderPath = (input.folder ?? '').trim()
    if (!folderPath) {
        throw new KeeperSdkError('Folder name is required.', ResultCodes.NSF_MKDIR_FAILED)
    }

    const color = normalizeColor(input.color)
    const inheritPermissions = !input.noInheritPermissions
    const segments = parseNsfPath(folderPath)
    let parentUid: string | null = resolveBaseFolderUid(storage, input.baseFolderUid)
    const lastIdx = segments.length - 1
    let createdUid: string | undefined

    try {
        for (let idx = 0; idx < segments.length; idx++) {
            const segment = segments[idx]
            const isLeaf = idx === lastIdx
            const existingUid = findExistingChildFolder(storage, segment, parentUid)

            if (existingUid) {
                if (isLeaf) {
                    return {
                        folderUid: existingUid,
                        created: false,
                        message: `Folder "${segment}" already exists.`,
                    }
                }
                parentUid = existingUid
                continue
            }

            const result = await createFolderV3(
                storage,
                auth,
                segment,
                parentUid,
                isLeaf ? color : undefined,
                isLeaf ? inheritPermissions : true
            )
            createdUid = result.folderUid
            parentUid = createdUid
        }

        if (!createdUid) {
            throw new KeeperSdkError('Folder creation did not return a UID.', ResultCodes.NSF_MKDIR_FAILED)
        }

        return {
            folderUid: createdUid,
            created: true,
            message:
                segments.length > 1
                    ? `Created folder path "${folderPath}".`
                    : `Created folder "${segments[lastIdx]}".`,
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to create nested share folder: ${extractErrorMessage(err)}`,
            ResultCodes.NSF_MKDIR_FAILED
        )
    }
}

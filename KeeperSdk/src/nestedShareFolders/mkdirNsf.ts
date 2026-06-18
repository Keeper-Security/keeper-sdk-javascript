import type { Auth } from '@keeper-security/keeperapi'
import {
    Folder,
    folderAddMessage,
    generateUid,
    normal64Bytes,
    platform,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import {
    NSF_FOLDER_COLORS,
    type NsfFolderColor,
} from './nsfConstants'
import {
    cacheNewNsfFolder,
    findExistingChildFolder,
    isNestedShareFolder,
    isRootFolderUid,
    parseNsfPath,
} from './nsfHelpers'

const FOLDER_KEY_BYTE_LENGTH = 32

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
    const value = color as NsfFolderColor
    if (!(NSF_FOLDER_COLORS as readonly string[]).includes(value)) {
        throw new KeeperSdkError(
            `Invalid color '${color}'. Use: ${NSF_FOLDER_COLORS.join(', ')}.`,
            ResultCodes.NSF_MKDIR_FAILED
        )
    }
    return value
}

function resolveBaseFolderUid(
    storage: InMemoryStorage,
    baseFolderUid: string | null | undefined
): string | null {
    if (!baseFolderUid) return null
    if (isNestedShareFolder(storage, baseFolderUid)) return baseFolderUid
    return null
}

async function resolveFolderKeyEncryptionKey(
    storage: InMemoryStorage,
    auth: Auth,
    parentUid: string | null
): Promise<Uint8Array> {
    const normalizedParent = parentUid && !isRootFolderUid(parentUid) ? parentUid : null
    if (normalizedParent) {
        const parentKey = await storage.getKeyBytes(normalizedParent)
        if (parentKey) return parentKey
    }
    if (!auth.dataKey) {
        throw new KeeperSdkError('Data key not available. Ensure you are logged in.', ResultCodes.NSF_MISSING_KEY)
    }
    return auth.dataKey
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
    const folderKey = platform.getRandomBytes(FOLDER_KEY_BYTE_LENGTH)
    await storage.saveKeyBytes(folderUid, folderKey)

    const metadata: { name: string; color?: string } = { name: folderName }
    if (color && color !== 'none') metadata.color = color

    const encryptedData = await platform.aesGcmEncrypt(
        platform.stringToBytes(JSON.stringify(metadata)),
        folderKey
    )

    const normalizedParent = parentUid && !isRootFolderUid(parentUid) ? parentUid : null
    const encryptionKey = await resolveFolderKeyEncryptionKey(storage, auth, normalizedParent)
    const encryptedFolderKey = await platform.aesGcmEncrypt(folderKey, encryptionKey)

    return {
        folderUid,
        folderData: {
            folderUid: normal64Bytes(folderUid),
            parentUid: normalizedParent ? normal64Bytes(normalizedParent) : undefined,
            data: encryptedData,
            folderKey: encryptedFolderKey,
            type: Folder.FolderUsageType.UT_NORMAL,
            inheritUserPermissions: inheritPermissions
                ? Folder.SetBooleanValue.BOOLEAN_TRUE
                : Folder.SetBooleanValue.BOOLEAN_FALSE,
        },
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
    const result = response.folderAddResults?.[0]
    if (!result) {
        throw new KeeperSdkError('No results from folder creation.', ResultCodes.NSF_MKDIR_FAILED)
    }

    const statusName = Folder.FolderModifyStatus[result.status ?? Folder.FolderModifyStatus.SUCCESS] ?? 'UNKNOWN'
    if (result.status !== Folder.FolderModifyStatus.SUCCESS) {
        throw new KeeperSdkError(result.message || `Folder creation failed (${statusName}).`, ResultCodes.NSF_MKDIR_FAILED)
    }

    await cacheNewNsfFolder(storage, auth, folderUid, folderName, parentUid, inheritPermissions)
    return {
        folderUid,
        message: result.message || 'Folder created successfully',
    }
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
    const baseFolderUid = resolveBaseFolderUid(storage, input.baseFolderUid)
    const segments = parseNsfPath(folderPath)
    let parentUid = baseFolderUid
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

            const segColor = isLeaf ? color : undefined
            const segInherit = isLeaf ? inheritPermissions : true
            const result = await createFolderV3(storage, auth, segment, parentUid, segColor, segInherit)
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

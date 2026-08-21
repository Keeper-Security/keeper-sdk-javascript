import type { Auth } from '@keeper-security/keeperapi'
import {
    Folder,
    Records,
    addPamConfigurationV3Message,
    keeperDriveRecordsUpdate,
    normal64Bytes,
    platform,
    recordsUpdateMessage,
} from '@keeper-security/keeperapi'
import { findFolder } from '../../folders/getFolder'
import { FolderKind } from '../../folders/folderHelpers'
import { deleteRecord, moveRecord } from '../../records/RecordOperations'
import {
    findNestedShareFoldersForRecord,
    getFolderDisplayName,
    getKeeperDriveFolder,
    isNestedShareRecord,
    isRootFolderUid,
    resolveNsfFolderIdentifier,
} from '../../nestedShareFolders/nsfHelpers'
import { linkNestedShareRecord } from '../../nestedShareFolders/linkNsfRecord'
import { removeNestedShareRecords } from '../../nestedShareFolders/removeNsfRecord'
import { NsfRemoveOperation } from '../../nestedShareFolders/nsfTypes'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import { findSharedFolderUidForRecord, resolveSharedFolderName } from './configHelpers'
import { getPaddedJsonBytes } from './configRecordPayload'
import type {
    CreatePamConfigurationInNsfFolderOptions,
    PamConfigFolderPlacementResult,
    PamConfigFolderTarget,
    PamConfigRecordRemovalResult,
    PamConfigurationTypedRecordData,
    PlacePamConfigurationInFolderOptions,
    ResolvePamConfigFolderOptions,
} from './configTypes'

export type { PamConfigFolderKind, PamConfigFolderTarget } from './configTypes'

function isRecordModifySuccess(status: Records.RecordModifyResult | null | undefined): boolean {
    return status == null || status === Records.RecordModifyResult.RS_SUCCESS
}

export function resolvePamConfigFolder(
    storage: InMemoryStorage,
    sharedFolder: string,
    options: ResolvePamConfigFolderOptions = {}
): PamConfigFolderTarget {
    const trimmed = sharedFolder.trim()
    const required = options.required !== false
    if (!trimmed) {
        if (required) {
            throw new KeeperSdkError(
                'Shared folder or Nested Share Folder UID or name is required.',
                ResultCodes.PAM_CONFIG_SHARED_FOLDER_REQUIRED
            )
        }
        return { kind: 'shared_folder', uid: '' }
    }

    const classic = findFolder(storage, trimmed)
    if (classic?.kind === FolderKind.SharedFolder) {
        return { kind: 'shared_folder', uid: classic.folder.uid }
    }

    const nsfUid = resolveNsfFolderIdentifier(storage, trimmed)
    if (nsfUid != null && nsfUid !== '') {
        if (isRootFolderUid(storage, nsfUid)) {
            throw new KeeperSdkError(
                `Nested Share Folder root cannot host a PAM Configuration. Choose a nested folder.`,
                ResultCodes.PAM_CONFIG_SHARED_FOLDER_NOT_FOUND
            )
        }
        return { kind: 'nsf', uid: nsfUid }
    }

    throw new KeeperSdkError(
        `Shared folder or Nested Share Folder "${trimmed}" not found.`,
        ResultCodes.PAM_CONFIG_SHARED_FOLDER_NOT_FOUND
    )
}

export function findPamConfigFolderForRecord(
    storage: InMemoryStorage,
    recordUid: string
): PamConfigFolderTarget | undefined {
    const sharedFolderUid = findSharedFolderUidForRecord(storage, recordUid)
    if (sharedFolderUid) return { kind: 'shared_folder', uid: sharedFolderUid }

    const nsfFolders = findNestedShareFoldersForRecord(storage, recordUid).filter(
        (uid) => uid && !isRootFolderUid(storage, uid)
    )
    if (nsfFolders.length > 0) return { kind: 'nsf', uid: nsfFolders[0] }
    return undefined
}

export function resolvePamConfigFolderTargetFromUid(
    storage: InMemoryStorage,
    folderUid: string
): PamConfigFolderTarget | undefined {
    const trimmed = folderUid.trim()
    if (!trimmed) return undefined

    const classic = findFolder(storage, trimmed)
    if (classic?.kind === FolderKind.SharedFolder) {
        return { kind: 'shared_folder', uid: classic.folder.uid }
    }

    if (getKeeperDriveFolder(storage, trimmed) && !isRootFolderUid(storage, trimmed)) {
        return { kind: 'nsf', uid: trimmed }
    }

    return { kind: 'shared_folder', uid: trimmed }
}

export function resolvePamConfigFolderName(storage: InMemoryStorage, folder: PamConfigFolderTarget): string {
    if (!folder.uid) return ''
    if (folder.kind === 'shared_folder') return resolveSharedFolderName(storage, folder.uid)
    const name = getFolderDisplayName(storage, folder.uid) || folder.uid
    return name.endsWith(' [NSF]') ? name : `${name} [NSF]`
}

export function formatPamConfigFolderDisplay(name: string, uid: string): string {
    if (!name && !uid) return ''
    const isNsf = name.endsWith(' [NSF]')
    const displayName = isNsf ? name.slice(0, -6) : name || uid
    if (!uid) return name || displayName
    return `${displayName} (${uid})${isNsf ? ' [NSF]' : ''}`
}

export async function createPamConfigurationInNsfFolder(
    auth: Auth,
    storage: InMemoryStorage,
    options: CreatePamConfigurationInNsfFolderOptions
): Promise<void> {
    const folderKey = await storage.getKeyBytes(options.folderUid)
    if (!folderKey) {
        throw new KeeperSdkError(
            `Folder key not found for Nested Share Folder ${options.folderUid}. Sync the vault and try again.`,
            ResultCodes.PAM_CONFIG_CREATE_FAILED
        )
    }

    const recordAdd = {
        recordUid: options.configurationUidBytes,
        clientModifiedTime: Date.now(),
        data: await platform.aesGcmEncrypt(getPaddedJsonBytes(options.recordPayload), options.recordKey),
        folderUid: normal64Bytes(options.folderUid),
        recordKey: await platform.aesGcmEncrypt(options.recordKey, folderKey),
        recordKeyEncryptedBy: Folder.FolderKeyEncryptionType.ENCRYPTED_BY_PARENT_KEY,
        recordKeyType: Folder.EncryptedKeyType.encrypted_by_data_key_gcm,
    }

    const response = await auth.executeRest(
        addPamConfigurationV3Message({
            records: [recordAdd],
            clientTime: Date.now(),
        })
    )
    const status = response.records?.[0]
    if (!isRecordModifySuccess(status?.status)) {
        throw new KeeperSdkError(
            status?.message || `Failed to create PAM Configuration in Nested Share Folder (${status?.status}).`,
            ResultCodes.PAM_CONFIG_CREATE_FAILED
        )
    }
}

export async function updatePamConfigurationRecordData(
    auth: Auth,
    storage: InMemoryStorage,
    configurationUid: string,
    data: PamConfigurationTypedRecordData,
    revision: number,
    recordKey: Uint8Array
): Promise<void> {
    const recordPayload: Record<string, unknown> = {
        type: data.type,
        title: data.title,
        fields: data.fields,
        custom: data.custom,
        notes: data.notes,
    }
    const encryptedData = await platform.aesGcmEncrypt(getPaddedJsonBytes(recordPayload), recordKey)
    const recordUpdate: Records.IRecordUpdate = {
        recordUid: normal64Bytes(configurationUid),
        clientModifiedTime: Date.now(),
        revision,
        data: encryptedData,
    }

    const response = isNestedShareRecord(storage, configurationUid)
        ? await auth.executeRest(
              keeperDriveRecordsUpdate({
                  records: [recordUpdate],
                  clientTime: Date.now(),
              })
          )
        : await auth.executeRest(
              recordsUpdateMessage({
                  records: [recordUpdate],
                  clientTime: Date.now(),
              })
          )

    const status = response.records?.[0]
    if (!isRecordModifySuccess(status?.status)) {
        throw new KeeperSdkError(
            status?.message || `Failed to update PAM Configuration (${status?.status}).`,
            ResultCodes.PAM_CONFIG_EDIT_FAILED
        )
    }
}

export async function placePamConfigurationInFolder(
    auth: Auth,
    storage: InMemoryStorage,
    configurationUid: string,
    target: PamConfigFolderTarget,
    options: PlacePamConfigurationInFolderOptions = {}
): Promise<PamConfigFolderPlacementResult> {
    try {
        if (target.kind === 'shared_folder') {
            if (options.previous?.kind === 'nsf') {
                return {
                    success: false,
                    message:
                        'Moving a PAM Configuration from a Nested Share Folder to a classic shared folder is not supported. Remove and recreate the configuration.',
                }
            }
            const moveResult = await moveRecord(auth, storage, {
                recordUid: configurationUid,
                dstFolderUid: target.uid,
                srcFolderUid: options.srcFolderUid,
                canEdit: true,
            })
            return { success: moveResult.success, message: moveResult.message }
        }

        if (options.previous?.kind === 'shared_folder') {
            return {
                success: false,
                message:
                    'Moving a PAM Configuration from a classic shared folder to a Nested Share Folder is not supported. Create the configuration in the Nested Share Folder directly.',
            }
        }

        if (options.previous?.kind === 'nsf' && options.previous.uid && options.previous.uid !== target.uid) {
            const unlink = await removeNestedShareRecords(storage, auth, {
                records: [configurationUid],
                folder: options.previous.uid,
                operation: NsfRemoveOperation.Unlink,
                force: true,
            })
            if (!unlink.confirmed) {
                return {
                    success: false,
                    message: unlink.message || 'Failed to unlink PAM Configuration from previous Nested Share Folder.',
                }
            }
        }

        if (!isNestedShareRecord(storage, configurationUid) && !options.previous) {
            return {
                success: false,
                message:
                    'Cannot place a non-NSF PAM Configuration into a Nested Share Folder. Create it in the Nested Share Folder directly.',
            }
        }

        const link = await linkNestedShareRecord(storage, auth, configurationUid, target.uid)
        return { success: link.success, message: link.message }
    } catch (err) {
        return { success: false, message: extractErrorMessage(err) }
    }
}

export async function removePamConfigurationRecord(
    auth: Auth,
    storage: InMemoryStorage,
    configurationUid: string
): Promise<PamConfigRecordRemovalResult> {
    if (isNestedShareRecord(storage, configurationUid)) {
        const result = await removeNestedShareRecords(storage, auth, {
            records: [configurationUid],
            operation: NsfRemoveOperation.OwnerTrash,
            force: true,
        })
        if (!result.confirmed) {
            return {
                success: false,
                message: result.message || `Failed to remove PAM Configuration ${configurationUid}.`,
            }
        }
        return { success: true, message: result.message }
    }

    const deleteResult = await deleteRecord(auth, storage, configurationUid)
    return { success: deleteResult.success, message: deleteResult.message }
}

export function isPamConfigurationInFolder(
    storage: InMemoryStorage,
    configurationUid: string,
    target: PamConfigFolderTarget
): boolean {
    const current = findPamConfigFolderForRecord(storage, configurationUid)
    return !!current && current.kind === target.kind && current.uid === target.uid
}

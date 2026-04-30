import {
    Auth,
    Records,
    platform,
    generateEncryptionKey,
    generateUidBytes,
    webSafe64FromBytes,
    recordsAddMessage,
    recordsUpdateMessage,
    recordPreDeleteCommand,
    recordDeleteCommand,
    recordAddCommand,
    moveCommand,
    getRecordHistoryCommand,
    normal64Bytes,
} from '@keeper-security/keeperapi'
import type {
    DSharedFolder,
    DSharedFolderFolder,
    DSharedFolderRecord,
    DUserFolder,
    DRecord,
    KeeperPreDeleteResponse,
    MoveObject,
    MoveRequest,
    TransitionKeyObject,
    RecordPreDeleteObject,
    GetRecordHistoryResponse,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, logger } from '../utils'
import { RecordVersion } from './RecordUtils'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { DeleteResolution, FolderKind, VaultObjectKind } from '../folders/folderHelpers'

enum ResultCode {
    Success = 'success',
    OK = 'OK',
}

const MIN_RECORD_PAD_BYTES = 384
const PAD_BLOCK_SIZE = 16

function getPaddedJsonBytes(data: Record<string, any>): Uint8Array {
    const json = JSON.stringify(data)
    const paddedLength = Math.ceil(Math.max(MIN_RECORD_PAD_BYTES, json.length) / PAD_BLOCK_SIZE) * PAD_BLOCK_SIZE
    const padded = json.padEnd(paddedLength, ' ')
    return new TextEncoder().encode(padded)
}

export type PasswordRecordData = {
    title: string
    login?: string
    password?: string
    url?: string
    notes?: string
    custom?: { name: string; value: string; type?: string }[]
    totp?: string
}

function buildLegacyPasswordExtra(data: PasswordRecordData, recordUid: string): Record<string, unknown> {
    const totp = data.totp?.trim()
    if (!totp) {
        return {}
    }
    return {
        files: [],
        fields: [
            {
                id: recordUid,
                field_type: 'totp',
                field_title: 'One-Time Password',
                data: totp,
            },
        ],
    }
}

export type RecordFieldInput = {
    type: string
    value: any[]
    label?: string
}

export type TypedRecordData = {
    type: string
    title: string
    fields?: RecordFieldInput[]
    custom?: RecordFieldInput[]
    notes?: string
}

export type NewRecordInput =
    | { version: 2; data: PasswordRecordData; folderUid?: string }
    | { version: 3; data: TypedRecordData; folderUid?: string }

export type AddRecordResult = {
    recordUid: string
    success: boolean
    status?: string
}

export type UpdateRecordResult = {
    recordUid: string
    success: boolean
    status?: string
}

export type DeleteRecordResult = {
    recordUid: string
    success: boolean
    message?: string
}

export async function addRecord(
    auth: Auth,
    input: NewRecordInput
): Promise<AddRecordResult> {
    if (!input.data.title || !input.data.title.trim()) {
        throw new KeeperSdkError('Record title is required.', 'missing_record_title')
    }
    if (input.version === 3 && !input.data.type?.trim()) {
        throw new KeeperSdkError('Record type is required for v3 records.', 'missing_record_type')
    }
    if (input.version === 2) {
        return addPasswordRecord(auth, input.data, input.folderUid)
    }
    return addTypedRecord(auth, input.data, input.folderUid)
}

async function addPasswordRecord(
    auth: Auth,
    data: PasswordRecordData,
    folderUid?: string
): Promise<AddRecordResult> {
    const recordUidBytes = generateUidBytes()
    const recordKey = generateEncryptionKey()
    const recordUid = webSafe64FromBytes(recordUidBytes)

    const recordDataJson = JSON.stringify({
        title: data.title || '',
        secret1: data.login || '',
        secret2: data.password || '',
        link: data.url || '',
        notes: data.notes || '',
        custom: (data.custom || []).map((c) => ({
            name: c.name,
            value: c.value,
            type: c.type || 'text',
        })),
    })

    const extraJson = JSON.stringify(buildLegacyPasswordExtra(data, recordUid))

    const dataBytes = new TextEncoder().encode(recordDataJson)
    const extraBytes = new TextEncoder().encode(extraJson)

    const encryptedData = await platform.aesCbcEncrypt(dataBytes, recordKey, true)
    const encryptedExtra = await platform.aesCbcEncrypt(extraBytes, recordKey, true)
    const encryptedRecordKey = await platform.aesCbcEncrypt(recordKey, auth.dataKey!, true)

    const cmd = recordAddCommand({
        record_uid: recordUid,
        record_key: webSafe64FromBytes(encryptedRecordKey),
        record_type: 'password',
        folder_type: FolderKind.UserFolder,
        how_long_ago: 0,
        folder_uid: folderUid || '',
        folder_key: '',
        data: webSafe64FromBytes(encryptedData),
        extra: webSafe64FromBytes(encryptedExtra),
        non_shared_data: '',
        file_ids: [],
    })

    const response = await auth.executeRestCommand(cmd)

    return {
        recordUid,
        success: response.result_code === ResultCode.Success,
        status: response.result_code,
    }
}

async function addTypedRecord(
    auth: Auth,
    data: TypedRecordData,
    folderUid?: string
): Promise<AddRecordResult> {
    const recordUidBytes = generateUidBytes()
    const recordKey = generateEncryptionKey()
    const recordUid = webSafe64FromBytes(recordUidBytes)

    const recordPayload = {
        type: data.type,
        title: data.title,
        fields: data.fields || [],
        custom: data.custom || [],
        notes: data.notes || '',
    }

    const dataBytes = getPaddedJsonBytes(recordPayload)
    const encryptedData = await platform.aesGcmEncrypt(dataBytes, recordKey)
    const encryptedRecordKey = await platform.aesGcmEncrypt(recordKey, auth.dataKey!)

    const recordAdd: Records.IRecordAdd = {
        recordUid: recordUidBytes,
        recordKey: encryptedRecordKey,
        clientModifiedTime: Date.now(),
        data: encryptedData,
        folderType: Records.RecordFolderType.user_folder,
    }

    if (folderUid) {
        recordAdd.folderUid = normal64Bytes(folderUid)
    }

    const request: Records.IRecordsAddRequest = {
        records: [recordAdd],
        clientTime: Date.now(),
    }

    const msg = recordsAddMessage(request)
    const response = await auth.executeRest(msg)

    const recordStatus = response.records?.[0]
    const success =
        recordStatus?.status === Records.RecordModifyResult.RS_SUCCESS ||
        !recordStatus?.status

    return {
        recordUid,
        success,
        status: recordStatus?.status != null
            ? Records.RecordModifyResult[recordStatus.status]
            : ResultCode.OK,
    }
}

export async function updateRecord(
    auth: Auth,
    recordUid: string,
    data: TypedRecordData,
    revision: number,
    recordKey: Uint8Array
): Promise<UpdateRecordResult> {
    if (!data.title || !data.title.trim()) {
        throw new KeeperSdkError('Record title is required.', 'missing_record_title')
    }
    if (!data.type?.trim()) {
        throw new KeeperSdkError('Record type is required.', 'missing_record_type')
    }
    const recordUidBytes = normal64Bytes(recordUid)

    const recordPayload = {
        type: data.type,
        title: data.title,
        fields: data.fields || [],
        custom: data.custom || [],
        notes: data.notes || '',
    }

    const dataBytes = getPaddedJsonBytes(recordPayload)
    const encryptedData = await platform.aesGcmEncrypt(dataBytes, recordKey)

    const recordUpdate: Records.IRecordUpdate = {
        recordUid: recordUidBytes,
        clientModifiedTime: Date.now(),
        revision,
        data: encryptedData,
    }

    const request: Records.IRecordsUpdateRequest = {
        records: [recordUpdate],
        clientTime: Date.now(),
    }

    const msg = recordsUpdateMessage(request)
    const response = await auth.executeRest(msg)

    const recordStatus = response.records?.[0]
    const success =
        recordStatus?.status === Records.RecordModifyResult.RS_SUCCESS ||
        !recordStatus?.status

    return {
        recordUid,
        success,
        status: recordStatus?.status != null
            ? Records.RecordModifyResult[recordStatus.status]
            : ResultCode.OK,
    }
}

export async function deleteRecord(
    auth: Auth,
    recordUid: string
): Promise<DeleteRecordResult> {
    const preDeleteRequest = {
        objects: [
            {
                object_uid: recordUid,
                object_type: VaultObjectKind.Record,
                from_uid: '',
                from_type: FolderKind.UserFolder,
                delete_resolution: DeleteResolution.Unlink,
            } as RecordPreDeleteObject,
        ],
    }

    let preDeleteResponse: KeeperPreDeleteResponse
    try {
        const preDeleteCmd = recordPreDeleteCommand(preDeleteRequest)
        preDeleteResponse = await auth.executeRestCommand(preDeleteCmd)
    } catch (err) {
        return { recordUid, success: false, message: extractErrorMessage(err) }
    }

    const token = preDeleteResponse?.pre_delete_response?.pre_delete_token
    if (!token) {
        return {
            recordUid,
            success: false,
            message: preDeleteResponse?.message || preDeleteResponse?.result_code || 'pre_delete failed: no token',
        }
    }

    try {
        const deleteCmd = recordDeleteCommand({ pre_delete_token: token })
        await auth.executeRestCommand(deleteCmd)
    } catch (err) {
        return { recordUid, success: false, message: extractErrorMessage(err) }
    }

    return { recordUid, success: true, message: ResultCode.Success }
}

export type HistoryEntry = {
    revision: number
    version: number
    userName: string
    clientModifiedTime: number
    data: Record<string, any> | null
}

export type RecordHistoryResult = {
    recordUid: string
    history: HistoryEntry[]
}

export async function getRecordHistory(
    auth: Auth,
    recordUid: string,
    recordKey: Uint8Array
): Promise<RecordHistoryResult> {
    const cmd = getRecordHistoryCommand({
        record_uid: recordUid,
        client_time: Date.now(),
    })

    let response: GetRecordHistoryResponse
    try {
        response = await auth.executeRestCommand(cmd)
    } catch (err) {
        throw KeeperSdkError.from(err)
    }

    const rawHistory = response.history || []
    const history: HistoryEntry[] = []

    for (const entry of rawHistory) {
        let decryptedData: Record<string, any> | null = null

        if (entry.data) {
            try {
                const dataBytes = normal64Bytes(entry.data)
                const version = entry.version || 0
                let decrypted: Uint8Array

                if (version <= RecordVersion.Legacy) {
                    decrypted = await platform.aesCbcDecrypt(dataBytes, recordKey, true)
                } else {
                    decrypted = await platform.aesGcmDecrypt(dataBytes, recordKey)
                }

                decryptedData = JSON.parse(platform.bytesToString(decrypted))
            } catch (err) {
                logger.debug(`Failed to decrypt history revision ${entry.revision}:`, extractErrorMessage(err))
                decryptedData = null
            }
        }

        history.push({
            revision: entry.revision,
            version: entry.version,
            userName: entry.user_name || '',
            clientModifiedTime: entry.client_modified_time || 0,
            data: decryptedData,
        })
    }

    return { recordUid, history }
}

export type MoveRecordInput = {
    recordUid: string
    dstFolderUid: string
    srcFolderUid?: string
    link?: boolean
    canEdit?: boolean
    canShare?: boolean
}

export type MoveRecordResult = {
    recordUid: string
    success: boolean
    message: string
}

type FolderInfo = {
    uid: string
    folderType: FolderKind
    scopeUid: string
}

function resolveFolder(uid: string, storage: InMemoryStorage): FolderInfo {
    if (!uid) {
        return { uid: '', folderType: FolderKind.UserFolder, scopeUid: '' }
    }

    if (storage.getByUid<DUserFolder>(FolderKind.UserFolder, uid)) {
        return { uid, folderType: FolderKind.UserFolder, scopeUid: '' }
    }

    if (storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, uid)) {
        return { uid, folderType: FolderKind.SharedFolder, scopeUid: uid }
    }

    const sfFolder = storage.getByUid<DSharedFolderFolder>(FolderKind.SharedFolderFolder, uid)
    if (sfFolder) {
        return { uid, folderType: FolderKind.SharedFolderFolder, scopeUid: sfFolder.sharedFolderUid }
    }

    return { uid, folderType: FolderKind.UserFolder, scopeUid: '' }
}

async function findRecordSourceFolder(recordUid: string, storage: InMemoryStorage): Promise<string> {
    const folderKinds = [
        FolderKind.UserFolder,
        FolderKind.SharedFolder,
        FolderKind.SharedFolderFolder,
    ] as const

    for (const kind of folderKinds) {
        for (const folder of storage.getAll<DUserFolder | DSharedFolder | DSharedFolderFolder>(kind)) {
            const dependencies = (await storage.getDependencies(folder.uid)) || []
            if (
                dependencies.some(
                    (dependency) => dependency.kind === VaultObjectKind.Record && dependency.uid === recordUid
                )
            ) {
                return folder.uid
            }
        }
    }

    const sharedFolderRecord = storage
        .getAll<DSharedFolderRecord>(VaultObjectKind.SharedFolderRecord)
        .find((candidate) => candidate.recordUid === recordUid)
    return sharedFolderRecord ? sharedFolderRecord.sharedFolderUid : ''
}

export async function moveRecord(
    auth: Auth,
    storage: InMemoryStorage,
    input: MoveRecordInput
): Promise<MoveRecordResult> {
    const {
        recordUid,
        dstFolderUid,
        link = false,
        canEdit,
        canShare,
    } = input

    const dst = resolveFolder(dstFolderUid, storage)

    const srcUid =
        input.srcFolderUid !== undefined ? input.srcFolderUid : await findRecordSourceFolder(recordUid, storage)
    const src = resolveFolder(srcUid, storage)

    const moveObj: MoveObject = {
        uid: recordUid,
        type: VaultObjectKind.Record,
        cascade: false,
        from_type: src.folderType,
        from_uid: src.uid || undefined,
        can_edit: canEdit,
        can_reshare: canShare,
    }

    const transitionKeys: TransitionKeyObject[] = []

    if (src.scopeUid !== dst.scopeUid) {
        const recordKey = await storage.getKeyBytes(recordUid)
        if (!recordKey) {
            return { recordUid, success: false, message: 'Record key not found' }
        }

        let dstKey: Uint8Array | undefined
        if (dst.scopeUid) {
            dstKey = await storage.getKeyBytes(dst.scopeUid)
        } else {
            dstKey = auth.dataKey
        }

        if (!dstKey) {
            return { recordUid, success: false, message: 'Destination folder key not found' }
        }

        const record = storage.getByUid<DRecord>(VaultObjectKind.Record, recordUid)
        const version = record?.version || RecordVersion.Typed

        let encryptedKey: Uint8Array
        if (version >= RecordVersion.Typed) {
            encryptedKey = await platform.aesGcmEncrypt(recordKey, dstKey)
        } else {
            encryptedKey = await platform.aesCbcEncrypt(recordKey, dstKey, true)
        }

        transitionKeys.push({ uid: recordUid, key: webSafe64FromBytes(encryptedKey) })
    }

    const request: MoveRequest = {
        to_type: dst.folderType,
        to_uid: dst.uid || undefined,
        link,
        move: [moveObj],
        transition_keys: transitionKeys,
    }

    try {
        const cmd = moveCommand(request)
        await auth.executeRestCommand(cmd)
    } catch (err) {
        return { recordUid, success: false, message: extractErrorMessage(err) }
    }

    return { recordUid, success: true, message: 'Record moved successfully' }
}

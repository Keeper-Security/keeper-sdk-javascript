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
} from '@keeper-security/keeperapi'
import type {
    DSharedFolder,
    DSharedFolderFolder,
    DSharedFolderRecord,
    DUserFolder,
    DRecord,
    KeeperResponse,
    KeeperPreDeleteResponse,
    MoveObject,
    MoveRequest,
    TransitionKeyObject,
    RecordPreDeleteObject,
    RestCommand,
    BaseRequest,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, logger } from '../utils'
import { RecordVersion } from './RecordUtils'
import { InMemoryStorage } from '../storage/InMemoryStorage'

enum FolderType {
    UserFolder = 'user_folder',
    SharedFolder = 'shared_folder',
    SharedFolderFolder = 'shared_folder_folder',
}

enum ObjectType {
    Record = 'record',
}

enum DeleteResolution {
    Unlink = 'unlink',
}

enum ResultCode {
    Success = 'success',
    OK = 'OK',
}

enum CommandName {
    GetRecordHistory = 'get_record_history',
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

export async function addRecord(auth: Auth, input: NewRecordInput): Promise<AddRecordResult> {
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

async function addPasswordRecord(auth: Auth, data: PasswordRecordData, folderUid?: string): Promise<AddRecordResult> {
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

    const extraJson = JSON.stringify({})

    const dataBytes = new TextEncoder().encode(recordDataJson)
    const extraBytes = new TextEncoder().encode(extraJson)

    const encryptedData = await platform.aesCbcEncrypt(dataBytes, recordKey, true)
    const encryptedExtra = await platform.aesCbcEncrypt(extraBytes, recordKey, true)
    const encryptedRecordKey = await platform.aesCbcEncrypt(recordKey, auth.dataKey!, true)

    const cmd = recordAddCommand({
        record_uid: recordUid,
        record_key: webSafe64FromBytes(encryptedRecordKey),
        record_type: 'password',
        folder_type: FolderType.UserFolder,
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

async function addTypedRecord(auth: Auth, data: TypedRecordData, folderUid?: string): Promise<AddRecordResult> {
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
        recordAdd.folderUid = platform.base64ToBytes(folderUid)
    }

    const request: Records.IRecordsAddRequest = {
        records: [recordAdd],
        clientTime: Date.now(),
    }

    const msg = recordsAddMessage(request)
    const response = await auth.executeRest(msg)

    const recordStatus = response.records?.[0]
    const success = recordStatus?.status === Records.RecordModifyResult.RS_SUCCESS || !recordStatus?.status

    return {
        recordUid,
        success,
        status: recordStatus?.status != null ? Records.RecordModifyResult[recordStatus.status] : ResultCode.OK,
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
    const recordUidBytes = platform.base64ToBytes(recordUid)

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
    const success = recordStatus?.status === Records.RecordModifyResult.RS_SUCCESS || !recordStatus?.status

    return {
        recordUid,
        success,
        status: recordStatus?.status != null ? Records.RecordModifyResult[recordStatus.status] : ResultCode.OK,
    }
}

export async function deleteRecord(auth: Auth, recordUid: string): Promise<DeleteRecordResult> {
    const preDeleteRequest = {
        objects: [
            {
                object_uid: recordUid,
                object_type: ObjectType.Record,
                from_uid: '',
                from_type: FolderType.UserFolder,
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

type RecordHistoryRequest = {
    record_uid: string
    client_time: number
}

type RecordHistoryResponseEntry = {
    revision: number
    version: number
    user_name?: string
    client_modified_time?: number
    data?: string
}

type RecordHistoryResponse = KeeperResponse & {
    history?: RecordHistoryResponseEntry[]
}

export async function getRecordHistory(
    auth: Auth,
    recordUid: string,
    recordKey: Uint8Array
): Promise<RecordHistoryResult> {
    const cmd: RestCommand<RecordHistoryRequest, RecordHistoryResponse> = {
        baseRequest: { command: CommandName.GetRecordHistory } as BaseRequest,
        request: {
            record_uid: recordUid,
            client_time: Date.now(),
        },
        authorization: {},
    }

    let response: RecordHistoryResponse
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
                const dataBytes = platform.base64ToBytes(normalizeBase64(entry.data))
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

function normalizeBase64(source: string): string {
    return source.replace(/-/g, '+').replace(/_/g, '/') + '=='.substring(0, (3 * source.length) % 4)
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
    folderType: FolderType
    scopeUid: string
}

function resolveFolder(uid: string, storage: InMemoryStorage): FolderInfo {
    if (!uid) {
        return { uid: '', folderType: FolderType.UserFolder, scopeUid: '' }
    }

    if (storage.getByUid<DUserFolder>(FolderType.UserFolder, uid)) {
        return { uid, folderType: FolderType.UserFolder, scopeUid: '' }
    }

    if (storage.getByUid<DSharedFolder>(FolderType.SharedFolder, uid)) {
        return { uid, folderType: FolderType.SharedFolder, scopeUid: uid }
    }

    const sfFolder = storage.getByUid<DSharedFolderFolder>(FolderType.SharedFolderFolder, uid)
    if (sfFolder) {
        return {
            uid,
            folderType: FolderType.SharedFolderFolder,
            scopeUid: sfFolder.sharedFolderUid,
        }
    }

    return { uid, folderType: FolderType.UserFolder, scopeUid: '' }
}

function findRecordSourceFolder(
    recordUid: string,
    storage: InMemoryStorage
): { folderUid: string; folderType: FolderType } {
    const sfRecords = storage.getAll<DSharedFolderRecord>('shared_folder_record')
    const sfr = sfRecords.find((r) => r.recordUid === recordUid)
    if (sfr) {
        return {
            folderUid: sfr.sharedFolderUid,
            folderType: FolderType.SharedFolder,
        }
    }

    return { folderUid: '', folderType: FolderType.UserFolder }
}

export async function moveRecord(
    auth: Auth,
    storage: InMemoryStorage,
    input: MoveRecordInput
): Promise<MoveRecordResult> {
    const { recordUid, dstFolderUid, link = false, canEdit, canShare } = input

    const dst = resolveFolder(dstFolderUid, storage)

    let src: FolderInfo
    if (input.srcFolderUid !== undefined) {
        src = resolveFolder(input.srcFolderUid, storage)
    } else {
        const found = findRecordSourceFolder(recordUid, storage)
        src = resolveFolder(found.folderUid, storage)
    }

    const moveObj: MoveObject = {
        uid: recordUid,
        type: ObjectType.Record,
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
            return {
                recordUid,
                success: false,
                message: 'Destination folder key not found',
            }
        }

        const record = storage.getByUid<DRecord>(ObjectType.Record, recordUid)
        const version = record?.version || RecordVersion.Typed

        let encryptedKey: Uint8Array
        if (version >= RecordVersion.Typed) {
            encryptedKey = await platform.aesGcmEncrypt(recordKey, dstKey)
        } else {
            encryptedKey = await platform.aesCbcEncrypt(recordKey, dstKey, true)
        }

        transitionKeys.push({
            uid: recordUid,
            key: webSafe64FromBytes(encryptedKey),
        })
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

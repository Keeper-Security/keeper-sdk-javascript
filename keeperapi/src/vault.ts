import {Auth} from './auth'
import {
    DeleteCommand,
    FolderAddCommand,
    KeeperResponse,
    PreDeleteCommand,
    PublicKeysCommand,
    PurgeDeletedRecordsCommand,
    RecordAddCommand, RecordData, RecordMetaData,
    RecordShareUpdateCommand,
    RecordShareUpdateResponse,
    RequestUploadCommand,
    SharedFolder,
    SharedFolderUpdateCommand,
    ShareObject,
    SyncDownCommand
} from './commands'
import {platform} from './platform'
import {
    decryptFromStorage,
    decryptFromStorageGcm,
    decryptKey,
    encryptForStorage,
    encryptObjectForStorage,
    encryptObjectForStorageGCM,
    generateEncryptionKey,
    generateUid,
    normal64,
    normal64Bytes,
    shareKey,
    webSafe64FromBytes
} from './utils'
import {fileAddMessage, fileDownloadMessage, recordsAddMessage, recordsUpdateMessage} from './restMessages'
import {Records} from './proto'
import RecordFolderType = Records.RecordFolderType;

async function decryptRecord(record: VaultRecord) {
    try {
        const dataBytes = record.recordData.version < 3
            ? decryptFromStorage(record.recordData.data, record.key)
            : await decryptFromStorageGcm(record.recordData.data, record.key)
        record.data = JSON.parse(platform.bytesToString(dataBytes))
        if (record.recordData.extra) {
            record.extra = JSON.parse(platform.bytesToString(decryptFromStorage(record.recordData.extra, record.key)))
        }
    } catch (e) {
        console.log(e)
    }
}

export class Vault {
    private _records: Record<string, VaultRecord> = {}
    private _sharedFolders: Record<string, VaultSharedFolder> = {}
    private revision: number = 0
    noTypedRecords: boolean = false

    constructor(private auth: Auth) {
    }

    private getRecord(recordUid: string): { record: VaultRecord, isNew: boolean } {
        let record = this._records[recordUid]
        let isNew = false;
        if (!record) {
            record = {}
            this._records[recordUid] = record
            isNew = true
        }
        return { record, isNew }
    }

    async decryptKey(encryptedKey: string, keyType: number): Promise<Uint8Array> {
        switch (keyType) {
            case 1:
                return decryptFromStorage(encryptedKey, this.auth.dataKey)
            case 2:
                return platform.privateDecrypt(normal64Bytes(encryptedKey), this.auth.privateKey)
            case 3:
                return decryptKey(encryptedKey, this.auth.dataKey)
            default:
                throw new Error(`Unknown key type: ${keyType}`)
        }
    }

    async syncDown(logResponse: boolean = false) {
        console.log(`syncing revision ${this.revision}`)
        let syncDownCommand = new SyncDownCommand(this.revision)
        syncDownCommand.include = ['record', 'shared_folder', 'sfheaders', 'sfrecords', 'folders', 'non_shared_data']
        if (!this.noTypedRecords) {
            syncDownCommand.include.push('typed_record')
        }
        let syncDownResponse = await this.auth.executeCommand(syncDownCommand)
        if (logResponse)
            console.log(syncDownResponse)
        this.revision = syncDownResponse.revision
        if (syncDownResponse.full_sync) {
            this._records = {}
        }

        let added = 0
        let updated = 0
        let removed = 0
        for (let recordData of syncDownResponse.records || []) {
            let { record, isNew } = this.getRecord(recordData.record_uid)
            record.recordData = recordData
            if (isNew) {
                added++
            }
            else {
                updated++
            }
        }
        for (let meta of syncDownResponse.record_meta_data || []) {
            let { record } = this.getRecord(meta.record_uid)
            record.metaData = meta
            try {
                record.key = await this.decryptKey(meta.record_key, meta.record_key_type);
            }
            catch (e) {
                console.log(e);
            }
            await decryptRecord(record)
        }

        for (let sharedFolder of syncDownResponse.shared_folders || []) {
            let vaultFolder: VaultSharedFolder = {
                sharedFolder: sharedFolder
            }
            this._sharedFolders[sharedFolder.shared_folder_uid] = vaultFolder
            try {
                vaultFolder.key = await this.decryptKey(sharedFolder.shared_folder_key, sharedFolder.key_type);
                for (let sfRecord of sharedFolder.records || []) {
                    let recordKey
                    try {
                        recordKey = sfRecord.record_key.length === 80
                            ? await decryptKey(sfRecord.record_key, vaultFolder.key)    // GCM
                            : decryptFromStorage(sfRecord.record_key, vaultFolder.key)  // CBC
                        let { record } = this.getRecord(sfRecord.record_uid)
                        record.key = recordKey
                        record.sharedFolderUid = sharedFolder.shared_folder_uid
                        await decryptRecord(record)
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
        }

        for (let uid of syncDownResponse.removed_records || []) {
            if (this.records[uid]) {
                removed++
                delete this.records[uid]
            }
        }

        for (let non_shared_data of syncDownResponse.non_shared_data || []) {
            let { record } = this.getRecord(non_shared_data.record_uid)
            try {
                const nonSharedData = record.recordData.version > 2
                    ? await decryptFromStorageGcm(non_shared_data.data, this.auth.dataKey)
                    : decryptFromStorage(non_shared_data.data, this.auth.dataKey)
                record.nonSharedData = JSON.parse(platform.bytesToString(nonSharedData))
            }
            catch (e) {
                console.log(e)
            }
        }
        if (added > 0)
            console.log(`${added} records added.`)
        if (updated > 0)
            console.log(`${updated} records updated.`)
        if (removed > 0)
            console.log(`${removed} records removed.`)
        console.log(`${Object.keys(this._records).length} records are in the vault.`)
    }

    async addRecord(recordData: KeeperRecordData, files?: [ExtraFile]): Promise<string> {
        let recordAddCommand = new RecordAddCommand()
        recordAddCommand.record_uid = generateUid()
        let recordKey = generateEncryptionKey()
        recordAddCommand.record_key = encryptForStorage(recordKey, this.auth.dataKey)
        recordAddCommand.record_type = 'password'
        recordAddCommand.data = encryptForStorage(platform.stringToBytes(JSON.stringify(recordData)), recordKey)
        recordAddCommand.how_long_ago = 0
        recordAddCommand.folder_type = 'user_folder'

        if (files) {
            let extra: KeeperRecordExtra = {
                fields: [],
                files: files
            }
            recordAddCommand.extra = encryptForStorage(platform.stringToBytes(JSON.stringify(extra)), recordKey)
            recordAddCommand.file_ids = files.map(x => x.id)
        }

        await this.auth.executeCommand(recordAddCommand)
        return recordAddCommand.record_uid
    }

    async addRecordNew(recordData: any, sharedFolderUid?: string, linkedRecords?: string[]): Promise<Records.IRecordsModifyResponse> {
        const recordKey = generateEncryptionKey()

        const encryptedKey = await platform.aesGcmEncrypt(recordKey, this.auth.dataKey)
        const encryptedData = await encryptObjectForStorageGCM(recordData, recordKey)

        let recordAdd: Records.IRecordAdd = {
            recordUid: platform.getRandomBytes(16),
            recordKey: encryptedKey,
            data: encryptedData,
            clientModifiedTime: new Date().getTime()
        }
        if (sharedFolderUid) {
            recordAdd.folderType = RecordFolderType.shared_folder
            recordAdd.folderUid = normal64Bytes(sharedFolderUid)
            recordAdd.folderKey = await platform.aesGcmEncrypt(recordKey, this._sharedFolders[sharedFolderUid].key)
        }
        if (linkedRecords) {
            let links: Records.IRecordLink[] = []
            for (const linkedRecord of linkedRecords) {
                const linkedRecordKey = await platform.aesGcmEncrypt(this._records[linkedRecord].key, recordKey)
                links.push({
                    recordUid: normal64Bytes(linkedRecord),
                    recordKey: linkedRecordKey
                })
            }
            recordAdd.recordLinks = links
        }

        const recordAddResponse = await this.auth.executeRest(recordsAddMessage({
            clientTime: new Date().getTime(),
            records: [recordAdd]
        }))

        const recordUid = webSafe64FromBytes(recordAdd.recordUid)
        this._records[recordUid] = {
            recordData: {
                record_uid: recordUid,
                version: 3
            },
            key: recordKey
        }

        return recordAddResponse
    }

    async uploadFile(fileName: string, fileData: Uint8Array, thumbnailData?: Uint8Array): Promise<string> {

        const fileMetaData = {
            name: fileName,
            hasThumbnail: !!thumbnailData
        }

        const recordKey = generateEncryptionKey()

        const encryptedKey = await platform.aesGcmEncrypt(recordKey, this.auth.dataKey)
        const encryptedData = await encryptObjectForStorageGCM(fileMetaData, recordKey)
        const encryptedFile = await platform.aesGcmEncrypt(fileData, recordKey)
        const encryptedThumbnail = thumbnailData
            ? await platform.aesGcmEncrypt(thumbnailData, recordKey)
            : undefined

        const rq = fileAddMessage({
            clientTime: new Date().getTime(),
            files: [
                {
                    recordUid: platform.getRandomBytes(16),
                    recordKey: encryptedKey,
                    data: encryptedData,
                    fileSize: encryptedFile.length,
                    thumbSize: encryptedThumbnail ? encryptedThumbnail.length : undefined
                }
            ]
        })

        const fileAddResponse = await this.auth.executeRest(rq)
        const file = fileAddResponse.files[0]

        await this.uploadFileData(file.url, file.parameters, file. successStatusCode, encryptedFile)
        if (encryptedThumbnail) {
            await this.uploadFileData(file.url, file.thumbnailParameters, file.successStatusCode, encryptedThumbnail)
        }

        const fileUid = webSafe64FromBytes(file.recordUid)
        this._records[fileUid] = {
            recordData: {
                record_uid: fileUid,
                version: 4
            },
            key: recordKey
        }

        return fileUid
    }

    async uploadFileData(url: string, parameters: string, successStatusCode: number, encryptedData: Uint8Array) {
        const res = await platform.fileUpload(url, JSON.parse(parameters), encryptedData)
        if (res.statusCode !== successStatusCode) {
            throw new Error(`Upload failed (${res.statusMessage}), code ${res.statusCode}`)
        }
    }

    async downloadFile(recordUid: string, thumbNail: boolean): Promise<Uint8Array> {
        const rq = fileDownloadMessage({
            recordUids: [
                normal64Bytes(recordUid)
            ],
            forThumbnails: thumbNail
        })
        let resp = await this.auth.executeRest(rq)
        let file = resp.files[0]
        console.log(file)

        const fileResponse = await platform.get(file.url, {})
        console.log(fileResponse)
        return platform.aesGcmDecrypt(fileResponse.data, this._records[recordUid].key);
    }

    async updateRecord(recordUid: string): Promise<Records.IRecordsModifyResponse> {
        const record = this._records[recordUid]
        const encryptedData = await encryptObjectForStorageGCM(record.data, record.key)

        const nonSharedData = record.nonSharedData == null
            ? Uint8Array.of(0)
            : record.nonSharedData
                ? await encryptObjectForStorageGCM(record.nonSharedData, this.auth.dataKey, false)
                : undefined

        const updateMsg = recordsUpdateMessage({
            clientTime: new Date().getTime(),
            records: [
                {
                    recordUid: normal64Bytes(recordUid),
                    data: encryptedData,
                    nonSharedData: nonSharedData,
                    clientModifiedTime: new Date().getTime(),
                    revision: record.recordData.revision
                }
            ]
        })
        return this.auth.executeRest(updateMsg)
    }

    async deleteRecords(recordUids: string[]): Promise<KeeperResponse> {
        const preDeleteCommand = new PreDeleteCommand()
        preDeleteCommand.objects = recordUids.map(x => {
            return {
                object_uid: x,
                object_type: 'record',
                from_type: 'user_folder',
                delete_resolution: 'unlink'
            }
        })
        const preDeleteResult = await this.auth.executeCommand(preDeleteCommand)
        const deleteCommand = new DeleteCommand()
        deleteCommand.pre_delete_token = preDeleteResult.pre_delete_response.pre_delete_token
        return this.auth.executeCommand(deleteCommand)
    }

    async cleanTrash() {
        await this.auth.executeCommand(new PurgeDeletedRecordsCommand())
    }

    async createSharedFolder(folderName: string): Promise<string> {
        let folderKey = generateEncryptionKey()
        let folderUid = generateUid()

        const faCommand = new FolderAddCommand()
        faCommand.name = encryptForStorage(platform.stringToBytes(folderName), folderKey)
        faCommand.folder_uid = folderUid
        faCommand.folder_type = 'shared_folder'
        faCommand.key = encryptForStorage(folderKey, this.auth.dataKey)
        faCommand.data = encryptObjectForStorage({ name: folderName + '1', color: '#FF0000'}, folderKey)
        const addFolderResponse = await this.auth.executeCommand(faCommand)
        this.revision = addFolderResponse.revision

        this._sharedFolders[folderUid] = {
            key: folderKey
        }

        return folderUid
    }

    async addUserToSharedFolder(sharedFolderUid: string, user: string) {
        const sharedFolder = this._sharedFolders[sharedFolderUid]
        const userPublicKey = await this.fetchUserPublicKey(user)

        const sfuCommand = new SharedFolderUpdateCommand()
        sfuCommand.operation = 'update'
        sfuCommand.name = encryptForStorage(platform.stringToBytes('sftest2'), sharedFolder.key)
        sfuCommand.shared_folder_uid = sharedFolderUid
        sfuCommand.revision = this.revision
        sfuCommand.add_users = [{
            username: user,
            manage_records: false,
            manage_users: false,
            shared_folder_key: shareKey(sharedFolder.key, userPublicKey)
        }]
        await this.auth.executeCommand(sfuCommand)
    }

    async deleteSharedFolders(sharedFolderUids: string[]) {
        for (let sharedFolderUid of sharedFolderUids) {
            const sfuCommand = new SharedFolderUpdateCommand()
            sfuCommand.operation = 'delete'
            sfuCommand.shared_folder_uid = sharedFolderUid
            await this.auth.executeCommand(sfuCommand)
        }

        // only can leave shared folders if not the owner
        // {"command":"shared_folder_update","pt":"-n4s_eSHBZzOMRZQtX0gDg","operation":"update","shared_folder_uid":"PFe3TzKS6wq3YtXivxR6oA","revision":944012,
        // "remove_users":[{"username":"saldoukhov@gmail.com"}],"locale":"en_US","username":"saldoukhov@gmail.com","session_token":"6X8lJLgDecS2IKTwErliMX0UKYkhznDWS59asu4kVeN3GMidq--T1kyBJ1YSJ9hxm67qsMkXeG5egEGaAQ_YjVc6CrhyFJovS4mOIZ3APLVdiylEroLQbsttCgkF","client_version":"w14.13.0"}
    }

    async fetchUserPublicKey(user: string): Promise<string> {
        const publicKeysCommand = new PublicKeysCommand()
        publicKeysCommand.key_owners = [user]
        const publicKeys = await this.auth.executeCommand(publicKeysCommand)
        return normal64(publicKeys.public_keys[0].public_key)
    }

    async shareRecords(recordUids: string[], to_user: string): Promise<RecordShareUpdateResponse> {
        const userPublicKey = await this.fetchUserPublicKey(to_user)

        const shareCommand = new RecordShareUpdateCommand()
        let shareObjects: ShareObject[] = []
        for (const recordUid of recordUids) {
            const recordKey = shareKey(this._records[recordUid].key, userPublicKey)
            const so: ShareObject = {
                record_uid: recordUid,
                record_key: recordKey,
                to_username: to_user,
                shareable: false,
                editable: false
            }
            shareObjects.push(so)
        }
        shareCommand.add_shares = shareObjects
        return this.auth.executeCommand(shareCommand)
    }

    async uploadFileOld(fileName: string, fileData: Uint8Array, thumbnailData?: Uint8Array): Promise<ExtraFile> {
        const uploadCommand = new RequestUploadCommand()
        uploadCommand.file_count = 1
        uploadCommand.thumbnail_count = thumbnailData ? 1 : 0
        const resp = await this.auth.executeCommand(uploadCommand)
        const uploadInfo = resp.file_uploads[0]
        console.log(uploadInfo)
        const fileKey = generateEncryptionKey()
        // const encryptedFile = await platform.aesGcmEncrypt(fileData, fileKey)
        const encryptedFile = platform.aesCbcEncrypt(fileData, fileKey, true)
        const res = await platform.fileUpload(uploadInfo.url, uploadInfo.parameters, encryptedFile)
        if (res.statusCode !== uploadInfo.success_status_code) {
            throw new Error(`Upload failed (${res.statusMessage}), code ${res.statusCode}`)
        }
        return {
            id: uploadInfo.file_id,
            name: fileName,
            title: fileName,
            key: webSafe64FromBytes(fileKey),
            lastModified: new Date().getTime(),
            size: encryptedFile.length,
            type: '',
        }
    }

    get records(): VaultRecord[] {
        return Object.values(this._records)
    }

    get sharedFolders(): VaultSharedFolder[] {
        return Object.values(this._sharedFolders)
    }

    get recordUids(): string[] {
        return Object.keys(this._records)
    }

    get sharedFolderUids(): string[] {
        return Object.keys(this._sharedFolders)
    }

    recordByUid(record_uid: string): VaultRecord {
        return this._records[record_uid]
    }
}

export interface VaultRecord {
    recordData?: RecordData
    metaData?: RecordMetaData;
    key?: Uint8Array

    data?: KeeperRecordData
    extra?: KeeperRecordExtra
    sharedFolderUid?: string;
    nonSharedData?: any;
}

export interface VaultSharedFolder {
    sharedFolder?: SharedFolder
    key?: Uint8Array
}

export interface KeeperRecordData {
    title?: string;
    secret1?: string;
    secret2?: string;
    link?: string;
    notes?: string;
    custom?: {name?: string, value?: string}[];
}

export interface KeeperRecordExtra {
    fields: ExtraField[]
    files: ExtraFile[]
}

export interface ExtraField {
    id: string
    field_type: 'totp'
    field_title: string
    type: number
    data: string
}

export interface ExtraFile {
    id: string
    name: string
    lastModified: number
    size: number
    type: string
    title: string
    key: string
    thumbs?: FileThumb[]
}

export interface FileThumb {
    id: string
    size: number
    type: 'image/jpg'
}

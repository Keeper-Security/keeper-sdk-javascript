import {Auth} from './auth'
import {
    DeleteCommand,
    FolderAddCommand,
    KeeperResponse,
    PreDeleteCommand,
    PublicKeysCommand,
    RecordAddCommand,
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
    generateUid, generateUidBytes,
    normal64,
    normal64Bytes,
    shareKey,
    webSafe64FromBytes
} from './utils'
import {
    fileAddMessage,
    fileDownloadMessage,
    recordsAddMessage,
    recordsUpdateMessage
} from './restMessages'
import {Records} from './proto'
import RecordFolderType = Records.RecordFolderType;

export type KeeperKey = { key: Uint8Array, keyUid: Uint8Array }

export class Vault {
    private _records: KeeperRecord[] = []
    private _sharedFolders: SharedFolder[] = []
    private meta: {}
    private nonShared: {}
    private revision: number = 0
    noTypedRecords: boolean = false

    constructor(private auth: Auth) {
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
            this._records = []
            this.meta = {}
            this.nonShared = {}
        }
        for (let meta of syncDownResponse.record_meta_data || []) {
            let key
            try {
                key = await this.decryptKey(meta.record_key, meta.record_key_type);
            }
            catch (e) {
                console.log(e);
            }
            this.meta[meta.record_uid] = {
                key: key,
                ...meta
            }
        }
        for (let non_shared_data of syncDownResponse.non_shared_data || []) {
            try {
                const meta = this.meta[non_shared_data.record_uid]
                const nonSharedData = meta.record_key_type === 3
                    ? await decryptFromStorageGcm(non_shared_data.data, this.auth.dataKey)
                    : decryptFromStorage(non_shared_data.data, this.auth.dataKey)
                this.nonShared[non_shared_data.record_uid] = JSON.parse(platform.bytesToString(nonSharedData))
            }
            catch (e) {
                console.log(e)
            }
        }

        for (let sharedFolder of syncDownResponse.shared_folders || []) {
            this._sharedFolders.push(sharedFolder)
            if (sharedFolder.records) {
                let key
                try {
                    key = await this.decryptKey(sharedFolder.shared_folder_key, sharedFolder.key_type);
                    for (let record of sharedFolder.records) {
                        let recordKey
                        try {
                            recordKey = record.record_key.length === 80
                                ? await decryptKey(record.record_key, key)    // GCM
                                : decryptFromStorage(record.record_key, key)  // CBC
                        }
                        catch (e) {
                            console.log(e);
                        }
                        this.meta[record.record_uid] = {
                            key: recordKey,
                            sharedFolderUid: sharedFolder.shared_folder_uid
                        }
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        }

        let added = 0
        let updated = 0
        let removed = 0
        for (let rec of syncDownResponse.records || []) {
            const meta = this.meta[rec.record_uid]
            let recordData
            try {
                const dataBytes = rec.version < 3
                    ? decryptFromStorage(rec.data, meta.key)
                    : await decryptFromStorageGcm(rec.data, meta.key)
                recordData = JSON.parse(platform.bytesToString(dataBytes))
            } catch (e) {
                console.log(e)
                recordData = {}
            }
            let record: KeeperRecord = {
                uid: rec.record_uid,
                owner: meta.owner,
                can_edit: meta.can_edit,
                can_share: meta.can_share,
                shared: rec.shared,
                client_modified_time: new Date(rec.client_modified_time),
                version: rec.version,
                revision: rec.revision,
                data: recordData
            }
            if (rec.extra) {
                record.extra = JSON.parse(platform.bytesToString(decryptFromStorage(rec.extra, meta.key)))
            }
            if (rec.udata) {
                record.udata = rec.udata;
            }
            if (meta.sharedFolderUid) {
                record.sharedFolderUid = meta.sharedFolderUid;
            }
            const nonShared = this.nonShared[rec.record_uid]
            if (nonShared) {
                record.non_shared_data = nonShared
            }
            const idx = this._records.findIndex(x => x.uid === record.uid)
            if (idx < 0) {
                this._records.push(record)
                added++
            } else {
                this._records[idx] = record
                updated++
            }
        }
        for (let uid of syncDownResponse.removed_records || []) {
            const idx = this._records.findIndex(x => x.uid === uid)
            if (idx >= 0) {
                this._records.splice(idx, 1)
                removed++
            }
        }
        if (added > 0)
            console.log(`${added} records added.`)
        if (updated > 0)
            console.log(`${updated} records updated.`)
        if (removed > 0)
            console.log(`${removed} records removed.`)
        console.log(`${this._records.length} records are in the vault.`)
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

    async addRecordNew(recordData: any, sharedFolderKey?: KeeperKey, linkedRecords?: string[]): Promise<Records.IRecordsModifyResponse> {
        const recordKey = generateEncryptionKey()

        const encryptedKey = await platform.aesGcmEncrypt(recordKey, this.auth.dataKey)
        const encryptedData = await encryptObjectForStorageGCM(recordData, recordKey)

        let recordAdd: Records.IRecordAdd = {
            recordUid: platform.getRandomBytes(16),
            recordKey: encryptedKey,
            data: encryptedData,
            clientModifiedTime: new Date().getTime()
        }
        if (sharedFolderKey) {
            recordAdd.folderType = RecordFolderType.shared_folder
            recordAdd.folderUid = sharedFolderKey.keyUid
            recordAdd.folderKey = await platform.aesGcmEncrypt(recordKey, sharedFolderKey.key)
        }
        if (linkedRecords) {
            let links: Records.IRecordLink[] = []
            for (const linkedRecord of linkedRecords) {
                const linkedRecordKey = await platform.aesGcmEncrypt(this.meta[linkedRecord].key, recordKey)
                links.push({
                    recordUid: normal64Bytes(linkedRecord),
                    recordKey: linkedRecordKey
                })
            }
            recordAdd.recordLinks = links
        }

        return this.auth.executeRest(recordsAddMessage({
            clientTime: new Date().getTime(),
            records: [recordAdd]
        }))
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
        console.log(file)

        await this.uploadFileData(file.url, file.parameters, file. successStatusCode, encryptedFile)
        if (encryptedThumbnail) {
            await this.uploadFileData(file.url, file.thumbnailParameters, file.successStatusCode, encryptedThumbnail)
        }

        const fileUid = webSafe64FromBytes(file.recordUid)
        this.meta[fileUid] = {
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
        return platform.aesGcmDecrypt(fileResponse.data, this.meta[recordUid].key);
    }

    async updateRecord(record: KeeperRecord): Promise<Records.IRecordsModifyResponse> {
        const meta = this.meta[record.uid]
        const encryptedData = await encryptObjectForStorageGCM(record.data, meta.key)

        const nonSharedData = record.non_shared_data == null
            ? Uint8Array.of(0)
            : record.non_shared_data
                ? await encryptObjectForStorageGCM(record.non_shared_data, this.auth.dataKey, false)
                : undefined

        const updateMsg = recordsUpdateMessage({
            clientTime: new Date().getTime(),
            records: [
                {
                    recordUid: normal64Bytes(record.uid),
                    data: encryptedData,
                    nonSharedData: nonSharedData,
                    clientModifiedTime: new Date().getTime(),
                    revision: record.revision
                }
            ]
        })
        return this.auth.executeRest(updateMsg)
    }

    async deleteRecords(records: KeeperRecord[]): Promise<KeeperResponse> {
        const preDeleteCommand = new PreDeleteCommand()
        preDeleteCommand.objects = records.map(x => {
            return {
                object_uid: x.uid,
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

    async createSharedFolder(folderName: string): Promise<KeeperKey> {
        let folderKey = generateEncryptionKey()
        let folderUid = generateUidBytes()

        const faCommand = new FolderAddCommand()
        faCommand.name = encryptForStorage(platform.stringToBytes(folderName), folderKey)
        faCommand.folder_uid = webSafe64FromBytes(folderUid)
        faCommand.folder_type = 'shared_folder'
        faCommand.key = encryptForStorage(folderKey, this.auth.dataKey)
        faCommand.data = encryptObjectForStorage({ name: folderName + '1', color: '#FF0000'}, folderKey)
        const addFolderResponse = await this.auth.executeCommand(faCommand)
        this.revision = addFolderResponse.revision
        return {
            key: folderKey,
            keyUid: folderUid
        }
        // {"command":"folder_add","folder_uid":"ndcDnQvDAxloKwXc714OKw","folder_type":"shared_folder","key":"aYdTIgcA1aJ4fOwFndxnN0bDBXxofrdv-x5yj_yd7XrAVUrUGmSUrR_OBVw-4zP8kkkEHmyEyWc9FApNqOHVug",
        // "name":"rMLZOh1gq8SkBvrVOsX-0keFpL6c6FsoB3jWuwPmAH4","data":"L43CFsc5KUBAq5Nd-P4aKJE70gjDJX8JfCdgLHCLXVw","pt":"vjxMB5PAJ16lJ2t49nWj8Q",
        // "locale":"en_US","username":"admin@yozik.us","session_token":"mDgWvJh2_BiYBssMbO7G_L__WkElIvTqC2XsZwm1lRaFF2Wi6OV1qYclfF4QNc5PthCH8CvSykWkbc_5niQ6nKO86g1dzMpRxG8Qnfhb3Pu-Ez0fago","client_version":"w14.13.0"}
    }

    async addUserToSharedFolder(sharedFolderKey: KeeperKey, user: string) {
        const userPublicKey = await this.fetchUserPublicKey(user)

        const sfuCommand = new SharedFolderUpdateCommand()
        sfuCommand.operation = 'update'
        sfuCommand.name = encryptForStorage(platform.stringToBytes('sftest2'), sharedFolderKey.key)
        sfuCommand.shared_folder_uid = webSafe64FromBytes(sharedFolderKey.keyUid)
        sfuCommand.revision = this.revision
        sfuCommand.add_users = [{
            username: user,
            manage_records: false,
            manage_users: false,
            shared_folder_key: shareKey(sharedFolderKey.key, userPublicKey)
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

    async shareRecords(records: string[], to_user: string): Promise<RecordShareUpdateResponse> {
        const userPublicKey = await this.fetchUserPublicKey(to_user)

        const shareCommand = new RecordShareUpdateCommand()
        let shareObjects: ShareObject[] = []
        for (const recordUid of records) {
            const recordKey = shareKey(this.meta[recordUid].key, userPublicKey)
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

    get records(): KeeperRecord[] {
        return this._records
    }

    get sharedFolders(): SharedFolder[] {
        return this._sharedFolders
    }
}

export class KeeperRecord {
    uid: string
    owner: boolean
    can_share: boolean
    can_edit: boolean
    shared: boolean
    client_modified_time: Date
    version: number
    revision: number
    data: KeeperRecordData
    non_shared_data?: any
    extra?: KeeperRecordExtra
    udata?: any;
    sharedFolderUid?: string
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

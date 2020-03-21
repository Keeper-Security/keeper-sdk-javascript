import {Auth} from './auth'
import {RecordAddCommand, RequestUploadCommand, SyncDownCommand} from './commands'
import {platform} from './platform'
import {
    decryptFromStorage,
    decryptFromStorageGcm,
    decryptKey,
    encryptForStorage,
    encryptObjectForStorageGCM,
    generateEncryptionKey,
    generateUid,
    normal64Bytes,
    webSafe64FromBytes
} from './utils'
import {
    fileAddMessage,
    fileDownloadMessage,
    recordsAddMessage,
    recordsDeleteMessage,
    recordsUpdateMessage
} from './restMessages'
import {Records} from './proto'
import RecordFolderType = Records.RecordFolderType;

export class Vault {
    private _records: KeeperRecord[] = []
    private meta: {}
    private nonShared: {}
    private revision: number = 0
    noTypedRecords: boolean = false

    constructor(private auth: Auth) {
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
                key = meta.record_key_type === 3
                    ? await decryptKey(meta.record_key, this.auth.dataKey)
                    : decryptFromStorage(meta.record_key, this.auth.dataKey)
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
                uid: meta.record_uid,
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

    async addRecord(recordData: KeeperRecordData, files?: [ExtraFile]) {
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

        let recordAddResponse = await this.auth.executeCommand(recordAddCommand)
    }

    async addRecordNew(recordData: any, files?: [ExtraFile]) {
        const recordKey = generateEncryptionKey()

        const encryptedKey = await platform.aesGcmEncrypt(recordKey, this.auth.dataKey)
        const encryptedData = await encryptObjectForStorageGCM(recordData, recordKey)

        if (files) {

        }
        const rq = recordsAddMessage({
            clientTime: new Date().getTime(),
            records: [
                {
                    recordUid: platform.getRandomBytes(16),
                    recordKey: encryptedKey,
                    data: encryptedData,
                    clientModifiedTime: new Date().getTime(),
                    folderType: RecordFolderType.default_folder,
                    // fileIds:
                }
            ]
        })
        let recordAddResponse = await this.auth.executeRest(rq)
        console.log(recordAddResponse)
    }

    async uploadFile(fileName: string, fileData: Uint8Array, thumbnailData?: Uint8Array): Promise<string> {

        const fileMetaData = {
            name: fileName,
            hasThumbnail: !!thumbnailData
        }

        const recordKey = generateEncryptionKey()

        const encryptedKey = await platform.aesGcmEncrypt(recordKey, this.auth.dataKey)
        const encryptedData = await encryptObjectForStorageGCM(fileMetaData, recordKey)

        const rq = fileAddMessage({
            clientTime: new Date().getTime(),
            files: [
                {
                    recordUid: platform.getRandomBytes(16),
                    recordKey: encryptedKey,
                    data: encryptedData,
                    hasThumbnail: !!thumbnailData
                }
            ]
        })

        let fileAddResponse = await this.auth.executeRest(rq)
        let file = fileAddResponse.files[0]
        console.log(file)

        await this.encryptAndUpload(file.url, file.parameters, file. successStatusCode, fileData, recordKey)
        if (thumbnailData) {
            await this.encryptAndUpload(file.url, file.thumbnailParameters, file.successStatusCode, thumbnailData, recordKey)
        }

        return webSafe64FromBytes(file.recordUid)
    }

    async encryptAndUpload(url: string, parameters: string, successStatusCode: number, fileData: Uint8Array, key: Uint8Array) {
        const encryptedFile = await platform.aesGcmEncrypt(fileData, key)
        const res = await platform.fileUpload(url, JSON.parse(parameters), encryptedFile)
        if (res.statusCode !== successStatusCode) {
            throw new Error(`Upload failed (${res.statusMessage}), code ${res.statusCode}`)
        }
    }

    async downloadFile(recordUid: string, thumbNail: boolean): Promise<Uint8Array> {
        const rq = fileDownloadMessage({
            records: [
                normal64Bytes(recordUid)
            ],
            thumbnails: thumbNail
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

    async deleteRecords(records: KeeperRecord[]): Promise<Records.IRecordsModifyResponse> {
        const deleteMsg = recordsDeleteMessage({
            records: records.map(x => normal64Bytes(x.uid))
        })
        return this.auth.executeRest(deleteMsg)
    }

    async uploadFileOld(fileName: string, fileData: Uint8Array, thumbnailData?: Uint8Array): Promise<ExtraFile> {
        const uploadCommand = new RequestUploadCommand()
        uploadCommand.file_count = 1
        uploadCommand.thumbnail_count = thumbnailData ? 1 : 0
        const resp = await this.auth.executeCommand(uploadCommand)
        const uploadInfo = resp.file_uploads[0]
        console.log(uploadInfo)
        const fileKey = generateEncryptionKey()
        const encryptedFile = await platform.aesGcmEncrypt(fileData, fileKey)
        // const encryptedFile = platform.aesCbcEncrypt(fileData, fileKey, false)
        // const res = await platform.fileUpload(uploadInfo.url, uploadInfo.parameters, encryptedFile)
        // if (res.statusCode !== uploadInfo.success_status_code) {
        //     throw new Error(`Upload failed (${res.statusMessage}), code ${res.statusCode}`)
        // }
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

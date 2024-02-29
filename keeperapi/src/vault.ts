import {Auth, EncryptionKeys} from './auth'
import {
    RecordData, RecordMetaData, SharedFolder, SyncDataInclude, syncDownCommand
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
    shareKey, shareKeyEC,
    webSafe64FromBytes
} from './utils'
import {
    applicationAddMessage,
    fileAddMessage,
    fileDownloadMessage,
    getEnterprisePublicKeyMessage,
    recordsAddMessage,
    recordsUpdateMessage
} from './restMessages'
import {Records} from './proto'
import RecordFolderType = Records.RecordFolderType;
import FileAddResult = Records.FileAddResult;

async function decryptRecord(record: VaultRecord) {
    if (!(record.recordData && record.recordData.data && record.key)) {
        console.error(`The record ${record.metaData?.record_uid} cannot be decrypted`)
        return
    }
    try {
        const dataBytes = record.recordData.version < 3
            ? await decryptFromStorage(record.recordData.data, record.key)
            : await decryptFromStorageGcm(record.recordData.data, record.key)
        record.data = JSON.parse(platform.bytesToString(dataBytes))
        if (record.recordData.extra) {
            record.extra = JSON.parse(platform.bytesToString(await decryptFromStorage(record.recordData.extra, record.key)))
        }
    } catch (e) {
        console.log(e)
    }
}

export class LegacyVault {
    private _includes: SyncDataInclude[] = ['folders', 'non_shared_data', 'record', 'shared_folder', 'sfheaders', 'sfrecords', 'sfusers', 'typed_record', 'app_record']
    private _records: Record<string, VaultRecord> = {}
    private _sharedFolders: Record<string, VaultSharedFolder> = {}
    private _revision: number = 0

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
        return {record, isNew}
    }

    get includes(): SyncDataInclude[] {
        return this._includes
    }

    get revision(): number {
        return this._revision
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

    recordByUidBytes(record_uid: Uint8Array): VaultRecord {
        return this.recordByUid(webSafe64FromBytes(record_uid))
    }

    private getSharedFolderKey(sharedFolderUid: string): Uint8Array {
        const key = this._sharedFolders[sharedFolderUid]?.key
        if (!key) {
            throw Error(`Unable to fond the key for shared folder ${sharedFolderUid}`)
        }
        return key
    }

    private getRecordKey(recordUid: string): Uint8Array {
        const key = this._records[recordUid]?.key
        if (!key) {
            throw Error(`Unable to fond the key for record ${recordUid}`)
        }
        return key
    }

    async decryptKey(encryptedKey: string, keyType: number, keys: EncryptionKeys): Promise<Uint8Array> {
        switch (keyType) {
            case 1:
                return decryptFromStorage(encryptedKey, keys.dataKey)
            case 2:
                return platform.privateDecrypt(normal64Bytes(encryptedKey), keys.privateKey)
            case 3:
                return decryptKey(encryptedKey, keys.dataKey)
            case 4:
                return platform.privateDecryptEC(normal64Bytes(encryptedKey), keys.eccPrivateKey)
            default:
                throw new Error(`Unknown key type: ${keyType}`)
        }
    }

    setIncludes(includes: SyncDataInclude[]): void {
        this._includes = includes
    }

    // todo: remove logResponse in favor of a unified log levels solution
    async syncDown(revision?: number, logResponse?: boolean) {
        const keys = this.auth.getKeys()
        if (typeof revision === 'number') {
            this._revision = revision
        }
        console.log(`syncing revision ${this._revision} for ${this.auth.username}`)

        let cmd = syncDownCommand({
            revision: this._revision,
            include: this._includes
        })
        let syncDownResponse = await this.auth.executeRestCommand(cmd)
        if (logResponse) {
            console.log(syncDownResponse)
            // console.log(syncDownResponse.shared_folders[0].records)
        }
        this._revision = syncDownResponse?.revision
        if (syncDownResponse.full_sync) {
            this._records = {}
        }

        let added = 0
        let updated = 0
        let removed = 0
        for (let recordData of syncDownResponse.records || []) {
            let {record, isNew} = this.getRecord(recordData.record_uid)
            record.recordData = recordData
            if (isNew) {
                added++
            } else {
                updated++
            }
        }
        for (let meta of syncDownResponse.record_meta_data || []) {
            let {record} = this.getRecord(meta.record_uid)
            record.metaData = meta
            try {
                record.key = await this.decryptKey(meta.record_key, meta.record_key_type, keys);
            } catch (e) {
                console.log(e);
            }
            await decryptRecord(record)
        }
        for (let sharedFolder of syncDownResponse.shared_folders || []) {
            let vaultFolder: VaultSharedFolder = {
                sharedFolder: sharedFolder
            }
            this._sharedFolders[sharedFolder.shared_folder_uid] = vaultFolder
            if (!(sharedFolder.shared_folder_key && sharedFolder.key_type)) {
                continue
            }
            try {
                vaultFolder.key = await this.decryptKey(sharedFolder.shared_folder_key, sharedFolder.key_type, keys);
                vaultFolder.data = platform.bytesToString(await platform.aesCbcDecrypt(normal64Bytes(sharedFolder.data), vaultFolder.key, true))

                for (let sfRecord of sharedFolder.records || []) {
                    let recordKey
                    try {
                        recordKey = sfRecord.record_key.length === 80
                            ? await decryptKey(sfRecord.record_key, vaultFolder.key)    // GCM
                            : decryptFromStorage(sfRecord.record_key, vaultFolder.key)  // CBC
                        let {record} = this.getRecord(sfRecord.record_uid)
                        record.key = recordKey
                        record.sharedFolderUid = sharedFolder.shared_folder_uid
                        await decryptRecord(record)
                    } catch (e) {
                        console.log(e);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }

        for (let team of syncDownResponse.teams || []) {
            const teamKey = await this.decryptKey(team.team_key, team.team_key_type, keys);
            for (let folderKey of team.shared_folder_keys || []) {
                let decryptedFolderKey
                switch (folderKey.key_type) {
                    case 1:
                        decryptedFolderKey = decryptFromStorage(folderKey.shared_folder_key, teamKey)
                        break
                    case 2:
                        const teamPrivateKey = await decryptFromStorage(team.team_private_key, teamKey)
                        decryptedFolderKey = platform.privateDecrypt(normal64Bytes(folderKey.shared_folder_key), teamPrivateKey)
                        break
                    default:
                        throw new Error(`Unknown key type: ${folderKey.key_type}`)
                }
                this._sharedFolders[folderKey.shared_folder_uid].key = decryptedFolderKey
            }
        }

        for (let sffRecord of syncDownResponse.shared_folder_folder_records || []) {
            let {record} = this.getRecord(sffRecord.record_uid)
            record.sharedFolderFolderUid = sffRecord.folder_uid
        }

        for (let uid of syncDownResponse.removed_records || []) {
            if (this.records[uid]) {
                removed++
                delete this.records[uid]
            }
        }

        for (let non_shared_data of syncDownResponse.non_shared_data || []) {
            let {record} = this.getRecord(non_shared_data.record_uid)
            try {
                if (!record.recordData) {
                    console.error(`Non shared data on record ${record.metaData?.record_uid} cannot be decrypted`)
                    continue
                }
                const nonSharedData = record.recordData.version > 2
                    ? await decryptFromStorageGcm(non_shared_data.data, keys.dataKey)
                    : await decryptFromStorage(non_shared_data.data, keys.dataKey)
                record.nonSharedData = JSON.parse(platform.bytesToString(nonSharedData))
            } catch (e) {
                console.log(e)
            }
        }

        for (let record of this.records.filter(x => !!x.recordData?.owner_uid)) {
            const owner = this._records[record.recordData!.owner_uid!]
            if (!owner?.key || !record.recordData?.record_uid || !record.recordData.link_key) {
                console.error(`Linked record ${record.metaData?.record_uid} cannot be decrypted`)
                continue
            }
            if (!owner.links) {
                owner.links = []
            }
            owner.links.push(record.recordData.record_uid)
            record.key = await decryptKey(record.recordData.link_key, owner.key)
            await decryptRecord(record)
        }

        if (added > 0)
            console.log(`${added} records added.`)
        if (updated > 0)
            console.log(`${updated} records updated.`)
        if (removed > 0)
            console.log(`${removed} records removed.`)
        console.log(`Synced to the revision ${syncDownResponse.revision}`)
        console.log(`${Object.keys(this._records).length} records are in the vault.`)
    }

    // async addRecord(recordData: KeeperRecordData, sharedFolderUid?: string, files?: [ExtraFile]): Promise<string> {
    //     let recordAddCommand = new RecordAddCommand()
    //     recordAddCommand.record_uid = generateUid()
    //     let recordKey = generateEncryptionKey()
    //     recordAddCommand.record_key = await encryptForStorage(recordKey, this.auth.dataKey)
    //     recordAddCommand.record_type = 'password'
    //     recordAddCommand.data = await encryptForStorage(platform.stringToBytes(JSON.stringify(recordData)), recordKey)
    //     recordAddCommand.how_long_ago = 0
    //     if (sharedFolderUid) {
    //         recordAddCommand.folder_type = 'shared_folder'
    //         recordAddCommand.folder_uid = sharedFolderUid
    //         recordAddCommand.folder_key = await encryptForStorage(recordKey, this.getSharedFolderKey(sharedFolderUid))
    //     }
    //     else {
    //         recordAddCommand.folder_type = 'user_folder'
    //     }
    //
    //     if (files) {
    //         let extra: KeeperRecordExtra = {
    //             fields: [],
    //             files: files
    //         }
    //         recordAddCommand.extra = await encryptForStorage(platform.stringToBytes(JSON.stringify(extra)), recordKey)
    //         recordAddCommand.file_ids = files.map(x => x.id)
    //     }
    //
    //     await this.auth.executeCommand(recordAddCommand)
    //     return recordAddCommand.record_uid
    // }

    async addRecordNew(recordData: any, sharedFolderUid?: string, linkedRecords?: string[]): Promise<Records.IRecordsModifyResponse> {
        const recordKey = generateEncryptionKey()
        const {dataKey} = this.auth.getKeys()

        const encryptedKey = await platform.aesGcmEncrypt(recordKey, dataKey)
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
            recordAdd.folderKey = await platform.aesGcmEncrypt(recordKey, this.getSharedFolderKey(sharedFolderUid))
        }
        if (linkedRecords) {
            let links: Records.IRecordLink[] = []
            for (const linkedRecord of linkedRecords) {
                const linkedRecordKey = generateEncryptionKey()
                // const linkedRecordKey = await platform.aesGcmEncrypt(this._records[linkedRecord].key, recordKey)
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

        const recordUid = webSafe64FromBytes(recordAdd.recordUid!)
        this._records[recordUid] = {
            recordData: {
                record_uid: recordUid,
                version: 3
            },
            key: recordKey
        }

        return recordAddResponse
    }

    async addRecordsNew(recordsData: any[]): Promise<Records.IRecordsModifyResponse> {
        const now = new Date().getTime()
        const {dataKey} = this.auth.getKeys()

        let records: Records.IRecordAdd[] = []
        let keys: Record<string, Uint8Array> = {}
        for (const recordData of recordsData) {
            const recordKey = generateEncryptionKey()

            const encryptedKey = await platform.aesGcmEncrypt(recordKey, dataKey)
            const encryptedData = await encryptObjectForStorageGCM(recordData, recordKey)

            let recordAdd: Records.IRecordAdd = {
                recordUid: platform.getRandomBytes(16),
                recordKey: encryptedKey,
                data: encryptedData,
                clientModifiedTime: now
            }
            records.push(recordAdd)
            keys[webSafe64FromBytes(recordAdd.recordUid!)] = recordKey
        }

        const recordsAddResponse = await this.auth.executeRest(recordsAddMessage({
            clientTime: now,
            records: records
        }))

        for (const recordResponse of recordsAddResponse.records!) {
            const recordUid = webSafe64FromBytes(recordResponse.recordUid!)
            this._records[recordUid] = {
                recordData: {
                    record_uid: recordUid,
                    version: 3
                },
                key: keys[recordUid]
            }
        }

        return recordsAddResponse
    }

    async uploadFile(fileName: string, fileData: Uint8Array, thumbnailData?: Uint8Array): Promise<string> {

        const fileMetaData = {
            name: fileName,
            hasThumbnail: !!thumbnailData
        }

        const {dataKey} = this.auth.getKeys()

        const recordKey = generateEncryptionKey()

        const encryptedKey = await platform.aesGcmEncrypt(recordKey, dataKey)
        const encryptedData = await encryptObjectForStorageGCM(fileMetaData, recordKey)
        const encryptedFile = await platform.aesGcmEncrypt(fileData, recordKey)
        const encryptedThumbnail = thumbnailData
            ? await platform.aesGcmEncrypt(thumbnailData, recordKey)
            : undefined

        const fileRequest = {
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
        }
        console.log(fileRequest)
        const rq = fileAddMessage(fileRequest)

        const fileAddResponse = await this.auth.executeRest(rq)
        const file = fileAddResponse.files![0]
        if (file.status !== FileAddResult.FA_SUCCESS)
            throw new Error(`Error adding a file record for ${fileName}`)

        await this.uploadFileData(file.url!, file.parameters!, file.successStatusCode!, encryptedFile)
        if (encryptedThumbnail) {
            await this.uploadFileData(file.url!, file.thumbnailParameters!, file.successStatusCode!, encryptedThumbnail)
        }

        const fileUid = webSafe64FromBytes(file.recordUid!)
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
        let file = resp.files![0]
        console.log(resp)
        console.log(file)

        const fileResponse = await platform.get(file.url!, {})
        const key = this.getRecordKey(recordUid)
        switch (file.fileKeyType) {
            case Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY:
                return platform.aesCbcDecrypt(fileResponse.data, key, false);
            case Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY_GCM:
                return platform.aesGcmDecrypt(fileResponse.data, key);
            default:
                throw Error(`Unsupported file key type: ${file.fileKeyType}`)
        }
    }

    async addApplication(appData: any): Promise<string> {
        const {dataKey} = this.auth.getKeys()
        const recordKey = generateEncryptionKey()
        const encryptedKey = await platform.aesGcmEncrypt(recordKey, dataKey)
        const encryptedData = await encryptObjectForStorageGCM(appData, recordKey)
        let applicationAdd: Records.IApplicationAddRequest = {
            appUid: platform.getRandomBytes(16),
            recordKey: encryptedKey,
            data: encryptedData,
            clientModifiedTime: new Date().getTime()
        }
        await this.auth.executeRestAction(applicationAddMessage(applicationAdd))
        return webSafe64FromBytes(applicationAdd.appUid!)
    }

    // async updateRecordV2(update: RecordUpdateV2): Promise<void> {
    //     const record = this._records[update.record_uid]
    //     const { dataKey } = this.auth.getKeys()
    //     if (!record.key) {
    //         throw Error('Record key is missing')
    //     }
    //
    //     const encryptedData = update.data
    //         ? await encryptObjectForStorage(update.data, record.key)
    //         : undefined
    //
    //     const encryptedExtra = await encryptObjectForStorage(record.extra, record.key)
    //
    //     let nonSharedData: string | Uint8Array | undefined
    //     if (update.nonSharedData || update.nonSharedData === null) {
    //         if (update.nonSharedData == null) {
    //             nonSharedData = Uint8Array.of(0)
    //         } else {
    //             nonSharedData = await encryptObjectForStorage(update.nonSharedData, dataKey)
    //         }
    //     }
    //
    //     const updateCommand = new RecordUpdateCommand()
    //     updateCommand.client_time = new Date().getTime()
    //     updateCommand.update_records = [
    //         {
    //             record_uid: update.record_uid,
    //             client_modified_time: new Date().getTime(),
    //             data: encryptedData,
    //             extra: encryptedExtra,
    //             non_shared_data: nonSharedData,
    //             revision: record.recordData.revision,
    //             version: 2,
    //             udata: update.udata,
    //         }
    //     ]
    //
    //     const resp = await this.auth.executeCommand(updateCommand)
    //     console.log(resp)
    // }

    async updateRecord(update: RecordUpdate): Promise<Records.IRecordsModifyResponse> {
        return this.updateRecords([update])
    }

    async updateRecords(updates: RecordUpdate[]): Promise<Records.IRecordsModifyResponse> {

        const keys = await this.auth.getKeys()

        const request: Records.IRecordsUpdateRequest = {
            clientTime: new Date().getTime(),
            records: []
        }

        for (const update of updates) {
            const record = this._records[update.record_uid]
            if (!record.key || !record.recordData) {
                throw Error('Record key or data is missing')
            }

            const encryptedData = update.data
                ? await encryptObjectForStorageGCM(update.data, record.key)
                : undefined

            let nonSharedData: Uint8Array | undefined
            if (update.nonSharedData || update.nonSharedData === null) {
                if (update.nonSharedData == null) {
                    nonSharedData = Uint8Array.of(0)
                } else {
                    nonSharedData = await encryptObjectForStorageGCM(update.nonSharedData, keys.dataKey, false)
                }
            }

            let recordAudit: KeeperRecordAudit | undefined
            if (update.audit) {
                const pubKeyResponse = await this.auth.executeRest(getEnterprisePublicKeyMessage())
                const auditBytes = platform.stringToBytes(JSON.stringify(update.audit.data));
                if (!pubKeyResponse.enterpriseECCPublicKey) {
                    throw Error('enterpriseECCPublicKey is missing')
                }
                const auditData = await platform.publicEncryptEC(auditBytes, pubKeyResponse.enterpriseECCPublicKey)
                recordAudit = {
                    version: update.audit.version,
                    data: auditData
                }
            }

            let addedLinks: Records.IRecordLink[] | undefined
            if (update.add_links) {
                addedLinks = []
                for (const linkedRecord of update.add_links) {
                    const linkedRecordKey = this._records[linkedRecord].key
                    if (!linkedRecordKey) {
                        throw Error('Linked record key is missing')
                    }
                    const linkedRecordEncryptedKey = await platform.aesGcmEncrypt(linkedRecordKey, record.key)
                    addedLinks.push({
                        recordUid: normal64Bytes(linkedRecord),
                        recordKey: linkedRecordEncryptedKey
                    })
                }
            }

            let removedLinks = update.remove_links
                ? update.remove_links.map(x => normal64Bytes(x))
                : undefined

            request.records!.push({
                recordUid: normal64Bytes(update.record_uid),
                data: encryptedData,
                nonSharedData: nonSharedData,
                audit: recordAudit,
                recordLinksAdd: addedLinks,
                recordLinksRemove: removedLinks,
                clientModifiedTime: new Date().getTime(),
                revision: record.recordData.revision
            })
            console.log(`Updating record ${update.record_uid} revision ${record.recordData.revision}`)
        }

        const updateMsg = recordsUpdateMessage(request)
        const response = await this.auth.executeRest(updateMsg)
        const revision: number = response.revision as number
        for (const record of response.records!) {
            this._records[webSafe64FromBytes(record.recordUid!)].recordData!.revision = revision
        }
        return response
    }

    // async deleteRecords(recordUids: string[]): Promise<DeleteResponse> {
    //     const preDeleteCommand = new PreDeleteCommand()
    //     preDeleteCommand.objects = recordUids.map(x => {
    //         return {
    //             object_uid: x,
    //             object_type: 'record',
    //             from_type: 'user_folder',
    //             delete_resolution: 'unlink'
    //         }
    //     })
    //     const preDeleteResult = await this.auth.executeCommand(preDeleteCommand)
    //     const deleteCommand = new DeleteCommand()
    //     deleteCommand.pre_delete_token = preDeleteResult.pre_delete_response.pre_delete_token
    //     return this.auth.executeCommand(deleteCommand)
    // }

    // async cleanTrash() {
    //     await this.auth.executeCommand(new PurgeDeletedRecordsCommand())
    // }

    // async createSharedFolder(folderName: string): Promise<string> {
    //     let folderKey = generateEncryptionKey()
    //     let folderUid = generateUid()
    //
    //     const faCommand = new FolderAddCommand()
    //     faCommand.name = await encryptForStorage(platform.stringToBytes(folderName), folderKey)
    //     faCommand.folder_uid = folderUid
    //     faCommand.folder_type = 'shared_folder'
    //     faCommand.key = await encryptForStorage(folderKey, this.auth.dataKey)
    //     faCommand.data = await encryptObjectForStorage({ name: folderName + '1', color: '#FF0000'}, folderKey)
    //     const addFolderResponse = await this.auth.executeCommand(faCommand)
    //     this._revision = addFolderResponse.revision
    //
    //     this._sharedFolders[folderUid] = {
    //         key: folderKey
    //     }
    //
    //     return folderUid
    // }

    // async addUserToSharedFolder(sharedFolderUid: string, user: string) {
    //     const sharedFolder = this._sharedFolders[sharedFolderUid]
    //     const userPublicKey = await this.fetchUserPublicKey(user)
    //
    //     const sfuCommand = new SharedFolderUpdateCommand()
    //     sfuCommand.operation = 'update'
    //     sfuCommand.name = await encryptForStorage(platform.stringToBytes('sftest2'), sharedFolder.key)
    //     sfuCommand.shared_folder_uid = sharedFolderUid
    //     sfuCommand.revision = this._revision
    //     sfuCommand.add_users = [{
    //         username: user,
    //         manage_records: false,
    //         manage_users: false,
    //         shared_folder_key: shareKey(sharedFolder.key, userPublicKey)
    //     }]
    //     await this.auth.executeCommand(sfuCommand)
    // }

    // async deleteSharedFolders(sharedFolderUids: string[]) {
    //     for (let sharedFolderUid of sharedFolderUids) {
    //         const sfuCommand = new SharedFolderUpdateCommand()
    //         sfuCommand.operation = 'delete'
    //         sfuCommand.shared_folder_uid = sharedFolderUid
    //         await this.auth.executeCommand(sfuCommand)
    //     }
    // }

    // async fetchUserPublicKey(user: string): Promise<string> {
    //     const publicKeysCommand = new PublicKeysCommand()
    //     publicKeysCommand.key_owners = [user]
    //     const publicKeys = await this.auth.executeCommand(publicKeysCommand)
    //     if (!publicKeys.public_keys[0].public_key) {
    //         throw new Error(publicKeys.public_keys[0].message)
    //     }
    //     return normal64(publicKeys.public_keys[0].public_key)
    // }

    // async fetchUserPublicKeyEC(user: string): Promise<Uint8Array> {
    //     const publicKeysCommand = new PublicKeysCommand()
    //     publicKeysCommand.key_owners = [user]
    //     const publicKeys = await this.auth.executeCommand(publicKeysCommand)
    //     if (!publicKeys.public_keys[0].public_key) {
    //         throw new Error(publicKeys.public_keys[0].message)
    //     }
    //     return null
    //     // return normal64(publicKeys.public_keys[0].public_key)
    // }

    // async shareRecords(recordUids: string[], share: RecordShare): Promise<RecordShareUpdateResponse> {
    //     const userPublicKey = await this.fetchUserPublicKey(share.to_user)
    //
    //     const shareCommand = new RecordShareUpdateCommand()
    //     let shareObjects: ShareObject[] = []
    //     for (const recordUid of recordUids) {
    //         const recordKey = shareKey(this._records[recordUid].key, userPublicKey)
    //         const so: ShareObject = {
    //             record_uid: recordUid,
    //             record_key: recordKey,
    //             to_username: share.to_user,
    //             shareable: share.shareable,
    //             editable: share.editable
    //         }
    //         shareObjects.push(so)
    //     }
    //     shareCommand.add_shares = shareObjects
    //     return this.auth.executeCommand(shareCommand)
    // }

    // async shareRecordsEC(recordUids: string[], share: RecordShare): Promise<RecordShareUpdateResponse> {
    //     const userPublicKey = await this.fetchUserPublicKeyEC(share.to_user)
    //
    //     const shareCommand = new RecordShareUpdateCommand()
    //     let shareObjects: ShareObject[] = []
    //     for (const recordUid of recordUids) {
    //         const recordKey = await shareKeyEC(this._records[recordUid].key, userPublicKey)
    //         const so: ShareObject = {
    //             record_uid: recordUid,
    //             record_key: recordKey,
    //             to_username: share.to_user,
    //             shareable: share.shareable,
    //             editable: share.editable
    //         }
    //         shareObjects.push(so)
    //     }
    //     shareCommand.add_shares = shareObjects
    //     return this.auth.executeCommand(shareCommand)
    // }

    // async uploadFileOld(fileName: string, fileData: Uint8Array, thumbnailData?: Uint8Array): Promise<ExtraFile> {
    //     const uploadCommand = new RequestUploadCommand()
    //     uploadCommand.file_count = 1
    //     uploadCommand.thumbnail_count = thumbnailData ? 1 : 0
    //     const resp = await this.auth.executeCommand(uploadCommand)
    //     const uploadInfo = resp.file_uploads[0]
    //     console.log(uploadInfo)
    //     const fileKey = generateEncryptionKey()
    //     // const encryptedFile = await platform.aesGcmEncrypt(fileData, fileKey)
    //     const encryptedFile = await platform.aesCbcEncrypt(fileData, fileKey, true)
    //     const res = await platform.fileUpload(uploadInfo.url, uploadInfo.parameters, encryptedFile)
    //     if (res.statusCode !== uploadInfo.success_status_code) {
    //         throw new Error(`Upload failed (${res.statusMessage}), code ${res.statusCode}`)
    //     }
    //     return {
    //         id: uploadInfo.file_id,
    //         name: fileName,
    //         title: fileName,
    //         key: webSafe64FromBytes(fileKey),
    //         lastModified: new Date().getTime(),
    //         size: encryptedFile.length,
    //         type: '',
    //     }
    // }
}

export interface VaultRecord {
    recordData?: RecordData
    metaData?: RecordMetaData;
    key?: Uint8Array

    data?: KeeperRecordData
    extra?: KeeperRecordExtra
    sharedFolderUid?: string;
    sharedFolderFolderUid?: string;
    nonSharedData?: any;
    audit?: KeeperRecordAudit;
    links?: string[]
}

export interface VaultSharedFolder {
    sharedFolder?: SharedFolder
    key?: Uint8Array
    data?: any
}

export interface KeeperRecordData {
    title?: string;
    secret1?: string;
    secret2?: string;
    link?: string;
    notes?: string;
    custom?: { name?: string, value?: string }[];
}

export interface KeeperRecordExtra {
    fields: ExtraField[]
    files: ExtraFile[]
}

export interface KeeperRecordAudit {
    version: number
    data: any
}

export interface RecordShare {
    to_user: string;
    shareable: boolean;
    editable: boolean;
}

export interface RecordUpdateV2 {
    record_uid: string
    data?: KeeperRecordData
    nonSharedData?: any
    udata?: { file_ids: string[] }
}

export interface RecordUpdate {
    record_uid: string;
    data?: KeeperRecordData
    nonSharedData?: any;
    audit?: KeeperRecordAudit;
    add_links?: string[]
    remove_links?: string[]
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
    name?: string
    lastModified?: number
    size?: number
    type?: string
    title?: string
    key?: string
    thumbs?: FileThumb[]
}

export interface FileThumb {
    id: string
    size: number
    type: 'image/jpg'
}

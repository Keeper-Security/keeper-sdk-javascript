import {Auth} from "./auth";
import {SyncDownCommand, RecordAddCommand, KeeperResponse, SyncResponse} from "./commands";
import {platform} from "./platform";
import {decryptFromStorage, encryptForStorage, generateEncryptionKey, generateUid} from "./utils";

export class Vault {

    private _records: KeeperRecord[] = [];
    private revision: number = 0;

    constructor(private auth: Auth) {
    }

    async syncDown() {
        let syncDownCommand = new SyncDownCommand();
        // let syncDownCommand = this.auth.createCommand(SyncDownCommand);
        syncDownCommand.client_time = new Date().getTime();
        syncDownCommand.revision = this.revision;
        let syncDownResponse = await this.auth.executeCommand(syncDownCommand);
            // let syncDownResponse = await this.auth.endpoint.executeV2Command<SyncResponse>(syncDownCommand);
        this.revision = syncDownResponse.revision;
        if (syncDownResponse.full_sync) {
            this._records = [];
        }
        for (let rec of syncDownResponse.records) {
            let meta = syncDownResponse.record_meta_data.find(x => x.record_uid === rec.record_uid);
            let recordKey = decryptFromStorage(meta.record_key, this.auth.dataKey);
            let recordData = decryptFromStorage(rec.data, recordKey);
            let record: KeeperRecord = {
                uid: meta.record_uid,
                owner: meta.owner,
                can_edit: meta.can_edit,
                can_share: meta.can_share,
                shared: rec.shared,
                client_modified_time: new Date(rec.client_modified_time),
                version: rec.version,
                revision: rec.revision,
                data: JSON.parse(platform.bytesToString(recordData))
            };
            this._records.push(record);
        }
        console.log(`${syncDownResponse.records.length} records downloaded. ${this._records.length} are in the vault`);
    }

    async addRecord(recordData: KeeperRecordData) {
        let recordAddCommand = new RecordAddCommand();
        recordAddCommand.record_uid = generateUid();
        let recordKey = generateEncryptionKey();
        recordAddCommand.record_key = encryptForStorage(recordKey, this.auth.dataKey);
        recordAddCommand.record_type = "password";
        recordAddCommand.data = encryptForStorage(platform.stringToBytes(JSON.stringify(recordData)), recordKey);
        recordAddCommand.how_long_ago = 0;
        recordAddCommand.folder_type = "user_folder";
        let recordAddResponse = await this.auth.executeCommand(recordAddCommand);
        console.log(recordAddResponse);
    }

    async updateRecords(recordsData: KeeperRecordData[]) {
    }

    get records(): KeeperRecord[] {
        return this._records;
    }
}

export class KeeperRecord {
    uid: string;
    owner: boolean;
    can_share: boolean;
    can_edit: boolean;
    shared: boolean;
    client_modified_time: Date;
    version: number;
    revision: number;
    data: KeeperRecordData;
}

export interface KeeperRecordData {
    title?: string;
    secret1?: string;
    secret2?: string;
    link?: string;
    notes?: string;
    custom?: { name?: string, value?: string }[];
}

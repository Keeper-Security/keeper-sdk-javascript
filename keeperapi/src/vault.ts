import {AuthContext} from "./authContext";
import {SyncDownCommand, SyncResponse} from "./commands";
import {platform} from "./platform";
import {normal64} from "./utils";

export class Vault {

    private _records: KeeperRecord[] = [];

    constructor(private authContext: AuthContext) {
    }

    async syncDown() {
        let syncDownCommand = this.authContext.createCommand(SyncDownCommand);
        syncDownCommand.client_time = new Date().getTime();
        let syncDownResponse = await this.authContext.endpoint.executeV2Command<SyncResponse>(syncDownCommand);
        for (let rec of syncDownResponse.records) {
            let meta = syncDownResponse.record_meta_data.find(x => x.record_uid === rec.record_uid);
            let encRecKey = platform.base64ToBytes(normal64(meta.record_key));
            let recordKey = await platform.aesCbcDecrypt(encRecKey, this.authContext.dataKey, true);
            let encRecData = platform.base64ToBytes(normal64(rec.data));
            let recordData = await platform.aesCbcDecrypt(encRecData, recordKey, true);
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
    }

    // async AddRecord()

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
    title: string;
    secret1: string;
    secret2: string;
    link: string;
    notes: string;
    custom: any[];
}

import {AuthContext} from "./authContext";
import {EnterpriseDataInclude, GetEnterpriseDataCommand, GetEnterpriseDataResponse, KeeperResponse} from "./commands";
import {decryptFromStorage, decryptObjectFromStorage, normal64} from "./utils";

export class Company {

    private _data: GetEnterpriseDataResponse;

    constructor(private authContext: AuthContext) {
    }

    async load(include: EnterpriseDataInclude[]) {
        let getEnterpriseDataCommand = this.authContext.createCommand(GetEnterpriseDataCommand);
        getEnterpriseDataCommand.include = include;
        this._data = await this.authContext.endpoint.executeV2Command<GetEnterpriseDataResponse>(getEnterpriseDataCommand);
        let treeKey = decryptFromStorage(this._data.tree_key, this.authContext.dataKey);

        for (let node of this._data.nodes) {
            node.displayName = decryptObjectFromStorage<EncryptedData>(node.encrypted_data, treeKey).displayname;
        }

        for (let role of this._data.roles) {
            role.displayName = decryptObjectFromStorage<EncryptedData>(role.encrypted_data, treeKey).displayname;
        }

        for (let user of this._data.users) {
            switch (user.key_type) {
                case "encrypted_by_data_key":
                    user.displayName = decryptObjectFromStorage<EncryptedData>(user.encrypted_data, treeKey).displayname;
                    break;
                case "encrypted_by_public_key":
                    throw "Not Implemented";
                case "no_key":
                    user.displayName = user.encrypted_data;
                    break;
            }
        }
    }

    get data(): GetEnterpriseDataResponse {
        return this._data;
    }
}

type EncryptedData = { displayname: string }

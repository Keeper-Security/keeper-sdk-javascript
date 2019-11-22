import {Auth} from "./auth";
import {EnterpriseDataInclude, GetEnterpriseDataCommand, GetEnterpriseDataResponse, KeeperResponse} from "./commands";
import {decryptFromStorage, decryptObjectFromStorage, encryptForStorage, encryptObjectForStorage, normal64} from "./utils";
import {platform} from "./platform";

export class Company {

    private _data: GetEnterpriseDataResponse;
    private treeKey: Uint8Array;

    constructor(private auth: Auth) {
    }

    async load(include: EnterpriseDataInclude[]) {
        let getEnterpriseDataCommand = this.auth.createCommand(GetEnterpriseDataCommand);
        getEnterpriseDataCommand.include = include;
        this._data = await this.auth.endpoint.executeV2Command<GetEnterpriseDataResponse>(getEnterpriseDataCommand);
        this.treeKey = decryptFromStorage(this._data.tree_key, this.auth.dataKey);

        for (let node of this._data.nodes) {
            node.displayName = decryptObjectFromStorage<EncryptedData>(node.encrypted_data, this.treeKey).displayname;
            if (node.parent_id) {
                let parent = this._data.nodes.find(x => x.node_id == node.parent_id);
                if (!parent.nodes) {
                    parent.nodes = []
                }
                parent.nodes.push(node);
            }
        }

        for (let role of this._data.roles) {
            role.displayName = decryptObjectFromStorage<EncryptedData>(role.encrypted_data, this.treeKey).displayname;
            let node = this._data.nodes.find(x => x.node_id == role.node_id);
            if (!node.roles) {
                node.roles = []
            }
            node.roles.push(role);
        }

        for (let user of this._data.users) {
            switch (user.key_type) {
                case "encrypted_by_data_key":
                    user.displayName = decryptObjectFromStorage<EncryptedData>(user.encrypted_data, this.treeKey).displayname;
                    break;
                case "encrypted_by_public_key":
                    throw "Not Implemented";
                case "no_key":
                    user.displayName = user.encrypted_data;
                    break;
            }
            let node = this._data.nodes.find(x => x.node_id == user.node_id);
            if (!node.users) {
                node.users = []
            }
            node.users.push(user);
        }
    }

    get data(): GetEnterpriseDataResponse {
        return this._data;
    }

    encryptDisplayName(displayName: string): string {
        return encryptObjectForStorage<EncryptedData>({
            displayname: displayName
        }, this.treeKey);
    }

}

type EncryptedData = {displayname: string}

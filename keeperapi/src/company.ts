import {AuthContext} from "./authContext";
import {EnterpriseDataInclude, GetEnterpriseDataCommand, GetEnterpriseDataResponse, KeeperResponse} from "./commands";
import {platform} from "./platform";
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
            node.displayName = decryptObjectFromStorage<NodeEncrypted>(node.encrypted_data, treeKey).displayname;
        }
    }

    get data(): GetEnterpriseDataResponse {
        return this._data;
    }
}

type NodeEncrypted = { displayname: string }

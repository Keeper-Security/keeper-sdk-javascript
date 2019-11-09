import {AuthContext} from "./authContext";
import {EnterpriseDataInclude, GetEnterpriseDataCommand, GetEnterpriseDataResponse, KeeperResponse} from "./commands";

export class Company {

    private _data: GetEnterpriseDataResponse;

    constructor(private authContext: AuthContext) {
    }

    async load(include: EnterpriseDataInclude[]) {
        let getEnterpriseDataCommand = this.authContext.createCommand(GetEnterpriseDataCommand);
        getEnterpriseDataCommand.include = include;
        this._data = await this.authContext.endpoint.executeV2Command<GetEnterpriseDataResponse>(getEnterpriseDataCommand);
    }

    get data(): GetEnterpriseDataResponse {
        return this._data;
    }

}

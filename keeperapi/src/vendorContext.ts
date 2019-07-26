import {KeeperEndpoint} from "./endpoint";
import {Enterprise, EnterpriseBase} from "./vendorModel";
import {VendorConfiguration} from "./configuration";

export class VendorContext {
    private endpoint: KeeperEndpoint;

    constructor(private configuration: VendorConfiguration) {
        this.endpoint = new KeeperEndpoint(configuration.host);
    }

    async getEnterprise(enterpriseID: number): Promise<Enterprise> {
        return this.endpoint.executeVendorGet<Enterprise>(`${this.configuration.vendorId}/enterprise/${enterpriseID}`);
    }

    async postEnterprise(enterprise: EnterpriseBase): Promise<Enterprise> {
        return this.endpoint.executeVendorPost<Enterprise>(`${this.configuration.vendorId}/enterprise/`, enterprise);
    }
}

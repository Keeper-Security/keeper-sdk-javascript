import {KeeperEndpoint} from "./endpoint";
import {MSPEnterprise, EnterpriseBase, LicenseAdjustment} from "./vendorModel";
import {VendorConfiguration} from "./configuration";

export class VendorContext {
    private endpoint: KeeperEndpoint;

    constructor(private configuration: VendorConfiguration) {
        this.endpoint = new KeeperEndpoint(configuration.host);
    }

    async getEnterprise(enterpriseID: number): Promise<MSPEnterprise> {
        return this.endpoint.executeVendorRequest<MSPEnterprise>(`${this.configuration.vendorId}/enterprise/${enterpriseID}`, this.configuration.privateKey);
    }

    async postEnterprise(enterprise: EnterpriseBase): Promise<MSPEnterprise> {
        return this.endpoint.executeVendorRequest<MSPEnterprise>(`${this.configuration.vendorId}/enterprise/`, this.configuration.privateKey, enterprise);
    }

    async postLicenseAdjustment(enterpriseID: number, adjustment: LicenseAdjustment): Promise<MSPEnterprise> {
        return this.endpoint.executeVendorRequest<MSPEnterprise>(`${this.configuration.vendorId}/license/${enterpriseID}`, this.configuration.privateKey, adjustment);
    }
}

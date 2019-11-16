import {KeeperEnvironment} from "./endpoint";

export interface ClientConfiguration {
    host: KeeperEnvironment | string;
}

export interface VendorConfiguration {
    vendorId: string;
    privateKey: string;
    host: KeeperEnvironment | string;
}

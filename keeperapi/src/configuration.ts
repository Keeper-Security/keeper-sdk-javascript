import {KeeperEnvironment} from "./endpoint";

export interface ClientConfiguration {
    host: KeeperEnvironment | string;
    clientVersion?: string;
}

export interface VendorConfiguration {
    vendorId: string;
    privateKey: string;
    host: KeeperEnvironment | string;
}

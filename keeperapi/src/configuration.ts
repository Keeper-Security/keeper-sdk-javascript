import {KeeperEnvironment} from "./keeperSettings";

export interface ClientConfiguration {
    username: string;
    password: string;
    host: KeeperEnvironment | string;
}

export interface VendorConfiguration {
    vendorId: string;
    privateKey: string;
    host: KeeperEnvironment | string;
}

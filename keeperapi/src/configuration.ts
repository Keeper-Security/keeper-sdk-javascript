import {KeeperEnvironment} from "./endpoint";

export type KeeperHost = KeeperEnvironment | string

export interface ClientConfiguration {
    host: KeeperHost;
    clientVersion?: string;
    deviceToken?: Uint8Array;
    onDeviceToken?: (deviceToken: Uint8Array) => void
}

export interface VendorConfiguration {
    host: KeeperHost;
    vendorId: string;
    privateKey: string;
}

export interface TransmissionKey {
    key: Uint8Array
    publicKeyId: number
    encryptedKey: Uint8Array
}

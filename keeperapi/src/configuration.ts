import {KeeperEnvironment} from "./endpoint";

export type KeeperHost = KeeperEnvironment | string

export interface ClientConfiguration {
    host: KeeperHost;
    clientVersion?: string;
    deviceToken?: Uint8Array; // pre - v15 device token
    onDeviceToken?: (deviceToken: Uint8Array) => void  // event to store device token
    deviceConfig?: DeviceConfig; // v15+ device config
    onDeviceConfig?: (deviceConfig: DeviceConfig) => void // event to store device config
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

export interface DeviceConfig {
    deviceToken: Uint8Array
    privateKey: Uint8Array
    publicKey: Uint8Array
    verifiedUsers: string[]
}

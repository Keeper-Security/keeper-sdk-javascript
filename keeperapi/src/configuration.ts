import {KeeperEnvironment} from "./endpoint";
import {Authentication} from './proto';
import TwoFactorExpiration = Authentication.TwoFactorExpiration;

export type KeeperHost = KeeperEnvironment | string

export interface ClientConfiguration {
    host: KeeperHost
    clientVersion?: string
    deviceToken?: Uint8Array // pre - v15 device token
    onDeviceToken?: (deviceToken: Uint8Array) => void  // event to store device token
    deviceConfig?: DeviceConfig // v15+ device config
    onDeviceConfig?: (deviceConfig: DeviceConfig, host: KeeperHost) => void // event to store device config
    authUI?: AuthUI
    authUI3?: AuthUI3
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
    transmissionKeyId: number
}

export interface AuthUI {
    getTwoFactorCode(errorMessage?: string): Promise<string>;
    displayDialog(): Promise<boolean>;
}

export interface AuthUI3 {
    getTwoFactorCode(): Promise<TwoFactorInput>;
    getTwoFactorExpiration(): Promise<TwoFactorExpiration>;
    prompt(message: string): Promise<String>;
    redirectCallback?(url: string): void;
}

export type TwoFactorInput = {
    twoFactorCode: string
    desiredExpiration: TwoFactorExpiration
}

export type LoginError = {
    error: string;
    message: string;
}

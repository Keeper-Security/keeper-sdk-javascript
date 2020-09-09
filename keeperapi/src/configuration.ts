import {KeeperEnvironment} from "./endpoint";
import {Authentication} from './proto';
import TwoFactorExpiration = Authentication.TwoFactorExpiration;

export type KeeperHost = KeeperEnvironment | string

export interface ClientConfiguration {
    authUI?: AuthUI
    authUI3?: AuthUI3
    clientVersion?: string
    cloneConfig?: boolean
    deviceConfig?: DeviceConfig // v15+ device config
    deviceToken?: Uint8Array // pre - v15 device token
    sessionStorage?: SessionStorage,
    useSessionResumption?: boolean,
    host: KeeperHost
    onDeviceConfig?: (deviceConfig: DeviceConfig, host: KeeperHost) => void // event to store device config
    onDeviceToken?: (deviceToken: Uint8Array) => void  // event to store device token
}
export interface ClientConfigurationInternal extends ClientConfiguration {
    deviceConfig: DeviceConfig // v15+ device config
}

export interface DeviceConfig {
    deviceName: string | null
    deviceToken: Uint8Array | null
    privateKey: Uint8Array | null
    publicKey: Uint8Array | null
    transmissionKeyId: number | null
}

export interface SessionStorage {
    lastUsername: string;
    getCloneCode(username: string): Uint8Array | null;
    saveCloneCode(username: string, cloneCode: Uint8Array): void;
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

export interface AuthUI {
    getTwoFactorCode(errorMessage?: string): Promise<string>;
    displayDialog(): Promise<boolean>;
}

export interface AuthUI3 {
    getDeviceVerificationCode(): Promise<string>;
    getDeviceVerificationMethod(): Promise<DeviceVerificationMethods>;
    getPassword?(): Promise<string>;
    getTwoFactorCode(verifyMethod?: DeviceVerificationMethods.SMS | DeviceVerificationMethods.TFACode): Promise<TwoFactorInput>;
    getTwoFactorExpiration(): Promise<TwoFactorExpiration>;
    redirectCallback?(url: string): void;
}

export type TwoFactorInput = {
    twoFactorCode: string
    desiredExpiration: TwoFactorExpiration
}

export enum DeviceVerificationMethods {
    Email,
    KeeperPush,
    SMS,
    TFACode,
    TFAPush,
}

export type LoginError = {
    error: string;
    message: string;
}

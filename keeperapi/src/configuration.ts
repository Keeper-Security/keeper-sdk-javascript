import {KeeperEnvironment} from "./endpoint";
import {Authentication} from './proto';
import TwoFactorExpiration = Authentication.TwoFactorExpiration;
import TwoFactorPushType = Authentication.TwoFactorPushType;
import TwoFactorChannelType = Authentication.TwoFactorChannelType;

export type KeeperHost = KeeperEnvironment | string

export interface ClientConfiguration {
    authUI?: AuthUI
    authUI3?: AuthUI3
    clientVersion?: string
    cloneConfig?: boolean
    deviceConfig?: DeviceConfig // v15+ device config
    deviceToken?: Uint8Array // pre - v15 device token
    host: KeeperHost
    onCommandFailure?: (error: KeeperError) => void,
    onDeviceConfig?: (deviceConfig: DeviceConfig, host: KeeperHost) => void // event to store device config
    onDeviceToken?: (deviceToken: Uint8Array) => void  // event to store device token
    onRegionChanged?: (newRegion: string) => void,
    sessionStorage?: SessionStorage
    useSessionResumption?: boolean
}
export interface ClientConfigurationInternal extends ClientConfiguration {
    deviceConfig: DeviceConfig // v15+ device config
}

export type KeeperError = {
    additional_info: string
    error: string
    location: string
    message: string
    path: string
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
    waitForDeviceApproval(channels: DeviceApprovalChannel[]): Promise<boolean>
    waitForTwoFactorCode(channels: TwoFactorChannelData[]): Promise<boolean>
    getPassword?(): Promise<string>;
    redirectCallback?(url: string): void;
}

export type TwoFactorInput = {
    twoFactorCode: string
    desiredExpiration: TwoFactorExpiration
}

export enum DeviceVerificationMethods {
    Email,
    KeeperPush,
    TFA,
}

export type DeviceApprovalChannel = {
    channel: DeviceVerificationMethods
    sendPush: () => Promise<void>
    sendCode?: (code: string) => Promise<void>
    setExpiration?: (expiration: TwoFactorExpiration) => void
}

export type TwoFactorChannelData = {
    availablePushes?: TwoFactorPushType[],
    channel: TwoFactorChannelType
    name: string,
    sendPush?: (type: TwoFactorPushType) => void
    sendCode: (code: string) => void
    setExpiration: (expiration: TwoFactorExpiration) => void
}

export type LoginError = {
    error: string;
    message: string;
}

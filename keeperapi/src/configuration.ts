import {KeeperEnvironment} from "./endpoint";
import {Authentication} from './proto';
import TwoFactorExpiration = Authentication.TwoFactorExpiration;
import TwoFactorPushType = Authentication.TwoFactorPushType;
import TwoFactorChannelType = Authentication.TwoFactorChannelType;
import {KeyWrapper} from './platform';
import {SessionParams} from "./auth";

export type KeeperHost = KeeperEnvironment | string

export interface ClientConfiguration {
    authUI?: AuthUI
    authUI3?: AuthUI3
    clientVersion?: string
    deviceConfig?: DeviceConfig // v15+ device config
    deviceToken?: Uint8Array // pre - v15 device token
    host: KeeperHost,
    locale?: string
    onCommandFailure?: (error: KeeperError) => void,
    onDeviceConfig?: (deviceConfig: DeviceConfig, host: KeeperHost) => Promise<void> // event to store device config
    onDeviceToken?: (deviceToken: Uint8Array) => void  // event to store device token
    onRegionChanged?: (newRegion: string) => Promise<void>,
    onDeviceVerified?: (isDeviceVerified: boolean) => void
    sessionStorage?: SessionStorage
    kvs?: KeyValueStorage;
    useSessionResumption?: boolean
    iterations?: number
    salt?: Uint8Array
}
export interface ClientConfigurationInternal extends ClientConfiguration {
    deviceConfig: DeviceConfig // v15+ device config
}

export type KeeperError = {
    additional_info?: string
    error?: string
    location?: string
    message?: string
    path?: string
    result_code?: string
    key_id?: number
    region_host?: string
}

export interface DeviceConfig {
    deviceName?: string
    deviceToken?: Uint8Array
    privateKey?: Uint8Array
    publicKey?: Uint8Array
    transmissionKeyId?: number
}

export interface SessionStorage {
    lastUsername?: string;
    getCloneCode(host: KeeperEnvironment, username: string): Promise<Uint8Array | null>;
    saveCloneCode(host: KeeperEnvironment, username: string, cloneCode: Uint8Array): Promise<void>;
    getSessionParameters(): Promise<SessionParams | null>;
    /**
     * Important: implementation of this function should retain these values in memory only, never to disk.
     */
    saveSessionParameters(sessionParams: Partial<SessionParams>): Promise<void>;
}

export interface KeyValueStorage {
    getValue(key: string): string | null;
    saveValue(key: string, value: string): void;
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
    waitForDeviceApproval(channels: DeviceApprovalChannel[], isCloud: boolean): Promise<boolean>
    waitForTwoFactorCode(channels: TwoFactorChannelData[], cancel: Promise<void>): Promise<boolean>
    getPassword?(isAlternate: boolean): Promise<string | KeyWrapper>
    getSSOToken?(redirectUrl: string): Promise<Uint8Array>
    redirectCallback?(url: string): Promise<void>
    ssoLogin?(url: string): Promise<any>
    idpLogout?(url: string): Promise<void>
}

export type TwoFactorInput = {
    twoFactorCode: string
    desiredExpiration: TwoFactorExpiration
}

export enum DeviceVerificationMethods {
    Email,
    KeeperPush,
    TFA,
    AdminApproval,
}

export type DeviceApprovalChannel = {
    channel: DeviceVerificationMethods
    sendApprovalRequest: () => Promise<void>
    validateCode?: (code: string) => Promise<void>
    setExpiration?: (expiration: TwoFactorExpiration) => void
}

export type TwoFactorChannelData = {
    availablePushes?: TwoFactorPushType[],
    channel: Authentication.ITwoFactorChannelInfo
    sendPush?: (type: TwoFactorPushType) => void
    sendCode: (code: string) => void
    setExpiration: (expiration: TwoFactorExpiration) => void
}

export type LoginError = {
    error: string;
    message: string;
}

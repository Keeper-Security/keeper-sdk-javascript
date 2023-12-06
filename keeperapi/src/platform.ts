import type {SocketProxy} from './socket'
import type {KeeperHttpResponse} from "./commands";
import type {CryptoWorkerPool, CryptoWorkerPoolConfig} from './cryptoWorker';

export interface Platform {
    keys: Uint8Array[];

    supportsConcurrency: boolean

    getRandomBytes(length: number): Uint8Array;

    bytesToBase64(data: Uint8Array): string;

    base64ToBytes(data: string): Uint8Array;

    bytesToString(data: Uint8Array): string;

    stringToBytes(data: string): Uint8Array;

    wrapPassword(password: Uint8Array): KeyWrapper;

    unWrapPassword(password: KeyWrapper): Uint8Array;

    importKey(keyId: string, key: Uint8Array, storage?: KeyStorage, canExport?: boolean): Promise<void>

    importKeyEC(keyId: string, privateKey: Uint8Array, publicKey: Uint8Array, storage?: KeyStorage, canExport?: boolean): Promise<void>

    // RSA TAGGED - header
    importKeyRSA(keyId: string, key: Uint8Array, storage?: KeyStorage, canExport?: boolean): Promise<void>

    unloadKeys(): void

    unwrapKey(key: Uint8Array, keyId: string, unwrappingKeyId: string, encryptionType: EncryptionType, unwrappedType: UnwrappedKeyType, storage?: KeyStorage, canExport?: boolean): Promise<void>

    unwrapKeys(keys: UnwrapKeyMap, storage?: KeyStorage): Promise<void>

    decrypt(data: Uint8Array, keyId: string, encryptionType: EncryptionType, storage?: KeyStorage): Promise<Uint8Array>

    // RSA TAGGED - header
    generateRSAKeyPair(): Promise<{privateKey: Uint8Array; publicKey: Uint8Array}>

    generateECKeyPair(): Promise<{privateKey: Uint8Array; publicKey: Uint8Array}>

    publicEncryptECWithHKDF(message: string | Uint8Array, pubKey: Uint8Array, id: Uint8Array): Promise<Uint8Array>

    publicEncrypt(data: Uint8Array, key: string): Uint8Array;

    publicEncryptEC(data: Uint8Array, key: Uint8Array, id?: Uint8Array): Promise<Uint8Array>

    privateDecrypt(data: Uint8Array, key: Uint8Array): Uint8Array;

    privateDecryptEC(data: Uint8Array, privateKey: Uint8Array, publicKey?: Uint8Array, id?: Uint8Array, useHKDF?: boolean): Promise<Uint8Array>

    privateSign(data: Uint8Array, key: string): Promise<Uint8Array>;

    wrapKey(keyId: string, wrappingKeyId: string, encryptionType: EncryptionType, storage?: KeyStorage): Promise<Uint8Array>

    encrypt(data: Uint8Array, keyId: string, encryptionType: EncryptionType, storage?: KeyStorage): Promise<Uint8Array>

    aesGcmEncrypt(data: Uint8Array, key: Uint8Array): Promise<Uint8Array>;

    aesGcmDecrypt(data: Uint8Array, key: Uint8Array): Promise<Uint8Array>;

    aesCbcEncrypt(data: Uint8Array, key: Uint8Array, usePadding: boolean): Promise<Uint8Array>;

    aesCbcDecrypt(data: Uint8Array, key: Uint8Array, usePadding: boolean): Promise<Uint8Array>;

    deriveKey(password: KeyWrapper, saltBytes: Uint8Array, iterations: number): Promise<Uint8Array>;

    deriveKeyV2(domain: string, password: KeyWrapper, saltBytes: Uint8Array, iterations: number): Promise<Uint8Array>;

    calcAuthVerifier(key: Uint8Array): Promise<Uint8Array>;

    get(url: string, headers: any): Promise<KeeperHttpResponse>;

    post(url: string, request: Uint8Array, headers?: any): Promise<KeeperHttpResponse>;

    fileUpload(url: string, uploadParameters: any, data: Uint8Array | Blob): Promise<any>

    createCryptoWorker(keyStorage: KeyStorage, options: CryptoWorkerOptions): Promise<CryptoWorkerPool | null>

    closeCryptoWorker(): Promise<void>

    createWebsocket(url: string): SocketProxy

    log(message: string, options: LogOptions): void;
}

export interface CryptoTask {
    data: Uint8Array,
    dataId: string,
    keyId: string,
    encryptionType: EncryptionType,
}

export interface UnwrapKey extends CryptoTask {
    unwrappedType: UnwrappedKeyType,
}

export type UnwrapKeyMap = Record<string, UnwrapKey>

export type CryptoWorkerOptions = Partial<CryptoWorkerPoolConfig>

export class KeyWrapper {
    private key: any

    static create(key: Uint8Array | any): KeyWrapper {
        const wrapper = new KeyWrapper()
        wrapper.key = key
        return wrapper
    }

    public getKey() {
        return this.key
    }
}

export type UnwrappedKeyType = 'aes' | 'rsa'

export type EncryptionType = 'cbc' | 'gcm' | 'rsa' | 'ecc'

export type KeyStorage = {
    getKeyBytes(keyId: string): Promise<Uint8Array | undefined>
    saveKeyBytes(keyId: string, key: Uint8Array): Promise<void>
    getObject?<T>(key: string): Promise<T | undefined>
    saveObject?<T>(key: string, value: T): Promise<void>
}
export type LogOptions = 'default' | 'noCR' | 'CR'

export function connectPlatform(p: Platform) {
    platform = p;
}

export let platform: Platform;

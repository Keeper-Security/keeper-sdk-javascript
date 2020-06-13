import {KeeperHttpResponse} from "./commands";

export interface Platform {
    keys: string[];

    getRandomBytes(length: number): Uint8Array;

    bytesToBase64(data: Uint8Array): string;

    base64ToBytes(data: string): Uint8Array;

    bytesToString(data: Uint8Array): string;

    stringToBytes(data: string): Uint8Array;

    generateRSAKeyPair(): Promise<{privateKey: Uint8Array; publicKey: Uint8Array}>

    publicEncrypt(data: Uint8Array, key: string): Uint8Array;

    privateDecrypt(data: Uint8Array, key: Uint8Array): Uint8Array;

    privateSign(data: Uint8Array, key: string): Promise<Uint8Array>;

    aesGcmEncrypt(data: Uint8Array, key: Uint8Array): Promise<Uint8Array>;

    aesGcmDecrypt(data: Uint8Array, key: Uint8Array): Promise<Uint8Array>;

    aesCbcEncrypt(data: Uint8Array, key: Uint8Array, usePadding: boolean): Uint8Array;

    aesCbcDecrypt(data: Uint8Array, key: Uint8Array, usePadding: boolean): Uint8Array;

    deriveKey(password: string, saltBytes: Uint8Array, iterations: number): Promise<Uint8Array>;

    authVerifierAsString(key: Uint8Array): Promise<string>;

    authVerifierAsBytes(key: Uint8Array): Promise<Uint8Array>;

    get(url: string, headers: any): Promise<KeeperHttpResponse>;

    post(url: string, request: Uint8Array, headers?: any): Promise<KeeperHttpResponse>;

    postForm(url: string, request: Uint8Array, headers?: any, formParams?: any): Promise<KeeperHttpResponse>;

    fileUpload(url: string, uploadParameters: any, data: Uint8Array): Promise<any>
}

export function connectPlatform(p: Platform) {
    platform = p;
}

export let platform: Platform;

export interface Platform {
    keys: string[];

    getRandomBytes(length: number): Uint8Array;

    bytesToBase64(data: Uint8Array): string;

    base64ToBytes(data: string): Uint8Array;

    bytesToString(data: Uint8Array): string;

    publicEncrypt(data: Uint8Array, key: string): Uint8Array;

    aesGcmEncrypt(data: Uint8Array, key: Uint8Array): Promise<Uint8Array>;

    aesGcmDecrypt(data: Uint8Array, key: Uint8Array): Promise<Uint8Array>;

    aesCbcEncrypt(data: Uint8Array, key: Uint8Array, usePadding: boolean): Uint8Array;

    aesCbcDecrypt(data: Uint8Array, key: Uint8Array, usePadding: boolean): Uint8Array;

    deriveKey(password: string, saltBytes: Uint8Array, iterations: number): Promise<Uint8Array>;

    calcAutoResponse(key: Uint8Array): Promise<string>;

    get(url: string, headers: any): Promise<Uint8Array>;

    post(url: string, request: Uint8Array, headers?: any): Promise<Uint8Array>;
}

export function connectPlatform(p: Platform) {
    platform = p;
}

export let platform: Platform;

import {platform} from "./platform";

export function webSafe64(source: string): string {
    return source.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function webSafe64FromBytes(source: Uint8Array): string {
    return webSafe64(platform.bytesToBase64(source));
}

export function normal64(source: string): string {
    return source.replace(/-/g, '+').replace(/_/g, '/') + '=='.substring(0, (3 * source.length) % 4);
}

export function normal64Bytes(source: string): Uint8Array {
    return platform.base64ToBytes(normal64(source));
}

export function isTwoFactorResultCode(resultCode: string): boolean {
    return ["need_totp", "invalid_device_token", "invalid_totp"].includes(resultCode);
}

export function generateEncryptionKey(): Uint8Array {
    return platform.getRandomBytes(32);
}

export function generateUidBytes(): Uint8Array {
    return platform.getRandomBytes(16);
}

export function generateUid(): string {
    return webSafe64FromBytes(generateUidBytes());
}

export async function encryptKey(key: Uint8Array, withKey: Uint8Array): Promise<string> {
    let encryptedKey = await platform.aesGcmEncrypt(key, withKey);
    return webSafe64FromBytes(encryptedKey);
}

export function shareKey(key: Uint8Array, publicKey: string): string {
    let encryptedKey = platform.publicEncrypt(key, publicKey);
    return webSafe64FromBytes(encryptedKey);
}

export async function decryptKey(encryptedKey: string, withKey: Uint8Array): Promise<Uint8Array> {
    return platform.aesGcmDecrypt(normal64Bytes(encryptedKey), withKey);
}

export function encryptForStorage(data: Uint8Array, key: Uint8Array): string {
    return webSafe64FromBytes(platform.aesCbcEncrypt(data, key, true));
}

export function decryptFromStorage(data: string, key: Uint8Array): Uint8Array {
    return platform.aesCbcDecrypt(normal64Bytes(data), key, true);
}

export async function decryptFromStorageGcm(data: string, key: Uint8Array): Promise<Uint8Array> {
    return platform.aesGcmDecrypt(normal64Bytes(data), key);
}

export function encryptObjectForStorage<T>(obj: T, key: Uint8Array): string {
    let s = JSON.stringify(obj);
    let bytes = platform.stringToBytes(s);
    return encryptForStorage(bytes, key);
}

export function encryptObjectForStorageAsBytes<T>(obj: T, key: Uint8Array): Uint8Array {
    let s = JSON.stringify(obj);
    let bytes = platform.stringToBytes(s);
    return platform.aesCbcEncrypt(bytes, key, true)
}

export function decryptObjectFromStorage<T>(data: string, key: Uint8Array): T {
    try {
        let decrypted = decryptFromStorage(data, key);
        return JSON.parse(platform.bytesToString(decrypted));
    }
    catch (e) {
        console.log(`Unable to decrypt ${data}`);
        return {} as T
    }
}

export async function encryptObjectForStorageGCM<T>(obj: T, key: Uint8Array, usePadding: boolean = true): Promise<Uint8Array> {
    let bytes = platform.stringToBytes(JSON.stringify(obj));
    if (usePadding) {
        const paddedSize = Math.ceil(Math.max(384, bytes.length) / 16) * 16
        bytes = Uint8Array.of(...bytes, ...Array(paddedSize - bytes.length).fill(0x20))
    }
    return platform.aesGcmEncrypt(bytes, key)
}



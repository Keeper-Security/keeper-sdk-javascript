import {platform} from "./platform";

export function webSafe64(source: string) {
    return source.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function normal64(source: string) {
    return source.replace(/-/g, '+').replace(/_/g, '/') + '=='.substring(0, (3 * source.length) % 4);
}

export function isTwoFactorResultCode(resultCode: string): boolean {
    return ["need_totp", "invalid_device_token", "invalid_totp"].includes(resultCode);
}

export function generateEncryptionKey(): Uint8Array {
    return platform.getRandomBytes(32);
}

export function generateUid(): string {
    return webSafe64(platform.bytesToBase64(platform.getRandomBytes(16)));
}

export async function encryptKey(key: Uint8Array, withKey: Uint8Array): Promise<string> {
    let encryptedKey = await platform.aesGcmEncrypt(key, withKey);
    return webSafe64(platform.bytesToBase64(encryptedKey));
}

export async function decryptKey(encryptedKey: string, withKey: Uint8Array): Promise<Uint8Array> {
    return platform.aesGcmDecrypt(platform.base64ToBytes(normal64(encryptedKey)), withKey);
}

export function encryptForStorage(data: Uint8Array, key: Uint8Array): string {
    return webSafe64(platform.bytesToBase64(platform.aesCbcEncrypt(data, key, true)));
}

export function decryptFromStorage(data: string, key: Uint8Array): Uint8Array {
    return platform.aesCbcDecrypt(platform.base64ToBytes(normal64(data)), key, true);
}

export function encryptObjectForStorage<T>(obj: T, key: Uint8Array): string {
    let s = JSON.stringify(obj);
    let bytes = platform.stringToBytes(s);
    return encryptForStorage(bytes, key);
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


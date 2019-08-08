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

export function encryptForStorage(data: Uint8Array, key: Uint8Array): string {
    return webSafe64(platform.bytesToBase64(platform.aesCbcEncrypt(data, key, true)));
}

import {KeyWrapper, LogOptions, platform} from "./platform";
import type {KeeperHost, TransmissionKey} from './configuration';

export const log = (message: string, options: LogOptions = 'default') => {
    platform.log(message, options)
}

export const formatTimeDiff = (timeDiff: Date): string => {
    const minutes = timeDiff.getMinutes()
    const seconds = timeDiff.getSeconds().toString().padStart(2, '0')
    const milliseconds = timeDiff.getMilliseconds()
    return minutes > 0
        ? `${minutes.toString().padStart(2, '0')}:${seconds}.${milliseconds}`
        : `${seconds}.${milliseconds}`
}

export function getKeeperUrl(host: KeeperHost, forPath: string) {
    return `https://${host}/api/rest/${forPath}`;
}

export function getKeeperSAMLUrl(host: KeeperHost, forPath: string, serviceProviderId?: number) {
    if (serviceProviderId) {
        return getKeeperUrl(host, `sso/saml/${forPath}/${serviceProviderId}`);
    } else {
        return getKeeperUrl(host, `sso/saml/${forPath}`);
    }
}

export function getKeeperSsoConfigUrl(host: KeeperHost, forPath: string, serviceProviderId?: number) {
    if (serviceProviderId) {
        return getKeeperUrl(host, `sso/config/${forPath}/${serviceProviderId}`);
    } else {
        return getKeeperUrl(host, `sso/config/${forPath}`);
    }
}

export function getKeeperAutomatorAdminUrl(host: KeeperHost, forPath: string, automatorId?: number) {
    if (automatorId) {
        return getKeeperUrl(host, `automator/${forPath}/${automatorId}`);
    } else {
        return getKeeperUrl(host, `automator/${forPath}`);
    }
}

export async function generateTransmissionKey(keyNumber: number): Promise<TransmissionKey> {
    const transmissionKey = platform.getRandomBytes(32)
    return {
        publicKeyId: keyNumber,
        key: transmissionKey,
        encryptedKey: await platform.publicEncryptEC(transmissionKey, platform.keys[keyNumber - 1])
    }
}

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

export function wrapPassword(key: string | Uint8Array): KeyWrapper {
    if (typeof key === 'string') {
        return platform.wrapPassword(platform.stringToBytes(key))
    }
    if (key instanceof Uint8Array) {
        return platform.wrapPassword(key)
    }
    throw new Error('Error wrapping the password')
}

export async function encryptKey(key: Uint8Array, withKey: Uint8Array): Promise<string> {
    let encryptedKey = await platform.aesGcmEncrypt(key, withKey);
    return webSafe64FromBytes(encryptedKey);
}

export function shareKey(key: Uint8Array, publicKey: string): string {
    let encryptedKey = platform.publicEncrypt(key, publicKey);
    return webSafe64FromBytes(encryptedKey);
}

export async function shareKeyEC(key: Uint8Array, publicKey: Uint8Array): Promise<string> {
    let encryptedKey = await platform.publicEncryptEC(key, publicKey);
    return webSafe64FromBytes(encryptedKey);
}

export async function decryptKey(encryptedKey: string, withKey: Uint8Array): Promise<Uint8Array> {
    return platform.aesGcmDecrypt(normal64Bytes(encryptedKey), withKey);
}

export async function encryptForStorage(data: Uint8Array, key: Uint8Array): Promise<string> {
    return webSafe64FromBytes(await platform.aesCbcEncrypt(data, key, true));
}

export async function decryptFromStorage(data: string, key: Uint8Array): Promise<Uint8Array> {
    return await platform.aesCbcDecrypt(normal64Bytes(data), key, true);
}

export async function decryptFromStorageGcm(data: string, key: Uint8Array): Promise<Uint8Array> {
    return platform.aesGcmDecrypt(normal64Bytes(data), key);
}

export async function encryptObjectForStorage<T>(obj: T, key: Uint8Array): Promise<string> {
    let s = JSON.stringify(obj);
    let bytes = platform.stringToBytes(s);
    return encryptForStorage(bytes, key);
}

export async function encryptObjectForStorageAsBytes<T>(obj: T, key: Uint8Array): Promise<Uint8Array> {
    let s = JSON.stringify(obj);
    let bytes = platform.stringToBytes(s);
    return platform.aesCbcEncrypt(bytes, key, true)
}

export async function decryptObjectFromStorage<T>(data: string, key: Uint8Array): Promise<T> {
    try {
        let decrypted = await decryptFromStorage(data, key);
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

export function resolvablePromise(): { promise: Promise<void>, resolve: () => void } {
    let resolver
    const promise = new Promise<void>((resolve) => {
        resolver = resolve
    })
    return {
        promise: promise,
        resolve: resolver
    }
}

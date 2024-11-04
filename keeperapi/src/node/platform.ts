import * as crypto from "crypto";
import {createECDH, hkdfSync} from "crypto";
import * as https from "https";
import * as FormData from "form-data"
import NodeRSA from 'node-rsa';
import * as WebSocket from 'faye-websocket'

import {
    EncryptionType,
    KeyStorage,
    KeyWrapper,
    LogOptions,
    Platform,
    UnwrapKeyMap,
    UnwrappedKeyType
} from "../platform";
import {RSA_PKCS1_PADDING} from "constants";
import {getKeeperKeys} from "../transmissionKeys";
import {SocketProxy, socketSendMessage} from '../socket'
import {normal64} from "../utils";
import type {KeeperHttpResponse} from "../commands";

const base64ToBytes = (data: string): Uint8Array => {
    return Buffer.from(data, "base64");
}

export const nodePlatform: Platform = class {
    // Unimplemented in NodeJS, worker threads did not appear to improve performance 
    static supportsConcurrency: boolean = false

    static base64ToBytes = base64ToBytes

    static normal64Bytes(source: string): Uint8Array {
        return base64ToBytes(normal64(source));
    }
    
    static keys = getKeeperKeys(this.normal64Bytes);
    
    static getRandomBytes(length: number): Uint8Array {
        return crypto.randomBytes(length);
    }

    static bytesToBase64(data: Uint8Array): string {
        return Buffer.from(data).toString("base64");
    }    

    static bytesToString(data: Uint8Array): string {
        return Buffer.from(data).toString();
    }

    static stringToBytes(data: string): Uint8Array {
        return Buffer.from(data);
    }

    static wrapPassword(password: Uint8Array): KeyWrapper {
        return KeyWrapper.create(password)
    }

    static unWrapPassword(password: KeyWrapper): Uint8Array {
        return password.getKey()
    }

    static async importKey(keyId: string, key: Uint8Array, storage?: KeyStorage): Promise<void> {
        keyCache[keyId] = key
        if (storage) {
            await storage.saveKeyBytes(keyId, key)
        }
    }

    static async importKeyEC(keyId: string, privateKey: Uint8Array, _publicKey: Uint8Array, storage?: KeyStorage): Promise<void> {
        this.importKey(keyId, privateKey, storage)
    }

    static async importKeyRSA(keyId: string, key: Uint8Array, storage?: KeyStorage): Promise<void> {
        this.importKey(keyId, key, storage)
    }

    static unloadKeys() {
        keyCache = {}
    }

    static async unwrapKeys(keys: UnwrapKeyMap, storage?: KeyStorage): Promise<void> {
        for (const task of Object.values(keys)) {
            try {
                await this.unwrapKey(task.data, task.dataId, task.keyId, task.encryptionType, task.unwrappedType, storage)
            } catch (e: any) {
                console.error(`The key ${task.dataId} cannot be decrypted (${e.message})`)
            }
        }
    }

    static async unwrapKey(key: Uint8Array, keyId: string, unwrappingKeyId: string, encryptionType: EncryptionType, keyType: UnwrappedKeyType, storage?: KeyStorage): Promise<void> {
        const unwrappingKey = await loadKey(unwrappingKeyId, storage)
        let unwrappedKey
        switch (encryptionType) {
            case 'cbc':
                unwrappedKey = await nodePlatform.aesCbcDecrypt(key, unwrappingKey, true)
                break;
            case 'gcm':
                unwrappedKey = await nodePlatform.aesGcmDecrypt(key, unwrappingKey)
                break;
            case 'rsa':
                unwrappedKey = await nodePlatform.privateDecrypt(key, unwrappingKey)
                break;
            case 'ecc':
                unwrappedKey = await nodePlatform.privateDecryptEC(key, unwrappingKey)
                break;
            default:
                throw Error('Unknown key encryption type: ' + encryptionType)
        }
        keyCache[keyId] = unwrappedKey
        if (storage) {
            await storage.saveKeyBytes(keyId, unwrappedKey)
        }
    }

    static async decrypt(data: Uint8Array, keyId: string, encryptionType: EncryptionType, storage?: KeyStorage): Promise<Uint8Array> {
        const key = await loadKey(keyId, storage)
        if (!key) {
            throw Error(`The key ${keyId} is missing`)
        }
        let decrypted
        switch (encryptionType) {
            case 'cbc':
                decrypted = await nodePlatform.aesCbcDecrypt(data, key, true)
                break;
            case 'gcm':
                decrypted = await nodePlatform.aesGcmDecrypt(data, key)
                break;
            case 'rsa':
                decrypted = await nodePlatform.privateDecrypt(data, key)
                break;
            case 'ecc':
                decrypted = await nodePlatform.privateDecryptEC(data, key)
                break;
            default:
                throw Error('Unknown encryption type: ' + encryptionType)
        }
        return decrypted
    }

    static async generateRSAKeyPair(): Promise<{ privateKey: Uint8Array; publicKey: Uint8Array}> {
        const rsaKeys = new NodeRSA({b: 2048});
        const rsaPublicKey: Buffer = rsaKeys.exportKey('public-der');
        const rsaPrivateKey: Buffer = rsaKeys.exportKey('private-der');
        return Promise.resolve({
            privateKey: rsaPrivateKey,
            publicKey: rsaPublicKey
        })
    }

    static async generateECKeyPair(): Promise<{ privateKey: Uint8Array; publicKey: Uint8Array }> {
        const ecdh = createECDH('prime256v1')
        ecdh.generateKeys()
        return Promise.resolve({
            privateKey: ecdh.getPrivateKey(),
            publicKey: ecdh.getPublicKey()
        })
    }

    static async publicEncryptECWithHKDF(message: string | Uint8Array, pubKey: Uint8Array, id: Uint8Array): Promise<Uint8Array> {
        const messageBytes = typeof message === "string" ? this.stringToBytes(message) : message
        return await this.mainPublicEncryptEC(messageBytes, pubKey, id, true)
    }

    static async encrypt(data: Uint8Array, keyId: string, encryptionType: EncryptionType, storage?: KeyStorage): Promise<Uint8Array> {
        const key = await loadKey(keyId, storage)
        if (!key) {
            throw Error(`The key ${keyId} is missing`)
        }
        let encrypted: Uint8Array
        switch (encryptionType) {
            case 'cbc':
                encrypted = await nodePlatform.aesCbcEncrypt(data, key, true)
                break;
            case 'gcm':
                encrypted = await nodePlatform.aesGcmEncrypt(data, key)
                break;
            case 'rsa':
                encrypted = nodePlatform.publicEncrypt(data, this.bytesToBase64(key))
                break;
            case 'ecc':
                encrypted = await nodePlatform.publicEncryptEC(data, key)
                break;
            default:
                throw Error('Unknown encryption type: ' + encryptionType)
        }
        return encrypted
    }

    static async wrapKey(keyId: string, wrappingKeyId: string, encryptionType: EncryptionType, storage?: KeyStorage): Promise<Uint8Array> {
        const key = await loadKey(keyId, storage)
        return this.encrypt(key, wrappingKeyId, encryptionType, storage)
    }


    static publicEncrypt(data: Uint8Array, key: string): Uint8Array {
        let publicKey = key[0] === '-'  // PEM or DER?
            ? key
            : crypto.createPublicKey({
                key: Buffer.from(key, 'base64'),
                type: 'pkcs1',
                format: 'der'
            })
        return crypto.publicEncrypt({
            key: publicKey,
            padding: RSA_PKCS1_PADDING
        }, data)
    }

    static async mainPublicEncryptEC(data: Uint8Array, key: Uint8Array, id?: Uint8Array, useHKDF?: boolean): Promise<Uint8Array> {
        const ecdh = createECDH('prime256v1')
        ecdh.generateKeys()
        const ephemeralPublicKey = ecdh.getPublicKey()
        const sharedSecret = ecdh.computeSecret(key)
        const sharedSecretCombined = Buffer.concat([sharedSecret, id || new Uint8Array()])
        const symmetricKey = !useHKDF ? crypto.createHash("SHA256").update(sharedSecretCombined).digest() : Buffer.from(hkdfSync('sha256', sharedSecret, new Uint8Array(), id ?? Buffer.from([]), 32))
        const encryptedData = await this.aesGcmEncrypt(data, symmetricKey)
        return Buffer.concat([ephemeralPublicKey, encryptedData])
    }

    static async publicEncryptEC(data: Uint8Array, key: Uint8Array, id?: Uint8Array): Promise<Uint8Array> {
        return await this.mainPublicEncryptEC(data, key, id)
    }

    static privateDecrypt(data: Uint8Array, key: Uint8Array): Uint8Array {
        return crypto.privateDecrypt({
            key: crypto.createPrivateKey({
                key: Buffer.from(key),
                type: 'pkcs1',
                format: 'der',
            }),
            padding: RSA_PKCS1_PADDING
        }, data);
    }

    static async privateDecryptEC(data: Uint8Array, privateKey: Uint8Array, publicKey?: Uint8Array, id?: Uint8Array, useHKDF?: boolean): Promise<Uint8Array> {
        const ecdh = createECDH('prime256v1')
        ecdh.setPrivateKey(privateKey)
        const publicKeyLength = 65
        const ephemeralPublicKey = data.slice(0, publicKeyLength)
        const sharedSecret = ecdh.computeSecret(ephemeralPublicKey)
        const sharedSecretCombined = Buffer.concat([sharedSecret, id || new Uint8Array()])
        const symmetricKey = !useHKDF ? crypto.createHash("SHA256").update(sharedSecretCombined).digest() : Buffer.from(hkdfSync('sha256', sharedSecret, new Uint8Array(), id ?? Buffer.from([]), 32))
        const encryptedData = data.slice(publicKeyLength)
        return await this.aesGcmDecrypt(encryptedData, symmetricKey)
    }

    static privateSign(data: Uint8Array, key: string): Promise<Uint8Array> {
        return Promise.resolve(crypto
            .createSign("SHA256")
            .update(data)
            .sign(key));
    }

    static aesGcmEncrypt(data: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        let iv = crypto.randomBytes(12);
        let cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
        let encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        const tag = cipher.getAuthTag();
        let result = Buffer.concat([iv, encrypted, tag]);
        return Promise.resolve(result);
    }

    static aesGcmDecrypt(data: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        let iv = data.subarray(0, 12);
        let encrypted = data.subarray(12, data.length - 16);
        let tag = data.subarray(data.length - 16);
        let cipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
        cipher.setAuthTag(tag);
        return Promise.resolve(Buffer.concat([cipher.update(encrypted), cipher.final()]));
    }

    static async aesCbcEncrypt(data: Uint8Array, key: Uint8Array, usePadding: boolean): Promise<Uint8Array> {
        let iv = crypto.randomBytes(16);
        let cipher = crypto
            .createCipheriv("aes-256-cbc", key, iv)
            .setAutoPadding(usePadding);
        let encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        return Buffer.concat([iv, encrypted]);
    }

    static async aesCbcDecrypt(data: Uint8Array, key: Uint8Array, usePadding: boolean): Promise<Uint8Array> {
        let iv = data.subarray(0, 16);
        let encrypted = data.subarray(16);
        let cipher = crypto
            .createDecipheriv("aes-256-cbc", key, iv)
            .setAutoPadding(usePadding);
        return Buffer.concat([cipher.update(encrypted), cipher.final()]);
    }

    static deriveKey(password: KeyWrapper, saltBytes: Uint8Array, iterations: number): Promise<Uint8Array> {
        return Promise.resolve(crypto.pbkdf2Sync(password.getKey(), saltBytes, iterations, 32, 'SHA256'));
    }

    static deriveKeyV2(domain: string, password: KeyWrapper, saltBytes: Uint8Array, iterations: number): Promise<Uint8Array> {
        const bytes = crypto.pbkdf2Sync(Buffer.of(...Buffer.from(domain), ...nodePlatform.unWrapPassword(password)), saltBytes, iterations, 64, 'SHA512')
        const reducedBytes = crypto.createHmac("SHA256", bytes).update(Buffer.from(domain)).digest()
        return Promise.resolve(reducedBytes);
    }

    static calcAuthVerifier(key: Uint8Array): Promise<Uint8Array> {
        return Promise.resolve(crypto.createHash("SHA256").update(key).digest());
    }

    static get(
      url: string,
      headers?: {[key: string]: string}
    ): Promise<KeeperHttpResponse> {
        return new Promise<KeeperHttpResponse>((resolve, reject) => {
            let get = https.request(url, {
                method: "get",
                headers: {
                    "User-Agent": `Node/${process.version}`,
                    ...headers
                }
            }, (res) => {
                this.fetchData(res, resolve);
            });
            get.on('error', reject)
            get.end();
        })
    }

    static post(
      url: string,
      request: Uint8Array | string,
      headers?: {[key: string]: string}
    ): Promise<KeeperHttpResponse> {
        return new Promise<KeeperHttpResponse>((resolve, reject) => {
            let post = https.request(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/octet-stream",
                    "Content-Length": request.length,
                    "User-Agent": `Node/${process.version}`,
                    ...headers,
                },
            }, (res) => {
                this.fetchData(res, resolve)
            });
            post.on('error', reject)
            post.write(request);
            post.end();
        })
    }

    static fileUpload(
      url: string,
      uploadParameters: {[key: string]: string},
      data: Uint8Array
    ): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const form = new FormData()

            for (const key in uploadParameters) {
                form.append(key, uploadParameters[key]);
            }
            form.append('file', data)

            let post = https.request(url, {
                method: "post",
                headers: form.getHeaders()
            });
            form.pipe(post)
            post.on('error', reject)
            post.on('response', function (res: any) {
                resolve({
                    headers: res.headers,
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage
                })
            })
        })
    }

    private static fetchData(res, resolve) {
        let retVal = {
            statusCode: res.statusCode,
            headers: res.headers,
            data: null
        };
        res.on("data", data => {
            retVal.data = retVal.data
                ? Buffer.concat([retVal.data, data])
                : data
        });
        res.on("end", () => {
            resolve(retVal);
        });
    }

    static createWebsocket(url: string): SocketProxy {
        const socket = new WebSocket.Client(url)
        let createdSocket;
        return createdSocket = {
            onOpen: (callback: () => void) => {
                socket.on('open', callback)
            },
            close: () => {
                socket.close()
            },
            onClose: (callback: (e:Event) => void) => {
                socket.on('close', callback)
            },
            onError: (callback: (err: Error) => void) => {
                socket.on('error', callback)
            },
            onMessage: (callback: (e: Uint8Array) => void) => {
                socket.on('message', (e: MessageEvent) => {
                    callback(e.data)
                })
            },
            send: (message => {
                socketSendMessage(message, socket, createdSocket)
            }),
            messageQueue: [],
        }
    }

    static async createCryptoWorker(): Promise<null> {
        return null
    }

    static async closeCryptoWorker(): Promise<void> {
        // do nothing
    }

    static log(message: string, options: LogOptions): void {
        switch (options) {
            case "default":
            case "CR":
                console.log(message)
                break;
            case "noCR":
                process.stdout.write(message)
                break;
        }
    }
}

let keyCache: Record<string, Uint8Array> = {}

const loadKey = async (keyId: string, storage?: KeyStorage): Promise<Uint8Array> => {
    const cachedKey = keyCache[keyId]
    if (cachedKey) {
        return cachedKey
    }
    const keyBytes = storage
        ? await storage.getKeyBytes(keyId)
        : undefined
    if (!keyBytes) {
        throw new Error(`Unable to load the key ${keyId}`)
    }
    keyCache[keyId] = keyBytes
    return keyBytes
}

import * as crypto from "crypto";
import {createECDH} from "crypto";
import * as https from "https";
import * as FormData from "form-data"
import * as NodeRSA from 'node-rsa';
import * as WebSocket from 'faye-websocket'

import {Platform} from "../platform";
import {RSA_PKCS1_PADDING} from "constants";
import {KeeperHttpResponse} from "../commands";
import {keeperKeys} from "../endpoint";
import {SocketProxy} from '../auth'

const open = require('open');

export const nodePlatform: Platform = class {
    static keys = keeperKeys.pem;

    static getRandomBytes(length: number): Uint8Array {
        return crypto.randomBytes(length);
    }

    static bytesToBase64(data: Uint8Array): string {
        return Buffer.from(data).toString("base64");
    }

    static base64ToBytes(data: string): Uint8Array {
        return Buffer.from(data, "base64");
    }

    static bytesToString(data: Uint8Array): string {
        return Buffer.from(data).toString();
    }

    static stringToBytes(data: string): Uint8Array {
        return Buffer.from(data);
    }

    /**
     * Returns the keys as Uint8Arrays.
     */
    static async generateRSAKeyPair(): Promise<{ privateKey: Uint8Array; publicKey: Uint8Array}> {
        throw "Not yet implemented";
    }

    /**
     * Returns the keys as an object created by the NodeRSA library.
     */
    static async generateRSAKeyPair2(): Promise<any> {
        return new NodeRSA({b: 2048});
    }

    static generateECKeyPair(): { privateKey: Uint8Array; publicKey: Uint8Array } {
        const ecdh = createECDH('prime256v1')
        ecdh.generateKeys()
        return {
            privateKey: ecdh.getPrivateKey(),
            publicKey: ecdh.getPublicKey()
        }
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

    static async publicEncryptEC(data: Uint8Array, key: Uint8Array, id?: Uint8Array): Promise<Uint8Array> {
        const ecdh = createECDH('prime256v1')
        ecdh.generateKeys()
        const ephemeralPublicKey = ecdh.getPublicKey()
        const sharedSecret = ecdh.computeSecret(key)
        const sharedSecretCombined = Buffer.concat([sharedSecret, id || new Uint8Array()])
        const symmetricKey = crypto.createHash("SHA256").update(sharedSecretCombined).digest()
        const encryptedData = await this.aesGcmEncrypt(data, symmetricKey)
        return Buffer.concat([ephemeralPublicKey, encryptedData])
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

    static async privateDecryptEC(data: Uint8Array, privateKey: Uint8Array, publicKey?: Uint8Array, id?: Uint8Array): Promise<Uint8Array> {
        const ecdh = createECDH('prime256v1')
        ecdh.setPrivateKey(privateKey)
        const publicKeyLength = 65
        const ephemeralPublicKey = data.slice(0, publicKeyLength)
        const sharedSecret = ecdh.computeSecret(ephemeralPublicKey)
        const sharedSecretCombined = Buffer.concat([sharedSecret, id || new Uint8Array()])
        const symmetricKey = crypto.createHash("SHA256").update(sharedSecretCombined).digest()
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

    static aesCbcEncrypt(data: Uint8Array, key: Uint8Array, usePadding: boolean): Uint8Array {
        let iv = crypto.randomBytes(16);
        let cipher = crypto
            .createCipheriv("aes-256-cbc", key, iv)
            .setAutoPadding(usePadding);
        let encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        return Buffer.concat([iv, encrypted]);
    }

    static aesCbcDecrypt(data: Uint8Array, key: Uint8Array, usePadding: boolean): Uint8Array {
        let iv = data.subarray(0, 16);
        let encrypted = data.subarray(16);
        let cipher = crypto
            .createDecipheriv("aes-256-cbc", key, iv)
            .setAutoPadding(usePadding);
        return Buffer.concat([cipher.update(encrypted), cipher.final()]);
    }

    static deriveKey(password: string, saltBytes: Uint8Array, iterations: number): Promise<Uint8Array> {
        return Promise.resolve(crypto.pbkdf2Sync(Buffer.from(password, "utf8"), saltBytes, iterations, 32, 'SHA256'));
    }

    static deriveKeyV2(domain: string, password: string, saltBytes: Uint8Array, iterations: number): Promise<Uint8Array> {
        const bytes = crypto.pbkdf2Sync(Buffer.from(domain + password, "utf8"), saltBytes, iterations, 32, 'SHA512')
        const reducedBytes = crypto.createHmac("SHA256", Buffer.from(domain)).update(bytes).digest()
        return Promise.resolve(reducedBytes);
    }

    static calcAuthVerifier(key: Uint8Array): Promise<Uint8Array> {
        return Promise.resolve(crypto.createHash("SHA256").update(key).digest());
    }

    static get(
      url: string,
      headers?: {[key: string]: string}
    ): Promise<KeeperHttpResponse> {
        return new Promise<KeeperHttpResponse>((resolve) => {
            let get = https.request(url, {
                method: "get",
                headers: {
                    "User-Agent": `Node/${process.version}`,
                    ...headers
                }
            }, (res) => {
                this.fetchData(res, resolve);
            });
            get.end();
        })
    }

    static post(
      url: string,
      request: Uint8Array | string,
      headers?: {[key: string]: string}
    ): Promise<KeeperHttpResponse> {
        return new Promise<KeeperHttpResponse>((resolve) => {
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
            post.write(request);
            post.end();
        })
    }

    static fileUpload(
      url: string,
      uploadParameters: {[key: string]: string},
      data: Uint8Array
    ): Promise<any> {
        return new Promise<any>((resolve) => {
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

        return {
            close: () => {
                socket.close()
            },
            onClose: (callback: () => void) => {
                socket.on('close', callback)
            },
            onError: (callback: (err: Error) => void) => {
                socket.on('error', callback)
            },
            onMessage: (callback: (e: MessageEvent) => void) => {
                socket.on('message', callback)
            },
            send: (message => {
                socket.send(message)
            })
        }
    }

    static defaultRedirect(url: string): Promise<any> {
        return open(url);
    }
};

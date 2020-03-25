import {Platform} from "../platform";
import * as crypto from "crypto";
import {RSA_PKCS1_PADDING} from "constants";
import * as https from "https";
import {KeeperHttpResponse} from "../commands";
import {keeperKeys} from "../endpoint";
import * as FormData from "form-data"
import {KeyFormat} from "crypto";

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

    static async generateRSAKeyPair(): Promise<{privateKey: Uint8Array; publicKey: Uint8Array}> {
        // TODO implement node key generation
        throw "Not Implemented";
    }

    static publicEncrypt(data: Uint8Array, key: string): Uint8Array {
        return crypto.publicEncrypt({
            key: key,
            padding: RSA_PKCS1_PADDING
        }, data);
    }

    static privateDecrypt(data: Uint8Array, key: Uint8Array): Uint8Array {
        // TODO implement private decrypt
        throw "Not Implemented";
        // let privateKey = crypto.createPrivateKey({
        //     key: Buffer.from(key),
        //     type: 'pkcs8',
        //     format: 'der'
        // });
        // let decrypted = crypto.privateDecrypt(privateKey, data);
        // return decrypted;
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

    static calcAutoResponse(key: Uint8Array): Promise<string> {
        return Promise.resolve(crypto.createHash("SHA256").update(key).digest("base64"));
    }

    static get(url: string, headers: any): Promise<KeeperHttpResponse> {
        return new Promise<KeeperHttpResponse>((resolve) => {
            let get = https.request(url, {
                method: "get",
                headers: {
                    ...{"User-Agent": `Node/${process.version}`},
                    ...headers
                }
            }, (res) => {
                this.fetchData(res, resolve);
            });
            get.end();
        })
    }

    static post(url: string, request: Uint8Array, headers?: any): Promise<KeeperHttpResponse> {
        return new Promise<KeeperHttpResponse>((resolve) => {
            let post = https.request(url, {
                method: "post",
                headers: {
                    ...{
                        "Content-Type": "application/octet-stream",
                        "Content-Length": request.length,
                        "User-Agent": `Node/${process.version}`
                    },
                    ...headers
                }
            }, (res) => {
                this.fetchData(res, resolve)
            });
            post.write(request);
            post.end();
        })
    }

    static fileUpload(url: string, uploadParameters: any, data: Uint8Array): Promise<any> {
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
};

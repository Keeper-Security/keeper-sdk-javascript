import {Platform} from "../platform";
import {_asnhex_getHexOfV_AtObj, _asnhex_getPosArrayOfChildren_AtObj} from "./asn1hex";
import {RSAKey} from "./rsa";
import {AES, pad, enc, mode} from "crypto-js";
import {KeeperHttpResponse} from "../commands";
import {keeperKeys} from "../endpoint";
import {normal64} from "../utils";
import {SocketProxy} from '../auth'

const rsaAlgorithmName: string = "RSASSA-PKCS1-v1_5";

type Ecies = {
    generateKeys: () => {
        publicKey: Uint8Array
        privateKey: Uint8Array
    }
    encrypt: (message: string | Uint8Array, pubKey: Uint8Array, id?: Uint8Array) => Uint8Array
    decrypt: (cipherText: Uint8Array, privKey: Uint8Array, id?: Uint8Array) => Uint8Array
    derivePublicKey: (privKey: Uint8Array) => Uint8Array
}

const ECIES: Ecies = require('ecies/dist/browserify/ecies.js')

export const browserPlatform: Platform = class {
    static keys = keeperKeys.der;

    static getRandomBytes(length: number): Uint8Array {
        let data = new Uint8Array(length);
        crypto.getRandomValues(data);
        return data
    }

    static bytesToBase64(data: Uint8Array): string {
        if (!data)
            return null;
        return btoa(browserPlatform.bytesToString(data));
    }

    static base64ToBytes(data: string): Uint8Array {
        return Uint8Array.from(atob(data), c => c.charCodeAt(0))
    }

    static bytesToString(data: Uint8Array): string {
        if (!data)
            return null;
        return String.fromCharCode(...data);
    }

    static stringToBytes(data: string): Uint8Array {
        return new TextEncoder().encode(data);
    }

    static async generateRSAKeyPair(): Promise<{privateKey: Uint8Array; publicKey: Uint8Array}> {
        let keyPair = await crypto.subtle.generateKey({
            name: rsaAlgorithmName,
            modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 65537
            hash: {name: 'SHA-256'},
        }, true, ["sign", "verify"]);

        let jwk = await crypto.subtle.exportKey("jwk", keyPair.privateKey);

        let rsaKey = new RSAKey();
        rsaKey.setPrivateEx(
            base64ToHex(normal64(jwk.n)),
            base64ToHex(normal64(jwk.e)),
            base64ToHex(normal64(jwk.d)),
            base64ToHex(normal64(jwk.p)),
            base64ToHex(normal64(jwk.q)),
            base64ToHex(normal64(jwk.dp)),
            base64ToHex(normal64(jwk.dq)),
            base64ToHex(normal64(jwk.qi))
        );

        let public_key  = rsaKey.toASN1HexString(false);
        let private_key = rsaKey.toASN1HexString(true);

        return {
            privateKey: hexToBytes(private_key),
            publicKey: hexToBytes(public_key),
        };
    }

    // todo: revisit
    static async generateRSAKeyPair2(): Promise<any> {
        return this.generateRSAKeyPair()
    }

    static generateECKeyPair(): { privateKey: Uint8Array; publicKey: Uint8Array } {
        return ECIES.generateKeys()
    }

    static publicEncrypt(data: Uint8Array, key: string): Uint8Array {
        let publicKeyHex = base64ToHex(key);
        const pos = _asnhex_getPosArrayOfChildren_AtObj(publicKeyHex, 0);
        const hN = _asnhex_getHexOfV_AtObj(publicKeyHex, pos[0]);
        const hE = _asnhex_getHexOfV_AtObj(publicKeyHex, pos[1]);
        const rsa = new RSAKey();
        rsa.setPublic(hN, hE);
        const hexBytes = bytesToHex(data);
        const encryptedBinary = rsa.encryptBinary(hexBytes);
        return hexToBytes(encryptedBinary);
    }

    static privateDecrypt(data: Uint8Array, key: Uint8Array): Uint8Array {
        let pkh = bytesToHex(key);
        const rsa = new RSAKey();
        rsa.setPrivateKeyFromASN1HexString(pkh);
        const hexBytes = bytesToHex(data);
        const decryptedBinary = rsa.decryptBinary(hexBytes);
        return hexToBytes(decryptedBinary);
    }

    // TODO Not tested
    static async privateSign(data: Uint8Array, key: string): Promise<Uint8Array> {
        let _key = await crypto.subtle.importKey("pkcs8",
            browserPlatform.base64ToBytes(key),
            "RSA-PSS",
            true,
            ["sign"]);
        let signature = await crypto.subtle.sign(rsaAlgorithmName, _key, data);
        return new Uint8Array(signature);
    }

    static async aesGcmEncrypt(data: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        let _key = await crypto.subtle.importKey("raw", key, "AES-GCM", true, ["encrypt"]);
        let iv = browserPlatform.getRandomBytes(12);
        let res = await crypto.subtle.encrypt({
            name: "AES-GCM",
            iv: iv
        }, _key, data);
        return Uint8Array.of(...iv, ...new Uint8Array(res))
    }

    static async aesGcmDecrypt(data: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        let _key = await crypto.subtle.importKey("raw", key, "AES-GCM", true, ["decrypt"]);
        let iv = data.subarray(0, 12);
        let encrypted = data.subarray(12);
        let res = await crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: iv
        }, _key, encrypted);
        return new Uint8Array(res);
    }

    static aesCbcEncrypt(data: Uint8Array, key: Uint8Array, usePadding: boolean): Uint8Array {
        let iv = browserPlatform.getRandomBytes(16);
        let encrypted = AES.encrypt(
            bytesToWordArray(data),
            bytesToWordArray(key), {
                iv: bytesToWordArray(iv),
                mode: mode.CBC,
                padding: usePadding
                    ? pad.Pkcs7
                    : pad.NoPadding
            });
        return Uint8Array.of(...iv, ...this.base64ToBytes(encrypted.toString()));
    }

    static aesCbcDecrypt(data: Uint8Array, key: Uint8Array, usePadding: boolean): Uint8Array {
        let decrypted = AES.decrypt(
            browserPlatform.bytesToBase64(data.subarray(16)),
            bytesToWordArray(key),
            {
                iv: bytesToWordArray(data.subarray(0, 16)),
                mode: mode.CBC,
                padding: usePadding
                    ? pad.Pkcs7
                    : pad.NoPadding
            });
        return hexToBytes(decrypted.toString());
    }

    static async deriveKey(password: string, saltBytes: Uint8Array, iterations: number): Promise<Uint8Array> {
        let key = await crypto.subtle.importKey("raw", browserPlatform.stringToBytes(password), "PBKDF2", false, ["deriveBits"]);
        let derived = await crypto.subtle.deriveBits({
            name: "PBKDF2",
            salt: saltBytes,
            iterations: iterations,
            hash: {
                name: "SHA-256"
            }
        }, key, 256);
        return new Uint8Array(derived);
    }

    static async calcAuthVerifier(key: Uint8Array): Promise<Uint8Array> {
        let digest = await crypto.subtle.digest("SHA-256", key);
        return new Uint8Array(digest);
    }

    static async get(url: string, headers: any): Promise<KeeperHttpResponse> {
        let resp = await fetch(url, {
            method: "GET",
            headers: Object.entries(headers),
        });
        let body = await resp.arrayBuffer();
        return {
            statusCode: resp.status,
            headers: resp.headers,
            data: new Uint8Array(body)
        }
    }

    static async post(
      url: string,
      request: Uint8Array | string,
      headers?: {[key: string]: string}
    ): Promise<KeeperHttpResponse> {
        let resp = await fetch(url, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/octet-stream",
                "Content-Length": String(request.length),
                ...headers
            }),
            body: request,
        });
        let body = await resp.arrayBuffer();
        return {
            statusCode: resp.status,
            headers: resp.headers,
            data: new Uint8Array(body)
        }
    }

    static fileUpload(
      url: string,
      uploadParameters: {[key: string]: string},
      data: Blob
    ): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const form = new FormData();

            for (const key in uploadParameters) {
                form.append(key, uploadParameters[key]);
            }
            form.append('file', data)

            const fetchCfg = {
                method: 'PUT',
                body: form,
            }

            fetch(url, fetchCfg)
              .then(response => response.json())
              .then(res => {
                  resolve({
                      headers: res.headers,
                      statusCode: res.statusCode,
                      statusMessage: res.statusMessage
                  })
              })
              .catch(error => {
                  console.error('Error uploading file:', error);
                  reject(error)
              });
        })
    }

    static createWebsocket(url: string): SocketProxy {
        const socket = new WebSocket(url)

        return {
            close: () => {
                socket.close()
            },
            onClose: (callback: () => void) => {
                socket.addEventListener("close", callback)
            },
            onError: (callback: (e: Event) => void) => {
                socket.addEventListener("error", callback)
            },
            onMessage: (callback: (e: MessageEvent) => void) => {
                socket.onmessage = callback
            },
            send: (message: any) => {
                socket.send(message)
            }
        }
    }

    static defaultRedirect(url: string): Promise<any> {
        if (window && window.open) {
            window.open(url)
        } else {
            console.log('Unable to redirect: window not present.')
        }
        return Promise.resolve()
    }
};


function base64ToHex(data: string): string {
    let raw = atob(data);
    let hex = '';
    for (let i = 0; i < raw.length; i++) {
        let _hex = raw.charCodeAt(i).toString(16);
        hex += (_hex.length == 2 ? _hex : '0' + _hex);
    }
    return hex;
}

function hexToBytes(data: string): Uint8Array {
    let bytes = [];
    for (let c = 0; c < data.length; c += 2)
        bytes.push(parseInt(data.substr(c, 2), 16));
    return Uint8Array.from(bytes);
}

function bytesToHex(data: Uint8Array): string {
    let hex = [];
    for (let i = 0; i < data.length; i++) {
        let current = data[i] < 0 ? data[i] + 256 : data[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join("");
}

function bytesToWordArray(data: Uint8Array): any {
    let dataHex = bytesToHex(data);
    return enc.Hex.parse(dataHex);
}

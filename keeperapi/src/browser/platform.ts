import {Platform} from '../platform'
import {_asnhex_getHexOfV_AtObj, _asnhex_getPosArrayOfChildren_AtObj} from "./asn1hex";
import {RSAKey} from "./rsa";
import {AES, enc, mode, pad} from "crypto-js";
import {KeeperHttpResponse} from "../commands";
import {keeperKeys} from "../endpoint";
import {normal64, normal64Bytes, webSafe64FromBytes} from "../utils";
import {SocketProxy, socketSendMessage} from '../auth'

const rsaAlgorithmName: string = "RSASSA-PKCS1-v1_5";
let socket: WebSocket | null = null

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

    static async generateECKeyPair(): Promise<{ privateKey: Uint8Array; publicKey: Uint8Array }> {
        const ecdh = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits'])
        const privateKey = await crypto.subtle.exportKey('jwk', ecdh.privateKey)
        const publicKey = await crypto.subtle.exportKey('raw', ecdh.publicKey)
        return { publicKey: new Uint8Array(publicKey), privateKey: normal64Bytes(privateKey.d) }
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

    static async publicEncryptEC(data: Uint8Array, key: Uint8Array, id?: Uint8Array): Promise<Uint8Array> {
        const ephemeralKeyPair = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits'])
        const ephemeralPublicKey = await crypto.subtle.exportKey('raw', ephemeralKeyPair.publicKey)
        const recipientPublicKey = await crypto.subtle.importKey('raw', key, { name: 'ECDH', namedCurve: 'P-256' }, true, [])
        const sharedSecret = await crypto.subtle.deriveBits({ name: 'ECDH', public: recipientPublicKey }, ephemeralKeyPair.privateKey, 256)
        const idBytes = id || new Uint8Array()
        const sharedSecretCombined = new Uint8Array(sharedSecret.byteLength + idBytes.byteLength)
        sharedSecretCombined.set(new Uint8Array(sharedSecret), 0)
        sharedSecretCombined.set(idBytes, sharedSecret.byteLength)
        const symmetricKey = await crypto.subtle.digest('SHA-256', sharedSecretCombined)
        const cipherText = await this.aesGcmEncrypt(data, new Uint8Array(symmetricKey))
        const result = new Uint8Array(ephemeralPublicKey.byteLength + cipherText.byteLength)
        result.set(new Uint8Array(ephemeralPublicKey), 0)
        result.set(new Uint8Array(cipherText), ephemeralPublicKey.byteLength)
        return result
    }

    static privateDecrypt(data: Uint8Array, key: Uint8Array): Uint8Array {
        let pkh = bytesToHex(key);
        const rsa = new RSAKey();
        rsa.setPrivateKeyFromASN1HexString(pkh);
        const hexBytes = bytesToHex(data);
        const decryptedBinary = rsa.decryptBinary(hexBytes);
        return hexToBytes(decryptedBinary);
    }

    static async privateDecryptEC(data: Uint8Array, privateKey: Uint8Array, publicKey?: Uint8Array, id?: Uint8Array): Promise<Uint8Array> {
        const privateKeyImport = await (async () => {
            const x = webSafe64FromBytes(publicKey.subarray(1, 33))
            const y = webSafe64FromBytes(publicKey.subarray(33, 65))
            const d = webSafe64FromBytes(privateKey)

            const jwk = {
                'crv': 'P-256',
                d,
                'ext': true,
                'key_ops': [
                    'deriveBits'
                ],
                'kty': 'EC',
                x,
                y
            }

            return await crypto.subtle.importKey('jwk', jwk, { name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits'])
        })()
        const publicKeyLength = 65
        const message = data.slice(publicKeyLength)
        const ephemeralPublicKey = data.slice(0, publicKeyLength)
        const pubCryptoKey = await crypto.subtle.importKey('raw', ephemeralPublicKey, { name: 'ECDH', namedCurve: 'P-256' }, true, [])
        const sharedSecret = await crypto.subtle.deriveBits({ name: 'ECDH', public: pubCryptoKey }, privateKeyImport, 256)
        let sharedSecretCombined = new Uint8Array(sharedSecret.byteLength + (id?.byteLength ?? 0))
        sharedSecretCombined.set(new Uint8Array(sharedSecret), 0)
        if (id) {
            sharedSecretCombined.set(id, sharedSecret.byteLength)
        }
        const symmetricKey = await crypto.subtle.digest('SHA-256', sharedSecretCombined)
        return await this.aesGcmDecrypt(message, new Uint8Array(symmetricKey))
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

    static async deriveKeyV2(domain: string, password: string, saltBytes: Uint8Array, iterations: number): Promise<Uint8Array> {
        let key = await crypto.subtle.importKey(
            "raw",
            browserPlatform.stringToBytes(domain + password),
            "PBKDF2",
            false,
            ["deriveBits"]);
        let derived = await crypto.subtle.deriveBits({
            name: "PBKDF2",
            salt: saltBytes,
            iterations: iterations,
            hash: {
                name: "SHA-512"
            }
        }, key, 512);
        let hmacKey = await crypto.subtle.importKey(
            "raw",
            derived,
            {
                name: "HMAC",
                hash: {
                    name: "SHA-256"
                }
            },
            false,
            ["sign", "verify"]);
        const reduced = await crypto.subtle.sign("HMAC", hmacKey, browserPlatform.stringToBytes(domain));
        return new Uint8Array(reduced);
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
        socket = new WebSocket(url)
        let createdSocket;
        return createdSocket = {
            onOpen: (callback: () => void) => {
                socket.onopen = (e: Event) => {
                    callback()
                }
            },
            close: () => {
                socket.close()
            },
            onClose: (callback: (e:Event) => void) => {
                socket.addEventListener("close", callback)
            },
            onError: (callback: (e: Event) => void) => {
                socket.addEventListener("error", callback)
            },
            onMessage: (callback: (e: Uint8Array) => void) => {
                socket.onmessage = async (e: MessageEvent) => {
                    const pmArrBuff = await e.data.arrayBuffer()
                    const pmUint8Buff = new Uint8Array(pmArrBuff)
                    callback(pmUint8Buff)
                }
            },
            send: (message: any) => {
                socketSendMessage(message, socket, createdSocket)                
            },
            messageQueue: [],
        }
    }

    static ssoLogin(url: string): Promise<any> {
        throw new Error('Not Implemented')
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

const OPCODE_PING = new Uint8Array([0x9])

const heartbeat = window.setInterval(() => {
    if (!socket) return
    if (socket.readyState !== WebSocket.OPEN) return
    socket.send(OPCODE_PING)
}, 10000)
import {
    CryptoWorkerOptions,
    EncryptionType,
    KeyStorage,
    KeyWrapper,
    LogOptions,
    Platform,
    UnwrapKeyMap,
    UnwrappedKeyType
} from '../platform'
import {_asnhex_getHexOfV_AtObj, _asnhex_getPosArrayOfChildren_AtObj} from "./asn1hex";
import {RSAKey} from "./rsa";
import {getKeeperKeys} from "../transmissionKeys";
import {normal64, normal64Bytes, webSafe64FromBytes} from "../utils";
import {SocketProxy, socketSendMessage} from '../socket'
import * as asmCrypto from 'asmcrypto.js'
import type {KeeperHttpResponse} from "../commands";
import {
    CryptoResults,
    CryptoWorker,
    CryptoWorkerMessage,
    CryptoWorkerPool,
    CryptoWorkerPoolConfig
} from '../cryptoWorker';

// RSA TAGGED
const rsaAlgorithmName: string = "RSASSA-PKCS1-v1_5";
const CBC_IV_LENGTH = 16
const GCM_IV_LENGTH = 12
const ECC_PUB_KEY_LENGTH = 65
let socket: WebSocket | null = null
let workerPool: CryptoWorkerPool | null = null

const base64ToBytes = (data: string): Uint8Array => {
    return Uint8Array.from(atob(data), c => c.charCodeAt(0))
}

export const browserPlatform: Platform = class {
    
    static supportsConcurrency: boolean = true

    static base64ToBytes = base64ToBytes
    
    static normal64Bytes(source: string): Uint8Array {
        return base64ToBytes(normal64(source));
    }

    static keys = getKeeperKeys(this.normal64Bytes);

    static getRandomBytes(length: number): Uint8Array {
        let data = new Uint8Array(length);
        crypto.getRandomValues(data);
        return data
    }

    static bytesToBase64(data: Uint8Array): string {
        const chunkSize = 0x10000
        if (data.length <= chunkSize) {
            // @ts-ignore
            return btoa(String.fromCharCode(...data))
        }
        let chunks: string = ''
        for (let i = 0; i < data.length; i = i + chunkSize) {
            // @ts-ignore
            chunks = chunks + String.fromCharCode(...data.slice(i, i + chunkSize))
        }
        return btoa(chunks)
    }    

    static bytesToString(data: Uint8Array): string {
        return new TextDecoder().decode(data)
    }

    static stringToBytes(data: string): Uint8Array {
        return new TextEncoder().encode(data);
    }

    static wrapPassword(password: Uint8Array): KeyWrapper {
        return KeyWrapper.create(password)
        // TODO const wrappedPassword = await crypto.subtle.importKey("raw", password.asBytes(), "PBKDF2", false, ["deriveBits"]);
        // return KeyWrapper.create(wrappedPassword)
    }

    static unWrapPassword(password: KeyWrapper): Uint8Array {
        return password.getKey()
    }

    static async importKey(keyId: string, key: Uint8Array, storage?: KeyStorage, canExport?: boolean): Promise<void> {
        // An AES key for one of our Keeper objects can be used for either CBC or GCM operations.
        // Since CryptoKeys are bound to a particular algorithm, we need to keep a copy for each.
        const extractable = !!canExport
        const cbcKey = await this.aesCbcImportKey(key, extractable) 
        const gcmKey = await this.aesGcmImportKey(key, extractable)
        cryptoKeysCache['cbc'][keyId] = cbcKey
        cryptoKeysCache['gcm'][keyId] = gcmKey

        if (storage) {
            if (storage.saveObject) {
                await storage.saveObject(this.getStorageKeyId(keyId, 'cbc'), cbcKey)
                await storage.saveObject(this.getStorageKeyId(keyId, 'gcm'), gcmKey)
            } else {
                await storage.saveKeyBytes(keyId, key)
            }
        }
    }

    static async importKeyEC(keyId: string, privateKey: Uint8Array, publicKey: Uint8Array, storage?: KeyStorage): Promise<void> {
        const key = await this.importPrivateKeyEC(privateKey, publicKey)
        cryptoKeysCache['ecc'][keyId] = key

        if (storage) {
            if (storage.saveObject) {
                await storage.saveObject(this.getStorageKeyId(keyId, 'ecc'), key)
            } else {
                const jwk = await crypto.subtle.exportKey('jwk', key)
                const keyBytes = this.stringToBytes(JSON.stringify(jwk))
                await storage.saveKeyBytes(keyId, keyBytes)
            }
        }
    }

    // RSA TAGGED
    static async importKeyRSA(keyId: string, key: Uint8Array, storage?: KeyStorage): Promise<void> {
        keyBytesCache[keyId] = key

        if (storage) {
            await storage.saveKeyBytes(keyId, key)
        }
    }

    static unloadKeys(): void {
        cryptoKeysCache.cbc = {}
        cryptoKeysCache.gcm = {}
        cryptoKeysCache.ecc = {}
        keyBytesCache = {}
    }

    static getStorageKeyId(keyId: string, keyType: EncryptionType): string {
        switch (keyType) {
            case 'cbc':
            case 'gcm':
                return `${keyId}_${keyType}`
            default:
                return keyId
        }
    }

    static async loadCryptoKey(keyId: string, keyType: EncryptionType, storage?: KeyStorage): Promise<CryptoKey> {
        if (storage?.getObject) {
            const storageKeyId = this.getStorageKeyId(keyId, keyType)
            const storedKey = await storage.getObject<CryptoKey>(storageKeyId)
            if (!storedKey) {
                throw new Error('Unable to load crypto key ' + keyId)
            }
            return storedKey 
        }

        const keyBytes = await this.loadKeyBytes(keyId, storage)
        switch (keyType) {
            case 'cbc':
                return this.aesCbcImportKey(keyBytes, true)
            case 'gcm':
                return this.aesGcmImportKey(keyBytes, true)
            case 'ecc':
                const jwk: JsonWebKey = JSON.parse(this.bytesToString(keyBytes))
                return this.importECCJsonWebKey(jwk) 
            default:
                throw new Error('Unsupported keyType: ' + keyType)
        }
    }

    static async loadKeyBytes(keyId: string, storage?: KeyStorage): Promise<Uint8Array> {
        const cachedKey = keyBytesCache[keyId]
        if (cachedKey) {
            return cachedKey
        }
        const keyBytes = storage
            ? await storage.getKeyBytes(keyId)
            : undefined
        if (!keyBytes) {
            throw new Error(`Unable to load the key ${keyId}`)
        }
        keyBytesCache[keyId] = keyBytes
        return keyBytes
    }

    static async loadKey(keyId: string, keyType: CryptoKeyType, storage?: KeyStorage): Promise<CryptoKey> {
        const cachedKey = cryptoKeysCache[keyType][keyId]
        if (cachedKey) {
            return cachedKey
        }

        const key = await this.loadCryptoKey(keyId, keyType, storage)
        cryptoKeysCache[keyType][keyId] = key
        return key
    }

    static async unwrapKeys(keys: UnwrapKeyMap, storage?: KeyStorage): Promise<void> {
        if (workerPool) {
            try {
                const unwrappedKeys = await workerPool.runTasks(Object.values(keys))

                // Import keys
                await Promise.all(Object.entries(unwrappedKeys).map(async ([keyId, keyBytes]) => {
                    try {
                        const {unwrappedType} = keys[keyId]
                        switch (unwrappedType) {
                            case 'aes':
                                await this.importKey(keyId, keyBytes, storage, true)
                                break
                            case 'rsa':
                                // RSA TAGGED
                                await this.importKeyRSA(keyId, keyBytes, storage)
                                break
                            default:
                                throw new Error(`unable to import ${unwrappedType} key`)
                        }
                    } catch (e) {
                        console.error(`Import key error: ${e}`)
                    }
                }))
                
                return // no error, exit

            } catch (e) {
                console.error(`Crypto worker failed: ${e}`)
                await workerPool?.close()
                workerPool = null
            }
        }

        // Default to main thread decryption
        await Promise.all(Object.values(keys).map(async task => {
            const {data, dataId, keyId, encryptionType, unwrappedType} = task
            try {
                await this.unwrapKey(data, dataId, keyId, encryptionType, unwrappedType, storage, true)
            } catch (e: any) {
                if (e instanceof Error && e.message === 'sync_aborted') throw e
                console.error(`The key ${dataId} cannot be decrypted (${e.message})`)
            }
        }))
    }

    static async unwrapKey(key: Uint8Array, keyId: string, unwrappingKeyId: string, encryptionType: EncryptionType, unwrappedKeyType: UnwrappedKeyType, storage?: KeyStorage, canExport?: boolean): Promise<void> {
        switch (unwrappedKeyType) {
            case 'rsa':
                // RSA TAGGED
                if (keyBytesCache[keyId]) {
                    // Skip redundant RSA key decryption
                    return
                }

                await this.unwrapRSAKey(key, keyId, unwrappingKeyId, encryptionType, storage)
                break
            case 'aes':
                if (cryptoKeysCache['gcm'][keyId]) {
                    // Keeperapp sometimes provides redundant key data, for example, like if you own a record in a shared folder,
                    // or if a record belongs to multiple shared folders. So, short circuit when possible for a performance improvement
                    return
                }

                await this.unwrapAesKey(key, keyId, unwrappingKeyId, encryptionType, storage, canExport)
                break
            default:
                throw new Error('Unable to unwrap key type ' + unwrappedKeyType)
        }
    }

    static async unwrapAesKey(key: Uint8Array, keyId: string, unwrappingKeyId: string, encryptionType: EncryptionType, storage?: KeyStorage, canExport?: boolean): Promise<void> {
        let unwrappingKey: CryptoKey
        let wrappedKey: Uint8Array
        let algoParams: AesCbcParams | AesGcmParams
        switch (encryptionType) {
            case 'rsa':
                // RSA TAGGED
                const rsaKey = await this.loadKeyBytes(unwrappingKeyId, storage)
                const keyBytes = this.privateDecrypt(key, rsaKey)
                await this.importKey(keyId, keyBytes, storage, canExport) 
                return

            case 'cbc':
                wrappedKey = key.subarray(CBC_IV_LENGTH)
                algoParams = {
                    iv: key.subarray(0, CBC_IV_LENGTH),
                    name: 'AES-CBC'
                }
                unwrappingKey = await this.loadKey(unwrappingKeyId, encryptionType, storage)
                break

            case 'gcm':
                wrappedKey = key.subarray(GCM_IV_LENGTH)
                algoParams = {
                    iv: key.subarray(0, GCM_IV_LENGTH),
                    name: 'AES-GCM'
                }
                unwrappingKey = await this.loadKey(unwrappingKeyId, encryptionType, storage)
                break

            case 'ecc':
                const message = key.slice(ECC_PUB_KEY_LENGTH)
                wrappedKey = message.subarray(GCM_IV_LENGTH)
                algoParams = {
                    iv: message.subarray(0, GCM_IV_LENGTH),
                    name: 'AES-GCM'
                }
                const ephemeralPublicKey = key.slice(0, ECC_PUB_KEY_LENGTH)
                const eccPrivateKey = await this.loadKey(unwrappingKeyId, 'ecc', storage)
                unwrappingKey = await this.deriveSharedSecretKey(ephemeralPublicKey, eccPrivateKey)
                break
        }

        const canExtract: boolean = storage?.saveObject ? !!canExport : true
        const keyUsages: KeyUsage[] = ['encrypt', 'decrypt', 'unwrapKey', 'wrapKey']

        const gcmKey = await crypto.subtle.unwrapKey('raw', wrappedKey, unwrappingKey, algoParams, 'AES-GCM', canExtract, keyUsages)
        const cbcKey = await crypto.subtle.unwrapKey('raw', wrappedKey, unwrappingKey, algoParams, 'AES-CBC', canExtract, keyUsages)

        cryptoKeysCache['cbc'][keyId] = cbcKey
        cryptoKeysCache['gcm'][keyId] = gcmKey

        if (storage) {
            if (storage.saveObject) {
                await storage.saveObject(this.getStorageKeyId(keyId, 'cbc'), cbcKey)
                await storage.saveObject(this.getStorageKeyId(keyId, 'gcm'), gcmKey)
            } else {
                const keyBuffer = await crypto.subtle.exportKey('raw', gcmKey)
                await storage.saveKeyBytes(keyId, new Uint8Array(keyBuffer))
            }
        }
    }

    // RSA TAGGED
    static async unwrapRSAKey(key: Uint8Array, keyId: string, unwrappingKeyId: string, encryptionType: EncryptionType, storage?: KeyStorage): Promise<void> {
        const rsaKey = await this.decrypt(key, unwrappingKeyId, encryptionType, storage)
        await this.importKeyRSA(keyId, rsaKey, storage)
    }

    static async decrypt(data: Uint8Array, keyId: string, encryptionType: EncryptionType, storage?: KeyStorage): Promise<Uint8Array> {
        switch (encryptionType) {
            case 'cbc': {
                const key = await this.loadKey(keyId, encryptionType, storage)
                return this.aesCbcDecryptWebCrypto(data, key)
            }
            case 'gcm': {
                const key = await this.loadKey(keyId, encryptionType, storage)
                return this.aesGcmDecryptWebCrypto(data, key)
            }
            case 'rsa': {
                // RSA TAGGED
                const key = await this.loadKeyBytes(keyId, storage)
                return this.privateDecrypt(data, key)
            }
            case 'ecc': {
                const key = await this.loadKey(keyId, encryptionType, storage)
                return this.privateDecryptECWebCrypto(data, key)
            }
            default:
                throw Error('Unknown encryption type: ' + encryptionType)
        }
    }

    // RSA TAGGED
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
            base64ToHex(normal64(jwk.n!)),
            base64ToHex(normal64(jwk.e!)),
            base64ToHex(normal64(jwk.d!)),
            base64ToHex(normal64(jwk.p!)),
            base64ToHex(normal64(jwk.q!)),
            base64ToHex(normal64(jwk.dp!)),
            base64ToHex(normal64(jwk.dq!)),
            base64ToHex(normal64(jwk.qi!))
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
        return { publicKey: new Uint8Array(publicKey), privateKey: normal64Bytes(privateKey.d!) }
    }

    static async publicEncryptECWithHKDF(message: string | Uint8Array, pubKey: Uint8Array, id: Uint8Array): Promise<Uint8Array> {
        const messageBytes = typeof message === "string" ? this.stringToBytes(message) : message
        return await this.mainPublicEncryptEC(messageBytes, pubKey, id, true)
    }

    // RSA TAGGED
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

    static async mainPublicEncryptEC(data: Uint8Array, key: Uint8Array, id?: Uint8Array, useHKDF?: boolean) {
        const ephemeralKeyPair = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits'])
        const ephemeralPublicKey = await crypto.subtle.exportKey('raw', ephemeralKeyPair.publicKey)
        const recipientPublicKey = await crypto.subtle.importKey('raw', key, { name: 'ECDH', namedCurve: 'P-256' }, true, [])
        const sharedSecret = await crypto.subtle.deriveBits({ name: 'ECDH', public: recipientPublicKey }, ephemeralKeyPair.privateKey, 256)
        const idBytes = id || new Uint8Array()
        let symmetricKey: ArrayBuffer
        if (!useHKDF) {
            const sharedSecretCombined = new Uint8Array(sharedSecret.byteLength + idBytes.byteLength)
            sharedSecretCombined.set(new Uint8Array(sharedSecret), 0)
            sharedSecretCombined.set(idBytes, sharedSecret.byteLength)
            symmetricKey = await crypto.subtle.digest('SHA-256', sharedSecretCombined)
        } else {
            const hkdfKey = await crypto.subtle.importKey(
                'raw',
                sharedSecret,
                'HKDF',
                false,
                ['deriveBits']
            )
            symmetricKey = await crypto.subtle.deriveBits(
                {
                    name: 'HKDF',
                    hash: 'SHA-256',
                    salt: new Uint8Array(),
                    info: id
                },
                hkdfKey,
                256
            )
        }
        const cipherText = await this.aesGcmEncrypt(data, new Uint8Array(symmetricKey))
        const result = new Uint8Array(ephemeralPublicKey.byteLength + cipherText.byteLength)
        result.set(new Uint8Array(ephemeralPublicKey), 0)
        result.set(new Uint8Array(cipherText), ephemeralPublicKey.byteLength)
        return result
    }

    static async publicEncryptEC(data: Uint8Array, key: Uint8Array, id?: Uint8Array): Promise<Uint8Array> {
        return await this.mainPublicEncryptEC(data, key, id)
    }

    // RSA TAGGED
    static privateDecrypt(data: Uint8Array, key: Uint8Array): Uint8Array {
        let pkh = bytesToHex(key);
        const rsa = new RSAKey();
        rsa.setPrivateKeyFromASN1HexString(pkh);
        const hexBytes = bytesToHex(data);
        const decryptedBinary = rsa.decryptBinary(hexBytes);
        return hexToBytes(decryptedBinary);
    }

    static async privateDecryptEC(data: Uint8Array, privateKey: Uint8Array, publicKey?: Uint8Array, id?: Uint8Array, useHKDF?: boolean): Promise<Uint8Array> {
        if (!publicKey) {
            throw Error('Public key is required for EC decryption')
        }

        const privateKeyImport = await this.importPrivateKeyEC(privateKey, publicKey)

        return this.privateDecryptECWebCrypto(data, privateKeyImport, id, useHKDF)
    }

    static async importPrivateKeyEC(privateKey: Uint8Array, publicKey: Uint8Array) {
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

        return this.importECCJsonWebKey(jwk)
    }

    static async importECCJsonWebKey(jwk: JsonWebKey): Promise<CryptoKey> {
        return await crypto.subtle.importKey('jwk', jwk, { name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits'])
    }

    static async deriveSharedSecretKey(ephemeralPublicKey: Uint8Array, privateKey: CryptoKey, id?: Uint8Array, useHKDF?: boolean): Promise<CryptoKey> {
        const pubCryptoKey = await crypto.subtle.importKey('raw', ephemeralPublicKey, { name: 'ECDH', namedCurve: 'P-256' }, true, [])
        const sharedSecret = await crypto.subtle.deriveBits({ name: 'ECDH', public: pubCryptoKey }, privateKey, 256)
        if (!useHKDF) {
            let sharedSecretCombined = new Uint8Array(sharedSecret.byteLength + (id?.byteLength ?? 0))
            sharedSecretCombined.set(new Uint8Array(sharedSecret), 0)
            if (id) {
                sharedSecretCombined.set(id, sharedSecret.byteLength)
            }
            const symmetricKeyBuffer = await crypto.subtle.digest('SHA-256', sharedSecretCombined)
            return this.aesGcmImportKey(new Uint8Array(symmetricKeyBuffer), false)
        } else {
            const hkdfKey = await crypto.subtle.importKey(
                'raw',
                sharedSecret,
                'HKDF',
                false,
                ['deriveBits']
            )

            const symmetricKeyBuffer = await crypto.subtle.deriveBits(
                {
                    name: 'HKDF',
                    hash: 'SHA-256',
                    salt: new Uint8Array(),
                    info: id ?? new Uint8Array()
                },
                hkdfKey,
                256
            )
            return this.aesGcmImportKey(new Uint8Array(symmetricKeyBuffer), false)
        }
    }

    static async privateDecryptECWebCrypto(data: Uint8Array, privateKey: CryptoKey, id?: Uint8Array, useHKDF?: boolean): Promise<Uint8Array> {
        const message = data.slice(ECC_PUB_KEY_LENGTH)
        const ephemeralPublicKey = data.slice(0, ECC_PUB_KEY_LENGTH)

        const symmetricKey = await this.deriveSharedSecretKey(ephemeralPublicKey, privateKey, id, useHKDF)

        return await this.aesGcmDecryptWebCrypto(message, symmetricKey)
    }

    // TODO Not tested
    // RSA TAGGED
    static async privateSign(data: Uint8Array, key: string): Promise<Uint8Array> {
        let _key = await crypto.subtle.importKey("pkcs8",
            browserPlatform.base64ToBytes(key),
            "RSA-PSS",
            true,
            ["sign"]);
        let signature = await crypto.subtle.sign(rsaAlgorithmName, _key, data);
        return new Uint8Array(signature);
    }

    static async encrypt(data: Uint8Array, keyId: string, encryptionType: EncryptionType, storage?: KeyStorage): Promise<Uint8Array> {
        switch (encryptionType) {
            case 'cbc': {
                const key = await this.loadKey(keyId, encryptionType, storage)
                return this.aesCbcEncryptWebCrypto(data, key)
            }

            case 'gcm': {
                const key = await this.loadKey(keyId, encryptionType, storage)
                return this.aesGcmEncryptWebCrypto(data, key)
            }

            case 'ecc': {
                const publicKey = await this.loadKeyBytes(keyId + '_pub')
                return this.publicEncryptEC(data, publicKey)
            }

            case 'rsa': {
                // RSA TAGGED
                const publicKey = await this.loadKeyBytes(keyId + '_pub')
                return this.publicEncrypt(data, this.bytesToBase64(publicKey))
            }

            default:
                throw Error('Unknown encryption type: ' + encryptionType)
        }
    }

    static async wrapKey(keyId: string, wrappingKeyId: string, encryptionType: CryptoKeyType, storage?: KeyStorage): Promise<Uint8Array> {
        switch (encryptionType) {
            case 'cbc':
            case 'gcm':
                return this.aesWrapKey(keyId, wrappingKeyId, encryptionType, storage)

            default:
                throw new Error(`Unsupported encryptionType (${encryptionType})`)
        }
    }

    static async aesWrapKey(keyId: string, wrappingKeyId: string, encryptionType: Exclude<CryptoKeyType, 'ecc'>, storage?: KeyStorage): Promise<Uint8Array> {
        const key = await this.loadKey(keyId, 'cbc', storage)
        const wrappingKey = await this.loadKey(wrappingKeyId, encryptionType, storage)

        let algoParams: AesCbcParams | AesGcmParams
        let iv: Uint8Array
        switch (encryptionType) {
            case 'cbc':
                iv = this.getRandomBytes(CBC_IV_LENGTH)
                algoParams = {
                    iv,
                    name: 'AES-CBC'
                }
                break

            case 'gcm':
                iv = this.getRandomBytes(GCM_IV_LENGTH)
                algoParams = {
                    iv,
                    name: 'AES-GCM'
                }
                break
        }

        const wrappedKey = await crypto.subtle.wrapKey('raw', key, wrappingKey, algoParams)

        let resArr = new Uint8Array(wrappedKey)
        let result = new Uint8Array(iv.length + resArr.length)
        result.set(iv)
        result.set(resArr, iv.length)
        return result
    }
 
    static async aesGcmEncrypt(data: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        let _key = await crypto.subtle.importKey("raw", key, "AES-GCM", true, ["encrypt"]);
        return this.aesGcmEncryptWebCrypto(data, _key)
    }

    static async aesGcmEncryptWebCrypto(data: Uint8Array, key: CryptoKey): Promise<Uint8Array> {
        let iv = browserPlatform.getRandomBytes(GCM_IV_LENGTH);
        let res = await crypto.subtle.encrypt({
            name: "AES-GCM",
            iv: iv
        }, key, data);

        let resArr = new Uint8Array(res)
        let result = new Uint8Array(iv.length + resArr.length)
        result.set(iv)
        result.set(resArr, iv.length)
        return result
    }

    static async aesGcmDecrypt(data: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
        const _key = await this.aesGcmImportKey(key, false)
        return this.aesGcmDecryptWebCrypto(data, _key)
    }

    static async aesGcmImportKey(keyBytes: Uint8Array, extractable: boolean): Promise<CryptoKey> {
        return crypto.subtle.importKey("raw", keyBytes, "AES-GCM", extractable, ['decrypt', 'encrypt', 'unwrapKey', 'wrapKey']);
    }

    static async aesGcmDecryptWebCrypto(data: Uint8Array, key: CryptoKey): Promise<Uint8Array> {
        const iv = data.subarray(0, GCM_IV_LENGTH);
        const encrypted = data.subarray(GCM_IV_LENGTH);
        const res = await crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: iv
        }, key, encrypted);
        return new Uint8Array(res);
    }

    static async aesCbcEncryptWebCrypto(data: Uint8Array, key: CryptoKey): Promise<Uint8Array> {
        let iv = browserPlatform.getRandomBytes(CBC_IV_LENGTH);
        let res = await crypto.subtle.encrypt({
            name: "aes-cbc",
            iv: iv
        }, key, data);

        let resArr = new Uint8Array(res)
        let result = new Uint8Array(iv.byteLength + resArr.byteLength)
        result.set(iv)
        result.set(resArr, iv.byteLength)
        return result
    }

    // The browser's implementation of aes cbc only works when padding is required. 
    // Use asmCrypto for no padding. crypto-js was found to have a vulnerability (Cache-Timing attack)
    static async aesCbcEncrypt(data: Uint8Array, key: Uint8Array, usePadding: boolean): Promise<Uint8Array> {
        if(usePadding){
            let _key = await crypto.subtle.importKey("raw", key, "aes-cbc", true, ["encrypt"]);
            return this.aesCbcEncryptWebCrypto(data, _key)
        } else {
            const iv = browserPlatform.getRandomBytes(CBC_IV_LENGTH);
            const encrBytes = asmCrypto.AES_CBC.encrypt(data, key, false, iv);

            const keeperformat = new Uint8Array(iv.length + encrBytes.length)
            keeperformat.set(iv)
            keeperformat.set(encrBytes, iv.length)

            return keeperformat
        }
    }

    // The browser's implementation of aes cbc only works when padding is required. 
    // Use asmCrypto for no padding. crypto-js was found to have a vulnerability (Cache-Timing attack)
    static async aesCbcDecrypt(data: Uint8Array, key: Uint8Array, usePadding: boolean): Promise<Uint8Array> {
        if(usePadding){
            let _key = await this.aesCbcImportKey(key, false)
            return this.aesCbcDecryptWebCrypto(data, _key)
        } else {
            var iv = data.subarray(0, CBC_IV_LENGTH)
            var ciphertext = data.subarray(CBC_IV_LENGTH)

            var result = asmCrypto.AES_CBC.decrypt(ciphertext, key, false, iv)
            return result
        }
    }
    
    static async aesCbcImportKey(keyBytes: Uint8Array, extractable: boolean): Promise<CryptoKey> {
        return crypto.subtle.importKey('raw', keyBytes, 'AES-CBC', extractable, ['decrypt', 'encrypt', 'unwrapKey', 'wrapKey'])
    }

    static async aesCbcDecryptWebCrypto(data: Uint8Array, key: CryptoKey): Promise<Uint8Array> {
          const iv = data.subarray(0, CBC_IV_LENGTH)
          const ciphertext = data.subarray(CBC_IV_LENGTH)
          const decrypt = await crypto.subtle.decrypt({
              name: 'AES-CBC',
              iv: iv
          }, key, ciphertext)
          return new Uint8Array(decrypt) 
    }

    static async deriveKey(password: KeyWrapper, saltBytes: Uint8Array, iterations: number): Promise<Uint8Array> {
        let key = await crypto.subtle.importKey("raw", password.getKey(), "PBKDF2", false, ["deriveBits"]);
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

    static async deriveKeyV2(domain: string, password: KeyWrapper, saltBytes: Uint8Array, iterations: number): Promise<Uint8Array> {

        let key = await crypto.subtle.importKey(
            "raw",
            Uint8Array.of(...browserPlatform.stringToBytes(domain), ...browserPlatform.unWrapPassword(password)),
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

    static async createCryptoWorker(keyStorage: KeyStorage, options: CryptoWorkerOptions): Promise<CryptoWorkerPool> {
        const config: CryptoWorkerPoolConfig = {
            createWorker: async () => new BrowserCryptoWorker(),
            numThreads: navigator.hardwareConcurrency || 2,
            getKey: async (keyId, type) => {
                switch (type) {
                    case 'cbc':
                    case 'gcm': {
                        const key = await this.loadKey(keyId, type, keyStorage)
                        const buffer = await crypto.subtle.exportKey('raw', key)
                        return new Uint8Array(buffer)
                    }
                    case 'ecc': {
                        const key = await this.loadKey(keyId, type, keyStorage)
                        const jwk = await crypto.subtle.exportKey('jwk', key)
                        return this.stringToBytes(JSON.stringify(jwk))
                    }
                    default:
                        return this.loadKeyBytes(keyId, keyStorage)
                }
            },
            ...options
        }

        workerPool = new CryptoWorkerPool(config)
        await workerPool!.open()

        return workerPool
    }

    static async closeCryptoWorker(): Promise<void> {
        if (!workerPool) return

        try {
            await workerPool.close()
            workerPool = null
        } catch (e) {
            console.error(e)
        }
    }

    static createWebsocket(url: string): SocketProxy {
        socket = new WebSocket(url)
        let createdSocket;
        return createdSocket = {
            onOpen: (callback: () => void) => {
                socket!.onopen = (e: Event) => {
                    callback()
                }
            },
            close: () => {
                socket!.close()
            },
            onClose: (callback: (e:Event) => void) => {
                socket!.addEventListener("close", callback)
            },
            onError: (callback: (e: Event) => void) => {
                socket!.addEventListener("error", callback)
            },
            onMessage: (callback: (e: Uint8Array) => void) => {
                socket!.onmessage = async (e: MessageEvent) => {
                    const pmArrBuff = await e.data.arrayBuffer()
                    const pmUint8Buff = new Uint8Array(pmArrBuff)
                    callback(pmUint8Buff)
                }
            },
            send: (message: any) => {
                socketSendMessage(message, socket!, createdSocket)
            },
            messageQueue: [],
        }
    }

    static log(message: string, options: LogOptions): void {
        if (options === 'CR')
            return
        console.log(message)
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
    let bytes: number[] = [];
    for (let c = 0; c < data.length; c += 2)
        bytes.push(parseInt(data.substr(c, 2), 16));
    return Uint8Array.from(bytes);
}

function bytesToHex(data: Uint8Array): string {
    let hex: string[] = [];
    for (let i = 0; i < data.length; i++) {
        let current = data[i] < 0 ? data[i] + 256 : data[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join("");
}

const OPCODE_PING = new Uint8Array([0x9])

const heartbeat = setInterval(() => {
    if (!socket) return
    if (socket.readyState !== WebSocket.OPEN) return
    socket.send(OPCODE_PING)
}, 10000)

let keyBytesCache: Record<string, Uint8Array> = {}

type CryptoKeyCache = {
    [key in CryptoKeyType]: Record<string, CryptoKey>
}

// Web crypto supports aes gcm, aes cbc with padding, and ecc
// RSA TAGGED
type CryptoKeyType = Exclude<EncryptionType, 'rsa'>

const cryptoKeysCache: CryptoKeyCache = {
    cbc: {},
    gcm: {},
    ecc: {},
}

class BrowserCryptoWorker implements CryptoWorker {

    private worker: Worker

    constructor() {
        const url = location.origin + '/worker/browserWorker.js'
        this.worker = new Worker(url)
    }

    sendMessage(message: CryptoWorkerMessage): Promise<CryptoResults> {
        return new Promise((resolve, reject) => {
            this.worker.onmessage = function onWorkerMessage(e: MessageEvent<CryptoResults>) {
                resolve(e.data)
            }

            this.worker.onerror = function onWorkerError(e) {
                reject(`Worker error: ${e.message}`)
            }

            this.worker.postMessage(message)
        })
    }

    async terminate() {
        this.worker.terminate()
    }
}


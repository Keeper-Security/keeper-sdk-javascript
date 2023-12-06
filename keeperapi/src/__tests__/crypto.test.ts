/**
 * @jest-environment jsdom
 */

// @ts-ignore
import crypto from 'crypto'
import {nodePlatform} from "../node/platform";
import {browserPlatform} from "../browser/platform"
import {publicKey, privateKey} from "./ecies-test-vectors";
import {TextEncoder, TextDecoder} from 'util';
import type {Platform} from "../platform";
import {connectPlatform, platform} from "../platform";

Object.assign(global, {TextDecoder, TextEncoder})

Object.defineProperty(global.self, 'crypto', {
    value: {
        subtle: crypto.webcrypto.subtle,
        getRandomValues: (array: any) => crypto.randomBytes(array.length)
    }
})

describe('crypto test', () => {
    it('node API encrypts a message under EC and then decrypts it (test key pair)', async () => {
        connectPlatform(nodePlatform)
        await ecEncryptionTest(publicKey, privateKey)
    })
    it('node API encrypts a message under EC and then decrypts it (generated key pair)', async () => {
        connectPlatform(nodePlatform)
        const kp = await platform.generateECKeyPair()
        await ecEncryptionTest(kp.publicKey, kp.privateKey)
    })
    it('browser API encrypts a message under EC and then decrypts it (test key pair)', async () => {
        connectPlatform(browserPlatform)
        await ecEncryptionTest(publicKey, privateKey)
    })
    it('browser API encrypts a message under EC and then decrypts it (generated key pair)', async () => {
        connectPlatform(browserPlatform)
        const kp = await platform.generateECKeyPair()
        await ecEncryptionTest(kp.publicKey, kp.privateKey)
    })
    it('node API encrypts a message with HKDF under EC and then decrypts it (test key pair)', async () => {
        connectPlatform(nodePlatform)
        await ecWithHkdfEncryptionTest(publicKey, privateKey)
    })
    it('node API encrypts a message with HKDF under EC and then decrypts it (generated key pair)', async () => {
        connectPlatform(nodePlatform)
        const kp = await platform.generateECKeyPair()
        await ecWithHkdfEncryptionTest(kp.publicKey, kp.privateKey)
    })
    it('browser API encrypts a message with HKDF under EC and then decrypts it (test key pair)', async () => {
        connectPlatform(browserPlatform)
        await ecWithHkdfEncryptionTest(publicKey, privateKey)
    })
    it('browser API encrypts a message with HKDF under EC and then decrypts it (generated key pair)', async () => {
        connectPlatform(browserPlatform)
        const kp = await platform.generateECKeyPair()
        await ecWithHkdfEncryptionTest(kp.publicKey, kp.privateKey)
    })
})

async function ecEncryptionTest(publicKey: Uint8Array, privateKey: Uint8Array) {
    const message = 'test'
    const cipher = await platform.publicEncryptEC(platform.stringToBytes(message), publicKey, Buffer.from([]))
    expect(cipher).toBeTruthy()
    const decryptedBuffer = await platform.privateDecryptEC(cipher, privateKey, publicKey, undefined)
    const decryptedMsg = platform.bytesToString(decryptedBuffer)
    expect(decryptedMsg).toEqual(message)
}

async function ecWithHkdfEncryptionTest(publicKey: Uint8Array, privateKey: Uint8Array) {
    const message = 'test'
    const cipher = await platform.publicEncryptECWithHKDF(message, publicKey, Buffer.from([]))
    expect(cipher).toBeTruthy()
    const decryptedBuffer = await platform.privateDecryptEC(cipher, privateKey, publicKey, undefined, true)
    const decryptedMsg = platform.bytesToString(decryptedBuffer)
    expect(decryptedMsg).toEqual(message)
}

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
import {connectPlatform} from "../platform";

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
        await ecEncryptionTest(nodePlatform, publicKey, privateKey)
    })
    it('node API encrypts a message under EC and then decrypts it (generated key pair)', async () => {
        const kp = await nodePlatform.generateECKeyPair()
        connectPlatform(nodePlatform)
        await ecEncryptionTest(nodePlatform, kp.publicKey, kp.privateKey)
    })
    it('browser API encrypts a message under EC and then decrypts it (test key pair)', async () => {
        connectPlatform(browserPlatform)
        await ecEncryptionTest(browserPlatform, publicKey, privateKey)
    })
    it('browser API encrypts a message under EC and then decrypts it (generated key pair)', async () => {
        const kp = await browserPlatform.generateECKeyPair()
        connectPlatform(browserPlatform)
        await ecEncryptionTest(browserPlatform, kp.publicKey, kp.privateKey)
    })
    it('node API encrypts a message with HKDF under EC and then decrypts it (test key pair)', async () => {
        connectPlatform(nodePlatform)
        await ecWithHkdfEncryptionTest(nodePlatform, publicKey, privateKey)
    })
    it('node API encrypts a message with HKDF under EC and then decrypts it (generated key pair)', async () => {
        const kp = await nodePlatform.generateECKeyPair()
        connectPlatform(nodePlatform)
        await ecWithHkdfEncryptionTest(nodePlatform, kp.publicKey, kp.privateKey)
    })
    it('browser API encrypts a message with HKDF under EC and then decrypts it (test key pair)', async () => {
        connectPlatform(browserPlatform)
        await ecWithHkdfEncryptionTest(browserPlatform, publicKey, privateKey)
    })
    it('browser API encrypts a message with HKDF under EC and then decrypts it (generated key pair)', async () => {
        const kp = await browserPlatform.generateECKeyPair()
        connectPlatform(browserPlatform)
        await ecWithHkdfEncryptionTest(browserPlatform, kp.publicKey, kp.privateKey)
    })
})

async function ecEncryptionTest(platform: Platform, publicKey: Uint8Array, privateKey: Uint8Array) {
    const message = 'test'
    const cipher = await platform.publicEncryptEC(platform.stringToBytes(message), publicKey, Buffer.from([]))
    expect(cipher).toBeTruthy()
    const decryptedBuffer = await platform.privateDecryptEC(cipher, privateKey, publicKey, undefined)
    const decryptedMsg = platform.bytesToString(decryptedBuffer)
    expect(decryptedMsg).toEqual(message)
}

async function ecWithHkdfEncryptionTest(platform: Platform, publicKey: Uint8Array, privateKey: Uint8Array) {
    const message = 'test'
    const cipher = await platform.publicEncryptECWithHKDF(message, publicKey, Buffer.from([]))
    expect(cipher).toBeTruthy()
    const decryptedBuffer = await platform.privateDecryptEC(cipher, privateKey, publicKey, undefined, true)
    const decryptedMsg = platform.bytesToString(decryptedBuffer)
    expect(decryptedMsg).toEqual(message)
}

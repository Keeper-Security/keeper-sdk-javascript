/**
 * @jest-environment jsdom
 */

// @ts-ignore
import crypto from 'crypto'
import {nodePlatform} from "../node/platform";
import {browserPlatform} from "../browser/platform"
import {TextEncoder, TextDecoder} from 'util';
import {KeyWrapper, connectPlatform, platform} from "../platform";
import { Auth } from '../auth';
import { KeeperEnvironment } from '../endpoint';

Object.assign(global, {TextDecoder, TextEncoder})

Object.defineProperty(global.self, 'crypto', {
    value: {
        subtle: crypto.webcrypto.subtle,
        getRandomValues: (array: any) => crypto.randomBytes(array.length)
    }
})

describe('create user request', () => {

    const username = 'username'
    const password = 'password'
    let auth: Auth

    // needed to create auth initially
    connectPlatform(browserPlatform)

    beforeEach(() => {
        auth = createAuth()
    })

    it('create user request', async () => {
        connectPlatform(browserPlatform)
        const kp = await platform.generateECKeyPair()
        // @ts-expect-error private prop on class
        const user = await auth.createUserRequest(kp.privateKey)

        const {rsaPublicKey, rsaEncryptedPrivateKey, eccPublicKey, eccEncryptedPrivateKey, encryptedDeviceToken, encryptedClientKey, clientVersion} = user

        expect(rsaPublicKey).toBeDefined()
        expect(rsaPublicKey && rsaPublicKey.length === 270).toBeTruthy()

        expect(rsaEncryptedPrivateKey).toBeDefined()
        expect(rsaEncryptedPrivateKey && rsaEncryptedPrivateKey.length === 1216).toBeTruthy()

        expect(eccPublicKey).toBeDefined()
        expect(eccPublicKey && eccPublicKey.length === 65).toBeTruthy()

        expect(eccEncryptedPrivateKey).toBeDefined()
        expect(eccEncryptedPrivateKey && eccEncryptedPrivateKey.length === 60).toBeTruthy()

        expect(encryptedDeviceToken).not.toBeDefined()        

        expect(encryptedClientKey).toBeDefined()
        expect(encryptedClientKey && encryptedClientKey.length === 64).toBeTruthy()

        expect(clientVersion).toBeDefined()
        expect(clientVersion === 'ec0.0.0').toBeTruthy()
    })
})

function createAuth(){
    return new Auth({
        host: KeeperEnvironment.DEV,
        clientVersion: 'ec0.0.0',
    })
}

function createKeyWrapper(key: Uint8Array) {
    return KeyWrapper.create(key)
}
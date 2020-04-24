import {Auth, createAuthVerifier, createEncryptionParams, decryptEncryptionParams} from "../src/auth";
import {registerDeviceMessage, registerUserMessage, verifyDeviceMessage} from '../src/restMessages';
import {connectPlatform, platform} from '../src/platform';
import {nodePlatform} from '../src/node/platform';
import {generateKeyPairSync} from "crypto";
import {prompt} from './testUtil'
import {generateEncryptionKey} from '../src/utils';
import * as fs from 'fs'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

async function testRegistration() {
    const auth = new Auth({
        host: 'local.keepersecurity.com'
        // host: KeeperEnvironment.DEV
    })

    const userName = "saldoukhov+a23reg1@keepersecurity.com"

    let deviceToken: Uint8Array

    try {
        deviceToken = new Uint8Array(fs.readFileSync("device-token.dat"))
    } catch (e) {
    }

    if (!deviceToken) {
        const devRegMsg = registerDeviceMessage()
        const devRegResp = await auth.executeRest(devRegMsg)
        console.log(devRegResp)
        deviceToken = devRegResp.encryptedDeviceToken

        let pair = generateKeyPairSync('ec', {
            namedCurve: 'P-256'
        })
        let publicKey = pair.publicKey.export({
            format: 'der',
            type: 'spki'
        })

        const devVerMsg = verifyDeviceMessage({
            clientVersion: auth.clientVersion,
            deviceName: 'test device',
            devicePublicKey: publicKey,
            username: userName,
            encryptedDeviceToken: deviceToken
        })

        const devVerResp = await auth.executeRest(devVerMsg)
        console.log(devVerResp)

        const token = await prompt('device token:')

        const resp = await auth.get(`process_token/${token}`)
        console.log(platform.bytesToString(resp.data))

        fs.writeFileSync("device-token.dat", deviceToken)
    }

    const password = '111111'
    const iterations = 1000
    const dataKey = generateEncryptionKey()

    const authVerifier = await createAuthVerifier(password, iterations)
    const encryptionParams = await createEncryptionParams(password, dataKey, iterations)

    const regUserMsg = registerUserMessage({
        username: userName,
        authVerifier: authVerifier,
        encryptionParams: encryptionParams,
        encryptedDeviceToken: deviceToken,
        clientVersion: 'w14.9.11'
    })

    const regUserResp = await auth.executeRest(regUserMsg)
    console.log(regUserResp)
}

testRegistration().finally()

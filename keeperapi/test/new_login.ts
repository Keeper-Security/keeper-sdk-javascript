import {Auth, createAuthVerifier, createEncryptionParams} from "../src/auth";
import {preLoginV3Message, registerDeviceMessage, registerUserMessage, verifyDeviceMessage} from '../src/restMessages';
import {connectPlatform, platform} from '../src/platform';
import {nodePlatform} from '../src/node/platform';
import {generateKeyPairSync} from "crypto";
import {prompt} from './testUtil'
import {generateEncryptionKey} from '../src/utils';
import * as fs from 'fs'
import {Authentication} from '../src/proto';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

const userName = "saldoukhov+m1reg1@keepersecurity.com"
const clientVersion = 'w14.9.11'

async function registerDevice(auth: Auth): Promise<Uint8Array> {
    try {
        return new Uint8Array(fs.readFileSync("device-token.dat"))
    } catch (e) {
    }
    const devRegMsg = registerDeviceMessage()
    const devRegResp = await auth.executeRest(devRegMsg)
    console.log(devRegResp)

    fs.writeFileSync("device-token.dat", devRegResp.encryptedDeviceToken)
    return devRegResp.encryptedDeviceToken
}

async function verifyDevice(auth: Auth): Promise<Uint8Array> {
    const deviceToken = await registerDevice(auth)

    const approvedFileName = `device-${userName}.dat`

    if (fs.existsSync(approvedFileName)) {
        return deviceToken
    }

    let pair = generateKeyPairSync('ec', {
        namedCurve: 'P-256'
    })
    let publicKey = pair.publicKey.export({
        format: 'der',
        type: 'spki'
    })

    const devVerMsg = verifyDeviceMessage({
        clientVersion: clientVersion,
        deviceName: 'test device',
        devicePublicKey: publicKey,
        username: userName,
        encryptedDeviceToken: deviceToken
    })

    await auth.executeRest(devVerMsg)

    const token = await prompt('Enter Device token or approve via email and press enter:')
    if (!!token) {
        const resp = await auth.get(`process_token/${token}`)
        console.log(platform.bytesToString(resp.data))
    }
    fs.writeFileSync(approvedFileName, '')

    return deviceToken
}

async function testRegistration() {
    const auth = new Auth({
        host: 'local.keepersecurity.com'
        // host: KeeperEnvironment.DEV
    })

    const deviceToken = await verifyDevice(auth)
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
        clientVersion: clientVersion
    })

    const regUserResp = await auth.executeRest(regUserMsg)
    console.log(regUserResp)
}

async function testLogin() {
    const auth = new Auth({
        host: 'local.keepersecurity.com'
        // host: KeeperEnvironment.DEV
    })

    const deviceToken = await verifyDevice(auth)
    const preLoginMsg = preLoginV3Message({
        authRequest: {
            clientVersion: clientVersion,
            username: userName,
            encryptedDeviceToken: deviceToken
        },
        loginType: Authentication.LoginType.NORMAL
    })
    const preLoginResp = await auth.executeRest(preLoginMsg)
    console.log(preLoginResp)
}

// testRegistration().finally()
testLogin().finally()

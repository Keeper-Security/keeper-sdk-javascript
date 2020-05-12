import {Auth, createAuthVerifier, createEncryptionParams} from "../src/auth";
import {
    loginV3Message,
    preLoginV3Message,
    registerDeviceMessage,
    registerUserMessage,
    requestDeviceVerificationMessage, updateDeviceMessage
} from '../src/restMessages';
import {connectPlatform, platform} from '../src/platform';
import {nodePlatform} from '../src/node/platform';
import {generateKeyPairSync} from "crypto";
import {prompt} from './testUtil'
import {generateEncryptionKey, webSafe64FromBytes} from '../src/utils';
import * as fs from 'fs'
import {Authentication} from '../src/proto';
import IAuthRequest = Authentication.IAuthRequest;
import {AccountSummaryCommand} from '../src/commands';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

const userName = "admin+m6a@yozik.us"
const clientVersion = 'c16.0.0'

async function registerDevice(auth: Auth): Promise<Uint8Array> {
    // Case 1 new device, no edt no keys - call registration with pub key
    // Case 2 existing device on 14, edt but no keys - call device update
    // Case 3 existing device on 15+, has edt and keys - skip registration
    let deviceToken: Uint8Array
    let privateKey: Uint8Array
    let publicKey: Uint8Array
    try {
        deviceToken = new Uint8Array(fs.readFileSync("device-token.dat"))
        privateKey = new Uint8Array(fs.readFileSync("device-private-key.dat"))
        publicKey = new Uint8Array(fs.readFileSync("device-public-key.dat"))
    } catch (e) {
    }

    if (deviceToken && privateKey && publicKey) {  // Case 1
        return deviceToken
    }

    let pair = generateKeyPairSync('ec', {
        namedCurve: 'P-256'
    })
    publicKey = pair.publicKey.export({
        format: 'der',
        type: 'spki'
    })
    privateKey = pair.privateKey.export({
        format: 'der',
        type: 'sec1'
    })
    if (deviceToken) {
        const devUpdMsg = updateDeviceMessage({
            encryptedDeviceToken: deviceToken,
            clientVersion: clientVersion,
            deviceName: 'test device1',
            devicePublicKey: publicKey,
        })
        await auth.executeRest(devUpdMsg)
    }
    else {
        const devRegMsg = registerDeviceMessage({
            clientVersion: clientVersion,
            deviceName: 'test device',
            devicePublicKey: publicKey,
        })
        const devRegResp = await auth.executeRest(devRegMsg)
        console.log(devRegResp)
        deviceToken = devRegResp.encryptedDeviceToken
        fs.writeFileSync("device-token.dat", deviceToken)
    }
    fs.writeFileSync("device-public-key.dat", publicKey)
    fs.writeFileSync("device-private-key.dat", privateKey)
    return deviceToken
}

async function verifyDevice(auth: Auth): Promise<Uint8Array> {
    const deviceToken = await registerDevice(auth)

    const approvedFileName = `device-${userName}.dat`

    if (fs.existsSync(approvedFileName)) {
        return deviceToken
    }

    const devVerMsg = requestDeviceVerificationMessage({
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
        host: 'local.keepersecurity.com',
        // host: KeeperEnvironment.DEV
        clientVersion: clientVersion
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
        host: 'local.keepersecurity.com',
        // host: KeeperEnvironment.DEV,
        clientVersion: clientVersion
    })

    const deviceToken = await verifyDevice(auth)

    const authRequest: IAuthRequest = {
        clientVersion: clientVersion,
        username: userName,
        encryptedDeviceToken: deviceToken
    }

    const preLoginMsg = preLoginV3Message({
        authRequest: authRequest,
        loginType: Authentication.LoginType.NORMAL
    })
    const preLoginResp = await auth.executeRest(preLoginMsg)
    console.log(preLoginResp)

    const password = '111111'
    const salt = preLoginResp.salt[0]
    const authHashKey = await platform.deriveKey(password, salt.salt, salt.iterations);
    let authHash = await platform.authVerifierAsBytes(authHashKey);

    const loginMsg = loginV3Message({
        authRequest: authRequest,
        authResponse: authHash,
        encryptedLoginToken: preLoginResp.encryptedLoginToken
    })

// TODO test for account transfer and account recovery
    const loginResp = await auth.executeRest(loginMsg)
    console.log(loginResp)

    auth.setLoginParameters(userName, webSafe64FromBytes(loginResp.encryptedSessionToken))

    const accountSummaryCommand = new AccountSummaryCommand()
    accountSummaryCommand.include = ['license', 'settings']
    const accSummary = await auth.executeCommand(accountSummaryCommand)
    console.log(accSummary)
}

// testRegistration().finally()
testLogin().finally()

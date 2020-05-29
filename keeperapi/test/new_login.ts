import {Auth, createAuthVerifier, createEncryptionParams} from "../src/auth";
import {
    validateAuthHashMessage,
    requestCreateAccountMessage
} from '../src/restMessages';
import {connectPlatform, platform} from '../src/platform';
import {nodePlatform} from '../src/node/platform';
import {generateEncryptionKey, webSafe64FromBytes} from '../src/utils';
import * as fs from 'fs'
import {Authentication} from '../src/proto';
import {AccountSummaryCommand} from '../src/commands';
import {DeviceConfig} from '../src/configuration';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

// const userName = "admin@yozik.us"
// const userName = "saldoukhov@gmail.com"
// const userName = "saldoukhov@keepersecurity.com"
// const userName = "admin+m6a@yozik.us"
const userName = "admin+m29a@yozik.us"
const clientVersion = 'c16.0.0'

type DeviceConfigStorage = {
    deviceToken: string
    privateKey: string
    publicKey: string
    verifiedUsers: string[]
}

function getDeviceConfig(): DeviceConfig {
    try {
        const configStorage: DeviceConfigStorage = JSON.parse(fs.readFileSync("device-config.json").toString())
        return {
            deviceToken: platform.base64ToBytes(configStorage.deviceToken),
            publicKey: platform.base64ToBytes(configStorage.publicKey),
            privateKey: platform.base64ToBytes(configStorage.privateKey),
            verifiedUsers: configStorage.verifiedUsers
        }
    }
    catch (e) {
        return {
            deviceToken: undefined,
            privateKey: undefined,
            publicKey: undefined,
            verifiedUsers: []
        }
    }
}

function saveDeviceConfig(deviceConfig: DeviceConfig) {
    const configStorage: DeviceConfigStorage = {
        deviceToken: platform.bytesToBase64(deviceConfig.deviceToken),
        publicKey: platform.bytesToBase64(deviceConfig.publicKey),
        privateKey: platform.bytesToBase64(deviceConfig.privateKey),
        verifiedUsers: deviceConfig.verifiedUsers
    }
    fs.writeFileSync("device-config.json", JSON.stringify(configStorage, null, 2))
}

async function testRegistration() {

    const deviceConfig = getDeviceConfig()

    const auth = new Auth({
        host: 'local.keepersecurity.com',
        // host: KeeperEnvironment.DEV
        clientVersion: clientVersion,
        deviceConfig: deviceConfig,
        onDeviceConfig: saveDeviceConfig
    })

    await auth.verifyDevice(userName)

    const password = '111111'
    const iterations = 1000
    const dataKey = generateEncryptionKey()

    const authVerifier = await createAuthVerifier(password, iterations)
    const encryptionParams = await createEncryptionParams(password, dataKey, iterations)

    const regUserMsg = requestCreateAccountMessage({
        username: userName,
        authVerifier: authVerifier,
        encryptionParams: encryptionParams,
        encryptedDeviceToken: deviceConfig.deviceToken,
        clientVersion: clientVersion
    })

    const regUserResp = await auth.executeRest(regUserMsg)
    console.log(regUserResp)
}

async function testLogin() {
    const deviceConfig = getDeviceConfig()

    const auth = new Auth({
        host: 'local.keepersecurity.com',
        // host: KeeperEnvironment.DEV,
        clientVersion: clientVersion,
        deviceConfig: deviceConfig,
        onDeviceConfig: saveDeviceConfig
    })

    await auth.loginV3(userName, "111111")

    const accountSummaryCommand = new AccountSummaryCommand()
    accountSummaryCommand.include = ['license', 'settings']
    const accSummary = await auth.executeCommand(accountSummaryCommand)
    console.log(accSummary)
}

async function authHashLogin(auth: Auth, deviceToken: Uint8Array, authHashInfo: Authentication.IAuthHashInfo) {
    // TODO test for account transfer and account recovery
    const password = '111111'
    const salt = authHashInfo.salt[0]
    const authHashKey = await platform.deriveKey(password, salt.salt, salt.iterations);
    let authHash = await platform.authVerifierAsBytes(authHashKey);

    const loginMsg = validateAuthHashMessage({
        clientVersion: clientVersion,
        authResponse: authHash,
        encryptedLoginToken: authHashInfo.encryptedLoginToken
    })
    const loginResp = await auth.executeRest(loginMsg)
    console.log(loginResp)

    auth.setLoginParameters(userName, webSafe64FromBytes(loginResp.loginInfo.encryptedSessionToken))

    const accountSummaryCommand = new AccountSummaryCommand()
    accountSummaryCommand.include = ['license', 'settings']
    const accSummary = await auth.executeCommand(accountSummaryCommand)
    console.log(accSummary)
}

// testRegistration().finally()
testLogin().finally()

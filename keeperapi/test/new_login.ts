import {Auth, createAuthVerifier, createEncryptionParams} from "../src/auth";
import {requestCreateAccountMessage, validateAuthHashMessage} from '../src/restMessages';
import {connectPlatform, platform} from '../src/platform';
import {nodePlatform} from '../src/node/platform';
import {generateEncryptionKey, webSafe64FromBytes} from '../src/utils';
import {Authentication} from '../src/proto';
import {AccountSummaryCommand} from '../src/commands';
import {AuthUI3, DeviceConfig, TwoFactorInput} from '../src/configuration';
import {getDeviceConfig, prompt, saveDeviceConfig} from './testUtil';
import {KeeperEnvironment} from '../src/endpoint';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

const authUI: AuthUI3 = {
    async getTwoFactorCode(): Promise<TwoFactorInput> {
        const twoFactorCode = await prompt('Enter Code:');
        const exp = await prompt('Enter Expiration \n0 - immediately\n1 - 5 minutes\n2 - 12 hours\n3 - 24 hours\n4 - 30 days\n5 - never\n');
        return {
            twoFactorCode,
            desiredExpiration: Number(exp)
        }
    }
}

// const userName = "admin@yozik.us"
// const userName = "saldoukhov@gmail.com"
// const userName = "saldoukhov@keepersecurity.com"
// const userName = "admin+m6a@yozik.us"
// const userName = "admin+m6a@yozik.us"
const userName = "admin+duo@yozik.us"
// const userName = "admin+sms@yozik.us"
// const userName = "admin+m29a@yozik.us"
// const userName = "brian+bp@keepersecurity.com"
const clientVersion = 'c16.0.0'
const host = KeeperEnvironment.LOCAL

async function testRegistration() {

    const deviceConfig = getDeviceConfig(host)

    const auth = new Auth({
        host: host,
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
    const deviceConfig = getDeviceConfig(host)

    const auth = new Auth({
        host: host,
        clientVersion: clientVersion,
        deviceConfig: deviceConfig,
        onDeviceConfig: saveDeviceConfig,
        authUI3: authUI
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

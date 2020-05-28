import {Auth, createAuthVerifier, createEncryptionParams} from "../src/auth";
import {
    validateAuthHashMessage,
    registerDeviceMessage,
    requestDeviceVerificationMessage,
    startLoginMessage,
    twoFactorValidateCodeMessage,
    updateDeviceMessage, requestCreateAccountMessage
} from '../src/restMessages';
import {connectPlatform, platform} from '../src/platform';
import {nodePlatform} from '../src/node/platform';
import {createECDH} from "crypto";
import {prompt} from './testUtil'
import {generateEncryptionKey, generateUidBytes, webSafe64FromBytes} from '../src/utils';
import * as fs from 'fs'
import {Authentication} from '../src/proto';
import {AccountSummaryCommand} from '../src/commands';
import TwoFactorExpiration = Authentication.TwoFactorExpiration;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

// const userName = "admin@yozik.us"
// const userName = "saldoukhov@gmail.com"
// const userName = "saldoukhov@keepersecurity.com"
// const userName = "admin+m6a@yozik.us"
const userName = "admin+m28a@yozik.us"
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

    const ecdh = createECDH('prime256v1')
    ecdh.generateKeys()
    publicKey = ecdh.getPublicKey()
    privateKey = ecdh.getPrivateKey()
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

    const regUserMsg = requestCreateAccountMessage({
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

    while (true) {
        const startLoginMsg = startLoginMessage({
            username: userName,
            clientVersion: clientVersion,
            encryptedDeviceToken: deviceToken,
            messageSessionUid: generateUidBytes(),
            loginType: Authentication.LoginType.NORMAL,
            forceNewLogin: true
        })
        const startLoginResp = await auth.executeRest(startLoginMsg)
        console.log(startLoginResp)
        switch (startLoginResp.loginState) {
            case Authentication.LoginState.device_needs_approval:
                throw new Error('Device is not approved')
            case Authentication.LoginState.device_locked:
                break;
            case Authentication.LoginState.account_locked:
                break;
            case Authentication.LoginState.device_account_locked:
                break;
            case Authentication.LoginState.license_expired:
                break;
            case Authentication.LoginState.region_redirect:
                break;
            case Authentication.LoginState.redirect_cloud_sso:
                break;
            case Authentication.LoginState.redirect_onsite_sso:
                break;
            case Authentication.LoginState.user_already_logged_in:
                break;
            case Authentication.LoginState.requires_2fa:
                const token = await prompt('Enter 2fa code:')
                console.log(token)
                const twoFactorCodeMsg = twoFactorValidateCodeMessage({
                    channel: {
                        type: 1
                    },
                    encryptedLoginToken: startLoginResp.twoFactorInfo.encryptedLoginToken,
                    code: token,
                    expireIn: TwoFactorExpiration.TWO_FA_EXP_IMMEDIATELY
                })
                const twoFactorCodeResp = await auth.executeRest(twoFactorCodeMsg)
                console.log(twoFactorCodeResp)
                await authHashLogin(auth, deviceToken, twoFactorCodeResp.authHashInfo)
                return;
            case Authentication.LoginState.requires_authHash:
                await authHashLogin(auth, deviceToken, startLoginResp.authHashInfo)
                return
        }
    }
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

testRegistration().finally()
// testLogin().finally()

import {Auth, createAuthVerifier, createEncryptionParams} from "../src/auth";
import {accountSummaryMessage, requestCreateUserMessage} from '../src/restMessages';
import {connectPlatform, platform} from '../src/platform';
import {nodePlatform} from '../src/node/platform';
import {generateEncryptionKey} from '../src/utils';
import {authUI3, getDeviceConfig, prompt, saveDeviceConfig} from './testUtil';
import {KeeperEnvironment} from '../src/endpoint';
import {createECDH} from "crypto";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

// const userName = "admin@yozik.us"
// const userName = "saldoukhov@gmail.com"
// const userName = "saldoukhov@keepersecurity.com"
// const userName = "admin+m6a@yozik.us"
// const userName = "admin+plain@yozik.us"
// const userName = "admin+duo@yozik.us"
// const userName = "admin+sms@yozik.us"
// const userName = "admin+totp@yozik.us"
// const userName = "admin+backup@yozik.us"
// const userName = "admin+j16a@yozik.us"
// const userName = "brian+bp@keepersecurity.com"
// const userName = "arlen+dev5@keepersecurity.com"
//const userName = "vladimir+cw@keepersecurity.com"
const userName = "arlen+c6@keepersecurity.com"
// const clientVersion = 'c16.0.0'
const clientVersion = 'w15.0.0'
const host = KeeperEnvironment.DEV

async function testRegistration() {

    const deviceConfig = getDeviceConfig(host)

    const auth = new Auth({
        host: host,
        clientVersion: clientVersion,
        deviceConfig: deviceConfig,
        onDeviceConfig: saveDeviceConfig
    })

    await auth.registerDevice()

    // await auth.verifyDevice(userName, null)

    const password = '111111'
    const iterations = 1000
    const dataKey = generateEncryptionKey()

    const authVerifier = await createAuthVerifier(password, iterations)
    const encryptionParams = await createEncryptionParams(password, dataKey, iterations)
    // const rsaKeys = await platform.generateRSAKeyPair()
    // const rsaEncryptedPrivateKey = await platform.aesGcmEncrypt(rsaKeys.privateKey, dataKey)
    const ecdh = createECDH('prime256v1')
    ecdh.generateKeys()
    const eccEncryptedPrivateKey = await platform.aesGcmEncrypt(ecdh.getPrivateKey(), dataKey)

    const regUserMsg = requestCreateUserMessage({
        username: userName,
        authVerifier: authVerifier,
        encryptionParams: encryptionParams,
        encryptedDeviceToken: deviceConfig.deviceToken,
        clientVersion: clientVersion,
        rsaEncryptedPrivateKey: generateEncryptionKey(),
        rsaPublicKey: generateEncryptionKey(),
        encryptedDeviceDataKey: generateEncryptionKey(),
        eccPublicKey: ecdh.getPublicKey(),
        eccEncryptedPrivateKey: eccEncryptedPrivateKey
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
        authUI3: authUI3
    })
    try {
        await auth.loginV3(userName, "111111")

        let resp = await auth.executeRest(accountSummaryMessage({
            summaryVersion: 1
        }));
        console.log(resp)

        // const accountSummaryCommand = new AccountSummaryCommand()
        // accountSummaryCommand.include = ['license', 'settings']
        // const accSummary = await auth.executeCommand(accountSummaryCommand)
        // console.log(accSummary)
    }
    finally {
        auth.disconnect()
    }

}

// testRegistration().finally()
testLogin().finally()

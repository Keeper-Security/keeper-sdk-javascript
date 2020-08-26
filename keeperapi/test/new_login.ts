import {Auth, createAuthVerifier, createEncryptionParams} from "../src/auth";
import {
    accountSummaryMessage,
    registerEncryptedDataKeyForDeviceMessage,
    requestCreateUserMessage
} from '../src/restMessages';
import {connectPlatform, platform} from '../src/platform';
import {nodePlatform} from '../src/node/platform';
import {generateEncryptionKey, generateUidBytes, webSafe64FromBytes} from '../src/utils';
import {authUI3, getCredentialsAndHost, getDeviceConfig, replayRest, saveDeviceConfig, prompt} from './testUtil';
import {createECDH} from "crypto";
import {Vault} from '../src/vault';
import {SetTwoFactorAuthCommand, VerifyUserCommand} from '../src/commands';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

const clientVersion = 'w15.0.0'

async function testRegistration() {

    const {userName, password, host} = getCredentialsAndHost()

    const deviceConfig = getDeviceConfig(host)

    const auth = new Auth({
        host: host,
        clientVersion: clientVersion,
        deviceConfig: deviceConfig,
        onDeviceConfig: saveDeviceConfig
    })

    await auth.registerDevice()

    // await auth.verifyDevice(userName, null)

    const iterations = 1000
    const dataKey = generateEncryptionKey()
    //
    const authVerifier = await createAuthVerifier(password, iterations)
    const encryptionParams = await createEncryptionParams(password, dataKey, iterations)


    const rsaKeys = await platform.generateRSAKeyPair2()
    // const pk = getPrivateKey(rsaKeys.keyPair)
    const rsaPublicKey: Buffer = rsaKeys.exportKey('public-der');
    const rsaPrivateKey: Buffer = rsaKeys.exportKey('private-der');


    // const keyPair = generateKeyPairSync("rsa", {
    //     modulusLength: 2048,
    // })
    // console.log(keyPair.privateKey.export({
    //     format: 'der',
    //     type: 'pkcs1'
    // }))

    const rsaEncryptedPrivateKey = await platform.aesCbcEncrypt(rsaPrivateKey, dataKey, true)
    const encryptedClientKey = await platform.aesCbcEncrypt(generateEncryptionKey(), dataKey, true)
    // const rsaEncryptedPrivateKey1 = await platform.aesCbcEncrypt(pk, dataKey, true)

    console.log(rsaEncryptedPrivateKey.length)
    // console.log(rsaEncryptedPrivateKey1)


    const ecdh = createECDH('prime256v1')
    ecdh.generateKeys()
    const eccEncryptedPrivateKey = await platform.aesGcmEncrypt(ecdh.getPrivateKey(), dataKey)
    const encryptedDeviceDataKey = await platform.publicEncryptEC(dataKey, ecdh.getPublicKey())

    // const code = await prompt('Enter code:\n')

    const regUserMsg = requestCreateUserMessage({
        username: userName,
        authVerifier: authVerifier,
        encryptionParams: encryptionParams,
        encryptedDeviceToken: deviceConfig.deviceToken,
        clientVersion: clientVersion,
        rsaEncryptedPrivateKey: rsaEncryptedPrivateKey,
        rsaPublicKey: rsaPublicKey,
        eccPublicKey: ecdh.getPublicKey(),
        eccEncryptedPrivateKey: eccEncryptedPrivateKey,
        encryptedClientKey: encryptedClientKey,
        encryptedDeviceDataKey: encryptedDeviceDataKey
    })

    const regUserResp = await auth.executeRest(regUserMsg)
    console.log(regUserResp)

    // const code = await prompt('Enter code:\n')
    // const validateMsg = validateCreateUserVerificationCodeMessage({
    //     username: userName,
    //     verificationCode: code,
    //     clientVersion: clientVersion
    // })
    //
    // const validateResp = await auth.executeRest(validateMsg)
    // console.log(validateMsg)

}

async function testLogin() {
    const {userName, password, host} = getCredentialsAndHost()

    const deviceConfig = getDeviceConfig(host)

    const auth = new Auth({
        host: host,
        clientVersion: 'i15.0.0',
        // clientVersion: clientVersion,
        deviceConfig: deviceConfig,
        onDeviceConfig: saveDeviceConfig,
        authUI3: authUI3
    })
    try {
        await auth.loginV3({
            username: userName,
            password,
        })
        console.log(auth.dataKey)
        // let vault = new Vault(auth)
        //
        // vault.noTypedRecords = true;
        // await vault.syncDown(0, true)
        // for (let record of vault.records) {
        //     console.log(record.data)
        //     console.log(record.recordData.udata)
        //     console.log(record.nonSharedData)
        // }

        // const encryptedDeviceDataKey = await platform.publicEncryptEC(auth.dataKey, deviceConfig.publicKey)
        // const regEncDataKeyMsg = registerEncryptedDataKeyForDeviceMessage({
        //     encryptedDeviceToken: deviceConfig.deviceToken,
        //     encryptedDeviceDataKey: encryptedDeviceDataKey
        // })
        // let resp = await auth.executeRest(regEncDataKeyMsg);
        // console.log(resp)

        let resp = await auth.executeRest(accountSummaryMessage({
            summaryVersion: 1
        }));
        console.log(resp)
    } finally {
        auth.disconnect()
    }

}

async function testECIES() {
    const ecdh = createECDH('prime256v1')
    ecdh.generateKeys()
    const data = generateUidBytes()
    console.log(data)
    const endData = await platform.publicEncryptEC(data, ecdh.getPublicKey())
    const decData = await platform.privateDecryptEC(endData, ecdh.getPrivateKey())
    console.log(decData)
}

// testRegistration().finally()
testLogin().finally()
// testECIES().finally()


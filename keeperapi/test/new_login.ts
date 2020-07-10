import {Auth, createAuthVerifier, createEncryptionParams} from "../src/auth";
import {requestCreateUserMessage} from '../src/restMessages';
import {connectPlatform, platform} from '../src/platform';
import {nodePlatform} from '../src/node/platform';
import {generateEncryptionKey} from '../src/utils';
import {authUI3, getCredentialsAndHost, getDeviceConfig, saveDeviceConfig} from './testUtil';
import {createECDH} from "crypto";
import {Vault} from '../src/vault';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

const clientVersion = 'w15.0.0'

async function testRegistration() {

    const { userName, password, host } = getCredentialsAndHost()

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
    const { userName, password, host } = getCredentialsAndHost()

    const deviceConfig = getDeviceConfig(host)

    const auth = new Auth({
        host: host,
        clientVersion: clientVersion,
        deviceConfig: deviceConfig,
        onDeviceConfig: saveDeviceConfig,
        authUI3: authUI3
    })
    try {
        await auth.loginV3(userName, password)

        console.log(auth.dataKey)

        let vault = new Vault(auth)

        vault.noTypedRecords = true;
        await vault.syncDown(true)
        for (let record of vault.records) {
            console.log(record.data)
            console.log(record.recordData.udata)
            console.log(record.nonSharedData)
        }

        // let resp = await auth.executeRest(accountSummaryMessage({
        //     summaryVersion: 1
        // }));
        // console.log(resp)
    }
    finally {
        auth.disconnect()
    }

}

// testRegistration().finally()
testLogin().finally()


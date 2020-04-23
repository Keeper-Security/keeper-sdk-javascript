import { Auth } from "../src/auth";
import {registerDeviceMessage, verifyDeviceMessage} from '../src/restMessages';
import {connectPlatform} from '../src/platform';
import {nodePlatform} from '../src/node/platform';
import {generateKeyPairSync} from "crypto";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

async function testRegistration() {
    const auth = new Auth({
        host: 'local.keepersecurity.com'
        // host: KeeperEnvironment.DEV
    })
    const devRegMsg = registerDeviceMessage()
    const deviceToken = await auth.executeRest(devRegMsg)
    console.log(deviceToken)

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
        username: "saldoukhov+s21te@keepersecurity.com",
        encryptedDeviceToken: deviceToken.encryptedDeviceToken
    })

    const devVerResp = await auth.executeRest(devVerMsg)
    console.log(devVerResp)
}

testRegistration().finally()

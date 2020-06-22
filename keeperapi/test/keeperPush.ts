import {authUI3, readDeviceConfig, saveDeviceConfig} from './testUtil';
import {Auth} from '../src/auth';
import {KeeperEnvironment} from '../src/endpoint';
import {connectPlatform} from '../src/platform';
import {nodePlatform} from '../src/node/platform';
import {normal64Bytes} from '../src/utils';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

const userName = "admin@yozik.us"
const clientVersion = 'w15.0.0'
const host = KeeperEnvironment.LOCAL

async function waitPush() {
    const deviceConfig = readDeviceConfig('device-config-local.localdb.json')

    const auth = new Auth({
        host: host,
        clientVersion: clientVersion,
        deviceConfig: deviceConfig,
        onDeviceConfig: saveDeviceConfig,
        authUI3: authUI3
    })
    try {
        await auth.loginV3(userName, "111111")
        while (true) {
            const push = await auth.getPushMessage();
            console.log(push)
            await auth.approveDevice(normal64Bytes(push.encryptedDeviceToken))
        }
    }
    finally {
        auth.disconnect()
    }
}

// testRegistration().finally()
waitPush().finally()

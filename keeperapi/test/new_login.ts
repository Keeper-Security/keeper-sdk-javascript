import { Auth } from "../src/auth";
import {registerDeviceWithKinfoMessage} from '../src/restMessages';
import {connectPlatform} from '../src/platform';
import {nodePlatform} from '../src/node/platform';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

async function testRegistration() {
    const auth = new Auth({
        host: 'local.keepersecurity.com'
        // host: KeeperEnvironment.DEV
    })
    const devRegMsg = registerDeviceWithKinfoMessage()
    const deviceToken = await auth.executeRest(devRegMsg)
    console.log(deviceToken)
}

testRegistration().finally()

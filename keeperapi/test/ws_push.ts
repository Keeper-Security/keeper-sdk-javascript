import {Auth} from "../src/auth";
import {sendSessionMessage} from '../src/restMessages';
import {connectPlatform} from '../src/platform';
import {nodePlatform} from '../src/node/platform';
import {generateUidBytes} from '../src/utils';
import {AuthUI3, TwoFactorInput} from '../src/configuration';
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
    },
    prompt: prompt
}

const userName = "vladimir+cw@keepersecurity.com"
//const userName = "mhewett+sso42@keepersecurity.com"
const clientVersion = 'w15.0.0'
const host = KeeperEnvironment.DEV

async function testWsPushMessage() {
    const deviceConfig = getDeviceConfig(host)

    const auth = new Auth({
        host: host,
        clientVersion: clientVersion,
        deviceConfig: deviceConfig,
        onDeviceConfig: saveDeviceConfig,
        authUI3: authUI
    })
    try {
        await auth.loginV3(userName, "111111")

        const command: string = "test_command"

        let wsDataPromise = auth.getWsMessage();

        let resp = await auth.executeRest(sendSessionMessage({
            messageSessionUid: auth.getMessageSessionUid(),
            command: command,
            username: userName
        }));

        let wsData = await wsDataPromise;
        console.log(wsData)
        if (wsData.command == command && wsData.username == userName) {
            console.log("SUCCESS!")
        } else {
            console.log("Test FAILED!")
        }
    }
    finally {
        auth.disconnect()
    }
}

testWsPushMessage().finally()

import * as readline from "readline";
import * as fs from 'fs'
import * as path from 'path'

import {
    AuthUI3,
    DeviceConfig,
    DeviceVerificationMethods,
    SessionStorage, TwoFactorChannelData
} from '../src/configuration'
import {platform} from '../src/platform';
import {KeeperEnvironment} from '../src/endpoint';
import {Authentication} from '../src/proto';
import {normal64Bytes} from '../src/utils';
import TwoFactorPushType = Authentication.TwoFactorPushType;

export const prompt = async (message: string): Promise<string> => new Promise<string>((resolve) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(message, response => {
        resolve(response)
        rl.close()
    });
})

export const authUI3: AuthUI3 = {
    async waitForDeviceApproval(channels): Promise<boolean> {
        const ch = channels.map(x => x.channel).sort()
        const methods = ch.map(x => `${x + 1} - ${DeviceVerificationMethods[x]}`).join('\n')
        const verifyMethod = await prompt(`Enter device verification method:\n${methods}\n`)
        const no = parseInt(verifyMethod)
        if (Number.isNaN(no)) return false
        const channel = channels.find(x => x.channel === no - 1)
        if (!channel) return false

        if (channel.sendPush) {
            await channel.sendPush()
        }
        if (channel.setExpiration) {
            const exp = await prompt('Enter Expiration \n0 - immediately\n1 - 5 minutes\n2 - 12 hours\n3 - 24 hours\n4 - 30 days\n5 - never\n');
            channel.setExpiration(Number(exp))
        }

        if (channel.sendCode) {
            const code = await prompt('Enter Device code or approve via email and press enter:')
            if (code) {
                await channel.sendCode(code)
            }
        } else {
            await prompt('Press <Enter> to stop waiting.')
        }
        return true
    },
    async waitForTwoFactorCode(channels: TwoFactorChannelData[]): Promise<boolean> {
        const channel = channels[0]
        const exp = await prompt('Enter Expiration \n0 - immediately\n1 - 5 minutes\n2 - 12 hours\n3 - 24 hours\n4 - 30 days\n5 - never\n');
        channel.setExpiration(Number(exp))
        const pushPrefix = 'push='
        if (channel.availablePushes) {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            })
            console.log(pushPrefix + '<action>, where action: ' + channel.availablePushes.map(x => `${x + 1} - ${TwoFactorPushType[x]}`).join('\n'))
        }
        const answer = await prompt('Enter Code:')
        if (channel.sendPush && answer.startsWith(pushPrefix)) {
            const pushType = Number(answer.substr(pushPrefix.length))
            if (!isNaN(pushType)) {
                await channel.sendPush(pushType)
            }
        } else {
            await channel.sendCode(answer)
        }
        return true
    },
}

type DeviceConfigStorage = {
    deviceToken: string
    privateKey: string
    publicKey: string
    transmissionKeyId: number
}

const configFileName = (deviceName: string, environment: KeeperEnvironment): string => {
    const folder = path.resolve(`${__dirname}/config/${deviceName}`)
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder)
    }
    return `${folder}/${configNames[environment]}`;
};

export function getDeviceConfig(deviceName: string, environment: KeeperEnvironment): DeviceConfig {
    const config = readDeviceConfig(configFileName(deviceName, environment))
    config.deviceName = deviceName
    return config
}

export function readDeviceConfig(fileName: string): DeviceConfig {
    try {
        const configStorage: DeviceConfigStorage = JSON.parse(fs.readFileSync(fileName).toString())
        return {
            deviceName: undefined,
            deviceToken: configStorage.deviceToken ? platform.base64ToBytes(configStorage.deviceToken) : undefined,
            publicKey: configStorage.publicKey ? platform.base64ToBytes(configStorage.publicKey) : undefined,
            privateKey: configStorage.privateKey ? platform.base64ToBytes(configStorage.privateKey) : undefined,
            transmissionKeyId: configStorage.transmissionKeyId
        }
    }
    catch (e) {
        return {
            deviceName: undefined,
            deviceToken: undefined,
            privateKey: undefined,
            publicKey: undefined,
            transmissionKeyId: 0
        }
    }
}

export function saveDeviceConfig(deviceConfig: DeviceConfig, environment: KeeperEnvironment) {

    const configStorage: DeviceConfigStorage = {
        deviceToken: deviceConfig.deviceToken ? platform.bytesToBase64(deviceConfig.deviceToken) : undefined,
        publicKey: deviceConfig.publicKey ? platform.bytesToBase64(deviceConfig.publicKey) : undefined,
        privateKey: deviceConfig.privateKey ? platform.bytesToBase64(deviceConfig.privateKey): undefined,
        transmissionKeyId: deviceConfig.transmissionKeyId
    }
    fs.writeFileSync(configFileName(deviceConfig.deviceName, environment), JSON.stringify(configStorage, null, 2))
}

const configNames = {
    'local.keepersecurity.com': 'device-config-local.json',
    'dev.keepersecurity.com': 'device-config-dev.json',
    'dev2.keepersecurity.com': 'device-config-dev2.json',
    'qa.keepersecurity.com': 'device-config-qa.json',
    'keepersecurity.com': 'device-config.json',
    'dev.keepersecurity.eu': 'device-config-dev-eu.json',
    'qa.keepersecurity.eu': 'device-config-qa-eu.json',
    'keepersecurity.eu': 'device-config-eu.json',
}

export function getCredentialsAndHost(): { userName: string; password: string; host: KeeperEnvironment  } {
    try {
        const fileContent = fs.readFileSync(path.resolve(`${__dirname}/../credentials.config`)).toString()
        const lines = fileContent.split('\n')
        const hostOverride = lines[0][0] === '#' ? undefined : lines[0]
        const parts = lines.slice(1).find(x => x && x[0] != '#').split(',')
        return { userName: parts[0], password: parts[1], host: KeeperEnvironment[hostOverride || parts[2]] }
    }
    catch (e) {
        throw Error('Error parsing credentials.config file')
    }
}

export async function replayRest(path: string, request: string) {
    const response = await platform.post(`https://local.keepersecurity.com/api/rest/${path}`, normal64Bytes(request))
    console.log(response)
}

type SessionData = {
    lastUsername: string
    lastCloneCode: string
}

export class TestSessionStorage implements SessionStorage {

    private sessionData: SessionData
    private fileName: string;

    constructor(deviceName: string, environment: KeeperEnvironment) {
        this.fileName = configFileName(deviceName, environment).replace('device-config', 'session')
        try {
            this.sessionData = JSON.parse(fs.readFileSync(this.fileName).toString())
        }
        catch (e) {
            this.sessionData = {
                lastUsername: null,
                lastCloneCode: null
            }
        }
    }

    get lastUsername() {
        return this.sessionData.lastUsername
    };

    getCloneCode(username: string): Uint8Array | null {
        return this.sessionData.lastCloneCode && this.sessionData.lastUsername === username
            ? platform.base64ToBytes(this.sessionData.lastCloneCode)
            : null;
    }

    saveCloneCode(username: string, cloneCode: Uint8Array): void {
        this.sessionData.lastUsername = username
        this.sessionData.lastCloneCode = platform.bytesToBase64(cloneCode)
        fs.writeFileSync(this.fileName, JSON.stringify(this.sessionData, null, 2))
    }
}

import * as readline from "readline";
import {AuthUI3, DeviceConfig, DeviceVerificationMethods, TwoFactorInput} from '../src/configuration'
import * as fs from 'fs'
import {platform} from '../src/platform';
import {KeeperEnvironment} from '../src/endpoint';
import {Authentication} from '../src/proto';
import TwoFactorExpiration = Authentication.TwoFactorExpiration;
import {normal64Bytes} from '../src/utils';

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
    async getDeviceVerificationCode(): Promise<string> {
        const token = await prompt('Enter Device code or approve via email and press enter:')
        return token
    },
    async getDeviceVerificationMethod(): Promise<DeviceVerificationMethods> {
        const verifyMethod = await prompt('Enter device verification method: \n0 - email\n1 - 2fa code\n2 - 2fa push\n3 - sms\n4 - keeper push\n');
        return Number(verifyMethod)
    },
    async getTwoFactorCode(): Promise<TwoFactorInput> {
        const twoFactorCode = await prompt('Enter Code:');
        const exp = await prompt('Enter Expiration \n0 - immediately\n1 - 5 minutes\n2 - 12 hours\n3 - 24 hours\n4 - 30 days\n5 - never\n');
        return {
            twoFactorCode,
            desiredExpiration: Number(exp)
        }
    },
    async getTwoFactorExpiration(): Promise<TwoFactorExpiration> {
        const exp = await prompt('Enter Expiration \n0 - immediately\n1 - 5 minutes\n2 - 12 hours\n3 - 24 hours\n4 - 30 days\n5 - never\n');
        return Number(exp)
    },
}

type DeviceConfigStorage = {
    deviceToken: string
    privateKey: string
    publicKey: string
    transmissionKeyId: number
}

export function getDeviceConfig(environment: KeeperEnvironment): DeviceConfig {
    return readDeviceConfig(configNames[environment])
}

export function readDeviceConfig(fileName: string): DeviceConfig {
    try {
        const configStorage: DeviceConfigStorage = JSON.parse(fs.readFileSync(fileName).toString())
        return {
            deviceToken: configStorage.deviceToken ? platform.base64ToBytes(configStorage.deviceToken) : undefined,
            publicKey: configStorage.publicKey ? platform.base64ToBytes(configStorage.publicKey) : undefined,
            privateKey: configStorage.privateKey ? platform.base64ToBytes(configStorage.privateKey) : undefined,
            transmissionKeyId: configStorage.transmissionKeyId
        }
    }
    catch (e) {
        return {
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
    fs.writeFileSync(configNames[environment], JSON.stringify(configStorage, null, 2))
}

export const configNames = {
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
        const fileContent = fs.readFileSync('credentials.config').toString()
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

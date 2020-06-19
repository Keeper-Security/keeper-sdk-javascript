import * as readline from "readline";
import {AuthUI3, DeviceConfig, TwoFactorInput} from '../src/configuration';
import * as fs from 'fs'
import {platform} from '../src/platform';
import {KeeperEnvironment} from '../src/endpoint';
import {Authentication} from '../src/proto';
import TwoFactorExpiration = Authentication.TwoFactorExpiration;

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
    prompt: prompt
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

const configNames = {
    'local.keepersecurity.com': 'device-config-local.json',
    'dev.keepersecurity.com': 'device-config-dev.json',
    'qa.keepersecurity.com': 'device-config-qa.json',
    'keepersecurity.com': 'device-config.json'
}

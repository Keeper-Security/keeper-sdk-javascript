import * as readline from "readline";
import {DeviceConfig} from '../src/configuration';
import * as fs from 'fs'
import {platform} from '../src/platform';
import {KeeperEnvironment} from '../src/endpoint';

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

type DeviceConfigStorage = {
    deviceToken: string
    privateKey: string
    publicKey: string
    verifiedUsers: string[]
}

export function getDeviceConfig(environment: KeeperEnvironment): DeviceConfig {
    try {
        const configStorage: DeviceConfigStorage = JSON.parse(fs.readFileSync(configNames[environment]).toString())
        return {
            deviceToken: platform.base64ToBytes(configStorage.deviceToken),
            publicKey: platform.base64ToBytes(configStorage.publicKey),
            privateKey: platform.base64ToBytes(configStorage.privateKey),
            verifiedUsers: configStorage.verifiedUsers
        }
    }
    catch (e) {
        return {
            deviceToken: undefined,
            privateKey: undefined,
            publicKey: undefined,
            verifiedUsers: []
        }
    }
}

export function saveDeviceConfig(deviceConfig: DeviceConfig, environment: KeeperEnvironment) {

    const configStorage: DeviceConfigStorage = {
        deviceToken: platform.bytesToBase64(deviceConfig.deviceToken),
        publicKey: platform.bytesToBase64(deviceConfig.publicKey),
        privateKey: platform.bytesToBase64(deviceConfig.privateKey),
        verifiedUsers: deviceConfig.verifiedUsers
    }
    fs.writeFileSync(configNames[environment], JSON.stringify(configStorage, null, 2))
}

const configNames = {
    'local.keepersecurity.com': 'device-config-local.json',
    'dev.keepersecurity.com': 'device-config-dev.json',
    'qa.keepersecurity.com': 'device-config-qa.json',
    'keepersecurity.com': 'device-config.json'
}

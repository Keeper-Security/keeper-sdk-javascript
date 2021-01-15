import * as readline from "readline";
import * as fs from 'fs'
import * as path from 'path'

import {
    AuthUI3,
    DeviceConfig,
    DeviceVerificationMethods, KeyValueStorage,
    SessionStorage, TransmissionKey, TwoFactorChannelData
} from '../src/configuration'
import {platform} from '../src/platform';
import {KeeperEnvironment} from '../src/endpoint';
import {Authentication} from '../src/proto';
import {generateTransmissionKey, webSafe64FromBytes} from '../src/utils';
import TwoFactorPushType = Authentication.TwoFactorPushType;
import {
    getEnterprisePublicKeyMessage,
    registerEncryptedDataKeyForDeviceMessage,
    RestMessage, setEnterpriseDataKeyMessage,
    setUserSettingMessage,
    ssoSamlMessage
} from '../src/restMessages';
import {launch} from 'puppeteer';
import {Auth} from '../src/auth';

export const prompt = async (message: string, cancel?: Promise<void>): Promise<string> => new Promise<string>((resolve, reject) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    if (cancel) {
        cancel.then(() => {
            rl.close()
            reject()
        })
    }
    rl.question(message, response => {
        resolve(response)
        rl.close()
    });
})

export const timeout = async (ms: number): Promise<void> => new Promise((resolve) => {
    let id = setTimeout(() => {
        clearTimeout(id);
        resolve();
    }, ms)
})

export async function openBrowser(url: string) {
    const browser = await launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    })
    const pages = await browser.pages()
    const page = pages[0]
    await page.goto(url);
}

export const authUI3: AuthUI3 = {
    async waitForDeviceApproval(channels): Promise<boolean> {
        const ch = channels.map(x => x.channel).sort()
        const methods = ch.map(x => `${x + 1} - ${DeviceVerificationMethods[x]}`).join('\n')
        const verifyMethod = await prompt(`Enter device verification method:\n${methods}\n`)
        const no = parseInt(verifyMethod)
        if (Number.isNaN(no)) return false
        const channel = channels.find(x => x.channel === no - 1)
        if (!channel) return false

        if (channel.sendApprovalRequest) {
            await channel.sendApprovalRequest()
        }
        if (channel.setExpiration) {
            const exp = await prompt('Enter Expiration \n0 - immediately\n1 - 5 minutes\n2 - 12 hours\n3 - 24 hours\n4 - 30 days\n5 - never\n');
            channel.setExpiration(Number(exp))
        }

        if (channel.validateCode) {
            const code = await prompt('Enter Device code or approve via email and press enter:')
            if (code) {
                await channel.validateCode(code)
            }
        } else {
            await prompt('Press <Enter> to stop waiting.')
        }
        return true
    },
    async waitForTwoFactorCode(channels: TwoFactorChannelData[], cancel: Promise<void>): Promise<boolean> {
        const channel = channels[0]
        const exp = await prompt('Enter Expiration \n0 - immediately\n1 - 5 minutes\n2 - 12 hours\n3 - 24 hours\n4 - 30 days\n5 - never\n');
        channel.setExpiration(Number(exp))

        let promptMessage
        if (channel.availablePushes) {
            const pushActions = channel.availablePushes.map(x => `${x} - ${TwoFactorPushType[x]}`).join('\n')
            console.log(`Push actions available:\n${pushActions}`)
            promptMessage = 'Enter push action code or two factor code:\n'
        }
        else {
            promptMessage = 'Enter two factor code:\n'
        }

        while (true) {
            const answer = await prompt(promptMessage, cancel)
            if (answer.length === 1) {
                const pushType = Number(answer)
                if (!isNaN(pushType)) {
                    await channel.sendPush(pushType)
                }
            }  else
            {
                await channel.sendCode(answer)
                break
            }
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
    'dev.keepersecurity.eu': 'device-config-dev.json',
    'qa.keepersecurity.eu': 'device-config-qa.json',
    'keepersecurity.eu': 'device-config.json',
}

const storageNames = {
    'local.keepersecurity.com': 'kvs-dev.json',
    'dev.keepersecurity.com': 'kvs-dev.json',
    'dev2.keepersecurity.com': 'kvs-dev2.json',
    'qa.keepersecurity.com': 'kvs-qa.json',
    'keepersecurity.com': 'kvs-prod.json',
    'dev.keepersecurity.eu': 'kvs-dev-eu.json',
    'qa.keepersecurity.eu': 'kvs-qa-eu.json',
    'keepersecurity.eu': 'kvs-prod-eu.json',
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

type SessionData = {
    [host:string]: {
        lastUsername: string
        lastCloneCode: string
    }
}

export class TestKeyValueStorage implements KeyValueStorage {

    constructor(private environment: KeeperEnvironment) {
    }

    fileName(): string {
        return path.resolve(`${__dirname}/config/${storageNames[this.environment]}`)
    }

    readStorage(): any {
        try {
            return  JSON.parse(fs.readFileSync(this.fileName()).toString())
        }
        catch (e) {
            return {}
        }
    }

    saveStorage(storage: any) {
        fs.writeFileSync(this.fileName(), JSON.stringify(storage, null, 2))
    }

    getValue(key: string): string | null {
        const storage = this.readStorage()
        const keyParts = key.split('/')
        let obj = storage
        for (const part of keyParts) {
            obj = obj[part]
            if (!obj) {
                return null
            }
        }
        return obj.toString();
    }

    saveValue(key: string, value: string): void {
        const storage = this.readStorage()
        const keyParts = key.split('/')
        let obj = storage
        for (const part of keyParts.slice(0, -1)) {
            if (!obj[part]) {
                obj[part] = {}
            }
            obj = obj[part]
        }
        obj[keyParts.slice(-1)[0]] = value
        this.saveStorage(storage)
    }

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
                [environment]: {
                    lastUsername: null,
                    lastCloneCode: null
                }
            }
        }
    }

    get lastUsername() {
        return this.sessionData.host.lastUsername
    };

    getCloneCode(host: string, username: string): Uint8Array | null {
        const sessionData = this.sessionData[host]
        if (!sessionData) {
            return null
        }
        return sessionData.lastCloneCode && sessionData.lastUsername === username
            ? platform.base64ToBytes(this.sessionData[host].lastCloneCode)
            : null;
    }

    saveCloneCode(host: string, username: string, cloneCode: Uint8Array): void {
        this.sessionData[host] = {
            lastUsername: username,
            lastCloneCode: platform.bytesToBase64(cloneCode),
        }

        fs.writeFileSync(this.fileName, JSON.stringify(this.sessionData, null, 2))
    }
}

export async function enablePersistentLogin(auth: Auth) {
    await auth.executeRest(setUserSettingMessage({
        setting: "persistent_login",
        value: "1"
    }))
    const encryptedDeviceDataKey = await platform.publicEncryptEC(auth.dataKey, auth.options.deviceConfig.publicKey)
    await auth.executeRest(registerEncryptedDataKeyForDeviceMessage({
        encryptedDeviceToken: auth.options.deviceConfig.deviceToken,
        encryptedDeviceDataKey
    }))
}

export async function shareDataKeyWithEnterprise(auth: Auth) {
    const pubKeyResponse = await auth.executeRest(getEnterprisePublicKeyMessage())
    const encrypted = await platform.publicEncryptEC(auth.dataKey, pubKeyResponse.enterpriseECCPublicKey)
    await auth.executeRest(setEnterpriseDataKeyMessage({
        userEncryptedDataKey: encrypted
    }))
}

export async function cloudSsoLogin(ssoLoginUrl: string, messageSessionUid: Uint8Array, useGet: boolean = false): Promise<any> {
    let {privateKey, publicKey} = await platform.generateRSAKeyPair();
    let encodedPublicKey: string = webSafe64FromBytes(publicKey);

    console.log("public key length is " + encodedPublicKey.length);

    try {
        console.log("\n*** cloudSsoLogin at " + ssoLoginUrl + " ***");

        // We have full URL but the library wants to recreate it so we let it.
        let pos = ssoLoginUrl.indexOf("login");
        ssoLoginUrl = ssoLoginUrl.substring(pos);

        // This should return HTML
        let ssoLoginResp = await executeRestToHTML(ssoSamlMessage(ssoLoginUrl),
            {
                "message_session_uid": webSafe64FromBytes(messageSessionUid),
                "key": encodedPublicKey,
                "device_id": 2141430350,  //"TarD2lczSTI4ZJx1bG0F8aAc0HrK5JoLpOqH53sRFg0=",
            }, useGet);

        console.log("\n---------- HTML ---------------\n" + ssoLoginResp + "-----------------------------------\n");
        return ssoLoginResp;

    } catch (e) {
        console.log(e)
    }
    return {};
}

/**
 * This is the more secure version of login that uses an encrypted protobuf.
 * July 2020
 */
export async function cloudSsoLogin2(ssoLoginUrl: string, encodedPayload: string, useGet: boolean = false): Promise<any> {
    try {
        console.log("\n*** cloudSsoLogin2 at " + ssoLoginUrl + " ***");

        // We have full URL but the library wants to recreate it so we let it.
        let pos = ssoLoginUrl.indexOf("login");
        ssoLoginUrl = ssoLoginUrl.substring(pos);

        // This should return HTML
        let ssoLoginResp = await executeRestToHTML(ssoSamlMessage(ssoLoginUrl),
            {
                "payload": encodedPayload
            }, useGet);

        console.log("\n---------- HTML ---------------\n" + ssoLoginResp + "-----------------------------------\n");
        return ssoLoginResp;

    } catch (e) {
        console.log(e)
    }
    return {};
}

export async function cloudSsoLogout(ssoLogoutUrl: string, messageSessionUid: Uint8Array, useGet: boolean = false): Promise<any> {
    let keyPair: any = await platform.generateRSAKeyPair();
    let publicKey: Buffer = keyPair.exportKey('pkcs1-public-der');
    let encodedPublicKey: string = webSafe64FromBytes(publicKey);

    try {
        console.log("\n*** cloudSsoLogout at " + ssoLogoutUrl + " ***");

        // We have full URL but the library wants to recreate it so we let it.
        let pos = ssoLogoutUrl.indexOf("logout");
        ssoLogoutUrl = ssoLogoutUrl.substring(pos);

        // This should return HTML
        let ssoLogoutResp = await executeRestToHTML(ssoSamlMessage(ssoLogoutUrl),
            {
                "message_session_uid": webSafe64FromBytes(messageSessionUid),
                "key": encodedPublicKey
            }, useGet);

        console.log("\n---------- HTML ---------------\n" + ssoLogoutResp + "-----------------------------------\n");
        return ssoLogoutResp;

    } catch (e) {
        console.log(e)
    }
    return {};
}

/**
 * This is the more secure version of logout that uses an encrypted protobuf.
 * July 2020
 */
export async function cloudSsoLogout2(ssoLogoutUrl: string, encodedPayload: string, useGet: boolean = false): Promise<any> {
    const encryptionKey: TransmissionKey = generateTransmissionKey(this.endpoint.getTransmissionKey().publicKeyId);
    const encodedEncryptionKey: string = webSafe64FromBytes(encryptionKey.encryptedKey);
    let keyPair: any = await platform.generateRSAKeyPair();
    let publicKey: Buffer = keyPair.exportKey('pkcs1-public-der');
    let encodedPublicKey: string = webSafe64FromBytes(publicKey);

    console.log("encodedEncryptionKey = " + encodedEncryptionKey);

    try {
        console.log("\n*** cloudSsoLogout2 at " + ssoLogoutUrl + " ***");

        // We have full URL but the library wants to recreate it so we let it.
        let pos = ssoLogoutUrl.indexOf("logout");
        ssoLogoutUrl = ssoLogoutUrl.substring(pos);

        // This should return HTML
        let ssoLogoutResp = await executeRestToHTML(ssoSamlMessage(ssoLogoutUrl),
            {
                "key": encodedEncryptionKey,
                "payload": encodedPayload
            }, useGet);

        console.log("\n---------- HTML ---------------\n" + ssoLogoutResp + "-----------------------------------\n");
        return ssoLogoutResp;

    } catch (e) {
        console.log(e)
    }
    return {};
}

/**
 * Call this for REST calls expected to return HTML or a 303 redirect.
 */
export async function executeRestToHTML<TIn, TOut>(message: RestMessage<TIn, TOut>, formParams: any = {}, useGet: boolean = false): Promise<string> {
    // let request = await this.prepareRequest(message.toBytes(), sessionToken)
    let theUrl = message.path;
    if (!theUrl.startsWith("http")) {
        theUrl = this.getUrl(theUrl);
    }

    let response = null;
    if (useGet) {
        console.log("  using GET");
        theUrl = theUrl + "?" + String(new URLSearchParams(formParams));
        response = await platform.get(theUrl, {});
    } else {
        console.log("  using POST");
        formParams = formParams ? String(new URLSearchParams(formParams)) : "";
        response = await platform.post(
            theUrl,
            formParams,
            {"Content-Type": "application/x-www-form-urlencoded"}
        );
    }

    console.log("SSO response is", response.statusCode);

    const possibleRedirects = [200, 303]

// Redirect?
    if (possibleRedirects.indexOf(response.statusCode) >= 0) {
        let redirectUrl = '';
        if (response.statusCode == 303) {
            redirectUrl = response.headers["location"];
        } else if (response.statusCode == 200) {
            redirectUrl = theUrl;
        }
        if (redirectUrl) {
            console.log("Redirecting to " + redirectUrl);
            console.log("Calling default redirect");
            await openBrowser(redirectUrl)
        } else {
            console.log("Expected URL with 303 status, but didn't get one");
        }
    }

    if (response.statusCode === 404) {
        return new Promise(resolve => {
            resolve("404 NOT FOUND");
        });
    }

// Any content?
    if (!response.data || response.data.length === 0 && response.statusCode === 200) {
        return "No content returned\n";
    }

// Is it HTML?
    if (response.data[0] != "<".charCodeAt(0)) {
        console.log("non-HTML returned from rest call");
    }

    return new Promise(resolve => {
        resolve(platform.bytesToString(response.data));
    });
}


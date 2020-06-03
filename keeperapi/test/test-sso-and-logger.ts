import {Auth} from '../src/auth'
import {Vault} from '../src/vault'
import {connectPlatform, platform} from '../src/platform'
import {nodePlatform} from '../src/node/platform'
import * as fs from 'fs'
import {AuthUI, AuthUI3, DeviceConfig, TwoFactorInput} from '../src/configuration';
import {ServiceLogger, SsoCloud} from '../src/proto'
import {KeeperEnvironment} from '../src/endpoint'
import {prompt} from './testUtil'

// Mike Test -------------------------------------
// 24-Apr-2020
// $ ts-node test/test-serviceLogger.ts

import ServiceLogGetRequest = ServiceLogger.ServiceLogGetRequest;
import ServiceLogSpecifier = ServiceLogger.ServiceLogSpecifier;
import ServiceLogResponse = ServiceLogger.ServiceLogResponse;
import SsoCloudIdpMetadataRequest = SsoCloud.SsoCloudIdpMetadataRequest;
import SsoCloudServiceProviderUpdateRequest = SsoCloud.SsoCloudServiceProviderUpdateRequest;
import {serviceLoggerGetMessage} from '../src/restMessages'
import {ssoLogoutMessage, ssoGetMetadataMessage, ssoUploadIdpMetadataMessage} from '../src/restMessages'
import {ssoCloudServiceProviderUpdateRequestMessage} from '../src/restMessages'
import {getKeeperSAMLUrl, getKeeperSsoConfigUrl, getKeeperUrl} from '../src/utils';

interface UserInfo {
    account: string,
    password: string
}

const MIKE_VAULT_LOGIN_1 : UserInfo = { "account": "mhewett+reg70@keepersecurity.com", "password": "Password11" }
const MIKE_ADMIN_LOGIN_1 : UserInfo = { "account": "mhewett+sso42@keepersecurity.com", "password": "Password11" }
const MIKE_SSO_LOGIN_1 : UserInfo  = { "account": "mhewett+sso60@keepersecurity.com", "password": "Password11" }
const MIKE_SSO_LOGIN_2 : UserInfo  = { "account": "mhewett+sso61@keepersecurity.com", "password": "Password11" }
const MIKE_SSO_LOGIN_3 : UserInfo  = { "account": "mhewett+idps@keepersecurity.com", "password": "Password11" }
const SERGE_PLAIN_LOGIN_1 : UserInfo  = { "account": "admin@yozik.us", "password": "111111" }
const clientVersion = 'c16.0.0'

// end Mike Test ------------------------------------------

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'


type DeviceConfigStorage = {
    deviceToken: string
    privateKey: string
    publicKey: string
    verifiedUsers: string[]
}

connectPlatform(nodePlatform)

const authUI: AuthUI = {
    displayDialog(): Promise<boolean> {
        return null
    },
    getTwoFactorCode(): Promise<string> {
        return prompt('Enter Code: ')
    }
}

const authUI3: AuthUI3 = {
    async getTwoFactorCode(): Promise<TwoFactorInput> {
        const twoFactorCode = await prompt('Enter Code:');
        const exp = await prompt('Enter Expiration \n0 - immediately\n1 - 5 minutes\n2 - 12 hours\n3 - 24 hours\n4 - 30 days\n5 - never\n');
        return {
            twoFactorCode,
            desiredExpiration: Number(exp)
        }
    }
}

async function printVault() {
    try {
        let auth = await login()
        let vault = new Vault(auth)
        // vault.noTypedRecords = true;
        await vault.syncDown(true)
        for (let record of vault.records) {
            console.log(record.data)
            console.log(record.recordData.udata)
            console.log(record.nonSharedData)
        }
    } catch (e) {
        console.log(e)
    }
}

async function login(user?: UserInfo): Promise<Auth> {
    let auth = new Auth({
        host: KeeperEnvironment.LOCAL,
        // host: KeeperEnvironment.DEV
        // host: KeeperEnvironment.QA,
        authUI: authUI
    })
    let userInfo = user || currentUser;
    await auth.login(userInfo.account, userInfo.password);
    console.log(`login to ${userInfo.account} successful`)
    return auth;
}

const currentUser = MIKE_VAULT_LOGIN_1;

// ServiceLogger and Cloud SSO Connect ---------------
// testServiceLogger().finally();

// TestSsoLogin().finally();
// TestSsoGetMetadata().finally();
// TestSsoUploadMetadata().finally();
TestSsoSetCurrentConfiguration().finally();
// TestSsoGetConfigurationList().finally();
// TestSsoAddNewConfiguration().finally();
// TestSsoGetConfiguration().finally();
// TestSsoSetConfigurationSettingValue().finally();
// TestSsoResetConfigurationSettingValue().finally();


/* ------------------ Service Logger -------------------- */

async function testServiceLogger() {

    let keeperHost = KeeperEnvironment.LOCAL;  // KeeperEnvironment.DEV;
    let user = MIKE_VAULT_LOGIN_1;  // MIKE_ADMIN_LOGIN_1;

    try {
        let auth = new Auth({
            host: keeperHost,
            authUI: authUI
        });
        await auth.login(user.account, user.password);
        console.log('Logged in...');

        let serviceLoggerGetReq = ServiceLogGetRequest.create({serviceLogSpecifier: [{all: true}]});

        let serviceLoggerResp = await auth.executeRest(serviceLoggerGetMessage(serviceLoggerGetReq));
        console.log(serviceLoggerResp)

    } catch (e) {
        console.log(e);
    }
}


/* ------------------ Cloud SSO Connect -------------------- */

/** NOTE: original version was copied to auth.ts as cloudSsoLogin.  */
async function TestSsoLogin() {

    let keeperHost = KeeperEnvironment.DEV;
    console.log("\n*** TestSsoLogin on " + keeperHost + " ***");

    let user = MIKE_SSO_LOGIN_2;  // MIKE_ADMIN_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;
    let configurationId = 3121290;
    const deviceConfig = getDeviceConfig();

    try {
        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI: authUI
        });

        await auth.loginV3(user.account, user.password);
        console.log("Logged in via Cloud SSO Connect!");

    } catch (e) {
        console.log(e)
    }
}

// GET, UNENCRYPTED, metadata/<serviceProviderId>
async function TestSsoGetMetadata() {
    let keeperHost = KeeperEnvironment.DEV;  // KeeperEnvironment.LOCAL;
    console.log("\n*** TestSsoGetMetadata on " + keeperHost + " ***");

    let user = MIKE_VAULT_LOGIN_1;  // MIKE_ADMIN_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;

    try {
        console.log("Getting Service Provider Metadata");
        const url = getKeeperSAMLUrl(keeperHost, 'metadata', serviceProviderId)
        const resp = await platform.get(url, {})
        if (resp.statusCode === 200) {
            fs.writeFileSync("sp-metadata.xml", resp.data)
            console.log("File received: sp-metadata.xml");
        }
        else {
            console.log(`Error getting metadata: Code ${resp.statusCode} Message: ${platform.bytesToString(resp.data)}`)
        }
    } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_upload_idp_metadata/<serviceProviderId>
async function TestSsoUploadMetadata() {
    let keeperHost = KeeperEnvironment.DEV;  // KeeperEnvironment.LOCAL;
    console.log("\n*** TestSsoUploadMetadata on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;
    let configurationId = 3121290;
    let filename = 'idp_metadata.xml';
    const deviceConfig = getDeviceConfig();

    try {
        console.log("Uploading Service Provider Metadata from", filename);
        const url = getKeeperSsoConfigUrl(keeperHost, 'sso_cloud_upload_idp_metadata');
        console.log("REST endpoint =", url);
        let fileBytes : Buffer = fs.readFileSync(filename);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI: authUI
        });
        await auth.loginV3(user.account, user.password);
        console.log("Logged in...");

        let uploadReq = SsoCloudIdpMetadataRequest.create({
            "ssoSpConfigurationId": configurationId,
            "filename": filename,
            "content": new Uint8Array(fileBytes)
        });

        let resp = await auth.executeRest(ssoUploadIdpMetadataMessage(uploadReq));
        console.log(resp);
     } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_sp_configuration_set
async function TestSsoSetCurrentConfiguration() {
    let keeperHost = KeeperEnvironment.LOCAL;
    console.log("\n*** TestSetCurrentConfiguration on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;
    let configurationId = 3121290;
    const deviceConfig = getDeviceConfig();

    try {
        const url = getKeeperSsoConfigUrl(keeperHost, 'sso_cloud_sp_configuration_set');
        console.log("REST endpoint =", url);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI: authUI
        });
        await auth.loginV3(user.account, user.password);
        console.log("Logged in...");

        let restReq = SsoCloudServiceProviderUpdateRequest.create({
            "ssoServiceProviderId": serviceProviderId,
            "ssoSpConfigurationId": configurationId
        });

        let resp = await auth.executeRest(ssoCloudServiceProviderUpdateRequestMessage(restReq));
        console.log(resp);
     } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_sp_configuration_get/<serviceProviderId>
async function TestSsoGetConfigurationList() {
    let keeperHost = KeeperEnvironment.DEV;  // KeeperEnvironment.LOCAL;
    console.log("\n*** TestGetConfigurationList on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;
    let configurationId = 3121290;
    let filename = 'idp_metadata.xml';
    const deviceConfig = getDeviceConfig();
}

// POST, ENCRYPTED, sso_cloud_configuration_add/<serviceProviderId>
async function TestSsoAddNewConfiguration() {
    let keeperHost = KeeperEnvironment.DEV;  // KeeperEnvironment.LOCAL;
    console.log("\n*** TestAddNewConfiguration on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;
    let configurationId = 3121290;
    let filename = 'idp_metadata.xml';
    const deviceConfig = getDeviceConfig();
}

// POST, ENCRYPTED, sso_cloud_configuration_get/<serviceProviderId>
async function TestSsoGetConfiguration() {
    let keeperHost = KeeperEnvironment.DEV;  // KeeperEnvironment.LOCAL;
    console.log("\n*** TestGetConfiguration on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;
    let configurationId = 3121290;
    let filename = 'idp_metadata.xml';
    const deviceConfig = getDeviceConfig();
}

// POST, ENCRYPTED, sso_cloud_configuration_setting_set/<serviceProviderId>
async function TestSsoSetConfigurationSettingValue() {
    let keeperHost = KeeperEnvironment.DEV;  // KeeperEnvironment.LOCAL;
    console.log("\n*** TestSetConfigurationSettingValue on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;
    let configurationId = 3121290;
    let filename = 'idp_metadata.xml';
    const deviceConfig = getDeviceConfig();
}

// POST, ENCRYPTED, sso_cloud_configuration_setting_set/<serviceProviderId>
async function TestSsoResetConfigurationSettingValue() {
    let keeperHost = KeeperEnvironment.DEV;  // KeeperEnvironment.LOCAL;
    console.log("\n*** TestResetConfigurationSettingValue on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;
    let configurationId = 3121290;
    let filename = 'idp_metadata.xml';
    const deviceConfig = getDeviceConfig();
}


function getDeviceConfig(): DeviceConfig {
    try {
        const configStorage: DeviceConfigStorage = JSON.parse(fs.readFileSync("device-config.json").toString())
        console.log("found existing device");
        return {
            deviceToken: platform.base64ToBytes(configStorage.deviceToken),
            publicKey: platform.base64ToBytes(configStorage.publicKey),
            privateKey: platform.base64ToBytes(configStorage.privateKey),
            verifiedUsers: configStorage.verifiedUsers
        }
    }
    catch (e) {
        console.log("creating new device");
        return {
            deviceToken: undefined,
            privateKey: undefined,
            publicKey: undefined,
            verifiedUsers: []
        }
    }
}

function saveDeviceConfig(deviceConfig: DeviceConfig) {
    const configStorage: DeviceConfigStorage = {
        deviceToken: platform.bytesToBase64(deviceConfig.deviceToken),
        publicKey: platform.bytesToBase64(deviceConfig.publicKey),
        privateKey: platform.bytesToBase64(deviceConfig.privateKey),
        verifiedUsers: deviceConfig.verifiedUsers
    }
    console.log("Saving new device token");
    fs.writeFileSync("device-config.json", JSON.stringify(configStorage, null, 2))
}


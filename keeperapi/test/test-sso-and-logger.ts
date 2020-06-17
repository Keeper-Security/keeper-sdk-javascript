import {Auth} from '../src/auth'
import {Vault} from '../src/vault'
import {connectPlatform, platform} from '../src/platform'
import {nodePlatform} from '../src/node/platform'
import * as fs from 'fs'
import {AuthUI, AuthUI3, DeviceConfig, TwoFactorInput} from '../src/configuration';
import {ServiceLogger, SsoCloud} from '../src/proto'
import {KeeperEnvironment} from '../src/endpoint'
import {getDeviceConfig, prompt, saveDeviceConfig} from './testUtil'

// Mike Test -------------------------------------
// 24-Apr-2020
// $ ts-node test/test-serviceLogger.ts

import ServiceLogGetRequest = ServiceLogger.ServiceLogGetRequest;
import ServiceLogSpecifier = ServiceLogger.ServiceLogSpecifier;
import ServiceLogResponse = ServiceLogger.ServiceLogResponse;
import SsoCloudIdpMetadataRequest = SsoCloud.SsoCloudIdpMetadataRequest;
import SsoCloudConfigurationRequest = SsoCloud.SsoCloudConfigurationRequest;
import SsoCloudSAMLLogRequest = SsoCloud.SsoCloudSAMLLogRequest;
import SsoCloudServiceProviderUpdateRequest = SsoCloud.SsoCloudServiceProviderUpdateRequest;
import SsoCloudServiceProviderConfigurationListRequest = SsoCloud.SsoCloudServiceProviderConfigurationListRequest;
import SsoCloudSettingOperationType = SsoCloud.SsoCloudSettingOperationType;
import SsoCloudSettingAction = SsoCloud.SsoCloudSettingAction;
import ISsoCloudConfigurationResponse = SsoCloud.ISsoCloudConfigurationResponse;

import AuthProtocolType = SsoCloud.AuthProtocolType;
import {serviceLoggerGetMessage, ssoCloudSAMLLogRequestMessage} from '../src/restMessages'
import {ssoLogoutMessage, ssoGetMetadataMessage, ssoUploadIdpMetadataMessage, ssoCloudServiceProviderConfigurationListRequestMessage} from '../src/restMessages'
import {ssoCloudServiceProviderUpdateRequestMessage, ssoCloudConfigurationRequestMessage} from '../src/restMessages'
import {getKeeperSAMLUrl, getKeeperSsoConfigUrl, getKeeperUrl} from '../src/utils';

interface UserInfo {
    account: string,
    password: string
}

const MIKE_VAULT_LOGIN_1 : UserInfo = { "account": "mhewett+reg70@keepersecurity.com", "password": "Password11" }
const MIKE_ADMIN_LOGIN_1 : UserInfo = { "account": "mhewett+sso42@keepersecurity.com", "password": "Password11" }
const MIKE_DEMO_LOGIN_1 : UserInfo  = { "account": "micheal@demo.kepr.co", "password": "7YTiWT7@VqWLCz!P1Xfd" }
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

TestSsoLogin().finally();
// TestSsoLoginWithGet().finally();
// TestSsoUploadMetadata().finally();
// TestSsoGetMetadata().finally();
// TestSsoSetCurrentConfiguration().finally();
// TestSsoAddNewConfiguration().finally();
// TestSsoGetConfigurationList().finally();
// TestSsoGetConfiguration().finally();
// TestSsoSetConfigurationSettingValue().finally();
// TestSsoDeleteConfiguration().finally();
// TestSsoResetConfigurationSettingValue().finally();
// TestSsoGetSAMLLog().finally();
// TestSsoClearSAMLLog().finally();


/* ------------------ Service Logger -------------------- */

async function testServiceLogger() {

    let keeperHost = KeeperEnvironment.LOCAL;  // KeeperEnvironment.DEV;
    let user = MIKE_VAULT_LOGIN_1;  // MIKE_ADMIN_LOGIN_1;
    const deviceConfig = getDeviceConfig(keeperHost);

    try {
        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
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

/** Also see cloudSsoLogin in auth.ts.  */
async function TestSsoLogin() {

    let keeperHost = KeeperEnvironment.DEV;
    console.log("\n*** TestSsoLogin on " + keeperHost + " ***");

    let user = MIKE_SSO_LOGIN_1; // MIKE_DEMO_LOGIN_1;  // MIKE_ADMIN_LOGIN_1;
    let serviceProviderId = 9710921056299; // local: 9710921056266;  // local: 6219112644615
    const deviceConfig = getDeviceConfig(keeperHost);
    const configPrefix = 'sso/saml/';

    try {
        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });

        await auth.loginV3(user.account, user.password);
        console.log("Logged in via Cloud SSO Connect!");

    } catch (e) {
        console.log(e)
    }
}

/** Also see cloudSsoLogin in auth.ts.  */
async function TestSsoLoginWithGet() {

    let keeperHost = KeeperEnvironment.DEV;
    console.log("\n*** TestSsoLogin with GET on " + keeperHost + " ***");

    let user = MIKE_SSO_LOGIN_1; // MIKE_DEMO_LOGIN_1;  // MIKE_ADMIN_LOGIN_1;
    let serviceProviderId = 9710921056299; // local: 9710921056266;  // local: 6219112644615
    const deviceConfig = getDeviceConfig(keeperHost);
    const configPrefix = 'sso/saml/';

    try {
        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });

        await auth.loginV3(user.account, user.password, true);
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
    let serviceProviderId = 9710921056299; // 6219112644615;

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
    let keeperHost = KeeperEnvironment.DEV;
    console.log("\n*** TestSsoUploadMetadata on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    let serviceProviderId = 9710921056299; // 6219112644615;
    let configurationId = 1774455125899304; // local 99837914454064896;         // dev 1774455125899304;
    const configPrefix = 'sso/config/';
    const configEndpoint = 'sso_cloud_upload_idp_metadata';

    let filename = 'Keeper Dev Login_v3.xml';  // 'idp_metadata.xml';
    const deviceConfig = getDeviceConfig(keeperHost);

    try {
        console.log("Uploading Service Provider Metadata from", filename);
        const url = getKeeperSsoConfigUrl(keeperHost, configEndpoint);
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

        console.log("Uploading to configuration:", configurationId);
        
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
    const deviceConfig = getDeviceConfig(keeperHost);

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
    let keeperHost = KeeperEnvironment.LOCAL;
    console.log("\n*** TestGetConfigurationList on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    let serviceProviderId = 9710921056266; // dev 9710921056299     // local: 9710921056266; // 6219112644615;
    const deviceConfig = getDeviceConfig(keeperHost);

    try {
        const url = getKeeperSsoConfigUrl(keeperHost, 'sso_cloud_sp_configuration_get');
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

        let restReq = SsoCloudServiceProviderConfigurationListRequest.create({
            "ssoServiceProviderId": serviceProviderId
        });

        let resp = await auth.executeRest(ssoCloudServiceProviderConfigurationListRequestMessage(restReq));
        console.log(resp);
     } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_configuration_add/<serviceProviderId>
async function TestSsoAddNewConfiguration() {
    let keeperHost = KeeperEnvironment.DEV;
    console.log("\n*** TestAddNewConfiguration on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    // let serviceProviderId = 9710921056266;
    let serviceProviderId = 9710921056299;  // "demo azure"
    const deviceConfig = getDeviceConfig(keeperHost);
    const configPrefix = 'sso/config/';
    const configEndpoint = 'sso_cloud_configuration_add';
    
    try {
        const url = getKeeperSsoConfigUrl(keeperHost, configEndpoint);
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

        let restReq = SsoCloudConfigurationRequest.create({
            "ssoServiceProviderId": serviceProviderId,
            "ssoAuthProtocolType": AuthProtocolType.SAML2
        });

        let resp = await auth.executeRest(ssoCloudConfigurationRequestMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
     } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_configuration_get/<serviceProviderId>
async function TestSsoGetConfiguration() {
    let keeperHost = KeeperEnvironment.LOCAL;
    console.log("\n*** TestGetConfiguration on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;
    let configurationId = 99837914454064896; // 3121290;
    const deviceConfig = getDeviceConfig(keeperHost);
    const configPrefix = 'sso/config/';
    const configEndpoint = 'sso_cloud_configuration_get';
   
    try {
        const url = getKeeperSsoConfigUrl(keeperHost, configEndpoint);
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

        let restReq = SsoCloudConfigurationRequest.create({
            "ssoServiceProviderId": serviceProviderId,
            "ssoSpConfigurationId": configurationId
        });

        let resp = await auth.executeRest(ssoCloudConfigurationRequestMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
     } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_configuration_delete/<serviceProviderId>
async function TestSsoDeleteConfiguration() {
    let keeperHost = KeeperEnvironment.LOCAL;
    console.log("\n*** TestDeleteConfiguration on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;
    const deviceConfig = getDeviceConfig(keeperHost);
    const configPrefix = 'sso/config/';
    const addEndpoint = 'sso_cloud_configuration_add';
    const deleteEndpoint = 'sso_cloud_configuration_delete';
   
    try {
        const url = getKeeperSsoConfigUrl(keeperHost, deleteEndpoint);
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

        // Get the list of current configurations
        let listReq = SsoCloudServiceProviderConfigurationListRequest.create({
            "ssoServiceProviderId": serviceProviderId
        });
        let listResp = await auth.executeRest(ssoCloudServiceProviderConfigurationListRequestMessage(listReq));
        console.log("Starting configurations");
        console.log(listResp);

        // Create a new configuration, then delete it
        let restReq = SsoCloudConfigurationRequest.create({
            "ssoServiceProviderId": serviceProviderId,
            "ssoAuthProtocolType": AuthProtocolType.SAML2
        });
        let resp : ISsoCloudConfigurationResponse = await auth.executeRest(ssoCloudConfigurationRequestMessage(restReq, configPrefix + addEndpoint));
        console.log("resp " + resp.name + " created with ID = " + resp.ssoSpConfigurationId);

        restReq = SsoCloudConfigurationRequest.create({
            "ssoServiceProviderId": serviceProviderId,
            "ssoSpConfigurationId": resp.ssoSpConfigurationId
        });

        resp = await auth.executeRest(ssoCloudConfigurationRequestMessage(restReq, configPrefix + deleteEndpoint));
        console.log(resp);

        // Get the list of configurations after the DB changes
        listResp = await auth.executeRest(ssoCloudServiceProviderConfigurationListRequestMessage(listReq));
        console.log("Ending configurations");
        console.log(listResp);

     } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_configuration_setting_set/<serviceProviderId>
async function TestSsoSetConfigurationSettingValue() {
    let keeperHost = KeeperEnvironment.LOCAL;
    console.log("\n*** TestSetConfigurationSettingValue on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;
    let configurationId = 3121290; // 99837914454064896; // 3121290;
    const deviceConfig = getDeviceConfig(keeperHost);
    const configPrefix = 'sso/config/';
    const configEndpoint = 'sso_cloud_configuration_setting_set';
    
    try {
        const url = getKeeperSsoConfigUrl(keeperHost, configEndpoint);
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

        // Test set attribute by name
        let restReq = SsoCloudConfigurationRequest.create({
            "ssoServiceProviderId": serviceProviderId,
            "ssoSpConfigurationId": configurationId,
            "ssoCloudSettingAction": [
                SsoCloudSettingAction.create({
                    "settingName": "sso_attribute_map_first_name",
                    "operation": SsoCloudSettingOperationType.SET,
                    "value": "--first name--"
                })
            ]
        });
        let resp = await auth.executeRest(ssoCloudConfigurationRequestMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);

        // Test set attribute by ID
        restReq = SsoCloudConfigurationRequest.create({
            "ssoServiceProviderId": serviceProviderId,
            "ssoSpConfigurationId": configurationId,
            "ssoCloudSettingAction": [
                SsoCloudSettingAction.create({
                    "settingId": 905,
                    "operation": SsoCloudSettingOperationType.SET,
                    "value": "urn:mace:dir:attribute-def:givenName"
                })
            ]
        });
        resp = await auth.executeRest(ssoCloudConfigurationRequestMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
    } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_configuration_setting_set/<serviceProviderId>
async function TestSsoResetConfigurationSettingValue() {
    let keeperHost = KeeperEnvironment.LOCAL;
    console.log("\n*** TestResetConfigurationSettingValue on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;
    let configurationId = 99837914454064896; // 3121290;
    const deviceConfig = getDeviceConfig(keeperHost);
    const configPrefix = 'sso/config/';
    const configEndpoint = 'sso_cloud_configuration_setting_set';
    
    try {
        const url = getKeeperSsoConfigUrl(keeperHost, configEndpoint);
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

        let restReq = SsoCloudConfigurationRequest.create({
            "ssoServiceProviderId": serviceProviderId,
            "ssoSpConfigurationId": configurationId,
            "ssoCloudSettingAction": [
                SsoCloudSettingAction.create({
                    "settingName": "sso_attribute_map_first_name",
                    "operation": SsoCloudSettingOperationType.RESET_TO_DEFAULT,
                    "value": "--first name--"
                })
            ]
        });

        let resp = await auth.executeRest(ssoCloudConfigurationRequestMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
    } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_log_saml_get
async function TestSsoGetSAMLLog() {
    let keeperHost = KeeperEnvironment.LOCAL;
    console.log("\n*** TestSsoGetSAMLLog on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;
    const deviceConfig = getDeviceConfig(keeperHost);
    const configPrefix = 'sso/config/';
    const configEndpoint = 'sso_cloud_log_saml_get';
    
    try {
        const url = getKeeperSsoConfigUrl(keeperHost, configEndpoint);
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

        let restReq = SsoCloudSAMLLogRequest.create({
            "ssoServiceProviderId": serviceProviderId
        });

        let resp = await auth.executeRest(ssoCloudSAMLLogRequestMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
    } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_log_saml_clear
async function TestSsoClearSAMLLog() {
    let keeperHost = KeeperEnvironment.LOCAL;
    console.log("\n*** TestSsoClearSAMLLog on " + keeperHost + " ***");

    let user = MIKE_ADMIN_LOGIN_1;  // MIKE_VAULT_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;
    const deviceConfig = getDeviceConfig(keeperHost);
    const configPrefix = 'sso/config/';
    const configEndpoint = 'sso_cloud_log_saml_clear';
    
    try {
        const url = getKeeperSsoConfigUrl(keeperHost, configEndpoint);
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

        let restReq = SsoCloudSAMLLogRequest.create({
            "ssoServiceProviderId": serviceProviderId
        });

        let resp = await auth.executeRest(ssoCloudSAMLLogRequestMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
    } catch (e) {
        console.log(e)
    }
}

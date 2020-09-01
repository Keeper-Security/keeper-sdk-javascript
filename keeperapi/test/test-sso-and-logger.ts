import {Auth} from '../src/auth'
import {Vault} from '../src/vault'
import {connectPlatform, platform} from '../src/platform'
import {nodePlatform} from '../src/node/platform'
import * as fs from 'fs'
import {AuthUI, AuthUI3, DeviceConfig, TwoFactorInput} from '../src/configuration';
import {Authentication, ServiceLogger, SsoCloud} from '../src/proto'
import {KeeperEnvironment, KeeperEndpoint} from '../src/endpoint'
import {authUI3, getDeviceConfig, readDeviceConfig, prompt, saveDeviceConfig, getCredentialsAndHost} from './testUtil'
import {SsoServiceProviderAddCommand, SsoServiceProviderUpdateCommand} from '../src/commands';
import {webSafe64, webSafe64FromBytes} from '../src/utils';

// Mike Test -------------------------------------
// 24-Apr-2020
// $ ts-node test/test-serviceLogger.ts

import ServiceLogGetRequest = ServiceLogger.ServiceLogGetRequest;
import ServiceLogSpecifier = ServiceLogger.ServiceLogSpecifier;
import ServiceLogResponse = ServiceLogger.ServiceLogResponse;
import SsoCloudRequest = SsoCloud.SsoCloudRequest;
import SsoCloudIdpMetadataRequest = SsoCloud.SsoCloudIdpMetadataRequest;
import SsoCloudConfigurationRequest = SsoCloud.SsoCloudConfigurationRequest;
import SsoCloudConfigurationResponse = SsoCloud.SsoCloudConfigurationResponse;
import ConfigurationListItem = SsoCloud.ConfigurationListItem;
import SsoCloudSAMLLogRequest = SsoCloud.SsoCloudSAMLLogRequest;
import SsoCloudLogRequest = SsoCloud.SsoCloudLogRequest;
import SsoCloudConfigurationValidationRequest = SsoCloud.SsoCloudConfigurationValidationRequest;
import ISsoCloudConfigurationValidationResponse = SsoCloud.ISsoCloudConfigurationValidationResponse;
import IValidationContent = SsoCloud.IValidationContent;
import SsoCloudServiceProviderUpdateRequest = SsoCloud.SsoCloudServiceProviderUpdateRequest;
import SsoCloudServiceProviderConfigurationListRequest = SsoCloud.SsoCloudServiceProviderConfigurationListRequest;
import SsoCloudSettingOperationType = SsoCloud.SsoCloudSettingOperationType;
import SsoCloudSettingAction = SsoCloud.SsoCloudSettingAction;
import SsoServiceProviderRequest = Authentication.SsoServiceProviderRequest;
import SsoServiceProviderResponse = Authentication.SsoServiceProviderResponse;
import ISsoCloudConfigurationResponse = SsoCloud.ISsoCloudConfigurationResponse;
import IConfigurationListItem = SsoCloud.IConfigurationListItem;
import AuthProtocolType = SsoCloud.AuthProtocolType;
import {serviceLoggerGetMessage, ssoCloudSAMLLogRequestMessage, ssoCloudLogRequestMessage} from '../src/restMessages';
import {ssoLogoutMessage, ssoGetMetadataMessage, ssoUploadIdpMetadataMessage, ssoCloudServiceProviderConfigurationListRequestMessage} from '../src/restMessages';
import {ssoCloudServiceProviderUpdateRequestMessage, ssoCloudConfigurationRequestMessage} from '../src/restMessages';
import {ssoServiceProviderRequestMessage, ssoCloudBasicRequestMessage, ssoCloudValidationRequestMessage} from '../src/restMessages';
import {getKeeperSAMLUrl, getKeeperSsoConfigUrl, getKeeperUrl} from '../src/utils';

import TwoFactorExpiration = Authentication.TwoFactorExpiration;

interface UserInfo {
    userName: string,
    password: string,
    host: KeeperEnvironment
}

const userInfo: UserInfo = getCredentialsAndHost()
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

const tfaPrompt = 'Enter Expiration \n0 - immediately\n1 - 5 minutes\n2 - 12 hours\n3 - 24 hours\n4 - 30 days\n5 - never\n';

async function printVault() {
    try {
        let auth = await login()
        let vault = new Vault(auth)
        // vault.noTypedRecords = true;
        await vault.syncDown(0, true)
        for (let record of vault.records) {
            console.log(record.data)
            console.log(record.recordData.udata)
            console.log(record.nonSharedData)
        }
    } catch (e) {
        console.log(e)
    }
}

// *****************************************************
let keeperHost : KeeperEnvironment = userInfo.host
// *****************************************************

async function login(user?: UserInfo): Promise<Auth> {
    let auth = new Auth({
        host: keeperHost,
        authUI: authUI
    })
    await auth.login(userInfo.userName, userInfo.password);
    console.log(`login to ${userInfo.userName} successful`)
    return auth;
}


// TESTING
// ****************************************************

// ServiceLogger and Cloud SSO Connect ---------------
// testServiceLogger().finally();

// TestSsoLogin().finally();
// TestSsoLogin_2().finally();
// TestSsoLogout().finally();
// TestSsoLogout_2().finally();
// TestSsoLoginWithGet().finally();
// TestSsoUploadMetadata().finally();
// TestSsoGetMetadata().finally();
// TestSsoGetSigningCertificate().finally();
// TestSsoIdpInitiatedLogin().finally();
// TestSsoSetCurrentConfiguration().finally();
// TestSsoGetConfigurationList().finally();
// TestSsoAddNewConfiguration().finally();
// TestSsoCopyConfiguration().finally();
// TestSsoResetConfiguration().finally();
TestSsoGetConfiguration().finally();
// TestSsoSetConfigurationSettingValue().finally();
// TestSsoDeleteConfiguration().finally();  // Tests add, get, and delete
// TestSsoUpdateConfiguration().finally();
// TestSsoValidateConfiguration().finally();
// TestSsoResetConfigurationSettingValue().finally();
// TestSsoGetLog().finally();
// TestSsoClearLog().finally();
// TestSsoGetSAMLLog().finally();
// TestSsoClearSAMLLog().finally();
// TestSsoServiceProviderAdd().finally();
// TestSsoServiceProviderUpdate().finally();
// TestGetSsoServiceProvider().finally();

// TestSetupForMujinaIdp().finally();

/* ------------------ Service Logger -------------------- */

async function testServiceLogger() {

    const deviceConfig = getDeviceConfig('test service logger', keeperHost);

    try {
        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
       });
        await auth.login(userInfo.userName, userInfo.password);
        console.log('Logged in...');

        let entries = [{
            serviceInfoId: 1
        }];


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

    console.log("\n*** TestSsoLogin on " + keeperHost + " ***");

    let serviceProviderId = 9710921056299; // local: 9710921056266;  // local: 6219112644615
    const deviceConfig = getDeviceConfig('test sso', keeperHost);

    try {
        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });

        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
        console.log("Logged in via Cloud SSO Connect!");

    } catch (e) {
        console.log(e)
    }
}

// GET, ENCRYPTED, login
async function TestSsoLogin_2() {
    console.log("\n*** TestSSOLogin v2 on " + keeperHost + " ***");
    let serviceProviderId = 9710921056266; // 9710921056299;
    const deviceConfig = getDeviceConfig('test sso 2', keeperHost);
    const configPrefix = 'sso/saml/';
    const configEndpoint = 'login';

    try {
        const url = getKeeperSAMLUrl(keeperHost, configEndpoint, serviceProviderId);
        console.log("REST endpoint =", url);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });

        let restReq = SsoCloudRequest.create({
            "embedded": false,
            "clientVersion": clientVersion,
            "dest": "vault",
            "forceLogin": true
        });

        let payload = webSafe64FromBytes(await auth._endpoint.prepareRequest(SsoCloudRequest.encode(restReq).finish()));
        let resp = await auth.cloudSsoLogin2(url,  payload, false);

        console.log(resp);
     } catch (e) {
        console.log(e)
    }
}

/** Also see cloudSsoLogin in auth.ts.  */
async function TestSsoLoginWithGet() {

    console.log("\n*** TestSsoLogin with GET on " + keeperHost + " ***");

    let serviceProviderId = 9710921056299; // local: 9710921056266;  // local: 6219112644615
    const deviceConfig = getDeviceConfig('test sso with get', keeperHost);
    const configPrefix = 'sso/saml/';

    try {
        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });

        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
            useAlternate: true,
        });
        console.log("Logged in via Cloud SSO Connect!");

    } catch (e) {
        console.log(e)
    }
}

async function TestSsoLogout_2() {
    console.log("\n*** TestSSOLogout v2 on " + keeperHost + " ***");

    let serviceProviderId = 9710921056299; // 9710921056266;
    const deviceConfig = getDeviceConfig('test sso logout v2', keeperHost);
    const configPrefix = 'sso/saml/';
    const loginEndpoint = 'login';
    const logoutEndpoint = 'logout';

    try {
        const loginUrl = getKeeperSAMLUrl(keeperHost, loginEndpoint, serviceProviderId);
        const logoutUrl = getKeeperSAMLUrl(keeperHost, logoutEndpoint, serviceProviderId);
        console.log("REST endpoint =", loginUrl);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });

        // Login first
        let restReq = SsoCloudRequest.create({
            "embedded": false,
            "clientVersion": clientVersion,
            "dest": "vault",
            "forceLogin": true
        });

        let payload = webSafe64FromBytes(await auth._endpoint.prepareRequest(SsoCloudRequest.encode(restReq).finish()));
        let resp = await auth.cloudSsoLogin2(loginUrl,  payload, false);
        console.log("Logged in via SSO");
        console.log(resp);

        console.log(await prompt('Hit return to continue: '));

        // Now logout
        console.log("Logging out via SSO")
        console.log("REST endpoint =", logoutUrl);
        restReq = SsoCloudRequest.create({
            "messageSessionUid": auth.getMessageSessionUid(),
            "embedded": false,
            "clientVersion": clientVersion,
            "dest": "vault",
            "username": userInfo.userName
        });

        payload = webSafe64FromBytes(await auth._endpoint.prepareRequest(SsoCloudRequest.encode(restReq).finish()));
        resp = await auth.cloudSsoLogout2(logoutUrl, payload, false);
        console.log(resp);
     } catch (e) {
        console.log(e)
    }
}

// GET, UNENCRYPTED, metadata/<serviceProviderId>
async function TestSsoGetMetadata() {
    console.log("\n*** TestSsoGetMetadata on " + keeperHost + " ***");

    let serviceProviderId = 9710921056299; //9710921056299 = demo Azure  // 6219112644615;

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

// GET, UNENCRYPTED, sso/cert
async function TestSsoGetSigningCertificate() {
    console.log("\n*** TestSsoGetMetadataTestSsoGetSigningCertificate on " + keeperHost + " ***");
    const configPrefix = 'sso/';
    const configEndpoint = 'sso_cert';
    const filename = "keeper-sso-certificate.crt";

    try {
        const url = "https://" + keeperHost + "/api/rest/" + configPrefix + configEndpoint;
        console.log("Getting Signing Certificate file from " + url);

        const resp = await platform.get(url, {})
        if (resp.statusCode === 200) {
            fs.writeFileSync(filename, resp.data)
            console.log("File received: " + filename);
        }
        else {
            console.log(`Error getting sso certificate: Code ${resp.statusCode} Message: ${platform.bytesToString(resp.data)}`)
        }
    } catch (e) {
        console.log(e)
    }
}

// GET, UNENCRYPTED, sso/ext_login
async function TestSsoIdpInitiatedLogin() {
    console.log("\n*** TestSsoGetMetadataTestSsoGetSigningCertificateTestSsoIdpInitiatedLogin on " + keeperHost + " ***");
    const configPrefix = 'sso/';
    const configEndpoint = 'ext_login';
    const serviceProviderId = 9710921056299;

    try {
        const url = "https://" + keeperHost + "/api/rest/" + configPrefix + configEndpoint + "/" + serviceProviderId;
        console.log("External SSO login to  " + url);

        const response = await platform.get(url, {})
        console.log("Status code: " + response.statusCode);

        if (response.statusCode === 303) {
            let redirectUrl = response.headers["location"];
            if (redirectUrl) {
                console.log("Redirecting to " + redirectUrl);
                await platform.defaultRedirect(redirectUrl);
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

        // console.log(`Error doing SSO IdP-initiated login: Code ${response.statusCode} Message: ${platform.bytesToString(response.data)}`)
    } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_upload_idp_metadata/<serviceProviderId>
async function TestSsoUploadMetadata() {
    console.log("\n*** TestSsoUploadMetadata on " + keeperHost + " ***");

    let serviceProviderId = 9710921056266; // 6219112644615;
    let configurationId = 8080545707988631; // 99837914454064896; // 3121290;
    const configPrefix = 'sso/config/';
    const configEndpoint = 'sso_cloud_upload_idp_metadata';

    let filename = '/Users/mhewett/work/sw/test-files/mujina-idp-metadata.xml'; // 'Keeper Dev Login_v3.xml';  // 'idp_metadata.xml';
    const deviceConfig = getDeviceConfig('test sso upload metadata', keeperHost);

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
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
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
    console.log("\n*** TestSetCurrentConfiguration on " + keeperHost + " ***");

    let serviceProviderId = 9710921056266; // 9710921056299;
    let configurationId = 3121290;  // 1774455125899304 // 1284294 // 3121290
    const deviceConfig = getDeviceConfig('test sso set current config', keeperHost);

    try {
        const url = getKeeperSsoConfigUrl(keeperHost, 'sso_cloud_sp_configuration_set');
        console.log("REST endpoint =", url);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
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
    console.log("\n*** TestGetConfigurationList on " + keeperHost + " ***");

    let serviceProviderId = 9710921056299; // dev 9710921056299     // local: 9710921056266; // 6219112644615;
    const deviceConfig = getDeviceConfig('test sso get config list', keeperHost);

    try {
        const url = getKeeperSsoConfigUrl(keeperHost, 'sso_cloud_sp_configuration_get');
        console.log("REST endpoint =", url);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
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

// POST, ENCRYPTED, sso_cloud_configuration_validate/<serviceProviderId>
async function TestSsoValidateConfiguration() {
    console.log("\n*** TestValidateConfiguration on " + keeperHost + " ***");

    let serviceProviderId = 9710921056299; // dev 9710921056299     // local: 9710921056266; // 6219112644615;
    let configurationIds = [6468304524777205, 3521244517327075, 8080545707988631, 7552260471721876, 1774455125899304, 1284294, 3121290];
    const deviceConfig = getDeviceConfig('test sso validate config', keeperHost);
    const configPrefix = 'sso/config/';
    const configEndpoint = 'sso_cloud_configuration_validate';

    try {
        const url = getKeeperSsoConfigUrl(keeperHost, configEndpoint);
        console.log("REST endpoint =", url);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password
        });
        console.log("Logged in...");

        let restReq = SsoCloudConfigurationValidationRequest.create({
            "ssoSpConfigurationId": configurationIds
        });

        let resp: ISsoCloudConfigurationValidationResponse = await auth.executeRest(ssoCloudValidationRequestMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
        for (var validationContent of resp.validationContent) {
            if (validationContent.isSuccessful) {
                console.log("Configuration " + validationContent.ssoSpConfigurationId + " is valid");
            } else {
                console.log("Configuration " + validationContent.ssoSpConfigurationId + " is not valid");
                for (var errmsg of validationContent.errorMessage) {
                    console.log("  " + errmsg);
                }
            }
        }
     } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_configuration_add/<serviceProviderId>
async function TestSsoAddNewConfiguration() {
    console.log("\n*** TestAddNewConfiguration on " + keeperHost + " ***");

    // let serviceProviderId = 9710921056266;
    let serviceProviderId = 9710921056266;  // "mh sso 1"
    const deviceConfig = getDeviceConfig('test sso add new config', keeperHost);
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
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
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

// POST, ENCRYPTED, sso_cloud_configuration_get
async function TestSsoGetConfiguration() {
    console.log("\n*** TestGetConfiguration on " + keeperHost + " ***");

    // let serviceProviderId = 9710921056266;
    let serviceProviderId = 9710921056299;  // "demo azure"
    let configurationId = 6468304524777205; // local 6468304524777205   // "demo azure" config 5082553809898260 // dev 1774455125899304;   // local 3121290;
    const deviceConfig = getDeviceConfig('test sso get config', keeperHost);
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
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
        console.log("Logged in...");

        let restReq = SsoCloudConfigurationRequest.create({
            "ssoServiceProviderId": serviceProviderId,
            "ssoSpConfigurationId": configurationId
        });

        try {
            let resp = await auth.executeRest(ssoCloudConfigurationRequestMessage(restReq, configPrefix + configEndpoint));
            console.log(resp);
        } catch (ex) {
            console.log(ex);
        }

        // Get the error log
        let serviceLoggerGetReq = ServiceLogGetRequest.create({serviceLogSpecifier: [{serviceIdRange:[{startingId: 1, endingId: 1}], resourceIdRange: [{startingId: 2261, endingId: 2261}]}]});

        let serviceLoggerResp = await auth.executeRest(serviceLoggerGetMessage(serviceLoggerGetReq));
        console.log(serviceLoggerResp)

     } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_configuration_copy/<serviceProviderId>
async function TestSsoCopyConfiguration() {
    console.log("\n*** TestCopyConfiguration on " + keeperHost + " ***");

    // let serviceProviderId = 9710921056266;
    let serviceProviderId = 9710921056299;  // "mh sso 1"
    let configurationId = 8080545707988631;
    const deviceConfig = getDeviceConfig('test sso copy config', keeperHost);
    const configPrefix = 'sso/config/';
    const configEndpoint = 'sso_cloud_configuration_copy';

    try {
        const url = getKeeperSsoConfigUrl(keeperHost, configEndpoint);
        console.log("REST endpoint =", url);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
        console.log("Logged in...");

        let restReq = SsoCloudConfigurationRequest.create({
            "ssoServiceProviderId": serviceProviderId,
            "name": "my new config",
            "ssoSpConfigurationId": configurationId
        });

        let resp = await auth.executeRest(ssoCloudConfigurationRequestMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
     } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_configuration_reset/<serviceProviderId>
async function TestSsoResetConfiguration() {
    console.log("\n*** TestResetConfiguration on " + keeperHost + " ***");

    // let serviceProviderId = 9710921056266;
    let serviceProviderId = 9710921056299;  // "mh sso 1"
    let configurationId = 3521244517327075;
    const deviceConfig = getDeviceConfig('test sso reset config', keeperHost);
    const configPrefix = 'sso/config/';
    const configEndpoint = 'sso_cloud_configuration_reset';

    try {
        const url = getKeeperSsoConfigUrl(keeperHost, configEndpoint);
        console.log("REST endpoint =", url);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
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

// POST, ENCRYPTED, sso_service_provider_add
async function TestSsoServiceProviderAdd() {
    console.log("\n*** TestSsoServiceProviderAdd on " + keeperHost + " ***");

    let nodeId = 9710921056312;
    const deviceConfig = getDeviceConfig('test sso add service provider', keeperHost);
    const configPrefix = 'sso//';
    const configEndpoint = 'sso_service_provider_add';

    try {
        const url = getKeeperSsoConfigUrl(keeperHost, configEndpoint);
        console.log("REST endpoint =", url);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
        console.log("Logged in...");

        let command = new SsoServiceProviderAddCommand();
        command.node_id = nodeId;
        command.sp_data_key = "wBTm7ftTn8KEJniAOJEr4XDm-CU1vQp1KGYkExwIc-BmXBDUDZw2GZIuPVX9QvMlNw5AFUgtJn7frMiy5qOxfg";
        command.name = "Local OpenConext";
        command.invite_new_users = true;
        command.is_cloud = true;

        let resp = await auth.executeCommand(command);
        console.log(resp);
     } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_service_provider_update
async function TestSsoServiceProviderUpdate() {
    console.log("\n*** TestSsoServiceProviderUpdate on " + keeperHost + " ***");

    let serviceProviderId =  9710921056266;  // 9710921056299;
    let nodeId = 9710921056264;  // 9710921056296;
    const deviceConfig = getDeviceConfig('test sso update service provider', keeperHost);
    const configPrefix = 'sso//';
    const configEndpoint = 'sso_cloud_configuration_update';

    try {
        const url = getKeeperSsoConfigUrl(keeperHost, configEndpoint);
        console.log("REST endpoint =", url);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
        console.log("Logged in...");

        let command = new SsoServiceProviderUpdateCommand();
        command.sso_service_provider_id = serviceProviderId;
        command.node_id = nodeId;
        command.sp_data_key = "wBTm7ftTn8KEJniAOJEr4XDm-CU1vQp1KGYkExwIc-BmXBDUDZw2GZIuPVX9QvMlNw5AFUgtJn7frMiy5qOxfg";
        command.name = "MH SSO 1";
        command.invite_new_users = true;
        command.is_cloud = true;

        let resp = await auth.executeCommand(command);
        console.log(resp);
     } catch (e) {
        console.log(e)
    }
}

// current config ID: 6468304524777205 (for 99)   8080545707988631 (for 66)

// POST, ENCRYPTED, sso_cloud_configuration_delete/<serviceProviderId>
async function TestSsoDeleteConfiguration() {
    console.log("\n*** TestDeleteConfiguration on " + keeperHost + " ***");

    let serviceProviderId = 9710921056266; // 6219112644615;
    const deviceConfig = getDeviceConfig('test sso delete config', keeperHost);
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
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
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

// POST, ENCRYPTED, sso_cloud_configuration_delete
async function TestSsoUpdateConfiguration() {
    console.log("\n*** TestUpdateConfiguration on " + keeperHost + " ***");

    let serviceProviderId = 9710921056299; // 6219112644615;
    let configurationId = 1774455125899304;
    const deviceConfig = getDeviceConfig('test sso update config', keeperHost);
    const configPrefix = 'sso/config/';
    const endpoint = 'sso_cloud_configuration_update';

    try {
        const url = getKeeperSsoConfigUrl(keeperHost, endpoint);
        console.log("REST endpoint =", url);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
        console.log("Logged in...");

        // Get the list of current configurations
        let listReq = SsoCloudServiceProviderConfigurationListRequest.create({
            "ssoServiceProviderId": serviceProviderId
        });
        let listResp = await auth.executeRest(ssoCloudServiceProviderConfigurationListRequestMessage(listReq));
        console.log("Starting configurations");
        console.log(listResp);

        let config1: IConfigurationListItem = listResp.configurationItem[0];
        let oldName:string = config1.name;
        let configId: number | Long = config1.ssoSpConfigurationId;

        console.log("Old name of " + configId + " is '" + oldName + "'");

        // Update the name of the first configuration, then set it back
        let updateReq = SsoCloudConfigurationRequest.create({
            "ssoServiceProviderId": serviceProviderId,
            "ssoSpConfigurationId": configId,
            "name": "mike test 1 1 1 1 3"
        });
        let resp : ISsoCloudConfigurationResponse = await auth.executeRest(ssoCloudConfigurationRequestMessage(updateReq, configPrefix + endpoint));
        console.log("resp " + resp.name + " updated with ID = " + resp.ssoSpConfigurationId);

        // Get the list of configurations after the DB changes
        listResp = await auth.executeRest(ssoCloudServiceProviderConfigurationListRequestMessage(listReq));
        console.log("Ending configurations");
        console.log(listResp);

        config1 = listResp.configurationItem[0];
        oldName = config1.name;
        configId = config1.ssoSpConfigurationId;

        console.log("New name of " + configId + " is '" + oldName + "'");

     } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_configuration_setting_set/<serviceProviderId>
async function TestSsoSetConfigurationSettingValue() {
    console.log("\n*** TestSetConfigurationSettingValue on " + keeperHost + " ***");

    let serviceProviderId = 9710921056266; // 6219112644615;
    let configurationId = 3121290; // 99837914454064896; // 3121290;
    const deviceConfig = getDeviceConfig('test sso set config setting value', keeperHost);
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
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
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
    console.log("\n*** TestResetConfigurationSettingValue on " + keeperHost + " ***");

    let serviceProviderId = 9710921056266; // 6219112644615;
    let configurationId = 99837914454064896; // 3121290;
    const deviceConfig = getDeviceConfig('test sso reset config setting value', keeperHost);
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
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
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
    console.log("\n*** TestSsoGetSAMLLog on " + keeperHost + " ***");

    let serviceProviderId =  14955076124691;// DevCloud Azure  // 9710921056299; // 9710921056266; // 6219112644615;
    const deviceConfig = getDeviceConfig('test sso get saml log', keeperHost);
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
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
        console.log("Logged in...");

        let restReq = SsoCloudSAMLLogRequest.create({
            "ssoServiceProviderId": serviceProviderId
        });

        console.log(restReq);
        let resp = await auth.executeRest(ssoCloudSAMLLogRequestMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
    } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_log_saml_clear
async function TestSsoClearSAMLLog() {
    console.log("\n*** TestSsoClearSAMLLog on " + keeperHost + " ***");

    let serviceProviderId = 9710921056266; // 6219112644615;
    const deviceConfig = getDeviceConfig('test sso clear saml log', keeperHost);
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
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
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

// POST, ENCRYPTED, sso_cloud_log_get
async function TestSsoGetLog() {
    console.log("\n*** TestSsoGetLog on " + keeperHost + " ***");

    let serviceProviderId = 9710921056266; // 9710921056299; // 9710921056266; // 6219112644615;
    const deviceConfig = getDeviceConfig('test sso get log', keeperHost);
    const configPrefix = 'sso/config/';
    const configEndpoint = 'sso_cloud_log_get';

    try {
        const url = getKeeperSsoConfigUrl(keeperHost, configEndpoint);
        console.log("REST endpoint =", url);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
        console.log("Logged in...");

        let restReq = SsoCloudLogRequest.create({
            "ssoServiceProviderId": serviceProviderId,
        });
        console.log(restReq);

        let resp = await auth.executeRest(ssoCloudLogRequestMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
    } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, sso_cloud_log_clear
async function TestSsoClearLog() {
    console.log("\n*** TestSsoClearLog on " + keeperHost + " ***");

    let serviceProviderId = 9710921056266; // 6219112644615;
    const deviceConfig = getDeviceConfig('test sso clear log', keeperHost);
    const configPrefix = 'sso/config/';
    const configEndpoint = 'sso_cloud_log_clear';

    try {
        const url = getKeeperSsoConfigUrl(keeperHost, configEndpoint);
        console.log("REST endpoint =", url);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
        console.log("Logged in...");

        let restReq = SsoCloudLogRequest.create({
            "ssoServiceProviderId": serviceProviderId
        });

        let resp = await auth.executeRest(ssoCloudLogRequestMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
    } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, enterprise/get_sso_service_provider
async function TestGetSsoServiceProvider() {
    console.log("\n*** TestGetSsoServiceProvider on " + keeperHost + " ***");

    // let domainName = "G-Suite Dev"; // "F5 Europe"; // "G-Suite Dev";    // "demo azure";    // "devgene sso 2";  // "demo azure";
    let domainName = "F5 Europe"; // "G-Suite Dev";    // "demo azure";    // "devgene sso 2";  // "demo azure";
    const locale = "en_US";
    const deviceConfig = getDeviceConfig('test sso get service provider', keeperHost);
    const configPrefix = 'enterprise/';
    const configEndpoint = 'get_sso_service_provider';

    try {
        const url = keeperHost + "/api/rest/" + configPrefix + configEndpoint;
        console.log("REST endpoint =", url);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
        console.log("Logged in...");

        let restReq = SsoServiceProviderRequest.create({
            "name": domainName,
            "locale": locale,
            "clientVersion": clientVersion
        });

        let resp = await auth.executeRest(ssoServiceProviderRequestMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
    } catch (e) {
        console.log(e)
    }
}


// POST, ENCRYPTED, sso_cloud_configuration_delete
async function TestSetupForMujinaIdp() {
    console.log("\n*** Setup for Mujina IdP on " + keeperHost + " ***");

    let serviceProviderId = 9710921056266;
    let configurationId = 8080545707988631;
    const deviceConfig = getDeviceConfig('test setup for mujina idp', keeperHost);
    const configPrefix = 'sso/config/';
    const endpoint = 'sso_cloud_configuration_update';

    try {
        const url = getKeeperSsoConfigUrl(keeperHost, endpoint);
        console.log("REST endpoint =", url);

        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
        });
        await auth.loginV3({
            username: userInfo.userName,
            password: userInfo.password,
        });
        console.log("Logged in...");

        let actions = [];
        actions.push(SsoCloudSettingAction.create({
            "settingId": 905,
            "operation": SsoCloudSettingOperationType.SET,
            "value": "urn:mace:dir:attribute-def:givenName"
        }));
        actions.push(SsoCloudSettingAction.create({
            "settingId": 910,
            "operation": SsoCloudSettingOperationType.SET,
            "value": "urn:mace:dir:attribute-def:sn"
        }));
        actions.push(SsoCloudSettingAction.create({
            "settingId": 915,
            "operation": SsoCloudSettingOperationType.SET,
            "value": "urn:mace:dir:attribute-def:uid"
        }));
        actions.push(SsoCloudSettingAction.create({
            "settingId": 920,
            "operation": SsoCloudSettingOperationType.SET,
            "value": "redirect"
        }));

        // Update the name of the first configuration, then set it back
        let updateReq = SsoCloudConfigurationRequest.create({
            "ssoServiceProviderId": serviceProviderId,
            "ssoSpConfigurationId": configurationId,
            "ssoCloudSettingAction": actions
        });
        let resp : ISsoCloudConfigurationResponse = await auth.executeRest(ssoCloudConfigurationRequestMessage(updateReq, configPrefix + endpoint));
        console.log("resp " + resp.name + " updated configuration " + resp.ssoSpConfigurationId);
        console.log(resp);

     } catch (e) {
        console.log(e)
    }
}


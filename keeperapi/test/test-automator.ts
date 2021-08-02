import {Auth} from '../src/auth'
import {Vault} from '../src/vault'
import {connectPlatform, platform} from '../src/platform'
import {nodePlatform} from '../src/node/platform'
import * as fs from 'fs'
import {AuthUI, AuthUI3, DeviceConfig, TwoFactorInput} from '../src/configuration';
import {Authentication, Automator, ServiceLogger} from '../src/proto'
import {KeeperEnvironment, KeeperEndpoint} from '../src/endpoint'
import {ClientConfiguration} from '../src/configuration';
import {
    authUI3,
    getDeviceConfig,
    readDeviceConfig,
    prompt,
    saveDeviceConfig,
    getCredentialsAndHost,
    cloudSsoLogin2, cloudSsoLogout2, openBrowser,
    TestSessionStorage
} from './testUtil'
import {webSafe64, webSafe64FromBytes, wrapPassword} from '../src/utils';
import {deviceMessage, preLoginMessage, registerDeviceMessage, RestMessage, updateDeviceMessage} from '../src/restMessages';

import ServiceLogGetRequest = ServiceLogger.ServiceLogGetRequest;
import ServiceLogSpecifier = ServiceLogger.ServiceLogSpecifier;
import ServiceLogResponse = ServiceLogger.ServiceLogResponse;

// -------------------------------------
// Test routines for Keeper Automator
// Mike Hewett
// 24 Jun 2021
// $ ts-node test/test-automator.ts
// -------------------------------------

import AdminCreateAutomatorRequest = Automator.AdminCreateAutomatorRequest;
import AdminDeleteAutomatorRequest = Automator.AdminDeleteAutomatorRequest;
import AdminEditAutomatorRequest = Automator.AdminEditAutomatorRequest;
import AdminEnableAutomatorRequest = Automator.AdminEnableAutomatorRequest;
import AdminGetAutomatorRequest = Automator.AdminGetAutomatorRequest;
import AdminGetAutomatorsOnNodeRequest = Automator.AdminGetAutomatorsOnNodeRequest;
import AdminGetAutomatorsForEnterpriseRequest = Automator.AdminGetAutomatorsForEnterpriseRequest;
import AdminInitializeAutomatorRequest = Automator.AdminInitializeAutomatorRequest;
import AdminResetAutomatorRequest = Automator.AdminResetAutomatorRequest;
import AdminResponse = Automator.AdminResponse;
import IAdminResponse = Automator.IAdminResponse;
import AutomatorSettingValue = Automator.AutomatorSettingValue;

import {automatorAdminCreateMessage, automatorAdminDeleteMessage, automatorAdminEditMessage, automatorAdminEnableMessage, automatorAdminGetMessage, automatorAdminGetAllForEnterpriseMessage, automatorAdminGetAllOnNodeMessage, automatorAdminInitializeMessage, automatorAdminResetMessage, serviceLoggerGetMessage} from '../src/restMessages';

import {getKeeperAutomatorAdminUrl, getKeeperUrl} from '../src/utils';

interface UserInfo {
    userName: string,
    password: string,
    host: KeeperEnvironment
}

const userInfo: UserInfo = getCredentialsAndHost()
const clientVersion = 'c16.0.0'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
let deviceName : string = "mike1";
let keeperHost : KeeperEnvironment = userInfo.host;
// *****************************************************


async function login(user?: UserInfo): Promise<Auth> {
    let auth = new Auth({
        host: keeperHost,
        authUI: authUI
    })

    const password = wrapPassword(userInfo.password)

    await auth.login(userInfo.userName, password);
    console.log(`login to ${userInfo.userName} successful`)
    return auth;
}

// ------------- TEST DATA ----------------------------------------------------------------

let automatorTestData = {
    "dev-mhewett-azure-sso-cloud": {
        "enterpriseId": 2261,
        "nodeId": 9710921056296,
        "automatorName": "automator-2",  // Local automator "automator-2"
        "automatorId": 9710921056485  
    },

    "dev-rainerkec-f5-sso-cloud": {
        "enterpriseId": 3482,
        "nodeId": 14955076124677,
        "sso_service_provider_id": 14955076124680,
        "automatorName": "f5 test automator",
        "automatorUrl": "https://automator.kepr.co:8089/",
        "sslCertificateFile": "personal/kepr_2022_nopass.pfx",
        "automatorId": 14955076124993  // Created 08/02/2021
    }
}



// -----------------------------------------------------------------------------------------------
// Which test to run?
// TestAutomatorCreateRest(automatorTestData["dev-rainerkec-f5-sso-cloud"]).finally();
// TestAutomatorDeleteRest().finally();
// TestAutomatorEditRest().finally();
// TestAutomatorEnableRest().finally();
// TestAutomatorGetRest().finally();
// TestAutomatorGetAllOnNodeRest().finally();
// TestAutomatorGetAllForEnterpriseRest().finally();
TestAutomatorInitializeRest(automatorTestData["dev-rainerkec-f5-sso-cloud"]).finally();
// TestAutomatorResetRest().finally();

// TestAutomatorFullSetup(automatorTestData["dev-rainerkec-f5-sso-cloud"]).finally();



// -----------------------------------------------------------------------------------------------
// Automator tests
// -----------------------------------------------------------------------------------------------

// POST, ENCRYPTED, automator/automator_create
async function TestAutomatorFullSetup(config) {
    console.log("\n*** TestAutomatorCreateRest on " + keeperHost + " ***");

    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const automatorPrefix = 'automator/';
    const createEndpoint = 'automator_create';
    const getEndpoint = 'automator_get';
    const editEndpoint = 'automator_edit';
    const initializeEndpoint = 'automator_initialize';

    try {
        const url = getKeeperAutomatorAdminUrl(keeperHost, createEndpoint);
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

        // Create a new Automator  --------------------------------------------------------
        let restReq1 = AdminCreateAutomatorRequest.create({
            "nodeId": config.nodeId,
            "name": config.automatorName
        });

        let resp1 = await auth.executeRest(automatorAdminCreateMessage(restReq1, automatorPrefix + createEndpoint));
        if (resp1.automatorInfo.length > 0) {
            config.automatorId = resp1.automatorInfo[0].automatorId;
            config.automatorName = resp1.automatorInfo[0].name;  // The name may have been changed because it was a duplicate
            console.log("Created automator", config.automatorName, "id:", config.automatorId);
        } else {
            console.log("Unable to create automator", config.automatorName, ":", resp1.message);
            return;
        }

        // Retrieve the new Automator  --------------------------------------------------------
        let restReq2 = AdminGetAutomatorRequest.create({
            "automatorId": config.automatorId
        });

        let resp2 = await auth.executeRest(automatorAdminGetMessage(restReq2, automatorPrefix + getEndpoint));
        if (resp2.automatorInfo.length > 0) {
            console.log("New automator", resp2.automatorInfo[0]);
        } else {
            console.log("Unable to retrieve automator:", resp2.message);
            return;
        }
        // Check result (not needed except during testing)
        console.log("confirm: nodeId", resp2.automatorInfo[0].nodeId, "=", config.nodeId);


        // Edit the settings of the Automator  --------------------------------------------------------

        let automatorSettings = [
            AutomatorSettingValue.create({
                "settingTag": "ssl_certificate",
                "settingValue": webSafe64FromBytes(fs.readFileSync(config.sslCertificateFile))
            })];
        let restReq3 = AdminEditAutomatorRequest.create({
            "automatorId": config.automatorId,
            "url": config.automatorUrl,
            "enabled": true,
            "automatorSettingValues": automatorSettings
        });

        let resp3 = await auth.executeRest(automatorAdminEditMessage(restReq3, automatorPrefix + editEndpoint));
        if (resp3.automatorInfo.length > 0) {
            console.log("Automator settings (new)", resp3.automatorInfo[0]);
        } else {
            console.log("Unable to edit automator:", resp3.message);
            return;
        }

        // Check the value of the URL (not needed except during testing)
        let newUrl = resp3.automatorInfo[0].url;
        if (newUrl === config.automatorUrl) {
            console.log("  url matches!");
        } else {
            console.log("  url not correct: [" + newUrl + "] should be [" + config.automatorUrl + "]");
        }

        // Send the settings to the Automator  ---------------------------------------------------
        let restReq4 = AdminInitializeAutomatorRequest.create({
            "automatorId": config.automatorId
        });

        let resp4 = await auth.executeRest(automatorAdminInitializeMessage(restReq4, automatorPrefix + initializeEndpoint));
        if (resp4.success) {
            console.log("Automator", config.automatorId, " successfully initialized");
        } else {
            console.log("Initialization unsuccessful:", resp4.message);
        }

     } catch (e) {
        console.log(e)
    }
}





// POST, ENCRYPTED, automator/automator_create
async function TestAutomatorCreateRest() {
    console.log("\n*** TestAutomatorCreateRest on " + keeperHost + " ***");

    let nodeId = 9710921056296; // This is the Azure Cloud SSO node on dev
    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const configPrefix = 'automator/';
    const configEndpoint = 'automator_create';

    try {
        const url = getKeeperAutomatorAdminUrl(keeperHost, configEndpoint);
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

        let restReq = AdminCreateAutomatorRequest.create({
            "nodeId": nodeId,
            "name": "Automator Test 1"
        });

        let resp = await auth.executeRest(automatorAdminCreateMessage(restReq, configPrefix + configEndpoint));

        console.log(resp);
     } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, automator/automator_delete
async function TestAutomatorDeleteRest() {
    console.log("\n*** TestAutomatorDelete on " + keeperHost + " ***");

    let nodeId = 9710921056296; // This is the Azure Cloud SSO node on dev
    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const configPrefix = 'automator/';
    const createEndpoint = 'automator_create';
    const deleteEndpoint = 'automator_delete';
    const getEndpoint = 'automator_get';

    try {
        const url = getKeeperAutomatorAdminUrl(keeperHost, createEndpoint);
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

        // Create an automator
        let restReq = AdminCreateAutomatorRequest.create({
            "nodeId": nodeId,
            "name": "Automator Test 1"
        });
        let resp: IAdminResponse = await auth.executeRest(automatorAdminCreateMessage(restReq, configPrefix + createEndpoint));
        let automatorId = resp.automatorInfo[0].automatorId;
        console.log(resp);
        console.log("Created automator", automatorId);

        // Retrieve the automator
        let restReq2 = AdminGetAutomatorRequest.create({
            "automatorId": automatorId
        });
        resp = await auth.executeRest(automatorAdminGetMessage(restReq2, configPrefix + getEndpoint));
        console.log(resp);

        // Delete the automator
        let restReq3 = AdminDeleteAutomatorRequest.create({
            "automatorId": automatorId
        });
        resp = await auth.executeRest(automatorAdminDeleteMessage(restReq3, configPrefix + deleteEndpoint));
        console.log(resp);

     } catch (e) {
        console.log(e)
     }
}

// POST, ENCRYPTED, automator/automator_edit
async function TestAutomatorEditRest() {
    console.log("\n*** TestAutomatorEditRest on " + keeperHost + " ***");

    let nodeId = 9710921056296; // This is the Azure Cloud SSO node on dev
    let automatorId = 9710921056485; // Local automator "automator-2"
    let automatorUrl = "https://local.kepr.co:8089/";
    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const configPrefix = 'automator/';
    const configEndpoint = 'automator_edit';

    try {
        const url = getKeeperAutomatorAdminUrl(keeperHost, configEndpoint);
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

        // Set the URL
        let restReq = AdminEditAutomatorRequest.create({
            "automatorId": automatorId,
            "name": "",
            "enabled": true,
            "url": automatorUrl            
        });

        let resp = await auth.executeRest(automatorAdminEditMessage(restReq, configPrefix + configEndpoint));

        console.log(resp);

        // Check the value of the URL
        let newUrl = resp.automatorInfo[0].url;
        if (newUrl === automatorUrl) {
            console.log("  url matches!");
        } else {
            console.log("  url not correct: [" + newUrl + "] should be [" + automatorUrl + "]");
        }
     } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, automator/automator_enable
async function TestAutomatorEnableRest() {
    console.log("\n*** TestAutomatorEnableRest on " + keeperHost + " ***");

    let nodeId = 9710921056296; // This is the Azure Cloud SSO node on dev and local
    let automatorId = 9710921056485; // Local automator "automator-2"
    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const configPrefix = 'automator/';
    const configEndpoint = 'automator_enable';

    try {
        const url = getKeeperAutomatorAdminUrl(keeperHost, configEndpoint);
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

        // Set the URL
        let restReq = AdminEnableAutomatorRequest.create({
            "automatorId": automatorId,
            "enabled": true
        });

        // Enable the automator
        let resp = await auth.executeRest(automatorAdminEnableMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
        console.log("Automator " + automatorId + " is " + (resp.automatorInfo[0].enabled ? "enabled" : "disabled"));

        // Disable the automator
        restReq.enabled = false;
        resp = await auth.executeRest(automatorAdminEnableMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
        console.log("Automator " + automatorId + " is " + (resp.automatorInfo[0].enabled ? "enabled" : "disabled"));

        // Enable the automator
        restReq.enabled = true;
        resp = await auth.executeRest(automatorAdminEnableMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
        console.log("Automator " + automatorId + " is " + (resp.automatorInfo[0].enabled ? "enabled" : "disabled"));

     } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, automator/automator_get
async function TestAutomatorGetRest() {
    console.log("\n*** TestAutomatorGetRest on " + keeperHost + " ***");

    let nodeId = 9710921056296; // This is the Azure Cloud SSO node on dev
    let automatorId = 9710921056484;
    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const configPrefix = 'automator/';
    const configEndpoint = 'automator_get';

    try {
        const url = getKeeperAutomatorAdminUrl(keeperHost, configEndpoint);
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

        let restReq = AdminGetAutomatorRequest.create({
            "automatorId": automatorId
        });

        let resp = await auth.executeRest(automatorAdminGetMessage(restReq, configPrefix + configEndpoint));

        console.log(resp);
        if (resp.automatorInfo.length > 0) {
            console.log(resp.automatorInfo[0].status);
        }
     } catch (e) {
        console.log(e)
     }
}

// POST, ENCRYPTED, automator/automator_get_all_for_enterprise
async function TestAutomatorGetAllForEnterpriseRest() {
    console.log("\n*** TestAutomatorGetAllForEnterpriseRest on " + keeperHost + " ***");

    let enterpriseId = 2261; // This is Mike's enterprise on dev with admin mhewett+sso42@keepersecurity.com
    let nodeId = 9710921056296; // This is the Azure Cloud SSO node on dev
    let automatorId = 9710921056484;
    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const configPrefix = 'automator/';
    const configEndpoint = 'automator_get_all_for_enterprise';

    try {
        const url = getKeeperAutomatorAdminUrl(keeperHost, configEndpoint);
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

        let restReq = AdminGetAutomatorsForEnterpriseRequest.create({
            "enterpriseId": enterpriseId
        });

        let resp = await auth.executeRest(automatorAdminGetAllForEnterpriseMessage(restReq, configPrefix + configEndpoint));

        console.log(resp);
        if (resp.automatorInfo.length > 0) {
            console.log(resp.automatorInfo[0].status);
        }
     } catch (e) {
        console.log(e)
     }
}

// POST, ENCRYPTED, automator/automator_get_on_node
async function TestAutomatorGetAllOnNodeRest() {
    console.log("\n*** TestAutomatorGetAllOnNodeRest on " + keeperHost + " ***");

    let nodeId = 9710921056296; // This is the Azure Cloud SSO node on dev
    let automatorId = 9710921056484;
    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const configPrefix = 'automator/';
    const configEndpoint = 'automator_get_on_node';

    try {
        const url = getKeeperAutomatorAdminUrl(keeperHost, configEndpoint);
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

        let restReq = AdminGetAutomatorsOnNodeRequest.create({
            "nodeId": nodeId
        });

        let resp = await auth.executeRest(automatorAdminGetAllOnNodeMessage(restReq, configPrefix + configEndpoint));

        console.log(resp);
        if (resp.automatorInfo.length > 0) {
            console.log(resp.automatorInfo[0].status);
        }
     } catch (e) {
        console.log(e)
     }
}

// POST, ENCRYPTED, automator/automator_initialize
async function TestAutomatorInitializeRest(config) {
    console.log("\n*** TestAutomatorInitializeRest on " + keeperHost + " ***");

    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const automatorPrefix = 'automator/';
    const initializeEndpoint = 'automator_initialize';

    try {
        const url = getKeeperAutomatorAdminUrl(keeperHost, initializeEndpoint);
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

        let restReq = AdminInitializeAutomatorRequest.create({
            "automatorId": config.automatorId
        });

        let resp = await auth.executeRest(automatorAdminInitializeMessage(restReq, automatorPrefix + initializeEndpoint));
        if (resp.success) {
            console.log("Automator", config.automatorId, " successfully initialized");
        } else {
            console.log("Initialization unsuccessful:", resp.message);
        }

        console.log(resp);
     } catch (e) {
        console.log(e)
     }
}
    
// POST, ENCRYPTED, automator/automator_full_reset
async function TestAutomatorResetRest() {
    console.log("\n*** TestAutomatorResetRest on " + keeperHost + " ***");

    let nodeId = 9710921056296; // This is the Azure Cloud SSO node on dev
    let automatorId = 9710921056484;
    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const configPrefix = 'automator/';
    const configEndpoint = 'automator_full_reset';

    try {
        const url = getKeeperAutomatorAdminUrl(keeperHost, configEndpoint);
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

        let restReq = AdminResetAutomatorRequest.create({
            "automatorId": automatorId
        });

        let resp = await auth.executeRest(automatorAdminResetMessage(restReq, configPrefix + configEndpoint));

        console.log(resp);
     } catch (e) {
        console.log(e)
     }
}

/**
 * Retrieve all entries in the in-memory service logger.
 */
async function testServiceLogger() {

    const deviceConfig = getDeviceConfig(deviceName, keeperHost);

    try {
        let auth = new Auth({
            host: keeperHost,
            clientVersion: clientVersion,
            deviceConfig: deviceConfig,
            onDeviceConfig: saveDeviceConfig,
            authUI3: authUI3
       });

        const password = wrapPassword(userInfo.password)
        
        await auth.login(userInfo.userName, password);
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



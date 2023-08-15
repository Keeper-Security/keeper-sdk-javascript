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
import AdminSetupAutomatorRequest = Automator.AdminSetupAutomatorRequest;
import AdminSetupAutomatorResponse = Automator.AdminSetupAutomatorResponse;
import AdminAutomatorSkillsRequest = Automator.AdminAutomatorSkillsRequest;
import AdminAutomatorLogRequest = Automator.AdminAutomatorLogRequest;
import AdminAutomatorLogClearRequest = Automator.AdminAutomatorLogClearRequest;
import IAdminResponse = Automator.IAdminResponse;
import AutomatorSettingValue = Automator.AutomatorSettingValue;
import AutomatorState = Automator.AutomatorState;

import {automatorAdminCreateMessage, automatorAdminDeleteMessage, automatorAdminEditMessage, automatorAdminEnableMessage, automatorAdminGetMessage, automatorAdminGetAllForEnterpriseMessage, automatorAdminGetAllOnNodeMessage, automatorAdminInitializeMessage, automatorAdminResetMessage, automatorAdminSetupMessage, automatorAdminSkillsMessage, automatorAdminLogGetMessage, automatorAdminLogClearMessage, serviceLoggerGetMessage} from '../src/restMessages';

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

    "dev-rainerkec-automator-1": {
        "enterpriseId": 3482,
        "nodeId": 14955076125000,
        "sso_service_provider_id": 14955076125006,
        "sso_sp_configuration_id": 5270385085362253,
        "automatorName": "Azure test automator",
        "automatorUrl": "https://dev-automator.kepr.co:8089",
        "automatorId": 14955076125010  // Created 08/23/2021 
    },

    "dev-rainerkec-automator-2": {
        "enterpriseId": 3482,
        "nodeId": 14955076125000,
        "sso_service_provider_id": 14955076125006,
        "sso_sp_configuration_id": 5270385085362253,
        "automatorName": "Azure test automator",
        "automatorUrl": "https://dev-automator.kepr.co:8088",
        "automatorId": 14955076125010 
    },

    "dev-rainerkec-automator-3": {
        "enterpriseId": 3482,
        "nodeId": 14955076125000,
        "sso_service_provider_id": 14955076125006,
        "sso_sp_configuration_id": 5270385085362253,
        "automatorName": "Azure test automator",
        "automatorUrl": "https://dev-automator.kepr.co:8092",
        "automatorId": 14955076125010 
    },

    "dev-rainerkec-automator-4": {
        "enterpriseId": 3482,
        "nodeId": 14955076125000,
        "sso_service_provider_id": 14955076125006,
        "sso_sp_configuration_id": 5270385085362253,
        "automatorName": "Azure test automator",
        "automatorUrl": "https://dev-automator.kepr.co:8094",
        "automatorId": 14955076125010 
    },

    "dev-rainerkec-automator-5": {
        "enterpriseId": 3482,
        "nodeId": 14955076125000,
        "sso_service_provider_id": 14955076125006,
        "sso_sp_configuration_id": 5270385085362253,
        "automatorName": "Azure test automator",
        "automatorUrl": "https://dev-automator.kepr.co:8096",
        "automatorId": 14955076125010 
    },

    "dev-mhewett-azure-sso-cloud": {
        "enterpriseId": 2261,
        "nodeId": 9710921056296,
        "automatorName": "automator-extra",  // Local automator "automator-2"
        "automatorId": 9710921056485  
    },

    "dev-rainerkec-f5-sso-cloud": {
        "enterpriseId": 3482,
        "nodeId": 14955076124677,
        "sso_service_provider_id": 14955076124680,
        "automatorName": "f5 test automator",
        "automatorUrl": "https://dev-automator.kepr.co:8089",
        "automatorId": 14955076124998  // Created 08/04/2021 
    },
    
    "local-mhewett42-azure-sso-cloud": {
        "enterpriseId": 2261,
        "nodeId": 9710921056296,
        "sso_service_provider_id": 9710921056299,
        "automatorName": "Azure test automator",
        "automatorUrl": "https://local-automator.kepr.co:8090",
        "automatorId": 9710921056492  // Created 10/01/2021 
    },

    // DEV AUTOMATOR 1
    "dev-rainerkec-automator-test-1": {
        "enterpriseId": 0,
        "nodeId": 0,
        "sso_service_provider_id": 0,
        "automatorName": "G-Suite automator",
        "automatorUrl": "https://dev-automator.kepr.co:8089",
        "automatorId": 14955076125018  
    },

    // DEV AUTOMATOR 2
    "dev-rainerkec-automator-test-2": {
        "enterpriseId": 0,
        "nodeId": 0,
        "sso_service_provider_id": 0,
        "automatorName": "automator test 8090",
        "automatorUrl": "https://dev-automator.kepr.co:8090",
        "automatorId": 14955076125019
    },

    // DEV AUTOMATOR 3
    "dev-rainerkec-automator-test-3": {
        "enterpriseId": 0,
        "nodeId": 0,
        "sso_service_provider_id": 0,
        "automatorName": "automator test 8091",
        "automatorUrl": "https://dev-automator.kepr.co:8091",
        "automatorId": 14955076125020
    },

    // DEV AUTOMATOR 4
    "dev-rainerkec-automator-test-4": {
        "enterpriseId": 0,
        "nodeId": 0,
        "sso_service_provider_id": 0,
        "automatorName": "automator test 8092",
        "automatorUrl": "https://dev-automator.kepr.co:8092",
        "automatorId": 14955076125021
    },

    // DEV AUTOMATOR 5
    "dev-rainerkec-automator-test-5": {
        "enterpriseId": 0,
        "nodeId": 0,
        "sso_service_provider_id": 0,
        "automatorName": "automator test 8093",
        "automatorUrl": "https://dev-automator.kepr.co:8093",
        "automatorId": 14955076125022
    },

    // TESTING
    // Don't allow creating an Automator if no SSO Connect Cloud instance
    "local-mhewett-onelogin-illegal-automator": {
        "enterpriseId": 2261,
        "nodeId": 9710921056462,
        "automatorName": "automator-illegal",
        "automatorId": 0  
    },

    // TESTING
    // Make a second automator on a node - verify that create is working correctly
    "dev-mhewett-azure-sso-cloud-2": {
        "enterpriseId": 2261,
        "nodeId": 9710921056296,
        "automatorName": "automator-extra",
        "automatorId": 0  
    },

}


// -----------------------------------------------------------------------------------------------
// Which test to run?

// dev azure
// let testData = automatorTestData["dev-mhewett-azure-sso-cloud-2"];

// local azure
let testData = automatorTestData["local-mhewett42-azure-sso-cloud"];
// TestAutomatorFullSetup(testData, false).finally();

// dev Rainer
// let testData = automatorTestData["dev-rainerkec-automator-1"];


// TestAutomatorCreateRest(testData).finally();
// TestAutomatorDeleteRest(testData, false).finally();
// TestAutomatorEditRest(testData).finally();
// TestAutomatorEnableRest(testData).finally();
// TestAutomatorGetRest(testData).finally();
// TestAutomatorGetAllOnNodeRest(testData).finally();
// TestAutomatorGetAllForEnterpriseRest(testData).finally();
// TestAutomatorInitializeRest(testData).finally();
// TestAutomatorResetRest(testData).finally();
// TestAutomatorSetupRest(testData).finally();
// TestAutomatorSkillsRest(testData).finally();
// TestAutomatorLogGetRest(testData).finally();
// TestAutomatorLogClearRest(testData).finally();


// Test on dev, don't create an Automator
// TestAutomatorFullSetup(testData, false).finally();

// Test on local, create an Automator
// TestAutomatorFullSetup(testData, true).finally();

// Test on local, delete automator, optionally creating one first
// TestAutomatorDeleteRest(testData, false).finally();

// Test on local, don't create an Automator
// TestAutomatorFullSetup(testData, false).finally();

// Use this to test connectivity.  We had a problem where every other request was rejected by the server.
// TestAutomatorGetMultipleRest(testData).finally();


// -----------------------------------------------------------------------------------------------
// Automator tests
// -----------------------------------------------------------------------------------------------

// POST, ENCRYPTED, automator/automator_create
async function TestAutomatorFullSetup(config, doCreate) {
    console.log("\n*** TestAutomatorCreateRest on " + keeperHost + " ***");

    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const automatorPrefix = 'automator/';
    const createEndpoint = 'automator_create';
    const getEndpoint = 'automator_get';
    const editEndpoint = 'automator_edit';
    const initializeEndpoint = 'automator_initialize';
    const setupEndpoint = 'automator_setup';

    const devAutomatorTestPrivateKey = hexToBytes("0587ec9a62fbc3b8dbb2d292a6a860acc6eab6af4480f7beaf0f86fa7f52104d");

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

        console.log("auth.eccPrivateKey =", bytesToHex(auth.eccPrivateKey));

        // Optionally: Create a new Automator  --------------------------------------------------------
        if (doCreate) {
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
        let restReq5 = AdminEditAutomatorRequest.create({
            "automatorId": config.automatorId,
            "url": config.automatorUrl,
            "enabled": true,
        });

        let resp5 = await auth.executeRest(automatorAdminEditMessage(restReq5, automatorPrefix + editEndpoint));
        if (resp5.automatorInfo.length > 0) {
            console.log("Automator settings (new)", resp5.automatorInfo[0]);
        } else {
            console.log("Unable to edit automator:", resp5.message);
            return;
        }

        // Check the value of the URL (not needed except during testing)
        let newUrl = resp5.automatorInfo[0].url;
        if (newUrl === config.automatorUrl) {
            console.log("  url matches!");
        } else {
            console.log("  url not correct: [" + newUrl + "] should be [" + config.automatorUrl + "]");
        }

        // SETUP (exchange keys) with the Automator  ------------------------------------------------
        console.log("Calling setup Step 1");
        let restReq3 = AdminSetupAutomatorRequest.create({
            "automatorId": config.automatorId,
            "automatorState": AutomatorState.NEEDS_CRYPTO_STEP_1
        });

        // Get the Automator's public key
        let resp3 = await auth.executeRest(automatorAdminSetupMessage(restReq3, automatorPrefix + setupEndpoint));
        // console.log(resp3);
        console.log("public key has length", resp3.automatorEcPublicKey.length);

        console.log("Calling setup Step 2");
        // Send the enterprise data key encrypted with the automator public key
        let restReq4 = AdminSetupAutomatorRequest.create({
            "automatorId": config.automatorId,
            "automatorState": resp3.automatorState,
            "encryptedEcEnterprisePrivateKey": await platform.publicEncryptEC(devAutomatorTestPrivateKey, resp3.automatorEcPublicKey),
            "encryptedRsaEnterprisePrivateKey": await platform.publicEncryptEC(auth.privateKey, resp3.automatorEcPublicKey)
        });

        let resp4 = await auth.executeRest(automatorAdminSetupMessage(restReq4, automatorPrefix + setupEndpoint));
        console.log(resp4);

        console.log("After setup step 2, automator state is", resp4.automatorState);

        // Send the settings to the Automator  ---------------------------------------------------
        let restReq6 = AdminInitializeAutomatorRequest.create({
            "automatorId": config.automatorId
        });

        let resp6 = await auth.executeRest(automatorAdminInitializeMessage(restReq6, automatorPrefix + initializeEndpoint));
        if (resp6.success) {
            console.log("Automator", config.automatorId, " successfully initialized");
        } else {
            console.log("Initialization unsuccessful:", resp6.message);
        }

     } catch (e) {
        console.log(e)
    }
}



// POST, ENCRYPTED, automator/automator_create
async function TestAutomatorCreateRest(config) {
    console.log("\n*** TestAutomatorCreateRest on " + keeperHost + " ***");

    let nodeId = config.nodeId; // This is the Azure Cloud SSO node on dev
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
            "name": config.automatorName
        });

        let resp = await auth.executeRest(automatorAdminCreateMessage(restReq, configPrefix + configEndpoint));

        console.log(resp);
     } catch (e) {
        console.log(e)
    }
}

// POST, ENCRYPTED, automator/automator_delete
async function TestAutomatorDeleteRest(config, do_create) {
    console.log("\n*** TestAutomatorDelete on " + keeperHost + " ***");

    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const automatorPrefix = 'automator/';
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

        if (do_create) {
            // Create an automator
            let restReq = AdminCreateAutomatorRequest.create({
              "nodeId": config.nodeId,
              "name": "Automator Test 1"
          });
          let resp: IAdminResponse = await auth.executeRest(automatorAdminCreateMessage(restReq, automatorPrefix + createEndpoint));
          config.automatorId = resp.automatorInfo[0].automatorId;
          console.log(resp);
          console.log("Created automator", config.automatorId);
 
          // Retrieve the automator
          let restReq2 = AdminGetAutomatorRequest.create({
              "automatorId": config.automatorId
          });
          resp = await auth.executeRest(automatorAdminGetMessage(restReq2, automatorPrefix + getEndpoint));
            console.log(resp);
        }

        // Delete the automator
        let restReq3 = AdminDeleteAutomatorRequest.create({
            "automatorId": config.automatorId
        });
        let resp = await auth.executeRest(automatorAdminDeleteMessage(restReq3, automatorPrefix + deleteEndpoint));
        console.log(resp);

     } catch (e) {
        console.log(e)
     }
}

// POST, ENCRYPTED, automator/automator_edit
async function TestAutomatorEditRest(config) {
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
async function TestAutomatorEnableRest(config) {
    console.log("\n*** TestAutomatorEnableRest on " + keeperHost + " ***");

    let nodeId = config.nodeId; 
    let automatorId = config.automatorId; // Local automator "automator-2"
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
async function TestAutomatorGetRest(config) {
    console.log("\n*** TestAutomatorGetRest on " + keeperHost + " ***");

    let nodeId = config.nodeId;
    let automatorId = config.automatorId;
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


// POST, ENCRYPTED, automator/automator_get
async function TestAutomatorGetMultipleRest(config) {
    console.log("\n*** TestAutomatorGetMultipleRest on " + keeperHost + " ***");

    let nodeId = config.nodeId;
    let automatorId = config.automatorId;
    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const configPrefix = 'automator/';
    const configEndpoint = 'automator_get';
    const SLEEP_TIME_MS = 1000;

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

        console.log("Try #1");
        let resp = await auth.executeRest(automatorAdminGetMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
        if (resp.automatorInfo.length > 0) {
            console.log(resp.automatorInfo[0].status);
        }

        await sleep(SLEEP_TIME_MS);

        console.log("Try #2");
        resp = await auth.executeRest(automatorAdminGetMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
        if (resp.automatorInfo.length > 0) {
            console.log(resp.automatorInfo[0].status);
        }

        await sleep(SLEEP_TIME_MS);

        console.log("Try #3");
        resp = await auth.executeRest(automatorAdminGetMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
        if (resp.automatorInfo.length > 0) {
            console.log(resp.automatorInfo[0].status);
        }

        await sleep(SLEEP_TIME_MS);

        console.log("Try #4");
        resp = await auth.executeRest(automatorAdminGetMessage(restReq, configPrefix + configEndpoint));
        console.log(resp);
        if (resp.automatorInfo.length > 0) {
            console.log(resp.automatorInfo[0].status);
        }
        
     } catch (e) {
        console.log(e)
     }
}

// POST, ENCRYPTED, automator/automator_get_all_for_enterprise
async function TestAutomatorGetAllForEnterpriseRest(config) {
    console.log("\n*** TestAutomatorGetAllForEnterpriseRest on " + keeperHost + " ***");

    let enterpriseId = config.enterpriseId;
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
async function TestAutomatorGetAllOnNodeRest(config) {
    console.log("\n*** TestAutomatorGetAllOnNodeRest on " + keeperHost + " ***");

    let nodeId = config.nodeId; // This is the Azure Cloud SSO node on dev
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
async function TestAutomatorResetRest(config) {
    console.log("\n*** TestAutomatorResetRest on " + keeperHost + " ***");

    let nodeId = config.nodeId;
    let automatorId = config.automatorId;
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
     
// POST, ENCRYPTED, automator/automator_skills_get
async function TestAutomatorSkillsRest(config) {
    console.log("\n*** TestAutomatorSkillsRest on " + keeperHost + " ***");

    let automatorId = config.automatorId;
    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const configPrefix = 'automator/';
    const configEndpoint = 'automator_skills_get';

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

        let restReq = AdminAutomatorSkillsRequest.create({
            "automatorId": automatorId
        });

        let resp = await auth.executeRest(automatorAdminSkillsMessage(restReq, configPrefix + configEndpoint));

        console.log(resp);
     } catch (e) {
        console.log(e)
     }
}
   
// POST, ENCRYPTED, automator/automator_setup
async function TestAutomatorSetupRest(config) {
    console.log("\n*** TestAutomatorSetupRest on " + keeperHost + " ***");

    let nodeId = config.nodeId;
    let automatorId = config.automatorId;
    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const configPrefix = 'automator/';
    const configEndpoint = 'automator_setup';

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

        console.log("Calling setup Step 1");
        let rest1Req = AdminSetupAutomatorRequest.create({
            "automatorId": automatorId,
            "automatorState": AutomatorState.NEEDS_CRYPTO_STEP_1
        });

        // Get the Automator's public key
        let resp1 = await auth.executeRest(automatorAdminSetupMessage(rest1Req, configPrefix + configEndpoint));
        console.log(resp1);
        console.log("public key has length", resp1.automatorEcPublicKey.length);

        console.log("Calling setup Step 2");
        
        // Send the enterprise data key encrypted with the automator public key
        let rest2Req = AdminSetupAutomatorRequest.create({
            "automatorId": automatorId,
            "automatorState": resp1.automatorState,
            "encryptedEcEnterprisePrivateKey": await platform.publicEncryptEC(auth.eccPrivateKey, resp1.automatorEcPublicKey),
            "encryptedRsaEnterprisePrivateKey": await platform.publicEncryptEC(auth.privateKey, resp1.automatorEcPublicKey)
        });

        console.log("auth.eccPrivateKey =", bytesToHex(auth.eccPrivateKey));

        let resp2 = await auth.executeRest(automatorAdminSetupMessage(rest2Req, configPrefix + configEndpoint));
        console.log(resp2);

        console.log("After setup step 2, automator state is", resp2.automatorState);
     } catch (e) {
        console.log(e)
     }
}

// POST, ENCRYPTED, automator/automator_log_get
async function TestAutomatorLogGetRest(config) {
    console.log("\n*** TestAutomatorLogGetRest on " + keeperHost + " ***");

    let nodeId = config.nodeId;
    let automatorId = config.automatorId;
    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const configPrefix = 'automator/';
    const configEndpoint = 'automator_log_get';

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

        let restReq = AdminAutomatorLogRequest.create({
            "automatorId": automatorId
        });

        let resp = await auth.executeRest(automatorAdminLogGetMessage(restReq, configPrefix + configEndpoint));

        console.log(resp);
        if (resp.automatorInfo.length > 0) {
            console.log(resp.automatorInfo[0].status);
        }
     } catch (e) {
        console.log(e)
     }
}

// POST, ENCRYPTED, automator/automator_log_clear
async function TestAutomatorLogClearRest(config) {
    console.log("\n*** TestAutomatorLogClearRest on " + keeperHost + " ***");

    let nodeId = config.nodeId;
    let automatorId = config.automatorId;
    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const configPrefix = 'automator/';
    const configEndpoint = 'automator_log_clear';

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

        let restReq = AdminAutomatorLogClearRequest.create({
            "automatorId": automatorId
        });

        let resp = await auth.executeRest(automatorAdminLogClearMessage(restReq, configPrefix + configEndpoint));

        console.log(resp);
        if (resp.automatorInfo.length > 0) {
            console.log(resp.automatorInfo[0].status);
        }
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

function bytesToHex(data: Uint8Array): string {
    let hex = [];
    for (let i = 0; i < data.length; i++) {
        let current = data[i] < 0 ? data[i] + 256 : data[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join("");
}


function hexToBytes(data: string): Uint8Array {
    let bytes = [];
    for (let c = 0; c < data.length; c += 2)
        bytes.push(parseInt(data.substr(c, 2), 16));
    return Uint8Array.from(bytes);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

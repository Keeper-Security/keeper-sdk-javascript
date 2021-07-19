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
import AdminInitializeAutomatorRequest = Automator.AdminInitializeAutomatorRequest;
import AdminResetAutomatorRequest = Automator.AdminResetAutomatorRequest;
import AdminResponse = Automator.AdminResponse;
import IAdminResponse = Automator.IAdminResponse;

import {automatorAdminCreateMessage, automatorAdminDeleteMessage, automatorAdminEditMessage, automatorAdminEnableMessage, automatorAdminGetMessage, automatorAdminInitializeMessage, automatorAdminResetMessage, serviceLoggerGetMessage} from '../src/restMessages';

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

// -----------------------------------------------------------------------------------------------
// Which test to run?
// TestAutomatorCreateRest().finally();
// TestAutomatorDeleteRest().finally();
// TestAutomatorEditRest().finally();
// TestAutomatorEnableRest().finally();
TestAutomatorGetRest().finally();
// TestAutomatorInitializeRest().finally();
// TestAutomatorResetRest().finally();

// -----------------------------------------------------------------------------------------------
// Automator tests
// -----------------------------------------------------------------------------------------------


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
        console.log(resp.automatorInfo[0].status);
     } catch (e) {
        console.log(e)
     }
}

// POST, ENCRYPTED, automator/automator_initialize
async function TestAutomatorInitializeRest() {
    console.log("\n*** TestAutomatorInitializeRest on " + keeperHost + " ***");

    let nodeId = 9710921056296; // This is the Azure Cloud SSO node on dev
    let automatorId = 9710921056484;
    const deviceConfig = getDeviceConfig(deviceName, keeperHost);
    const configPrefix = 'automator/';
    const configEndpoint = 'automator_initialize';

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

        let restReq = AdminInitializeAutomatorRequest.create({
            "automatorId": automatorId
        });

        let resp = await auth.executeRest(automatorAdminInitializeMessage(restReq, configPrefix + configEndpoint));

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



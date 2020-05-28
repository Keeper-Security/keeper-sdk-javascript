import {Auth, AuthUI} from '../src/auth'
import {Vault} from '../src/vault'
import {connectPlatform, platform} from '../src/platform'
import {nodePlatform} from '../src/node/platform'
import * as readline from 'readline'
import * as fs from 'fs'
import * as request from 'request'
import {ServiceLogger} from '../src/proto'

// Mike Test -------------------------------------
// 24-Apr-2020
// $ ts-node test/test-serviceLogger.ts

import ServiceLogGetRequest = ServiceLogger.ServiceLogGetRequest;
import ServiceLogSpecifier = ServiceLogger.ServiceLogSpecifier;
import ServiceLogResponse = ServiceLogger.ServiceLogResponse;
import {serviceLoggerGetMessage} from '../src/restMessages'
import {ssoLoginMessage, ssoLogoutMessage, ssoGetMetadataMessage} from '../src/restMessages'

interface UserInfo {
    account: string,
    password: string
}

const MIKE_VAULT_LOGIN_1 : UserInfo = { "account": "mhewett+reg70@keepersecurity.com", "password": "Password11" }
const MIKE_ADMIN_LOGIN_1 : UserInfo = { "account": "mhewett+sso42@keepersecurity.com", "password": "Password11" }
const MIKE_SSO_LOGIN_1 : UserInfo  = { "account": "mhewett+sso60@keepersecurity.com", "password": "Password11" }

// end Mike Test ------------------------------------------

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

const authUI: AuthUI = {
    displayDialog(): Promise<boolean> {
        return null
    },
    getTwoFactorCode(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            })
            rl.question('Enter Code: ', code => {
                resolve(code)
                rl.close()
            })
        })
    }
}

const prompt = async (message: string): Promise<string> => new Promise<string>((resolve) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(message, response => {
        resolve(response)
        rl.close()
    });
})

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
        host: 'local.keepersecurity.com'
        // host: KeeperEnvironment.DEV
        // host: KeeperEnvironment.QA
    }, authUI)
    let userInfo = user || currentUser;
    await auth.login(userInfo.account, userInfo.password);
    console.log(`login to ${userInfo.account} successful`)
    return auth;
}

const currentUser = MIKE_VAULT_LOGIN_1;

// ServiceLogger and Cloud SSO Connect ---------------
// testServiceLogger().finally();
TestSsoGetMetadata().finally();
TestSsoLogin().finally();


/* ------------------ Service Logger -------------------- */

async function testServiceLogger() {

    let keeperHost = 'local.keepersecurity.com';  // KeeperEnvironment.DEV;
    let user = MIKE_VAULT_LOGIN_1;  // MIKE_ADMIN_LOGIN_1;

    try {
        let auth = new Auth({
            host: keeperHost
        }, authUI);
        await auth.login(user.account, user.password);
        console.log("Logged in...");

        let serviceLoggerGetReq = ServiceLogGetRequest.create({serviceLogSpecifier: [{all: true}]});

        let serviceLoggerResp = await auth.executeRest(serviceLoggerGetMessage(serviceLoggerGetReq));
        console.log(serviceLoggerResp)
        // let recTypes = recTypesResp.recordTypes.map(x => JSON.stringify(JSON.parse(x.content)))
        // console.log(recTypes)

    } catch (e) {
        console.log(e)
    }
}


/* ------------------ Cloud SSO Connect -------------------- */

async function TestSsoLogin() {

    let keeperHost = 'local.keepersecurity.com';  // KeeperEnvironment.DEV;
    console.log("\n*** TestSsoLogin on " + keeperHost + " ***");

    let user = MIKE_VAULT_LOGIN_1;  // MIKE_ADMIN_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;

    try {
        let auth = new Auth({
            host: keeperHost
        }, authUI);

    /*
        await auth.login(user.account, user.password);
        console.log("Logged in...");
     */

        // This should return HTML
        console.log("Logging in via sso");
        let ssoLoginResp = await auth.executeRestToHTML(ssoLoginMessage(serviceProviderId));
        console.log("\n---------- HTML ---------------\n" + ssoLoginResp + "-----------------------------------\n");

        // Wait a few seconds and then logout
        // await new Promise(resolve => setTimeout(resolve, 5000));

        // console.log("Logging out via slo");
        // let ssoLogoutResp = await auth.executeRestToHTML(ssoLogoutMessage(serviceProviderId, { "username": "mhewett+sso61@keepersecurity.com"}));
        // console.log("\n---------- HTML ---------------\n" + ssoLogoutResp + "-----------------------------------\n");

    } catch (e) {
        console.log(e)
    }
}

async function TestSsoGetMetadata() {

    let keeperHost = 'local.keepersecurity.com';  // KeeperEnvironment.DEV;  //'local.keepersecurity.com';
    console.log("\n*** TestSsoGetMetadata on " + keeperHost + " ***");

    let user = MIKE_VAULT_LOGIN_1;  // MIKE_ADMIN_LOGIN_1;
    let serviceProviderId = 9710921056266; // 6219112644615;

    try {
        let auth = new Auth({
            host: keeperHost
        }, authUI);

    /*
        await auth.login(user.account, user.password);
        console.log("Logged in...");
     */

        // This should return HTML
        console.log("Getting Service Provider Metadata");
        let url = "https://" + keeperHost + "/api/rest/" + ssoGetMetadataMessage(serviceProviderId).path;
        request(url).pipe(fs.createWriteStream('sp-metadata.xml'));
        console.log("File received");

        // console.log("Trying method 2");
        // let ssoMetadataResp = await platform.get(url, null);  // should be a byte array
        // let download = ssoMetadataResp.downloads[0];
        // console.log("\n---------- METADATA ---------------\n" + download.url + "-----------------------------------\n");

    } catch (e) {
        console.log(e)
    }
}

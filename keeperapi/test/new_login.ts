import {Auth, decryptEncryptionParams} from "../src/auth";
import {
    accountSummaryMessage,
    approveDeviceMessage,
    getMasterPasswordSaltMessage,
    setV2AlternatePasswordMessage
} from '../src/restMessages';
import {connectPlatform, platform} from '../src/platform';
import {nodePlatform} from '../src/node/platform';
import {generateUidBytes, normal64Bytes, webSafe64FromBytes, wrapPassword} from '../src/utils';
import {
    authUI3, enablePersistentLogin,
    getCredentialsAndHost,
    getDeviceConfig,
    saveDeviceConfig,
    TestKeyValueStorage,
    TestSessionStorage
} from './testUtil';
import {createECDH} from "crypto";
import {ClientConfiguration} from '../src/configuration';
import {KeeperEnvironment} from '../src/endpoint';
import {Authentication, Enterprise} from '../src/proto';
import * as tls from "tls";
import * as net from "net";
import {Vault} from '../src/vault';
import {post, CoreOptions} from 'request';
import {TeamEnterpriseUserRemoveCommand} from '../src/commands';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

const clientVersion = 'w15.0.0'
// const clientVersion = 'i15.0.0'

async function testRegistration() {

    const {userName, password, host} = getCredentialsAndHost()

    const deviceConfig = getDeviceConfig('test device', host)

    const auth = new Auth({
        host: host,
        clientVersion: clientVersion,
        deviceConfig: deviceConfig,
        onDeviceConfig: saveDeviceConfig
    })

    await auth.registerDevice()

    await auth.createUser(userName, wrapPassword(password))
}

type BackupRecord = {
    recordUid: string,
    data: string
}

type BackupUser = {
    id: number,
    userName: string,
    dataKey: string,
    privateKey: string,
    records: BackupRecord[]
}

async function decryptUsers(
    encryptedUsers: Enterprise.IBackupUser[], encryptedRecords: Enterprise.IBackupRecord[],
    enterpriseEccPrivateKey: Uint8Array, userName: string, password: string): Promise<BackupUser[]> {
    const thisAdmin = encryptedUsers.find(x => x.userName === userName)
    const dataKey = await decryptEncryptionParams(wrapPassword(password), thisAdmin.dataKey);
    const privateKey = platform.aesCbcDecrypt(thisAdmin.privateKey, dataKey, true)
    const treeKey = (thisAdmin.treeKeyType === Enterprise.BackupKeyType.ENCRYPTED_BY_DATA_KEY)
        ? platform.aesCbcDecrypt(thisAdmin.treeKey, dataKey, true)
        : platform.privateDecrypt(thisAdmin.treeKey, privateKey)
    const eccPrivateKey = await platform.aesGcmDecrypt(enterpriseEccPrivateKey, treeKey)
    const users: BackupUser[] = []
    for (const user of encryptedUsers) {
        let userDataKey
        switch (user.dataKeyType) {
            case Enterprise.BackupUserDataKeyType.OWN:
                userDataKey = user.userName === userName ? dataKey : null
                break;
            case Enterprise.BackupUserDataKeyType.SHARED_TO_ENTERPRISE:
                userDataKey = await platform.privateDecryptEC(user.dataKey, eccPrivateKey)
                break;
        }
        let userPrivateKey
        if (userDataKey) {
            userPrivateKey = platform.aesCbcDecrypt(user.privateKey, userDataKey, true)
            if (user.backupKey.length > 0) {
                const backupKey = platform.privateDecrypt(user.backupKey, userPrivateKey)
                console.log('BACKUP KEY', backupKey)
            }
        }
        const userRecords: BackupRecord[] = []
        for (const record of encryptedRecords.filter(x => x.userId === user.userId)) {
            let recordData
            if (userDataKey) {
                let recordKey
                switch (record.keyType) {
                    case Enterprise.BackupKeyType.ENCRYPTED_BY_DATA_KEY:
                        recordKey = platform.aesCbcDecrypt(record.key, userDataKey, true)
                        break;
                    case Enterprise.BackupKeyType.ENCRYPTED_BY_PUBLIC_KEY:
                        recordKey = platform.privateDecrypt(record.key, userPrivateKey)
                        break;
                }
                const dataBytes = record.version < 3
                    ? platform.aesCbcDecrypt(record.data, recordKey, true)
                    : await platform.aesGcmDecrypt(record.data, recordKey)
                recordData = platform.bytesToString(dataBytes)
            } else {
                recordData = 'unable to decrypt, keys are missing'
            }
            userRecords.push({
                recordUid: platform.bytesToBase64(record.recordUid),
                data: recordData
            })
        }
        users.push({
            id: user.userId,
            userName: user.userName,
            dataKey: userDataKey && platform.bytesToBase64(userDataKey),
            privateKey: userPrivateKey && platform.bytesToBase64(userPrivateKey),
            records: userRecords
        })
    }
    return users
}

async function testLogin() {

    const {userName, password, host} = getCredentialsAndHost()

    const deviceName = 'test device'

    const deviceConfig = getDeviceConfig(deviceName, host)

    const options: ClientConfiguration = {
        host: host,
        clientVersion: clientVersion,
        deviceConfig: deviceConfig,
        sessionStorage: new TestSessionStorage(deviceName, host),
        // useSessionResumption: true,
        kvs: new TestKeyValueStorage(host),
        onDeviceConfig: saveDeviceConfig,
        authUI3: authUI3
    }
    options.onRegionChanged = newRegion => {
        options.deviceConfig = getDeviceConfig(deviceName, newRegion as KeeperEnvironment)
    }

    const auth = new Auth(options)

    try {
        try {
            await auth.loginV3({
                username: userName,
                // loginType: LoginType.ALTERNATE,
                password: wrapPassword(password)
            })
        } catch (e) {
            console.log(e)
            return
        }
        console.log(auth.dataKey)

        // const getCmd = new GetEnterpriseSettingCommand()
        // getCmd.include = ['AuditAlertFilter']
        // let resp = await auth.executeCommand(getCmd)
        // let slack = resp.AuditAlertFilter[1]
        // console.log(slack)
        // let r0 = slack.recipients[0]
        // delete r0.url
        // delete r0.template
        // r0.webhook = {
        //     url: 'https://hooks.slack.com/services/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',
        //     template: '{ "text": "*Item1*\nOne\n*Item2*\nTwo"}',
        //     token: '123'
        // }

        // const putCmd = new PutEnterpriseSettingCommand()
        // putCmd.type = 'AuditAlertFilter'
        // putCmd.settings = slack
        // const resp2 = await auth.executeCommand(putCmd)
        // console.log(resp2)

        // const encryptedUsers: Enterprise.IBackupUser[] = []
        // const encryptedRecords: Enterprise.IBackupRecord[] = []
        // let enterpriseEccPrivateKey: Uint8Array
        // let request: any = {}
        // let count = 0
        // while (true) {
        //     // if (count++ > 1) {
        //     //     break
        //     // }
        //     const msg = getBackupMessage(request)
        //     const resp = await auth.executeRest(msg)
        //     console.log(resp)
        //     if (resp.enterpriseEccPrivateKey.length > 0) {
        //         enterpriseEccPrivateKey = resp.enterpriseEccPrivateKey
        //     }
        //     encryptedUsers.push(...resp.users)
        //     encryptedRecords.push(...resp.records)
        //     if (resp.continuationToken.length > 0) {
        //         request.continuationToken = resp.continuationToken
        //     } else {
        //         break
        //     }
        // }
        // const users = await decryptUsers(encryptedUsers, encryptedRecords, enterpriseEccPrivateKey, userName, password)
        // console.log(JSON.stringify(users, null, 2))

        // await shareDataKeyWithEnterprise(auth)
        // await enablePersistentLogin(auth)

        // let vault = new Vault(auth)
        // vault.noTypedRecords = true;
        // try {
        //     await vault.syncDown(0)
        //     const recordUid = vault.recordUids[0]
        //     console.log(recordUid)
        //     const resp = await vault.shareRecords([
        //         recordUid
        //     ], 'admin+3596@yozik.us')
        //     console.log(resp)
        // }
        // catch (e) {
        //     console.error(e)
        // }

        // let vault = new Vault(auth)
        // vault.noTypedRecords = true;
        // // await vault.syncDown(0, true)
        // await vault.syncDown(997905, true)
        // for (let record of vault.records) {
        //     console.log(record.data)
        //     console.log(record.recordData.udata)
        //     console.log(record.nonSharedData)
        // }

        // await auth.logout()
    } finally {
        auth.disconnect()
    }
}

async function testNewDevice() {
    const {userName, password, host} = getCredentialsAndHost()

    const deviceConfig = getDeviceConfig('device1', host)

    const auth = new Auth({
        host: host,
        clientVersion: clientVersion,
        deviceConfig: deviceConfig,
        onDeviceConfig: saveDeviceConfig,
        authUI3: authUI3
    })
    try {
        await auth.loginV3({
            username: userName,
            password,
        })
        console.log(auth.dataKey)
    } finally {
        auth.disconnect()
    }
}

async function testLoginToLinkedDevice() {
    const {userName, password, host} = getCredentialsAndHost()

    const deviceName = 'device1'
    // const deviceName = 'test device'

    const deviceConfig = getDeviceConfig(deviceName, host)

    const auth = new Auth({
        host: host,
        clientVersion: clientVersion,
        deviceConfig: deviceConfig,
        sessionStorage: new TestSessionStorage(deviceName, host),
        useSessionResumption: true,
        onDeviceConfig: saveDeviceConfig,
        authUI3: authUI3
    })
    try {
        await auth.loginV3({
            username: userName,
            password: null,
        })
        console.log(auth.dataKey)
    } finally {
        auth.disconnect()
    }
}

async function testApproveNewDevice() {
    const {userName, password, host} = getCredentialsAndHost()

    const deviceConfig = getDeviceConfig('test device', host)

    const auth = new Auth({
        host: host,
        clientVersion: clientVersion,
        deviceConfig: deviceConfig,
        onDeviceConfig: saveDeviceConfig,
        authUI3: authUI3
    })
    try {
        await auth.loginV3({
            username: userName,
            password,
        })
        console.log(auth.dataKey)

        let resp = await auth.executeRest(accountSummaryMessage({
            summaryVersion: 1
        }));
        const device2approve = resp.devices.find(x => x.deviceName === 'device1')
        const encryptedDeviceDataKey = await platform.publicEncryptEC(auth.dataKey, device2approve.devicePublicKey)
        let resp1 = await auth.executeRest(approveDeviceMessage({
            encryptedDeviceToken: device2approve.encryptedDeviceToken,
            encryptedDeviceDataKey: encryptedDeviceDataKey,
            linkDevice: true
        }))
        console.log(resp1)
    } finally {
        auth.disconnect()
    }
}

async function testECIES() {
    const ecdh = createECDH('prime256v1')
    ecdh.generateKeys()
    const data = generateUidBytes()
    console.log(data)
    const endData = await platform.publicEncryptEC(data, ecdh.getPublicKey())
    const decData = await platform.privateDecryptEC(endData, ecdh.getPrivateKey())
    console.log(decData)
}

export async function withTimeout<T>(promise: Promise<T>, ms: number, processName: string = ""): Promise<T> {

    let timeout = new Promise<T>((resolve, reject) => {
        let id = setTimeout(() => {
            clearTimeout(id);
            reject(`${processName} timed out after ${ms} milliseconds`);
        }, ms)
    });

    return Promise.race([promise, timeout]);
}

export async function syslogExport(host: string, useTLS: boolean, port?: number) {
    const connect = new Promise((resolve, reject) => {
        let connectListener = () => {
            console.log('connected to ' + host)
            // let eventStr = 'hello';
            // client.write(eventStr);
            // client.end();
            resolve();
        };
        let client = useTLS
            ? tls.connect(port || 6514, host, {
                // enableTrace: true,
                // rejectUnauthorized: false,
                //  requestCert: true
            }, connectListener)
            : net.connect(port || 514, host, connectListener);
        client.on("error", (err) => {
            console.log('error connecting to ' + host, err)
            client.end();
            reject(err);
        });
    });
    return withTimeout(connect, 2000, 'syslog connection')
}

export async function webhook() {
    const options: CoreOptions = {}
    // if (body.token) {
    //     options.headers = {
    //         "Authorization": `Bearer ${body.token}`
    //     }
    // }
    options.body = '{ "text": "*Item1*\\nOne\\n*Item2*\\nTwo"}'
    // const resp = await post('https://adminautoapprove.azurewebsites.net/api/ApprovePendingRequestsByWebHook?code=t7ZNiK4INuSFCJixd70x3aau07Kv6ZK0cqL2D4aCd4I8ry0HbGuAsQ==', options)
    const resp = await post('https://hooks.slack.com/services/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', options)
    console.log(resp.response)
}

// syslogExport('badssl.com', true, 443).finally()

// syslogExport('self-signed.badssl.com', true, 443).finally()

// syslogExport('www.keepersecurity.com', true, 443).finally()

// syslogExport('splunk.lurey.com', true).finally()

// syslogExport('splunk.connect.abnamro.com', true).finally()

// webhook().finally()

// testRegistration().finally()
testLogin().finally()
// testNewDevice().finally()
// testApproveNewDevice().finally()
// testLoginToLinkedDevice().finally()
// testECIES().finally()


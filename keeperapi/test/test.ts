import {
    Auth,
    createAuthVerifier,
    createEncryptionParams,
    decryptEncryptionParams,
} from '../src/auth'
import {Vault} from '../src/vault'
import {connectPlatform, platform} from '../src/platform'
import {nodePlatform} from '../src/node/platform'
import * as fs from 'fs'
import {VendorContext} from '../src/vendorContext'
import {Company} from '../src/company'
import {
    AccountSummaryCommand,
    EnterpriseDataInclude,
    GetEnterpriseDataCommand, RegisterCommand,
    RequestDownloadCommand, ResendEnterpriseInviteCommand
} from '../src/commands'
import {KeeperEnvironment} from '../src/endpoint'
import {accountSummaryMessage, recordTypesGetMessage} from '../src/restMessages'
import {generateEncryptionKey, normal64Bytes, webSafe64FromBytes, wrapPassword} from '../src/utils'
import {Records} from '../src/proto'
import {generateKeyPairSync} from 'crypto';
import {getCredentialsAndHost, prompt} from './testUtil'
import RecordModifyResult = Records.RecordModifyResult;
import {AuthUI} from '../src/configuration';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// async function testSockets() {
//     const listener = new SocketListener('wss://echo.websocket.org')
//     const code = await listener.getTwoFactorCode()
//     console.log(code)
// }
//
// testSockets().finally()

connectPlatform(nodePlatform)

const authUI: AuthUI = {
    displayDialog(): Promise<boolean> {
        return null
    },
    getTwoFactorCode(): Promise<string> {
        return prompt('Enter Code: ')
    }
}

async function printVault() {
    try {
        let auth = await login()
        let vault = new Vault(auth)
        vault.noTypedRecords = true;
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

async function testCommand() {
    try {
        let auth = await login()
        let cmd = new AccountSummaryCommand();
        cmd.include = ["license", "settings", "group", "sync_log", "keys", "enforcements", "client_key", "images", "is_enterprise_admin", "security_keys", "personal_license"];
        let resp = await auth.executeCommand(cmd);
        console.log(resp);
    } catch (e) {
        console.log(e)
    }
}

async function testRestAccountSummary() {
    try {
        let auth = await login()
        let resp = await auth.executeRest(accountSummaryMessage({
            summaryVersion: 1
        }));
        console.log(resp);
    } catch (e) {
        console.log(e)
    }
}

async function testRecordUpdate() {
    try {
        let auth = await login()
        let vault = new Vault(auth)
        await vault.syncDown()
        let rec = vault.records[0]
        console.log(rec)
        rec.data.secret1 = rec.data.secret1 + '+'
        // rec.non_shared_data = null
        // delete rec.non_shared_data
        // rec.non_shared_data = {
        //     a: 1,
        //     b: 2
        // }
        let resp = await vault.updateRecord(rec.recordData.record_uid)
        if (resp.records[0].status !== RecordModifyResult.RS_SUCCESS) {
            console.log(resp.records[0])
            return
        }
        await vault.syncDown()
        rec = vault.records[0]
        console.log(rec)
    } catch (e) {
        console.log(e)
    }
}

async function testRecordUpdateForLegacy() {
    try {
        let auth = await login()

        let legacyVault = new Vault(auth)
        legacyVault.noTypedRecords = true
        let vault = new Vault(auth)
        await vault.syncDown(0, true)
        console.log(vault.records[0])
        await prompt('Press any key...')

        console.log('deleting records...')
        // await vault.deleteRecords(vault.records)

        console.log('adding record...')
        await vault.addRecord({
            title: 'new record',
            secret1: 'abcd'
        })

        await vault.syncDown()
        await legacyVault.syncDown()

        await prompt('Press any key...')

        let rec = vault.records[0]
        // console.log(rec)
        rec.data.secret1 = rec.data.secret1 + '+'

        console.log('updating...')
        let resp = await vault.updateRecord(rec.recordData.record_uid)
        if (resp.records[0].status !== RecordModifyResult.RS_SUCCESS) {
            console.log(resp.records[0])
            return
        }

        await legacyVault.syncDown(0, true)
        if (legacyVault.records.length > 0) {
            rec = vault.records[0]
            console.log(rec)
        }
        else
        {
            console.log('legacy vault is empty')
        }
    } catch (e) {
        console.log(e)
    }
}

async function cleanVault(user?: string) {
    try {
        let cleanTrash = false
        let auth = await login(user)
        let vault = new Vault(auth)
        await vault.syncDown(0, true)
        let records = vault.records
            .filter(x => !x.sharedFolderUid)
            .map(x => x.recordData.record_uid)
        if (records.length !== 0) {
            console.log(`Deleting ${records.length} records`)
            const deleteResponse = await vault.deleteRecords(records)
            console.log(deleteResponse)
            cleanTrash = true
        }
        else {
            console.log('No records to delete')
        }
        if (vault.sharedFolders.length !== 0) {
            console.log(`Deleting ${vault.sharedFolders.length} shared folders`)
            const deleteResponse = await vault.deleteSharedFolders(vault.sharedFolderUids)
            console.log(deleteResponse)
            cleanTrash = true
        }
        else {
            console.log('No shared folders to delete')
        }
        if (cleanTrash) {
            await vault.cleanTrash()
        }
    } catch (e) {
        console.log(e)
    }
}

async function testAttachmentsDownload() {

    try {
        let auth = new Auth({
            // host: 'local.keepersecurity.com'
            host: KeeperEnvironment.DEV,
            authUI: authUI
        })
        await auth.login('saldoukhov@gmail.com', wrapPassword('111111'))
        console.log('login successful')
        let vault = new Vault(auth)
        await vault.syncDown()
        let rec = vault.records[0]
        let file = rec.extra.files[0]
        console.log(file)

        const downloadCommand = new RequestDownloadCommand()
        downloadCommand.record_uid = rec.recordData.record_uid
        downloadCommand.file_ids = [rec.extra.files[0].id]
        const resp = await auth.executeCommand(downloadCommand)

        const fileResponse = await platform.get(resp.downloads[0].url, {})
        const decryptedFile = platform.aesCbcDecrypt(fileResponse.data, normal64Bytes(file.key), false)
        fs.writeFileSync(file.name, decryptedFile)
        console.log(decryptedFile)
    } catch (e) {
        console.log(e)
    }
}

// const encryptToBlob = (data: Uint8Array, key:Uint8Array, mimeType?: string) => {
//     var bytes = KeeperAES256.encryptToBytes(cleartext, key, false)!
//     return new Blob([bytes], { type: 'application/octet-binary' })
// }

async function testAttachmentsUpload() {
    try {
        let auth = await login()
        let vault = new Vault(auth)
        // await vault.syncDown()

        const fileName = 'corona.jpg'
        const file = fs.readFileSync(fileName)

        const fileData = await vault.uploadFileOld(fileName, file)
        // const fileData = await vault.uploadFile(fileName, file)

        await vault.addRecord({
            title: 'my file',
            secret1: 'abcd'
        }, [fileData])
        // await vault.addRecordNew({
        //     title: 'new record',
        //     secret1: 'abcd'
        // })
    } catch (e) {
        console.log(e)
    }
}

async function printMSPVault() {

    try {
        let auth = new Auth({
            host: "local.keepersecurity.com",
            authUI: authUI
        })
        // await auth.login('admin+msp@yozik.us', wrapPassword('111111'))
        // await auth.managedCompanyLogin('admin+msp@yozik.us', wrapPassword('111111'), 2858)
        await auth.managedCompanyLogin('admin+mspn1@yozik.us', wrapPassword('111111'), 2858)
        // await auth.managedCompanyLogin('admin+msp@yozik.us', wrapPassword('111111'), 2906)
        console.log('login successful')
        let cmd = new GetEnterpriseDataCommand()
        let entData = await auth.executeCommand(cmd)
        console.log(entData)
        // let vault = new Vault(auth)
        // await vault.syncDown()
        // for (let record of vault.records) {
        //     console.log(record.data.title)
        // }
    } catch (e) {
        console.log(e)
    }
}

async function printRecordTypes() {

    try {
        let auth = new Auth({
            host: KeeperEnvironment.DEV,
            authUI: authUI
        })
        await auth.login('saldoukhov@gmail.com', wrapPassword('111111'))
        console.log("Logged in...")
        // await auth.login('saldoukhov@keepersecurity.eu', wrapPassword('keeper'))


        // let accountSummary = new AccountSummaryCommand()
        // accountSummary.include = ['settings']
        // let resp = await auth.executeCommand(accountSummary)
        // console.log(resp)


        let recTypesResp = await auth.executeRest(recordTypesGetMessage({standard: true, enterprise: true}))
        console.log(recTypesResp)
        let recTypes = recTypesResp.recordTypes.map(x => JSON.stringify(JSON.parse(x.content)))
        console.log(recTypes)

        // let recTypeAddResp = await auth.executeRest(recordTypeAddMessage({
        //     content: '{"$id":"file3","categories":["file"],"description":"File template","fields":[{"$ref":"file"}]}',
        //     scope: RecordTypeScope.RT_ENTERPRISE
        // }))
        // console.log(recTypeAddResp)
        //
        // let recTypeUpdateResp = await auth.executeRest(recordTypeUpdateMessage({
        //     recordTypeId: recTypeAddResp.recordTypeId,
        //     content: '{"$id":"file3","categories":["file"],"description":"File template","fields":[{"$ref":"file"}]}',
        //     scope: RecordTypeScope.RT_ENTERPRISE
        // }))
        // console.log(recTypeUpdateResp)
        //
        // let recTypeDeleteResp = await auth.executeRest(recordTypeDeleteMessage({
        //     recordTypeId: recTypeAddResp.recordTypeId,
        //     scope: RecordTypeScope.RT_ENTERPRISE
        // }))
        // console.log(recTypeDeleteResp)
    } catch (e) {
        console.log(e)
    }
}

async function printCompany() {
    try {
        // let auth = await login(null, 81169)
        let auth = await login(null, 77395)
        let company = new Company(auth)
        let allIncludes: EnterpriseDataInclude[] = [
            'nodes',
            'users',
            'roles',
            'role_enforcements',
            'role_privileges',
            'role_users',
            'managed_nodes',
            'licenses',
            'team_users',
            'teams',
            'role_keys',
            'role_keys2',
            'queued_teams',
            'queued_team_users',
            'bridges',
            'scims',
            'email_provision',
            'sso_services',
            'user_privileges'
        ]
        await company.load(allIncludes)
        for (let node of company.data.nodes) {
            console.log(node.displayName)
        }
        for (let role of company.data.roles) {
            console.log(role.displayName)
        }
        for (let user of company.data.users) {
            console.log(user.displayName)
        }
    } catch (e) {
        console.log(e)
    }
}

async function testResendInvite() {
    const auth = await login()
    const resendCommand = new ResendEnterpriseInviteCommand()
    resendCommand.enterprise_user_id = 3195455668607
    const resp = await auth.executeCommand(resendCommand)
    console.log(resp)
}

async function getVendorEnterprise() {
    let privateKey = '-----BEGIN PRIVATE KEY-----\n' +
        'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCrvFUEzWbHjy2H\n' +
        'e92xUFyVAstX0QV7lfkwpClvww8eeebwBOelYFOdwaBwCKR7ZN6vfcv2POEY1phw\n' +
        '4qgd6BUaSUZ1aDLXeCKyilpZVlU7PRgIwXxnJAjyHpPO5kL3mD6YRfotRhBfpnnP\n' +
        's17xKGQwKd1IupSwqZ4gdPAa618+a/gTEHwRQuHLXP3hwtJArbAm+pJmLEB2ijgJ\n' +
        'cEtFt9o6dyZrkKN/rBkFTz0KJnRoYOCnQjDzWeCvKf9GBFUC9bM8w5PeCu8O8uqr\n' +
        'UgPvH0OfGCWs3w6y6kSDtgenOlVSCFsyBZem0ZInI1TXP4NIffWvDRBVRDndHjKh\n' +
        'cyp+yg3zAgMBAAECggEAfyAVi02FFJovKMiPTg9fyUpdPe9TcK2O3evXZIzu5y9z\n' +
        'vR7UXv4UR4YqfmRXZaRAl4W2ctuUAS/xfja6HhFLdb7iMkzkvc2HWcTCprkatJQ/\n' +
        '81NPBIaPPLNX1ONslR2U0GGUlOj1e+ie6RotYLT2nRSQYqMDKFcW343Qowyy32AT\n' +
        'qmY4vm5BCipG6FsIQzhO8vsbyGQUKLZNFrxaAKNaWyfMEri0Wr7PXpsHa0Hq+TAc\n' +
        '9pZ2xLft9T3haoGRpc50geb7MdDQPj8p/fvrE7K2fDgx9ioavq7FpgfF3GCvlUjB\n' +
        'm0wOhcibP/9ZkRR2X6M14WD9CwrMfiybmEbA3iy/4QKBgQDj+wNgfiyKCiBiqSmP\n' +
        'JR1QSgwU7+wsJUajdeoOeKfJWlObJVLvTbqFfRipg7YvPtSl5UAZvFsUE2N2cvGv\n' +
        'xYQyLEfIWr6I2RJvwVpKOuDccIxv+3XN4xPoeUUsqDW9MN1ni8Yu1TrVWBThM6Cj\n' +
        'i1XFy9apzHEBt248ieE6J5+Q8QKBgQDA162vIqbP8KthH7vsTldFl8hGmFBMOkko\n' +
        'vewWypNQXBPSpcE3HQ6CVm8KE0XeZ2oDWKg7rsnjnXL8jmTCUbjbc339Wsg2Mf8F\n' +
        'k0CUFjoeAcRw7Wd/FgtT4jkcSBhoy6yiDqCUdFxKPkvfTV0YNk6caO+fwIuKNYB1\n' +
        'pDmXc20NIwKBgAqnta2x1/UPqhnSXC3jhy40d8IWwIwDpfyHy0un2fewMA4lPW4P\n' +
        'zPLmONvbWw10O04Rm+BYDE2w5kon7yHO8nHB3g0AKL2On6z3dXfYrp++5uFo+EWK\n' +
        'ImkQGeqPZguUmBR51OZlct17w2YPGqfqIDUhZMQE2RdCcnWD4DHunieRAoGAX7as\n' +
        '7hA022CIr1wg2djIWDJNpTxUHoGPbjlVxLonA+uvqw26KLCzUt2znzyRoSGS7LZE\n' +
        'SdsnOWIcgF3shMYrCkD4d5dnZ/7IpOvBUb72eY5HAgXTKLC4Tpop3m+qLdlphcXc\n' +
        'zdIzPGZPIjYzzqClw9wRkyjuGVsUt08bhqAzsCECgYBbjK4ymswfr+YBtXRKxnWZ\n' +
        'JEA9SrPG7Xmwt4eRQz3GqZh+NZa4RX7Xv83abGLQW1q00+dBDu1BPq/8zYklaCHg\n' +
        'sjaIG5ANwzZTjY5WJ0NI4IM47EW9OPgTW9TRlSAJuDXuiQ3MwKQB1KuenAmKMlTg\n' +
        '9KfnJ+WnTxlRq5+1zvELZw==\n' +
        '-----END PRIVATE KEY-----\n'

    let vendorContext = new VendorContext({
        vendorId: 'sa',
        privateKey: privateKey,
        host: 'local.keepersecurity.com'
    })

    try {
        // let ent = await vendorContext.getEnterprise(1818);
        let ent = await vendorContext.postLicenseAdjustment(1818, {
            seats: 0,
            products: [
                {
                    product_id: 'business',
                    seats: -15
                }
            ]
        })
        console.log(JSON.stringify(ent))
    } catch (e) {
        console.log('Error ' + e)
    }
}

async function testAttachmentsE2E() {
    try {
        let auth = await login()
        let vault = new Vault(auth)

        const fileName = 'corona.jpg'
        const thumbName = 'corona_tn.jpg'
        const file = fs.readFileSync(fileName)
        const thumb = fs.readFileSync(thumbName)

        const recordUid = await vault.uploadFile(fileName, file, thumb)
        console.log(recordUid)

        await vault.syncDown()
        const rec = vault.recordByUid(recordUid)
        console.log(rec)

        const file1 = await vault.downloadFile(recordUid, false);
        fs.writeFileSync('picture.jpg', file1)

        const file2 = await vault.downloadFile(recordUid, true);
        fs.writeFileSync('picture_tn.jpg', file2)
    } catch (e) {
        console.log(e)
    }
}

async function testAddRecordNew() {
    try {
        let auth = await login()
        let vault = new Vault(auth)
        await vault.syncDown(0, true)
        await vault.addRecordNew({
            title: 'new record',
            secret1: 'abcd',
        })
        await vault.syncDown(0, true)
    } catch (e) {
        console.log(e)
    }
}

const uploadFiles = async (vault: Vault) => {
    const fileName1 = 'corona.jpg'
    const thumbName1 = 'corona_tn.jpg'
    const fileName2 = 'kitten.jpg'
    const file1 = fs.readFileSync(fileName1)
    const thumb1 = fs.readFileSync(thumbName1)
    const file2 = fs.readFileSync(fileName2)

    console.log("Adding file records...")
    const fileRecordUid1 = await vault.uploadFile(fileName1, file1, thumb1)
    const fileRecordUid2 = await vault.uploadFile(fileName2, file2)
    return {fileRecordUid1, fileRecordUid2};
};

const downloadSharedFiles = async (fileRecordUid1: string, fileRecordUid2: string) => {
    let auth = await login("saldoukhov@gmail.com")
    let vault = new Vault(auth)
    await vault.syncDown(0, true)

    for (let record of vault.records) {
        console.log(record.data)
        console.log(record.recordData.udata)
        console.log(record.nonSharedData)
    }

    const file1_p = await vault.downloadFile(fileRecordUid1, false);
    fs.writeFileSync('picture1.jpg', file1_p)

    const file1_tn = await vault.downloadFile(fileRecordUid1, true);
    fs.writeFileSync('picture1_tn.jpg', file1_tn)

    const file2_p = await vault.downloadFile(fileRecordUid2, false);
    fs.writeFileSync('picture2.jpg', file2_p)
};

async function testRecordShareViaRecord() {
    // upload two files, one with thumbnail
    // create a record linking the files
    // share the record directly
    // download the files via sharee's account
    try {
        let auth = await login()
        let vault = new Vault(auth)
        const {fileRecordUid1, fileRecordUid2} = await uploadFiles(vault);

        console.log("Adding record linked to file...")
        const recordAddResponse = await vault.addRecordNew({
            title: 'new record 2',
            secret1: 'abcd',
            files: [fileRecordUid1, fileRecordUid2]
        }, null, [fileRecordUid1, fileRecordUid2])
        const recordUid = webSafe64FromBytes(recordAddResponse.records[0].recordUid)

        console.log("Sharing record with links...")
        await vault.shareRecords([
            recordUid
        ], 'saldoukhov@gmail.com')

        await downloadSharedFiles(fileRecordUid1, fileRecordUid2)
    } catch (e) {
        console.log(e)
    }
}

async function testRecordShareViaFolder() {
    // upload two files, one with thumbnail
    // create a record linking the files
    // share the record via shared folder
    // download the files via sharee's account
    try {
        let auth = await login()
        let vault = new Vault(auth)
        const {fileRecordUid1, fileRecordUid2} = await uploadFiles(vault);

        console.log('Creating shared folder...')
        const folderUid = await vault.createSharedFolder('sftest')

        console.log('Adding user to shared folder...')
        await vault.addUserToSharedFolder(folderUid,  'saldoukhov@gmail.com')

        // await vault.syncDown(0, true)
        console.log('Adding record to shared folder...')
        await vault.addRecordNew({
            title: 'new record 3',
            secret1: 'abcd',
        }, folderUid, [fileRecordUid1, fileRecordUid2])

        await downloadSharedFiles(fileRecordUid1, fileRecordUid2)
    } catch (e) {
        console.log(e)
    }
}

const addTwoRecords = async (vault: Vault) => {
    const recordsAddResponse = await vault.addRecordsNew([
            {
                title: 'linked record 1',
                secret1: 'sec1'
            },
            {
                title: 'linked record 2',
                secret1: 'sec2'
            },
        ]
    )
    const rec1Uid = webSafe64FromBytes(recordsAddResponse.records[0].recordUid)
    const rec2Uid = webSafe64FromBytes(recordsAddResponse.records[1].recordUid)
    return { rec1Uid, rec2Uid }
};

const printVaultContent = (vault: Vault) => {
    for (let record of vault.records) {
        console.log(record.data)
        console.log(record.recordData.udata)
        console.log(record.nonSharedData)
    }
};

const openShareeVaultAndSync = async () => {
    let auth = await login("saldoukhov@gmail.com")
    let vault = new Vault(auth)
    await vault.syncDown(0, true)
    printVaultContent(vault);
    return vault
};

async function testSharedLinkedRecordUpdate() {
    // log into the vault1 and vault2
    // vault1 create two records
    // vault1 create a third record linking the first two
    // vault1 share the record with vault2
    // sync vault2, should receive 3 records
    // vault1 update the first of the linked records
    // sync vault2, should receive only the linked record
    try {
        let auth = await login()
        let vault = new Vault(auth)
        const {rec1Uid, rec2Uid} = await addTwoRecords(vault);

        console.log("Adding record linked to records...")
        const recordAddResponse = await vault.addRecordNew({
            title: 'record with links',
            secret1: 'abcd',
            addresses: [rec1Uid, rec2Uid]
        }, null, [rec1Uid, rec2Uid])
        const recordUid = webSafe64FromBytes(recordAddResponse.records[0].recordUid)

        console.log("Sharing record with links...")
        await vault.shareRecords([
            recordUid
        ], 'saldoukhov@gmail.com')

        const vault2 = await openShareeVaultAndSync();

        await vault.syncDown()
        let rec1 = vault.recordByUid(rec1Uid)
        rec1.data.title = rec1.data.title + " upd"
        rec1.data.secret1 = rec1.data.secret1 + " upd"
        await vault.updateRecord(rec1Uid)

        await vault2.syncDown(0, true)
        printVaultContent(vault2)
    } catch (e) {
        console.log(e)
    }
}

async function testSharedLinkedRecordUpdateExisting() {
    // log into the vault1 and vault2
    // vault1 create two records
    // vault1 create a third record linking the first two
    // vault1 share the record with vault2
    // sync vault2, should receive 3 records
    // vault1 update the first of the linked records
    // sync vault2, should receive only the linked record
    try {
        let auth = await login()
        let vault = new Vault(auth)
        await vault.syncDown()

        const vault2 = await openShareeVaultAndSync();

        console.log("Updating record")
        let rec1 = vault.records[0]
        rec1.data.title = rec1.data.title + " upd"
        rec1.data.secret1 = rec1.data.secret1 + " upd"
        await vault.updateRecord(rec1.recordData.record_uid)

        await vault2.syncDown(0, true)
        printVaultContent(vault2)
    } catch (e) {
        console.log(e)
    }
}

async function login(user?: string, managedCompanyId?: number): Promise<Auth> {

    const { userName, password, host } = getCredentialsAndHost()

    let deviceToken: Uint8Array;
    try {
        deviceToken = new Uint8Array(fs.readFileSync("device-token.dat"))
    } catch (e) {
    }

    function saveDeviceToken(deviceToken: Uint8Array) {
        fs.writeFileSync("device-token.dat", deviceToken)
    }

    let auth = new Auth({
        host: host,
        deviceToken: deviceToken,
        onDeviceToken: saveDeviceToken,
        authUI: authUI,
        clientVersion: 'zt14.0.2'
    })

    const wrappedPassword = wrapPassword(password)

    if (managedCompanyId)
        await auth.managedCompanyLogin(user || userName, wrappedPassword, managedCompanyId)
    else
        await auth.login(user || userName, wrappedPassword)
    console.log(`login to ${userName} successful`)
    return auth;
}

async function testKeys() {
    // const ecdh = createECDH('prime256v1')
    // ecdh.generateKeys()
    // const priv = ecdh.getPrivateKey()
    // const keys = priv.keys()
    // const entries = priv.entries()
    //
    //
    let dataKey = generateEncryptionKey()  // 256 bits
    let pair = generateKeyPairSync('ec', {
        namedCurve: 'P-256'
    })
    let publicKey = pair.publicKey.export({
        format: 'der',
        type: 'spki'
    })
    console.log(publicKey.length)           // 91 byte
    let privateKey = pair.privateKey.export({
        format: 'der',
        type: 'sec1'
    })
    let encryptedPrivateKey = await platform.aesGcmEncrypt(privateKey, dataKey) // AES-256-GCM
    console.log(encryptedPrivateKey.length) // 149 bytes
}
// testKeys().finally()

async function testEncryptionParams() {
    const dataKey = generateEncryptionKey();
    console.log(dataKey)
    const encParams = await createEncryptionParams(wrapPassword('111111'), dataKey, 1000)
    const dataKey1 = await decryptEncryptionParams(wrapPassword('111111'), encParams);
    console.log(dataKey1)
}

async function testRegistration() {
    const auth = new Auth({
        host: 'local.keepersecurity.com',
        // host: KeeperEnvironment.DEV
    })

    const password = wrapPassword('111111')
    const iterations = 1000
    const dataKey = generateEncryptionKey()

    const authVerifier = await createAuthVerifier(password, iterations)
    const encryptionParams = await createEncryptionParams(password, dataKey, iterations)

    const registerCommand = new RegisterCommand()
    registerCommand.email = 'admin+j9a@yozik.us'
    registerCommand.encryption_params = webSafe64FromBytes(encryptionParams)
    registerCommand.auth_verifier = webSafe64FromBytes(authVerifier)
    registerCommand.public_key = webSafe64FromBytes(generateEncryptionKey())
    registerCommand.encrypted_private_key = webSafe64FromBytes(generateEncryptionKey())
    const resp = await auth.executeCommand(registerCommand)
    console.log(resp)
}

// printCompany().finally();
// testRegistration().finally();
printVault().finally();
// testResendInvite().finally();
// provideECKey().finally()
// testCommand().finally();
// testRestAccountSummary().finally();
// testRecordShareViaRecord().finally();
// testRecordShareViaFolder().finally();
// testSharedLinkedRecordUpdate().finally();
// testAddRecordNew().finally();
// cleanVault().finally();
// cleanVault('saldoukhov@gmail.com').finally();
// testRecordUpdate().finally();
// testAttachmentsE2E().finally();
// testAttachmentsDownload().finally();
// testAttachmentsUpload().finally();
// printMSPVault().finally();
// getVendorEnterprise().finally();
// printRecordTypes().finally()
// testRecordUpdateForLegacy().finally();


import {Auth} from '../src/auth'
import {Vault} from '../src/vault'
import {connectPlatform, platform} from '../src/platform'
import {nodePlatform} from '../src/node/platform'
import * as fs from 'fs'
import {webSafe64FromBytes} from '../src/utils'
import {Records} from '../src/proto'
import RecordModifyResult = Records.RecordModifyResult;
import {
    authUI3,
    prompt,
    getCredentialsAndHost,
    getDeviceConfig,
    saveDeviceConfig,
    TestSessionStorage,
    timeout, enablePersistentLogin, TestKeyValueStorage
} from './testUtil';
import {ClientConfiguration} from '../src/configuration';
import {
    recordTypesGetMessage,
    registerEncryptedDataKeyForDeviceMessage,
    setUserSettingMessage
} from '../src/restMessages';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

const clientVersion = 'w15.0.0'

async function login(withDeviceName?: string): Promise<Auth> {
    const {userName, password, host} = getCredentialsAndHost()

    const deviceName = withDeviceName || 'test device'

    const deviceConfig = getDeviceConfig(deviceName, host)

    const options: ClientConfiguration = {
        host: host,
        clientVersion: clientVersion,
        deviceConfig: deviceConfig,
        sessionStorage: new TestSessionStorage(deviceName, host),
        kvs: new TestKeyValueStorage(host),
        useSessionResumption: true,
        onDeviceConfig: saveDeviceConfig,
        authUI3: authUI3
    }
    const auth = new Auth(options)

    try {
        await auth.loginV3({
            username: userName,
            password
        })
    }
    catch (e) {
        console.log(e)
        return
    }
    console.log(auth.dataKey)
    return auth;
}

async function printVault() {
    let auth = await login('device1')
    // let auth = await login()
    try {
        let vault = new Vault(auth)
        // vault.noTypedRecords = true;
        await vault.syncDown(0, true)
        for (let record of vault.records) {
            console.log(record.data)
            console.log(record.recordData.udata)
            console.log(record.nonSharedData)
        }
    } finally {
        auth.disconnect()
    }
}

async function printRecordTypes() {
    const auth = await login()
    try {
        const recTypesResp = await auth.executeRest(recordTypesGetMessage({standard: true, enterprise: true}))
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
    } finally {
        auth.disconnect()
    }
}

async function testAddRecordNew() {
    const auth = await login()
    try {
        const vault = new Vault(auth)
        await vault.syncDown()
        await vault.addRecordNew({
            title: 'new record',
            secret1: 'abcd',
        })
        await vault.syncDown()
    } finally {
        auth.disconnect()
    }
}

async function testRecordUpdate() {
    const auth = await login()
    try {
        const vault = new Vault(auth)
        await vault.syncDown()
        let rec = vault.records[1]
        console.log(rec)
        rec.data.secret1 = rec.data.secret1 + '+'
        // rec.non_shared_data = null
        // delete rec.non_shared_data
        rec.nonSharedData = {
            a: 1,
            b: 2
        }
        let resp = await vault.updateRecord(rec.recordData.record_uid)
        if (resp.records[0].status !== RecordModifyResult.RS_SUCCESS) {
            console.log(resp.records[1])
            return
        }
        await vault.syncDown()
        rec = vault.records[1]
        console.log(rec)
    } finally {
        auth.disconnect()
    }
}

async function testRecordUpdateForLegacy() {
    let auth = await login()
    try {
        let legacyVault = new Vault(auth)
        legacyVault.noTypedRecords = true
        let vault = new Vault(auth)
        await vault.syncDown()
        console.log(vault.records[0])
        await prompt('Press any key...')

        // console.log('deleting records...')
        // await vault.deleteRecords(vault.records.map(x => x.metaData.record_uid))
        //
        // console.log('adding record...')
        // await vault.addRecord({
        //     title: 'new record',
        //     secret1: 'abcd'
        // })

        // await vault.syncDown()
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

        await legacyVault.syncDown()
        if (legacyVault.records.length > 0) {
            rec = vault.records[0]
            console.log(rec)
        }
        else
        {
            console.log('legacy vault is empty')
        }
    } finally {
        auth.disconnect()
    }
}

async function cleanVault(withDeviceName?: string) {
    let auth = await login(withDeviceName)
    try {
        let cleanTrash = false
        let vault = new Vault(auth)
        await vault.syncDown()
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
    } finally {
        auth.disconnect()
    }
}

// async function testAttachmentsDownload() {
//
//     try {
//         let auth = new Auth({
//             // host: 'local.keepersecurity.com'
//             host: KeeperEnvironment.DEV
//         }, authUI)
//         await auth.login('saldoukhov@gmail.com', '111111')
//         console.log('login successful')
//         let vault = new Vault(auth)
//         await vault.syncDown()
//         let rec = vault.records[0]
//         let file = rec.extra.files[0]
//         console.log(file)
//
//         const downloadCommand = new RequestDownloadCommand()
//         downloadCommand.record_uid = rec.recordData.record_uid
//         downloadCommand.file_ids = [rec.extra.files[0].id]
//         const resp = await auth.executeCommand(downloadCommand)
//
//         const fileResponse = await platform.get(resp.downloads[0].url, {})
//         const decryptedFile = platform.aesCbcDecrypt(fileResponse.data, normal64Bytes(file.key), false)
//         fs.writeFileSync(file.name, decryptedFile)
//         console.log(decryptedFile)
//     } catch (e) {
//         console.log(e)
//     }
// }

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
        const rec = vault.records.find(x => x.metaData.record_uid === recordUid)
        console.log(rec)

        await timeout(10000)

        const file1 = await vault.downloadFile(rec.metaData.record_uid, false);
        fs.writeFileSync('picture.jpg', file1)

        const file2 = await vault.downloadFile(rec.metaData.record_uid, true);
        fs.writeFileSync('picture_tn.jpg', file2)
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
    let auth = await login('device1')
    let vault = new Vault(auth)
    await vault.syncDown()

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
        ], 'admin+rt1@yozik.us')

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
        await vault.addUserToSharedFolder(folderUid,  'admin+rt1@yozik.us')

        // await vault.syncDown(true)
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
    let auth = await login()
    let vault = new Vault(auth)
    await vault.syncDown()
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

        await vault2.syncDown()
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

        await vault2.syncDown()
        printVaultContent(vault2)
    } catch (e) {
        console.log(e)
    }
}

// cleanVault('device1').finally();

// printVault().finally();
// printRecordTypes().finally()
// testAddRecordNew().finally();
// testRecordUpdate().finally();
// testAttachmentsE2E().finally();
// testRecordShareViaRecord().finally();
testRecordShareViaFolder().finally();

// testRecordUpdateForLegacy().finally();
// testSharedLinkedRecordUpdate().finally();
// testAttachmentsDownload().finally();
// testAttachmentsUpload().finally();


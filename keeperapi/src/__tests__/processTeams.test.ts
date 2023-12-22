/**
 * @jest-environment jsdom
 */

// @ts-ignore
import crypto from 'crypto'
import {nodePlatform} from "../node/platform";
import {browserPlatform} from "../browser/platform"
import {publicKey, privateKey} from "./ecies-test-vectors";
import {TextEncoder, TextDecoder} from 'util';
import type {Platform} from "../platform";
import {KeyWrapper, connectPlatform, platform} from "../platform";
import { Auth } from '../auth';
import { KeeperEnvironment } from '../endpoint';
import { Records, Vault } from '../proto';

describe('Testing processTeams for ECC conversion', () => {
    const username = 'username'
    const password = 'password'
    let auth: Auth
    let platform: Platform

    // needed to create auth initially
    connectPlatform(browserPlatform)

    beforeEach(() => {
        // auth = createAuth()
    })

    it('processTeams', async () => {
        const kp = await platform.generateECKeyPair()
        // @ts-expect-error private prop on class
        const user = await auth.createUserRequest(kp.privateKey)

        const {rsaPublicKey, rsaEncryptedPrivateKey, eccPublicKey, eccEncryptedPrivateKey, encryptedDeviceToken, encryptedClientKey, clientVersion} = user

        expect(rsaPublicKey).toBeDefined()
        expect(rsaPublicKey && rsaPublicKey.length === 270).toBeTruthy()

        expect(rsaEncryptedPrivateKey).toBeDefined()
        expect(rsaEncryptedPrivateKey && rsaEncryptedPrivateKey.length === 1216).toBeTruthy()

        expect(eccPublicKey).toBeDefined()
        expect(eccPublicKey && eccPublicKey.length === 65).toBeTruthy()

        expect(eccEncryptedPrivateKey).toBeDefined()
        expect(eccEncryptedPrivateKey && eccEncryptedPrivateKey.length === 60).toBeTruthy()

        expect(encryptedDeviceToken).not.toBeDefined()        

        expect(encryptedClientKey).toBeDefined()
        expect(encryptedClientKey && encryptedClientKey.length === 64).toBeTruthy()

        expect(clientVersion).toBeDefined()
        expect(clientVersion && clientVersion.length === 3).toBeTruthy()
    })
})

async function createTeam(keyType: Records.RecordKeyType):Promise<Vault.ITeam>{
    switch(keyType){
        case Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY:
            // teamPrivateKeys[teamUid + '_priv'] = {
            //     data: team.teamPrivateKey,
            //     dataId: teamUid + '_priv',
            //     keyId: teamUid,
            //     encryptionType: 'cbc',
            //     unwrappedType: 'rsa',
            // }            
            return createTeamRSA()
        case Records.RecordKeyType.ENCRYPTED_BY_PUBLIC_KEY:
            // teamSharedFolderKeys[folderUid] = {
            //     data: folderKey.sharedFolderKey,
            //     dataId: folderUid,
            //     keyId: teamUid + '_priv',
            //     encryptionType: 'rsa',
            //     unwrappedType: 'aes',
            // }
            return createTeamRSA()
        case Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY_GCM:
            return createTeamRSA()
        case Records.RecordKeyType.ENCRYPTED_BY_PUBLIC_KEY_ECC:
            // teamPrivateKeys[teamUid + '_priv'] = {
            //     data: team.teamPrivateKey,
            //     dataId: teamUid + '_priv',
            //     keyId: 'pk_ecc',
            //     encryptionType: 'ecc',
            //     unwrappedType: 'aes',
            // }
            return createTeamECC()
        case Records.RecordKeyType.ENCRYPTED_BY_ROOT_KEY_CBC:
            return createTeamRSA()
        case Records.RecordKeyType.ENCRYPTED_BY_ROOT_KEY_GCM:
            return createTeamRSA()
        default:
            return createTeamRSA()
    }

    //     /** Team teamUid */
    //     teamUid?: (Uint8Array|null);
    //     /** Team name */
    //     name?: (string|null);
    //     /** Team teamKey */
    //     teamKey?: (Uint8Array|null);
    //     /** Team teamKeyType */
    // enum RecordKeyType {
    //     NO_KEY = 0,
    //     ENCRYPTED_BY_DATA_KEY = 1,
    //     ENCRYPTED_BY_PUBLIC_KEY = 2,
    //     ENCRYPTED_BY_DATA_KEY_GCM = 3,
    //     ENCRYPTED_BY_PUBLIC_KEY_ECC = 4,
    //     ENCRYPTED_BY_ROOT_KEY_CBC = 5,
    //     ENCRYPTED_BY_ROOT_KEY_GCM = 6
    // }
    //     teamKeyType?: (Records.RecordKeyType|null);
    //     /** Team teamPrivateKey */
    //     teamPrivateKey?: (Uint8Array|null);
    //     /** Team restrictEdit */
    //     restrictEdit?: (boolean|null);
    //     /** Team restrictShare */
    //     restrictShare?: (boolean|null);
    //     /** Team restrictView */
    //     restrictView?: (boolean|null);
    //     /** Team removedSharedFolders */
    //     removedSharedFolders?: (Uint8Array[]|null);
    //     /** Team sharedFolderKeys */
    // interface ISharedFolderKey {

    //     /** SharedFolderKey sharedFolderUid */
    //     sharedFolderUid?: (Uint8Array|null);

    //     /** SharedFolderKey sharedFolderKey */
    //     sharedFolderKey?: (Uint8Array|null);

    //     /** SharedFolderKey keyType */
    //     keyType?: (Records.RecordKeyType|null);
    // }
    //     sharedFolderKeys?: (Vault.ISharedFolderKey[]|null); 
    return {
        teamUid: new Uint8Array([250, 231, 238, 68, 236, 23, 115, 181, 48, 61, 99, 17, 148, 41, 87, 39]), //(Uint8Array|null);
        name: 'testname', //(string|null);
        teamKey: new Uint8Array(), //(Uint8Array|null);
        teamKeyType: Records.RecordKeyType.ENCRYPTED_BY_PUBLIC_KEY_ECC, //(Records.RecordKeyType|null); generate ecc key by id
        teamPrivateKey: new Uint8Array(), //(Uint8Array|null); generate rsa private key 
        restrictEdit: false, //(boolean|null);
        restrictShare: false, //(boolean|null);
        restrictView: false, //(boolean|null);
        removedSharedFolders: [new Uint8Array()], //(Uint8Array[]|null);
        sharedFolderKeys: [{
            sharedFolderUid: new Uint8Array(), //(Uint8Array|null);
            sharedFolderKey: new Uint8Array(), //(Uint8Array|null);
            keyType: Records.RecordKeyType.ENCRYPTED_BY_PUBLIC_KEY_ECC, //(Records.RecordKeyType|null);
        }]//(Vault.ISharedFolderKey[]|null);
    }
}

async function createTeamRSA(){
    const rsaPrivateKey = await platform.generateRSAKeyPair()
    const uid = platform.getRandomBytes(16)
    return {
        teamUid: uid,
        name: 'testname' + uid,
        teamKey: new Uint8Array([37, 8, 39, 101, 231, 83, 232, 101, 248, 53, 209, 18, 23, 159, 239, 133, 22, 154, 40, 237, 145, 233, 50, 41, 119, 79, 136, 237, 49, 138, 232, 62, 207, 7, 106, 202, 211, 125, 167, 196, 86, 194, 201, 109, 125, 45, 149, 179, 230, 253, 67, 27, 229, 84, 171, 61, 221, 120, 254, 95, 203, 75, 99, 229]), //(Uint8Array|null);
        teamKeyType: Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY,
        teamPrivateKey: rsaPrivateKey.privateKey,
        restrictEdit: false, 
        restrictShare: false, 
        restrictView: false,
        removedSharedFolders: [], 
        sharedFolderKeys: [],
    }
}

async function createTeamECC(){
    const eccPrivateKey = await platform.generateECKeyPair()
    const uid = platform.getRandomBytes(16)
    return {
        teamUid: uid,
        name: 'testname' + uid,
        teamKey: new Uint8Array([37, 8, 39, 101, 231, 83, 232, 101, 248, 53, 209, 18, 23, 159, 239, 133, 22, 154, 40, 237, 145, 233, 50, 41, 119, 79, 136, 237, 49, 138, 232, 62, 207, 7, 106, 202, 211, 125, 167, 196, 86, 194, 201, 109, 125, 45, 149, 179, 230, 253, 67, 27, 229, 84, 171, 61, 221, 120, 254, 95, 203, 75, 99, 229]), //(Uint8Array|null);
        teamKeyType: Records.RecordKeyType.ENCRYPTED_BY_PUBLIC_KEY_ECC,
        teamPrivateKey: eccPrivateKey.privateKey,
        restrictEdit: false, 
        restrictShare: false, 
        restrictView: false,
        removedSharedFolders: [], 
        sharedFolderKeys: [],
    }
}
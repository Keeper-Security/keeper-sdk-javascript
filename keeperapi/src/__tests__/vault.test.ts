import {syncDown, VaultStorage} from "../vault"
import {Auth} from '../auth'
import {nodePlatform} from "../node/platform"
import {connectPlatform, platform} from "../platform";
import {SyncDownResponseBuilder} from './SyncDownResponseBuilder'
import {Records, Vault} from "../proto";
import {webSafe64FromBytes} from "../utils";

describe('Sync Down', () => {
  let dataKey: Uint8Array
  let auth: Auth;
  let eccKeyPair: {privateKey: Uint8Array, publicKey: Uint8Array};
  let rsaKeyPair: {privateKey: Uint8Array, publicKey: Uint8Array};
  let storage: VaultStorage;
  let mockSyncDownCommand: jest.MockedFunction<() => Promise<Vault.ISyncDownResponse>>;
  let syncDownResponseBuilder: SyncDownResponseBuilder;
  let syncDownUser: {
    username: string,
    accountUid: Uint8Array,
  }
  let anotherUserA: {
    username: string,
    accountUid: Uint8Array,
  }
  beforeAll(async () => {
    connectPlatform(nodePlatform)
    dataKey = platform.getRandomBytes(32)
    eccKeyPair = await platform.generateECKeyPair()
    rsaKeyPair = await platform.generateRSAKeyPair()
    syncDownUser = {
      username: 'keeper@keepersecurity.com',
      accountUid: platform.getRandomBytes(16)
    }
    anotherUserA = {
      username: 'another@keepersecurity.com',
      accountUid: platform.getRandomBytes(16)
    }
  })
  beforeEach(() => {
    storage = {
      get: jest.fn(),
      addDependencies: jest.fn(),
      delete: jest.fn(),
      getDependencies: jest.fn(),
      removeDependencies: jest.fn(),
      put: jest.fn(),
      saveObject: jest.fn(),
      saveKeyBytes: jest.fn(),
    } as unknown as VaultStorage;
    mockSyncDownCommand = jest.fn()
    auth = {
      dataKey,
      eccPrivateKey: eccKeyPair.privateKey,
      eccPublicKey: eccKeyPair.publicKey,
      privateKey: rsaKeyPair.privateKey,
      executeRest: mockSyncDownCommand,
    } as unknown as Auth;
    syncDownResponseBuilder = new SyncDownResponseBuilder(platform, auth);
  })
  describe('Owned Records', () => {
    it('saves the record data when a new record is created by the user', async () => {
      const decryptedRecordData = {
        title: 'test record'
      }
      const { recordUid, recordKey } = await syncDownResponseBuilder.addRecord(decryptedRecordData)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const userFolderRecord: Vault.IUserFolderRecord = {
        recordUid,
        revision: Date.now()
      }
      syncDownResponseBuilder.addUserFolderRecord(userFolderRecord)
      const recordMetadata: Vault.IRecordMetaData = {
        recordUid,
        recordKey,
        owner: true,
        canEdit: true,
        canShare: true,
        recordKeyType: Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY_GCM,
        ownerUsername: syncDownUser.username,
        ownerAccountUid: syncDownUser.accountUid,
      }
      syncDownResponseBuilder.addRecordMetadata(recordMetadata)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'metadata',
          uid: recordUidStr,
          owner: recordMetadata.owner,
          ownerUsername: recordMetadata.ownerUsername,
        })
      )
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'record',
          uid: recordUidStr,
          data: decryptedRecordData,
        })
      )
      expect(storage.addDependencies).toHaveBeenCalledWith({
        "": new Set([{
          kind: "record",
          "parentUid": "",
          uid: recordUidStr,
        }])
      })
    })
    it('saves breach watch data and security score data if a record contains a password', async () => {
      const decryptedRecordData = {
        title: 'test record',
        fields: [
          {
            type: 'password',
            value: ['this is a password']
          }
        ],
      }
      const { recordUid, recordKey, record, decryptedSecurityScoreDataData } = await syncDownResponseBuilder.addRecord(decryptedRecordData)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const userFolderRecord: Vault.IUserFolderRecord = {
        recordUid,
        revision: Date.now()
      }
      syncDownResponseBuilder.addUserFolderRecord(userFolderRecord)
      const recordMetadata: Vault.IRecordMetaData = {
        recordUid,
        recordKey,
        owner: true,
        canEdit: true,
        canShare: true,
        recordKeyType: Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY_GCM,
        ownerUsername: syncDownUser.username,
        ownerAccountUid: syncDownUser.accountUid,
      }
      syncDownResponseBuilder.addRecordMetadata(recordMetadata)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'metadata',
          uid: recordUidStr,
          owner: recordMetadata.owner,
          ownerUsername: recordMetadata.ownerUsername,
        })
      )
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'record',
          uid: recordUidStr,
          data: decryptedRecordData,
        })
      )
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'bw_security_data',
          revision: record.revision,
          uid: recordUidStr,
        })
      )
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'security_score_data',
          revision: record.revision,
          uid: recordUidStr,
          data: decryptedSecurityScoreDataData,
        })
      )
      expect(storage.addDependencies).toHaveBeenCalledWith({
        "": new Set([{
          kind: "record",
          "parentUid": "",
          uid: recordUidStr,
        }])
      })
    })
    it('saves the new record data when an existing record is updated by the user', async () => {
      const decryptedRecordData = {
        title: 'test record updated',
      }
      const {recordKey, recordUid} = await syncDownResponseBuilder.addRecord(decryptedRecordData)
      const recordUidStr = webSafe64FromBytes(recordUid)
      await platform.unwrapKey(recordKey, recordUidStr, 'data', 'gcm', 'aes')
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'record',
          uid: recordUidStr,
          data: decryptedRecordData,
        })
      )
    })
    it('deletes the record data when an existing record is removed', async () => {
      const recordUid = platform.getRandomBytes(16)
      syncDownResponseBuilder
        .addRemovedRecord(recordUid)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.delete).toHaveBeenCalledWith('record', webSafe64FromBytes(recordUid))
    })
  })
  describe('Directly-Shared Records', () => {
    it('saves the record data when a record is direct-shared by other user', async () => {
      const decryptedRecordData = {
        title: 'test record',
      }
      const { recordUid, recordKey } = await syncDownResponseBuilder.addRecord(decryptedRecordData)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const recordMetadata: Vault.IRecordMetaData = {
        recordUid,
        recordKey,
        owner: false,
        canEdit: true,
        canShare: true,
        recordKeyType: Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY_GCM,
        ownerUsername: anotherUserA.username,
        ownerAccountUid: anotherUserA.accountUid,
      }
      const userFolderRecord: Vault.IUserFolderRecord = {
        recordUid,
        revision: Date.now(),
      }
      syncDownResponseBuilder.addUserFolderRecord(userFolderRecord)
      syncDownResponseBuilder.addRecordMetadata(recordMetadata)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'metadata',
          uid: recordUidStr,
          owner: recordMetadata.owner,
          ownerUsername: recordMetadata.ownerUsername,
        })
      )
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'record',
          uid: recordUidStr,
          data: decryptedRecordData,
        })
      )
      expect(storage.addDependencies).toHaveBeenCalledWith({
        "": new Set([{
          kind: "record",
          "parentUid": "",
          uid: recordUidStr,
        }])
      })
    })
    it('saves the record data when the direct-shared record is updated by another user or the user', async () => {
      const decryptedRecordData = {
        title: 'test record updated',
      }
      const {recordUid, recordKey} = await syncDownResponseBuilder.addRecord(decryptedRecordData)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const recordMetadata: Vault.IRecordMetaData = {// recordMetadata is returned only the share permission is updated
        recordUid,
        recordKey,
        owner: false,
        canEdit: true,
        canShare: true,
        recordKeyType: Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY_GCM,
        ownerUsername: anotherUserA.username,
        ownerAccountUid: anotherUserA.accountUid,
      }
      syncDownResponseBuilder.addRecordMetadata(recordMetadata)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'metadata',
          uid: recordUidStr,
          owner: recordMetadata.owner,
          ownerUsername: recordMetadata.ownerUsername,
        })
      )
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'record',
          uid: recordUidStr,
          data: decryptedRecordData,
        })
      )
    })
    it('deletes the record data when the direct-shared record is unshared by another user or deleted by the user', async () => {
      const recordUid = platform.getRandomBytes(16)
      syncDownResponseBuilder
        .addRemovedRecord(recordUid)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.delete).toHaveBeenCalledWith('record', webSafe64FromBytes(recordUid))
    })
    it('does nothing when the direct-shared record is deleted by another user', () => {})
  })
  describe('User Folders', () => {
    it.each([
      "saves the new folder data when the user creates a folder at the root",
      "saves the corresponding folder data when the user updates an existing folder",
    ])(`%s`, async () => {
      const decryptedUserFolderKey = platform.getRandomBytes(32)
      const userFolderKey= await platform.aesCbcEncrypt(decryptedUserFolderKey, auth.dataKey!, true)
      const folderUid = platform.getRandomBytes(16)
      const folderData = { title: 'a new user folder' }
      const userFolder: Vault.IUserFolder = {
        folderUid,
        revision: Date.now(),
        keyType: Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY,
        userFolderKey,
        data: await platform.aesCbcEncrypt(platform.stringToBytes(JSON.stringify(folderData)), decryptedUserFolderKey, true),
        parentUid: new Uint8Array([]),
      }
      syncDownResponseBuilder
        .addUserFolder(userFolder)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith({
        data: folderData,
        kind: 'user_folder',
        revision: userFolder.revision,
        uid: webSafe64FromBytes(folderUid)
      })
    })
    it('deletes the corresponding folder data when a user deletes an existing folder - empty folder', async () => {
      const folderUid = platform.getRandomBytes(16)
      const folderUidStr = webSafe64FromBytes(folderUid)
      syncDownResponseBuilder.addRemovedUserFolder(folderUid)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.delete).toHaveBeenCalledWith("user_folder", folderUidStr)
      expect(storage.removeDependencies).toHaveBeenCalledWith({
        [folderUidStr]: "*",
      })
    })
    it('deletes the corresponding folder data when a user deletes an existing folder - folder with child records and child folders', async () => {
      /*
      folder A/      <-- contains a record C
      └── folder B/  <-- contains a record D
       */
      const folderAUid = platform.getRandomBytes(16)
      const recordCUid = platform.getRandomBytes(16)
      const folderBUid = platform.getRandomBytes(16)
      const recordDUid = platform.getRandomBytes(16)
      syncDownResponseBuilder.addRemovedUserFolder(folderAUid)
      syncDownResponseBuilder.addRemovedUserFolder(folderBUid)
      syncDownResponseBuilder.addRemovedRecord(recordCUid)
      syncDownResponseBuilder.addRemovedRecord(recordDUid)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.delete).toHaveBeenCalledWith("user_folder", webSafe64FromBytes(folderAUid))
      expect(storage.delete).toHaveBeenCalledWith("user_folder", webSafe64FromBytes(folderBUid))
      expect(storage.delete).toHaveBeenCalledWith("record", webSafe64FromBytes(recordCUid))
      expect(storage.delete).toHaveBeenCalledWith("record", webSafe64FromBytes(recordDUid))
    })
    it.each([
      "saves the new folder data when a new child folder is added to an existing folder",
      "saves the folder data when an existing folder is added as a child to another folder",
      "saves the folder data when an existing child folder's data is updated",
      "saves the folder data when an existing child folder is removed from one parent, and moved to folder to another",
      "saves the folder data when a nested child folder is moved from its current parent to another parent",
    ])('%s', async () => {
      const decryptedUserFolderKey = platform.getRandomBytes(32)
      const userFolderKey= await platform.aesCbcEncrypt(decryptedUserFolderKey, auth.dataKey!, true)
      const parentFolderUid = platform.getRandomBytes(16)
      const folderUid = platform.getRandomBytes(16)
      const folderUidStr = webSafe64FromBytes(folderUid)
      const parentFolderUidStr = webSafe64FromBytes(parentFolderUid)
      const folderData = { title: 'a child folder' }
      const userFolder: Vault.IUserFolder = {
        folderUid,
        revision: Date.now(),
        keyType: Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY,
        userFolderKey,
        data: await platform.aesCbcEncrypt(platform.stringToBytes(JSON.stringify(folderData)), decryptedUserFolderKey, true),
        parentUid: parentFolderUid,
      }
      syncDownResponseBuilder
        .addUserFolder(userFolder)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith({
        data: folderData,
        kind: 'user_folder',
        revision: userFolder.revision,
        uid: webSafe64FromBytes(folderUid)
      })
      expect(storage.addDependencies).toHaveBeenCalledWith({
        [parentFolderUidStr]: new Set([{
          kind: "user_folder",
          parentUid: parentFolderUidStr,
          uid: folderUidStr,
        }])
      })
    })
    it('saves a new child record created by the user', async () => {
      const folderUid = platform.getRandomBytes(16)
      const decryptedRecordData = {
        title: 'a child record record',
      }
      const {recordUid, recordKey} = await syncDownResponseBuilder.addRecord(decryptedRecordData)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const folderUidStr = webSafe64FromBytes(folderUid)
      const recordMetadata: Vault.IRecordMetaData = {
        recordUid,
        recordKey,
        owner: true,
        canEdit: true,
        canShare: true,
        recordKeyType: Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY_GCM,
        ownerUsername: syncDownUser.username,
        ownerAccountUid: syncDownUser.accountUid,
      }
      const userFolderRecord: Vault.IUserFolderRecord = {
        recordUid,
        folderUid,
        revision: Date.now(),
      }
      syncDownResponseBuilder.addUserFolderRecord(userFolderRecord)
      syncDownResponseBuilder.addRecordMetadata(recordMetadata)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'metadata',
          uid: recordUidStr,
          owner: recordMetadata.owner,
          ownerUsername: recordMetadata.ownerUsername,
        })
      )
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'record',
          uid: recordUidStr,
          data: decryptedRecordData,
        })
      )
      expect(storage.addDependencies).toHaveBeenCalledWith({
        [folderUidStr]: new Set([{
          kind: "record",
          "parentUid": folderUidStr,
          uid: recordUidStr,
        }])
      })
    })
    it('saves the child record when it is moved from a folder A to another B', async () => {
      const folderAUid = platform.getRandomBytes(16)
      const folderBUid = platform.getRandomBytes(16)
      const recordUid = platform.getRandomBytes(16)
      const folderAUidStr = webSafe64FromBytes(folderAUid)
      const folderBUidStr = webSafe64FromBytes(folderBUid)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const userFolderRecord: Vault.IUserFolderRecord = {
        recordUid,
        folderUid: folderBUid,
        revision: Date.now(),
      }
      syncDownResponseBuilder.addUserFolderRecord(userFolderRecord)
      syncDownResponseBuilder.addRemovedUserFolderRecord(recordUid, folderAUid)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.addDependencies).toHaveBeenCalledWith({
        [folderBUidStr]: new Set([{
          kind: "record",
          "parentUid": folderBUidStr,
          uid: recordUidStr,
        }])
      })
      expect(storage.removeDependencies).toHaveBeenCalledWith({
        [folderAUidStr]: new Set([recordUidStr])
      })
    })
    it('saves the child record data when its updated by the user', async () => {
      const decryptedRecordData = {
        title: 'child record updated',
      }
      const {recordKey, recordUid} = await syncDownResponseBuilder.addRecord(decryptedRecordData)
      const recordUidStr = webSafe64FromBytes(recordUid)
      await platform.unwrapKey(recordKey, recordUidStr, 'data', 'gcm', 'aes')
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'record',
          uid: recordUidStr,
          data: decryptedRecordData,
        })
      )
    })
    it('deletes the child record data when its deleted by the user', async () => {
      const recordUid = platform.getRandomBytes(16)
      syncDownResponseBuilder.addRemovedRecord(recordUid)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.delete).toHaveBeenCalledWith("record", webSafe64FromBytes(recordUid))
    })
  })
  describe('Shared Folders', () => {
    it('saves the shared folder data when a new shared folder is created by the user', async () => {
      const sharedFolderData = {
        name: "a new shared folder",
      }
      const {sharedFolderUid, sharedFolder} = await syncDownResponseBuilder.addSharedFolder(sharedFolderData, syncDownUser, {
        defaultCanEdit: false,
        defaultCanReshare: false,
        defaultManageUsers: false,
        defaultManageRecords: false,
      })
      const sharedFolderUser: Vault.ISharedFolderUser = {
        // if the data is the current sync user, the username and accountUid are empty
        username: '',
        accountUid: new Uint8Array([]),
        sharedFolderUid,
        manageRecords: true,
        manageUsers: true,
      }
      syncDownResponseBuilder.addSharedFolderUser(sharedFolderUser)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith({
        kind: 'shared_folder',
        uid: webSafe64FromBytes(sharedFolderUid),
        data: sharedFolderData,
        name: sharedFolderData.name,
        revision: sharedFolder.revision,
        ownerUsername: sharedFolder.owner,
        ownerAccountUid: webSafe64FromBytes(sharedFolder.ownerAccountUid!),
        defaultCanEdit: sharedFolder.defaultCanEdit,
        defaultCanShare: sharedFolder.defaultCanReshare,
        defaultManageRecords: sharedFolder.defaultManageRecords,
        defaultManageUsers: sharedFolder.defaultManageUsers,
      })
      expect(storage.put).toHaveBeenCalledWith({
        kind: 'shared_folder_user',
        sharedFolderUid: webSafe64FromBytes(sharedFolderUid),
        accountUid: webSafe64FromBytes(sharedFolderUser.accountUid!),
        accountUsername: sharedFolderUser.username,
        manageRecords: sharedFolderUser.manageRecords,
        manageUsers: sharedFolderUser.manageUsers,
      })
      expect(storage.addDependencies).toHaveBeenCalledWith({})
    })
    it('saves the shared folder data when the user is added to the folder', async () => {
      const sharedFolderData = {
        name: "a shared folder",
      }
      const {sharedFolderUid, sharedFolder} = await syncDownResponseBuilder.addSharedFolder(sharedFolderData, anotherUserA, {
        defaultCanEdit: false,
        defaultCanReshare: false,
        defaultManageUsers: false,
        defaultManageRecords: false,
      })
      const sharedFolderUserA: Vault.ISharedFolderUser = {
        // if the data is the current sync user, the username and accountUid are empty
        username: '',
        accountUid: new Uint8Array([]),
        sharedFolderUid,
        manageRecords: false,
        manageUsers: false,
      }
      const sharedFolderUserB: Vault.ISharedFolderUser = {
        username: 'other user who owns the shared folder',
        accountUid: anotherUserA.accountUid,
        sharedFolderUid,
        manageRecords: true,
        manageUsers: true,
      }
      syncDownResponseBuilder.addSharedFolderUser(sharedFolderUserA)
      syncDownResponseBuilder.addSharedFolderUser(sharedFolderUserB)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith({
        kind: 'shared_folder',
        uid: webSafe64FromBytes(sharedFolderUid),
        data: sharedFolderData,
        name: sharedFolderData.name,
        revision: sharedFolder.revision,
        ownerUsername: sharedFolder.owner,
        ownerAccountUid: webSafe64FromBytes(sharedFolder.ownerAccountUid!),
        defaultCanEdit: sharedFolder.defaultCanEdit,
        defaultCanShare: sharedFolder.defaultCanReshare,
        defaultManageRecords: sharedFolder.defaultManageRecords,
        defaultManageUsers: sharedFolder.defaultManageUsers,
      })
      expect(storage.put).toHaveBeenCalledWith({
        kind: 'shared_folder_user',
        sharedFolderUid: webSafe64FromBytes(sharedFolderUid),
        accountUid: webSafe64FromBytes(sharedFolderUserA.accountUid!),
        accountUsername: sharedFolderUserA.username,
        manageRecords: sharedFolderUserA.manageRecords,
        manageUsers: sharedFolderUserA.manageUsers,
      })
      expect(storage.put).toHaveBeenCalledWith({
        kind: 'shared_folder_user',
        sharedFolderUid: webSafe64FromBytes(sharedFolderUid),
        accountUid: webSafe64FromBytes(sharedFolderUserB.accountUid!),
        accountUsername: sharedFolderUserB.username,
        manageRecords: sharedFolderUserB.manageRecords,
        manageUsers: sharedFolderUserB.manageUsers,
      })
      expect(storage.addDependencies).toHaveBeenCalledWith({})
    })
    it("saves the shared folder data when the user's team is added to the folder", async () => {
      const sharedFolderData = {
        name: "a shared folder through team access",
      }
      const teamUid = platform.getRandomBytes(16)
      const teamUidStr = webSafe64FromBytes(teamUid)
      const decryptedTeamKey = platform.getRandomBytes(32)
      const encryptedTeamKey = platform.publicEncrypt(decryptedTeamKey, platform.bytesToBase64(auth.privateKey!))
      const decryptedTeamPrivateKeyPair = await platform.generateRSAKeyPair()
      const encryptedTeamPrivateKey= await platform.aesCbcEncrypt(decryptedTeamPrivateKeyPair.privateKey, decryptedTeamKey, true)
      const {sharedFolderUid, sharedFolder, sharedFolderKey} = await syncDownResponseBuilder.addSharedFolder(sharedFolderData, anotherUserA, {
        defaultCanEdit: false,
        defaultCanReshare: false,
        defaultManageUsers: false,
        defaultManageRecords: false,
      }, {encryptionKey: decryptedTeamPrivateKeyPair.privateKey})
      const sharedFolderUidStr = webSafe64FromBytes(sharedFolderUid)
      const team: Vault.ITeam = {
        teamUid,
        name: 'team name',
        removedSharedFolders: [],
        sharedFolderKeys: [
          {
            keyType: Records.RecordKeyType.ENCRYPTED_BY_PUBLIC_KEY,
            sharedFolderUid,
            sharedFolderKey,
          },
        ],
        teamKey: encryptedTeamKey,
        teamPrivateKey: encryptedTeamPrivateKey,
        teamKeyType: Records.RecordKeyType.ENCRYPTED_BY_PUBLIC_KEY,
        restrictEdit: false,
        restrictShare: false,
        restrictView: false,
      }
      const sharedFolderUser: Vault.ISharedFolderUser = {
        username: 'other user who owns the shared folder',
        accountUid: anotherUserA.accountUid,
        sharedFolderUid,
        manageRecords: true,
        manageUsers: true,
      }
      const sharedFolderTeam: Vault.ISharedFolderTeam = {
        name: sharedFolderData.name,
        manageUsers: false,
        manageRecords: false,
        teamUid,
        sharedFolderUid,
      }
      syncDownResponseBuilder.addTeam(team)
      syncDownResponseBuilder.addSharedFolderUser(sharedFolderUser)
      syncDownResponseBuilder.addSharedFolderTeam(sharedFolderTeam)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith({
        kind: 'team',
        name: team.name,
        uid: webSafe64FromBytes(teamUid),
        restrictEdit: team.restrictEdit,
        restrictShare: team.restrictShare,
        restrictView: team.restrictView,
      })
      expect(storage.put).toHaveBeenCalledWith({
        kind: 'shared_folder',
        uid: webSafe64FromBytes(sharedFolderUid),
        data: sharedFolderData,
        name: sharedFolderData.name,
        revision: sharedFolder.revision,
        ownerUsername: sharedFolder.owner,
        ownerAccountUid: webSafe64FromBytes(sharedFolder.ownerAccountUid!),
        defaultCanEdit: sharedFolder.defaultCanEdit,
        defaultCanShare: sharedFolder.defaultCanReshare,
        defaultManageRecords: sharedFolder.defaultManageRecords,
        defaultManageUsers: sharedFolder.defaultManageUsers,
      })
      expect(storage.put).toHaveBeenCalledWith({
        kind: 'shared_folder_user',
        sharedFolderUid: webSafe64FromBytes(sharedFolderUid),
        accountUid: webSafe64FromBytes(sharedFolderUser.accountUid!),
        accountUsername: sharedFolderUser.username,
        manageRecords: sharedFolderUser.manageRecords,
        manageUsers: sharedFolderUser.manageUsers,
      })
      expect(storage.put).toHaveBeenCalledWith({
        kind: 'shared_folder_team',
        teamUid: teamUidStr,
        name: sharedFolderData.name,
        sharedFolderUid: sharedFolderUidStr,
        manageRecords: sharedFolderTeam.manageRecords,
        manageUsers: sharedFolderTeam.manageUsers,
      })
      expect(storage.addDependencies).toHaveBeenCalledWith({
        [teamUidStr]: new Set([{
          kind: 'shared_folder',
          parentUid: teamUidStr,
          uid: sharedFolderUidStr,
        }])
      })
    })
    it('saves the shared folder data when the folder data is updated', async () => {
      const sharedFolderData = {
        name: 'an existing shared folder data updated',
      }
      const {sharedFolderUid, sharedFolder} = await syncDownResponseBuilder.addSharedFolder(sharedFolderData, anotherUserA, {
        defaultCanEdit: false,
        defaultCanReshare: false,
        defaultManageUsers: false,
        defaultManageRecords: false,
      })
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith({
        kind: 'shared_folder',
        uid: webSafe64FromBytes(sharedFolderUid),
        data: sharedFolderData,
        name: sharedFolderData.name,
        revision: sharedFolder.revision,
        ownerUsername: sharedFolder.owner,
        ownerAccountUid: webSafe64FromBytes(sharedFolder.ownerAccountUid!),
        defaultCanEdit: sharedFolder.defaultCanEdit,
        defaultCanShare: sharedFolder.defaultCanReshare,
        defaultManageRecords: sharedFolder.defaultManageRecords,
        defaultManageUsers: sharedFolder.defaultManageUsers,
      })
      expect(storage.addDependencies).toHaveBeenCalledWith({})
    })
    // TODO(@hleekeeper): a bug found where the shared folder folder data is not cleaned up properly when its parent shared folder is deleted/unshared.
    //  A Jira ticket (BE-7056) has been filed. And the business logic and the test code around this part may change as part of the BE-7056
    it.each([
      "deletes the shared folder data and its child resources when it's deleted",
      "deletes the shared folder data and its child resources when the user's direct access to the folder was removed",
    ])('%s', async () => {
      const sharedFolderUid = platform.getRandomBytes(16)
      const sharedFolderUidStr =  webSafe64FromBytes(sharedFolderUid)
      syncDownResponseBuilder.addRemovedSharedFolder(sharedFolderUid)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.delete).toHaveBeenCalledWith('shared_folder', sharedFolderUidStr)
      expect(storage.removeDependencies).toHaveBeenCalledWith({
        [sharedFolderUidStr]: "*"
      })
    })
    it("deletes the shared folder data and its child resources when the user's team access to the folder was removed", async () => {
      const sharedFolderUid = platform.getRandomBytes(16)
      const sharedFolderUidStr =  webSafe64FromBytes(sharedFolderUid)
      const teamUid =  platform.getRandomBytes(16)
      const teamUidStr = webSafe64FromBytes(teamUid)
      const removedSharedFolderTeam: Vault.ISharedFolderTeam = {
        sharedFolderUid,
        teamUid,
      }
      syncDownResponseBuilder.addRemovedSharedFolderTeam(removedSharedFolderTeam)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.removeDependencies).toHaveBeenCalledWith({
        [sharedFolderUidStr]: new Set([teamUidStr])
      })
    })
    it('saves the record data when a new record is created in a shared folder', async () => {
      const decryptedRecordData = {
        title: 'an existing record moved to a shared folder'
      }
      const sharedFolderData = {
        name: 'a shared folder',
      }
      const {
        sharedFolderUid,
        sharedFolder,
        decryptedSharedFolderKey,
      } = await syncDownResponseBuilder.addSharedFolder(sharedFolderData, syncDownUser, {
        defaultCanEdit: false,
        defaultCanReshare: false,
        defaultManageUsers: false,
        defaultManageRecords: false,
      })
      const sharedFolderUidStr =  webSafe64FromBytes(sharedFolderUid)
      const {recordKey, recordUid} = await syncDownResponseBuilder.addRecord(decryptedRecordData, decryptedSharedFolderKey)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const sharedFolderRecord: Vault.ISharedFolderRecord = {
        owner: true,
        recordKey,
        recordUid,
        sharedFolderUid,
        ownerAccountUid: new Uint8Array([]),
      }
      const sharedFolderFolderRecord: Vault.ISharedFolderFolderRecord = {
        folderUid: new Uint8Array([]),
        sharedFolderUid,
        recordUid,
      }
      syncDownResponseBuilder.addSharedFolderRecord(sharedFolderRecord)
      syncDownResponseBuilder.addSharedFolderFolderRecord(sharedFolderFolderRecord)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: 'shared_folder',
        revision: sharedFolder.revision,
        uid: sharedFolderUidStr,
      }))
      expect(storage.put).toHaveBeenCalledWith({
        kind: "shared_folder_record",
        canEdit: true,
        canShare: true,
        owner: sharedFolderRecord.owner,
        ownerUid: "",
        recordUid: recordUidStr,
        sharedFolderUid: sharedFolderUidStr,
      })
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: "record",
          uid: recordUidStr,
          data: decryptedRecordData,
        })
      )
      expect(storage.addDependencies).toHaveBeenCalledWith({
        [sharedFolderUidStr]: new Set([{
          kind: "record",
          parentUid: sharedFolderUidStr,
          uid: recordUidStr,
        }])
      })
    })
    it('saves the record data when an existing record is added to a shared folder', async () => {
      const decryptedRecordData = {
        title: 'an existing record moved to a shared folder'
      }
      const sharedFolderData = {
        name: 'a shared folder',
      }
      const {
        sharedFolderUid,
        sharedFolder,
        decryptedSharedFolderKey,
      } = await syncDownResponseBuilder.addSharedFolder(sharedFolderData, syncDownUser, {})
      const sharedFolderUidStr =  webSafe64FromBytes(sharedFolderUid)
      const {recordKey, recordUid} = await syncDownResponseBuilder.addRecord(decryptedRecordData, decryptedSharedFolderKey)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const sharedFolderRecord: Vault.ISharedFolderRecord = {
        owner: true,
        recordKey,
        recordUid,
        sharedFolderUid,
        ownerAccountUid: new Uint8Array([]),
      }
      const sharedFolderFolderRecord: Vault.ISharedFolderFolderRecord = {
        folderUid: new Uint8Array([]),
        sharedFolderUid,
        recordUid,
      }

      syncDownResponseBuilder.addRemovedRecord(recordUid)
      syncDownResponseBuilder.addSharedFolderRecord(sharedFolderRecord)
      syncDownResponseBuilder.addSharedFolderFolderRecord(sharedFolderFolderRecord)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: 'shared_folder',
        revision: sharedFolder.revision,
        uid: sharedFolderUidStr,
      }))
      expect(storage.put).toHaveBeenCalledWith({
        kind: "shared_folder_record",
        canEdit: true,
        canShare: true,
        owner: sharedFolderRecord.owner,
        ownerUid: "",
        recordUid: recordUidStr,
        sharedFolderUid: sharedFolderUidStr,
      })
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: "record",
          uid: recordUidStr,
          data: decryptedRecordData,
        })
      )
      expect(storage.addDependencies).toHaveBeenCalledWith({
        [sharedFolderUidStr]: new Set([{
          kind: "record",
          parentUid: sharedFolderUidStr,
          uid: recordUidStr,
        }])
      })
      expect(storage.delete).toHaveBeenCalledWith('record', recordUidStr)
    })
    it('deletes the record data when a child record is deleted from a shared folder', async () => {
      const recordUid = platform.getRandomBytes(16)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const sharedFolderData = {
        name: 'a new shared folder',
      }
      const {sharedFolderUid, sharedFolder} = await syncDownResponseBuilder.addSharedFolder(sharedFolderData, syncDownUser, {})
      const sharedFolderUidStr =  webSafe64FromBytes(sharedFolderUid)
      const removedSharedFolderFolderRecord: Vault.ISharedFolderFolderRecord = {
        recordUid,
        sharedFolderUid,
        folderUid: new Uint8Array([])
      }
      const removedSharedFolderRecord: Vault.ISharedFolderRecord = {
        recordUid,
        sharedFolderUid,
      }
      syncDownResponseBuilder.addRemovedSharedFolderFolderRecord(removedSharedFolderFolderRecord)
      syncDownResponseBuilder.addRemovedSharedFolderRecord(removedSharedFolderRecord)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.removeDependencies).toHaveBeenCalledWith({
        [sharedFolderUidStr]: new Set([recordUidStr])
      })
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          uid: sharedFolderUidStr,
          kind: "shared_folder",
          revision: sharedFolder.revision,
        })
      )
    })
    it('updates the record data when it is moved out of a shared folder (moved to the root vault)', async () => {
      const decryptedRecordData = {
        title: "a record removed from a shared folder to a root vault"
      }
      const {recordUid, recordKey, record} = await syncDownResponseBuilder.addRecord(decryptedRecordData)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const recordMetadata: Vault.IRecordMetaData = {
        recordUid,
        recordKey,
        recordKeyType: Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY_GCM,
      }
      const sharedFolderData = {
        name: 'a new shared folder',
      }
      const {sharedFolderUid, sharedFolder} = await syncDownResponseBuilder.addSharedFolder(sharedFolderData, syncDownUser, {})
      const sharedFolderUidStr =  webSafe64FromBytes(sharedFolderUid)
      const removedSharedFolderFolderRecord: Vault.ISharedFolderFolderRecord = {
        recordUid,
        sharedFolderUid,
        folderUid: new Uint8Array([])
      }
      const removedSharedFolderRecord: Vault.ISharedFolderRecord = {
        recordUid,
        sharedFolderUid,
      }
      const userFolderRecord: Vault.IUserFolderRecord = {
        recordUid,
        folderUid: new Uint8Array([]),
        revision: Date.now(),
      }
      syncDownResponseBuilder.addUserFolderRecord(userFolderRecord)
      syncDownResponseBuilder.addRecordMetadata(recordMetadata)
      syncDownResponseBuilder.addRemovedSharedFolderFolderRecord(removedSharedFolderFolderRecord)
      syncDownResponseBuilder.addRemovedSharedFolderRecord(removedSharedFolderRecord)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: "record",
        uid: recordUidStr,
        revision: record.revision,
      }))
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: "metadata",
        uid: recordUidStr,
      }))
      expect(storage.addDependencies).toHaveBeenCalledWith({
        "": new Set([{
          kind: "record",
          parentUid: "",
          uid: recordUidStr,
        }]),
      })
      expect(storage.removeDependencies).toHaveBeenCalledWith({
        [sharedFolderUidStr]: new Set([recordUidStr])
      })
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          uid: sharedFolderUidStr,
          kind: "shared_folder",
          revision: sharedFolder.revision,
        })
      )
    })
    it('updates the record data when it is moved out of a shared folder (moved to another shared folder)', async () => {
      /*
      [before update]
      shared folder A/  <-- contains a record
      shared folder B/
      [after update]
      shared folder A/
      shared-folder folder B/  <-- the record moved from A to B
      */
      const decryptedRecordData = {
        title: "a record removed from a shared folder to a root vault"
      }
      const sharedFolderDataA = {
        name: 'shared folder A',
      }
      const sharedFolderDataB = {
        name: 'shared folder B',
      }
      const {sharedFolderUid: sharedFolderUidA, sharedFolder: sharedFolderA} = await syncDownResponseBuilder.addSharedFolder(sharedFolderDataA, syncDownUser, {})
      const {sharedFolderUid: sharedFolderUidB, sharedFolder: sharedFolderB, decryptedSharedFolderKey: decryptedSharedFolderKeyB} = await syncDownResponseBuilder.addSharedFolder(sharedFolderDataB, syncDownUser, {})
      const sharedFolderUidAStr =  webSafe64FromBytes(sharedFolderUidA)
      const sharedFolderUidBStr =  webSafe64FromBytes(sharedFolderUidB)
      const {recordUid, recordKey, record} = await syncDownResponseBuilder.addRecord(decryptedRecordData, decryptedSharedFolderKeyB)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const removedSharedFolderFolderRecord: Vault.ISharedFolderFolderRecord = {
        recordUid,
        sharedFolderUid: sharedFolderUidA,
        folderUid: new Uint8Array([])
      }
      const removedSharedFolderRecord: Vault.ISharedFolderRecord = {
        recordUid,
        sharedFolderUid: sharedFolderUidA,
      }
      const sharedFolderFolderRecord: Vault.ISharedFolderFolderRecord = {
        recordUid,
        sharedFolderUid: sharedFolderUidB,
        revision: Date.now(),
        folderUid: new Uint8Array([])
      }
      const sharedFolderRecord: Vault.ISharedFolderRecord = {
        recordUid,
        recordKey,
        sharedFolderUid: sharedFolderUidB,
        owner: true,
        ownerAccountUid: new Uint8Array([]),
      }
      syncDownResponseBuilder.addRemovedSharedFolderFolderRecord(removedSharedFolderFolderRecord)
      syncDownResponseBuilder.addRemovedSharedFolderRecord(removedSharedFolderRecord)
      syncDownResponseBuilder.addSharedFolderRecord(sharedFolderRecord)
      syncDownResponseBuilder.addSharedFolderFolderRecord(sharedFolderFolderRecord)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: "record",
        uid: recordUidStr,
        revision: record.revision,
      }))
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: 'shared_folder_record',
        recordUid: recordUidStr,
        sharedFolderUid: sharedFolderUidBStr,
      }))
      expect(storage.removeDependencies).toHaveBeenCalledWith({
        [sharedFolderUidAStr]: new Set([recordUidStr])
      })
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          uid: sharedFolderUidAStr,
          kind: "shared_folder",
          revision: sharedFolderA.revision,
        })
      )
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          uid: sharedFolderUidBStr,
          kind: "shared_folder",
          revision: sharedFolderB.revision,
        })
      )
    })
  })
  describe('Shared-Folder Folders', () => {
    it.each([
      "saves the folder data when a new shared-folder folder is created in a shared folder",
      "saves the folder data when an existing shared folder folder is edited in the same shared folder",
    ])('%s', async () => {
      const sharedFolderUid = platform.getRandomBytes(16)
      const sharedFolderUidStr = webSafe64FromBytes(sharedFolderUid)
      const decryptedSharedFolderKey = platform.getRandomBytes(32)
      const sharedFolderKey = await platform.aesGcmEncrypt(decryptedSharedFolderKey, auth.dataKey!)
      const decryptedFolderData = { name: "an existing user folder" }
      const {sharedFolderFolderUid, sharedFolderFolder} = await syncDownResponseBuilder.addSharedFolderFolder(decryptedFolderData, sharedFolderUid, decryptedSharedFolderKey)
      const sharedFolderFolderUidStr = webSafe64FromBytes(sharedFolderFolderUid)
      syncDownResponseBuilder.addRemovedUserFolder(sharedFolderFolderUid)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await platform.unwrapKey(sharedFolderKey, sharedFolderUidStr, 'data', 'gcm', 'aes')
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith({
        kind: 'shared_folder_folder',
        data: decryptedFolderData,
        revision: sharedFolderFolder.revision,
        sharedFolderUid: sharedFolderUidStr,
        uid: sharedFolderFolderUidStr,
      })
    })
    it('saves the folder data when an existing user folder is moved to a shared folder (the user folder gets converted to a shared-folder folder)', async () => {
      const sharedFolderUid = platform.getRandomBytes(16)
      const sharedFolderUidStr = webSafe64FromBytes(sharedFolderUid)
      const decryptedSharedFolderKey = platform.getRandomBytes(32)
      const sharedFolderKey = await platform.aesGcmEncrypt(decryptedSharedFolderKey, auth.dataKey!)
      const folderName = 'an existing user folder'
      const decryptedFolderData = { name: folderName }
      const {sharedFolderFolderUid, sharedFolderFolder} = await syncDownResponseBuilder.addSharedFolderFolder(decryptedFolderData, sharedFolderUid, decryptedSharedFolderKey, sharedFolderUid)
      syncDownResponseBuilder.addRemovedUserFolder(sharedFolderFolderUid)
      const sharedFolderFolderUidStr = webSafe64FromBytes(sharedFolderFolderUid)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await platform.unwrapKey(sharedFolderKey, sharedFolderUidStr, 'data', 'gcm', 'aes')
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith({
        kind: 'shared_folder_folder',
        data: decryptedFolderData,
        revision: sharedFolderFolder.revision,
        sharedFolderUid: sharedFolderUidStr,
        uid: sharedFolderFolderUidStr,
      })
      expect(storage.delete).toHaveBeenCalledWith('user_folder', sharedFolderFolderUidStr)
      expect(storage.addDependencies).toHaveBeenCalledWith({
        [sharedFolderUidStr]: new Set([{
          kind: "shared_folder_folder",
          parentUid: sharedFolderUidStr,
          uid: sharedFolderFolderUidStr,
        }])
      })
    })
    it('deletes the folder data when a shared-folder folder is deleted from a shared folder - empty folder', async () => {
      const folderUid = platform.getRandomBytes(16)
      const folderUidStr = webSafe64FromBytes(folderUid)
      const sharedFolderUid = platform.getRandomBytes(16)
      const sharedFolderUidStr = webSafe64FromBytes(sharedFolderUid)
      const sharedFolderFolder: Vault.ISharedFolderFolder = {
        folderUid,
        sharedFolderUid,
        parentUid: new Uint8Array([])
      }
      syncDownResponseBuilder.addRemovedSharedFolderFolder(sharedFolderFolder)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.delete).toHaveBeenCalledWith("user_folder", folderUidStr)
      expect(storage.removeDependencies).toHaveBeenCalledWith({
        [folderUidStr]: "*",
        [sharedFolderUidStr]: new Set([folderUidStr])
      })
    })
    it('deletes the folder data when a shared-folder folder is deleted from a shared folder - folder with child records and child shared-folder folders', async () => {
      /*
      shared-folder folder A/      <-- contains a record C
      └── shared-folder folder B/  <-- contains a record D
       */
      const sharedFolderData = { name: "a parent shared folder" }
      const sharedFolderFolderUidA = platform.getRandomBytes(16)
      const sharedFolderFolderUidAStr = webSafe64FromBytes(sharedFolderFolderUidA)
      const sharedFolderFolderUidB = platform.getRandomBytes(16)
      const sharedFolderFolderUidBStr = webSafe64FromBytes(sharedFolderFolderUidB)
      const recordUidC = platform.getRandomBytes(16)
      const recordUidCStr = webSafe64FromBytes(recordUidC)
      const recordUidD = platform.getRandomBytes(16)
      const recordUidDStr = webSafe64FromBytes(recordUidD)
      const {sharedFolderUid, sharedFolder} = await syncDownResponseBuilder.addSharedFolder(sharedFolderData, syncDownUser, {})
      const sharedFolderUidStr = webSafe64FromBytes(sharedFolderUid)
      const removedSharedFolderFolderA: Vault.ISharedFolderFolder = {
        folderUid: sharedFolderFolderUidA,
        sharedFolderUid,
        parentUid: new Uint8Array([]),
      }
      const removedSharedFolderFolderB: Vault.ISharedFolderFolder = {
        folderUid: sharedFolderFolderUidB,
        parentUid: sharedFolderFolderUidA,
        sharedFolderUid,
      }
      const removedSharedFolderRecordC: Vault.ISharedFolderRecord = {
        recordUid: recordUidC,
        sharedFolderUid,
      }
      const removedSharedFolderRecordD: Vault.ISharedFolderRecord = {
        recordUid: recordUidD,
        sharedFolderUid,
      }
      syncDownResponseBuilder.addRemovedSharedFolderFolder(removedSharedFolderFolderA)
      syncDownResponseBuilder.addRemovedSharedFolderFolder(removedSharedFolderFolderB)
      syncDownResponseBuilder.addRemovedSharedFolderRecord(removedSharedFolderRecordC)
      syncDownResponseBuilder.addRemovedSharedFolderRecord(removedSharedFolderRecordD)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.removeDependencies).toHaveBeenCalledWith({
        [sharedFolderUidStr]: new Set([
          sharedFolderFolderUidAStr,
          sharedFolderFolderUidBStr,
          recordUidCStr,
          recordUidDStr,
        ]),
        [sharedFolderFolderUidAStr]: "*",
        [sharedFolderFolderUidBStr]: "*",
      })
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: "shared_folder",
        uid: sharedFolderUidStr,
        revision: sharedFolder.revision,
      }))
    })
    it('does not allow to take the shared-folder folder out from the shared folder', () => {})
    it('updates the folder data when a shared-folder folder is moved into another shared-folder folder: both are still under the same shared folder', async () => {
      /*
      [before update]
      shared-folder folder A/
      shared-folder folder B/  <-- contains a record C
      [after update]
      shared-folder folder A/
      └── shared-folder folder B/  <-- contains a record C
       */
      const decryptedSharedFolderKey = platform.getRandomBytes(32)
      const sharedFolderKey = await platform.aesGcmEncrypt(decryptedSharedFolderKey, auth.dataKey!)
      const decryptedFolderData = { name: "an existing user folder" }
      const recordUidC = platform.getRandomBytes(16)
      const recordUidCStr = webSafe64FromBytes(recordUidC)
      const sharedFolderUid = platform.getRandomBytes(16)
      const sharedFolderUidStr = webSafe64FromBytes(sharedFolderUid)
      const sharedFolderFolderAUid = platform.getRandomBytes(16)
      const sharedFolderFolderAUidStr = webSafe64FromBytes(sharedFolderFolderAUid)
      const {sharedFolderFolderUid: sharedFolderFolderBUid, sharedFolderFolder } = await syncDownResponseBuilder.addSharedFolderFolder(decryptedFolderData, sharedFolderUid, decryptedSharedFolderKey, sharedFolderFolderAUid)
      const sharedFolderFolderBUidStr = webSafe64FromBytes(sharedFolderFolderBUid)
      const sharedFolderFolderRecord: Vault.ISharedFolderFolderRecord = {
        recordUid: recordUidC,
        sharedFolderUid,
        folderUid: sharedFolderFolderBUid,
        revision: Date.now(),
      }
      await platform.unwrapKey(sharedFolderKey, sharedFolderUidStr, 'data', 'gcm', 'aes')
      syncDownResponseBuilder.addSharedFolderFolderRecord(sharedFolderFolderRecord)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.addDependencies).toHaveBeenCalledWith({
        [sharedFolderFolderBUidStr]: new Set([{
          kind: "record",
          parentUid: sharedFolderFolderBUidStr,
          uid: recordUidCStr,
        }]),
        [sharedFolderFolderAUidStr]: new Set([{
          kind: "shared_folder_folder",
          parentUid: sharedFolderFolderAUidStr,
          uid: sharedFolderFolderBUidStr,
        }])
      })
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: "shared_folder_folder",
        uid: sharedFolderFolderBUidStr,
        revision: sharedFolderFolder.revision,
        sharedFolderUid: sharedFolderUidStr,
      }))
    })
    it('saves the record data when a new record data is added to a shared-folder folder', async () => {
      const sharedFolderData = {
        name: 'shared folder',
      }
      const sharedFolderFolderData = {
        name: 'shared-folder folder',
      }
      const recordData = {
        title: 'record'
      }
      const {sharedFolderUid, sharedFolder, decryptedSharedFolderKey} = await syncDownResponseBuilder.addSharedFolder(sharedFolderData, syncDownUser, {})
      const sharedFolderUidStr = webSafe64FromBytes(sharedFolderUid)
      const {sharedFolderFolderUid, sharedFolderFolder} = await syncDownResponseBuilder.addSharedFolderFolder(sharedFolderFolderData, sharedFolderUid, decryptedSharedFolderKey)
      const sharedFolderFolderUidStr = webSafe64FromBytes(sharedFolderFolderUid)
      const {recordUid, record, recordKey} = await syncDownResponseBuilder.addRecord(recordData, decryptedSharedFolderKey)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const sharedFolderFolderRecord: Vault.ISharedFolderFolderRecord = {
        sharedFolderUid,
        recordUid,
        folderUid: sharedFolderFolderUid,
        revision: Date.now(),
      }
      const sharedFolderRecord: Vault.ISharedFolderRecord = {
        owner: true,
        sharedFolderUid,
        recordKey,
        recordUid,
        ownerAccountUid: new Uint8Array([]),
      }
      syncDownResponseBuilder.addSharedFolderFolderRecord(sharedFolderFolderRecord)
      syncDownResponseBuilder.addSharedFolderRecord(sharedFolderRecord)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: "shared_folder",
        uid: sharedFolderUidStr,
        revision: sharedFolder.revision,
      }))
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: "shared_folder_folder",
        uid: sharedFolderFolderUidStr,
        revision: sharedFolderFolder.revision,
      }))
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: 'record',
        uid: recordUidStr,
        revision: record.revision,
      }))
      expect(storage.put).toHaveBeenCalledWith({
        kind: 'shared_folder_record',
        recordUid: recordUidStr,
        sharedFolderUid: sharedFolderUidStr,
        canEdit: true,
        canShare: true,
        owner: sharedFolderRecord.owner,
        ownerUid: webSafe64FromBytes(sharedFolderRecord.ownerAccountUid!),
        ownerUsername: sharedFolderRecord.ownerUsername,
      })
      expect(storage.addDependencies).toHaveBeenCalledWith({
        [sharedFolderFolderUidStr]: new Set([{
          kind: "record",
          uid: recordUidStr,
          parentUid: sharedFolderFolderUidStr,
        }])
      })
    })
    it('saves the record data when an existing record is added to a shared-folder folder', async () => {
      const sharedFolderData = {
        name: 'shared folder',
      }
      const recordData = {
        title: 'record'
      }
      const {sharedFolderUid, sharedFolder, decryptedSharedFolderKey} = await syncDownResponseBuilder.addSharedFolder(sharedFolderData, syncDownUser, {})
      const sharedFolderUidStr = webSafe64FromBytes(sharedFolderUid)
      const {recordUid, record, recordKey} = await syncDownResponseBuilder.addRecord(recordData, decryptedSharedFolderKey)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const sharedFolderFolderUid = platform.getRandomBytes(16)
      const sharedFolderFolderUidStr = webSafe64FromBytes(sharedFolderFolderUid)
      const sharedFolderFolderRecord: Vault.ISharedFolderFolderRecord = {
        sharedFolderUid,
        recordUid,
        folderUid: sharedFolderFolderUid,
        revision: Date.now(),
      }
      const sharedFolderRecord: Vault.ISharedFolderRecord = {
        owner: true,
        sharedFolderUid,
        recordKey,
        recordUid,
        ownerAccountUid: new Uint8Array([]),
      }
      syncDownResponseBuilder.addSharedFolderFolderRecord(sharedFolderFolderRecord)
      syncDownResponseBuilder.addSharedFolderRecord(sharedFolderRecord)
      syncDownResponseBuilder.addRemovedRecord(recordUid)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: "shared_folder",
        uid: sharedFolderUidStr,
        revision: sharedFolder.revision,
      }))
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: "record",
        uid: recordUidStr,
        revision: record.revision,
      }))
      expect(storage.put).toHaveBeenCalledWith({
        kind: 'shared_folder_record',
        recordUid: recordUidStr,
        sharedFolderUid: sharedFolderUidStr,
        canEdit: true,
        canShare: true,
        owner: sharedFolderRecord.owner,
        ownerUid: webSafe64FromBytes(sharedFolderRecord.ownerAccountUid!),
        ownerUsername: sharedFolderRecord.ownerUsername,
      })
      expect(storage.addDependencies).toHaveBeenCalledWith({
        [sharedFolderFolderUidStr]: new Set([{
          kind: "record",
          uid: recordUidStr,
          parentUid: sharedFolderFolderUidStr,
        }])
      })
      expect(storage.delete).toHaveBeenCalledWith("record", recordUidStr)
    })
    it('saves the record data when an existing child record of a shared-folder folder is updated', async () => {
      const sharedFolderUid = platform.getRandomBytes(16)
      const sharedFolderUidStr = webSafe64FromBytes(sharedFolderUid)
      const decryptedSharedFolderKey = platform.getRandomBytes(32)
      const recordData = {
        title: 'a child record has been updated'
      }
      const {recordUid, record, recordKey} = await syncDownResponseBuilder.addRecord(recordData, decryptedSharedFolderKey)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const sharedFolderKey = await platform.aesGcmEncrypt(decryptedSharedFolderKey, auth.dataKey!)
      await platform.unwrapKey(sharedFolderKey, sharedFolderUidStr, 'data', 'gcm', 'aes')
      await platform.unwrapKey(recordKey, recordUidStr, sharedFolderUidStr, 'gcm', 'aes')
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: 'record',
        uid: webSafe64FromBytes(recordUid),
        revision: record.revision,
      }))
    })
    it('updates the record data when a child record of a shared-folder folder is deleted', async () => {
      const recordUid = platform.getRandomBytes(16)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const sharedFolderData = {
        name: 'shared folder',
      }
      const {sharedFolderUid, sharedFolder} = await syncDownResponseBuilder.addSharedFolder(sharedFolderData, syncDownUser, {})
      const sharedFolderUidStr = webSafe64FromBytes(sharedFolderUid)
      const sharedFolderFolderUid = platform.getRandomBytes(16)
      const sharedFolderFolderUidStr = webSafe64FromBytes(sharedFolderFolderUid)
      const removedSharedFolderRecord: Vault.ISharedFolderRecord = {
        sharedFolderUid,
        recordUid,
      }
      const removedSharedFolderFolderRecord: Vault.ISharedFolderFolderRecord = {
        folderUid: sharedFolderFolderUid,
        sharedFolderUid,
        recordUid,
      }
      syncDownResponseBuilder.addRemovedSharedFolderRecord(removedSharedFolderRecord)
      syncDownResponseBuilder.addRemovedSharedFolderFolderRecord(removedSharedFolderFolderRecord)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: "shared_folder",
        uid: sharedFolderUidStr,
        revision: sharedFolder.revision,
      }))
      expect(storage.removeDependencies).toHaveBeenCalledWith({
        [sharedFolderUidStr]: new Set([recordUidStr]),
        [sharedFolderFolderUidStr]: new Set([recordUidStr]),
      })
    })
    it('updates the record data when a child record when its moved to another shared-folder folder within the same parent shared folder', async () => {
      /*
      [before update]
      shared folder
      |── shared-folder folder A/  <-- contains a record C
      └── shared-folder folder B/
      [after update]
      shared folder
      |── shared-folder folder A/
      └── shared-folder folder B/  <-- contains a record C
      */
      const recordUid = platform.getRandomBytes(16)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const sharedFolderUid = platform.getRandomBytes(16)
      const sharedFolderFolderUidA = platform.getRandomBytes(16)
      const sharedFolderFolderUidAStr = webSafe64FromBytes(sharedFolderFolderUidA)
      const sharedFolderFolderUidB = platform.getRandomBytes(16)
      const sharedFolderFolderUidBStr = webSafe64FromBytes(sharedFolderFolderUidB)
      const removedSharedFolderFolderRecord: Vault.ISharedFolderFolderRecord = {
        sharedFolderUid,
        folderUid: sharedFolderFolderUidA,
        recordUid,
      }
      const sharedFolderFolderRecord: Vault.ISharedFolderFolderRecord = {
        sharedFolderUid,
        folderUid: sharedFolderFolderUidB,
        recordUid,
        revision: Date.now(),
      }
      syncDownResponseBuilder.addRemovedSharedFolderFolderRecord(removedSharedFolderFolderRecord)
      syncDownResponseBuilder.addSharedFolderFolderRecord(sharedFolderFolderRecord)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.addDependencies).toHaveBeenCalledWith({
        [sharedFolderFolderUidBStr]: new Set([{
          kind: "record",
          parentUid: sharedFolderFolderUidBStr,
          uid: recordUidStr,
        }]),
      })
      expect(storage.removeDependencies).toHaveBeenCalledWith({
        [sharedFolderFolderUidAStr]: new Set([recordUidStr]),
      })
    })
    it('updates the record data when a child record of a shared-folder folder is moved out of their parent shared folder', async () => {
      /*
      [before update]
      root
      └── shared folder
          └── shared-folder folder/  <-- contains a record C
      [after update]
      root  <-- contains a record C
      └── shared folder
          └── shared-folder folder/
      */
      const decryptedRecordData = {
        title: "a record removed from a shared-folder folder to a root vault"
      }
      const {recordUid, recordKey, record} = await syncDownResponseBuilder.addRecord(decryptedRecordData)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const recordMetadata: Vault.IRecordMetaData = {
        recordUid,
        recordKey,
        recordKeyType: Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY_GCM,
      }
      const sharedFolderData = {
        name: 'a shared folder',
      }
      const {sharedFolderUid, sharedFolder} = await syncDownResponseBuilder.addSharedFolder(sharedFolderData, syncDownUser, {})
      const sharedFolderUidStr =  webSafe64FromBytes(sharedFolderUid)
      const sharedFolderFolderUid = platform.getRandomBytes(16)
      const sharedFolderFolderUidStr = webSafe64FromBytes(sharedFolderFolderUid)
      const removedSharedFolderFolderRecord: Vault.ISharedFolderFolderRecord = {
        recordUid,
        sharedFolderUid,
        folderUid: sharedFolderFolderUid,
      }
      const removedSharedFolderRecord: Vault.ISharedFolderRecord = {
        recordUid,
        sharedFolderUid,
      }
      const userFolderRecord: Vault.IUserFolderRecord = {
        recordUid,
        folderUid: new Uint8Array([]),
        revision: Date.now(),
      }
      syncDownResponseBuilder.addUserFolderRecord(userFolderRecord)
      syncDownResponseBuilder.addRecordMetadata(recordMetadata)
      syncDownResponseBuilder.addRemovedSharedFolderFolderRecord(removedSharedFolderFolderRecord)
      syncDownResponseBuilder.addRemovedSharedFolderRecord(removedSharedFolderRecord)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: "record",
        uid: recordUidStr,
        revision: record.revision,
      }))
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: "metadata",
        uid: recordUidStr,
      }))
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          uid: sharedFolderUidStr,
          kind: "shared_folder",
          revision: sharedFolder.revision,
        })
      )
      expect(storage.addDependencies).toHaveBeenCalledWith({
        "": new Set([{
          kind: "record",
          parentUid: "",
          uid: recordUidStr,
        }]),
      })
      expect(storage.removeDependencies).toHaveBeenCalledWith({
        [sharedFolderUidStr]: new Set([recordUidStr]),
        [sharedFolderFolderUidStr]: new Set([recordUidStr]),
      })
    })
  })
  describe('Owned Records + Shared Folders', () => {
    // TODO(@hleekeeper): the test cases may differ after addressing BE-7056
    it.each([
      `deletes the shared folder and all child resources including the owned child records when a user is removed from the shared folder`,
      `deletes the shared folder and all child resources including the owned child records when the shared folder is deleted (regardless or access type to the folder - user or team access)`,
    ])(`%s`, async () => {
      const sharedFolderUid = platform.getRandomBytes(16)
      syncDownResponseBuilder.addRemovedSharedFolder(sharedFolderUid)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.delete).toHaveBeenCalledWith("shared_folder", webSafe64FromBytes(sharedFolderUid))
    })
    it(`deletes the shared folder and all child resources including the owned child records when a user's team is removed from the shared folder`, async () => {
      const teamUid = platform.getRandomBytes(16)
      const sharedFolderUid = platform.getRandomBytes(16)
      const removedSharedFolderTeam: Vault.ISharedFolderTeam = {
        teamUid,
        sharedFolderUid,
      }
      syncDownResponseBuilder.addRemovedSharedFolderTeam(removedSharedFolderTeam)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.removeDependencies).toHaveBeenCalledWith({
        [webSafe64FromBytes(sharedFolderUid)]: new Set([webSafe64FromBytes(teamUid)])
      })
    })
  })
  describe('Directly-Shared Records + Shared Folders', () => {
    // TODO(@hleekeeper): the test cases may differ after addressing BE-7056
    it.each([
      `deletes the shared folder and all child resources except the directly-shared records when a user is removed from the shared folder`,
      `deletes the shared folder and all child resources except the directly-shared records when the shared folder is deleted (regardless of folder access type - user or team access)`,
    ])(`%s`, async () => {
      const sharedFolderUid = platform.getRandomBytes(16)
      syncDownResponseBuilder.addRemovedSharedFolder(sharedFolderUid)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.delete).toHaveBeenCalledWith("shared_folder", webSafe64FromBytes(sharedFolderUid))
    })
    it(`deletes the shared folder and all child resources except the directly-shared records when a user is removed from the shared folder`, async () => {
      const teamUid = platform.getRandomBytes(16)
      const sharedFolderUid = platform.getRandomBytes(16)
      const removedSharedFolderTeam: Vault.ISharedFolderTeam = {
        teamUid,
        sharedFolderUid,
      }
      syncDownResponseBuilder.addRemovedSharedFolderTeam(removedSharedFolderTeam)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.removeDependencies).toHaveBeenCalledWith({
        [webSafe64FromBytes(sharedFolderUid)]: new Set([webSafe64FromBytes(teamUid)])
      })
    })
    it(`doesn't delete the folder data when the directly-shared record is unshared, including the record data (regardless of folder access type - user or team access)`, async () => {
      const recordUid = platform.getRandomBytes(16)
      syncDownResponseBuilder.addRemovedRecord(recordUid)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.delete).toHaveBeenCalledWith("record", webSafe64FromBytes(recordUid))
    })
    it(`doesn't delete the folder data when the directly-shared record is deleted, including the record data (regardless of folder access type - user or team access)`, async () => {
      const recordUid = platform.getRandomBytes(16)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const sharedFolderData = {
        name: "shared folder"
      }
      const {sharedFolderUid, sharedFolder} = await syncDownResponseBuilder.addSharedFolder(sharedFolderData, anotherUserA, {})
      const sharedFolderUidStr = webSafe64FromBytes(sharedFolderUid)
      const removedSharedFolderFolderRecord: Vault.ISharedFolderFolderRecord = {
        recordUid,
        sharedFolderUid,
        folderUid: new Uint8Array([]),
      }
      const removedSharedFolderRecord: Vault.ISharedFolderRecord = {
        recordUid,
        sharedFolderUid,
      }
      syncDownResponseBuilder.addRemovedSharedFolderRecord(removedSharedFolderRecord)
      syncDownResponseBuilder.addRemovedSharedFolderFolderRecord(removedSharedFolderFolderRecord)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
        kind: 'shared_folder',
        uid: sharedFolderUidStr,
        revision: sharedFolder.revision,
      }))
      expect(storage.removeDependencies).toHaveBeenCalledWith({
        [sharedFolderUidStr]: new Set([recordUidStr]),
      })
    })
  })
  describe('Linked Records', () => {
    describe('V4 Linked Records - File Attachments', () => {
      it('saves the record data when a new linked record is added to a record', async () => {
        const recordData = {
          title: 'parent record',
        }
        const linkedRecordData = {
          title: "file attached to the parent record"
        }
        const {recordUid, record, decryptedRecordKey, recordKey} = await syncDownResponseBuilder.addRecord(recordData)
        const recordUidStr = webSafe64FromBytes(recordUid)
        const {linkedRecordUid, linkedRecordKey, linkedRecord} = await syncDownResponseBuilder.addLinkedRecord(linkedRecordData, 4, decryptedRecordKey)
        const linkedRecordUidStr = webSafe64FromBytes(linkedRecordUid)
        const recordLink: Vault.IRecordLink = {
          parentRecordUid: recordUid,
          childRecordUid: linkedRecordUid,
          recordKey: linkedRecordKey,
        }
        syncDownResponseBuilder.addRecordLink(recordLink)
        await platform.unwrapKey(recordKey, recordUidStr, 'data', 'gcm', 'aes')
        mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
        await syncDown({
          auth,
          storage,
        })
        expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
          kind: "record",
          data: recordData,
          uid: recordUidStr,
          revision: record.revision,
        }))
        expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
          kind: "record",
          data: linkedRecordData,
          uid: linkedRecordUidStr,
          revision: linkedRecord.revision,
        }))
      })
      it('saves the record data when a linked record is updated, attached to another record', async () => {
        const recordData = {
          title: 'parent record',
        }
        const linkedRecordData = {
          title: "file attachment updated"
        }
        const {recordUid, record, decryptedRecordKey, recordKey} = await syncDownResponseBuilder.addRecord(recordData)
        const recordUidStr = webSafe64FromBytes(recordUid)
        const {linkedRecordUid, linkedRecord, linkedRecordKey} = await syncDownResponseBuilder.addLinkedRecord(linkedRecordData, 4, decryptedRecordKey)
        const linkedRecordUidStr = webSafe64FromBytes(linkedRecordUid)
        await platform.unwrapKey(recordKey, recordUidStr, 'data', 'gcm', 'aes')
        await platform.unwrapKey(linkedRecordKey, linkedRecordUidStr, recordUidStr, 'gcm', 'aes')
        mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
        await syncDown({
          auth,
          storage,
        })
        expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
          kind: "record",
          data: recordData,
          uid: recordUidStr,
          revision: record.revision,
        }))
        expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
          kind: "record",
          data: linkedRecordData,
          uid: linkedRecordUidStr,
          revision: linkedRecord.revision,
        }))
      })
      it('update the record data when a linked record is unlinked from a record', async () => {
        const recordData = {
          title: 'parent record',
        }
        const {recordUid, record, recordKey} = await syncDownResponseBuilder.addRecord(recordData)
        const recordUidStr = webSafe64FromBytes(recordUid)
        await platform.unwrapKey(recordKey, recordUidStr, 'data', 'gcm', 'aes')
        const linkedRecordUid = platform.getRandomBytes(16)
        const linkedRecordUidStr = webSafe64FromBytes(linkedRecordUid)
        const removedRecordLink: Vault.IRecordLink = {
          parentRecordUid: recordUid,
          childRecordUid: linkedRecordUid,
        }
        syncDownResponseBuilder.addRemovedRecordLink(removedRecordLink)
        mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
        await syncDown({
          auth,
          storage,
        })
        expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
          kind: "record",
          data: recordData,
          uid: recordUidStr,
          revision: record.revision,
        }))
        expect(storage.removeDependencies).toHaveBeenCalledWith({
          [recordUidStr]: new Set([linkedRecordUidStr])
        })
      })
    })
    describe('V3 Linked Records - Credit Cards / Addresses', () => {
      it('saves the record data when a new linked record is added to a record', async () => {
        const recordData = {
          title: 'parent record',
        }
        const linkedRecordData = {
          title: "credit card"
        }
        const {recordUid, record, decryptedRecordKey, recordKey} = await syncDownResponseBuilder.addRecord(recordData)
        const recordUidStr = webSafe64FromBytes(recordUid)
        const {linkedRecordUid, linkedRecord, linkedRecordKey} = await syncDownResponseBuilder.addLinkedRecord(linkedRecordData, 3, decryptedRecordKey)
        const linkedRecordUidStr = webSafe64FromBytes(linkedRecordUid)
        const recordLink: Vault.IRecordLink = {
          parentRecordUid: recordUid,
          childRecordUid: linkedRecordUid,
          recordKey: linkedRecordKey,
        }
        syncDownResponseBuilder.addRecordLink(recordLink)
        await platform.unwrapKey(recordKey, recordUidStr, 'data', 'gcm', 'aes')
        mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
        await syncDown({
          auth,
          storage,
        })
        expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
          kind: "record",
          data: recordData,
          uid: recordUidStr,
          revision: record.revision,
        }))
        expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
          kind: "record",
          data: linkedRecordData,
          uid: linkedRecordUidStr,
          revision: linkedRecord.revision,
        }))
      })
      it('saves the record data when a linked record is updated, attached to another record', async () => {
        const linkedRecordData = {
          title: "credit card updated"
        }
        const {linkedRecordUid, linkedRecordKey, linkedRecord} = await syncDownResponseBuilder.addLinkedRecord(linkedRecordData, 3, auth.dataKey!)
        const linkedRecordUidStr = webSafe64FromBytes(linkedRecordUid)
        await platform.unwrapKey(linkedRecordKey, linkedRecordUidStr, 'data', 'gcm', 'aes')
        mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
        await syncDown({
          auth,
          storage,
        })
        expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
          kind: "record",
          data: linkedRecordData,
          uid: linkedRecordUidStr,
          revision: linkedRecord.revision,
        }))
      })
      it('updates the record data when a linked record is unlinked from a record', async () => {
        const recordData = {
          title: 'parent record',
        }
        const {recordUid, record, recordKey} = await syncDownResponseBuilder.addRecord(recordData)
        const recordUidStr = webSafe64FromBytes(recordUid)
        await platform.unwrapKey(recordKey, recordUidStr, 'data', 'gcm', 'aes')
        const linkedRecordUid = platform.getRandomBytes(16)
        const linkedRecordUidStr = webSafe64FromBytes(linkedRecordUid)
        const removedRecordLink: Vault.IRecordLink = {
          parentRecordUid: recordUid,
          childRecordUid: linkedRecordUid,
        }
        syncDownResponseBuilder.addRemovedRecordLink(removedRecordLink)
        mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
        await syncDown({
          auth,
          storage,
        })
        expect(storage.put).toHaveBeenCalledWith(expect.objectContaining({
          kind: "record",
          data: recordData,
          uid: recordUidStr,
          revision: record.revision,
        }))
        expect(storage.removeDependencies).toHaveBeenCalledWith({
          [recordUidStr]: new Set([linkedRecordUidStr])
        })
      })
      it(`deletes the record data when a linked record is deleted - owned linked records`, async () => {
        const recordUid = platform.getRandomBytes(16)
        syncDownResponseBuilder.addRemovedRecord(recordUid)
        mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
        await syncDown({
          auth,
          storage,
        })
        expect(storage.delete).toHaveBeenCalledWith("record", webSafe64FromBytes(recordUid))
      })
      it('does nothing when a linked record is deleted - shared linked record', async () => {})
    })
  })
})

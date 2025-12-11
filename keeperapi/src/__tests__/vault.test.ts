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
  let storage: VaultStorage;
  let mockSyncDownCommand: jest.MockedFunction<() => any>;
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
      syncDownResponseBuilder.addUserFolderRecord(recordUid)
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
      syncDownResponseBuilder.addUserFolderRecord(recordUid)
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
      syncDownResponseBuilder.addUserFolderRecord(recordUid)
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
      syncDownResponseBuilder
        .addRemovedUserFolder(folderUid)
      mockSyncDownCommand.mockResolvedValue(syncDownResponseBuilder.build())
      await syncDown({
        auth,
        storage,
      })
      expect(storage.delete).toHaveBeenCalledWith("user_folder", webSafe64FromBytes(folderUid))
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
      syncDownResponseBuilder.addUserFolderRecord(recordUid, folderUid)
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
      syncDownResponseBuilder.addUserFolderRecord(recordUid, folderBUid)
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
})

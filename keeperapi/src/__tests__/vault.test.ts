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
  beforeAll(async () => {
    connectPlatform(nodePlatform)
    dataKey = platform.getRandomBytes(32)
    eccKeyPair = await platform.generateECKeyPair()
    syncDownUser = {
      username: 'keeper@keepersecurity.com',
      accountUid: platform.getRandomBytes(16)
    }
  })
  describe('Owned Records', () => {
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
      syncDownResponseBuilder = new SyncDownResponseBuilder();
    })
    it('saves the record data when a new record is created by the user', async () => {
      const decryptedRecordKey = platform.getRandomBytes(32)
      const recordKey = await platform.aesGcmEncrypt(decryptedRecordKey, auth.dataKey!)
      const recordUid = platform.getRandomBytes(16)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const decryptedRecordData = {
        title: 'test record',
      }
      const decodedRecordData = platform.stringToBytes(JSON.stringify(decryptedRecordData))
      const recordData = await platform.aesGcmEncrypt(decodedRecordData, decryptedRecordKey)
      const userFolderRecord: Vault.IUserFolderRecord = {
        recordUid,
        revision: 1,
      }
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
      const record: Vault.IRecord = {
        recordUid,
        version: 3,
        data: recordData,
        extra: new Uint8Array([]),
      }
      syncDownResponseBuilder
        .addUserFolderRecord(userFolderRecord)
        .addRecordMetadata(recordMetadata)
        .addRecord(record)
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
      const decryptedRecordKey = platform.getRandomBytes(32)
      const recordKey = await platform.aesGcmEncrypt(decryptedRecordKey, auth.dataKey!)
      const recordUid = platform.getRandomBytes(16)
      const recordUidStr = webSafe64FromBytes(recordUid)
      const decryptedRecordData = {
        title: 'test record',
        fields: [
          {
            type: 'password',
            value: ['this is a password']
          }
        ],
      }
      const decodedRecordData = platform.stringToBytes(JSON.stringify(decryptedRecordData))
      const recordData = await platform.aesGcmEncrypt(decodedRecordData, decryptedRecordKey)
      const userFolderRecord: Vault.IUserFolderRecord = {
        recordUid,
        revision: 1,
      }
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
      const record: Vault.IRecord = {
        recordUid,
        version: 3,
        data: recordData,
        extra: new Uint8Array([]),
        revision: 1,
      }
      const breachWatchSecurityData: Vault.IBreachWatchSecurityData = {
        recordUid,
        revision: record.revision,
      }
      const decryptedSecurityScoreDataData = {
        padding: '',
        password: 'this is a password',
        score: 1,
        version: 1,
      }
      const securityScoreData: Vault.ISecurityScoreData = {
        recordUid,
        data: await platform.aesGcmEncrypt(platform.stringToBytes(JSON.stringify(decryptedSecurityScoreDataData)), decryptedRecordKey),
        revision: record.revision,
      }
      syncDownResponseBuilder
        .addUserFolderRecord(userFolderRecord)
        .addRecordMetadata(recordMetadata)
        .addRecord(record)
        .addBreachWatchSecurityData(breachWatchSecurityData)
        .addSecurityScoreData(securityScoreData)
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
          revision: breachWatchSecurityData.revision,
          uid: recordUidStr,
        })
      )
      expect(storage.put).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'security_score_data',
          revision: breachWatchSecurityData.revision,
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
      const decryptedRecordKey = platform.getRandomBytes(32)
      const recordKey = await platform.aesGcmEncrypt(decryptedRecordKey, auth.dataKey!)
      const recordUid = platform.getRandomBytes(16)
      const recordUidStr = webSafe64FromBytes(recordUid)
      await platform.unwrapKey(recordKey, recordUidStr, 'data', 'gcm', 'aes')
      const decryptedRecordData = {
        title: 'test record updated',
      }
      const decodedRecordData = platform.stringToBytes(JSON.stringify(decryptedRecordData))
      const recordData = await platform.aesGcmEncrypt(decodedRecordData, decryptedRecordKey)

      const record: Vault.IRecord = {
        recordUid,
        version: 3,
        data: recordData,
        extra: new Uint8Array([]),
      }
      syncDownResponseBuilder
        .addRecord(record)
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
})


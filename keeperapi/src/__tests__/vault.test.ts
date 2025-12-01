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
  beforeAll(async () => {
    connectPlatform(nodePlatform)
    dataKey = platform.getRandomBytes(32)
    eccKeyPair = await platform.generateECKeyPair()
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

      const recordMetadata: Vault.IRecordMetaData = {
        recordUid,
        recordKey,
        owner: true,
        canEdit: true,
        canShare: true,
        recordKeyType: Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY_GCM,
        ownerUsername: 'hlee+dev@keepersecurity.com',
        ownerAccountUid: platform.getRandomBytes(16),
      }
      const record: Vault.IRecord = {
        recordUid,
        version: 3,
        data: recordData,
        extra: new Uint8Array([]),
      }
      syncDownResponseBuilder
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


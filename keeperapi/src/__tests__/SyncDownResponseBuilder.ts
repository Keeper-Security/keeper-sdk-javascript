import {Vault} from "../proto";
import {platform, Platform} from "../platform";
import {Auth} from "../auth";

type RecordFieldData = {
  type: string,
  value: string[]
}

type DecryptedRecordData = {
  title: string
  fields?: RecordFieldData[]
}

type DecryptedSecurityScoreDataData = {
  padding: string,
  password: string,
  score: number,
  version: number,
}

export class SyncDownResponseBuilder {
  private readonly data: Vault.ISyncDownResponse;
  private readonly platform: Platform
  private readonly auth: Auth

  constructor(platform: Platform, auth: Auth) {
    this.platform = platform
    this.auth = auth
    this.data = {
      continuationToken: new Uint8Array([]),
      users: [],
      teams: [],
      userFolders: [],
      userFolderRecords: [],
      sharedFolders: [],
      sharedFolderUsers: [],
      sharedFolderTeams: [],
      sharedFolderRecords: [],
      sharedFolderFolderRecords: [],
      userFolderSharedFolders: [],
      sharedFolderFolders: [],
      recordMetaData: [],
      recordLinks: [],
      records: [],
      nonSharedData: [],
      breachWatchRecords: [],
      breachWatchSecurityData: [],
      securityScoreData: [],
      removedTeams: [],
      removedRecords: [],
      removedRecordLinks: [],
      removedUserFolders: [],
      removedUserFolderRecords: [],
      removedSharedFolderFolders: [],
      removedSharedFolderTeams: [],
      removedSharedFolderUsers: [],
      removedSharedFolderRecords: [],
      removedSharedFolderFolderRecords: [],
      removedSharedFolders: [],
      removedUsers: [],
    }
  }

  addUserFolderRecord(recordUid: Uint8Array, folderUid?: Uint8Array) {
    this.data.userFolderRecords?.push({recordUid, folderUid, revision: Date.now()})
  }

  addRecordMetadata(recordMetadata: Vault.IRecordMetaData) {
    this.data.recordMetaData?.push(recordMetadata)
  }

  async addRecord(decryptedRecordData: DecryptedRecordData) {
    const decryptedRecordKey = this.platform.getRandomBytes(32)
    const recordKey = await this.platform.aesGcmEncrypt(decryptedRecordKey, this.auth.dataKey!)
    const recordUid = this.platform.getRandomBytes(16)
    const decodedRecordData = this.platform.stringToBytes(JSON.stringify(decryptedRecordData))
    const recordData = await this.platform.aesGcmEncrypt(decodedRecordData, decryptedRecordKey)
    const record: Vault.IRecord = {
      recordUid,
      version: 3,
      data: recordData,
      extra: new Uint8Array([]),
      revision: Date.now(),
    }
    this.data.records?.push(record)

    const passwordField = decryptedRecordData.fields?.find(data => data.type === 'password')
    const passwordFieldValue = passwordField?.value ? passwordField.value[0] : undefined
    let decryptedSecurityScoreDataData: DecryptedSecurityScoreDataData | undefined;

    // add breach watch / security score data if a password field value presents
    if (!!passwordFieldValue) {
      this.data.breachWatchSecurityData?.push({
        recordUid,
        revision: record.revision,
      })
      decryptedSecurityScoreDataData = {
        padding: '',
        password: passwordFieldValue,
        score: 1,
        version: 1,
      }
      this.data.securityScoreData?.push({
        recordUid,
        data: await platform.aesGcmEncrypt(platform.stringToBytes(JSON.stringify(decryptedSecurityScoreDataData)), decryptedRecordKey),
        revision: record.revision,
      })
    }

    return {
      recordKey,
      recordUid,
      record,
      decryptedSecurityScoreDataData
    }
  }

  addRemovedRecord(recordUid: Uint8Array) {
    this.data.removedRecords?.push(recordUid)
  }

  addUserFolder(userFolder: Vault.IUserFolder) {
    this.data.userFolders?.push(userFolder)
  }

  addRemovedUserFolder(userFolderId: Uint8Array) {
    this.data.removedUserFolders?.push(userFolderId)
  }

  addRemovedUserFolderRecord(recordUid: Uint8Array, folderUid: Uint8Array) {
    this.data.removedUserFolderRecords?.push({recordUid, folderUid})
  }

  build() {
    return this.data
  }
}
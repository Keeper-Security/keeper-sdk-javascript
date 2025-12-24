import {Records, Vault} from "../proto";
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

type DecryptedSharedFolderFolderData = {
  name: string // folder name
}

type DecryptedSharedFolderData = {
  name: string
}

type UserInfo = {
  username: string
  accountUid: Uint8Array
}

type SharedFolderPermissionData = Pick<
  Vault.ISharedFolder,
  "defaultCanEdit" | "defaultCanReshare" | "defaultManageUsers" | "defaultManageRecords"
>

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

  async addRecord(decryptedRecordData: DecryptedRecordData, encryptionKey?: Uint8Array) {
    const decryptedRecordKey = this.platform.getRandomBytes(32)
    const recordKey = await this.platform.aesGcmEncrypt(decryptedRecordKey, encryptionKey ? encryptionKey : this.auth.dataKey!)
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

  async addSharedFolder(
    decryptedSharedFolderData: DecryptedSharedFolderData,
    userInfo: UserInfo,
    permissionData: SharedFolderPermissionData,
    encryptionkey?: Uint8Array
  ) {
    const sharedFolderUid = platform.getRandomBytes(16)
    const decryptedSharedFolderKey = platform.getRandomBytes(32)
    let sharedFolderKey: Uint8Array
    if (!encryptionkey) {
      sharedFolderKey = await platform.aesCbcEncrypt(decryptedSharedFolderKey, encryptionkey ? encryptionkey : this.auth.dataKey!, true)
    } else {// normally when a shared folder is shared to a team
      sharedFolderKey = platform.publicEncrypt(decryptedSharedFolderKey, platform.bytesToBase64(encryptionkey))
    }
    const sharedFolder: Vault.ISharedFolder = {
      sharedFolderUid,
      sharedFolderKey,
      owner: userInfo.username,
      ownerAccountUid: userInfo.accountUid,
      keyType: encryptionkey ? Records.RecordKeyType.NO_KEY : Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY,
      revision: Date.now(),
      name: await platform.aesCbcEncrypt(platform.stringToBytes(decryptedSharedFolderData.name), decryptedSharedFolderKey, true),
      data: await platform.aesCbcEncrypt(platform.stringToBytes(JSON.stringify(decryptedSharedFolderData)), decryptedSharedFolderKey, true),
      ...permissionData,
    }

    this.data.sharedFolders?.push(sharedFolder)

    return {sharedFolderUid, sharedFolder, sharedFolderKey, decryptedSharedFolderKey}
  }

  addSharedFolderUser(sharedFolderUser: Vault.ISharedFolderUser) {
    this.data.sharedFolderUsers?.push(sharedFolderUser)
  }

  addRemovedSharedFolder(sharedFolderUid: Uint8Array) {
    this.data.removedSharedFolders?.push(sharedFolderUid)
  }

  addRemovedSharedFolderTeam(sharedFolderTeam: Vault.ISharedFolderTeam) {
    this.data.removedSharedFolderTeams?.push(sharedFolderTeam)
  }

  addSharedFolderTeam(sharedFolderTeam: Vault.ISharedFolderTeam) {
    this.data.sharedFolderTeams?.push(sharedFolderTeam)
  }

  addUserFolderSharedFolder(userFolderSharedFolder: Vault.IUserFolderSharedFolder) {
    this.data.userFolderSharedFolders?.push(userFolderSharedFolder)
  }

  addTeam(team: Vault.ITeam) {
    this.data.teams?.push(team)
  }

  addSharedFolderRecord(sharedFolderRecord: Vault.ISharedFolderRecord) {
    this.data.sharedFolderRecords?.push(sharedFolderRecord)
  }

  addRemovedSharedFolderRecord(sharedFolderRecord: Vault.ISharedFolderRecord) {
    this.data.removedSharedFolderRecords?.push(sharedFolderRecord)
  }

  async addSharedFolderFolder(
    decryptedSharedFolderFolderData: DecryptedSharedFolderFolderData,
    sharedFolderUid: Uint8Array,
    decryptedSharedFolderKey: Uint8Array,
    parentUid: Uint8Array = new Uint8Array([])
    ) {
    const sharedFolderFolderUid = platform.getRandomBytes(16)
    const decryptedSharedFolderFolderKey = platform.getRandomBytes(32)
    const sharedFolderFolderKey = await platform.aesCbcEncrypt(decryptedSharedFolderFolderKey, decryptedSharedFolderKey, true)
    const sharedFolderFolder: Vault.ISharedFolderFolder = {
      sharedFolderUid,
      folderUid: sharedFolderFolderUid,
      sharedFolderFolderKey,
      keyType: Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY,
      revision: Date.now(),
      data: await platform.aesCbcEncrypt(platform.stringToBytes(JSON.stringify(decryptedSharedFolderFolderData)), decryptedSharedFolderFolderKey, true),
      // either empty or the parent shared folder's uid if the folder is the direct child of the shared folder (level 0)
      parentUid,
    }

    this.data.sharedFolderFolders?.push(sharedFolderFolder)

    return {
      sharedFolderFolderUid,
      sharedFolderFolder,
    }
  }

  addRemovedSharedFolderFolder(removedSharedFolderFolder: Vault.ISharedFolderFolder) {
    this.data.removedSharedFolderFolders?.push(removedSharedFolderFolder)
  }

  addSharedFolderFolderRecord(sharedFolderFolderRecord: Vault.ISharedFolderFolderRecord) {
    this.data.sharedFolderFolderRecords?.push(sharedFolderFolderRecord)
  }

  addRemovedSharedFolderFolderRecord(sharedFolderFolderRecord: Vault.ISharedFolderFolderRecord) {
    this.data.removedSharedFolderFolderRecords?.push(sharedFolderFolderRecord)
  }

  build() {
    return this.data
  }
}
import {Vault} from "../proto";

export class SyncDownResponseBuilder {
  private readonly data: Vault.ISyncDownResponse;

  constructor() {
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

  addSecurityScoreData(securityScoreData: Vault.ISecurityScoreData) {
    this.data.securityScoreData?.push(securityScoreData)
    return this
  }

  addBreachWatchSecurityData(breachWatchSecurityData: Vault.IBreachWatchSecurityData) {
    this.data.breachWatchSecurityData?.push(breachWatchSecurityData)
    return this
  }

  addUserFolderRecord(userFolderRecord: Vault.IUserFolderRecord) {
    this.data.userFolderRecords?.push(userFolderRecord)
    return this
  }

  addRecordMetadata(recordMetadata: Vault.IRecordMetaData) {
    this.data.recordMetaData?.push(recordMetadata)
    return this
  }

  addRecord(record: Vault.IRecord) {
    this.data.records?.push(record)
    return this
  }

  addRemovedRecord(recordUid: Uint8Array) {
    this.data.removedRecords?.push(recordUid)
    return this
  }

  build() {
    return this.data
  }
}
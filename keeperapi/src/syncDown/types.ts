import {Folder, common} from "../proto";

export type DKeeperDriveFolder = {
  kind: 'keeper_drive_folder'
  uid: string
  data: {
    name: string
  }
  parentUid?: string
  ownerInfo: {
    accountUid?: string
    username?: string
  }
  lastModified?: number
  type?: Folder.FolderUsageType
  inheritUserPermissions?: Folder.SetBooleanValue
}

export type DKeeperDriveRecordAccess = {
  kind: 'keeper_drive_record_access',
  accessTypeUid: string,
  accessType: Folder.AccessType,
  recordUid: string,
  accessRoleType: Folder.AccessRoleType,
  owner?: boolean,
  inherited?: boolean,
  hidden?: boolean,
  deniedAccess?: boolean,
  canEdit?: boolean,
  canView?: boolean,
  canListAccess?: boolean,
  canUpdateAccess?: boolean,
  canDelete?: boolean,
  canChangeOwnership?: boolean,
  canRequestAccess?: boolean,
  canApproveAccess?: boolean,
  dateCreated?: number,
  lastModified?: number,
  tlaProperties?: common.tla.ITLAProperties,
}

export type DKeeperDriveFolderRecord = {
  kind: 'keeper_drive_folder_record',
  folderUid: string,
  recordUid: string,
}

export type DKeeperDriveFolderAccess = {
  kind: 'keeper_drive_folder_access',
  uid: string
  accessTypeUid: string
  accessType: Folder.AccessType
  accessRoleType: Folder.AccessRoleType
  permission: Folder.IFolderPermissions
  inherited?: boolean
  hidden?: boolean
}
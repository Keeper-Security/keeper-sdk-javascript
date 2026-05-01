import { Folder, common } from '../proto'

export type DKdFolder = {
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

export type DKdFolderAccess = {
    kind: 'keeper_drive_folder_access'
    accessUid: string
    uid: string
    accessTypeUid: string
    accessType: Folder.AccessType
    accessRoleType: Folder.AccessRoleType
    permission: Folder.IFolderPermissions
    inherited?: boolean
    hidden?: boolean
}

export type DKdFolderSharingState = {
    kind: 'keeper_drive_folder_sharing_state'
    folderUid: string
    count?: number
    shared?: boolean
}

export type DKdFolderRecord = {
    kind: 'keeper_drive_folder_record'
    folderUid: string
    recordUid: string
}

export type DKdRecordAccess = {
    kind: 'keeper_drive_record_access'
    accessUid: string
    accessTypeUid: string
    accessType: Folder.AccessType
    recordUid: string
    accessRoleType: Folder.AccessRoleType
    owner?: boolean
    inherited?: boolean
    hidden?: boolean
    deniedAccess?: boolean
    canEdit?: boolean
    canView?: boolean
    canListAccess?: boolean
    canUpdateAccess?: boolean
    canDelete?: boolean
    canChangeOwnership?: boolean
    canRequestAccess?: boolean
    canApproveAccess?: boolean
    dateCreated?: number
    lastModified?: number
    tlaProperties?: common.tla.ITLAProperties
}

export type DKdRecordSharingState = {
    kind: 'keeper_drive_record_sharing_state'
    recordUid: string
    isDirectlyShared?: boolean
    isIndirectlyShared?: boolean
    isShared?: boolean
}

export type DKdRecordLink = {
    kind: 'keeper_drive_record_link'
    parentRecordUid: string
    childRecordUid: string
}

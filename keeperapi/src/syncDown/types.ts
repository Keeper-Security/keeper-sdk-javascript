import { Folder, common } from '../proto'

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

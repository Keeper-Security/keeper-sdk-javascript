import type { DRecord, Records, record as RecordProto } from '@keeper-security/keeperapi'
import { Folder } from '@keeper-security/keeperapi'
import type { NsfFolderColor } from './nsfConstants'
import type { NsfItemType } from './nsfHelpers'
import type { RecordFieldEntry } from './nsfRecordData'

export enum NsfAccessRoleLabel {
    Owner = 'owner',
    Navigator = 'navigator',
    Requestor = 'requestor',
    Viewer = 'viewer',
    SharedManager = 'shared-manager',
    ContentManager = 'content-manager',
    ContentShareManager = 'content-share-manager',
    FullManager = 'full-manager',
    Unresolved = 'unresolved',
    Unknown = 'unknown',
}

export const NSF_ACCESS_ROLE_LABELS: Record<number, NsfAccessRoleLabel> = {
    [Folder.AccessRoleType.NAVIGATOR]: NsfAccessRoleLabel.Navigator,
    [Folder.AccessRoleType.REQUESTOR]: NsfAccessRoleLabel.Requestor,
    [Folder.AccessRoleType.VIEWER]: NsfAccessRoleLabel.Viewer,
    [Folder.AccessRoleType.SHARED_MANAGER]: NsfAccessRoleLabel.SharedManager,
    [Folder.AccessRoleType.CONTENT_MANAGER]: NsfAccessRoleLabel.ContentManager,
    [Folder.AccessRoleType.CONTENT_SHARE_MANAGER]: NsfAccessRoleLabel.ContentShareManager,
    [Folder.AccessRoleType.MANAGER]: NsfAccessRoleLabel.FullManager,
    [Folder.AccessRoleType.UNRESOLVED]: NsfAccessRoleLabel.Unresolved,
}

export enum NsfObjectKind {
    Folder = 'folder',
    Record = 'record',
}

export enum GetNsfFormat {
    Detail = 'detail',
    JSON = 'json',
}

export type GetNsfFormatInput = GetNsfFormat | `${GetNsfFormat}`

export type GetNsfOptions = {
    format?: GetNsfFormatInput
    verbose?: boolean
    unmask?: boolean
}

export type NsfFolderAccessRow = {
    username: string
    role: NsfAccessRoleLabel
}

export type NsfFolderPermission = {
    accessTypeUid: string
    accessType: string
    accessRoleType: string
    inherited?: boolean
    hidden?: boolean
    canAdd?: boolean
    canRemove?: boolean
    canDelete?: boolean
    canListAccess?: boolean
    canUpdateAccess?: boolean
    canEditRecords?: boolean
    canViewRecords?: boolean
    canListRecords?: boolean
}

export type NsfRecordPermission = {
    username: string
    accountUid?: string
    owner: boolean
    shareAdmin: boolean
    shareable: boolean
    editable: boolean
    awaitingApproval: boolean
    expiration?: number
    role?: NsfAccessRoleLabel
}

export type NsfFolderSummary = {
    uid: string
    title: string
    type: string
}

export type NsfFolderView = {
    objectType: NsfObjectKind.Folder
    folderUid: string
    name: string
    parentUid: string
    path: string
    userPermissions: NsfFolderAccessRow[]
    shareAdmins: NsfFolderAccessRow[]
    teamPermissions: NsfFolderPermission[]
    records: NsfFolderSummary[]
}

export type NsfRecordFieldView = {
    type: string
    label?: string
    value: string[]
}

export type NsfRecordFolderView = {
    uid: string
    path: string
}

export type NsfRecordJsonUserPermission = {
    username: string
    owner: boolean
    shareable: boolean
    editable: boolean
    role: NsfAccessRoleLabel
}

export type NsfRecordJsonView = {
    record_uid: string
    title: string
    type: string
    version: number
    revision: number
    folder?: NsfRecordFolderView
    fields: { type: string; value: unknown[] }[]
    notes?: string
    user_permissions: NsfRecordJsonUserPermission[]
    share_admins: string[]
}

export type NsfRecordView = {
    objectType: NsfObjectKind.Record
    recordUid: string
    title: string
    type: string
    revision: number
    version: number
    folder?: NsfRecordFolderView
    folderLocation: string
    login?: string
    password?: string
    url?: string
    notes?: string
    fields: NsfRecordFieldView[]
    userPermissions: NsfRecordPermission[]
    shareAdmins: string[]
}

export type GetNsfResult =
    | { kind: NsfObjectKind.Folder; view: NsfFolderView }
    | { kind: NsfObjectKind.Record; view: NsfRecordView }

export type NsfFolderColorInput = NsfFolderColor | `${NsfFolderColor}`

export type MkdirNsfInput = {
    folder: string
    color?: NsfFolderColorInput
    noInheritPermissions?: boolean
    baseFolderUid?: string | null
}

export type MkdirNsfResult = {
    folderUid: string
    created: boolean
    message?: string
}

export type FolderSegmentCreateSpec = {
    segmentName: string
    color?: NsfFolderColor
    inheritPermissions: boolean
}

export type FolderCreatePayload = {
    folderUid: string
    folderName: string
    parentUid: string | null
    inheritPermissions: boolean
    folderData: Folder.IFolderData
}

export type AddNsfRecordInput = {
    title: string
    recordType: string
    folder?: string
    notes?: string
    fieldEntries?: RecordFieldEntry[]
    customEntries?: RecordFieldEntry[]
    recordData?: Record<string, unknown>
    force?: boolean
    hasFileFields?: boolean
}

export type AddNsfRecordsInput = {
    records: AddNsfRecordInput[]
}

export type NsfRecordOperationResult = {
    recordUid: string
    success: boolean
    status: string
    message?: string
    revision?: number
}

export type AddNsfRecordResult = NsfRecordOperationResult

export type AddNsfRecordsResult = {
    added: AddNsfRecordResult[]
    revision?: number
}

export type RecordAddPayload = {
    recordUid: string
    recordAdd: RecordProto.v3.IRecordAdd
}

export type UpdateNsfRecordInput = {
    records: string[]
    title?: string
    recordType?: string
    notes?: string
    fieldEntries?: RecordFieldEntry[]
    customEntries?: RecordFieldEntry[]
}

export type UpdateNsfRecordItemInput = {
    record: string
    title?: string
    recordType?: string
    notes?: string
    fieldEntries?: RecordFieldEntry[]
    customEntries?: RecordFieldEntry[]
}

export type UpdateNsfRecordsInput = {
    records: UpdateNsfRecordItemInput[]
}

export type UpdateNsfRecordResultItem = NsfRecordOperationResult

export type UpdateNsfRecordResult = {
    updated: UpdateNsfRecordResultItem[]
}

export type RecordUpdatePayload = {
    recordUid: string
    storedRecord: DRecord | undefined
    mergedRecordData: Record<string, unknown>
    recordUpdate: Records.IRecordUpdate
}

export enum ListNsfFormat {
    Table = 'table',
    CSV = 'csv',
    JSON = 'json',
}

export type ListNsfFormatInput = ListNsfFormat | `${ListNsfFormat}`

export type ListNsfOptions = {
    folders?: boolean
    records?: boolean
    format?: ListNsfFormatInput
}

export type ListNsfRow = {
    itemType: NsfItemType
    uid: string
    title: string
    type: string
    description: string
    parentOrFolder: string
}

export type FormattedListNsfTable = {
    headers: string[]
    rows: string[][]
}

export enum NsfRemoveOperation {
    OwnerTrash = 'owner-trash',
    FolderTrash = 'folder-trash',
    Unlink = 'unlink',
}

export type NsfRemoveOperationInput = NsfRemoveOperation | `${NsfRemoveOperation}`

export type RemoveNsfRecordInput = {
    records: string[]
    folder?: string
    operation?: NsfRemoveOperationInput
    force?: boolean
    dryRun?: boolean
}

export type NsfRemovePreviewItem = {
    recordUid: string
    folderUid: string
    status: string
    impact?: {
        foldersCount: number
        recordsCount: number
        affectedUsersCount: number
        affectedTeamsCount: number
        warnings: string[]
    }
    error?: { code: number; message: string }
}

export type RemoveNsfRecordResult = {
    confirmed: boolean
    dryRun: boolean
    preview: NsfRemovePreviewItem[]
    message?: string
}

export enum NsfRemoveFolderOperation {
    FolderTrash = 'folder-trash',
    DeletePermanent = 'delete-permanent',
}

export type NsfRemoveFolderOperationInput = NsfRemoveFolderOperation | `${NsfRemoveFolderOperation}`

export type RemoveNsfFolderInput = {
    folders: string[]
    operation?: NsfRemoveFolderOperationInput
    force?: boolean
    dryRun?: boolean
    quiet?: boolean
}

export type NsfRemoveFolderPreviewItem = {
    folderUid: string
    name: string
    status: string
    impact?: {
        foldersCount: number
        recordsCount: number
        affectedUsersCount: number
        affectedTeamsCount: number
        warnings: string[]
    }
    error?: { code: number; message: string }
}

export type RemoveNsfFolderResult = {
    confirmed: boolean
    dryRun: boolean
    operation: NsfRemoveFolderOperation
    preview: NsfRemoveFolderPreviewItem[]
    message?: string
}

export enum GetNsfRecordDetailsFormat {
    Table = 'table',
    JSON = 'json',
}

export type GetNsfRecordDetailsFormatInput = GetNsfRecordDetailsFormat | `${GetNsfRecordDetailsFormat}`

export type NsfRecordDetailsItem = {
    recordUid: string
    title: string
    type: string
    revision: number
    version: number
}

export type GetNsfRecordDetailsResult = {
    data: NsfRecordDetailsItem[]
    forbiddenRecords: string[]
}

export type GetNsfRecordDetailsInput = {
    records: string[]
    format?: GetNsfRecordDetailsFormatInput
}

export type LinkNsfRecordResult = {
    success: boolean
    recordUid: string
    folderUid: string
    status: string
    message: string
}

const ACCESS_ROLE_LABEL_VALUES = new Set<string>(Object.values(NsfAccessRoleLabel))

export function toNsfAccessRoleLabel(role: string): NsfAccessRoleLabel {
    if (ACCESS_ROLE_LABEL_VALUES.has(role)) {
        return role as NsfAccessRoleLabel
    }
    return NsfAccessRoleLabel.Unknown
}

export function resolveRecordPermissionRole(entry: NsfRecordPermission): NsfAccessRoleLabel {
    if (entry.owner) return NsfAccessRoleLabel.Owner
    if (entry.shareAdmin) return NsfAccessRoleLabel.SharedManager
    if (entry.role) return entry.role
    return NsfAccessRoleLabel.ContentManager
}

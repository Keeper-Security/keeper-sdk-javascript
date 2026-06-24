import { Folder } from '@keeper-security/keeperapi'

export const NSF_LEGACY_RECORD_MSG =
    "Record '{0}' is a legacy vault record. Nested Share Folder commands operate only on Nested Share Records."

export const NSF_LEGACY_FOLDER_MSG =
    "Folder '{0}' is a legacy folder. Nested Share Folder commands operate only on Nested Share Folders."

export const NSF_ACCESS_ROLE_LABELS: Record<number, string> = {
    [Folder.AccessRoleType.NAVIGATOR]: 'navigator',
    [Folder.AccessRoleType.REQUESTOR]: 'requestor',
    [Folder.AccessRoleType.VIEWER]: 'viewer',
    [Folder.AccessRoleType.SHARED_MANAGER]: 'shared-manager',
    [Folder.AccessRoleType.CONTENT_MANAGER]: 'content-manager',
    [Folder.AccessRoleType.CONTENT_SHARE_MANAGER]: 'content-share-manager',
    [Folder.AccessRoleType.MANAGER]: 'manager',
    [Folder.AccessRoleType.UNRESOLVED]: 'unresolved',
}

export const NSF_ACCESS_TYPE_LABELS: Record<number, string> = {
    [Folder.AccessType.AT_USER]: 'user',
    [Folder.AccessType.AT_TEAM]: 'team',
    [Folder.AccessType.AT_OWNER]: 'owner',
    [Folder.AccessType.AT_ENTERPRISE]: 'enterprise',
    [Folder.AccessType.AT_FOLDER]: 'folder',
    [Folder.AccessType.AT_APPLICATION]: 'application',
}

export const NSF_SENSITIVE_FIELD_TYPES = new Set(['password', 'secret', 'pinCode'])
export const NSF_NOTE_FIELD_TYPES = new Set(['note', 'multiline'])
export const NSF_TOP_LEVEL_FIELD_TYPES = new Set(['login', 'password', 'url', 'note', 'multiline', 'text'])
export const NSF_UNKNOWN_RECORD_TITLES = new Set(['(no data)', '(untitled)', 'Unknown'])
export const NSF_RECORD_DESCRIPTION_MAX_LENGTH = 120

export const NSF_MASKED_VALUE = '********'
export const NSF_FOLDER_LABEL_WIDTH = 22
export const NSF_RECORD_LABEL_WIDTH = 17
export const NSF_FOLDER_USER_PERMISSIONS_HEADING = 'User Permissions:'
export const NSF_FOLDER_SHARE_ADMINS_HEADING = 'Share Administrators:'
export const NSF_RECORD_USER_PERMISSIONS_HEADING = 'User Permissions:'

export const NSF_LIST_TABLE_HEADERS = ['#', 'Item Type', 'UID', 'Title', 'Type', 'Description'] as const
export const NSF_LIST_FULL_HEADERS = [
    'Item Type',
    'UID',
    'Title',
    'Type',
    'Description',
    'Parent/Folder',
] as const
export const NSF_LIST_DEFAULT_COLUMN_WIDTH = 40
export const NSF_LIST_MIN_TRUNCATE_PREFIX = 3

export const NSF_MAX_REMOVALS = 500
export const NSF_MAX_FOLDER_REMOVALS = 100

export const NSF_PATH_SENTINEL = '\x00'

export const NSF_FOLDER_COLORS = ['none', 'red', 'orange', 'yellow', 'green', 'blue', 'gray'] as const
export type NsfFolderColor = (typeof NSF_FOLDER_COLORS)[number]

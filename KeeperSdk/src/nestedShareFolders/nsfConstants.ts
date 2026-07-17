import { Folder } from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes } from '../utils'

export const ROOT_FOLDER_UID = 'AAAAAAAAAAAAAAAAAPmtNA'

export const NSF_LEGACY_RECORD_MSG =
    "Record '{0}' is a legacy vault record. Nested Share Folder commands operate only on Nested Share Records."

export const NSF_LEGACY_FOLDER_MSG =
    "Folder '{0}' is a legacy folder. Nested Share Folder commands operate only on Nested Share Folders."

export const NSF_LEGACY_RECORD_TYPES = new Set(['legacy', 'general'])

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
export const NSF_USER_PERMISSIONS_HEADING = 'User Permissions:'
export const NSF_FOLDER_USER_PERMISSIONS_HEADING = NSF_USER_PERMISSIONS_HEADING
export const NSF_FOLDER_SHARE_ADMINS_HEADING = 'Share Administrators:'
export const NSF_RECORD_USER_PERMISSIONS_HEADING = NSF_USER_PERMISSIONS_HEADING
export const NSF_SHARE_ADMINS_PREVIEW_LIMIT = 10

export const NSF_LIST_TABLE_HEADERS = ['#', 'Item Type', 'UID', 'Title', 'Type', 'Description'] as const
export const NSF_LIST_FULL_HEADERS = ['Item Type', 'UID', 'Title', 'Type', 'Description', 'Parent/Folder'] as const
export const NSF_LIST_DEFAULT_COLUMN_WIDTH = 40
export const NSF_LIST_MIN_TRUNCATE_PREFIX = 3

export const NSF_MAX_RECORD_BATCH = 500
export const NSF_MAX_REMOVALS = 500
export const NSF_MAX_FOLDER_REMOVALS = 100
/** Max folder updates per `vault/folders/v3/update` request (FolderUpdateRequest.folderData). */
export const NSF_MAX_FOLDER_UPDATES = 100

export const NSF_PATH_SENTINEL = '\x00'

export const NSF_FOLDER_COLORS = ['none', 'red', 'orange', 'yellow', 'green', 'blue', 'gray'] as const
export type NsfFolderColor = (typeof NSF_FOLDER_COLORS)[number]

export const NSF_KNOWN_FIELD_TYPES = new Set([
    'login',
    'password',
    'url',
    'email',
    'text',
    'multiline',
    'secret',
    'note',
    'onetimecode',
    'date',
    'phone',
    'name',
    'address',
    'paymentcard',
    'bankaccount',
    'securityquestion',
    'host',
    'keypair',
    'fileref',
    'passkey',
    'pincode',
])

export const NSF_STRUCTURED_SUBKEYS: Record<string, ReadonlySet<string>> = {
    name: new Set(['first', 'middle', 'last']),
    host: new Set(['hostName', 'port', 'host']),
    address: new Set(['street1', 'street2', 'city', 'state', 'zip', 'country', 'address']),
    paymentcard: new Set(['cardNumber', 'cardExpirationDate', 'cardSecurityCode', 'cardPin']),
    bankaccount: new Set(['accountNumber', 'routingNumber', 'accountType']),
    securityquestion: new Set(['question', 'answer']),
    phone: new Set(['number', 'region', 'type', 'ext']),
}

export enum NSFShareRoleName {
    Contributor = 'contributor',
    Viewer = 'viewer',
    ShareManager = 'share-manager',
    ContentManager = 'content-manager',
    ContentShareManager = 'content-share-manager',
    FullManager = 'full-manager',
    Unresolved = 'unresolved',
}

export const NSF_RECORD_PERMISSION_ROLES = [
    NSFShareRoleName.Viewer,
    NSFShareRoleName.ShareManager,
    NSFShareRoleName.ContentManager,
    NSFShareRoleName.ContentShareManager,
    NSFShareRoleName.FullManager,
] as const
export type NsfRecordPermissionRole = (typeof NSF_RECORD_PERMISSION_ROLES)[number]
export type NsfRecordPermissionRoleInput = NsfRecordPermissionRole | `${NsfRecordPermissionRole}`

export const NSF_RECORD_PERMISSION_ROLE_LABELS: Record<number, string> = {
    [Folder.AccessRoleType.NAVIGATOR]: NSFShareRoleName.Contributor,
    [Folder.AccessRoleType.REQUESTOR]: NSFShareRoleName.Contributor,
    [Folder.AccessRoleType.VIEWER]: NSFShareRoleName.Viewer,
    [Folder.AccessRoleType.SHARED_MANAGER]: NSFShareRoleName.ShareManager,
    [Folder.AccessRoleType.CONTENT_MANAGER]: NSFShareRoleName.ContentManager,
    [Folder.AccessRoleType.CONTENT_SHARE_MANAGER]: NSFShareRoleName.ContentShareManager,
    [Folder.AccessRoleType.MANAGER]: NSFShareRoleName.FullManager,
    [Folder.AccessRoleType.UNRESOLVED]: NSFShareRoleName.Unresolved,
}

export const NSF_RECORD_PERMISSION_ROLE_MAP: Record<string, Folder.AccessRoleType> = {
    [NSFShareRoleName.Contributor]: Folder.AccessRoleType.REQUESTOR,
    requestor: Folder.AccessRoleType.REQUESTOR,
    [NSFShareRoleName.Viewer]: Folder.AccessRoleType.VIEWER,
    [NSFShareRoleName.ShareManager]: Folder.AccessRoleType.SHARED_MANAGER,
    share_manager: Folder.AccessRoleType.SHARED_MANAGER,
    shared_manager: Folder.AccessRoleType.SHARED_MANAGER,
    [NSFShareRoleName.ContentManager]: Folder.AccessRoleType.CONTENT_MANAGER,
    content_manager: Folder.AccessRoleType.CONTENT_MANAGER,
    [NSFShareRoleName.ContentShareManager]: Folder.AccessRoleType.CONTENT_SHARE_MANAGER,
    content_share_manager: Folder.AccessRoleType.CONTENT_SHARE_MANAGER,
    [NSFShareRoleName.FullManager]: Folder.AccessRoleType.MANAGER,
    full_manager: Folder.AccessRoleType.MANAGER,
}

export const NSF_SHARE_EXPIRATION_NEVER = 'never'

export enum NsfShareCommandName {
    FolderShare = 'nsf-share-folder',
    RecordShare = 'nsf-share-record',
}

export const NSF_SHARE_BATCH_SIZE = 200

export enum TeamGetKeysResponseKeyType {
    EccPublicKey = -1,
    RsaPublicKey = -3,
    EncryptedAesTeamKeyByDataKey = 1,
    EncryptedAesTeamKeyByRsa = 2,
    EncryptedAesTeamKeyByDataKeyGcm = 3,
    EncryptedAesTeamKeyByEcc = 4,
}

export const MIN_SHARE_EXPIRATION_MS = 60_000
export const NSF_TLA_EXPIRATION_TOLERANCE_MS = 60_000

const NSF_SHARE_EXPIRATION_DAY_MS = 86_400_000

export const NSF_SHARE_EXPIRATION_RE = /^(\d+)\s*(mi(?:nutes?)?|h(?:ours?)?|d(?:ays?)?|mo(?:nths?)?|y(?:ears?)?)$/i

export const NSF_SHARE_EXPIRATION_UNIT_MS: Record<string, number> = {
    mi: 60_000,
    m: 60_000,
    minute: 60_000,
    minutes: 60_000,
    h: 3_600_000,
    hour: 3_600_000,
    hours: 3_600_000,
    d: NSF_SHARE_EXPIRATION_DAY_MS,
    day: NSF_SHARE_EXPIRATION_DAY_MS,
    days: NSF_SHARE_EXPIRATION_DAY_MS,
    mo: 30 * NSF_SHARE_EXPIRATION_DAY_MS,
    month: 30 * NSF_SHARE_EXPIRATION_DAY_MS,
    months: 30 * NSF_SHARE_EXPIRATION_DAY_MS,
    y: 365 * NSF_SHARE_EXPIRATION_DAY_MS,
    year: 365 * NSF_SHARE_EXPIRATION_DAY_MS,
    years: 365 * NSF_SHARE_EXPIRATION_DAY_MS,
}

type FolderRolePermissionFlags = {
    canAdd?: boolean
    canRemove?: boolean
    canDelete?: boolean
    canListAccess?: boolean
    canUpdateAccess?: boolean
    canChangeOwnership?: boolean
    canEditRecords?: boolean
    canViewRecords?: boolean
    canApproveAccess?: boolean
    canRequestAccess?: boolean
    canUpdateSetting?: boolean
    canListRecords?: boolean
    canListFolders?: boolean
}

const NSF_FOLDER_ROLE_PERMISSIONS: Record<number, FolderRolePermissionFlags> = {
    [Folder.AccessRoleType.NAVIGATOR]: {
        canListFolders: true,
    },
    [Folder.AccessRoleType.REQUESTOR]: {
        canRequestAccess: true,
        canListRecords: true,
        canListFolders: true,
    },
    [Folder.AccessRoleType.VIEWER]: {
        canListAccess: true,
        canViewRecords: true,
        canListRecords: true,
        canListFolders: true,
    },
    [Folder.AccessRoleType.SHARED_MANAGER]: {
        canListAccess: true,
        canUpdateAccess: true,
        canViewRecords: true,
        canApproveAccess: true,
        canListRecords: true,
        canListFolders: true,
    },
    [Folder.AccessRoleType.CONTENT_MANAGER]: {
        canAdd: true,
        canListAccess: true,
        canEditRecords: true,
        canViewRecords: true,
        canListRecords: true,
        canListFolders: true,
    },
    [Folder.AccessRoleType.CONTENT_SHARE_MANAGER]: {
        canAdd: true,
        canRemove: true,
        canListAccess: true,
        canUpdateAccess: true,
        canEditRecords: true,
        canViewRecords: true,
        canApproveAccess: true,
        canUpdateSetting: true,
        canListRecords: true,
        canListFolders: true,
    },
    [Folder.AccessRoleType.MANAGER]: {
        canAdd: true,
        canRemove: true,
        canDelete: true,
        canListAccess: true,
        canUpdateAccess: true,
        canChangeOwnership: true,
        canEditRecords: true,
        canViewRecords: true,
        canApproveAccess: true,
        canUpdateSetting: true,
        canListRecords: true,
        canListFolders: true,
    },
}

export function getFolderPermissionsForRole(roleType: Folder.AccessRoleType): Folder.IFolderPermissions {
    const flags = NSF_FOLDER_ROLE_PERMISSIONS[roleType]
    if (!flags) {
        throw new KeeperSdkError(`Unknown folder access role type: ${roleType}`, ResultCodes.NSF_SHARE_FAILED)
    }
    return Folder.FolderPermissions.create(flags)
}

import type { Auth, DRecord, DKdFolder, DKdFolderAccess } from '@keeper-security/keeperapi'
import {
    Enterprise,
    Folder,
    Records,
    getRecordsDetailsMessage,
    normal64Bytes,
    webSafe64FromBytes,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import {
    getRecordFields,
    getRecordLogin,
    getRecordPassword,
    getRecordTitle,
    getRecordType,
    getRecordUrl,
} from '../records/RecordUtils'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import {
    buildFolderPath,
    collectRecordsInFolder,
    findRecordFolderLocation,
    folderAccessDisplayRole,
    formatAccessType,
    getFolderAccessEntries,
    getKeeperDriveFolder,
    getKeeperDriveFolders,
    getKeeperDriveRecord,
    getKeeperDriveRecords,
    isFolderShareAdministrator,
    isFolderUserPermission,
    isSensitiveFieldType,
    normalizeParentUid,
    resolveAccessUsername,
} from './nsfHelpers'

const MASKED_VALUE = '********'
const FOLDER_LABEL_WIDTH = 22
const RECORD_LABEL_WIDTH = 17
const TOP_LEVEL_FIELD_TYPES = new Set(['login', 'password', 'url', 'note', 'multiline', 'text'])
const UNKNOWN_RECORD_TITLES = new Set(['(no data)', '(untitled)', 'Unknown'])
const FOLDER_USER_PERMISSIONS_HEADING = '         User Permissions:'
const FOLDER_SHARE_ADMINS_HEADING = '     Share Administrators:'
const RECORD_USER_PERMISSIONS_HEADING = 'User Permissions:'
const SHARING_ADMINS_API_PATH = 'enterprise/get_sharing_admins'

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
    role: string
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
}

export type NsfFolderView = {
    objectType: 'folder'
    folderUid: string
    name: string
    parentUid: string
    path: string
    userPermissions: NsfFolderAccessRow[]
    shareAdmins: NsfFolderAccessRow[]
    teamPermissions: NsfFolderPermission[]
    records: { uid: string; title: string; type: string }[]
}

export type NsfRecordView = {
    objectType: 'record'
    recordUid: string
    title: string
    type: string
    revision: number
    version: number
    folderLocation: string
    login?: string
    password?: string
    url?: string
    notes?: string
    fields: { type: string; label?: string; value: string }[]
    userPermissions: NsfRecordPermission[]
    shareAdmins: string[]
}

export type GetNsfResult = { kind: 'folder'; view: NsfFolderView } | { kind: 'record'; view: NsfRecordView }

function folderDetailRow(label: string, value: string): string {
    return `${label.padStart(FOLDER_LABEL_WIDTH)}: ${value}`
}

function recordDetailRow(label: string, value: string): string {
    return `${label.padStart(RECORD_LABEL_WIDTH)}: ${value}`
}

function recordDetailsMessage(recordUid: string, include: Records.RecordDetailsInclude) {
    return getRecordsDetailsMessage({
        clientTime: Date.now(),
        recordUid: [normal64Bytes(recordUid)],
        recordDetailsInclude: include,
    })
}

function recordSharingAdminsMessage(recordUid: string) {
    const uid = normal64Bytes(recordUid)
    return {
        path: SHARING_ADMINS_API_PATH,
        toBytes(): Uint8Array {
            return Enterprise.GetSharingAdminsRequest.encode({ recordUid: uid }).finish()
        },
        fromBytes(data: Uint8Array): Enterprise.IGetSharingAdminsResponse {
            return Enterprise.GetSharingAdminsResponse.decode(data)
        },
    }
}

function bytesToUid(bytes: Uint8Array | null | undefined): string | undefined {
    return bytes?.length ? webSafe64FromBytes(bytes) : undefined
}

function longToNumber(value: number | { toNumber: () => number } | null | undefined): number | undefined {
    if (value == null) return undefined
    return typeof value === 'number' ? value : value.toNumber()
}

function resolveByUidOrName<T>(
    items: T[],
    identifier: string,
    getUid: (item: T) => string,
    getName: (item: T) => string
): T | undefined {
    const trimmed = identifier.trim()
    if (!trimmed) return undefined

    const byUid = items.find((item) => getUid(item) === trimmed)
    if (byUid) return byUid

    const lower = trimmed.toLowerCase()
    const nameMatches = items.filter((item) => getName(item).toLowerCase() === lower)
    if (nameMatches.length === 1) return nameMatches[0]
    if (nameMatches.length > 1) {
        throw new KeeperSdkError(
            `Multiple matches found for "${identifier}". Use a UID instead.`,
            ResultCodes.MULTIPLE_NSF_MATCHES
        )
    }
    return undefined
}

function resolveRecordByTitleSearch(storage: InMemoryStorage, identifier: string): DRecord | undefined {
    const lower = identifier.toLowerCase()
    const matches = getKeeperDriveRecords(storage).filter((record) => {
        const title = getRecordTitle(record)
        return title && lower.length > 0 && title.toLowerCase().includes(lower)
    })
    if (matches.length === 1) return matches[0]
    if (matches.length > 1) {
        throw new KeeperSdkError(
            `Multiple records matched "${identifier}". Use a UID instead.`,
            ResultCodes.MULTIPLE_NSF_MATCHES
        )
    }
    return undefined
}

function mapFolderPermission(entry: DKdFolderAccess): NsfFolderPermission {
    const permission = entry.permission
    return {
        accessTypeUid: entry.accessTypeUid,
        accessType: formatAccessType(entry.accessType),
        accessRoleType: folderAccessDisplayRole(entry),
        inherited: entry.inherited,
        hidden: entry.hidden,
        canAdd: permission?.canAdd ?? undefined,
        canRemove: permission?.canRemove ?? undefined,
        canDelete: permission?.canDelete ?? undefined,
        canListAccess: permission?.canListAccess ?? undefined,
        canUpdateAccess: permission?.canUpdateAccess ?? undefined,
        canEditRecords: permission?.canEditRecords ?? undefined,
        canViewRecords: permission?.canViewRecords ?? undefined,
        canListRecords: permission?.canListRecords ?? undefined,
    }
}

function buildFolderAccessRow(
    storage: InMemoryStorage,
    folder: DKdFolder,
    entry: DKdFolderAccess
): NsfFolderAccessRow {
    return {
        username: resolveAccessUsername(storage, entry.accessTypeUid, folder),
        role: folderAccessDisplayRole(entry),
    }
}

function splitFolderPermissions(storage: InMemoryStorage, folder: DKdFolder) {
    const entries = getFolderAccessEntries(storage, folder.uid)
    return {
        userPermissions: entries
            .filter(isFolderUserPermission)
            .map((entry) => buildFolderAccessRow(storage, folder, entry)),
        shareAdmins: entries
            .filter(isFolderShareAdministrator)
            .map((entry) => buildFolderAccessRow(storage, folder, entry)),
        teamPermissions: entries
            .filter((entry) => entry.accessType === Folder.AccessType.AT_TEAM)
            .map(mapFolderPermission),
    }
}

function prependOwnerRow(rows: NsfFolderAccessRow[], ownerUsername: string): NsfFolderAccessRow[] {
    if (rows.some((entry) => entry.username === ownerUsername)) return rows
    return [{ username: ownerUsername, role: 'owner' }, ...rows]
}

function ensureFolderOwnerListed(
    folder: DKdFolder,
    userPermissions: NsfFolderAccessRow[],
    shareAdmins: NsfFolderAccessRow[]
): { userPermissions: NsfFolderAccessRow[]; shareAdmins: NsfFolderAccessRow[] } {
    const ownerUsername = folder.ownerInfo?.username?.trim()
    if (!ownerUsername) return { userPermissions, shareAdmins }
    return {
        userPermissions: prependOwnerRow(userPermissions, ownerUsername),
        shareAdmins: prependOwnerRow(shareAdmins, ownerUsername),
    }
}

function buildRecordFields(record: DRecord, unmask: boolean): NsfRecordView['fields'] {
    return getRecordFields(record).flatMap((field) => {
        if (TOP_LEVEL_FIELD_TYPES.has(field.type)) return []
        const rawValue = Array.isArray(field.value) ? field.value[0] : field.value
        if (rawValue == null || rawValue === '') return []
        const value = !unmask && isSensitiveFieldType(field.type) ? MASKED_VALUE : String(rawValue)
        return [{ type: field.type, label: field.label, value }]
    })
}

function formatRecordUserPermissionBlock(entry: NsfRecordPermission): string[] {
    const lines: string[] = []
    if (entry.username) lines.push(`  User: ${entry.username}`)
    else if (entry.accountUid) lines.push(`  User UID: ${entry.accountUid}`)
    if (entry.owner) lines.push('  Owner: Yes')
    lines.push(`  Shareable: ${entry.shareable ? 'Yes' : 'No'}`)
    lines.push(`  Read-Only: ${entry.editable ? 'No' : 'Yes'}`)
    return lines
}

async function fetchRecordPermissions(auth: Auth, recordUid: string): Promise<NsfRecordPermission[]> {
    try {
        const response = await auth.executeRest(
            recordDetailsMessage(recordUid, Records.RecordDetailsInclude.SHARE_ONLY)
        )
        const detail = response.recordDataWithAccessInfo?.[0]
        return (detail?.userPermission ?? []).map((entry) => ({
            username: entry.username || '',
            accountUid: bytesToUid(entry.accountUid),
            owner: !!entry.owner,
            shareAdmin: !!entry.shareAdmin,
            shareable: !!entry.sharable,
            editable: !!entry.editable,
            awaitingApproval: !!entry.awaitingApproval,
            expiration: longToNumber(entry.expiration as number | null | undefined),
        }))
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to fetch record permissions for ${recordUid}: ${extractErrorMessage(err)}`
        )
    }
}

async function fetchRecordShareAdmins(auth: Auth, recordUid: string): Promise<string[]> {
    try {
        const response = await auth.executeRest(recordSharingAdminsMessage(recordUid))
        return (response.userProfileExts ?? [])
            .map((ext) => ext.email || '')
            .filter((email) => email.length > 0)
            .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    } catch {
        return []
    }
}

async function fetchRecordDataFallback(auth: Auth, recordUid: string): Promise<DRecord['data'] | undefined> {
    try {
        const response = await auth.executeRest(
            recordDetailsMessage(recordUid, Records.RecordDetailsInclude.DATA_ONLY)
        )
        return response.recordDataWithAccessInfo?.[0]?.recordData as DRecord['data'] | undefined
    } catch {
        return undefined
    }
}

function buildFolderView(storage: InMemoryStorage, folderUid: string): NsfFolderView {
    const folder = getKeeperDriveFolder(storage, folderUid)
    if (!folder) {
        throw new KeeperSdkError(`Nested share folder not found: ${folderUid}`, ResultCodes.NSF_NOT_FOUND)
    }

    const split = splitFolderPermissions(storage, folder)
    const { userPermissions, shareAdmins } = ensureFolderOwnerListed(
        folder,
        split.userPermissions,
        split.shareAdmins
    )

    return {
        objectType: 'folder',
        folderUid,
        name: folder.data.name || 'Unnamed',
        parentUid: normalizeParentUid(folder.parentUid),
        path: buildFolderPath(storage, folderUid),
        userPermissions,
        shareAdmins,
        teamPermissions: split.teamPermissions,
        records: collectRecordsInFolder(storage, folderUid).map((record) => ({
            uid: record.uid,
            title: getRecordTitle(record),
            type: getRecordType(record),
        })),
    }
}

async function buildRecordView(
    auth: Auth,
    storage: InMemoryStorage,
    recordUid: string,
    unmask: boolean
): Promise<NsfRecordView> {
    let record = getKeeperDriveRecord(storage, recordUid)
    if (!record) {
        throw new KeeperSdkError(`Nested share record not found: ${recordUid}`, ResultCodes.NSF_NOT_FOUND)
    }

    let title = getRecordTitle(record)
    if (UNKNOWN_RECORD_TITLES.has(title)) {
        const fallbackData = await fetchRecordDataFallback(auth, recordUid)
        if (fallbackData) {
            record = { ...record, data: fallbackData }
            title = getRecordTitle(record)
        }
    }

    const password = getRecordPassword(record)
    const [userPermissions, shareAdmins] = await Promise.all([
        fetchRecordPermissions(auth, recordUid),
        fetchRecordShareAdmins(auth, recordUid),
    ])
    const notes =
        typeof record.data?.notes === 'string' && record.data.notes.trim() ? record.data.notes.trim() : undefined

    return {
        objectType: 'record',
        recordUid,
        title,
        type: getRecordType(record),
        revision: record.revision,
        version: record.version,
        folderLocation: findRecordFolderLocation(storage, recordUid) || 'root',
        login: getRecordLogin(record) || undefined,
        password: password ? (unmask ? password : MASKED_VALUE) : undefined,
        url: getRecordUrl(record) || undefined,
        notes,
        fields: buildRecordFields(record, unmask),
        userPermissions,
        shareAdmins,
    }
}

export function resolveNsfFolder(storage: InMemoryStorage, identifier: string): string | undefined {
    return resolveByUidOrName(
        getKeeperDriveFolders(storage),
        identifier,
        (folder) => folder.uid,
        (folder) => folder.data.name || ''
    )?.uid
}

export function resolveNsfRecord(storage: InMemoryStorage, identifier: string): string | undefined {
    const trimmed = identifier.trim()
    if (!trimmed) return undefined
    return getKeeperDriveRecord(storage, trimmed)?.uid ?? resolveRecordByTitleSearch(storage, trimmed)?.uid
}

export async function getNestedShareFolder(
    storage: InMemoryStorage,
    auth: Auth,
    identifier: string,
    options: GetNsfOptions = {}
): Promise<GetNsfResult> {
    const trimmed = identifier.trim()
    if (!trimmed) {
        throw new KeeperSdkError('UID or title is required.', ResultCodes.NSF_NOT_FOUND)
    }

    const folderUid = resolveNsfFolder(storage, trimmed)
    if (folderUid) {
        return { kind: 'folder', view: buildFolderView(storage, folderUid) }
    }

    const recordUid = resolveNsfRecord(storage, trimmed)
    if (recordUid) {
        const view = await buildRecordView(auth, storage, recordUid, options.unmask ?? false)
        return { kind: 'record', view }
    }

    throw new KeeperSdkError(
        `Cannot find any Nested Share Folder object with UID or title: ${trimmed}`,
        ResultCodes.NSF_NOT_FOUND
    )
}

export function formatNsfFolderDetail(view: NsfFolderView, verbose = false): string {
    const lines = [
        folderDetailRow('Nested Share Folder UID', view.folderUid),
        folderDetailRow('Name', view.name),
        '',
        FOLDER_USER_PERMISSIONS_HEADING,
        ...view.userPermissions.map((entry) => `${entry.username}: ${entry.role}`),
        '',
        FOLDER_SHARE_ADMINS_HEADING,
        ...view.shareAdmins.map((entry) => `${entry.username}: ${entry.role}`),
    ]

    if (!verbose) return lines.join('\n')

    lines.push('', folderDetailRow('Parent UID', view.parentUid), folderDetailRow('Path', view.path))
    if (view.records.length > 0) {
        lines.push('', 'Records:')
        for (const record of view.records) {
            lines.push(`  ${record.uid}  ${record.title}  (${record.type})`)
        }
    }
    if (view.teamPermissions.length > 0) {
        lines.push('', 'Team Permissions:')
        for (const entry of view.teamPermissions) {
            lines.push(`  ${entry.accessTypeUid}  role=${entry.accessRoleType}`)
        }
    }
    return lines.join('\n')
}

export function formatNsfRecordDetail(view: NsfRecordView, verbose = false): string {
    const lines = [
        recordDetailRow('UID', view.recordUid),
        recordDetailRow('Type', view.type),
        recordDetailRow('Title', view.title),
    ]

    if (view.login) lines.push(recordDetailRow('Login', view.login))
    if (view.password) lines.push(recordDetailRow('Password', view.password))
    if (view.url) lines.push(recordDetailRow('Url', view.url))
    if (view.notes) lines.push(recordDetailRow('Notes', view.notes))

    for (const field of view.fields) {
        const label = field.label || field.type
        lines.push(recordDetailRow(label.charAt(0).toUpperCase() + label.slice(1), field.value))
    }

    if (view.userPermissions.length > 0) {
        lines.push('', RECORD_USER_PERMISSIONS_HEADING)
        for (const entry of view.userPermissions) {
            lines.push('', ...formatRecordUserPermissionBlock(entry))
        }
    }

    if (view.shareAdmins.length > 0) {
        lines.push('', `Share Admins (${view.shareAdmins.length}):`)
        for (const admin of view.shareAdmins) {
            lines.push(`  ${admin}`)
        }
    }

    if (verbose) {
        lines.push(
            '',
            recordDetailRow('Folder', view.folderLocation),
            recordDetailRow('Revision', String(view.revision)),
            recordDetailRow('Version', String(view.version))
        )
    }

    return lines.join('\n')
}

export function formatNsfDetail(result: GetNsfResult, verbose = false): string {
    return result.kind === 'folder'
        ? formatNsfFolderDetail(result.view, verbose)
        : formatNsfRecordDetail(result.view, verbose)
}

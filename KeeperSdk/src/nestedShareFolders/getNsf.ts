import type { Auth, DRecord, DKdFolder, DKdFolderAccess } from '@keeper-security/keeperapi'
import {
    Folder,
    Records,
    getRecordsDetailsMessage,
    getSharingAdminsMessage,
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
    getKeeperDriveRecord,
    isFolderShareAdministrator,
    isFolderUserPermission,
    isSensitiveFieldType,
    normalizeParentUid,
    resolveAccessUsername,
    resolveNsfFolderIdentifier,
    resolveNsfRecordIdentifier,
} from './nsfHelpers'
import {
    NSF_FOLDER_LABEL_WIDTH,
    NSF_FOLDER_SHARE_ADMINS_HEADING,
    NSF_FOLDER_USER_PERMISSIONS_HEADING,
    NSF_MASKED_VALUE,
    NSF_RECORD_LABEL_WIDTH,
    NSF_RECORD_USER_PERMISSIONS_HEADING,
    NSF_TOP_LEVEL_FIELD_TYPES,
    NSF_UNKNOWN_RECORD_TITLES,
} from './nsfConstants'

function longToNumber(value: number | { toNumber: () => number } | null | undefined): number | undefined {
    if (value == null) return undefined
    return typeof value === 'number' ? value : value.toNumber()
}

function formatNsfFieldParts(values: unknown[]): string[] {
    return values
        .filter((value) => value != null && value !== '')
        .map(formatNsfFieldValue)
        .filter((part) => part.length > 0)
}

function formatNsfFieldValue(value: unknown): string {
    if (value == null || value === '') return ''
    if (typeof value === 'string') return value
    if (typeof value === 'number' || typeof value === 'boolean') return String(value)
    if (Array.isArray(value)) {
        return formatNsfFieldParts(value).join(', ')
    }
    if (typeof value === 'object') {
        return formatNsfFieldParts(Object.values(value as Record<string, unknown>)).join(', ')
    }
    return String(value)
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
    return `${label.padStart(NSF_FOLDER_LABEL_WIDTH)}: ${value}`
}

function recordDetailRow(label: string, value: string): string {
    return `${label.padStart(NSF_RECORD_LABEL_WIDTH)}: ${value}`
}

function recordDetailsMessage(recordUid: string, include: Records.RecordDetailsInclude) {
    return getRecordsDetailsMessage({
        clientTime: Date.now(),
        recordUid: [normal64Bytes(recordUid)],
        recordDetailsInclude: include,
    })
}

function bytesToUid(bytes: Uint8Array | null | undefined): string | undefined {
    return bytes?.length ? webSafe64FromBytes(bytes) : undefined
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
    const userPermissions: NsfFolderAccessRow[] = []
    const shareAdmins: NsfFolderAccessRow[] = []
    const teamPermissions: NsfFolderPermission[] = []
    for (const entry of entries) {
        if (isFolderUserPermission(entry)) {
            userPermissions.push(buildFolderAccessRow(storage, folder, entry))
        }
        if (isFolderShareAdministrator(entry)) {
            shareAdmins.push(buildFolderAccessRow(storage, folder, entry))
        }
        if (entry.accessType === Folder.AccessType.AT_TEAM) {
            teamPermissions.push(mapFolderPermission(entry))
        }
    }
    return { userPermissions, shareAdmins, teamPermissions }
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
    return getRecordFields(record)
        .filter((field) => !NSF_TOP_LEVEL_FIELD_TYPES.has(field.type))
        .map((field) => {
            const rawValues = Array.isArray(field.value) ? field.value : [field.value]
            const displayValue = formatNsfFieldParts(rawValues).join(', ')
            return { field, displayValue }
        })
        .filter(({ displayValue }) => displayValue.length > 0)
        .map(({ field, displayValue }) => ({
            type: field.type,
            label: field.label,
            value: !unmask && isSensitiveFieldType(field.type) ? NSF_MASKED_VALUE : displayValue,
        }))
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
        const response = await auth.executeRest(
            getSharingAdminsMessage({ recordUid: normal64Bytes(recordUid) })
        )
        return (response.userProfileExts ?? [])
            .flatMap((ext) => (ext?.email ? [ext.email] : []))
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
        parentUid: normalizeParentUid(storage, folder.parentUid),
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
    if (NSF_UNKNOWN_RECORD_TITLES.has(title)) {
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
        password: password ? (unmask ? password : NSF_MASKED_VALUE) : undefined,
        url: getRecordUrl(record) || undefined,
        notes,
        fields: buildRecordFields(record, unmask),
        userPermissions,
        shareAdmins,
    }
}

export function resolveNsfFolder(storage: InMemoryStorage, identifier: string): string | undefined {
    return resolveNsfFolderIdentifier(storage, identifier)
}

export function resolveNsfRecord(storage: InMemoryStorage, identifier: string): string | undefined {
    const uid = resolveNsfRecordIdentifier(storage, identifier)
    if (!uid) return undefined
    return getKeeperDriveRecord(storage, uid)?.uid
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
        NSF_FOLDER_USER_PERMISSIONS_HEADING,
        ...view.userPermissions.map((entry) => `${entry.username}: ${entry.role}`),
        '',
        NSF_FOLDER_SHARE_ADMINS_HEADING,
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
        lines.push('', NSF_RECORD_USER_PERMISSIONS_HEADING)
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

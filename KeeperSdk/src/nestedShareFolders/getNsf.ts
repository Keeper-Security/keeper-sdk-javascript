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
import { KeeperSdkError, ResultCodes } from '../utils'
import {
    buildFolderPath,
    collectRecordsInFolder,
    fetchLiveRecordAccessEntries,
    getFolderAccessEntries,
    findNestedShareFoldersForRecord,
    findRecordFolderLocation,
    folderAccessDisplayRole,
    formatAccessType,
    getKeeperDriveFolder,
    getKeeperDriveRecord,
    isFolderOwnerAccessor,
    isFolderShareAdministrator,
    isFolderUserPermission,
    isRootFolderUid,
    isSensitiveFieldType,
    loadShareUserMap,
    recordAccessDisplayRole,
    resolveAccessUsername,
    resolveNsfFolderIdentifier,
    resolveNsfRecordIdentifier,
} from './nsfHelpers'
import {
    NSF_FOLDER_LABEL_WIDTH,
    NSF_FOLDER_PERMISSION_DISPLAY_ROWS,
    NSF_FOLDER_SHARE_ADMINS_HEADING,
    NSF_USER_PERMISSIONS_HEADING,
    NSF_MASKED_VALUE,
    NSF_RECORD_LABEL_WIDTH,
    NSF_RECORD_PERMISSION_DISPLAY_ROWS,
    NSF_SHARE_ADMINS_PREVIEW_LIMIT,
    NSF_TOP_LEVEL_FIELD_TYPES,
    NSF_UNKNOWN_RECORD_TITLES,
    getFolderPermissionFlagsForRoleLabel,
} from './nsfConstants'
import {
    GetNsfFormat,
    NsfAccessRoleLabel,
    NsfObjectKind,
    resolveRecordPermissionRole,
    type GetNsfFormatInput,
    type GetNsfOptions,
    type GetNsfResult,
    type NsfFolderAccessRow,
    type NsfFolderJsonView,
    type NsfFolderPermission,
    type NsfFolderView,
    type NsfRecordFieldView,
    type NsfRecordFolderView,
    type NsfRecordJsonUserPermission,
    type NsfRecordJsonView,
    type NsfRecordPermission,
    type NsfRecordView,
} from './nsfTypes'

export const NSF_UNMASK_WARNING = 'WARNING: Sensitive field values are displayed in plain text.'

function formatAsciiTable(headers: string[], rows: string[][]): string[] {
    if (rows.length === 0) return []
    const widths = headers.map((header, index) =>
        Math.max(header.length, ...rows.map((row) => (row[index] || '').length))
    )
    const pad = (cell: string, index: number) => cell + ' '.repeat(Math.max(0, widths[index] - cell.length))
    const formatRow = (cells: string[]) => cells.map((cell, index) => pad(cell, index)).join('  ')
    const rule = widths.map((width, index) => pad('-'.repeat(width), index)).join('  ')
    return [formatRow(headers), rule, ...rows.map(formatRow)]
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

function mapFolderPermission(entry: DKdFolderAccess): NsfFolderPermission {
    return {
        accessTypeUid: entry.accessTypeUid,
        accessType: formatAccessType(entry.accessType),
        accessRoleType: folderAccessDisplayRole(entry),
        inherited: entry.inherited,
        hidden: entry.hidden,
    }
}

function buildFolderAccessRow(
    storage: InMemoryStorage,
    folder: DKdFolder,
    entry: DKdFolderAccess,
    shareUsers: Map<string, string>
): NsfFolderAccessRow {
    const username = resolveAccessUsername(storage, entry.accessTypeUid, folder, shareUsers)
    const role = isFolderOwnerAccessor(folder, entry, username)
        ? NsfAccessRoleLabel.Owner
        : folderAccessDisplayRole(entry)
    return { username, role }
}

function splitFolderPermissions(
    storage: InMemoryStorage,
    folder: DKdFolder,
    entries: DKdFolderAccess[],
    shareUsers: Map<string, string>
) {
    const userPermissions: NsfFolderAccessRow[] = []
    const shareAdmins: NsfFolderAccessRow[] = []
    const teamPermissions: NsfFolderPermission[] = []

    for (const entry of entries) {
        if (isFolderUserPermission(entry)) {
            userPermissions.push(buildFolderAccessRow(storage, folder, entry, shareUsers))
        }
        if (isFolderShareAdministrator(entry)) {
            shareAdmins.push(buildFolderAccessRow(storage, folder, entry, shareUsers))
        }
        if (entry.accessType === Folder.AccessType.AT_TEAM) {
            teamPermissions.push(mapFolderPermission(entry))
        }
    }

    return { userPermissions, shareAdmins, teamPermissions }
}

function prependOwnerRow(rows: NsfFolderAccessRow[], ownerUsername: string): NsfFolderAccessRow[] {
    if (rows.some((entry) => entry.username === ownerUsername)) return rows
    return [{ username: ownerUsername, role: NsfAccessRoleLabel.Owner }, ...rows]
}

function ensureFolderOwnerListed(
    folder: DKdFolder,
    userPermissions: NsfFolderAccessRow[],
    shareAdmins: NsfFolderAccessRow[]
): {
    userPermissions: NsfFolderAccessRow[]
    shareAdmins: NsfFolderAccessRow[]
} {
    const ownerUsername = folder.ownerInfo?.username?.trim()
    if (!ownerUsername) return { userPermissions, shareAdmins }
    return {
        userPermissions: prependOwnerRow(userPermissions, ownerUsername),
        shareAdmins: prependOwnerRow(shareAdmins, ownerUsername),
    }
}

function fieldValueToStrings(values: unknown[], fieldType?: string): string[] {
    return values.map((value) => {
        if (value == null || value === '') return ''
        if (typeof value === 'string') return value
        if (typeof value === 'number' || typeof value === 'boolean') return String(value)
        if (typeof value === 'object') {
            const obj = value as Record<string, unknown>
            if (fieldType === 'host' || fieldType === 'address') {
                return JSON.stringify(obj)
            }
            if (typeof obj.url === 'string') return obj.url
            if (typeof obj.value === 'string') return obj.value
            return JSON.stringify(value)
        }
        return String(value)
    })
}

function resolveRecordFolder(storage: InMemoryStorage, recordUid: string): NsfRecordFolderView | undefined {
    const folderUids = findNestedShareFoldersForRecord(storage, recordUid)
    if (folderUids.length === 0) return undefined

    const uid = folderUids[0]
    return {
        uid,
        path: buildFolderPath(storage, uid).replace(/^\//, ''),
    }
}

function buildRecordFields(record: DRecord, unmask: boolean): NsfRecordFieldView[] {
    return getRecordFields(record).map((field) => {
        const rawValues = Array.isArray(field.value) ? field.value : [field.value]
        const stringValues = fieldValueToStrings(rawValues, field.type)
        const masked = !unmask && isSensitiveFieldType(field.type)
        return {
            type: field.type,
            label: field.label,
            value:
                masked && stringValues.some((value) => value.length > 0)
                    ? stringValues.map((value) => (value.length > 0 ? NSF_MASKED_VALUE : value))
                    : stringValues,
        }
    })
}

function formatRecordFieldDetailLines(field: NsfRecordFieldView): string[] {
    if (NSF_TOP_LEVEL_FIELD_TYPES.has(field.type)) return []

    if (field.type === 'host' || field.type === 'address') {
        const lines: string[] = []
        for (const part of field.value) {
            if (!part) continue
            let obj: Record<string, unknown> | undefined
            if (typeof part === 'string' && part.startsWith('{')) {
                try {
                    obj = JSON.parse(part) as Record<string, unknown>
                } catch {
                    obj = undefined
                }
            }
            if (obj) {
                if (obj.hostName != null && String(obj.hostName).length > 0) {
                    lines.push(recordDetailRow('HostName', String(obj.hostName)))
                }
                if (obj.port != null && String(obj.port).length > 0) {
                    lines.push(recordDetailRow('Port', String(obj.port)))
                }
                if (obj.street1 != null && String(obj.street1).length > 0) {
                    lines.push(recordDetailRow('Street', String(obj.street1)))
                }
                continue
            }
        }
        if (lines.length > 0) return lines
    }

    const displayValue = field.value.filter(Boolean).join(', ')
    if (!displayValue) return []
    const label = field.label || field.type
    return [recordDetailRow(label.charAt(0).toUpperCase() + label.slice(1), displayValue)]
}

function jsonFieldValues(type: string, value: string[], unmask = false): unknown[] {
    const masked = !unmask && isSensitiveFieldType(type)
    return value.map((part) => {
        if (masked && part.length > 0) return NSF_MASKED_VALUE
        if ((type === 'host' || type === 'address') && part.startsWith('{')) {
            try {
                return JSON.parse(part) as Record<string, unknown>
            } catch {
                return part
            }
        }
        return part
    })
}

function yn(value: boolean | undefined): string {
    return value ? 'Y' : 'N'
}

function formatPermissionValueTable(rows: readonly { label: string; value: boolean | undefined }[]): string[] {
    if (rows.length === 0) return []
    const tableRows = rows.map((row) => [row.label, yn(row.value)])
    return ['', ...formatAsciiTable(['Permission', 'Value'], tableRows)]
}

function formatFolderRolePermissionTable(role: string): string[] {
    const flags = getFolderPermissionFlagsForRoleLabel(role)
    return formatPermissionValueTable(
        NSF_FOLDER_PERMISSION_DISPLAY_ROWS.map(({ key, label }) => ({ label, value: !!flags[key] }))
    )
}

function formatRecordCapabilityPermissionTable(entry: NsfRecordPermission): string[] {
    const ownerDefaults = entry.owner
    return formatPermissionValueTable(
        NSF_RECORD_PERMISSION_DISPLAY_ROWS.map(({ key, label }) => {
            const fromEntry = entry[key]
            if (fromEntry !== undefined) return { label, value: fromEntry }
            if (ownerDefaults) return { label, value: key !== 'canRequestAccess' }
            return { label, value: false }
        })
    )
}

function pickPrimaryFolderRole(view: NsfFolderView): string {
    const owner = view.userPermissions.find((entry) => entry.role === NsfAccessRoleLabel.Owner)
    return (owner ?? view.userPermissions[0])?.role ?? NsfAccessRoleLabel.Viewer
}

function pickPrimaryRecordPermission(view: NsfRecordView): NsfRecordPermission | undefined {
    return view.userPermissions.find((entry) => entry.owner) ?? view.userPermissions[0]
}

export function toNsfRecordJsonView(
    view: NsfRecordView,
    options: { includeDag?: boolean; unmask?: boolean } = {}
): NsfRecordJsonView {
    const unmask = options.unmask ?? false
    const fields = view.fields
        .filter((field) => !NSF_TOP_LEVEL_FIELD_TYPES.has(field.type))
        .map(({ type, value }) => ({
            type,
            value: jsonFieldValues(type, value, unmask),
        }))

    return {
        record_uid: view.recordUid,
        title: view.title,
        type: view.type,
        version: view.version,
        revision: view.revision,
        folder: view.folder ?? { uid: '', path: view.folderLocation || '/' },
        fields,
        ...(view.notes ? { notes: view.notes } : {}),
        user_permissions: view.userPermissions.map((entry) => ({
            username: entry.username,
            owner: entry.owner,
            shareable: entry.shareable,
            editable: entry.editable,
            role: entry.owner ? NsfAccessRoleLabel.FullManager : resolveRecordPermissionRole(entry),
        })),
        share_admins: view.shareAdmins,
    }
}

export function toNsfFolderJsonView(view: NsfFolderView, options: { includeDag?: boolean } = {}): NsfFolderJsonView {
    const includeDag = options.includeDag ?? false
    const parentUid = view.parentUid?.trim() || ''
    const treatedAsRootParent = !parentUid || parentUid === 'root'

    const owner =
        view.userPermissions.find((entry) => entry.role === NsfAccessRoleLabel.Owner)?.username ||
        view.shareAdmins.find((entry) => entry.role === NsfAccessRoleLabel.Owner)?.username

    return {
        folder_uid: view.folderUid,
        type: 'nested_share_folder',
        name: view.name,
        parent_uid: treatedAsRootParent ? null : parentUid,
        folder: {
            uid: treatedAsRootParent ? null : parentUid,
            path: treatedAsRootParent ? '/' : view.path,
        },
        ...(owner ? { owner } : {}),
        path: view.path,
        records: view.records,
        user_permissions: view.userPermissions.map((entry) => ({
            accessor: entry.username,
            access_type: 'AT_USER',
            role: entry.role,
            inherited: false,
        })),
        share_admins: view.shareAdmins.map((entry) => entry.username),
        ...(includeDag || view.teamPermissions.length > 0 ? { team_permissions: view.teamPermissions } : {}),
    }
}

export function formatNsfRecordJson(
    view: NsfRecordView,
    options: { includeDag?: boolean; unmask?: boolean } = {}
): string {
    return JSON.stringify(toNsfRecordJsonView(view, options), null, 2)
}

export function formatNsfFolderJson(view: NsfFolderView, options: { includeDag?: boolean } = {}): string {
    return JSON.stringify(toNsfFolderJsonView(view, options), null, 2)
}

function formatRecordUserPermissionBlock(entry: NsfRecordPermission, verbose: boolean): string[] {
    if (verbose) return []
    const lines: string[] = []
    if (entry.username) lines.push(`  User: ${entry.username}`)
    else if (entry.accountUid) lines.push(`  User UID: ${entry.accountUid}`)
    if (entry.owner) lines.push('  Owner: Yes')
    else if (entry.role) lines.push(`  Role: ${entry.role}`)
    lines.push(`  Shareable: ${entry.shareable ? 'Yes' : 'No'}`)
    lines.push(`  Read-Only: ${entry.editable ? 'No' : 'Yes'}`)
    return lines
}

async function fetchRecordPermissions(
    auth: Auth,
    storage: InMemoryStorage,
    recordUid: string
): Promise<NsfRecordPermission[]> {
    const entries = await fetchLiveRecordAccessEntries(auth, storage, recordUid)
    return entries.map(({ username, accountUid, data }) => {
        const owner = !!data.owner
        return {
            username,
            accountUid,
            owner,
            shareAdmin: false,
            shareable: !!(data.canApproveAccess || data.canUpdateAccess),
            editable: !!data.canEdit,
            awaitingApproval: false,
            role: owner ? undefined : recordAccessDisplayRole(data),
            canViewTitle: data.canViewTitle ?? true,
            canView: !!data.canView,
            canEdit: !!data.canEdit,
            canListAccess: !!data.canListAccess,
            canUpdateAccess: !!data.canUpdateAccess,
            canDelete: !!data.canDelete,
            canChangeOwnership: !!data.canChangeOwnership,
            canRequestAccess: !!data.canRequestAccess,
            canApproveAccess: !!data.canApproveAccess,
        }
    })
}

async function fetchRecordShareAdmins(auth: Auth, recordUid: string): Promise<string[]> {
    try {
        const response = await auth.executeRest(getSharingAdminsMessage({ recordUid: normal64Bytes(recordUid) }))
        return (response.userProfileExts ?? [])
            .flatMap((ext) => (ext?.email ? [ext.email] : []))
            .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    } catch {
        return []
    }
}

async function fetchRecordDataFallback(auth: Auth, recordUid: string): Promise<DRecord['data'] | undefined> {
    try {
        const response = await auth.executeRest(recordDetailsMessage(recordUid, Records.RecordDetailsInclude.DATA_ONLY))
        return response.recordDataWithAccessInfo?.[0]?.recordData as DRecord['data'] | undefined
    } catch {
        return undefined
    }
}

async function buildFolderView(auth: Auth, storage: InMemoryStorage, folderUid: string): Promise<NsfFolderView> {
    const folder = getKeeperDriveFolder(storage, folderUid)
    if (!folder) {
        throw new KeeperSdkError(`Nested share folder not found: ${folderUid}`, ResultCodes.NSF_NOT_FOUND)
    }

    const entries = getFolderAccessEntries(storage, folderUid)
    const shareUsers = await loadShareUserMap(auth, storage)
    const split = splitFolderPermissions(storage, folder, entries, shareUsers)
    const { userPermissions, shareAdmins } = ensureFolderOwnerListed(folder, split.userPermissions, split.shareAdmins)

    return {
        objectType: NsfObjectKind.Folder,
        folderUid,
        name: folder.data.name || 'Unnamed',
        parentUid: isRootFolderUid(storage, folder.parentUid) ? 'root' : (folder.parentUid ?? '').trim(),
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
        fetchRecordPermissions(auth, storage, recordUid),
        fetchRecordShareAdmins(auth, recordUid),
    ])
    const notes =
        typeof record.data?.notes === 'string' && record.data.notes.trim() ? record.data.notes.trim() : undefined

    return {
        objectType: NsfObjectKind.Record,
        recordUid,
        title,
        type: getRecordType(record),
        revision: record.revision,
        version: record.version,
        folder: resolveRecordFolder(storage, recordUid),
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
        return {
            kind: NsfObjectKind.Folder,
            view: await buildFolderView(auth, storage, folderUid),
        }
    }

    const recordUid = resolveNsfRecord(storage, trimmed)
    if (recordUid) {
        const view = await buildRecordView(auth, storage, recordUid, options.unmask ?? false)
        return { kind: NsfObjectKind.Record, view }
    }

    throw new KeeperSdkError(
        `Cannot find any Nested Share Folder object with UID or title: ${trimmed}`,
        ResultCodes.NSF_NOT_FOUND
    )
}

export function formatNsfFolderDetail(view: NsfFolderView, verbose = false): string {
    const lines = [folderDetailRow('Nested Share Folder UID', view.folderUid), folderDetailRow('Name', view.name)]

    if (verbose) {
        lines.push(
            '',
            NSF_USER_PERMISSIONS_HEADING,
            ...view.userPermissions.map((entry) => `${entry.username}: ${entry.role}`),
            ...formatFolderRolePermissionTable(pickPrimaryFolderRole(view)),
            '',
            NSF_FOLDER_SHARE_ADMINS_HEADING,
            ...view.shareAdmins.map((entry) => `${entry.username}: ${entry.role}`),
            '',
            folderDetailRow('Parent UID', view.parentUid),
            folderDetailRow('Path', view.path)
        )
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

    lines.push(
        '',
        NSF_USER_PERMISSIONS_HEADING,
        ...view.userPermissions.map((entry) => `${entry.username}: ${entry.role}`),
        '',
        NSF_FOLDER_SHARE_ADMINS_HEADING,
        ...view.shareAdmins.map((entry) => `${entry.username}: ${entry.role}`)
    )
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
        lines.push(...formatRecordFieldDetailLines(field))
    }

    if (view.userPermissions.length > 0) {
        lines.push('', NSF_USER_PERMISSIONS_HEADING)
        for (const entry of view.userPermissions) {
            lines.push('', ...formatRecordUserPermissionBlock(entry, false))
        }
        if (verbose) {
            const primary = pickPrimaryRecordPermission(view)
            if (primary) lines.push(...formatRecordCapabilityPermissionTable(primary))
        }
    }

    if (view.shareAdmins.length > 0) {
        const total = view.shareAdmins.length
        const preview = view.shareAdmins.slice(0, NSF_SHARE_ADMINS_PREVIEW_LIMIT)
        const headingSuffix =
            total > NSF_SHARE_ADMINS_PREVIEW_LIMIT ? `, showing first ${NSF_SHARE_ADMINS_PREVIEW_LIMIT}` : ''
        lines.push('', `Share Admins (${total}${headingSuffix}):`)
        for (const admin of preview) {
            lines.push(`  ${admin}`)
        }
        if (total > NSF_SHARE_ADMINS_PREVIEW_LIMIT) {
            lines.push(`  ... and ${total - NSF_SHARE_ADMINS_PREVIEW_LIMIT} more`)
        }
    }

    if (verbose) {
        lines.push(
            '',
            recordDetailRow('Folder', view.folder?.path ?? view.folderLocation),
            recordDetailRow('Revision', String(view.revision)),
            recordDetailRow('Version', String(view.version))
        )
        if (view.folder?.uid) {
            lines.push(recordDetailRow('Folder UID', view.folder.uid))
        }
    }

    return lines.join('\n')
}

export function formatNsfDetail(result: GetNsfResult, verbose = false): string {
    return result.kind === NsfObjectKind.Folder
        ? formatNsfFolderDetail(result.view, verbose)
        : formatNsfRecordDetail(result.view, verbose)
}

export function formatNsfJson(result: GetNsfResult, options: { includeDag?: boolean; unmask?: boolean } = {}): string {
    if (result.kind === NsfObjectKind.Record) {
        return formatNsfRecordJson(result.view, options)
    }
    return formatNsfFolderJson(result.view, options)
}

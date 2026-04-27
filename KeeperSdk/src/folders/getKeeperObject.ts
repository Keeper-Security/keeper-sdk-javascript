import type {
    DRecord,
    DRecordMetadata,
    DSharedFolder,
    DSharedFolderFolder,
    DSharedFolderRecord,
    DSharedFolderUser,
    DTeam,
    DUserFolder,
} from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError } from '../utils'
import { getRecordFields, getRecordTitle, getRecordType, RecordVersion } from '../records/RecordUtils'
import { findParentFolderUid } from './changeDirectory'
import { sharedFolderFolderName, userFolderName } from './folderHelpers'

export const KEEPER_SENSITIVE_FIELD_TYPES = new Set([
    'password',
    'secret',
    'otp',
    'privateKey',
    'pinCode',
    'oneTimeCode',
    'keyPair',
    'licenseNumber',
])

export type GetKeeperObjectFormat = 'detail' | 'json' | 'password' | 'fields'

export type GetKeeperObjectForceType = 'folder' | 'team' | 'record'

export type GetKeeperObjectOptions = {
    type?: GetKeeperObjectForceType | null
    format?: GetKeeperObjectFormat
    unmask?: boolean
}

export type GetKeeperObjectResult =
    | GetKeeperRecordResult
    | GetKeeperFolderResult
    | GetKeeperSharedFolderResult
    | GetKeeperTeamResult

export type GetKeeperRecordResult = {
    objectType: 'record'
    format: GetKeeperObjectFormat
    uid: string
    title: string
    recordType: string
    version: number
    revision: number
    shared: boolean
    detail?: RecordDetailPayload
    json?: Record<string, unknown>
    password?: string
    fields?: { name: string; value: string }[]
}

type RecordDetailPayload = {
    legacy?: {
        login?: string
        password?: string
        url?: string
        notes?: string
        custom?: { name?: string; type?: string; value?: string }[]
    }
    typed?: {
        fields: { type: string; label: string; value: string }[]
        notes?: string
    }
    permissions?: {
        owner: boolean
        canShare: boolean
        canEdit: boolean
    }
}

export type GetKeeperFolderResult = {
    objectType: 'folder'
    format: GetKeeperObjectFormat
    folder_uid: string
    folder_type: 'user_folder' | 'shared_folder_folder'
    name: string
    parent_uid: string | null
    shared_folder_scope_uid?: string
    json?: Record<string, unknown>
}

export type GetKeeperSharedFolderResult = {
    objectType: 'shared_folder'
    format: GetKeeperObjectFormat
    shared_folder_uid: string
    name: string
    default_can_edit: boolean
    default_can_share: boolean
    default_manage_records: boolean
    default_manage_users: boolean
    record_permissions?: {
        record_uid: string
        can_edit: boolean
        can_share: boolean
        owner: boolean
    }[]
    user_permissions?: {
        account_username?: string
        manage_records: boolean
        manage_users: boolean
    }[]
    json?: Record<string, unknown>
}

export type GetKeeperTeamResult = {
    objectType: 'team'
    format: GetKeeperObjectFormat
    team_uid: string
    name: string
    restrict_edit: boolean
    restrict_view: boolean
    restrict_share: boolean
    json?: Record<string, unknown>
}

function findSharedFolder(storage: InMemoryStorage, needle: string): DSharedFolder | undefined {
    const t = needle.trim()
    for (const sf of storage.getAll<DSharedFolder>('shared_folder')) {
        if (sf.uid === t) return sf
    }
    for (const sf of storage.getAll<DSharedFolder>('shared_folder')) {
        const n = (sf.name || '').trim()
        if (n && n === t) return sf
    }
    const lower = t.toLowerCase()
    for (const sf of storage.getAll<DSharedFolder>('shared_folder')) {
        const n = (sf.name || '').trim()
        if (n && n.toLowerCase() === lower) return sf
    }
    return undefined
}

function findUserFolder(storage: InMemoryStorage, needle: string): DUserFolder | undefined {
    const t = needle.trim()
    for (const f of storage.getAll<DUserFolder>('user_folder')) {
        if (f.uid === t) return f
    }
    for (const f of storage.getAll<DUserFolder>('user_folder')) {
        const n = userFolderName(f)
        if (n === t) return f
    }
    const lower = t.toLowerCase()
    for (const f of storage.getAll<DUserFolder>('user_folder')) {
        if (userFolderName(f).toLowerCase() === lower) return f
    }
    return undefined
}

function findSharedFolderFolder(storage: InMemoryStorage, needle: string): DSharedFolderFolder | undefined {
    const t = needle.trim()
    for (const f of storage.getAll<DSharedFolderFolder>('shared_folder_folder')) {
        if (f.uid === t) return f
    }
    for (const f of storage.getAll<DSharedFolderFolder>('shared_folder_folder')) {
        const n = sharedFolderFolderName(f)
        if (n === t) return f
    }
    const lower = t.toLowerCase()
    for (const f of storage.getAll<DSharedFolderFolder>('shared_folder_folder')) {
        if (sharedFolderFolderName(f).toLowerCase() === lower) return f
    }
    return undefined
}

function findTeam(storage: InMemoryStorage, needle: string): DTeam | undefined {
    const t = needle.trim()
    for (const team of storage.getAll<DTeam>('team')) {
        if (team.uid === t) return team
    }
    for (const team of storage.getAll<DTeam>('team')) {
        if (team.name === t) return team
    }
    const lower = t.toLowerCase()
    for (const team of storage.getAll<DTeam>('team')) {
        if (team.name.toLowerCase() === lower) return team
    }
    return undefined
}

function findRecord(storage: InMemoryStorage, needle: string): DRecord | undefined {
    const t = needle.trim()
    for (const r of storage.getRecords()) {
        if (r.uid === t) return r
    }
    for (const r of storage.getRecords()) {
        if (getRecordTitle(r) === t) return r
    }
    const lower = t.toLowerCase()
    for (const r of storage.getRecords()) {
        if (getRecordTitle(r).toLowerCase() === lower) return r
    }
    return undefined
}

function maskValue(type: string, raw: string, unmask: boolean): string {
    if (unmask) return raw
    if (KEEPER_SENSITIVE_FIELD_TYPES.has(type)) return '********'
    return raw
}

function fieldValueToString(field: { type: string; value: unknown[] }): string {
    return field.value
        .map((v) => {
            if (typeof v === 'string') return v
            if (v && typeof v === 'object') return JSON.stringify(v)
            return String(v)
        })
        .filter(Boolean)
        .join(', ')
}

function buildRecordDetail(record: DRecord, meta: DRecordMetadata | undefined, unmask: boolean): RecordDetailPayload {
    if (record.version <= RecordVersion.Legacy) {
        const d = record.data as {
            secret1?: string
            secret2?: string
            link?: string
            notes?: string
            custom?: { name?: string; type?: string; value?: string }[]
        }
        const password = d.secret2 === undefined || d.secret2 === '' ? undefined : unmask ? d.secret2 : '********'
        return {
            legacy: {
                login: d.secret1,
                password,
                url: d.link,
                notes: d.notes,
                custom: d.custom?.map((c) => ({
                    ...c,
                    value: c.type && KEEPER_SENSITIVE_FIELD_TYPES.has(c.type) && !unmask ? '********' : (c.value ?? ''),
                })),
            },
            permissions: meta ? { owner: meta.owner, canShare: meta.canShare, canEdit: meta.canEdit } : undefined,
        }
    }

    const fields = getRecordFields(record)
    const typedFields = fields.map((f) => {
        const raw = fieldValueToString(f)
        const masked = maskValue(f.type, raw, unmask)
        return {
            type: f.type,
            label: f.label || f.type,
            value: masked,
        }
    })

    const notes = (record.data as { notes?: string } | undefined)?.notes
    return {
        typed: { fields: typedFields, notes },
        permissions: meta ? { owner: meta.owner, canShare: meta.canShare, canEdit: meta.canEdit } : undefined,
    }
}

function getRecordPasswordPlain(record: DRecord): string {
    if (record.version <= RecordVersion.Legacy) {
        const d = record.data as { secret2?: string }
        return d.secret2 || ''
    }
    const fields = getRecordFields(record)
    const pw = fields.find((f) => f.type === 'password')
    return pw ? fieldValueToString(pw) : ''
}

function buildFieldsArray(record: DRecord, unmask: boolean): { name: string; value: string }[] {
    const title = getRecordTitle(record)
    const rows: { name: string; value: string }[] = [
        { name: 'title', value: title },
        { name: 'record_uid', value: record.uid },
        { name: 'revision', value: String(record.revision) },
        { name: 'version', value: String(record.version) },
    ]

    if (record.version <= RecordVersion.Legacy) {
        const d = record.data as {
            secret1?: string
            secret2?: string
            link?: string
            notes?: string
            custom?: { name?: string; type?: string; value?: string }[]
        }
        if (d.secret1) rows.push({ name: 'login', value: d.secret1 })
        if (d.secret2) {
            rows.push({
                name: 'password',
                value: unmask ? d.secret2 : '********',
            })
        }
        if (d.link) rows.push({ name: 'url', value: d.link })
        if (d.notes) rows.push({ name: 'notes', value: d.notes })
        if (d.custom) {
            for (const c of d.custom) {
                const v = c.type && KEEPER_SENSITIVE_FIELD_TYPES.has(c.type) && !unmask ? '********' : c.value || ''
                rows.push({ name: c.name || c.type || 'custom', value: v })
            }
        }
        return rows
    }

    for (const f of getRecordFields(record)) {
        const raw = fieldValueToString(f)
        const v = maskValue(f.type, raw, unmask)
        rows.push({ name: f.label || f.type, value: v })
    }
    const notes = (record.data as { notes?: string })?.notes
    if (notes) rows.push({ name: 'notes', value: notes })
    return rows
}

async function formatFolderResult(
    storage: InMemoryStorage,
    folder: DUserFolder | DSharedFolderFolder,
    format: GetKeeperObjectFormat
): Promise<GetKeeperFolderResult> {
    const isUser = folder.kind === 'user_folder'
    const folder_uid = folder.uid
    const folder_type = isUser ? 'user_folder' : 'shared_folder_folder'
    const name = isUser ? userFolderName(folder) : sharedFolderFolderName(folder)
    const parent_uid = await findParentFolderUid(storage, folder_uid)
    const base: GetKeeperFolderResult = {
        objectType: 'folder',
        format,
        folder_uid,
        folder_type,
        name,
        parent_uid,
    }
    if (!isUser) {
        base.shared_folder_scope_uid = (folder as DSharedFolderFolder).sharedFolderUid
    }
    if (format === 'json') {
        base.json = { ...base, objectType: 'folder' }
    }
    return base
}

function formatSharedFolderResult(
    storage: InMemoryStorage,
    sf: DSharedFolder,
    format: GetKeeperObjectFormat
): GetKeeperSharedFolderResult {
    const sfUid = sf.uid
    const recordPerms = storage
        .getAll<DSharedFolderRecord>('shared_folder_record')
        .filter((r) => r.sharedFolderUid === sfUid)
        .map((r) => ({
            record_uid: r.recordUid,
            can_edit: r.canEdit,
            can_share: r.canShare,
            owner: r.owner,
        }))
    const userPerms = storage
        .getAll<DSharedFolderUser>('shared_folder_user')
        .filter((u) => u.sharedFolderUid === sfUid)
        .map((u) => ({
            account_username: u.accountUsername,
            manage_records: u.manageRecords,
            manage_users: u.manageUsers,
        }))

    const base: GetKeeperSharedFolderResult = {
        objectType: 'shared_folder',
        format,
        shared_folder_uid: sf.uid,
        name: (sf.name || '').trim() || sf.uid,
        default_can_edit: sf.defaultCanEdit,
        default_can_share: sf.defaultCanShare,
        default_manage_records: sf.defaultManageRecords,
        default_manage_users: sf.defaultManageUsers,
        record_permissions: recordPerms.length ? recordPerms : undefined,
        user_permissions: userPerms.length ? userPerms : undefined,
    }
    if (format === 'json') {
        base.json = { ...base, objectType: 'shared_folder' }
    }
    return base
}

function formatTeamResult(team: DTeam, format: GetKeeperObjectFormat): GetKeeperTeamResult {
    const base: GetKeeperTeamResult = {
        objectType: 'team',
        format,
        team_uid: team.uid,
        name: team.name,
        restrict_edit: team.restrictEdit,
        restrict_view: team.restrictView,
        restrict_share: team.restrictShare,
    }
    if (format === 'json') {
        base.json = { ...base, objectType: 'team' }
    }
    return base
}

async function resolveTarget(
    storage: InMemoryStorage,
    uidOrTitle: string,
    force: GetKeeperObjectForceType | null | undefined
): Promise<
    | { kind: 'record'; record: DRecord }
    | { kind: 'folder_user'; folder: DUserFolder }
    | { kind: 'folder_sff'; folder: DSharedFolderFolder }
    | { kind: 'shared_folder'; sf: DSharedFolder }
    | { kind: 'team'; team: DTeam }
    | null
> {
    const needle = uidOrTitle.trim()
    if (!needle) return null

    if (force === 'record') {
        const record = findRecord(storage, needle)
        return record ? { kind: 'record', record } : null
    }
    if (force === 'team') {
        const team = findTeam(storage, needle)
        return team ? { kind: 'team', team } : null
    }
    if (force === 'folder') {
        const sf = findSharedFolder(storage, needle)
        if (sf) return { kind: 'shared_folder', sf }
        const uf = findUserFolder(storage, needle)
        if (uf) return { kind: 'folder_user', folder: uf }
        const sff = findSharedFolderFolder(storage, needle)
        return sff ? { kind: 'folder_sff', folder: sff } : null
    }

    const sf = findSharedFolder(storage, needle)
    if (sf) return { kind: 'shared_folder', sf }
    const uf = findUserFolder(storage, needle)
    if (uf) return { kind: 'folder_user', folder: uf }
    const sff = findSharedFolderFolder(storage, needle)
    if (sff) return { kind: 'folder_sff', folder: sff }
    const team = findTeam(storage, needle)
    if (team) return { kind: 'team', team }
    const record = findRecord(storage, needle)
    return record ? { kind: 'record', record } : null
}

async function buildRecordResult(
    storage: InMemoryStorage,
    record: DRecord,
    format: GetKeeperObjectFormat,
    unmask: boolean
): Promise<GetKeeperRecordResult> {
    const meta = storage.getByUid<DRecordMetadata>('metadata', record.uid)
    const title = getRecordTitle(record)
    const recordType = getRecordType(record)

    const base: GetKeeperRecordResult = {
        objectType: 'record',
        format,
        uid: record.uid,
        title,
        recordType,
        version: record.version,
        revision: record.revision,
        shared: !!record.shared,
    }

    if (format === 'password') {
        base.password = getRecordPasswordPlain(record)
        return base
    }

    if (format === 'fields') {
        base.fields = buildFieldsArray(record, unmask)
        return base
    }

    base.detail = buildRecordDetail(record, meta, unmask)

    if (format === 'json') {
        base.json = {
            objectType: 'record',
            uid: record.uid,
            title,
            recordType,
            version: record.version,
            revision: record.revision,
            shared: record.shared,
            detail: JSON.parse(JSON.stringify(base.detail)) as Record<string, unknown>,
        }
    }

    return base
}

export async function getKeeperObject(
    storage: InMemoryStorage,
    uidOrTitle: string,
    options: GetKeeperObjectOptions = {}
): Promise<GetKeeperObjectResult> {
    const trimmed = uidOrTitle.trim()
    if (!trimmed) {
        throw new KeeperSdkError('UID or title is required.', 'missing_uid_or_title')
    }

    const format: GetKeeperObjectFormat = options.format ?? 'detail'
    const unmask = options.unmask === true

    const target = await resolveTarget(storage, trimmed, options.type ?? null)
    if (!target) {
        throw new KeeperSdkError(`"${trimmed}" not found as any Keeper object`, 'keeper_object_not_found')
    }

    switch (target.kind) {
        case 'record':
            return buildRecordResult(storage, target.record, format, unmask)
        case 'folder_user':
            return formatFolderResult(storage, target.folder, format)
        case 'folder_sff':
            return formatFolderResult(storage, target.folder, format)
        case 'shared_folder':
            return formatSharedFolderResult(storage, target.sf, format)
        case 'team':
            return formatTeamResult(target.team, format)
    }
}

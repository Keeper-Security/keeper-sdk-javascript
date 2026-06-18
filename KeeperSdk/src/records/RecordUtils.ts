import type { DRecord } from '@keeper-security/keeperapi'
import { getTotpCode } from './Totp'

enum FieldType {
    Login = 'login',
    Password = 'password',
    Url = 'url',
    Note = 'note',
    Text = 'text',
}

export enum RecordVersion {
    Legacy = 2,
    Typed = 3,
}

const TOTP_FIELD_TYPES = new Set<string>(['totp', 'oneTimeCode', 'otp'])
const MASKED_VALUE = '********'
const RECORD_SEPARATOR = '-'.repeat(50)

type RecordField = {
    type: string
    value: any[]
    label?: string
    required?: boolean
    privacyScreen?: boolean
    enforceGeneration?: boolean
    complexity?: {
        length?: number
        caps?: number
        lowercase?: number
        digits?: number
        special?: number
    }
}

type LegacyExtraField = {
    type?: string
    field_type?: string
    value?: unknown
    data?: unknown
    label?: string
    field_title?: string
}

function toFieldValueArray(v: unknown): any[] {
    if (v == null || v === '') return []
    return Array.isArray(v) ? v : [v]
}

function normalizeTypedFieldValue(value: unknown): any[] {
    if (value == null || value === '') return []
    if (Array.isArray(value)) return value
    return [value]
}

function fieldHasValue(field: RecordField): boolean {
    return field.value.some((v) => extractTotpUrlFromValue(v) != null || formatRawFieldValue(v).length > 0)
}

function formatRawFieldValue(v: unknown): string {
    if (v == null) return ''
    if (typeof v === 'string') return v.trim()
    if (typeof v === 'number' || typeof v === 'boolean') return String(v)
    return JSON.stringify(v)
}

/** Extract otpauth URL or raw TOTP secret from a field value. */
function extractTotpUrlFromValue(v: unknown): string | undefined {
    if (v == null) return undefined
    if (typeof v === 'string') {
        const trimmed = v.trim()
        return trimmed || undefined
    }
    if (typeof v === 'object' && !Array.isArray(v)) {
        const obj = v as Record<string, unknown>
        for (const key of ['url', 'otpauth', 'otpAuth', 'totp', 'value', 'data', 'secret']) {
            const val = obj[key]
            if (typeof val === 'string' && val.trim()) return val.trim()
        }
    }
    return undefined
}

function getExtraTotpUrl(record: DRecord): string | undefined {
    for (const field of getLegacyExtraFields(record)) {
        if (field.type !== 'totp') continue
        for (const v of field.value) {
            const url = extractTotpUrlFromValue(v)
            if (url) return url
        }
    }
    return undefined
}

function getLegacyExtraFields(record: DRecord): RecordField[] {
    const raw = record.extra
    if (raw == null) return []
    let extra: { fields?: LegacyExtraField[] }
    if (typeof raw === 'string') {
        try {
            extra = JSON.parse(raw)
        } catch {
            return []
        }
    } else if (typeof raw === 'object') {
        extra = raw
    } else {
        return []
    }
    if (!Array.isArray(extra.fields)) return []
    const out: RecordField[] = []
    for (const f of extra.fields) {
        const typeName = f.type || f.field_type || FieldType.Text
        const rawVal = f.value !== undefined && f.value !== null ? f.value : f.data
        out.push({
            type: typeName,
            value: toFieldValueArray(rawVal),
            label: f.label || f.field_title,
        })
    }
    return out
}

export function getRecordTitle(record: DRecord): string {
    if (!record.data) return '(no data)'
    if (typeof record.data === 'string') {
        try {
            const parsed = JSON.parse(record.data)
            return parsed.title || '(untitled)'
        } catch {
            return '(parse error)'
        }
    }
    return record.data.title || '(untitled)'
}

export function getRecordType(record: DRecord): string {
    if (record.version <= RecordVersion.Legacy) return 'legacy'
    if (!record.data) return 'unknown'
    return record.data.type || 'unknown'
}

export function getRecordFields(record: DRecord): RecordField[] {
    if (!record.data) return []

    if (record.version <= RecordVersion.Legacy) {
        const fields: RecordField[] = []
        const d = record.data
        if (d.secret1) fields.push({ type: FieldType.Login, value: [d.secret1] })
        if (d.secret2) fields.push({ type: FieldType.Password, value: [d.secret2] })
        if (d.link) fields.push({ type: FieldType.Url, value: [d.link] })
        if (d.notes) fields.push({ type: FieldType.Note, value: [d.notes] })
        if (Array.isArray(d.custom)) {
            for (const c of d.custom) {
                if (!c) continue
                fields.push({
                    type: c.type || FieldType.Text,
                    value: c.value != null && c.value !== '' ? [c.value] : [],
                    label: c.name,
                })
            }
        }
        const extraFields = getLegacyExtraFields(record)
        fields.push(...extraFields)
        return fields
    }

    const fields: RecordField[] = []
    if (Array.isArray(record.data.fields)) {
        for (const f of record.data.fields) {
            fields.push({
                type: f.type || FieldType.Text,
                value: normalizeTypedFieldValue(f.value),
                label: f.label,
                required: f.required,
                privacyScreen: f.privacyScreen,
                enforceGeneration: f.enforceGeneration,
                complexity: f.complexity,
            })
        }
    }
    if (Array.isArray(record.data.custom)) {
        for (const f of record.data.custom) {
            fields.push({
                type: f.type || FieldType.Text,
                value: normalizeTypedFieldValue(f.value),
                label: f.label,
                required: f.required,
                privacyScreen: f.privacyScreen,
                enforceGeneration: f.enforceGeneration,
                complexity: f.complexity,
            })
        }
    }
    return fields
}

export type RecordSummary = {
    login?: string
    password?: string
    url?: string
    fields: RecordField[]
}

export function getRecordSummary(record: DRecord): RecordSummary {
    const fields = getRecordFields(record)
    if (record.version <= RecordVersion.Legacy) {
        return {
            login: record.data?.secret1,
            password: record.data?.secret2,
            url: record.data?.link,
            fields,
        }
    }

    let login: string | undefined
    let password: string | undefined
    let url: string | undefined

    for (const f of fields) {
        if (!login && f.type === FieldType.Login && f.value.length > 0) {
            login = String(f.value[0])
        } else if (!password && f.type === FieldType.Password && f.value.length > 0) {
            password = String(f.value[0])
        } else if (!url && f.type === FieldType.Url && f.value.length > 0) {
            const val = f.value[0]
            url = typeof val === 'string' ? val : val?.value || val?.url
        }
    }

    return { login, password, url, fields }
}

export function getRecordTotpUrl(record: DRecord): string | undefined {
    for (const field of getRecordFields(record)) {
        if (!TOTP_FIELD_TYPES.has(field.type)) continue
        for (const v of field.value) {
            const url = extractTotpUrlFromValue(v)
            if (url) return url
        }
    }
    return getExtraTotpUrl(record)
}

export function getRecordPassword(record: DRecord): string | undefined {
    return getRecordSummary(record).password
}

export function getRecordLogin(record: DRecord): string | undefined {
    return getRecordSummary(record).login
}

export function getRecordUrl(record: DRecord): string | undefined {
    return getRecordSummary(record).url
}

export function getRecordDescription(record: DRecord): string {
    if (record.version === 6) return 'PAM Configuration'

    const summary = getRecordSummary(record)
    const parts: string[] = []
    if (summary.login) parts.push(summary.login)
    if (summary.url) parts.push(summary.url)
    return parts.length > 0 ? parts.join(' @ ') : ''
}

export function getRecordCategory(record: DRecord): 'Classic' | 'Nested' {
    return record.isKeeperDriveData ? 'Nested' : 'Classic'
}

const wordCache = new WeakMap<DRecord, string[]>()

export function searchRecords(records: DRecord[], criteria: string): DRecord[] {
    const trimmed = criteria.trim()
    if (!trimmed) return records

    const searchWords = trimmed
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 0)

    return records.filter((record) => {
        const uidLower = record.uid?.toLowerCase() ?? ''
        if (uidLower && searchWords.every((sw) => uidLower.includes(sw))) {
            return true
        }

        let words = wordCache.get(record)
        if (!words) {
            words = collectRecordWords(record)
            wordCache.set(record, words)
        }
        return searchWords.every((sw) => words!.some((w) => w.includes(sw)))
    })
}

function collectRecordWords(record: DRecord): string[] {
    const words: string[] = []
    const title = getRecordTitle(record)
    if (title) words.push(...title.toLowerCase().split(/\s+/))

    for (const field of getRecordFields(record)) {
        if (field.label) words.push(field.label.toLowerCase())
        for (const v of field.value) {
            if (typeof v === 'string') {
                words.push(...v.toLowerCase().split(/\s+/))
            } else if (v && typeof v === 'object') {
                for (const val of Object.values(v)) {
                    if (typeof val === 'string') {
                        words.push(...val.toLowerCase().split(/\s+/))
                    }
                }
            }
        }
    }

    words.push(record.uid.toLowerCase())
    return words
}

export type FormatRecordOptions = {
    showDetails?: boolean
    unmask?: boolean
}

function resolveFormatRecordOptions(showDetailsOrOptions?: boolean | FormatRecordOptions): {
    showDetails: boolean
    unmask: boolean
} {
    if (typeof showDetailsOrOptions === 'boolean') {
        return { showDetails: showDetailsOrOptions, unmask: false }
    }
    return {
        showDetails: showDetailsOrOptions?.showDetails ?? false,
        unmask: showDetailsOrOptions?.unmask ?? false,
    }
}

function formatFieldValue(field: RecordField, unmask: boolean): string {
    if (!fieldHasValue(field)) return ''
    const isTotp = TOTP_FIELD_TYPES.has(field.type)
    const isSensitive = field.type === FieldType.Password || isTotp || field.privacyScreen === true
    if (!isSensitive || unmask) {
        return field.value.map((v) => formatRawFieldValue(v)).filter(Boolean).join(', ')
    }
    return MASKED_VALUE
}

function appendTotpFields(
    fields: { name: string; value: unknown }[],
    record: DRecord,
    unmask: boolean
): void {
    const totpUrl = getRecordTotpUrl(record)
    if (!totpUrl) return
    fields.push({ name: 'TOTP URL', value: unmask ? totpUrl : MASKED_VALUE })
    const code = getTotpCode(totpUrl)
    if (code) {
        fields.push({
            name: 'Two Factor Code',
            value: `${code.code} (valid for ${code.secondsRemaining} sec)`,
        })
    }
}

export function formatRecordFields(record: DRecord, unmask: boolean): { name: string; value: unknown }[] {
    const summary = getRecordSummary(record)
    const fields: { name: string; value: unknown }[] = [
        { name: 'title', value: getRecordTitle(record) },
        { name: 'record_uid', value: record.uid },
        { name: 'version', value: record.version },
        { name: 'record_type', value: getRecordType(record) },
    ]
    if (summary.login) fields.push({ name: 'login', value: summary.login })
    if (summary.password) {
        fields.push({
            name: 'password',
            value: unmask ? summary.password : MASKED_VALUE,
        })
    }
    if (summary.url) fields.push({ name: 'login_url', value: summary.url })
    for (const field of summary.fields) {
        if (field.type === FieldType.Login || field.type === FieldType.Url) continue
        if (field.type === FieldType.Password) continue
        if (TOTP_FIELD_TYPES.has(field.type)) continue
        if (!fieldHasValue(field)) continue
        const label = (field.label || field.type).replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
        fields.push({ name: label, value: formatFieldValue(field, unmask) })
    }
    appendTotpFields(fields, record, unmask)
    const notes = record.version <= RecordVersion.Legacy ? record.data?.notes : undefined
    if (notes) fields.push({ name: 'Notes', value: notes })
    return fields
}

export function formatRecord(record: DRecord, showDetailsOrOptions?: boolean | FormatRecordOptions): string {
    const { showDetails, unmask } = resolveFormatRecordOptions(showDetailsOrOptions)
    const summary = getRecordSummary(record)
    const lines: string[] = [
        RECORD_SEPARATOR,
        `Title: ${getRecordTitle(record)}`,
        `Record UID: ${record.uid}`,
        `Record Type: ${getRecordType(record)}`,
    ]

    if (summary.login) lines.push(`Username: ${summary.login}`)
    if (summary.url) lines.push(`URL: ${summary.url}`)
    if (summary.password) {
        lines.push(`Password: ${unmask ? summary.password : MASKED_VALUE}`)
    }

    if (showDetails) {
        for (const field of summary.fields) {
            if (field.type === FieldType.Login || field.type === FieldType.Url) continue
            if (field.type === FieldType.Password) continue
            if (TOTP_FIELD_TYPES.has(field.type)) continue
            if (!fieldHasValue(field)) continue
            const label = field.label || field.type
            const value = formatFieldValue(field, unmask)
            if (value) lines.push(`${label}: ${value}`)
        }

        const totpUrl = getRecordTotpUrl(record)
        if (totpUrl) {
            lines.push(`TOTP URL: ${unmask ? totpUrl : MASKED_VALUE}`)
            const code = getTotpCode(totpUrl)
            if (code) {
                lines.push(`Two Factor Code: ${code.code}    valid for ${code.secondsRemaining} sec`)
            }
        }
    }

    return lines.join('\n')
}

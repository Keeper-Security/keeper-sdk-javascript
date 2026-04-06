import type { DRecord } from '@keeper-security/keeperapi'

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

type RecordField = {
    type: string
    value: any[]
    label?: string
}

// Handles both legacy (v1/v2) and modern (v3+) record formats.
export function getRecordTitle(record: DRecord): string {
    if (!record.data) return '(no data)'
    if (typeof record.data === 'string') {
        try {
            const parsed = JSON.parse(record.data)
            return parsed.title || parsed.name || '(untitled)'
        } catch {
            return '(parse error)'
        }
    }
    return record.data.title || record.data.name || '(untitled)'
}

export function getRecordType(record: DRecord): string {
    if (record.version <= RecordVersion.Legacy) return 'legacy'
    if (!record.data) return 'unknown'
    return record.data.type || 'unknown'
}

// Returns an empty array for legacy records.
export function getRecordFields(record: DRecord): RecordField[] {
    if (!record.data) return []

    if (record.version <= RecordVersion.Legacy) {
        const fields: RecordField[] = []
        const d = record.data
        if (d.secret1) fields.push({ type: FieldType.Login, value: [d.secret1] })
        if (d.secret2) fields.push({ type: FieldType.Password, value: [d.secret2] })
        if (d.link) fields.push({ type: FieldType.Url, value: [d.link] })
        if (d.notes) fields.push({ type: FieldType.Note, value: [d.notes] })
        return fields
    }

    const fields: RecordField[] = []
    if (Array.isArray(record.data.fields)) {
        for (const f of record.data.fields) {
            fields.push({
                type: f.type || FieldType.Text,
                value: Array.isArray(f.value) ? f.value : [f.value],
                label: f.label,
            })
        }
    }
    if (Array.isArray(record.data.custom)) {
        for (const f of record.data.custom) {
            fields.push({
                type: f.type || FieldType.Text,
                value: Array.isArray(f.value) ? f.value : [f.value],
                label: f.label,
            })
        }
    }
    return fields
}

export function getRecordPassword(record: DRecord): string | undefined {
    if (record.version <= RecordVersion.Legacy) {
        return record.data?.secret2
    }
    const fields = getRecordFields(record)
    const pwField = fields.find((f) => f.type === FieldType.Password)
    if (pwField && pwField.value.length > 0) {
        return String(pwField.value[0])
    }
    return undefined
}

export function getRecordLogin(record: DRecord): string | undefined {
    if (record.version <= RecordVersion.Legacy) {
        return record.data?.secret1
    }
    const fields = getRecordFields(record)
    const loginField = fields.find((f) => f.type === FieldType.Login)
    if (loginField && loginField.value.length > 0) {
        return String(loginField.value[0])
    }
    return undefined
}

export function getRecordUrl(record: DRecord): string | undefined {
    if (record.version <= RecordVersion.Legacy) {
        return record.data?.link
    }
    const fields = getRecordFields(record)
    const urlField = fields.find((f) => f.type === FieldType.Url)
    if (urlField && urlField.value.length > 0) {
        const val = urlField.value[0]
        return typeof val === 'string' ? val : val?.value || val?.url
    }
    return undefined
}

export function searchRecords(records: DRecord[], criteria: string): DRecord[] {
    if (!criteria.trim()) return records

    const searchWords = criteria.toLowerCase().split(/\s+/)

    return records.filter((record) => {
        const words = collectRecordWords(record)
        return searchWords.every((sw) => words.some((w) => w.includes(sw)))
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

    words.push(record.uid)
    return words
}

export function formatRecord(record: DRecord, showDetails = false): string {
    const title = getRecordTitle(record)
    const type = getRecordType(record)
    const lines: string[] = []

    lines.push('-'.repeat(50))
    lines.push(`Title: ${title}`)
    lines.push(`Record UID: ${record.uid}`)
    lines.push(`Record Type: ${type}`)

    const login = getRecordLogin(record)
    const url = getRecordUrl(record)

    if (login) lines.push(`Username: ${login}`)
    if (url) lines.push(`URL: ${url}`)

    if (showDetails) {
        const fields = getRecordFields(record)
        for (const field of fields) {
            if (field.type === FieldType.Login || field.type === FieldType.Url) continue
            const label = field.label || field.type
            const value = field.type === FieldType.Password ? '********' : field.value.join(', ')
            lines.push(`${label}: ${value}`)
        }
    }

    return lines.join('\n')
}

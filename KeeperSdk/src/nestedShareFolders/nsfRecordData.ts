import { platform } from '@keeper-security/keeperapi'
import { NSF_KNOWN_FIELD_TYPES, NSF_LEGACY_RECORD_TYPES, NSF_STRUCTURED_SUBKEYS } from './nsfConstants'

const MIN_RECORD_PAD_BYTES = 384
const PAD_BLOCK_SIZE = 16

export type RecordFieldEntry = {
    type: string
    label?: string
    value: unknown[]
}

export type BuildNsfRecordDataInput = {
    title: string
    recordType: string
    notes?: string
    fieldEntries?: RecordFieldEntry[]
    customEntries?: RecordFieldEntry[]
}

export type ParsedNsfFields = {
    fieldEntries: RecordFieldEntry[]
    customEntries: RecordFieldEntry[]
    hasFileFields: boolean
}

/** @deprecated Use ParsedNsfFields */
export type ParsedNsfFieldStrings = ParsedNsfFields

type NsfFieldValue = string | string[] | Record<string, unknown> | Record<string, unknown>[]

type FieldAssignment = {
    section: 'fields' | 'custom'
    fieldType: string
    fieldLabel: string
    value: NsfFieldValue
}

type ParsedFieldKey = {
    section: 'fields' | 'custom'
    fieldType: string
    fieldLabel: string
}

function stripSurroundingQuotes(value: string): string {
    const trimmed = value.trim()
    if (
        (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
        (trimmed.startsWith('"') && trimmed.endsWith('"'))
    ) {
        return trimmed.slice(1, -1)
    }
    return trimmed
}

export function resolveNsfFieldValue(raw: string): NsfFieldValue {
    const trimmed = stripSurroundingQuotes(raw)
    if (trimmed.startsWith('$JSON')) {
        let jsonStr = trimmed.slice(5)
        if (jsonStr.startsWith(':')) jsonStr = jsonStr.slice(1)
        return JSON.parse(jsonStr) as Record<string, unknown>
    }
    return trimmed
}

function toFieldValueArray(value: NsfFieldValue): unknown[] {
    if (Array.isArray(value)) return value
    if (typeof value === 'object' && value !== null) return [value]
    return [value]
}

function cloneFieldEntries(entries: unknown): RecordFieldEntry[] {
    if (!Array.isArray(entries)) return []
    return (entries as RecordFieldEntry[]).map((field) => ({
        type: field.type ?? '',
        label: field.label,
        value: Array.isArray(field.value) ? [...field.value] : [],
    }))
}

function fieldEntryKey(field: RecordFieldEntry): string {
    return `${field.type}\0${field.label ?? ''}`
}

function isStructuredSubkey(fieldType: string, fieldLabel: string): boolean {
    return !!NSF_STRUCTURED_SUBKEYS[fieldType]?.has(fieldLabel)
}

function parseFieldKey(rawKey: string): ParsedFieldKey {
    let key = rawKey.trim()
    let section: 'fields' | 'custom' = 'fields'

    if (key.startsWith('c.')) {
        section = 'custom'
        key = key.slice(2)
    } else if (key.startsWith('f.')) {
        key = key.slice(2)
    }

    const quoted = key.match(/^"(.+)"$/)
    if (quoted) {
        return { section: 'custom', fieldType: 'text', fieldLabel: quoted[1] }
    }

    const dotIdx = key.indexOf('.')
    if (dotIdx > 0) {
        const fieldType = key.slice(0, dotIdx).toLowerCase()
        const fieldLabel = key.slice(dotIdx + 1)
        if (NSF_KNOWN_FIELD_TYPES.has(fieldType)) {
            return { section, fieldType, fieldLabel }
        }
        return { section: 'custom', fieldType: 'text', fieldLabel: key }
    }

    const fieldType = key.toLowerCase()
    if (NSF_KNOWN_FIELD_TYPES.has(fieldType)) {
        return { section: 'fields', fieldType, fieldLabel: '' }
    }

    return { section: 'custom', fieldType: 'text', fieldLabel: key }
}

function splitFieldTokens(input: string, delimiter: 'comma' | 'space'): string[] {
    const result: string[] = []
    let current = ''
    let inSingleQuote = false
    let inDoubleQuote = false
    let braceDepth = 0

    for (let i = 0; i < input.length; i++) {
        const ch = input[i]
        const prev = i > 0 ? input[i - 1] : ''

        if (ch === "'" && !inDoubleQuote && prev !== '\\') {
            inSingleQuote = !inSingleQuote
            current += ch
            continue
        }
        if (ch === '"' && !inSingleQuote && prev !== '\\') {
            inDoubleQuote = !inDoubleQuote
            current += ch
            continue
        }
        if (!inSingleQuote && !inDoubleQuote) {
            if (ch === '{') braceDepth++
            else if (ch === '}') braceDepth = Math.max(0, braceDepth - 1)
            else if (braceDepth === 0) {
                const isDelimiter = delimiter === 'comma' ? ch === ',' : /\s/.test(ch)
                if (isDelimiter) {
                    const token = current.trim()
                    if (token) result.push(token)
                    current = ''
                    if (delimiter === 'space') {
                        while (i + 1 < input.length && /\s/.test(input[i + 1])) i++
                    }
                    continue
                }
            }
        }
        current += ch
    }

    const token = current.trim()
    if (token) result.push(token)
    return result
}

function parseFieldToken(raw: string): FieldAssignment | 'file' | undefined {
    const field = raw.trim()
    if (!field) return undefined

    const separator = field.indexOf('=')
    if (separator <= 0) return undefined

    const key = field.slice(0, separator).trim()
    const value = field.slice(separator + 1).trim()
    if (!key) return undefined
    if (key.toLowerCase() === 'file') return 'file'

    const parsedKey = parseFieldKey(key)
    return {
        section: parsedKey.section,
        fieldType: parsedKey.fieldType,
        fieldLabel: parsedKey.fieldLabel,
        value: resolveNsfFieldValue(value),
    }
}

function wrapPlainStructuredValue(fieldType: string, value: string): Record<string, unknown> {
    if (fieldType === 'address') return { street1: value }
    if (fieldType === 'phone') return { number: value, type: 'Mobile' }
    if (fieldType === 'name') return { first: value }
    return { value }
}

function buildRecordFieldEntries(assignments: FieldAssignment[]): {
    fields: RecordFieldEntry[]
    custom: RecordFieldEntry[]
} {
    const custom: RecordFieldEntry[] = []
    const labeledFields: RecordFieldEntry[] = []
    const structuredByType = new Map<string, Record<string, unknown>>()
    const simpleByType = new Map<string, NsfFieldValue>()

    for (const { section, fieldType, fieldLabel, value } of assignments) {
        if (section === 'custom') {
            custom.push({
                type: fieldType,
                label: fieldLabel,
                value: toFieldValueArray(value),
            })
            continue
        }

        if (fieldLabel && isStructuredSubkey(fieldType, fieldLabel)) {
            const existing = structuredByType.get(fieldType) ?? {}
            existing[fieldLabel] = typeof value === 'string' ? value : value
            structuredByType.set(fieldType, existing)
            continue
        }

        if (fieldLabel) {
            labeledFields.push({
                type: fieldType,
                label: fieldLabel,
                value: toFieldValueArray(value),
            })
            continue
        }

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            structuredByType.set(fieldType, value as Record<string, unknown>)
            continue
        }

        simpleByType.set(fieldType, value)
    }

    const fields: RecordFieldEntry[] = []
    for (const [fieldType, value] of simpleByType) {
        if (typeof value === 'string' && NSF_STRUCTURED_SUBKEYS[fieldType]) {
            fields.push({ type: fieldType, value: [wrapPlainStructuredValue(fieldType, value)] })
            continue
        }
        fields.push({ type: fieldType, value: toFieldValueArray(value) })
    }
    for (const [fieldType, objectValue] of structuredByType) {
        fields.push({ type: fieldType, value: [objectValue] })
    }
    fields.push(...labeledFields)

    return { fields, custom }
}

function mergeFieldEntries(
    existing: RecordFieldEntry[],
    incoming: RecordFieldEntry[]
): RecordFieldEntry[] {
    const merged = new Map<string, RecordFieldEntry>()
    for (const field of existing) {
        merged.set(fieldEntryKey(field), {
            type: field.type ?? '',
            label: field.label,
            value: Array.isArray(field.value) ? [...field.value] : [],
        })
    }
    for (const field of incoming) {
        merged.set(fieldEntryKey(field), {
            type: field.type,
            label: field.label,
            value: [...field.value],
        })
    }
    return [...merged.values()]
}

function parseNsfFields(rawFields: string[]): ParsedNsfFields {
    let hasFileFields = false
    const assignments: FieldAssignment[] = []

    for (const raw of rawFields) {
        const parsed = parseFieldToken(raw)
        if (!parsed) continue
        if (parsed === 'file') {
            hasFileFields = true
            continue
        }
        assignments.push(parsed)
    }

    const { fields, custom } = buildRecordFieldEntries(assignments)
    return { fieldEntries: fields, customEntries: custom, hasFileFields }
}

export function getPaddedJsonBytes(data: Record<string, unknown>): Uint8Array {
    const json = JSON.stringify(data)
    const paddedLength = Math.ceil(Math.max(MIN_RECORD_PAD_BYTES, json.length) / PAD_BLOCK_SIZE) * PAD_BLOCK_SIZE
    return platform.stringToBytes(json.padEnd(paddedLength, ' '))
}

export function buildNsfRecordData(input: BuildNsfRecordDataInput): Record<string, unknown> {
    const title = input.title.trim()
    const recordType = input.recordType.trim()
    const data: Record<string, unknown> = {
        type: NSF_LEGACY_RECORD_TYPES.has(recordType) ? 'login' : recordType,
        title,
        fields: input.fieldEntries ?? [],
        custom: input.customEntries ?? [],
    }

    const notes = input.notes?.trim()
    if (notes) data.notes = notes
    return data
}

export function mergeNsfRecordData(
    existing: Record<string, unknown>,
    input: Partial<BuildNsfRecordDataInput>
): Record<string, unknown> {
    const data: Record<string, unknown> = {
        ...existing,
        fields: cloneFieldEntries(existing.fields),
        custom: cloneFieldEntries(existing.custom),
    }

    if (input.title !== undefined) data.title = input.title.trim()
    if (input.recordType !== undefined) {
        const recordType = input.recordType.trim()
        data.type = NSF_LEGACY_RECORD_TYPES.has(recordType) ? 'login' : recordType
    }
    if (input.notes !== undefined) data.notes = input.notes

    if (input.fieldEntries?.length) {
        data.fields = mergeFieldEntries(data.fields as RecordFieldEntry[], input.fieldEntries)
    }
    if (input.customEntries?.length) {
        data.custom = mergeFieldEntries(data.custom as RecordFieldEntry[], input.customEntries)
    }

    return data
}

export function parseNsfFieldInput(input: string): ParsedNsfFields {
    return parseNsfFields(splitFieldTokens(input, 'comma'))
}

export function parseNsfFieldSpaceInput(input: string): ParsedNsfFields {
    return parseNsfFields(splitFieldTokens(input, 'space'))
}

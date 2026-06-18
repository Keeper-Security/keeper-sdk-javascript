import { platform } from '@keeper-security/keeperapi'

const MIN_RECORD_PAD_BYTES = 384
const PAD_BLOCK_SIZE = 16
const LEGACY_RECORD_TYPES = new Set(['legacy', 'general'])

export type NsfRecordFieldMap = Record<string, string | string[]>

export type NsfRecordCustomField = {
    type: string
    label?: string
    value: string | string[]
}

export type BuildNsfRecordDataInput = {
    title: string
    recordType: string
    notes?: string
    fields?: NsfRecordFieldMap
    custom?: NsfRecordCustomField[]
}

export function normalizeNsfFieldValue(value: string | string[]): string[] {
    return Array.isArray(value) ? value : [value]
}

export function getPaddedJsonBytes(data: Record<string, unknown>): Uint8Array {
    const json = JSON.stringify(data)
    const paddedLength = Math.ceil(Math.max(MIN_RECORD_PAD_BYTES, json.length) / PAD_BLOCK_SIZE) * PAD_BLOCK_SIZE
    return platform.stringToBytes(json.padEnd(paddedLength, ' '))
}

function fieldsMapToArray(fields: NsfRecordFieldMap): { type: string; value: string[] }[] {
    return Object.entries(fields).map(([type, value]) => ({
        type,
        value: normalizeNsfFieldValue(value),
    }))
}

export function buildNsfRecordData(input: BuildNsfRecordDataInput): Record<string, unknown> {
    const title = input.title.trim()
    const recordType = input.recordType.trim()
    const data: Record<string, unknown> = {
        type: LEGACY_RECORD_TYPES.has(recordType) ? 'login' : recordType,
        title,
        fields: input.fields ? fieldsMapToArray(input.fields) : [],
        custom: (input.custom ?? []).map((field) => ({
            type: field.type,
            label: field.label ?? '',
            value: normalizeNsfFieldValue(field.value),
        })),
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
        fields: Array.isArray(existing.fields) ? [...(existing.fields as Record<string, unknown>[])] : [],
    }

    if (input.title !== undefined) data.title = input.title.trim()
    if (input.recordType !== undefined) {
        const recordType = input.recordType.trim()
        data.type = LEGACY_RECORD_TYPES.has(recordType) ? 'login' : recordType
    }
    if (input.notes !== undefined) data.notes = input.notes

    if (input.fields) {
        const fields = data.fields as { type?: string; value?: string[] }[]
        const byType = new Map<string, { type?: string; value?: string[] }[]>()
        for (const field of fields) {
            const fieldType = field?.type
            if (!fieldType) continue
            if (!byType.has(fieldType)) byType.set(fieldType, [])
            byType.get(fieldType)!.push(field)
        }
        for (const [fieldType, value] of Object.entries(input.fields)) {
            const normalized = normalizeNsfFieldValue(value)
            const matches = byType.get(fieldType)
            if (matches?.length) matches[0].value = normalized
            else fields.push({ type: fieldType, value: normalized })
        }
        data.fields = fields
    }

    return data
}

export type ParsedNsfFieldStrings = {
    fields: NsfRecordFieldMap
    custom: NsfRecordCustomField[]
    hasFileFields: boolean
}

export function parseNsfFieldStrings(rawFields: string[]): ParsedNsfFieldStrings {
    const fields: NsfRecordFieldMap = {}
    const custom: NsfRecordCustomField[] = []
    let hasFileFields = false

    for (const raw of rawFields) {
        const field = raw.trim()
        if (!field) continue
        const separator = field.indexOf('=')
        if (separator <= 0) continue

        const key = field.slice(0, separator).trim()
        const value = field.slice(separator + 1).trim()
        if (!key) continue

        if (key.toLowerCase() === 'file') {
            hasFileFields = true
            continue
        }

        const labeled = key.match(/^"(.+)"$/)
        if (labeled) {
            custom.push({ type: 'text', label: labeled[1], value })
            continue
        }

        fields[key] = value
    }

    return { fields, custom, hasFileFields }
}

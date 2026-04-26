export function padRight(str: string, len: number): string {
    if (str.length > len) {
        return len > 1 ? str.substring(0, len - 1) + '\u2026' : str.substring(0, len)
    }
    return str.length === len ? str : str + ' '.repeat(len - str.length)
}

export function formatFieldValue(field: { type: string; value: unknown[] }): string {
    if (field.type === 'password') {
        const pw = field.value[0]
        return pw ? '*'.repeat(String(pw).length) : '(empty)'
    }

    if (field.type === 'fileRef') {
        return `[${field.value.length} file(s)]`
    }

    return field.value
        .map((v: unknown) => {
            if (typeof v === 'string') return v
            if (v && typeof v === 'object') return JSON.stringify(v)
            return String(v)
        })
        .filter(Boolean)
        .join(', ') || '(empty)'
}

export const LEGACY_RECORD_MAX_VERSION = 2
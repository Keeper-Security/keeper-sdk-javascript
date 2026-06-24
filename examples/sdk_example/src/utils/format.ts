import {
    EMAIL_LIST_SEPARATOR_PATTERN,
    EMAIL_PATTERN,
    isValidEmail,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'

export { EMAIL_PATTERN }

export function padRight(str: string, len: number): string {
    if (str.length > len) {
        return len > 1 ? str.substring(0, len - 1) + '\u2026' : str.substring(0, len)
    }
    return str.length === len ? str : str + ' '.repeat(len - str.length)
}

export function formatFieldValue(field: { type: string; value: unknown[] }): string {
    if (field.type === 'password') {
        const passwordValue = field.value[0]
        return passwordValue ? '*'.repeat(String(passwordValue).length) : '(empty)'
    }

    if (field.type === 'fileRef') {
        return `[${field.value.length} file(s)]`
    }

    return field.value
        .map((value: unknown) => {
            if (typeof value === 'string') return value
            if (value && typeof value === 'object') return JSON.stringify(value)
            return String(value)
        })
        .filter(Boolean)
        .join(', ') || '(empty)'
}

export const LEGACY_RECORD_MAX_VERSION = 2

export function isYes(answer: string): boolean {
    const normalized = answer.trim().toLowerCase()
    return normalized === 'y' || normalized === 'yes'
}

export function splitCommaSeparated(input: string): string[] {
    return input.split(',').map((value) => value.trim()).filter(Boolean)
}

export async function withSuppressedLogs<T>(fn: () => Promise<T>): Promise<T> {
    const restore = suppressLogs()
    try {
        return await fn()
    } finally {
        restore()
    }
}

export function parseEmails(raw: string): { emails: string[]; invalid: string[] } {
    const tokens = raw
        .split(EMAIL_LIST_SEPARATOR_PATTERN)
        .map((token) => token.trim())
        .filter((token) => token.length > 0)
    const emails: string[] = []
    const invalid: string[] = []
    const seen = new Set<string>()
    for (const token of tokens) {
        const normalized = token.toLowerCase()
        if (seen.has(normalized)) continue
        seen.add(normalized)
        if (isValidEmail(token)) {
            emails.push(token)
        } else {
            invalid.push(token)
        }
    }
    return { emails, invalid }
}

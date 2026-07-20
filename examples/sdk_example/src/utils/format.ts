import {
    EMAIL_LIST_SEPARATOR_PATTERN,
    EMAIL_PATTERN,
    isValidEmail,
    logger,
    parseShareExpirationValue,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'

export { EMAIL_PATTERN }

export async function withSuppressedLogs<T>(fn: () => T | Promise<T>): Promise<T> {
    const restore = suppressLogs()
    try {
        return await fn()
    } finally {
        restore()
    }
}

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
    return input
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
}

const SHARE_EXPIRE_IN_RE =
    /^(\d+)\s*(mi(?:nutes?)?|h(?:ours?)?|d(?:ays?)?|mo(?:nths?)?|y(?:ears?)?)$/i

export async function promptShareExpiration(
    cmdName: 'nsf-share-folder' | 'nsf-share-record'
): Promise<{ expireAt?: string; expireIn?: string }> {
    logger.info(
        'Expiration: Enter to skip, never, ISO datetime (2027-01-01T00:00:00Z), or period (30d, 6mo, 1y, 24h, 30mi)'
    )
    const value = (await prompt('Share expiration: ')).trim()
    if (!value) return {}

    if (SHARE_EXPIRE_IN_RE.test(value)) {
        return { expireIn: value }
    }

    parseShareExpirationValue(value, cmdName)
    return { expireAt: value }
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

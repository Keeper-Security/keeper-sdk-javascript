import { KeeperSdkError } from './errors'
import { ResultCodes } from './constants'

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/

/** Splits user-entered email lists on whitespace, commas, and semicolons. */
export const EMAIL_LIST_SEPARATOR_PATTERN = /[\s,;]+/

/** Splits free-form text into search tokens on whitespace and common punctuation. */
export const TOKEN_SEPARATOR_PATTERN = /[\s\-_.,;:!?@#$%^&*()[\]{}|\\/<>]+/

/** Characters that must be escaped when embedding user input into a RegExp. */
export const REGEX_ESCAPE_PATTERN = /[.+^${}()|[\]\\]/g

const MAX_EMAIL_LENGTH = 254

export function isValidEmail(value: string): boolean {
    return value.length <= MAX_EMAIL_LENGTH && EMAIL_PATTERN.test(value)
}

export function escapeRegExp(value: string): string {
    return value.replace(REGEX_ESCAPE_PATTERN, '\\$&')
}

export function resolveSearchPattern(pattern: unknown): string | null {
    if (pattern == null) return null
    if (typeof pattern !== 'string') {
        throw new KeeperSdkError('Pattern must be a string.', ResultCodes.INVALID_PATTERN)
    }
    const trimmed = pattern.trim()
    return trimmed.length > 0 ? trimmed : null
}

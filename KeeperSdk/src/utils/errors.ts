import type { KeeperError } from '@keeper-security/keeperapi'

function parseJsonObjectIfPresent(s: string): Record<string, unknown> | null {
    const t = s.trim()
    if (t.length === 0 || (t[0] !== '{' && t[0] !== '[')) return null
    try {
        const parsed: unknown = JSON.parse(s)
        if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
            return parsed as Record<string, unknown>
        }
    } catch {
        /* not JSON */
    }
    return null
}

export function isKeeperError(err: unknown): err is KeeperError {
    return (
        err != null &&
        typeof err === 'object' &&
        !(err instanceof Error) &&
        ('result_code' in err || 'error' in err || 'response_code' in err)
    )
}

export function extractResultCode(err: unknown): string | undefined {
    if (isKeeperError(err)) {
        return err.result_code || err.error
    }
    if (err instanceof Error) {
        const msg = err.message
        if (msg.length > 0 && (msg[0] === '{' || msg[0] === '[')) {
            try {
                const parsed = JSON.parse(msg)
                return parsed.result_code || parsed.error
            } catch {}
        }
    }
    if (typeof err === 'string') {
        const parsed = parseJsonObjectIfPresent(err)
        if (parsed) {
            if (typeof parsed.result_code === 'string') return parsed.result_code
            if (typeof parsed.error === 'string') return parsed.error
        }
        return err
    }
    if (typeof err === 'object' && err !== null) {
        const obj = err as Record<string, unknown>
        if (typeof obj.result_code === 'string') return obj.result_code
        if (typeof obj.error === 'string') return obj.error
    }
    return undefined
}

export function extractErrorMessage(err: unknown): string {
    let message: string
    if (isKeeperError(err)) {
        message = err.message || err.result_code || err.error || 'Unknown Keeper error'
    } else if (err instanceof Error) {
        const parsed = parseJsonObjectIfPresent(err.message)
        if (parsed) {
            if (typeof parsed.message === 'string') message = parsed.message
            else if (typeof parsed.result_code === 'string') message = parsed.result_code
            else if (typeof parsed.error === 'string') message = parsed.error
            else message = err.message
        } else {
            message = err.message
        }
    } else if (typeof err === 'string') {
        const parsed = parseJsonObjectIfPresent(err)
        if (parsed) {
            if (typeof parsed.message === 'string') message = parsed.message
            else if (typeof parsed.result_code === 'string') message = parsed.result_code
            else if (typeof parsed.error === 'string') message = parsed.error
            else message = err
        } else {
            message = err
        }
    } else if (typeof err === 'object' && err !== null) {
        const obj = err as Record<string, unknown>
        if (typeof obj.message === 'string') message = obj.message
        else if (typeof obj.result_code === 'string') message = obj.result_code
        else message = String(err)
    } else {
        message = String(err)
    }
    return sanitizeErrorMessage(message)
}

function sanitizeErrorMessage(message: string): string {
    const trimmed = message.trim()
    if (/^missing:\s*\{/i.test(trimmed) && /session_token/i.test(trimmed)) {
        return 'Request rejected: missing or invalid fields. Try again or re-login if the session expired.'
    }
    return trimmed
        .replace(/"session_token"\s*:\s*"[^"]*"/gi, '"session_token":"[REDACTED]"')
        .replace(/session_token[=:]\s*[^\s"',}]+/gi, 'session_token=[REDACTED]')
}

export class KeeperSdkError extends Error {
    readonly resultCode?: string
    readonly keeperError?: KeeperError

    constructor(message: string, resultCode?: string, keeperError?: KeeperError) {
        super(message)
        this.name = 'KeeperSdkError'
        this.resultCode = resultCode
        this.keeperError = keeperError
    }

    static from(err: unknown): KeeperSdkError {
        if (err instanceof KeeperSdkError) return err
        if (isKeeperError(err)) {
            return new KeeperSdkError(
                err.message || err.result_code || err.error || 'Unknown Keeper error',
                err.result_code || err.error,
                err
            )
        }
        if (err instanceof Error) return new KeeperSdkError(err.message)
        return new KeeperSdkError(extractErrorMessage(err))
    }
}

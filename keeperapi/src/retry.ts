import type { KeeperError } from './configuration'

export const DEFAULT_REQUEST_TIMEOUT_MS = 300_000
export const MAX_THROTTLE_RETRIES = 3
export const MAX_THROTTLE_WAIT_SECONDS = 300
export const DEFAULT_THROTTLE_WAIT_SECONDS = 60

export type ResponseHeaders = {
    get?: (name: string) => string | null
    [key: string]: unknown
}

export function getHeader(headers: unknown, name: string): string | undefined {
    if (!headers || typeof headers !== 'object') return undefined
    const value = headers as ResponseHeaders
    if (typeof value.get === 'function') return value.get(name) || value.get(name.toLowerCase()) || undefined
    const key = Object.keys(value).find((key) => key.toLowerCase() === name.toLowerCase())
    const header = key ? value[key] : undefined
    return Array.isArray(header) ? header[0] : typeof header === 'string' ? header : undefined
}

export function parseRetryAfter(value: string | undefined, now = Date.now()): number | undefined {
    if (!value) return undefined
    const seconds = Number(value.trim())
    if (Number.isFinite(seconds) && seconds >= 0) return Math.ceil(seconds)
    const date = Date.parse(value)
    if (Number.isNaN(date)) return undefined
    return Math.max(0, Math.ceil((date - now) / 1000))
}

export function parseThrottleWaitSeconds(message: string, headers: unknown): number {
    const retryAfter = parseRetryAfter(getHeader(headers, 'retry-after'))
    if (retryAfter !== undefined) return Math.min(retryAfter, MAX_THROTTLE_WAIT_SECONDS)

    const match = message.match(/(\d+)\s*(second|seconds|minute|minutes)/i)
    if (!match) return DEFAULT_THROTTLE_WAIT_SECONDS
    const value = Number(match[1]) * (/minute/i.test(match[2]) ? 60 : 1)
    return Math.min(value, MAX_THROTTLE_WAIT_SECONDS)
}

export function throttleBackoffSeconds(retryNumber: number, waitSeconds: number): number {
    return Math.max(waitSeconds, 30 * 2 ** Math.max(0, retryNumber - 1))
}

export function parseErrorResponse(
    data: Uint8Array,
    bytesToString: (data: Uint8Array) => string
): {
    body?: KeeperError
    message: string
} {
    const message = bytesToString(data)
    try {
        return { body: JSON.parse(message) as KeeperError, message }
    } catch {
        return { message }
    }
}

export function isThrottleResponse(statusCode: number, error?: string): boolean {
    return statusCode === 429 || (statusCode === 403 && error?.toLowerCase() === 'throttled')
}

export function delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

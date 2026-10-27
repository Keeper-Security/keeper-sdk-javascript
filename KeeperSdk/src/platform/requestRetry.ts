import { connectPlatform, platform } from '@keeper-security/keeperapi'
import type { KeeperHttpResponse, Platform } from '@keeper-security/keeperapi'
import { getLogger } from '../utils/Logger'
import { getSdkPlatform, isSdkPlatformConnected } from './index'

export const RequestRetryDefaults = {
    REQUEST_TIMEOUT_MS: 300_000,
    MAX_THROTTLE_RETRIES: 3,
    MAX_THROTTLE_WAIT_SECONDS: 300,
    DEFAULT_THROTTLE_WAIT_SECONDS: 60,
} as const

export type RequestRetryOptions = {
    /** Per-request HTTP timeout. Applied only when the active SdkPlatform implements `httpRequest`. */
    requestTimeoutMs?: number
    /** Surface throttle responses immediately instead of waiting and retrying. */
    failOnThrottle?: boolean
    maxThrottleRetries?: number
}

let options: Required<RequestRetryOptions> = {
    requestTimeoutMs: RequestRetryDefaults.REQUEST_TIMEOUT_MS,
    failOnThrottle: false,
    maxThrottleRetries: RequestRetryDefaults.MAX_THROTTLE_RETRIES,
}

/** Updates the process-wide timeout/throttle settings used for every keeperapi HTTP call. */
export function configureRequestRetry(update: RequestRetryOptions): void {
    options = {
        requestTimeoutMs: update.requestTimeoutMs ?? options.requestTimeoutMs,
        failOnThrottle: update.failOnThrottle ?? options.failOnThrottle,
        maxThrottleRetries: update.maxThrottleRetries ?? options.maxThrottleRetries,
    }
}

export function getRequestRetryOptions(): Readonly<Required<RequestRetryOptions>> {
    return options
}

export function getHeader(headers: unknown, name: string): string | undefined {
    if (!headers || typeof headers !== 'object') return undefined
    const value = headers as { get?: (name: string) => string | null; [key: string]: unknown }
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
    if (retryAfter !== undefined) return Math.min(retryAfter, RequestRetryDefaults.MAX_THROTTLE_WAIT_SECONDS)

    const match = message.match(/(\d+)\s*(second|seconds|minute|minutes)/i)
    if (!match) return RequestRetryDefaults.DEFAULT_THROTTLE_WAIT_SECONDS
    const value = Number(match[1]) * (/minute/i.test(match[2]) ? 60 : 1)
    return Math.min(value, RequestRetryDefaults.MAX_THROTTLE_WAIT_SECONDS)
}

export function throttleBackoffSeconds(retryNumber: number, waitSeconds: number): number {
    return Math.max(waitSeconds, 30 * 2 ** Math.max(0, retryNumber - 1))
}

function parseErrorBody(response: KeeperHttpResponse): { error?: string; message: string } {
    const message = response.data ? platform.bytesToString(response.data) : ''
    try {
        const body = JSON.parse(message)
        return { error: body?.error, message: body?.message || message }
    } catch {
        return { message }
    }
}

export function isThrottleResponse(statusCode: number, error?: string): boolean {
    return statusCode === 429 || (statusCode === 403 && error?.toLowerCase() === 'throttled')
}

function delay(ms: number): Promise<void> {
    return isSdkPlatformConnected() ? getSdkPlatform().delay(ms) : new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Re-sends `send()` while the server answers with a throttle response. When retries are exhausted
 * (or `failOnThrottle` is set) the last throttled response is returned unchanged, so keeperapi raises
 * the same error it would without this wrapper.
 */
async function withThrottleRetry(url: string, send: () => Promise<KeeperHttpResponse>): Promise<KeeperHttpResponse> {
    for (let retry = 0; ; retry++) {
        const response = await send()
        if (response.statusCode !== 429 && response.statusCode !== 403) return response
        const parsed = parseErrorBody(response)
        if (!isThrottleResponse(response.statusCode, parsed.error)) return response

        const { failOnThrottle, maxThrottleRetries } = options
        if (failOnThrottle || retry >= maxThrottleRetries) return response

        const attempt = retry + 1
        const wait = throttleBackoffSeconds(attempt, parseThrottleWaitSeconds(parsed.message, response.headers))
        getLogger().warn(
            `Throttled ${url} (attempt ${attempt}/${maxThrottleRetries}), retrying in ${wait} seconds: ${parsed.message}`
        )
        await delay(wait * 1000)
    }
}

const RETRY_WRAPPED = Symbol.for('keeper-sdk.requestRetry')

/**
 * Replaces keeperapi's active Platform with one whose `post`/`get` add a request timeout and
 * throttle retry. Every KeeperEndpoint call (REST, router, v2 commands) goes through these two
 * methods, so no keeperapi changes are needed. Safe to call more than once.
 */
export function installRequestRetry(): void {
    const base = platform as Platform & { [RETRY_WRAPPED]?: boolean }
    if (!base || base[RETRY_WRAPPED]) return

    const transport = (method: 'GET' | 'POST', url: string, body?: Uint8Array, headers?: Record<string, string>) => {
        const sdk = isSdkPlatformConnected() ? getSdkPlatform() : undefined
        if (sdk?.httpRequest) return sdk.httpRequest(method, url, body, headers, options.requestTimeoutMs)
        return method === 'POST' ? base.post(url, body, headers) : base.get(url, headers ?? {})
    }

    const wrapped = new Proxy(base, {
        get(target, prop, receiver) {
            if (prop === RETRY_WRAPPED) return true
            if (prop === 'post') {
                return (url: string, request: Uint8Array, headers?: Record<string, string>) =>
                    withThrottleRetry(url, () => transport('POST', url, request, headers))
            }
            if (prop === 'get') {
                return (url: string, headers?: Record<string, string>) =>
                    withThrottleRetry(url, () => transport('GET', url, undefined, headers))
            }
            return Reflect.get(target, prop, receiver)
        },
    })
    connectPlatform(wrapped)
}

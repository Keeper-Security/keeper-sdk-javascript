import { connectPlatform, KeeperEndpoint, platform } from '@keeper-security/keeperapi'
import type { Platform } from '@keeper-security/keeperapi'
import { getLogger } from '../utils/Logger'
import { getSdkPlatform, isSdkPlatformConnected } from './index'

export const RequestRetryDefaults = {
    REQUEST_TIMEOUT_MS: 300_000,
    MAX_THROTTLE_RETRIES: 3,
    MAX_THROTTLE_WAIT_SECONDS: 300,
    DEFAULT_THROTTLE_WAIT_SECONDS: 60,
} as const

export type RequestRetryOptions = {
    requestTimeoutMs?: number
    failOnThrottle?: boolean
    maxThrottleRetries?: number
}

let options: Required<RequestRetryOptions> = {
    requestTimeoutMs: RequestRetryDefaults.REQUEST_TIMEOUT_MS,
    failOnThrottle: false,
    maxThrottleRetries: RequestRetryDefaults.MAX_THROTTLE_RETRIES,
}

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

export function parseThrottleWaitSeconds(message: string): number {
    const match = message.match(/(\d+)\s*(second|seconds|minute|minutes)/i)
    if (!match) return RequestRetryDefaults.DEFAULT_THROTTLE_WAIT_SECONDS
    const value = Number(match[1]) * (/minute/i.test(match[2]) ? 60 : 1)
    return Math.min(value, RequestRetryDefaults.MAX_THROTTLE_WAIT_SECONDS)
}

export function throttleBackoffSeconds(retryNumber: number, waitSeconds: number): number {
    return Math.max(waitSeconds, 30 * 2 ** Math.max(0, retryNumber - 1))
}

export function getThrottleMessage(error: unknown): string | undefined {
    let body: { error?: string; result_code?: string; message?: string } | undefined
    if (error && typeof error === 'object' && !(error instanceof Error)) {
        body = error
    } else {
        const text = error instanceof Error ? error.message : typeof error === 'string' ? error : ''
        const start = text.indexOf('{')
        if (start < 0) return undefined
        try {
            body = JSON.parse(text.slice(start))
        } catch {
            return undefined
        }
    }
    const code = body?.error ?? body?.result_code
    if (typeof code !== 'string' || code.toLowerCase() !== 'throttled') return undefined
    return body.message ?? ''
}

function delay(ms: number): Promise<void> {
    return isSdkPlatformConnected() ? getSdkPlatform().delay(ms) : new Promise((resolve) => setTimeout(resolve, ms))
}

function describeRequest(message: unknown): string {
    const m = message as { path?: string; request?: { command?: string } } | undefined
    return m?.path ?? m?.request?.command ?? 'request'
}

async function withThrottleRetry<T>(label: string, execute: () => Promise<T>): Promise<T> {
    for (let retry = 0; ; retry++) {
        try {
            return await execute()
        } catch (e) {
            const throttleMessage = getThrottleMessage(e)
            const { failOnThrottle, maxThrottleRetries } = options
            if (throttleMessage === undefined || failOnThrottle || retry >= maxThrottleRetries) throw e

            const attempt = retry + 1
            const wait = throttleBackoffSeconds(attempt, parseThrottleWaitSeconds(throttleMessage))
            getLogger().warn(
                `Throttled ${label} (attempt ${attempt}/${maxThrottleRetries}), retrying in ${wait} seconds: ${throttleMessage}`
            )
            await delay(wait * 1000)
        }
    }
}

const RETRIED_ENDPOINT_METHODS = [
    'executeRest',
    'executeRestAction',
    'executeRouterRest',
    'executeRestCommand',
] as const

const RETRY_INSTALLED = Symbol.for('keeper-sdk.requestRetry')

export function installRequestRetry(): void {
    const proto = KeeperEndpoint.prototype as unknown as Record<string | symbol, unknown>
    if (!proto[RETRY_INSTALLED]) {
        proto[RETRY_INSTALLED] = true
        for (const name of RETRIED_ENDPOINT_METHODS) {
            const original = proto[name] as (...args: unknown[]) => Promise<unknown>
            proto[name] = function (this: KeeperEndpoint, ...args: unknown[]) {
                return withThrottleRetry(describeRequest(args[0]), () => original.apply(this, args))
            }
        }
    }

    const base = platform as Platform & { [RETRY_INSTALLED]?: boolean }
    if (!base || base[RETRY_INSTALLED]) return

    const transport = (method: 'GET' | 'POST', url: string, body?: Uint8Array, headers?: Record<string, string>) => {
        const sdk = isSdkPlatformConnected() ? getSdkPlatform() : undefined
        if (sdk?.httpRequest) return sdk.httpRequest(method, url, body, headers, options.requestTimeoutMs)
        return method === 'POST' ? base.post(url, body, headers) : base.get(url, headers ?? {})
    }

    const wrapped = new Proxy(base, {
        get(target, prop, receiver) {
            if (prop === RETRY_INSTALLED) return true
            if (prop === 'post') {
                return (url: string, request: Uint8Array, headers?: Record<string, string>) =>
                    transport('POST', url, request, headers)
            }
            if (prop === 'get') {
                return (url: string, headers?: Record<string, string>) => transport('GET', url, undefined, headers)
            }
            return Reflect.get(target, prop, receiver)
        },
    })
    connectPlatform(wrapped)
}

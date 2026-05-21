import { platform } from './platform'

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent'

export interface Logger {
    debug(...args: unknown[]): void
    info(...args: unknown[]): void
    warn(...args: unknown[]): void
    error(...args: unknown[]): void
}

const levelOrder: Record<LogLevel, number> = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
    silent: 100,
}

const consoleLogger: Logger = {
    debug: (...args) => console.log(...args),
    info: (...args) => console.info(...args),
    warn: (...args) => console.warn(...args),
    error: (...args) => console.error(...args),
}

let activeLogger: Logger = consoleLogger
let activeLevel: LogLevel = 'warn'

export function setLogger(logger?: Logger | null): void {
    activeLogger = logger ?? consoleLogger
}

export function setLogLevel(level: LogLevel): void {
    activeLevel = level
}

export function getLogLevel(): LogLevel {
    return activeLevel
}

function enabled(level: Exclude<LogLevel, 'silent'>): boolean {
    return levelOrder[level] >= levelOrder[activeLevel]
}

export function isLevelEnabled(level: Exclude<LogLevel, 'silent'>): boolean {
    return enabled(level)
}

function webSafeBase64(bytes: Uint8Array): string {
    return platform.bytesToBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function convertBytesDeep(value: unknown): unknown {
    if (value instanceof Uint8Array) return webSafeBase64(value)
    if (Array.isArray(value)) return value.map(convertBytesDeep)
    if (value && typeof value === 'object') {
        const out: Record<string, unknown> = {}
        for (const [k, v] of Object.entries(value)) out[k] = convertBytesDeep(v)
        return out
    }
    return value
}

/**
 * Formats a protobufjs message for logging as `prefix TypeName:` plus its JSON body.
 * Spread into `logger.debug(...)` so the prefix stays a string and the body renders
 * as a JSON object. Bytes fields are emitted as web-safe base64. Falls back to the
 * raw value for non-proto inputs. Only call when a debug log will actually be
 * emitted — `toObject()` walks the whole message.
 */
export function formatProto(prefix: string, msg: unknown): [string, unknown] {
    if (msg == null || typeof msg !== 'object') return [prefix, msg]
    const m = msg as {
        toJSON?: () => unknown
        constructor?: { name?: string; toObject?: (m: unknown, opts: unknown) => unknown }
    }
    const ctor = m.constructor
    if (typeof ctor?.toObject !== 'function') {
        if (typeof m.toJSON !== 'function') return [prefix, msg]
        const name = ctor?.name ?? 'proto'
        const label = prefix ? `${prefix} ${name}:` : `${name}:`
        return [label, m.toJSON()]
    }
    const obj = ctor.toObject(m, { longs: String, enums: String, bytes: Uint8Array })
    const name = ctor.name ?? 'proto'
    const label = prefix ? `${prefix} ${name}:` : `${name}:`
    return [label, convertBytesDeep(obj)]
}

export const logger: Logger = {
    debug: (...args) => {
        if (enabled('debug')) activeLogger.debug(...args)
    },
    info: (...args) => {
        if (enabled('info')) activeLogger.info(...args)
    },
    warn: (...args) => {
        if (enabled('warn')) activeLogger.warn(...args)
    },
    error: (...args) => {
        if (enabled('error')) activeLogger.error(...args)
    },
}

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

export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    NONE = 4,
}

export interface ILogger {
    debug(...args: unknown[]): void
    info(...args: unknown[]): void
    warn(...args: unknown[]): void
    error(...args: unknown[]): void
}

const CREDENTIAL_PATTERN = /\b(password|passwd|pwd|secret|api[_-]?key|auth[_-]?token)\s*[:=]\s*\S+/gi

function sanitizeArg(arg: unknown): unknown {
    if (typeof arg !== 'string') return arg
    return arg.replace(CREDENTIAL_PATTERN, (_, key: string) => `${key}=[REDACTED]`)
}

export class ConsoleLogger implements ILogger {
    private level: LogLevel

    constructor(level: LogLevel = LogLevel.INFO) {
        this.level = level
    }

    public setLevel(level: LogLevel): void {
        this.level = level
    }

    public getLevel(): LogLevel {
        return this.level
    }

    public debug(...args: unknown[]): void {
        if (this.level <= LogLevel.DEBUG) console.debug(...args.map(sanitizeArg))
    }

    public info(...args: unknown[]): void {
        if (this.level <= LogLevel.INFO) console.log(...args.map(sanitizeArg))
    }

    public warn(...args: unknown[]): void {
        if (this.level <= LogLevel.WARN) console.warn(...args.map(sanitizeArg))
    }

    public error(...args: unknown[]): void {
        if (this.level <= LogLevel.ERROR) console.error(...args.map(sanitizeArg))
    }
}

let globalLogger: ILogger = new ConsoleLogger()

export function setLogger(newLogger: ILogger): void {
    globalLogger = newLogger
}

export function getLogger(): ILogger {
    return globalLogger
}

export function resetLogger(level: LogLevel = LogLevel.INFO): ConsoleLogger {
    const c = new ConsoleLogger(level)
    globalLogger = c
    return c
}

export const logger: ILogger = {
    debug: (...args) => globalLogger.debug(...args),
    info: (...args) => globalLogger.info(...args),
    warn: (...args) => globalLogger.warn(...args),
    error: (...args) => globalLogger.error(...args),
}

export { ConsoleLogger as Logger }

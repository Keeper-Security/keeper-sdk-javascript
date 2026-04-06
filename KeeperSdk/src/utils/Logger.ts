export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    NONE = 4,
}

export class Logger {
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

    public debug(...args: any[]): void {
        if (this.level <= LogLevel.DEBUG) console.debug(...args)
    }

    public info(...args: any[]): void {
        if (this.level <= LogLevel.INFO) console.log(...args)
    }

    public warn(...args: any[]): void {
        if (this.level <= LogLevel.WARN) console.warn(...args)
    }

    public error(...args: any[]): void {
        if (this.level <= LogLevel.ERROR) console.error(...args)
    }
}

export const logger = new Logger()

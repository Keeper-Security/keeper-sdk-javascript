import type { KeeperError } from '@keeper-security/keeperapi'

export function isKeeperError(err: any): err is KeeperError {
    return (
        err != null &&
        typeof err === 'object' &&
        !(err instanceof Error) &&
        ('result_code' in err || 'error' in err || 'response_code' in err)
    )
}

export function extractResultCode(err: any): string | undefined {
    if (isKeeperError(err)) {
        return err.result_code || err.error
    }
    if (err instanceof Error) {
        try {
            const parsed = JSON.parse(err.message)
            return parsed.result_code || parsed.error
        } catch {}
    }
    if (typeof err === 'string') return err
    return err?.result_code || err?.error
}

export function extractErrorMessage(err: any): string {
    if (isKeeperError(err)) {
        return err.message || err.result_code || err.error || 'Unknown Keeper error'
    }
    if (err instanceof Error) return err.message
    if (typeof err === 'string') return err
    return err?.message || err?.result_code || String(err)
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

    static from(err: any): KeeperSdkError {
        if (err instanceof KeeperSdkError) return err
        if (isKeeperError(err)) {
            return new KeeperSdkError(
                err.message || err.result_code || err.error || 'Unknown Keeper error',
                err.result_code || err.error,
                err
            )
        }
        if (err instanceof Error) return new KeeperSdkError(err.message)
        return new KeeperSdkError(String(err))
    }
}

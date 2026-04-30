import { logger, extractErrorMessage } from '@keeper-security/keeper-sdk-javascript'

export function runExample(fn: () => Promise<void>): void {
    fn()
        .catch((err) => {
            logger.error('Error:', extractErrorMessage(err))
            process.exitCode = 1
        })
        .finally(() => {
            process.exit(process.exitCode ?? 0)
        })
}

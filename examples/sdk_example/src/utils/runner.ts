import { logger, extractErrorMessage } from 'keeper-sdk'

export function runExample(fn: () => Promise<void>): void {
    fn()
        .catch((err) => {
            logger.error('Error:', extractErrorMessage(err))
            process.exitCode = 1
        })
}

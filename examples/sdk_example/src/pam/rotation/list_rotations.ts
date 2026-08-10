import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    RotationListFormat,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'
import { isYes } from '../../utils/format'

async function listRotationSchedulesExample() {
    const vault = await login()

    try {
        const verbose = isYes(await prompt('Verbose output? [y/N]: '))
        const asJson = isYes(await prompt('Output as JSON? [y/N]: '))

        const options = {
            verbose,
            format: asJson ? RotationListFormat.Json : RotationListFormat.Table,
        }

        let result
        const restore = suppressLogs()
        try {
            result = await vault.listRotationSchedules(options)
        } finally {
            restore()
        }

        if (result.rotations.length === 0) {
            logger.info(result.message || 'No PAM User rotation schedules found.')
            return
        }

        logger.info('')
        logger.info(vault.formatRotationSchedulesOutput(result, options))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(listRotationSchedulesExample)

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

async function rotationInfoExample() {
    const vault = await login()

    try {
        const recordUid = (await prompt('Record UID (-r): ')).trim()
        if (!recordUid) {
            logger.info('Record UID is required.')
            process.exitCode = 1
            return
        }

        const asJson = isYes(await prompt('Output as JSON? [y/N]: '))
        const input = {
            recordUid,
            format: asJson ? RotationListFormat.Json : RotationListFormat.Table,
        }

        let result
        const restore = suppressLogs()
        try {
            result = await vault.getRotationInfo(input)
        } finally {
            restore()
        }

        logger.info('')
        logger.info(vault.formatRotationInfoOutput(result, input))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(rotationInfoExample)

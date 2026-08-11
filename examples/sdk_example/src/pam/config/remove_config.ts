import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'

async function removePamConfigurationExample() {
    const vault = await login()

    try {
        const configurationUidOrTitle = (await prompt('PAM Configuration UID or title: ')).trim()
        if (!configurationUidOrTitle) {
            logger.info('Configuration UID or title is required.')
            return
        }

        let result
        const restore = suppressLogs()
        try {
            result = await vault.removePamConfiguration({ configurationUidOrTitle })
        } finally {
            restore()
        }

        logger.info('')
        if (!result.found) {
            logger.warn(vault.formatRemovePamConfigurationOutput(result))
        } else {
            logger.info(vault.formatRemovePamConfigurationOutput(result))
        }
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(removePamConfigurationExample)

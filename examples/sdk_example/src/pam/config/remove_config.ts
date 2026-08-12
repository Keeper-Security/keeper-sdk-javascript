import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'
import { formatRemovePamConfigurationOutput } from '../formatOutput'

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
        const output = formatRemovePamConfigurationOutput(result, configurationUidOrTitle)
        if (!result.found) {
            logger.warn(output)
        } else {
            logger.info(output)
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

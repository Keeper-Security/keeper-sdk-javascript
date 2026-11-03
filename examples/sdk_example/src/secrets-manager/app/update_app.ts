import { cleanup, extractErrorMessage, login, logger, prompt, suppressLogs } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'

async function updateAppExample() {
    const vault = await login()

    try {
        const appNameOrUid = (await prompt('Application name or UID: ')).trim()
        if (!appNameOrUid) {
            logger.info('Application name or UID is missing.')
            return
        }
        const name = (await prompt('New application name: ')).trim()
        if (!name) {
            logger.info('New application name is required.')
            return
        }

        let result
        const restore = suppressLogs()
        try {
            result = await vault.updateSecretsManagerApp({ appNameOrUid, name })
        } finally {
            restore()
        }

        logger.info('')
        logger.info(vault.formatSecretsManagerUpdateAppOutput(result))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(updateAppExample)

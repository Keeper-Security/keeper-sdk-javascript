import { cleanup, extractErrorMessage, login, logger, prompt, suppressLogs } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'

async function getAppExample() {
    const vault = await login()

    try {
        const appNameOrUid = (await prompt('Application name or UID: ')).trim()
        if (!appNameOrUid) {
            logger.info('Application name is required.')
            return
        }

        let detail
        const restore = suppressLogs()
        try {
            detail = await vault.getSecretsManagerApp(appNameOrUid)
        } finally {
            restore()
        }

        logger.info('')
        logger.info(vault.formatSecretsManagerAppOutput(detail))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(getAppExample)

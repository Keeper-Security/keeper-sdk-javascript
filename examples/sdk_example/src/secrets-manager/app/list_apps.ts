import { cleanup, extractErrorMessage, login, logger, suppressLogs } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'

async function listAppsExample() {
    const vault = await login()

    try {
        let result
        const restore = suppressLogs()
        try {
            result = await vault.listSecretsManagerApps()
        } finally {
            restore()
        }

        logger.info('')
        logger.info(vault.formatSecretsManagerAppsOutput(result))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(listAppsExample)

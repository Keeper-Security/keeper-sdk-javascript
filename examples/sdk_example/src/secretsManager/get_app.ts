import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
    type SecretsManagerAppDetails,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

async function getSecretsManagerApp(): Promise<void> {
    const vault = await login()

    try {
        const identifier = (await prompt('Application name or UID: ')).trim()
        if (!identifier) {
            logger.error('Application name or UID is required.')
            process.exitCode = 1
            return
        }

        let app: SecretsManagerAppDetails
        const restore = suppressLogs()
        try {
            app = await vault.getSecretsManagerApp(identifier)
        } finally {
            restore()
        }

        logger.info('')
        logger.info(vault.formatSecretsManagerAppDetails(app))
        logger.info('')
    } catch (err) {
        logger.error(`Secrets Manager app get failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(getSecretsManagerApp)

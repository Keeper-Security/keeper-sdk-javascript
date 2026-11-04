import { cleanup, extractErrorMessage, login, logger, prompt, suppressLogs } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'

async function createAppExample() {
    const vault = await login()

    try {
        const name = (await prompt('Application name: ')).trim()
        if (!name) {
            logger.info('Application name is required.')
            return
        }

        let result
        const restore = suppressLogs()
        try {
            result = await vault.createSecretsManagerApp({ name })
        } finally {
            restore()
        }

        logger.info('')
        logger.info(vault.formatSecretsManagerCreateAppOutput(result))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(createAppExample)

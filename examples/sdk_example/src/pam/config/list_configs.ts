import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    PamConfigListFormat,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'
import { isYes } from '../../utils/format'

async function listPamConfigurationsExample() {
    const vault = await login()

    try {
        const configUid = (await prompt('PAM Configuration UID (Enter for all): ')).trim() || undefined
        const verbose = isYes(await prompt('Verbose output? [y/N]: '))
        const asJson = isYes(await prompt('Output as JSON? [y/N]: '))

        const options = {
            configUid,
            verbose,
            format: asJson ? PamConfigListFormat.Json : PamConfigListFormat.Table,
        }

        let result
        const restore = suppressLogs()
        try {
            result = vault.listPamConfigurations(options)
        } finally {
            restore()
        }

        if (!result.detail && result.configurations.length === 0) {
            for (const warning of result.warnings) {
                logger.warn(warning)
            }
            logger.info(result.message || 'No PAM configurations found.')
            return
        }

        logger.info('')
        logger.info(vault.formatPamConfigurationsOutput(result, options))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(listPamConfigurationsExample)

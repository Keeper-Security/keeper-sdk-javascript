import { cleanup, extractErrorMessage, login, logger, prompt, suppressLogs } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'
import { isYes } from '../../utils/format'

async function removeAppExample() {
    const vault = await login()

    try {
        const appNameOrUid = (await prompt('Application name or UID: ')).trim()
        if (!appNameOrUid) {
            logger.info('Application name or UID is missing.')
            return
        }
        const purge = isYes(await prompt('Permanently delete for all users (purge)? [y/N]: '))
        const force = isYes(await prompt('Skip confirmation (force)? [y/N]: '))

        let result
        const restore = suppressLogs()
        try {
            result = await vault.removeSecretsManagerApp({
                appNameOrUid,
                purge,
                force,
                confirm: async (summary) => {
                    restore()
                    logger.info(summary)
                    return isYes(await prompt('Are you sure you want to delete this application? [y/N]: '))
                },
            })
        } finally {
            restore()
        }

        logger.info('')
        logger.info(vault.formatSecretsManagerRemoveAppOutput(result))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(removeAppExample)

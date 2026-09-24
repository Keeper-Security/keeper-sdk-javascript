import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    suppressLogs,
    type SecretsManagerAppRow,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

async function listSecretsManagerApps(): Promise<void> {
    const vault = await login()

    try {
        const restore = suppressLogs()
        let apps: SecretsManagerAppRow[]
        try {
            apps = await vault.listSecretsManagerApps()
        } finally {
            restore()
        }

        const table = vault.formatSecretsManagerAppsTable(apps)
        logger.info('')
        logger.info(vault.renderSecretsManagerAppsAsciiTable(table))
        logger.info('')
    } catch (err) {
        logger.error(`Secrets Manager app list failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(listSecretsManagerApps)

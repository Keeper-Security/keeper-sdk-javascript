import {
    cleanup,
    extractErrorMessage,
    formatSharedFoldersTable,
    login,
    logger,
    prompt,
    renderSharedFoldersAsciiTable,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

async function listSf() {
    const vault = await login()

    try {
        const asJson = isYes(await prompt('Output as JSON? [y/N]: '))

        const data = vault.listSharedFolders()
        if (data.length === 0) {
            logger.info('No shared folders are found')
            return
        }

        if (asJson) {
            logger.info(JSON.stringify(data, null, 2))
            return
        }

        const table = formatSharedFoldersTable(data)
        logger.info(renderSharedFoldersAsciiTable(table))
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(listSf)

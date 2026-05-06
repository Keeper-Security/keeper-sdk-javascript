import { login, cleanup, logger, prompt, extractErrorMessage } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

async function cdCommand() {
    const vault = await login()

    try {
        const target = (await prompt('Folder name or UID: ')).trim()
        if (!target) {
            logger.info('No folder name or UID given.')
            return
        }

        try {
            const result = await vault.changeDirectory(target)
            logger.info(`Working folder: ${result.name}`)
            logger.info(`  (UID: ${result.folderUid || '(vault root)'})`)
        } catch (err) {
            logger.error(`Failed to change directory: ${extractErrorMessage(err)}`)
            process.exitCode = 1
        }
    } finally {
        cleanup(vault)
    }
}

runExample(cdCommand)

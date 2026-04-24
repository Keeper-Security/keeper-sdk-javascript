import { login, cleanup, logger, prompt } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

async function cdCommand() {
    const argv = process.argv.slice(2)
    const pathArg = argv.join(' ').trim()

    const vault = await login()

    try {
        const target = pathArg || (await prompt('cd (folder path, UID, /, .., or .): ')).trim()
        if (!target) {
            logger.info('No path given.')
            return
        }

        const result = await vault.changeDirectory(target)
        logger.info(`Working folder: ${result.name}`)
        logger.info(`  (UID: ${result.folderUid ?? '(vault root)'})`)
    } finally {
        cleanup(vault)
    }
}

runExample(cdCommand)

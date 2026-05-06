import { login, cleanup, logger, prompt, suppressLogs, extractErrorMessage } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

async function updatedirCommand() {
    const vault = await login()

    try {
        const folder = (await prompt('Folder to rename (path, name, or UID): ')).trim()
        if (!folder) {
            logger.info('No folder given.')
            return
        }

        const newName = (await prompt('New folder name: ')).trim()
        if (!newName) {
            logger.info('New name is required.')
            return
        }

        try {
            let result
            const restore = suppressLogs()
            try {
                result = await vault.renameFolder(folder, newName)
            } finally {
                restore()
            }
            if (result.success) {
                logger.info(`Folder "${result.oldName}" has been renamed to "${result.newName}"`)
                logger.info(`  UID: ${result.folderUid}`)
            } else {
                logger.error(`Failed: ${result.message || 'unknown error'}`)
                process.exitCode = 1
            }
        } catch (err) {
            logger.error(`Failed to rename folder: ${extractErrorMessage(err)}`)
            process.exitCode = 1
        }
    } finally {
        cleanup(vault)
    }
}

runExample(updatedirCommand)

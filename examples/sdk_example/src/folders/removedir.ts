import { login, cleanup, logger, prompt, suppressLogs, extractErrorMessage } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

async function removedirCommand() {
    const vault = await login()

    try {
        const line = (await prompt('Folder(s) to remove (path, UID, name, or glob; space-separated): ')).trim()
        const patterns = line.split(/\s+/).filter(Boolean)
        if (patterns.length === 0) {
            logger.info('No folders given.')
            return
        }

        let restore = suppressLogs()
        try {
            const result = await vault.rmdir(patterns, {
                confirm: async (summary) => {
                    restore()
                    try {
                        logger.info(summary)
                        const ans = (await prompt('Do you want to proceed? (y/n) ')).trim().toLowerCase()
                        return ans === 'y' || ans === 'yes'
                    } finally {
                        restore = suppressLogs()
                    }
                },
            })

            restore()

            if (result.cancelled) {
                logger.info('Cancelled.')
                return
            }
            if (result.success) {
                logger.info('Removal completed.')
            } else {
                logger.error(`Failed: ${result.message ?? 'unknown error'}`)
                process.exitCode = 1
            }
        } catch (err) {
            restore()
            logger.error(`Failed to remove folder(s): ${extractErrorMessage(err)}`)
            process.exitCode = 1
        }
    } finally {
        cleanup(vault)
    }
}

runExample(removedirCommand)

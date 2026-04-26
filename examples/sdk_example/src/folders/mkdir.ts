import { login, cleanup, logger, prompt, suppressLogs, extractErrorMessage } from '@keeper-security/keeper-sdk-javascript'
import type { MkdirOptions } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

function isYes(answer: string): boolean {
    const a = answer.trim().toLowerCase()
    return a === 'y' || a === 'yes'
}

async function mkdirCommand() {
    const vault = await login()

    try {
        const path = (await prompt('Folder path to create: ')).trim()
        if (!path) {
            logger.info('No path given.')
            return
        }

        const sharedFolder = isYes(await prompt('Create as shared folder? [y/N]: '))
        const options: MkdirOptions = { sharedFolder }
        if (sharedFolder) {
            options.grantAll = isYes(
                await prompt('Grant all default permissions (manage users/records, share, edit)? [y/N]: '),
            )
        }

        try {
            let result
            const restore = suppressLogs()
            try {
                result = await vault.mkdir(path, options)
            } finally {
                restore()
            }
            if (result.success) {
                logger.info(`Created folder UID: ${result.folderUid}`)
            } else {
                logger.error(`Failed: ${result.message ?? 'unknown error'}`)
                process.exitCode = 1
            }
        } catch (err) {
            logger.error(`Failed to create folder: ${extractErrorMessage(err)}`)
            process.exitCode = 1
        }
    } finally {
        cleanup(vault)
    }
}

runExample(mkdirCommand)

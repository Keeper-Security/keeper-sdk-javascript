import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    NSF_FOLDER_COLORS,
    prompt,
    suppressLogs,
    type MkdirNsfInput,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

async function mkdirNsf() {
    const vault = await login()

    try {
        const folder = (await prompt('Folder name or path (e.g. Team/Projects/Q1): ')).trim()
        if (!folder) {
            logger.info('Folder name is required.')
            return
        }

        logger.info(`Colors: ${NSF_FOLDER_COLORS.join(', ')}`)
        const colorInput = (await prompt('Color (optional, leaf only) [none]: ')).trim().toLowerCase()
        const color =
            colorInput && (NSF_FOLDER_COLORS as readonly string[]).includes(colorInput)
                ? (colorInput as MkdirNsfInput['color'])
                : undefined
        const noInherit = (await prompt('Do not inherit parent permissions? [y/N]: ')).trim().toLowerCase() === 'y'

        const restore = suppressLogs()
        let result
        try {
            result = await vault.mkdirNestedShareFolder({
                folder,
                color,
                noInheritPermissions: noInherit,
            })
        } finally {
            restore()
        }

        logger.info('')
        if (result.message) logger.info(result.message)
        logger.info(`Folder UID: ${result.folderUid}`)
        logger.info(`Created: ${result.created ? 'Yes' : 'No'}`)
        logger.info('')
    } catch (err) {
        logger.error(`mkdir failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(mkdirNsf)

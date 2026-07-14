import {
    NSF_FOLDER_COLORS,
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    type NsfFolderColorInput,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { withSuppressedLogs } from '../utils/format'

async function rndirNsf() {
    const vault = await login()

    try {
        const folder = (await prompt('Folder path or UID: ')).trim()
        if (!folder) {
            logger.info('Enter the path or UID of an existing folder.')
            return
        }

        const name = (await prompt('New name (optional): ')).trim()
        const colorInput = (await prompt(`New color (${NSF_FOLDER_COLORS.join(', ')}, optional): `)).trim()
        const quietInput = (await prompt('Quiet mode? (y/N): ')).trim().toLowerCase()

        if (!name && !colorInput) {
            logger.info('New folder name and/or color parameters are required.')
            return
        }

        const result = await withSuppressedLogs(() =>
            vault.updateNestedShareFolder({
                folder,
                name: name || undefined,
                color: colorInput ? (colorInput as NsfFolderColorInput) : undefined,
                quiet: quietInput === 'y' || quietInput === 'yes',
            })
        )

        if (result.message) {
            logger.info(result.message)
        }
    } catch (err) {
        logger.error(`Folder update failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(rndirNsf)

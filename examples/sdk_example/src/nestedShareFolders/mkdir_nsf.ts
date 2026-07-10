import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    NSF_FOLDER_COLORS,
    prompt,
    type MkdirNsfInput,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { withSuppressedLogs } from '../utils/format'

type Vault = Awaited<ReturnType<typeof login>>

async function runMkdirNsf(vault: Vault): Promise<void> {
    const folder = (await prompt('Folder name or path (e.g. Team/Projects/Q1): ')).trim()
    if (!folder) {
        logger.info('Folder name is required.')
        return
    }

    logger.info(`Colors: ${NSF_FOLDER_COLORS.join(', ')}`)
    const colorInput = (await prompt('Color (optional, leaf only) [none]: ')).trim().toLowerCase()
    const color =
        colorInput && NSF_FOLDER_COLORS.some((candidate) => candidate === colorInput)
            ? (colorInput as MkdirNsfInput['color'])
            : undefined
    const noInherit = (await prompt('Do not inherit parent permissions? [y/N]: ')).trim().toLowerCase() === 'y'

    const result = await withSuppressedLogs(() =>
        vault.mkdirNestedShareFolder({
            folder,
            color,
            noInheritPermissions: noInherit,
        })
    )

    logger.info('')
    if (result.message) logger.info(result.message)
    logger.info(`Folder UID: ${result.folderUid}`)
    logger.info(`Created: ${result.created ? 'Yes' : 'No'}`)
    logger.info('')
}

async function mkdirNsf() {
    const vault = await login()

    try {
        await runMkdirNsf(vault)
    } catch (err) {
        logger.error(`Folder create failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(mkdirNsf)

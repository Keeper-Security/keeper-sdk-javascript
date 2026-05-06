import { login, cleanup, logger, prompt, extractErrorMessage } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

async function treeCommand() {
    const vault = await login()

    try {
        const folder = (await prompt('Folder path or UID (Enter for current/root): ')).trim()
        const verbose = isYes(await prompt('Show UIDs next to names? [y/N]: '))
        const showRecords = isYes(await prompt('Include records under each folder? [y/N]: '))
        const showShares = isYes(await prompt('Show share permissions for shared folders? [y/N]: '))
        const hideSharesKey = showShares
            ? isYes(await prompt('Hide [User]/[Team] suffix on share lines? [y/N]: '))
            : false
        const titleInput = (await prompt('Custom title above the tree (Enter to skip): ')).trim()
        logger.info('')
        try {
            const ascii = await vault.tree({
                folderPath: folder || undefined,
                verbose,
                showRecords,
                showShares,
                hideSharesKey,
                title: titleInput || null,
            })
            logger.info(ascii)
        } catch (err) {
            logger.error(`Failed to render tree: ${extractErrorMessage(err)}`)
            process.exitCode = 1
        }
        logger.info('')
    } finally {
        cleanup(vault)
    }
}

runExample(treeCommand)

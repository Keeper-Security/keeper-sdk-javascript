import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    NsfRemoveFolderOperation,
    prompt,
    suppressLogs,
    type RemoveNsfFolderInput,
    type RemoveNsfFolderResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

const OPERATION_BY_INPUT: Record<string, NsfRemoveFolderOperation> = {
    '': NsfRemoveFolderOperation.FolderTrash,
    '1': NsfRemoveFolderOperation.FolderTrash,
    '2': NsfRemoveFolderOperation.DeletePermanent,
    'folder-trash': NsfRemoveFolderOperation.FolderTrash,
    'delete-permanent': NsfRemoveFolderOperation.DeletePermanent,
}

function parseOperation(input: string): NsfRemoveFolderOperation {
    return OPERATION_BY_INPUT[input.trim().toLowerCase()] ?? NsfRemoveFolderOperation.FolderTrash
}

function printPreview(
    vault: Awaited<ReturnType<typeof login>>,
    result: RemoveNsfFolderResult,
    quiet: boolean
): void {
    if (result.preview.length === 0) return
    logger.info('')
    logger.info(vault.formatRemoveNsfFolderPreview(result.preview, result.operation, quiet))
    logger.info('')
}

function printPreviewWarnings(result: RemoveNsfFolderResult): void {
    for (const item of result.preview) {
        for (const warning of item.impact?.warnings ?? []) {
            logger.info(`Warning: ${warning}`)
        }
    }
}

async function removeNestedShareFolders(
    vault: Awaited<ReturnType<typeof login>>,
    input: RemoveNsfFolderInput
): Promise<RemoveNsfFolderResult> {
    const restore = suppressLogs()
    try {
        return await vault.removeNestedShareFolders(input)
    } finally {
        restore()
    }
}

async function rmdirNsf() {
    const vault = await login()

    try {
        const foldersInput = (await prompt('Folder UID(s) or name(s), comma-separated: ')).trim()
        const folders = foldersInput.split(',').map((value) => value.trim()).filter(Boolean)
        if (folders.length === 0) {
            logger.info('At least one folder is required.')
            return
        }

        logger.info('Operation: 1) folder-trash  2) delete-permanent')
        const operation = parseOperation(await prompt('Choose [1]: '))
        const dryRun = isYes(await prompt('Dry run (preview only)? [y/N]: '))
        const quiet = isYes(await prompt('Quiet (summary only)? [y/N]: '))
        const force = dryRun ? false : isYes(await prompt('Force confirm without prompt? [y/N]: '))

        if (operation === NsfRemoveFolderOperation.DeletePermanent && !force && !dryRun) {
            logger.info('')
            logger.info('*** WARNING ***')
            logger.info('delete-permanent is IRREVERSIBLE.')
            logger.info('All sub-folders and records inside will be permanently destroyed.')
            logger.info('')
        }

        const baseInput: RemoveNsfFolderInput = {
            folders,
            operation,
            quiet,
        }

        if (dryRun) {
            const result = await removeNestedShareFolders(vault, { ...baseInput, dryRun: true })
            printPreview(vault, result, quiet)
            logger.info('[Dry-run] No folders were deleted.')
            return
        }

        if (force) {
            const result = await removeNestedShareFolders(vault, { ...baseInput, force: true })
            printPreview(vault, result, quiet)
            if (result.confirmed && result.message) {
                logger.info(result.message)
            }
            return
        }

        const preview = await removeNestedShareFolders(vault, { ...baseInput, force: false })
        printPreview(vault, preview, quiet)
        printPreviewWarnings(preview)

        const promptText =
            operation === NsfRemoveFolderOperation.DeletePermanent
                ? 'Do you want to permanently delete the folder(s) and all their contents? [y/n]: '
                : 'Do you want to proceed with the folder deletion? [y/n]: '

        if (!isYes(await prompt(promptText))) {
            logger.info('Removal cancelled.')
            return
        }

        const result = await removeNestedShareFolders(vault, { ...baseInput, force: true })
        if (result.confirmed && result.message) {
            logger.info(result.message)
        }
    } catch (err) {
        logger.error(`rmdir failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(rmdirNsf)

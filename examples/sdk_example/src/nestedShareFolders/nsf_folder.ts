import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    NSF_FOLDER_COLORS,
    NsfRemoveFolderOperation,
    prompt,
    type MkdirNsfInput,
    type RemoveNsfFolderInput,
    type RemoveNsfFolderResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes, splitCommaSeparated, withSuppressedLogs } from '../utils/format'

type Vault = Awaited<ReturnType<typeof login>>

const ACTION_BY_INPUT: Record<string, 'mkdir' | 'rmdir'> = {
    '': 'mkdir',
    '1': 'mkdir',
    '2': 'rmdir',
    mkdir: 'mkdir',
    create: 'mkdir',
    rmdir: 'rmdir',
    remove: 'rmdir',
}

const OPERATION_BY_INPUT: Record<string, NsfRemoveFolderOperation> = {
    '': NsfRemoveFolderOperation.FolderTrash,
    '1': NsfRemoveFolderOperation.FolderTrash,
    '2': NsfRemoveFolderOperation.DeletePermanent,
    'folder-trash': NsfRemoveFolderOperation.FolderTrash,
    'delete-permanent': NsfRemoveFolderOperation.DeletePermanent,
}

const PERMANENT_DELETE_WARNING_LINES = [
    '*** WARNING ***',
    'delete-permanent is IRREVERSIBLE.',
    'All sub-folders and records inside will be permanently destroyed.',
] as const

function parseAction(input: string): 'mkdir' | 'rmdir' {
    return ACTION_BY_INPUT[input.trim().toLowerCase()] ?? 'mkdir'
}

function parseOperation(input: string): NsfRemoveFolderOperation {
    return OPERATION_BY_INPUT[input.trim().toLowerCase()] ?? NsfRemoveFolderOperation.FolderTrash
}

function logPreview(vault: Vault, result: RemoveNsfFolderResult, quiet: boolean): void {
    if (result.preview.length === 0) return
    logger.info('')
    logger.info(vault.formatRemoveNsfFolderPreview(result.preview, result.operation, quiet))
    logger.info('')
}

function logPreviewWarnings(result: RemoveNsfFolderResult): void {
    for (const item of result.preview) {
        for (const warning of item.impact?.warnings ?? []) {
            logger.info(`Warning: ${warning}`)
        }
    }
}

async function mkdirNsf(vault: Vault): Promise<void> {
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

async function rmdirNsf(vault: Vault): Promise<void> {
    const folders = splitCommaSeparated(await prompt('Folder UID(s) or name(s), comma-separated: '))
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
        for (const line of PERMANENT_DELETE_WARNING_LINES) {
            logger.info(line)
        }
        logger.info('')
    }

    const baseInput: RemoveNsfFolderInput = { folders, operation, quiet }

    if (dryRun) {
        const result = await withSuppressedLogs(() => vault.removeNestedShareFolders({ ...baseInput, dryRun: true }))
        logPreview(vault, result, quiet)
        logger.info('[Dry-run] No folders were deleted.')
        return
    }

    if (force) {
        const result = await withSuppressedLogs(() => vault.removeNestedShareFolders({ ...baseInput, force: true }))
        logPreview(vault, result, quiet)
        if (result.confirmed && result.message) logger.info(result.message)
        return
    }

    const preview = await withSuppressedLogs(() => vault.removeNestedShareFolders({ ...baseInput, force: false }))
    logPreview(vault, preview, quiet)
    logPreviewWarnings(preview)

    const confirmPrompt =
        operation === NsfRemoveFolderOperation.DeletePermanent
            ? 'Do you want to permanently delete the folder(s) and all their contents? [y/n]: '
            : 'Do you want to proceed with the folder deletion? [y/n]: '

    if (!isYes(await prompt(confirmPrompt))) {
        logger.info('Removal cancelled.')
        return
    }

    const result = await withSuppressedLogs(() => vault.removeNestedShareFolders({ ...baseInput, force: true }))
    if (result.confirmed && result.message) logger.info(result.message)
}

async function nsfFolder() {
    const vault = await login()

    try {
        logger.info('Action: 1) create folder  2) remove folder')
        const action = parseAction(await prompt('Choose [1]: '))
        if (action === 'mkdir') {
            await mkdirNsf(vault)
        } else {
            await rmdirNsf(vault)
        }
    } catch (err) {
        logger.error(`Folder operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(nsfFolder)

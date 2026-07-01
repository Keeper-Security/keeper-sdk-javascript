import {
    cleanup,
    collectRemoveNsfWarnings,
    extractErrorMessage,
    login,
    logger,
    NsfRemoveOperation,
    suppressLogs,
    type RemoveNsfRecordInput,
    type RemoveNsfRecordResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { splitCommaSeparated, withSuppressedLogs } from '../utils/format'
import {
    promptChoice,
    promptOptional,
    promptRequired,
    promptRequiredList,
    promptYesNo,
    yesNoPrompt,
} from '../utils/promptCommands'

const OPERATION_CHOICES: Record<string, NsfRemoveOperation> = {
    '': NsfRemoveOperation.OwnerTrash,
    '1': NsfRemoveOperation.OwnerTrash,
    '2': NsfRemoveOperation.FolderTrash,
    '3': NsfRemoveOperation.Unlink,
    'owner-trash': NsfRemoveOperation.OwnerTrash,
    'folder-trash': NsfRemoveOperation.FolderTrash,
    unlink: NsfRemoveOperation.Unlink,
}

function printPreview(vault: Awaited<ReturnType<typeof login>>, result: RemoveNsfRecordResult): void {
    if (result.preview.length === 0) return
    logger.info('')
    logger.info(vault.formatRemoveNsfPreview(result.preview))
    logger.info('')
}

function printPreviewWarnings(result: RemoveNsfRecordResult): void {
    for (const warning of collectRemoveNsfWarnings(result.preview)) {
        logger.info(`Warning: ${warning}`)
    }
}

async function removeNestedShareRecords(
    vault: Awaited<ReturnType<typeof login>>,
    input: RemoveNsfRecordInput
): Promise<RemoveNsfRecordResult> {
    const restore = suppressLogs()
    try {
        return await vault.removeNestedShareRecords(input)
    } finally {
        restore()
    }
}

async function removeNsf() {
    const vault = await login()

    try {
        const records = await promptRequiredList(
            'Record UID(s) or title(s), comma-separated: ',
            splitCommaSeparated
        )

        logger.info('Operation: 1) owner-trash  2) folder-trash  3) unlink')
        const operation = await promptChoice('Choose [1]: ', OPERATION_CHOICES)
        const folder =
            operation === NsfRemoveOperation.Unlink
                ? await promptRequired('Folder UID or name (required for unlink): ')
                : await promptOptional('Folder UID or name (optional): ')
        const dryRun = await promptYesNo(yesNoPrompt('Dry run (preview only)?'))
        const force = dryRun ? false : await promptYesNo(yesNoPrompt('Force confirm without prompt?'))

        const baseInput: RemoveNsfRecordInput = {
            records,
            folder: folder || undefined,
            operation,
        }

        if (dryRun) {
            const result = await removeNestedShareRecords(vault, { ...baseInput, dryRun: true })
            printPreview(vault, result)
            logger.info('[Dry-run] No records were removed.')
            return
        }

        if (force) {
            const result = await removeNestedShareRecords(vault, { ...baseInput, force: true })
            printPreview(vault, result)
            if (result.confirmed && result.message) {
                logger.info(result.message)
            }
            return
        }

        const preview = await removeNestedShareRecords(vault, { ...baseInput, force: false })
        printPreview(vault, preview)
        printPreviewWarnings(preview)

        if (!(await promptYesNo(yesNoPrompt('Do you want to proceed with deletion?')))) {
            logger.info('Removal cancelled.')
            return
        }

        const result = await removeNestedShareRecords(vault, { ...baseInput, force: true })
        if (result.confirmed && result.message) {
            logger.info(result.message)
        }
    } catch (err) {
        logger.error(`Remove failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(removeNsf)

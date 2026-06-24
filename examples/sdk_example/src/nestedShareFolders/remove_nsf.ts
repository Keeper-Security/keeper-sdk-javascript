import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    NsfRemoveOperation,
    prompt,
    suppressLogs,
    type RemoveNsfRecordInput,
    type RemoveNsfRecordResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

const OPERATION_BY_INPUT: Record<string, NsfRemoveOperation> = {
    '': NsfRemoveOperation.OwnerTrash,
    '1': NsfRemoveOperation.OwnerTrash,
    '2': NsfRemoveOperation.FolderTrash,
    '3': NsfRemoveOperation.Unlink,
    'owner-trash': NsfRemoveOperation.OwnerTrash,
    'folder-trash': NsfRemoveOperation.FolderTrash,
    unlink: NsfRemoveOperation.Unlink,
}

function parseOperation(input: string): NsfRemoveOperation {
    return OPERATION_BY_INPUT[input.trim().toLowerCase()] ?? NsfRemoveOperation.OwnerTrash
}

function printPreview(vault: Awaited<ReturnType<typeof login>>, result: RemoveNsfRecordResult): void {
    if (result.preview.length === 0) return
    logger.info('')
    logger.info(vault.formatRemoveNsfPreview(result.preview))
    logger.info('')
}

function printPreviewWarnings(result: RemoveNsfRecordResult): void {
    for (const item of result.preview) {
        for (const warning of item.impact?.warnings ?? []) {
            logger.info(`Warning: ${warning}`)
        }
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
        const recordsInput = (await prompt('Record UID(s) or title(s), comma-separated: ')).trim()
        const records = recordsInput.split(',').map((value) => value.trim()).filter(Boolean)
        if (records.length === 0) {
            logger.info('At least one record is required.')
            return
        }

        logger.info('Operation: 1) owner-trash  2) folder-trash  3) unlink')
        const operation = parseOperation(await prompt('Choose [1]: '))
        const folder =
            operation === NsfRemoveOperation.Unlink
                ? (await prompt('Folder UID or name (required for unlink): ')).trim()
                : (await prompt('Folder UID or name (optional): ')).trim()
        const dryRun = isYes(await prompt('Dry run (preview only)? [y/N]: '))
        const force = dryRun ? false : isYes(await prompt('Force confirm without prompt? [y/N]: '))

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

        if (!isYes(await prompt('Do you want to proceed with deletion? [y/n]: '))) {
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

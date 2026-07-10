import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    NSF_MAX_RECORD_BATCH,
    parseNsfFieldInput,
    prompt,
    type UpdateNsfRecordItemInput,
    type UpdateNsfRecordResultItem,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { splitCommaSeparated, withSuppressedLogs } from '../utils/format'
import { promptChoice, promptRequired, promptRequiredList, promptYesNo, yesNoPrompt } from '../utils/promptCommands'

type UpdateMode = 'single' | 'bulk' | 'multi'

const MODE_CHOICES: Record<string, UpdateMode> = {
    '': 'single',
    '1': 'single',
    '2': 'bulk',
    '3': 'multi',
    single: 'single',
    bulk: 'bulk',
    multi: 'multi',
}

function hasUpdateChanges(item: UpdateNsfRecordItemInput): boolean {
    return !!(
        item.title?.trim() ||
        item.recordType?.trim() ||
        item.notes?.trim() ||
        item.fieldEntries?.length ||
        item.customEntries?.length
    )
}

async function promptRecordChanges(recordLabel = 'Record'): Promise<Omit<UpdateNsfRecordItemInput, 'record'>> {
    const title = (await prompt('New title (optional): ')).trim()
    const recordType = (await prompt('Record type (optional): ')).trim()
    const notes = (await prompt('Notes (optional): ')).trim()
    const fieldsInput = (await prompt('Fields (type=value, comma-separated, optional): ')).trim()
    const parsed = fieldsInput ? parseNsfFieldInput(fieldsInput) : undefined

    const changes: Omit<UpdateNsfRecordItemInput, 'record'> = {
        title: title || undefined,
        recordType: recordType || undefined,
        notes: notes || undefined,
        fieldEntries: parsed?.fieldEntries,
        customEntries: parsed?.customEntries,
    }

    if (!hasUpdateChanges({ record: recordLabel, ...changes })) {
        throw new Error('At least one field to update is required (title, type, notes, or fields).')
    }

    return changes
}

function printUpdateResults(updated: UpdateNsfRecordResultItem[]): void {
    logger.info('')
    for (const item of updated) {
        logger.info(`Record: ${item.recordUid}`)
        logger.info(`  Status: ${item.status}`)
        if (item.message) logger.info(`  Message: ${item.message}`)
        if (item.revision != null) logger.info(`  Revision: ${item.revision}`)
        logger.info('')
    }
    logger.info(`Total: ${updated.length} record(s) updated`)
    logger.info('')
}

async function updateSingleRecord(vault: Awaited<ReturnType<typeof login>>): Promise<void> {
    const record = await promptRequired('Record UID or title: ')
    const changes = await promptRecordChanges(record)
    const result = await withSuppressedLogs(() => vault.updateNestedShareRecord({ record, ...changes }))
    printUpdateResults([result])
}

async function updateBulkSameChanges(vault: Awaited<ReturnType<typeof login>>): Promise<void> {
    const records = await promptRequiredList(
        'Record UID(s) or title(s), comma-separated: ',
        splitCommaSeparated
    )

    if (records.length > NSF_MAX_RECORD_BATCH) {
        logger.error(`Maximum ${NSF_MAX_RECORD_BATCH} records per request.`)
        return
    }

    logger.info(
        `Updating ${records.length} record(s) in one batch. The same title, type, notes, and fields apply to all.`
    )

    const changes = await promptRecordChanges()
    const result = await withSuppressedLogs(() =>
        vault.updateNestedShareRecords({
            records,
            ...changes,
        })
    )
    printUpdateResults(result.updated)
}

async function updateMultipleRecords(vault: Awaited<ReturnType<typeof login>>): Promise<void> {
    const items: UpdateNsfRecordItemInput[] = []

    logger.info('Enter each record update (different record and changes allowed).')
    while (true) {
        logger.info(`--- Record ${items.length + 1} ---`)
        const record = await promptRequired('Record UID or title: ')
        const changes = await promptRecordChanges(record)
        items.push({ record, ...changes })

        if (items.length >= NSF_MAX_RECORD_BATCH) {
            logger.info(`Maximum ${NSF_MAX_RECORD_BATCH} records per request.`)
            break
        }
        if (!(await promptYesNo(yesNoPrompt('Update another record?')))) {
            break
        }
    }

    const result = await withSuppressedLogs(() => vault.updateNestedShareRecords({ records: items }))
    printUpdateResults(result.updated)
}

async function updateNsfRecord() {
    const vault = await login()

    try {
        logger.info(
            'Mode: 1) single  2) bulk (same changes, multiple records)  3) multiple (enter each)'
        )
        const mode = await promptChoice('Choose [1]: ', MODE_CHOICES)

        if (mode === 'single') {
            await updateSingleRecord(vault)
        } else if (mode === 'bulk') {
            await updateBulkSameChanges(vault)
        } else {
            await updateMultipleRecords(vault)
        }
    } catch (err) {
        logger.error(`Record update failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(updateNsfRecord)

import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    parseNsfFieldSpaceInput,
    prompt,
    type AddNsfRecordInput,
    type AddNsfRecordResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { splitCommaSeparated, withSuppressedLogs } from '../utils/format'
import { promptChoice, promptRequiredList, promptYesNo, yesNoPrompt } from '../utils/promptCommands'

type AddMode = 'single' | 'bulk' | 'multi'

const MODE_CHOICES: Record<string, AddMode> = {
    '': 'single',
    '1': 'single',
    '2': 'bulk',
    '3': 'multi',
    single: 'single',
    bulk: 'bulk',
    multi: 'multi',
}

async function promptSharedRecordOptions(): Promise<{
    recordType: string
    folder?: string
    notes?: string
    fieldEntries?: AddNsfRecordInput['fieldEntries']
    customEntries?: AddNsfRecordInput['customEntries']
    hasFileFields?: boolean
    force: boolean
}> {
    const recordType = (await prompt('Record type (e.g. login, general): ')).trim()
    const folder = (await prompt('Folder name or UID (optional, Enter for root): ')).trim()
    const notes = (await prompt('Notes (optional): ')).trim()
    const fieldsInput = (await prompt('Fields (field=value, space-separated, optional): ')).trim()
    const force = await promptYesNo(yesNoPrompt('Ignore warnings (e.g. attachments)?'))
    const parsed = fieldsInput ? parseNsfFieldSpaceInput(fieldsInput) : undefined

    return {
        recordType,
        folder: folder || undefined,
        notes: notes || undefined,
        fieldEntries: parsed?.fieldEntries,
        customEntries: parsed?.customEntries,
        hasFileFields: parsed?.hasFileFields,
        force,
    }
}

async function promptOneRecord(shared?: Awaited<ReturnType<typeof promptSharedRecordOptions>>): Promise<AddNsfRecordInput> {
    const title = (await prompt('Record title: ')).trim()
    if (!title) {
        throw new Error('Record title is required.')
    }

    if (shared) {
        return { title, ...shared }
    }

    const options = await promptSharedRecordOptions()
    return { title, ...options }
}

function printAddResults(added: AddNsfRecordResult[], revision?: number): void {
    logger.info('')
    for (const item of added) {
        logger.info(`Record: ${item.recordUid}`)
        logger.info(`  Status: ${item.status}`)
        if (item.message) logger.info(`  Message: ${item.message}`)
        if (item.revision != null) logger.info(`  Revision: ${item.revision}`)
        logger.info('')
    }
    if (revision != null) {
        logger.info(`Batch revision: ${revision}`)
    }
    logger.info(`Total: ${added.length} record(s) added`)
    logger.info('')
}

async function addSingleRecord(vault: Awaited<ReturnType<typeof login>>): Promise<void> {
    const input = await promptOneRecord()
    const result = await withSuppressedLogs(() => vault.addNestedShareRecord(input))
    printAddResults([result], result.revision)
}

async function addBulkSameTemplate(vault: Awaited<ReturnType<typeof login>>): Promise<void> {
    const titles = await promptRequiredList('Record title(s), comma-separated: ', splitCommaSeparated)
    const shared = await promptSharedRecordOptions()

    const records = titles.map((title) => ({ title, ...shared }))
    const result = await withSuppressedLogs(() => vault.addNestedShareRecords({ records }))
    printAddResults(result.added, result.revision)
}

async function addMultipleRecords(vault: Awaited<ReturnType<typeof login>>): Promise<void> {
    const records: AddNsfRecordInput[] = []

    logger.info('Enter each record (different title, type, folder, or fields allowed).')
    while (true) {
        logger.info(`--- Record ${records.length + 1} ---`)
        records.push(await promptOneRecord())
        if (!(await promptYesNo(yesNoPrompt('Add another record?')))) {
            break
        }
    }

    const result = await withSuppressedLogs(() => vault.addNestedShareRecords({ records }))
    printAddResults(result.added, result.revision)
}

async function addNsfRecord() {
    const vault = await login()

    try {
        logger.info('Mode: 1) single  2) bulk (same type/folder/fields, multiple titles)  3) multiple (enter each)')
        const mode = await promptChoice('Choose [1]: ', MODE_CHOICES)

        if (mode === 'single') {
            await addSingleRecord(vault)
        } else if (mode === 'bulk') {
            await addBulkSameTemplate(vault)
        } else {
            await addMultipleRecords(vault)
        }
    } catch (err) {
        logger.error(`Record add failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(addNsfRecord)

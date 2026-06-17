import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
    type UpdateNsfRecordFieldMap,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

function parseFieldSpecs(input: string): UpdateNsfRecordFieldMap {
    const fields: UpdateNsfRecordFieldMap = {}
    for (const spec of input.split(',').map((value) => value.trim()).filter(Boolean)) {
        const separator = spec.indexOf('=')
        if (separator <= 0) continue
        const type = spec.slice(0, separator).trim()
        const value = spec.slice(separator + 1).trim()
        if (type) fields[type] = value
    }
    return fields
}

async function updateNsfRecord() {
    const vault = await login()

    try {
        const recordsInput = (await prompt('Record UID(s) or title(s), comma-separated: ')).trim()
        const records = recordsInput.split(',').map((value) => value.trim()).filter(Boolean)
        if (records.length === 0) {
            logger.info('At least one record is required.')
            return
        }

        const title = (await prompt('New title (optional): ')).trim()
        const recordType = (await prompt('Record type (optional): ')).trim()
        const notes = (await prompt('Notes (optional): ')).trim()
        const fieldsInput = (await prompt('Fields (type=value, comma-separated, optional): ')).trim()
        const fields = fieldsInput ? parseFieldSpecs(fieldsInput) : undefined

        const restore = suppressLogs()
        let result
        try {
            result = await vault.updateNestedShareRecords({
                records,
                title: title || undefined,
                recordType: recordType || undefined,
                notes: notes || undefined,
                fields,
            })
        } finally {
            restore()
        }

        logger.info('')
        for (const item of result.updated) {
            logger.info(`Record: ${item.recordUid}`)
            logger.info(`  Status: ${item.status}`)
            if (item.message) logger.info(`  Message: ${item.message}`)
            if (item.revision != null) logger.info(`  Revision: ${item.revision}`)
            logger.info('')
        }
    } catch (err) {
        logger.error(`Record update failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(updateNsfRecord)
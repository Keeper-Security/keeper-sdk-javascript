import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    parseNsfFieldStrings,
    prompt,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { splitCommaSeparated, withSuppressedLogs } from '../utils/format'

async function updateNsfRecord() {
    const vault = await login()

    try {
        const records = splitCommaSeparated(await prompt('Record UID(s) or title(s), comma-separated: '))
        if (records.length === 0) {
            logger.info('At least one record is required.')
            return
        }

        const title = (await prompt('New title (optional): ')).trim()
        const recordType = (await prompt('Record type (optional): ')).trim()
        const notes = (await prompt('Notes (optional): ')).trim()
        const fieldsInput = (await prompt('Fields (type=value, comma-separated, optional): ')).trim()
        const fields = fieldsInput
            ? parseNsfFieldStrings(splitCommaSeparated(fieldsInput)).fields
            : undefined

        const result = await withSuppressedLogs(() =>
            vault.updateNestedShareRecords({
                records,
                title: title || undefined,
                recordType: recordType || undefined,
                notes: notes || undefined,
                fields,
            })
        )

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

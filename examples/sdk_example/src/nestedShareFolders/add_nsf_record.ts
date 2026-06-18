import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    parseNsfFieldStrings,
    prompt,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes, withSuppressedLogs } from '../utils/format'

async function addNsfRecord() {
    const vault = await login()

    try {
        const title = (await prompt('Record title: ')).trim()
        const recordType = (await prompt('Record type (e.g. login, general): ')).trim()
        const folder = (await prompt('Folder name or UID (optional, Enter for root): ')).trim()
        const notes = (await prompt('Notes (optional): ')).trim()
        const fieldsInput = (await prompt('Fields (field=value, space-separated, optional): ')).trim()
        const force = isYes(await prompt('Ignore warnings (e.g. attachments)? [y/N]: '))

        const parsed = fieldsInput ? parseNsfFieldStrings(fieldsInput.split(/\s+/)) : undefined
        const result = await withSuppressedLogs(() =>
            vault.addNestedShareRecord({
                title,
                recordType,
                folder: folder || undefined,
                notes: notes || undefined,
                fields: parsed?.fields,
                custom: parsed?.custom,
                hasFileFields: parsed?.hasFileFields,
                force,
            })
        )

        logger.info('')
        logger.info(`Record UID: ${result.recordUid}`)
        logger.info(`Status: ${result.status}`)
        if (result.message) logger.info(`Message: ${result.message}`)
        if (result.revision != null) logger.info(`Revision: ${result.revision}`)
        logger.info('')
    } catch (err) {
        logger.error(`Record add failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(addNsfRecord)

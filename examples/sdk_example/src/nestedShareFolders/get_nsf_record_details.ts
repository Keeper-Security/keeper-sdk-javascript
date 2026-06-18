import {
    cleanup,
    extractErrorMessage,
    GetNsfRecordDetailsFormat,
    login,
    logger,
    prompt,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { splitCommaSeparated, withSuppressedLogs } from '../utils/format'

async function getNsfRecordDetails() {
    const vault = await login()

    try {
        const records = splitCommaSeparated(await prompt('Record UID(s) or title(s), comma-separated: '))
        if (records.length === 0) {
            logger.info('At least one record is required.')
            return
        }

        const formatInput = (await prompt('Output format (table/json) [table]: ')).trim().toLowerCase()
        const format =
            formatInput === 'json' ? GetNsfRecordDetailsFormat.JSON : GetNsfRecordDetailsFormat.Table

        const result = await withSuppressedLogs(() => vault.getNestedShareRecordDetails({ records, format }))

        logger.info('')
        logger.info(vault.formatNsfRecordDetailsOutput(result, format))
        logger.info('')
    } catch (err) {
        logger.error(`Record details failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(getNsfRecordDetails)

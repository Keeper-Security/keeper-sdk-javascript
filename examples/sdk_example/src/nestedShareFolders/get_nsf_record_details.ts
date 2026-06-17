import {
    cleanup,
    extractErrorMessage,
    GetNsfRecordDetailsFormat,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

async function getNsfRecordDetails() {
    const vault = await login()

    try {
        const recordsInput = (await prompt('Record UID(s) or title(s), comma-separated: ')).trim()
        const records = recordsInput.split(',').map((value) => value.trim()).filter(Boolean)
        if (records.length === 0) {
            logger.info('At least one record is required.')
            return
        }

        const formatInput = (await prompt('Output format (table/json) [table]: ')).trim().toLowerCase()
        const format =
            formatInput === 'json' ? GetNsfRecordDetailsFormat.JSON : GetNsfRecordDetailsFormat.Table

        const restore = suppressLogs()
        let result
        try {
            result = await vault.getNestedShareRecordDetails({ records, format })
        } finally {
            restore()
        }

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
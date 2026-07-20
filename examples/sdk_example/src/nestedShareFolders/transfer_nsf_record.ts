import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { splitCommaSeparated, withSuppressedLogs } from '../utils/format'

async function transferNsfRecord() {
    const vault = await login()

    try {
        const records = splitCommaSeparated(
            await prompt('Record UID(s) or title(s), comma-separated: ')
        )
        if (records.length === 0) {
            logger.info('At least one record is required.')
            return
        }

        const newOwnerEmail = (await prompt('New owner email: ')).trim()
        if (!newOwnerEmail) {
            logger.info('New owner email is required.')
            return
        }

        const result = await withSuppressedLogs(() =>
            vault.transferNestedShareRecords({
                records,
                newOwnerEmail,
            })
        )

        logger.info('')
        logger.info(vault.formatTransferNestedShareRecordResults(result.results))
        if (result.success) {
            logger.info('')
            logger.info('Warning: You will no longer have access to transferred record(s).')
        }
    } catch (err) {
        logger.error(`Record transfer failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(transferNsfRecord)

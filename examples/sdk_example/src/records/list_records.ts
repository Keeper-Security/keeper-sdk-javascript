import { login, cleanup, formatRecord, logger } from 'keeper-sdk'
import { runExample } from '../utils/runner'

async function listRecords() {
    const vault = await login()

    try {
        const records = vault.getRecords()

        if (records.length === 0) {
            logger.info('No records found in vault.')
            return
        }

        logger.info('Vault Records:')
        for (const record of records) {
            logger.info(formatRecord(record))
        }
        logger.info('-'.repeat(50))
    } finally {
        cleanup(vault)
    }
}

runExample(listRecords)

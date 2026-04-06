import { login, cleanup, formatRecord, logger, extractErrorMessage } from 'keeper-sdk'

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
        await cleanup(vault)
    }
}

listRecords()
    .then(() => process.exit(0))
    .catch((err) => {
        logger.error('Error:', extractErrorMessage(err))
        process.exit(1)
    })

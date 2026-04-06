import { login, cleanup, suppressLogs, formatRecord, getRecordTitle, logger, extractErrorMessage } from 'keeper-sdk'

async function addRecord() {
    const vault = await login()

    try {
        logger.info('Adding new record to vault...')
        logger.info('-'.repeat(50))

        const result = await vault.addRecord({
            version: 3,
            data: {
                type: 'login',
                title: 'Example SDK Record',
                fields: [
                    { type: 'login', value: ['userSDK@example.com'] },
                    { type: 'password', value: ['SecureSDKPassword123!'] },
                    { type: 'url', value: ['https://SDKexample.com'] },
                ],
                notes: 'This is an example record created using the Keeper SDK',
            },
        })

        if (result.success) {
            logger.info('Successfully added record!')
            logger.info(`Record UID: ${result.recordUid}`)

            logger.info('\nVerifying record was added...')
            const restore = suppressLogs()
            try {
                await vault.sync()
            } finally {
                restore()
            }

            const record = vault.getRecordByUid(result.recordUid)
            if (record) {
                logger.info(`Verified: "${getRecordTitle(record)}" found in vault.`)
                logger.info(formatRecord(record, true))
            }
        } else {
            logger.error(`Error adding record: ${result.status}`)
        }
    } finally {
        await cleanup(vault)
    }
}

addRecord()
    .then(() => process.exit(0))
    .catch((err) => {
        logger.error('Error:', extractErrorMessage(err))
        process.exit(1)
    })

import { login, cleanup, prompt, getRecordTitle, logger, extractErrorMessage } from 'keeper-sdk'

async function deleteRecord() {
    const vault = await login()

    try {
        const uid = await prompt('Enter Record UID or title to delete: ')
        if (!uid) {
            logger.info('No input provided.')
            return
        }

        const record = vault.findRecord(uid)
        if (!record) {
            logger.info(`Record "${uid}" not found.`)
            return
        }

        const title = getRecordTitle(record)
        const confirm = await prompt(`\nAre you sure you want to delete "${title}" (${record.uid})? [y/N]: `)

        if (confirm.toLowerCase() !== 'y') {
            logger.info('Delete cancelled.')
            return
        }

        logger.info('Deleting record...')
        const result = await vault.deleteRecord(record.uid)

        if (result.success) {
            logger.info(`Record "${title}" deleted successfully.`)
        } else {
            logger.error(`Failed to delete record: ${result.message || 'Unknown error'}`)
        }
    } finally {
        await cleanup(vault)
    }
}

deleteRecord()
    .then(() => process.exit(0))
    .catch((err) => {
        logger.error('Error:', extractErrorMessage(err))
        process.exit(1)
    })

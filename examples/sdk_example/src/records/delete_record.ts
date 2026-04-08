import { login, cleanup, prompt, getRecordTitle, logger } from 'keeper-sdk'
import { runExample } from '../utils/runner'

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
        const answer = await prompt(`\nAre you sure you want to delete "${title}" (${record.uid})? [y/N]: `)

        if (answer.toLowerCase() !== 'y') {
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
        cleanup(vault)
    }
}

runExample(deleteRecord)

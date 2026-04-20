import { login, cleanup, suppressLogs, prompt, getRecordTitle, logger } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

async function shareRecordExample() {
    const vault = await login()

    try {
        const recordInput = await prompt('Enter Record UID or title to share: ')
        if (!recordInput) {
            logger.info('No input provided.')
            return
        }

        const record = vault.findRecord(recordInput)
        if (!record) {
            logger.info(`Record "${recordInput}" not found.`)
            return
        }

        const title = getRecordTitle(record)
        logger.info(`\nRecord: "${title}" (${record.uid})`)

        const email = await prompt('Enter email of user to share with: ')
        if (!email) {
            logger.info('No email provided.')
            return
        }

        const editAnswer = await prompt('Grant edit permission? (y/N): ')
        const canEdit = editAnswer.toLowerCase() === 'y'

        const shareAnswer = await prompt('Grant re-share permission? (y/N): ')
        const canShare = shareAnswer.toLowerCase() === 'y'

        logger.info(`\nSharing "${title}" with ${email}...`)
        logger.info(`  Can Edit: ${canEdit}`)
        logger.info(`  Can Share: ${canShare}`)

        let result
        {
            const restore = suppressLogs()
            try {
                result = await vault.shareRecord({
                    recordUid: record.uid,
                    email,
                    canEdit,
                    canShare,
                })
            } finally {
                restore()
            }
        }

        if (result.success) {
            logger.info(`\nRecord "${title}" shared with ${email} successfully.`)
            logger.info(`Status: ${result.status}`)
        } else {
            logger.error(`\nFailed to share record: ${result.message}`)
            logger.error(`Status: ${result.status}`)
        }
    } finally {
        cleanup(vault)
    }
}

runExample(shareRecordExample)

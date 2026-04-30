import { login, cleanup, suppressLogs, prompt, getRecordTitle, logger } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

async function moveRecord() {
    const vault = await login()

    try {
        const recordInput = await prompt('Enter Record UID or title to move: ')
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

        const sharedFolders = vault.getSharedFolders()
        const userFolders = vault.getUserFolders()

        if (sharedFolders.length > 0 || userFolders.length > 0) {
            logger.info('\nAvailable folders:')
            for (const userFolder of userFolders) {
                const name = userFolder.data?.name || userFolder.uid
                logger.info(`  [User]   ${userFolder.uid}  ${name}`)
            }
            for (const sharedFolder of sharedFolders) {
                const name = sharedFolder.name || sharedFolder.data?.name || sharedFolder.uid
                logger.info(`  [Shared] ${sharedFolder.uid}  ${name}`)
            }
        }

        const destinationFolderUid = await prompt('\nEnter destination folder UID (empty for root): ')

        logger.info(`\nMoving "${title}" to ${destinationFolderUid || '(root)'}...`)

        let result
        {
            const restore = suppressLogs()
            try {
                result = await vault.moveRecord({
                    recordUid: record.uid,
                    dstFolderUid: destinationFolderUid || '',
                })
            } finally {
                restore()
            }
        }

        if (result.success) {
            logger.info(`Record "${title}" moved successfully.`)
        } else {
            logger.error(`Failed to move record: ${result.message}`)
        }
    } finally {
        cleanup(vault)
    }
}

runExample(moveRecord)

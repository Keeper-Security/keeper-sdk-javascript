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

        const folders = vault.getSharedFolders()
        const userFolders = vault.getUserFolders()

        if (folders.length > 0 || userFolders.length > 0) {
            logger.info('\nAvailable folders:')
            for (const uf of userFolders) {
                const name = uf.data?.name || uf.uid
                logger.info(`  [User]   ${uf.uid}  ${name}`)
            }
            for (const sf of folders) {
                const name = sf.name || sf.data?.name || sf.uid
                logger.info(`  [Shared] ${sf.uid}  ${name}`)
            }
        }

        const dstFolderUid = await prompt('\nEnter destination folder UID (empty for root): ')

        logger.info(`\nMoving "${title}" to ${dstFolderUid || '(root)'}...`)

        let result
        {
            const restore = suppressLogs()
            try {
                result = await vault.moveRecord({
                    recordUid: record.uid,
                    dstFolderUid: dstFolderUid || '',
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
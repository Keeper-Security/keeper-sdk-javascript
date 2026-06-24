import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

async function linkNsf() {
    const vault = await login()

    try {
        const recordIdentifier = (await prompt('Record UID or title: ')).trim()
        const folderIdentifier = (await prompt('Destination folder UID or name: ')).trim()
        if (!recordIdentifier || !folderIdentifier) {
            logger.info('Both record and folder are required.')
            return
        }

        const restore = suppressLogs()
        let result
        try {
            result = await vault.linkNestedShareRecord(recordIdentifier, folderIdentifier)
        } finally {
            restore()
        }

        logger.info('')
        logger.info(result.message)
        logger.info(`Record: ${result.recordUid}`)
        logger.info(`Folder: ${result.folderUid}`)
        logger.info(`Status: ${result.status}`)
        logger.info('')
    } catch (err) {
        logger.error(`Link failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(linkNsf)

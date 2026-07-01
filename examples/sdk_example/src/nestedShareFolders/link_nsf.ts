import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { promptRequired } from '../utils/promptCommands'

async function linkNsf() {
    const vault = await login()

    try {
        const recordIdentifier = await promptRequired('Record UID or title: ')
        const folderIdentifier = await promptRequired('Destination folder UID or name: ')

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

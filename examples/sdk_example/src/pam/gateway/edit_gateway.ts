import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'

async function editGatewayExample() {
    const vault = await login()

    try {
        const gatewayUidOrName = (await prompt('Gateway UID or name: ')).trim()
        if (!gatewayUidOrName) {
            logger.info('Gateway UID or name is required.')
            return
        }

        const name = (await prompt('New name (Enter to keep current): ')).trim() || undefined
        const nodeIdRaw = (await prompt('New node ID or name (Enter to keep current): ')).trim()
        const nodeIdOrName = nodeIdRaw || undefined

        if (!name && !nodeIdOrName) {
            logger.info('Nothing to do. Provide at least a new name or node.')
            return
        }

        let result
        const restore = suppressLogs()
        try {
            result = await vault.editGateway({ gatewayUidOrName, name, nodeIdOrName })
        } finally {
            restore()
        }

        logger.info('')
        logger.info(vault.formatEditGatewayOutput(result))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(editGatewayExample)

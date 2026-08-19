import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'
import { formatRemoveGatewayOutput } from '../formatOutput'

async function removeGatewayExample() {
    const vault = await login()

    try {
        const gatewayUidOrName = (await prompt('Gateway UID(s) or name(s), comma-separated: '))
            .split(',')
            .map((entry) => entry.trim())
            .filter(Boolean)
        if (!gatewayUidOrName.length) {
            logger.info('Gateway UID or name is required.')
            return
        }

        let result
        const restore = suppressLogs()
        try {
            result = await vault.removeGateway({ gatewayUidOrName })
        } finally {
            restore()
        }

        logger.info('')
        logger.info(formatRemoveGatewayOutput(result))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(removeGatewayExample)

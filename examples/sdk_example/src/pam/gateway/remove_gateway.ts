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
        const gatewayUidOrNames = (await prompt('Gateway UID(s) or name(s), comma-separated: '))
            .split(',')
            .map((entry) => entry.trim())
            .filter(Boolean)
        if (!gatewayUidOrNames.length) {
            logger.info('Gateway UID or name is required.')
            return
        }

        const restore = suppressLogs()
        try {
            for (const gatewayUidOrName of gatewayUidOrNames) {
                const result = await vault.removeGateway({ gatewayUidOrName })
                logger.info('')
                logger.info(formatRemoveGatewayOutput(result))
            }
        } finally {
            restore()
        }
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(removeGatewayExample)

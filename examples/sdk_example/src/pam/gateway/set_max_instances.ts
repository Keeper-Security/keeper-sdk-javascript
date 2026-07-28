import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'

async function setGatewayMaxInstancesExample() {
    const vault = await login()

    try {
        const gatewayUidOrName = (await prompt('Gateway UID or name: ')).trim()
        if (!gatewayUidOrName) {
            logger.info('Gateway UID or name is required.')
            return
        }

        const maxRaw = (await prompt('Maximum instances (>= 1): ')).trim()
        const maxInstances = Number(maxRaw)
        if (!Number.isFinite(maxInstances) || maxInstances < 1) {
            logger.info('Maximum instances must be an integer >= 1.')
            return
        }

        let result
        const restore = suppressLogs()
        try {
            result = await vault.setGatewayMaxInstances({
                gatewayUidOrName,
                maxInstances: Math.floor(maxInstances),
            })
        } finally {
            restore()
        }

        logger.info('')
        logger.info(vault.formatSetGatewayMaxInstancesOutput(result))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(setGatewayMaxInstancesExample)

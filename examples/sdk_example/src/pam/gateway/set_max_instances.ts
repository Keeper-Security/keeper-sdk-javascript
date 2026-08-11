import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    MAX_GATEWAY_MAX_INSTANCES,
    MIN_GATEWAY_MAX_INSTANCES,
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

        const maxRaw = (
            await prompt(`Maximum instances (${MIN_GATEWAY_MAX_INSTANCES}-${MAX_GATEWAY_MAX_INSTANCES}): `)
        ).trim()
        if (!/^\d+$/.test(maxRaw)) {
            logger.info(
                `Maximum instances must be an integer between ${MIN_GATEWAY_MAX_INSTANCES} and ${MAX_GATEWAY_MAX_INSTANCES}.`
            )
            return
        }
        const maxInstances = Number.parseInt(maxRaw, 10)

        let result
        const restore = suppressLogs()
        try {
            result = await vault.setGatewayMaxInstances({
                gatewayUidOrName,
                maxInstances,
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

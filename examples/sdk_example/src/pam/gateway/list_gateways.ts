import {
    cleanup,
    extractErrorMessage,
    GatewayListFormat,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'
import { isYes } from '../../utils/format'

async function listGatewaysExample() {
    const vault = await login()

    try {
        const force = isYes(await prompt('Force list if router is down? [y/N]: '))
        const verbose = isYes(await prompt('Verbose output? [y/N]: '))
        const onlineOnly = isYes(await prompt('Online gateways only? [y/N]: '))
        const asJson = isYes(await prompt('Output as JSON? [y/N]: '))

        const options = {
            force,
            verbose,
            onlineOnly,
            format: asJson ? GatewayListFormat.Json : GatewayListFormat.Table,
        }

        let result
        const restore = suppressLogs()
        try {
            result = await vault.listGateways(options)
        } finally {
            restore()
        }

        if (result.aborted) {
            logger.info(result.message || 'Router unavailable. Re-run with force to list gateways.')
            return
        }

        if (result.gateways.length === 0) {
            logger.info(result.message || 'No gateways found.')
            return
        }

        logger.info('')
        logger.info(vault.formatGatewaysOutput(result, options))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(listGatewaysExample)

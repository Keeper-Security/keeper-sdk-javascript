import {
    cleanup,
    extractErrorMessage,
    GatewayConfigInitFormat,
    login,
    logger,
    prompt,
    suppressLogs,
    type CreateGatewayResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'
import { isYes } from '../../utils/format'

async function createGatewayExample() {
    const vault = await login()

    try {
        const name = (await prompt('Gateway name: ')).trim()
        if (!name) {
            logger.info('Gateway name is required.')
            return
        }

        const application = (await prompt('KSM application name or UID: ')).trim()
        if (!application) {
            logger.info('KSM application is required.')
            return
        }

        const expireRaw = (await prompt('Token expires in minutes [60]: ')).trim()
        const tokenExpiresInMin = expireRaw ? Number(expireRaw) : 60

        const wantConfig = isYes(await prompt('Initialize config (json/b64) instead of raw OTT? [y/N]: '))
        let configInit: GatewayConfigInitFormat | undefined
        if (wantConfig) {
            const format = (await prompt('Config format — json or b64 [json]: ')).trim().toLowerCase() || 'json'
            configInit =
                format === GatewayConfigInitFormat.B64 || format === 'b64'
                    ? GatewayConfigInitFormat.B64
                    : GatewayConfigInitFormat.Json
        }

        // Commander: --return_value / -r — return token/config string for automation (skip banner).
        const returnValue = isYes(await prompt('Return value only (automation / -r)? [y/N]: '))

        let result: CreateGatewayResult | string
        const restore = suppressLogs()
        try {
            result = await vault.createGateway({
                name,
                application,
                tokenExpiresInMin,
                configInit,
                returnValue,
            })
        } finally {
            restore()
        }

        if (returnValue) {
            // Same as Commander: no banner — just the OTT or initialized config string.
            logger.info(result as string)
            return
        }

        logger.info('')
        logger.info(vault.formatCreateGatewayOutput(result as CreateGatewayResult))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(createGatewayExample)

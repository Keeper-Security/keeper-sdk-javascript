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
import { formatCreateGatewayOutput } from '../formatOutput'

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

        // Accept ott (default), json, b64 — also y/yes → json for convenience.
        const configChoice = (await prompt('Config output — ott, json, or b64 [ott]: ')).trim().toLowerCase()
        let configInit: GatewayConfigInitFormat | undefined
        if (
            configChoice === GatewayConfigInitFormat.Json ||
            configChoice === 'json' ||
            configChoice === 'y' ||
            configChoice === 'yes'
        ) {
            configInit = GatewayConfigInitFormat.Json
        } else if (configChoice === GatewayConfigInitFormat.B64 || configChoice === 'b64') {
            configInit = GatewayConfigInitFormat.B64
        } else if (configChoice && configChoice !== 'ott' && configChoice !== 'n' && configChoice !== 'no') {
            logger.info(`Invalid config output "${configChoice}". Use ott, json, or b64.`)
            return
        }

        // Automation / Commander -r: print only tokenOrConfig (OTT, json, or b64).
        const returnValueOnly = isYes(await prompt('Return value only (automation / -r)? [y/N]: '))

        let result: CreateGatewayResult
        const restore = suppressLogs()
        try {
            result = await vault.createGateway({
                name,
                application,
                tokenExpiresInMin,
                configInit,
            })
        } finally {
            restore()
        }

        if (returnValueOnly) {
            logger.info(result.tokenOrConfig)
            return
        }

        logger.info('')
        logger.info(formatCreateGatewayOutput(result))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(createGatewayExample)

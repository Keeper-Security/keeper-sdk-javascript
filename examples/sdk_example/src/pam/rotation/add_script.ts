import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'

async function addRotationScriptExample() {
    const vault = await login()

    try {
        const record = (await prompt('Target PAM record UID or name: ')).trim()
        if (!record) {
            logger.error('Record is required.')
            return
        }

        const scriptPath = (await prompt('Script file path: ')).trim()
        if (!scriptPath) {
            logger.error('Script path is required.')
            return
        }

        const scriptCommand = (await prompt('Script command (optional): ')).trim() || undefined

        const credentialStr = (await prompt('Credential UIDs (comma-separated, optional): ')).trim()
        const credentialUids = credentialStr
            ? credentialStr.split(',').map((s) => s.trim())
            : undefined

        logger.info('\nAdding rotation script...\n')

        const result = await vault.addRotationScript({
            record,
            scriptPath,
            scriptCommand,
            credentialUids,
        })

        if (!result.success) {
            logger.error(`Error: ${result.message}`)
            process.exitCode = 1
            return
        }

        logger.info(`✓ ${result.message}`)
        logger.info(`Script File UID: ${result.scriptFileUid}`)

        if (result.warnings.length > 0) {
            logger.warn('\nWarnings:')
            result.warnings.forEach((w) => logger.warn(`  - ${w}`))
        }

        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(addRotationScriptExample)

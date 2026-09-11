import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'

async function editRotationScriptExample() {
    const vault = await login()

    try {
        const record = (await prompt('Target PAM record UID or name: ')).trim()
        if (!record) {
            logger.error('Record is required.')
            return
        }

        const script = (await prompt('Script UID or name: ')).trim()
        if (!script) {
            logger.error('Script is required.')
            return
        }

        const scriptCommand = (await prompt('New script command (optional): ')).trim() || undefined

        const addCredStr = (await prompt('Credentials to add (comma-separated, optional): ')).trim()
        const addCredentials = addCredStr
            ? addCredStr.split(',').map((s) => s.trim())
            : undefined

        const removeCredStr = (await prompt('Credentials to remove (comma-separated, optional): ')).trim()
        const removeCredentials = removeCredStr
            ? removeCredStr.split(',').map((s) => s.trim())
            : undefined

        logger.info('\nEditing rotation script...\n')

        const result = await vault.editRotationScript({
            record,
            script,
            scriptCommand,
            addCredentials,
            removeCredentials,
        })

        if (!result.success) {
            logger.error(`Error: ${result.message}`)
            process.exitCode = 1
            return
        }

        logger.info(`✓ ${result.message}`)

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

runExample(editRotationScriptExample)

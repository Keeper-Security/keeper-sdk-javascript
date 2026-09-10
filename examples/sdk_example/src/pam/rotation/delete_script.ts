import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
} from '@keeper-security/keeper-sdk-javascript'
import { isYes } from '../../utils/promptCommands'
import { runExample } from '../../utils/runner'

async function deleteRotationScriptExample() {
    const vault = await login()

    try {
        const record = (await prompt('Target PAM record UID or name: ')).trim()
        if (!record) {
            logger.error('Record is required.')
            return
        }

        const script = (await prompt('Script UID or name (optional - leaves empty to delete first script): ')).trim()

        const confirm = await prompt('Are you sure you want to delete this script? (yes/no): ')
        if (!isYes(confirm)) {
            logger.info('Operation cancelled.')
            return
        }

        logger.info('\nDeleting rotation script...\n')

        const result = await vault.deleteRotationScript({
            record,
            script,
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

runExample(deleteRotationScriptExample)

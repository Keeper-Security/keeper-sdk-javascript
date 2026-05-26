import {
    AliasOperation,
    aliasUser,
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { AliasUserResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

const OPERATION_CHOICES: Record<string, AliasOperation> = {
    '1': AliasOperation.Add,
    '2': AliasOperation.Remove,
}

async function aliasUserExample() {
    const vault = await login()

    try {
        logger.info('')
        logger.info('Select an operation:')
        logger.info('  1) Add alias  (promotes to primary if alias already exists)')
        logger.info('  2) Remove alias')
        logger.info('')

        const choice = (await prompt('Operation [1-2]: ')).trim()
        const operation = OPERATION_CHOICES[choice]
        if (!operation) {
            logger.error('Invalid choice. Please enter 1 or 2.')
            process.exitCode = 1
            return
        }

        const email = (await prompt('User email or ID: ')).trim()
        if (!email) {
            logger.error('User email or ID is required.')
            process.exitCode = 1
            return
        }

        const alias = (await prompt('Alias email: ')).trim()
        if (!alias) {
            logger.error('Alias email is required.')
            process.exitCode = 1
            return
        }

        const restore = suppressLogs()
        let result: AliasUserResult
        try {
            result = await vault.aliasUser({ email, operation, alias })
        } finally {
            restore()
        }

        logger.info('')
        logger.info(`User:      ${result.username} (ID: ${result.enterpriseUserId})`)
        logger.info(`Alias:     ${result.alias}`)
        logger.info(`Operation: ${result.operation}`)
        logger.info(`Result:    ${result.success ? 'success' : 'no-op'} — ${result.detail}`)
        logger.info('')

        if (!result.success) {
            process.exitCode = 1
        }
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(aliasUserExample)
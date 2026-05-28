import {
    cleanup,
    extractErrorMessage,
    formatUserActionResult,
    login,
    logger,
    prompt,
    renderUserActionAsciiTable,
    suppressLogs,
    UserAction,
} from '@keeper-security/keeper-sdk-javascript'
import type { UserActionResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

const ACTION_CHOICES: Record<string, UserAction> = {
    '1': UserAction.Lock,
    '2': UserAction.Unlock,
    '3': UserAction.ExpirePassword,
}

function parseIdentifierList(raw: string): string[] {
    const seen = new Set<string>()
    const out: string[] = []
    for (const token of raw.split(',')) {
        const trimmed = token.trim()
        if (!trimmed) continue
        const key = trimmed.toLowerCase()
        if (seen.has(key)) continue
        seen.add(key)
        out.push(trimmed)
    }
    return out
}

async function actionUserExample() {
    const vault = await login()

    try {
        logger.info('')
        logger.info('Select an action:')
        logger.info('  1) Lock user')
        logger.info('  2) Unlock user  (supports @all)')
        logger.info('  3) Expire master password')
        logger.info('')

        const choice = (await prompt('Action [1-3]: ')).trim()
        const action = ACTION_CHOICES[choice]
        if (!action) {
            logger.error('Invalid choice. Please enter 1, 2, or 3.')
            process.exitCode = 1
            return
        }

        const isUnlock = action === UserAction.Unlock
        const hint = isUnlock ? 'User email(s), ID(s), or @all (comma-separated): ' : 'User email(s) or ID(s) (comma-separated): '
        const emailsRaw = (await prompt(hint)).trim()
        const emails = parseIdentifierList(emailsRaw)

        if (emails.length === 0) {
            logger.error('At least one user email, ID, or @all is required.')
            process.exitCode = 1
            return
        }

        const restore = suppressLogs()
        let result: UserActionResult
        try {
            result = await vault.actionUsers({ emails, action })
        } finally {
            restore()
        }

        const table = formatUserActionResult(result)
        logger.info('')
        logger.info(renderUserActionAsciiTable(table))
        logger.info('')
        logger.info(
            `Result: ${result.success ? 'success' : 'partial/failed'} ` +
                `(succeeded=${result.succeeded}, skipped=${result.skipped}, failed=${result.failed})`
        )

        if (result.failed > 0 || (!result.success && result.succeeded === 0)) {
            process.exitCode = 1
        }
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(actionUserExample)

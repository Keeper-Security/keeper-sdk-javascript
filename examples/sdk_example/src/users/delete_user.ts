import {
    cleanup,
    extractErrorMessage,
    formatDeleteUserResult,
    login,
    logger,
    prompt,
    renderDeleteUserAsciiTable,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { DeleteUserResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

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

async function deleteUserExample() {
    const vault = await login()

    try {
        const emailsRaw = (await prompt('User email(s) or ID(s) to delete (comma-separated): ')).trim()
        const emails = parseIdentifierList(emailsRaw)
        if (emails.length === 0) {
            logger.error('At least one user email or ID is required.')
            process.exitCode = 1
            return
        }

        logger.warn('')
        logger.warn('WARNING: Deleting a user will also delete all records owned and shared by that user.')
        logger.warn('Before deleting, consider locking the account and transferring records first.')
        logger.warn('This action cannot be undone.')
        logger.warn('')

        const confirmed = isYes(
            await prompt(`Permanently delete ${emails.length} user(s)? [y/N]: `)
        )
        if (!confirmed) {
            logger.info('Deletion cancelled.')
            return
        }

        const restore = suppressLogs()
        let result: DeleteUserResult
        try {
            result = await vault.deleteUsers({ emails })
        } finally {
            restore()
        }

        const table = formatDeleteUserResult(result)
        logger.info('')
        logger.info(renderDeleteUserAsciiTable(table))
        logger.info('')
        logger.info(
            `Result: ${result.success ? 'success' : 'partial/failed'} ` +
                `(deleted=${result.deleted}, failed=${result.failed})`
        )

        if (result.failed > 0 || (!result.success && result.deleted === 0)) {
            process.exitCode = 1
        }
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(deleteUserExample)

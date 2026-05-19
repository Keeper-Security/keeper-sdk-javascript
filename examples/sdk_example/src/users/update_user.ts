import {
    cleanup,
    extractErrorMessage,
    formatUpdateUserResult,
    login,
    logger,
    prompt,
    renderUpdateUserAsciiTable,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { UpdateUserResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

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

async function updateUserExample() {
    const vault = await login()

    try {
        const emailsRaw = (await prompt('User email(s) or ID(s) to update (comma-separated): ')).trim()
        const emails = parseIdentifierList(emailsRaw)
        if (emails.length === 0) {
            logger.error('At least one user email or ID is required.')
            process.exitCode = 1
            return
        }

        const parentRaw = (await prompt('New parent node name or ID (Enter to keep current): ')).trim()
        const parent: string | null = parentRaw || null

        const fullName = (await prompt('New full name (Enter to keep current): ')).trim() || undefined
        const jobTitle = (await prompt('New job title (Enter to keep current): ')).trim() || undefined

        const removeTeamRaw = (await prompt('Team name(s) or UID(s) to remove user from (comma-separated, Enter to skip): ')).trim()
        const removeTeam = removeTeamRaw ? parseIdentifierList(removeTeamRaw) : undefined

        const removeRoleRaw = (await prompt('Role name(s) or ID(s) to revoke from user (comma-separated, Enter to skip): ')).trim()
        const removeRole = removeRoleRaw ? parseIdentifierList(removeRoleRaw) : undefined

        const restore = suppressLogs()
        let result: UpdateUserResult
        try {
            result = await vault.updateUsers({
                emails,
                parent,
                fullName,
                jobTitle,
                removeTeam,
                removeRole,
            })
        } finally {
            restore()
        }

        const table = formatUpdateUserResult(result)
        logger.info('')
        logger.info(renderUpdateUserAsciiTable(table))
        logger.info('')
        logger.info(
            `Result: ${result.success ? 'success' : 'partial/failed'} ` +
                `(updated=${result.updated}, failed=${result.failed})`
        )

        if (result.failed > 0 || (!result.success && result.updated === 0)) {
            process.exitCode = 1
        }
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(updateUserExample)

import {
    cleanup,
    extractErrorMessage,
    formatDeleteRoleResult,
    login,
    logger,
    prompt,
    renderDeleteRoleAsciiTable,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { DeleteRoleResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

function parseRoleIdentifiers(raw: string): string[] {
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

async function deleteRoleExample() {
    const vault = await login()

    try {
        const rolesRaw = (await prompt('Role name(s) or ID(s) to delete (comma-separated): ')).trim()
        const roles = parseRoleIdentifiers(rolesRaw)
        if (roles.length === 0) {
            logger.error('At least one role name or ID is required.')
            process.exitCode = 1
            return
        }

        const confirmed = isYes(
            await prompt(`Permanently delete ${roles.length} role(s)? This cannot be undone. [y/N]: `)
        )
        if (!confirmed) {
            logger.info('Deletion cancelled.')
            return
        }

        const restore = suppressLogs()
        let result: DeleteRoleResult
        try {
            result = await vault.deleteRoles({ roles })
        } finally {
            restore()
        }

        const table = formatDeleteRoleResult(result)
        logger.info('')
        logger.info(renderDeleteRoleAsciiTable(table))
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

runExample(deleteRoleExample)

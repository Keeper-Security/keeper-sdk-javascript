import {
    cleanup,
    extractErrorMessage,
    formatDeleteTeamResult,
    login,
    logger,
    prompt,
    renderDeleteTeamAsciiTable,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { DeleteTeamResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

function parseTeamIdentifiers(raw: string): string[] {
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

async function deleteTeamExample() {
    const vault = await login()

    try {
        const teamsRaw = (await prompt('Team name(s) or UID(s) to delete (comma-separated): ')).trim()
        const teams = parseTeamIdentifiers(teamsRaw)
        if (teams.length === 0) {
            logger.error('At least one team name or UID is required.')
            process.exitCode = 1
            return
        }

        const confirmed = isYes(
            await prompt(`Permanently delete ${teams.length} team(s)? This cannot be undone. [y/N]: `)
        )
        if (!confirmed) {
            logger.info('Deletion cancelled.')
            return
        }

        const restore = suppressLogs()
        let result: DeleteTeamResult
        try {
            result = await vault.deleteTeams({ teams })
        } finally {
            restore()
        }

        const table = formatDeleteTeamResult(result)
        logger.info('')
        logger.info(renderDeleteTeamAsciiTable(table))
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

runExample(deleteTeamExample)

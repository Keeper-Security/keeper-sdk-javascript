import {
    cleanup,
    extractErrorMessage,
    formatUpdateTeamResult,
    login,
    logger,
    prompt,
    renderUpdateTeamAsciiTable,
    suppressLogs,
    TeamRestriction,
} from '@keeper-security/keeper-sdk-javascript'
import type {
    TeamRestrictionInput,
    UpdateTeamResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

async function promptRestriction(label: string): Promise<TeamRestrictionInput> {
    const answer = (await prompt(`${label} [on/off, Enter to keep current]: `)).trim().toLowerCase()
    if (answer === 'on') return TeamRestriction.On
    if (answer === 'off') return TeamRestriction.Off
    return undefined
}

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

async function updateTeamExample() {
    const vault = await login()

    try {
        const teamsRaw = (await prompt('Team name(s) or UID(s) to update (comma-separated): ')).trim()
        const teams = parseTeamIdentifiers(teamsRaw)
        if (teams.length === 0) {
            logger.error('At least one team name or UID is required.')
            process.exitCode = 1
            return
        }

        let name: string | undefined
        if (teams.length === 1) {
            const renamed = (await prompt('New team name (Enter to keep current): ')).trim()
            name = renamed || undefined
        } else {
            logger.info('Renaming is only allowed when updating a single team; skipping rename prompt.')
        }

        const parentRaw = (await prompt('Parent node name or ID (Enter to keep current): ')).trim()
        const parent: string | null = parentRaw || null

        const restrictEdit = await promptRestriction('Restrict edit?')
        const restrictShare = await promptRestriction('Restrict share?')
        const restrictView = await promptRestriction('Restrict view?')

        const restore = suppressLogs()
        let result: UpdateTeamResult
        try {
            result = await vault.updateTeams({
                teams,
                name,
                parent,
                restrictEdit,
                restrictShare,
                restrictView,
            })
        } finally {
            restore()
        }

        const table = formatUpdateTeamResult(result)
        logger.info('')
        logger.info(renderUpdateTeamAsciiTable(table))
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

runExample(updateTeamExample)

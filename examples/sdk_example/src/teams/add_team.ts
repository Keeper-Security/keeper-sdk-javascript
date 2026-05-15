import {
    cleanup,
    extractErrorMessage,
    formatAddTeamResult,
    login,
    logger,
    prompt,
    renderAddTeamAsciiTable,
    suppressLogs,
    TeamRestriction,
} from '@keeper-security/keeper-sdk-javascript'
import type {
    AddTeamConfirm,
    AddTeamResult,
    TeamRestrictionInput,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

async function promptRestriction(label: string): Promise<TeamRestrictionInput> {
    const answer = (await prompt(`${label} [on/off, Enter to skip]: `)).trim().toLowerCase()
    if (answer === 'on') return TeamRestriction.On
    if (answer === 'off') return TeamRestriction.Off
    return undefined
}

function parseTeamNames(raw: string): string[] {
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

async function addTeamExample() {
    const vault = await login()

    try {
        const teamsRaw = (await prompt('Team name(s) or queued team UID(s) (comma-separated): ')).trim()
        const teams = parseTeamNames(teamsRaw)
        if (teams.length === 0) {
            logger.error('At least one team name or queued team UID is required.')
            process.exitCode = 1
            return
        }

        const parentRaw = (await prompt('Parent node name or ID (Enter for enterprise root): ')).trim()
        const parent: string | null = parentRaw || null

        const restrictEdit = await promptRestriction('Restrict edit?')
        const restrictShare = await promptRestriction('Restrict share?')
        const restrictView = await promptRestriction('Restrict view?')

        const force = isYes(await prompt('Force-create on cross-node duplicates without prompting? [y/N]: '))

        const confirm: AddTeamConfirm = async ({ teamName, existingTeamUid, existingNodeName }) => {
            const ans = await prompt(
                `Team "${teamName}" already exists in node "${existingNodeName}" (uid=${existingTeamUid}). Create another in target node? [y/N]: `
            )
            return isYes(ans)
        }

        const restore = suppressLogs()
        let result: AddTeamResult
        try {
            result = await vault.addTeams({
                teams,
                parent,
                restrictEdit,
                restrictShare,
                restrictView,
                force,
                confirm: force ? undefined : confirm,
            })
        } finally {
            restore()
        }

        const table = formatAddTeamResult(result)
        logger.info('')
        logger.info(renderAddTeamAsciiTable(table))
        logger.info('')
        logger.info(
            `Result: ${result.success ? 'success' : 'partial/failed'} ` +
                `(created=${result.created}, skipped=${result.skipped}, failed=${result.failed})`
        )

        if (result.failed > 0 || (!result.success && result.created === 0)) {
            process.exitCode = 1
        }
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(addTeamExample)

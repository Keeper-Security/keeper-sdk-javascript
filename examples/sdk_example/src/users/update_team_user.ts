import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { UpdateUsersOnTeamsResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { splitCommaSeparated } from '../utils/format'

function parseHideSharedFolders(raw: string): boolean | null {
    const value = raw.trim().toLowerCase()
    if (value === 'on') return true
    if (value === 'off') return false
    return null
}

async function updateTeamUserExample() {
    const vault = await login()

    try {
        const usersRaw = (await prompt('User email(s) or ID(s) (comma-separated): ')).trim()
        const users = splitCommaSeparated(usersRaw)
        if (users.length === 0) {
            logger.error('At least one user email or ID is required.')
            process.exitCode = 1
            return
        }

        const teamsRaw = (await prompt('Team name(s) or UID(s) (comma-separated): ')).trim()
        const teams = splitCommaSeparated(teamsRaw)
        if (teams.length === 0) {
            logger.error('At least one team name or UID is required.')
            process.exitCode = 1
            return
        }

        const hideSharedFolders = parseHideSharedFolders(
            await prompt('Hide shared folders for these users on these teams? [on/off]: ')
        )
        if (hideSharedFolders === null) {
            logger.error('Invalid value. Use on or off.')
            process.exitCode = 1
            return
        }

        logger.info('Only users that are already members of the given team(s) will be updated.')

        const restore = suppressLogs()
        let result: UpdateUsersOnTeamsResult
        try {
            result = await vault.updateUsersOnTeams({ users, teams, hideSharedFolders })
        } finally {
            restore()
        }

        const table = vault.formatUpdateTeamUserResult(result)
        logger.info('')
        logger.info(vault.renderUpdateTeamUserAsciiTable(table))
        logger.info('')
        logger.info(
            `Result: ${result.success ? 'success' : 'partial/failed'} ` +
                `(updated=${result.updated}, skipped=${result.skipped}, failed=${result.failed})`
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

runExample(updateTeamUserExample)

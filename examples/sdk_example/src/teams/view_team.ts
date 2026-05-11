import {
    cleanup,
    extractErrorMessage,
    formatTeamView,
    login,
    logger,
    prompt,
    teamViewTable,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { TeamView } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

async function viewTeamExample() {
    const vault = await login()

    try {
        const identifier = (await prompt('Team name or UID: ')).trim()
        if (!identifier) {
            logger.error('Team name or UID is required.')
            process.exitCode = 1
            return
        }

        const asJson = isYes(await prompt('Output as JSON? [y/N]: '))
        const verbose = !asJson && isYes(await prompt('Show role/user IDs? [y/N]: '))

        let view: TeamView
        const restore = suppressLogs()
        try {
            view = await vault.viewTeam(identifier)
        } finally {
            restore()
        }

        if (asJson) {
            logger.info(JSON.stringify(view, null, 2))
            return
        }

        const table = formatTeamView(view, { verbose })
        logger.info('')
        logger.info(teamViewTable(table))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(viewTeamExample)

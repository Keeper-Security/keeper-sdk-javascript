import {
    cleanup,
    extractErrorMessage,
    formatTeamsTable,
    login,
    logger,
    prompt,
    renderTeamsAsciiTable,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { ListTeamRow } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

async function listTeamsExample() {
    const vault = await login()

    try {
        const asJson = isYes(await prompt('Output as JSON? [y/N]: '))
        const pattern = (await prompt('Search pattern (Enter to skip): ')).trim() || null

        let rows: ListTeamRow[]
        const restore = suppressLogs()
        try {
            rows = await vault.listTeams({ pattern })
        } finally {
            restore()
        }

        if (rows.length === 0) {
            logger.info(pattern ? `No teams matched "${pattern}".` : 'No teams found in enterprise.')
            return
        }

        if (asJson) {
            logger.info(JSON.stringify(rows, null, 2))
            return
        }

        const verbose = isYes(await prompt('Show full UIDs/names without truncation? [y/N]: '))
        const table = formatTeamsTable(rows, { verbose })
        logger.info('')
        logger.info(renderTeamsAsciiTable(table))
        logger.info('')
        logger.info(`Total: ${rows.length} team${rows.length === 1 ? '' : 's'}`)
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(listTeamsExample)

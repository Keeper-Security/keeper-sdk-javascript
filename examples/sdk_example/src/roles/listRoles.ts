import {
    cleanup,
    extractErrorMessage,
    formatRolesTable,
    login,
    logger,
    prompt,
    renderRolesAsciiTable,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { ListRoleRow } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

async function listRolesExample() {
    const vault = await login()

    try {
        const asJson = isYes(await prompt('Output as JSON? [y/N]: '))
        const pattern = (await prompt('Search pattern (Enter to skip): ')).trim() || null

        let rows: ListRoleRow[]
        const restore = suppressLogs()
        try {
            rows = await vault.listRoles({ pattern })
        } finally {
            restore()
        }

        if (rows.length === 0) {
            logger.info(pattern ? `No roles matched "${pattern}".` : 'No roles found in enterprise.')
            return
        }

        if (asJson) {
            logger.info(JSON.stringify(rows, null, 2))
            return
        }

        const table = formatRolesTable(rows)
        logger.info('')
        logger.info(renderRolesAsciiTable(table))
        logger.info('')
        logger.info(`Total: ${rows.length} role${rows.length === 1 ? '' : 's'}`)
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(listRolesExample)

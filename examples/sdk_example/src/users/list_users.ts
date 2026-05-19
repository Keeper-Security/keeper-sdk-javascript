import {
    cleanup,
    extractErrorMessage,
    formatUsersTable,
    login,
    logger,
    prompt,
    renderUsersAsciiTable,
    suppressLogs,
    SUPPORTED_USER_COLUMNS,
    UserColumn,
} from '@keeper-security/keeper-sdk-javascript'
import type { ListUserRow, UserColumnInput } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

function parseColumns(raw: string): UserColumnInput[] | '*' | null {
    const trimmed = raw.trim()
    if (!trimmed) return null
    if (trimmed === '*') return '*'
    return trimmed
        .split(',')
        .map((p) => p.trim())
        .filter((p) => p.length > 0) as UserColumnInput[]
}

async function listUsersExample() {
    const vault = await login()

    try {
        const asJson = isYes(await prompt('Output as JSON? [y/N]: '))
        const pattern = (await prompt('Search pattern (Enter to skip): ')).trim() || null

        logger.info('')
        logger.info(`Supported columns: ${SUPPORTED_USER_COLUMNS.join(', ')}`)
        logger.info(`Default columns: ${[UserColumn.Name, UserColumn.Status, UserColumn.TransferStatus, UserColumn.Node].join(', ')}`)
        const columnsRaw = await prompt('Columns (comma-separated, * for all, Enter for defaults): ')
        const columns = parseColumns(columnsRaw)

        let rows: ListUserRow[]
        const restore = suppressLogs()
        try {
            rows = await vault.listUsers({ pattern, columns })
        } finally {
            restore()
        }

        if (rows.length === 0) {
            logger.info(pattern ? `No users matched "${pattern}".` : 'No users found in enterprise.')
            return
        }

        if (asJson) {
            logger.info(JSON.stringify(rows, null, 2))
            return
        }

        const table = formatUsersTable(rows, { columns })
        logger.info('')
        logger.info(renderUsersAsciiTable(table))
        logger.info('')
        logger.info(`Total: ${rows.length} user${rows.length === 1 ? '' : 's'}`)
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(listUsersExample)

import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'

async function listRotationScriptsExample() {
    const vault = await login()

    try {
        const pattern = (await prompt('Search pattern (optional): ')).trim() || undefined

        logger.info('\nFetching rotation scripts...\n')

        const result = await vault.listRotationScripts({
            pattern,
        })

        if (!result.success) {
            logger.error(`Error: ${result.message}`)
            process.exitCode = 1
            return
        }

        if (result.scripts.length === 0) {
            logger.info(result.message || 'No rotation scripts found.')
            return
        }

        // Format as table
        const table = vault.formatRotationScriptsTable(result)
        if (table.length > 0) {
            const headers = table[0]
            const rows = table.slice(1)

            console.log('\n' + formatTable(headers, rows) + '\n')
        }

        logger.info(`Total: ${result.scripts.length} script(s)\n`)
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

/**
 * Format table for console display (simple format without borders)
 */
function formatTable(headers: string[], rows: string[][]): string {
    const colWidths = headers.map((h, i) => {
        const maxRowWidth = Math.max(...rows.map((r) => (r[i] || '').length))
        return Math.max(h.length, maxRowWidth)
    })

    const headerRow = headers
        .map((h, i) => h.padEnd(colWidths[i]))
        .join('  ')

    const separator = colWidths.map((w) => '-'.repeat(w)).join('  ')

    const dataRows = rows
        .map(
            (row) =>
                row
                    .map((cell, i) => (cell || '').padEnd(colWidths[i]))
                    .join('  ')
        )
        .join('\n')

    return [headerRow, separator, dataRows].join('\n')
}

runExample(listRotationScriptsExample)

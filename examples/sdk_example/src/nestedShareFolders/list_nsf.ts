import fs from 'fs/promises'
import {
    cleanup,
    extractErrorMessage,
    ListNsfFormat,
    login,
    logger,
    prompt,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

type ListMode = 'all' | 'folders' | 'records'

const MODE_BY_INPUT: Record<string, ListMode> = {
    '': 'all',
    '1': 'all',
    '2': 'folders',
    '3': 'records',
    all: 'all',
    folders: 'folders',
    records: 'records',
}

function parseMode(input: string): ListMode {
    return MODE_BY_INPUT[input.trim().toLowerCase()] ?? 'all'
}

async function listNsf() {
    const vault = await login()

    try {
        logger.info('Show: 1) all  2) folders only  3) records only')
        const mode = parseMode(await prompt('Choose [1]: '))
        const asJson = isYes(await prompt('Output as JSON? [y/N]: '))
        const asCsv = !asJson && isYes(await prompt('Output as CSV? [y/N]: '))
        const outputPath = (await prompt('Output file path (Enter for stdout): ')).trim()

        const format = asJson ? ListNsfFormat.JSON : asCsv ? ListNsfFormat.CSV : ListNsfFormat.Table
        const rows = vault.listNestedShareFolders({
            folders: mode !== 'records',
            records: mode !== 'folders',
        })

        if (rows.length === 0) {
            logger.info('No nested share folder items found.')
            return
        }

        const output = vault.formatListNsfOutput(rows, format)
        if (outputPath && format !== ListNsfFormat.Table) {
            await fs.writeFile(outputPath, output, 'utf-8')
            logger.info(`Wrote ${rows.length} row(s) to ${outputPath}`)
            return
        }

        logger.info('')
        logger.info(output)
        logger.info('')
        logger.info(`Total: ${rows.length} item${rows.length === 1 ? '' : 's'}`)
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(listNsf)

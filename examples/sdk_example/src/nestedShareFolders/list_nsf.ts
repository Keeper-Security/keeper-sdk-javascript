import fs from 'fs/promises'
import {
    cleanup,
    extractErrorMessage,
    ListNsfFormat,
    login,
    logger,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { promptChoice, promptOptional, promptYesNo, yesNoPrompt } from '../utils/promptCommands'

type ListMode = 'all' | 'folders' | 'records'

const LIST_MODE_CHOICES: Record<string, ListMode> = {
    '': 'all',
    '1': 'all',
    '2': 'folders',
    '3': 'records',
    all: 'all',
    folders: 'folders',
    records: 'records',
}

async function listNsf() {
    const vault = await login()

    try {
        logger.info('Show: 1) all  2) folders only  3) records only')
        const mode = await promptChoice('Choose [1]: ', LIST_MODE_CHOICES)
        const asJson = await promptYesNo(yesNoPrompt('Output as JSON?'))
        const asCsv = !asJson && (await promptYesNo(yesNoPrompt('Output as CSV?')))
        const outputPath = await promptOptional('Output file path (Enter for stdout): ')

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

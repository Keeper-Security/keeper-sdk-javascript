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
import { isYes, withSuppressedLogs } from '../utils/format'

type Vault = Awaited<ReturnType<typeof login>>

const ACTION_BY_INPUT: Record<string, 'list' | 'keep'> = {
    '': 'list',
    '1': 'list',
    '2': 'keep',
    list: 'list',
    keep: 'keep',
}

function parseAction(input: string): 'list' | 'keep' {
    return ACTION_BY_INPUT[input.trim().toLowerCase()] ?? 'list'
}

async function listShortcuts(vault: Vault): Promise<void> {
    const target = (await prompt('Filter by record or folder (Enter for all): ')).trim()
    const asJson = isYes(await prompt('Output as JSON? [y/N]: '))
    const asCsv = !asJson && isYes(await prompt('Output as CSV? [y/N]: '))
    const outputPath = (await prompt('Output file path (Enter for stdout): ')).trim()

    const format = asJson ? ListNsfFormat.JSON : asCsv ? ListNsfFormat.CSV : ListNsfFormat.Table
    const rows = vault.listNsfShortcuts({ target: target || undefined })

    if (rows.length === 0) {
        logger.info('No multi-folder records found.')
        return
    }

    const output = vault.formatNsfShortcutOutput(rows, format)
    if (outputPath && format !== ListNsfFormat.Table) {
        await fs.writeFile(outputPath, output, 'utf-8')
        logger.info(`Wrote ${rows.length} row(s) to ${outputPath}`)
        return
    }

    logger.info('')
    logger.info(output)
    logger.info('')
    logger.info(`Total: ${rows.length} shortcut record${rows.length === 1 ? '' : 's'}`)
}

async function keepShortcut(vault: Vault): Promise<void> {
    const record = (await prompt('Record UID or title: ')).trim()
    if (!record) {
        logger.info('Record UID or title is required.')
        return
    }

    const folder = (await prompt('Folder to keep record in (Enter for current NSF folder): ')).trim()
    const dryRun = isYes(await prompt('Dry run? [y/N]: '))

    if (!dryRun) {
        const preview = await withSuppressedLogs(() =>
            vault.keepNsfShortcut({ record, folder: folder || undefined, dryRun: true })
        )
        logger.info('')
        logger.info(vault.formatKeepNsfShortcutPlan(preview))
        if (preview.nothingToDo) {
            logger.info('')
            logger.info('Nothing to do — record is already in only one folder.')
            return
        }
        if (!isYes(await prompt('Proceed? [y/N]: '))) {
            logger.info('Aborted.')
            return
        }
    }

    const result = await withSuppressedLogs(() =>
        vault.keepNsfShortcut({
            record,
            folder: folder || undefined,
            dryRun,
        })
    )

    logger.info('')
    logger.info(vault.formatKeepNsfShortcutPlan(result))
    if (result.nothingToDo) {
        logger.info('')
        logger.info('Nothing to do — record is already in only one folder.')
        return
    }
    if (!result.dryRun) {
        logger.info('')
        for (const item of result.results) {
            logger.info(
                `${item.folderUid}  ${item.success ? 'success' : 'failed'}  ${item.message}`
            )
        }
    }
}

async function nsfShortcut() {
    const vault = await login()

    try {
        logger.info('Action: 1) list  2) keep')
        const action = parseAction(await prompt('Choose [1]: '))

        if (action === 'keep') {
            await keepShortcut(vault)
        } else {
            await listShortcuts(vault)
        }
    } catch (err) {
        logger.error(`NSF shortcut failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(nsfShortcut)

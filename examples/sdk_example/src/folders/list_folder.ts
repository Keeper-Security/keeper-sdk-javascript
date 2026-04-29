import { login, cleanup, logger, prompt, extractErrorMessage } from '@keeper-security/keeper-sdk-javascript'
import type { ListFolderResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

type LsMode = 'default' | 'list' | 'records' | 'folders'

const MODE_BY_INPUT: Record<string, LsMode> = {
    '': 'default',
    '1': 'default',
    '2': 'list',
    '3': 'records',
    '4': 'folders',
    'd': 'default',
    'default': 'default',
    'l': 'list',
    'list': 'list',
    'r': 'records',
    'records': 'records',
    'f': 'folders',
    'folders': 'folders',
}

const UID_COL_WIDTH = 36
const UID_TRUNCATED_PREFIX = 18

function parseMode(input: string): LsMode {
    const mode = MODE_BY_INPUT[input.trim().toLowerCase()]
    if (!mode) {
        logger.warn(`Unknown choice "${input}" — using default.`)
        return 'default'
    }
    return mode
}

function truncateLabel(label: string, verbose: boolean, max = 40): string {
    if (verbose || label.length <= max) return label
    return label.slice(0, 25) + '...' + label.slice(-12)
}

function printColumnar(cells: string[], termWidth: number): void {
    if (cells.length === 0) return
    const maxCellLength = Math.max(...cells.map((cell) => cell.length), 1)
    const gap = 2
    const colWidth = maxCellLength + gap
    const columnCount = Math.max(1, Math.floor((termWidth + gap) / colWidth))
    const rowCount = Math.ceil(cells.length / columnCount)
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const parts: string[] = []
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            const cellIndex = rowIndex * columnCount + columnIndex
            if (cellIndex >= cells.length) break
            parts.push(cells[cellIndex].padEnd(maxCellLength))
        }
        logger.info(parts.join('  '))
    }
}

function formatUidCell(uid: string): string {
    return uid.length > UID_COL_WIDTH
        ? `${uid.slice(0, UID_TRUNCATED_PREFIX)}...`
        : uid.padEnd(UID_COL_WIDTH)
}

function printDetail(result: ListFolderResult): void {
    if (!result.detail) return
    logger.info('')
    logger.info('#  Flags  UID                                    Name                      Type')
    logger.info('-  -----  ------------------------------------  ------------------------  ----------')
    let rowNumber = 1
    for (const folder of result.folders) {
        logger.info(
            `${String(rowNumber++).padStart(2)}  ${folder.flags}   ${formatUidCell(folder.uid)}  ${folder.name}`.trimEnd()
        )
    }
    for (const record of result.records) {
        logger.info(
            `${String(rowNumber++).padStart(2)}  ${record.flags}   ${formatUidCell(record.uid)}  ${record.name.padEnd(24)}  ${record.type}`
        )
    }
}

function printMenu(): void {
    logger.info('Display mode:')
    logger.info('  1. Default  (full names)')
    logger.info('  2. List     (detailed table with flags, UIDs, types)')
    logger.info('  3. Records  (records only)')
    logger.info('  4. Folders  (folders only)')
}

async function lsCommand() {
    const vault = await login()

    try {
        printMenu()
        const mode = parseMode(await prompt('Choose [1]: '))

        const detail = mode === 'list'
        const showFolders = mode !== 'records'
        const showRecords = mode !== 'folders'
        const verbose = mode === 'default'

        let result: ListFolderResult
        try {
            result = await vault.listFolder({
                folderUid: vault.getCurrentFolderUid(),
                showFolders,
                showRecords,
                detail,
            })
        } catch (err) {
            logger.error(`Failed to list folder: ${extractErrorMessage(err)}`)
            process.exitCode = 1
            return
        }

        if (result.folders.length === 0 && result.records.length === 0) {
            logger.info('Folder is empty.')
            return
        }

        const width = Math.max(40, process.stdout.columns || 80)

        if (result.detail) {
            printDetail(result)
        } else {
            const folderCells = result.folders.map((folder) => `${truncateLabel(folder.name, verbose)}/`)
            const recordCells = result.records.map((record) => truncateLabel(record.name, verbose))
            printColumnar([...folderCells, ...recordCells], width)
        }
    } finally {
        cleanup(vault)
    }
}

runExample(lsCommand)

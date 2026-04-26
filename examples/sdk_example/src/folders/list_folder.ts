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
    const maxLen = Math.max(...cells.map((c) => c.length), 1)
    const gap = 2
    const colWidth = maxLen + gap
    const cols = Math.max(1, Math.floor((termWidth + gap) / colWidth))
    const rows = Math.ceil(cells.length / cols)
    for (let r = 0; r < rows; r++) {
        const parts: string[] = []
        for (let c = 0; c < cols; c++) {
            const idx = r * cols + c
            if (idx >= cells.length) break
            parts.push(cells[idx].padEnd(maxLen))
        }
        logger.info(parts.join('  '))
    }
}

function printDetail(result: ListFolderResult): void {
    if (!result.detail) return
    logger.info('')
    logger.info('#  Flags  UID                                    Name                      Type')
    logger.info('-  -----  ------------------------------------  ------------------------  ----------')
    let n = 1
    for (const f of result.folders) {
        const uid = f.uid.length > 36 ? `${f.uid.slice(0, 18)}...` : f.uid.padEnd(36)
        logger.info(`${String(n++).padStart(2)}  ${f.flags}   ${uid}  ${f.name}`.trimEnd())
    }
    for (const r of result.records) {
        const uid = r.uid.length > 36 ? `${r.uid.slice(0, 18)}...` : r.uid.padEnd(36)
        logger.info(`${String(n++).padStart(2)}  ${r.flags}   ${uid}  ${r.name.padEnd(24)}  ${r.type}`)
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
            const folderCells = result.folders.map((f) => `${truncateLabel(f.name, verbose)}/`)
            const recordCells = result.records.map((r) => truncateLabel(r.name, verbose))
            printColumnar([...folderCells, ...recordCells], width)
        }
    } finally {
        cleanup(vault)
    }
}

runExample(lsCommand)

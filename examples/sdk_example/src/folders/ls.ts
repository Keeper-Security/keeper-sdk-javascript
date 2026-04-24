import { login, cleanup, logger, findFolderUidByNameOrUid, prompt, InMemoryStorage } from '@keeper-security/keeper-sdk-javascript'
import type { ListFolderResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

type ParsedCli = {
    detail: boolean
    showFolders: boolean
    showRecords: boolean
    verbose: boolean
    folderArg: string | null
    patternArg: string | null
}

function parseCli(argv: string[]): ParsedCli {
    let detail = false
    let showFolders = true
    let showRecords = true
    let verbose = false
    let patternArg: string | null = null
    const positionals: string[] = []

    for (const a of argv) {
        if (a === '-l' || a === '--list') {
            detail = true
        } else if (a === '-f' || a === '--folders') {
            showFolders = true
            showRecords = false
        } else if (a === '-r' || a === '--records') {
            showRecords = true
            showFolders = false
        } else if (a === '-v' || a === '--verbose') {
            verbose = true
        } else if (a.startsWith('--pattern=')) {
            patternArg = a.slice('--pattern='.length) || null
        } else if (a.startsWith('-')) {
            logger.warn(`Unknown option: ${a}`)
        } else {
            positionals.push(a)
        }
    }

    let folderArg: string | null = null
    if (positionals.length === 1) {
        const p0 = positionals[0]
        if (/[*?]/.test(p0)) {
            if (!patternArg) patternArg = p0
        } else {
            folderArg = p0
        }
    } else if (positionals.length >= 2) {
        folderArg = positionals[0]
        if (!patternArg) patternArg = positionals[1]
    }

    return { detail, showFolders, showRecords, verbose, folderArg, patternArg }
}

function truncateLabel(label: string, verbose: boolean, max = 40): string {
    if (verbose || label.length <= max) return label
    return label.slice(0, 25) + '...' + label.slice(-12)
}

/** Row-major multicolumn layout similar to CLI `ls`. */
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

async function lsCommand() {
    const cli = parseCli(process.argv.slice(2))
    const vault = await login()

    try {
        const storage = vault.getStorage() as InMemoryStorage

        let folderUid: string | null | undefined
        if (cli.folderArg) {
            const resolved = findFolderUidByNameOrUid(storage, cli.folderArg)
            if (!resolved) {
                logger.info(`Folder not found: ${cli.folderArg}`)
                return
            }
            folderUid = resolved
        } else {
            folderUid = vault.getCurrentFolderUid()
        }

        const result = await vault.listFolder({
            folderUid,
            pattern: cli.patternArg,
            showFolders: cli.showFolders,
            showRecords: cli.showRecords,
            detail: cli.detail,
        })

        const width = Math.max(40, process.stdout.columns || 80)

        if (result.detail) {
            printDetail(result)
        } else {
            const folderCells = result.folders.map((f) => `${truncateLabel(f.name, cli.verbose)}/`)
            const recordCells = result.records.map((r) => truncateLabel(r.name, cli.verbose))
            const cells = [...folderCells, ...recordCells]
            printColumnar(cells, width)
        }
    } finally {
        cleanup(vault)
    }
}

runExample(lsCommand)

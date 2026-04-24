import { writeFileSync } from 'fs'
import { login, cleanup, logger, formatSharedFoldersTable, renderSharedFoldersAsciiTable } from '@keeper-security/keeper-sdk-javascript'
import type { ListSharedFolderRow } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { getScriptArgs } from '../utils/cliArgs'

type OutputFormat = 'table' | 'csv' | 'json'

function parseCli(argv: string[]): {
    pattern: string | null
    verbose: boolean
    details: boolean
    format: OutputFormat
    output: string | null
} {
    let verbose = false
    let details = false
    let format: OutputFormat = 'table'
    let output: string | null = null
    const positionals: string[] = []

    for (let i = 0; i < argv.length; i += 1) {
        const a = argv[i]
        if (a === '-v' || a === '--verbose') {
            verbose = true
        } else if (a === '--details') {
            details = true
        } else if (a === '--format') {
            const f = (argv[++i] ?? '').toLowerCase() as OutputFormat
            if (f === 'table' || f === 'csv' || f === 'json') {
                format = f
            } else {
                logger.warn(`Invalid --format value, using 'table'`)
            }
        } else if (a.startsWith('--format=')) {
            const f = a.slice('--format='.length).toLowerCase() as OutputFormat
            if (f === 'table' || f === 'csv' || f === 'json') {
                format = f
            } else {
                logger.warn(`Invalid --format value, using 'table'`)
            }
        } else if (a === '--output' || a === '-o') {
            output = (argv[++i] ?? '').trim() || null
        } else if (a.startsWith('--output=')) {
            output = a.slice('--output='.length).trim() || null
        } else if (a.startsWith('-')) {
            logger.warn(`Unknown option: ${a}`)
        } else {
            positionals.push(a)
        }
    }

    const pattern = positionals[0]?.trim() || null
    return { pattern, verbose, details, format, output }
}

function escapeCsvField(s: string): string {
    if (/[",\n\r]/.test(s)) {
        return `"${s.replace(/"/g, '""')}"`
    }
    return s
}

function rowToCsvLine(r: ListSharedFolderRow, includeDetails: boolean): string {
    const base = [escapeCsvField(r.shared_folder_uid), escapeCsvField(r.name)]
    if (includeDetails) {
        base.push(
            String(r.record_count ?? ''),
            String(r.user_count ?? ''),
            String(r.team_count ?? ''),
            String(r.default_manage_records ?? ''),
            String(r.default_manage_users ?? ''),
            String(r.default_can_edit ?? ''),
            String(r.default_can_share ?? '')
        )
    }
    return base.join(',')
}

function buildCsv(data: ListSharedFolderRow[], includeDetails: boolean): string {
    const header = includeDetails
        ? 'shared_folder_uid,name,record_count,user_count,team_count,default_manage_records,default_manage_users,default_can_edit,default_can_share'
        : 'shared_folder_uid,name'
    return [header, ...data.map((r) => rowToCsvLine(r, includeDetails))].join('\n')
}

async function listSf() {
    const cli = parseCli(getScriptArgs())
    const vault = await login()
    try {
        const data = vault.listSharedFolders({
            pattern: cli.pattern,
            includeDetails: cli.details,
        })

        if (data.length === 0) {
            logger.info('No shared folders are found')
            return
        }

        if (cli.format === 'json') {
            const text = `${JSON.stringify(data, null, 2)}\n`
            if (cli.output) {
                writeFileSync(cli.output, text, 'utf8')
            } else {
                logger.info(text.trimEnd())
            }
            return
        }

        if (cli.format === 'csv') {
            const text = buildCsv(data, cli.details)
            if (cli.output) {
                writeFileSync(cli.output, `${text}\n`, 'utf8')
            } else {
                logger.info(text)
            }
            return
        }

        const table = formatSharedFoldersTable(data, { verbose: cli.verbose })
        logger.info(renderSharedFoldersAsciiTable(table))
    } finally {
        cleanup(vault)
    }
}

runExample(listSf)

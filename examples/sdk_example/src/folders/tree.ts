import { login, cleanup, logger } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

function parseCli(argv: string[]): {
    folder: string
    verbose: boolean
    records: boolean
    shares: boolean
    hideSharesKey: boolean
    title: string | null
    showHelp: boolean
} {
    let verbose = false
    let records = false
    let shares = false
    let hideSharesKey = false
    let title: string | null = null
    let showHelp = false
    const positionals: string[] = []

    for (let i = 0; i < argv.length; i++) {
        const a = argv[i]
        if (a === '-h' || a === '--help') {
            showHelp = true
        } else if (a === '-v' || a === '--verbose') {
            verbose = true
        } else if (a === '-r' || a === '--records') {
            records = true
        } else if (a === '-s' || a === '--shares') {
            shares = true
        } else if (a === '-hk' || a === '--hide-shares-key') {
            hideSharesKey = true
        } else if (a === '-t' || a === '--title') {
            title = (argv[++i] ?? '').trim() || null
        } else if (a.startsWith('--title=')) {
            title = a.slice('--title='.length).trim() || null
        } else if (a.startsWith('-')) {
            logger.warn(`Unknown option: ${a}`)
        } else {
            positionals.push(a)
        }
    }

    const folder = positionals.join(' ').trim()
    return { folder, verbose, records, shares, hideSharesKey, title, showHelp }
}

function printUsage(): void {
    logger.info('Usage: npm run folders:tree -- [options] [folder path or UID]')
    logger.info('  Pass arguments after `--`.')
    logger.info('  -v, --verbose    Print UIDs next to names')
    logger.info('  -r, --records    Show records under each folder')
    logger.info('  -s, --shares     Show shared-folder user/team permissions')
    logger.info('  -hk, --hide-shares-key  Hide [User] / [Team] suffixes (with -s)')
    logger.info('  -t, --title <s>  Text printed above the tree')
    logger.info('  With no folder: uses current working folder (see folders:cd) or vault root.')
}

async function treeCommand() {
    const cli = parseCli(process.argv.slice(2))
    if (cli.showHelp) {
        printUsage()
        return
    }

    const vault = await login()
    try {
        const ascii = await vault.tree({
            folderPath: cli.folder || undefined,
            verbose: cli.verbose,
            showRecords: cli.records,
            showShares: cli.shares,
            hideSharesKey: cli.hideSharesKey,
            title: cli.title,
        })
        logger.info(ascii)
    } finally {
        cleanup(vault)
    }
}

runExample(treeCommand)

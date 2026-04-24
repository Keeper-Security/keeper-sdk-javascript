import { login, cleanup, logger, prompt } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

function parseCli(argv: string[]): { newName: string; folder: string; quiet: boolean; showHelp: boolean } {
    let newName = ''
    let quiet = false
    let showHelp = false
    const positionals: string[] = []

    for (let i = 0; i < argv.length; i++) {
        const a = argv[i]
        if (a === '-h' || a === '--help') {
            showHelp = true
        } else if (a === '-q' || a === '--quiet') {
            quiet = true
        } else if (a === '-n' || a === '--name') {
            newName = (argv[++i] ?? '').trim()
        } else if (a.startsWith('--name=')) {
            newName = a.slice('--name='.length).trim()
        } else if (a.startsWith('-n=')) {
            newName = a.slice('-n='.length).trim()
        } else if (a.startsWith('-')) {
            logger.warn(`Unknown option: ${a}`)
        } else {
            positionals.push(a)
        }
    }

    const folder = positionals.join(' ').trim()
    return { newName, folder, quiet, showHelp }
}

function printUsage(): void {
    logger.info('Interactive: log in, then you are prompted for the folder and new name.')
    logger.info('Usage: npm run folders:updatedir -- [-n <new name>] [folder path or UID]')
    logger.info('  Pass arguments after `--` (e.g. npm run folders:updatedir -- -n "New Title" "Documents/Old").')
    logger.info('  -n, --name   New folder name (optional; prompted after folder if omitted)')
    logger.info('  -q, --quiet  Do not print success message')
}

async function updatedirCommand() {
    const cli = parseCli(process.argv.slice(2))
    if (cli.showHelp) {
        printUsage()
        return
    }

    const vault = await login()
    try {
        let folder = cli.folder
        let newName = cli.newName

        if (!folder) {
            folder = (await prompt('Folder to rename (path, name, or UID): ')).trim()
        }
        if (!folder) {
            logger.info('No folder given.')
            return
        }

        if (!newName) {
            newName = (await prompt('New folder name: ')).trim()
        }
        if (!newName) {
            logger.info('New name is required.')
            return
        }

        const result = await vault.renameFolder(folder, newName)
        if (result.success) {
            if (!cli.quiet) {
                logger.info(`Folder "${result.oldName}" has been renamed to "${result.newName}"`)
                logger.info(`  UID: ${result.folderUid}`)
            }
        } else {
            logger.info(`Failed: ${result.message ?? 'unknown error'}`)
            process.exitCode = 1
        }
    } finally {
        cleanup(vault)
    }
}

runExample(updatedirCommand)

import { login, cleanup, logger, prompt } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

function parseCli(argv: string[]): { patterns: string[]; force: boolean; quiet: boolean; showHelp: boolean } {
    let force = false
    let quiet = false
    let showHelp = false
    const positionals: string[] = []

    for (const a of argv) {
        if (a === '-h' || a === '--help') {
            showHelp = true
        } else if (a === '-f' || a === '--force') {
            force = true
        } else if (a === '-q' || a === '--quiet') {
            quiet = true
        } else if (a.startsWith('-')) {
            logger.warn(`Unknown option: ${a}`)
        } else {
            positionals.push(a)
        }
    }

    return { patterns: positionals, force, quiet, showHelp }
}

function printUsage(): void {
    logger.info('Interactive: log in first, then enter folder(s) to remove (path, UID, name, or glob).')
    logger.info('Usage: npm run folders:removedir -- [-f] [-q] [folder ...]')
    logger.info('  Pass arguments after `--` (e.g. npm run folders:removedir -- -f "Documents/Old").')
    logger.info('  -f, --force   Delete without confirmation')
    logger.info('  -q, --quiet   Suppress listing folder names before confirm')
}

async function removedirCommand() {
    const cli = parseCli(process.argv.slice(2))
    if (cli.showHelp) {
        printUsage()
        return
    }

    const vault = await login()
    try {
        let patterns = [...cli.patterns]
        if (patterns.length === 0) {
            const line = (await prompt('Folder(s) to remove (path, UID, name, or glob; space-separated): ')).trim()
            patterns = line.split(/\s+/).filter(Boolean)
        }
        if (patterns.length === 0) {
            logger.info('No folders given.')
            return
        }

        const result = await vault.rmdir(patterns, {
            force: cli.force,
            quiet: cli.quiet,
            confirm: async (summary) => {
                if (!cli.quiet) {
                    logger.info(summary)
                }
                if (cli.force) {
                    return true
                }
                const a = (await prompt('Do you want to proceed? (y/n) ')).trim().toLowerCase()
                return a === 'y' || a === 'yes'
            },
        })

        if (result.cancelled) {
            logger.info('Cancelled.')
            return
        }
        if (result.success) {
            if (!cli.quiet) {
                logger.info('Removal completed.')
            }
        } else {
            logger.info(`Failed: ${result.message ?? 'unknown error'}`)
            process.exitCode = 1
        }
    } finally {
        cleanup(vault)
    }
}

runExample(removedirCommand)

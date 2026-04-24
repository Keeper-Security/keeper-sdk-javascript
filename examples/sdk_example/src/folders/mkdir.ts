import { login, cleanup, logger, prompt } from '@keeper-security/keeper-sdk-javascript'
import type { MkdirOptions } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

function parseCli(argv: string[]): { path: string; options: MkdirOptions; showHelp: boolean } {
    let sharedFolder = false
    let userFolder = false
    let grantAll = false
    let manageUsers = false
    let manageRecords = false
    let canShare = false
    let canEdit = false
    let showHelp = false
    const positionals: string[] = []

    for (const a of argv) {
        if (a === '-h' || a === '--help') {
            showHelp = true
        } else if (a === '-sf' || a === '--shared-folder') {
            sharedFolder = true
        } else if (a === '-uf' || a === '--user-folder') {
            userFolder = true
        } else if (a === '-a' || a === '--all') {
            grantAll = true
        } else if (a === '-u' || a === '--manage-users') {
            manageUsers = true
        } else if (a === '-r' || a === '--manage-records') {
            manageRecords = true
        } else if (a === '-s' || a === '--can-share') {
            canShare = true
        } else if (a === '-e' || a === '--can-edit') {
            canEdit = true
        } else if (a.startsWith('-')) {
            logger.warn(`Unknown option: ${a}`)
        } else {
            positionals.push(a)
        }
    }

    const path = positionals.join(' ').trim()
    return {
        path,
        showHelp,
        options: {
            sharedFolder,
            userFolder,
            grantAll,
            manageUsers,
            manageRecords,
            canShare,
            canEdit,
        },
    }
}

function printUsage(): void {
    logger.info('Usage: npm run folders:mkdir -- [options] <folder path>')
    logger.info('  Pass the path after `--` so npm forwards it (e.g. npm run folders:mkdir -- "Docs/2024").')
    logger.info('  -sf, --shared-folder   Create a shared folder (last segment only; under a personal folder)')
    logger.info('  -uf, --user-folder     Force a personal folder')
    logger.info('  -a, --all              Grant all default shared-folder permissions (with -sf)')
    logger.info('  -u, -r, -s, -e         manage_users, manage_records, can_share, can_edit')
}

async function mkdirCommand() {
    let { path, options, showHelp } = parseCli(process.argv.slice(2))
    if (showHelp) {
        printUsage()
        return
    }
    if (!path) {
        path = (await prompt('Folder path to create: ')).trim()
    }
    if (!path) {
        logger.info('No path given.')
        return
    }

    const vault = await login()
    try {
        const result = await vault.mkdir(path, options)
        if (result.success) {
            logger.info(`Created folder UID: ${result.folderUid}`)
        } else {
            logger.info(`Failed: ${result.message ?? 'unknown error'}`)
            process.exitCode = 1
        }
    } finally {
        cleanup(vault)
    }
}

runExample(mkdirCommand)

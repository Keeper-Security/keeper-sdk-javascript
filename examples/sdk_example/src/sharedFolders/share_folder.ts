import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type {
    GetKeeperObjectResult,
    ShareFolderAction,
    ShareFolderInput,
    ShareFolderResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isYes(answer: string): boolean {
    const a = answer.trim().toLowerCase()
    return a === 'y' || a === 'yes'
}

function parseEmails(raw: string): { emails: string[]; invalid: string[] } {
    const tokens = raw
        .split(/[\s,;]+/)
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
    const emails: string[] = []
    const invalid: string[] = []
    const seen = new Set<string>()
    for (const t of tokens) {
        const lower = t.toLowerCase()
        if (seen.has(lower)) continue
        seen.add(lower)
        if (EMAIL_PATTERN.test(t)) {
            emails.push(t)
        } else {
            invalid.push(t)
        }
    }
    return { emails, invalid }
}

type SharedFolderTarget =
    | Extract<GetKeeperObjectResult, { objectType: 'shared_folder' }>
    | (Extract<GetKeeperObjectResult, { objectType: 'folder' }> & { folder_type: 'shared_folder_folder' })

function isSharedTarget(obj: GetKeeperObjectResult): obj is SharedFolderTarget {
    if (obj.objectType === 'shared_folder') return true
    if (obj.objectType === 'folder' && obj.folder_type === 'shared_folder_folder') return true
    return false
}

function describeTarget(obj: SharedFolderTarget): string {
    if (obj.objectType === 'shared_folder') {
        return `shared folder "${obj.name}" (${obj.shared_folder_uid})`
    }
    return `subfolder of a shared folder "${obj.name}" (${obj.folder_uid})`
}

function summarize(result: ShareFolderResult): void {
    if (result.results.length === 0) {
        if (result.message) logger.info(result.message)
        return
    }
    const succeeded = result.results.filter((r) => r.success)
    const failed = result.results.filter((r) => !r.success)

    if (succeeded.length > 0) {
        logger.info(`Succeeded (${succeeded.length}):`)
        for (const r of succeeded) {
            logger.info(`  ${r.email}  status=${r.status}`)
        }
    }
    if (failed.length > 0) {
        logger.error(`Failed (${failed.length}):`)
        for (const r of failed) {
            logger.error(`  ${r.email}  status=${r.status}${r.message ? ` - ${r.message}` : ''}`)
        }
    }
}

async function promptAction(): Promise<ShareFolderAction> {
    const raw = (await prompt('Action [grant/remove] (default grant): ')).trim().toLowerCase()
    return raw === 'remove' ? 'remove' : 'grant'
}

async function shareFolderCommand() {
    const vault = await login()

    try {
        const action = await promptAction()
        const verb = action === 'remove' ? 'remove users from' : 'share'
        const folderInput = (await prompt(`Folder name or UID to ${verb}: `)).trim()
        if (!folderInput) {
            logger.info('No folder given.')
            return
        }

        let target: GetKeeperObjectResult
        try {
            target = await vault.getKeeperObject(folderInput, { type: 'folder' })
        } catch (err) {
            logger.error(`Folder lookup failed: ${extractErrorMessage(err)}`)
            process.exitCode = 1
            return
        }

        if (!isSharedTarget(target)) {
            logger.error('Only shared folders (or subfolders of a shared folder) can be shared. Personal folders are not supported.')
            process.exitCode = 1
            return
        }

        logger.info(`Target: ${describeTarget(target)}`)

        const emailsInput = (await prompt('User email(s), comma-separated: ')).trim()
        if (!emailsInput) {
            logger.info('No emails given.')
            return
        }
        const { emails, invalid } = parseEmails(emailsInput)
        if (invalid.length > 0) {
            logger.error(`Invalid email(s): ${invalid.join(', ')}`)
            process.exitCode = 1
            return
        }
        if (emails.length === 0) {
            logger.info('No valid emails given.')
            return
        }

        const input: ShareFolderInput = {
            folder: folderInput,
            emails,
            action,
        }

        if (action === 'grant') {
            input.manageRecords = isYes(
                await prompt('Allow these users to add/remove records (manage_records)? [y/N]: '),
            )
            input.manageUsers = isYes(
                await prompt('Allow these users to add/remove users (manage_users)? [y/N]: '),
            )
        }

        let result: ShareFolderResult
        const restore = suppressLogs()
        try {
            result = await vault.shareFolder(input)
        } finally {
            restore()
        }

        const opLabel = action === 'remove' ? 'Remove' : 'Share'
        if (result.success) {
            logger.info(`${opLabel} completed for shared folder ${result.sharedFolderUid}.`)
        } else {
            logger.error(`${opLabel} completed with errors${result.message ? `: ${result.message}` : ''}`)
            process.exitCode = 1
        }
        summarize(result)
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(shareFolderCommand)

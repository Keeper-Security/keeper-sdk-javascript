import {
    cleanup,
    extractErrorMessage,
    FolderKind,
    FolderObjectType,
    login,
    logger,
    prompt,
    ShareFolderAction,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type {
    GetFolderResult,
    GetFolderResultFolder,
    GetFolderResultSharedFolder,
    ShareFolderInput,
    ShareFolderResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes, parseEmails } from '../utils/format'

type SharedFolderTarget =
    | GetFolderResultSharedFolder
    | (GetFolderResultFolder & { folder_type: FolderKind.SharedFolderFolder })

function isSharedTarget(obj: GetFolderResult): obj is SharedFolderTarget {
    if (obj.objectType === FolderObjectType.SharedFolder) return true
    if (obj.objectType === FolderObjectType.Folder && obj.folder_type === FolderKind.SharedFolderFolder) return true
    return false
}

function describeTarget(obj: SharedFolderTarget): string {
    if (obj.objectType === FolderObjectType.SharedFolder) {
        return `shared folder "${obj.name}" (${obj.shared_folder_uid})`
    }
    return `subfolder of a shared folder "${obj.name}" (${obj.folder_uid})`
}

function summarize(result: ShareFolderResult): void {
    if (result.results.length === 0) {
        if (result.message) logger.info(result.message)
        return
    }
    const succeeded = result.results.filter((userResult) => userResult.success)
    const failed = result.results.filter((userResult) => !userResult.success)

    if (succeeded.length > 0) {
        logger.info(`Succeeded (${succeeded.length}):`)
        for (const userResult of succeeded) {
            logger.info(`  ${userResult.email}  status=${userResult.status}`)
        }
    }
    if (failed.length > 0) {
        logger.error(`Failed (${failed.length}):`)
        for (const userResult of failed) {
            logger.error(
                `  ${userResult.email}  status=${userResult.status}${userResult.message ? ` - ${userResult.message}` : ''}`
            )
        }
    }
}

async function promptAction(): Promise<ShareFolderAction> {
    const raw = (await prompt('Action [grant/remove] (default grant): ')).trim().toLowerCase()
    return raw === ShareFolderAction.Remove ? ShareFolderAction.Remove : ShareFolderAction.Grant
}

async function shareFolderCommand() {
    const vault = await login()

    try {
        const action = await promptAction()
        const verb = action === ShareFolderAction.Remove ? 'remove users from' : 'share'
        const folderInput = (await prompt(`Folder name or UID to ${verb}: `)).trim()
        if (!folderInput) {
            logger.info('No folder given.')
            return
        }

        let target: GetFolderResult
        try {
            target = await vault.getFolder(folderInput)
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

        if (action === ShareFolderAction.Grant) {
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

        const opLabel = action === ShareFolderAction.Remove ? 'Remove' : 'Share'
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

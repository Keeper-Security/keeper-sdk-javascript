import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    NsfFolderShareAction,
    NSF_RECORD_PERMISSION_ROLES,
    prompt,
    suppressLogs,
    type ShareNestedShareFolderInput,
    type ShareNestedShareFolderResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { promptShareExpiration, splitCommaSeparated } from '../utils/format'

type Vault = Awaited<ReturnType<typeof login>>

const ACTION_BY_INPUT: Record<string, NsfFolderShareAction> = {
    '': NsfFolderShareAction.Grant,
    '1': NsfFolderShareAction.Grant,
    '2': NsfFolderShareAction.Remove,
    grant: NsfFolderShareAction.Grant,
    remove: NsfFolderShareAction.Remove,
}

function parseAction(input: string): NsfFolderShareAction {
    return ACTION_BY_INPUT[input.trim().toLowerCase()] ?? NsfFolderShareAction.Grant
}

async function runFolderShare(
    vault: Vault,
    input: ShareNestedShareFolderInput
): Promise<ShareNestedShareFolderResult> {
    const restore = suppressLogs()
    try {
        return await vault.shareNestedShareFolder(input)
    } finally {
        restore()
    }
}

function printResults(vault: Vault, result: ShareNestedShareFolderResult): void {
    logger.info('')
    logger.info(vault.formatNsfFolderShareResults(result.results))
    logger.info('')
}

async function shareNsfFolder() {
    const vault = await login()

    try {
        const folders = splitCommaSeparated(
            await prompt('Folder path(s) or UID(s), comma-separated: ')
        )
        if (folders.length === 0) {
            logger.info('Folder path or UID is required.')
            return
        }

        const recipients = splitCommaSeparated(
            await prompt('Recipient(s) — email, team name/UID, or @existing, comma-separated: ')
        )
        if (recipients.length === 0) {
            logger.info('At least one recipient is required.')
            return
        }

        logger.info('Action: 1) grant  2) remove')
        const action = parseAction(await prompt('Choose [1]: '))

        const role =
            action === NsfFolderShareAction.Grant
                ? (await prompt(`Role (${NSF_RECORD_PERMISSION_ROLES.join(', ')}) [viewer]: `)).trim() ||
                  'viewer'
                : undefined

        const expiration =
            action === NsfFolderShareAction.Grant
                ? await promptShareExpiration('nsf-share-folder')
                : {}

        const result = await runFolderShare(vault, {
            folders,
            recipients,
            action,
            role,
            ...expiration,
        })

        printResults(vault, result)
    } catch (err) {
        logger.error(`Folder share failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(shareNsfFolder)

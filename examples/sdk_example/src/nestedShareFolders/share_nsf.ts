import {
    NsfFolderShareAction,
    NsfRecordShareAction,
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    NSF_RECORD_PERMISSION_ROLES,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { splitCommaSeparated, withSuppressedLogs } from '../utils/format'

type Vault = Awaited<ReturnType<typeof login>>

const TARGET_BY_INPUT: Record<string, 'folder' | 'record'> = {
    '': 'folder',
    '1': 'folder',
    '2': 'record',
    folder: 'folder',
    record: 'record',
}

function parseTarget(input: string): 'folder' | 'record' {
    return TARGET_BY_INPUT[input.trim().toLowerCase()] ?? 'folder'
}

async function shareNsfFolder(vault: Vault): Promise<void> {
    const folders = splitCommaSeparated(await prompt('Folder path(s) or UID(s), comma-separated: '))
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

    const actionInput = (await prompt('Action (grant/remove) [grant]: ')).trim().toLowerCase()
    const action =
        actionInput === 'remove' ? NsfFolderShareAction.Remove : NsfFolderShareAction.Grant

    const role =
        action === NsfFolderShareAction.Grant
            ? (await prompt(`Role (${NSF_RECORD_PERMISSION_ROLES.join(', ')}) [viewer]: `)).trim() ||
              'viewer'
            : undefined

    const result = await withSuppressedLogs(() =>
        vault.shareNestedShareFolder({
            folders,
            recipients,
            action,
            role,
        })
    )

    logger.info('')
    for (const item of result.results) {
        logger.info(
            `${item.folderUid}  ${item.recipient}  ${item.actionTaken}  ${item.success ? 'success' : 'failed'}  ${item.message || ''}`
        )
    }
}

async function shareNsfRecord(vault: Vault): Promise<void> {
    const record = (await prompt('Record UID, title, or folder path: ')).trim()
    if (!record) {
        logger.info('Record path or UID is required.')
        return
    }

    const emails = splitCommaSeparated(await prompt('Recipient email(s), comma-separated: '))
    if (emails.length === 0) {
        logger.info('At least one recipient email is required.')
        return
    }

    const actionInput = (await prompt('Action (grant/revoke/owner) [grant]: ')).trim().toLowerCase()
    const action =
        actionInput === 'revoke'
            ? NsfRecordShareAction.Revoke
            : actionInput === 'owner'
              ? NsfRecordShareAction.Owner
              : NsfRecordShareAction.Grant

    const role =
        action === NsfRecordShareAction.Grant
            ? (await prompt(`Role (${NSF_RECORD_PERMISSION_ROLES.join(', ')}) [viewer]: `)).trim() ||
              'viewer'
            : undefined

    const recursiveInput = (await prompt('Recursive when record is a folder? (y/N): '))
        .trim()
        .toLowerCase()
    const dryRunInput = (await prompt('Dry run? (y/N): ')).trim().toLowerCase()

    const result = await withSuppressedLogs(() =>
        vault.shareNestedShareRecord({
            record,
            emails,
            action,
            role,
            recursive: recursiveInput === 'y' || recursiveInput === 'yes',
            dryRun: dryRunInput === 'y' || dryRunInput === 'yes',
        })
    )

    logger.info('')
    logger.info(vault.formatNsfRecordSharePlan(result))
    if (!result.dryRun) {
        logger.info('')
        logger.info(vault.formatNsfRecordShareResults(result.results))
    }
}

async function shareNsf() {
    const vault = await login()

    try {
        const target = parseTarget(
            await prompt('Share target (1=folder, 2=record) [folder]: ')
        )

        if (target === 'record') {
            await shareNsfRecord(vault)
        } else {
            await shareNsfFolder(vault)
        }
    } catch (err) {
        logger.error(`NSF share failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(shareNsf)

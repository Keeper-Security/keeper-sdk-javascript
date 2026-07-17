import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    NsfRecordShareAction,
    NSF_RECORD_PERMISSION_ROLES,
    prompt,
    suppressLogs,
    type ShareNestedShareRecordInput,
    type ShareNestedShareRecordResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes, promptShareExpiration, splitCommaSeparated } from '../utils/format'

type Vault = Awaited<ReturnType<typeof login>>

const ACTION_BY_INPUT: Record<string, NsfRecordShareAction> = {
    '': NsfRecordShareAction.Grant,
    '1': NsfRecordShareAction.Grant,
    '2': NsfRecordShareAction.Revoke,
    '3': NsfRecordShareAction.Owner,
    grant: NsfRecordShareAction.Grant,
    revoke: NsfRecordShareAction.Revoke,
    owner: NsfRecordShareAction.Owner,
}

function parseAction(input: string): NsfRecordShareAction {
    return ACTION_BY_INPUT[input.trim().toLowerCase()] ?? NsfRecordShareAction.Grant
}

async function runRecordShare(
    vault: Vault,
    input: ShareNestedShareRecordInput
): Promise<ShareNestedShareRecordResult> {
    const restore = suppressLogs()
    try {
        return await vault.shareNestedShareRecord(input)
    } finally {
        restore()
    }
}

function printPlan(vault: Vault, result: ShareNestedShareRecordResult): void {
    logger.info('')
    logger.info(vault.formatNsfRecordSharePlan(result))
    logger.info('')
}

function printResults(vault: Vault, result: ShareNestedShareRecordResult): void {
    if (result.dryRun || result.results.length === 0) return
    logger.info('')
    logger.info(vault.formatNsfRecordShareResults(result.results))
    logger.info('')
}

async function shareNsfRecord() {
    const vault = await login()

    try {
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

        logger.info('Action: 1) grant  2) revoke  3) owner')
        const action = parseAction(await prompt('Choose [1]: '))

        const role =
            action === NsfRecordShareAction.Grant
                ? (await prompt(`Role (${NSF_RECORD_PERMISSION_ROLES.join(', ')}) [viewer]: `)).trim() ||
                  'viewer'
                : undefined

        const expiration =
            action === NsfRecordShareAction.Grant
                ? await promptShareExpiration('nsf-share-record')
                : {}

        const recursive = isYes(await prompt('Recursive when record is a folder? (y/N): '))
        const dryRun = isYes(await prompt('Dry run? (y/N): '))

        const result = await runRecordShare(vault, {
            record,
            emails,
            action,
            role,
            recursive,
            dryRun,
            ...expiration,
        })

        printPlan(vault, result)
        if (result.dryRun) {
            logger.info('[Dry-run] No record share changes were applied.')
            return
        }
        printResults(vault, result)
    } catch (err) {
        logger.error(`Record share failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(shareNsfRecord)

import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    NsfRecordPermissionAction,
    NSF_RECORD_PERMISSION_ROLES,
    prompt,
    suppressLogs,
    type UpdateNsfRecordPermissionInput,
    type UpdateNsfRecordPermissionResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

type Vault = Awaited<ReturnType<typeof login>>

const ACTION_BY_INPUT: Record<string, NsfRecordPermissionAction> = {
    '': NsfRecordPermissionAction.Grant,
    '1': NsfRecordPermissionAction.Grant,
    '2': NsfRecordPermissionAction.Revoke,
    grant: NsfRecordPermissionAction.Grant,
    revoke: NsfRecordPermissionAction.Revoke,
}

function parseAction(input: string): NsfRecordPermissionAction {
    return ACTION_BY_INPUT[input.trim().toLowerCase()] ?? NsfRecordPermissionAction.Grant
}

async function runPermissionUpdate(
    vault: Vault,
    input: UpdateNsfRecordPermissionInput
): Promise<UpdateNsfRecordPermissionResult> {
    const restore = suppressLogs()
    try {
        return await vault.updateNestedShareRecordPermissions(input)
    } finally {
        restore()
    }
}

function printPlan(vault: Vault, result: UpdateNsfRecordPermissionResult): void {
    logger.info('')
    logger.info(vault.formatNsfRecordPermissionPlan(result))
    logger.info('')
}

function printFailures(vault: Vault, result: UpdateNsfRecordPermissionResult): void {
    const grantFailures = vault.formatNsfRecordPermissionFailures(result.grantFailures, 'GRANT')
    const revokeFailures = vault.formatNsfRecordPermissionFailures(result.revokeFailures, 'REVOKE')
    if (grantFailures) {
        logger.info('')
        logger.info(grantFailures)
        logger.info('')
    }
    if (revokeFailures) {
        logger.info('')
        logger.info(revokeFailures)
        logger.info('')
    }
}

async function nsfRecordPermission() {
    const vault = await login()

    try {
        logger.info('Action: 1) grant  2) revoke')
        const action = parseAction(await prompt('Choose [1]: '))
        const folder = (await prompt('Folder path or UID (Enter for root-level records): ')).trim()
        const recursive = isYes(await prompt('Include sub-folders? [y/N]: '))

        let role: string | undefined
        if (action === NsfRecordPermissionAction.Grant) {
            logger.info(`Roles: ${NSF_RECORD_PERMISSION_ROLES.join(', ')}`)
            role = (await prompt('Role to grant: ')).trim()
            if (!role) {
                logger.info('Role is required for grant action.')
                return
            }
        } else {
            role = (await prompt('Role filter for revoke (Enter for all roles): ')).trim() || undefined
        }

        const dryRun = isYes(await prompt('Dry run (preview only)? [y/N]: '))
        const force = dryRun ? false : isYes(await prompt('Force confirm without prompt? [y/N]: '))

        const baseInput: UpdateNsfRecordPermissionInput = {
            folder: folder || undefined,
            action,
            role,
            recursive,
        }

        if (dryRun) {
            const result = await runPermissionUpdate(vault, { ...baseInput, dryRun: true })
            printPlan(vault, result)
            if (result.message) logger.info(result.message)
            logger.info('[Dry-run] No permission changes were applied.')
            return
        }

        if (force) {
            const result = await runPermissionUpdate(vault, { ...baseInput, force: true })
            printPlan(vault, result)
            printFailures(vault, result)
            if (result.message) logger.info(result.message)
            return
        }

        const preview = await runPermissionUpdate(vault, { ...baseInput, force: false })
        printPlan(vault, preview)
        if (preview.message && preview.plan.grants.length + preview.plan.revokes.length === 0) {
            logger.info(preview.message)
            return
        }

        if (!isYes(await prompt('Do you want to proceed with these permission changes? [y/n]: '))) {
            logger.info('Permission update cancelled.')
            return
        }

        const result = await runPermissionUpdate(vault, { ...baseInput, force: true })
        printFailures(vault, result)
        if (result.message) logger.info(result.message)
    } catch (err) {
        logger.error(`Record permission update failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(nsfRecordPermission)

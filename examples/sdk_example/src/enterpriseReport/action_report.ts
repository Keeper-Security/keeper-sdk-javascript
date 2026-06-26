import {
    AdminAction,
    AuditOutputFormat,
    TargetUserStatus,
    cleanup,
    extractErrorMessage,
    getAllowedActions,
    getDefaultDaysSince,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { ActionReportOptions } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

async function actionReportExample() {
    const vault = await login()

    try {
        const targetRaw = (
            await prompt('Target status [no-logon/no-update/locked/invited/no-recovery, default no-logon]: ')
        )
            .trim()
            .toLowerCase()
        const target = (targetRaw || TargetUserStatus.NoLogon) as TargetUserStatus

        const defaultDays = getDefaultDaysSince(target)
        const daysRaw = (await prompt(`Days since last event [default ${defaultDays}]: `)).trim()
        const daysSince = daysRaw ? Number.parseInt(daysRaw, 10) : defaultDays
        if (!Number.isFinite(daysSince) || daysSince <= 0) {
            logger.error('Days since must be a positive number.')
            process.exitCode = 1
            return
        }

        const node = (await prompt('Node filter (name or ID, Enter to skip): ')).trim()

        const columnsRaw = (await prompt('Columns (comma-separated, Enter for default): ')).trim()
        const allowedActions = getAllowedActions(target)
        const applyRaw = (
            await prompt(`Apply action [${allowedActions.join('/')}, default none]: `)
        )
            .trim()
            .toLowerCase()
        const applyAction = (applyRaw || AdminAction.None) as AdminAction

        let targetUser: string | undefined
        if (applyAction === AdminAction.Transfer) {
            targetUser = (await prompt('Target user for transfer: ')).trim()
            if (!targetUser) {
                logger.error('Target user is required for transfer.')
                process.exitCode = 1
                return
            }
        }

        const dryRun =
            applyAction !== AdminAction.None &&
            isYes(await prompt('Dry run (preview only)? [y/N]: '))

        let force = false
        if (
            !dryRun &&
            (applyAction === AdminAction.Delete || applyAction === AdminAction.Transfer)
        ) {
            force = isYes(await prompt('Skip confirmation? [y/N]: '))
            if (!force) {
                const confirmed = isYes(
                    await prompt(`Apply "${applyAction}" to matched users? [y/N]: `)
                )
                if (!confirmed) {
                    logger.info('Action cancelled.')
                    return
                }
            }
        }

        const options: ActionReportOptions = {
            target,
            daysSince,
            applyAction,
            dryRun,
            ...(node ? { node } : {}),
            ...(targetUser ? { targetUser } : {}),
            ...(columnsRaw ? { columns: columnsRaw } : {}),
        }

        const outputRaw = (await prompt('Output format [table/json/csv, default table]: ')).trim().toLowerCase()
        if (outputRaw === 'json') options.outputFormat = AuditOutputFormat.Json
        else if (outputRaw === 'csv') options.outputFormat = AuditOutputFormat.Csv

        const restore = suppressLogs()
        let result
        try {
            result = await vault.runActionReport(options)
        } finally {
            restore()
        }

        logger.info('')
        logger.info(result.formatted)
        logger.info('')
        logger.info(`Rows: ${result.rows.length}`)
        logger.info(
            `Action: ${result.actionResult.action} (${result.actionResult.status}, affected=${result.actionResult.affectedCount})`
        )
        if (result.actionResult.serverMessage && result.actionResult.serverMessage !== 'n/a') {
            logger.info(result.actionResult.serverMessage)
        }
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(actionReportExample)

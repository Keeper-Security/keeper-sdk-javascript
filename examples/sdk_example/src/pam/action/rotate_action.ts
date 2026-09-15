import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'
import { isYes } from '../../utils/format'

async function rotatePamActionExample() {
    const vault = await login()

    try {
        const mode = (await prompt('Rotate by record UID or shared folder? [r/f]: ')).trim().toLowerCase()
        const target = (await prompt(mode === 'f' ? 'Shared folder UID or title: ' : 'PAM user record UID: ')).trim()
        if (!target) {
            logger.info('A rotation target is required.')
            return
        }

        const dryRun = isYes(await prompt('Dry run? [y/N]: '))
        const recursiveAnswer = mode === 'f' ? (await prompt('Include subfolders? [Y/n]: ')).trim() : ''
        const recursive = mode === 'f' ? recursiveAnswer === '' || isYes(recursiveAnswer) : undefined
        const selfDestruct = (await prompt('Self-destruct sharing option (Enter to skip): ')).trim() || undefined
        const emailConfig = (await prompt('Email configuration UID/title (Enter to skip): ')).trim() || undefined
        const sendEmail = (await prompt('Send email to (Enter to skip): ')).trim() || undefined
        const emailMessage = sendEmail ? (await prompt('Email message (Enter for default): ')).trim() || undefined : undefined
        const input = mode === 'f'
            ? { folder: target, dryRun, recursive, selfDestruct, emailConfig, sendEmail, emailMessage }
            : { recordUid: target, dryRun, selfDestruct, emailConfig, sendEmail, emailMessage }

        let result
        const restore = suppressLogs()
        try {
            result = await vault.rotatePamAction(input)
        } finally {
            restore()
        }

        for (const record of result.records) {
            const suffix = record.message ? `: ${record.message}` : ''
            logger.info(`${record.recordUid} — ${record.status}${suffix}`)
            if (record.conversationId) logger.info(`  Conversation ID: ${record.conversationId}`)
            if (record.response) logger.info(`  Response: ${JSON.stringify(record.response)}`)
        }
        for (const warning of result.warnings) logger.warn(warning)
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(rotatePamActionExample)

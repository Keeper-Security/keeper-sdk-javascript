import {
    cleanup,
    extractErrorMessage,
    formatAddUserResult,
    login,
    logger,
    prompt,
    renderAddUserAsciiTable,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { AddUserResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

function parseEmailList(raw: string): string[] {
    const seen = new Set<string>()
    const out: string[] = []
    for (const token of raw.split(',')) {
        const trimmed = token.trim()
        if (!trimmed) continue
        const key = trimmed.toLowerCase()
        if (seen.has(key)) continue
        seen.add(key)
        out.push(trimmed)
    }
    return out
}

async function addUserExample() {
    const vault = await login()

    try {
        const emailsRaw = (await prompt('Email(s) to add (comma-separated): ')).trim()
        const emails = parseEmailList(emailsRaw)
        if (emails.length === 0) {
            logger.error('At least one email is required.')
            process.exitCode = 1
            return
        }

        const parentRaw = (await prompt('Parent node name or ID (Enter for enterprise root): ')).trim()
        const parent: string | null = parentRaw || null

        const fullName = (await prompt('Full name (Enter to skip): ')).trim() || undefined
        const jobTitle = (await prompt('Job title (Enter to skip): ')).trim() || undefined

        const restore = suppressLogs()
        let result: AddUserResult
        try {
            result = await vault.addUsers({ emails, parent, fullName, jobTitle })
        } finally {
            restore()
        }

        const table = formatAddUserResult(result)
        logger.info('')
        logger.info(renderAddUserAsciiTable(table))
        logger.info('')
        logger.info(
            `Result: ${result.success ? 'success' : 'partial/failed'} ` +
                `(added=${result.added}, skipped=${result.skipped}, failed=${result.failed})`
        )

        if (result.failed > 0 || (!result.success && result.added === 0)) {
            process.exitCode = 1
        }
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(addUserExample)

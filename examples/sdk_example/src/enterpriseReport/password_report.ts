import {
    AuditOutputFormat,
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { PasswordReportOptions } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { formatPasswordReportResult } from '../utils/reportFormat'

function parseOptionalInt(value: string): number | undefined {
    const trimmed = value.trim()
    if (!trimmed) return undefined
    const parsed = Number.parseInt(trimmed, 10)
    return Number.isFinite(parsed) ? parsed : undefined
}

async function passwordReportExample() {
    const vault = await login()

    try {
        const folder = (await prompt('Folder path or UID (Enter for entire vault): ')).trim()

        const policyRaw = (await prompt('Policy Length,Lower,Upper,Digits,Special (e.g. 12,2,2,2,0): ')).trim()
        let options: PasswordReportOptions = {}

        if (policyRaw) {
            options.policy = policyRaw
        } else {
            const length = parseOptionalInt(await prompt('Min length [-l]: '))
            const lower = parseOptionalInt(await prompt('Min lowercase [--lower]: '))
            const upper = parseOptionalInt(await prompt('Min uppercase [-u]: '))
            const digits = parseOptionalInt(await prompt('Min digits [-d]: '))
            const special = parseOptionalInt(await prompt('Min special [-s]: '))
            options = {
                ...(length != null ? { length } : {}),
                ...(lower != null ? { lower } : {}),
                ...(upper != null ? { upper } : {}),
                ...(digits != null ? { digits } : {}),
                ...(special != null ? { special } : {}),
            }
        }

        if (folder) options.folder = folder

        const verboseRaw = (await prompt('Verbose (score/BreachWatch/reuse)? [y/N]: ')).trim().toLowerCase()
        if (verboseRaw === 'y' || verboseRaw === 'yes') options.verbose = true

        const outputRaw = (await prompt('Output format [table/json/csv, default table]: ')).trim().toLowerCase()
        let outputFormat = AuditOutputFormat.Table
        if (outputRaw === 'json') outputFormat = AuditOutputFormat.Json
        else if (outputRaw === 'csv') outputFormat = AuditOutputFormat.Csv

        const restore = suppressLogs()
        let result
        try {
            result = await vault.runPasswordReport(options)
        } finally {
            restore()
        }

        logger.info('')
        logger.info(`Policy: ${result.policySummary}`)
        logger.info('')
        logger.info(formatPasswordReportResult(result, outputFormat))
        logger.info('')
        logger.info(`Rows: ${result.rows.length}`)
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(passwordReportExample)

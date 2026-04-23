import { login, cleanup, prompt, getRecordTitle, logger } from '@keeper-security/keeper-sdk-javascript'
import type { HistoryEntry } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { padRight, formatFieldValue } from '../utils/format'

async function recordHistory() {
    const vault = await login()

    try {
        const input = await prompt('Enter Record UID or title: ')
        if (!input) {
            logger.info('No input provided.')
            return
        }

        const record = vault.findRecord(input)
        if (!record) {
            logger.info(`Record "${input}" not found.`)
            return
        }

        const title = getRecordTitle(record)
        logger.info(`\nFetching history for "${title}" (${record.uid})...\n`)

        const result = await vault.getRecordHistory(record.uid)
        const history = result.history

        if (history.length === 0) {
            logger.info('No history found for this record.')
            return
        }

        logger.info('-'.repeat(70))
        logger.info(
            padRight('Version', 10) +
            padRight('Modified By', 35) +
            'Time Modified'
        )
        logger.info('-'.repeat(70))

        const total = history.length
        for (let i = 0; i < total; i++) {
            const entry = history[i]
            const label = i === 0 ? 'Current' : `V.${total - i}`
            const modified = entry.clientModifiedTime
                ? new Date(entry.clientModifiedTime).toLocaleString()
                : ''

            logger.info(
                padRight(label, 10) +
                padRight(entry.userName, 35) +
                modified
            )
        }
        logger.info('-'.repeat(70))

        const viewChoice = await prompt('\nEnter revision number to view details (or press Enter to skip): ')
        if (!viewChoice) return

        const revNum = parseInt(viewChoice, 10)
        if (isNaN(revNum) || revNum < 1 || revNum >= total) {
            logger.info(`Invalid revision. Valid range: 1..${total - 1}`)
            return
        }

        const revIndex = total - revNum
        const rev = history[revIndex]

        displayRevision(rev, `V.${revNum}`)
    } finally {
        cleanup(vault)
    }
}

function displayRevision(entry: HistoryEntry, label: string) {
    logger.info('\n' + '-'.repeat(50))
    logger.info(`Revision: ${label}`)
    logger.info('-'.repeat(50))

    if (!entry.data) {
        logger.info('  (could not decrypt revision data)')
        return
    }

    logger.info(`  Title:    ${entry.data.title || '(untitled)'}`)
    logger.info(`  Type:     ${entry.data.type || 'unknown'}`)

    const fields = entry.data.fields || []
    for (const field of fields) {
        const fieldLabel = field.label || field.type
        const values = Array.isArray(field.value) ? field.value : [field.value]
        logger.info(`  ${fieldLabel}: ${formatFieldValue({ type: field.type, value: values })}`)
    }

    if (entry.data.notes) {
        logger.info(`  Notes:    ${entry.data.notes}`)
    }

    const modified = entry.clientModifiedTime
        ? new Date(entry.clientModifiedTime).toLocaleString()
        : 'unknown'
    logger.info(`  Modified: ${modified}`)
    logger.info(`  By:       ${entry.userName}`)
    logger.info('-'.repeat(50))
}

runExample(recordHistory)

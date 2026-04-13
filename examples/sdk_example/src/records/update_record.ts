import {
    login,
    cleanup,
    suppressLogs,
    prompt,
    getRecordTitle,
    getRecordType,
    getRecordFields,
    logger,
} from 'keeper-sdk'
import type { TypedRecordData, RecordFieldInput } from 'keeper-sdk'
import { runExample } from '../utils/runner'

const LEGACY_TYPE_MAPPING: Record<string, string> = { legacy: 'login' }

function normalizeRecordType(type: string): string {
    return LEGACY_TYPE_MAPPING[type] || type
}

async function updateRecord() {
    const vault = await login()

    try {
        const input = await prompt('Enter Record UID or title to update: ')
        if (!input) {
            logger.info('No input provided.')
            return
        }

        const record = vault.findRecord(input)
        if (!record) {
            logger.info(`Record "${input}" not found.`)
            return
        }

        const currentTitle = getRecordTitle(record)
        const currentType = getRecordType(record)
        const currentFields = getRecordFields(record)

        logger.info(`\nCurrent record: "${currentTitle}" (${currentType})`)
        if (currentFields.length > 0) {
            logger.info('Current fields:')
            for (const f of currentFields) {
                const label = f.label || f.type
                const value = f.type === 'password' ? '********' : JSON.stringify(f.value)
                logger.info(`  ${label}: ${value}`)
            }
        }

        logger.info('\nEnter new values (press Enter to keep current):\n')

        const newTitle = await prompt(`Title [${currentTitle}]: `) || currentTitle

        const newFields: RecordFieldInput[] = []
        for (const field of currentFields) {
            const label = field.label || field.type
            const currentVal = field.type === 'password' ? '********' : String(field.value[0] || '')
            const newVal = await prompt(`${label} [${currentVal}]: `)
            newFields.push({
                type: field.type,
                value: [newVal || field.value[0]],
                ...(field.label ? { label: field.label } : {}),
            })
        }

        const updateData: TypedRecordData = {
            type: normalizeRecordType(currentType),
            title: newTitle,
            fields: newFields,
        }

        logger.info('\nUpdating record...')
        let result
        {
            const restore = suppressLogs()
            try {
                result = await vault.updateRecord(record.uid, updateData)
            } finally {
                restore()
            }
        }

        if (result.success) {
            logger.info('Record updated successfully!')
            logger.info(`  UID:    ${result.recordUid}`)
            logger.info(`  Status: ${result.status}`)
        } else {
            logger.error(`Failed to update record: ${result.status}`)
        }
    } finally {
        cleanup(vault)
    }
}

runExample(updateRecord)

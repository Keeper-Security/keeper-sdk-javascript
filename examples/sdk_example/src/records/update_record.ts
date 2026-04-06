import {
    login,
    cleanup,
    prompt,
    getRecordTitle,
    getRecordType,
    getRecordFields,
    logger,
    extractErrorMessage,
} from 'keeper-sdk'
import type { TypedRecordData, RecordFieldInput } from 'keeper-sdk'

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
            type: currentType === 'legacy' ? 'login' : currentType,
            title: newTitle,
            fields: newFields,
        }

        logger.info('\nUpdating record...')
        const result = await vault.updateRecord(record.uid, updateData)

        if (result.success) {
            logger.info('Record updated successfully!')
            logger.info(`  UID:    ${result.recordUid}`)
            logger.info(`  Status: ${result.status}`)
        } else {
            logger.error(`Failed to update record: ${result.status}`)
        }
    } finally {
        await cleanup(vault)
    }
}

updateRecord()
    .then(() => process.exit(0))
    .catch((err) => {
        logger.error('Error:', extractErrorMessage(err))
        process.exit(1)
    })

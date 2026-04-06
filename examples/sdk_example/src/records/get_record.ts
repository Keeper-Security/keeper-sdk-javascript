import {
    login,
    cleanup,
    prompt,
    getRecordTitle,
    getRecordType,
    getRecordFields,
    getRecordLogin,
    getRecordPassword,
    getRecordUrl,
    logger,
    extractErrorMessage,
} from 'keeper-sdk'

async function getRecord() {
    const vault = await login()

    try {
        const records = vault.getRecords()

        if (records.length === 0) {
            logger.info('No records found in vault.')
            return
        }

        let searchInput = await prompt('Enter record UID or title: ')

        if (!searchInput) {
            searchInput = records[0].uid
            logger.info(`No input provided. Using first record: ${searchInput}`)
        }

        const record = vault.findRecord(searchInput)

        if (!record) {
            logger.info(`\nRecord "${searchInput}" not found.`)
            return
        }

        const title = getRecordTitle(record)
        const type = getRecordType(record)
        const version = record.version

        logger.info('\n' + '-'.repeat(50))
        logger.info('Record Details')
        logger.info('-'.repeat(50))
        logger.info(`  Title:      ${title}`)
        logger.info(`  Record UID: ${record.uid}`)
        logger.info(`  Version:    ${version}`)
        logger.info(`  Revision:   ${record.revision}`)
        logger.info(`  Shared:     ${record.shared}`)

        if (version <= 2) {
            logger.info(`  Type:       password (legacy v${version})`)
            const loginVal = getRecordLogin(record)
            const password = getRecordPassword(record)
            const url = getRecordUrl(record)

            if (loginVal) logger.info(`  Login:      ${loginVal}`)
            if (password) logger.info(`  Password:   ${'*'.repeat(password.length)}`)
            if (url) logger.info(`  URL:        ${url}`)

            const data = record.data
            if (data?.notes) logger.info(`  Notes:      ${data.notes}`)

            if (data?.custom && Array.isArray(data.custom)) {
                logger.info('\n  Custom Fields:')
                for (const cf of data.custom) {
                    logger.info(`    ${cf.name || cf.type || 'custom'}: ${cf.value}`)
                }
            }
        } else {
            logger.info(`  Type:       ${type} (v${version})`)

            const fields = getRecordFields(record)
            if (fields.length > 0) {
                logger.info('\n  Fields:')
                for (const field of fields) {
                    const label = field.label || field.type
                    let displayValue: string

                    if (field.type === 'password') {
                        const pw = field.value[0]
                        displayValue = pw ? '*'.repeat(String(pw).length) : '(empty)'
                    } else if (field.type === 'fileRef') {
                        displayValue = `[${field.value.length} file(s)]`
                    } else {
                        displayValue = field.value
                            .map((v: any) => {
                                if (typeof v === 'string') return v
                                if (v && typeof v === 'object') return JSON.stringify(v)
                                return String(v)
                            })
                            .filter(Boolean)
                            .join(', ') || '(empty)'
                    }

                    logger.info(`    ${label}: ${displayValue}`)
                }
            }

            if (record.data?.notes) {
                logger.info(`\n  Notes:      ${record.data.notes}`)
            }
        }

        const meta = vault.getRecordMetadataByUid(record.uid)
        if (meta) {
            logger.info('\n  Permissions:')
            logger.info(`    Owner:     ${meta.owner}`)
            logger.info(`    Can Share: ${meta.canShare}`)
            logger.info(`    Can Edit:  ${meta.canEdit}`)
        }

        logger.info('-'.repeat(50))
    } finally {
        await cleanup(vault)
    }
}

getRecord()
    .then(() => process.exit(0))
    .catch((err) => {
        logger.error('Error:', extractErrorMessage(err))
        process.exit(1)
    })

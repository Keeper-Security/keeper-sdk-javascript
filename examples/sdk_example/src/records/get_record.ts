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
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { formatFieldValue, LEGACY_RECORD_MAX_VERSION } from '../utils/format'

async function getRecord() {
    const vault = await login()

    try {
        const records = vault.getRecords()

        if (records.length === 0) {
            logger.info('No records found in vault.')
            return
        }

        const searchInput = await prompt('Enter record UID or title: ')

        if (!searchInput) {
            logger.info('No input provided. Exiting.')
            return
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

        if (version <= LEGACY_RECORD_MAX_VERSION) {
            displayLegacyRecord(record)
        } else {
            displayTypedRecord(record, type)
        }

        displayMetadata(vault, record.uid)
        logger.info('-'.repeat(50))
    } finally {
        cleanup(vault)
    }
}

function displayLegacyRecord(record: { data?: Record<string, unknown> }): void {
    const version = (record as { version: number }).version
    logger.info(`  Type:       password (legacy v${version})`)
    const loginVal = getRecordLogin(record as Parameters<typeof getRecordLogin>[0])
    const password = getRecordPassword(record as Parameters<typeof getRecordPassword>[0])
    const url = getRecordUrl(record as Parameters<typeof getRecordUrl>[0])

    if (loginVal) logger.info(`  Login:      ${loginVal}`)
    if (password) logger.info(`  Password:   ${'*'.repeat(password.length)}`)
    if (url) logger.info(`  URL:        ${url}`)

    const data = record.data as Record<string, unknown> | undefined
    if (data?.notes) logger.info(`  Notes:      ${data.notes}`)

    if (data?.custom && Array.isArray(data.custom)) {
        logger.info('\n  Custom Fields:')
        for (const cf of data.custom) {
            const entry = cf as { name?: string; type?: string; value?: string }
            logger.info(`    ${entry.name || entry.type || 'custom'}: ${entry.value}`)
        }
    }
}

function displayTypedRecord(record: Parameters<typeof getRecordFields>[0], type: string): void {
    logger.info(`  Type:       ${type} (v${(record as { version: number }).version})`)

    const fields = getRecordFields(record)
    if (fields.length > 0) {
        logger.info('\n  Fields:')
        for (const field of fields) {
            const label = field.label || field.type
            logger.info(`    ${label}: ${formatFieldValue(field)}`)
        }
    }

    const data = (record as { data?: { notes?: string } }).data
    if (data?.notes) {
        logger.info(`\n  Notes:      ${data.notes}`)
    }
}

function displayMetadata(vault: { getRecordMetadataByUid: (uid: string) => { owner: boolean; canShare: boolean; canEdit: boolean } | undefined }, uid: string): void {
    const meta = vault.getRecordMetadataByUid(uid)
    if (meta) {
        logger.info('\n  Permissions:')
        logger.info(`    Owner:     ${meta.owner}`)
        logger.info(`    Can Share: ${meta.canShare}`)
        logger.info(`    Can Edit:  ${meta.canEdit}`)
    }
}

runExample(getRecord)

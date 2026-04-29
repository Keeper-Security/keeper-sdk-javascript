import {
    login,
    cleanup,
    prompt,
    suppressLogs,
    getRecordTitle,
    getRecordType,
    getRecordLogin,
    getRecordPassword,
    getRecordUrl,
    getRecordTotpUrl,
    getTotpCode,
    extractErrorMessage,
    logger,
} from '@keeper-security/keeper-sdk-javascript'
import type { DRecord, KeeperVault, RecordUserPermission } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

const MASKED_VALUE = '********'
const LABEL_WIDTH = 20

function formatRow(label: string, value: string): string {
    return `${label.padStart(LABEL_WIDTH)}: ${value}`
}

function displayRecord(record: DRecord, unmask: boolean): void {
    logger.info(`UID: ${record.uid}`)
    logger.info(formatRow('Type', getRecordType(record)))
    logger.info(formatRow('Title', getRecordTitle(record)))

    const loginVal = getRecordLogin(record)
    const password = getRecordPassword(record)
    const url = getRecordUrl(record)

    if (loginVal) logger.info(formatRow('login', loginVal))
    if (password) logger.info(formatRow('password', unmask ? password : MASKED_VALUE))
    if (url) logger.info(formatRow('url', url))

    const totpUrl = getRecordTotpUrl(record)
    if (totpUrl) {
        logger.info(formatRow('TOTP URL', unmask ? totpUrl : MASKED_VALUE))
        const code = getTotpCode(totpUrl)
        if (code) {
            logger.info(formatRow('Two Factor Code', `${code.code}    valid for ${code.secondsRemaining} sec`))
        }
    }
}

async function displayUserPermissions(vault: KeeperVault, uid: string): Promise<void> {
    const restore = suppressLogs()
    let info
    try {
        info = await vault.getRecordShareInfo(uid)
    } catch (err) {
        logger.warn(`\nCould not load share information: ${extractErrorMessage(err)}`)
        return
    } finally {
        restore()
    }

    if (!info || info.userPermissions.length === 0) return

    logger.info('\nUser Permissions:')
    for (const u of info.userPermissions) {
        printUserPermission(u)
    }
}

function printUserPermission(u: RecordUserPermission): void {
    logger.info('')
    if (u.username) logger.info(`User: ${u.username}`)
    if (u.accountUid) logger.info(`User UID: ${u.accountUid}`)
    if (u.owner) logger.info('Owner: Yes')
    logger.info(`Shareable: ${u.shareable ? 'Yes' : 'No'}`)
    logger.info(`Read-Only: ${u.editable ? 'No' : 'Yes'}`)
}

async function getRecord() {
    const vault = await login()

    try {
        if (vault.getRecords().length === 0) {
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

        const unmask = isYes(await prompt('Unmask sensitive fields? [y/N]: '))

        logger.info('')
        displayRecord(record, unmask)
        await displayUserPermissions(vault, record.uid)
    } finally {
        cleanup(vault)
    }
}

runExample(getRecord)

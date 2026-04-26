import { execFileSync } from 'child_process'
import { login, cleanup, prompt, getRecordTitle, getRecordPassword, logger, extractErrorMessage } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

const CLIPBOARD_TIMEOUT_MS = 3000

function copyToClipboard(text: string): boolean {
    const opts = { input: text, timeout: CLIPBOARD_TIMEOUT_MS }
    try {
        if (process.platform === 'darwin') {
            execFileSync('pbcopy', [], opts)
        } else if (process.platform === 'win32') {
            execFileSync('clip', [], opts)
        } else {
            execFileSync('xclip', ['-selection', 'clipboard'], opts)
        }
        return true
    } catch (err) {
        logger.debug('Clipboard copy failed:', extractErrorMessage(err))
        return false
    }
}

async function findPassword() {
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

        const password = getRecordPassword(record)
        if (!password) {
            logger.info('No password found for this record.')
            return
        }

        const title = getRecordTitle(record)
        if (copyToClipboard(password)) {
            logger.info(`Password for "${title}" copied to clipboard.`)
        } else {
            logger.error('Failed to copy to clipboard.')
        }
    } finally {
        cleanup(vault)
    }
}

runExample(findPassword)
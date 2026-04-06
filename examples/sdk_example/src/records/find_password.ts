import { execSync } from 'child_process'
import { login, cleanup, prompt, getRecordTitle, getRecordPassword, logger, extractErrorMessage } from 'keeper-sdk'

function copyToClipboard(text: string): boolean {
    try {
        if (process.platform === 'darwin') {
            execSync('pbcopy', { input: text })
        } else if (process.platform === 'win32') {
            execSync('clip', { input: text })
        } else {
            execSync('xclip -selection clipboard', { input: text })
        }
        return true
    } catch {
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
        await cleanup(vault)
    }
}

findPassword()
    .then(() => process.exit(0))
    .catch((err) => {
        logger.error('Error:', extractErrorMessage(err))
        process.exit(1)
    })

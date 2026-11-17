import { login, cleanup, logger } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

async function loginAndShowSession() {
    // Persistent login, then 2FA / SSO / device approval as the account requires, then the password.
    const vault = await login()

    try {
        const auth = vault.getAuth()
        const summary = vault.getSummary()

        logger.info('--- Session Info ---')
        logger.info(`  Username:       ${auth.username}`)
        logger.info(`  Server:         ${vault.host}`)
        logger.info(`  Session Token:  ${auth.sessionToken || '(none)'}`)
        logger.info(`  Data Key:       ${auth.dataKey ? '(loaded)' : '(not loaded)'}`)
        logger.info(`  Records:        ${summary.recordCount}`)
        logger.info(`  Shared Folders: ${summary.sharedFolderCount}`)
        logger.info(`  Teams:          ${summary.teamCount}`)
        logger.info(`  Folders:        ${summary.folderCount}`)

        logger.info('\nLogin successful. Session is active.')
    } finally {
        cleanup(vault)
    }
}

runExample(loginAndShowSession)

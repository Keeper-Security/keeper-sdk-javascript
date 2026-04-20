import { KeeperVault, prompt, suppressLogs, cleanup, logger, KeeperSdkError, SdkDefaults, ResultCodes } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

async function main() {
    const username = await prompt('Username (email): ')
    if (!username) throw new KeeperSdkError('Username is required.', ResultCodes.MISSING_USERNAME)

    const host = await prompt('Host [keepersecurity.com]: ')

    const sessionToken = await prompt('Session Token: ')
    if (!sessionToken) throw new KeeperSdkError('Session token is required.', 'missing_session_token')

    const resolvedHost = host || 'keepersecurity.com'

    logger.info(`\nLogging in as ${username} on ${resolvedHost} using session token...`)

    const vault = new KeeperVault({ host: resolvedHost, clientVersion: SdkDefaults.CLIENT_VERSION })

    try {
        {
            const restore = suppressLogs()
            try {
                await vault.loginWithSessionToken(username, sessionToken)
            } finally {
                restore()
            }
        }

        const auth = vault.getAuth()

        logger.info('--- Session Info ---')
        logger.info(`  Username:       ${auth.username}`)
        logger.info(`  Session Token:  ${auth.sessionToken ? '(active)' : '(none)'}`)
        logger.info(`  Data Key:       ${auth.dataKey ? '(loaded)' : '(not loaded)'}`)

        logger.info('\nSyncing vault...')
        {
            const restore = suppressLogs()
            try {
                await vault.sync()
            } finally {
                restore()
            }
        }

        const summary = vault.getSummary()
        logger.info(`  Records:        ${summary.recordCount}`)
        logger.info(`  Shared Folders: ${summary.sharedFolderCount}`)
        logger.info(`  Teams:          ${summary.teamCount}`)
        logger.info(`  Folders:        ${summary.folderCount}`)

        logger.info('\nLogin successful. Session is active.')
    } finally {
        cleanup(vault)
    }
}

runExample(main)

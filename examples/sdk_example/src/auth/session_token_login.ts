import { KeeperVault, prompt, suppressLogs, logger, KeeperSdkError, extractErrorMessage, SdkDefaults } from 'keeper-sdk'

async function main() {
    const username = await prompt('Username (email): ')
    if (!username) throw new KeeperSdkError('Username is required.', 'missing_username')

    const host = await prompt('Host [keepersecurity.com]: ')

    const sessionToken = await prompt('Session Token: ')
    if (!sessionToken) throw new KeeperSdkError('Session token is required.', 'missing_session_token')

    const resolvedHost = host || 'keepersecurity.com'

    logger.info(`\nLogging in as ${username} on ${resolvedHost} using session token...`)
    logger.info(`  Session Token: ${sessionToken}\n`)

    const vault = new KeeperVault({ host: resolvedHost, clientVersion: SdkDefaults.CLIENT_VERSION })

    let restore = suppressLogs()
    try {
        await vault.loginWithSessionToken(username, sessionToken)
    } finally {
        restore()
    }

    const auth = vault.getAuth()

    logger.info('--- Session Info ---')
    logger.info(`  Username:       ${auth.username}`)
    logger.info(`  Session Token:  ${auth.sessionToken ? '(active)' : '(none)'}`)
    logger.info(`  Data Key:       ${auth.dataKey ? '(loaded)' : '(not loaded)'}`)

    logger.info('\nSyncing vault...')
    restore = suppressLogs()
    try {
        await vault.sync()
    } finally {
        restore()
    }

    const summary = vault.getSummary()
    logger.info(`  Records:        ${summary.recordCount}`)
    logger.info(`  Shared Folders: ${summary.sharedFolderCount}`)
    logger.info(`  Teams:          ${summary.teamCount}`)
    logger.info(`  Folders:        ${summary.folderCount}`)

    logger.info('\nLogin successful. Session is active.')

    restore = suppressLogs()
    try {
        vault.getAuth().disconnect()
    } catch { /* ignore */ }
    restore()
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        logger.error('Error:', extractErrorMessage(err))
        process.exit(1)
    })

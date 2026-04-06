import { login, cleanup, logger, extractErrorMessage } from 'keeper-sdk'

async function displaySessionInfo() {
    const vault = await login()

    try {
        const auth = vault.getAuth()
        const summary = vault.getSummary()

        logger.info('--- Session Info ---')
        logger.info(`  Username:       ${auth.username}`)
        logger.info(`  Session Token:  ${auth.sessionToken || '(none)'}`)
        logger.info(`  Data Key:       ${auth.dataKey ? '(loaded)' : '(not loaded)'}`)
        logger.info(`  Records:        ${summary.recordCount}`)
        logger.info(`  Shared Folders: ${summary.sharedFolderCount}`)
        logger.info(`  Teams:          ${summary.teamCount}`)
        logger.info(`  Folders:        ${summary.folderCount}`)

        logger.info('\nLogin successful. Session is active.')
    } finally {
        await cleanup(vault)
    }
}

displaySessionInfo()
    .then(() => process.exit(0))
    .catch((err) => {
        logger.error('Error:', extractErrorMessage(err))
        process.exit(1)
    })

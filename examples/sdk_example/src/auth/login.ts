import {
    KeeperVault,
    KeeperSdkError,
    loadKeeperConfig,
    resolveServer,
    prompt,
    suppressLogs,
    cleanup,
    logger,
    extractResultCode,
    SdkDefaults,
    ResultCodes,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

const MAX_ATTEMPTS = 5

async function passwordLogin() {
    const config = await loadKeeperConfig()
    const defaultUsername = config.last_login || config.user || ''

    let username: string
    if (defaultUsername) {
        logger.info(`Enter master password for ${defaultUsername}`)
        username = defaultUsername
    } else {
        username = await prompt('Username (email): ')
        if (!username) throw new KeeperSdkError('Username is required.', ResultCodes.MISSING_USERNAME)
    }

    const host = await resolveServer(username)
    const vault = new KeeperVault({ host, clientVersion: SdkDefaults.CLIENT_VERSION })

    try {
        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            const password = await prompt('Password: ', true)
            if (!password) throw new KeeperSdkError('Password is required.', ResultCodes.MISSING_PASSWORD)

            const restore = suppressLogs()
            try {
                await vault.login(username, password)
                restore()
                break
            } catch (err) {
                restore()
                const resultCode = extractResultCode(err)
                if (resultCode === ResultCodes.INVALID_CREDENTIALS) {
                    const remaining = MAX_ATTEMPTS - attempt
                    if (remaining > 0) {
                        logger.warn(`Incorrect Password (${remaining} attempt${remaining === 1 ? '' : 's'} remaining)`)
                        continue
                    }
                    throw new KeeperSdkError(`Maximum login attempts (${MAX_ATTEMPTS}) exceeded.`, ResultCodes.MAX_ATTEMPTS_EXCEEDED)
                }
                throw KeeperSdkError.from(err)
            }
        }

        logger.info('Successfully authenticated with Master Password\n')
        logger.info('Syncing vault...')
        const restore = suppressLogs()
        try {
            await vault.sync()
        } finally {
            restore()
        }

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

runExample(passwordLogin)
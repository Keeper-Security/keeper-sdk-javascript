import {
    KeeperVault,
    SessionManager,
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
async function registerDevice() {
    const config = await loadKeeperConfig()
    const defaultUsername = config.last_login || config.user || ''
    let username: string
    if (defaultUsername) {
        logger.info(`Using saved username: ${defaultUsername}`)
        username = defaultUsername
    } else {
        username = await prompt('Username (email): ')
        if (!username) throw new KeeperSdkError('Username is required.', ResultCodes.MISSING_USERNAME)
    }
    const host = await resolveServer(username)
    logger.info(`Host resolved to: ${host}`)
    const sessionManager = new SessionManager()
    const vault = new KeeperVault({
        host,
        clientVersion: SdkDefaults.CLIENT_VERSION,
        sessionStorage: sessionManager,
    })
    try {
        const MAX_ATTEMPTS = 5
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
                        logger.warn(`Incorrect password (${remaining} attempt(s) remaining)`)
                        continue
                    }
                    throw new KeeperSdkError('Maximum attempts exceeded.', ResultCodes.MAX_ATTEMPTS_EXCEEDED)
                }
                throw err
            }
        }
        const auth = vault.getAuth()
        logger.info('\n--- Session Info ---')
        logger.info(`  Username:      ${auth.username}`)
        logger.info(`  Server:        ${vault.host}`)
        logger.info(`  Session Token: ${auth.sessionToken ? '(active)' : '(none)'}`)
        logger.info(`  Data Key:      ${auth.dataKey ? '(loaded)' : '(not loaded)'}`)
        logger.info('\nDevice registration complete.')
    } finally {
        cleanup(vault)
    }
}
runExample(registerDevice)
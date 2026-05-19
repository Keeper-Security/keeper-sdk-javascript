import {
    cleanup,
    extractErrorMessage,
    formatUserView,
    login,
    logger,
    prompt,
    suppressLogs,
    userViewTable,
} from '@keeper-security/keeper-sdk-javascript'
import type { UserView } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

async function viewUserExample() {
    const vault = await login()

    try {
        const identifier = (await prompt('User email or ID: ')).trim()
        if (!identifier) {
            logger.error('User email or ID is required.')
            process.exitCode = 1
            return
        }

        const asJson = isYes(await prompt('Output as JSON? [y/N]: '))
        const verbose = !asJson && isYes(await prompt('show IDs? [y/N]: '))

        let view: UserView
        const restore = suppressLogs()
        try {
            view = await vault.viewUser(identifier)
        } finally {
            restore()
        }

        if (asJson) {
            logger.info(JSON.stringify(view, null, 2))
            return
        }

        const table = formatUserView(view, { verbose })
        logger.info('')
        logger.info(userViewTable(table))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(viewUserExample)

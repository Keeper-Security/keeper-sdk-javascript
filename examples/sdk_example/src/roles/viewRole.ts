import {
    cleanup,
    extractErrorMessage,
    formatRoleView,
    login,
    logger,
    prompt,
    roleViewTable,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { RoleView } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

async function viewRoleExample() {
    const vault = await login()

    try {
        const identifier = (await prompt('Role name or ID: ')).trim()
        if (!identifier) {
            logger.error('Role name or ID is required.')
            process.exitCode = 1
            return
        }

        const asJson = isYes(await prompt('Output as JSON? [y/N]: '))
        const verbose = !asJson && isYes(await prompt('Show user/node IDs? [y/N]: '))

        let view: RoleView
        const restore = suppressLogs()
        try {
            view = await vault.viewRole(identifier)
        } finally {
            restore()
        }

        if (asJson) {
            logger.info(JSON.stringify(view, null, 2))
            return
        }

        const table = formatRoleView(view, { verbose })
        logger.info('')
        logger.info(roleViewTable(table))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(viewRoleExample)
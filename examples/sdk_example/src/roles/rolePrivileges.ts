import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { ChangeRolePrivilegesResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { splitCommaSeparated } from '../utils/format'

async function rolePrivilegesExample() {
    const vault = await login()

    try {
        const role = (await prompt('Role name or ID: ')).trim()
        if (!role) {
            logger.error('A role is required.')
            process.exitCode = 1
            return
        }

        const node = (await prompt('Managed node name or ID (must already be managed by the role): ')).trim()
        if (!node) {
            logger.error('A managed node is required.')
            process.exitCode = 1
            return
        }

        const addRaw = (await prompt('Privileges to add (comma-separated, Enter to skip): ')).trim()
        const add = splitCommaSeparated(addRaw)

        const removeRaw = (await prompt('Privileges to remove (comma-separated, Enter to skip): ')).trim()
        const remove = splitCommaSeparated(removeRaw)

        if (add.length === 0 && remove.length === 0) {
            logger.error('At least one privilege to add or remove is required.')
            process.exitCode = 1
            return
        }

        const restore = suppressLogs()
        let result: ChangeRolePrivilegesResult
        try {
            result = await vault.changeRolePrivileges({ role, node, add, remove })
        } finally {
            restore()
        }

        const table = vault.formatChangeRolePrivilegesResult(result)
        logger.info('')
        logger.info(vault.renderChangeRolePrivilegesAsciiTable(table))
        logger.info('')
        logger.info(
            `Result: ${result.success ? 'success' : 'partial/failed'} ` +
                `(succeeded=${result.succeeded}, failed=${result.failed})`
        )

        if (result.failed > 0 || (!result.success && result.succeeded === 0)) {
            process.exitCode = 1
        }
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(rolePrivilegesExample)

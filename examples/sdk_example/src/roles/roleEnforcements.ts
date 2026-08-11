import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { SetRoleEnforcementsResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { splitCommaSeparated } from '../utils/format'

async function roleEnforcementsExample() {
    const vault = await login()

    try {
        const rolesRaw = (await prompt('Role name(s) or ID(s) (comma-separated): ')).trim()
        const roles = splitCommaSeparated(rolesRaw)
        if (roles.length === 0) {
            logger.error('At least one role name or ID is required.')
            process.exitCode = 1
            return
        }

        const enforcementsRaw = (
            await prompt('Enforcements to apply (KEY:VALUE, comma-separated; VALUE=false removes): ')
        ).trim()
        const enforcements = splitCommaSeparated(enforcementsRaw)
        if (enforcements.length === 0) {
            logger.error('At least one KEY:VALUE enforcement is required.')
            process.exitCode = 1
            return
        }

        const restore = suppressLogs()
        let result: SetRoleEnforcementsResult
        try {
            result = await vault.setRoleEnforcements({ roles, enforcements })
        } finally {
            restore()
        }

        const table = vault.formatSetRoleEnforcementsResult(result)
        logger.info('')
        logger.info(vault.renderRoleEnforcementAsciiTable(table))
        logger.info('')
        logger.info(
            `Result: ${result.success ? 'success' : 'partial/failed'} ` +
                `(applied=${result.applied}, failed=${result.failed})`
        )

        if (result.failed > 0 || (!result.success && result.applied === 0)) {
            process.exitCode = 1
        }
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(roleEnforcementsExample)

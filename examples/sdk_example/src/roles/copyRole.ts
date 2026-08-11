import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { CopyRoleResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

async function copyRoleExample() {
    const vault = await login()

    try {
        const source = (await prompt('Source role name or ID to copy: ')).trim()
        if (!source) {
            logger.error('A source role is required.')
            process.exitCode = 1
            return
        }

        const nameRaw = (await prompt('New role name (Enter for "<source> Copy"): ')).trim()
        const name = nameRaw || undefined

        const parentRaw = (await prompt('Parent node name or ID (Enter to reuse source role node): ')).trim()
        const parent: string | null = parentRaw || null

        const clone = isYes(
            await prompt('Also clone role users and teams onto the new role? [y/N]: ')
        )

        const restore = suppressLogs()
        let result: CopyRoleResult
        try {
            result = await vault.copyRoles({ source, name, parent, clone })
        } finally {
            restore()
        }

        const table = vault.formatCopyRoleResult(result)
        logger.info('')
        logger.info(vault.renderCopyRoleAsciiTable(table))
        logger.info('')
        logger.info(`Result: ${result.success ? 'success' : 'failed'}`)

        if (!result.success) {
            process.exitCode = 1
        }
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(copyRoleExample)

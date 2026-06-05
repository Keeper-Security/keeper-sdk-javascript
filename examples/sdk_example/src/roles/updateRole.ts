import {
    cleanup,
    extractErrorMessage,
    formatUpdateRoleResult,
    login,
    logger,
    prompt,
    renderUpdateRoleAsciiTable,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { UpdateRoleResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

function parseRoleIdentifiers(raw: string): string[] {
    const seen = new Set<string>()
    const out: string[] = []
    for (const token of raw.split(',')) {
        const trimmed = token.trim()
        if (!trimmed) continue
        const key = trimmed.toLowerCase()
        if (seen.has(key)) continue
        seen.add(key)
        out.push(trimmed)
    }
    return out
}

async function updateRoleExample() {
    const vault = await login()

    try {
        const rolesRaw = (await prompt('Role name(s) or ID(s) to update (comma-separated): ')).trim()
        const roles = parseRoleIdentifiers(rolesRaw)
        if (roles.length === 0) {
            logger.error('At least one role name or ID is required.')
            process.exitCode = 1
            return
        }

        let name: string | undefined
        if (roles.length === 1) {
            const renamed = (await prompt('New display name (Enter to keep current): ')).trim()
            name = renamed || undefined
        } else {
            logger.info('Renaming is only allowed when updating a single role; skipping rename prompt.')
        }

        const parentRaw = (await prompt('New parent node name or ID (Enter to keep current): ')).trim()
        const parent: string | null = parentRaw || null

        const newUserRaw = (await prompt('Assign to new users? [on/off, Enter to keep current]: ')).trim().toLowerCase()
        const newUser = newUserRaw === 'on' ? 'on' : newUserRaw === 'off' ? 'off' : null

        const visibleBelowRaw = (await prompt('Visible below? [on/off, Enter to keep current]: ')).trim().toLowerCase()
        const visibleBelow = visibleBelowRaw === 'on' ? 'on' : visibleBelowRaw === 'off' ? 'off' : null

        const enforcementsRaw = (await prompt('Enforcements to set (KEY:VALUE, comma-separated, Enter to skip): ')).trim()
        const enforcements = enforcementsRaw
            ? enforcementsRaw.split(',').map((s) => s.trim()).filter(Boolean)
            : []

        const restore = suppressLogs()
        let result: UpdateRoleResult
        try {
            result = await vault.updateRoles({
                roles,
                name,
                parent,
                newUser: newUser as 'on' | 'off' | null,
                visibleBelow: visibleBelow as 'on' | 'off' | null,
                enforcements,
            })
        } finally {
            restore()
        }

        const table = formatUpdateRoleResult(result)
        logger.info('')
        logger.info(renderUpdateRoleAsciiTable(table))
        logger.info('')
        logger.info(
            `Result: ${result.success ? 'success' : 'partial/failed'} ` +
                `(updated=${result.updated}, failed=${result.failed})`
        )

        if (result.failed > 0 || (!result.success && result.updated === 0)) {
            process.exitCode = 1
        }
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(updateRoleExample)

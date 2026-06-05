import {
    cleanup,
    extractErrorMessage,
    formatAddRoleResult,
    login,
    logger,
    prompt,
    renderAddRoleAsciiTable,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type {
    AddRoleConfirm,
    AddRoleResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

function parseRoleNames(raw: string): string[] {
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

async function addRoleExample() {
    const vault = await login()

    try {
        const rolesRaw = (await prompt('Role name(s) to create (comma-separated): ')).trim()
        const roles = parseRoleNames(rolesRaw)
        if (roles.length === 0) {
            logger.error('At least one role name is required.')
            process.exitCode = 1
            return
        }

        const parentRaw = (await prompt('Parent node name or ID (Enter for enterprise root): ')).trim()
        const parent: string | null = parentRaw || null

        const newUserRaw = (await prompt('Assign to new users? [on/off, Enter to skip]: ')).trim().toLowerCase()
        const newUser = newUserRaw === 'on' ? 'on' : newUserRaw === 'off' ? 'off' : null

        const visibleBelowRaw = (await prompt('Visible below parent node? [on/off, Enter to skip]: ')).trim().toLowerCase()
        const visibleBelow = visibleBelowRaw === 'on' ? 'on' : visibleBelowRaw === 'off' ? 'off' : null

        const enforcementsRaw = (await prompt('Enforcements (KEY:VALUE, comma-separated, Enter to skip): ')).trim()
        const enforcements = enforcementsRaw
            ? enforcementsRaw.split(',').map((s) => s.trim()).filter(Boolean)
            : []

        const force = isYes(await prompt('Force-create on cross-node duplicates without prompting? [y/N]: '))

        const confirm: AddRoleConfirm = async ({ roleName, existingRoleId, existingNodeId, parentNodeName }) => {
            const ans = await prompt(
                `Role "${roleName}" already exists in node ${existingNodeId} (id=${existingRoleId}). ` +
                `Create another in "${parentNodeName}"? [y/N]: `
            )
            return isYes(ans)
        }

        const restore = suppressLogs()
        let result: AddRoleResult
        try {
            result = await vault.addRoles({
                roles,
                parent,
                newUser: newUser as 'on' | 'off' | null,
                visibleBelow: visibleBelow as 'on' | 'off' | null,
                enforcements,
                force,
                confirm: force ? undefined : confirm,
            })
        } finally {
            restore()
        }

        const table = formatAddRoleResult(result)
        logger.info('')
        logger.info(renderAddRoleAsciiTable(table))
        logger.info('')
        logger.info(
            `Result: ${result.success ? 'success' : 'partial/failed'} ` +
                `(created=${result.created}, skipped=${result.skipped}, failed=${result.failed})`
        )

        if (result.failed > 0 || (!result.success && result.created === 0)) {
            process.exitCode = 1
        }
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(addRoleExample)

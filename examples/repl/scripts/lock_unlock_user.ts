import type { KeeperVault } from '@keeper-security/keeper-sdk-javascript'
import {
    logger,
    extractErrorMessage,
    suppressLogs,
    formatUserActionResult,
    renderUserActionAsciiTable,
    UserAction,
} from '@keeper-security/keeper-sdk-javascript'

const ACTIONS: Record<string, UserAction> = {
    lock: UserAction.Lock,
    unlock: UserAction.Unlock,
}

function parseIdentifierList(raw: string): string[] {
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

export default async function lockUnlockUser(vault: KeeperVault, args: string[]): Promise<void> {
    const [actionArg, ...rest] = args
    const action = actionArg ? ACTIONS[actionArg.toLowerCase()] : undefined
    if (!action) {
        logger.warn('Usage: run scripts/lock_unlock_user.ts <lock|unlock> <email|id>[,<email|id>...] [@all]')
        logger.warn('(@all is only supported for unlock)')
        return
    }

    const emails = parseIdentifierList(rest.join(','))
    if (emails.length === 0) {
        logger.warn('At least one user email, ID, or @all is required.')
        return
    }

    try {
        const restore = suppressLogs()
        let result
        try {
            result = await vault.actionUsers({ emails, action })
        } finally {
            restore()
        }

        logger.info(renderUserActionAsciiTable(formatUserActionResult(result)))
        logger.info(
            `Result: ${result.success ? 'success' : 'partial/failed'} ` +
                `(succeeded=${result.succeeded}, skipped=${result.skipped}, failed=${result.failed})`
        )
    } catch (err) {
        logger.warn(`lock_unlock_user failed: ${extractErrorMessage(err)}`)
    }
}

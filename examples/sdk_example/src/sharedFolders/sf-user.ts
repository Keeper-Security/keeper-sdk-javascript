import { login, cleanup, logger, prompt, runShareFolderUsers, suppressLogs } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

function parseOnOff(s: string | null | undefined): boolean | null {
    if (s == null || s === '') return null
    const t = s.toLowerCase()
    if (t === 'on' || t === 'true' || t === '1' || t === 'y') return true
    if (t === 'off' || t === 'false' || t === '0' || t === 'n') return false
    return null
}

function splitTargets(line: string): string[] {
    return line
        .split(/[,;]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
}

async function sfUser() {
    const vault = await login()

    try {
        const folderInput = await prompt('Enter shared folder name or UID (comma-separated for several, * for all): ')
        if (!folderInput || !folderInput.trim()) {
            logger.info('No shared folder provided.')
            return
        }
        const sharedFolderRefs = splitTargets(folderInput)

        const actionLine = (await prompt('Action — grant or remove? [grant]: ')).trim().toLowerCase()
        const action: 'grant' | 'remove' =
            actionLine === 'remove' || actionLine === 'revoke' || actionLine === 'delete' ? 'remove' : 'grant'

        const userLine = await prompt(
            'User / team target: email, team name, * (default user perms for folder), or @existing (all current) — comma-separated: '
        )
        if (!userLine || !userLine.trim()) {
            logger.info('No user targets provided.')
            return
        }
        const userTargets = splitTargets(userLine)

        const pLine = await prompt('Manage records permission — on, off, or empty to leave unset [press Enter to skip]: ')
        const oLine = await prompt('Manage users permission — on, off, or empty to leave unset [press Enter to skip]: ')
        const manageRecords = parseOnOff(pLine)
        const manageUsers = parseOnOff(oLine)

        logger.info('Updating shared folder users...')
        let result
        {
            const restore = suppressLogs()
            try {
                result = await vault.shareFolderUsers({
                    sharedFolderRefs,
                    action,
                    userTargets,
                    manageRecords,
                    manageUsers,
                })
            } finally {
                restore()
            }
        }

        const { ok, message } = runShareFolderUsers(result)
        if (ok) {
            logger.info(message)
        } else {
            logger.error(message)
        }
    } finally {
        cleanup(vault)
    }
}

runExample(sfUser)

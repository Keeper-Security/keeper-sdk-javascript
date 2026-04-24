import { login, cleanup, logger, prompt, runShareFolderRecords, suppressLogs } from '@keeper-security/keeper-sdk-javascript'
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

async function sfRecord() {
    const vault = await login()

    try {
        const folderInput = await prompt('Enter shared folder name or UID (comma-separated for several, * for all): ')
        if (!folderInput || !folderInput.trim()) {
            logger.info('No shared folder provided.')
            return
        }
        const sharedFolderRefs = splitTargets(folderInput)

        const actionLine = (await prompt('Action — grant (set perms) or remove (unlink record)? [grant]: '))
            .trim()
            .toLowerCase()
        const action: 'grant' | 'remove' =
            actionLine === 'remove' || actionLine === 'revoke' || actionLine === 'delete' ? 'remove' : 'grant'

        const recordLine = await prompt(
            'Record: title or UID, * (folder default record perms), or @existing (all records in folder) — comma-separated: '
        )
        if (!recordLine || !recordLine.trim()) {
            logger.info('No record targets provided.')
            return
        }
        const recordTargets = splitTargets(recordLine)

        const sLine = await prompt('Can re-share (can_share) — on, off, or empty to skip [press Enter to skip]: ')
        const dLine = await prompt('Can edit (can_edit) — on, off, or empty to skip [press Enter to skip]: ')
        const canShare = parseOnOff(sLine)
        const canEdit = parseOnOff(dLine)

        logger.info('Updating shared folder record permissions...')
        let result
        {
            const restore = suppressLogs()
            try {
                result = await vault.shareFolderRecords({
                    sharedFolderRefs,
                    action,
                    recordTargets,
                    canShare,
                    canEdit,
                })
            } finally {
                restore()
            }
        }

        const { ok, message } = runShareFolderRecords(result)
        if (ok) {
            logger.info(message)
        } else {
            logger.error(message)
        }
    } finally {
        cleanup(vault)
    }
}

runExample(sfRecord)

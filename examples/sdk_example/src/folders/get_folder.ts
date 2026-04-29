import { login, cleanup, logger, prompt, extractErrorMessage } from '@keeper-security/keeper-sdk-javascript'
import type { GetFolderResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

const LABEL_WIDTH = 22

function row(label: string, value: string | number | boolean): void {
    logger.info(`${label.padEnd(LABEL_WIDTH)} ${value}`)
}

function printFolder(result: GetFolderResult): void {
    if (result.objectType === 'folder') {
        row('Folder UID:', result.folder_uid)
        row('Folder Type:', result.folder_type)
        row('Name:', result.name)
        row('Parent Folder UID:', result.parent_uid ?? '(root)')
        if (result.shared_folder_scope_uid) {
            row('Shared Folder UID:', result.shared_folder_scope_uid)
        }
        return
    }

    row('Shared Folder UID:', result.shared_folder_uid)
    row('Name:', result.name)
    row('Default Can Edit:', result.default_can_edit)
    row('Default Can Share:', result.default_can_share)
    row('Default Manage Records:', result.default_manage_records)
    row('Default Manage Users:', result.default_manage_users)
    if (result.record_permissions?.length) {
        logger.info('Record permissions:')
        for (const r of result.record_permissions) {
            logger.info(`  ${r.record_uid}  edit=${r.can_edit} share=${r.can_share} owner=${r.owner}`)
        }
    }
    if (result.user_permissions?.length) {
        logger.info('User permissions:')
        for (const u of result.user_permissions) {
            logger.info(
                `  ${u.account_username ?? '?'}  manage_records=${u.manage_records} manage_users=${u.manage_users}`
            )
        }
    }
}

async function getCommand() {
    const vault = await login()

    try {
        const target = (await prompt('Folder name or UID: ')).trim()
        if (!target) {
            logger.info('No folder name or UID given.')
            return
        }

        const asJson = isYes(await prompt('Output as JSON? [y/N]: '))

        try {
            const result = await vault.getFolder(target, {
                format: asJson ? 'json' : 'detail',
            })
            logger.info('')
            if (asJson) {
                logger.info(JSON.stringify(result.json ?? result, null, 2))
            } else {
                printFolder(result)
            }
            logger.info('')
        } catch (err) {
            logger.error(`Folder lookup failed for "${target}": ${extractErrorMessage(err)}`)
            process.exitCode = 1
        }
    } finally {
        cleanup(vault)
    }
}

runExample(getCommand)

import { login, cleanup, logger, prompt, extractErrorMessage } from '@keeper-security/keeper-sdk-javascript'
import type { GetKeeperObjectResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

function padLabel(label: string, width: number): string {
    return label.length >= width ? label : label + ' '.repeat(width - label.length)
}

function isYes(answer: string): boolean {
    const a = answer.trim().toLowerCase()
    return a === 'y' || a === 'yes'
}

function printFolder(result: GetKeeperObjectResult): void {
    if (result.objectType === 'folder') {
        logger.info(`${padLabel('Folder UID:', 22)} ${result.folder_uid}`)
        logger.info(`${padLabel('Folder Type:', 22)} ${result.folder_type}`)
        logger.info(`${padLabel('Name:', 22)} ${result.name}`)
        logger.info(`${padLabel('Parent Folder UID:', 22)} ${result.parent_uid ?? '(root)'}`)
        if (result.shared_folder_scope_uid) {
            logger.info(`${padLabel('Shared Folder UID:', 22)} ${result.shared_folder_scope_uid}`)
        }
        return
    }

    if (result.objectType === 'shared_folder') {
        logger.info(`${padLabel('Shared Folder UID:', 22)} ${result.shared_folder_uid}`)
        logger.info(`${padLabel('Name:', 22)} ${result.name}`)
        logger.info(`${padLabel('Default Can Edit:', 22)} ${result.default_can_edit}`)
        logger.info(`${padLabel('Default Can Share:', 22)} ${result.default_can_share}`)
        logger.info(`${padLabel('Default Manage Records:', 22)} ${result.default_manage_records}`)
        logger.info(`${padLabel('Default Manage Users:', 22)} ${result.default_manage_users}`)
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
        return
    }

    logger.error(`Unexpected object type "${result.objectType}". Only folders and shared folders are supported.`)
    process.exitCode = 1
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
            const result = await vault.getKeeperObject(target, {
                type: 'folder',
                format: asJson ? 'json' : 'detail',
            })
            if (asJson) {
                logger.info(JSON.stringify(result.json ?? result, null, 2))
            } else {
                printFolder(result)
            }
        } catch (err) {
            logger.error(
                `Folder lookup failed for "${target}": ${extractErrorMessage(err)}`
            )
            logger.info('Tip: only folders and shared folders are supported here. Records and teams are not allowed.')
            process.exitCode = 1
        }
    } finally {
        cleanup(vault)
    }
}

runExample(getCommand)

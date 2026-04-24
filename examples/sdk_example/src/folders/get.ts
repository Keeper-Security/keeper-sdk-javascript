import { login, cleanup, logger, prompt } from '@keeper-security/keeper-sdk-javascript'
import type { GetKeeperObjectResult, GetKeeperObjectFormat, GetKeeperObjectForceType } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

function parseArgs(argv: string[]): {
    unmask: boolean
    format: GetKeeperObjectFormat
    forceType: GetKeeperObjectForceType | null
    target: string
} {
    let unmask = false
    let format: GetKeeperObjectFormat = 'detail'
    let forceType: GetKeeperObjectForceType | null = null
    const positionals: string[] = []

    for (const a of argv) {
        if (a === '--unmask') {
            unmask = true
        } else if (a === '-f' || a === '--folder') {
            forceType = 'folder'
        } else if (a === '-t' || a === '--team') {
            forceType = 'team'
        } else if (a === '-r' || a === '--record') {
            forceType = 'record'
        } else if (a.startsWith('--format=')) {
            const v = a.slice('--format='.length) as GetKeeperObjectFormat
            format = v
        } else if (a.startsWith('-')) {
            logger.warn(`Unknown option: ${a}`)
        } else {
            positionals.push(a)
        }
    }

    return {
        unmask,
        format,
        forceType,
        target: positionals.join(' ').trim(),
    }
}

function padLabel(label: string, width: number): string {
    return label.length >= width ? label : label + ' '.repeat(width - label.length)
}

function printResult(result: GetKeeperObjectResult): void {
    if (result.objectType === 'record') {
        if (result.format === 'password') {
            logger.info(result.password ?? '')
            return
        }
        if (result.format === 'fields' && result.fields) {
            for (const row of result.fields) {
                logger.info(`${padLabel(row.name + ':', 22)} ${row.value}`)
            }
            return
        }
        if (result.format === 'json' && result.json) {
            logger.info(JSON.stringify(result.json, null, 2))
            return
        }

        logger.info(`${padLabel('UID:', 22)} ${result.uid}`)
        logger.info(`${padLabel('Type:', 22)} ${result.recordType}`)
        logger.info(`${padLabel('Title:', 22)} ${result.title}`)
        logger.info(`${padLabel('Version:', 22)} ${result.version}`)
        logger.info(`${padLabel('Revision:', 22)} ${result.revision}`)
        logger.info(`${padLabel('Shared:', 22)} ${result.shared}`)

        const d = result.detail
        if (d?.legacy) {
            if (d.legacy.login) logger.info(`${padLabel('Login:', 22)} ${d.legacy.login}`)
            if (d.legacy.password !== undefined) logger.info(`${padLabel('Password:', 22)} ${d.legacy.password}`)
            if (d.legacy.url) logger.info(`${padLabel('URL:', 22)} ${d.legacy.url}`)
            if (d.legacy.notes) logger.info(`${padLabel('Notes:', 22)} ${d.legacy.notes}`)
            if (d.legacy.custom?.length) {
                logger.info('Custom:')
                for (const c of d.legacy.custom) {
                    logger.info(`  ${c.name || c.type}: ${c.value}`)
                }
            }
        }
        if (d?.typed) {
            for (const f of d.typed.fields) {
                logger.info(`${padLabel((f.label || f.type) + ':', 22)} ${f.value}`)
            }
            if (d.typed.notes) logger.info(`${padLabel('Notes:', 22)} ${d.typed.notes}`)
        }
        if (d?.permissions) {
            logger.info('User Permissions:')
            logger.info(`  Owner: ${d.permissions.owner}`)
            logger.info(`  Can Share: ${d.permissions.canShare}`)
            logger.info(`  Can Edit: ${d.permissions.canEdit}`)
        }
        return
    }

    if (result.format === 'json' && result.json) {
        logger.info(JSON.stringify(result.json, null, 2))
        return
    }

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

    if (result.objectType === 'team') {
        logger.info(`${padLabel('Team UID:', 22)} ${result.team_uid}`)
        logger.info(`${padLabel('Name:', 22)} ${result.name}`)
        logger.info(`${padLabel('Restrict Edit:', 22)} ${result.restrict_edit}`)
        logger.info(`${padLabel('Restrict View:', 22)} ${result.restrict_view}`)
        logger.info(`${padLabel('Restrict Share:', 22)} ${result.restrict_share}`)
    }
}

async function getCommand() {
    const cli = parseArgs(process.argv.slice(2))
    const vault = await login()

    try {
        const target =
            cli.target ||
            (await prompt('UID or title (record, folder, shared folder, team): ')).trim()

        if (!target) {
            logger.info('Nothing to look up.')
            return
        }

        const result = await vault.getKeeperObject(target, {
            type: cli.forceType ?? undefined,
            format: cli.format,
            unmask: cli.unmask,
        })
        printResult(result)
    } finally {
        cleanup(vault)
    }
}

runExample(getCommand)

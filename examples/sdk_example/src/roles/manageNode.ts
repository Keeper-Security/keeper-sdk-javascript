import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type {
    ManageRoleNodesAction,
    ManageRoleNodesResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { splitCommaSeparated } from '../utils/format'

enum ManageNodeMenuChoice {
    Add = '1',
    Update = '2',
    Remove = '3',
}

const ACTION_BY_CHOICE: Record<ManageNodeMenuChoice, ManageRoleNodesAction> = {
    [ManageNodeMenuChoice.Add]: 'add',
    [ManageNodeMenuChoice.Update]: 'update',
    [ManageNodeMenuChoice.Remove]: 'remove',
}

function parseCascade(raw: string): 'on' | 'off' | null | undefined {
    const value = raw.trim().toLowerCase()
    if (value === '' || value === 'skip') return undefined
    if (value === 'on') return 'on'
    if (value === 'off') return 'off'
    return null
}

async function manageNodeExample() {
    const vault = await login()

    try {
        logger.info('')
        logger.info('Select an action:')
        logger.info(`  ${ManageNodeMenuChoice.Add}) Add role(s) as manager of node(s)`)
        logger.info(`  ${ManageNodeMenuChoice.Update}) Update cascade setting for existing role/node link(s)`)
        logger.info(`  ${ManageNodeMenuChoice.Remove}) Remove role(s) as manager of node(s)`)
        logger.info('')

        const choice = (
            await prompt(`Action [${ManageNodeMenuChoice.Add}-${ManageNodeMenuChoice.Remove}]: `)
        ).trim() as ManageNodeMenuChoice
        const action = ACTION_BY_CHOICE[choice]
        if (!action) {
            logger.error('Invalid choice.')
            process.exitCode = 1
            return
        }

        const rolesRaw = (await prompt('Role name(s) or ID(s) (comma-separated): ')).trim()
        const roles = splitCommaSeparated(rolesRaw)
        if (roles.length === 0) {
            logger.error('At least one role name or ID is required.')
            process.exitCode = 1
            return
        }

        const nodesRaw = (await prompt('Node name(s) or ID(s) (comma-separated): ')).trim()
        const nodes = splitCommaSeparated(nodesRaw)
        if (nodes.length === 0) {
            logger.error('At least one node name or ID is required.')
            process.exitCode = 1
            return
        }

        let cascade: 'on' | 'off' | null | undefined
        if (action !== 'remove') {
            cascade = parseCascade(
                await prompt('Cascade node management to sub-nodes? [on/off, Enter to skip]: ')
            )
            if (cascade === null) {
                logger.error('Invalid cascade value. Use on, off, or leave blank.')
                process.exitCode = 1
                return
            }
        }

        const restore = suppressLogs()
        let result: ManageRoleNodesResult
        try {
            result = await vault.manageRoleNodes({ roles, nodes, action, cascade })
        } finally {
            restore()
        }

        const table = vault.formatManageRoleNodesResult(result)
        logger.info('')
        logger.info(vault.renderManageRoleNodesAsciiTable(table))
        logger.info('')
        logger.info(
            `Result: ${result.success ? 'success' : 'partial/failed'} ` +
                `(succeeded=${result.succeeded}, skipped=${result.skipped}, failed=${result.failed})`
        )

        if (result.failed > 0 || (!result.success && result.succeeded === 0)) {
            process.exitCode = 1
        }
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(manageNodeExample)

import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { RoleUserResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { splitCommaSeparated } from '../utils/format'

type VaultHandle = Awaited<ReturnType<typeof login>>

enum RoleUserMenuChoice {
    Add = '1',
    Remove = '2',
}

type OperationInput = { kind: RoleUserMenuChoice; roles: string[]; users: string[] }

function failWith(message: string): null {
    logger.error(message)
    process.exitCode = 1
    return null
}

async function promptList(label: string, message: string): Promise<string[] | null> {
    const items = splitCommaSeparated((await prompt(message)).trim())
    if (items.length === 0) return failWith(`At least one ${label} is required.`)
    return items
}

async function gatherOperationInput(): Promise<OperationInput | null> {
    logger.info('')
    logger.info('Select an operation:')
    logger.info(`  ${RoleUserMenuChoice.Add}) Add users to role(s)`)
    logger.info(`  ${RoleUserMenuChoice.Remove}) Remove users from role(s)`)
    logger.info('')

    const choice = (await prompt(`Operation [${RoleUserMenuChoice.Add}-${RoleUserMenuChoice.Remove}]: `)).trim()
    if (choice !== RoleUserMenuChoice.Add && choice !== RoleUserMenuChoice.Remove) {
        return failWith(`Invalid choice. Please enter ${RoleUserMenuChoice.Add} or ${RoleUserMenuChoice.Remove}.`)
    }

    const roles = await promptList('role name or ID', 'Role name(s) or ID(s) (comma-separated): ')
    if (!roles) return null

    const users = await promptList('user email or ID', 'User email(s) or ID(s) (comma-separated): ')
    if (!users) return null

    return { kind: choice, roles, users }
}

async function executeOperation(vault: VaultHandle, input: OperationInput): Promise<RoleUserResult> {
    const restore = suppressLogs()
    try {
        switch (input.kind) {
            case RoleUserMenuChoice.Add:
                return await vault.addUsersToRoles({ roles: input.roles, users: input.users })
            case RoleUserMenuChoice.Remove:
                return await vault.removeUsersFromRoles({ roles: input.roles, users: input.users })
        }
    } finally {
        restore()
    }
}

function reportResult(vault: VaultHandle, result: RoleUserResult): void {
    const table = vault.formatRoleUserResult(result)
    logger.info('')
    logger.info(vault.renderRoleUserAsciiTable(table))
    logger.info('')
    logger.info(
        `Result: ${result.success ? 'success' : 'partial/failed'} ` +
            `(succeeded=${result.succeeded}, skipped=${result.skipped}, failed=${result.failed})`
    )

    if (result.failed > 0 || (!result.success && result.succeeded === 0)) {
        process.exitCode = 1
    }
}

async function roleUsersExample() {
    const vault = await login()
    try {
        const input = await gatherOperationInput()
        if (!input) return

        const result = await executeOperation(vault, input)
        reportResult(vault, result)
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(roleUsersExample)

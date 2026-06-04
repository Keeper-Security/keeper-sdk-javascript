import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    renderTeamUserAsciiTable,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { TeamUserResult } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'

type VaultHandle = Awaited<ReturnType<typeof login>>

enum TeamUserMenuChoice {
    Add = '1',
    Remove = '2',
}

enum TeamUserOperation {
    Add = 'add',
    Remove = 'remove',
}

type AddInput = {
    kind: TeamUserOperation.Add
    users: string[]
    teams: string[]
    hideSharedFolders: boolean | undefined
}
type RemoveInput = { kind: TeamUserOperation.Remove; users: string[]; teams: string[] }
type OperationInput = AddInput | RemoveInput

const MAX_LIST_ITEMS = 100

function parseList(raw: string): string[] {
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

function parseHideSharedFolders(raw: string): boolean | undefined | null {
    const value = raw.trim().toLowerCase()
    if (value === '' || value === 'skip') return undefined
    if (value === 'on') return true
    if (value === 'off') return false
    return null
}

function formatRunStatus(result: TeamUserResult): string {
    if (result.failed > 0 && result.succeeded === 0) return 'failed'
    if (result.failed > 0) return 'partial'
    return result.success ? 'success' : 'failed'
}

function failWith(message: string): null {
    logger.error(message)
    process.exitCode = 1
    return null
}

async function promptList(label: string, message: string): Promise<string[] | null> {
    const items = parseList((await prompt(message)).trim())
    if (items.length === 0) return failWith(`At least one ${label} is required.`)
    if (items.length > MAX_LIST_ITEMS) {
        return failWith(`At most ${MAX_LIST_ITEMS} ${label}s are allowed per operation.`)
    }
    return items
}

async function gatherOperationInput(): Promise<OperationInput | null> {
    logger.info('')
    logger.info('Select an operation:')
    logger.info(`  ${TeamUserMenuChoice.Add}) Add users to team(s)`)
    logger.info(`  ${TeamUserMenuChoice.Remove}) Remove users from team(s)`)
    logger.info('')

    const choice = (await prompt(`Operation [${TeamUserMenuChoice.Add}-${TeamUserMenuChoice.Remove}]: `)).trim()
    if (choice !== TeamUserMenuChoice.Add && choice !== TeamUserMenuChoice.Remove) {
        return failWith(`Invalid choice. Please enter ${TeamUserMenuChoice.Add} or ${TeamUserMenuChoice.Remove}.`)
    }

    const users = await promptList('user email or ID', 'User email(s) or ID(s) (comma-separated): ')
    if (!users) return null

    const teams = await promptList('team name or UID', 'Team name(s) or UID(s) (comma-separated): ')
    if (!teams) return null

    if (choice === TeamUserMenuChoice.Add) {
        const hideSharedFolders = parseHideSharedFolders(
            await prompt('Hide shared folders? [on/off/skip]: ')
        )
        if (hideSharedFolders === null) {
            return failWith('Invalid hide shared folders value. Use on, off, or skip.')
        }
        return { kind: TeamUserOperation.Add, users, teams, hideSharedFolders }
    }
    return { kind: TeamUserOperation.Remove, users, teams }
}

async function executeOperation(vault: VaultHandle, input: OperationInput): Promise<TeamUserResult> {
    const restore = suppressLogs()
    try {
        switch (input.kind) {
            case TeamUserOperation.Add:
                return await vault.addUsersToTeams({
                    users: input.users,
                    teams: input.teams,
                    hideSharedFolders: input.hideSharedFolders,
                })
            case TeamUserOperation.Remove:
                return await vault.removeUsersFromTeams({ users: input.users, teams: input.teams })
        }
    } finally {
        restore()
    }
}

function reportResult(vault: VaultHandle, result: TeamUserResult): void {
    const table = vault.formatTeamUserResult(result)
    logger.info('')
    logger.info(renderTeamUserAsciiTable(table))
    logger.info('')
    logger.info(
        `Result: ${formatRunStatus(result)} ` +
            `(succeeded=${result.succeeded}, skipped=${result.skipped}, failed=${result.failed})`
    )

    if (result.failed > 0 || (!result.success && result.succeeded === 0)) {
        process.exitCode = 1
    }
}

async function teamUserExample() {
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

runExample(teamUserExample)

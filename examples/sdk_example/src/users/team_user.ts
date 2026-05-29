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

const OP_ADD = '1'
const OP_REMOVE = '2'

const OPERATION_PROMPT = [
    '',
    'Select an operation:',
    `  ${OP_ADD}) Add users to team(s)`,
    `  ${OP_REMOVE}) Remove users from team(s)`,
    '',
].join('\n')

const USERS_PROMPT = 'User email(s) or ID(s) (comma-separated): '
const TEAMS_PROMPT = 'Team name(s) or UID(s) (comma-separated): '
const HIDE_SHARED_FOLDERS_PROMPT = 'Hide shared folders? [on/off/skip]: '
const OPERATION_INPUT_PROMPT = `Operation [${OP_ADD}-${OP_REMOVE}]: `

type AddInput = { kind: 'add'; users: string[]; teams: string[]; hideSharedFolders: boolean | undefined }
type RemoveInput = { kind: 'remove'; users: string[]; teams: string[] }
type OperationInput = AddInput | RemoveInput

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

function parseHideSharedFolders(raw: string): boolean | undefined {
    const value = raw.trim().toLowerCase()
    if (value === 'on') return true
    if (value === 'off') return false
    return undefined
}

function failWith(message: string): null {
    logger.error(message)
    process.exitCode = 1
    return null
}

async function promptList(label: string, prompt_: string): Promise<string[] | null> {
    const items = parseList((await prompt(prompt_)).trim())
    if (items.length === 0) return failWith(`At least one ${label} is required.`)
    return items
}

async function gatherOperationInput(): Promise<OperationInput | null> {
    logger.info(OPERATION_PROMPT)

    const choice = (await prompt(OPERATION_INPUT_PROMPT)).trim()
    if (choice !== OP_ADD && choice !== OP_REMOVE) {
        return failWith(`Invalid choice. Please enter ${OP_ADD} or ${OP_REMOVE}.`)
    }

    const users = await promptList('user email or ID', USERS_PROMPT)
    if (!users) return null

    const teams = await promptList('team name or UID', TEAMS_PROMPT)
    if (!teams) return null

    if (choice === OP_ADD) {
        const hideSharedFolders = parseHideSharedFolders(await prompt(HIDE_SHARED_FOLDERS_PROMPT))
        return { kind: 'add', users, teams, hideSharedFolders }
    }
    return { kind: 'remove', users, teams }
}

async function executeOperation(vault: VaultHandle, input: OperationInput): Promise<TeamUserResult> {
    const restore = suppressLogs()
    try {
        return input.kind === 'add'
            ? await vault.addUsersToTeams({
                  users: input.users,
                  teams: input.teams,
                  hideSharedFolders: input.hideSharedFolders,
              })
            : await vault.removeUsersFromTeams({ users: input.users, teams: input.teams })
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
        `Result: ${result.success ? 'success' : 'partial/failed'} ` +
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

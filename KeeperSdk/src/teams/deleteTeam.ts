import type { Auth, KeeperResponse, RestCommand } from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseTeamRecord,
} from './enterpriseData'

const TEAM_DELETE_COMMAND = 'team_delete'
const DELETE_TEAM_INCLUDES: EnterpriseDataInclude[] = [EnterpriseDataInclude.Teams]

export enum DeleteTeamStatus {
    Deleted = 'deleted',
    Failed = 'failed',
}

export type DeleteTeamInput = {
    teams: string[]
}

export type DeleteTeamItemResult = {
    teamUid: string
    teamName: string
    nodeId: number
    status: DeleteTeamStatus
    message?: string
}

export type DeleteTeamResult = {
    success: boolean
    items: DeleteTeamItemResult[]
    deleted: number
    failed: number
}

type TeamDeleteRequestPayload = {
    team_uid: string
}

export async function deleteTeams(auth: Auth, input: DeleteTeamInput): Promise<DeleteTeamResult> {
    const requestedIdentifiers = (input.teams || [])
        .map((value) => (typeof value === 'string' ? value.trim() : ''))
        .filter((value) => value.length > 0)

    if (requestedIdentifiers.length === 0) {
        throw new KeeperSdkError('No teams to delete.', ResultCodes.NO_TEAMS_TO_DELETE)
    }

    const enterpriseData = new EnterpriseDataManager(auth)
    const response = await enterpriseData.getData(DELETE_TEAM_INCLUDES)
    const allTeams = response.teams || []
    const resolvedTeams = resolveExistingTeams(allTeams, requestedIdentifiers)

    const items: DeleteTeamItemResult[] = []
    for (const team of resolvedTeams) {
        try {
            await sendTeamDelete(auth, team.team_uid)
            items.push({
                teamUid: team.team_uid,
                teamName: team.name || '',
                nodeId: team.node_id,
                status: DeleteTeamStatus.Deleted,
            })
        } catch (err) {
            items.push({
                teamUid: team.team_uid,
                teamName: team.name || '',
                nodeId: team.node_id,
                status: DeleteTeamStatus.Failed,
                message: extractErrorMessage(err),
            })
        }
    }

    return finalizeResult(items)
}

function resolveExistingTeams(
    teams: EnterpriseTeamRecord[],
    identifiers: string[]
): EnterpriseTeamRecord[] {
    const byUid = new Map<string, EnterpriseTeamRecord>()
    const byLowerName = new Map<string, EnterpriseTeamRecord[]>()
    for (const team of teams) {
        if (team.team_uid) byUid.set(team.team_uid, team)
        const key = (team.name || '').trim().toLowerCase()
        if (!key) continue
        const existing = byLowerName.get(key)
        if (existing) existing.push(team)
        else byLowerName.set(key, [team])
    }

    const found = new Map<string, EnterpriseTeamRecord>()
    const missing: string[] = []
    for (const identifier of identifiers) {
        const uidMatch = byUid.get(identifier)
        if (uidMatch) {
            found.set(uidMatch.team_uid, uidMatch)
            continue
        }
        const nameMatches = byLowerName.get(identifier.toLowerCase())
        if (!nameMatches || nameMatches.length === 0) {
            missing.push(identifier)
            continue
        }
        if (nameMatches.length > 1) {
            throw new KeeperSdkError(
                `Team name "${identifier}" is not unique. Use Team UID.`,
                ResultCodes.MULTIPLE_TEAM_MATCHES
            )
        }
        found.set(nameMatches[0].team_uid, nameMatches[0])
    }

    if (missing.length > 0) {
        throw new KeeperSdkError(
            `Team name(s) "${missing.join(', ')}" could not be resolved.`,
            ResultCodes.TEAM_NOT_FOUND
        )
    }
    return Array.from(found.values())
}

async function sendTeamDelete(auth: Auth, teamUid: string): Promise<void> {
    const command: RestCommand<TeamDeleteRequestPayload, KeeperResponse> = {
        baseRequest: { command: TEAM_DELETE_COMMAND },
        request: { team_uid: teamUid },
        authorization: {},
    }
    const response = await auth.executeRestCommand(command)
    const result = (response.result || '').toLowerCase()
    if (result && result !== 'success') {
        throw new KeeperSdkError(
            response.message ||
                response.result_code ||
                `team_delete failed for team_uid=${teamUid}`,
            response.result_code || ResultCodes.TEAM_DELETE_FAILED
        )
    }
}

function finalizeResult(items: DeleteTeamItemResult[]): DeleteTeamResult {
    const deleted = items.filter((item) => item.status === DeleteTeamStatus.Deleted).length
    const failed = items.filter((item) => item.status === DeleteTeamStatus.Failed).length
    return {
        success: failed === 0 && deleted > 0,
        items,
        deleted,
        failed,
    }
}

export type FormattedDeleteTeamRow = {
    status: string
    teamName: string
    teamUid: string
    nodeId: number
    detail: string
}

export type FormattedDeleteTeamTable = {
    headers: string[]
    rows: string[][]
    summary: string
}

const DELETE_TEAM_HEADERS = ['#', 'Status', 'Team Name', 'Team UID', 'Node ID', 'Detail']

export function formatDeleteTeamResult(result: DeleteTeamResult): FormattedDeleteTeamTable {
    const rows = result.items.map((item, index) => [
        String(index + 1),
        item.status,
        item.teamName,
        item.teamUid,
        String(item.nodeId),
        item.message || '',
    ])

    return {
        headers: [...DELETE_TEAM_HEADERS],
        rows,
        summary: `Deleted: ${result.deleted}  Failed: ${result.failed}`,
    }
}

export function renderDeleteTeamAsciiTable(table: FormattedDeleteTeamTable): string {
    const { headers, rows } = table
    const widths = headers.map((header, index) =>
        Math.max(header.length, ...rows.map((row) => (row[index] || '').length))
    )
    const padCell = (cell: string, columnIndex: number): string =>
        cell + ' '.repeat(Math.max(0, widths[columnIndex] - cell.length))
    const formatRow = (cells: string[]): string =>
        cells.map((cell, columnIndex) => padCell(cell, columnIndex)).join('  ')

    const lines: string[] = []
    lines.push(formatRow(headers))
    lines.push(formatRow(widths.map((width) => '-'.repeat(width))))
    for (const row of rows) lines.push(formatRow(row))
    lines.push(table.summary)
    return lines.join('\n')
}

import type { Auth, KeeperResponse, RestCommand } from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
} from './enterpriseData'
import { TeamRestriction, type TeamRestrictionInput } from './addTeam'
import {
    applyDecryptedNodeNames,
    applyEnterpriseNameToRoot,
    parentNeedsNameLookup,
    resolveExistingTeams,
    resolveParentNode,
    TEAM_TABLE_HEADERS,
    validateTeamName,
} from './teamUtils'

const TEAM_UPDATE_COMMAND = 'team_update'
const UPDATE_TEAM_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Nodes,
    EnterpriseDataInclude.Teams,
]

export enum UpdateTeamStatus {
    Updated = 'updated',
    Failed = 'failed',
}

export type UpdateTeamInput = {
    teams: string[]
    name?: string
    parent?: string | number | null
    restrictEdit?: TeamRestrictionInput
    restrictShare?: TeamRestrictionInput
    restrictView?: TeamRestrictionInput
}

export type UpdateTeamItemResult = {
    teamUid: string
    teamName: string
    nodeId: number
    status: UpdateTeamStatus
    message?: string
}

export type UpdateTeamResult = {
    success: boolean
    items: UpdateTeamItemResult[]
    updated: number
    failed: number
}

type TeamUpdateRequestPayload = {
    team_uid: string
    team_name: string
    node_id: number
    restrict_edit: boolean
    restrict_share: boolean
    restrict_view: boolean
}

export async function updateTeams(auth: Auth, input: UpdateTeamInput): Promise<UpdateTeamResult> {
    const requestedIdentifiers = (input.teams || [])
        .map((value) => (typeof value === 'string' ? value.trim() : ''))
        .filter((value) => value.length > 0)

    if (requestedIdentifiers.length === 0) {
        throw new KeeperSdkError('No teams to update.', ResultCodes.NO_TEAMS_TO_UPDATE)
    }

    const newName = input.name?.trim() ? input.name.trim() : undefined
    if (newName) validateTeamName(newName)
    if (newName && requestedIdentifiers.length > 1) {
        throw new KeeperSdkError(
            'Cannot rename more than one team in a single update.',
            ResultCodes.MULTIPLE_TEAM_RENAME_NOT_ALLOWED
        )
    }

    const restrictEditOverride = resolveOptionalRestriction(input.restrictEdit)
    const restrictShareOverride = resolveOptionalRestriction(input.restrictShare)
    const restrictViewOverride = resolveOptionalRestriction(input.restrictView)

    const parentIdentifier = input.parent
    const needsNameLookup = parentNeedsNameLookup(parentIdentifier)

    const enterpriseData = new EnterpriseDataManager(auth)
    const response = await enterpriseData.getData(UPDATE_TEAM_INCLUDES)
    const nodes = response.nodes || []
    applyEnterpriseNameToRoot(nodes, response.enterprise_name)

    if (needsNameLookup) {
        const displayNames = await enterpriseData.getDisplayNames()
        applyDecryptedNodeNames(nodes, displayNames.nodes)
        await enterpriseData.decryptNodeNames(nodes)
    }

    const allTeams = response.teams || []
    const resolvedTeams = resolveExistingTeams(allTeams, requestedIdentifiers)

    let overrideNodeId: number | null = null
    if (parentIdentifier !== undefined && parentIdentifier !== null && parentIdentifier !== '') {
        try {
            overrideNodeId = resolveParentNode(nodes, parentIdentifier).node_id
        } catch (err) {
            throw new KeeperSdkError(
                extractErrorMessage(err),
                ResultCodes.PARENT_NODE_NOT_FOUND
            )
        }
    }

    const items: UpdateTeamItemResult[] = []
    for (const team of resolvedTeams) {
        const targetNodeId = overrideNodeId ?? team.node_id
        const payload: TeamUpdateRequestPayload = {
            team_uid: team.team_uid,
            team_name: newName || team.name || '',
            node_id: targetNodeId,
            restrict_edit: restrictEditOverride ?? team.restrict_edit === true,
            restrict_share: restrictShareOverride ?? (team.restrict_share === true || team.restrict_sharing === true),
            restrict_view: restrictViewOverride ?? team.restrict_view === true,
        }

        try {
            await sendTeamUpdate(auth, payload)
            items.push({
                teamUid: team.team_uid,
                teamName: payload.team_name,
                nodeId: targetNodeId,
                status: UpdateTeamStatus.Updated,
            })
        } catch (err) {
            items.push({
                teamUid: team.team_uid,
                teamName: team.name || '',
                nodeId: team.node_id,
                status: UpdateTeamStatus.Failed,
                message: extractErrorMessage(err),
            })
        }
    }

    return finalizeResult(items)
}

function resolveOptionalRestriction(input: TeamRestrictionInput): boolean | undefined {
    if (input === undefined || input === null) return undefined
    const lower = String(input).toLowerCase()
    if (lower === TeamRestriction.On) return true
    if (lower === TeamRestriction.Off) return false
    return undefined
}

async function sendTeamUpdate(auth: Auth, payload: TeamUpdateRequestPayload): Promise<void> {
    const command: RestCommand<TeamUpdateRequestPayload, KeeperResponse> = {
        baseRequest: { command: TEAM_UPDATE_COMMAND },
        request: payload,
        authorization: {},
    }
    const response = await auth.executeRestCommand(command)
    const result = (response.result || '').toLowerCase()
    if (result && result !== 'success') {
        throw new KeeperSdkError(
            response.message ||
                response.result_code ||
                `team_update failed for team_uid=${payload.team_uid}`,
            response.result_code || ResultCodes.TEAM_UPDATE_FAILED
        )
    }
}

function finalizeResult(items: UpdateTeamItemResult[]): UpdateTeamResult {
    const updated = items.filter((item) => item.status === UpdateTeamStatus.Updated).length
    const failed = items.filter((item) => item.status === UpdateTeamStatus.Failed).length
    return {
        success: failed === 0 && updated > 0,
        items,
        updated,
        failed,
    }
}

export type FormattedUpdateTeamRow = {
    status: string
    teamName: string
    teamUid: string
    nodeId: number
    detail: string
}

export type FormattedUpdateTeamTable = {
    headers: string[]
    rows: string[][]
    summary: string
}

export function formatUpdateTeamResult(result: UpdateTeamResult): FormattedUpdateTeamTable {
    const rows = result.items.map((item, index) => [
        String(index + 1),
        item.status,
        item.teamName,
        item.teamUid,
        String(item.nodeId),
        item.message || '',
    ])

    return {
        headers: [...TEAM_TABLE_HEADERS],
        rows,
        summary: `Updated: ${result.updated}  Failed: ${result.failed}`,
    }
}

export function renderUpdateTeamAsciiTable(table: FormattedUpdateTeamTable): string {
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

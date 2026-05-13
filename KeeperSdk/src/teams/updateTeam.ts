import type { Auth, KeeperResponse, RestCommand } from '@keeper-security/keeperapi'
import { extractErrorMessage, isNumber, KeeperSdkError, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseNode,
    type EnterpriseTeamRecord,
} from './enterpriseData'
import { TeamRestriction, type TeamRestrictionInput } from './addTeam'

const TEAM_UPDATE_COMMAND = 'team_update'
const NODE_PATH_SEPARATOR = '\\'
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

function parentNeedsNameLookup(parent: string | number | null | undefined): boolean {
    if (parent === undefined || parent === null || parent === '') return false
    if (typeof parent === 'number') return false
    const trimmed = parent.trim()
    if (!trimmed) return false
    const numeric = Number(trimmed)
    if (Number.isFinite(numeric) && Number.isInteger(numeric) && trimmed === String(numeric)) {
        return false
    }
    return true
}

function resolveOptionalRestriction(input: TeamRestrictionInput): boolean | undefined {
    if (input === undefined || input === null) return undefined
    const lower = String(input).toLowerCase()
    if (lower === TeamRestriction.On) return true
    if (lower === TeamRestriction.Off) return false
    return undefined
}

function applyDecryptedNodeNames(nodes: EnterpriseNode[], decrypted: Map<number, string>): void {
    if (decrypted.size === 0) return
    for (const node of nodes) {
        const display = decrypted.get(node.node_id)
        if (display) node.displayName = display
    }
}

function applyEnterpriseNameToRoot(nodes: EnterpriseNode[], enterpriseName: string | undefined): void {
    const fallback = (enterpriseName || '').trim()
    if (!fallback) return
    for (const node of nodes) {
        const isRoot = !node.parent_id || node.parent_id === 0
        if (!isRoot) continue
        if (!(node.displayName || '').trim()) {
            node.displayName = fallback
        }
    }
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

function resolveParentNode(nodes: EnterpriseNode[], identifier: string | number): EnterpriseNode {
    if (typeof identifier === 'number') {
        if (!isNumber(identifier)) {
            throw new KeeperSdkError(
                `Parent node "${identifier}" is not a valid node id.`,
                ResultCodes.PARENT_NODE_REQUIRED
            )
        }
        const byId = nodes.find((node) => node.node_id === identifier)
        if (!byId) {
            throw new KeeperSdkError(
                buildNodeNotFoundMessage(nodes, String(identifier)),
                ResultCodes.PARENT_NODE_NOT_FOUND
            )
        }
        return byId
    }

    const trimmed = identifier.trim()
    if (!trimmed) {
        throw new KeeperSdkError('Parent node is required.', ResultCodes.PARENT_NODE_REQUIRED)
    }

    const numeric = Number(trimmed)
    if (Number.isFinite(numeric) && Number.isInteger(numeric)) {
        const byId = nodes.find((node) => node.node_id === numeric)
        if (byId) return byId
    }

    const lowered = trimmed.toLowerCase()
    const byExactName = nodes.filter((node) => (node.displayName || '').trim().toLowerCase() === lowered)
    if (byExactName.length === 1) return byExactName[0]
    if (byExactName.length > 1) {
        throw new KeeperSdkError(
            `Multiple nodes match name "${trimmed}". Specify the node id instead.`,
            ResultCodes.MULTIPLE_PARENT_NODE_MATCHES
        )
    }

    const byPath = nodes.filter((node) => {
        const path = EnterpriseDataManager.getNodePath(nodes, node.node_id, {
            omitRoot: false,
            separator: NODE_PATH_SEPARATOR,
        })
        return path.trim().toLowerCase() === lowered
    })
    if (byPath.length === 1) return byPath[0]
    if (byPath.length > 1) {
        throw new KeeperSdkError(
            `Multiple nodes match path "${trimmed}". Specify the node id instead.`,
            ResultCodes.MULTIPLE_PARENT_NODE_MATCHES
        )
    }

    throw new KeeperSdkError(
        buildNodeNotFoundMessage(nodes, trimmed),
        ResultCodes.PARENT_NODE_NOT_FOUND
    )
}

function buildNodeNotFoundMessage(nodes: EnterpriseNode[], requested: string): string {
    const lines: string[] = [`Parent node "${requested}" was not found.`]
    if (nodes.length === 0) {
        lines.push('No enterprise nodes are visible to the current user.')
        return lines.join(' ')
    }
    const sorted = [...nodes].sort((a, b) => a.node_id - b.node_id)
    const visible = sorted.slice(0, 25)
    lines.push('Available nodes (id  parent_id  name):')
    for (const node of visible) {
        const own = (node.displayName || '').trim() || '<unnamed>'
        const parent = node.parent_id || 0
        lines.push(`  ${node.node_id}  ${parent}  ${own}`)
    }
    if (sorted.length > visible.length) {
        lines.push(`  ...and ${sorted.length - visible.length} more`)
    }
    return lines.join('\n')
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

const UPDATE_TEAM_HEADERS = ['#', 'Status', 'Team Name', 'Team UID', 'Node ID', 'Detail']

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
        headers: [...UPDATE_TEAM_HEADERS],
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

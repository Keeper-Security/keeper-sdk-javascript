import type { Auth, KeeperResponse, RestCommand } from '@keeper-security/keeperapi'
import {
    encryptForStorage,
    encryptKey,
    generateEncryptionKey,
    generateUid,
    platform,
    webSafe64FromBytes,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, isNumber, KeeperSdkError, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseNode,
    type EnterpriseQueuedTeamRecord,
    type EnterpriseTeamRecord,
} from './enterpriseData'

const TEAM_ADD_COMMAND = 'team_add'
const NODE_PATH_SEPARATOR = '\\'
const ADD_TEAM_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Nodes,
    EnterpriseDataInclude.Teams,
    EnterpriseDataInclude.QueuedTeams,
]

export enum TeamRestriction {
    On = 'on',
    Off = 'off',
}

export type TeamRestrictionInput = TeamRestriction | `${TeamRestriction}` | null | undefined

export enum AddTeamStatus {
    Created = 'created',
    Skipped = 'skipped',
    Failed = 'failed',
}

export enum AddTeamSkipReason {
    AlreadyExistsInParent = 'already_exists_in_parent',
    ExistsElsewhereDeclined = 'exists_elsewhere_declined',
}

export enum AddTeamSourceKind {
    NewName = 'new_name',
    QueuedTeam = 'queued_team',
}

export type AddTeamConflictPrompt = {
    teamName: string
    parentNodeId: number
    parentNodeName: string
    existingTeamUid: string
    existingTeamName: string
    existingNodeId: number
    existingNodeName: string
}

export type AddTeamConfirm = (prompt: AddTeamConflictPrompt) => boolean | Promise<boolean>

export type AddTeamInput = {
    teams: string[]
    parent?: string | number | null
    restrictEdit?: TeamRestrictionInput
    restrictShare?: TeamRestrictionInput
    restrictView?: TeamRestrictionInput
    force?: boolean
    confirm?: AddTeamConfirm
}

export type AddTeamItemResult = {
    teamUid: string
    teamName: string
    nodeId: number
    source: AddTeamSourceKind
    status: AddTeamStatus
    skipReason?: AddTeamSkipReason
    message?: string
}

export type AddTeamResult = {
    success: boolean
    parentNodeId: number
    parentNodeName: string
    items: AddTeamItemResult[]
    created: number
    skipped: number
    failed: number
}

type ResolvedRequest =
    | { kind: AddTeamSourceKind.NewName; teamUid: string; teamName: string }
    | {
          kind: AddTeamSourceKind.QueuedTeam
          teamUid: string
          teamName: string
          queued: EnterpriseQueuedTeamRecord
      }

type TeamAddRequestPayload = {
    team_uid: string
    team_name: string
    node_id: number
    public_key: string
    private_key: string
    team_key: string
    encrypted_team_key: string
    ecc_public_key: string
    ecc_private_key: string
    restrict_edit: boolean
    restrict_share: boolean
    restrict_view: boolean
    manage_only: boolean
}

export async function addTeams(auth: Auth, input: AddTeamInput): Promise<AddTeamResult> {
    const requestedNames = (input.teams || [])
        .map((value) => (typeof value === 'string' ? value.trim() : ''))
        .filter((value) => value.length > 0)

    if (requestedNames.length === 0) {
        throw new KeeperSdkError('No teams to add.', ResultCodes.NO_TEAMS_TO_ADD)
    }

    const force = input.force === true
    const restrictEdit = resolveRestriction(input.restrictEdit)
    const restrictShare = resolveRestriction(input.restrictShare)
    const restrictView = resolveRestriction(input.restrictView)

    const needsNameLookup = parentNeedsNameLookup(input.parent ?? null)

    const enterpriseData = new EnterpriseDataManager(auth)
    const response = await enterpriseData.getData(ADD_TEAM_INCLUDES)
    const nodes = response.nodes || []
    if (needsNameLookup) {
        const displayNames = await enterpriseData.getDisplayNames()
        applyDecryptedNodeNames(nodes, displayNames.nodes)
        await enterpriseData.decryptNodeNames(nodes)
    }
    applyEnterpriseNameToRoot(nodes, response.enterprise_name)

    const parentNode = resolveParentNode(nodes, input.parent ?? null)
    const parentNodeId = parentNode.node_id
    const parentNodeName = nodePathOrFallback(nodes, parentNode)

    const existingTeams = response.teams || []
    const queuedTeams = response.queued_teams || []
    const queuedByUid = buildQueuedByUid(queuedTeams)
    const queuedByLowerName = buildQueuedByLowerName(queuedTeams)
    const teamsByLowerName = buildTeamsByLowerName(existingTeams)

    const queuedRequests: ResolvedRequest[] = []
    const newRequests: ResolvedRequest[] = []
    const items: AddTeamItemResult[] = []
    const seenLowerNames = new Set<string>()

    for (const raw of requestedNames) {
        const lower = raw.toLowerCase()
        if (seenLowerNames.has(lower)) continue
        seenLowerNames.add(lower)

        const queued = queuedByUid.get(raw) || queuedByLowerName.get(lower)
        if (queued) {
            queuedRequests.push({
                kind: AddTeamSourceKind.QueuedTeam,
                teamUid: queued.team_uid,
                teamName: queued.name || raw,
                queued,
            })
            continue
        }

        const conflicts = teamsByLowerName.get(lower) || []
        const sameParent = conflicts.find((team) => team.node_id === parentNodeId)
        if (sameParent) {
            items.push({
                teamUid: sameParent.team_uid,
                teamName: sameParent.name || raw,
                nodeId: sameParent.node_id,
                source: AddTeamSourceKind.NewName,
                status: AddTeamStatus.Skipped,
                skipReason: AddTeamSkipReason.AlreadyExistsInParent,
                message: `Team "${sameParent.name || raw}" already exists in parent node ${parentNodeId}.`,
            })
            continue
        }

        if (conflicts.length > 0 && !force) {
            const confirmed = await confirmCrossNode(input.confirm, conflicts[0], {
                teamName: raw,
                parentNodeId,
                parentNodeName,
                existingNodeName: nodePathById(nodes, conflicts[0].node_id),
            })
            if (!confirmed) {
                items.push({
                    teamUid: conflicts[0].team_uid,
                    teamName: raw,
                    nodeId: conflicts[0].node_id,
                    source: AddTeamSourceKind.NewName,
                    status: AddTeamStatus.Skipped,
                    skipReason: AddTeamSkipReason.ExistsElsewhereDeclined,
                    message: `Team "${raw}" already exists in node ${conflicts[0].node_id}; creation declined.`,
                })
                continue
            }
        }

        newRequests.push({
            kind: AddTeamSourceKind.NewName,
            teamUid: generateUid(),
            teamName: raw,
        })
    }

    const planned = [...queuedRequests, ...newRequests]
    if (planned.length === 0) {
        return finalizeResult(items, parentNodeId, parentNodeName)
    }

    const treeKey = await enterpriseData.getTreeKey()
    if (!treeKey) {
        throw new KeeperSdkError(
            'Enterprise tree key is unavailable. The current user may not have permission to administer teams.',
            ResultCodes.ENTERPRISE_TREE_KEY_UNAVAILABLE
        )
    }
    const dataKey = auth.dataKey
    if (!dataKey) {
        throw new KeeperSdkError(
            'Data key not available. Ensure you are logged in.',
            ResultCodes.DATA_KEY_MISSING
        )
    }

    for (const request of planned) {
        try {
            await sendTeamAdd(auth, request, parentNodeId, dataKey, treeKey, {
                restrictEdit,
                restrictShare,
                restrictView,
            })
            items.push({
                teamUid: request.teamUid,
                teamName: request.teamName,
                nodeId: parentNodeId,
                source: request.kind,
                status: AddTeamStatus.Created,
            })
        } catch (err) {
            items.push({
                teamUid: request.teamUid,
                teamName: request.teamName,
                nodeId: parentNodeId,
                source: request.kind,
                status: AddTeamStatus.Failed,
                message: extractErrorMessage(err),
            })
        }
    }

    return finalizeResult(items, parentNodeId, parentNodeName)
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

function resolveRestriction(input: TeamRestrictionInput): boolean {
    if (input === undefined || input === null) return false
    return String(input).toLowerCase() === TeamRestriction.On
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

function resolveParentNode(nodes: EnterpriseNode[], identifier: string | number | null): EnterpriseNode {
    if (identifier === null || identifier === undefined || identifier === '') {
        const root = nodes.find((node) => !node.parent_id || node.parent_id === 0)
        if (!root) {
            throw new KeeperSdkError(
                buildNodeNotFoundMessage(nodes, '<enterprise root>'),
                ResultCodes.PARENT_NODE_NOT_FOUND
            )
        }
        return root
    }

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

function nodePathOrFallback(nodes: EnterpriseNode[], node: EnterpriseNode): string {
    const path = EnterpriseDataManager.getNodePath(nodes, node.node_id, {
        omitRoot: false,
        separator: NODE_PATH_SEPARATOR,
    })
    return path || (node.displayName || '').trim() || String(node.node_id)
}

function nodePathById(nodes: EnterpriseNode[], nodeId: number): string {
    return (
        EnterpriseDataManager.getNodePath(nodes, nodeId, {
            omitRoot: false,
            separator: NODE_PATH_SEPARATOR,
        }) || String(nodeId)
    )
}

function buildTeamsByLowerName(teams: EnterpriseTeamRecord[]): Map<string, EnterpriseTeamRecord[]> {
    const map = new Map<string, EnterpriseTeamRecord[]>()
    for (const team of teams) {
        const key = (team.name || '').trim().toLowerCase()
        if (!key) continue
        const existing = map.get(key)
        if (existing) existing.push(team)
        else map.set(key, [team])
    }
    return map
}

function buildQueuedByUid(queued: EnterpriseQueuedTeamRecord[]): Map<string, EnterpriseQueuedTeamRecord> {
    const map = new Map<string, EnterpriseQueuedTeamRecord>()
    for (const team of queued) {
        if (team.team_uid) map.set(team.team_uid, team)
    }
    return map
}

function buildQueuedByLowerName(
    queued: EnterpriseQueuedTeamRecord[]
): Map<string, EnterpriseQueuedTeamRecord> {
    const map = new Map<string, EnterpriseQueuedTeamRecord>()
    for (const team of queued) {
        const key = (team.name || '').trim().toLowerCase()
        if (!key) continue
        if (!map.has(key)) map.set(key, team)
    }
    return map
}

async function confirmCrossNode(
    confirm: AddTeamConfirm | undefined,
    existing: EnterpriseTeamRecord,
    context: {
        teamName: string
        parentNodeId: number
        parentNodeName: string
        existingNodeName: string
    }
): Promise<boolean> {
    if (!confirm) return false
    const result = await confirm({
        teamName: context.teamName,
        parentNodeId: context.parentNodeId,
        parentNodeName: context.parentNodeName,
        existingTeamUid: existing.team_uid,
        existingTeamName: existing.name || context.teamName,
        existingNodeId: existing.node_id,
        existingNodeName: context.existingNodeName,
    })
    return result === true
}

async function sendTeamAdd(
    auth: Auth,
    request: ResolvedRequest,
    parentNodeId: number,
    dataKey: Uint8Array,
    treeKey: Uint8Array,
    restrictions: { restrictEdit: boolean; restrictShare: boolean; restrictView: boolean }
): Promise<void> {
    const teamKeyBytes = generateEncryptionKey()
    const [rsaKeyPair, eccKeyPair] = await Promise.all([
        platform.generateRSAKeyPair(),
        platform.generateECKeyPair(),
    ])
    const encryptedPrivateKey = await encryptForStorage(rsaKeyPair.privateKey, teamKeyBytes)
    const encryptedEccPrivateKey = await encryptKey(eccKeyPair.privateKey, teamKeyBytes)
    const encryptedTeamKeyByDataKey = await encryptForStorage(teamKeyBytes, dataKey)
    const encryptedTeamKeyByTreeKey = await encryptKey(teamKeyBytes, treeKey)

    const payload: TeamAddRequestPayload = {
        team_uid: request.teamUid,
        team_name: request.teamName,
        node_id: parentNodeId,
        public_key: webSafe64FromBytes(rsaKeyPair.publicKey),
        private_key: encryptedPrivateKey,
        team_key: encryptedTeamKeyByDataKey,
        encrypted_team_key: encryptedTeamKeyByTreeKey,
        ecc_public_key: webSafe64FromBytes(eccKeyPair.publicKey),
        ecc_private_key: encryptedEccPrivateKey,
        restrict_edit: restrictions.restrictEdit,
        restrict_share: restrictions.restrictShare,
        restrict_view: restrictions.restrictView,
        manage_only: true,
    }

    const command: RestCommand<TeamAddRequestPayload, KeeperResponse> = {
        baseRequest: { command: TEAM_ADD_COMMAND },
        request: payload,
        authorization: {},
    }

    const response = await auth.executeRestCommand(command)
    const result = (response.result || '').toLowerCase()
    if (result && result !== 'success') {
        throw new KeeperSdkError(
            response.message ||
                response.result_code ||
                `team_add failed for "${request.teamName}" (uid=${request.teamUid})`,
            response.result_code || ResultCodes.TEAM_ADD_FAILED
        )
    }
}

function finalizeResult(
    items: AddTeamItemResult[],
    parentNodeId: number,
    parentNodeName: string
): AddTeamResult {
    const created = items.filter((item) => item.status === AddTeamStatus.Created).length
    const skipped = items.filter((item) => item.status === AddTeamStatus.Skipped).length
    const failed = items.filter((item) => item.status === AddTeamStatus.Failed).length
    return {
        success: failed === 0 && created > 0,
        parentNodeId,
        parentNodeName,
        items,
        created,
        skipped,
        failed,
    }
}

export type FormatAddTeamResultOptions = {
    showSkipped?: boolean
}

export type FormattedAddTeamRow = {
    status: string
    name: string
    teamUid: string
    nodeId: number
    detail: string
}

export type FormattedAddTeamTable = {
    headers: string[]
    rows: string[][]
    parentNodeName: string
    summary: string
}

const ADD_TEAM_HEADERS = ['#', 'Status', 'Team Name', 'Team UID', 'Node ID', 'Detail']

export function formatAddTeamResult(
    result: AddTeamResult,
    options: FormatAddTeamResultOptions = {}
): FormattedAddTeamTable {
    const showSkipped = options.showSkipped !== false
    const visible = result.items.filter(
        (item) => showSkipped || item.status !== AddTeamStatus.Skipped
    )

    const rows = visible.map((item, index) => [
        String(index + 1),
        item.status,
        item.teamName,
        item.teamUid,
        String(item.nodeId),
        item.message || (item.skipReason ? item.skipReason : ''),
    ])

    return {
        headers: [...ADD_TEAM_HEADERS],
        rows,
        parentNodeName: result.parentNodeName,
        summary: `Created: ${result.created}  Skipped: ${result.skipped}  Failed: ${result.failed}`,
    }
}

export function renderAddTeamAsciiTable(table: FormattedAddTeamTable): string {
    const { headers, rows } = table
    const widths = headers.map((header, index) =>
        Math.max(header.length, ...rows.map((row) => (row[index] || '').length))
    )
    const padCell = (cell: string, columnIndex: number): string =>
        cell + ' '.repeat(Math.max(0, widths[columnIndex] - cell.length))
    const formatRow = (cells: string[]): string =>
        cells.map((cell, columnIndex) => padCell(cell, columnIndex)).join('  ')

    const lines: string[] = []
    lines.push(`Parent: ${table.parentNodeName}`)
    lines.push(formatRow(headers))
    lines.push(formatRow(widths.map((width) => '-'.repeat(width))))
    for (const row of rows) lines.push(formatRow(row))
    lines.push(table.summary)
    return lines.join('\n')
}

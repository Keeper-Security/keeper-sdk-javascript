import { isNumber, KeeperSdkError, ResultCodes } from '../utils'
import { EnterpriseDataManager, type EnterpriseNode, type EnterpriseTeamRecord } from './enterpriseData'

export const NODE_PATH_SEPARATOR = '\\'
export const MAX_TEAM_NAME_LENGTH = 100
export const TEAM_TABLE_HEADERS = ['#', 'Status', 'Team Name', 'Team UID', 'Node ID', 'Detail']

export function validateTeamName(name: string): void {
    if (name.length > MAX_TEAM_NAME_LENGTH) {
        throw new KeeperSdkError(
            `Team name exceeds ${MAX_TEAM_NAME_LENGTH} characters: "${name.substring(0, 30)}..."`,
            ResultCodes.TEAM_NAME_TOO_LONG
        )
    }
}

export function resolveExistingTeams(
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

export function resolveParentNode(
    nodes: EnterpriseNode[],
    identifier: string | number | null
): EnterpriseNode {
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

export function applyDecryptedNodeNames(nodes: EnterpriseNode[], decrypted: Map<number, string>): void {
    if (decrypted.size === 0) return
    for (const node of nodes) {
        const display = decrypted.get(node.node_id)
        if (display) node.displayName = display
    }
}

export function applyEnterpriseNameToRoot(
    nodes: EnterpriseNode[],
    enterpriseName: string | undefined
): void {
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

export function parentNeedsNameLookup(parent: string | number | null | undefined): boolean {
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

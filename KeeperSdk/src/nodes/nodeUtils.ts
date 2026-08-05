import type { KeeperResponse } from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes } from '../utils'
import { EnterpriseDataManager, type EnterpriseNode } from '../teams/enterpriseData'
import { NODE_PATH_SEPARATOR } from '../teams/teamUtils'

export const NODE_TABLE_HEADERS = ['#', 'Status', 'Node Name', 'Node ID', 'Parent ID', 'Detail'] as const
export const MAX_NODE_NAME_LENGTH = 100

export function normalizeIdentifiers(values: ReadonlyArray<unknown> | null | undefined): string[] {
    return (values || [])
        .map((value) => (typeof value === 'string' ? value.trim() : ''))
        .filter((value) => value.length > 0)
}

export function validateNodeName(name: string): void {
    const trimmed = name.trim()
    if (!trimmed) {
        throw new KeeperSdkError('Node name cannot be empty.', ResultCodes.NODE_NAME_EMPTY)
    }
    if (trimmed.length > MAX_NODE_NAME_LENGTH) {
        throw new KeeperSdkError(
            `Node name exceeds ${MAX_NODE_NAME_LENGTH} characters: "${trimmed.substring(0, 30)}..."`,
            ResultCodes.NODE_NAME_TOO_LONG
        )
    }
}

export function nodeDisplayName(node: EnterpriseNode): string {
    return (node.displayName || '').trim() || String(node.node_id)
}

export function nodePathOrFallback(nodes: EnterpriseNode[], node: EnterpriseNode): string {
    const path = EnterpriseDataManager.getNodePath(nodes, node.node_id, {
        omitRoot: false,
        separator: NODE_PATH_SEPARATOR,
    })
    return path || nodeDisplayName(node)
}

export function buildNodesByLowerName(nodes: EnterpriseNode[]): Map<string, EnterpriseNode[]> {
    const map = new Map<string, EnterpriseNode[]>()
    for (const node of nodes) {
        const key = (node.displayName || '').trim().toLowerCase()
        if (!key) continue
        const bucket = map.get(key)
        if (bucket) bucket.push(node)
        else map.set(key, [node])
    }
    return map
}

export function resolveExistingNodes(nodes: EnterpriseNode[], identifiers: string[]): EnterpriseNode[] {
    const byId = new Map<number, EnterpriseNode>()
    for (const node of nodes) byId.set(node.node_id, node)
    const byLowerName = buildNodesByLowerName(nodes)

    const found = new Map<number, EnterpriseNode>()
    const missing: string[] = []

    for (const identifier of identifiers) {
        const numericId = Number(identifier)
        if (Number.isInteger(numericId) && byId.has(numericId)) {
            found.set(numericId, byId.get(numericId)!)
            continue
        }
        const matches = byLowerName.get(identifier.toLowerCase())
        if (!matches || matches.length === 0) {
            missing.push(identifier)
            continue
        }
        if (matches.length > 1) {
            throw new KeeperSdkError(
                `Node name "${identifier}" is not unique. Use Node ID.`,
                ResultCodes.MULTIPLE_NODE_MATCHES
            )
        }
        found.set(matches[0]!.node_id, matches[0]!)
    }

    if (missing.length > 0) {
        throw new KeeperSdkError(
            `Node name(s) "${missing.join(', ')}" could not be resolved.`,
            ResultCodes.NODE_NOT_FOUND
        )
    }
    return Array.from(found.values())
}

export function isAncestorOf(nodes: EnterpriseNode[], ancestorId: number, descendantId: number): boolean {
    if (ancestorId === descendantId) return true
    const byId = new Map(nodes.map((n) => [n.node_id, n] as const))
    let current = byId.get(descendantId)
    const seen = new Set<number>()
    while (current?.parent_id) {
        if (current.parent_id === ancestorId) return true
        if (seen.has(current.parent_id)) break
        seen.add(current.parent_id)
        current = byId.get(current.parent_id)
    }
    return false
}

export function assertCommandSucceeded(response: KeeperResponse, fallbackMessage: string, fallbackCode: string): void {
    if ((response.result || '').toLowerCase() === 'fail') {
        throw new KeeperSdkError(
            response.message || response.result_code || fallbackMessage,
            response.result_code || fallbackCode
        )
    }
}

export function renderNodeResultTable(headers: readonly string[], rows: string[][], summary: string): string {
    const widths = headers.map((header, index) =>
        Math.max(header.length, ...rows.map((row) => (row[index] || '').length), 2)
    )
    const pad = (cell: string, i: number) => cell.padEnd(widths[i]!)
    const formatRow = (cells: string[]) => cells.map((cell, i) => pad(cell, i)).join('  ')
    return [formatRow([...headers]), formatRow(widths.map((w) => '-'.repeat(w))), ...rows.map(formatRow), summary].join(
        '\n'
    )
}

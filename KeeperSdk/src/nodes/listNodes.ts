import type { Auth } from '@keeper-security/keeperapi'
import { isNumber, resolveSearchPattern } from '../utils'
import { EnterpriseDataInclude, EnterpriseDataManager, type EnterpriseNode } from '../teams/enterpriseData'
import { applyDecryptedNodeNames, applyEnterpriseNameToRoot, NODE_PATH_SEPARATOR } from '../teams/teamUtils'
import { nodeDisplayName } from './nodeUtils'

export enum NodeColumn {
    NodeId = 'node_id',
    Name = 'name',
    ParentId = 'parent_id',
    Parent = 'parent',
    Path = 'path',
    Isolated = 'isolated',
}

export const SUPPORTED_NODE_COLUMNS: NodeColumn[] = [
    NodeColumn.NodeId,
    NodeColumn.Name,
    NodeColumn.ParentId,
    NodeColumn.Parent,
    NodeColumn.Path,
    NodeColumn.Isolated,
]

export const DEFAULT_NODE_COLUMNS: NodeColumn[] = [
    NodeColumn.NodeId,
    NodeColumn.Name,
    NodeColumn.Parent,
    NodeColumn.Path,
]

export type NodeColumnInput = NodeColumn | `${NodeColumn}`

export type ListNodesOptions = {
    pattern?: string | null
    columns?: NodeColumnInput[] | '*' | string | null
}

export type ListNodeRow = {
    node_id: number
    name: string
    parent_id?: number
    parent?: string
    path?: string
    isolated?: boolean
}

export type FormattedNodesTable = {
    headers: string[]
    rows: string[][]
}

export type FormatNodesTableOptions = {
    columns?: ListNodesOptions['columns']
}

const HEADER_BY_COLUMN: Record<NodeColumn, string> = {
    [NodeColumn.NodeId]: 'Node ID',
    [NodeColumn.Name]: 'Name',
    [NodeColumn.ParentId]: 'Parent ID',
    [NodeColumn.Parent]: 'Parent',
    [NodeColumn.Path]: 'Path',
    [NodeColumn.Isolated]: 'Isolated',
}

function resolveColumns(raw: ListNodesOptions['columns']): NodeColumn[] {
    if (!raw) return [...DEFAULT_NODE_COLUMNS]
    if (raw === '*') return [...SUPPORTED_NODE_COLUMNS]
    if (typeof raw === 'string') {
        return raw
            .split(',')
            .map((p) => p.trim().toLowerCase())
            .filter(Boolean)
            .map((p) => p as NodeColumn)
            .filter((p) => SUPPORTED_NODE_COLUMNS.includes(p))
    }
    return raw
        .map((p) => String(p).trim().toLowerCase() as NodeColumn)
        .filter((p) => SUPPORTED_NODE_COLUMNS.includes(p))
}

export async function listNodes(auth: Auth, options: ListNodesOptions = {}): Promise<ListNodeRow[]> {
    const columns = resolveColumns(options.columns)
    const enterpriseData = new EnterpriseDataManager(auth)
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData([EnterpriseDataInclude.Nodes]),
        enterpriseData.getDisplayNames(),
    ])
    const nodes = response.nodes || []
    applyDecryptedNodeNames(nodes, displayNames.nodes)
    applyEnterpriseNameToRoot(nodes, response.enterprise_name)

    const byId = new Map(nodes.map((n) => [n.node_id, n] as const))
    const pattern = resolveSearchPattern(options.pattern)?.toLowerCase() ?? null

    const rows: ListNodeRow[] = []
    for (const node of nodes) {
        const name = nodeDisplayName(node)
        const path = EnterpriseDataManager.getNodePath(nodes, node.node_id, {
            omitRoot: false,
            separator: NODE_PATH_SEPARATOR,
        })
        if (pattern) {
            const haystack = `${name} ${node.node_id} ${path}`.toLowerCase()
            if (!haystack.includes(pattern)) continue
        }

        const parent = node.parent_id ? byId.get(node.parent_id) : undefined
        const row: ListNodeRow = { node_id: node.node_id, name }
        if (columns.includes(NodeColumn.ParentId) && node.parent_id != null) row.parent_id = node.parent_id
        if (columns.includes(NodeColumn.Parent)) {
            row.parent = parent ? nodeDisplayName(parent) : node.parent_id ? String(node.parent_id) : ''
        }
        if (columns.includes(NodeColumn.Path)) row.path = path || name
        if (columns.includes(NodeColumn.Isolated)) row.isolated = !!node.restrict_visibility
        rows.push(row)
    }

    rows.sort((a, b) => (a.path || a.name).localeCompare(b.path || b.name, undefined, { sensitivity: 'base' }))
    return rows
}

export function formatNodesTable(rows: ListNodeRow[], options: FormatNodesTableOptions = {}): FormattedNodesTable {
    const columns = resolveColumns(options.columns)
    const headers = columns.map((c) => HEADER_BY_COLUMN[c])
    const tableRows = rows.map((row) =>
        columns.map((column) => {
            switch (column) {
                case NodeColumn.NodeId:
                    return String(row.node_id)
                case NodeColumn.Name:
                    return row.name
                case NodeColumn.ParentId:
                    return row.parent_id != null ? String(row.parent_id) : ''
                case NodeColumn.Parent:
                    return row.parent ?? ''
                case NodeColumn.Path:
                    return row.path ?? ''
                case NodeColumn.Isolated:
                    return row.isolated ? 'yes' : 'no'
                default:
                    return ''
            }
        })
    )
    return { headers, rows: tableRows }
}

export function renderNodesAsciiTable(table: FormattedNodesTable, options: { minColWidth?: number } = {}): string {
    const min = options.minColWidth ?? 2
    const { headers, rows } = table
    const widths = headers.map((header, index) =>
        Math.max(min, header.length, ...rows.map((row) => (row[index] || '').length))
    )
    const pad = (cell: string, i: number) => cell.padEnd(widths[i]!)
    const formatRow = (cells: string[]) => cells.map((cell, i) => pad(cell, i)).join('  ')
    return [formatRow(headers), formatRow(widths.map((w) => '-'.repeat(w))), ...rows.map(formatRow)].join('\n')
}

export function isNumberLike(value: unknown): value is number {
    return isNumber(value)
}

export type { EnterpriseNode }

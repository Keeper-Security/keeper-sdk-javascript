import type { Auth } from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes } from '../utils'
import { EnterpriseDataInclude, EnterpriseDataManager, type EnterpriseNode } from '../teams/enterpriseData'
import { applyDecryptedNodeNames, applyEnterpriseNameToRoot, NODE_PATH_SEPARATOR } from '../teams/teamUtils'
import { nodeDisplayName, resolveExistingNodes } from './nodeUtils'

const VIEW_NODE_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Nodes,
    EnterpriseDataInclude.Users,
    EnterpriseDataInclude.Teams,
    EnterpriseDataInclude.Roles,
]

export type NodeView = {
    node_id: number
    name: string
    parent_id: number | null
    parent_name: string
    path: string
    isolated: boolean
    child_count: number
    user_count: number
    team_count: number
    role_count: number
}

export type FormatNodeViewOptions = {
    verbose?: boolean
}

export type NodeViewTableRow = {
    label: string
    value: string
    id?: string | number
}

export type FormattedNodeViewTable = {
    rows: NodeViewTableRow[]
}

export async function viewNode(auth: Auth, identifier: string): Promise<NodeView> {
    const trimmed = identifier.trim()
    if (!trimmed) {
        throw new KeeperSdkError('Node name or ID is required.', ResultCodes.NODE_NOT_FOUND)
    }

    const enterpriseData = new EnterpriseDataManager(auth)
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData(VIEW_NODE_INCLUDES),
        enterpriseData.getDisplayNames(),
    ])
    const nodes = response.nodes || []
    applyDecryptedNodeNames(nodes, displayNames.nodes)
    applyEnterpriseNameToRoot(nodes, response.enterprise_name)

    const node = resolveExistingNodes(nodes, [trimmed])[0]!
    const byId = new Map(nodes.map((n) => [n.node_id, n] as const))
    const parent = node.parent_id ? byId.get(node.parent_id) : undefined
    const path =
        EnterpriseDataManager.getNodePath(nodes, node.node_id, {
            omitRoot: false,
            separator: NODE_PATH_SEPARATOR,
        }) || nodeDisplayName(node)

    const child_count = nodes.filter((n) => n.parent_id === node.node_id).length
    const user_count = (response.users || []).filter((u) => u.node_id === node.node_id).length
    const team_count = (response.teams || []).filter((t) => t.node_id === node.node_id).length
    const role_count = (response.roles || []).filter((r) => r.node_id === node.node_id).length

    return {
        node_id: node.node_id,
        name: nodeDisplayName(node),
        parent_id: node.parent_id ?? null,
        parent_name: parent ? nodeDisplayName(parent) : '',
        path,
        isolated: !!node.restrict_visibility,
        child_count,
        user_count,
        team_count,
        role_count,
    }
}

export function formatNodeView(view: NodeView, options: FormatNodeViewOptions = {}): FormattedNodeViewTable {
    const rows: NodeViewTableRow[] = [
        { label: 'Node ID', value: String(view.node_id), id: view.node_id },
        { label: 'Name', value: view.name },
        {
            label: 'Parent',
            value: view.parent_name || (view.parent_id != null ? String(view.parent_id) : '(root)'),
            id: options.verbose && view.parent_id != null ? view.parent_id : undefined,
        },
        { label: 'Path', value: view.path },
        { label: 'Isolated', value: view.isolated ? 'yes' : 'no' },
        { label: 'Child Nodes', value: String(view.child_count) },
        { label: 'Users', value: String(view.user_count) },
        { label: 'Teams', value: String(view.team_count) },
        { label: 'Roles', value: String(view.role_count) },
    ]
    return { rows }
}

export function nodeViewTable(table: FormattedNodeViewTable): string {
    const labelWidth = Math.max(...table.rows.map((r) => r.label.length), 8)
    return table.rows
        .map((row) => {
            const idPart = row.id != null ? `  [${row.id}]` : ''
            return `${row.label.padEnd(labelWidth)}  ${row.value}${idPart}`
        })
        .join('\n')
}

export type { EnterpriseNode }

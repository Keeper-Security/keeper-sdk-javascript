import type { Auth, KeeperResponse, RestCommand } from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../utils'
import { EnterpriseDataInclude, EnterpriseDataManager } from '../teams/enterpriseData'
import { applyDecryptedNodeNames, applyEnterpriseNameToRoot } from '../teams/teamUtils'
import {
    assertCommandSucceeded,
    NODE_TABLE_HEADERS,
    nodeDisplayName,
    normalizeIdentifiers,
    renderNodeResultTable,
    resolveExistingNodes,
} from './nodeUtils'

const NODE_DELETE_COMMAND = 'node_delete'
const DELETE_NODE_INCLUDES: EnterpriseDataInclude[] = [EnterpriseDataInclude.Nodes]

type NodeDeleteRequest = {
    node_id: number
}

export enum DeleteNodeStatus {
    Deleted = 'deleted',
    Failed = 'failed',
}

export type DeleteNodeInput = {
    nodes: string[]
}

export type DeleteNodeItemResult = {
    nodeId: number
    nodeName: string
    parentId: number
    status: DeleteNodeStatus
    message?: string
}

export type DeleteNodeResult = {
    success: boolean
    items: DeleteNodeItemResult[]
    deleted: number
    failed: number
}

export type FormattedDeleteNodeTable = {
    headers: string[]
    rows: string[][]
    summary: string
}

export async function deleteNodes(auth: Auth, input: DeleteNodeInput): Promise<DeleteNodeResult> {
    const identifiers = normalizeIdentifiers(input.nodes)
    if (identifiers.length === 0) {
        throw new KeeperSdkError('No nodes to delete.', ResultCodes.NO_NODES_TO_DELETE)
    }

    const enterpriseData = new EnterpriseDataManager(auth)
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData(DELETE_NODE_INCLUDES),
        enterpriseData.getDisplayNames(),
    ])
    const nodes = response.nodes || []
    applyDecryptedNodeNames(nodes, displayNames.nodes)
    applyEnterpriseNameToRoot(nodes, response.enterprise_name)

    const resolved = resolveExistingNodes(nodes, identifiers)
    const depth = (nodeId: number): number => {
        let d = 0
        let current = nodes.find((n) => n.node_id === nodeId)
        const seen = new Set<number>()
        while (current?.parent_id) {
            if (seen.has(current.parent_id)) break
            seen.add(current.parent_id)
            d++
            current = nodes.find((n) => n.node_id === current!.parent_id)
        }
        return d
    }
    resolved.sort((a, b) => depth(b.node_id) - depth(a.node_id))

    const items: DeleteNodeItemResult[] = []
    for (const node of resolved) {
        const name = nodeDisplayName(node)
        const parentId = node.parent_id ?? 0
        if (!node.parent_id) {
            items.push({
                nodeId: node.node_id,
                nodeName: name,
                parentId,
                status: DeleteNodeStatus.Failed,
                message: 'Cannot delete the root node.',
            })
            continue
        }
        try {
            const command: RestCommand<NodeDeleteRequest, KeeperResponse> = {
                baseRequest: { command: NODE_DELETE_COMMAND },
                request: { node_id: node.node_id },
                authorization: {},
            }
            const responseDelete = await auth.executeRestCommand(command)
            assertCommandSucceeded(
                responseDelete,
                `node_delete failed for node_id=${node.node_id}`,
                ResultCodes.NODE_DELETE_FAILED
            )
            items.push({
                nodeId: node.node_id,
                nodeName: name,
                parentId,
                status: DeleteNodeStatus.Deleted,
            })
        } catch (err) {
            const message = extractErrorMessage(err)
            items.push({
                nodeId: node.node_id,
                nodeName: name,
                parentId,
                status: DeleteNodeStatus.Failed,
                message:
                    message.includes('objects on this node') || message.includes('first delete')
                        ? `${message} Note: remove users, teams, roles, and child nodes first.`
                        : message,
            })
        }
    }

    const deleted = items.filter((i) => i.status === DeleteNodeStatus.Deleted).length
    const failed = items.filter((i) => i.status === DeleteNodeStatus.Failed).length
    return { success: failed === 0 && deleted > 0, items, deleted, failed }
}

export function formatDeleteNodeResult(result: DeleteNodeResult): FormattedDeleteNodeTable {
    const rows = result.items.map((item, index) => [
        String(index + 1),
        item.status,
        item.nodeName,
        String(item.nodeId),
        String(item.parentId),
        item.message || '',
    ])
    return {
        headers: [...NODE_TABLE_HEADERS],
        rows,
        summary: `Deleted: ${result.deleted}  Failed: ${result.failed}`,
    }
}

export function renderDeleteNodeAsciiTable(table: FormattedDeleteNodeTable): string {
    return renderNodeResultTable(table.headers, table.rows, table.summary)
}

import { encryptObjectForStorage, type Auth, type KeeperResponse, type RestCommand } from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../utils'
import { EnterpriseDataInclude, EnterpriseDataManager, type EnterpriseNode } from '../teams/enterpriseData'
import { applyDecryptedNodeNames, applyEnterpriseNameToRoot, resolveParentNode } from '../teams/teamUtils'
import {
    assertCommandSucceeded,
    isAncestorOf,
    NODE_TABLE_HEADERS,
    nodeDisplayName,
    normalizeIdentifiers,
    renderNodeResultTable,
    resolveExistingNodes,
    validateNodeName,
} from './nodeUtils'

const NODE_UPDATE_COMMAND = 'node_update'
const UPDATE_NODE_INCLUDES: EnterpriseDataInclude[] = [EnterpriseDataInclude.Nodes]

type NodeEditRequest = {
    node_id: number
    parent_id?: number
    encrypted_data: string
}

export enum UpdateNodeStatus {
    Updated = 'updated',
    Failed = 'failed',
    Skipped = 'skipped',
}

export type UpdateNodeInput = {
    nodes: string[]
    name?: string
    parent?: string | number | null
}

export type UpdateNodeItemResult = {
    nodeId: number
    nodeName: string
    parentId: number
    status: UpdateNodeStatus
    message?: string
}

export type UpdateNodeResult = {
    success: boolean
    items: UpdateNodeItemResult[]
    updated: number
    failed: number
}

export type FormattedUpdateNodeTable = {
    headers: string[]
    rows: string[][]
    summary: string
}

export async function updateNodes(auth: Auth, input: UpdateNodeInput): Promise<UpdateNodeResult> {
    const identifiers = normalizeIdentifiers(input.nodes)
    if (identifiers.length === 0) {
        throw new KeeperSdkError('No nodes to update.', ResultCodes.NO_NODES_TO_UPDATE)
    }

    const newName = input.name?.trim()
    if (newName) validateNodeName(newName)
    if (newName && identifiers.length > 1) {
        throw new KeeperSdkError(
            'Cannot assign the same name to multiple nodes.',
            ResultCodes.MULTIPLE_NODE_RENAME_NOT_ALLOWED
        )
    }
    const hasParent = input.parent !== undefined && input.parent !== null && String(input.parent).trim() !== ''
    if (!newName && !hasParent) {
        throw new KeeperSdkError('Specify --name and/or --parent to update a node.', ResultCodes.NO_NODES_TO_UPDATE)
    }

    const enterpriseData = new EnterpriseDataManager(auth)
    const response = await enterpriseData.getData(UPDATE_NODE_INCLUDES)
    const nodes = response.nodes || []
    const displayNames = await enterpriseData.getDisplayNames()
    applyDecryptedNodeNames(nodes, displayNames.nodes)
    await enterpriseData.decryptNodeNames(nodes)
    applyEnterpriseNameToRoot(nodes, response.enterprise_name)

    const resolved = resolveExistingNodes(nodes, identifiers)
    let parentNode: EnterpriseNode | undefined
    if (hasParent) {
        parentNode = resolveParentNode(nodes, input.parent!)
    }

    const treeKey = newName || resolved.some((n) => !n.encrypted_data) ? await enterpriseData.getTreeKey() : null
    if (newName && !treeKey) {
        throw new KeeperSdkError(
            'Enterprise tree key is unavailable. The current user may not have permission to administer nodes.',
            ResultCodes.ENTERPRISE_TREE_KEY_UNAVAILABLE
        )
    }

    const items: UpdateNodeItemResult[] = []
    for (const node of resolved) {
        const currentName = nodeDisplayName(node)
        const parentId = parentNode?.node_id ?? node.parent_id ?? 0
        try {
            if (parentNode && isAncestorOf(nodes, node.node_id, parentNode.node_id)) {
                items.push({
                    nodeId: node.node_id,
                    nodeName: currentName,
                    parentId,
                    status: UpdateNodeStatus.Failed,
                    message: 'Cannot move a node into itself or its children.',
                })
                continue
            }

            let encryptedData = node.encrypted_data || ''
            if (newName) {
                encryptedData = await encryptObjectForStorage({ displayname: newName }, treeKey!)
            } else if (!encryptedData && treeKey) {
                encryptedData = await encryptObjectForStorage({ displayname: currentName }, treeKey)
            }
            if (!encryptedData) {
                throw new KeeperSdkError('Encrypted node data is unavailable.', ResultCodes.NODE_UPDATE_FAILED)
            }

            await sendNodeUpdate(auth, {
                node_id: node.node_id,
                parent_id: parentId || undefined,
                encrypted_data: encryptedData,
            })
            items.push({
                nodeId: node.node_id,
                nodeName: newName || currentName,
                parentId,
                status: UpdateNodeStatus.Updated,
            })
        } catch (err) {
            items.push({
                nodeId: node.node_id,
                nodeName: currentName,
                parentId,
                status: UpdateNodeStatus.Failed,
                message: extractErrorMessage(err),
            })
        }
    }

    const updated = items.filter((i) => i.status === UpdateNodeStatus.Updated).length
    const failed = items.filter((i) => i.status === UpdateNodeStatus.Failed).length
    return { success: failed === 0 && updated > 0, items, updated, failed }
}

async function sendNodeUpdate(auth: Auth, payload: NodeEditRequest): Promise<void> {
    const command: RestCommand<NodeEditRequest, KeeperResponse> = {
        baseRequest: { command: NODE_UPDATE_COMMAND },
        request: payload,
        authorization: {},
    }
    const response = await auth.executeRestCommand(command)
    assertCommandSucceeded(
        response,
        `node_update failed for node_id=${payload.node_id}`,
        ResultCodes.NODE_UPDATE_FAILED
    )
}

export function formatUpdateNodeResult(result: UpdateNodeResult): FormattedUpdateNodeTable {
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
        summary: `Updated: ${result.updated}  Failed: ${result.failed}`,
    }
}

export function renderUpdateNodeAsciiTable(table: FormattedUpdateNodeTable): string {
    return renderNodeResultTable(table.headers, table.rows, table.summary)
}

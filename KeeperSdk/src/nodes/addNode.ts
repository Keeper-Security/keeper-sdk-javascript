import {
    encryptObjectForStorage,
    enterpriseAllocateIdsCommand,
    type Auth,
    type KeeperResponse,
    type RestCommand,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../utils'
import { EnterpriseDataInclude, EnterpriseDataManager } from '../teams/enterpriseData'
import {
    applyDecryptedNodeNames,
    applyEnterpriseNameToRoot,
    parentNeedsNameLookup,
    resolveParentNode,
} from '../teams/teamUtils'
import {
    assertCommandSucceeded,
    buildNodesByLowerName,
    NODE_TABLE_HEADERS,
    nodeDisplayName,
    nodePathOrFallback,
    normalizeIdentifiers,
    renderNodeResultTable,
    validateNodeName,
} from './nodeUtils'

const NODE_ADD_COMMAND = 'node_add'

type NodeEditRequest = {
    node_id: number
    parent_id: number
    encrypted_data: string
}

const ADD_NODE_INCLUDES: EnterpriseDataInclude[] = [EnterpriseDataInclude.Nodes]

export enum AddNodeStatus {
    Created = 'created',
    Skipped = 'skipped',
    Failed = 'failed',
}

export enum AddNodeSkipReason {
    AlreadyExistsInParent = 'already_exists_in_parent',
}

export type AddNodeInput = {
    nodes: string[]
    parent?: string | number | null
}

export type AddNodeItemResult = {
    nodeId: number
    nodeName: string
    parentId: number
    status: AddNodeStatus
    skipReason?: AddNodeSkipReason
    message?: string
}

export type AddNodeResult = {
    success: boolean
    parentNodeId: number
    parentNodeName: string
    items: AddNodeItemResult[]
    created: number
    skipped: number
    failed: number
}

export type FormattedAddNodeTable = {
    headers: string[]
    rows: string[][]
    parentNodeName: string
    summary: string
}

export async function addNodes(auth: Auth, input: AddNodeInput): Promise<AddNodeResult> {
    const names = normalizeIdentifiers(input.nodes)
    if (names.length === 0) {
        throw new KeeperSdkError('No nodes to add.', ResultCodes.NO_NODES_TO_ADD)
    }
    for (const name of names) validateNodeName(name)

    const needsNameLookup = parentNeedsNameLookup(input.parent ?? null)
    const enterpriseData = new EnterpriseDataManager(auth)
    const response = await enterpriseData.getData(ADD_NODE_INCLUDES)
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
    const byLowerName = buildNodesByLowerName(nodes)

    const treeKey = await enterpriseData.getTreeKey()
    if (!treeKey) {
        throw new KeeperSdkError(
            'Enterprise tree key is unavailable. The current user may not have permission to administer nodes.',
            ResultCodes.ENTERPRISE_TREE_KEY_UNAVAILABLE
        )
    }

    const items: AddNodeItemResult[] = []
    const seen = new Set<string>()

    for (const raw of names) {
        const lower = raw.toLowerCase()
        if (seen.has(lower)) continue
        seen.add(lower)

        const conflicts = (byLowerName.get(lower) || []).filter((n) => n.parent_id === parentNodeId)
        if (conflicts.length > 0) {
            items.push({
                nodeId: conflicts[0]!.node_id,
                nodeName: nodeDisplayName(conflicts[0]!),
                parentId: parentNodeId,
                status: AddNodeStatus.Skipped,
                skipReason: AddNodeSkipReason.AlreadyExistsInParent,
                message: `Node "${raw}" already exists under parent ${parentNodeId}.`,
            })
            continue
        }

        try {
            const nodeId = await allocateNodeId(auth)
            const encryptedData = await encryptObjectForStorage({ displayname: raw }, treeKey)
            await sendNodeAdd(auth, {
                node_id: nodeId,
                parent_id: parentNodeId,
                encrypted_data: encryptedData,
            })
            items.push({
                nodeId,
                nodeName: raw,
                parentId: parentNodeId,
                status: AddNodeStatus.Created,
            })
        } catch (err) {
            items.push({
                nodeId: 0,
                nodeName: raw,
                parentId: parentNodeId,
                status: AddNodeStatus.Failed,
                message: extractErrorMessage(err),
            })
        }
    }

    const created = items.filter((i) => i.status === AddNodeStatus.Created).length
    const skipped = items.filter((i) => i.status === AddNodeStatus.Skipped).length
    const failed = items.filter((i) => i.status === AddNodeStatus.Failed).length
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

async function allocateNodeId(auth: Auth): Promise<number> {
    const response = await auth.executeRestCommand(enterpriseAllocateIdsCommand({ number_requested: 1 }))
    assertCommandSucceeded(response, 'enterprise_allocate_ids failed', ResultCodes.NODE_ADD_FAILED)
    const baseId = Number((response as { base_id?: number }).base_id)
    if (!Number.isFinite(baseId) || baseId <= 0) {
        throw new KeeperSdkError('Failed to allocate node ID.', ResultCodes.NODE_ADD_FAILED)
    }
    return baseId
}

async function sendNodeAdd(auth: Auth, payload: NodeEditRequest): Promise<void> {
    const command: RestCommand<NodeEditRequest, KeeperResponse> = {
        baseRequest: { command: NODE_ADD_COMMAND },
        request: payload,
        authorization: {},
    }
    const response = await auth.executeRestCommand(command)
    assertCommandSucceeded(response, `node_add failed for node_id=${payload.node_id}`, ResultCodes.NODE_ADD_FAILED)
}

export function formatAddNodeResult(result: AddNodeResult): FormattedAddNodeTable {
    const rows = result.items.map((item, index) => [
        String(index + 1),
        item.status,
        item.nodeName,
        item.nodeId ? String(item.nodeId) : '',
        String(item.parentId),
        item.message || item.skipReason || '',
    ])
    return {
        headers: [...NODE_TABLE_HEADERS],
        rows,
        parentNodeName: result.parentNodeName,
        summary: `Created: ${result.created}  Skipped: ${result.skipped}  Failed: ${result.failed}`,
    }
}

export function renderAddNodeAsciiTable(table: FormattedAddNodeTable): string {
    return `Parent: ${table.parentNodeName}\n${renderNodeResultTable(table.headers, table.rows, table.summary)}`
}

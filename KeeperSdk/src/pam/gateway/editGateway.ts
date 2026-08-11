import type { Auth } from '@keeper-security/keeperapi'
import { modifyControllerMessage, normal64Bytes } from '@keeper-security/keeperapi'
import { EnterpriseDataInclude, EnterpriseDataManager } from '../../teams/enterpriseData'
import { applyDecryptedNodeNames, resolveParentNode } from '../../teams/teamUtils'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import {
    fetchEnterprisePamControllers,
    requireEnterpriseGatewayByUidOrName,
    toFiniteNumber,
    webSafeUidFromBytes,
} from './gatewayHelpers'
import type { EditGatewayInput, EditGatewayResult } from './gatewayTypes'

function hasNodeArgument(nodeIdOrName: EditGatewayInput['nodeIdOrName']): boolean {
    return (
        nodeIdOrName !== undefined &&
        nodeIdOrName !== null &&
        !(typeof nodeIdOrName === 'string' && nodeIdOrName.trim() === '')
    )
}

async function resolveEnterpriseNodeId(auth: Auth, nodeIdOrName: string | number): Promise<number> {
    try {
        const enterpriseData = new EnterpriseDataManager(auth)
        const [response, displayNames] = await Promise.all([
            enterpriseData.getData([EnterpriseDataInclude.Nodes]),
            enterpriseData.getDisplayNames(),
        ])
        const nodes = response.nodes || []
        applyDecryptedNodeNames(nodes, displayNames.nodes)
        return resolveParentNode(nodes, nodeIdOrName).node_id
    } catch (err) {
        if (err instanceof KeeperSdkError) {
            if (err.resultCode === ResultCodes.PARENT_NODE_NOT_FOUND) {
                throw new KeeperSdkError(err.message, ResultCodes.PAM_GATEWAY_NODE_NOT_FOUND)
            }
            if (err.resultCode === ResultCodes.MULTIPLE_PARENT_NODE_MATCHES) {
                throw new KeeperSdkError(err.message, ResultCodes.PAM_MULTIPLE_GATEWAY_NODE_MATCHES)
            }
            throw err
        }
        throw new KeeperSdkError(
            `Failed to resolve enterprise node: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_GATEWAY_EDIT_FAILED
        )
    }
}

function buildEditResult(
    partial: Omit<EditGatewayResult, 'success' | 'message'> & { unchanged?: boolean }
): EditGatewayResult {
    const { unchanged, ...rest } = partial
    return {
        success: true,
        ...rest,
        message: unchanged ? `Gateway ${rest.gatewayUid} is unchanged.` : `Gateway ${rest.gatewayUid} has been edited.`,
    }
}

export async function editGateway(auth: Auth, input: EditGatewayInput): Promise<EditGatewayResult> {
    const gatewayUidOrName = input.gatewayUidOrName?.trim() || ''
    if (!gatewayUidOrName) {
        throw new KeeperSdkError('Gateway UID or name is required.', ResultCodes.PAM_GATEWAY_REQUIRED)
    }

    const newNameRaw = input.name == null ? '' : String(input.name).trim()
    const hasName = newNameRaw.length > 0
    const hasNode = hasNodeArgument(input.nodeIdOrName)

    if (!hasName && !hasNode) {
        throw new KeeperSdkError(
            'Nothing to do. At least one of name or nodeIdOrName is required.',
            ResultCodes.PAM_GATEWAY_EDIT_NOTHING_TO_DO
        )
    }

    const controllers = await fetchEnterprisePamControllers(auth, ResultCodes.PAM_GATEWAY_EDIT_FAILED)
    const gateway = requireEnterpriseGatewayByUidOrName(controllers, gatewayUidOrName)

    const gatewayUid = webSafeUidFromBytes(gateway.controllerUid)
    const previousName = gateway.controllerName || ''
    const previousNodeId = toFiniteNumber(gateway.nodeId)
    const gatewayName = hasName ? newNameRaw : previousName
    const nodeId = hasNode ? await resolveEnterpriseNodeId(auth, input.nodeIdOrName as string | number) : previousNodeId

    const nameChanged = gatewayName !== previousName
    const nodeChanged = nodeId !== previousNodeId
    if (!nameChanged && !nodeChanged) {
        return buildEditResult({
            gatewayUid,
            previousName,
            gatewayName,
            previousNodeId,
            nodeId,
            nameChanged: false,
            nodeChanged: false,
            unchanged: true,
        })
    }

    try {
        await auth.executeRestAction(
            modifyControllerMessage({
                controllerUid: normal64Bytes(gatewayUid),
                controllerName: gatewayName,
                nodeId,
            })
        )
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to edit gateway: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_GATEWAY_EDIT_FAILED
        )
    }

    return buildEditResult({
        gatewayUid,
        previousName,
        gatewayName,
        previousNodeId,
        nodeId,
        nameChanged,
        nodeChanged,
    })
}

export function formatEditGatewayOutput(result: EditGatewayResult): string {
    return [
        result.message,
        result.nameChanged
            ? `Name: ${result.previousName || '(none)'} → ${result.gatewayName}`
            : `Name: ${result.gatewayName}`,
        result.nodeChanged ? `Node ID: ${result.previousNodeId} → ${result.nodeId}` : `Node ID: ${result.nodeId}`,
    ].join('\n')
}

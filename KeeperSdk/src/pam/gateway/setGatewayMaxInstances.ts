import type { Auth } from '@keeper-security/keeperapi'
import { setControllerMaxInstanceCountMessage } from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import {
    fetchEnterprisePamControllers,
    requireEnterpriseGatewayByUidOrName,
    webSafeUidFromBytes,
} from './gatewayHelpers'
import type { SetGatewayMaxInstancesInput, SetGatewayMaxInstancesResult } from './gatewayTypes'

export async function setGatewayMaxInstances(
    auth: Auth,
    input: SetGatewayMaxInstancesInput
): Promise<SetGatewayMaxInstancesResult> {
    const gatewayUidOrName = input.gatewayUidOrName?.trim() || ''
    if (!gatewayUidOrName) {
        throw new KeeperSdkError('Gateway UID or name is required.', ResultCodes.PAM_GATEWAY_REQUIRED)
    }

    const maxInstances = Number(input.maxInstances)
    if (!Number.isFinite(maxInstances) || maxInstances < 1) {
        throw new KeeperSdkError('--max-instances must be at least 1', ResultCodes.PAM_GATEWAY_INVALID_MAX_INSTANCES)
    }
    const maxInstanceCount = Math.floor(maxInstances)

    const controllers = await fetchEnterprisePamControllers(auth, ResultCodes.PAM_GATEWAY_SET_MAX_INSTANCES_FAILED)
    const gateway = requireEnterpriseGatewayByUidOrName(controllers, gatewayUidOrName)
    const gatewayUid = webSafeUidFromBytes(gateway.controllerUid)
    const gatewayName = gateway.controllerName || gatewayUid

    try {
        await auth.executeRestAction(
            setControllerMaxInstanceCountMessage({
                controllerUid: gateway.controllerUid,
                maxInstanceCount,
            })
        )
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to set max instances: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_GATEWAY_SET_MAX_INSTANCES_FAILED
        )
    }

    return {
        success: true,
        gatewayUid,
        gatewayName,
        maxInstances: maxInstanceCount,
        message: `${gatewayName}: max instance count set to ${maxInstanceCount}`,
    }
}

export function formatSetGatewayMaxInstancesOutput(result: SetGatewayMaxInstancesResult): string {
    return result.message
}

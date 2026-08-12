import type { Auth } from '@keeper-security/keeperapi'
import { setControllerMaxInstanceCountMessage } from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import { MAX_GATEWAY_MAX_INSTANCES, MIN_GATEWAY_MAX_INSTANCES } from './gatewayConstants'
import {
    fetchEnterprisePamControllers,
    requireEnterpriseGatewayByUidOrName,
    webSafeUidFromBytes,
} from './gatewayHelpers'
import type { SetGatewayMaxInstancesInput, SetGatewayMaxInstancesResult } from './gatewayTypes'

function resolveMaxInstances(raw: number): number {
    if (typeof raw !== 'number' || !Number.isFinite(raw) || !Number.isInteger(raw)) {
        throw new KeeperSdkError(
            `maxInstances must be an integer between ${MIN_GATEWAY_MAX_INSTANCES} and ${MAX_GATEWAY_MAX_INSTANCES}.`,
            ResultCodes.PAM_GATEWAY_INVALID_MAX_INSTANCES
        )
    }
    if (raw < MIN_GATEWAY_MAX_INSTANCES || raw > MAX_GATEWAY_MAX_INSTANCES) {
        throw new KeeperSdkError(
            `maxInstances must be an integer between ${MIN_GATEWAY_MAX_INSTANCES} and ${MAX_GATEWAY_MAX_INSTANCES}.`,
            ResultCodes.PAM_GATEWAY_INVALID_MAX_INSTANCES
        )
    }
    return raw
}

export async function setGatewayMaxInstances(
    auth: Auth,
    input: SetGatewayMaxInstancesInput
): Promise<SetGatewayMaxInstancesResult> {
    const gatewayUidOrName = input.gatewayUidOrName?.trim() || ''
    if (!gatewayUidOrName) {
        throw new KeeperSdkError('Gateway UID or name is required.', ResultCodes.PAM_GATEWAY_REQUIRED)
    }

    const maxInstanceCount = resolveMaxInstances(input.maxInstances)

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
    }
}

import type { Auth } from '@keeper-security/keeperapi'
import { removeControllerMessage } from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import {
    controllerUidsEqual,
    fetchEnterprisePamControllers,
    requireEnterpriseGatewayByUidOrName,
    webSafeUidFromBytes,
} from './gatewayHelpers'
import type { RemoveGatewayInput, RemoveGatewayResult } from './gatewayTypes'

export async function removeGateway(auth: Auth, input: RemoveGatewayInput): Promise<RemoveGatewayResult> {
    const gatewayUidOrName = input.gatewayUidOrName?.trim() || ''
    if (!gatewayUidOrName) {
        throw new KeeperSdkError('Gateway UID or name is required.', ResultCodes.PAM_GATEWAY_REQUIRED)
    }

    const controllers = await fetchEnterprisePamControllers(auth, ResultCodes.PAM_GATEWAY_REMOVE_FAILED)
    const gateway = requireEnterpriseGatewayByUidOrName(controllers, gatewayUidOrName)
    const gatewayUid = webSafeUidFromBytes(gateway.controllerUid)
    const gatewayName = gateway.controllerName || gatewayUid
    const controllerUidBytes = gateway.controllerUid

    try {
        const response = await auth.executeRest(removeControllerMessage({ uid: controllerUidBytes }))
        // PAMRemoveControllerResponse.controllers holds per-controller failure details.
        // Empty list / matching entry without a message ⇒ success; non-empty message ⇒ failure.
        const failureEntry = (response.controllers ?? []).find(
            (entry) =>
                controllerUidsEqual(entry.controllerUid, controllerUidBytes) &&
                typeof entry.message === 'string' &&
                entry.message.trim().length > 0
        )
        if (failureEntry) {
            throw new KeeperSdkError(failureEntry.message.trim(), ResultCodes.PAM_GATEWAY_REMOVE_FAILED)
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to remove gateway: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_GATEWAY_REMOVE_FAILED
        )
    }

    return {
        success: true,
        gatewayUid,
        gatewayName,
    }
}

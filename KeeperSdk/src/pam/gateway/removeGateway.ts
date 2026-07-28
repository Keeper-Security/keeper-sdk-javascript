import type { Auth } from '@keeper-security/keeperapi'
import { removeControllerMessage } from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import {
    controllerUidsEqual,
    fetchEnterprisePamControllers,
    findEnterpriseGatewayByUidOrName,
    webSafeUidFromBytes,
} from './gatewayHelpers'
import type { RemoveGatewayInput, RemoveGatewayResult } from './gatewayTypes'

export async function removeGateway(auth: Auth, input: RemoveGatewayInput): Promise<RemoveGatewayResult> {
    const gatewayUidOrName = input.gatewayUidOrName?.trim() || ''
    if (!gatewayUidOrName) {
        throw new KeeperSdkError('Gateway UID or name is required.', ResultCodes.PAM_GATEWAY_REQUIRED)
    }

    const controllers = await fetchEnterprisePamControllers(auth, ResultCodes.PAM_GATEWAY_REMOVE_FAILED)
    const gateway = findEnterpriseGatewayByUidOrName(controllers, gatewayUidOrName)
    if (!gateway?.controllerUid?.length) {
        return {
            success: false,
            found: false,
            message: `Gateway ${gatewayUidOrName} not found`,
        }
    }

    const gatewayUid = webSafeUidFromBytes(gateway.controllerUid)
    const gatewayName = gateway.controllerName || gatewayUid
    const controllerUidBytes = gateway.controllerUid

    try {
        const response = await auth.executeRest(removeControllerMessage({ uid: controllerUidBytes }))
        const errorEntry = (response.controllers ?? []).find((entry) =>
            controllerUidsEqual(entry.controllerUid, controllerUidBytes)
        )
        if (errorEntry) {
            throw new KeeperSdkError(
                errorEntry.message || `Failed to remove gateway ${gatewayName}.`,
                ResultCodes.PAM_GATEWAY_REMOVE_FAILED
            )
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
        found: true,
        gatewayUid,
        gatewayName,
        message: `Gateway ${gatewayName} has been removed.`,
    }
}

export function formatRemoveGatewayOutput(result: RemoveGatewayResult): string {
    return result.message
}

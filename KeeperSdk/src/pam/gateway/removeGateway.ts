import type { Auth } from '@keeper-security/keeperapi'
import { removeControllerMessage } from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import {
    controllerUidsEqual,
    fetchEnterprisePamControllers,
    findEnterpriseGatewayByUidOrName,
    webSafeUidFromBytes,
} from './gatewayHelpers'
import type { RemoveGatewayInput, RemoveGatewayResult, RemovedGateway } from './gatewayTypes'

function collectGatewayUidOrNames(input: RemoveGatewayInput): string[] {
    const raw = input.gatewayUidOrName
    const values = Array.isArray(raw) ? raw : raw != null ? [raw] : []
    const seen = new Set<string>()
    const collected: string[] = []
    for (const value of values) {
        if (typeof value !== 'string') continue
        const parts = value.includes(',')
            ? value.split(',').map((entry) => entry.trim()).filter(Boolean)
            : [value.trim()].filter(Boolean)
        for (const trimmed of parts) {
            const key = trimmed
            if (seen.has(key)) continue
            seen.add(key)
            collected.push(trimmed)
        }
    }
    return collected
}

export async function removeGateway(auth: Auth, input: RemoveGatewayInput): Promise<RemoveGatewayResult> {
    const identifiers = collectGatewayUidOrNames(input)
    if (!identifiers.length) {
        throw new KeeperSdkError('Gateway UID or name is required.', ResultCodes.PAM_GATEWAY_REQUIRED)
    }

    const controllers = await fetchEnterprisePamControllers(auth, ResultCodes.PAM_GATEWAY_REMOVE_FAILED)
    const missing: string[] = []
    const resolved: RemovedGateway[] = []
    const controllerUids: Uint8Array[] = []
    const seenUids = new Set<string>()

    for (const identifier of identifiers) {
        const gateway = findEnterpriseGatewayByUidOrName(controllers, identifier)
        if (!gateway?.controllerUid?.length) {
            missing.push(identifier)
            continue
        }
        const gatewayUid = webSafeUidFromBytes(gateway.controllerUid)
        if (seenUids.has(gatewayUid)) continue
        seenUids.add(gatewayUid)
        resolved.push({
            gatewayUid,
            gatewayName: gateway.controllerName || gatewayUid,
        })
        controllerUids.push(gateway.controllerUid)
    }

    if (missing.length) {
        const message =
            missing.length === 1
                ? `Gateway "${missing[0]}" not found.`
                : `Gateway(s) not found: ${missing.map((name) => `"${name}"`).join(', ')}.`
        throw new KeeperSdkError(message, ResultCodes.PAM_GATEWAY_NOT_FOUND)
    }

    try {
        const response = await auth.executeRest(removeControllerMessage({ uids: controllerUids }))
        const failures = (response.controllers ?? []).filter(
            (entry) => typeof entry.message === 'string' && entry.message.trim().length > 0
        )
        if (failures.length) {
            const details = failures.map((entry) => {
                const index = controllerUids.findIndex((uid) => controllerUidsEqual(uid, entry.controllerUid))
                const label = (index >= 0 ? resolved[index]?.gatewayName : '') || webSafeUidFromBytes(entry.controllerUid)
                return `${label}: ${entry.message!.trim()}`
            })
            throw new KeeperSdkError(
                details.length === 1 ? details[0] : `Failed to remove gateway(s): ${details.join('; ')}`,
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
        gatewayUid: resolved[0].gatewayUid,
        gatewayName: resolved[0].gatewayName,
        gateways: resolved,
    }
}

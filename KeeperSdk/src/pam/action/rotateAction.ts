import type { Auth } from '@keeper-security/keeperapi'
import {
    getConfigurationControllerMessage,
    getRecordRotationInfoMessage,
    pamGetOnlineControllersMessage,
    sendControllerMessage,
    normal64Bytes,
    webSafe64FromBytes,
    PAM as PamProto,
    Router,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../../utils'
import {
    createRotateActionPayload,
    encryptRotationPasswordComplexity,
    getCachedRotation,
    getPamRecord,
    getRotationUids,
    isGatewayConnected,
    isPamUserRecord,
    parseRotateResponse,
    resolvePamActionRecordUids,
    requireRotateTarget,
} from './actionHelpers'
import { PAM_ACTION_ROTATE_TIMEOUT } from './actionConstants'
import type { PamActionRotateInput, PamActionRotateRecordResult, PamActionRotateResult } from './rotateActionTypes'

export async function rotatePamRecord(
    auth: Auth,
    storage: InMemoryStorage,
    recordUid: string,
    timeout: number,
    dryRun: boolean
): Promise<PamActionRotateRecordResult> {
    const record = getPamRecord(storage, recordUid)
    if (!isPamUserRecord(record)) {
        return { recordUid, status: 'skipped', message: `Record "${recordUid}" is not a typed pamUser record.` }
    }

    const recordKey = await storage.getKeyBytes(recordUid)
    if (!recordKey) {
        return { recordUid, status: 'failed', message: 'Record key is not available. Sync the vault first.' }
    }

    const liveInfo = await auth.executeRest(getRecordRotationInfoMessage({ uid: normal64Bytes(recordUid) }))
    if (liveInfo.disabled || liveInfo.status === Router.RouterRotationStatus.RRS_NO_ROTATION) {
        return { recordUid, status: 'skipped', message: 'Rotation is disabled for this record.' }
    }

    const { configurationUid, resourceUid } = getRotationUids(liveInfo, getCachedRotation(storage, recordUid))
    if (!configurationUid) {
        return { recordUid, status: 'skipped', message: 'Rotation configuration was not found.' }
    }
    if (!resourceUid) {
        return { recordUid, status: 'skipped', message: 'Rotation resource was not found.' }
    }

    const controller = await auth.executeRest(
        getConfigurationControllerMessage({ uid: normal64Bytes(configurationUid) })
    )
    const gatewayUid = webSafe64FromBytes(controller.controllerUid || new Uint8Array())
    if (!gatewayUid) {
        return { recordUid, status: 'skipped', message: 'Gateway UID was not found for the rotation configuration.' }
    }

    const online = await auth.executeRouterRest(pamGetOnlineControllersMessage())
    if (!isGatewayConnected(online, gatewayUid)) {
        return { recordUid, status: 'skipped', gatewayUid, message: `Gateway "${gatewayUid}" is not connected.` }
    }

    const action = createRotateActionPayload({
        recordUid,
        configurationUid,
        resourceUid,
        gatewayUid,
        pwdComplexity: await encryptRotationPasswordComplexity(recordKey, liveInfo),
    })
    if (dryRun) {
        return { recordUid, status: 'dry-run', gatewayUid, conversationId: action.payload.conversationId }
    }

    action.message.messageType = PamProto.ControllerMessageType.CMT_ROTATE
    action.message.timeout = timeout
    const response = await auth.executeRouterRest(sendControllerMessage(action.message))
    return {
        recordUid,
        status: 'submitted',
        gatewayUid,
        conversationId: action.payload.conversationId,
        response: parseRotateResponse(response.payload),
    }
}

export async function rotatePamAction(
    auth: Auth,
    storage: InMemoryStorage,
    input: PamActionRotateInput
): Promise<PamActionRotateResult> {
    const target = requireRotateTarget(input)
    if (input.sendEmail && !input.emailConfig) {
        throw new Error('--send-email requires --email-config.')
    }
    if (input.emailMessage && !input.sendEmail) {
        throw new Error('--email-message requires --send-email.')
    }
    if (input.selfDestruct || input.emailConfig || input.sendEmail || input.emailMessage) {
        throw new KeeperSdkError(
            'Post-rotation email and self-destruct sharing are not supported by this SDK yet. ' +
                'The core gateway rotation action is supported.',
            ResultCodes.PAM_ROTATE_POST_PROCESSING_UNSUPPORTED
        )
    }
    const recordUids = target.recordUid
        ? [target.recordUid]
        : await resolvePamActionRecordUids(storage, target.folder!, input.recursive !== false)
    const records: PamActionRotateRecordResult[] = []
    for (const recordUid of recordUids) {
        try {
            records.push(
                await rotatePamRecord(auth, storage, recordUid, input.timeout ?? PAM_ACTION_ROTATE_TIMEOUT, !!input.dryRun)
            )
        } catch (error) {
            records.push({ recordUid, status: 'failed', message: error instanceof Error ? error.message : String(error) })
        }
    }
    return {
        dryRun: !!input.dryRun,
        records,
        warnings: recordUids.length === 0 ? ['No typed pamUser records were found in the selected folder.'] : [],
    }
}

export const pamActionRotate = rotatePamAction

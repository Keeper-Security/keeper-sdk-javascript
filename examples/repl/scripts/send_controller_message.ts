import type { KeeperVault } from '@keeper-security/keeper-sdk-javascript'
import { logger, extractErrorMessage } from '@keeper-security/keeper-sdk-javascript'
import { PAM, sendControllerMessage, generateUidBytes, normal64Bytes } from '@keeper-security/keeperapi'

function tryParseJson(text: string): unknown {
    try {
        return JSON.parse(text)
    } catch {
        return undefined
    }
}

// The gateway's reply nests its actual response as a JSON-encoded string in an inner "payload" field
// (e.g. { conversationId, payload: "{...}", status, type }) -- unwrap that one level so it doesn't
// print as an escaped string blob.
function parseNestedJson(text: string): unknown {
    const parsed = tryParseJson(text)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        const inner = (parsed as Record<string, unknown>).payload
        if (typeof inner === 'string') {
            const innerParsed = tryParseJson(inner)
            if (innerParsed !== undefined) {
                return { ...parsed, payload: innerParsed }
            }
        }
    }
    return parsed !== undefined ? parsed : text
}

export default async function sendControllerMessageScript(vault: KeeperVault, args: string[]): Promise<void> {
    const [controllerUidStr, action = 'gateway-info'] = args
    if (!controllerUidStr) {
        logger.warn('Usage: run scripts/send_controller_message.ts <gateway-uid> [action]')
        return
    }

    // GENERAL messages forward { action, inputs } to the gateway untouched; "gateway-info" is a safe,
    // read-only command to demo with. controllerUid is required for GENERAL (only ROTATE/CONNECT can omit it).
    const payload = Buffer.from(JSON.stringify({ action, inputs: {} }), 'utf8')

    const message = sendControllerMessage({
        messageType: PAM.ControllerMessageType.CMT_GENERAL,
        messageUid: generateUidBytes(),
        controllerUid: normal64Bytes(controllerUidStr),
        streamResponse: false,
        payload,
        timeout: 10000,
    })

    try {
        const response = await vault.getAuth().executeRouterRest(message)
        if (!response.payload) {
            logger.info('(empty response)')
            return
        }
        logger.info(JSON.stringify(parseNestedJson(response.payload), null, 2))
    } catch (err) {
        logger.warn(`send_controller_message failed: ${extractErrorMessage(err)}`)
    }
}

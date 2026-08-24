import type { KeeperVault } from '@keeper-security/keeper-sdk-javascript'
import {
    getKeeperRouterBaseUrl,
    webSafeUidFromBytes,
    formatTimestampMs,
    isKeeperRouterConnectionError,
    logger,
    extractErrorMessage,
} from '@keeper-security/keeper-sdk-javascript'
import { pamGetOnlineControllersMessage } from '@keeper-security/keeperapi'

export default async function getOnlineControllers(vault: KeeperVault): Promise<void> {
    const routerHost = getKeeperRouterBaseUrl(vault.host)
    try {
        const response = await vault.getAuth().executeRouterRest(pamGetOnlineControllersMessage())
        const controllers = response.controllers ?? []
        if (controllers.length === 0) {
            logger.info('No online controllers found.')
            return
        }
        for (const controller of controllers) {
            const uid = webSafeUidFromBytes(controller.controllerUid)
            logger.info(
                `  uid=${uid}  ip=${controller.ipAddress || ''}  version=${controller.version || ''}  connectedOn=${formatTimestampMs(controller.connectedOn)}`
            )
        }
    } catch (err) {
        if (isKeeperRouterConnectionError(err)) {
            logger.warn(`Router appears to be down. Router URL [${routerHost}]`)
            return
        }
        logger.warn(extractErrorMessage(err))
    }
}

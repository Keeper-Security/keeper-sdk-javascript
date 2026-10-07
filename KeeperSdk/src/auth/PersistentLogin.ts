import {
    platform,
    registerEncryptedDataKeyForDeviceMessage,
    setUserSettingMessage,
    updateDeviceMessage,
    type Auth,
} from '@keeper-security/keeperapi'
import { extractResultCode } from '../utils'

export const DEFAULT_PERSISTENT_LOGIN_TIMEOUT_MINUTES = 30 * 24 * 60

function ensureDeviceConfig(auth: Auth) {
    const deviceConfig = auth.options.deviceConfig
    if (!deviceConfig.deviceToken) throw new Error('Device token is missing')
    return deviceConfig
}

async function ensureDevicePublicKey(auth: Auth): Promise<void> {
    const deviceConfig = ensureDeviceConfig(auth)
    if (deviceConfig.publicKey) return

    const keyPair = await platform.generateECKeyPair()
    deviceConfig.privateKey = keyPair.privateKey
    deviceConfig.publicKey = keyPair.publicKey

    await auth.executeRestAction(
        updateDeviceMessage({
            encryptedDeviceToken: deviceConfig.deviceToken,
            clientVersion: auth.clientVersion,
            deviceName: deviceConfig.deviceName,
            devicePublicKey: deviceConfig.publicKey,
        })
    )

    await auth.options.onDeviceConfig?.(deviceConfig, auth.options.host)
}

async function registerDataKeyForDevice(auth: Auth): Promise<void> {
    if (!auth.dataKey) throw new Error('Data Key is missing')
    const deviceConfig = ensureDeviceConfig(auth)
    if (!deviceConfig.publicKey) throw new Error('Device public key is missing')

    const encryptedDeviceDataKey = await platform.publicEncryptEC(auth.dataKey, deviceConfig.publicKey)
    try {
        await auth.executeRestAction(
            registerEncryptedDataKeyForDeviceMessage({
                encryptedDeviceToken: deviceConfig.deviceToken,
                encryptedDeviceDataKey,
            })
        )
    } catch (error) {
        if (extractResultCode(error) !== 'device_data_key_exists') throw error
    }
}

export async function setPersistentLogin(
    auth: Auth,
    enabled: boolean,
    logoutTimerMinutes = DEFAULT_PERSISTENT_LOGIN_TIMEOUT_MINUTES
): Promise<void> {
    if (enabled) await ensureDevicePublicKey(auth)

    await auth.executeRestAction(setUserSettingMessage({ setting: 'persistent_login', value: enabled ? '1' : '0' }))
    if (enabled) {
        await registerDataKeyForDevice(auth)
        await auth.executeRestAction(
            setUserSettingMessage({ setting: 'logout_timer', value: String(logoutTimerMinutes) })
        )
    }
}

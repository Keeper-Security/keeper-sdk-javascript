import type { Auth } from '@keeper-security/keeperapi'
import {
    Enterprise,
    addAppClientMessage,
    normal64Bytes,
    platform,
    webSafe64FromBytes,
} from '@keeper-security/keeperapi'
import type { KeyValueStorage } from '@keeper-security/secrets-manager-core'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import {
    DEFAULT_GATEWAY_TOKEN_EXPIRES_IN_MIN,
    KSM_CLIENT_ID_MESSAGE,
    MAX_GATEWAY_TOKEN_EXPIRES_IN_MIN,
} from './gatewayConstants'
import { formatGatewayOneTimeToken, resolveKsmApplication } from './gatewayHelpers'
import {
    GatewayConfigInitFormat,
    type CreateGatewayInput,
    type CreateGatewayResult,
    type GatewayConfigInitFormatInput,
} from './gatewayTypes'

type SecretsManagerStorage = KeyValueStorage & {
    getStringSync?: (key: string) => string | undefined
    saveStringSync?: (key: string, value: string) => void
    snapshot: () => Record<string, string>
}

function toUint8Array(value: Uint8Array | ArrayBuffer | ArrayBufferView): Uint8Array {
    if (value instanceof Uint8Array) return value
    if (ArrayBuffer.isView(value)) {
        return new Uint8Array(value.buffer, value.byteOffset, value.byteLength)
    }
    return new Uint8Array(value)
}

function toBufferSource(bytes: Uint8Array): ArrayBuffer {
    const copy = new Uint8Array(bytes.byteLength)
    copy.set(bytes)
    return copy.buffer
}

async function hmacSha512(key: Uint8Array, message: string): Promise<Uint8Array> {
    const subtle = globalThis.crypto?.subtle
    if (!subtle) {
        throw new KeeperSdkError(
            'Web Crypto API is unavailable; cannot derive gateway client ID.',
            ResultCodes.PAM_GATEWAY_CREATE_FAILED
        )
    }
    const cryptoKey = await subtle.importKey('raw', toBufferSource(key), { name: 'HMAC', hash: 'SHA-512' }, false, [
        'sign',
    ])
    const signature = await subtle.sign('HMAC', cryptoKey, toBufferSource(platform.stringToBytes(message)))
    return new Uint8Array(signature)
}

function createSecretsManagerStorage(): SecretsManagerStorage {
    const map = new Map<string, string>()
    return {
        async getString(key) {
            return map.get(key)
        },
        async saveString(key, value) {
            map.set(key, value)
        },
        async getBytes(key) {
            const value = map.get(key)
            return value == null ? undefined : platform.base64ToBytes(value)
        },
        async saveBytes(key, value) {
            map.set(key, platform.bytesToBase64(toUint8Array(value)))
        },
        async delete(key) {
            map.delete(String(key))
        },
        getStringSync(key) {
            return map.get(key)
        },
        saveStringSync(key, value) {
            map.set(key, value)
        },
        snapshot() {
            return Object.fromEntries(map)
        },
    }
}

function normalizeConfigInit(input?: GatewayConfigInitFormatInput): GatewayConfigInitFormat | undefined {
    if (!input) return undefined
    const value = String(input).toLowerCase()
    if (value === GatewayConfigInitFormat.Json) return GatewayConfigInitFormat.Json
    if (value === GatewayConfigInitFormat.B64) return GatewayConfigInitFormat.B64
    throw new KeeperSdkError(
        `Invalid configInit '${input}'. Use 'json' or 'b64'.`,
        ResultCodes.PAM_GATEWAY_CREATE_FAILED
    )
}

function resolveTokenExpiresInMin(raw: number | undefined): number {
    const value = raw == null ? DEFAULT_GATEWAY_TOKEN_EXPIRES_IN_MIN : Number(raw)
    if (!Number.isFinite(value) || value <= 0 || value > MAX_GATEWAY_TOKEN_EXPIRES_IN_MIN) {
        throw new KeeperSdkError(
            `tokenExpiresInMin must be between 1 and ${MAX_GATEWAY_TOKEN_EXPIRES_IN_MIN} minutes.`,
            ResultCodes.PAM_INVALID_TOKEN_EXPIRY
        )
    }
    return Math.floor(value)
}

function snapshotValue(snapshot: Record<string, string>, camel: string, upper: string, fallback = ''): string {
    return snapshot[camel] || snapshot[upper] || fallback
}

async function initKsmConfigFromToken(
    oneTimeToken: string,
    host: string,
    format: GatewayConfigInitFormat
): Promise<string> {
    const { getSecrets, initializeStorage } = await import('@keeper-security/secrets-manager-core')
    const storage = createSecretsManagerStorage()
    try {
        await initializeStorage(storage, oneTimeToken, host)
        try {
            await getSecrets({ storage })
        } catch {}
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to initialize KSM config: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_CONFIG_INIT_FAILED
        )
    }

    const snapshot = storage.snapshot()
    const configDict: Record<string, string> = {
        hostname: snapshotValue(snapshot, 'hostname', 'HOSTNAME', host),
        clientId: snapshotValue(snapshot, 'clientId', 'CLIENT_ID'),
        privateKey: snapshotValue(snapshot, 'privateKey', 'PRIVATE_KEY'),
        serverPublicKeyId: snapshotValue(snapshot, 'serverPublicKeyId', 'SERVER_PUBLIC_KEY_ID'),
        appKey: snapshotValue(snapshot, 'appKey', 'APP_KEY'),
    }
    const ownerPublicKey = snapshotValue(snapshot, 'ownerPublicKey', 'OWNER_PUBLIC_KEY')
    if (ownerPublicKey) configDict.ownerPublicKey = ownerPublicKey

    for (const key of ['hostname', 'clientId', 'privateKey', 'serverPublicKeyId', 'appKey'] as const) {
        if (!configDict[key]) {
            throw new KeeperSdkError(
                `Generated KSM config is invalid: "${key}" is missing or empty.`,
                ResultCodes.PAM_CONFIG_INIT_FAILED
            )
        }
    }

    const json = JSON.stringify(configDict)
    return format === GatewayConfigInitFormat.B64 ? platform.bytesToBase64(platform.stringToBytes(json)) : json
}

export async function createGateway(
    auth: Auth,
    storage: InMemoryStorage,
    input: CreateGatewayInput
): Promise<CreateGatewayResult> {
    const gatewayName = input.name.trim() || ''
    if (!gatewayName) {
        throw new KeeperSdkError('Gateway name is required.', ResultCodes.PAM_GATEWAY_NAME_REQUIRED)
    }

    const application = input.application.trim() || ''
    if (!application) {
        throw new KeeperSdkError('KSM application name or UID is required.', ResultCodes.PAM_KSM_APP_REQUIRED)
    }

    const tokenExpiresInMin = resolveTokenExpiresInMin(input.tokenExpiresInMin)
    const configInit = normalizeConfigInit(input.configInit)
    const app = await resolveKsmApplication(storage, application)

    const secretBytes = platform.getRandomBytes(32)
    const clientId = await hmacSha512(secretBytes, KSM_CLIENT_ID_MESSAGE)
    const encryptedAppKey = await platform.aesGcmEncrypt(app.recordKey, secretBytes)
    const firstAccessExpireOn = Date.now() + tokenExpiresInMin * 60 * 1000

    try {
        const device = await auth.executeRest(
            addAppClientMessage({
                appRecordUid: normal64Bytes(app.uid),
                encryptedAppKey,
                clientId,
                lockIp: false,
                firstAccessExpireOn,
                id: gatewayName,
                appClientType: Enterprise.AppClientType.DISCOVERY_AND_ROTATION_CONTROLLER,
            })
        )

        const host = String(auth.options.host || '')
        const oneTimeToken = formatGatewayOneTimeToken(host, secretBytes)
        const deviceToken =
            device.encryptedDeviceToken && device.encryptedDeviceToken.length > 0
                ? webSafe64FromBytes(device.encryptedDeviceToken)
                : undefined

        const warnings: string[] = []
        let tokenOrConfig = oneTimeToken
        let isInitializedConfig = false

        if (configInit != null) {
            try {
                tokenOrConfig = await initKsmConfigFromToken(oneTimeToken, host, configInit)
                isInitializedConfig = true
            } catch (err) {
                warnings.push(
                    `Created gateway client but failed to initialize KSM config: ${extractErrorMessage(
                        err
                    )}. Returning one-time token instead.`
                )
            }
        }

        return {
            success: true,
            gatewayName,
            applicationUid: app.uid,
            applicationTitle: app.title,
            tokenOrConfig,
            isInitializedConfig,
            configInit: isInitializedConfig ? configInit : undefined,
            tokenExpiresInMin,
            tokenExpiresOn: firstAccessExpireOn,
            deviceToken,
            warnings,
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to create gateway: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_GATEWAY_CREATE_FAILED
        )
    }
}

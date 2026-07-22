import { createHmac, randomBytes } from 'crypto'
import type { Auth } from '@keeper-security/keeperapi'
import {
    Enterprise,
    addAppClientMessage,
    normal64Bytes,
    platform,
    webSafe64FromBytes,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import {
    DEFAULT_GATEWAY_TOKEN_EXPIRES_IN_MIN,
    KSM_CLIENT_ID_MESSAGE,
    MAX_GATEWAY_TOKEN_EXPIRES_IN_MIN,
} from './gatewayConstants'
import { formatGatewayOneTimeToken, formatTimestampMs, resolveKsmApplication } from './gatewayHelpers'
import {
    GatewayConfigInitFormat,
    type CreateGatewayInput,
    type CreateGatewayResult,
    type GatewayConfigInitFormatInput,
} from './gatewayTypes'

type SecretsManagerStorage = {
    getString: (key: string) => Promise<string | undefined>
    saveString: (key: string, value: string) => Promise<void>
    getStringSync?: (key: string) => string | undefined
    saveStringSync?: (key: string, value: string) => void
    snapshot: () => Record<string, string>
}

type SecretsManagerCoreModule = {
    initializeStorage: (storage: SecretsManagerStorage, token: string, hostname?: string) => Promise<void>
    getSecrets: (options: { storage: SecretsManagerStorage }) => Promise<unknown>
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
    let ksm: Partial<SecretsManagerCoreModule>
    try {
        ksm = require('@keeper-security/secrets-manager-core') as SecretsManagerCoreModule
    } catch {
        throw new KeeperSdkError(
            'configInit requires optional package "@keeper-security/secrets-manager-core". Install it to initialize gateway config from the one-time token.',
            ResultCodes.PAM_CONFIG_INIT_UNAVAILABLE
        )
    }

    if (typeof ksm.initializeStorage !== 'function' || typeof ksm.getSecrets !== 'function') {
        throw new KeeperSdkError(
            'Installed @keeper-security/secrets-manager-core does not expose initializeStorage/getSecrets.',
            ResultCodes.PAM_CONFIG_INIT_UNAVAILABLE
        )
    }

    const storage = createSecretsManagerStorage()
    try {
        await ksm.initializeStorage(storage, oneTimeToken, host)
        try {
            await ksm.getSecrets({ storage })
        } catch {
            // First access may fail looking up a dummy UID; config keys should still populate.
        }
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
    return format === GatewayConfigInitFormat.B64 ? Buffer.from(json, 'utf8').toString('base64') : json
}

function buildCreateGatewayMessage(
    appLabel: string,
    gatewayName: string,
    tokenExpiresInMin: number,
    isInitializedConfig: boolean
): string {
    const base = `The one-time token was created in application [${appLabel}]. The new Gateway named ${gatewayName} will show up in the gateway list once it is initialized.`
    if (isInitializedConfig) {
        return `The one-time token was created in application [${appLabel}]. Use the initialized config in the Gateway. The new Gateway named ${gatewayName} will show up in the gateway list once it is initialized.`
    }
    return `${base} Token expires in ${tokenExpiresInMin} minutes.`
}

export async function createGateway(
    auth: Auth,
    storage: InMemoryStorage,
    input: CreateGatewayInput & { returnValue: true }
): Promise<string>
export async function createGateway(
    auth: Auth,
    storage: InMemoryStorage,
    input: CreateGatewayInput & { returnValue?: false }
): Promise<CreateGatewayResult>
export async function createGateway(
    auth: Auth,
    storage: InMemoryStorage,
    input: CreateGatewayInput
): Promise<CreateGatewayResult | string>
export async function createGateway(
    auth: Auth,
    storage: InMemoryStorage,
    input: CreateGatewayInput
): Promise<CreateGatewayResult | string> {
    const gatewayName = input.name?.trim() || ''
    if (!gatewayName) {
        throw new KeeperSdkError('Gateway name is required.', ResultCodes.PAM_GATEWAY_NAME_REQUIRED)
    }

    const application = input.application?.trim() || ''
    if (!application) {
        throw new KeeperSdkError('KSM application name or UID is required.', ResultCodes.PAM_KSM_APP_REQUIRED)
    }

    const tokenExpiresInMin = resolveTokenExpiresInMin(input.tokenExpiresInMin)
    const configInit = normalizeConfigInit(input.configInit)
    const returnValue = input.returnValue === true
    const app = await resolveKsmApplication(storage, application)

    const secretBytes = randomBytes(32)
    const clientId = createHmac('sha512', secretBytes).update(KSM_CLIENT_ID_MESSAGE).digest()
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

        const isInitializedConfig = configInit != null
        const tokenOrConfig = isInitializedConfig
            ? await initKsmConfigFromToken(oneTimeToken, host, configInit)
            : oneTimeToken

        // Automation: return only the OTT / initialized config string (Commander -r).
        if (returnValue) {
            return tokenOrConfig
        }

        return {
            success: true,
            gatewayName,
            applicationUid: app.uid,
            applicationTitle: app.title,
            tokenOrConfig,
            isInitializedConfig,
            configInit,
            tokenExpiresInMin,
            tokenExpiresOn: formatTimestampMs(firstAccessExpireOn),
            deviceToken,
            message: buildCreateGatewayMessage(
                app.title || app.uid,
                gatewayName,
                tokenExpiresInMin,
                isInitializedConfig
            ),
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to create gateway: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_GATEWAY_CREATE_FAILED
        )
    }
}

export function formatCreateGatewayOutput(result: CreateGatewayResult): string {
    return [
        result.message,
        '',
        result.isInitializedConfig ? 'Use the following initialized config in the Gateway:' : 'One-time token:',
        '-----------------------------------------------',
        result.tokenOrConfig,
        '-----------------------------------------------',
        `Token expires on: ${result.tokenExpiresOn}`,
    ].join('\n')
}

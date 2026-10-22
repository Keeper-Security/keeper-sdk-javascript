import { createCipheriv, createDecipheriv, createECDH, createHash, createHmac, hkdfSync, randomBytes } from 'crypto'
import { cborDecode, cborEncode } from './cbor'
import { CtapHidCommand, type CtapHidDevice } from './CtapHidDevice'
import type {
    AuthenticatorAssertion,
    AuthenticatorInfo,
    CborMap,
    CborValue,
    CtapRequestOptions,
    GetAssertionRequest,
} from './types'

const Command = {
    GET_ASSERTION: 0x02,
    GET_INFO: 0x04,
    CLIENT_PIN: 0x06,
} as const

const ClientPinSubCommand = {
    GET_KEY_AGREEMENT: 0x02,
    GET_PIN_TOKEN: 0x05,
    GET_PIN_UV_AUTH_TOKEN_USING_PIN_WITH_PERMISSIONS: 0x09,
} as const

// CBOR map keys of CTAP2 requests and responses (CTAP 2.1, section 6)
const GetInfoResponseKey = { OPTIONS: 0x04, PIN_UV_AUTH_PROTOCOLS: 0x06 } as const
const GetAssertionRequestKey = {
    RP_ID: 0x01,
    CLIENT_DATA_HASH: 0x02,
    ALLOW_LIST: 0x03,
    PIN_UV_AUTH_PARAM: 0x06,
    PIN_UV_AUTH_PROTOCOL: 0x07,
} as const
const GetAssertionResponseKey = { CREDENTIAL: 0x01, AUTH_DATA: 0x02, SIGNATURE: 0x03 } as const
const ClientPinRequestKey = {
    PIN_UV_AUTH_PROTOCOL: 0x01,
    SUB_COMMAND: 0x02,
    KEY_AGREEMENT: 0x03,
    PIN_HASH_ENC: 0x06,
    PERMISSIONS: 0x09,
    RP_ID: 0x0a,
} as const
const ClientPinResponseKey = { KEY_AGREEMENT: 0x01, PIN_UV_AUTH_TOKEN: 0x02 } as const

// COSE_Key (RFC 9053) labels and values for the P-256 ECDH key agreement key
const CoseKeyLabel = { KTY: 1, ALG: 3, CRV: -1, X: -2, Y: -3 } as const
const COSE_KTY_EC2 = 2
const COSE_ALG_ECDH_ES_HKDF_256 = -25
const COSE_CRV_P256 = 1

const PERMISSION_GET_ASSERTION = 0x02
const DEFAULT_COMMAND_TIMEOUT_MS = 10000
const P256_COORDINATE_SIZE = 32
const UNCOMPRESSED_POINT_PREFIX = 0x04
const AES_BLOCK_SIZE = 16
const PIN_HASH_SIZE = 16

export const CtapStatus = {
    SUCCESS: 0x00,
    OPERATION_DENIED: 0x27,
    KEEPALIVE_CANCEL: 0x2d,
    NO_CREDENTIALS: 0x2e,
    USER_ACTION_TIMEOUT: 0x2f,
    PIN_INVALID: 0x31,
    PIN_BLOCKED: 0x32,
    PIN_AUTH_BLOCKED: 0x34,
    PIN_NOT_SET: 0x35,
    PIN_REQUIRED: 0x36,
} as const

const STATUS_MESSAGES: Readonly<Record<number, string>> = {
    [CtapStatus.OPERATION_DENIED]: 'Security key operation was denied',
    [CtapStatus.KEEPALIVE_CANCEL]: 'Security key operation was cancelled',
    [CtapStatus.NO_CREDENTIALS]: 'This security key is not registered for this account',
    [CtapStatus.USER_ACTION_TIMEOUT]: 'Timed out waiting for the security key to be touched',
    [CtapStatus.PIN_INVALID]: 'PIN is invalid',
    [CtapStatus.PIN_BLOCKED]: 'PIN is blocked. Reset the security key PIN',
    [CtapStatus.PIN_AUTH_BLOCKED]: 'PIN is blocked. Remove and reinsert the security key',
    [CtapStatus.PIN_NOT_SET]: 'Security key PIN is not set',
    [CtapStatus.PIN_REQUIRED]: 'Security key requires PIN verification',
}

export class CtapError extends Error {
    constructor(public readonly status: number) {
        super(STATUS_MESSAGES[status] || `Security key returned CTAP error 0x${status.toString(16).padStart(2, '0')}`)
        this.name = 'CtapError'
    }
}

function asMap(value: CborValue | undefined, fieldName: string): CborMap {
    if (!(value instanceof Map)) throw new Error(`Security key returned an invalid ${fieldName}`)
    return value
}

function asBytes(value: CborValue | undefined, fieldName: string): Uint8Array {
    if (!(value instanceof Uint8Array)) throw new Error(`Security key returned an invalid ${fieldName}`)
    return value
}

/** PIN/UV auth protocol 1 or 2 (CTAP 2.1, section 6.5) bound to one key agreement. */
class PinUvAuthProtocol {
    private constructor(
        readonly version: number,
        readonly platformKey: CborMap,
        private readonly aesKey: Buffer
    ) {}

    static create(version: number, authenticatorKey: CborMap): PinUvAuthProtocol {
        const ecdh = createECDH('prime256v1')
        const publicKey: Buffer = ecdh.generateKeys()
        const peerKey = Buffer.concat([
            Buffer.from([UNCOMPRESSED_POINT_PREFIX]),
            asBytes(authenticatorKey.get(CoseKeyLabel.X), 'key agreement'),
            asBytes(authenticatorKey.get(CoseKeyLabel.Y), 'key agreement'),
        ])
        const sharedPoint: Buffer = ecdh.computeSecret(peerKey)
        const aesKey: Buffer =
            version === 1
                ? createHash('sha256').update(sharedPoint).digest()
                : Buffer.from(hkdfSync('sha256', sharedPoint, Buffer.alloc(32), 'CTAP2 AES key', 32))

        const platformKey: CborMap = new Map<CborValue, CborValue>([
            [CoseKeyLabel.KTY, COSE_KTY_EC2],
            [CoseKeyLabel.ALG, COSE_ALG_ECDH_ES_HKDF_256],
            [CoseKeyLabel.CRV, COSE_CRV_P256],
            [CoseKeyLabel.X, new Uint8Array(publicKey.subarray(1, 1 + P256_COORDINATE_SIZE))],
            [CoseKeyLabel.Y, new Uint8Array(publicKey.subarray(1 + P256_COORDINATE_SIZE))],
        ])
        return new PinUvAuthProtocol(version, platformKey, aesKey)
    }

    encrypt(plaintext: Uint8Array): Uint8Array {
        const iv = this.version === 1 ? Buffer.alloc(AES_BLOCK_SIZE) : randomBytes(AES_BLOCK_SIZE)
        const cipher = createCipheriv('aes-256-cbc', this.aesKey, iv).setAutoPadding(false)
        const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()])
        return new Uint8Array(this.version === 1 ? ciphertext : Buffer.concat([iv, ciphertext]))
    }

    decrypt(data: Uint8Array): Uint8Array {
        const iv = this.version === 1 ? Buffer.alloc(AES_BLOCK_SIZE) : data.subarray(0, AES_BLOCK_SIZE)
        const ciphertext = this.version === 1 ? data : data.subarray(AES_BLOCK_SIZE)
        const decipher = createDecipheriv('aes-256-cbc', this.aesKey, iv).setAutoPadding(false)
        return new Uint8Array(Buffer.concat([decipher.update(ciphertext), decipher.final()]))
    }

    /** Computes `pinUvAuthParam` over `message` with a decrypted pinUvAuthToken. */
    static authenticate(version: number, pinUvAuthToken: Uint8Array, message: Uint8Array): Uint8Array {
        const mac = createHmac('sha256', pinUvAuthToken).update(message).digest()
        return new Uint8Array(version === 1 ? mac.subarray(0, 16) : mac)
    }
}

/** CAUTION: This is a Node-only class. CTAP2 client commands needed for WebAuthn assertions. */
export class Ctap2Client {
    private constructor(
        private readonly device: CtapHidDevice,
        readonly info: AuthenticatorInfo
    ) {}

    static async create(device: CtapHidDevice): Promise<Ctap2Client> {
        if (!device.supportsCbor) {
            throw new Error('This security key only supports legacy U2F. Keeper requires a FIDO2 security key.')
        }
        const response = asMap(await Ctap2Client.sendCommand(device, Command.GET_INFO), 'info')
        const options = response.get(GetInfoResponseKey.OPTIONS)
        const protocols = response.get(GetInfoResponseKey.PIN_UV_AUTH_PROTOCOLS)
        const info: AuthenticatorInfo = {
            clientPin: options instanceof Map && options.get('clientPin') === true,
            pinUvAuthToken: options instanceof Map && options.get('pinUvAuthToken') === true,
            pinUvAuthProtocols: Array.isArray(protocols)
                ? protocols.filter((p): p is number => typeof p === 'number')
                : [],
        }
        return new Ctap2Client(device, info)
    }

    /** Sends one CTAP2 command and returns its decoded CBOR response, throwing `CtapError` on failure status. */
    private static async sendCommand(
        device: CtapHidDevice,
        command: number,
        params?: CborMap,
        options: CtapRequestOptions = { timeoutMs: DEFAULT_COMMAND_TIMEOUT_MS }
    ): Promise<CborValue> {
        const request = params ? Buffer.concat([Buffer.from([command]), cborEncode(params)]) : Buffer.from([command])
        const response = await device.sendRequest(CtapHidCommand.CBOR, request, options)
        if (response.length === 0) throw new Error('Security key returned an empty response')
        if (response[0] !== CtapStatus.SUCCESS) throw new CtapError(response[0])
        return response.length > 1 ? cborDecode(response.subarray(1)) : new Map()
    }

    /** PIN/UV auth protocol version used for PIN tokens: 2 when supported, otherwise 1. */
    get pinUvAuthProtocolVersion(): number {
        return this.info.pinUvAuthProtocols.includes(2) ? 2 : 1
    }

    /** Exchanges the PIN for a pinUvAuthToken allowed to get assertions for `rpId`. */
    async getPinToken(pin: string, rpId: string): Promise<Uint8Array> {
        const protocol = await this.establishPinUvAuthProtocol()
        const pinHash = createHash('sha256').update(pin, 'utf8').digest().subarray(0, PIN_HASH_SIZE)

        const params = new Map<CborValue, CborValue>([
            [ClientPinRequestKey.PIN_UV_AUTH_PROTOCOL, protocol.version],
            [ClientPinRequestKey.KEY_AGREEMENT, protocol.platformKey],
            [ClientPinRequestKey.PIN_HASH_ENC, protocol.encrypt(pinHash)],
        ])
        if (this.info.pinUvAuthToken) {
            params.set(
                ClientPinRequestKey.SUB_COMMAND,
                ClientPinSubCommand.GET_PIN_UV_AUTH_TOKEN_USING_PIN_WITH_PERMISSIONS
            )
            params.set(ClientPinRequestKey.PERMISSIONS, PERMISSION_GET_ASSERTION)
            params.set(ClientPinRequestKey.RP_ID, rpId)
        } else {
            params.set(ClientPinRequestKey.SUB_COMMAND, ClientPinSubCommand.GET_PIN_TOKEN)
        }
        const response = asMap(await Ctap2Client.sendCommand(this.device, Command.CLIENT_PIN, params), 'PIN token')
        return protocol.decrypt(asBytes(response.get(ClientPinResponseKey.PIN_UV_AUTH_TOKEN), 'PIN token'))
    }

    private async establishPinUvAuthProtocol(): Promise<PinUvAuthProtocol> {
        const version = this.pinUvAuthProtocolVersion
        const response = asMap(
            await Ctap2Client.sendCommand(
                this.device,
                Command.CLIENT_PIN,
                new Map<CborValue, CborValue>([
                    [ClientPinRequestKey.PIN_UV_AUTH_PROTOCOL, version],
                    [ClientPinRequestKey.SUB_COMMAND, ClientPinSubCommand.GET_KEY_AGREEMENT],
                ])
            ),
            'key agreement'
        )
        return PinUvAuthProtocol.create(
            version,
            asMap(response.get(ClientPinResponseKey.KEY_AGREEMENT), 'key agreement')
        )
    }

    async getAssertion(params: GetAssertionRequest, options: CtapRequestOptions): Promise<AuthenticatorAssertion> {
        const request = new Map<CborValue, CborValue>([
            [GetAssertionRequestKey.RP_ID, params.rpId],
            [GetAssertionRequestKey.CLIENT_DATA_HASH, params.clientDataHash],
        ])
        if (params.allowCredentialIds.length > 0) {
            request.set(
                GetAssertionRequestKey.ALLOW_LIST,
                params.allowCredentialIds.map(
                    (id): CborMap =>
                        new Map<CborValue, CborValue>([
                            ['id', id],
                            ['type', 'public-key'],
                        ])
                )
            )
        }
        if (params.pinUvAuthToken) {
            const version = this.pinUvAuthProtocolVersion
            request.set(
                GetAssertionRequestKey.PIN_UV_AUTH_PARAM,
                PinUvAuthProtocol.authenticate(version, params.pinUvAuthToken, params.clientDataHash)
            )
            request.set(GetAssertionRequestKey.PIN_UV_AUTH_PROTOCOL, version)
        }

        const response = asMap(
            await Ctap2Client.sendCommand(this.device, Command.GET_ASSERTION, request, options),
            'assertion'
        )
        const credential = response.get(GetAssertionResponseKey.CREDENTIAL)
        const credentialId: Uint8Array | undefined =
            credential instanceof Map
                ? asBytes(credential.get('id'), 'credential id')
                : params.allowCredentialIds.length === 1
                  ? params.allowCredentialIds[0]
                  : undefined
        if (!credentialId) throw new Error('Security key did not return a credential id')

        return {
            credentialId,
            authenticatorData: asBytes(response.get(GetAssertionResponseKey.AUTH_DATA), 'authenticator data'),
            signature: asBytes(response.get(GetAssertionResponseKey.SIGNATURE), 'signature'),
        }
    }
}

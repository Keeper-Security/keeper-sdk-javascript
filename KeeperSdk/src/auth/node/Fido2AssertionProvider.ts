import { createHash } from 'crypto'
import { normal64Bytes, webSafe64FromBytes, type WebAuthnAssertionProvider } from '@keeper-security/keeperapi'
import { isNonEmptyString, isNumber, isObject, logger } from '../../utils'
import { CtapHidDevice } from './fido2/CtapHidDevice'
import { Ctap2Client, CtapError, CtapStatus } from './fido2/Ctap2'
import type {
    AuthenticatorAssertion,
    Fido2AssertionProviderOptions,
    SecurityKeyAssertionRequest,
    UserVerificationRequirement,
} from './fido2/types'

const DEFAULT_TIMEOUT_MS = 60_000
const USER_VERIFICATION_REQUIREMENTS: readonly UserVerificationRequirement[] = ['required', 'preferred', 'discouraged']

function isUserVerificationRequirement(value: unknown): value is UserVerificationRequirement {
    return USER_VERIFICATION_REQUIREMENTS.some((requirement) => requirement === value)
}

/**
 * Parses Keeper's 2FA `channel.challenge` (`{ publicKeyCredentialRequestOptions: {...} }`)
 * or bare `PublicKeyCredentialRequestOptions` JSON (passkey login).
 */
function parseAssertionRequest(requestJson: string): SecurityKeyAssertionRequest {
    let parsed: unknown
    try {
        parsed = JSON.parse(requestJson)
    } catch {
        throw new Error('Invalid security key request')
    }
    const options: unknown =
        isObject(parsed) && isObject(parsed.publicKeyCredentialRequestOptions)
            ? parsed.publicKeyCredentialRequestOptions
            : parsed
    if (!isObject(options) || !isNonEmptyString(options.challenge)) {
        throw new Error('Invalid security key request')
    }

    const appId: string | undefined =
        isObject(options.extensions) && isNonEmptyString(options.extensions.appid)
            ? options.extensions.appid
            : undefined
    const rpId: string | undefined = isNonEmptyString(options.rpId) ? options.rpId : appId && new URL(appId).hostname
    if (!rpId) throw new Error('Invalid security key request: rpId is missing')

    const allowCredentials: unknown[] = Array.isArray(options.allowCredentials) ? options.allowCredentials : []
    return {
        challenge: normal64Bytes(options.challenge),
        rpId,
        appId,
        allowCredentialIds: allowCredentials
            .map((credential: unknown) => (isObject(credential) ? credential.id : undefined))
            .filter(isNonEmptyString)
            .map(normal64Bytes),
        userVerification: isUserVerificationRequirement(options.userVerification)
            ? options.userVerification
            : 'preferred',
        timeoutMs: isNumber(options.timeout) && options.timeout > 0 ? options.timeout : DEFAULT_TIMEOUT_MS,
    }
}

function buildClientDataJson(request: SecurityKeyAssertionRequest): Buffer {
    return Buffer.from(
        JSON.stringify({
            type: 'webauthn.get',
            challenge: webSafe64FromBytes(request.challenge),
            origin: request.appId || `https://${request.rpId}`,
            crossOrigin: false,
        }),
        'utf8'
    )
}

/** Serializes the assertion as the WebAuthn `PublicKeyCredential` JSON Keeper expects. */
function serializeAssertion(
    assertion: AuthenticatorAssertion,
    clientDataJson: Buffer,
    request: SecurityKeyAssertionRequest,
    usedAppId: boolean
): string {
    const credentialId = webSafe64FromBytes(assertion.credentialId)
    return JSON.stringify({
        id: credentialId,
        rawId: credentialId,
        response: {
            authenticatorData: webSafe64FromBytes(assertion.authenticatorData),
            clientDataJSON: webSafe64FromBytes(clientDataJson),
            signature: webSafe64FromBytes(assertion.signature),
        },
        type: 'public-key',
        clientExtensionResults: request.appId ? { appid: usedAppId } : {},
    })
}

async function promptSecurityKeyPin(): Promise<string> {
    // Lazy import: ConsoleLogin depends on this module.
    const { prompt } = await import('../ConsoleLogin')
    return prompt('Security key PIN: ', true)
}

/** Returns the security key PIN when user verification is needed, otherwise `undefined`. */
async function resolvePin(
    client: Ctap2Client,
    userVerification: UserVerificationRequirement,
    getPin: () => Promise<string>
): Promise<string | undefined> {
    if (userVerification === 'required' && !client.info.clientPin) {
        throw new Error('Security key user verification (PIN) is not configured')
    }
    if (userVerification === 'discouraged' || !client.info.clientPin) return undefined

    const pin = await getPin()
    if (!pin) throw new Error('Security key PIN is required')
    return pin
}

/** Signs a WebAuthn request with the first attached USB FIDO2 security key (Keeper Commander's `yubikey_authenticate`). */
async function getSecurityKeyAssertion(requestJson: string, getPin: () => Promise<string>): Promise<string> {
    const request = parseAssertionRequest(requestJson)
    const clientDataJson = buildClientDataJson(request)
    const clientDataHash = new Uint8Array(createHash('sha256').update(clientDataJson).digest())

    const device = await CtapHidDevice.openFirst()
    if (!device) throw new Error('No security key detected. Insert your security key and try again.')

    try {
        const client = await Ctap2Client.create(device)
        const pin = await resolvePin(client, request.userVerification, getPin)

        const getAssertionForRpId = async (rpId: string): Promise<AuthenticatorAssertion> =>
            client.getAssertion(
                {
                    rpId,
                    clientDataHash,
                    allowCredentialIds: request.allowCredentialIds,
                    pinUvAuthToken: pin ? await client.getPinToken(pin, rpId) : undefined,
                },
                {
                    timeoutMs: request.timeoutMs,
                    onUserPresenceRequired: () => logger.info('Touch the flashing security key to continue...'),
                }
            )

        try {
            const assertion = await getAssertionForRpId(request.rpId)
            return serializeAssertion(assertion, clientDataJson, request, false)
        } catch (err) {
            // Security keys registered as legacy U2F are scoped to the AppID instead of the rpId.
            const appId = request.appId
            if (!appId || !(err instanceof CtapError) || err.status !== CtapStatus.NO_CREDENTIALS) throw err
            logger.info('Retrying with the legacy U2F registration. Touch the security key one more time.')
            const assertion = await getAssertionForRpId(appId)
            return serializeAssertion(assertion, clientDataJson, request, true)
        }
    } finally {
        await device.close()
    }
}

/**
 * CAUTION: Node-only. Creates a WebAuthn assertion provider backed by a USB FIDO2 security key
 * (requires the optional `node-hid` package). Handles PIN entry and the user-presence touch.
 */
export function createFido2AssertionProvider(options?: Fido2AssertionProviderOptions): WebAuthnAssertionProvider {
    const getPin: () => Promise<string> = options?.getPin || promptSecurityKeyPin
    return (requestJson: string): Promise<string> => getSecurityKeyAssertion(requestJson, getPin)
}

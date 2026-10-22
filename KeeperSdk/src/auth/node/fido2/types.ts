/** Shared types for the Node-only FIDO2 / CTAP2 security key client. */

/** CBOR value subset used by CTAP2. */
export type CborValue = number | string | boolean | null | Uint8Array | CborValue[] | CborMap
export type CborMap = Map<CborValue, CborValue>

/** Options for one CTAPHID request/response exchange. */
export type CtapRequestOptions = {
    timeoutMs: number
    /** Called once when the security key is waiting for the user to touch it. */
    onUserPresenceRequired?: () => void
}

/** Subset of the CTAP2 `authenticatorGetInfo` response used by the client. */
export type AuthenticatorInfo = {
    /** A PIN is set on the security key. */
    clientPin: boolean
    /** The key supports `getPinUvAuthTokenUsingPinWithPermissions` (CTAP 2.1). */
    pinUvAuthToken: boolean
    pinUvAuthProtocols: number[]
}

/** Parameters of a CTAP2 `authenticatorGetAssertion` request. */
export type GetAssertionRequest = {
    rpId: string
    clientDataHash: Uint8Array
    allowCredentialIds: Uint8Array[]
    pinUvAuthToken?: Uint8Array
}

/** Assertion returned by the security key. */
export type AuthenticatorAssertion = {
    credentialId: Uint8Array
    authenticatorData: Uint8Array
    signature: Uint8Array
}

export type UserVerificationRequirement = 'required' | 'preferred' | 'discouraged'

/** WebAuthn credential request parsed from Keeper's security key challenge. */
export type SecurityKeyAssertionRequest = {
    challenge: Uint8Array
    rpId: string
    /** Legacy U2F AppID (`extensions.appid`), if Keeper sent one. */
    appId?: string
    allowCredentialIds: Uint8Array[]
    userVerification: UserVerificationRequirement
    timeoutMs: number
}

export type Fido2AssertionProviderOptions = {
    /** Returns the security key PIN. Defaults to a masked console prompt. */
    getPin?: () => Promise<string>
}

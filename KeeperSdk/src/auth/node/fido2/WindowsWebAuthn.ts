import type { LibraryHandle, TypeObject } from 'koffi'
import { extractErrorMessage, logger } from '../../../utils'
import type { SecurityKeyAssertionRequest, SecurityKeyAssertionResult, UserVerificationRequirement } from './types'

type Koffi = typeof import('koffi')
type NativeFunction = ReturnType<LibraryHandle['func']>

const WEBAUTHN_CLIENT_DATA_VERSION = 1
const WEBAUTHN_CREDENTIAL_VERSION = 1
const WEBAUTHN_GET_ASSERTION_OPTIONS_VERSION = 4
const WEBAUTHN_AUTHENTICATOR_ATTACHMENT_ANY = 0
const WEBAUTHN_USER_VERIFICATION: Record<UserVerificationRequirement, number> = {
    required: 1,
    preferred: 2,
    discouraged: 3,
}
const WEBAUTHN_HASH_ALGORITHM_SHA_256 = 'SHA-256'
const WEBAUTHN_CREDENTIAL_TYPE_PUBLIC_KEY = 'public-key'

const S_OK = 0
const HRESULT_ERROR_CANCELLED = 0x800704c7
const HRESULT_NTE_USER_CANCELLED = 0x80090036

type Binding = {
    koffi: Koffi
    assertionType: TypeObject
    getForegroundWindow: NativeFunction
    getAssertion: NativeFunction
    freeAssertion: NativeFunction
    getErrorName: NativeFunction
}

function defineBinding(koffi: Koffi): Binding {
    const webauthn = koffi.load('webauthn.dll')
    // Throws before Windows 10 1903, which lacks this export but also doesn't block raw HID access.
    webauthn.func('__stdcall', 'WebAuthNGetApiVersionNumber', 'uint32_t', [])

    const credentialType = koffi.struct({
        dwVersion: 'uint32_t',
        cbId: 'uint32_t',
        pbId: 'void *',
        pwszCredentialType: 'str16',
    })
    const clientDataType = koffi.struct({
        dwVersion: 'uint32_t',
        cbClientDataJSON: 'uint32_t',
        pbClientDataJSON: 'void *',
        pwszHashAlgId: 'str16',
    })
    const optionsType = koffi.struct({
        dwVersion: 'uint32_t',
        dwTimeoutMilliseconds: 'uint32_t',
        CredentialList: koffi.struct({
            cCredentials: 'uint32_t',
            pCredentials: koffi.pointer(credentialType),
        }),
        Extensions: koffi.struct({
            cExtensions: 'uint32_t',
            pExtensions: 'void *',
        }),
        dwAuthenticatorAttachment: 'uint32_t',
        dwUserVerificationRequirement: 'uint32_t',
        dwFlags: 'uint32_t',
        pwszU2fAppId: 'str16',
        pbU2fAppId: 'void *',
        pCancellationId: 'void *',
        pAllowCredentialList: 'void *',
    })
    // Leading fields of WEBAUTHN_ASSERTION, present in every struct version.
    const assertionType = koffi.struct({
        dwVersion: 'uint32_t',
        cbAuthenticatorData: 'uint32_t',
        pbAuthenticatorData: 'void *',
        cbSignature: 'uint32_t',
        pbSignature: 'void *',
        Credential: credentialType,
    })

    const user32 = koffi.load('user32.dll')
    return {
        koffi,
        assertionType,
        getForegroundWindow: user32.func('__stdcall', 'GetForegroundWindow', 'void *', []),
        getAssertion: webauthn.func('__stdcall', 'WebAuthNAuthenticatorGetAssertion', 'int32_t', [
            'void *',
            'str16',
            koffi.pointer(clientDataType),
            koffi.pointer(optionsType),
            koffi.out(koffi.pointer('void *')),
        ]),
        freeAssertion: webauthn.func('__stdcall', 'WebAuthNFreeAssertion', 'void', ['void *']),
        getErrorName: webauthn.func('__stdcall', 'WebAuthNGetErrorName', 'str16', ['int32_t']),
    }
}

let bindingPromise: Promise<Binding | undefined> | undefined

async function loadBinding(): Promise<Binding | undefined> {
    try {
        return defineBinding(await import('koffi'))
    } catch (err) {
        logger.debug(`Windows WebAuthn API unavailable: ${extractErrorMessage(err)}`)
        return undefined
    }
}

function copyNativeBytes(koffi: Koffi, pointer: unknown, length: number): Uint8Array {
    return new Uint8Array(koffi.decode(pointer, 'uint8_t', length))
}

/**
 * CAUTION: Windows-only. Security key client backed by the Windows WebAuthn API (`webauthn.dll`),
 * because Windows 10 1903+ blocks non-elevated processes from opening FIDO HID devices.
 * Windows shows its own PIN and touch prompts.
 */
export class WindowsWebAuthn {
    private constructor(private readonly binding: Binding) {}

    /** Returns `undefined` off Windows, or when `webauthn.dll` or the optional `koffi` package is unavailable. */
    static async load(): Promise<WindowsWebAuthn | undefined> {
        if (process.platform !== 'win32') return undefined
        bindingPromise ??= loadBinding()
        const binding = await bindingPromise
        return binding && new WindowsWebAuthn(binding)
    }

    async getAssertion(
        request: SecurityKeyAssertionRequest,
        clientDataJson: Buffer
    ): Promise<SecurityKeyAssertionResult> {
        const { koffi } = this.binding
        const usedAppIdFlag = new Int32Array(1)
        const credentials = request.allowCredentialIds.map((id) => ({
            dwVersion: WEBAUTHN_CREDENTIAL_VERSION,
            cbId: id.length,
            pbId: id,
            pwszCredentialType: WEBAUTHN_CREDENTIAL_TYPE_PUBLIC_KEY,
        }))
        const clientData = {
            dwVersion: WEBAUTHN_CLIENT_DATA_VERSION,
            cbClientDataJSON: clientDataJson.length,
            pbClientDataJSON: clientDataJson,
            pwszHashAlgId: WEBAUTHN_HASH_ALGORITHM_SHA_256,
        }
        const options = {
            dwVersion: WEBAUTHN_GET_ASSERTION_OPTIONS_VERSION,
            dwTimeoutMilliseconds: request.timeoutMs,
            CredentialList: {
                cCredentials: credentials.length,
                pCredentials: credentials.length > 0 ? credentials : null,
            },
            Extensions: { cExtensions: 0, pExtensions: null },
            dwAuthenticatorAttachment: WEBAUTHN_AUTHENTICATOR_ATTACHMENT_ANY,
            dwUserVerificationRequirement: WEBAUTHN_USER_VERIFICATION[request.userVerification],
            dwFlags: 0,
            pwszU2fAppId: request.appId ?? null,
            pbU2fAppId: request.appId ? usedAppIdFlag : null,
            pCancellationId: null,
            pAllowCredentialList: null,
        }

        const assertionOut: unknown[] = [null]
        const hwnd: unknown = this.binding.getForegroundWindow()
        logger.info('Complete the Windows Security prompt to use your security key...')
        const hr = await new Promise<number>((resolve, reject) =>
            this.binding.getAssertion.async(
                hwnd,
                request.rpId,
                clientData,
                options,
                assertionOut,
                (err: unknown, result: number) => (err ? reject(err) : resolve(result))
            )
        )

        if (hr !== S_OK) {
            const code = hr >>> 0
            if (code === HRESULT_ERROR_CANCELLED || code === HRESULT_NTE_USER_CANCELLED) {
                throw new Error('Security key authentication was cancelled')
            }
            const errorName: string = this.binding.getErrorName(hr)
            throw new Error(`Security key authentication failed: ${errorName} (0x${code.toString(16)})`)
        }

        const assertionPointer = assertionOut[0]
        try {
            const native = koffi.decode(assertionPointer, this.binding.assertionType)
            return {
                assertion: {
                    authenticatorData: copyNativeBytes(koffi, native.pbAuthenticatorData, native.cbAuthenticatorData),
                    signature: copyNativeBytes(koffi, native.pbSignature, native.cbSignature),
                    credentialId: copyNativeBytes(koffi, native.Credential.pbId, native.Credential.cbId),
                },
                usedAppId: usedAppIdFlag[0] !== 0,
            }
        } finally {
            this.binding.freeAssertion(assertionPointer)
        }
    }
}

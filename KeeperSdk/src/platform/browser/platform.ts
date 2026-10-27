import { normal64Bytes, type AuthUI3, type KeeperHttpResponse } from '@keeper-security/keeperapi'
import { UnavailableAuthUI } from '../../auth/UnavailableAuthUI'
import { KeeperSdkError, ResultCodes } from '../../utils'
import type { ConfigLoader } from '../../auth/config'
import * as asmCrypto from 'asmcrypto.js'
import type { SdkPlatform, SdkReadline } from '../types'

type HmacCtor = new (key: Uint8Array) => {
    process(data: Uint8Array): void
    finish(): void
    result: Uint8Array
}

const asm = asmCrypto as typeof asmCrypto & {
    HmacSha1: HmacCtor
    HmacSha256: HmacCtor
    HmacSha512: HmacCtor
}

const HMAC_IMPL: Record<'sha1' | 'sha256' | 'sha512', HmacCtor> = {
    sha1: asm.HmacSha1,
    sha256: asm.HmacSha256,
    sha512: asm.HmacSha512,
}

const BROWSER_READLINE_MSG =
    'Interactive readline is not available in the browser. Use keeper-shell password transport or a custom authUI.'

const BROWSER_FILE_CONFIG_MSG =
    'File-based Keeper config (~/.keeper) is not available in the browser. Pass an in-memory ConfigLoader to SessionManager or KeeperVault.sessionStorage.'

/** PKCS#8 DER prefix for a P-256 ECPrivateKey without the optional public key; followed by the 32-byte private key. */
const P256_PKCS8_PREFIX = new Uint8Array([
    0x30, 0x41, 0x02, 0x01, 0x00, 0x30, 0x13, 0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x02, 0x01, 0x06, 0x08, 0x2a,
    0x86, 0x48, 0xce, 0x3d, 0x03, 0x01, 0x07, 0x04, 0x27, 0x30, 0x25, 0x02, 0x01, 0x01, 0x04, 0x20,
])

class BrowserReadline implements SdkReadline {
    question(_prompt: string): Promise<string> {
        return Promise.reject(new KeeperSdkError(BROWSER_READLINE_MSG, ResultCodes.USER_CANCELLED))
    }
    close(): void {
        /* noop */
    }
}

export const browserSdkPlatform: SdkPlatform = {
    runtime: 'browser',

    delay(ms: number): Promise<void> {
        return new Promise((resolve) => globalThis.setTimeout(resolve, ms))
    },

    createReadline(): SdkReadline {
        return new BrowserReadline()
    },

    hmac(algorithm, key, data) {
        const Ctor = HMAC_IMPL[algorithm]
        if (!Ctor) {
            throw new KeeperSdkError(`Unsupported HMAC algorithm: ${algorithm}`, ResultCodes.UNSUPPORTED_2FA_CHANNEL)
        }
        const h = new Ctor(key)
        h.process(data)
        h.finish()
        return h.result
    },

    async deriveECPublicKey(privateKey: Uint8Array): Promise<Uint8Array> {
        const pkcs8 = new Uint8Array(P256_PKCS8_PREFIX.length + privateKey.length)
        pkcs8.set(P256_PKCS8_PREFIX)
        pkcs8.set(privateKey, P256_PKCS8_PREFIX.length)
        const key = await globalThis.crypto.subtle.importKey(
            'pkcs8',
            pkcs8,
            { name: 'ECDH', namedCurve: 'P-256' },
            true,
            ['deriveBits']
        )
        const jwk = await globalThis.crypto.subtle.exportKey('jwk', key)
        if (!jwk.x || !jwk.y) throw new Error('Unable to derive device public key')
        const publicKey = new Uint8Array(65)
        publicKey[0] = 0x04
        publicKey.set(normal64Bytes(jwk.x), 1)
        publicKey.set(normal64Bytes(jwk.y), 33)
        return publicKey
    },

    createFileConfigLoader(): ConfigLoader {
        throw new KeeperSdkError(BROWSER_FILE_CONFIG_MSG, ResultCodes.NOT_LOGGED_IN)
    },

    createAuthUI(useConsoleAuth: boolean): AuthUI3 {
        if (useConsoleAuth) {
            throw new KeeperSdkError(
                'ConsoleAuthUI (readline) is not available in the browser. Set useConsoleAuth: false and provide authUI, or use keeper-shell.',
                ResultCodes.USER_CANCELLED
            )
        }
        return new UnavailableAuthUI()
    },

    async httpRequest(method, url, body, headers, timeoutMs): Promise<KeeperHttpResponse> {
        const controller = new AbortController()
        const timeout = globalThis.setTimeout(() => controller.abort(), timeoutMs)
        try {
            const resp = await fetch(url, {
                method,
                headers:
                    method === 'POST'
                        ? new Headers({
                              'Content-Type': 'application/octet-stream',
                              'Content-Length': String(body?.length ?? 0),
                              ...headers,
                          })
                        : new Headers(headers ?? {}),
                body: method === 'POST' ? body : undefined,
                signal: controller.signal,
            })
            return {
                statusCode: resp.status,
                headers: resp.headers,
                data: new Uint8Array(await resp.arrayBuffer()),
            }
        } catch (e) {
            if (controller.signal.aborted) throw new Error(`Request to ${url} timed out after ${timeoutMs}ms`)
            throw e
        } finally {
            globalThis.clearTimeout(timeout)
        }
    },
}

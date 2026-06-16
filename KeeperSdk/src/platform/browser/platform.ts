import type { AuthUI3 } from '@keeper-security/keeperapi'
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
}

import type { AuthUI3 } from '@keeper-security/keeperapi'
import type { ConfigLoader } from '../auth/config'

export type SdkRuntime = 'node' | 'browser'

export interface SdkReadline {
    question(prompt: string): Promise<string>
    close(): void
}

/** Small platform surface for KeeperSdk (auth UI, config, TOTP, timers). */
export interface SdkPlatform {
    readonly runtime: SdkRuntime

    delay(ms: number): Promise<void>

    createReadline(input?: unknown, output?: unknown): SdkReadline

    /** HMAC digest (e.g. SHA-1 for TOTP). */
    hmac(algorithm: 'sha1' | 'sha256' | 'sha512', key: Uint8Array, data: Uint8Array): Uint8Array

    createFileConfigLoader(configDir?: string): ConfigLoader

    createAuthUI(useConsoleAuth: boolean): AuthUI3
}

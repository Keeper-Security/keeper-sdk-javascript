import type { SdkPlatform } from './types'

let active: SdkPlatform | undefined

export type { SdkPlatform, SdkReadline, SdkRuntime } from './types'

export function connectSdkPlatform(platform: SdkPlatform): void {
    active = platform
}

export function getSdkPlatform(): SdkPlatform {
    if (!active) {
        throw new Error('Keeper SDK platform is not initialized. Import @keeper-security/keeper-sdk-javascript or /browser entry first.')
    }
    return active
}

export function isSdkPlatformConnected(): boolean {
    return active !== undefined
}

import { createECDH, createHmac } from 'crypto'
import readline from 'readline/promises'
import type { AuthUI3 } from '@keeper-security/keeperapi'
import { ConsoleAuthUI } from '../../auth/ConsoleAuthUI'
import { UnavailableAuthUI } from '../../auth/UnavailableAuthUI'
import { FileConfigLoader } from '../../auth/node/FileConfigLoader'
import type { ConfigLoader } from '../../auth/config'
import type { SdkPlatform, SdkReadline } from '../types'

function nodeReadline(input?: unknown, output?: unknown): SdkReadline {
    const rl = readline.createInterface({
        input: (input ?? process.stdin) as NodeJS.ReadableStream,
        output: (output ?? process.stdout) as NodeJS.WritableStream,
    })
    return {
        question: (prompt) => rl.question(prompt),
        close: () => rl.close(),
    }
}

export const nodeSdkPlatform: SdkPlatform = {
    runtime: 'node',

    delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms))
    },

    createReadline: nodeReadline,

    hmac(algorithm, key, data) {
        const algo = algorithm.toLowerCase()
        return new Uint8Array(createHmac(algo, Buffer.from(key)).update(data).digest())
    },

    async deriveECPublicKey(privateKey: Uint8Array): Promise<Uint8Array> {
        const ecdh = createECDH('prime256v1')
        ecdh.setPrivateKey(privateKey)
        return new Uint8Array(ecdh.getPublicKey())
    },

    createFileConfigLoader(configDir?: string): ConfigLoader {
        return new FileConfigLoader(configDir)
    },

    createAuthUI(useConsoleAuth: boolean): AuthUI3 {
        return useConsoleAuth ? new ConsoleAuthUI() : new UnavailableAuthUI()
    },
}

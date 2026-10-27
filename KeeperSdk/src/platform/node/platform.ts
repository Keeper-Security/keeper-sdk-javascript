import { createECDH, createHmac } from 'crypto'
import https from 'https'
import readline from 'readline/promises'
import type { AuthUI3, KeeperHttpResponse } from '@keeper-security/keeperapi'
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

function nodeHttpRequest(
    method: 'GET' | 'POST',
    url: string,
    body: Uint8Array | undefined,
    headers: Record<string, string> | undefined,
    timeoutMs: number
): Promise<KeeperHttpResponse> {
    return new Promise<KeeperHttpResponse>((resolve, reject) => {
        const req = https.request(
            url,
            {
                method,
                headers: {
                    ...(method === 'POST'
                        ? { 'Content-Type': 'application/octet-stream', 'Content-Length': body?.length ?? 0 }
                        : {}),
                    'User-Agent': `Node/${process.version}`,
                    ...headers,
                },
                timeout: timeoutMs,
            },
            (res) => {
                const chunks: Buffer[] = []
                res.on('data', (chunk: Buffer) => chunks.push(chunk))
                res.on('error', reject)
                res.on('end', () =>
                    resolve({
                        statusCode: res.statusCode ?? 0,
                        headers: res.headers,
                        // keeperapi treats a missing body as `null`, not an empty buffer
                        data: chunks.length ? Buffer.concat(chunks) : null,
                    })
                )
            }
        )
        req.on('error', reject)
        req.on('timeout', () => req.destroy(new Error(`Request to ${url} timed out after ${timeoutMs}ms`)))
        if (body) req.write(body)
        req.end()
    })
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

    httpRequest: nodeHttpRequest,
}

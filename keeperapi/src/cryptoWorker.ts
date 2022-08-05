import { EncryptionType, KeyStorage, platform, CryptoTask } from "./platform"

export type CryptoWorkerKeys = Record<string, Uint8Array>

export type CryptoResults = 
    Record<string, Uint8Array>

export type CryptoWorkerMessage = {
   data: CryptoTask[]
   keys: CryptoWorkerKeys
}

export interface CryptoWorkerPoolConfig {
    createWorker(): Promise<CryptoWorker>
    numThreads: number
    getKey: (keyId: string, type: EncryptionType) => Promise<Uint8Array>
}

export class CryptoWorkerPool {

    private workers: CryptoWorker[] = []

    private config: CryptoWorkerPoolConfig

    constructor(config: CryptoWorkerPoolConfig) {
        this.config = config
    }
    
    async open() {
        while (this.workers.length < this.config.numThreads) {
            const worker = await this.config.createWorker()
            this.workers.push(worker)
        }
    }

    async close() {
        for (let worker of this.workers) {
            await worker.terminate()
        }

        this.workers.length = 0
    }

    private async getKeys(tasks: CryptoTask[]): Promise<CryptoWorkerKeys> {
        const keys: CryptoWorkerKeys = {}

        for (const task of tasks) {
            const {keyId, encryptionType} = task
            if (keys[keyId]) continue

            try {
                keys[keyId] = await this.config.getKey(keyId, encryptionType)
            } catch (e) {
                console.error(e)
            }
        }

        return keys
    }

    async runTasks(tasks: CryptoTask[]): Promise<CryptoResults> {
        // Split into chunks for each worker
        const numberOfItems = tasks.length
        const chunkSize = Math.ceil(numberOfItems / this.workers.length)
        const chunks = this.chunk(tasks, chunkSize)

        // Issue concurrent requests
        const chunkedResults = await Promise.all(
          chunks.map(async (chunk, index) => {
            const worker: CryptoWorker = this.workers[index]
            const keys = await this.getKeys(chunk)
            return worker.sendMessage({ 
                data: chunk, 
                keys 
            })
          })
        )

        // Merge and return results
        return Object.assign({}, ...chunkedResults) 
    }

    private chunk<T>(array: T[], chunkSize: number): T[][] {
        const chunks: T[][] = []

        while (array.length) {
            // Important note: Array.splice drains the input array,
            // but faster than Array.slice
            chunks.push(array.splice(0, chunkSize))
        }

        return chunks
    }
}

export interface CryptoWorker {
    
    sendMessage(message: CryptoWorkerMessage): Promise<CryptoResults>

    terminate(): Promise<void>

}

export async function handleCryptoWorkerMessage(message: CryptoWorkerMessage): Promise<CryptoResults> {
    const {data, keys} = message
    const keyStorage: KeyStorage = {
        getKeyBytes: async (keyId) => {
            return keys[keyId]
        },
        saveKeyBytes: async (_keyId, _key) => {
            // unused
        }
    }

    let results: CryptoResults = {}
    await Promise.all(data.map(async (task) => {
        const {data, dataId, keyId, encryptionType} = task
        try {
            const keyBytes = await platform.decrypt(data, keyId, encryptionType, keyStorage)
            results[dataId] = keyBytes
        } catch (e: any) {
            console.error(`The key ${dataId} cannot be decrypted (${e.message})`)
        }
    }))

    return results
}
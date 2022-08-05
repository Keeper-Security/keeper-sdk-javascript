import { CryptoWorkerMessage, handleCryptoWorkerMessage } from "../cryptoWorker"
import { connectPlatform } from "../platform"
import { browserPlatform } from "./platform"

connectPlatform(browserPlatform)

self.addEventListener('message', async function (e: MessageEvent<CryptoWorkerMessage>) {
    const {data} = e

    const response = await handleCryptoWorkerMessage(data)

    // @ts-ignore
    self.postMessage(response)
})

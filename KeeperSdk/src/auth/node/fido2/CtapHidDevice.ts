import { randomBytes } from 'crypto'
import type { Device, HIDAsync } from 'node-hid'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../../utils'
import type { CtapRequestOptions } from './types'

const FIDO_USAGE_PAGE = 0xf1d0
const FIDO_USAGE = 0x01
const READ_POLL_MS = 100
const INIT_TIMEOUT_MS = 5000

// CTAPHID framing (CTAP 2.1, section 11.2.4)
const REPORT_SIZE = 64
const CID_SIZE = 4
const COMMAND_OFFSET = CID_SIZE
const SEQUENCE_OFFSET = CID_SIZE
const BYTE_COUNT_OFFSET = CID_SIZE + 1
const INIT_HEADER_SIZE = CID_SIZE + 3
const CONT_HEADER_SIZE = CID_SIZE + 1
const INIT_DATA_SIZE = REPORT_SIZE - INIT_HEADER_SIZE
const CONT_DATA_SIZE = REPORT_SIZE - CONT_HEADER_SIZE
const INIT_FRAME_FLAG = 0x80
const BROADCAST_CID = Buffer.from([0xff, 0xff, 0xff, 0xff])

// CTAPHID_INIT response layout
const INIT_NONCE_SIZE = 8
const INIT_RESPONSE_SIZE = 17
const INIT_CAPABILITIES_OFFSET = 16
const CAPABILITY_CBOR = 0x04

const KEEPALIVE_STATUS_UP_NEEDED = 2

export const CtapHidCommand = {
    INIT: 0x06,
    CBOR: 0x10,
    CANCEL: 0x11,
    KEEPALIVE: 0x3b,
    ERROR: 0x3f,
} as const

async function loadNodeHid(): Promise<typeof import('node-hid')> {
    try {
        return await import('node-hid')
    } catch (err) {
        throw new KeeperSdkError(
            `Security key support requires the optional "node-hid" package: ${extractErrorMessage(err)}`,
            ResultCodes.UNSUPPORTED_2FA_CHANNEL
        )
    }
}

/** CAUTION: This is a Node-only class. CTAPHID transport to a USB FIDO security key via the optional `node-hid` package. */
export class CtapHidDevice {
    private channelId: Buffer = BROADCAST_CID
    private capabilities = 0

    private constructor(private readonly handle: HIDAsync) {}

    /** Opens the first attached FIDO security key, or returns `undefined` when none is attached. */
    static async openFirst(): Promise<CtapHidDevice | undefined> {
        const hid = await loadNodeHid()
        const devices: Device[] = await hid.devicesAsync()
        const path: string | undefined = devices.find(
            (d) => d.usagePage === FIDO_USAGE_PAGE && d.usage === FIDO_USAGE && d.path
        )?.path
        if (!path) return undefined

        const device = new CtapHidDevice(await hid.HIDAsync.open(path, { nonExclusive: true }))
        try {
            await device.allocateChannel()
        } catch (err) {
            await device.close()
            throw err
        }
        return device
    }

    get supportsCbor(): boolean {
        return (this.capabilities & CAPABILITY_CBOR) !== 0
    }

    async close(): Promise<void> {
        await this.handle.close().catch(() => undefined)
    }

    /** Sends one CTAPHID request and returns its response payload, waiting through KEEPALIVE frames. */
    async sendRequest(command: number, payload: Uint8Array, options: CtapRequestOptions): Promise<Buffer> {
        await this.writeMessage(command, Buffer.from(payload))
        try {
            return await this.readMessage(command, options)
        } catch (err) {
            if (command !== CtapHidCommand.INIT) {
                await this.writeMessage(CtapHidCommand.CANCEL, Buffer.alloc(0)).catch(() => undefined)
            }
            throw err
        }
    }

    private async allocateChannel(): Promise<void> {
        const nonce = randomBytes(INIT_NONCE_SIZE)
        const response = await this.sendRequest(CtapHidCommand.INIT, nonce, { timeoutMs: INIT_TIMEOUT_MS })
        if (response.length < INIT_RESPONSE_SIZE || !response.subarray(0, INIT_NONCE_SIZE).equals(nonce)) {
            throw new Error('Security key returned an invalid INIT response')
        }
        this.channelId = Buffer.from(response.subarray(INIT_NONCE_SIZE, INIT_NONCE_SIZE + CID_SIZE))
        this.capabilities = response[INIT_CAPABILITIES_OFFSET]
    }

    private async writeReport(data: Buffer): Promise<void> {
        // The leading zero byte is the HID report number.
        const report = Buffer.alloc(REPORT_SIZE + 1)
        data.copy(report, 1)
        await this.handle.write(report)
    }

    private async writeMessage(command: number, payload: Buffer): Promise<void> {
        const header = Buffer.alloc(INIT_HEADER_SIZE)
        this.channelId.copy(header, 0)
        header[COMMAND_OFFSET] = INIT_FRAME_FLAG | command
        header.writeUInt16BE(payload.length, BYTE_COUNT_OFFSET)

        let offset = Math.min(payload.length, INIT_DATA_SIZE)
        await this.writeReport(Buffer.concat([header, payload.subarray(0, offset)]))
        for (let sequence = 0; offset < payload.length; sequence++) {
            const chunk = payload.subarray(offset, offset + CONT_DATA_SIZE)
            await this.writeReport(Buffer.concat([this.channelId, Buffer.from([sequence]), chunk]))
            offset += chunk.length
        }
    }

    private async readReport(deadline: number): Promise<Buffer> {
        while (Date.now() < deadline) {
            const report = await this.handle.read(READ_POLL_MS)
            if (report && report.length >= INIT_HEADER_SIZE && report.subarray(0, CID_SIZE).equals(this.channelId)) {
                return report
            }
        }
        throw new Error('Timed out waiting for the security key')
    }

    private async readMessage(command: number, options: CtapRequestOptions): Promise<Buffer> {
        const deadline = Date.now() + options.timeoutMs
        let userPresenceNotified = false
        for (;;) {
            const first = await this.readReport(deadline)
            const responseCommand = first[COMMAND_OFFSET] & ~INIT_FRAME_FLAG
            if (responseCommand === CtapHidCommand.KEEPALIVE) {
                if (first[INIT_HEADER_SIZE] === KEEPALIVE_STATUS_UP_NEEDED && !userPresenceNotified) {
                    userPresenceNotified = true
                    options.onUserPresenceRequired?.()
                }
                continue
            }

            const length = first.readUInt16BE(BYTE_COUNT_OFFSET)
            const chunks: Buffer[] = [
                first.subarray(INIT_HEADER_SIZE, INIT_HEADER_SIZE + Math.min(length, INIT_DATA_SIZE)),
            ]
            let received = chunks[0].length
            for (let sequence = 0; received < length; sequence++) {
                const next = await this.readReport(deadline)
                if (next[SEQUENCE_OFFSET] !== sequence) throw new Error('Security key sent an out-of-order packet')
                const chunk = next.subarray(
                    CONT_HEADER_SIZE,
                    CONT_HEADER_SIZE + Math.min(length - received, CONT_DATA_SIZE)
                )
                chunks.push(chunk)
                received += chunk.length
            }
            const data = Buffer.concat(chunks)

            if (responseCommand === CtapHidCommand.ERROR) {
                throw new Error(`Security key transport error 0x${data[0]?.toString(16)}`)
            }
            if (responseCommand !== command) {
                throw new Error(`Unexpected security key response 0x${responseCommand.toString(16)}`)
            }
            return data
        }
    }
}

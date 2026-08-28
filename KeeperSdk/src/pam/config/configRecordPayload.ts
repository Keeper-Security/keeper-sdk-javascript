const MIN_RECORD_PAD_BYTES = 384
const PAD_BLOCK_SIZE = 16
const SPACE_BYTE = 0x20

export function getPaddedJsonBytes(data: Record<string, unknown>): Uint8Array {
    const jsonBytes = new TextEncoder().encode(JSON.stringify(data))
    const paddedLength = Math.ceil(Math.max(MIN_RECORD_PAD_BYTES, jsonBytes.length) / PAD_BLOCK_SIZE) * PAD_BLOCK_SIZE
    if (jsonBytes.length === paddedLength) return jsonBytes

    const padded = new Uint8Array(paddedLength)
    padded.set(jsonBytes)
    padded.fill(SPACE_BYTE, jsonBytes.length)
    return padded
}

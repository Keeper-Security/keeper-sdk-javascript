const MIN_RECORD_PAD_BYTES = 384
const PAD_BLOCK_SIZE = 16

export function getPaddedJsonBytes(data: Record<string, unknown>): Uint8Array {
    const json = JSON.stringify(data)
    const paddedLength = Math.ceil(Math.max(MIN_RECORD_PAD_BYTES, json.length) / PAD_BLOCK_SIZE) * PAD_BLOCK_SIZE
    const padded = json.padEnd(paddedLength, ' ')
    return new TextEncoder().encode(padded)
}

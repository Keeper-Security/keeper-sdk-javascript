import type { CborMap, CborValue } from './types'

/** Minimal CBOR (RFC 8949) codec for the CTAP2 subset: integers, byte/text strings, arrays, maps and booleans. */

const MajorType = {
    Unsigned: 0,
    Negative: 1,
    Bytes: 2,
    Text: 3,
    Array: 4,
    Map: 5,
    Simple: 7,
} as const

function encodeHeader(major: number, length: number): Buffer {
    if (length < 24) return Buffer.from([(major << 5) | length])
    if (length < 0x100) return Buffer.from([(major << 5) | 24, length])
    if (length < 0x10000) {
        const header = Buffer.alloc(3)
        header[0] = (major << 5) | 25
        header.writeUInt16BE(length, 1)
        return header
    }
    const header = Buffer.alloc(5)
    header[0] = (major << 5) | 26
    header.writeUInt32BE(length, 1)
    return header
}

export function cborEncode(value: CborValue): Buffer {
    if (value === null) return Buffer.from([0xf6])
    if (typeof value === 'boolean') return Buffer.from([value ? 0xf5 : 0xf4])
    if (typeof value === 'number') {
        return value >= 0 ? encodeHeader(MajorType.Unsigned, value) : encodeHeader(MajorType.Negative, -1 - value)
    }
    if (typeof value === 'string') {
        const bytes = Buffer.from(value, 'utf8')
        return Buffer.concat([encodeHeader(MajorType.Text, bytes.length), bytes])
    }
    if (value instanceof Uint8Array) {
        return Buffer.concat([encodeHeader(MajorType.Bytes, value.length), Buffer.from(value)])
    }
    if (Array.isArray(value)) {
        return Buffer.concat([encodeHeader(MajorType.Array, value.length), ...value.map(cborEncode)])
    }
    // CTAP2 canonical ordering: shorter encoded keys first, then bytewise.
    const entries = Array.from(value.entries())
        .map(([key, item]): [Buffer, Buffer] => [cborEncode(key), cborEncode(item)])
        .sort(([a], [b]) => a.length - b.length || Buffer.compare(a, b))
    return Buffer.concat([encodeHeader(MajorType.Map, entries.length), ...entries.flat()])
}

class CborReader {
    private offset = 0

    constructor(private readonly data: Buffer) {}

    get isAtEnd(): boolean {
        return this.offset === this.data.length
    }

    private readBytes(length: number): Buffer {
        if (this.offset + length > this.data.length) throw new Error('CBOR: unexpected end of data')
        const slice = this.data.subarray(this.offset, this.offset + length)
        this.offset += length
        return slice
    }

    private readLength(info: number): number {
        if (info < 24) return info
        if (info === 24) return this.readBytes(1)[0]
        if (info === 25) return this.readBytes(2).readUInt16BE(0)
        if (info === 26) return this.readBytes(4).readUInt32BE(0)
        throw new Error(`CBOR: unsupported length encoding ${info}`)
    }

    read(): CborValue {
        const initial = this.readBytes(1)[0]
        const info = initial & 0x1f
        switch (initial >> 5) {
            case MajorType.Unsigned:
                return this.readLength(info)
            case MajorType.Negative:
                return -1 - this.readLength(info)
            case MajorType.Bytes:
                return new Uint8Array(this.readBytes(this.readLength(info)))
            case MajorType.Text:
                return this.readBytes(this.readLength(info)).toString('utf8')
            case MajorType.Array: {
                const length = this.readLength(info)
                return Array.from({ length }, () => this.read())
            }
            case MajorType.Map: {
                const length = this.readLength(info)
                const map: CborMap = new Map()
                for (let i = 0; i < length; i++) {
                    const key: CborValue = this.read()
                    map.set(key, this.read())
                }
                return map
            }
            case MajorType.Simple:
                if (info === 20) return false
                if (info === 21) return true
                if (info === 22) return null
                throw new Error(`CBOR: unsupported simple value ${info}`)
            default:
                throw new Error(`CBOR: unsupported major type ${initial >> 5}`)
        }
    }
}

export function cborDecode(data: Uint8Array): CborValue {
    const reader = new CborReader(Buffer.from(data))
    const value = reader.read()
    if (!reader.isAtEnd) throw new Error('CBOR: trailing data')
    return value
}

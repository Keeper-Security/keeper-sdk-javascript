import { Reader, Writer } from 'protobufjs'

export type RecordUidsRequest = {
    recordUids: Uint8Array[]
}

/** Request shape for v3 record endpoints that send record UIDs on protobuf field 3. */
export const recordUidsRequestCodec = {
    create(properties?: RecordUidsRequest): RecordUidsRequest {
        return { recordUids: properties?.recordUids ?? [] }
    },
    encode(message: RecordUidsRequest, writer?: Writer): Writer {
        if (!writer) writer = Writer.create()
        for (const uid of message.recordUids) {
            writer.uint32(26).bytes(uid)
        }
        return writer
    },
}

/** Response shape used by v3 record detail endpoints: repeated field 1 + forbidden UIDs on field 2. */
export function decodeRepeatedWithForbidden<T>(
    data: Uint8Array,
    decodeItem: (reader: Reader, length: number) => T
): { items: T[]; forbiddenRecords: Uint8Array[] } {
    const reader = Reader.create(data)
    const items: T[] = []
    const forbiddenRecords: Uint8Array[] = []
    while (reader.pos < reader.len) {
        const tag = reader.uint32()
        switch (tag >>> 3) {
            case 1:
                items.push(decodeItem(reader, reader.uint32()))
                break
            case 2:
                forbiddenRecords.push(reader.bytes() as Uint8Array)
                break
            default:
                reader.skipType(tag & 7)
                break
        }
    }
    return { items, forbiddenRecords }
}

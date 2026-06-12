import type { RestMessage } from '@keeper-security/keeperapi'
import { Reader, Writer } from 'protobufjs'

const REMOVE_RECORD_PATH = 'vault/folders/v3/remove_record'

function readBytes(reader: Reader): Uint8Array {
    return reader.bytes() as Uint8Array
}

export enum RemoveRecordAction {
    Preview = 0,
    Confirm = 1,
}

export enum RemoveRecordOperation {
    Unlink = 1,
    FolderTrash = 2,
    OwnerTrash = 3,
}

export enum RemoveRecordStatus {
    Unknown = 0,
    Success = 1,
    StalePreview = 2,
    TokenExpired = 3,
    TokenInvalid = 4,
    AccessDenied = 5,
    ValidationError = 6,
}

export type RemoveRecordRemovalInput = {
    recordUid: Uint8Array
    folderUid?: Uint8Array
    operation: RemoveRecordOperation
}

export type RemoveRecordRequest = {
    action: RemoveRecordAction
    records: RemoveRecordRemovalInput[]
    confirmationToken?: Uint8Array
}

export type RemoveRecordImpact = {
    foldersCount: number
    recordsCount: number
    affectedUsersCount: number
    affectedTeamsCount: number
    recordInfo: { recordUid: Uint8Array; locationsCount: number }[]
    warnings: string[]
}

export type RemoveRecordItemError = {
    code: number
    message: string
}

export type RemoveRecordResultItem = {
    recordUid: Uint8Array
    folderUid: Uint8Array
    status: RemoveRecordStatus
    impact?: RemoveRecordImpact
    error?: RemoveRecordItemError
}

export type RemoveRecordResponse = {
    confirmationToken: Uint8Array
    tokenExpiresAt?: number
    results: RemoveRecordResultItem[]
    errorMessage?: string
}

function longToNumber(value: number | { toNumber: () => number } | null | undefined): number | undefined {
    if (value == null) return undefined
    return typeof value === 'number' ? value : value.toNumber()
}

function encodeRecordRemoval(item: RemoveRecordRemovalInput): Uint8Array {
    const writer = Writer.create()
    if (item.folderUid?.length) writer.uint32(10).bytes(item.folderUid)
    writer.uint32(18).bytes(item.recordUid)
    writer.uint32(24).int32(item.operation)
    return writer.finish()
}

function encodeRemoveRecordRequest(request: RemoveRecordRequest): Uint8Array {
    const writer = Writer.create()
    writer.uint32(8).int32(request.action)
    for (const record of request.records) {
        writer.uint32(18).bytes(encodeRecordRemoval(record))
    }
    if (request.confirmationToken?.length) {
        writer.uint32(26).bytes(request.confirmationToken)
    }
    return writer.finish()
}

function skipUnknownField(reader: Reader, wireType: number): void {
    reader.skipType(wireType)
}

function decodeImpact(reader: Reader, length: number): RemoveRecordImpact {
    const end = reader.pos + length
    const impact: RemoveRecordImpact = {
        foldersCount: 0,
        recordsCount: 0,
        affectedUsersCount: 0,
        affectedTeamsCount: 0,
        recordInfo: [],
        warnings: [],
    }
    while (reader.pos < end) {
        const tag = reader.uint32()
        switch (tag >>> 3) {
            case 1:
                impact.foldersCount = reader.int32()
                break
            case 2:
                impact.recordsCount = reader.int32()
                break
            case 3:
                impact.affectedUsersCount = reader.int32()
                break
            case 4:
                impact.affectedTeamsCount = reader.int32()
                break
            case 5: {
                const subLen = reader.uint32()
                const subEnd = reader.pos + subLen
                let recordUid: Uint8Array = new Uint8Array(0)
                let locationsCount = 0
                while (reader.pos < subEnd) {
                    const subTag = reader.uint32()
                    switch (subTag >>> 3) {
                        case 1:
                            recordUid = readBytes(reader)
                            break
                        case 2:
                            locationsCount = reader.int32()
                            break
                        default:
                            skipUnknownField(reader, subTag & 7)
                            break
                    }
                }
                impact.recordInfo.push({ recordUid, locationsCount })
                break
            }
            case 6:
                impact.warnings.push(reader.string())
                break
            default:
                skipUnknownField(reader, tag & 7)
                break
        }
    }
    return impact
}

function decodeItemError(reader: Reader, length: number): RemoveRecordItemError {
    const end = reader.pos + length
    let code = 0
    let message = ''
    while (reader.pos < end) {
        const tag = reader.uint32()
        switch (tag >>> 3) {
            case 1:
                code = reader.int32()
                break
            case 2:
                message = reader.string()
                break
            default:
                skipUnknownField(reader, tag & 7)
                break
        }
    }
    return { code, message }
}

function decodeRemoveResult(reader: Reader, length: number): RemoveRecordResultItem {
    const end = reader.pos + length
    const item: RemoveRecordResultItem = {
        recordUid: new Uint8Array(0),
        folderUid: new Uint8Array(0),
        status: RemoveRecordStatus.Unknown,
    }
    while (reader.pos < end) {
        const tag = reader.uint32()
        switch (tag >>> 3) {
            case 1:
                item.recordUid = readBytes(reader)
                break
            case 2:
                item.folderUid = readBytes(reader)
                break
            case 3:
                item.status = reader.int32() as RemoveRecordStatus
                break
            case 4:
                item.impact = decodeImpact(reader, reader.uint32())
                break
            case 5:
                item.error = decodeItemError(reader, reader.uint32())
                break
            default:
                skipUnknownField(reader, tag & 7)
                break
        }
    }
    return item
}

function decodeRemoveRecordResponse(data: Uint8Array): RemoveRecordResponse {
    const reader = Reader.create(data)
    const response: RemoveRecordResponse = {
        confirmationToken: new Uint8Array(0),
        results: [],
    }
    while (reader.pos < reader.len) {
        const tag = reader.uint32()
        switch (tag >>> 3) {
            case 1:
                response.confirmationToken = readBytes(reader)
                break
            case 2:
                response.tokenExpiresAt = longToNumber(
                    reader.int64() as unknown as number | { toNumber: () => number }
                )
                break
            case 3:
                response.results.push(decodeRemoveResult(reader, reader.uint32()))
                break
            case 4:
                response.errorMessage = reader.string()
                break
            default:
                skipUnknownField(reader, tag & 7)
                break
        }
    }
    return response
}

export function removeRecordMessage(
    request: RemoveRecordRequest
): RestMessage<RemoveRecordRequest, RemoveRecordResponse> {
    return {
        path: REMOVE_RECORD_PATH,
        data: request,
        toBytes(): Uint8Array {
            return encodeRemoveRecordRequest(request)
        },
        fromBytes(data: Uint8Array): RemoveRecordResponse {
            return decodeRemoveRecordResponse(data)
        },
    }
}

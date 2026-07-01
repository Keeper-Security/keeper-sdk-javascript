import type { Auth, Records } from '@keeper-security/keeperapi'
import { recordTypesGetMessage } from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import { NSF_LEGACY_RECORD_TYPES } from './nsfConstants'

type RecordTypeSchema = {
    id?: string
    fields?: unknown[]
}

let cachedAuth: Auth | undefined
let cachedRecordTypes: Records.IRecordType[] | undefined

function parseRecordTypeSchema(content: string): RecordTypeSchema | undefined {
    try {
        const parsed = JSON.parse(content) as Record<string, unknown>
        if (typeof parsed !== 'object' || parsed === null) return undefined
        const id = typeof parsed.$id === 'string' ? parsed.$id : undefined
        const fields = Array.isArray(parsed.fields) ? parsed.fields : undefined
        return { id, fields }
    } catch {
        return undefined
    }
}

async function loadRecordTypes(auth: Auth): Promise<Records.IRecordType[]> {
    if (cachedAuth === auth && cachedRecordTypes) return cachedRecordTypes

    try {
        const response = await auth.executeRest(
            recordTypesGetMessage({
                standard: true,
                user: true,
                enterprise: true,
                pam: true,
            })
        )
        cachedRecordTypes = response.recordTypes ?? []
        cachedAuth = auth
        return cachedRecordTypes
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to load record types: ${extractErrorMessage(err)}`,
            ResultCodes.NSF_ADD_FAILED
        )
    }
}

export async function getNsfRecordTypeFields(
    auth: Auth,
    recordType: string
): Promise<unknown[] | undefined> {
    const normalized = recordType.trim()
    if (!normalized || NSF_LEGACY_RECORD_TYPES.has(normalized)) return undefined

    const types = await loadRecordTypes(auth)
    for (const entry of types) {
        if (!entry.content) continue
        const schema = parseRecordTypeSchema(entry.content)
        if (schema?.id === normalized && schema.fields?.length) {
            return schema.fields
        }
    }
    return undefined
}

export async function validateNsfRecordType(
    auth: Auth,
    recordType: string,
    resultCode: string = ResultCodes.NSF_ADD_FAILED
): Promise<void> {
    const normalized = recordType.trim()
    if (!normalized) {
        throw new KeeperSdkError('Record type is required.', resultCode)
    }
    if (NSF_LEGACY_RECORD_TYPES.has(normalized)) return

    const fields = await getNsfRecordTypeFields(auth, normalized)
    if (!fields?.length) {
        throw new KeeperSdkError(`Record type "${normalized}" cannot be found.`, resultCode)
    }
}

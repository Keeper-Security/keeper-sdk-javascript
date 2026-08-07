import type { Auth, DRecord } from '@keeper-security/keeperapi'
import {
    normal64Bytes,
    setConfigurationControllerMessage,
} from '@keeper-security/keeperapi'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { moveRecord } from '../../records/RecordOperations'
import { getRecordTitle } from '../../records/RecordUtils'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import {
    fetchEnterprisePamControllers,
    findEnterpriseGatewayByUidOrName,
    webSafeUidFromBytes,
} from '../gateway/gatewayHelpers'
import {
    DEFAULT_PAM_CONFIG_SCHEDULE_VALUE,
    PAM_RESOURCES_FIELD_TYPE,
    SCHEDULE_FIELD_TYPE,
} from './configConstants'
import {
    getPamConfigurationDisplayName,
    isPamConfigurationRecord,
    listPamConfigurationRecords,
    parsePamResources,
} from './configHelpers'
import { resolvePamConfigFolder } from './pamConfigFolder'
import type { PamConfigurationRecordFieldInput, PamResourcesInfo } from './configTypes'

export { getPaddedJsonBytes } from './configRecordPayload'

export function normalizeFields(
    fields: PamConfigurationRecordFieldInput[] | undefined
): PamConfigurationRecordFieldInput[] {
    if (!fields?.length) return []
    return fields.map((field) => ({
        type: field.type,
        value: Array.isArray(field.value) ? field.value : field.value == null ? [] : [field.value],
        label: field.label,
    }))
}

export function ensureScheduleField(
    fields: PamConfigurationRecordFieldInput[]
): PamConfigurationRecordFieldInput[] {
    if (fields.some((field) => field.type === SCHEDULE_FIELD_TYPE)) return fields
    return [
        ...fields,
        {
            type: SCHEDULE_FIELD_TYPE,
            value: [...DEFAULT_PAM_CONFIG_SCHEDULE_VALUE],
        },
    ]
}

function fieldKey(field: PamConfigurationRecordFieldInput): string {
    return `${field.type}\0${field.label || ''}`
}

export function mergeRecordFields(
    existing: PamConfigurationRecordFieldInput[],
    updates: PamConfigurationRecordFieldInput[] | undefined
): PamConfigurationRecordFieldInput[] {
    if (!updates?.length) return existing.map((field) => ({ ...field, value: [...field.value] }))

    const merged = existing.map((field) => ({ ...field, value: [...field.value] }))
    const indexByKey = new Map(merged.map((field, index) => [fieldKey(field), index]))

    for (const update of normalizeFields(updates)) {
        const key = fieldKey(update)
        const existingIndex = indexByKey.get(key)
        if (existingIndex == null) {
            indexByKey.set(key, merged.length)
            merged.push({ ...update, value: [...update.value] })
            continue
        }
        merged[existingIndex] = {
            ...merged[existingIndex],
            ...update,
            value: [...update.value],
        }
    }
    return merged
}

export function readTypedRecordPayload(record: DRecord): {
    title: string
    configType: string
    fields: PamConfigurationRecordFieldInput[]
    custom: PamConfigurationRecordFieldInput[]
    notes: string
} {
    const data = record.data && typeof record.data === 'object' ? record.data : {}
    const toInputs = (entries: unknown): PamConfigurationRecordFieldInput[] => {
        if (!Array.isArray(entries)) return []
        return entries
            .filter((entry) => entry && typeof entry === 'object')
            .map((entry) => {
                const field = entry as { type?: string; value?: unknown; label?: string }
                return {
                    type: field.type || 'text',
                    value: Array.isArray(field.value) ? field.value : field.value == null ? [] : [field.value],
                    label: field.label,
                }
            })
    }

    return {
        title: typeof data.title === 'string' ? data.title : getPamConfigurationDisplayName(record),
        configType: typeof data.type === 'string' ? data.type : '',
        fields: toInputs(data.fields),
        custom: toInputs(data.custom),
        notes: typeof data.notes === 'string' ? data.notes : '',
    }
}

export function upsertPamResourcesField(
    fields: PamConfigurationRecordFieldInput[],
    resources: PamResourcesInfo
): PamConfigurationRecordFieldInput[] {
    const pamResources: Record<string, unknown> = {
        controllerUid: resources.gatewayUid || '',
        folderUid: resources.sharedFolderUid || '',
        resourceRef: [...resources.resourceRecordUids],
    }
    if (resources.adminCredentialUid) {
        pamResources.adminCredentialRef = resources.adminCredentialUid
    }
    const without = fields.filter((field) => field.type !== PAM_RESOURCES_FIELD_TYPE)
    return [
        {
            type: PAM_RESOURCES_FIELD_TYPE,
            value: [pamResources],
        },
        ...without,
    ]
}

export function resolveSharedFolderUid(
    storage: InMemoryStorage,
    sharedFolder: string,
    options: { required?: boolean } = {}
): string {
    return resolvePamConfigFolder(storage, sharedFolder, options).uid
}

export type ResolveGatewayUidOptions = {
    failureResultCode?: string
    missingWarning?: string
    notFoundWarning?: (gateway: string) => string
    resolveFailedWarning?: (gateway: string, error: string) => string
}

export async function resolveGatewayUidSoft(
    auth: Auth,
    gatewayUidOrName: string | undefined,
    warnings: string[],
    options: ResolveGatewayUidOptions = {}
): Promise<string> {
    const trimmed = gatewayUidOrName?.trim() || ''
    if (!trimmed) {
        if (options.missingWarning) warnings.push(options.missingWarning)
        return ''
    }

    const failureCode = options.failureResultCode || ResultCodes.PAM_CONFIG_CREATE_FAILED
    try {
        const controllers = await fetchEnterprisePamControllers(auth, failureCode)
        const gateway = findEnterpriseGatewayByUidOrName(controllers, trimmed)
        const gatewayUid = webSafeUidFromBytes(gateway?.controllerUid)
        if (!gatewayUid) {
            warnings.push(
                options.notFoundWarning?.(trimmed) ||
                    `Gateway "${trimmed}" not found. Continuing without updating the gateway controller link.`
            )
            return ''
        }
        return gatewayUid
    } catch (err) {
        warnings.push(
            options.resolveFailedWarning?.(trimmed, extractErrorMessage(err)) ||
                `Failed to resolve gateway "${trimmed}": ${extractErrorMessage(err)}. Continuing without updating the gateway controller link.`
        )
        return ''
    }
}

export function findPamConfigurationByUidOrTitle(storage: InMemoryStorage, uidOrTitle: string): DRecord {
    const trimmed = uidOrTitle.trim()
    if (!trimmed) {
        throw new KeeperSdkError('PAM Configuration UID or title is required.', ResultCodes.PAM_CONFIG_REQUIRED)
    }

    const byUid = storage.getByUid<DRecord>(VaultObjectKind.Record, trimmed)
    if (byUid) {
        if (!isPamConfigurationRecord(byUid)) {
            throw new KeeperSdkError(
                `Record "${trimmed}" is not a PAM Configuration.`,
                ResultCodes.PAM_CONFIG_INVALID
            )
        }
        return byUid
    }

    const lowered = trimmed.toLowerCase()
    const matches = listPamConfigurationRecords(storage).filter((record) => {
        const title = getPamConfigurationDisplayName(record).toLowerCase()
        return title === lowered
    })

    if (matches.length === 0) {
        throw new KeeperSdkError(`PAM Configuration "${trimmed}" not found.`, ResultCodes.PAM_CONFIG_NOT_FOUND)
    }
    if (matches.length > 1) {
        throw new KeeperSdkError(
            `Multiple PAM Configurations match title "${trimmed}". Use the configuration UID instead.`,
            ResultCodes.PAM_MULTIPLE_CONFIG_MATCHES
        )
    }
    return matches[0]
}

export function resolveResourceRecordUidsToRemove(
    storage: InMemoryStorage,
    removeResourceRecords: string[] | undefined,
    currentResourceUids: string[],
    warnings: string[]
): string[] {
    if (!removeResourceRecords?.length) return []

    const removed: string[] = []
    for (const raw of removeResourceRecords) {
        const trimmed = raw.trim()
        if (!trimmed) continue

        if (currentResourceUids.includes(trimmed)) {
            removed.push(trimmed)
            continue
        }

        const lowered = trimmed.toLowerCase()
        const titleMatches = currentResourceUids.filter((uid) => {
            const record = storage.getByUid<DRecord>(VaultObjectKind.Record, uid)
            if (!record) return false
            return getRecordTitle(record).toLowerCase() === lowered
        })

        if (titleMatches.length === 0) {
            warnings.push(`Resource record "${trimmed}" was not found on this configuration and was skipped.`)
            continue
        }
        if (titleMatches.length > 1) {
            warnings.push(
                `Multiple resource records match "${trimmed}"; use a resource UID. Skipped this removal.`
            )
            continue
        }
        removed.push(titleMatches[0])
    }

    return [...new Set(removed)]
}

export async function linkConfigurationController(
    auth: Auth,
    configurationUid: string,
    gatewayUid: string
): Promise<void> {
    await auth.executeRestAction(
        setConfigurationControllerMessage({
            configurationUid: normal64Bytes(configurationUid),
            controllerUid: normal64Bytes(gatewayUid),
        })
    )
}

export async function moveConfigurationToSharedFolder(
    auth: Auth,
    storage: InMemoryStorage,
    configurationUid: string,
    sharedFolderUid: string,
    options: { srcFolderUid?: string } = {}
): Promise<{ success: boolean; message?: string }> {
    try {
        const moveResult = await moveRecord(auth, storage, {
            recordUid: configurationUid,
            dstFolderUid: sharedFolderUid,
            srcFolderUid: options.srcFolderUid,
            canEdit: true,
        })
        return { success: moveResult.success, message: moveResult.message }
    } catch (err) {
        return { success: false, message: extractErrorMessage(err) }
    }
}

export function getPamResourcesFromFields(fields: PamConfigurationRecordFieldInput[]): PamResourcesInfo {
    const field = fields.find((entry) => entry.type === PAM_RESOURCES_FIELD_TYPE)
    const raw = field?.value?.[0]
    if (!raw || typeof raw !== 'object') {
        return { gatewayUid: '', sharedFolderUid: '', resourceRecordUids: [] }
    }
    const data = raw as {
        controllerUid?: unknown
        folderUid?: unknown
        resourceRef?: unknown
        adminCredentialRef?: unknown
    }
    const resourceRecordUids = Array.isArray(data.resourceRef)
        ? data.resourceRef.map((uid) => String(uid || '')).filter(Boolean)
        : typeof data.resourceRef === 'string' && data.resourceRef
          ? [data.resourceRef]
          : []
    return {
        gatewayUid: data.controllerUid != null ? String(data.controllerUid) : '',
        sharedFolderUid: data.folderUid != null ? String(data.folderUid) : '',
        resourceRecordUids,
        adminCredentialUid:
            data.adminCredentialRef != null && String(data.adminCredentialRef).trim()
                ? String(data.adminCredentialRef).trim()
                : undefined,
    }
}

export function parsePamResourcesFromRecord(record: DRecord): PamResourcesInfo {
    return parsePamResources(record)
}

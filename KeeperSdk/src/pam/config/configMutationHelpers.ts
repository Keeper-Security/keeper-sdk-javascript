import type { Auth, DRecord } from '@keeper-security/keeperapi'
import { normal64Bytes, setConfigurationControllerMessage } from '@keeper-security/keeperapi'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { getNsfRecordTypeFields } from '../../nestedShareFolders/nsfRecordTypes'
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
    PAM_CONFIGURATION_FALLBACK_SCHEMA_FIELDS,
    PAM_RESOURCES_FIELD_TYPE,
    SCHEDULE_FIELD_TYPE,
    type PamConfigurationRecordType,
} from './configConstants'
import {
    getPamConfigurationDisplayName,
    isPamConfigurationRecord,
    isPamConfigurationRecordType,
    listPamConfigurationRecords,
} from './configHelpers'
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
        required: field.required,
    }))
}

function toSeededField(entry: { type: string; label?: string; required?: boolean }): PamConfigurationRecordFieldInput {
    return {
        type: entry.type,
        label: entry.label,
        required: entry.required,
        value: [],
    }
}

function getFallbackSchemaFields(configType: string): PamConfigurationRecordFieldInput[] {
    if (!isPamConfigurationRecordType(configType)) return []
    return PAM_CONFIGURATION_FALLBACK_SCHEMA_FIELDS[configType as PamConfigurationRecordType].map((entry) =>
        toSeededField(entry)
    )
}

 async function seedPamConfigurationFieldsFromRecordType(
    auth: Auth,
    configType: string
): Promise<PamConfigurationRecordFieldInput[]> {
    const schemaFields = await getNsfRecordTypeFields(auth, configType)
    if (schemaFields?.length) {
        const seeded: PamConfigurationRecordFieldInput[] = []
        for (const entry of schemaFields) {
            if (!entry || typeof entry !== 'object') continue
            const field = entry as { $ref?: unknown; label?: unknown; required?: unknown }
            const type = typeof field.$ref === 'string' ? field.$ref.trim() : ''
            if (!type) continue
            const label = typeof field.label === 'string' && field.label.trim() ? field.label.trim() : undefined
            const required = field.required === true ? true : undefined
            seeded.push({ type, label, required, value: [] })
        }
        if (seeded.length) return seeded
    }
    return getFallbackSchemaFields(configType)
}

export async function seedPamConfigurationFieldsFromRecordTypeSoft(
    auth: Auth,
    configType: string,
    onWarning: (message: string) => void
): Promise<PamConfigurationRecordFieldInput[]> {
    try {
        const seeded = await seedPamConfigurationFieldsFromRecordType(auth, configType)
        if (!seeded.length) {
            onWarning(
                `No typed-field schema found for configuration type "${configType}". Field values may not display in Vault UI.`
            )
        }
        return seeded
    } catch (err) {
        const fallback = getFallbackSchemaFields(configType)
        onWarning(
            `Failed to load typed fields for configuration type "${configType}": ${extractErrorMessage(err)}. ` +
                (fallback.length
                    ? 'Using built-in PAM configuration field template.'
                    : 'Continuing without schema-seeded fields.')
        )
        return fallback
    }
}

export function ensureScheduleField(fields: PamConfigurationRecordFieldInput[]): PamConfigurationRecordFieldInput[] {
    const scheduleIndex = fields.findIndex((field) => field.type === SCHEDULE_FIELD_TYPE)
    if (scheduleIndex >= 0) {
        const schedule = fields[scheduleIndex]
        if (schedule.value?.length) return fields
        return fields.map((field, index) =>
            index === scheduleIndex
                ? {
                      ...field,
                      label: field.label || 'defaultRotationSchedule',
                      value: [...DEFAULT_PAM_CONFIG_SCHEDULE_VALUE],
                  }
                : field
        )
    }
    return [
        ...fields,
        {
            type: SCHEDULE_FIELD_TYPE,
            label: 'defaultRotationSchedule',
            value: [...DEFAULT_PAM_CONFIG_SCHEDULE_VALUE],
        },
    ]
}

function normalizeFieldKeyToken(value: string | undefined): string {
    return (value || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
}

function fieldKey(field: Pick<PamConfigurationRecordFieldInput, 'type' | 'label'>): string {
    return `${normalizeFieldKeyToken(field.type)}\0${normalizeFieldKeyToken(field.label)}`
}

function cloneField(field: PamConfigurationRecordFieldInput): PamConfigurationRecordFieldInput {
    return {
        type: field.type,
        label: field.label,
        required: field.required,
        value: [...field.value],
    }
}

export function adjustPamConfigurationFields(
    schemaFields: PamConfigurationRecordFieldInput[],
    updates: PamConfigurationRecordFieldInput[] | undefined,
    existingCustom: PamConfigurationRecordFieldInput[] = []
): { fields: PamConfigurationRecordFieldInput[]; custom: PamConfigurationRecordFieldInput[] } {
    const valuePool = [...schemaFields.filter((field) => field.value?.length), ...normalizeFields(updates)].map(
        cloneField
    )

    const fields: PamConfigurationRecordFieldInput[] = []
    const used = new Set<PamConfigurationRecordFieldInput>()

    for (const slot of schemaFields) {
        const slotKey = fieldKey(slot)
        let match =
            valuePool.find((field) => !used.has(field) && fieldKey(field) === slotKey) ||
            valuePool.find(
                (field) =>
                    !used.has(field) &&
                    normalizeFieldKeyToken(field.type) === normalizeFieldKeyToken(slot.type) &&
                    !normalizeFieldKeyToken(field.label) &&
                    field.value?.length
            )

        if (!match && (!slot.label || slot.type === PAM_RESOURCES_FIELD_TYPE || slot.type === 'fileRef')) {
            match = valuePool.find(
                (field) => !used.has(field) && normalizeFieldKeyToken(field.type) === normalizeFieldKeyToken(slot.type)
            )
        }

        if (match) {
            used.add(match)
            fields.push({
                type: slot.type || match.type,
                label: slot.label || match.label,
                required: slot.required ?? match.required,
                value: [...match.value],
            })
        } else {
            fields.push({
                type: slot.type,
                label: slot.label,
                required: slot.required,
                value: [],
            })
        }
    }

    const leftover = valuePool.filter((field) => !used.has(field) && field.value?.length)
    const custom = mergeRecordFields(existingCustom, leftover)
    return { fields, custom }
}

export function mergeRecordFields(
    existing: PamConfigurationRecordFieldInput[],
    updates: PamConfigurationRecordFieldInput[] | undefined
): PamConfigurationRecordFieldInput[] {
    if (!updates?.length) return existing.map(cloneField)

    const merged = existing.map(cloneField)
    const indexByKey = new Map(merged.map((field, index) => [fieldKey(field), index]))

    for (const update of normalizeFields(updates)) {
        const key = fieldKey(update)
        const existingIndex = indexByKey.get(key)
        if (existingIndex == null) {
            indexByKey.set(key, merged.length)
            merged.push(cloneField(update))
            continue
        }
        const existingField = merged[existingIndex]
        merged[existingIndex] = {
            ...existingField,
            type: existingField.type || update.type,
            label: existingField.label || update.label,
            required: existingField.required ?? update.required,
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
                const field = entry as { type?: string; value?: unknown; label?: string; required?: boolean }
                return {
                    type: field.type || 'text',
                    value: Array.isArray(field.value) ? field.value : field.value == null ? [] : [field.value],
                    label: field.label,
                    required: field.required === true ? true : undefined,
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

    const index = fields.findIndex((field) => field.type === PAM_RESOURCES_FIELD_TYPE)
    if (index >= 0) {
        return fields.map((field, i) =>
            i === index
                ? {
                      type: PAM_RESOURCES_FIELD_TYPE,
                      label: field.label,
                      required: field.required,
                      value: [pamResources],
                  }
                : field
        )
    }

    return [
        {
            type: PAM_RESOURCES_FIELD_TYPE,
            required: true,
            value: [pamResources],
        },
        ...fields,
    ]
}

export type ResolveGatewayUidOptions = {
    failureResultCode?: (typeof ResultCodes)[keyof typeof ResultCodes]
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
            throw new KeeperSdkError(`Record "${trimmed}" is not a PAM Configuration.`, ResultCodes.PAM_CONFIG_INVALID)
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
            warnings.push(`Multiple resource records match "${trimmed}"; use a resource UID. Skipped this removal.`)
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

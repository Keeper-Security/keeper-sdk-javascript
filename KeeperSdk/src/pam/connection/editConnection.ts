import type { Auth, DRecord, PAM, Router } from '@keeper-security/keeperapi'
import { normal64Bytes, pamConfigureNetworkGraphMessage } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { updateRecord } from '../../records/RecordOperations'
import { updateNestedShareRecord } from '../../nestedShareFolders/updateNsfRecord'
import { isNestedShareRecord } from '../../nestedShareFolders/nsfHelpers'
import { getRecordType } from '../../records/RecordUtils'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import { PAM_CONNECTION_CONFIG_TYPES, PAM_CONNECTION_RESOURCE_TYPES } from './connectionConstants'
import {
    applyResourceRecordSettings,
    getCachedConfigurationUid,
    getTypedRecordData,
    isConnectionConfig,
    isConnectionResource,
    makeAllowedSettings,
    makeConnectionSettingsBytes,
    recordUidBytes,
    resolveConnectionRecord,
    resolvePamUserUid,
    validateConnectionInput,
} from './connectionHelpers'
import type { PamConnectionEditInput, PamConnectionEditResult } from './connectionTypes'

function resolveConfiguration(storage: InMemoryStorage, record: DRecord, input: PamConnectionEditInput): DRecord | undefined {
    if (input.configuration) return resolveConnectionRecord(storage, input.configuration)
    if (isConnectionConfig(record)) return record
    const cachedUid = getCachedConfigurationUid(storage, record.uid)
    return cachedUid ? resolveConnectionRecord(storage, cachedUid) : undefined
}

function toFieldEntries(entries: Array<Record<string, unknown>>): Array<{ type: string; label?: string; value: unknown[] }> {
    return entries.map((entry) => ({
        type: String(entry.type || ''),
        label: typeof entry.label === 'string' ? entry.label : undefined,
        value: Array.isArray(entry.value) ? entry.value : [],
    }))
}

async function persistResourceRecord(
    auth: Auth,
    storage: InMemoryStorage,
    record: DRecord,
    data: ReturnType<typeof getTypedRecordData>
): Promise<boolean> {
    if (isNestedShareRecord(storage, record.uid)) {
        const result = await updateNestedShareRecord(storage, auth, {
            record: record.uid,
            recordType: data.type,
            title: data.title,
            notes: data.notes,
            fieldEntries: toFieldEntries(data.fields),
            customEntries: toFieldEntries(data.custom),
        })
        return result.success
    }
    const key = await storage.getKeyBytes(record.uid)
    if (!key) throw new KeeperSdkError(`Record key not available for ${record.uid}.`, ResultCodes.NSF_MISSING_KEY)
    const result = await updateRecord(auth, record.uid, data, record.revision, key)
    return result.success
}

export async function editPamConnection(
    auth: Auth,
    storage: InMemoryStorage,
    input: PamConnectionEditInput
): Promise<PamConnectionEditResult> {
    validateConnectionInput(input)
    const record = resolveConnectionRecord(storage, input.record.trim())
    if (!record) throw new KeeperSdkError(`Record "${input.record}" not found.`, ResultCodes.PAM_CONNECTION_RECORD_NOT_FOUND)

    const recordType = getRecordType(record)
    if (!(isConnectionConfig(record) || isConnectionResource(record))) {
        throw new KeeperSdkError(
            `Record type "${recordType}" is not supported for PAM connections.`,
            ResultCodes.PAM_CONNECTION_CONFIGURATION_INVALID
        )
    }
    const configuration = resolveConfiguration(storage, record, input)
    if (!configuration) {
        throw new KeeperSdkError(
            'No PAM Configuration UID set. Supply the configuration option or link the resource first.',
            ResultCodes.PAM_CONNECTION_CONFIGURATION_REQUIRED
        )
    }
    if (!PAM_CONNECTION_CONFIG_TYPES.includes(getRecordType(configuration) as (typeof PAM_CONNECTION_CONFIG_TYPES)[number])) {
        throw new KeeperSdkError('The selected record is not a supported PAM Configuration.', ResultCodes.PAM_CONNECTION_CONFIGURATION_INVALID)
    }

    const adminUid = resolvePamUserUid(storage, input.adminUser)
    const launchUid = resolvePamUserUid(storage, input.launchUser)
    let recordUpdated = false
    let dagUpdated = false
    const warnings: string[] = []

    if (isConnectionConfig(record)) {
        const allowedSettings = makeAllowedSettings(input)
        if (Object.keys(allowedSettings).length > 0) {
            await auth.executeRouterRestAction(
                pamConfigureNetworkGraphMessage({
                    recordUid: recordUidBytes(record.uid),
                    networkSettings: { allowedSettings: new TextEncoder().encode(JSON.stringify(allowedSettings)) },
                })
            )
            dagUpdated = true
        }
    } else {
        const modified = applyResourceRecordSettings(record, input)
        if (modified.changed) {
            recordUpdated = await persistResourceRecord(auth, storage, record, modified.data)
        }

        const resource: PAM.IPAMResourceConfig = {
            recordUid: normal64Bytes(record.uid),
            networkUid: normal64Bytes(configuration.uid),
            adminUid: adminUid ? normal64Bytes(adminUid) : undefined,
            connectionSettings: makeConnectionSettingsBytes(modified.data),
            connectUsers: launchUid ? { uids: [normal64Bytes(launchUid)] } : undefined,
        }
        await auth.executeRouterRestAction(
            pamConfigureNetworkGraphMessage({
                recordUid: normal64Bytes(configuration.uid),
                resources: [resource],
                networkSettings: Object.keys(makeAllowedSettings(input)).length
                    ? { allowedSettings: new TextEncoder().encode(JSON.stringify(makeAllowedSettings(input))) }
                    : undefined,
            })
        )
        dagUpdated = true
    }

    return {
        recordUid: record.uid,
        recordType,
        configurationUid: configuration.uid,
        changed: recordUpdated || dagUpdated,
        recordUpdated,
        dagUpdated,
        warnings,
    }
}

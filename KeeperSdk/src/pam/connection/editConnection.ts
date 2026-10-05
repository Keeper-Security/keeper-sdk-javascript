import { GraphSync, pamAddDataMessage, platform } from '@keeper-security/keeperapi'
import type { Auth, DRecord } from '@keeper-security/keeperapi'
import { getConfigRootsForRecordUids, normal64Bytes, webSafe64FromBytes } from '@keeper-security/keeperapi'
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
    makeResourceMetaBytes,
    resolveConnectionRecord,
    resolvePamUserUid,
    validateConnectionInput,
} from './connectionHelpers'
import type { PamConnectionEditInput, PamConnectionEditResult } from './connectionTypes'

export async function editPamConnection(
    auth: Auth,
    storage: InMemoryStorage,
    input: PamConnectionEditInput
): Promise<PamConnectionEditResult> {
    validateConnectionInput(input)
    const record = resolveConnectionRecord(storage, input.record.trim())
    if (!record)
        throw new KeeperSdkError(`Record "${input.record}" not found.`, ResultCodes.PAM_CONNECTION_RECORD_NOT_FOUND)

    const recordType = getRecordType(record)
    if (!(isConnectionConfig(record) || isConnectionResource(record))) {
        throw new KeeperSdkError(
            `Record type "${recordType}" is not supported for PAM connections.`,
            ResultCodes.PAM_CONNECTION_CONFIGURATION_INVALID
        )
    }
    const configuration = await resolveConfiguration(auth, storage, record, input)
    if (!configuration) {
        throw new KeeperSdkError(
            'No PAM Configuration UID set. Supply the configuration option or link the resource first.',
            ResultCodes.PAM_CONNECTION_CONFIGURATION_REQUIRED
        )
    }
    if (
        !PAM_CONNECTION_CONFIG_TYPES.includes(
            getRecordType(configuration) as (typeof PAM_CONNECTION_CONFIG_TYPES)[number]
        )
    ) {
        throw new KeeperSdkError(
            'The selected record is not a supported PAM Configuration.',
            ResultCodes.PAM_CONNECTION_CONFIGURATION_INVALID
        )
    }

    const adminUid = resolvePamUserUid(storage, input.adminUser)
    const launchUid = resolvePamUserUid(storage, input.launchUser)
    const supportsUserLinks = ['pamMachine', 'pamDatabase', 'pamDirectory'].includes(recordType)
    let recordUpdated = false
    let dagUpdated = false
    const warnings: string[] = []

    const graphData: GraphSync.IGraphSyncData[] = []
    const refType = (type: string): GraphSync.RefType => {
        if (type === 'pamRemoteBrowser') return GraphSync.RefType.RFT_PAM_BROWSER
        if (type === 'pamDatabase') return GraphSync.RefType.RFT_PAM_DATABASE
        if (type === 'pamDirectory') return GraphSync.RefType.RFT_PAM_DIRECTORY
        return GraphSync.RefType.RFT_PAM_MACHINE
    }
    const ref = (uid: string, type: GraphSync.RefType): GraphSync.IGraphSyncRef => ({
        type,
        value: normal64Bytes(uid),
    })
    const addGraphData = async () => {
        if (graphData.length === 0) return
        await auth.executeRouterRestAction(
            pamAddDataMessage({
                origin: { type: GraphSync.RefType.RFT_DEVICE, value: platform.getRandomBytes(16) },
                data: graphData,
            })
        )
    }

    if (isConnectionConfig(record)) {
        const allowedSettings = makeAllowedSettings(input)
        if (Object.keys(allowedSettings).length > 0) {
            const configurationRef = ref(record.uid, GraphSync.RefType.RFT_PAM_NETWORK)
            graphData.push({
                type: GraphSync.GraphSyncDataType.GSE_DATA,
                ref: configurationRef,
                parentRef: configurationRef,
                content: platform.stringToBytes(JSON.stringify({ allowedSettings })),
                path: 'meta',
            })
            await addGraphData()
            dagUpdated = true
        }
    } else {
        if (
            (input.protocol !== undefined || input.connectionsOverridePort !== undefined) &&
            input.connections !== 'on'
        ) {
            warnings.push(
                'Connection protocol and override port can only be set when connections are enabled with connections=on.'
            )
        }
        const modified = applyResourceRecordSettings(record, input)
        if (modified.changed) {
            recordUpdated = await persistResourceRecord(auth, storage, record, modified.data)
        }

        const configurationRef = ref(configuration.uid, GraphSync.RefType.RFT_PAM_NETWORK)
        const resourceRef = ref(record.uid, refType(recordType))
        graphData.push({ type: GraphSync.GraphSyncDataType.GSE_LINK, ref: resourceRef, parentRef: configurationRef })
        const resourceMeta = makeResourceMetaBytes(input, recordType)
        if (resourceMeta) {
            graphData.push({
                type: GraphSync.GraphSyncDataType.GSE_DATA,
                ref: resourceRef,
                parentRef: resourceRef,
                content: resourceMeta,
                path: 'meta',
            })
        }
        if (adminUid && supportsUserLinks) {
            graphData.push({
                type: GraphSync.GraphSyncDataType.GSE_ACL,
                ref: ref(adminUid, GraphSync.RefType.RFT_PAM_USER),
                parentRef: resourceRef,
                content: platform.stringToBytes(JSON.stringify({ is_admin: true, belongs_to: true })),
            })
        }
        if (launchUid && supportsUserLinks) {
            graphData.push({
                type: GraphSync.GraphSyncDataType.GSE_ACL,
                ref: ref(launchUid, GraphSync.RefType.RFT_PAM_USER),
                parentRef: resourceRef,
                content: platform.stringToBytes(JSON.stringify({ is_admin: true, belongs_to: true })),
            })
        }
        await addGraphData()
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

async function resolveConfiguration(
    auth: Auth,
    storage: InMemoryStorage,
    record: DRecord,
    input: PamConnectionEditInput
): Promise<DRecord | undefined> {
    if (input.configuration) return resolveConnectionRecord(storage, input.configuration)
    if (isConnectionConfig(record)) return record
    const cachedUid = getCachedConfigurationUid(storage, record.uid)
    if (cachedUid) return resolveConnectionRecord(storage, cachedUid)
    const refs = await getConfigRootsForRecordUids(auth, [record.uid])
    const linkedConfigUid = refs.find((ref) => ref.value && ref.value.length > 0)?.value
    return linkedConfigUid ? resolveConnectionRecord(storage, webSafe64FromBytes(linkedConfigUid)) : undefined
}

function toFieldEntries(
    entries: Array<Record<string, unknown>>
): Array<{ type: string; label?: string; value: unknown[] }> {
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

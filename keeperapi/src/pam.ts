import {Auth} from './auth'
import {GraphSync} from './proto'
import {normal64Bytes, webSafe64FromBytes} from './utils'
import {pamGetLeafsMessage, pamMultiSyncMessage, pamSyncMessage} from './restMessages'

/**
 * Syncs the PAM link DAG for a single record UID.
 * Resolves the config root via get_leafs, then syncs that stream.
 * Use this for on-demand per-record syncing.
 */
export async function syncDagForPamRecord(
    auth: Auth,
    recordUid: string,
    origin?: Uint8Array
): Promise<GraphSync.IGraphSyncMultiResult> {
    const recordUidBytes = normal64Bytes(recordUid)
    const leafsResult = await auth.executeRouterRest(pamGetLeafsMessage({ vertices: [recordUidBytes] }))
    const refs = leafsResult.refs ?? []
    if (refs.length === 0) {
        return { results: [] }
    }
    const queries: GraphSync.IGraphSyncQuery[] = refs
        .filter(ref => ref.value && ref.value.length > 0)
        .map(ref => ({
            streamId: ref.value!,
            origin,
            syncPoint: 0
        }))
    if (queries.length === 0) {
        return { results: [] }
    }
    return auth.executeRouterRest(pamMultiSyncMessage({ queries }))
}

/**
 * Syncs the PAM link DAG for a known config root UID.
 * Use this when the config/network UID is already known.
 */
export async function syncPamLinkDagForConfigRoot(
    auth: Auth,
    configUid: string,
    syncPoint: number = 0,
    origin?: Uint8Array
): Promise<GraphSync.IGraphSyncResult> {
    const streamId = normal64Bytes(configUid)
    return auth.executeRouterRest(pamSyncMessage({ streamId, origin, syncPoint }))
}

/**
 * Bulk-loads the PAM link DAG for multiple record UIDs and/or config UIDs.
 * Resolves config roots for all record UIDs via get_leafs, unions with explicit
 * configUids, then multi-syncs all streams. Use this for startup bulk loading.
 */
export async function loadPamLinkDag(
    auth: Auth,
    recordUids: string[],
    configUids: string[] = [],
    origin?: Uint8Array
): Promise<GraphSync.IGraphSyncMultiResult> {
    const uniqueConfigUidBytes = new Map<string, Uint8Array>()

    if (recordUids.length > 0) {
        const vertices = recordUids.map(uid => normal64Bytes(uid))
        const leafsResult = await auth.executeRouterRest(pamGetLeafsMessage({ vertices }))
        for (const ref of leafsResult.refs ?? []) {
            if (ref.value && ref.value.length > 0) {
                const key = webSafe64FromBytes(ref.value)
                uniqueConfigUidBytes.set(key, ref.value)
            }
        }
    }

    for (const uid of configUids) {
        const bytes = normal64Bytes(uid)
        uniqueConfigUidBytes.set(uid, bytes)
    }

    if (uniqueConfigUidBytes.size === 0) {
        return { results: [] }
    }

    const queries: GraphSync.IGraphSyncQuery[] = Array.from(uniqueConfigUidBytes.values()).map(streamId => ({
        streamId,
        origin,
        syncPoint: 0,
        maxCount: 500
    }))

    return auth.executeRouterRest(pamMultiSyncMessage({ queries }))
}

/**
 * Fetches the config root UIDs (stream IDs) for the given leaf (resource) UIDs.
 * Returns the raw refs from the router response.
 */
export async function getConfigRootsForRecordUids(
    auth: Auth,
    recordUids: string[]
): Promise<GraphSync.IGraphSyncRef[]> {
    if (recordUids.length === 0) return []
    const vertices = recordUids.map(uid => normal64Bytes(uid))
    const result = await auth.executeRouterRest(pamGetLeafsMessage({ vertices }))
    return result.refs ?? []
}

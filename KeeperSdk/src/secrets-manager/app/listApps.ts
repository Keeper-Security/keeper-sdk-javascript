import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import {
    formatTimestampMs,
    getKsmApplicationDisplayInfo,
    toFiniteNumber,
    webSafeUidFromBytes,
} from '../../pam/gateway/gatewayHelpers'
import {
    EMPTY_SECRETS_MANAGER_APPS_MESSAGE,
    APP_NOT_IN_LOCAL_VAULT_LABEL,
    SECRETS_MANAGER_APP_LIST_HEADERS,
} from './appConstants'
import { fetchApplicationSummaries, renderAsciiTable, toOptionalTimestamp } from './appHelpers'
import type {
    FormattedSecretsManagerTable,
    ListSecretsManagerAppsResult,
    RenderSecretsManagerAsciiTableOptions,
    SecretsManagerAppListRow,
} from './appTypes'

export async function listApps(auth: Auth, storage: InMemoryStorage): Promise<ListSecretsManagerAppsResult> {
    const summaries = await fetchApplicationSummaries(auth)

    const apps: SecretsManagerAppListRow[] = []
    for (const summary of summaries) {
        const appUid = webSafeUidFromBytes(summary.appRecordUid)
        if (!appUid) continue
        apps.push({
            appUid,
            appName: getKsmApplicationDisplayInfo(storage, appUid).name,
            records: toFiniteNumber(summary.folderRecords),
            folders: toFiniteNumber(summary.folderShares),
            devices: toFiniteNumber(summary.clientCount),
            lastAccess: toOptionalTimestamp(summary.lastAccess),
        })
    }

    apps.sort(compareAppListRows)

    return {
        apps,
        message: apps.length === 0 ? EMPTY_SECRETS_MANAGER_APPS_MESSAGE : undefined,
    }
}

function compareAppListRows(a: SecretsManagerAppListRow, b: SecretsManagerAppListRow): number {
    if (a.appName == null || b.appName == null) {
        if (a.appName != null) return -1
        if (b.appName != null) return 1
        return a.appUid.localeCompare(b.appUid)
    }
    return a.appName.localeCompare(b.appName, undefined, { sensitivity: 'base' })
}

export function formatAppsTable(result: ListSecretsManagerAppsResult): FormattedSecretsManagerTable {
    const rows = result.apps.map((app) => [
        app.appName ?? APP_NOT_IN_LOCAL_VAULT_LABEL,
        app.appUid,
        String(app.records),
        String(app.folders),
        String(app.devices),
        formatTimestampMs(app.lastAccess),
    ])
    return { headers: [...SECRETS_MANAGER_APP_LIST_HEADERS], rows }
}

export function renderAppsAsciiTable(
    table: FormattedSecretsManagerTable,
    options: RenderSecretsManagerAsciiTableOptions = {}
): string {
    return renderAsciiTable(table, options)
}

export function formatAppsOutput(result: ListSecretsManagerAppsResult): string {
    if (result.message && result.apps.length === 0) return result.message
    return renderAppsAsciiTable(formatAppsTable(result))
}

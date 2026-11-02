import type { Auth, Authentication } from '@keeper-security/keeperapi'
import { getApplicationsSummaryMessage } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import {
    formatTimestampMs,
    getKsmApplicationDisplayInfo,
    toFiniteNumber,
    webSafeUidFromBytes,
} from '../../pam/gateway/gatewayHelpers'
import { EMPTY_SECRETS_MANAGER_APPS_MESSAGE, SECRETS_MANAGER_APP_LIST_HEADERS } from './appConstants'
import { renderAsciiTable, toOptionalTimestamp } from './appHelpers'
import type {
    FormattedSecretsManagerTable,
    ListSecretsManagerAppsResult,
    RenderSecretsManagerAsciiTableOptions,
    SecretsManagerAppListRow,
} from './appTypes'

async function fetchApplicationSummaries(auth: Auth): Promise<Authentication.IApplicationSummary[]> {
    try {
        const response = await auth.executeRest(getApplicationsSummaryMessage())
        return response.applicationSummary ?? []
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to list Secrets Manager applications: ${extractErrorMessage(err)}`,
            ResultCodes.SECRETS_MANAGER_APP_LIST_FAILED
        )
    }
}

export async function listApps(auth: Auth, storage: InMemoryStorage): Promise<ListSecretsManagerAppsResult> {
    const summaries = await fetchApplicationSummaries(auth)

    const apps: SecretsManagerAppListRow[] = []
    for (const summary of summaries) {
        const appUid = webSafeUidFromBytes(summary.appRecordUid)
        const appName = getKsmApplicationDisplayInfo(storage, appUid).name
        if (appName == null) continue
        apps.push({
            appUid,
            appName,
            records: toFiniteNumber(summary.folderRecords),
            folders: toFiniteNumber(summary.folderShares),
            devices: toFiniteNumber(summary.clientCount),
            lastAccess: toOptionalTimestamp(summary.lastAccess),
        })
    }

    apps.sort((a, b) => a.appName.localeCompare(b.appName, undefined, { sensitivity: 'base' }))

    return {
        apps,
        message: apps.length === 0 ? EMPTY_SECRETS_MANAGER_APPS_MESSAGE : undefined,
    }
}

export function formatAppsTable(result: ListSecretsManagerAppsResult): FormattedSecretsManagerTable {
    const rows = result.apps.map((app) => [
        app.appName,
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

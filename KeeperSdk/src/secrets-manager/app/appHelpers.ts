import type { Auth, Authentication, DRecord } from '@keeper-security/keeperapi'
import { getApplicationsSummaryMessage, getAppInfoMessage, normal64Bytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { getRecordTitle } from '../../records/RecordUtils'
import {
    formatTimestampMs,
    isKsmApplicationRecord,
    toFiniteNumber,
    webSafeUidFromBytes,
} from '../../pam/gateway/gatewayHelpers'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import { DEFAULT_MIN_COLUMN_WIDTH, NEVER_LABEL } from './appConstants'
import type { FormattedSecretsManagerTable, RenderSecretsManagerAsciiTableOptions } from './appTypes'

export async function fetchApplicationSummaries(auth: Auth): Promise<Authentication.IApplicationSummary[]> {
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

export async function assertAppCacheInSync(auth: Auth, storage: InMemoryStorage): Promise<void> {
    const summaries = await fetchApplicationSummaries(auth)
    const unsyncedCount = summaries
        .map((summary) => webSafeUidFromBytes(summary.appRecordUid))
        .filter((appUid) => appUid && !storage.getByUid<DRecord>(VaultObjectKind.Record, appUid)).length
    if (unsyncedCount > 0) {
        throw new KeeperSdkError(
            `Cannot verify the application name: ${unsyncedCount} Secrets Manager application(s) on the server are not in the local vault. Sync the vault and try again.`,
            ResultCodes.SECRETS_MANAGER_APP_CACHE_OUT_OF_SYNC
        )
    }
}

export async function fetchAppInfo(auth: Auth, appUid: string): Promise<Authentication.IAppInfo> {
    let appInfo: Authentication.IAppInfo | undefined
    try {
        const response = await auth.executeRest(getAppInfoMessage({ appRecordUid: [normal64Bytes(appUid)] }))
        appInfo = response.appInfo?.[0]
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to get Secrets Manager application "${appUid}": ${extractErrorMessage(err)}`,
            ResultCodes.SECRETS_MANAGER_APP_GET_FAILED
        )
    }
    if (!appInfo) {
        throw new KeeperSdkError(
            `No information returned for Secrets Manager application "${appUid}".`,
            ResultCodes.SECRETS_MANAGER_APP_GET_FAILED
        )
    }
    return appInfo
}

export function findAppRecord(storage: InMemoryStorage, appNameOrUid: string): DRecord | undefined {
    const lower = appNameOrUid.toLowerCase()
    return storage
        .getRecords()
        .find(
            (record) =>
                isKsmApplicationRecord(record) &&
                (record.uid === appNameOrUid || getRecordTitle(record).toLowerCase() === lower)
        )
}

export function toOptionalTimestamp(value: number | null | undefined): number | null {
    return toFiniteNumber(value) || null
}

export function formatTimestampOrNever(value: number | null): string {
    return formatTimestampMs(value) || NEVER_LABEL
}

export function renderAsciiTable(
    table: FormattedSecretsManagerTable,
    options: RenderSecretsManagerAsciiTableOptions = {}
): string {
    const minColWidth = options.minColWidth ?? DEFAULT_MIN_COLUMN_WIDTH
    const widths = table.headers.map((header, col) =>
        Math.max(minColWidth, header.length, ...table.rows.map((row) => (row[col] || '').length))
    )
    const formatRow = (cells: string[]): string => cells.map((cell, i) => (cell || '').padEnd(widths[i])).join('  ')
    return [formatRow(table.headers), widths.map((w) => '-'.repeat(w)).join('  '), ...table.rows.map(formatRow)].join(
        '\n'
    )
}

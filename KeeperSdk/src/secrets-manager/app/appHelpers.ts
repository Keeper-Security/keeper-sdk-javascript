import type { Auth, Authentication, DRecord } from '@keeper-security/keeperapi'
import { getAppInfoMessage, normal64Bytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { getRecordTitle } from '../../records/RecordUtils'
import { formatTimestampMs, isKsmApplicationRecord, toFiniteNumber } from '../../pam/gateway/gatewayHelpers'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import { DEFAULT_MIN_COLUMN_WIDTH, NEVER_LABEL } from './appConstants'
import type { FormattedSecretsManagerTable, RenderSecretsManagerAsciiTableOptions } from './appTypes'

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

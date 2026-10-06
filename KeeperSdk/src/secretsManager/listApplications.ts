import type { Auth, Authentication, DRecord } from '@keeper-security/keeperapi'
import { getApplicationsSummaryMessage, webSafe64FromBytes } from '@keeper-security/keeperapi'
import { VaultObjectKind } from '../folders/folderHelpers'
import { formatTimestampMs } from '../pam/gateway/gatewayHelpers'
import { getRecordTitle } from '../records/RecordUtils'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { SECRETS_MANAGER_APP_LIST_HEADERS } from './constants'
import { toFiniteNumber, toTimestampOrNull } from './helpers'
import type { FormattedSecretsManagerAppsTable, SecretsManagerAppRow } from './types'

export async function listSecretsManagerApps(auth: Auth, storage: InMemoryStorage): Promise<SecretsManagerAppRow[]> {
    const response = await auth.executeRest(getApplicationsSummaryMessage())
    const summaries: Authentication.IApplicationSummary[] = response.applicationSummary ?? []

    return summaries
        .filter((summary: Authentication.IApplicationSummary): boolean => Boolean(summary.appRecordUid?.length))
        .map((summary: Authentication.IApplicationSummary): SecretsManagerAppRow => {
            const uid = webSafe64FromBytes(summary.appRecordUid!)
            const record = storage.getByUid<DRecord>(VaultObjectKind.Record, uid)

            return {
                name: record ? getRecordTitle(record) : '',
                uid,
                records: toFiniteNumber(summary.folderRecords),
                folders: toFiniteNumber(summary.folderShares),
                devices: toFiniteNumber(summary.clientCount),
                last_access: toTimestampOrNull(summary.lastAccess),
            }
        })
}

export function formatSecretsManagerAppsTable(rows: SecretsManagerAppRow[]): FormattedSecretsManagerAppsTable {
    return {
        headers: [...SECRETS_MANAGER_APP_LIST_HEADERS],
        rows: rows.map((app: SecretsManagerAppRow): string[] => [
            app.name,
            app.uid,
            String(app.records),
            String(app.folders),
            String(app.devices),
            formatTimestampMs(app.last_access),
        ]),
    }
}

export function renderSecretsManagerAppsAsciiTable(table: FormattedSecretsManagerAppsTable): string {
    const widths = table.headers.map((header: string, index: number): number => {
        const rowWidth = table.rows.reduce((width: number, row: string[]): number => {
            return Math.max(width, row[index]?.length ?? 0)
        }, 0)
        return Math.max(header.length, rowWidth, 2)
    })

    const formatRow = (row: string[]): string =>
        row.map((cell: string, index: number): string => cell.padEnd(widths[index])).join('  ')

    return [
        formatRow(table.headers),
        widths.map((width: number): string => '-'.repeat(width)).join('  '),
        ...table.rows.map(formatRow),
    ].join('\n')
}

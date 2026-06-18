import type { WhoamiInfo } from '../../account/whoamiInfo'

const SECTION_RULE = '─'.repeat(50)
const LABEL_WIDTH = 24

export function formatWhoamiJson(info: WhoamiInfo, options: { verbose?: boolean } = {}): string {
    const payload: Record<string, unknown> = {
        logged_in: true,
        user: info.user,
        server: info.server,
        data_center: info.dataCenter,
        admin: info.admin,
        account_type: info.accountType,
        renewal_date: info.renewalDate,
        storage_capacity: info.storageCapacity,
        storage_usage: info.storageUsage,
        storage_renewal_date: info.storageRenewalDate,
        breachwatch: info.breachWatch,
    }

    if (options.verbose) {
        payload.reporting_and_alerts = info.reportingAndAlerts
        payload.records_count = info.recordsCount ?? 0
        payload.shared_folders_count = info.sharedFoldersCount ?? 0
        payload.teams_count = info.teamsCount ?? 0
    }

    return JSON.stringify(payload, null, 2) + '\n'
}

export function formatWhoamiOutput(info: WhoamiInfo, options: { verbose?: boolean } = {}): string {
    const userRows = [
        { label: 'User', value: info.user },
        { label: 'Server', value: info.server },
        { label: 'Data Center', value: info.dataCenter },
        { label: 'Admin', value: info.admin ? 'Yes' : 'No' },
    ]

    if (options.verbose) {
        userRows.push(
            { label: 'Records', value: String(info.recordsCount ?? 0) },
            { label: 'Shared Folders', value: String(info.sharedFoldersCount ?? 0) },
            { label: 'Teams', value: String(info.teamsCount ?? 0) }
        )
    }

    const accountRows = [
        { label: 'Account Type', value: info.accountType },
        { label: 'Renewal Date', value: info.renewalDate },
        { label: 'Storage Capacity', value: info.storageCapacity },
        { label: 'Usage', value: info.storageUsage },
        { label: 'Storage Renewal Date', value: info.storageRenewalDate },
        { label: 'BreachWatch', value: info.breachWatch ? 'Yes' : 'No' },
    ]

    if (options.verbose) {
        accountRows.push({
            label: 'Reporting & Alerts',
            value: info.reportingAndAlerts ? 'Yes' : 'No',
        })
    }

    const sections = [renderWhoamiSection('User Info', userRows), renderWhoamiSection('Account', accountRows)]
    return `\n${sections.join('\n\n')}\n`
}

function renderWhoamiSection(title: string, rows: { label: string; value: string }[]): string {
    const lines = [`  ${title}`, `  ${SECTION_RULE}`]
    for (const row of rows) {
        lines.push(`  ${row.label.padStart(LABEL_WIDTH)}: ${row.value}`)
    }
    return lines.join('\n')
}

import type { AccountSummary } from '@keeper-security/keeperapi'
import type { VaultSummary } from '../vault/KeeperVault'
import { KEEPER_PUBLIC_HOSTS } from '../utils/constants'

export type WhoamiInfo = {
    user: string
    server: string
    dataCenter: string
    admin: boolean
    accountType: string
    renewalDate: string
    storageCapacity: string
    storageUsage: string
    storageRenewalDate: string
    breachWatch: boolean
    reportingAndAlerts: boolean
    recordsCount?: number
    sharedFoldersCount?: number
    teamsCount?: number
}

export type BuildWhoamiInfoInput = {
    username: string
    host: string
    accountSummary: AccountSummary.IAccountSummaryElements
    vaultSummary?: VaultSummary
}

export function normalizeServerHost(host: string): string {
    return host.toLowerCase().trim().replace(/^(qa|dev|dev2|local)\./, '')
}

export function resolveDataCenter(host: string): string {
    const normalized = normalizeServerHost(host)
    for (const [dataCenter, publicHost] of Object.entries(KEEPER_PUBLIC_HOSTS)) {
        if (normalized === publicHost || normalized.endsWith(`.${publicHost}`)) {
            return dataCenter
        }
    }
    return 'US'
}

export function buildWhoamiInfo(input: BuildWhoamiInfoInput): WhoamiInfo {
    const license = input.accountSummary.license ?? input.accountSummary.personalLicense ?? {}
    const server = normalizeServerHost(input.host)

    const info: WhoamiInfo = {
        user: input.username,
        server,
        dataCenter: resolveDataCenter(input.host),
        admin: !!input.accountSummary.isEnterpriseAdmin,
        accountType: formatAccountType(license),
        renewalDate: formatRenewalDate(license),
        storageCapacity: formatStorageCapacity(license.bytesTotal),
        storageUsage: formatStorageUsage(license.bytesUsed, license.bytesTotal),
        storageRenewalDate: formatRenewalDateField(license.storageExpirationDate, license.storageExpiration),
        breachWatch: isBreachWatchEnabled(license),
        reportingAndAlerts: !!license.auditAndReportingEnabled,
    }

    if (input.vaultSummary) {
        info.recordsCount = input.vaultSummary.recordCount
        info.sharedFoldersCount = input.vaultSummary.sharedFolderCount
        info.teamsCount = input.vaultSummary.teamCount
    }

    return info
}

function formatAccountType(license: AccountSummary.ILicense): string {
    const name = (license.productTypeName ?? '').trim()
    if (name) return name
    if (license.accountType != null) return String(license.accountType)
    return 'Unknown'
}

function formatRenewalDate(license: AccountSummary.ILicense): string {
    return formatRenewalDateField(license.expirationDate, license.expiration)
}

function formatRenewalDateField(dateString?: string | null, timestamp?: number | null): string {
    const trimmed = (dateString ?? '').trim()
    if (trimmed) return trimmed
    if (timestamp && timestamp > 0) {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
    }
    return ''
}

function formatStorageCapacity(bytes?: number | null): string {
    if (!bytes || bytes <= 0) return '0GB'
    const gb = Math.round(bytes / 1024 ** 3)
    return `${gb}GB`
}

function formatStorageUsage(bytesUsed?: number | null, bytesTotal?: number | null): string {
    if (!bytesTotal || bytesTotal <= 0) return '0%'
    const pct = Math.round(((bytesUsed ?? 0) / bytesTotal) * 100)
    return `${pct}%`
}

function isBreachWatchEnabled(license: AccountSummary.ILicense): boolean {
    if (license.breachWatchFeatureDisable) return false
    return !!license.breachWatchEnabled
}

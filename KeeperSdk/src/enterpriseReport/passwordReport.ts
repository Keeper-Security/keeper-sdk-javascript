import type { DBWRecord, DRecord, DSecurityScoreData } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { resolveSingleFolder, type VaultFolderSession } from '../folders/changeDirectory'
import { listFolder } from '../folders/listFolder'
import {
    getRecordFields,
    getRecordPassword,
    getRecordTitle,
    RecordVersion,
} from '../records/RecordUtils'
import { KeeperSdkError, ResultCodes } from '../utils'
import {
    AuditOutputFormat,
    DEFAULT_TRUNCATION_LENGTH,
    PASSWORD_BREACHWATCH_STATUS_NAMES,
    PASSWORD_REPORT_BASE_HEADERS,
    PASSWORD_REPORT_VERBOSE_HEADERS,
    PW_SPECIAL_CHARACTERS,
    SUPPORTED_RECORD_VERSIONS,
    type FormatPasswordReportOptions,
    type PasswordPolicy,
    type PasswordReportOptions,
    type PasswordReportResult,
    type PasswordReportRow,
    type PasswordStrength,
} from './reportTypes'
import { formatReportOutput } from './reportUtils'

type SupportedRecordVersion = (typeof SUPPORTED_RECORD_VERSIONS)[number]

export function getPasswordStrength(password: string): PasswordStrength {
    let caps = 0
    let lower = 0
    let digits = 0
    let symbols = 0

    for (const char of password) {
        if (char >= 'A' && char <= 'Z') caps++
        else if (char >= 'a' && char <= 'z') lower++
        else if (char >= '0' && char <= '9') digits++
        else if (PW_SPECIAL_CHARACTERS.includes(char)) symbols++
    }

    return { length: password.length, caps, lower, digits, symbols }
}

export function parsePasswordPolicy(options: PasswordReportOptions): PasswordPolicy {
    if (options.policy?.trim()) {
        const components = options.policy.split(',').map((part) => part.trim())
        const values = components.slice(0, 5).map((part) => (part ? Number.parseInt(part, 10) : 0))
        while (values.length < 5) values.push(0)
        return {
            length: values[0] || 0,
            lower: values[1] || 0,
            upper: values[2] || 0,
            digits: values[3] || 0,
            special: values[4] || 0,
        }
    }

    return {
        length: options.length ?? 0,
        lower: options.lower ?? 0,
        upper: options.upper ?? 0,
        digits: options.digits ?? 0,
        special: options.special ?? 0,
    }
}

export function isPasswordCompliant(strength: PasswordStrength, policy: PasswordPolicy): boolean {
    return (
        strength.length >= policy.length &&
        strength.caps >= policy.upper &&
        strength.lower >= policy.lower &&
        strength.digits >= policy.digits &&
        strength.symbols >= policy.special
    )
}

export function buildPasswordPolicySummary(policy: PasswordPolicy): string {
    const parts: string[] = []
    if (policy.length > 0) parts.push(`length >= ${policy.length}`)
    if (policy.lower > 0) parts.push(`lowercase >= ${policy.lower}`)
    if (policy.upper > 0) parts.push(`uppercase >= ${policy.upper}`)
    if (policy.digits > 0) parts.push(`digits >= ${policy.digits}`)
    if (policy.special > 0) parts.push(`special >= ${policy.special}`)
    return parts.join(', ')
}

function validatePasswordPolicy(policy: PasswordPolicy): void {
    if (policy.length + policy.lower + policy.upper + policy.digits + policy.special === 0) {
        throw new KeeperSdkError(
            'At least one password policy constraint must be set.',
            ResultCodes.PASSWORD_REPORT_POLICY_REQUIRED
        )
    }
}

function truncateText(value: string, maxLength = DEFAULT_TRUNCATION_LENGTH): string {
    return value.length <= maxLength ? value : `${value.slice(0, maxLength)}...`
}

function getRecordDescription(record: DRecord): string {
    if (record.version <= RecordVersion.Legacy) {
        return record.data?.notes ? String(record.data.notes) : ''
    }
    for (const field of getRecordFields(record)) {
        if (field.type === 'note' && field.value.length > 0) {
            return String(field.value[0])
        }
    }
    return ''
}

async function collectRecordUidsInFolderTree(storage: InMemoryStorage, folderUid: string | null): Promise<string[]> {
    const uids: string[] = []
    const listed = await listFolder(storage, {
        folderUid: folderUid ?? undefined,
        showFolders: true,
        showRecords: true,
    })

    for (const record of listed.records ?? []) {
        uids.push(record.uid)
    }
    for (const folder of listed.folders) {
        uids.push(...(await collectRecordUidsInFolderTree(storage, folder.uid)))
    }
    return uids
}

async function resolveTargetRecordUids(
    storage: InMemoryStorage,
    session: VaultFolderSession,
    folder?: string | null
): Promise<string[]> {
    const folderPath = folder?.trim()
    if (!folderPath) return storage.getRecords().map((record) => record.uid)
    const resolved = await resolveSingleFolder(storage, session, folderPath)
    return collectRecordUidsInFolderTree(storage, resolved.folderUid)
}

function buildPasswordCountMap(records: DRecord[]): Map<string, number> {
    const counts = new Map<string, number>()
    for (const record of records) {
        const password = getRecordPassword(record)
        if (!password) continue
        counts.set(password, (counts.get(password) || 0) + 1)
    }
    return counts
}

function estimatePasswordScore(password: string): number {
    const strength = getPasswordStrength(password)
    let score = Math.min(strength.length * 4, 40)
    if (strength.caps > 0) score += 10
    if (strength.lower > 0) score += 10
    if (strength.digits > 0) score += 15
    if (strength.symbols > 0) score += 15
    if (strength.length >= 12) score += 10
    return Math.min(score, 100)
}

function getPasswordScore(storage: InMemoryStorage, recordUid: string, password: string): string {
    const scoreData = storage.getByUid<DSecurityScoreData>('security_score_data', recordUid)
    if (scoreData?.data?.password === password && typeof scoreData.data.score === 'number') {
        return String(scoreData.data.score)
    }
    return String(estimatePasswordScore(password))
}

function getBreachWatchStatus(storage: InMemoryStorage, recordUid: string): string {
    const bwRecord = storage.getByUid<DBWRecord>('bw_record', recordUid)
    if (!bwRecord?.data) return ''

    const rawStatus = bwRecord.data.status ?? bwRecord.data.breachWatchStatus
    if (rawStatus == null || rawStatus === '') return ''
    if (typeof rawStatus === 'number') {
        return PASSWORD_BREACHWATCH_STATUS_NAMES[rawStatus] || String(rawStatus)
    }
    return String(rawStatus)
}

function buildTableHeaders(verbose: boolean, rowNumbers: boolean): string[] {
    const headers = [...PASSWORD_REPORT_BASE_HEADERS]
    if (verbose) headers.push(...PASSWORD_REPORT_VERBOSE_HEADERS)
    if (rowNumbers) headers.unshift('#')
    return headers
}

function buildTableRow(
    entry: PasswordReportRow,
    verbose: boolean,
    rowNumbers: boolean,
    rowNumber: number
): string[] {
    const cells = [
        entry.recordUid,
        entry.title,
        entry.description,
        String(entry.length),
        String(entry.lower),
        String(entry.upper),
        String(entry.digits),
        String(entry.special),
    ]
    if (verbose) cells.push(entry.score || '', entry.status || '', entry.reused || '')
    if (rowNumbers) cells.unshift(String(rowNumber))
    return cells
}

function buildPasswordReportTable(
    rows: PasswordReportRow[],
    verbose: boolean,
    rowNumbers: boolean
): { headers: string[]; rows: string[][] } {
    const headers = buildTableHeaders(verbose, rowNumbers)
    const tableRows = rows.map((row, index) => buildTableRow(row, verbose, rowNumbers, index + 1))
    return { headers, rows: tableRows }
}

export function formatPasswordReportResult(
    result: PasswordReportResult,
    options: FormatPasswordReportOptions = {}
): string {
    const rowNumbers = options.rowNumbers ?? result.rowNumbers
    const outputFormat = options.outputFormat ?? result.outputFormat
    const { headers, rows } = buildPasswordReportTable(result.rows, result.verbose, rowNumbers)
    return formatReportOutput(headers, rows, outputFormat)
}

export async function runPasswordReport(
    storage: InMemoryStorage,
    session: VaultFolderSession,
    options: PasswordReportOptions = {}
): Promise<PasswordReportResult> {
    const policy = parsePasswordPolicy(options)
    validatePasswordPolicy(policy)

    const verbose = options.verbose === true
    const rowNumbers = options.rowNumbers !== false
    const outputFormat = options.outputFormat ?? AuditOutputFormat.Table
    const targetUids = new Set(await resolveTargetRecordUids(storage, session, options.folder))
    const passwordCounts = buildPasswordCountMap(storage.getRecords())

    const rows: PasswordReportRow[] = []
    for (const record of storage.getRecords()) {
        if (!targetUids.has(record.uid)) continue
        if (!SUPPORTED_RECORD_VERSIONS.includes(record.version as SupportedRecordVersion)) continue

        const password = getRecordPassword(record)
        if (!password) continue

        const strength = getPasswordStrength(password)
        if (isPasswordCompliant(strength, policy)) continue

        const entry: PasswordReportRow = {
            recordUid: record.uid,
            title: truncateText(getRecordTitle(record)),
            description: truncateText(getRecordDescription(record)),
            length: strength.length,
            lower: strength.lower,
            upper: strength.caps,
            digits: strength.digits,
            special: strength.symbols,
        }

        if (verbose) {
            entry.score = getPasswordScore(storage, record.uid, password)
            entry.status = getBreachWatchStatus(storage, record.uid)
            const reuseCount = passwordCounts.get(password) || 0
            if (reuseCount > 1) entry.reused = String(reuseCount)
        }

        rows.push(entry)
    }

    const { headers, rows: formattedRows } = buildPasswordReportTable(rows, verbose, rowNumbers)

    return {
        policy,
        policySummary: buildPasswordPolicySummary(policy),
        headers,
        rows,
        formatted: formatReportOutput(headers, formattedRows, outputFormat),
        verbose,
        rowNumbers,
        outputFormat,
    }
}

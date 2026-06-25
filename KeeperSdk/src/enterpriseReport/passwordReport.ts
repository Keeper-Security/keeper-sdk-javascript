import type { DBWRecord, DRecord } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { resolveSingleFolder, type VaultFolderSession } from '../folders/changeDirectory'
import { listFolder } from '../folders/listFolder'
import {
    getRecordPassword,
    getRecordSummary,
    getRecordTitle,
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
    const summary = getRecordSummary(record)
    const parts: string[] = []
    if (summary.login) parts.push(summary.login)
    if (summary.url) parts.push(String(summary.url))
    return parts.join(' @ ')
}

type BWPasswordEntry = {
    value?: string
    status?: number | string
}

type BreachWatchRecordData = {
    passwords?: BWPasswordEntry[]
    status?: number | string
    breachWatchStatus?: number | string
}

function chunkText(text: string, predicate: (char: string) => boolean): string[] {
    const chunks: string[] = []
    let acc = ''
    for (const char of text) {
        if (predicate(char)) {
            acc += char
        } else if (acc) {
            chunks.push(acc)
            acc = ''
        }
    }
    if (acc) chunks.push(acc)
    return chunks
}

function offsetChar(text: string, compare: (prev: string, current: string) => number): number[] {
    if (!text) return []
    const offsets: number[] = []
    let prev = text[0]
    for (const char of text.slice(1)) {
        offsets.push(compare(prev, char))
        prev = char
    }
    return offsets
}

/** Keeper Commander-compatible password strength score (0–100). */
export function calculatePasswordScore(password: string): number {
    if (!password) return 0

    let normalized = password
    let total = password.length
    if (total > 50) {
        normalized = password.slice(0, 50)
        total = 50
    }

    let uppers = 0
    let lowers = 0
    let digits = 0
    let symbols = 0
    for (const char of normalized) {
        if (char >= 'A' && char <= 'Z') uppers++
        else if (char >= 'a' && char <= 'z') lowers++
        else if (char >= '0' && char <= '9') digits++
        else symbols++
    }

    let ds = digits + symbols
    if (!/^[A-Za-z]/.test(normalized)) ds--
    if (!/[A-Za-z]$/.test(normalized)) ds--
    if (ds < 0) ds = 0

    let score = total * 4
    if (uppers > 0) score += (total - uppers) * 2
    if (lowers > 0) score += (total - lowers) * 2
    if (digits > 0) score += digits * 4
    score += symbols * 6
    score += ds * 2

    let variance = 0
    if (uppers > 0) variance++
    if (lowers > 0) variance++
    if (digits > 0) variance++
    if (symbols > 0) variance++
    if (total >= 8 && variance >= 3) score += (variance + 1) * 2

    if (digits + symbols === 0) score -= total
    if (uppers + lowers + symbols === 0) score -= total

    const pwdLen = normalized.length
    let repInc = 0
    let repCount = 0
    for (let i = 0; i < pwdLen; i++) {
        let charExists = false
        for (let j = 0; j < pwdLen; j++) {
            if (i !== j && normalized[i] === normalized[j]) {
                charExists = true
                repInc += pwdLen / Math.abs(i - j)
            }
        }
        if (charExists) repCount++
    }
    const unqCount = pwdLen - repCount
    repInc = Math.ceil(unqCount === 0 ? repInc : repInc / unqCount)
    if (repCount > 0) score -= repInc

    let consecCount = 0
    const consecPredicates = [
        (char: string) => char >= 'A' && char <= 'Z',
        (char: string) => char >= 'a' && char <= 'z',
        (char: string) => char >= '0' && char <= '9',
    ]
    for (const predicate of consecPredicates) {
        for (const chunk of chunkText(normalized, predicate)) {
            if (chunk.length >= 2) consecCount += chunk.length - 1
        }
    }
    if (consecCount > 0) score -= 2 * consecCount

    let sequenceCount = 0
    for (const [modulus, predicate] of [
        [26, (char: string) => /[a-z]/i.test(char)] as const,
        [10, (char: string) => char >= '0' && char <= '9'] as const,
    ]) {
        for (const chunk of chunkText(normalized.toLowerCase(), predicate)) {
            if (chunk.length < 3) continue
            const offsets = offsetChar(chunk, (prev, current) => {
                const delta = prev.charCodeAt(0) - current.charCodeAt(0)
                return delta >= 0 ? delta : delta + modulus
            })
            let op = offsets[0]
            for (const oc of offsets.slice(1)) {
                if (oc === op) {
                    if (op !== 0) sequenceCount++
                } else {
                    op = oc
                }
            }
        }
    }

    const symbolMap: Record<string, number> = {}
    '!@#$%^&*()_+[]\\{}\'|;:",./<>?'.split('').forEach((symbol, index) => {
        symbolMap[symbol] = index
    })
    for (const chunk of chunkText(normalized, (char) => char in symbolMap)) {
        if (chunk.length < 3) continue
        const offsets = offsetChar(chunk, (prev, current) => {
            const delta = symbolMap[prev] - symbolMap[current]
            const modulus = Object.keys(symbolMap).length
            return delta >= 0 ? delta : delta + modulus
        })
        let op = offsets[0]
        for (const oc of offsets.slice(1)) {
            if (oc === op) {
                if (op !== 0) sequenceCount++
            } else {
                op = oc
            }
        }
    }
    if (sequenceCount > 0) score -= 3 * sequenceCount

    if (score < 0) return 0
    if (score > 100) return 100
    return score
}

function formatBreachWatchStatus(rawStatus: number | string): string {
    if (typeof rawStatus === 'string') {
        return rawStatus.toUpperCase()
    }
    return PASSWORD_BREACHWATCH_STATUS_NAMES[rawStatus] || String(rawStatus)
}

function getWorstBreachWatchStatus(statuses: Array<number | string>): number | string | undefined {
    const rank = (status: number | string): number => {
        if (typeof status === 'string') {
            const upper = status.toUpperCase()
            if (upper === 'BREACHED') return 4
            if (upper === 'WEAK') return 3
            if (upper === 'CHANGED') return 2
            if (upper === 'IGNORE') return 1
            return 0
        }
        return { 3: 4, 2: 3, 1: 2, 4: 1, 0: 0 }[status] ?? 0
    }

    let worst: number | string | undefined
    let worstRank = -1
    for (const status of statuses) {
        const statusRank = rank(status)
        if (statusRank > worstRank) {
            worstRank = statusRank
            worst = status
        }
    }
    return worst
}

function getBreachWatchPasswordStatus(storage: InMemoryStorage, recordUid: string, password: string): string {
    const bwRecord = storage.getByUid<DBWRecord>('bw_record', recordUid)
    if (!bwRecord?.data) return ''

    const data = bwRecord.data as BreachWatchRecordData
    const passwords = data.passwords
    if (Array.isArray(passwords) && passwords.length > 0) {
        const match = passwords.find((entry) => entry.value === password)
        if (match?.status != null && match.status !== '') {
            return formatBreachWatchStatus(match.status)
        }

        const statuses = passwords
            .map((entry) => entry.status)
            .filter((status): status is number | string => status != null && status !== '')
        const worstStatus = getWorstBreachWatchStatus(statuses)
        if (worstStatus != null) {
            return formatBreachWatchStatus(worstStatus)
        }
    }

    const legacyStatus = data.status ?? data.breachWatchStatus
    if (legacyStatus != null && legacyStatus !== '') {
        return formatBreachWatchStatus(legacyStatus)
    }

    return ''
}

function buildBreachWatchPasswordCountMap(storage: InMemoryStorage): Map<string, number> {
    const counts = new Map<string, number>()
    for (const bwRecord of storage.getAll<DBWRecord>('bw_record')) {
        const passwords = (bwRecord.data as BreachWatchRecordData | undefined)?.passwords
        if (!Array.isArray(passwords)) continue
        for (const entry of passwords) {
            const value = entry.value
            if (!value) continue
            counts.set(value, (counts.get(value) || 0) + 1)
        }
    }
    return counts
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
    const breachWatchPasswordCounts = buildBreachWatchPasswordCountMap(storage)

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
            entry.score = String(calculatePasswordScore(password))
            entry.status = getBreachWatchPasswordStatus(storage, record.uid, password)
            const reuseCount = breachWatchPasswordCounts.get(password) ?? passwordCounts.get(password) ?? 0
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

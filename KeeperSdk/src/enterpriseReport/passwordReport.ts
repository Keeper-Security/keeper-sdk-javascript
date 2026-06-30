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
    DEFAULT_TRUNCATION_LENGTH,
    PASSWORD_BREACHWATCH_STATUS_NAMES,
    PW_SPECIAL_CHARACTERS,
    SUPPORTED_RECORD_VERSIONS,
    type PasswordPolicy,
    type PasswordReportOptions,
    type PasswordReportResult,
    type PasswordReportRow,
    type PasswordStrength,
} from './reportTypes'

const POLICY_FIELD_COUNT = 5
const SPECIAL_CHAR_SET = new Set(PW_SPECIAL_CHARACTERS.split(''))

const POLICY_SUMMARY_LABELS: ReadonlyArray<{ key: keyof PasswordPolicy; label: string }> = [
    { key: 'length', label: 'length' },
    { key: 'lower', label: 'lowercase' },
    { key: 'upper', label: 'uppercase' },
    { key: 'digits', label: 'digits' },
    { key: 'special', label: 'special' },
]

type SupportedRecordVersion = (typeof SUPPORTED_RECORD_VERSIONS)[number]

type VerboseRowContext = {
    storage: InMemoryStorage
    passwordCounts: ReadonlyMap<string, number>
    breachWatchPasswordCounts: ReadonlyMap<string, number>
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

export function getPasswordStrength(password: string): PasswordStrength {
    let caps = 0
    let lower = 0
    let digits = 0
    let symbols = 0

    for (const char of password) {
        if (char >= 'A' && char <= 'Z') caps++
        else if (char >= 'a' && char <= 'z') lower++
        else if (char >= '0' && char <= '9') digits++
        else if (SPECIAL_CHAR_SET.has(char)) symbols++
    }

    return { length: password.length, caps, lower, digits, symbols }
}

export function parsePasswordPolicy(options: PasswordReportOptions): PasswordPolicy {
    if (options.policy?.trim()) {
        const values = options.policy
            .split(',')
            .map((part) => part.trim())
            .slice(0, POLICY_FIELD_COUNT)
            .map(parsePolicyNumber)

        while (values.length < POLICY_FIELD_COUNT) {
            values.push(0)
        }

        const [length, lower, upper, digits, special] = values
        return { length, lower, upper, digits, special }
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
    return POLICY_SUMMARY_LABELS.filter(({ key }) => policy[key] > 0)
        .map(({ key, label }) => `${label} >= ${policy[key]}`)
        .join(', ')
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

export async function runPasswordReport(
    storage: InMemoryStorage,
    session: VaultFolderSession,
    options: PasswordReportOptions = {}
): Promise<PasswordReportResult> {
    const policy = parsePasswordPolicy(options)
    validatePasswordPolicy(policy)

    const verbose = options.verbose === true
    const rowNumbers = options.rowNumbers !== false

    const targetRecords = await resolveTargetRecords(storage, session, options.folder)
    const passwordCounts = buildPasswordCountMap(storage.getRecords())
    const breachWatchPasswordCounts = buildBreachWatchPasswordCountMap(storage)
    const verboseContext: VerboseRowContext = {
        storage,
        passwordCounts,
        breachWatchPasswordCounts,
    }

    const rows = targetRecords.flatMap((record) =>
        buildNonCompliantRow(record, policy, verbose, verboseContext)
    )

    return {
        policy,
        policySummary: buildPasswordPolicySummary(policy),
        rows,
        verbose,
        rowNumbers,
    }
}

function parsePolicyNumber(part: string): number {
    if (!part) return 0
    const parsed = Number.parseInt(part, 10)
    return Number.isFinite(parsed) ? parsed : 0
}

function isSupportedRecordVersion(version: number): version is SupportedRecordVersion {
    return (SUPPORTED_RECORD_VERSIONS as readonly number[]).includes(version)
}

function validatePasswordPolicy(policy: PasswordPolicy): void {
    const hasConstraint = POLICY_SUMMARY_LABELS.some(({ key }) => policy[key] > 0)
    if (!hasConstraint) {
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
            counts.set(value, (counts.get(value) ?? 0) + 1)
        }
    }
    return counts
}

async function collectRecordUidsInFolderTree(storage: InMemoryStorage, folderUid: string | null): Promise<string[]> {
    const uids: string[] = []
    const folderQueue = [folderUid]

    while (folderQueue.length > 0) {
        const currentFolderUid = folderQueue.shift()
        const listed = await listFolder(storage, {
            folderUid: currentFolderUid ?? undefined,
            showFolders: true,
            showRecords: true,
        })

        for (const record of listed.records ?? []) {
            uids.push(record.uid)
        }
        for (const folder of listed.folders) {
            folderQueue.push(folder.uid)
        }
    }

    return uids
}

async function resolveTargetRecords(
    storage: InMemoryStorage,
    session: VaultFolderSession,
    folder?: string | null
): Promise<DRecord[]> {
    const records = storage.getRecords()
    const folderPath = folder?.trim()
    if (!folderPath) return records

    const resolved = await resolveSingleFolder(storage, session, folderPath)
    const targetUids = new Set(await collectRecordUidsInFolderTree(storage, resolved.folderUid))
    return records.filter((record) => targetUids.has(record.uid))
}

function buildPasswordCountMap(records: readonly DRecord[]): Map<string, number> {
    const counts = new Map<string, number>()
    for (const record of records) {
        const password = getRecordPassword(record)
        if (!password) continue
        counts.set(password, (counts.get(password) ?? 0) + 1)
    }
    return counts
}

function buildNonCompliantRow(
    record: DRecord,
    policy: PasswordPolicy,
    verbose: boolean,
    context: VerboseRowContext
): PasswordReportRow[] {
    if (!isSupportedRecordVersion(record.version)) return []

    const password = getRecordPassword(record)
    if (!password) return []

    const strength = getPasswordStrength(password)
    if (isPasswordCompliant(strength, policy)) return []

    const row: PasswordReportRow = {
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
        applyVerboseFields(row, record.uid, password, context)
    }

    return [row]
}

function applyVerboseFields(
    row: PasswordReportRow,
    recordUid: string,
    password: string,
    context: VerboseRowContext
): void {
    const { storage, passwordCounts, breachWatchPasswordCounts } = context
    row.score = String(calculatePasswordScore(password))
    row.status = getBreachWatchPasswordStatus(storage, recordUid, password)

    const reuseCount = breachWatchPasswordCounts.get(password) ?? passwordCounts.get(password) ?? 0
    if (reuseCount > 1) {
        row.reused = String(reuseCount)
    }
}

/**
 * Password generation — random passwords match Keeper .NET
 * `CryptoUtils.GeneratePassword` (keeper-sdk-dotnet).
 * Passphrase/dice/crypto/$GEN helpers align with Commander `generator.py`.
 */

import { BIP39_WORDS, DICEWARE_WORDS } from './resources/wordlists'

/** Matches `CryptoUtils.SpecialCharacters` in keeper-sdk-dotnet. */
export const PW_SPECIAL_CHARACTERS = '!@#$%()+;<>=?[]{}^.,'

export const DEFAULT_PASSWORD_LENGTH = 20
export const GEN_PASSWORD_ALGORITHMS = ['rand', 'dice', 'crypto', 'passphrase'] as const

export type GenPasswordAlgorithm = (typeof GEN_PASSWORD_ALGORITHMS)[number]

/**
 * Matches `PasswordGenerationOptions` in keeper-sdk-dotnet.
 * Use -1 for upper/lower/digit/special to exclude that character class.
 */
export type PasswordGenerationOptions = {
    length?: number
    lower?: number
    upper?: number
    digit?: number
    special?: number
    specialCharacters?: string
}

export type PasswordComplexityPolicy = {
    length?: number
    'lower-use'?: boolean
    'lower-min'?: number
    'upper-use'?: boolean
    'upper-min'?: number
    'digit-use'?: boolean
    'digit-min'?: number
    'special-use'?: boolean
    'special-min'?: number
    special?: string
    'passphrase-allow'?: boolean
    'passphrase-length'?: number
    'passphrase-separator'?: string
}

const PP_SEPARATOR_CHARACTERS = '-._?! '
const DEFAULT_PASSPHRASE_SEPARATOR = '-'
const DEFAULT_PASSPHRASE_WORD_COUNT = 5
const MIN_PASSPHRASE_WORD_COUNT = 5
const MAX_PASSPHRASE_WORD_COUNT = 9
const LETTER_COUNT = 'z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1

export type PassphraseGenOptions = {
    wordCount: number | null
    separator: string | null
    capitalize: boolean | null
    appendNumber: boolean | null
}

function randomBytes(length: number): Uint8Array {
    const buf = new Uint8Array(length)
    crypto.getRandomValues(buf)
    return buf
}

function randomInt(max: number): number {
    if (max <= 0) return 0
    const buf = new Uint32Array(1)
    crypto.getRandomValues(buf)
    return buf[0] % max
}

/** Matches `CryptoUtils.Shuffle` (keeper-sdk-dotnet). */
function shuffleInPlace<T>(array: T[]): void {
    if (!array || array.length < 2) return
    const bigArray = array.length > 255
    const randoms = randomBytes(array.length * (bigArray ? 4 : 1))
    for (let i = array.length - 1; i >= 0; i--) {
        let random: number
        if (bigArray) {
            const offset = i * 4
            random =
                ((randoms[offset] |
                    (randoms[offset + 1] << 8) |
                    (randoms[offset + 2] << 16) |
                    (randoms[offset + 3] << 24)) >>>
                    0) &
                0x7fffffff
        } else {
            random = randoms[i]
        }
        const j = random % array.length
        if (i !== j) {
            const ch = array[i]
            array[i] = array[j]
            array[j] = ch
        }
    }
}

/**
 * Generates a random password using Keeper vault rules.
 * Port of `CryptoUtils.GeneratePassword` (keeper-sdk-dotnet).
 */
export function generatePasswordFromOptions(options?: PasswordGenerationOptions | null): string {
    let length = options?.length ?? 20
    let upper = options?.upper ?? 4
    let lower = options?.lower ?? 4
    let digit = options?.digit ?? 2
    let special = options?.special ?? -1

    if (length <= 0) {
        length = 20
    }

    if (upper < 0 && lower < 0 && digit < 0 && special < 0) {
        lower = length
    }

    let required = Math.max(upper, 0) + Math.max(lower, 0) + Math.max(digit, 0) + Math.max(special, 0)
    let extra = required - length
    if (extra > 0) {
        let left = extra
        if (lower > 0) {
            let toSubtract = Math.ceil((lower / required) * extra)
            if (toSubtract > 0) {
                toSubtract = Math.min(left, toSubtract)
                lower -= toSubtract
                left -= toSubtract
            }
        }
        if (left > 0 && upper > 0) {
            let toSubtract = Math.ceil((upper / required) * extra)
            if (toSubtract > 0) {
                toSubtract = Math.min(left, toSubtract)
                upper -= toSubtract
                left -= toSubtract
            }
        }
        if (left > 0 && digit > 0) {
            let toSubtract = Math.ceil((digit / required) * extra)
            if (toSubtract > 0) {
                toSubtract = Math.min(left, toSubtract)
                digit -= toSubtract
                left -= toSubtract
            }
        }
        if (left > 0 && special > 0) {
            let toSubtract = Math.ceil((special / required) * extra)
            if (toSubtract > 0) {
                toSubtract = Math.min(left, toSubtract)
                special -= toSubtract
                left -= toSubtract
            }
        }
    }

    required = Math.max(upper, 0) + Math.max(lower, 0) + Math.max(digit, 0) + Math.max(special, 0)
    extra = length - required
    while (extra > 0) {
        if (extra > 0 && lower >= 0) {
            lower++
            extra--
        }
        if (extra > 0 && upper >= 0) {
            upper++
            extra--
        }
        if (extra > 0 && digit >= 0) {
            digit++
            extra--
        }
        if (extra > 0 && special >= 0) {
            special++
            extra--
        }
    }

    const buffer = new Array<string>(length)
    const indexes = Array.from({ length }, (_, i) => i)
    shuffleInPlace(indexes)
    const randoms = randomBytes(length)
    const specialCharacters =
        options?.specialCharacters && options.specialCharacters.length > 0
            ? options.specialCharacters
            : PW_SPECIAL_CHARACTERS

    for (const pos of indexes) {
        if (upper > 0) {
            buffer[pos] = String.fromCharCode('A'.charCodeAt(0) + (randoms[pos] % LETTER_COUNT))
            upper--
        } else if (lower > 0) {
            buffer[pos] = String.fromCharCode('a'.charCodeAt(0) + (randoms[pos] % LETTER_COUNT))
            lower--
        } else if (digit > 0) {
            buffer[pos] = String.fromCharCode('0'.charCodeAt(0) + (randoms[pos] % 10))
            digit--
        } else if (special > 0) {
            buffer[pos] = specialCharacters[randoms[pos] % specialCharacters.length]
            special--
        } else {
            buffer[pos] = String.fromCharCode('a'.charCodeAt(0) + (randoms[pos] % LETTER_COUNT))
        }
    }

    shuffleInPlace(buffer)
    return buffer.join('')
}

function policyToGenerationOptions(
    policy: PasswordComplexityPolicy,
    lengthOverride?: number | null
): PasswordGenerationOptions {
    const opts: PasswordGenerationOptions = {
        length: lengthOverride ?? policy.length,
        specialCharacters: policy.special,
    }
    if (policy['lower-use'] === false) opts.lower = -1
    else if (policy['lower-min'] !== undefined) opts.lower = policy['lower-min']
    if (policy['upper-use'] === false) opts.upper = -1
    else if (policy['upper-min'] !== undefined) opts.upper = policy['upper-min']
    if (policy['digit-use'] === false) opts.digit = -1
    else if (policy['digit-min'] !== undefined) opts.digit = policy['digit-min']
    if (policy['special-use'] === false) opts.special = -1
    else if (policy['special-min'] !== undefined) opts.special = policy['special-min']
    return opts
}

/** Thin wrapper over {@link generatePasswordFromOptions} for CLI / legacy callers. */
export class KeeperPasswordGenerator {
    private readonly options: PasswordGenerationOptions

    constructor(lengthOrOptions: number | PasswordGenerationOptions = DEFAULT_PASSWORD_LENGTH) {
        this.options =
            typeof lengthOrOptions === 'number' ? { length: lengthOrOptions } : { ...lengthOrOptions }
    }

    generate(): string {
        return generatePasswordFromOptions(this.options)
    }

    static createFromPolicy(
        policy: PasswordComplexityPolicy,
        lengthOverride?: number | null
    ): KeeperPasswordGenerator {
        return new KeeperPasswordGenerator(policyToGenerationOptions(policy, lengthOverride))
    }
}

function clampPassphraseWordCount(wordCount: number | null | undefined): number {
    if (typeof wordCount !== 'number') return DEFAULT_PASSPHRASE_WORD_COUNT
    if (wordCount < MIN_PASSPHRASE_WORD_COUNT) return MIN_PASSPHRASE_WORD_COUNT
    if (wordCount > MAX_PASSPHRASE_WORD_COUNT) return MAX_PASSPHRASE_WORD_COUNT
    return wordCount
}

class KeeperPassphraseGenerator {
    private readonly wordCount: number
    private readonly separator: string
    private readonly capitalize: boolean
    private readonly appendNumber: boolean
    private readonly vocabulary: readonly string[]

    constructor(
        wordCount: number,
        separator: string,
        capitalize: boolean,
        appendNumber: boolean,
        vocabulary: readonly string[]
    ) {
        this.wordCount = wordCount
        this.separator = separator
        this.capitalize = capitalize
        this.appendNumber = appendNumber
        this.vocabulary = vocabulary
    }

    generate(): string {
        let passphrase = ''
        for (let i = 0; i < this.wordCount; i++) {
            let word = this.vocabulary[randomInt(this.vocabulary.length)]
            if (this.capitalize && word) word = word[0].toUpperCase() + word.slice(1)
            if (this.appendNumber && i === 0) word += String(randomInt(10))
            if (i > 0) passphrase += this.separator
            passphrase += word
        }
        return passphrase
    }

    static createWithOptions(
        policy: PasswordComplexityPolicy | null | undefined,
        options: PassphraseGenOptions
    ): KeeperPassphraseGenerator {
        const wordCount = clampPassphraseWordCount(
            options.wordCount ?? policy?.['passphrase-length'] ?? DEFAULT_PASSPHRASE_WORD_COUNT
        )
        const separator =
            options.separator ??
            (policy?.['passphrase-separator']?.trim()
                ? policy['passphrase-separator'].replace(/\u2423/g, ' ')[0] || DEFAULT_PASSPHRASE_SEPARATOR
                : DEFAULT_PASSPHRASE_SEPARATOR)
        const capitalize = options.capitalize ?? true
        const appendNumber = options.appendNumber ?? true
        return new KeeperPassphraseGenerator(wordCount, separator, capitalize, appendNumber, DICEWARE_WORDS)
    }
}

class DicewarePasswordGenerator {
    private readonly rolls: number
    private readonly vocabulary: readonly string[]
    private readonly delimiter: string

    constructor(rolls: number, vocabulary: readonly string[], delimiter = ' ') {
        this.rolls = rolls
        this.vocabulary = vocabulary
        this.delimiter = delimiter
    }

    generate(): string {
        const words: string[] = []
        for (let i = 0; i < this.rolls; i++) words.push(this.vocabulary[randomInt(this.vocabulary.length)])
        shuffleInPlace(words)
        return words.join(this.delimiter)
    }
}

class CryptoPassphraseGenerator {
    generate(): string {
        const key = randomBytes(32)
        const digest = new Uint8Array(syncSha256(key))
        const secretBytes = new Uint8Array(33)
        secretBytes.set(key)
        secretBytes[32] = digest[0]
        let secret = BigInt(0)
        for (const b of secretBytes) secret = (secret << BigInt(8)) | BigInt(b)
        const indices: number[] = []
        for (let i = 0; i < 24; i++) {
            indices.push(Number(secret & BigInt(0x7ff)))
            secret >>= BigInt(11)
        }
        indices.reverse()
        return indices.map((idx) => BIP39_WORDS[idx]).join(' ')
    }
}

function syncSha256(data: Uint8Array): Uint8Array {
    if (typeof process !== 'undefined' && process.versions?.node) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { createHash } = require('crypto') as typeof import('crypto')
        return new Uint8Array(createHash('sha256').update(data).digest())
    }
    throw new Error('crypto passphrase generation requires Node.js (use rand or passphrase instead)')
}

export function resolveGenPasswordAlgorithm(
    parameters?: readonly string[] | null
): { algorithm: GenPasswordAlgorithm | null; error: string | null } {
    if (!parameters || parameters.length === 0) return { algorithm: 'rand', error: null }
    const first = parameters[0].trim()
    const firstLower = first.toLowerCase()
    if ((GEN_PASSWORD_ALGORITHMS as readonly string[]).includes(firstLower)) {
        return { algorithm: firstLower as GenPasswordAlgorithm, error: null }
    }
    if (/^\d+$/.test(first)) return { algorithm: 'rand', error: null }
    return {
        algorithm: null,
        error: `Unknown $GEN password algorithm "${first}". Valid algorithms: ${GEN_PASSWORD_ALGORITHMS.join(', ')}.`,
    }
}

function parsePassphraseGenParameters(parameters: readonly string[]): {
    options: PassphraseGenOptions
    error: string | null
} {
    const empty: PassphraseGenOptions = {
        wordCount: null,
        separator: null,
        capitalize: null,
        appendNumber: null,
    }
    if (!parameters.length || parameters[0].trim().toLowerCase() !== 'passphrase') {
        return { options: empty, error: null }
    }
    const extras = parameters.slice(1)
    if (extras.some((t) => t.trim() === '')) {
        return {
            options: empty,
            error:
                'Incomplete $GEN:passphrase parameters: missing value after comma. ' +
                'Format: $GEN:passphrase[,word_count][,separator][,capitalize][,number]',
        }
    }
    let wordCount: number | null = null
    let separator: string | null = null
    let capitalize: boolean | null = null
    let appendNumber: boolean | null = null
    let idx = 0
    if (idx < extras.length) {
        const token = extras[idx].trim()
        if (/^\d+$/.test(token)) {
            wordCount = Number(token)
            if (wordCount < MIN_PASSPHRASE_WORD_COUNT || wordCount > MAX_PASSPHRASE_WORD_COUNT) {
                return {
                    options: empty,
                    error: `Passphrase word count must be between ${MIN_PASSPHRASE_WORD_COUNT} and ${MAX_PASSPHRASE_WORD_COUNT} (got ${wordCount}).`,
                }
            }
            idx++
        }
    }
    if (idx < extras.length && !/^(true|false)$/i.test(extras[idx].trim())) {
        const token = extras[idx].trim()
        if (token.toLowerCase() === 'space' || token.toLowerCase() === 'sp') separator = ' '
        else if (token.length === 1 && PP_SEPARATOR_CHARACTERS.includes(token)) separator = token
        else {
            return {
                options: empty,
                error: `Invalid passphrase separator "${token}". Allowed: ${PP_SEPARATOR_CHARACTERS.replace(/ /g, 'space ')}.`,
            }
        }
        idx++
    }
    if (idx < extras.length) {
        const token = extras[idx].trim().toLowerCase()
        if (token === 'true') capitalize = true
        else if (token === 'false') capitalize = false
        else {
            return {
                options: empty,
                error: `Invalid $GEN:passphrase capitalize parameter "${extras[idx]}". Expected true or false.`,
            }
        }
        idx++
    }
    if (idx < extras.length) {
        const token = extras[idx].trim().toLowerCase()
        if (token === 'true') appendNumber = true
        else if (token === 'false') appendNumber = false
        else {
            return {
                options: empty,
                error: `Invalid $GEN:passphrase number parameter "${extras[idx]}". Expected true or false.`,
            }
        }
        idx++
    }
    if (idx < extras.length) {
        return { options: empty, error: `Unexpected $GEN:passphrase parameter "${extras[idx].trim()}".` }
    }
    return { options: { wordCount, separator, capitalize, appendNumber }, error: null }
}

function parseLength(parameters: readonly string[]): number | null {
    const numeric = parameters.find((p) => /^\d+$/.test(p.trim()))
    if (!numeric) return null
    return Number(numeric)
}

function randomPasswordOptions(
    length: number | null,
    policy?: PasswordComplexityPolicy | null
): PasswordGenerationOptions {
    if (policy) {
        return policyToGenerationOptions(policy, length)
    }
    const opts: PasswordGenerationOptions = {}
    if (typeof length === 'number') {
        let clamped = length
        if (clamped < 4) clamped = 4
        if (clamped > 200) clamped = 200
        opts.length = clamped
    }
    return opts
}

export function generatePassword(
    parameters?: readonly string[] | null,
    policy?: PasswordComplexityPolicy | null
): { password: string | null; error: string | null } {
    const { algorithm, error: algError } = resolveGenPasswordAlgorithm(parameters)
    if (algError) return { password: null, error: algError }
    if (!algorithm) return { password: null, error: 'Unknown password generation algorithm.' }

    const params = parameters ?? []
    const length = parseLength(params)

    try {
        if (algorithm === 'crypto') {
            if (typeof process === 'undefined' || !process.versions?.node) {
                return {
                    password: null,
                    error: '$GEN:crypto is not supported in the browser; use rand or passphrase.',
                }
            }
            return { password: new CryptoPassphraseGenerator().generate(), error: null }
        }
        if (algorithm === 'passphrase') {
            const { options, error: ppError } = parsePassphraseGenParameters(params)
            if (ppError) return { password: null, error: ppError }
            if (policy?.['passphrase-allow'] === false) {
                return {
                    password: generatePasswordFromOptions(randomPasswordOptions(length, policy)),
                    error: null,
                }
            }
            const gen = KeeperPassphraseGenerator.createWithOptions(policy, options)
            return { password: gen.generate(), error: null }
        }
        if (algorithm === 'dice') {
            let rolls = length ?? 5
            if (rolls < 1) rolls = 1
            if (rolls > 40) rolls = 40
            return { password: new DicewarePasswordGenerator(rolls, DICEWARE_WORDS).generate(), error: null }
        }

        return {
            password: generatePasswordFromOptions(randomPasswordOptions(length, policy)),
            error: null,
        }
    } catch (e) {
        return { password: null, error: e instanceof Error ? e.message : String(e) }
    }
}

/** Parse `$GEN:rand,16` or `$GEN` into generation parameters. */
export function parseGenParametersFromValue(value: string): string[] {
    if (!value.startsWith('$GEN')) return []
    let rest = value.slice(4)
    if (rest.startsWith(':')) rest = rest.slice(1)
    if (!rest.trim()) return []
    return rest.split(',').map((part) => part.trim())
}

export function isGenerateFieldValue(value: string): boolean {
    return value.startsWith('$GEN')
}

/** Parse `--generate-password` or `--generate-password=rand,16` into $GEN parameters. */
export function parseGeneratePasswordFlag(raw: string | true | undefined): string[] | null {
    if (raw === undefined) return null
    if (raw === true) return []
    const trimmed = raw.trim()
    if (!trimmed) return []
    return trimmed.split(',').map((part) => part.trim())
}

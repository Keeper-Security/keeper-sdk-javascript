import { createHmac } from 'crypto'

export type TotpAlgorithm = 'SHA1' | 'SHA256' | 'SHA512'

export type TotpParams = {
    secret: string
    algorithm: TotpAlgorithm
    digits: number
    period: number
}

export type TotpCode = {
    code: string
    secondsRemaining: number
    period: number
}

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
const DEFAULT_DIGITS = 6
const DEFAULT_PERIOD = 30
const DEFAULT_ALGORITHM: TotpAlgorithm = 'SHA1'
const UINT32_MAX = 0x100000000

function decodeBase32(input: string): Uint8Array {
    const cleaned = input.replace(/=+$/g, '').replace(/\s+/g, '').toUpperCase()
    const out: number[] = []
    let buffer = 0
    let bits = 0
    for (const ch of cleaned) {
        const idx = BASE32_ALPHABET.indexOf(ch)
        if (idx < 0) throw new Error(`Invalid base32 character "${ch}" in TOTP secret`)
        buffer = (buffer << 5) | idx
        bits += 5
        if (bits >= 8) {
            bits -= 8
            out.push((buffer >> bits) & 0xff)
        }
    }
    return Uint8Array.from(out)
}

function normalizeAlgorithm(value: string | null | undefined): TotpAlgorithm {
    const upper = (value || DEFAULT_ALGORITHM).toUpperCase()
    return upper === 'SHA256' || upper === 'SHA512' ? upper : DEFAULT_ALGORITHM
}

function parsePositiveInt(value: string | null, fallback: number): number {
    const parsed = parseInt(value || '', 10)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export function parseTotpUrl(url: string): TotpParams | null {
    if (!url?.trim()) return null
    let params: URLSearchParams
    try {
        if (url.startsWith('otpauth://')) {
            const u = new URL(url)
            if (u.hostname.toLowerCase() !== 'totp') return null
            params = u.searchParams
        } else {
            params = new URLSearchParams(url)
        }
    } catch {
        return null
    }
    const secret = (params.get('secret') || '').trim()
    if (!secret) return null
    return {
        secret,
        algorithm: normalizeAlgorithm(params.get('algorithm')),
        digits: parsePositiveInt(params.get('digits'), DEFAULT_DIGITS),
        period: parsePositiveInt(params.get('period'), DEFAULT_PERIOD),
    }
}

function counterToBuffer(counter: number): Buffer {
    const buf = Buffer.alloc(8)
    buf.writeUInt32BE(Math.floor(counter / UINT32_MAX), 0)
    buf.writeUInt32BE(counter % UINT32_MAX, 4)
    return buf
}

export function getTotpCode(urlOrParams: string | TotpParams, now: number = Date.now()): TotpCode | null {
    const params = typeof urlOrParams === 'string' ? parseTotpUrl(urlOrParams) : urlOrParams
    if (!params) return null
    if (!Number.isFinite(params.period) || params.period <= 0) return null
    if (!Number.isFinite(params.digits) || params.digits <= 0) return null

    let key: Uint8Array
    try {
        key = decodeBase32(params.secret)
    } catch {
        return null
    }
    if (key.length === 0) return null

    const seconds = Math.floor(now / 1000)
    const counter = Math.floor(seconds / params.period)
    const secondsRemaining = params.period - (seconds % params.period)

    const digest = createHmac(params.algorithm.toLowerCase(), Buffer.from(key))
        .update(counterToBuffer(counter))
        .digest()

    if (digest.length === 0) return null
    const offset = digest[digest.length - 1] & 0x0f
    if (offset + 3 >= digest.length) return null
    const binary =
        ((digest[offset] & 0x7f) << 24) |
        ((digest[offset + 1] & 0xff) << 16) |
        ((digest[offset + 2] & 0xff) << 8) |
        (digest[offset + 3] & 0xff)

    const code = (binary % 10 ** params.digits).toString().padStart(params.digits, '0')
    return { code, secondsRemaining, period: params.period }
}

import type { CliResult, ParsedCli } from './types'

const isWhitespace = (ch: string) => /\s/.test(ch)

export function tokenizeArguments(args: string): string[] {
    const out: string[] = []
    const sb: string[] = []
    let pos = 0
    let inQuote = false
    let escape = false

    const flush = () => {
        if (sb.length > 0) {
            out.push(sb.join(''))
            sb.length = 0
        }
    }

    while (pos < args.length) {
        const ch = args[pos]
        if (escape) {
            escape = false
            sb.push(ch)
            pos++
            continue
        }
        if (inQuote) {
            if (ch === '\\') {
                escape = true
                pos++
                continue
            }
            if (ch === '"') {
                inQuote = false
                pos++
                continue
            }
            sb.push(ch)
            pos++
            continue
        }
        switch (ch) {
            case '\\':
                escape = true
                pos++
                break
            case '"':
                inQuote = true
                pos++
                break
            default:
                if (isWhitespace(ch)) {
                    flush()
                    pos++
                } else {
                    sb.push(ch)
                    pos++
                }
        }
    }
    flush()
    return out
}

function setBool(opts: Map<string, string | true>, k: string): void {
    opts.set(k.toLowerCase(), true)
}

function setStr(
    opts: Map<string, string | true>,
    repeated: Map<string, string[]>,
    k: string,
    v: string
): void {
    const key = k.toLowerCase()
    const prev = opts.get(key)
    if (prev !== undefined && prev !== true) {
        const list = repeated.get(key) ?? [prev]
        list.push(v)
        repeated.set(key, list)
    } else {
        repeated.set(key, [v])
    }
    opts.set(key, v)
}

export function parseCliArgs(
    tokens: string[],
    options: { valueShortFlags?: ReadonlySet<string> } = {}
): ParsedCli {
    const valueShortFlags = options.valueShortFlags ?? new Set<string>()
    const positional: string[] = []
    const opts = new Map<string, string | true>()
    const repeatedOpts = new Map<string, string[]>()

    let i = 0
    while (i < tokens.length) {
        const t = tokens[i]
        if (t === '--') {
            positional.push(...tokens.slice(i + 1))
            break
        }
        if (t === '-' || !t.startsWith('-')) {
            positional.push(t)
            i++
            continue
        }

        if (t.startsWith('--')) {
            const body = t.slice(2)
            if (!body) {
                positional.push(t)
                i++
                continue
            }
            const eq = body.indexOf('=')
            if (eq >= 0) {
                setStr(opts, repeatedOpts, body.slice(0, eq), body.slice(eq + 1))
                i++
                continue
            }
            const name = body
            const next = tokens[i + 1]
            if (next && next !== '--' && !next.startsWith('-')) {
                setStr(opts, repeatedOpts, name, next)
                i += 2
                continue
            }
            setBool(opts, name)
            i++
            continue
        }

        const rest = t.slice(1)
        if (!rest) {
            positional.push(t)
            i++
            continue
        }
        if (/^[A-Za-z]$/.test(rest)) {
            const name = rest
            const next = tokens[i + 1]
            if (
                valueShortFlags.has(name.toLowerCase()) &&
                next &&
                next !== '--' &&
                !next.startsWith('-')
            ) {
                setStr(opts, repeatedOpts, name, next)
                i += 2
                continue
            }
            setBool(opts, name)
            i++
            continue
        }
        if (/^[A-Za-z]+$/.test(rest)) {
            for (const ch of rest) setBool(opts, ch)
            i++
            continue
        }

        positional.push(t)
        i++
    }

    return { positional, opts, repeatedOpts }
}

export function getAllOpt(parsed: ParsedCli, ...names: string[]): string[] {
    const out: string[] = []
    for (const n of names) {
        const key = n.toLowerCase()
        const repeated = parsed.repeatedOpts.get(key)
        if (repeated) {
            out.push(...repeated)
            continue
        }
        const v = parsed.opts.get(key)
        if (v !== undefined && v !== true) out.push(v)
    }
    return out
}

export function hasOpt(opts: Map<string, string | true>, ...names: string[]): boolean {
    for (const n of names) {
        const v = opts.get(n.toLowerCase())
        if (v === true) return true
    }
    return false
}

export function getOpt(opts: Map<string, string | true>, ...names: string[]): string | undefined {
    for (const n of names) {
        const v = opts.get(n.toLowerCase())
        if (v !== undefined && v !== true) return v
    }
    return undefined
}

export function wantsCliHelp(parsed: ParsedCli): boolean {
    return hasOpt(parsed.opts, 'help', 'h')
}

export function rejectUnknownOptions(
    parsed: ParsedCli,
    allowed: ReadonlySet<string>,
    commandName: string
): CliResult | null {
    for (const k of parsed.opts.keys()) {
        if (k === 'help' || k === 'h') continue
        if (!allowed.has(k)) {
            return { code: 1, out: '', err: `${commandName}: unknown option --${k}\n` }
        }
    }
    return null
}

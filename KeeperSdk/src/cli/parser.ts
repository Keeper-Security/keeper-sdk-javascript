import type { CliCommandDefinition, CliResult, KeeperCliHost, ParsedCli } from './types'
import { parseCliArgs, tokenizeArguments, wantsCliHelp } from './parse'
import { extractFromJsonFlagValue } from './jsonArg'
import { RESTORE_SESSION_TRAILING_OPTS } from './commands/restoreSession'
import { AUTH_CLI_COMMAND_NAMES, isAuthCliCommand } from './access'
import { BUILTIN_CLI_COMMANDS } from './builtinCommands'
import { formatAllCommandsSummary, formatDetailedHelpForCommand, formatShortCommandSummary } from './help'

const NOT_LOGGED_IN_ERR =
    'Not logged in. Run `login` or `restore-session` (see `help`).\n'

function valueShortFlagsForCommand(def: CliCommandDefinition): ReadonlySet<string> {
    const out = new Set<string>()
    for (const flag of def.valueShortFlags ?? []) {
        out.add(flag.replace(/^-+/, '').toLowerCase())
    }
    return out
}

export type KeeperCliParserOptions = {
    prog?: string
    description?: string
    epilog?: string
}

export class KeeperCliParser {
    private readonly prog: string
    private readonly description: string
    private readonly epilog?: string
    private readonly commands = new Map<string, CliCommandDefinition>()
    private readonly aliases = new Map<string, string>()

    constructor(options: KeeperCliParserOptions = {}) {
        this.prog = options.prog ?? 'keeper'
        this.description = options.description ?? ''
        this.epilog = options.epilog
    }

    addCommand(def: CliCommandDefinition): this {
        const key = def.name.toLowerCase()
        this.commands.set(key, def)
        if (def.aliases) {
            for (const alias of def.aliases) {
                this.aliases.set(alias.toLowerCase(), key)
            }
        }
        return this
    }

    addCommands(defs: Iterable<CliCommandDefinition>): this {
        for (const def of defs) this.addCommand(def)
        return this
    }

    list(): CliCommandDefinition[] {
        return [...this.commands.values()].sort((a, b) => {
            const oa = a.order ?? 500
            const ob = b.order ?? 500
            if (oa !== ob) return oa - ob
            return a.name.localeCompare(b.name)
        })
    }

    listNames(): string[] {
        return this.list().map((c) => c.name)
    }

    resolve(name: string): CliCommandDefinition | undefined {
        const key = name.toLowerCase()
        if (this.commands.has(key)) return this.commands.get(key)
        const target = this.aliases.get(key)
        return target ? this.commands.get(target) : undefined
    }

    formatHelp(host?: KeeperCliHost): string {
        const loggedIn = host?.getVault().isLoggedIn ?? true
        const commands = loggedIn
            ? this.list()
            : this.list().filter((c) => AUTH_CLI_COMMAND_NAMES.has(c.name))
        const header = this.description ? `${this.prog} — ${this.description}\n\n` : ''
        const body = loggedIn
            ? formatAllCommandsSummary(commands)
            : formatAllCommandsSummary(commands, {
                  header: 'Not logged in — sign-in commands:\n\n',
                  footer:
                      '\nRun `login` or `restore-session` to open the vault.\n' +
                      'After login, run `help` again for vault commands (get, ls, cd, …).\n',
              })
        const footer = this.epilog ? `\n${this.epilog}\n` : ''
        return header + body + footer
    }

    formatCommandHelp(name: string): string | null {
        const def = this.resolve(name)
        return def ? formatDetailedHelpForCommand(def) : null
    }

    formatCommandSummary(name: string): string | null {
        const def = this.resolve(name)
        return def ? formatShortCommandSummary(def) : null
    }

    async parse(line: string | readonly string[], host: KeeperCliHost): Promise<CliResult> {
        const { tokens, raw } = normalizeInput(line)
        if (tokens.length === 0) {
            return ok(this.formatHelp(host))
        }

        const first = tokens[0]
        const rest = tokens.slice(1)

        if (isHelpToken(first)) {
            const sub = rest[0]
            if (!sub) return ok(this.formatHelp(host))
            if (!host.getVault().isLoggedIn && !isAuthCliCommand(sub)) {
                return err(NOT_LOGGED_IN_ERR)
            }
            const page = this.formatCommandHelp(sub)
            if (page) return ok(page)
            return err(`${this.prog}: unknown command: ${sub}\nTry: ${this.prog} --help\n`)
        }

        const def = this.resolve(first)
        if (!def) {
            return err(`${this.prog}: unknown command: ${first}\nTry: ${this.prog} --help\n`)
        }

        if (!host.getVault().isLoggedIn && !isAuthCliCommand(def.name)) {
            return err(NOT_LOGGED_IN_ERR)
        }

        let parsed: ParsedCli
        const parseOpts = { valueShortFlags: valueShortFlagsForCommand(def) }
        if (def.name === 'restore-session') {
            const json = extractFromJsonFlagValue(raw, 'from-json', RESTORE_SESSION_TRAILING_OPTS)
            parsed = parseCliArgs(rest, parseOpts)
            if (json) parsed.opts.set('from-json', json)
        } else {
            parsed = parseCliArgs(rest, parseOpts)
        }

        if (wantsCliHelp(parsed)) {
            return ok(formatDetailedHelpForCommand(def))
        }
        return def.run(host, parsed)
    }
}

export function createKeeperCliParser(options: KeeperCliParserOptions = {}): KeeperCliParser {
    const parser = new KeeperCliParser(options)
    void loadBuiltinsInto(parser)
    return parser
}

function loadBuiltinsInto(parser: KeeperCliParser): void {
    parser.addCommands(BUILTIN_CLI_COMMANDS)
}

function normalizeInput(line: string | readonly string[]): { tokens: string[]; raw: string } {
    if (typeof line === 'string') {
        const trimmed = line.trim()
        return { tokens: trimmed ? tokenizeArguments(trimmed) : [], raw: trimmed }
    }
    const tokens = [...line].filter((t) => t.length > 0)
    return { tokens, raw: tokens.join(' ') }
}

function isHelpToken(token: string): boolean {
    const t = token.toLowerCase()
    return t === '--help' || t === '-h' || t === 'help'
}

function ok(out: string): CliResult {
    return { code: 0, out, err: '' }
}

function err(message: string): CliResult {
    return { code: 1, out: '', err: message }
}

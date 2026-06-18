import type { CliCommandDefinition, CliHelpDoc, CliHelpOption, CliHelpPositional } from './types'
import { listCliCommands } from './registry'

const HELP_INDENT = 2
const MAX_HELP_POSITION = 24
const HELP_WIDTH = 80

export const STANDARD_HELP_OPTION: CliHelpOption = {
    flags: '-h, --help',
    help: 'show this help message and exit',
}

function wrapText(text: string, width: number, indent: string): string[] {
    const words = text.split(/\s+/).filter(Boolean)
    if (words.length === 0) return []
    const lines: string[] = []
    let line = ''
    for (const word of words) {
        const next = line ? `${line} ${word}` : word
        if (next.length > width) {
            if (line) lines.push(indent + line)
            line = word
        } else {
            line = next
        }
    }
    if (line) lines.push(indent + line)
    return lines
}

function formatHelpEntry(invocation: string, help: string): string[] {
    const prefix = ' '.repeat(HELP_INDENT)
    const header = prefix + invocation
    const helpCol = HELP_INDENT + MAX_HELP_POSITION
    const contIndent = ' '.repeat(helpCol)
    const wrapWidth = HELP_WIDTH - helpCol

    const paragraphs = help.split('\n')
    const lines: string[] = []

    for (let p = 0; p < paragraphs.length; p++) {
        const paragraph = paragraphs[p].trim()
        if (!paragraph) continue
        const wrapped = wrapText(paragraph, wrapWidth, contIndent)

        if (p === 0) {
            if (header.length < helpCol) {
                lines.push(header + ' '.repeat(helpCol - header.length) + wrapped[0].slice(contIndent.length))
                lines.push(...wrapped.slice(1))
            } else {
                lines.push(header)
                lines.push(...wrapped)
            }
        } else {
            lines.push('')
            lines.push(...wrapped)
        }
    }

    return lines
}

function positionalUsageToken(pos: CliHelpPositional): string {
    if (pos.nargs === '*') return `[${pos.name} ...]`
    if (pos.nargs === '+') return `${pos.name} [${pos.name} ...]`
    if (pos.nargs === '?') return `[${pos.name}]`
    return pos.name
}

function optionHelpInvocation(opt: CliHelpOption): string {
    if (opt.choices) {
        const flag = opt.flags.split(',')[0].trim()
        return `${flag} {${opt.choices}}`
    }
    if (opt.metavar) {
        const flag = opt.flags.split(',')[0].trim()
        return `${flag} ${opt.metavar}`
    }
    return opt.flags
}

function buildUsage(def: CliCommandDefinition, doc: CliHelpDoc): string {
    if (doc.usage) return `usage: ${def.name} ${doc.usage}`

    const tokens: string[] = ['[-h]']
    for (const opt of doc.options ?? []) {
        if (opt.flags.includes('--help') || opt.flags.includes('-h')) continue
        tokens.push(optionHelpInvocation(opt))
    }
    for (const pos of doc.positionals ?? []) {
        tokens.push(positionalUsageToken(pos))
    }
    return `usage: ${def.name} ${tokens.join(' ')}`
}

function appendSection(lines: string[], title: string, body: string[]): void {
    if (body.length === 0) return
    lines.push('')
    lines.push(title)
    lines.push(...body)
}

export function formatArgparseHelp(def: CliCommandDefinition): string {
    const doc = def.help
    const lines: string[] = [buildUsage(def, doc), '', doc.description.trim()]

    const positionals = doc.positionals ?? []
    if (positionals.length > 0) {
        const body: string[] = []
        for (const pos of positionals) {
            body.push(...formatHelpEntry(pos.name, pos.help))
        }
        appendSection(lines, 'positional arguments:', body)
    }

    const options = [...(doc.options ?? []), STANDARD_HELP_OPTION]
    const hasHelpAlready = (doc.options ?? []).some(
        (o) => o.flags.includes('--help') || o.flags.includes('-h')
    )
    const optionList = hasHelpAlready ? (doc.options ?? []) : options
    if (optionList.length > 0) {
        const body: string[] = []
        for (const opt of optionList) {
            body.push(...formatHelpEntry(optionHelpInvocation(opt), opt.help))
        }
        appendSection(lines, 'options:', body)
    }

    if (doc.epilog?.trim()) {
        lines.push('')
        lines.push(doc.epilog.trim())
    }

    return `${lines.join('\n')}\n`
}

export function formatDetailedHelpForCommand(def: CliCommandDefinition): string {
    return formatArgparseHelp(def)
}

export function getDetailedHelpPageForRegistry(
    commands: Iterable<CliCommandDefinition>,
    name: string
): string | null {
    const key = name.toLowerCase()
    for (const def of commands) {
        if (def.name === key) return formatDetailedHelpForCommand(def)
        if (def.aliases?.some((a) => a.toLowerCase() === key)) {
            return formatDetailedHelpForCommand(def)
        }
    }
    return null
}

export function getDetailedHelpPage(name: string): string | null {
    return getDetailedHelpPageForRegistry(listCliCommands(), name)
}

export type CommandsSummaryOptions = {
    header?: string
    footer?: string
}

export function formatAllCommandsSummary(
    commands: readonly CliCommandDefinition[],
    options?: CommandsSummaryOptions
): string {
    const sorted = [...commands].sort((a, b) => a.name.localeCompare(b.name))
    const w = Math.max(...sorted.map((c) => c.name.length), 8)
    let out = options?.header ?? 'Supported commands:\n\n'
    if (!out.endsWith('\n\n')) {
        out = out.endsWith('\n') ? `${out}\n` : `${out}\n\n`
    }
    for (const c of sorted) {
        out += `  ${c.name.padEnd(w)}  ${c.description}\n`
    }
    out += options?.footer ?? '\nRun `<command> --help` (or `-h`) for details on a specific command.\n'
    return out
}

export function formatShortCommandSummary(def: CliCommandDefinition): string {
    return `${def.name} — ${def.description}\n${buildUsage(def, def.help)}\n`
}

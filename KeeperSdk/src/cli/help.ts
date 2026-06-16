import type { CliCommandDefinition, CliHelpDoc } from './types'

const SECTION_ORDER: (keyof CliHelpDoc)[] = [
    'synopsis',
    'description',
    'arguments',
    'options',
    'environment',
    'examples',
    'seeAlso',
    'note',
]

const SECTION_LABELS: Partial<Record<keyof CliHelpDoc, string>> = {
    synopsis: 'SYNOPSIS',
    description: 'DESCRIPTION',
    arguments: 'ARGUMENTS',
    options: 'OPTIONS',
    environment: 'ENVIRONMENT',
    examples: 'EXAMPLES',
    seeAlso: 'SEE ALSO',
    note: 'NOTE',
}

export function formatDetailedHelp(doc: CliHelpDoc): string {
    const parts: string[] = [doc.title.trim()]
    for (const key of SECTION_ORDER) {
        const body = doc[key]
        if (typeof body !== 'string' || !body.trim()) continue
        const label = SECTION_LABELS[key]
        if (label) {
            parts.push('')
            parts.push(label)
        }
        parts.push(body.trim())
    }
    return `${parts.join('\n')}\n`
}

export function formatDetailedHelpForCommand(def: CliCommandDefinition): string {
    return formatDetailedHelp(def.help)
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
    return `${def.name} — ${def.description}\n  Usage: ${def.usage}\n`
}

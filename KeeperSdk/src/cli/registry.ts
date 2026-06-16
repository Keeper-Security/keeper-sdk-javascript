import type { CliCommandDefinition } from './types'

const commands = new Map<string, CliCommandDefinition>()
const aliases = new Map<string, string>()

function normalizeName(name: string): string {
    return name.toLowerCase()
}

export function registerCliCommand(def: CliCommandDefinition): void {
    const key = normalizeName(def.name)
    commands.set(key, def)
    if (def.aliases) {
        for (const alias of def.aliases) {
            aliases.set(normalizeName(alias), key)
        }
    }
}

export function registerCliAlias(alias: string, commandName: string): void {
    aliases.set(normalizeName(alias), normalizeName(commandName))
}

export function resolveCliCommandName(name: string): string | undefined {
    const key = normalizeName(name)
    if (commands.has(key)) return key
    return aliases.get(key)
}

export function getCliCommand(name: string): CliCommandDefinition | undefined {
    const key = resolveCliCommandName(name)
    return key ? commands.get(key) : undefined
}

export function listCliCommands(): CliCommandDefinition[] {
    return [...commands.values()].sort((a, b) => {
        const oa = a.order ?? 500
        const ob = b.order ?? 500
        if (oa !== ob) return oa - ob
        return a.name.localeCompare(b.name)
    })
}

export function listCliCommandNames(): readonly string[] {
    return listCliCommands().map((c) => c.name)
}

export function listDocumentedCommands(): readonly string[] {
    return listCliCommandNames()
}

export function clearCliRegistry(): void {
    commands.clear()
    aliases.clear()
}

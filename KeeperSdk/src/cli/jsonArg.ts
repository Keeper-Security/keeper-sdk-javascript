/**
 * Everything after `--from-json` on the command line (trimmed). No tokenization — callers use JSON.parse.
 * Trailing flags such as `--sync` are stripped via {@link stripTrailingCliFlags}.
 */
export function extractFromJsonFlagValue(
    line: string,
    flag = 'from-json',
    trailingFlags: readonly string[] = []
): string | null {
    const escaped = flag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const flagRe = new RegExp(`(?:^|\\s)--${escaped}(?:\\s*=\\s*|\\s+)`, 'i')
    const m = line.match(flagRe)
    if (!m || m.index === undefined) return null
    const rest = line.slice(m.index + m[0].length).trim()
    if (!rest) return null
    return stripTrailingCliFlags(rest, trailingFlags)
}

/** Remove trailing ` --flag` tokens (e.g. `--sync` after a file path or JSON blob). */
export function stripTrailingCliFlags(value: string, flagNames: readonly string[]): string {
    if (flagNames.length === 0) return value.trim()
    let s = value.trim()
    const parts = flagNames.map((f) => f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    const alt = parts.join('|')
    const tailFlag = new RegExp(`\\s+--(?:${alt})(?:\\s*=\\s*(?:"[^"]*"|\\S+))?\\s*$`, 'i')
    while (tailFlag.test(s)) {
        s = s.replace(tailFlag, '').trim()
    }
    return s
}

/**
 * Args for `ts-node` examples: `process.argv.slice(2)` often includes the entry script
 * (e.g. `src/sharedFolders/sf-user.ts`) as the first element. Skip it so positionals and flags match `npm run … -- …`.
 */
export function getScriptArgs(): string[] {
    const a = process.argv.slice(2)
    if (a.length === 0) return a
    const first = a[0]
    if (!first || first.startsWith('-')) return a
    if (!/\.(ts|js)$/i.test(first)) return a
    const f = first.replace(/\\/g, '/')
    if (
        f.includes('sharedFolders/')
        || /[/\\](sf-user|sf-record|list-sf)\.ts$/i.test(f)
        || /^(sf-user|sf-record|list-sf)\.ts$/i.test(f)
    ) {
        return a.slice(1)
    }
    return a
}

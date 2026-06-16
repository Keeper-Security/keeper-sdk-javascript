import type { CliResult, KeeperCliHost, KeeperCliVault } from './types'
import { ensureLoggedIn } from './commands/login'

export async function ensureSession(host: KeeperCliHost): Promise<CliResult | null> {
    const v = host.getVault()
    if (v.isLoggedIn) return null
    const r = await ensureLoggedIn(host)
    return r.code === 0 ? null : r
}

export function ensureCapability<K extends keyof KeeperCliVault>(
    v: KeeperCliVault,
    name: K,
    context: string
): CliResult | null {
    if (typeof v[name] !== 'function') {
        return {
            code: 1,
            out: '',
            err: `${context}: this host does not expose KeeperCliVault.${String(name)}.\n`,
        }
    }
    return null
}

import type { KeeperCliHost } from './types'

const NOT_LOGGED_IN_PROMPT = 'Not logged in> '
const PROMPT_MAX_LEN = 40

export function getKeeperCliPromptPrefix(host: KeeperCliHost): string {
    const v = host.getVault()
    if (!v.isLoggedIn) return NOT_LOGGED_IN_PROMPT
    const name = v.getWorkingFolderDisplayName?.() ?? 'My Vault'
    const label = name.length > PROMPT_MAX_LEN ? `...${name.slice(-37)}` : name
    return `${label}> `
}

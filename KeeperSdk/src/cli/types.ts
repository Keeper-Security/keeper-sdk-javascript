import type { DRecord, DSharedFolder, SyncResult } from '@keeper-security/keeperapi'
import type { SessionRestoreInput } from '../auth/sessionRestore'
import type { ChangeDirectoryResult, TryResolvePathResult } from '../folders/changeDirectory'
import type { FolderTreeBuildOptions } from '../folders/folderTree'
import type { GetFolderOptions, GetFolderResult } from '../folders/getFolder'
import type { ListFolderOptions, ListFolderResult } from '../folders/listFolder'
import type { MkdirOptions } from '../folders/addFolder'
import type { RenameFolderResult } from '../folders/updateFolder'
import type { DeleteFolderResult } from '../folders/deleteFolder'
import type { ListSharedFolderRow, ListSharedFoldersOptions } from '../sharedFolders/listSharedFolders'
import type { RecordShareInfo } from '../sharing/Sharing'
import type { VaultSummary } from '../vault/KeeperVault'
import type { WhoamiInfo } from '../account/whoamiInfo'

export type CliResult = {
    code: number
    out: string
    err: string
    needPassword?: boolean
    loginUsername?: string
}

export type ParsedCli = {
    positional: string[]
    opts: Map<string, string | true>
    repeatedOpts: Map<string, string[]>
}

/**
 * Vault surface for CLI handlers. Methods beyond session/sync/records are optional;
 * commands call `ensureCapability` so thin hosts fail with a clear message.
 */
export type KeeperCliVault = {
    readonly isLoggedIn: boolean
    login(username: string, password: string): Promise<void>
    loginWithSessionToken(username: string, sessionToken: string): Promise<void>
    logout(): Promise<void>
    sync(): Promise<SyncResult>
    getRecords(): DRecord[]
    getSharedFolders(): DSharedFolder[]
    restoreSession(input: SessionRestoreInput): Promise<void>
    getSummary?: () => VaultSummary
    getWhoamiInfo?: (options?: { includeVaultCounts?: boolean }) => Promise<WhoamiInfo>
    findRecord?: (uidOrTitle: string) => DRecord | undefined
    findRecords?: (criteria: string) => DRecord[]
    getRecordShareInfo?: (recordUid: string) => Promise<RecordShareInfo | null>
    listSharedFolders?: (options?: ListSharedFoldersOptions) => ListSharedFolderRow[]
    listFolder?: (options?: ListFolderOptions) => Promise<ListFolderResult>
    tree?: (options?: FolderTreeBuildOptions) => Promise<string>
    changeDirectory?: (path: string) => Promise<ChangeDirectoryResult>
    tryResolvePath?: (path: string) => Promise<TryResolvePathResult>
    getCurrentFolderUid?: () => string | null
    getWorkingFolderDisplayName?: () => string
    getFolder?: (uidOrName: string, options?: GetFolderOptions) => Promise<GetFolderResult>
    mkdir?: (path: string, options?: MkdirOptions) => Promise<{ folderUid: string; success: boolean; message?: string }>
    renameFolder?: (folderPath: string, newName: string) => Promise<RenameFolderResult>
    rmdir?: (patterns: string[], options?: { force?: boolean }) => Promise<DeleteFolderResult>
}

/** Host adapter (browser shell, Node script, tests). `readTextFile` is optional. */
export type KeeperCliHost = {
    getVault(): KeeperCliVault
    envString(name: string): string | undefined
    formatError(context: string, err: unknown): string
    readTextFile?: (path: string) => Promise<string>
    getAccountUsername?: () => Promise<string | undefined>
}

export type CliHelpPositional = {
    name: string
    help: string
    nargs?: '?' | '*' | '+'
}

export type CliHelpOption = {
    flags: string
    help: string
    metavar?: string
    choices?: string
}

export type CliHelpDoc = {
    description: string
    usage?: string
    positionals?: CliHelpPositional[]
    options?: CliHelpOption[]
    epilog?: string
}

export type CliCommandDefinition = {
    name: string
    order?: number
    description: string
    usage: string
    aliases?: readonly string[]
    subcommands?: readonly string[]
    flagOptions?: readonly string[]
    valueShortFlags?: readonly string[]
    allowedOptions?: ReadonlySet<string>
    help: CliHelpDoc
    run: (host: KeeperCliHost, parsed: ParsedCli) => Promise<CliResult>
}

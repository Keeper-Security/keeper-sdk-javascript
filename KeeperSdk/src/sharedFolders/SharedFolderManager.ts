import type { Auth } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../utils'
import {
    formatSharedFoldersTable,
    listSharedFolders,
    renderSharedFoldersAsciiTable,
} from './listSharedFolders'
import type {
    FormattedSharedFoldersTable,
    ListSharedFolderRow,
    ListSharedFoldersOptions,
} from './listSharedFolders'
import { shareFolder } from './shareFolder'
import type { ShareFolderInput, ShareFolderResult } from './shareFolder'

export type AuthProvider = () => Auth

export class SharedFolderManager {
    private readonly storage: InMemoryStorage
    private readonly authProvider: AuthProvider

    constructor(storage: InMemoryStorage, authProvider: AuthProvider) {
        this.storage = storage
        this.authProvider = authProvider
    }

    private requireAuth(): Auth {
        const auth = this.authProvider()
        if (!auth) {
            throw new KeeperSdkError('Not logged in. Call login() first.', ResultCodes.NOT_LOGGED_IN)
        }
        return auth
    }

    public listSharedFolders(options: ListSharedFoldersOptions = {}): ListSharedFolderRow[] {
        return listSharedFolders(this.storage, options)
    }

    public formatSharedFoldersTable(
        rows: ListSharedFolderRow[],
        options: { verbose?: boolean; columnWidth?: number } = {}
    ): FormattedSharedFoldersTable {
        return formatSharedFoldersTable(rows, options)
    }

    public renderSharedFoldersAsciiTable(
        table: FormattedSharedFoldersTable,
        options: { minColWidth?: number } = {}
    ): string {
        return renderSharedFoldersAsciiTable(table, options)
    }

    public async shareFolder(input: ShareFolderInput): Promise<ShareFolderResult> {
        return shareFolder(this.requireAuth(), this.storage, input)
    }
}

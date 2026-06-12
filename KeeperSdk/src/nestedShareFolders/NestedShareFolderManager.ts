import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../utils'
import {
    formatListNsfOutput,
    formatListNsfTable,
    listNestedShareFolders,
    renderListNsfAsciiTable,
    type FormattedListNsfTable,
    type ListNsfFormatInput,
    type ListNsfOptions,
    type ListNsfRow,
} from './listNsf'
import {
    formatNsfDetail as renderNsfDetail,
    formatNsfFolderDetail as renderNsfFolderDetail,
    formatNsfRecordDetail as renderNsfRecordDetail,
    getNestedShareFolder,
    type GetNsfOptions,
    type GetNsfResult,
    type NsfFolderView,
    type NsfRecordView,
} from './getNsf'
import { linkNestedShareRecord, type LinkNsfRecordResult } from './linkNsfRecord'
import {
    formatRemoveNsfPreview,
    removeNestedShareRecords,
    type RemoveNsfRecordInput,
    type RemoveNsfRecordResult,
} from './removeNsfRecord'

export type AuthProvider = () => Auth

export class NestedShareFolderManager {
    private readonly storage: InMemoryStorage
    private readonly authProvider: AuthProvider

    constructor(storage: InMemoryStorage, authProvider: AuthProvider) {
        this.storage = storage
        this.authProvider = authProvider
    }

    private requireAuth(): Auth {
        const auth = this.authProvider()
        if (!auth?.sessionToken) {
            throw new KeeperSdkError('Not logged in. Call login() first.', ResultCodes.NOT_LOGGED_IN)
        }
        return auth
    }

    public listNestedShareFolders(options: ListNsfOptions = {}): ListNsfRow[] {
        return listNestedShareFolders(this.storage, options)
    }

    public formatListNsfTable(rows: ListNsfRow[], options: { columnWidth?: number } = {}): FormattedListNsfTable {
        return formatListNsfTable(rows, options)
    }

    public renderListNsfAsciiTable(table: FormattedListNsfTable, options: { minColWidth?: number } = {}): string {
        return renderListNsfAsciiTable(table, options)
    }

    public formatListNsfOutput(rows: ListNsfRow[], format: ListNsfFormatInput = 'table'): string {
        return formatListNsfOutput(rows, format)
    }

    public async getNestedShareFolder(identifier: string, options: GetNsfOptions = {}): Promise<GetNsfResult> {
        return getNestedShareFolder(this.storage, this.requireAuth(), identifier, options)
    }

    public formatNsfDetail(result: GetNsfResult, verbose = false): string {
        return renderNsfDetail(result, verbose)
    }

    public formatNsfFolderDetail(view: NsfFolderView, verbose = false): string {
        return renderNsfFolderDetail(view, verbose)
    }

    public formatNsfRecordDetail(view: NsfRecordView, verbose = false): string {
        return renderNsfRecordDetail(view, verbose)
    }

    public async linkNestedShareRecord(
        recordIdentifier: string,
        folderIdentifier: string
    ): Promise<LinkNsfRecordResult> {
        return linkNestedShareRecord(this.storage, this.requireAuth(), recordIdentifier, folderIdentifier)
    }

    public async removeNestedShareRecords(input: RemoveNsfRecordInput): Promise<RemoveNsfRecordResult> {
        return removeNestedShareRecords(this.storage, this.requireAuth(), input)
    }

    public formatRemoveNsfPreview(preview: RemoveNsfRecordResult['preview']): string {
        return formatRemoveNsfPreview(preview)
    }
}

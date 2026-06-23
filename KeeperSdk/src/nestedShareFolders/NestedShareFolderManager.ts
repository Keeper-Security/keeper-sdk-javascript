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
import { mkdirNestedShareFolder, type MkdirNsfInput, type MkdirNsfResult } from './mkdirNsf'
import { updateNestedShareFolder, type UpdateNsfFolderInput, type UpdateNsfFolderResult } from './updateNsfFolder'
import {
    shareNestedShareFolder,
    shareNestedShareRecord,
    formatNsfRecordSharePlan,
    formatNsfRecordShareResults,
    type ShareNestedShareFolderInput,
    type ShareNestedShareFolderResult,
    type ShareNestedShareRecordInput,
    type ShareNestedShareRecordResult,
} from './nsfShare'
import {
    listNsfShortcuts,
    keepNsfShortcut,
    formatNsfShortcutOutput,
    formatKeepNsfShortcutPlan,
    type ListNsfShortcutsOptions,
    type NsfShortcutRow,
    type KeepNsfShortcutInput,
    type KeepNsfShortcutResult,
} from './nsfShortcut'
import {
    transferNestedShareRecords,
    formatTransferNestedShareRecordResults,
    type TransferNestedShareRecordInput,
    type TransferNestedShareRecordResult,
} from './nsfTransferRecord'
import {
    formatRemoveNsfFolderPreview,
    removeNestedShareFolders,
    type RemoveNsfFolderInput,
    type RemoveNsfFolderResult,
} from './removeNsfFolder'
import {
    getNestedShareRecordDetails,
    formatNsfRecordDetailsOutput,
    type GetNsfRecordDetailsInput,
    type GetNsfRecordDetailsResult,
} from './getNsfRecordDetails'
import {
    updateNestedShareRecords,
    type UpdateNsfRecordInput,
    type UpdateNsfRecordResult,
} from './updateNsfRecord'
import { addNestedShareRecord, type AddNsfRecordInput, type AddNsfRecordResult } from './addNsfRecord'
import {
    updateNestedShareRecordPermissions,
    formatNsfRecordPermissionPlan,
    formatNsfRecordPermissionFailures,
    type UpdateNsfRecordPermissionInput,
    type UpdateNsfRecordPermissionResult,
} from './nsfRecordPermission'

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

    public async mkdirNestedShareFolder(input: MkdirNsfInput): Promise<MkdirNsfResult> {
        return mkdirNestedShareFolder(this.storage, this.requireAuth(), input)
    }

    public async updateNestedShareFolder(input: UpdateNsfFolderInput): Promise<UpdateNsfFolderResult> {
        return updateNestedShareFolder(this.storage, this.requireAuth(), input)
    }

    public async shareNestedShareFolder(
        input: ShareNestedShareFolderInput
    ): Promise<ShareNestedShareFolderResult> {
        return shareNestedShareFolder(this.storage, this.requireAuth(), input)
    }

    public async shareNestedShareRecord(
        input: ShareNestedShareRecordInput
    ): Promise<ShareNestedShareRecordResult> {
        return shareNestedShareRecord(this.storage, this.requireAuth(), input)
    }

    public formatNsfRecordSharePlan(result: ShareNestedShareRecordResult): string {
        return formatNsfRecordSharePlan(result.plan)
    }

    public formatNsfRecordShareResults(results: ShareNestedShareRecordResult['results']): string {
        return formatNsfRecordShareResults(results)
    }

    public listNsfShortcuts(options: ListNsfShortcutsOptions = {}): NsfShortcutRow[] {
        return listNsfShortcuts(this.storage, options)
    }

    public formatNsfShortcutOutput(rows: NsfShortcutRow[], format?: ListNsfShortcutsOptions['format']): string {
        return formatNsfShortcutOutput(rows, format)
    }

    public async keepNsfShortcut(
        input: KeepNsfShortcutInput,
        defaultFolderUid?: string
    ): Promise<KeepNsfShortcutResult> {
        return keepNsfShortcut(this.storage, this.requireAuth(), input, defaultFolderUid)
    }

    public formatKeepNsfShortcutPlan(result: KeepNsfShortcutResult): string {
        return formatKeepNsfShortcutPlan(result.plan)
    }

    public async transferNestedShareRecords(
        input: TransferNestedShareRecordInput
    ): Promise<TransferNestedShareRecordResult> {
        return transferNestedShareRecords(this.storage, this.requireAuth(), input)
    }

    public formatTransferNestedShareRecordResults(
        results: TransferNestedShareRecordResult['results']
    ): string {
        return formatTransferNestedShareRecordResults(results)
    }

    public async removeNestedShareFolders(input: RemoveNsfFolderInput): Promise<RemoveNsfFolderResult> {
        return removeNestedShareFolders(this.storage, this.requireAuth(), input)
    }

    public formatRemoveNsfFolderPreview(
        preview: RemoveNsfFolderResult['preview'],
        operation: RemoveNsfFolderResult['operation'],
        quiet?: boolean
    ): string {
        return formatRemoveNsfFolderPreview(preview, operation, quiet)
    }

    public async getNestedShareRecordDetails(
        input: GetNsfRecordDetailsInput
    ): Promise<GetNsfRecordDetailsResult> {
        return getNestedShareRecordDetails(this.storage, this.requireAuth(), input)
    }

    public formatNsfRecordDetailsOutput(
        result: GetNsfRecordDetailsResult,
        format?: GetNsfRecordDetailsInput['format']
    ): string {
        return formatNsfRecordDetailsOutput(result, format)
    }

    public async updateNestedShareRecords(input: UpdateNsfRecordInput): Promise<UpdateNsfRecordResult> {
        return updateNestedShareRecords(this.storage, this.requireAuth(), input)
    }

    public async addNestedShareRecord(input: AddNsfRecordInput): Promise<AddNsfRecordResult> {
        return addNestedShareRecord(this.storage, this.requireAuth(), input)
    }

    public async updateNestedShareRecordPermissions(
        input: UpdateNsfRecordPermissionInput
    ): Promise<UpdateNsfRecordPermissionResult> {
        return updateNestedShareRecordPermissions(this.storage, this.requireAuth(), input)
    }

    public formatNsfRecordPermissionPlan(result: UpdateNsfRecordPermissionResult): string {
        return formatNsfRecordPermissionPlan(result.plan)
    }

    public formatNsfRecordPermissionFailures(
        failures: UpdateNsfRecordPermissionResult['grantFailures'],
        kind: 'GRANT' | 'REVOKE'
    ): string {
        return formatNsfRecordPermissionFailures(failures, kind)
    }
}

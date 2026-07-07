import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../utils'
import { listNestedShareFolders, type ListNsfOptions, type ListNsfRow } from './listNsf'
import { getNestedShareFolder, type GetNsfOptions, type GetNsfResult } from './getNsf'
import { linkNestedShareRecord, type LinkNsfRecordResult } from './linkNsfRecord'
import { removeNestedShareRecords, type RemoveNsfRecordInput, type RemoveNsfRecordResult } from './removeNsfRecord'
import { mkdirNestedShareFolder, type MkdirNsfInput, type MkdirNsfResult } from './mkdirNsf'
import { removeNestedShareFolders, type RemoveNsfFolderInput, type RemoveNsfFolderResult } from './removeNsfFolder'
import {
    getNestedShareRecordDetails,
    type GetNsfRecordDetailsInput,
    type GetNsfRecordDetailsResult,
} from './getNsfRecordDetails'
import {
    updateNestedShareRecords,
    type UpdateNsfRecordInput,
    type UpdateNsfRecordResult,
} from './updateNsfRecord'
import {
    addNestedShareRecord,
    addNestedShareRecords,
    type AddNsfRecordInput,
    type AddNsfRecordResult,
    type AddNsfRecordsInput,
    type AddNsfRecordsResult,
} from './addNsfRecord'

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

    public async getNestedShareFolder(identifier: string, options: GetNsfOptions = {}): Promise<GetNsfResult> {
        return getNestedShareFolder(this.storage, this.requireAuth(), identifier, options)
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

    public async mkdirNestedShareFolder(input: MkdirNsfInput): Promise<MkdirNsfResult> {
        return mkdirNestedShareFolder(this.storage, this.requireAuth(), input)
    }

    public async removeNestedShareFolders(input: RemoveNsfFolderInput): Promise<RemoveNsfFolderResult> {
        return removeNestedShareFolders(this.storage, this.requireAuth(), input)
    }

    public async getNestedShareRecordDetails(
        input: GetNsfRecordDetailsInput
    ): Promise<GetNsfRecordDetailsResult> {
        return getNestedShareRecordDetails(this.storage, this.requireAuth(), input)
    }

    public async updateNestedShareRecords(input: UpdateNsfRecordInput): Promise<UpdateNsfRecordResult> {
        return updateNestedShareRecords(this.storage, this.requireAuth(), input)
    }

    public async addNestedShareRecords(input: AddNsfRecordsInput): Promise<AddNsfRecordsResult> {
        return addNestedShareRecords(this.storage, this.requireAuth(), input)
    }

    public async addNestedShareRecord(input: AddNsfRecordInput): Promise<AddNsfRecordResult> {
        return addNestedShareRecord(this.storage, this.requireAuth(), input)
    }
}

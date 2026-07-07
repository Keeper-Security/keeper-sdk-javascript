import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../utils'
import { listNestedShareFolders } from './listNsf'
import { getNestedShareFolder } from './getNsf'
import { linkNestedShareRecord } from './linkNsfRecord'
import { removeNestedShareRecords } from './removeNsfRecord'
import { mkdirNestedShareFolder } from './mkdirNsf'
import { removeNestedShareFolders } from './removeNsfFolder'
import { getNestedShareRecordDetails } from './getNsfRecordDetails'
import { updateNestedShareRecords, updateNestedShareRecord } from './updateNsfRecord'
import { addNestedShareRecord, addNestedShareRecords } from './addNsfRecord'
import type {
    AddNsfRecordInput,
    AddNsfRecordResult,
    AddNsfRecordsInput,
    AddNsfRecordsResult,
    GetNsfOptions,
    GetNsfResult,
    GetNsfRecordDetailsInput,
    GetNsfRecordDetailsResult,
    LinkNsfRecordResult,
    ListNsfOptions,
    ListNsfRow,
    MkdirNsfInput,
    MkdirNsfResult,
    RemoveNsfFolderInput,
    RemoveNsfFolderResult,
    RemoveNsfRecordInput,
    RemoveNsfRecordResult,
    UpdateNsfRecordInput,
    UpdateNsfRecordItemInput,
    UpdateNsfRecordsInput,
    UpdateNsfRecordResult,
    UpdateNsfRecordResultItem,
} from './nsfTypes'

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

    public async updateNestedShareRecords(
        input: UpdateNsfRecordInput | UpdateNsfRecordsInput
    ): Promise<UpdateNsfRecordResult> {
        return updateNestedShareRecords(this.storage, this.requireAuth(), input)
    }

    public async updateNestedShareRecord(input: UpdateNsfRecordItemInput): Promise<UpdateNsfRecordResultItem> {
        return updateNestedShareRecord(this.storage, this.requireAuth(), input)
    }

    public async addNestedShareRecords(input: AddNsfRecordsInput): Promise<AddNsfRecordsResult> {
        return addNestedShareRecords(this.storage, this.requireAuth(), input)
    }

    public async addNestedShareRecord(input: AddNsfRecordInput): Promise<AddNsfRecordResult> {
        return addNestedShareRecord(this.storage, this.requireAuth(), input)
    }
}

import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../../utils'
import { formatRotationInfoJson, formatRotationInfoOutput, getRotationInfo } from './getRotationInfo'
import {
    formatRotationSchedulesJson,
    formatRotationSchedulesOutput,
    formatRotationSchedulesTable,
    listRotationSchedules,
    renderRotationSchedulesAsciiTable,
} from './listRotations'
import type {
    FormatRotationSchedulesTableOptions,
    FormattedRotationSchedulesTable,
    GetRotationInfoInput,
    ListRotationSchedulesOptions,
    ListRotationSchedulesResult,
    RenderRotationSchedulesAsciiTableOptions,
    RotationInfoResult,
} from './rotationTypes'

export type AuthProvider = () => Auth

export class RotationManager {
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

    public async listRotationSchedules(options: ListRotationSchedulesOptions = {}): Promise<ListRotationSchedulesResult> {
        return listRotationSchedules(this.requireAuth(), this.storage, options)
    }

    public formatRotationSchedulesTable(
        result: ListRotationSchedulesResult,
        options: FormatRotationSchedulesTableOptions = {}
    ): FormattedRotationSchedulesTable {
        return formatRotationSchedulesTable(result, options)
    }

    public renderRotationSchedulesAsciiTable(
        table: FormattedRotationSchedulesTable,
        options: RenderRotationSchedulesAsciiTableOptions = {}
    ): string {
        return renderRotationSchedulesAsciiTable(table, options)
    }

    public formatRotationSchedulesJson(
        result: ListRotationSchedulesResult,
        options: ListRotationSchedulesOptions = {}
    ): string {
        return formatRotationSchedulesJson(result, options)
    }

    public formatRotationSchedulesOutput(
        result: ListRotationSchedulesResult,
        options: ListRotationSchedulesOptions = {}
    ): string {
        return formatRotationSchedulesOutput(result, options)
    }

    public async getRotationInfo(input: GetRotationInfoInput): Promise<RotationInfoResult> {
        return getRotationInfo(this.requireAuth(), this.storage, input)
    }

    public formatRotationInfoJson(result: RotationInfoResult): string {
        return formatRotationInfoJson(result)
    }

    public formatRotationInfoOutput(
        result: RotationInfoResult,
        options: Pick<GetRotationInfoInput, 'format'> = {}
    ): string {
        return formatRotationInfoOutput(result, options)
    }
}

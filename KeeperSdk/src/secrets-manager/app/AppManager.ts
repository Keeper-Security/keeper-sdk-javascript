import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../../utils'
import { createApp, formatCreateAppOutput } from './createApp'
import { formatAppDetailOutput, getApp } from './getApp'
import { formatAppsOutput, formatAppsTable, listApps, renderAppsAsciiTable } from './listApps'
import type {
    CreateSecretsManagerAppInput,
    CreateSecretsManagerAppResult,
    FormattedSecretsManagerTable,
    ListSecretsManagerAppsResult,
    RenderSecretsManagerAsciiTableOptions,
    SecretsManagerAppDetail,
} from './appTypes'

export type AuthProvider = () => Auth

export class AppManager {
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

    public async listApps(): Promise<ListSecretsManagerAppsResult> {
        return listApps(this.requireAuth(), this.storage)
    }

    public async getApp(appNameOrUid: string): Promise<SecretsManagerAppDetail> {
        return getApp(this.requireAuth(), this.storage, appNameOrUid)
    }

    public async createApp(input: CreateSecretsManagerAppInput): Promise<CreateSecretsManagerAppResult> {
        return createApp(this.requireAuth(), this.storage, input)
    }

    public formatAppsTable(result: ListSecretsManagerAppsResult): FormattedSecretsManagerTable {
        return formatAppsTable(result)
    }

    public renderAppsAsciiTable(
        table: FormattedSecretsManagerTable,
        options: RenderSecretsManagerAsciiTableOptions = {}
    ): string {
        return renderAppsAsciiTable(table, options)
    }

    public formatAppsOutput(result: ListSecretsManagerAppsResult): string {
        return formatAppsOutput(result)
    }

    public formatAppDetailOutput(detail: SecretsManagerAppDetail): string {
        return formatAppDetailOutput(detail)
    }

    public formatCreateAppOutput(result: CreateSecretsManagerAppResult): string {
        return formatCreateAppOutput(result)
    }
}

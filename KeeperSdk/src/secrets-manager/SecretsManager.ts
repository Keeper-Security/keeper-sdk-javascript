import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { AppManager, type AuthProvider } from './app/AppManager'
import type {
    CreateSecretsManagerAppInput,
    CreateSecretsManagerAppResult,
    FormattedSecretsManagerTable,
    ListSecretsManagerAppsResult,
    RenderSecretsManagerAsciiTableOptions,
    SecretsManagerAppDetail,
} from './app/appTypes'

export type { AuthProvider }

export class SecretsManager {
    private readonly appManager: AppManager

    constructor(storage: InMemoryStorage, authProvider: AuthProvider) {
        this.appManager = new AppManager(storage, authProvider)
    }

    public getAppManager(): AppManager {
        return this.appManager
    }

    public async listApps(): Promise<ListSecretsManagerAppsResult> {
        return this.appManager.listApps()
    }

    public async getApp(appNameOrUid: string): Promise<SecretsManagerAppDetail> {
        return this.appManager.getApp(appNameOrUid)
    }

    public async createApp(input: CreateSecretsManagerAppInput): Promise<CreateSecretsManagerAppResult> {
        return this.appManager.createApp(input)
    }

    public formatAppsTable(result: ListSecretsManagerAppsResult): FormattedSecretsManagerTable {
        return this.appManager.formatAppsTable(result)
    }

    public renderAppsAsciiTable(
        table: FormattedSecretsManagerTable,
        options: RenderSecretsManagerAsciiTableOptions = {}
    ): string {
        return this.appManager.renderAppsAsciiTable(table, options)
    }

    public formatAppsOutput(result: ListSecretsManagerAppsResult): string {
        return this.appManager.formatAppsOutput(result)
    }

    public formatAppDetailOutput(detail: SecretsManagerAppDetail): string {
        return this.appManager.formatAppDetailOutput(detail)
    }

    public formatCreateAppOutput(result: CreateSecretsManagerAppResult): string {
        return this.appManager.formatCreateAppOutput(result)
    }
}

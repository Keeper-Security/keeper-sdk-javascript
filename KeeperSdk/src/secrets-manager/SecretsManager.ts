import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { AppManager, type AuthProvider } from './app/AppManager'
import type {
    CreateSecretsManagerAppInput,
    CreateSecretsManagerAppResult,
    FormattedSecretsManagerTable,
    ListSecretsManagerAppsResult,
    RenderSecretsManagerAsciiTableOptions,
    SecretsManagerAppDetail,
    RemoveSecretsManagerAppInput,
    RemoveSecretsManagerAppResult,
    UpdateSecretsManagerAppInput,
    UpdateSecretsManagerAppResult,
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

    public async updateApp(input: UpdateSecretsManagerAppInput): Promise<UpdateSecretsManagerAppResult> {
        return this.appManager.updateApp(input)
    }

    public async removeApp(input: RemoveSecretsManagerAppInput): Promise<RemoveSecretsManagerAppResult> {
        return this.appManager.removeApp(input)
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

    public formatUpdateAppOutput(result: UpdateSecretsManagerAppResult): string {
        return this.appManager.formatUpdateAppOutput(result)
    }

    public formatRemoveAppOutput(result: RemoveSecretsManagerAppResult): string {
        return this.appManager.formatRemoveAppOutput(result)
    }
}

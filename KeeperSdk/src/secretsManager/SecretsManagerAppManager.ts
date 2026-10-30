import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { formatSecretsManagerAppDetails, getSecretsManagerApp } from './getApplication'
import {
    formatSecretsManagerAppsTable,
    listSecretsManagerApps,
    renderSecretsManagerAppsAsciiTable,
} from './listApplications'
import type { FormattedSecretsManagerAppsTable, SecretsManagerAppDetails, SecretsManagerAppRow } from './types'

export type AuthProvider = () => Auth

export class SecretsManagerAppManager {
    private readonly storage: InMemoryStorage
    private readonly authProvider: AuthProvider

    public constructor(storage: InMemoryStorage, authProvider: AuthProvider) {
        this.storage = storage
        this.authProvider = authProvider
    }

    public async listApplications(): Promise<SecretsManagerAppRow[]> {
        return listSecretsManagerApps(this.authProvider(), this.storage)
    }

    public async getApplication(identifier: string): Promise<SecretsManagerAppDetails> {
        return getSecretsManagerApp(this.authProvider(), this.storage, identifier)
    }

    public formatApplicationDetails(app: SecretsManagerAppDetails): string {
        return formatSecretsManagerAppDetails(app)
    }

    public formatApplicationsTable(rows: SecretsManagerAppRow[]): FormattedSecretsManagerAppsTable {
        return formatSecretsManagerAppsTable(rows)
    }

    public renderApplicationsAsciiTable(table: FormattedSecretsManagerAppsTable): string {
        return renderSecretsManagerAppsAsciiTable(table)
    }
}

import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../../utils'
import { createPamConfiguration } from './createConfig'
import { editPamConfiguration } from './editConfig'
import { removePamConfiguration } from './removeConfig'
import {
    formatPamConfigurationsJson,
    formatPamConfigurationsOutput,
    formatPamConfigurationsTable,
    listPamConfigurations,
    renderPamConfigurationsAsciiTable,
} from './listConfigs'
import type {
    CreatePamConfigurationInput,
    CreatePamConfigurationResult,
    EditPamConfigurationInput,
    EditPamConfigurationResult,
    FormatPamConfigurationsTableOptions,
    FormattedPamConfigurationsTable,
    ListPamConfigurationsOptions,
    ListPamConfigurationsResult,
    RemovePamConfigurationInput,
    RemovePamConfigurationResult,
    RenderPamConfigurationsAsciiTableOptions,
} from './configTypes'

export type AuthProvider = () => Auth

export class ConfigManager {
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

    public listPamConfigurations(options: ListPamConfigurationsOptions = {}): ListPamConfigurationsResult {
        return listPamConfigurations(this.storage, options)
    }

    public async createPamConfiguration(input: CreatePamConfigurationInput): Promise<CreatePamConfigurationResult> {
        return createPamConfiguration(this.requireAuth(), this.storage, input)
    }

    public async editPamConfiguration(input: EditPamConfigurationInput): Promise<EditPamConfigurationResult> {
        return editPamConfiguration(this.requireAuth(), this.storage, input)
    }

    public async removePamConfiguration(input: RemovePamConfigurationInput): Promise<RemovePamConfigurationResult> {
        return removePamConfiguration(this.requireAuth(), this.storage, input)
    }

    public formatPamConfigurationsTable(
        result: ListPamConfigurationsResult,
        options: FormatPamConfigurationsTableOptions = {}
    ): FormattedPamConfigurationsTable {
        return formatPamConfigurationsTable(result, options)
    }

    public renderPamConfigurationsAsciiTable(
        table: FormattedPamConfigurationsTable,
        options: RenderPamConfigurationsAsciiTableOptions = {}
    ): string {
        return renderPamConfigurationsAsciiTable(table, options)
    }

    public formatPamConfigurationsJson(
        result: ListPamConfigurationsResult,
        options: ListPamConfigurationsOptions = {}
    ): string {
        return formatPamConfigurationsJson(result, options)
    }

    public formatPamConfigurationsOutput(
        result: ListPamConfigurationsResult,
        options: ListPamConfigurationsOptions = {}
    ): string {
        return formatPamConfigurationsOutput(result, options)
    }
}

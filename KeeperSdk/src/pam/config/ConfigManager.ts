import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../../utils'
import { createPamConfiguration, formatCreatePamConfigurationOutput } from './createConfig'
import { editPamConfiguration, formatEditPamConfigurationOutput } from './editConfig'
import { removePamConfiguration, formatRemovePamConfigurationOutput } from './removeConfig'
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

    public async createPamConfiguration(
        input: CreatePamConfigurationInput & { returnValue: true }
    ): Promise<string>
    public async createPamConfiguration(
        input: CreatePamConfigurationInput & { returnValue?: false }
    ): Promise<CreatePamConfigurationResult>
    public async createPamConfiguration(
        input: CreatePamConfigurationInput
    ): Promise<CreatePamConfigurationResult | string>
    public async createPamConfiguration(
        input: CreatePamConfigurationInput
    ): Promise<CreatePamConfigurationResult | string> {
        return createPamConfiguration(this.requireAuth(), this.storage, input)
    }

    public formatCreatePamConfigurationOutput(result: CreatePamConfigurationResult): string {
        return formatCreatePamConfigurationOutput(result)
    }

    public async editPamConfiguration(input: EditPamConfigurationInput): Promise<EditPamConfigurationResult> {
        return editPamConfiguration(this.requireAuth(), this.storage, input)
    }

    public formatEditPamConfigurationOutput(result: EditPamConfigurationResult): string {
        return formatEditPamConfigurationOutput(result)
    }

    public async removePamConfiguration(
        input: RemovePamConfigurationInput
    ): Promise<RemovePamConfigurationResult> {
        return removePamConfiguration(this.requireAuth(), this.storage, input)
    }

    public formatRemovePamConfigurationOutput(result: RemovePamConfigurationResult): string {
        return formatRemovePamConfigurationOutput(result)
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

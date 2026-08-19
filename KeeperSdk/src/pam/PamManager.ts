import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { ConfigManager } from './config/ConfigManager'
import { GatewayManager } from './gateway/GatewayManager'
import type {
    FormatPamConfigurationsTableOptions,
    FormattedPamConfigurationsTable,
    ListPamConfigurationsOptions,
    ListPamConfigurationsResult,
    RenderPamConfigurationsAsciiTableOptions,
    CreatePamConfigurationInput,
    CreatePamConfigurationResult,
    EditPamConfigurationInput,
    EditPamConfigurationResult,
    RemovePamConfigurationInput,
    RemovePamConfigurationResult,
} from './config/configTypes'
import type {
    CreateGatewayInput,
    CreateGatewayResult,
    EditGatewayInput,
    EditGatewayResult,
    FormatGatewaysTableOptions,
    FormattedGatewaysTable,
    ListGatewaysOptions,
    ListGatewaysResult,
    RemoveGatewayInput,
    RemoveGatewayResult,
    RenderGatewaysAsciiTableOptions,
    SetGatewayMaxInstancesInput,
    SetGatewayMaxInstancesResult,
} from './gateway/gatewayTypes'

export type AuthProvider = () => Auth

export class PamManager {
    private readonly gatewayManager: GatewayManager
    private readonly configManager: ConfigManager

    constructor(storage: InMemoryStorage, authProvider: AuthProvider) {
        this.gatewayManager = new GatewayManager(storage, authProvider)
        this.configManager = new ConfigManager(storage, authProvider)
    }

    public getGatewayManager(): GatewayManager {
        return this.gatewayManager
    }

    public getConfigManager(): ConfigManager {
        return this.configManager
    }

    public async listGateways(options: ListGatewaysOptions = {}): Promise<ListGatewaysResult> {
        return this.gatewayManager.listGateways(options)
    }

    public async createGateway(input: CreateGatewayInput): Promise<CreateGatewayResult> {
        return this.gatewayManager.createGateway(input)
    }

    public async editGateway(input: EditGatewayInput): Promise<EditGatewayResult> {
        return this.gatewayManager.editGateway(input)
    }

    public async removeGateway(input: RemoveGatewayInput): Promise<RemoveGatewayResult> {
        return this.gatewayManager.removeGateway(input)
    }

    public async setGatewayMaxInstances(input: SetGatewayMaxInstancesInput): Promise<SetGatewayMaxInstancesResult> {
        return this.gatewayManager.setGatewayMaxInstances(input)
    }

    public formatGatewaysTable(
        result: ListGatewaysResult,
        options: FormatGatewaysTableOptions = {}
    ): FormattedGatewaysTable {
        return this.gatewayManager.formatGatewaysTable(result, options)
    }

    public renderGatewaysAsciiTable(
        table: FormattedGatewaysTable,
        options: RenderGatewaysAsciiTableOptions = {}
    ): string {
        return this.gatewayManager.renderGatewaysAsciiTable(table, options)
    }

    public formatGatewaysJson(result: ListGatewaysResult, options: ListGatewaysOptions = {}): string {
        return this.gatewayManager.formatGatewaysJson(result, options)
    }

    public formatGatewaysOutput(result: ListGatewaysResult, options: ListGatewaysOptions = {}): string {
        return this.gatewayManager.formatGatewaysOutput(result, options)
    }

    public listPamConfigurations(options: ListPamConfigurationsOptions = {}): ListPamConfigurationsResult {
        return this.configManager.listPamConfigurations(options)
    }

    public async createPamConfiguration(input: CreatePamConfigurationInput): Promise<CreatePamConfigurationResult> {
        return this.configManager.createPamConfiguration(input)
    }

    public async editPamConfiguration(input: EditPamConfigurationInput): Promise<EditPamConfigurationResult> {
        return this.configManager.editPamConfiguration(input)
    }

    public async removePamConfiguration(input: RemovePamConfigurationInput): Promise<RemovePamConfigurationResult> {
        return this.configManager.removePamConfiguration(input)
    }

    public formatPamConfigurationsTable(
        result: ListPamConfigurationsResult,
        options: FormatPamConfigurationsTableOptions = {}
    ): FormattedPamConfigurationsTable {
        return this.configManager.formatPamConfigurationsTable(result, options)
    }

    public renderPamConfigurationsAsciiTable(
        table: FormattedPamConfigurationsTable,
        options: RenderPamConfigurationsAsciiTableOptions = {}
    ): string {
        return this.configManager.renderPamConfigurationsAsciiTable(table, options)
    }

    public formatPamConfigurationsJson(
        result: ListPamConfigurationsResult,
        options: ListPamConfigurationsOptions = {}
    ): string {
        return this.configManager.formatPamConfigurationsJson(result, options)
    }

    public formatPamConfigurationsOutput(
        result: ListPamConfigurationsResult,
        options: ListPamConfigurationsOptions = {}
    ): string {
        return this.configManager.formatPamConfigurationsOutput(result, options)
    }
}

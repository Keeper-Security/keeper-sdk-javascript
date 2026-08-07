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

    public async createGateway(input: CreateGatewayInput & { returnValue: true }): Promise<string>
    public async createGateway(input: CreateGatewayInput & { returnValue?: false }): Promise<CreateGatewayResult>
    public async createGateway(input: CreateGatewayInput): Promise<CreateGatewayResult | string>
    public async createGateway(input: CreateGatewayInput): Promise<CreateGatewayResult | string> {
        return this.gatewayManager.createGateway(input)
    }

    public formatCreateGatewayOutput(result: CreateGatewayResult): string {
        return this.gatewayManager.formatCreateGatewayOutput(result)
    }

    public async editGateway(input: EditGatewayInput): Promise<EditGatewayResult> {
        return this.gatewayManager.editGateway(input)
    }

    public formatEditGatewayOutput(result: EditGatewayResult): string {
        return this.gatewayManager.formatEditGatewayOutput(result)
    }

    public async removeGateway(input: RemoveGatewayInput): Promise<RemoveGatewayResult> {
        return this.gatewayManager.removeGateway(input)
    }

    public formatRemoveGatewayOutput(result: RemoveGatewayResult): string {
        return this.gatewayManager.formatRemoveGatewayOutput(result)
    }

    public async setGatewayMaxInstances(input: SetGatewayMaxInstancesInput): Promise<SetGatewayMaxInstancesResult> {
        return this.gatewayManager.setGatewayMaxInstances(input)
    }

    public formatSetGatewayMaxInstancesOutput(result: SetGatewayMaxInstancesResult): string {
        return this.gatewayManager.formatSetGatewayMaxInstancesOutput(result)
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

    public async createPamConfiguration(input: CreatePamConfigurationInput & { returnValue: true }): Promise<string>
    public async createPamConfiguration(
        input: CreatePamConfigurationInput & { returnValue?: false }
    ): Promise<CreatePamConfigurationResult>
    public async createPamConfiguration(
        input: CreatePamConfigurationInput
    ): Promise<CreatePamConfigurationResult | string>
    public async createPamConfiguration(
        input: CreatePamConfigurationInput
    ): Promise<CreatePamConfigurationResult | string> {
        return this.configManager.createPamConfiguration(input)
    }

    public formatCreatePamConfigurationOutput(result: CreatePamConfigurationResult): string {
        return this.configManager.formatCreatePamConfigurationOutput(result)
    }

    public async editPamConfiguration(input: EditPamConfigurationInput): Promise<EditPamConfigurationResult> {
        return this.configManager.editPamConfiguration(input)
    }

    public formatEditPamConfigurationOutput(result: EditPamConfigurationResult): string {
        return this.configManager.formatEditPamConfigurationOutput(result)
    }

    public async removePamConfiguration(input: RemovePamConfigurationInput): Promise<RemovePamConfigurationResult> {
        return this.configManager.removePamConfiguration(input)
    }

    public formatRemovePamConfigurationOutput(result: RemovePamConfigurationResult): string {
        return this.configManager.formatRemovePamConfigurationOutput(result)
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

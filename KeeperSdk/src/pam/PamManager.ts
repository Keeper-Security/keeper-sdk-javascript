import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { ConfigManager } from './config/ConfigManager'
import { GatewayManager } from './gateway/GatewayManager'
import { RotationManager } from './rotation/RotationManager'
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
import type {
    FormatRotationSchedulesTableOptions,
    FormattedRotationSchedulesTable,
    GetRotationInfoInput,
    ListRotationSchedulesOptions,
    ListRotationSchedulesResult,
    RenderRotationSchedulesAsciiTableOptions,
    RotationInfoResult,
    EditRotationInput,
    EditRotationResult,
} from './rotation/rotationTypes'
import type {
    ListRotationScriptsOptions,
    ListRotationScriptsResult,
    AddRotationScriptInput,
    AddRotationScriptResult,
    EditRotationScriptInput,
    EditRotationScriptResult,
    DeleteRotationScriptInput,
    DeleteRotationScriptResult,
} from './rotation/rotationScriptTypes'

export type AuthProvider = () => Auth

export class PamManager {
    private readonly gatewayManager: GatewayManager
    private readonly configManager: ConfigManager
    private readonly rotationManager: RotationManager

    constructor(storage: InMemoryStorage, authProvider: AuthProvider) {
        this.gatewayManager = new GatewayManager(storage, authProvider)
        this.configManager = new ConfigManager(storage, authProvider)
        this.rotationManager = new RotationManager(storage, authProvider)
    }

    public getGatewayManager(): GatewayManager {
        return this.gatewayManager
    }

    public getConfigManager(): ConfigManager {
        return this.configManager
    }

    public getRotationManager(): RotationManager {
        return this.rotationManager
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

    public async listRotationSchedules(
        options: ListRotationSchedulesOptions = {}
    ): Promise<ListRotationSchedulesResult> {
        return this.rotationManager.listRotationSchedules(options)
    }

    public formatRotationSchedulesTable(
        result: ListRotationSchedulesResult,
        options: FormatRotationSchedulesTableOptions = {}
    ): FormattedRotationSchedulesTable {
        return this.rotationManager.formatRotationSchedulesTable(result, options)
    }

    public renderRotationSchedulesAsciiTable(
        table: FormattedRotationSchedulesTable,
        options: RenderRotationSchedulesAsciiTableOptions = {}
    ): string {
        return this.rotationManager.renderRotationSchedulesAsciiTable(table, options)
    }

    public formatRotationSchedulesJson(
        result: ListRotationSchedulesResult,
        options: ListRotationSchedulesOptions = {}
    ): string {
        return this.rotationManager.formatRotationSchedulesJson(result, options)
    }

    public formatRotationSchedulesOutput(
        result: ListRotationSchedulesResult,
        options: ListRotationSchedulesOptions = {}
    ): string {
        return this.rotationManager.formatRotationSchedulesOutput(result, options)
    }

    public async getRotationInfo(input: GetRotationInfoInput): Promise<RotationInfoResult> {
        return this.rotationManager.getRotationInfo(input)
    }

    public formatRotationInfoJson(result: RotationInfoResult): string {
        return this.rotationManager.formatRotationInfoJson(result)
    }

    public formatRotationInfoOutput(
        result: RotationInfoResult,
        options: Pick<GetRotationInfoInput, 'format'> = {}
    ): string {
        return this.rotationManager.formatRotationInfoOutput(result, options)
    }

    public async editRotation(input: EditRotationInput): Promise<EditRotationResult> {
        return this.rotationManager.editRotation(input)
    }

    public async listRotationScripts(options: ListRotationScriptsOptions = {}): Promise<ListRotationScriptsResult> {
        return this.rotationManager.listRotationScripts(options)
    }

    public formatRotationScriptsTable(result: ListRotationScriptsResult): string[][] {
        return this.rotationManager.formatRotationScriptsTable(result)
    }

    public formatRotationScriptsJson(result: ListRotationScriptsResult): string {
        return this.rotationManager.formatRotationScriptsJson(result)
    }

    public async addRotationScript(input: AddRotationScriptInput): Promise<AddRotationScriptResult> {
        return this.rotationManager.addRotationScript(input)
    }

    public async editRotationScript(input: EditRotationScriptInput): Promise<EditRotationScriptResult> {
        return this.rotationManager.editRotationScript(input)
    }

    public async deleteRotationScript(input: DeleteRotationScriptInput): Promise<DeleteRotationScriptResult> {
        return this.rotationManager.deleteRotationScript(input)
    }
}

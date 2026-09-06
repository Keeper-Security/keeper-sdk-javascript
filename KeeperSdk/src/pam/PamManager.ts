import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { ConfigManager } from './config/ConfigManager'
import { GatewayManager } from './gateway/GatewayManager'
import { ActionManager } from './action/ActionManager'
import { ConnectionManager } from './connection/ConnectionManager'
import type { PamConnectionEditInput, PamConnectionEditResult } from './connection/connectionTypes'
import { RbiManager } from './rbi/RbiManager'
import type { PamRbiEditInput, PamRbiEditResult } from './rbi/rbiTypes'
import type { PamActionRotateInput, PamActionRotateResult } from './action/rotateActionTypes'
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
    private readonly actionManager: ActionManager
    private readonly connectionManager: ConnectionManager
    private readonly rbiManager: RbiManager

    constructor(storage: InMemoryStorage, authProvider: AuthProvider) {
        this.gatewayManager = new GatewayManager(storage, authProvider)
        this.configManager = new ConfigManager(storage, authProvider)
        this.actionManager = new ActionManager(storage, authProvider)
        this.connectionManager = new ConnectionManager(storage, authProvider)
        this.rbiManager = new RbiManager(storage, authProvider)
    }

    public getGatewayManager(): GatewayManager {
        return this.gatewayManager
    }

    public getConfigManager(): ConfigManager {
        return this.configManager
    }

    public getActionManager(): ActionManager {
        return this.actionManager
    }

    public getConnectionManager(): ConnectionManager {
        return this.connectionManager
    }

    public async editPamConnection(input: PamConnectionEditInput): Promise<PamConnectionEditResult> {
        return this.connectionManager.editPamConnection(input)
    }

    public getRbiManager(): RbiManager {
        return this.rbiManager
    }

    public async editPamRbi(input: PamRbiEditInput): Promise<PamRbiEditResult> {
        return this.rbiManager.editPamRbi(input)
    }

    public async rotatePamAction(input: PamActionRotateInput): Promise<PamActionRotateResult> {
        return this.actionManager.rotatePamAction(input)
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

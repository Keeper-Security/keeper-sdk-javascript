import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { GatewayManager } from './gateway/GatewayManager'
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

    constructor(storage: InMemoryStorage, authProvider: AuthProvider) {
        this.gatewayManager = new GatewayManager(storage, authProvider)
    }

    public getGatewayManager(): GatewayManager {
        return this.gatewayManager
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
}

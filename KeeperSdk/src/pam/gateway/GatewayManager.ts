import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../../utils'
import { createGateway, formatCreateGatewayOutput } from './createGateway'
import { editGateway, formatEditGatewayOutput } from './editGateway'
import {
    formatGatewaysJson,
    formatGatewaysOutput,
    formatGatewaysTable,
    listGateways,
    renderGatewaysAsciiTable,
} from './listGateways'
import type {
    CreateGatewayInput,
    CreateGatewayResult,
    EditGatewayInput,
    EditGatewayResult,
    FormatGatewaysTableOptions,
    FormattedGatewaysTable,
    ListGatewaysOptions,
    ListGatewaysResult,
    RenderGatewaysAsciiTableOptions,
} from './gatewayTypes'

export type AuthProvider = () => Auth

export class GatewayManager {
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

    public async listGateways(options: ListGatewaysOptions = {}): Promise<ListGatewaysResult> {
        return listGateways(this.requireAuth(), this.storage, options)
    }

    public async createGateway(input: CreateGatewayInput & { returnValue: true }): Promise<string>
    public async createGateway(input: CreateGatewayInput & { returnValue?: false }): Promise<CreateGatewayResult>
    public async createGateway(input: CreateGatewayInput): Promise<CreateGatewayResult | string>
    public async createGateway(input: CreateGatewayInput): Promise<CreateGatewayResult | string> {
        return createGateway(this.requireAuth(), this.storage, input)
    }

    public formatCreateGatewayOutput(result: CreateGatewayResult): string {
        return formatCreateGatewayOutput(result)
    }

    public async editGateway(input: EditGatewayInput): Promise<EditGatewayResult> {
        return editGateway(this.requireAuth(), input)
    }

    public formatEditGatewayOutput(result: EditGatewayResult): string {
        return formatEditGatewayOutput(result)
    }

    public formatGatewaysTable(
        result: ListGatewaysResult,
        options: FormatGatewaysTableOptions = {}
    ): FormattedGatewaysTable {
        return formatGatewaysTable(result, options)
    }

    public renderGatewaysAsciiTable(
        table: FormattedGatewaysTable,
        options: RenderGatewaysAsciiTableOptions = {}
    ): string {
        return renderGatewaysAsciiTable(table, options)
    }

    public formatGatewaysJson(result: ListGatewaysResult, options: ListGatewaysOptions = {}): string {
        return formatGatewaysJson(result, options)
    }

    public formatGatewaysOutput(result: ListGatewaysResult, options: ListGatewaysOptions = {}): string {
        return formatGatewaysOutput(result, options)
    }
}

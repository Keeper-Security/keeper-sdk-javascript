import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../../utils'
import { createGateway } from './createGateway'
import { editGateway } from './editGateway'
import { removeGateway } from './removeGateway'
import { setGatewayMaxInstances } from './setGatewayMaxInstances'
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
    RemoveGatewayInput,
    RemoveGatewayResult,
    RenderGatewaysAsciiTableOptions,
    SetGatewayMaxInstancesInput,
    SetGatewayMaxInstancesResult,
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

    public async createGateway(input: CreateGatewayInput): Promise<CreateGatewayResult> {
        return createGateway(this.requireAuth(), this.storage, input)
    }

    public async editGateway(input: EditGatewayInput): Promise<EditGatewayResult> {
        return editGateway(this.requireAuth(), input)
    }

    public async removeGateway(input: RemoveGatewayInput): Promise<RemoveGatewayResult> {
        return removeGateway(this.requireAuth(), input)
    }

    public async setGatewayMaxInstances(input: SetGatewayMaxInstancesInput): Promise<SetGatewayMaxInstancesResult> {
        return setGatewayMaxInstances(this.requireAuth(), input)
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

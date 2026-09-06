import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../../utils'
import { editPamConnection } from './editConnection'
import type { PamConnectionEditInput, PamConnectionEditResult } from './connectionTypes'

export type AuthProvider = () => Auth

export class ConnectionManager {
    private readonly storage: InMemoryStorage
    private readonly authProvider: AuthProvider

    constructor(storage: InMemoryStorage, authProvider: AuthProvider) {
        this.storage = storage
        this.authProvider = authProvider
    }

    private requireAuth(): Auth {
        const auth = this.authProvider()
        if (!auth?.sessionToken) throw new KeeperSdkError('Not logged in. Call login() first.', ResultCodes.NOT_LOGGED_IN)
        return auth
    }

    public async edit(input: PamConnectionEditInput): Promise<PamConnectionEditResult> {
        return editPamConnection(this.requireAuth(), this.storage, input)
    }

    public async editPamConnection(input: PamConnectionEditInput): Promise<PamConnectionEditResult> {
        return this.edit(input)
    }
}

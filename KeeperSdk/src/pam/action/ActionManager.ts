import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../../utils'
import { rotatePamAction } from './rotateAction'
import type { PamActionRotateInput, PamActionRotateResult } from './rotateActionTypes'

export type AuthProvider = () => Auth

export class ActionManager {
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

    public async rotatePamAction(input: PamActionRotateInput): Promise<PamActionRotateResult> {
        return rotatePamAction(this.requireAuth(), this.storage, input)
    }

    public async rotate(input: PamActionRotateInput): Promise<PamActionRotateResult> {
        return this.rotatePamAction(input)
    }
}

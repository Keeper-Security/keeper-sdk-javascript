import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { KeeperSdkError, ResultCodes } from '../../utils'
import { editPamRbi } from './editRbi'
import type { PamRbiEditInput, PamRbiEditResult } from './rbiTypes'
export type AuthProvider = () => Auth
export class RbiManager {
    constructor(private readonly storage: InMemoryStorage, private readonly authProvider: AuthProvider) {}
    private requireAuth(): Auth { const auth = this.authProvider(); if (!auth?.sessionToken) throw new KeeperSdkError('Not logged in. Call login() first.', ResultCodes.NOT_LOGGED_IN); return auth }
    public async edit(input: PamRbiEditInput): Promise<PamRbiEditResult> { return editPamRbi(this.requireAuth(), this.storage, input) }
    public async editPamRbi(input: PamRbiEditInput): Promise<PamRbiEditResult> { return this.edit(input) }
}

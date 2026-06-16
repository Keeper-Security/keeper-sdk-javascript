import type { AuthUI3, DeviceApprovalChannel, TwoFactorChannelData } from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes } from '../utils'

const MSG =
    'Console authentication is disabled (useConsoleAuth: false). Provide authUI or use a host that handles login (e.g. keeper-shell password prompt).'

/** Placeholder when Node readline-based ConsoleAuthUI must not be used. */
export class UnavailableAuthUI implements AuthUI3 {
    public async waitForDeviceApproval(_channels: DeviceApprovalChannel[], _isCloud: boolean): Promise<boolean> {
        throw new KeeperSdkError(MSG, ResultCodes.NOT_LOGGED_IN)
    }

    public async waitForTwoFactorCode(
        _channels: TwoFactorChannelData[],
        _cancel: Promise<void>
    ): Promise<boolean> {
        throw new KeeperSdkError(MSG, ResultCodes.NOT_LOGGED_IN)
    }

    public async getPassword(_isAlternate: boolean): Promise<string> {
        throw new KeeperSdkError(MSG, ResultCodes.NOT_LOGGED_IN)
    }
}

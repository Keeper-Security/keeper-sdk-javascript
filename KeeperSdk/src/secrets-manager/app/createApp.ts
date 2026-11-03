import type { Auth } from '@keeper-security/keeperapi'
import {
    applicationAddMessage,
    generateEncryptionKey,
    generateUidBytes,
    platform,
    webSafe64FromBytes,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { requireAuthDataKey } from '../../nestedShareFolders/nsfHelpers'
import { getPaddedJsonBytes } from '../../pam/config/configRecordPayload'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import { KSM_APP_RECORD_TYPE } from './appConstants'
import { findAppRecord } from './appHelpers'
import type { CreateSecretsManagerAppInput, CreateSecretsManagerAppResult } from './appTypes'

export async function createApp(
    auth: Auth,
    storage: InMemoryStorage,
    input: CreateSecretsManagerAppInput
): Promise<CreateSecretsManagerAppResult> {
    const appName = input.name.trim()
    if (!appName) {
        throw new KeeperSdkError('Application name is required.', ResultCodes.SECRETS_MANAGER_APP_NAME_REQUIRED)
    }
    if (findAppRecord(storage, appName)) {
        throw new KeeperSdkError(
            `Application with the same name "${appName}" already exists.`,
            ResultCodes.SECRETS_MANAGER_APP_ALREADY_EXISTS
        )
    }

    const dataKey = requireAuthDataKey(auth)
    const appUidBytes = generateUidBytes()
    const recordKey = generateEncryptionKey()

    try {
        await auth.executeRestAction(
            applicationAddMessage({
                appUid: appUidBytes,
                recordKey: await platform.aesGcmEncrypt(recordKey, dataKey),
                clientModifiedTime: Date.now(),
                data: await platform.aesGcmEncrypt(
                    getPaddedJsonBytes({ title: appName, type: KSM_APP_RECORD_TYPE }),
                    recordKey
                ),
            })
        )
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to create Secrets Manager application "${appName}": ${extractErrorMessage(err)}`,
            ResultCodes.SECRETS_MANAGER_APP_CREATE_FAILED
        )
    }

    return { success: true, appName, appUid: webSafe64FromBytes(appUidBytes) }
}

export function formatCreateAppOutput(result: CreateSecretsManagerAppResult): string {
    return `Application was successfully added (UID: ${result.appUid})`
}

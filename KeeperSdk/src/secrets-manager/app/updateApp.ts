import type { Auth } from '@keeper-security/keeperapi'
import { normal64Bytes, platform, Records, recordsUpdateMessage } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { getPaddedJsonBytes } from '../../pam/config/configRecordPayload'
import { isRecordModifySuccess } from '../../pam/config/pamConfigFolder'
import { resolveKsmApplication, webSafeUidFromBytes } from '../../pam/gateway/gatewayHelpers'
import { extractErrorMessage, isObject, KeeperSdkError, ResultCodes } from '../../utils'
import { KSM_APP_RECORD_TYPE } from './appConstants'
import { findAppRecord } from './appHelpers'
import type { UpdateSecretsManagerAppInput, UpdateSecretsManagerAppResult } from './appTypes'

async function sendAppRecordUpdate(
    auth: Auth,
    appUid: string,
    request: Records.IRecordsUpdateRequest
): Promise<Records.IRecordModifyStatus | undefined> {
    try {
        const response = await auth.executeRest(recordsUpdateMessage(request))
        return response.records?.find((status) => webSafeUidFromBytes(status.recordUid) === appUid)
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to update Secrets Manager application "${appUid}": ${extractErrorMessage(err)}`,
            ResultCodes.SECRETS_MANAGER_APP_UPDATE_FAILED
        )
    }
}

export async function updateApp(
    auth: Auth,
    storage: InMemoryStorage,
    input: UpdateSecretsManagerAppInput
): Promise<UpdateSecretsManagerAppResult> {
    const newName = input.name.trim()
    if (!newName) {
        throw new KeeperSdkError('New application name is required.', ResultCodes.SECRETS_MANAGER_APP_NAME_REQUIRED)
    }

    const app = await resolveKsmApplication(storage, input.appNameOrUid)
    const conflictingApp = findAppRecord(storage, newName)
    if (conflictingApp && conflictingApp.uid !== app.uid) {
        throw new KeeperSdkError(
            `Application with the name "${newName}" already exists.`,
            ResultCodes.SECRETS_MANAGER_APP_ALREADY_EXISTS
        )
    }

    const recordData: Record<string, unknown> = isObject(app.record.data)
        ? { ...app.record.data, title: newName }
        : { title: newName, type: KSM_APP_RECORD_TYPE }

    const status = await sendAppRecordUpdate(auth, app.uid, {
        records: [
            {
                recordUid: normal64Bytes(app.uid),
                clientModifiedTime: Date.now(),
                revision: app.record.revision,
                data: await platform.aesGcmEncrypt(getPaddedJsonBytes(recordData), app.recordKey),
            },
        ],
        clientTime: Date.now(),
    })

    if (status && !isRecordModifySuccess(status.status)) {
        const statusName = status.status != null ? Records.RecordModifyResult[status.status] : ''
        throw new KeeperSdkError(
            status.message || `Failed to update Secrets Manager application "${app.uid}" (${statusName}).`,
            ResultCodes.SECRETS_MANAGER_APP_UPDATE_FAILED
        )
    }

    return { success: true, appUid: app.uid, previousName: app.title, appName: newName }
}

export function formatUpdateAppOutput(result: UpdateSecretsManagerAppResult): string {
    return `Application "${result.previousName}" was successfully renamed to "${result.appName}" (UID: ${result.appUid})`
}

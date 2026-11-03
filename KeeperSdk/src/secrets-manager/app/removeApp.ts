import type { Auth, DRecordMetadata, RestCommand } from '@keeper-security/keeperapi'
import { Authentication } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { deleteRecord } from '../../records/RecordOperations'
import { resolveKsmApplication } from '../../pam/gateway/gatewayHelpers'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import { APP_REMOVAL_CANCELLED_MESSAGE, RECORD_DELETE_SUCCESS_STATUS, RECORD_UPDATE_COMMAND } from './appConstants'
import { fetchAppInfo } from './appHelpers'
import type {
    DeleteRecordsRequest,
    DeleteRecordsResponse,
    RemoveSecretsManagerAppConfirm,
    RemoveSecretsManagerAppInput,
    RemoveSecretsManagerAppResult,
} from './appTypes'

function buildDeleteRecordsCommand(recordUids: string[]): RestCommand<DeleteRecordsRequest, DeleteRecordsResponse> {
    return {
        baseRequest: { command: RECORD_UPDATE_COMMAND },
        request: { delete_records: recordUids },
        authorization: {},
    }
}

async function buildRemovalSummary(auth: Auth, appUid: string): Promise<string> {
    const appInfo = await fetchAppInfo(auth, appUid)
    const shares = appInfo.shares ?? []
    const clientCount = appInfo.clients?.length ?? 0
    const folderCount = shares.filter(
        (share) => share.shareType === Authentication.ApplicationShareType.SHARE_TYPE_FOLDER
    ).length
    const recordCount = shares.length - folderCount
    return `This Application (uid: ${appUid}) has ${clientCount} client(s), ${folderCount} shared folder(s), and ${recordCount} record(s).`
}

async function confirmRemoval(
    auth: Auth,
    appUid: string,
    confirm: RemoveSecretsManagerAppConfirm | undefined
): Promise<boolean> {
    if (!confirm) return true
    return confirm(await buildRemovalSummary(auth, appUid))
}

function requireRecordOwner(storage: InMemoryStorage, appUid: string, appName: string): void {
    const metadata = storage.getByUid<DRecordMetadata>(VaultObjectKind.Metadata, appUid)
    if (!metadata?.owner) {
        throw new KeeperSdkError(
            `Cannot permanently delete "${appName}": you are not the record owner.`,
            ResultCodes.SECRETS_MANAGER_APP_REMOVE_NOT_OWNER
        )
    }
}

async function purgeAppRecord(auth: Auth, appUid: string): Promise<void> {
    let response: DeleteRecordsResponse
    try {
        response = await auth.executeRestCommand(buildDeleteRecordsCommand([appUid]))
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to permanently delete Secrets Manager application "${appUid}": ${extractErrorMessage(err)}`,
            ResultCodes.SECRETS_MANAGER_APP_REMOVE_FAILED
        )
    }
    const status = response.delete_records?.find((entry) => entry.record_uid === appUid)
    if (status && status.status !== RECORD_DELETE_SUCCESS_STATUS) {
        throw new KeeperSdkError(
            status.message ||
                `Failed to permanently delete Secrets Manager application "${appUid}" (${status.status}).`,
            ResultCodes.SECRETS_MANAGER_APP_REMOVE_FAILED
        )
    }
}

async function unlinkAppRecord(auth: Auth, storage: InMemoryStorage, appUid: string): Promise<void> {
    const result = await deleteRecord(auth, storage, appUid)
    if (!result.success) {
        throw new KeeperSdkError(
            `Failed to remove Secrets Manager application "${appUid}": ${result.message}`,
            ResultCodes.SECRETS_MANAGER_APP_REMOVE_FAILED
        )
    }
}

export async function removeApp(
    auth: Auth,
    storage: InMemoryStorage,
    input: RemoveSecretsManagerAppInput
): Promise<RemoveSecretsManagerAppResult> {
    const app = await resolveKsmApplication(storage, input.appNameOrUid)
    const purge = input.purge === true
    const result: RemoveSecretsManagerAppResult = {
        success: false,
        cancelled: false,
        purged: false,
        appUid: app.uid,
        appName: app.title,
    }

    if (purge) requireRecordOwner(storage, app.uid, app.title)

    if (!input.force && !(await confirmRemoval(auth, app.uid, input.confirm))) {
        return { ...result, cancelled: true }
    }

    if (purge) {
        await purgeAppRecord(auth, app.uid)
    } else {
        await unlinkAppRecord(auth, storage, app.uid)
    }

    return { ...result, success: true, purged: purge }
}

export function formatRemoveAppOutput(result: RemoveSecretsManagerAppResult): string {
    if (result.cancelled) return APP_REMOVAL_CANCELLED_MESSAGE
    const action = result.purged ? 'permanently deleted' : 'removed from your vault'
    return `Application "${result.appName}" (UID: ${result.appUid}) was ${action}.`
}

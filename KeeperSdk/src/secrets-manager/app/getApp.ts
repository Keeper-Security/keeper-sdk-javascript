import type { Auth, DRecord } from '@keeper-security/keeperapi'
import { Authentication, Enterprise, getAppInfoMessage, normal64Bytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { getRecordTitle } from '../../records/RecordUtils'
import { getRecordShareInfo, type RecordUserPermission } from '../../sharing/Sharing'
import { getFolderDisplayName, getKeeperDriveFolder, getKeeperDriveRecord } from '../../nestedShareFolders/nsfHelpers'
import { resolveSharedFolderName } from '../../pam/config/configHelpers'
import {
    formatTimestampMs,
    resolveKsmApplication,
    toFiniteNumber,
    webSafeUidFromBytes,
} from '../../pam/gateway/gatewayHelpers'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import {
    MIN_SHORT_CLIENT_ID_LENGTH,
    NEVER_LABEL,
    NO_APP_SHARES_MESSAGE,
    NO_CLIENT_DEVICES_MESSAGE,
    SECRETS_MANAGER_APP_SHARE_HEADERS,
    SECRETS_MANAGER_APP_USER_HEADERS,
} from './appConstants'
import { formatTimestampOrNever, renderAsciiTable, toOptionalTimestamp } from './appHelpers'
import {
    SecretsManagerAppShareKind,
    SecretsManagerClientDeviceExpireStatus,
    type SecretsManagerAppClientDevice,
    type SecretsManagerAppDetail,
    type SecretsManagerAppShare,
    type SecretsManagerAppUser,
} from './appTypes'

function buildShortClientIds(clientIds: readonly string[]): Map<string, string> {
    const shortIds = new Map<string, string>()
    for (const id of clientIds) {
        let length = Math.min(MIN_SHORT_CLIENT_ID_LENGTH, id.length)
        while (length < id.length && clientIds.some((other) => other !== id && other.startsWith(id.slice(0, length)))) {
            length += 1
        }
        shortIds.set(id, id.slice(0, length))
    }
    return shortIds
}

function resolveClientDeviceExpireStatus(accessExpireOn: number, now: number): SecretsManagerClientDeviceExpireStatus {
    if (!accessExpireOn) return SecretsManagerClientDeviceExpireStatus.Never
    return accessExpireOn <= now
        ? SecretsManagerClientDeviceExpireStatus.Expired
        : SecretsManagerClientDeviceExpireStatus.Active
}

function toClientDevices(clients: readonly Authentication.IAppClient[]): SecretsManagerAppClientDevice[] {
    const generalClients = clients.filter((client) => client.appClientType === Enterprise.AppClientType.GENERAL)
    const clientIds = generalClients.map((client) => webSafeUidFromBytes(client.clientId))
    const shortIds = buildShortClientIds(clientIds)
    const now = Date.now()

    return generalClients.map((client, index) => {
        const clientId = clientIds[index]
        const accessExpireOn = toFiniteNumber(client.accessExpireOn)
        return {
            deviceName: client.id || '',
            shortId: shortIds.get(clientId) ?? clientId,
            clientId,
            createdOn: toOptionalTimestamp(client.createdOn),
            expiresOn: accessExpireOn || null,
            expireStatus: resolveClientDeviceExpireStatus(accessExpireOn, now),
            firstAccess: toOptionalTimestamp(client.firstAccess),
            lastAccess: toOptionalTimestamp(client.lastAccess),
            ipLockEnabled: !!client.lockIp,
            ipAddress: client.ipAddress || null,
        }
    })
}

function resolveFolderShare(storage: InMemoryStorage, uid: string): Pick<SecretsManagerAppShare, 'title' | 'type'> {
    if (getKeeperDriveFolder(storage, uid)) {
        return { title: getFolderDisplayName(storage, uid), type: SecretsManagerAppShareKind.NsfFolder }
    }
    return { title: resolveSharedFolderName(storage, uid), type: SecretsManagerAppShareKind.Folder }
}

function resolveRecordShare(storage: InMemoryStorage, uid: string): Pick<SecretsManagerAppShare, 'title' | 'type'> {
    const nsfRecord = getKeeperDriveRecord(storage, uid)
    const record = nsfRecord ?? storage.getByUid<DRecord>(VaultObjectKind.Record, uid)
    return {
        title: record ? getRecordTitle(record) : '',
        type: nsfRecord ? SecretsManagerAppShareKind.NsfRecord : SecretsManagerAppShareKind.Record,
    }
}

function toAppShare(storage: InMemoryStorage, share: Authentication.IAppShare): SecretsManagerAppShare {
    const uid = webSafeUidFromBytes(share.secretUid)
    const resolved =
        share.shareType === Authentication.ApplicationShareType.SHARE_TYPE_FOLDER
            ? resolveFolderShare(storage, uid)
            : resolveRecordShare(storage, uid)
    return { uid, editable: !!share.editable, ...resolved }
}

function toAppUser(permission: RecordUserPermission): SecretsManagerAppUser {
    return {
        username: permission.username,
        role: permission.owner ? 'owner' : 'member',
        shareAdmin: permission.shareAdmin,
        shareable: permission.shareable,
        editable: permission.editable,
    }
}

async function fetchAppInfo(auth: Auth, appUid: string): Promise<Authentication.IAppInfo> {
    let appInfo: Authentication.IAppInfo | undefined
    try {
        const response = await auth.executeRest(getAppInfoMessage({ appRecordUid: [normal64Bytes(appUid)] }))
        appInfo = response.appInfo?.[0]
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to get Secrets Manager application "${appUid}": ${extractErrorMessage(err)}`,
            ResultCodes.SECRETS_MANAGER_APP_GET_FAILED
        )
    }
    if (!appInfo) {
        throw new KeeperSdkError(
            `No information returned for Secrets Manager application "${appUid}".`,
            ResultCodes.SECRETS_MANAGER_APP_GET_FAILED
        )
    }
    return appInfo
}

export async function getApp(
    auth: Auth,
    storage: InMemoryStorage,
    appNameOrUid: string
): Promise<SecretsManagerAppDetail> {
    const app = await resolveKsmApplication(storage, appNameOrUid)
    const [appInfo, shareInfo] = await Promise.all([fetchAppInfo(auth, app.uid), getRecordShareInfo(auth, app.uid)])

    return {
        appName: app.title,
        appUid: app.uid,
        users: (shareInfo?.userPermissions ?? []).map(toAppUser),
        clientDevices: toClientDevices(appInfo.clients ?? []),
        shares: (appInfo.shares ?? []).map((share) => toAppShare(storage, share)),
    }
}

function formatYesNo(value: boolean): string {
    return value ? 'Yes' : 'No'
}

function renderKeyValueBlock(rows: ReadonlyArray<[string, string]>): string {
    const labelWidth = Math.max(...rows.map(([label]) => label.length))
    return rows.map(([label, value]) => `  ${label.padStart(labelWidth)}: ${value}`).join('\n')
}

function formatClientDeviceExpiry(device: SecretsManagerAppClientDevice): string {
    if (device.expireStatus === SecretsManagerClientDeviceExpireStatus.Never) return NEVER_LABEL
    return `${formatTimestampMs(device.expiresOn)} (${device.expireStatus})`
}

function renderClientDevice(device: SecretsManagerAppClientDevice): string {
    return renderKeyValueBlock([
        ['Device Name', device.deviceName],
        ['Short ID', device.shortId],
        ['Client ID', device.clientId],
        ['Created On', formatTimestampMs(device.createdOn)],
        ['Expires On', formatClientDeviceExpiry(device)],
        ['First Access', formatTimestampOrNever(device.firstAccess)],
        ['Last Access', formatTimestampOrNever(device.lastAccess)],
        ['IP Lock', device.ipLockEnabled ? 'Enabled' : 'Disabled'],
        ['IP Address', device.ipAddress ?? '--'],
    ])
}

export function formatAppDetailOutput(detail: SecretsManagerAppDetail): string {
    const parts: string[] = [`App Name: ${detail.appName}`, `App UID: ${detail.appUid}`, '', 'Client Devices']
    if (detail.clientDevices.length === 0) {
        parts.push(`  ${NO_CLIENT_DEVICES_MESSAGE}`)
    } else {
        parts.push(detail.clientDevices.map(renderClientDevice).join('\n\n'))
    }

    parts.push(
        '',
        'Application Users',
        renderAsciiTable({
            headers: [...SECRETS_MANAGER_APP_USER_HEADERS],
            rows: detail.users.map((user) => [
                user.username,
                user.role,
                formatYesNo(user.shareAdmin),
                formatYesNo(user.shareable),
                formatYesNo(user.editable),
            ]),
        })
    )

    parts.push('', 'Application Access')
    if (detail.shares.length === 0) {
        parts.push(`  ${NO_APP_SHARES_MESSAGE}`)
    } else {
        parts.push(
            renderAsciiTable({
                headers: [...SECRETS_MANAGER_APP_SHARE_HEADERS],
                rows: detail.shares.map((share) => [
                    share.type,
                    share.uid,
                    share.title,
                    share.editable ? 'Editable' : 'Read-Only',
                ]),
            })
        )
    }

    return parts.join('\n')
}

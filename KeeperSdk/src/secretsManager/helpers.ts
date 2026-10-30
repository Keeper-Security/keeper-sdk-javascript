import type {
    Auth,
    Authentication,
    DRecord,
    DRecordMetadata,
    DSharedFolder,
    DSharedFolderFolder,
    DUserFolder,
    Enterprise,
} from '@keeper-security/keeperapi'
import { normal64Bytes, webSafe64FromBytes } from '@keeper-security/keeperapi'
import {
    FolderKind,
    sharedFolderFolderName,
    sharedFolderName,
    userFolderName,
    VaultObjectKind,
} from '../folders/folderHelpers'
import { getRecordTitle } from '../records/RecordUtils'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { getFolderDisplayName, getKeeperDriveFolder } from '../nestedShareFolders/nsfHelpers'
import { KeeperSdkError, ResultCodes } from '../utils'
import {
    SECRETS_MANAGER_APP_CLIENT_ID_LENGTH,
    SECRETS_MANAGER_APP_CLIENT_TYPES,
    SECRETS_MANAGER_APP_SHARE_TYPE_LABELS,
} from './constants'
import type { SecretsManagerApplicationUser, SecretsManagerClientDevice, SecretsManagerSharedSecret } from './types'

export function toFiniteNumber(value: unknown): number {
    if (value == null) return 0
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
}

export function toTimestampOrNull(value: unknown): number | null {
    const timestamp = toFiniteNumber(value)
    return timestamp > 0 && !Number.isNaN(new Date(timestamp).getTime()) ? timestamp : null
}

export function resolveSecretsManagerApplication(storage: InMemoryStorage, identifier: string): DRecord {
    const trimmed = identifier.trim()
    const byUid = storage.getByUid<DRecord>(VaultObjectKind.Record, trimmed)
    if (byUid) return byUid

    const byTitle = storage.getRecords().find((record: DRecord): boolean => getRecordTitle(record) === trimmed)
    if (byTitle) return byTitle

    throw new KeeperSdkError(`No application found with UID/Name: ${trimmed}`, ResultCodes.PAM_KSM_APP_NOT_FOUND)
}

export function getApplicationName(storage: InMemoryStorage, uid: string): string {
    const record = storage.getByUid<DRecord>(VaultObjectKind.Record, uid)
    return record ? getRecordTitle(record) : ''
}

export function getApplicationUsers(
    auth: Pick<Auth, 'username'>,
    storage: InMemoryStorage,
    uid: string
): SecretsManagerApplicationUser[] {
    const metadata = storage.getByUid<DRecordMetadata>(VaultObjectKind.Metadata, uid)
    if (metadata?.owner !== true) return []

    const owner: SecretsManagerApplicationUser = {
        username: metadata.ownerUsername || auth.username || '',
        role: 'Owner',
        editable: true,
        shareable: true,
    }
    return owner.username ? [owner] : []
}

export function toClientDevices(clients: readonly Authentication.IAppClient[]): SecretsManagerClientDevice[] {
    const supportedClients = clients.filter((client: Authentication.IAppClient): boolean => {
        return client.appClientType != null && SECRETS_MANAGER_APP_CLIENT_TYPES.has(client.appClientType)
    })
    const clientIds = supportedClients.map((client: Authentication.IAppClient): string => {
        return webSafe64FromBytes(client.clientId ?? new Uint8Array())
    })

    return supportedClients.map(
        (client: Authentication.IAppClient, index: number): SecretsManagerClientDevice => ({
            name: client.id || '',
            short_id: shortenClientId(clientIds, clientIds[index]),
            created_on: toTimestampOrNull(client.createdOn),
            expires_on: toTimestampOrNull(client.accessExpireOn),
            first_access: toTimestampOrNull(client.firstAccess),
            last_access: toTimestampOrNull(client.lastAccess),
            ip_lock: client.lockIp === true,
            ip_address: client.ipAddress || '',
        })
    )
}

export function toSharedSecrets(
    storage: InMemoryStorage,
    application: DRecord,
    shares: readonly Authentication.IAppShare[]
): SecretsManagerSharedSecret[] {
    const applicationTitle = getRecordTitle(application)
    const result: SecretsManagerSharedSecret[] = []

    for (const share of shares) {
        const type = share.shareType == null ? undefined : SECRETS_MANAGER_APP_SHARE_TYPE_LABELS[share.shareType]
        if (!type || !share.secretUid?.length) continue

        const uid = webSafe64FromBytes(share.secretUid)
        result.push({
            type,
            uid,
            name: type === 'RECORD' ? applicationTitle : resolveFolderName(storage, uid),
            permissions: share.editable === true,
        })
    }

    return result
}

export function resolveFolderName(storage: InMemoryStorage, uid: string): string {
    const userFolder = storage.getByUid<DUserFolder>(FolderKind.UserFolder, uid)
    if (userFolder) return userFolderName(userFolder)

    const sharedFolder = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, uid)
    if (sharedFolder) return sharedFolderName(sharedFolder)

    const sharedFolderFolder = storage.getByUid<DSharedFolderFolder>(FolderKind.SharedFolderFolder, uid)
    if (sharedFolderFolder) return sharedFolderFolderName(sharedFolderFolder)

    const nestedShareFolder = getKeeperDriveFolder(storage, uid)
    return nestedShareFolder ? getFolderDisplayName(storage, uid) : uid
}

export function resolveApplicationUid(identifier: string): Uint8Array {
    try {
        return normal64Bytes(identifier)
    } catch (err) {
        throw new KeeperSdkError(
            `Invalid application UID "${identifier}": ${err instanceof Error ? err.message : String(err)}`,
            ResultCodes.PAM_KSM_APP_NOT_FOUND
        )
    }
}

export function isSupportedClientType(clientType: Enterprise.AppClientType | null | undefined): boolean {
    return clientType != null && SECRETS_MANAGER_APP_CLIENT_TYPES.has(clientType)
}

function shortenClientId(clientIds: readonly string[], target: string): string {
    if (!target) return ''
    for (let length = SECRETS_MANAGER_APP_CLIENT_ID_LENGTH; length <= target.length; length += 1) {
        const prefix = target.slice(0, length)
        const matches = clientIds.filter((clientId: string): boolean => clientId.startsWith(prefix))
        if (matches.length === 1) return prefix
    }
    return target
}

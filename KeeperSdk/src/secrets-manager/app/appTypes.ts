import type { KeeperResponse } from '@keeper-security/keeperapi'

export type SecretsManagerAppListRow = {
    appUid: string
    appName: string | null
    records: number
    folders: number
    devices: number
    lastAccess: number | null
}

export type ListSecretsManagerAppsResult = {
    apps: SecretsManagerAppListRow[]
    message?: string
}

export type FormattedSecretsManagerTable = {
    headers: string[]
    rows: string[][]
}

export type RenderSecretsManagerAsciiTableOptions = {
    minColWidth?: number
}

export enum SecretsManagerClientDeviceExpireStatus {
    Never = 'never',
    Expired = 'expired',
    Active = 'active',
}

export enum SecretsManagerAppShareKind {
    Record = 'RECORD',
    NsfRecord = 'NSF RECORD',
    Folder = 'FOLDER',
    NsfFolder = 'NSF FOLDER',
}

export type SecretsManagerAppUserRole = 'owner' | 'member'

export type SecretsManagerAppClientDevice = {
    deviceName: string
    shortId: string
    clientId: string
    createdOn: number | null
    expiresOn: number | null
    expireStatus: SecretsManagerClientDeviceExpireStatus
    firstAccess: number | null
    lastAccess: number | null
    ipLockEnabled: boolean
    ipAddress: string | null
}

export type SecretsManagerAppUser = {
    username: string
    role: SecretsManagerAppUserRole
    shareAdmin: boolean
    shareable: boolean
    editable: boolean
}

export type SecretsManagerAppShare = {
    uid: string
    editable: boolean
    title: string
    type: SecretsManagerAppShareKind
}

export type SecretsManagerAppDetail = {
    appName: string
    appUid: string
    users: SecretsManagerAppUser[]
    clientDevices: SecretsManagerAppClientDevice[]
    shares: SecretsManagerAppShare[]
}

export type SecretsManagerAppReference = {
    appNameOrUid: string
}

export type SecretsManagerAppOperationResult = {
    success: boolean
    appUid: string
    appName: string
}

export type CreateSecretsManagerAppInput = {
    name: string
}

export type CreateSecretsManagerAppResult = SecretsManagerAppOperationResult

export type UpdateSecretsManagerAppInput = SecretsManagerAppReference & {
    name: string
}

export type UpdateSecretsManagerAppResult = SecretsManagerAppOperationResult & {
    previousName: string
}

export type RemoveSecretsManagerAppConfirm = (summary: string) => boolean | Promise<boolean>

export type RemoveSecretsManagerAppInput = SecretsManagerAppReference & {
    purge?: boolean
    force?: boolean
    confirm?: RemoveSecretsManagerAppConfirm
}

export type RemoveSecretsManagerAppResult = SecretsManagerAppOperationResult & {
    cancelled: boolean
    purged: boolean
}

export type DeleteRecordsRequest = {
    delete_records: string[]
}

export type DeleteRecordStatus = {
    record_uid: string
    status: string
    message?: string
}

export type DeleteRecordsResponse = KeeperResponse & {
    delete_records?: DeleteRecordStatus[]
}

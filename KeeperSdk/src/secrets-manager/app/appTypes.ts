export type SecretsManagerAppListRow = {
    appUid: string
    appName: string
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

export type CreateSecretsManagerAppInput = {
    name: string
}

export type CreateSecretsManagerAppResult = {
    success: boolean
    appName: string
    appUid: string
}

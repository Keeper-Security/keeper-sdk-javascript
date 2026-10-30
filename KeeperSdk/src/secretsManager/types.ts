export type SecretsManagerAppRow = {
    name: string
    uid: string
    records: number
    folders: number
    devices: number
    last_access: number | null
}

export type FormattedSecretsManagerAppsTable = {
    headers: string[]
    rows: string[][]
}

export type SecretsManagerClientDevice = {
    name: string
    short_id: string
    created_on: number | null
    expires_on: number | null
    first_access: number | null
    last_access: number | null
    ip_lock: boolean
    ip_address: string
}

export type SecretsManagerSharedSecret = {
    type: 'RECORD' | 'FOLDER'
    uid: string
    name: string
    permissions: boolean
}

export type SecretsManagerApplicationUser = {
    username: string
    role: 'Owner'
    editable: boolean
    shareable: boolean
}

export type SecretsManagerAppDetails = {
    name: string
    uid: string
    records: number
    folders: number
    devices: number
    last_access: null
    application_users: SecretsManagerApplicationUser[]
    client_devices: SecretsManagerClientDevice[]
    shared_secrets: SecretsManagerSharedSecret[]
}

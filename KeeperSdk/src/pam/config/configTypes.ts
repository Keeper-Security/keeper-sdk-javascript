import type {
    PamConfigPermissionFlag,
    PamNetworkAllowedSettings,
    PamNetworkAllowedSettingsKey,
} from './configConstants'

export type { PamNetworkAllowedSettings, PamNetworkAllowedSettingsKey }

export enum PamConfigListFormat {
    Table = 'table',
    Json = 'json',
}

export type PamConfigListFormatInput = PamConfigListFormat | `${PamConfigListFormat}`

export type ListPamConfigurationsOptions = {
    configUid?: string
    verbose?: boolean
    format?: PamConfigListFormatInput
}

export type PamResourcesInfo = {
    gatewayUid: string
    sharedFolderUid: string
    resourceRecordUids: string[]
    adminCredentialUid?: string
}

export type PamConfigurationField = {
    type: string
    label?: string
    values: string[]
}

export type PamConfigurationListRow = {
    uid: string
    name: string
    configType: string
    sharedFolderUid: string
    sharedFolderName: string
    gatewayUid: string
    resourceRecordUids: string[]
    fields?: PamConfigurationField[]
}

export type PamConfigurationDetail = {
    uid: string
    name: string
    configType: string
    sharedFolderUid: string
    sharedFolderName: string
    gatewayUid: string
    resourceRecordUids: string[]
    fields: PamConfigurationField[]
}

export type ListPamConfigurationsResult = {
    configurations: PamConfigurationListRow[]
    detail?: PamConfigurationDetail
    warnings: string[]
    message?: string
}

export type FormattedPamConfigurationsTable = {
    headers: string[]
    rows: string[][]
}

export type FormatPamConfigurationsTableOptions = {
    verbose?: boolean
}

export type RenderPamConfigurationsAsciiTableOptions = {
    minColWidth?: number
}

export type PamConfigurationJsonField = {
    type: string
    label?: string
    values: string[]
}

export type PamConfigurationJsonEntry = {
    uid: string
    name: string
    config_type: string
    shared_folder_uid: string
    shared_folder_name: string
    gateway_uid: string
    resource_record_uids: string[]
    fields?: PamConfigurationJsonField[]
}

export type PamConfigurationsJsonPayload = {
    configurations?: PamConfigurationJsonEntry[]
    configuration?: PamConfigurationJsonEntry & {
        fields: PamConfigurationJsonField[]
    }
    warnings?: string[]
    message?: string
}

export type PamConfigurationRecordFieldInput = {
    type: string
    value: unknown[]
    label?: string
    required?: boolean
}

export type PamConfigurationPermissionValue = 'on' | 'off' | 'default'

export type PamConfigurationPermissionsInput = {
    connections?: PamConfigurationPermissionValue
    tunneling?: PamConfigurationPermissionValue
    rotation?: PamConfigurationPermissionValue
    remoteBrowserIsolation?: PamConfigurationPermissionValue
    connectionsRecording?: PamConfigurationPermissionValue
    typescriptRecording?: PamConfigurationPermissionValue
    aiThreatDetection?: PamConfigurationPermissionValue
    aiTerminateSessionOnDetection?: PamConfigurationPermissionValue
}

export type PamPermissionBuildResult = {
    allowedSettings: PamNetworkAllowedSettings
    applied: Partial<Record<PamConfigPermissionFlag, PamConfigurationPermissionValue>>
    defaultResets: PamConfigPermissionFlag[]
    invalid: Array<{ flag: PamConfigPermissionFlag; value: unknown }>
}

export type ApplyPamConfigurationPermissionsOptions = {
    warnOnDefaultReset?: boolean
}

export type PamConfigFolderKind = 'shared_folder' | 'nsf'

export type PamConfigFolderTarget = {
    kind: PamConfigFolderKind
    uid: string
}

export type PamConfigFolderPlacementResult = {
    success: boolean
    message?: string
}

export type PamConfigRecordRemovalResult = {
    success: boolean
    message?: string
}

export type PamConfigurationTypedRecordData = {
    type: string
    title: string
    fields: PamConfigurationRecordFieldInput[]
    custom: PamConfigurationRecordFieldInput[]
    notes: string
}

export type CreatePamConfigurationInNsfFolderOptions = {
    configurationUid: string
    configurationUidBytes: Uint8Array
    recordKey: Uint8Array
    recordPayload: Record<string, unknown>
    folderUid: string
}

export type PlacePamConfigurationInFolderOptions = {
    srcFolderUid?: string
    previous?: PamConfigFolderTarget
}

export type ResolvePamConfigFolderOptions = {
    required?: boolean
}

export type CreatePamConfigurationInput = {
    title: string
    configType: string
    sharedFolder: string
    gateway?: string
    fields?: PamConfigurationRecordFieldInput[]
    custom?: PamConfigurationRecordFieldInput[]
    notes?: string
    adminCredentialUid?: string
    permissions?: PamConfigurationPermissionsInput
}

export type CreatePamConfigurationResult = {
    success: boolean
    configurationUid: string
    title: string
    configType: string
    sharedFolderUid: string
    gatewayUid: string
    gatewayLinked: boolean
    permissionsApplied: boolean
    /** Final typed-record fields written (includes schema-seeded Azure/GCP slots). */
    fields: PamConfigurationRecordFieldInput[]
    warnings: string[]
}

export type EditPamConfigurationInput = {
    configurationUidOrTitle: string
    title?: string
    configType?: string
    sharedFolder?: string
    gateway?: string
    fields?: PamConfigurationRecordFieldInput[]
    custom?: PamConfigurationRecordFieldInput[]
    notes?: string
    adminCredentialUid?: string
    removeResourceRecords?: string[]
    permissions?: PamConfigurationPermissionsInput
}

export type EditPamConfigurationResult = {
    success: boolean
    configurationUid: string
    title: string
    configType: string
    previousConfigType: string
    sharedFolderUid: string
    previousSharedFolderUid: string
    gatewayUid: string
    previousGatewayUid: string
    gatewayChanged: boolean
    folderChanged: boolean
    titleChanged: boolean
    typeChanged: boolean
    removedResourceRecordUids: string[]
    permissionsApplied: boolean
    warnings: string[]
}

export type RemovePamConfigurationInput = {
    configurationUidOrTitle: string | string[]
}

export type RemovedPamConfiguration = {
    configurationUid: string
    title?: string
    configType?: string
}

export type RemovePamConfigurationResult = {
    success: boolean
    found: boolean
    configurationUid?: string
    title?: string
    configType?: string
    configurations: RemovedPamConfiguration[]
    notFound: string[]
}

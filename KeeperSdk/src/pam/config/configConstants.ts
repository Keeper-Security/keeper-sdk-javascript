export const PAM_CONFIGURATION_RECORD_VERSION = 6

export const PAM_CONFIGURATION_RECORD_TYPES = [
    'pamAwsConfiguration',
    'pamAzureConfiguration',
    'pamGcpConfiguration',
    'pamDomainConfiguration',
    'pamNetworkConfiguration',
    'pamOciConfiguration',
    'pamGitHubConfiguration',
] as const

export type PamConfigurationRecordType = (typeof PAM_CONFIGURATION_RECORD_TYPES)[number]

export const PAM_CONFIG_ENVIRONMENT_TO_RECORD_TYPE = {
    aws: 'pamAwsConfiguration',
    azure: 'pamAzureConfiguration',
    gcp: 'pamGcpConfiguration',
    domain: 'pamDomainConfiguration',
    local: 'pamNetworkConfiguration',
    oci: 'pamOciConfiguration',
    github: 'pamGitHubConfiguration',
} as const

export type PamConfigEnvironment = keyof typeof PAM_CONFIG_ENVIRONMENT_TO_RECORD_TYPE

export const PAM_CONFIG_ENVIRONMENTS = [
    'local',
    'aws',
    'azure',
    'gcp',
    'domain',
    'oci',
    'github',
] as const satisfies ReadonlyArray<PamConfigEnvironment>

export const PAM_RESOURCES_FIELD_TYPE = 'pamResources' as const
export const FILE_REF_FIELD_TYPE = 'fileRef' as const
export const SCHEDULE_FIELD_TYPE = 'schedule' as const

export const DEFAULT_PAM_CONFIG_SCHEDULE_VALUE = [{ type: 'On-Demand' }] as const

export const EMPTY_PAM_CONFIGURATIONS_MESSAGE =
    'No PAM Configurations found. Create one with `pam config new` after syncing your vault.' as const

export const PAM_CONFIG_LIST_DEFAULT_HEADERS = [
    'UID',
    'Config Name',
    'Config Type',
    'Folder',
    'Gateway UID',
    'Resource Record UIDs',
] as const

export const PAM_CONFIG_LIST_VERBOSE_HEADERS = ['Fields'] as const

export const PAM_CONFIG_DETAIL_HEADERS = ['Field', 'Value'] as const

export const PAM_CONFIG_DETAIL_LABELS = [
    'UID',
    'Name',
    'Config Type',
    'Folder',
    'Gateway UID',
    'Resource Record UIDs',
] as const

export const PAM_CONFIG_PERMISSION_DAG_KEYS = {
    connections: 'connections',
    tunneling: 'portForwards',
    rotation: 'rotation',
    remoteBrowserIsolation: 'remoteBrowserIsolation',
    connectionsRecording: 'sessionRecording',
    typescriptRecording: 'typescriptRecording',
    aiThreatDetection: 'aiEnabled',
    aiTerminateSessionOnDetection: 'aiSessionTerminate',
} as const

export type PamConfigPermissionFlag = keyof typeof PAM_CONFIG_PERMISSION_DAG_KEYS

export const PAM_CONFIG_PERMISSION_FLAGS = Object.keys(
    PAM_CONFIG_PERMISSION_DAG_KEYS
) as PamConfigPermissionFlag[]

export const PAM_CONFIG_PERMISSION_VALUES = ['on', 'off', 'default'] as const

export type PamNetworkAllowedSettingsKey = (typeof PAM_CONFIG_PERMISSION_DAG_KEYS)[PamConfigPermissionFlag]

export type PamNetworkAllowedSettings = Partial<Record<PamNetworkAllowedSettingsKey, boolean>>

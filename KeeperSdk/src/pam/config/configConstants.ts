export const SUPPORTED_PAM_CONFIGURATION_RECORD_VERSIONS = [6] as const

export type PamConfigurationRecordVersion = (typeof SUPPORTED_PAM_CONFIGURATION_RECORD_VERSIONS)[number]

export const PAM_CONFIGURATION_RECORD_VERSION: PamConfigurationRecordVersion =
    SUPPORTED_PAM_CONFIGURATION_RECORD_VERSIONS[0]

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

export const DEFAULT_PAM_CONFIG_SCHEDULE_VALUE = [{ type: 'ON_DEMAND' }] as const

export const PAM_CONFIGURATION_FALLBACK_SCHEMA_FIELDS: Record<
    PamConfigurationRecordType,
    ReadonlyArray<{ type: string; label?: string; required?: boolean }>
> = {
    pamNetworkConfiguration: [
        { type: 'pamResources', required: true },
        { type: 'fileRef' },
        { type: 'schedule', label: 'defaultRotationSchedule' },
        { type: 'text', label: 'networkId' },
        { type: 'text', label: 'networkCIDR' },
        { type: 'multiline', label: 'portMapping' },
        { type: 'text', label: 'identityProviderUid' },
    ],
    pamAwsConfiguration: [
        { type: 'pamResources', required: true },
        { type: 'fileRef' },
        { type: 'schedule', label: 'defaultRotationSchedule' },
        { type: 'text', label: 'awsId', required: true },
        { type: 'secret', label: 'accessKeyId', required: true },
        { type: 'secret', label: 'accessSecretKey', required: true },
        { type: 'multiline', label: 'regionNames', required: true },
        { type: 'multiline', label: 'portMapping' },
        { type: 'text', label: 'identityProviderUid' },
    ],
    pamAzureConfiguration: [
        { type: 'pamResources', required: true },
        { type: 'fileRef' },
        { type: 'schedule', label: 'defaultRotationSchedule' },
        { type: 'text', label: 'azureId', required: true },
        { type: 'secret', label: 'clientId' },
        { type: 'secret', label: 'clientSecret' },
        { type: 'secret', label: 'subscriptionId', required: true },
        { type: 'secret', label: 'tenantId', required: true },
        { type: 'multiline', label: 'resourceGroups', required: true },
        { type: 'multiline', label: 'portMapping' },
        { type: 'text', label: 'identityProviderUid' },
    ],
    pamGcpConfiguration: [
        { type: 'pamResources', required: true },
        { type: 'fileRef' },
        { type: 'schedule', label: 'defaultRotationSchedule' },
        { type: 'text', label: 'pamGcpId', required: true },
        { type: 'json', label: 'pamServiceAccountKey', required: true },
        { type: 'email', label: 'pamGoogleAdminEmail', required: true },
        { type: 'multiline', label: 'pamGcpRegionName', required: true },
        { type: 'multiline', label: 'portMapping' },
        { type: 'text', label: 'identityProviderUid' },
    ],
    pamGitHubConfiguration: [
        { type: 'pamResources', required: true },
        { type: 'fileRef' },
        { type: 'schedule', label: 'defaultRotationSchedule' },
        { type: 'text', label: 'pamGitHubId', required: true },
        { type: 'secret', label: 'personalAccessToken', required: true },
        { type: 'text', label: 'pamGitHubBaseUrl' },
        { type: 'multiline', label: 'portMapping' },
        { type: 'text', label: 'identityProviderUid' },
    ],
    pamDomainConfiguration: [
        { type: 'pamResources', required: true },
        { type: 'fileRef' },
        { type: 'schedule', label: 'defaultRotationSchedule' },
        { type: 'text', label: 'pamDomainId', required: true },
        { type: 'pamHostname' },
        { type: 'checkbox', label: 'useSSL' },
        { type: 'checkbox', label: 'scanDCCIDR' },
        { type: 'text', label: 'networkCIDR' },
        { type: 'text', label: 'userMatch' },
        { type: 'multiline', label: 'portMapping' },
        { type: 'text', label: 'identityProviderUid' },
    ],
    pamOciConfiguration: [
        { type: 'pamResources', required: true },
        { type: 'fileRef' },
        { type: 'schedule', label: 'defaultRotationSchedule' },
        { type: 'text', label: 'pamOciId', required: true },
        { type: 'secret', label: 'adminOcid', required: true },
        { type: 'secret', label: 'adminPublicKey', required: true },
        { type: 'secret', label: 'adminPrivateKey', required: true },
        { type: 'text', label: 'tenancyOci', required: true },
        { type: 'text', label: 'regionOci', required: true },
        { type: 'multiline', label: 'portMapping' },
        { type: 'text', label: 'identityProviderUid' },
    ],
} as const

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

export const PAM_CONFIG_PERMISSION_FLAGS = Object.keys(PAM_CONFIG_PERMISSION_DAG_KEYS) as PamConfigPermissionFlag[]

export const PAM_CONFIG_PERMISSION_VALUES = ['on', 'off', 'default'] as const

export type PamNetworkAllowedSettingsKey = (typeof PAM_CONFIG_PERMISSION_DAG_KEYS)[PamConfigPermissionFlag]

export type PamNetworkAllowedSettings = Partial<Record<PamNetworkAllowedSettingsKey, boolean>>

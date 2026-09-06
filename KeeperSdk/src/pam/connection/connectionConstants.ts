export const PAM_CONNECTION_CONFIG_TYPES = [
    'pamNetworkConfiguration',
    'pamAwsConfiguration',
    'pamAzureConfiguration',
] as const

export const PAM_CONNECTION_RESOURCE_TYPES = [
    'pamMachine',
    'pamDatabase',
    'pamDirectory',
    'pamRemoteBrowser',
] as const

export const PAM_CONNECTION_PROTOCOLS = [
    'http',
    'kubernetes',
    'mysql',
    'postgresql',
    'rdp',
    'sql-server',
    'ssh',
    'telnet',
    'vnc',
] as const

export const PAM_CONNECTION_SETTING_KEYS = {
    connections: 'connections',
    connectionsRecording: 'sessionRecording',
    typescriptRecording: 'typescriptRecording',
} as const

export const PAM_CONNECTION_SEEDED_RECORD_TYPES = [
    'pamMachine',
    'pamDatabase',
    'pamDirectory',
    'pamRemoteBrowser',
] as const

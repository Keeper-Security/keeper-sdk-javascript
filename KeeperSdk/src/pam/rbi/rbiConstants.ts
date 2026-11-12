export const PAM_RBI_RECORD_TYPE = 'pamRemoteBrowser' as const
export const PAM_RBI_SETTING_VALUES = ['on', 'off', 'default'] as const
export const PAM_RBI_DEFAULT_SETTINGS = { connection: { protocol: 'http', httpCredentialsUid: '' } } as const
export const PAM_RBI_BOOLEAN_FIELDS = {
    remoteBrowserIsolation: 'remoteBrowserIsolation',
    allowUrlNavigation: 'allowUrlManipulation',
    ignoreServerCert: 'ignoreInitialSslCert',
    keyEvents: 'recordingIncludeKeys',
    disableAudio: 'disableAudio',
} as const

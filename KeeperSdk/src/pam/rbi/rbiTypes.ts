export type PamRbiSetting = 'on' | 'off' | 'default'
export type PamRbiEditInput = {
    record: string
    configuration?: string
    remoteBrowserIsolation?: PamRbiSetting
    connectionsRecording?: PamRbiSetting
    keyEvents?: PamRbiSetting
    allowUrlNavigation?: PamRbiSetting
    ignoreServerCert?: PamRbiSetting
    allowedUrls?: string[]
    allowedResourceUrls?: string[]
    autofillCredentials?: string
    autofillTargets?: string[]
    allowCopy?: PamRbiSetting
    allowPaste?: PamRbiSetting
    disableAudio?: PamRbiSetting
    audioChannels?: number
    audioBitDepth?: number
    audioSampleRate?: number
    silent?: boolean
}
export type PamRbiEditResult = {
    recordUid: string
    changed: boolean
    recordUpdated: boolean
    dagUpdated: boolean
    configurationUid?: string
    warnings: string[]
}

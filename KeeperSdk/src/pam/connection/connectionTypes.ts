export type PamConnectionSetting = 'on' | 'off' | 'default'

export type PamConnectionEditInput = {
    record: string
    configuration?: string
    adminUser?: string
    launchUser?: string
    protocol?: string
    connections?: PamConnectionSetting
    connectionsRecording?: PamConnectionSetting
    typescriptRecording?: PamConnectionSetting
    connectionsOverridePort?: number
    keyEvents?: PamConnectionSetting
    silent?: boolean
}

export type PamConnectionEditResult = {
    recordUid: string
    recordType: string
    configurationUid?: string
    changed: boolean
    recordUpdated: boolean
    dagUpdated: boolean
    warnings: string[]
}

import type { ListRotationSchedulesResult } from './rotationTypes'

export interface PasswordComplexitySpec {
    length?: number
    caps?: number
    lowercase?: number
    digits?: number
    special?: number
}

export interface RecordField {
    type: string
    label?: string
    value: unknown[]
    required?: boolean
    privacyScreen?: boolean
    enforceGeneration?: boolean
    complexity?: PasswordComplexitySpec
}

export interface ScriptField extends RecordField {
    type: 'script'
    value: RotationScriptValue[]
}

export interface PamRecordData {
    fields: RecordField[]
    custom?: RecordField[]
    notes?: string
}

export interface RotationScriptValue {
    fileRef: string
    recordRef: string[]
    command: string
}

export interface ScriptFieldLocation {
    fieldIndex: number
    scriptIndex: number
    script: RotationScriptValue
}

export interface ScriptSearchResult {
    location: ScriptFieldLocation
    matchType: 'uid' | 'name'
}

/**
 * Rotation script metadata
 */
export interface RotationScript {
    recordUid: string
    recordTitle: string
    recordType: string
    scriptUid: string
    scriptName: string
    recordRefs: string[]
    command: string
}

export interface ListRotationScriptsResult {
    success: boolean
    scripts: RotationScript[]
    message: string
}

export interface AddRotationScriptInput {
    record: string
    scriptPath: string
    credentialUids?: string[]
    scriptCommand?: string
}

export interface AddRotationScriptResult {
    success: boolean
    recordUid: string
    scriptFileUid: string
    message: string
    warnings: string[]
}


export interface EditRotationScriptInput {
    record: string
    script: string
    addCredentials?: string[]
    removeCredentials?: string[]
    scriptCommand?: string
}

export interface EditRotationScriptResult {
    success: boolean
    recordUid: string
    message: string
    warnings: string[]
}

export interface DeleteRotationScriptInput {
    record: string
    script: string
}

export interface DeleteRotationScriptResult {
    success: boolean
    recordUid: string
    message: string
    warnings: string[]
}

export type RotationScriptListFormat = 'table' | 'json'

export interface ListRotationScriptsOptions {
    pattern?: string
    format?: RotationScriptListFormat
}

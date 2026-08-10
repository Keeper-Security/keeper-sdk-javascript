export enum RotationListFormat {
    Table = 'table',
    Json = 'json',
}

export type RotationListFormatInput = RotationListFormat | `${RotationListFormat}`

export type ListRotationSchedulesOptions = {
    verbose?: boolean
    format?: RotationListFormatInput
}

export type RotationListRow = {
    recordUid: string
    recordTitle: string
    recordType: string
    schedule: string
    gatewayName: string
    gatewayUid: string
    gatewayOnline: boolean
    pamConfigDisplay: string
    pamConfigurationUid: string
    recordAccessible: boolean
}

export type ListRotationSchedulesResult = {
    rotations: RotationListRow[]
    message?: string
}

export type FormattedRotationSchedulesTable = {
    headers: string[]
    rows: string[][]
}

export type FormatRotationSchedulesTableOptions = {
    verbose?: boolean
}

export type RenderRotationSchedulesAsciiTableOptions = {
    minColWidth?: number
}

export type RotationScheduleJsonEntry = {
    record_uid: string
    record_title: string
    record_type: string
    schedule: string
    gateway_name: string
    gateway_online: boolean
    pam_config: string
    record_accessible: boolean
    gateway_uid?: string
    pam_configuration_uid?: string
}

export type RotationSchedulesJsonPayload = {
    rotations: RotationScheduleJsonEntry[]
    message?: string
}

export type RotationScheduleType = 'manual' | 'scheduled'

export type PasswordComplexityDetail = {
    length?: number
    lowercase?: number
    caps?: number
    digits?: number
    special?: number
    specialChars?: string
}

export type GetRotationInfoInput = {
    recordUid: string
    format?: RotationListFormatInput
}

export type RotationInfoResult = {
    status: string
    readyToRotate: boolean
    useDefaultRotationSchedule: boolean
    recordUid?: string
    pamConfigUid?: string
    nodeId?: number
    gatewayName?: string
    gatewayUid?: string
    adminResourceUid?: string | null
    adminResourceValid?: boolean | null
    passwordComplexity?: string | null
    passwordComplexityDetail?: PasswordComplexityDetail | null
    scheduleType?: RotationScheduleType | null
    scheduleData?: string | null
    scheduleDisplay?: string | null
    disabled?: boolean
    scriptName?: string | null
}

export type RotationInfoJsonPayload = {
    status: string
    ready_to_rotate: boolean
    use_default_rotation_schedule: boolean
    record_uid?: string
    pam_config_uid?: string
    node_id?: number
    gateway_name?: string
    gateway_uid?: string
    admin_resource_uid?: string | null
    admin_resource_valid?: boolean | null
    password_complexity?: string | null
    password_complexity_detail?: PasswordComplexityDetail | null
    schedule_type?: RotationScheduleType | null
    schedule_data?: string | null
    disabled?: boolean
    script_name?: string | null
}

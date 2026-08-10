export const PAM_USER_RECORD_TYPE = 'pamUser' as const

export const RECORD_INACCESSIBLE_LABEL = '[record inaccessible]' as const
export const RECORD_UNTITLED_LABEL = '[untitled]' as const
export const RECORD_UNKNOWN_TYPE_LABEL = '[unknown]' as const
export const NO_CONFIG_FOUND_LABEL = '[No config found]' as const
export const GATEWAY_DOES_NOT_EXIST_LABEL = '[Does not exist]' as const
export const MANUAL_ROTATION_LABEL = '[Manual Rotation]' as const
export const EMPTY_SCHEDULE_LABEL = '[empty]' as const

export const EMPTY_ROTATION_SCHEDULES_MESSAGE =
    'No PAM User rotation schedules found. Configure rotation on pamUser records to see them here.' as const

export const DEFAULT_ROTATION_SCHEDULE_LABEL = 'defaultRotationSchedule' as const
export const RECORD_ROTATION_KIND = 'record_rotation' as const

export const ROTATION_LIST_DEFAULT_HEADERS = [
    'Record UID',
    'Record Title',
    'Record Type',
    'Schedule',
    'Gateway',
    'Online',
    ' PAM Configuration (Type)',
] as const

export const ROTATION_LIST_VERBOSE_HEADERS = ['Gateway UID', 'Configuration UID'] as const

export const ROTATION_STATUS_ONLINE = 'RRS_ONLINE' as const
export const MISSING_VALUE_LABEL = '-' as const

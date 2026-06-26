export type AuditReportType = 'raw' | 'dim' | 'hour' | 'day' | 'week' | 'month' | 'span'

export type AuditSummaryReportType = 'hour' | 'day' | 'week' | 'month' | 'span'

export type AuditEventOverviewReportRow = {
    id?: number
    created?: number | string
    username?: string
    to_username?: string
    from_username?: string
    ip_address?: string
    audit_event_type?: string
    keeper_version?: string
    keeper_version_category?: string
    geo_location?: string
    node_id?: number
    node?: string
    role_id?: string
    enforcement?: string
    value?: string
    record_uid?: string
    shared_folder_uid?: string
    team_uid?: string
    channel?: string
    status?: string
    recipient?: string
    occurrences?: number
    first_created?: number | string
    last_created?: number | string
}

export type AuditDimensionIpAddress = {
    ip_address?: string
    city?: string
    region?: string
    country?: string
    country_code?: string
    country_name?: string
    geo_location?: string
    ip_addresses?: string[]
}

export type AuditDimensionKeeperVersion = {
    version_id?: number
    type_id?: number
    type_name?: string
    type_category?: string
    version?: string
    version_ids?: number[]
}

export type AuditDimensionRow =
    | AuditDimensionIpAddress
    | AuditDimensionKeeperVersion
    | string
    | Record<string, string | number | boolean | string[] | number[] | undefined>

export type AuditReportFilterPayload = {
    created?:
        | CreatedPreset
        | {
              min?: number | string
              max?: number | string
              exclude_min?: boolean
              exclude_max?: boolean
          }
    event_type?: string | number | Array<string | number>
    audit_event_type?: string | number | Array<string | number>
    keeper_version?: number | number[]
    username?: string | string[]
    to_username?: string | string[]
    ip_address?: string[]
    record_uid?: string | string[]
    shared_folder_uid?: string | string[]
    parent_id?: number | number[]
}

export enum AuditReportOrder {
    Asc = 'asc',
    Desc = 'desc',
}

export enum AuditReportFormat {
    Message = 'message',
    Fields = 'fields',
}

export enum AuditOutputFormat {
    Table = 'table',
    Json = 'json',
    Csv = 'csv',
}

export enum AuditAggregate {
    Occurrences = 'occurrences',
    FirstCreated = 'first_created',
    LastCreated = 'last_created',
}

export const SUMMARY_REPORT_TYPES: readonly AuditSummaryReportType[] = [
    'hour',
    'day',
    'week',
    'month',
    'span',
]

export const CREATED_PRESETS = [
    'today',
    'yesterday',
    'last_7_days',
    'last_30_days',
    'month_to_date',
    'last_month',
    'year_to_date',
    'last_year',
] as const

export type CreatedPreset = (typeof CREATED_PRESETS)[number]

export type CreatedFilterCriteria = {
    fromDate?: number
    toDate?: number
    excludeFrom?: boolean
    excludeTo?: boolean
}

export type AuditReportFilter = {
    created?: CreatedPreset | string | CreatedFilterCriteria
    eventType?: string | number | Array<string | number>
    keeperVersion?: number | number[]
    username?: string | string[]
    toUsername?: string | string[]
    ipAddress?: string | string[]
    recordUid?: string | string[]
    sharedFolderUid?: string | string[]
    geoLocation?: string
    deviceType?: string
    parentId?: number | number[]
}

export type AuditReportOptions = {
    syntaxHelp?: boolean
    reportType?: AuditReportType
    reportFormat?: AuditReportFormat
    columns?: string[]
    aggregates?: AuditAggregate[]
    timezone?: string
    limit?: number
    order?: AuditReportOrder
    outputFormat?: AuditOutputFormat
    filter?: AuditReportFilter
    hasAram?: boolean
}

export type AuditReportResult = {
    reportType: AuditReportType | null
    headers: string[]
    rows: string[][]
    events?: AuditEventOverviewReportRow[]
    formatted: string
    syntaxHelp?: string
    eventTypeReference?: Array<{ id: number; name: string }>
}

export type FormattedAuditReportTable = {
    headers: string[]
    rows: string[][]
}

export type FormatAuditReportOptions = {
    outputFormat?: AuditOutputFormat
}

export enum TargetUserStatus {
    NoLogon = 'no-logon',
    NoUpdate = 'no-update',
    Locked = 'locked',
    Invited = 'invited',
    NoRecovery = 'no-recovery',
}

export enum AdminAction {
    None = 'none',
    Lock = 'lock',
    Delete = 'delete',
    Transfer = 'transfer',
}

export enum ActionReportColumn {
    UserId = 'user_id',
    Email = 'email',
    Name = 'name',
    Status = 'status',
    TransferStatus = 'transfer_status',
    Node = 'node',
    TeamCount = 'team_count',
    Teams = 'teams',
    RoleCount = 'role_count',
    Roles = 'roles',
    Alias = 'alias',
    TwoFaEnabled = '2fa_enabled',
}

export const DEFAULT_ACTION_REPORT_COLUMNS: readonly ActionReportColumn[] = [
    ActionReportColumn.Email,
    ActionReportColumn.Name,
    ActionReportColumn.Status,
    ActionReportColumn.TransferStatus,
    ActionReportColumn.Node,
]

export const SUPPORTED_ACTION_REPORT_COLUMNS: readonly ActionReportColumn[] = [
    ActionReportColumn.UserId,
    ...DEFAULT_ACTION_REPORT_COLUMNS,
    ActionReportColumn.TeamCount,
    ActionReportColumn.Teams,
    ActionReportColumn.RoleCount,
    ActionReportColumn.Roles,
    ActionReportColumn.Alias,
    ActionReportColumn.TwoFaEnabled,
]

export const ACTION_REPORT_COLUMN_ORDER: readonly ActionReportColumn[] = SUPPORTED_ACTION_REPORT_COLUMNS

export type ActionReportEntry = {
    enterpriseUserId: number
    email: string
    fullName: string
    status: string
    transferStatus: string
    nodePath: string
    teams: string[]
    roles: string[]
    aliases: string[]
    tfaEnabled: boolean
}

export type ActionReportOptions = {
    target?: TargetUserStatus
    daysSince?: number
    columns?: ActionReportColumn[] | `${ActionReportColumn}`[] | string | null
    applyAction?: AdminAction
    targetUser?: string
    dryRun?: boolean
    node?: string
    outputFormat?: AuditOutputFormat
    timezone?: string
}

export type ActionResult = {
    action: AdminAction | string
    status: string
    affectedCount: number
    serverMessage: string
}

export type ActionReportResult = {
    target: TargetUserStatus
    headers: string[]
    rows: string[][]
    entries: ActionReportEntry[]
    formatted: string
    actionResult: ActionResult
}

export type FormattedActionReportTable = {
    headers: string[]
    rows: string[][]
}

export type FormatActionReportOptions = {
    outputFormat?: AuditOutputFormat
}

export const PW_SPECIAL_CHARACTERS = '!@#$%()+;<>=?[]{}^.,'
export const DEFAULT_TRUNCATION_LENGTH = 32
export const SUPPORTED_RECORD_VERSIONS = [2, 3] as const

export type PasswordPolicy = {
    length: number
    lower: number
    upper: number
    digits: number
    special: number
}

export type PasswordStrength = {
    length: number
    lower: number
    caps: number
    digits: number
    symbols: number
}

export type PasswordReportRow = {
    recordUid: string
    title: string
    description: string
    length: number
    lower: number
    upper: number
    digits: number
    special: number
    score?: string
    status?: string
    reused?: string
}

export type PasswordReportOptions = {
    folder?: string | null
    policy?: string | null
    length?: number
    lower?: number
    upper?: number
    digits?: number
    special?: number
    verbose?: boolean
    rowNumbers?: boolean
    outputFormat?: AuditOutputFormat
}

export type PasswordReportResult = {
    policy: PasswordPolicy
    policySummary: string
    headers: string[]
    rows: PasswordReportRow[]
    formatted: string
    verbose: boolean
    rowNumbers: boolean
    outputFormat: AuditOutputFormat
}

export type FormatPasswordReportOptions = {
    rowNumbers?: boolean
    outputFormat?: AuditOutputFormat
}

export const AUDIT_RAW_FIELDS = [
    'created',
    'audit_event_type',
    'username',
    'ip_address',
    'keeper_version',
    'geo_location',
] as const

export const AUDIT_MISC_FIELDS = [
    'to_username',
    'from_username',
    'record_uid',
    'shared_folder_uid',
    'node',
    'role_id',
    'team_uid',
    'channel',
    'status',
    'recipient',
    'value',
] as const

export const AUDIT_RAW_PAGE_SIZE = 1000
export const AUDIT_NO_ARAM_RAW_LIMIT = 1000
export const AUDIT_DEFAULT_RAW_LIMIT = 50
export const AUDIT_DEFAULT_SUMMARY_LIMIT = 100
export const AUDIT_SUMMARY_MAX_LIMIT = 2000
export const AUDIT_DIMENSION_API_LIMIT = 2000
export const AUDIT_CREATED_BETWEEN_PATTERN = /^\s*between\s+(\S+)\s+and\s+(.*)$/i
export const AUDIT_VIRTUAL_DIMENSIONS: Readonly<Record<string, string>> = {
    geo_location: 'ip_address',
    device_type: 'keeper_version',
}
export const AUDIT_SYNTAX_HELP = [
    'Audit report types: raw, dim, hour, day, week, month, span',
    'Filters: created, eventType, username, toUsername, ipAddress, recordUid, sharedFolderUid, geoLocation, deviceType',
    'Raw defaults to message format; use reportFormat=fields for all columns.',
].join('\n')

export const ACTION_STATUS_EVENT_TYPES: Readonly<Record<TargetUserStatus, readonly string[]>> = {
    [TargetUserStatus.NoLogon]: ['login', 'login_console', 'chat_login', 'accept_invitation'],
    [TargetUserStatus.NoUpdate]: ['record_add', 'record_update'],
    [TargetUserStatus.Locked]: ['lock_user'],
    [TargetUserStatus.Invited]: ['send_invitation', 'auto_invite_user'],
    [TargetUserStatus.NoRecovery]: ['change_security_question', 'account_recovery_setup'],
}

export const ACTION_DEFAULT_DAYS_BY_TARGET: Partial<Record<TargetUserStatus, number>> = {
    [TargetUserStatus.Locked]: 90,
}

export const ACTION_DEFAULT_DAYS = 30
export const ACTION_USERNAME_BATCH_SIZE = 2000
export const ACTION_EVENT_SUMMARY_ROW_LIMIT = 2000
export const SECONDS_PER_DAY = 86400

export const ACTION_COLUMN_LABELS: Readonly<Record<ActionReportColumn, string>> = {
    [ActionReportColumn.UserId]: 'User ID',
    [ActionReportColumn.Email]: 'Email',
    [ActionReportColumn.Name]: 'Name',
    [ActionReportColumn.Status]: 'Status',
    [ActionReportColumn.TransferStatus]: 'Transfer Status',
    [ActionReportColumn.Node]: 'Node',
    [ActionReportColumn.TeamCount]: 'Team Count',
    [ActionReportColumn.Teams]: 'Teams',
    [ActionReportColumn.RoleCount]: 'Role Count',
    [ActionReportColumn.Roles]: 'Roles',
    [ActionReportColumn.Alias]: 'Alias',
    [ActionReportColumn.TwoFaEnabled]: '2FA Enabled',
}

export const PASSWORD_REPORT_BASE_HEADERS = [
    'record_uid',
    'title',
    'description',
    'length',
    'lower',
    'upper',
    'digits',
    'special',
]

export const PASSWORD_REPORT_VERBOSE_HEADERS = ['score', 'status', 'reused']

export const PASSWORD_BREACHWATCH_STATUS_NAMES: Readonly<Record<number, string>> = {
    0: 'GOOD',
    1: 'CHANGED',
    2: 'WEAK',
    3: 'BREACHED',
    4: 'IGNORE',
}

export type EnterpriseAuditLicense = {
    audit_and_reporting_enabled?: boolean
    add_ons?: Array<{
        name?: string
        enterprise_audit_and_reporting_enabled?: boolean
    }>
}

export type AuditDimensionEventType = {
    id?: number
    name?: string
    category?: string
    syslog?: string
}

import type { Auth } from '@keeper-security/keeperapi'
import {
    getAuditEventDimensionsCommand,
    getAuditEventReportsCommand,
    getEnterpriseDataCommand,
} from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes } from '../utils'
import {
    AuditAggregate,
    AuditReportFormat,
    AuditReportOrder,
    AUDIT_CREATED_BETWEEN_PATTERN,
    AUDIT_DEFAULT_RAW_LIMIT,
    AUDIT_DEFAULT_SUMMARY_LIMIT,
    AUDIT_DIMENSION_API_LIMIT,
    AUDIT_MISC_FIELDS,
    AUDIT_NO_ARAM_RAW_LIMIT,
    AUDIT_RAW_FIELDS,
    AUDIT_RAW_PAGE_SIZE,
    AUDIT_SUMMARY_MAX_LIMIT,
    AUDIT_SYNTAX_HELP,
    AUDIT_VIRTUAL_DIMENSIONS,
    CREATED_PRESETS,
    SUMMARY_REPORT_TYPES,
} from './reportTypes'
import type {
    AuditDimensionEventType,
    AuditDimensionIpAddress,
    AuditDimensionKeeperVersion,
    AuditDimensionRow,
    AuditEventOverviewReportRow,
    AuditReportFilter,
    AuditReportFilterPayload,
    AuditReportOptions,
    AuditReportResult,
    AuditSummaryReportType,
    CreatedFilterCriteria,
    CreatedPreset,
    EnterpriseAuditLicense,
} from './reportTypes'
import { assertSucceeded, resolveTimezone, toAuditApiOrder } from './reportUtils'

let dimensionCache = new Map<string, AuditDimensionRow[]>()
let cachedUsername = ''
let syslogTemplates: Map<string, string> | null = null

export async function runAuditReport(auth: Auth, options: AuditReportOptions = {}): Promise<AuditReportResult> {
    if (options.syntaxHelp || !options.reportType) {
        return buildSyntaxHelp(auth)
    }

    const hasAram = await resolveHasAram(auth, options.hasAram)
    const reportType = options.reportType

    if (reportType === 'dim') return runDimensionReport(auth, options)
    if (reportType === 'raw') return runRawReport(auth, options, hasAram)
    if ((SUMMARY_REPORT_TYPES as readonly string[]).includes(reportType)) {
        return runSummaryReport(auth, options, hasAram, reportType as AuditSummaryReportType)
    }

    throw new KeeperSdkError(`Unsupported report type "${reportType}".`, ResultCodes.AUDIT_INVALID_REPORT_TYPE)
}

async function buildSyntaxHelp(auth: Auth): Promise<AuditReportResult> {
    const eventTypes = await loadDimension(auth, 'audit_event_type')
    const eventTypeReference = eventTypes
        .map((row) => {
            if (!row || typeof row !== 'object') return null
            const typed = row as AuditDimensionEventType
            if (typed.id == null || !typed.name) return null
            return { id: typed.id, name: typed.name }
        })
        .filter((row): row is { id: number; name: string } => row !== null)
        .sort((a, b) => a.id - b.id)

    const headers = ['id', 'name']
    const rows = eventTypeReference.map((row) => [String(row.id), row.name])
    return {
        reportType: null,
        headers,
        rows,
        syntaxHelp: AUDIT_SYNTAX_HELP,
        eventTypeReference,
    }
}

async function runDimensionReport(auth: Auth, options: AuditReportOptions): Promise<AuditReportResult> {
    const columns = options.columns
    if (!columns || columns.length !== 1) {
        throw new KeeperSdkError(
            '"dim" reports expect exactly one "columns" value.',
            ResultCodes.AUDIT_DIMENSION_COLUMN_REQUIRED
        )
    }

    const column = columns[0]
    const fields = dimensionFields(column)
    const rows = (await loadDimension(auth, column)).map((row) => dimensionCells(row, fields))

    return {
        reportType: 'dim',
        headers: fields,
        rows,
    }
}

async function runRawReport(
    auth: Auth,
    options: AuditReportOptions,
    hasAram: boolean
): Promise<AuditReportResult> {
    let filter = await resolveFilter(auth, options.filter ?? {})
    let limit = options.limit
    let order = options.order

    if (!hasAram) {
        const requested = options.limit
        limit = requested != null && requested > 0 ? Math.min(requested, AUDIT_NO_ARAM_RAW_LIMIT) : AUDIT_NO_ARAM_RAW_LIMIT
        order = order ?? AuditReportOrder.Desc
        if (!filter.created) {
            filter.created = 'last_30_days'
        }
    }

    const reportFormat = options.reportFormat ?? AuditReportFormat.Message
    const events = await fetchRawEvents(auth, {
        filter: Object.keys(filter).length > 0 ? filter : undefined,
        limit,
        order,
        timezone: options.timezone,
    })
    const fields: string[] = [...AUDIT_RAW_FIELDS]
    const miscFields = new Set<string>(AUDIT_MISC_FIELDS)
    const templates =
        reportFormat === AuditReportFormat.Message ? await loadSyslogTemplates(auth) : new Map<string, string>()

    if (reportFormat === AuditReportFormat.Message) fields.push('message')

    const rows: string[][] = []
    for (const event of events) {
        if (reportFormat === AuditReportFormat.Fields) {
            for (const key of Object.keys(event)) {
                if (miscFields.has(key)) {
                    fields.push(key)
                    miscFields.delete(key)
                }
            }
        }
        rows.push(
            fields.map((field) =>
                field === 'message' ? eventMessage(event, templates) : formatFieldValue(field, getAuditEventField(event, field), 'raw')
            )
        )
    }

    return {
        reportType: 'raw',
        headers: fields,
        rows,
        events,
    }
}

async function runSummaryReport(
    auth: Auth,
    options: AuditReportOptions,
    hasAram: boolean,
    reportType: (typeof SUMMARY_REPORT_TYPES)[number]
): Promise<AuditReportResult> {
    if (!hasAram) {
        throw new KeeperSdkError('Audit Reporting addon is not enabled.', ResultCodes.AUDIT_REPORTING_NOT_ENABLED)
    }

    const limit = options.limit
    if (typeof limit === 'number' && (limit < 0 || limit > AUDIT_SUMMARY_MAX_LIMIT)) {
        throw new KeeperSdkError(`Invalid "limit" value: ${limit}`, ResultCodes.AUDIT_INVALID_LIMIT)
    }
    if (!options.columns?.length) {
        throw new KeeperSdkError('"columns" parameter cannot be empty.', ResultCodes.AUDIT_COLUMNS_REQUIRED)
    }

    const aggregates =
        options.aggregates?.length ? options.aggregates : [AuditAggregate.Occurrences]
    const events = await fetchSummaryEvents(auth, {
        reportType,
        filter: await resolveFilter(auth, options.filter),
        limit,
        order: options.order,
        timezone: options.timezone,
        columns: options.columns,
        aggregates,
    })

    const fields = [...aggregates, ...(reportType !== 'span' ? ['created'] : []), ...options.columns]
    const rows = events.map((event) =>
        fields.map((field) => formatFieldValue(field, getAuditEventField(event, field), reportType))
    )
    return {
        reportType,
        headers: fields,
        rows,
        events,
    }
}

async function fetchRawEvents(
    auth: Auth,
    options: {
        filter?: AuditReportFilter
        limit?: number
        order?: AuditReportOrder
        timezone?: string
    }
): Promise<AuditEventOverviewReportRow[]> {
    const limit = options.limit ?? AUDIT_DEFAULT_RAW_LIMIT
    if (limit === 0) return []

    const isPaginated = limit < 0 || limit > AUDIT_RAW_PAGE_SIZE
    let workingFilter = options.filter ? { ...options.filter } : undefined
    const order = options.order ?? AuditReportOrder.Desc
    const timezone = resolveTimezone(options.timezone)

    if (isPaginated && typeof workingFilter?.created === 'string') {
        if ((CREATED_PRESETS as readonly string[]).includes(workingFilter.created)) {
            workingFilter.created = expandCreatedPreset(workingFilter.created as CreatedPreset)
        }
    }

    const events: AuditEventOverviewReportRow[] = []
    let eventsReturned = 0
    let done = false

    while (!done) {
        done = true
        const queryLimit = isPaginated
            ? limit <= 0
                ? AUDIT_RAW_PAGE_SIZE
                : Math.min(AUDIT_RAW_PAGE_SIZE, limit - eventsReturned)
            : limit

        const response = await auth.executeRestCommand(
            getAuditEventReportsCommand({
                report_type: 'raw',
                scope: 'enterprise',
                timezone,
                limit: queryLimit,
                order: toAuditApiOrder(order),
                filter: serializeFilter(workingFilter),
            })
        )
        assertSucceeded(response, 'get_audit_event_reports failed', ResultCodes.AUDIT_REPORT_FAILED)

        let pageEvents = (response.audit_event_overview_report_rows ?? []) as AuditEventOverviewReportRow[]
        if (!isPaginated && pageEvents.length > queryLimit) {
            pageEvents = pageEvents.slice(0, queryLimit)
        }
        if (isPaginated && pageEvents.length === AUDIT_RAW_PAGE_SIZE) {
            done = false
            const lastEvent = pageEvents[pageEvents.length - 1]
            const ts = Number(lastEvent.created)
            let pos = pageEvents.length - 1
            while (pos > 900 && Number(pageEvents[pos].created) === ts) pos -= 1
            if (pos > 900) pageEvents = pageEvents.slice(0, pos)
            else workingFilter = advanceCreatedFilter(workingFilter, ts + 1, order)
        }

        events.push(...pageEvents)
        eventsReturned += pageEvents.length
        if ((limit > 0 && eventsReturned >= limit) || pageEvents.length === 0) break
    }

    return limit > 0 ? events.slice(0, limit) : events
}

async function fetchSummaryEvents(
    auth: Auth,
    options: {
        reportType: AuditSummaryReportType
        filter?: AuditReportFilter
        limit?: number
        order?: AuditReportOrder
        timezone?: string
        columns: string[]
        aggregates: AuditAggregate[]
    }
): Promise<AuditEventOverviewReportRow[]> {
    let limit = options.limit ?? AUDIT_DEFAULT_SUMMARY_LIMIT
    if (limit <= 0) limit = AUDIT_DEFAULT_SUMMARY_LIMIT
    else if (limit > AUDIT_SUMMARY_MAX_LIMIT) limit = AUDIT_SUMMARY_MAX_LIMIT

    const filter = serializeFilter(options.filter)

    const response = await auth.executeRestCommand(
        getAuditEventReportsCommand({
            report_type: options.reportType,
            scope: 'enterprise',
            timezone: resolveTimezone(options.timezone),
            limit,
            aggregate: [...options.aggregates],
            columns: [...options.columns],
            ...(options.order ? { order: toAuditApiOrder(options.order) } : {}),
            ...(filter ? { filter } : {}),
        })
    )
    assertSucceeded(response, 'get_audit_event_reports failed', ResultCodes.AUDIT_REPORT_FAILED)
    return (response.audit_event_overview_report_rows ?? []) as AuditEventOverviewReportRow[]
}

async function resolveFilter(auth: Auth, filter: AuditReportFilter = {}): Promise<AuditReportFilter> {
    const resolved: AuditReportFilter = { ...filter }

    if (filter.geoLocation || filter.ipAddress) {
        const ipFilter = new Set<string>()
        if (filter.geoLocation) {
            const parts = filter.geoLocation.split(',')
            const country = (parts.pop() || '').trim().toLowerCase()
            if (!country) {
                throw new KeeperSdkError('"geoLocation" filter misses country.', ResultCodes.AUDIT_INVALID_FILTER)
            }
            const region = (parts.pop() || '').trim().toLowerCase()
            const city = (parts.pop() || '').trim().toLowerCase()
            for (const geo of await loadDimension(auth, 'geo_location')) {
                if (!geo || typeof geo !== 'object') continue
                const row = geo as AuditDimensionIpAddress & { ip_addresses?: string[] }
                if ((row.country_code || '').toLowerCase() !== country) continue
                if (region && (row.region || '').toLowerCase() !== region) continue
                if (city && (row.city || '').toLowerCase() !== city) continue
                row.ip_addresses?.forEach((ip) => ipFilter.add(ip))
            }
            if (ipFilter.size === 0) {
                throw new KeeperSdkError(
                    `"geoLocation" filter: invalid GEO location ${filter.geoLocation}`,
                    ResultCodes.AUDIT_INVALID_FILTER
                )
            }
        }
        const addresses = filter.ipAddress
            ? Array.isArray(filter.ipAddress)
                ? filter.ipAddress
                : [filter.ipAddress]
            : []
        addresses.forEach((ip) => ipFilter.add(ip))
        resolved.ipAddress = Array.from(ipFilter)
    }

    if (filter.deviceType) {
        const versionFilter = new Set<number>()
        const parts = filter.deviceType.split(',')
        const deviceType = (parts[0] || '').trim().toLowerCase()
        let version = (parts[1] || '').trim().toLowerCase()
        if (version && !version.includes('.')) version += '.'
        if (!deviceType && !version) {
            throw new KeeperSdkError('"deviceType" filter is empty.', ResultCodes.AUDIT_INVALID_FILTER)
        }
        for (const row of await loadDimension(auth, 'device_type')) {
            if (!row || typeof row !== 'object') continue
            const ver = row as AuditDimensionKeeperVersion & { version_ids?: number[] }
            if (deviceType) {
                const typeName = (ver.type_name || '').toLowerCase()
                const typeCategory = (ver.type_category || '').toLowerCase()
                if (deviceType !== typeName && deviceType !== typeCategory) continue
            }
            if (version && !(ver.version || '').startsWith(version)) continue
            ver.version_ids?.forEach((id) => {
                if (Number.isInteger(id)) versionFilter.add(id)
            })
        }
        if (versionFilter.size === 0) {
            throw new KeeperSdkError('"deviceType" filter matched no events.', ResultCodes.AUDIT_INVALID_FILTER)
        }
        resolved.keeperVersion = Array.from(versionFilter)
    }

    if (filter.eventType !== undefined) {
        resolved.eventType = Array.isArray(filter.eventType)
            ? filter.eventType.map((value) => asStrOrInt('event-type', value))
            : asStrOrInt('event-type', filter.eventType)
    }

    delete resolved.geoLocation
    delete resolved.deviceType
    return resolved
}

async function loadDimension(auth: Auth, dimension: string): Promise<AuditDimensionRow[]> {
    invalidateAuditCachesIfUserChanged(auth)
    const cached = dimensionCache.get(dimension)
    if (cached) return cached

    const virtualSource = AUDIT_VIRTUAL_DIMENSIONS[dimension]
    const rows = virtualSource
        ? buildVirtualDimension(dimension, await loadDimension(auth, virtualSource))
        : await fetchDimensionRows(auth, dimension)

    dimensionCache.set(dimension, rows)
    return rows
}

async function fetchDimensionRows(auth: Auth, dimension: string): Promise<AuditDimensionRow[]> {
    const response = await auth.executeRestCommand(
        getAuditEventDimensionsCommand({
            report_type: 'dim',
            columns: [dimension],
            limit: AUDIT_DIMENSION_API_LIMIT,
            scope: 'enterprise',
        })
    )
    assertSucceeded(response, 'get_audit_event_dimensions failed', ResultCodes.AUDIT_DIMENSION_FAILED)
    const rows = (response.dimensions?.[dimension] || []) as AuditDimensionRow[]
    if (dimension !== 'ip_address') return rows

    return rows.map((row) => {
        if (typeof row === 'string' || !row || typeof row !== 'object') return row
        const ipRow = row as AuditDimensionIpAddress
        const city = ipRow.city || ''
        const region = ipRow.region || ''
        const country = ipRow.country_code || ''
        if (!city && !region && !country) return row
        return { ...ipRow, geo_location: [city, region, country].filter(Boolean).join(', ') }
    })
}

function buildVirtualDimension(dimension: string, sourceRows: AuditDimensionRow[]): AuditDimensionRow[] {
    if (dimension === 'geo_location') {
        const geoMap = new Map<string, Record<string, unknown>>()
        for (const row of sourceRows) {
            if (!row || typeof row !== 'object') continue
            const ipRow = row as AuditDimensionIpAddress & { ip_addresses?: string[] }
            if (!ipRow.geo_location || !ipRow.ip_address) continue
            const existing = geoMap.get(ipRow.geo_location)
            if (existing) (existing.ip_addresses as string[]).push(ipRow.ip_address)
            else {
                const entry: Record<string, unknown> = { ...ipRow }
                delete entry.ip_address
                entry.ip_addresses = [ipRow.ip_address]
                geoMap.set(ipRow.geo_location, entry)
            }
        }
        return Array.from(geoMap.values()).map((entry) => ({
            ...entry,
            ip_count: Array.isArray(entry.ip_addresses) ? entry.ip_addresses.length : 0,
        }))
    }

    if (dimension === 'device_type') {
        const deviceMap = new Map<number, Record<string, unknown>>()
        for (const row of sourceRows) {
            if (!row || typeof row !== 'object') continue
            const versionRow = row as AuditDimensionKeeperVersion & { version_ids?: number[] }
            if (!versionRow.type_id || !versionRow.version_id) continue
            const existing = deviceMap.get(versionRow.type_id)
            if (existing) (existing.version_ids as number[]).push(versionRow.version_id)
            else {
                const entry: Record<string, unknown> = { ...versionRow }
                delete entry.version_id
                entry.version_ids = [versionRow.version_id]
                deviceMap.set(versionRow.type_id, entry)
            }
        }
        return Array.from(deviceMap.values())
    }

    return sourceRows
}

async function loadSyslogTemplates(auth: Auth): Promise<Map<string, string>> {
    invalidateAuditCachesIfUserChanged(auth)
    if (syslogTemplates) return syslogTemplates
    const templates = new Map<string, string>()
    for (const row of await loadDimension(auth, 'audit_event_type')) {
        if (!row || typeof row !== 'object') continue
        const typed = row as AuditDimensionEventType
        if (typed.name && typed.syslog) templates.set(typed.name, typed.syslog)
    }
    syslogTemplates = templates
    return templates
}

function invalidateAuditCachesIfUserChanged(auth: Auth): void {
    if (auth.username !== cachedUsername) {
        dimensionCache = new Map()
        syslogTemplates = null
        cachedUsername = auth.username || ''
    }
}

function getAuditEventField(event: AuditEventOverviewReportRow, field: string): unknown {
    return (event as Record<string, unknown>)[field]
}

function eventMessage(event: AuditEventOverviewReportRow, templates: Map<string, string>): string {
    const template = templates.get(event.audit_event_type || '')
    if (!template) return ''
    let info = template
    while (true) {
        const match = /\$\{(\w+)\}/.exec(info)
        if (!match) break
        const fieldValue = getAuditEventField(event, match[1])
        const value = fieldValue == null ? ' ' : String(fieldValue)
        info = info.slice(0, match.index) + value + info.slice(match.index + match[0].length)
    }
    return info
}

function serializeFilter(filter: AuditReportFilter | undefined): AuditReportFilterPayload | undefined {
    if (!filter) return undefined
    const payload: AuditReportFilterPayload = {}

    if (filter.created !== undefined) {
        if (typeof filter.created === 'string') {
            payload.created = (CREATED_PRESETS as readonly string[]).includes(filter.created)
                ? (filter.created as CreatedPreset)
                : createdCriteria(parseCreatedFilter(filter.created))
        } else {
            payload.created = createdCriteria(filter.created)
        }
    }
    if (filter.eventType !== undefined) payload.event_type = filter.eventType
    if (filter.keeperVersion !== undefined) payload.keeper_version = filter.keeperVersion
    if (filter.username !== undefined) payload.username = filter.username
    if (filter.toUsername !== undefined) payload.to_username = filter.toUsername
    if (filter.ipAddress !== undefined) {
        payload.ip_address = Array.isArray(filter.ipAddress) ? filter.ipAddress : [filter.ipAddress]
    }
    if (filter.recordUid !== undefined) payload.record_uid = filter.recordUid
    if (filter.sharedFolderUid !== undefined) payload.shared_folder_uid = filter.sharedFolderUid
    if (filter.parentId !== undefined) payload.parent_id = filter.parentId

    return Object.keys(payload).length > 0 ? payload : undefined
}

function createdCriteria(criteria: CreatedFilterCriteria): AuditReportFilterPayload['created'] {
    const created: Record<string, unknown> = {}
    if (criteria.fromDate !== undefined) created.min = criteria.fromDate
    if (criteria.excludeFrom === true) created.exclude_min = true
    if (criteria.toDate !== undefined) created.max = criteria.toDate
    if (criteria.excludeTo === true) created.exclude_max = true
    return created as AuditReportFilterPayload['created']
}

function advanceCreatedFilter(
    filter: AuditReportFilter | undefined,
    timestamp: number,
    order: AuditReportOrder
): AuditReportFilter {
    const next: AuditReportFilter = { ...(filter || {}) }
    const criteria: CreatedFilterCriteria =
        next.created && typeof next.created === 'object' && !Array.isArray(next.created)
            ? { ...next.created }
            : {}
    if (order === AuditReportOrder.Asc) {
        criteria.fromDate = timestamp
        criteria.excludeFrom = false
    } else {
        criteria.toDate = timestamp
        criteria.excludeTo = false
    }
    next.created = criteria
    return next
}

function parseCreatedFilter(value: string): CreatedFilterCriteria {
    const trimmed = value.trim()
    const betweenMatch = AUDIT_CREATED_BETWEEN_PATTERN.exec(trimmed)
    if (betweenMatch) {
        return { fromDate: toEpoch(betweenMatch[1]), toDate: toEpoch(betweenMatch[2]) }
    }
    for (const prefix of ['>=', '<=', '>', '<'] as const) {
        if (!trimmed.startsWith(prefix)) continue
        const dateValue = toEpoch(trimmed.slice(prefix.length).trim())
        if (prefix === '>=') return { fromDate: dateValue }
        if (prefix === '<=') return { toDate: dateValue }
        if (prefix === '>') return { fromDate: dateValue, excludeFrom: true }
        return { toDate: dateValue, excludeTo: true }
    }
    throw new KeeperSdkError(`Invalid created filter value "${value}".`, ResultCodes.AUDIT_INVALID_CREATED_FILTER)
}

function expandCreatedPreset(preset: CreatedPreset): CreatedFilterCriteria {
    const today = startOfDay(new Date())
    let fromDate: Date
    let toDate: Date

    switch (preset) {
        case 'today':
            fromDate = today
            toDate = addDays(today, 1)
            break
        case 'yesterday':
            fromDate = addDays(today, -1)
            toDate = today
            break
        case 'last_7_days':
            fromDate = addDays(today, -7)
            toDate = today
            break
        case 'last_30_days':
            fromDate = addDays(today, -30)
            toDate = today
            break
        case 'month_to_date':
            fromDate = new Date(today.getFullYear(), today.getMonth(), 1)
            toDate = today
            break
        case 'last_month':
            toDate = new Date(today.getFullYear(), today.getMonth(), 1)
            fromDate = new Date(toDate.getFullYear(), toDate.getMonth() - 1, 1)
            break
        case 'last_year':
            fromDate = new Date(today.getFullYear() - 1, 0, 1)
            toDate = new Date(today.getFullYear(), 0, 1)
            break
        case 'year_to_date':
            fromDate = new Date(today.getFullYear(), 0, 1)
            toDate = today
            break
        default:
            throw new KeeperSdkError(`Unknown created preset "${preset}".`, ResultCodes.AUDIT_INVALID_CREATED_FILTER)
    }

    return {
        fromDate: Math.floor(fromDate.getTime() / 1000),
        toDate: Math.floor(toDate.getTime() / 1000),
        excludeFrom: false,
        excludeTo: true,
    }
}

async function resolveHasAram(auth: Auth, override: boolean | undefined): Promise<boolean> {
    if (override !== undefined) return override
    try {
        const response = await auth.executeRestCommand(getEnterpriseDataCommand({ include: ['licenses'] }))
        assertSucceeded(response, 'get_enterprise_data failed', ResultCodes.AUDIT_LICENSE_CHECK_FAILED)
        return hasEnterpriseAuditReporting(response.licenses as EnterpriseAuditLicense[] | undefined)
    } catch {
        return false
    }
}

function hasEnterpriseAuditReporting(licenses: EnterpriseAuditLicense[] | undefined): boolean {
    if (!licenses || licenses.length === 0) return false
    for (const license of licenses) {
        if (license.audit_and_reporting_enabled === true) return true
        for (const addon of license.add_ons || []) {
            if (addon.enterprise_audit_and_reporting_enabled === true) return true
            if ((addon.name || '').toLowerCase() === 'enterprise_audit_and_reporting') return true
        }
    }
    return false
}

function dimensionFields(column: string): string[] {
    switch (column) {
        case 'audit_event_type':
            return ['id', 'name', 'category', 'syslog']
        case 'keeper_version':
            return ['version_id', 'type_name', 'version', 'type_category']
        case 'ip_address':
            return ['ip_address', 'city', 'region', 'country_code']
        case 'geo_location':
            return ['geo_location', 'city', 'region', 'country_code', 'ip_count']
        case 'device_type':
            return ['type_name', 'type_category']
        default:
            return [column]
    }
}

function dimensionCells(row: AuditDimensionRow, fields: readonly string[]): string[] {
    if (typeof row === 'string') return [row]
    if (!row || typeof row !== 'object') return ['']
    return fields.map((field) => {
        const value = (row as Record<string, unknown>)[field]
        return value == null ? '' : String(value)
    })
}

function formatFieldValue(field: string, value: unknown, reportType: string): string {
    if (value == null) return ''
    if (field === 'created' || field === 'first_created' || field === 'last_created') {
        if (typeof value === 'string') return value
        if (typeof value === 'number') {
            const dt = new Date(value * 1000)
            if (reportType === 'day' || reportType === 'week') return dt.toISOString().slice(0, 10)
            if (reportType === 'month') return dt.toLocaleString(undefined, { month: 'long', year: 'numeric' })
            if (reportType === 'hour') {
                return `${dt.toISOString().slice(0, 10)} @${String(dt.getUTCHours()).padStart(2, '0')}:00`
            }
            return dt.toLocaleString()
        }
    }
    return String(value)
}

function toEpoch(value: string | number | Date): number {
    if (value instanceof Date) return Math.floor(value.getTime() / 1000)
    if (typeof value === 'number') return Math.floor(value)
    const trimmed = value.trim()
    const parsed =
        trimmed.length <= 10
            ? new Date(`${trimmed}T00:00:00Z`)
            : new Date(trimmed.endsWith('Z') ? trimmed : `${trimmed}Z`)
    if (Number.isNaN(parsed.getTime())) {
        throw new KeeperSdkError(`Invalid date "${value}".`, ResultCodes.AUDIT_INVALID_CREATED_FILTER)
    }
    return Math.floor(parsed.getTime() / 1000)
}

function asStrOrInt(propertyName: string, value: string | number): string | number {
    if (typeof value === 'number') return value
    if (/^\d+$/.test(value)) return Number.parseInt(value, 10)
    if (value.trim()) return value
    throw new KeeperSdkError(`Invalid "${propertyName}" filter value: ${value}`, ResultCodes.AUDIT_INVALID_FILTER)
}

function startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function addDays(date: Date, days: number): Date {
    const copy = new Date(date.getTime())
    copy.setDate(copy.getDate() + days)
    return copy
}

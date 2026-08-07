import type { DRecord } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { getRecordType } from '../../records/RecordUtils'
import { KeeperSdkError, ResultCodes } from '../../utils'
import {
    EMPTY_PAM_CONFIGURATIONS_MESSAGE,
    PAM_CONFIG_DETAIL_LABELS,
    PAM_CONFIG_LIST_DEFAULT_HEADERS,
    PAM_CONFIG_LIST_VERBOSE_HEADERS,
    PAM_CONFIGURATION_RECORD_VERSION,
} from './configConstants'
import {
    getPamConfigurationDisplayName,
    getPamConfigurationFields,
    isPamConfigurationRecord,
    isPamConfigurationRecordType,
    listPamConfigurationRecords,
    parsePamResources,
} from './configHelpers'
import {
    findPamConfigFolderForRecord,
    formatPamConfigFolderDisplay,
    resolvePamConfigFolderName,
    resolvePamConfigFolderTargetFromUid,
    type PamConfigFolderTarget,
} from './pamConfigFolder'
import {
    PamConfigListFormat,
    type FormatPamConfigurationsTableOptions,
    type FormattedPamConfigurationsTable,
    type ListPamConfigurationsOptions,
    type ListPamConfigurationsResult,
    type PamConfigurationDetail,
    type PamConfigurationField,
    type PamConfigurationJsonEntry,
    type PamConfigurationListRow,
    type PamConfigurationsJsonPayload,
    type RenderPamConfigurationsAsciiTableOptions,
} from './configTypes'

function resolveFolderForConfiguration(
    storage: InMemoryStorage,
    record: DRecord
): { folder?: PamConfigFolderTarget; inSharedFolder: boolean } {
    const membership = findPamConfigFolderForRecord(storage, record.uid)
    if (membership) return { folder: membership, inSharedFolder: true }

    const resources = parsePamResources(record)
    const fallback = resolvePamConfigFolderTargetFromUid(storage, resources.sharedFolderUid)
    return { folder: fallback, inSharedFolder: false }
}

function buildListRow(
    storage: InMemoryStorage,
    record: DRecord,
    verbose: boolean
): { row?: PamConfigurationListRow; warning?: string } {
    const configType = getRecordType(record)
    if (!isPamConfigurationRecordType(configType)) {
        return { warning: `Unsupported PAM configuration type "${configType}" for record ${record.uid}` }
    }

    const resources = parsePamResources(record)
    const { folder, inSharedFolder } = resolveFolderForConfiguration(storage, record)
    const warning = !inSharedFolder
        ? `Following configuration is not in the shared folder: UID: ${record.uid}, Title: ${getPamConfigurationDisplayName(record)}`
        : undefined

    if (!folder) {
        return { warning: warning || `Following configuration is not in the shared folder: UID: ${record.uid}, Title: ${getPamConfigurationDisplayName(record)}` }
    }

    const row: PamConfigurationListRow = {
        uid: record.uid,
        name: getPamConfigurationDisplayName(record),
        configType,
        sharedFolderUid: folder.uid,
        sharedFolderName: resolvePamConfigFolderName(storage, folder),
        gatewayUid: resources.gatewayUid,
        resourceRecordUids: resources.resourceRecordUids,
    }

    if (verbose) {
        row.fields = getPamConfigurationFields(record)
    }

    return { row, warning }
}

function buildDetail(storage: InMemoryStorage, record: DRecord): PamConfigurationDetail {
    const resources = parsePamResources(record)
    const { folder } = resolveFolderForConfiguration(storage, record)
    const sharedFolderUid = folder?.uid || ''
    return {
        uid: record.uid,
        name: getPamConfigurationDisplayName(record),
        configType: getRecordType(record),
        sharedFolderUid,
        sharedFolderName: folder ? resolvePamConfigFolderName(storage, folder) : '',
        gatewayUid: resources.gatewayUid,
        resourceRecordUids: resources.resourceRecordUids,
        fields: getPamConfigurationFields(record),
    }
}

function loadConfigurationDetail(storage: InMemoryStorage, configUid: string): PamConfigurationDetail {
    const record = storage.getByUid<DRecord>(VaultObjectKind.Record, configUid)
    if (!record) {
        throw new KeeperSdkError(`PAM Configuration "${configUid}" not found.`, ResultCodes.PAM_CONFIG_NOT_FOUND)
    }
    if (record.version !== PAM_CONFIGURATION_RECORD_VERSION || !isPamConfigurationRecord(record)) {
        throw new KeeperSdkError(
            `Record "${configUid}" is not a PAM Configuration (expected version ${PAM_CONFIGURATION_RECORD_VERSION}).`,
            ResultCodes.PAM_CONFIG_INVALID
        )
    }
    return buildDetail(storage, record)
}

export function listPamConfigurations(
    storage: InMemoryStorage,
    options: ListPamConfigurationsOptions = {}
): ListPamConfigurationsResult {
    const verbose = options.verbose === true
    const configUid = options.configUid?.trim() || ''

    if (configUid) {
        return {
            configurations: [],
            detail: loadConfigurationDetail(storage, configUid),
            warnings: [],
        }
    }

    const warnings: string[] = []
    const configurations: PamConfigurationListRow[] = []

    for (const record of listPamConfigurationRecords(storage)) {
        const { row, warning } = buildListRow(storage, record, verbose)
        if (warning) warnings.push(warning)
        if (row) configurations.push(row)
    }

    configurations.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

    return {
        configurations,
        warnings,
        message: configurations.length === 0 ? EMPTY_PAM_CONFIGURATIONS_MESSAGE : undefined,
    }
}

function formatVerboseFieldLine(field: PamConfigurationField): string {
    const value = field.values.join(', ')
    if (!value) return ''
    if (field.label) return `(${field.type}).${field.label}: ${value}`
    return `(${field.type}): ${value}`
}

function formatFieldSummary(fields: PamConfigurationListRow['fields']): string {
    if (!fields?.length) return ''
    return fields.map(formatVerboseFieldLine).filter(Boolean).join('\n')
}

function formatFolderCell(name: string, uid: string): string {
    return formatPamConfigFolderDisplay(name, uid)
}

function formatPamConfigurationDetail(
    detail: PamConfigurationDetail,
    options: { verbose?: boolean } = {}
): string {
    const rows: Array<[string, string]> = [
        [PAM_CONFIG_DETAIL_LABELS[0], detail.uid],
        [PAM_CONFIG_DETAIL_LABELS[1], detail.name],
        [PAM_CONFIG_DETAIL_LABELS[2], detail.configType],
        [PAM_CONFIG_DETAIL_LABELS[3], formatFolderCell(detail.sharedFolderName, detail.sharedFolderUid)],
        [PAM_CONFIG_DETAIL_LABELS[4], detail.gatewayUid],
        [PAM_CONFIG_DETAIL_LABELS[5], detail.resourceRecordUids.join(', ')],
    ]

    if (options.verbose) {
        for (const field of detail.fields) {
            const line = formatVerboseFieldLine(field)
            if (!line) continue
            const separator = line.indexOf(': ')
            if (separator < 0) continue
            rows.push([line.slice(0, separator), line.slice(separator + 2)])
        }
    }

    const labelWidth = Math.max(...rows.map(([label]) => label.length), 1)
    return rows.map(([label, value]) => `${label.padStart(labelWidth)}  ${value}`).join('\n')
}

export function formatPamConfigurationsTable(
    result: ListPamConfigurationsResult,
    options: FormatPamConfigurationsTableOptions = {}
): FormattedPamConfigurationsTable {
    const verbose = options.verbose === true

    if (result.detail) {
        const detail = result.detail
        const rows: string[][] = [
            ['UID', detail.uid],
            ['Name', detail.name],
            ['Config Type', detail.configType],
            ['Folder', formatFolderCell(detail.sharedFolderName, detail.sharedFolderUid)],
            ['Gateway UID', detail.gatewayUid],
            ['Resource Record UIDs', detail.resourceRecordUids.join(', ')],
        ]
        if (verbose) {
            for (const field of detail.fields) {
                const line = formatVerboseFieldLine(field)
                if (!line) continue
                const separator = line.indexOf(': ')
                if (separator < 0) continue
                rows.push([line.slice(0, separator), line.slice(separator + 2)])
            }
        }
        return { headers: ['Field', 'Value'], rows }
    }

    const headers: string[] = [...PAM_CONFIG_LIST_DEFAULT_HEADERS]
    if (verbose) headers.push(...PAM_CONFIG_LIST_VERBOSE_HEADERS)

    const rows = result.configurations.map((config) => {
        const row: string[] = [
            config.uid,
            config.name,
            config.configType,
            formatFolderCell(config.sharedFolderName, config.sharedFolderUid),
            config.gatewayUid,
            config.resourceRecordUids.join(', '),
        ]
        if (verbose) row.push(formatFieldSummary(config.fields))
        return row
    })

    return { headers, rows }
}

export function renderPamConfigurationsAsciiTable(
    table: FormattedPamConfigurationsTable,
    options: RenderPamConfigurationsAsciiTableOptions = {}
): string {
    const minColWidth = options.minColWidth ?? 2
    const splitRows = table.rows.map((row) => row.map((cell) => (cell || '').split('\n')))
    const widths = table.headers.map((header, col) => {
        let width = Math.max(header.length, minColWidth)
        for (const row of splitRows) {
            for (const line of row[col] || ['']) {
                width = Math.max(width, line.length)
            }
        }
        return width
    })

    const formatCells = (cells: string[]): string =>
        cells.map((cell, i) => (cell || '').padEnd(widths[i])).join('  ').trimEnd()

    const lines: string[] = [
        formatCells([...table.headers]),
        widths.map((w) => '-'.repeat(w)).join('  '),
    ]

    for (const row of splitRows) {
        const lineCount = Math.max(1, ...row.map((cell) => cell.length))
        for (let lineIndex = 0; lineIndex < lineCount; lineIndex++) {
            lines.push(formatCells(row.map((cell) => cell[lineIndex] || '')))
        }
    }

    return lines.join('\n')
}

function toJsonEntry(config: PamConfigurationListRow | PamConfigurationDetail): PamConfigurationJsonEntry {
    const entry: PamConfigurationJsonEntry = {
        uid: config.uid,
        name: config.name,
        config_type: config.configType,
        shared_folder_uid: config.sharedFolderUid,
        shared_folder_name: config.sharedFolderName,
        gateway_uid: config.gatewayUid,
        resource_record_uids: config.resourceRecordUids,
    }
    if ('fields' in config && config.fields) {
        entry.fields = config.fields.map((field) => ({
            type: field.type,
            label: field.label,
            values: field.values,
        }))
    }
    return entry
}

export function formatPamConfigurationsJson(
    result: ListPamConfigurationsResult,
    options: ListPamConfigurationsOptions = {}
): string {
    const verbose = options.verbose === true
    const payload: PamConfigurationsJsonPayload = {}

    if (result.detail) {
        payload.configuration = {
            ...toJsonEntry(result.detail),
            fields: result.detail.fields.map((field) => ({
                type: field.type,
                label: field.label,
                values: field.values,
            })),
        }
    } else {
        payload.configurations = result.configurations.map((config) => {
            const entry = toJsonEntry(config)
            if (!verbose) delete entry.fields
            return entry
        })
    }

    if (result.warnings.length) payload.warnings = result.warnings
    if (result.message) payload.message = result.message

    return JSON.stringify(payload, null, 2)
}

export function formatPamConfigurationsOutput(
    result: ListPamConfigurationsResult,
    options: ListPamConfigurationsOptions = {}
): string {
    const format = String(options.format || PamConfigListFormat.Table).toLowerCase()
    if (format === PamConfigListFormat.Json) return formatPamConfigurationsJson(result, options)

    const parts: string[] = []
    for (const warning of result.warnings) {
        parts.push(`Warning: ${warning}`)
    }
    if (result.message && result.configurations.length === 0 && !result.detail) {
        parts.push(result.message)
        return parts.join('\n')
    }
    if (result.detail) {
        parts.push(formatPamConfigurationDetail(result.detail, { verbose: options.verbose }))
        return parts.join('\n')
    }
    parts.push(
        renderPamConfigurationsAsciiTable(formatPamConfigurationsTable(result, { verbose: options.verbose }))
    )
    return parts.join('\n')
}

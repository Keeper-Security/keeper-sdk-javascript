import {
    AuditOutputFormat,
    AuditReportFormat,
    AuditReportOrder,
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import type { AuditReportFilter, AuditReportOptions } from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { formatAuditReportResult } from '../utils/reportFormat'

async function promptAuditFilters(): Promise<AuditReportFilter | undefined> {
    const filter: AuditReportFilter = {}

    const created = (await prompt('Created filter (e.g. last_7_days, >=2024-01-01, Enter to skip): ')).trim()
    if (created) filter.created = created

    const eventType = (await prompt('Event type filter (name or id, comma-separated, Enter to skip): ')).trim()
    if (eventType) {
        const values = eventType.split(',').map((v) => v.trim()).filter(Boolean)
        filter.eventType =
            values.length === 1
                ? /^\d+$/.test(values[0])
                    ? Number.parseInt(values[0], 10)
                    : values[0]
                : values.map((v) => (/^\d+$/.test(v) ? Number.parseInt(v, 10) : v))
    }

    const username = (await prompt('Username filter (Enter to skip): ')).trim()
    if (username) filter.username = username

    const toUsername = (await prompt('To-username filter (Enter to skip): ')).trim()
    if (toUsername) filter.toUsername = toUsername

    const ipAddress = (await prompt('IP address filter (comma-separated, Enter to skip): ')).trim()
    if (ipAddress) {
        const values = ipAddress.split(',').map((v) => v.trim()).filter(Boolean)
        filter.ipAddress = values.length === 1 ? values[0] : values
    }

    const recordUid = (await prompt('Record UID filter (Enter to skip): ')).trim()
    if (recordUid) filter.recordUid = recordUid

    const sharedFolderUid = (await prompt('Shared folder UID filter (Enter to skip): ')).trim()
    if (sharedFolderUid) filter.sharedFolderUid = sharedFolderUid

    const geoLocation = (await prompt('Geo location filter (city, region, country, Enter to skip): ')).trim()
    if (geoLocation) filter.geoLocation = geoLocation

    const deviceType = (await prompt('Device type filter (type[,version], Enter to skip): ')).trim()
    if (deviceType) filter.deviceType = deviceType

    const parentId = (await prompt('Parent node ID filter (Enter to skip): ')).trim()
    if (parentId) {
        const values = parentId.split(',').map((v) => v.trim()).filter(Boolean)
        filter.parentId =
            values.length === 1
                ? Number.parseInt(values[0], 10)
                : values.map((v) => Number.parseInt(v, 10))
    }

    return Object.keys(filter).length > 0 ? filter : undefined
}

async function auditReportExample() {
    const vault = await login()

    try {
        const reportType = (await prompt('Report type [raw/dim/hour/day/week/month/span]: ')).trim().toLowerCase()
        if (!reportType) {
            logger.error('Report type is required.')
            process.exitCode = 1
            return
        }

        const options: AuditReportOptions = {
            reportType: reportType as AuditReportOptions['reportType'],
        }

        if (reportType === 'raw') {
            const formatRaw = (await prompt('Report format [message/fields, default message]: ')).trim().toLowerCase()
            if (formatRaw === 'fields') options.reportFormat = AuditReportFormat.Fields

            options.filter = await promptAuditFilters()

            const timezone = (await prompt('Timezone (e.g. America/Los_Angeles, Enter for default): ')).trim()
            if (timezone) options.timezone = timezone

            const limitRaw = (await prompt('Limit (Enter for default, -1 for all raw rows): ')).trim()
            if (limitRaw) {
                const parsed = Number.parseInt(limitRaw, 10)
                if (!Number.isFinite(parsed) || parsed === 0 || parsed < -1) {
                    logger.error('Limit must be a positive number or -1.')
                    process.exitCode = 1
                    return
                }
                options.limit = parsed
            }

            const orderRaw = (await prompt('Order [asc/desc, Enter for desc]: ')).trim().toLowerCase()
            if (orderRaw === 'asc') options.order = AuditReportOrder.Asc
            else if (orderRaw === 'desc') options.order = AuditReportOrder.Desc
        } else if (reportType === 'dim') {
            const column = (await prompt('Dimension column (e.g. audit_event_type): ')).trim()
            if (!column) {
                logger.error('Dimension column is required.')
                process.exitCode = 1
                return
            }
            options.columns = [column]
        } else {
            const columnsRaw = (await prompt('Columns (comma-separated, e.g. username): ')).trim()
            if (!columnsRaw) {
                logger.error('Columns are required for summary reports.')
                process.exitCode = 1
                return
            }
            options.columns = columnsRaw.split(',').map((v) => v.trim()).filter(Boolean)

            const aggregatesRaw = (
                await prompt('Aggregates [occurrences/first_created/last_created, comma-separated, Enter for occurrences]: ')
            )
                .trim()
                .toLowerCase()
            if (aggregatesRaw) {
                options.aggregates = aggregatesRaw.split(',').map((v) => v.trim()).filter(Boolean) as AuditReportOptions['aggregates']
            }

            options.filter = await promptAuditFilters()

            const timezone = (await prompt('Timezone (e.g. America/Los_Angeles, Enter for default): ')).trim()
            if (timezone) options.timezone = timezone

            const limitRaw = (await prompt('Limit (Enter for default): ')).trim()
            if (limitRaw) {
                const parsed = Number.parseInt(limitRaw, 10)
                if (!Number.isFinite(parsed) || parsed < 0) {
                    logger.error('Limit must be a non-negative number.')
                    process.exitCode = 1
                    return
                }
                options.limit = parsed
            }

            const orderRaw = (await prompt('Order [asc/desc, Enter for default]: ')).trim().toLowerCase()
            if (orderRaw === 'asc') options.order = AuditReportOrder.Asc
            else if (orderRaw === 'desc') options.order = AuditReportOrder.Desc
        }

        const outputRaw = (await prompt('Output format [table/json/csv, default table]: ')).trim().toLowerCase()
        let outputFormat = AuditOutputFormat.Table
        if (outputRaw === 'json') outputFormat = AuditOutputFormat.Json
        else if (outputRaw === 'csv') outputFormat = AuditOutputFormat.Csv

        const restore = suppressLogs()
        let result
        try {
            result = await vault.runAuditReport(options)
        } finally {
            restore()
        }

        logger.info('')
        logger.info(formatAuditReportResult(result, outputFormat))
        logger.info('')
        logger.info(`Rows: ${result.rows.length}`)
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(auditReportExample)

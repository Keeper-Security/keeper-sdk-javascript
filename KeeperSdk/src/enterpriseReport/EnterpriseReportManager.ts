import type { Auth } from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes } from '../utils'
import {
    formatAuditReportResult,
    renderAuditReportTable,
    runAuditReport,
} from './auditReport'
import {
    formatActionReportResult,
    renderActionReportTable,
    runActionReport,
} from './actionReport'
import type {
    ActionReportOptions,
    ActionReportResult,
    AuditReportOptions,
    AuditReportResult,
    FormatActionReportOptions,
    FormatAuditReportOptions,
    FormattedActionReportTable,
    FormattedAuditReportTable,
} from './reportTypes'
import type { AuthProvider } from './reportUtils'

export class EnterpriseReportManager {
    private readonly authProvider: AuthProvider

    constructor(authProvider: AuthProvider) {
        this.authProvider = authProvider
    }

    public async runAuditReport(options: AuditReportOptions = {}): Promise<AuditReportResult> {
        return runAuditReport(this.requireAuth(), options)
    }

    public formatAuditReportResult(
        result: AuditReportResult,
        options: FormatAuditReportOptions = {}
    ): FormattedAuditReportTable {
        return formatAuditReportResult(result, options)
    }

    public renderAuditReportTable(table: FormattedAuditReportTable): string {
        return renderAuditReportTable(table)
    }

    public async runActionReport(options: ActionReportOptions = {}): Promise<ActionReportResult> {
        return runActionReport(this.requireAuth(), options)
    }

    public formatActionReportResult(
        result: ActionReportResult,
        options: FormatActionReportOptions = {}
    ): FormattedActionReportTable {
        return formatActionReportResult(result, options)
    }

    public renderActionReportTable(table: FormattedActionReportTable): string {
        return renderActionReportTable(table)
    }

    private requireAuth(): Auth {
        const auth = this.authProvider()
        if (!auth) {
            throw new KeeperSdkError('You are not logged in. Please log in first.', ResultCodes.NOT_LOGGED_IN)
        }
        return auth
    }
}

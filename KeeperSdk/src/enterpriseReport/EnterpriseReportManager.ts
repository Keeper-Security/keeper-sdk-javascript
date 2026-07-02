import type { Auth } from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes } from '../utils'
import { runAuditReport } from './auditReport'
import { runActionReport } from './actionReport'
import type {
    ActionReportOptions,
    ActionReportResult,
    AuditReportOptions,
    AuditReportResult,
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

    public async runActionReport(options: ActionReportOptions = {}): Promise<ActionReportResult> {
        return runActionReport(this.requireAuth(), options)
    }

    private requireAuth(): Auth {
        const auth = this.authProvider()
        if (!auth) {
            throw new KeeperSdkError('You are not logged in. Please log in first.', ResultCodes.NOT_LOGGED_IN)
        }
        return auth
    }
}

import type { Auth } from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes } from '../utils'
import {
    formatTeamsTable,
    listTeams,
    renderTeamsAsciiTable,
    type FormatTeamsTableOptions,
    type FormattedTeamsTable,
    type ListTeamRow,
    type ListTeamsOptions,
} from './listTeams'
import {
    formatTeamView,
    teamViewTable,
    viewTeam,
    type FormatTeamViewOptions,
    type FormattedTeamViewTable,
    type TeamView,
} from './viewTeam'

export type AuthProvider = () => Auth

export class TeamManager {
    private readonly authProvider: AuthProvider

    constructor(authProvider: AuthProvider) {
        this.authProvider = authProvider
    }

    public async listTeams(options: ListTeamsOptions = {}): Promise<ListTeamRow[]> {
        return listTeams(this.requireAuth(), options)
    }

    public formatTeamsTable(rows: ListTeamRow[], options: FormatTeamsTableOptions = {}): FormattedTeamsTable {
        return formatTeamsTable(rows, options)
    }

    public renderTeamsAsciiTable(table: FormattedTeamsTable, options: { minColWidth?: number } = {}): string {
        return renderTeamsAsciiTable(table, options)
    }

    public async viewTeam(identifier: string): Promise<TeamView> {
        return viewTeam(this.requireAuth(), identifier)
    }

    public formatTeamView(view: TeamView, options: FormatTeamViewOptions = {}): FormattedTeamViewTable {
        return formatTeamView(view, options)
    }

    public teamViewTable(table: FormattedTeamViewTable): string {
        return teamViewTable(table)
    }

    private requireAuth(): Auth {
        const auth = this.authProvider()
        if (!auth) {
            throw new KeeperSdkError('You are not logged in. Please log in first.', ResultCodes.NOT_LOGGED_IN)
        }
        return auth
    }
}

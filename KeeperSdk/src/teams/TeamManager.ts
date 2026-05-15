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
import {
    addTeams,
    formatAddTeamResult,
    renderAddTeamAsciiTable,
    type AddTeamInput,
    type AddTeamResult,
    type FormatAddTeamResultOptions,
    type FormattedAddTeamTable,
} from './addTeam'
import {
    formatUpdateTeamResult,
    renderUpdateTeamAsciiTable,
    updateTeams,
    type FormattedUpdateTeamTable,
    type UpdateTeamInput,
    type UpdateTeamResult,
} from './updateTeam'
import {
    deleteTeams,
    formatDeleteTeamResult,
    renderDeleteTeamAsciiTable,
    type DeleteTeamInput,
    type DeleteTeamResult,
    type FormattedDeleteTeamTable,
} from './deleteTeam'

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

    public async addTeams(input: AddTeamInput): Promise<AddTeamResult> {
        return addTeams(this.requireAuth(), input)
    }

    public formatAddTeamResult(
        result: AddTeamResult,
        options: FormatAddTeamResultOptions = {}
    ): FormattedAddTeamTable {
        return formatAddTeamResult(result, options)
    }

    public renderAddTeamAsciiTable(table: FormattedAddTeamTable): string {
        return renderAddTeamAsciiTable(table)
    }

    public async updateTeams(input: UpdateTeamInput): Promise<UpdateTeamResult> {
        return updateTeams(this.requireAuth(), input)
    }

    public formatUpdateTeamResult(result: UpdateTeamResult): FormattedUpdateTeamTable {
        return formatUpdateTeamResult(result)
    }

    public renderUpdateTeamAsciiTable(table: FormattedUpdateTeamTable): string {
        return renderUpdateTeamAsciiTable(table)
    }

    public async deleteTeams(input: DeleteTeamInput): Promise<DeleteTeamResult> {
        return deleteTeams(this.requireAuth(), input)
    }

    public formatDeleteTeamResult(result: DeleteTeamResult): FormattedDeleteTeamTable {
        return formatDeleteTeamResult(result)
    }

    public renderDeleteTeamAsciiTable(table: FormattedDeleteTeamTable): string {
        return renderDeleteTeamAsciiTable(table)
    }

    private requireAuth(): Auth {
        const auth = this.authProvider()
        if (!auth) {
            throw new KeeperSdkError('You are not logged in. Please log in first.', ResultCodes.NOT_LOGGED_IN)
        }
        return auth
    }
}

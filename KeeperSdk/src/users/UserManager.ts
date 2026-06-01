import type { Auth } from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes } from '../utils'
import { addUsers, formatAddUserResult, renderAddUserAsciiTable } from './addUser'
import { updateUsers, formatUpdateUserResult, renderUpdateUserAsciiTable } from './updateUser'
import { deleteUsers, formatDeleteUserResult, renderDeleteUserAsciiTable } from './deleteUser'
import { actionUsers, formatUserActionResult, renderUserActionAsciiTable } from './actionUser'
import { aliasUser } from './aliasUser'
import { addUsersToTeams, removeUsersFromTeams, formatTeamUserResult, renderTeamUserAsciiTable } from './teamUser'
import { listUsers, formatUsersTable, renderUsersAsciiTable } from './listUsers'
import { viewUser, formatUserView, userViewTable } from './viewUser'
import type {
    UserColumnInput,
    ListUsersOptions,
    ListUserRow,
    FormattedUsersTable,
    FormatUsersTableOptions,
    UserView,
    FormatUserViewOptions,
    FormattedUserViewTable,
    AddUserInput,
    AddUserResult,
    FormatAddUserResultOptions,
    FormattedAddUserTable,
    UpdateUserInput,
    UpdateUserResult,
    FormattedUpdateUserTable,
    DeleteUserInput,
    DeleteUserResult,
    FormattedDeleteUserTable,
    UserActionInput,
    UserActionResult,
    FormattedUserActionTable,
    AliasUserInput,
    AliasUserResult,
    AddUsersToTeamsInput,
    RemoveUsersFromTeamsInput,
    TeamUserResult,
    FormattedTeamUserTable,
} from './userTypes'

export type AuthProvider = () => Auth

export class UserManager {
    private readonly authProvider: AuthProvider

    constructor(authProvider: AuthProvider) {
        this.authProvider = authProvider
    }

    public async listUsers(options: ListUsersOptions = {}): Promise<ListUserRow[]> {
        return listUsers(this.requireAuth(), options)
    }

    public formatUsersTable(rows: ListUserRow[], options: FormatUsersTableOptions = {}): FormattedUsersTable {
        return formatUsersTable(rows, options)
    }

    public renderUsersAsciiTable(table: FormattedUsersTable, options: { minColWidth?: number } = {}): string {
        return renderUsersAsciiTable(table, options)
    }

    public async viewUser(identifier: string): Promise<UserView> {
        return viewUser(this.requireAuth(), identifier)
    }

    public formatUserView(view: UserView, options: FormatUserViewOptions = {}): FormattedUserViewTable {
        return formatUserView(view, options)
    }

    public userViewTable(table: FormattedUserViewTable): string {
        return userViewTable(table)
    }

    public async addUsers(input: AddUserInput): Promise<AddUserResult> {
        return addUsers(this.requireAuth(), input)
    }

    public formatAddUserResult(result: AddUserResult, options: FormatAddUserResultOptions = {}): FormattedAddUserTable {
        return formatAddUserResult(result, options)
    }

    public renderAddUserAsciiTable(table: FormattedAddUserTable): string {
        return renderAddUserAsciiTable(table)
    }

    public async updateUsers(input: UpdateUserInput): Promise<UpdateUserResult> {
        return updateUsers(this.requireAuth(), input)
    }

    public formatUpdateUserResult(result: UpdateUserResult): FormattedUpdateUserTable {
        return formatUpdateUserResult(result)
    }

    public renderUpdateUserAsciiTable(table: FormattedUpdateUserTable): string {
        return renderUpdateUserAsciiTable(table)
    }

    public async deleteUsers(input: DeleteUserInput): Promise<DeleteUserResult> {
        return deleteUsers(this.requireAuth(), input)
    }

    public formatDeleteUserResult(result: DeleteUserResult): FormattedDeleteUserTable {
        return formatDeleteUserResult(result)
    }

    public renderDeleteUserAsciiTable(table: FormattedDeleteUserTable): string {
        return renderDeleteUserAsciiTable(table)
    }

    public async actionUsers(input: UserActionInput): Promise<UserActionResult> {
        return actionUsers(this.requireAuth(), input)
    }

    public formatUserActionResult(result: UserActionResult): FormattedUserActionTable {
        return formatUserActionResult(result)
    }

    public renderUserActionAsciiTable(table: FormattedUserActionTable): string {
        return renderUserActionAsciiTable(table)
    }

    public async aliasUser(input: AliasUserInput): Promise<AliasUserResult> {
        return aliasUser(this.requireAuth(), input)
    }

    public async addUsersToTeams(input: AddUsersToTeamsInput): Promise<TeamUserResult> {
        return addUsersToTeams(this.requireAuth(), input)
    }

    public async removeUsersFromTeams(input: RemoveUsersFromTeamsInput): Promise<TeamUserResult> {
        return removeUsersFromTeams(this.requireAuth(), input)
    }

    public formatTeamUserResult(result: TeamUserResult): FormattedTeamUserTable {
        return formatTeamUserResult(result)
    }

    public renderTeamUserAsciiTable(table: FormattedTeamUserTable): string {
        return renderTeamUserAsciiTable(table)
    }

    private requireAuth(): Auth {
        const auth = this.authProvider()
        if (!auth) {
            throw new KeeperSdkError('You are not logged in. Please log in first.', ResultCodes.NOT_LOGGED_IN)
        }
        return auth
    }
}
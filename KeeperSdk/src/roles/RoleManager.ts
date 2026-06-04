import type { Auth } from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes } from '../utils'
import { EnterpriseDataManager } from '../teams/enterpriseData'
import { formatRolesTable, listRoles, renderRolesAsciiTable } from './listRoles'
import type {
    FormatRolesTableOptions,
    FormattedRolesTable,
    ListRoleRow,
    ListRolesOptions,
} from './roleTypes'
import {
    formatRoleView,
    roleViewTable,
    viewRole,
    type FormatRoleViewOptions,
    type FormattedRoleViewTable,
    type RoleView,
} from './viewRole'
import {
    addRoles,
    formatAddRoleResult,
    renderAddRoleAsciiTable,
    type AddRoleInput,
    type AddRoleResult,
    type FormattedAddRoleTable,
} from './addRole'
import {
    updateRoles,
    formatUpdateRoleResult,
    renderUpdateRoleAsciiTable,
    type UpdateRoleInput,
    type UpdateRoleResult,
    type FormattedUpdateRoleTable,
} from './updateRole'
import {
    deleteRoles,
    formatDeleteRoleResult,
    renderDeleteRoleAsciiTable,
    type DeleteRoleInput,
    type DeleteRoleResult,
    type FormattedDeleteRoleTable,
} from './deleteRole'

export type AuthProvider = () => Auth

export class RoleManager {
    private readonly authProvider: AuthProvider
    private enterpriseData: EnterpriseDataManager | null = null

    constructor(authProvider: AuthProvider) {
        this.authProvider = authProvider
    }

    public async listRoles(options: ListRolesOptions = {}): Promise<ListRoleRow[]> {
        return listRoles(this.requireAuth(), {
            ...options,
            enterpriseData: options.enterpriseData ?? this.getEnterpriseData(),
        })
    }

    public formatRolesTable(rows: ListRoleRow[], options: FormatRolesTableOptions = {}): FormattedRolesTable {
        return formatRolesTable(rows, options)
    }

    public renderRolesAsciiTable(
        table: FormattedRolesTable,
        options: { minColWidth?: number } = {}
    ): string {
        return renderRolesAsciiTable(table, options)
    }

    public async viewRole(identifier: string): Promise<RoleView> {
        return viewRole(this.requireAuth(), identifier)
    }

    public formatRoleView(view: RoleView, options: FormatRoleViewOptions = {}): FormattedRoleViewTable {
        return formatRoleView(view, options)
    }

    public roleViewTable(table: FormattedRoleViewTable): string {
        return roleViewTable(table)
    }

    public async addRoles(input: AddRoleInput): Promise<AddRoleResult> {
        const result = await addRoles(this.requireAuth(), input)
        if (result.created > 0) this.invalidateEnterpriseData()
        return result
    }

    public formatAddRoleResult(result: AddRoleResult): FormattedAddRoleTable {
        return formatAddRoleResult(result)
    }

    public renderAddRoleAsciiTable(table: FormattedAddRoleTable): string {
        return renderAddRoleAsciiTable(table)
    }

    public async updateRoles(input: UpdateRoleInput): Promise<UpdateRoleResult> {
        const result = await updateRoles(this.requireAuth(), input)
        if (result.updated > 0) this.invalidateEnterpriseData()
        return result
    }

    public formatUpdateRoleResult(result: UpdateRoleResult): FormattedUpdateRoleTable {
        return formatUpdateRoleResult(result)
    }

    public renderUpdateRoleAsciiTable(table: FormattedUpdateRoleTable): string {
        return renderUpdateRoleAsciiTable(table)
    }

    public async deleteRoles(input: DeleteRoleInput): Promise<DeleteRoleResult> {
        const result = await deleteRoles(this.requireAuth(), input)
        if (result.deleted > 0) this.invalidateEnterpriseData()
        return result
    }

    public formatDeleteRoleResult(result: DeleteRoleResult): FormattedDeleteRoleTable {
        return formatDeleteRoleResult(result)
    }

    public renderDeleteRoleAsciiTable(table: FormattedDeleteRoleTable): string {
        return renderDeleteRoleAsciiTable(table)
    }

    private getEnterpriseData(): EnterpriseDataManager {
        if (!this.enterpriseData) {
            this.enterpriseData = new EnterpriseDataManager(this.requireAuth())
        }
        return this.enterpriseData
    }

    private invalidateEnterpriseData(): void {
        this.enterpriseData?.clearCache()
    }

    private requireAuth(): Auth {
        const auth = this.authProvider()
        if (!auth) {
            throw new KeeperSdkError('You are not logged in. Please log in first.', ResultCodes.NOT_LOGGED_IN)
        }
        return auth
    }
}

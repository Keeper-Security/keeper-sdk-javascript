import type { Auth } from "@keeper-security/keeperapi";
import { KeeperSdkError, ResultCodes } from "../utils";
import { EnterpriseDataManager } from "../teams/enterpriseData";
import {
  formatRolesTable,
  listRoles,
  renderRolesAsciiTable,
} from "./listRoles";
import type {
  FormatRolesTableOptions,
  FormattedRolesTable,
  ListRoleRow,
  ListRolesOptions,
} from "./roleTypes";
import {
  formatRoleView,
  roleViewTable,
  viewRole,
  type FormatRoleViewOptions,
  type FormattedRoleViewTable,
  type RoleView,
} from "./viewRole";
import {
  addRoles,
  formatAddRoleResult,
  renderAddRoleAsciiTable,
  type AddRoleInput,
  type AddRoleResult,
  type FormattedAddRoleTable,
} from "./addRole";
import {
  updateRoles,
  formatUpdateRoleResult,
  renderUpdateRoleAsciiTable,
  type UpdateRoleInput,
  type UpdateRoleResult,
  type FormattedUpdateRoleTable,
} from "./updateRole";
import {
  deleteRoles,
  formatDeleteRoleResult,
  renderDeleteRoleAsciiTable,
  type DeleteRoleInput,
  type DeleteRoleResult,
  type FormattedDeleteRoleTable,
} from "./deleteRole";
import {
  setRoleEnforcements,
  formatSetRoleEnforcementsResult,
  renderRoleEnforcementAsciiTable,
  type SetRoleEnforcementsInput,
  type SetRoleEnforcementsResult,
  type FormattedRoleEnforcementTable,
} from "./roleEnforcement";
import {
  copyRoles,
  formatCopyRoleResult,
  renderCopyRoleAsciiTable,
  type CopyRoleInput,
  type CopyRoleResult,
  type FormattedCopyRoleTable,
} from "./copyRole";
import {
  addUsersToRoles,
  removeUsersFromRoles,
  formatRoleUserResult,
  renderRoleUserAsciiTable,
  type AddUsersToRolesInput,
  type RemoveUsersFromRolesInput,
  type RoleUserResult,
  type FormattedRoleUserTable,
} from "./roleUser";
import {
  manageRoleNodes,
  formatManageRoleNodesResult,
  renderManageRoleNodesAsciiTable,
  type ManageRoleNodesInput,
  type ManageRoleNodesResult,
  type FormattedManageRoleNodesTable,
} from "./manageNode";
import {
  changeRolePrivileges,
  formatChangeRolePrivilegesResult,
  renderChangeRolePrivilegesAsciiTable,
  type ChangeRolePrivilegesInput,
  type ChangeRolePrivilegesResult,
  type FormattedRolePrivilegeTable,
} from "./rolePrivilege";

export type AuthProvider = () => Auth;

export class RoleManager {
  private readonly authProvider: AuthProvider;
  private enterpriseData: EnterpriseDataManager | null = null;

  constructor(authProvider: AuthProvider) {
    this.authProvider = authProvider;
  }

  public async listRoles(
    options: ListRolesOptions = {},
  ): Promise<ListRoleRow[]> {
    return listRoles(this.requireAuth(), {
      ...options,
      enterpriseData: options.enterpriseData ?? this.getEnterpriseData(),
    });
  }

  public formatRolesTable(
    rows: ListRoleRow[],
    options: FormatRolesTableOptions = {},
  ): FormattedRolesTable {
    return formatRolesTable(rows, options);
  }

  public renderRolesAsciiTable(
    table: FormattedRolesTable,
    options: { minColWidth?: number } = {},
  ): string {
    return renderRolesAsciiTable(table, options);
  }

  public async viewRole(identifier: string): Promise<RoleView> {
    return viewRole(this.requireAuth(), identifier);
  }

  public formatRoleView(
    view: RoleView,
    options: FormatRoleViewOptions = {},
  ): FormattedRoleViewTable {
    return formatRoleView(view, options);
  }

  public roleViewTable(table: FormattedRoleViewTable): string {
    return roleViewTable(table);
  }

  public async addRoles(input: AddRoleInput): Promise<AddRoleResult> {
    const result = await addRoles(this.requireAuth(), input);
    if (result.created > 0) this.invalidateEnterpriseData();
    return result;
  }

  public formatAddRoleResult(result: AddRoleResult): FormattedAddRoleTable {
    return formatAddRoleResult(result);
  }

  public renderAddRoleAsciiTable(table: FormattedAddRoleTable): string {
    return renderAddRoleAsciiTable(table);
  }

  public async updateRoles(input: UpdateRoleInput): Promise<UpdateRoleResult> {
    const result = await updateRoles(this.requireAuth(), input);
    if (result.updated > 0) this.invalidateEnterpriseData();
    return result;
  }

  public formatUpdateRoleResult(
    result: UpdateRoleResult,
  ): FormattedUpdateRoleTable {
    return formatUpdateRoleResult(result);
  }

  public renderUpdateRoleAsciiTable(table: FormattedUpdateRoleTable): string {
    return renderUpdateRoleAsciiTable(table);
  }

  public async deleteRoles(input: DeleteRoleInput): Promise<DeleteRoleResult> {
    const result = await deleteRoles(this.requireAuth(), input);
    if (result.deleted > 0) this.invalidateEnterpriseData();
    return result;
  }

  public formatDeleteRoleResult(
    result: DeleteRoleResult,
  ): FormattedDeleteRoleTable {
    return formatDeleteRoleResult(result);
  }

  public renderDeleteRoleAsciiTable(table: FormattedDeleteRoleTable): string {
    return renderDeleteRoleAsciiTable(table);
  }

  public async setRoleEnforcements(
    input: SetRoleEnforcementsInput,
  ): Promise<SetRoleEnforcementsResult> {
    const result = await setRoleEnforcements(this.requireAuth(), input);
    if (result.applied > 0) this.invalidateEnterpriseData();
    return result;
  }

  public formatSetRoleEnforcementsResult(
    result: SetRoleEnforcementsResult,
  ): FormattedRoleEnforcementTable {
    return formatSetRoleEnforcementsResult(result);
  }

  public renderRoleEnforcementAsciiTable(
    table: FormattedRoleEnforcementTable,
  ): string {
    return renderRoleEnforcementAsciiTable(table);
  }

  public async copyRoles(input: CopyRoleInput): Promise<CopyRoleResult> {
    const result = await copyRoles(this.requireAuth(), input);
    if (result.success) this.invalidateEnterpriseData();
    return result;
  }

  public formatCopyRoleResult(result: CopyRoleResult): FormattedCopyRoleTable {
    return formatCopyRoleResult(result);
  }

  public renderCopyRoleAsciiTable(table: FormattedCopyRoleTable): string {
    return renderCopyRoleAsciiTable(table);
  }

  public async addUsersToRoles(
    input: AddUsersToRolesInput,
  ): Promise<RoleUserResult> {
    const result = await addUsersToRoles(this.requireAuth(), input);
    if (result.succeeded > 0) this.invalidateEnterpriseData();
    return result;
  }

  public async removeUsersFromRoles(
    input: RemoveUsersFromRolesInput,
  ): Promise<RoleUserResult> {
    const result = await removeUsersFromRoles(this.requireAuth(), input);
    if (result.succeeded > 0) this.invalidateEnterpriseData();
    return result;
  }

  public formatRoleUserResult(result: RoleUserResult): FormattedRoleUserTable {
    return formatRoleUserResult(result);
  }

  public renderRoleUserAsciiTable(table: FormattedRoleUserTable): string {
    return renderRoleUserAsciiTable(table);
  }

  public async manageRoleNodes(
    input: ManageRoleNodesInput,
  ): Promise<ManageRoleNodesResult> {
    const result = await manageRoleNodes(this.requireAuth(), input);
    if (result.succeeded > 0) this.invalidateEnterpriseData();
    return result;
  }

  public formatManageRoleNodesResult(
    result: ManageRoleNodesResult,
  ): FormattedManageRoleNodesTable {
    return formatManageRoleNodesResult(result);
  }

  public renderManageRoleNodesAsciiTable(
    table: FormattedManageRoleNodesTable,
  ): string {
    return renderManageRoleNodesAsciiTable(table);
  }

  public async changeRolePrivileges(
    input: ChangeRolePrivilegesInput,
  ): Promise<ChangeRolePrivilegesResult> {
    const result = await changeRolePrivileges(this.requireAuth(), input);
    if (result.succeeded > 0) this.invalidateEnterpriseData();
    return result;
  }

  public formatChangeRolePrivilegesResult(
    result: ChangeRolePrivilegesResult,
  ): FormattedRolePrivilegeTable {
    return formatChangeRolePrivilegesResult(result);
  }

  public renderChangeRolePrivilegesAsciiTable(
    table: FormattedRolePrivilegeTable,
  ): string {
    return renderChangeRolePrivilegesAsciiTable(table);
  }

  private getEnterpriseData(): EnterpriseDataManager {
    if (!this.enterpriseData) {
      this.enterpriseData = new EnterpriseDataManager(this.requireAuth());
    }
    return this.enterpriseData;
  }

  private invalidateEnterpriseData(): void {
    this.enterpriseData?.clearCache();
  }

  private requireAuth(): Auth {
    const auth = this.authProvider();
    if (!auth) {
      throw new KeeperSdkError(
        "You are not logged in. Please log in first.",
        ResultCodes.NOT_LOGGED_IN,
      );
    }
    return auth;
  }
}

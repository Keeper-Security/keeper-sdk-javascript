import type { Auth } from "@keeper-security/keeperapi";
import type { InMemoryStorage } from "../storage/InMemoryStorage";
import { KeeperSdkError, ResultCodes } from "../utils";
import {
  formatListNsfOutput,
  formatListNsfTable,
  listNestedShareFolders,
  renderListNsfAsciiTable,
} from "./listNsf";
import {
  formatNsfDetail as renderNsfDetail,
  formatNsfFolderDetail as renderNsfFolderDetail,
  formatNsfRecordDetail as renderNsfRecordDetail,
  getNestedShareFolder,
} from "./getNsf";
import { linkNestedShareRecord } from "./linkNsfRecord";
import {
  formatRemoveNsfPreview,
  removeNestedShareRecords,
} from "./removeNsfRecord";
import { mkdirNestedShareFolder } from "./mkdirNsf";
import {
  updateNestedShareFolder,
  updateNestedShareFolders,
} from "./updateNsfFolder";
import {
  shareNestedShareFolder,
  shareNestedShareRecord,
  formatNsfRecordSharePlan,
  formatNsfRecordShareResults,
} from "./nsfShare";
import {
  listNsfShortcuts,
  keepNsfShortcut,
  formatNsfShortcutOutput,
  formatKeepNsfShortcutPlan,
} from "./nsfShortcut";
import {
  transferNestedShareRecords,
  formatTransferNestedShareRecordResults,
} from "./nsfTransferRecord";
import {
  formatRemoveNsfFolderPreview,
  removeNestedShareFolders,
} from "./removeNsfFolder";
import {
  getNestedShareRecordDetails,
  formatNsfRecordDetailsOutput,
} from "./getNsfRecordDetails";
import {
  updateNestedShareRecords,
  updateNestedShareRecord,
} from "./updateNsfRecord";
import { addNestedShareRecord, addNestedShareRecords } from "./addNsfRecord";
import {
  updateNestedShareRecordPermissions,
  formatNsfRecordPermissionPlan,
  formatNsfRecordPermissionFailures,
} from "./nsfRecordPermission";
import type {
  AddNsfRecordInput,
  AddNsfRecordResult,
  AddNsfRecordsInput,
  AddNsfRecordsResult,
  FormattedListNsfTable,
  GetNsfOptions,
  GetNsfResult,
  GetNsfRecordDetailsInput,
  GetNsfRecordDetailsResult,
  LinkNsfRecordResult,
  ListNsfFormatInput,
  ListNsfOptions,
  ListNsfRow,
  MkdirNsfInput,
  MkdirNsfResult,
  NsfFolderView,
  NsfRecordView,
  RemoveNsfFolderInput,
  RemoveNsfFolderResult,
  RemoveNsfRecordInput,
  RemoveNsfRecordResult,
  UpdateNsfRecordInput,
  UpdateNsfRecordItemInput,
  UpdateNsfRecordsInput,
  UpdateNsfRecordResult,
  UpdateNsfRecordResultItem,
} from "./nsfTypes";
import type {
  UpdateNsfFolderBatchItem,
  UpdateNsfFolderInput,
  UpdateNsfFolderResult,
  UpdateNsfFoldersResult,
} from "./updateNsfFolder";
import type {
  ShareNestedShareFolderInput,
  ShareNestedShareFolderResult,
  ShareNestedShareRecordInput,
  ShareNestedShareRecordResult,
} from "./nsfShare";
import type {
  ListNsfShortcutsOptions,
  NsfShortcutRow,
  KeepNsfShortcutInput,
  KeepNsfShortcutResult,
} from "./nsfShortcut";
import type {
  TransferNestedShareRecordInput,
  TransferNestedShareRecordResult,
} from "./nsfTransferRecord";
import type {
  UpdateNsfRecordPermissionInput,
  UpdateNsfRecordPermissionResult,
} from "./nsfRecordPermission";

export type AuthProvider = () => Auth;

export class NestedShareFolderManager {
  private readonly storage: InMemoryStorage;
  private readonly authProvider: AuthProvider;

  constructor(storage: InMemoryStorage, authProvider: AuthProvider) {
    this.storage = storage;
    this.authProvider = authProvider;
  }

  private requireAuth(): Auth {
    const auth = this.authProvider();
    if (!auth?.sessionToken) {
      throw new KeeperSdkError(
        "Not logged in. Call login() first.",
        ResultCodes.NOT_LOGGED_IN,
      );
    }
    return auth;
  }

  public listNestedShareFolders(options: ListNsfOptions = {}): ListNsfRow[] {
    return listNestedShareFolders(this.storage, options);
  }

  public formatListNsfTable(
    rows: ListNsfRow[],
    options: { columnWidth?: number } = {},
  ): FormattedListNsfTable {
    return formatListNsfTable(rows, options);
  }

  public renderListNsfAsciiTable(
    table: FormattedListNsfTable,
    options: { minColWidth?: number } = {},
  ): string {
    return renderListNsfAsciiTable(table, options);
  }

  public formatListNsfOutput(
    rows: ListNsfRow[],
    format: ListNsfFormatInput = "table",
  ): string {
    return formatListNsfOutput(rows, format);
  }

  public async getNestedShareFolder(
    identifier: string,
    options: GetNsfOptions = {},
  ): Promise<GetNsfResult> {
    return getNestedShareFolder(
      this.storage,
      this.requireAuth(),
      identifier,
      options,
    );
  }

  public formatNsfDetail(result: GetNsfResult, verbose = false): string {
    return renderNsfDetail(result, verbose);
  }

  public formatNsfFolderDetail(view: NsfFolderView, verbose = false): string {
    return renderNsfFolderDetail(view, verbose);
  }

  public formatNsfRecordDetail(view: NsfRecordView, verbose = false): string {
    return renderNsfRecordDetail(view, verbose);
  }

  public async linkNestedShareRecord(
    recordIdentifier: string,
    folderIdentifier: string,
  ): Promise<LinkNsfRecordResult> {
    return linkNestedShareRecord(
      this.storage,
      this.requireAuth(),
      recordIdentifier,
      folderIdentifier,
    );
  }

  public async removeNestedShareRecords(
    input: RemoveNsfRecordInput,
  ): Promise<RemoveNsfRecordResult> {
    return removeNestedShareRecords(this.storage, this.requireAuth(), input);
  }

  public formatRemoveNsfPreview(
    preview: RemoveNsfRecordResult["preview"],
  ): string {
    return formatRemoveNsfPreview(preview);
  }

  public async mkdirNestedShareFolder(
    input: MkdirNsfInput,
  ): Promise<MkdirNsfResult> {
    return mkdirNestedShareFolder(this.storage, this.requireAuth(), input);
  }

  public async updateNestedShareFolder(
    input: UpdateNsfFolderInput,
  ): Promise<UpdateNsfFolderResult> {
    return updateNestedShareFolder(this.storage, this.requireAuth(), input);
  }

  public async updateNestedShareFolders(
    updates: UpdateNsfFolderBatchItem[],
  ): Promise<UpdateNsfFoldersResult> {
    return updateNestedShareFolders(this.storage, this.requireAuth(), updates);
  }

  public async shareNestedShareFolder(
    input: ShareNestedShareFolderInput,
  ): Promise<ShareNestedShareFolderResult> {
    return shareNestedShareFolder(this.storage, this.requireAuth(), input);
  }

  public async shareNestedShareRecord(
    input: ShareNestedShareRecordInput,
  ): Promise<ShareNestedShareRecordResult> {
    return shareNestedShareRecord(this.storage, this.requireAuth(), input);
  }

  public formatNsfRecordSharePlan(
    result: ShareNestedShareRecordResult,
  ): string {
    return formatNsfRecordSharePlan(result.plan);
  }

  public formatNsfRecordShareResults(
    results: ShareNestedShareRecordResult["results"],
  ): string {
    return formatNsfRecordShareResults(results);
  }

  public listNsfShortcuts(
    options: ListNsfShortcutsOptions = {},
  ): NsfShortcutRow[] {
    return listNsfShortcuts(this.storage, options);
  }

  public formatNsfShortcutOutput(
    rows: NsfShortcutRow[],
    format?: ListNsfShortcutsOptions["format"],
  ): string {
    return formatNsfShortcutOutput(rows, format);
  }

  public async keepNsfShortcut(
    input: KeepNsfShortcutInput,
    defaultFolderUid?: string,
  ): Promise<KeepNsfShortcutResult> {
    return keepNsfShortcut(
      this.storage,
      this.requireAuth(),
      input,
      defaultFolderUid,
    );
  }

  public formatKeepNsfShortcutPlan(result: KeepNsfShortcutResult): string {
    return formatKeepNsfShortcutPlan(result.plan);
  }

  public async transferNestedShareRecords(
    input: TransferNestedShareRecordInput,
  ): Promise<TransferNestedShareRecordResult> {
    return transferNestedShareRecords(this.storage, this.requireAuth(), input);
  }

  public formatTransferNestedShareRecordResults(
    results: TransferNestedShareRecordResult["results"],
  ): string {
    return formatTransferNestedShareRecordResults(results);
  }

  public async removeNestedShareFolders(
    input: RemoveNsfFolderInput,
  ): Promise<RemoveNsfFolderResult> {
    return removeNestedShareFolders(this.storage, this.requireAuth(), input);
  }

  public formatRemoveNsfFolderPreview(
    preview: RemoveNsfFolderResult["preview"],
    operation: RemoveNsfFolderResult["operation"],
    quiet?: boolean,
  ): string {
    return formatRemoveNsfFolderPreview(preview, operation, quiet);
  }

  public async getNestedShareRecordDetails(
    input: GetNsfRecordDetailsInput,
  ): Promise<GetNsfRecordDetailsResult> {
    return getNestedShareRecordDetails(this.storage, this.requireAuth(), input);
  }

  public formatNsfRecordDetailsOutput(
    result: GetNsfRecordDetailsResult,
    format?: GetNsfRecordDetailsInput["format"],
  ): string {
    return formatNsfRecordDetailsOutput(result, format);
  }

  public async updateNestedShareRecords(
    input: UpdateNsfRecordInput | UpdateNsfRecordsInput,
  ): Promise<UpdateNsfRecordResult> {
    return updateNestedShareRecords(this.storage, this.requireAuth(), input);
  }

  public async updateNestedShareRecord(
    input: UpdateNsfRecordItemInput,
  ): Promise<UpdateNsfRecordResultItem> {
    return updateNestedShareRecord(this.storage, this.requireAuth(), input);
  }

  public async addNestedShareRecords(
    input: AddNsfRecordsInput,
  ): Promise<AddNsfRecordsResult> {
    return addNestedShareRecords(this.storage, this.requireAuth(), input);
  }

  public async addNestedShareRecord(
    input: AddNsfRecordInput,
  ): Promise<AddNsfRecordResult> {
    return addNestedShareRecord(this.storage, this.requireAuth(), input);
  }

  public async updateNestedShareRecordPermissions(
    input: UpdateNsfRecordPermissionInput,
  ): Promise<UpdateNsfRecordPermissionResult> {
    return updateNestedShareRecordPermissions(
      this.storage,
      this.requireAuth(),
      input,
    );
  }

  public formatNsfRecordPermissionPlan(
    result: UpdateNsfRecordPermissionResult,
  ): string {
    return formatNsfRecordPermissionPlan(result.plan);
  }

  public formatNsfRecordPermissionFailures(
    failures: UpdateNsfRecordPermissionResult["grantFailures"],
    kind: "GRANT" | "REVOKE",
  ): string {
    return formatNsfRecordPermissionFailures(failures, kind);
  }
}

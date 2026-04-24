import type {
  Auth,
  KeeperResponse,
  RestCommand,
} from "@keeper-security/keeperapi";
import { platform, webSafe64FromBytes } from "@keeper-security/keeperapi";
import type {
  DSharedFolder,
  DSharedFolderFolder,
  DUserFolder,
} from "@keeper-security/keeperapi";
import { InMemoryStorage } from "../storage/InMemoryStorage";
import { KeeperSdkError, extractErrorMessage } from "../utils";
import {
  resolveSingleFolder,
  type VaultFolderSession,
} from "./changeDirectory";

export type UpdateFolderInput = {
  folderUid: string;
  /** New display name (required for `user_folder` and `shared_folder_folder` updates). */
  folderName?: string | null;
  /** Shared folders only — omit or `null` to keep existing defaults. */
  manageUsers?: boolean | null;
  manageRecords?: boolean | null;
  canShare?: boolean | null;
  canEdit?: boolean | null;
};

export type UpdateFolderResult = {
  folderUid: string;
  success: boolean;
  message?: string;
};

export type RenameFolderResult = {
  folderUid: string;
  oldName: string;
  newName: string;
  success: boolean;
  message?: string;
};

type ResolvedFolder =
  | { kind: "user_folder"; folder: DUserFolder }
  | { kind: "shared_folder"; folder: DSharedFolder }
  | { kind: "shared_folder_folder"; folder: DSharedFolderFolder };

function folderUpdateCommand(
  request: Record<string, unknown>,
): RestCommand<Record<string, unknown>, KeeperResponse> {
  return {
    baseRequest: { command: "folder_update" },
    request,
    authorization: {},
  };
}

function resolveFolderEntity(
  storage: InMemoryStorage,
  folderUid: string,
): ResolvedFolder | undefined {
  const uf = storage.getByUid<DUserFolder>("user_folder", folderUid);
  if (uf) return { kind: "user_folder", folder: uf };
  const sf = storage.getByUid<DSharedFolder>("shared_folder", folderUid);
  if (sf) return { kind: "shared_folder", folder: sf };
  const sff = storage.getByUid<DSharedFolderFolder>(
    "shared_folder_folder",
    folderUid,
  );
  if (sff) return { kind: "shared_folder_folder", folder: sff };
  return undefined;
}

function mergeFolderData(
  existing: unknown,
  folderName: string | null | undefined,
): Record<string, unknown> {
  const base =
    existing && typeof existing === "object" && !Array.isArray(existing)
      ? { ...(existing as Record<string, unknown>) }
      : {};
  const trimmed = folderName?.trim();
  if (trimmed) {
    base.title = trimmed;
    base.name = trimmed;
  }
  return base;
}

/**
 * Update a folder (`folder_update`): rename and/or shared-folder default permissions.
 * Local storage holds decrypted folder `data`; it is merged, re-encrypted with the folder key, and sent to the server.
 */
export async function updateFolder(
  auth: Auth,
  storage: InMemoryStorage,
  input: UpdateFolderInput,
): Promise<UpdateFolderResult> {
  const folderUid = input.folderUid;
  const resolved = resolveFolderEntity(storage, folderUid);
  if (!resolved) {
    throw new KeeperSdkError(
      `Folder "${folderUid}" does not exist.`,
      "folder_not_found",
    );
  }

  const folderKey = await storage.getKeyBytes(folderUid);
  if (!folderKey) {
    throw new KeeperSdkError(
      "Folder encryption key not available. Sync the vault and try again.",
      "folder_key_missing",
    );
  }

  const nameTrim = input.folderName?.trim() ?? "";

  const hasPerm =
    typeof input.manageUsers === "boolean" ||
    typeof input.manageRecords === "boolean" ||
    typeof input.canShare === "boolean" ||
    typeof input.canEdit === "boolean";

  if (
    resolved.kind === "user_folder" ||
    resolved.kind === "shared_folder_folder"
  ) {
    if (!nameTrim) {
      throw new KeeperSdkError(
        "Folder name is required.",
        "folder_name_required",
      );
    }
  } else if (resolved.kind === "shared_folder") {
    if (!nameTrim && !hasPerm) {
      throw new KeeperSdkError(
        "Provide a new name or at least one permission to update.",
        "shared_folder_update_empty",
      );
    }
  }

  let merged: Record<string, unknown>;
  if (resolved.kind === "shared_folder") {
    const sf = resolved.folder;
    merged = nameTrim
      ? mergeFolderData(sf.data, nameTrim)
      : mergeFolderData(sf.data, sf.name ?? undefined);
  } else if (resolved.kind === "user_folder") {
    merged = mergeFolderData(resolved.folder.data, nameTrim);
  } else {
    merged = mergeFolderData(resolved.folder.data, nameTrim);
  }

  const payloadJson = JSON.stringify(merged);
  const payloadBytes = new TextEncoder().encode(payloadJson);
  const encryptedData = await platform.aesCbcEncrypt(
    payloadBytes,
    folderKey,
    true,
  );

  const rq: Record<string, unknown> = {
    folder_uid: folderUid,
    folder_type: resolved.kind,
    data: webSafe64FromBytes(encryptedData),
  };

  if (resolved.kind === "shared_folder") {
    const sf = resolved.folder;
    const displayName = nameTrim || sf.name || folderUid;
    const nameBytes = new TextEncoder().encode(displayName);
    const encName = await platform.aesCbcEncrypt(nameBytes, folderKey, true);
    rq.shared_folder_uid = folderUid;
    rq.name = webSafe64FromBytes(encName);
    rq.manage_users =
      typeof input.manageUsers === "boolean"
        ? input.manageUsers
        : sf.defaultManageUsers;
    rq.manage_records =
      typeof input.manageRecords === "boolean"
        ? input.manageRecords
        : sf.defaultManageRecords;
    rq.can_edit =
      typeof input.canEdit === "boolean" ? input.canEdit : sf.defaultCanEdit;
    rq.can_share =
      typeof input.canShare === "boolean" ? input.canShare : sf.defaultCanShare;
  } else if (resolved.kind === "shared_folder_folder") {
    rq.shared_folder_uid = resolved.folder.sharedFolderUid;
  }

  try {
    const cmd = folderUpdateCommand(rq);
    const response = await auth.executeRestCommand(cmd);
    const ok =
      response.result === "success" || response.result_code === "success";
    if (!ok) {
      return {
        folderUid,
        success: false,
        message:
          response.message || response.result_code || "folder_update failed",
      };
    }
    return { folderUid, success: true };
  } catch (err) {
    return {
      folderUid,
      success: false,
      message: extractErrorMessage(err),
    };
  }
}

/**
 * Rename a folder by path, name, or UID (CLI `updatedir`). Cannot rename vault root.
 */
export async function renameFolder(
  auth: Auth,
  storage: InMemoryStorage,
  session: VaultFolderSession,
  folderPath: string,
  newName: string,
): Promise<RenameFolderResult> {
  const trimmedPath = folderPath.trim();
  if (!trimmedPath) {
    throw new KeeperSdkError("Folder cannot be empty.", "folder_required");
  }
  const trimmedName = newName.trim();
  if (!trimmedName) {
    throw new KeeperSdkError(
      "New folder name is required.",
      "folder_name_required",
    );
  }

  const resolved = await resolveSingleFolder(storage, session, trimmedPath);
  if (resolved.folderUid === null) {
    throw new KeeperSdkError(
      "Cannot rename the root folder.",
      "folder_root_rename",
    );
  }

  const result = await updateFolder(auth, storage, {
    folderUid: resolved.folderUid,
    folderName: trimmedName,
  });

  return {
    folderUid: resolved.folderUid,
    oldName: resolved.name,
    newName: trimmedName,
    success: result.success,
    message: result.message,
  };
}

/**
 * Update default permissions for a shared folder (SDK-only; no CLI equivalent).
 */
export async function updateSharedFolderPermissions(
  auth: Auth,
  storage: InMemoryStorage,
  sharedFolderUid: string,
  permissions: {
    manageUsers?: boolean | null;
    manageRecords?: boolean | null;
    canShare?: boolean | null;
    canEdit?: boolean | null;
  },
): Promise<UpdateFolderResult> {
  const sf = storage.getByUid<DSharedFolder>("shared_folder", sharedFolderUid);
  if (!sf) {
    throw new KeeperSdkError(
      `"${sharedFolderUid}" is not a shared folder.`,
      "not_shared_folder",
    );
  }
  return updateFolder(auth, storage, {
    folderUid: sharedFolderUid,
    folderName: null,
    ...permissions,
  });
}

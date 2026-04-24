import type {
  Auth,
  KeeperResponse,
  RestCommand,
} from "@keeper-security/keeperapi";
import {
  platform,
  generateEncryptionKey,
  generateUidBytes,
  webSafe64FromBytes,
} from "@keeper-security/keeperapi";
import type {
  DSharedFolder,
  DSharedFolderFolder,
  DUserFolder,
} from "@keeper-security/keeperapi";
import { InMemoryStorage } from "../storage/InMemoryStorage";
import { KeeperSdkError, extractErrorMessage } from "../utils";
import { listFolder } from "./listFolder";
import {
  tryResolvePath,
  splitPathComponents,
  type VaultFolderSession,
} from "./changeDirectory";

export type AddFolderInput = {
  folderName: string;
  /** Create a shared folder (only under a personal `user_folder` parent, including vault root). */
  isSharedFolder?: boolean;
  /** Parent folder UID; omit or `null` for vault root. */
  parentUid?: string | null;
  /** Default permissions for shared folders only. */
  manageUsers?: boolean;
  manageRecords?: boolean;
  canShare?: boolean;
  canEdit?: boolean;
};

export type AddFolderResult = {
  folderUid: string;
  success: boolean;
  message?: string;
};

export type MkdirOptions = {
  /** `-sf` — create a shared folder (only valid for the last segment under a user-folder parent). */
  sharedFolder?: boolean;
  /** `-uf` — force a personal user folder (mutually exclusive with `sharedFolder` when both set). */
  userFolder?: boolean;
  /** `-a` — grant all default shared-folder permissions (manage users/records, edit, share). */
  grantAll?: boolean;
  manageUsers?: boolean;
  manageRecords?: boolean;
  canShare?: boolean;
  canEdit?: boolean;
};

type ParentContext = {
  kind:
    | "virtual_root"
    | "user_folder"
    | "shared_folder"
    | "shared_folder_folder";
  sharedScopeUid: string | null;
};

function folderAddCommand(
  request: Record<string, unknown>,
): RestCommand<Record<string, unknown>, KeeperResponse> {
  return {
    baseRequest: { command: "folder_add" },
    request,
    authorization: {},
  };
}

function resolveParentContext(
  storage: InMemoryStorage,
  parentUid: string | null,
): ParentContext {
  if (parentUid === null || parentUid === "") {
    return { kind: "virtual_root", sharedScopeUid: null };
  }
  if (storage.getByUid<DUserFolder>("user_folder", parentUid)) {
    return { kind: "user_folder", sharedScopeUid: null };
  }
  const sf = storage.getByUid<DSharedFolder>("shared_folder", parentUid);
  if (sf) {
    return { kind: "shared_folder", sharedScopeUid: sf.uid };
  }
  const sff = storage.getByUid<DSharedFolderFolder>(
    "shared_folder_folder",
    parentUid,
  );
  if (sff) {
    return {
      kind: "shared_folder_folder",
      sharedScopeUid: sff.sharedFolderUid,
    };
  }
  throw new KeeperSdkError(
    `Parent folder "${parentUid}" not found`,
    "folder_not_found",
  );
}

function decideNewFolderType(
  parent: ParentContext,
  isSharedFolder: boolean,
): "user_folder" | "shared_folder" | "shared_folder_folder" {
  if (isSharedFolder) {
    if (parent.kind !== "user_folder" && parent.kind !== "virtual_root") {
      throw new KeeperSdkError(
        "Shared folders cannot be nested inside other shared folders.",
        "shared_folder_nested",
      );
    }
    return "shared_folder";
  }
  if (parent.kind === "virtual_root" || parent.kind === "user_folder") {
    return "user_folder";
  }
  return "shared_folder_folder";
}

async function getEncryptionKeyForNewFolder(
  auth: Auth,
  storage: InMemoryStorage,
  folderType: "user_folder" | "shared_folder" | "shared_folder_folder",
  sharedScopeUid: string | null,
): Promise<Uint8Array> {
  if (folderType === "shared_folder_folder") {
    if (!sharedScopeUid) {
      throw new KeeperSdkError(
        "Shared folder scope could not be resolved.",
        "shared_folder_scope_missing",
      );
    }
    const k = await storage.getKeyBytes(sharedScopeUid);
    if (!k) {
      throw new KeeperSdkError(
        "Shared folder encryption key not available. Sync the vault and try again.",
        "shared_folder_key_missing",
      );
    }
    return k;
  }
  if (!auth.dataKey) {
    throw new KeeperSdkError(
      "Data key not available. Ensure you are logged in.",
      "data_key_missing",
    );
  }
  return auth.dataKey;
}

async function findChildFolderUidByName(
  storage: InMemoryStorage,
  parentUid: string | null,
  name: string,
): Promise<string | undefined> {
  const result = await listFolder(storage, {
    folderUid: parentUid === null ? undefined : parentUid,
    showFolders: true,
    showRecords: false,
  });
  const needle = name.trim();
  const lower = needle.toLowerCase();
  for (const f of result.folders) {
    if (f.uid === needle) return f.uid;
    if (f.name.trim() === needle) return f.uid;
    if (f.name.trim().toLowerCase() === lower) return f.uid;
  }
  return undefined;
}

/**
 * Create a folder via `folder_add` (server API). Triggers a sync so the folder appears in local storage.
 */
export async function addFolder(
  auth: Auth,
  storage: InMemoryStorage,
  input: AddFolderInput,
): Promise<AddFolderResult> {
  const name = input.folderName?.trim();
  if (!name) {
    throw new KeeperSdkError(
      "Folder name cannot be empty.",
      "folder_name_required",
    );
  }

  const parentUid =
    input.parentUid === undefined || input.parentUid === ""
      ? null
      : input.parentUid;
  const parent = resolveParentContext(storage, parentUid);

  const isShared = input.isSharedFolder === true;
  const folderType = decideNewFolderType(parent, isShared);

  const folderUidBytes = generateUidBytes();
  const folderUid = webSafe64FromBytes(folderUidBytes);
  const folderKey = generateEncryptionKey();

  const sharedScope =
    folderType === "shared_folder_folder" ? parent.sharedScopeUid : null;

  const encryptionKey = await getEncryptionKeyForNewFolder(
    auth,
    storage,
    folderType,
    sharedScope,
  );

  const dataJson = JSON.stringify({ title: name });
  const dataBytes = new TextEncoder().encode(dataJson);
  const encryptedData = await platform.aesCbcEncrypt(
    dataBytes,
    folderKey,
    true,
  );
  const encryptedFolderKey = await platform.aesCbcEncrypt(
    folderKey,
    encryptionKey,
    true,
  );

  const rq: Record<string, unknown> = {
    folder_uid: folderUid,
    folder_type: folderType,
    key: webSafe64FromBytes(encryptedFolderKey),
    data: webSafe64FromBytes(encryptedData),
    link: false,
  };

  if (parentUid) {
    rq.parent_uid = parentUid;
  }
  if (folderType === "shared_folder_folder" && sharedScope) {
    rq.shared_folder_uid = sharedScope;
  }

  if (folderType === "shared_folder") {
    const nameBytes = new TextEncoder().encode(name);
    const encName = await platform.aesCbcEncrypt(nameBytes, folderKey, true);
    rq.name = webSafe64FromBytes(encName);
    rq.manage_users = input.manageUsers ?? false;
    rq.manage_records = input.manageRecords ?? false;
    rq.can_edit = input.canEdit ?? false;
    rq.can_share = input.canShare ?? false;
  }

  try {
    const cmd = folderAddCommand(rq);
    const response = await auth.executeRestCommand(cmd);
    const ok =
      response.result === "success" || response.result_code === "success";
    if (!ok) {
      return {
        folderUid,
        success: false,
        message:
          response.message || response.result_code || "folder_add failed",
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
 * Create a folder from a path (CLI `mkdir`). Walks existing parents and creates missing segments as personal folders;
 * the last segment uses `sharedFolder` / permission flags when applicable.
 */
export async function mkdir(
  auth: Auth,
  storage: InMemoryStorage,
  session: VaultFolderSession,
  path: string,
  options: MkdirOptions = {},
): Promise<{ folderUid: string; success: boolean; message?: string }> {
  const trimmed = path.trim();
  if (!trimmed) {
    throw new KeeperSdkError(
      "Folder path cannot be empty.",
      "folder_path_required",
    );
  }

  if (options.sharedFolder && options.userFolder) {
    throw new KeeperSdkError(
      "Use only one of sharedFolder (-sf) or userFolder (-uf).",
      "mkdir_flags_conflict",
    );
  }

  const { folderUid: baseUid, remaining } = await tryResolvePath(
    storage,
    session,
    trimmed,
  );
  if (!remaining.trim()) {
    throw new KeeperSdkError(
      `Folder "${trimmed}" already exists.`,
      "folder_already_exists",
    );
  }

  let grantAll = options.grantAll === true;
  let manageUsers = options.manageUsers ?? false;
  let manageRecords = options.manageRecords ?? false;
  let canShare = options.canShare ?? false;
  let canEdit = options.canEdit ?? false;
  if (grantAll) {
    manageUsers = true;
    manageRecords = true;
    canShare = true;
    canEdit = true;
  }

  const segments = splitPathComponents(remaining)
    .map((s) => s.trim())
    .filter((s) => s !== "" && s !== ".");

  if (segments.length === 0) {
    throw new KeeperSdkError(
      `Folder "${trimmed}" already exists.`,
      "folder_already_exists",
    );
  }

  let currentParent: string | null = baseUid;
  let lastResult: AddFolderResult = {
    folderUid: "",
    success: false,
    message: "not run",
  };

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const isLast = i === segments.length - 1;
    const existing = await findChildFolderUidByName(
      storage,
      currentParent,
      seg,
    );
    if (existing) {
      if (isLast) {
        throw new KeeperSdkError(
          `Folder "${seg}" already exists.`,
          "folder_already_exists",
        );
      }
      currentParent = existing;
      continue;
    }

    let isShared = false;
    if (isLast) {
      if (options.sharedFolder) {
        isShared = true;
      } else if (options.userFolder) {
        isShared = false;
      } else {
        isShared = false;
      }
    } else {
      isShared = false;
    }

    const parentCtx = resolveParentContext(storage, currentParent);
    if (
      isShared &&
      parentCtx.kind !== "user_folder" &&
      parentCtx.kind !== "virtual_root"
    ) {
      throw new KeeperSdkError(
        "Shared folders can only be created under a personal folder.",
        "shared_folder_invalid_parent",
      );
    }

    lastResult = await addFolder(auth, storage, {
      folderName: seg,
      parentUid: currentParent,
      isSharedFolder: isShared,
      manageUsers: isLast && isShared ? manageUsers : undefined,
      manageRecords: isLast && isShared ? manageRecords : undefined,
      canShare: isLast && isShared ? canShare : undefined,
      canEdit: isLast && isShared ? canEdit : undefined,
    });

    if (!lastResult.success) {
      return {
        folderUid: lastResult.folderUid,
        success: false,
        message: lastResult.message,
      };
    }
    currentParent = lastResult.folderUid;
  }

  return { folderUid: lastResult.folderUid, success: true };
}

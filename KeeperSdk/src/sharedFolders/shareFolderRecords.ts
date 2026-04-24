import type {
  Auth,
  DSharedFolder,
  DSharedFolderRecord,
  KeeperResponse,
} from "@keeper-security/keeperapi";
import { InMemoryStorage } from "../storage/InMemoryStorage";
import { KeeperSdkError } from "../utils";
import { updateSharedFolderPermissions } from "../folders/updateFolder";
import {
  findRecordUidsInVault,
  listRecordUidsInSharedFolder,
  resolveSharedFolderUids,
} from "./sharedFolderResolve";
import { moveRecord } from "../records/RecordOperations";
import {
  encryptedSharedFolderNameB64,
  getSharedFolderKeyOrThrow,
  isSuccessResponse,
  sendSharedFolderUpdate,
} from "./shareFolderUpdateCommon";

export type ShareFolderRecordsInput = {
  sharedFolderRefs: string[];
  action: "grant" | "remove";
  /** Corresponds to repeated `-r`: `*`, `@existing` / `@current`, record UID, or title. */
  recordTargets: string[];
  /** `-s` / `can-share` */
  canShare?: boolean | null;
  /** `-d` / `can-edit` */
  canEdit?: boolean | null;
  force?: boolean;
};

export type ShareFolderRecordsResult = {
  success: boolean;
  message?: string;
  sharedFolderUids: string[];
  /** `shared_folder_update` responses (e.g. remove, if used). */
  responses: KeeperResponse[];
  /** Per-record `can_edit` / `can_share` updates done via the supported `move` path (no-op move, same shared folder). */
  movesCount: number;
};

function isStar(s: string): boolean {
  return s.trim() === "*";
}

function isExistingToken(s: string): boolean {
  const t = s.trim().toLowerCase();
  return t === "@existing" || t === "@current";
}

function isRecordInSharedFolder(
  storage: InMemoryStorage,
  sharedFolderUid: string,
  recordUid: string,
): boolean {
  for (const r of storage.getAll<DSharedFolderRecord>("shared_folder_record")) {
    if (r.sharedFolderUid === sharedFolderUid && r.recordUid === recordUid)
      return true;
  }
  return false;
}

function getSharedFolderRecordPerms(
  storage: InMemoryStorage,
  sharedFolderUid: string,
  recordUid: string,
): { canEdit: boolean; canShare: boolean } | null {
  for (const r of storage.getAll<DSharedFolderRecord>("shared_folder_record")) {
    if (r.sharedFolderUid === sharedFolderUid && r.recordUid === recordUid) {
      return { canEdit: r.canEdit, canShare: r.canShare };
    }
  }
  return null;
}

type RecordRow = {
  record_uid: string;
  shared_folder_uid: string;
  team_uid: string;
  can_edit: boolean;
  can_share: boolean;
};

function makeRow(
  recordUid: string,
  sharedFolderUid: string,
  canEdit: boolean,
  canShare: boolean,
): RecordRow {
  return {
    record_uid: recordUid,
    shared_folder_uid: sharedFolderUid,
    team_uid: "",
    can_edit: canEdit,
    can_share: canShare,
  };
}

/**
 * Set default record permissions (`folder_update` / shared-folder defaults) and/or
 * per-record `can_edit` / `can_share` for records already in the folder.
 * Defaults use `updateSharedFolderPermissions` / `folder_update`. Per-record grants
 * use `move` with the same source and destination shared folder (in-place perm update;
 * the server may reject per-record `shared_folder_update` with `update_records`).
 * Remove uses `shared_folder_update` with `remove_records` where applicable.
 * To place a new record into a shared folder, use `moveRecord` first.
 */
export async function shareFolderRecords(
  auth: Auth,
  storage: InMemoryStorage,
  input: ShareFolderRecordsInput,
): Promise<ShareFolderRecordsResult> {
  const { action, recordTargets, canShare, canEdit, force = false } = input;
  if (!input.sharedFolderRefs || input.sharedFolderRefs.length === 0) {
    throw new KeeperSdkError(
      "At least one shared folder must be specified.",
      "shared_folder_required",
    );
  }
  if (!recordTargets || recordTargets.length === 0) {
    return {
      success: true,
      message: "Nothing to do",
      sharedFolderUids: [],
      responses: [],
      movesCount: 0,
    };
  }

  let setDefaults = false;
  let expandAll = false;
  const explicit: string[] = [];
  for (const raw of recordTargets) {
    const s = raw?.trim() ?? "";
    if (!s) continue;
    if (isStar(s)) setDefaults = true;
    else if (isExistingToken(s)) expandAll = true;
    else explicit.push(s);
  }

  if (action === "remove" && setDefaults) {
    throw new KeeperSdkError(
      "A record target of * is not valid for remove. Remove specific records or use @existing.",
      "invalid_remove_star",
    );
  }
  if (setDefaults) {
    if (typeof canShare !== "boolean" && typeof canEdit !== "boolean") {
      throw new KeeperSdkError(
        "When using * as a record target, set -s and/or -d to on|off.",
        "default_record_perm_missing",
      );
    }
  }

  const sfUids = Array.from(
    resolveSharedFolderUids(storage, input.sharedFolderRefs),
  );
  const allResponses: KeeperResponse[] = [];
  let movesCount = 0;

  for (const sharedFolderUid of sfUids) {
    const sf = storage.getByUid<DSharedFolder>(
      "shared_folder",
      sharedFolderUid,
    );
    if (!sf) continue;

    if (setDefaults) {
      const r = await updateSharedFolderPermissions(
        auth,
        storage,
        sharedFolderUid,
        {
          canShare: typeof canShare === "boolean" ? canShare : null,
          canEdit: typeof canEdit === "boolean" ? canEdit : null,
        },
      );
      if (!r.success) {
        return {
          success: false,
          message: r.message,
          sharedFolderUids: sfUids,
          responses: allResponses,
          movesCount,
        };
      }
    }

    const uids = new Set<string>();
    for (const label of explicit) {
      for (const ru of findRecordUidsInVault(storage, label)) {
        uids.add(ru);
      }
    }
    if (expandAll) {
      for (const ru of listRecordUidsInSharedFolder(storage, sharedFolderUid)) {
        uids.add(ru);
      }
    }

    for (const ru of uids) {
      if (!isRecordInSharedFolder(storage, sharedFolderUid, ru)) {
        throw new KeeperSdkError(
          `Record ${ru} is not linked to shared folder ${sharedFolderUid}. Move the record into the folder first, then set permissions.`,
          "record_not_in_shared_folder",
        );
      }
    }

    if (uids.size === 0 && !setDefaults) {
      continue;
    }

    if (action === "remove") {
      const folderKey = await getSharedFolderKeyOrThrow(
        storage,
        sharedFolderUid,
      );
      const encName = await encryptedSharedFolderNameB64(sf, folderKey);
      const removeList = Array.from(uids).map((record_uid) =>
        makeRow(record_uid, sharedFolderUid, false, false),
      );
      if (removeList.length === 0) continue;
      const rq: Record<string, unknown> = {
        operation: "delete",
        shared_folder_uid: sharedFolderUid,
        name: encName,
        revision: sf.revision,
        from_team_uid: "",
        force_update: force,
        add_users: [],
        add_teams: [],
        add_records: [],
        update_users: [],
        update_teams: [],
        update_records: [],
        remove_users: [],
        remove_teams: [],
        remove_records: removeList,
      };
      const resp = await sendSharedFolderUpdate(auth, rq);
      allResponses.push(resp);
      if (!isSuccessResponse(resp)) {
        return {
          success: false,
          message: (resp as KeeperResponse).message,
          sharedFolderUids: sfUids,
          responses: allResponses,
          movesCount,
        };
      }
      continue;
    }

    if (action === "grant" && uids.size > 0) {
      const canEditM = typeof canEdit === "boolean" ? canEdit : undefined;
      const canShareM = typeof canShare === "boolean" ? canShare : undefined;
      if (canEditM === undefined && canShareM === undefined) {
        continue;
      }
      for (const recordUid of uids) {
        const cur = getSharedFolderRecordPerms(
          storage,
          sharedFolderUid,
          recordUid,
        );
        if (!cur) {
          throw new KeeperSdkError(
            `Record ${recordUid} is not linked to shared folder ${sharedFolderUid}.`,
            "record_not_in_shared_folder",
          );
        }
        const m = await moveRecord(auth, storage, {
          recordUid,
          srcFolderUid: sharedFolderUid,
          dstFolderUid: sharedFolderUid,
          canEdit: canEditM === undefined ? cur.canEdit : canEditM,
          canShare: canShareM === undefined ? cur.canShare : canShareM,
        });
        if (!m.success) {
          return {
            success: false,
            message: m.message,
            sharedFolderUids: sfUids,
            responses: allResponses,
            movesCount,
          };
        }
        movesCount += 1;
      }
    }
  }

  return {
    success: true,
    sharedFolderUids: sfUids,
    responses: allResponses,
    movesCount,
    message: undefined,
  };
}

export function runShareFolderRecords(result: ShareFolderRecordsResult): {
  ok: boolean;
  message: string;
} {
  if (!result.success) {
    return {
      ok: false,
      message: result.message || "shared_folder_update failed",
    };
  }
  const n = result.responses.length + (result.movesCount ?? 0);
  if (n > 0) {
    return {
      ok: true,
      message: `Completed shared folder record update(s) (${n}).`,
    };
  }
  return {
    ok: true,
    message: "No per-record updates were needed.",
  };
}

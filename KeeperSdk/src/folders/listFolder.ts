import type {
  DRecord,
  DRecordMetadata,
  DSharedFolder,
  DSharedFolderFolder,
  DUserFolder,
} from "@keeper-security/keeperapi";
import type { VaultStorageKind } from "@keeper-security/keeperapi";
import { InMemoryStorage } from "../storage/InMemoryStorage";
import { KeeperSdkError } from "../utils";
import { getRecordTitle, getRecordType } from "../records/RecordUtils";

export type ListFolderOptions = {
  /** Vault root when null, undefined, or empty string */
  folderUid?: string | null;
  /** Glob-style filter (*, ?) on names and UIDs (records: title only) */
  pattern?: string | null;
  showFolders?: boolean;
  showRecords?: boolean;
  detail?: boolean;
};

export type ListFolderFolderSimple = {
  uid: string;
  name: string;
  folderKind: "user_folder" | "shared_folder" | "shared_folder_folder";
};

export type ListFolderRecordSimple = {
  uid: string;
  name: string;
  type: string;
};

export type ListFolderFolderDetail = ListFolderFolderSimple & {
  flags: string;
  recordCount: number;
  subfolderCount: number;
};

export type ListFolderRecordDetail = ListFolderRecordSimple & {
  flags: string;
  version: number;
  isOwner: boolean;
  hasAttachments: boolean;
  isShared: boolean;
};

export type ListFolderResult =
  | {
      detail: true;
      folders: ListFolderFolderDetail[];
      records: ListFolderRecordDetail[];
    }
  | {
      detail: false;
      folders: ListFolderFolderSimple[];
      records: ListFolderRecordSimple[];
    };

function userFolderName(folder: DUserFolder): string {
  const d = folder.data as { title?: string; name?: string } | undefined;
  return (d?.title || d?.name || folder.uid).trim() || folder.uid;
}

function sharedFolderFolderName(folder: DSharedFolderFolder): string {
  const d = folder.data as { title?: string; name?: string } | undefined;
  return (d?.title || d?.name || folder.uid).trim() || folder.uid;
}

function sharedFolderName(folder: DSharedFolder): string {
  return (folder.name || folder.uid).trim() || folder.uid;
}

function globToRegex(pattern: string): RegExp {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  const body = escaped.replace(/\*/g, ".*").replace(/\?/g, ".");
  return new RegExp(`^${body}$`, "i");
}

function recordHasAttachments(record: DRecord): boolean {
  const ids = record.udata?.file_ids;
  if (Array.isArray(ids) && ids.length > 0) return true;
  const files = (record.extra as { files?: unknown[] } | undefined)?.files;
  return Array.isArray(files) && files.length > 0;
}

function buildFolderFlags(
  folderKind: ListFolderFolderSimple["folderKind"],
): string {
  const shared = folderKind !== "user_folder";
  return `f--${shared ? "S" : "-"}`;
}

function buildRecordFlags(
  record: DRecord,
  meta: DRecordMetadata | undefined,
): string {
  const owner = meta?.owner === true;
  const attach = recordHasAttachments(record);
  const shared = !!record.shared;
  return `r${owner ? "O" : "-"}${attach ? "A" : "-"}${shared ? "S" : "-"}`;
}

async function getUserFolderParentMap(
  storage: InMemoryStorage,
): Promise<Map<string, string>> {
  const folders = storage.getAll<DUserFolder>("user_folder");
  const childToParent = new Map<string, string>();
  for (const f of folders) {
    const deps = (await storage.getDependencies(f.uid)) || [];
    for (const c of deps) {
      if (c.kind === "user_folder") {
        childToParent.set(c.uid, f.uid);
      }
    }
  }
  return childToParent;
}

/** Root-level user folders (no parent in the user-folder tree). Exported for `tree` and similar. */
export async function listRootUserFolders(
  storage: InMemoryStorage,
): Promise<DUserFolder[]> {
  const folders = storage.getAll<DUserFolder>("user_folder");
  const childToParent = await getUserFolderParentMap(storage);
  return folders.filter((f) => !childToParent.has(f.uid));
}

function resolveFolderContainer(
  storage: InMemoryStorage,
  folderUid: string,
): { kind: VaultStorageKind; uid: string } {
  if (storage.getByUid<DUserFolder>("user_folder", folderUid)) {
    return { kind: "user_folder", uid: folderUid };
  }
  if (storage.getByUid<DSharedFolder>("shared_folder", folderUid)) {
    return { kind: "shared_folder", uid: folderUid };
  }
  if (
    storage.getByUid<DSharedFolderFolder>("shared_folder_folder", folderUid)
  ) {
    return { kind: "shared_folder_folder", uid: folderUid };
  }
  throw new KeeperSdkError(
    `Folder "${folderUid}" not found`,
    "folder_not_found",
  );
}

function getRecordMetadata(
  storage: InMemoryStorage,
  recordUid: string,
): DRecordMetadata | undefined {
  return storage.getByUid<DRecordMetadata>("metadata", recordUid);
}

export function findFolderUidByNameOrUid(
  storage: InMemoryStorage,
  needle: string,
): string | undefined {
  const trimmed = needle.trim();
  if (!trimmed) return undefined;

  if (
    storage.getByUid<DUserFolder>("user_folder", trimmed) ||
    storage.getByUid<DSharedFolder>("shared_folder", trimmed) ||
    storage.getByUid<DSharedFolderFolder>("shared_folder_folder", trimmed)
  ) {
    return trimmed;
  }

  const lower = trimmed.toLowerCase();
  for (const f of storage.getAll<DUserFolder>("user_folder")) {
    if (userFolderName(f).toLowerCase() === lower) return f.uid;
  }
  for (const sf of storage.getAll<DSharedFolder>("shared_folder")) {
    if (sharedFolderName(sf).toLowerCase() === lower) return sf.uid;
  }
  for (const sff of storage.getAll<DSharedFolderFolder>(
    "shared_folder_folder",
  )) {
    if (sharedFolderFolderName(sff).toLowerCase() === lower) return sff.uid;
  }
  return undefined;
}

async function countFolderChildren(
  storage: InMemoryStorage,
  uid: string,
): Promise<{ records: number; subfolders: number }> {
  const deps = (await storage.getDependencies(uid)) || [];
  let records = 0;
  let subfolders = 0;
  for (const c of deps) {
    if (c.kind === "record") records++;
    else if (
      c.kind === "user_folder" ||
      c.kind === "shared_folder" ||
      c.kind === "shared_folder_folder"
    ) {
      subfolders++;
    }
  }
  return { records, subfolders };
}

/**
 * List contents of a vault folder from synced local storage (no API calls).
 */
export async function listFolder(
  storage: InMemoryStorage,
  options: ListFolderOptions = {},
): Promise<ListFolderResult> {
  const showFolders = options.showFolders !== false;
  const showRecords = options.showRecords !== false;
  const detail = options.detail === true;
  const patternRaw = options.pattern?.trim() || null;
  const regex = patternRaw ? globToRegex(patternRaw) : null;

  const folderUidOpt = options.folderUid;
  let parentKey: string | null = null;

  if (
    folderUidOpt !== undefined &&
    folderUidOpt !== null &&
    folderUidOpt !== ""
  ) {
    parentKey = resolveFolderContainer(storage, folderUidOpt).uid;
  }

  const recordDepsAtRoot = (await storage.getDependencies("")) || [];
  const deps =
    parentKey === null
      ? recordDepsAtRoot
      : (await storage.getDependencies(parentKey)) || [];
  const rootUserFolders =
    parentKey === null ? await listRootUserFolders(storage) : [];

  const folderRows: ListFolderFolderSimple[] = [];
  const recordRows: ListFolderRecordSimple[] = [];

  const matches = (name: string, uid: string): boolean => {
    if (!regex) return true;
    return regex.test(name) || regex.test(uid);
  };

  if (showFolders && parentKey === null) {
    for (const uf of rootUserFolders) {
      const name = userFolderName(uf);
      if (!matches(name, uf.uid)) continue;
      folderRows.push({ uid: uf.uid, name, folderKind: "user_folder" });
    }
  }

  for (const d of deps) {
    if (d.kind === "user_folder" && showFolders && parentKey !== null) {
      const uf = storage.getByUid<DUserFolder>("user_folder", d.uid);
      if (!uf) continue;
      const name = userFolderName(uf);
      if (!matches(name, uf.uid)) continue;
      folderRows.push({ uid: uf.uid, name, folderKind: "user_folder" });
    } else if (d.kind === "shared_folder" && showFolders) {
      const sf = storage.getByUid<DSharedFolder>("shared_folder", d.uid);
      if (!sf) continue;
      const name = sharedFolderName(sf);
      if (!matches(name, sf.uid)) continue;
      folderRows.push({ uid: sf.uid, name, folderKind: "shared_folder" });
    } else if (d.kind === "shared_folder_folder" && showFolders) {
      const sff = storage.getByUid<DSharedFolderFolder>(
        "shared_folder_folder",
        d.uid,
      );
      if (!sff) continue;
      const name = sharedFolderFolderName(sff);
      if (!matches(name, sff.uid)) continue;
      folderRows.push({
        uid: sff.uid,
        name,
        folderKind: "shared_folder_folder",
      });
    } else if (d.kind === "record" && showRecords) {
      const rec = storage.getByUid<DRecord>("record", d.uid);
      if (!rec || (rec.version !== 2 && rec.version !== 3)) continue;
      const title = getRecordTitle(rec);
      if (!matches(title, rec.uid)) continue;
      recordRows.push({
        uid: rec.uid,
        name: title,
        type: getRecordType(rec),
      });
    }
  }

  folderRows.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
  );
  recordRows.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
  );

  if (!detail) {
    return { detail: false, folders: folderRows, records: recordRows };
  }

  const folderDetails: ListFolderFolderDetail[] = await Promise.all(
    folderRows.map(async (row) => {
      const counts = await countFolderChildren(storage, row.uid);
      return {
        ...row,
        flags: buildFolderFlags(row.folderKind),
        recordCount: counts.records,
        subfolderCount: counts.subfolders,
      };
    }),
  );

  const recordDetails: ListFolderRecordDetail[] = recordRows.map((row) => {
    const rec = storage.getByUid<DRecord>("record", row.uid)!;
    const meta = getRecordMetadata(storage, row.uid);
    return {
      ...row,
      flags: buildRecordFlags(rec, meta),
      version: rec.version,
      isOwner: meta?.owner === true,
      hasAttachments: recordHasAttachments(rec),
      isShared: !!rec.shared,
    };
  });

  return { detail: true, folders: folderDetails, records: recordDetails };
}

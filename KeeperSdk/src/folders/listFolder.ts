import type {
  DRecord,
  DRecordMetadata,
  DSharedFolder,
  DSharedFolderFolder,
  DUserFolder,
  VaultStorageData,
  VaultStorageKind,
} from "@keeper-security/keeperapi";
import { InMemoryStorage } from "../storage/InMemoryStorage";
import { KeeperSdkError } from "../utils";
import { getRecordTitle, getRecordType } from "../records/RecordUtils";
import {
  getUserFolderParentMap,
  globToRegex,
  sharedFolderFolderName,
  sharedFolderName,
  userFolderName,
} from "./folderHelpers";

export type ListFolderOptions = {
  folderUid?: string | null;
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

export async function listRootUserFolders(
  storage: InMemoryStorage,
): Promise<DUserFolder[]> {
  const folders = storage.getAll<DUserFolder>("user_folder");
  const childToParent = await getUserFolderParentMap(storage);
  return folders.filter((f) => !childToParent.has(f.uid));
}

async function buildFolderParentMap(
  storage: InMemoryStorage,
): Promise<Map<string, { uid: string; kind: VaultStorageKind }>> {
  const result = new Map<string, { uid: string; kind: VaultStorageKind }>();
  const parentKinds: VaultStorageKind[] = [
    "user_folder",
    "shared_folder",
    "shared_folder_folder",
  ];
  for (const kind of parentKinds) {
    for (const item of storage.getAll<{ uid: string } & VaultStorageData>(
      kind,
    )) {
      const puid = (item as { uid: string }).uid;
      if (!puid) continue;
      const deps = (await storage.getDependencies(puid)) || [];
      for (const d of deps) {
        if (
          d.kind === "user_folder" ||
          d.kind === "shared_folder" ||
          d.kind === "shared_folder_folder"
        ) {
          if (!result.has(d.uid)) {
            result.set(d.uid, { uid: puid, kind });
          }
        }
      }
    }
  }
  return result;
}

export async function listVaultRootFolders(
  storage: InMemoryStorage,
): Promise<{
  rows: ListFolderFolderSimple[];
  promotedRootSharedUids: Set<string>;
}> {
  const rows: ListFolderFolderSimple[] = [];
  const seen = new Set<string>();
  const promotedRootSharedUids = new Set<string>();

  for (const uf of await listRootUserFolders(storage)) {
    if (seen.has(uf.uid)) continue;
    seen.add(uf.uid);
    rows.push({
      uid: uf.uid,
      name: userFolderName(uf),
      folderKind: "user_folder",
    });
  }

  const rootDeps = (await storage.getDependencies("")) || [];
  for (const d of rootDeps) {
    if (d.kind === "shared_folder") {
      const sf = storage.getByUid<DSharedFolder>("shared_folder", d.uid);
      if (!sf || seen.has(sf.uid)) continue;
      seen.add(sf.uid);
      rows.push({
        uid: sf.uid,
        name: sharedFolderName(sf),
        folderKind: "shared_folder",
      });
    } else if (d.kind === "shared_folder_folder") {
      const sff = storage.getByUid<DSharedFolderFolder>(
        "shared_folder_folder",
        d.uid,
      );
      if (!sff || seen.has(sff.uid)) continue;
      seen.add(sff.uid);
      rows.push({
        uid: sff.uid,
        name: sharedFolderFolderName(sff),
        folderKind: "shared_folder_folder",
      });
    }
  }

  const parentMap = await buildFolderParentMap(storage);
  for (const sf of storage.getAll<DSharedFolder>("shared_folder")) {
    if (seen.has(sf.uid)) continue;
    const parent = parentMap.get(sf.uid);
    if (
      parent &&
      (parent.kind === "shared_folder" ||
        parent.kind === "shared_folder_folder")
    ) {
      continue;
    }
    seen.add(sf.uid);
    promotedRootSharedUids.add(sf.uid);
    rows.push({
      uid: sf.uid,
      name: sharedFolderName(sf),
      folderKind: "shared_folder",
    });
  }

  rows.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
  );

  return { rows, promotedRootSharedUids };
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

  const deps =
    parentKey === null
      ? (await storage.getDependencies("")) || []
      : (await storage.getDependencies(parentKey)) || [];

  const folderRows: ListFolderFolderSimple[] = [];
  const recordRows: ListFolderRecordSimple[] = [];

  const matches = (name: string, uid: string): boolean => {
    if (!regex) return true;
    return regex.test(name) || regex.test(uid);
  };

  if (showFolders && parentKey === null) {
    const { rows } = await listVaultRootFolders(storage);
    for (const row of rows) {
      if (!matches(row.name, row.uid)) continue;
      folderRows.push(row);
    }
  }

  for (const d of deps) {
    if (d.kind === "user_folder" && showFolders && parentKey !== null) {
      const uf = storage.getByUid<DUserFolder>("user_folder", d.uid);
      if (!uf) continue;
      const name = userFolderName(uf);
      if (!matches(name, uf.uid)) continue;
      folderRows.push({ uid: uf.uid, name, folderKind: "user_folder" });
    } else if (
      d.kind === "shared_folder" &&
      showFolders &&
      parentKey !== null
    ) {
      const sf = storage.getByUid<DSharedFolder>("shared_folder", d.uid);
      if (!sf) continue;
      const name = sharedFolderName(sf);
      if (!matches(name, sf.uid)) continue;
      folderRows.push({ uid: sf.uid, name, folderKind: "shared_folder" });
    } else if (
      d.kind === "shared_folder_folder" &&
      showFolders &&
      parentKey !== null
    ) {
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

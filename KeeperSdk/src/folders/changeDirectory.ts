import type {
  DSharedFolder,
  DSharedFolderFolder,
  DUserFolder,
} from "@keeper-security/keeperapi";
import { InMemoryStorage } from "../storage/InMemoryStorage";
import { KeeperSdkError } from "../utils";
import { listFolder } from "./listFolder";
import type { ListFolderFolderSimple } from "./listFolder";

/** `currentFolderUid === null` means vault root (same convention as `listFolder` `folderUid`). */
export type VaultFolderSession = {
  currentFolderUid: string | null;
};

export type ChangeDirectoryResult = {
  folderUid: string | null;
  name: string;
};

export function createVaultFolderSession(): VaultFolderSession {
  return { currentFolderUid: null };
}

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

function getFolderEntryByUid(
  storage: InMemoryStorage,
  uid: string,
): ListFolderFolderSimple | undefined {
  const uf = storage.getByUid<DUserFolder>("user_folder", uid);
  if (uf)
    return { uid: uf.uid, name: userFolderName(uf), folderKind: "user_folder" };
  const sf = storage.getByUid<DSharedFolder>("shared_folder", uid);
  if (sf)
    return {
      uid: sf.uid,
      name: sharedFolderName(sf),
      folderKind: "shared_folder",
    };
  const sff = storage.getByUid<DSharedFolderFolder>(
    "shared_folder_folder",
    uid,
  );
  if (sff)
    return {
      uid: sff.uid,
      name: sharedFolderFolderName(sff),
      folderKind: "shared_folder_folder",
    };
  return undefined;
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

async function listRootUserFolderUids(
  storage: InMemoryStorage,
): Promise<Set<string>> {
  const folders = storage.getAll<DUserFolder>("user_folder");
  const childToParent = await getUserFolderParentMap(storage);
  return new Set(
    folders.filter((f) => !childToParent.has(f.uid)).map((f) => f.uid),
  );
}

/**
 * Parent folder UID for navigation (`cd ..`). `null` means vault root (no parent in the user-folder tree).
 */
export async function findParentFolderUid(
  storage: InMemoryStorage,
  folderUid: string,
): Promise<string | null> {
  const roots = await listRootUserFolderUids(storage);
  if (roots.has(folderUid)) return null;

  const parentKinds = [
    "user_folder",
    "shared_folder",
    "shared_folder_folder",
    "team",
  ] as const;
  for (const kind of parentKinds) {
    for (const item of storage.getAll(kind)) {
      const puid = (item as { uid: string }).uid;
      const deps = (await storage.getDependencies(puid)) || [];
      for (const d of deps) {
        if (d.uid !== folderUid) continue;
        if (
          d.kind === "user_folder" ||
          d.kind === "shared_folder" ||
          d.kind === "shared_folder_folder"
        ) {
          return puid;
        }
      }
    }
  }

  return null;
}

async function listFolderChildrenForCd(
  storage: InMemoryStorage,
  parentUid: string | null,
): Promise<ListFolderFolderSimple[]> {
  const result = await listFolder(storage, {
    folderUid: parentUid === null ? undefined : parentUid,
    showFolders: true,
    showRecords: false,
  });
  return result.folders;
}

function findChildFolder(
  children: ListFolderFolderSimple[],
  component: string,
): ListFolderFolderSimple | undefined {
  const c = component.trim();
  if (!c) return undefined;
  const byUid = children.find((ch) => ch.uid === c);
  if (byUid) return byUid;
  const exact = children.find((ch) => ch.name.trim() === c);
  if (exact) return exact;
  const lower = c.toLowerCase();
  return children.find((ch) => ch.name.trim().toLowerCase() === lower);
}

/** Split a path with `//` segments preserved as literal `/` in names. */
export function splitPathComponents(path: string): string[] {
  const escaped = path.replace(/\/\//g, "\x00");
  return escaped.split("/").map((s) => s.replace(/\x00/g, "/"));
}

export type TryResolvePathResult = {
  folderUid: string | null;
  remaining: string;
};

/**
 * Resolve a path relative to `session.currentFolderUid` (or vault root when null).
 * No API calls — uses synced storage only.
 */
export async function tryResolvePath(
  storage: InMemoryStorage,
  session: VaultFolderSession,
  path: string,
): Promise<TryResolvePathResult> {
  const trimmed = path.trim();
  if (!trimmed) {
    return { folderUid: session.currentFolderUid, remaining: "" };
  }

  const direct = getFolderEntryByUid(storage, trimmed);
  if (direct) {
    return { folderUid: direct.uid, remaining: "" };
  }

  const absolute = trimmed.startsWith("/") && !trimmed.startsWith("//");
  const pathToWalk = absolute ? trimmed.slice(1) : trimmed;
  const components = splitPathComponents(pathToWalk);

  let folderUid: string | null = absolute
    ? null
    : (session.currentFolderUid ?? null);

  if (!absolute && folderUid !== null) {
    if (!getFolderEntryByUid(storage, folderUid)) {
      folderUid = null;
    }
  }

  let i = 0;
  while (i < components.length) {
    let component = components[i];
    i++;

    if (component === "" || component === ".") {
      continue;
    }

    if (component === "..") {
      if (folderUid === null) {
        continue;
      }
      folderUid = await findParentFolderUid(storage, folderUid);
      continue;
    }

    const children = await listFolderChildrenForCd(storage, folderUid);
    const match = findChildFolder(children, component);
    if (match) {
      folderUid = match.uid;
    } else {
      const remaining = [component, ...components.slice(i)].join("/");
      return { folderUid, remaining };
    }
  }

  return { folderUid, remaining: "" };
}

/**
 * Resolve a single folder from a path, name, or UID. Throws if empty, unresolved, or leftover path.
 */
export async function resolveSingleFolder(
  storage: InMemoryStorage,
  session: VaultFolderSession,
  folderName: string,
): Promise<ChangeDirectoryResult> {
  const trimmed = folderName.trim();
  if (!trimmed) {
    throw new KeeperSdkError("Folder cannot be empty.", "folder_required");
  }

  const direct = getFolderEntryByUid(storage, trimmed);
  if (direct) {
    return { folderUid: direct.uid, name: direct.name };
  }

  const { folderUid, remaining } = await tryResolvePath(
    storage,
    session,
    trimmed,
  );
  if (remaining) {
    throw new KeeperSdkError(
      `Folder "${folderName}" not found`,
      "folder_not_found",
    );
  }

  if (folderUid === null) {
    return { folderUid: null, name: "My Vault" };
  }

  const entry = getFolderEntryByUid(storage, folderUid);
  if (!entry) {
    throw new KeeperSdkError(
      `Folder "${folderName}" not found`,
      "folder_not_found",
    );
  }
  return { folderUid: entry.uid, name: entry.name };
}

/**
 * Update session working folder (client-side only, no API calls).
 */
export async function changeDirectory(
  storage: InMemoryStorage,
  session: VaultFolderSession,
  path: string,
): Promise<ChangeDirectoryResult> {
  const resolved = await resolveSingleFolder(storage, session, path);
  session.currentFolderUid = resolved.folderUid;
  return resolved;
}

/** Display name for CLI prompt (`My Vault` at root). */
export function getWorkingFolderDisplayName(
  storage: InMemoryStorage,
  currentFolderUid: string | null,
): string {
  if (currentFolderUid === null) return "My Vault";
  const entry = getFolderEntryByUid(storage, currentFolderUid);
  return entry?.name ?? "My Vault";
}

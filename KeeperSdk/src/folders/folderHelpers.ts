import type {
  DSharedFolder,
  DSharedFolderFolder,
  DUserFolder,
} from "@keeper-security/keeperapi";
import { InMemoryStorage } from "../storage/InMemoryStorage";

export function userFolderName(folder: DUserFolder): string {
  const d = folder.data as { title?: string; name?: string } | undefined;
  return (d?.title || d?.name || folder.uid).trim() || folder.uid;
}

export function sharedFolderFolderName(folder: DSharedFolderFolder): string {
  const d = folder.data as { title?: string; name?: string } | undefined;
  return (d?.title || d?.name || folder.uid).trim() || folder.uid;
}

export function sharedFolderName(folder: DSharedFolder): string {
  return (folder.name || folder.uid).trim() || folder.uid;
}

export function globToRegex(pattern: string): RegExp {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  const body = escaped.replace(/\*/g, ".*").replace(/\?/g, ".");
  return new RegExp(`^${body}$`, "i");
}

export async function getUserFolderParentMap(
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

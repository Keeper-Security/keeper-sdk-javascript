import type {
  Auth,
  DSharedFolder,
  KeeperResponse,
  RestCommand,
} from "@keeper-security/keeperapi";
import { platform, webSafe64FromBytes } from "@keeper-security/keeperapi";
import { InMemoryStorage } from "../storage/InMemoryStorage";
import { KeeperSdkError } from "../utils";

function sharedFolderUpdateCommand(
  request: Record<string, unknown>,
): RestCommand<Record<string, unknown>, KeeperResponse> {
  return {
    baseRequest: { command: "shared_folder_update" },
    request,
    authorization: {},
  };
}

/**
 * Keeper's `shared_folder_update` rejects requests that look like an outdated client if the payload
 * is malformed. We send `pt` (often empty) and **omit** empty `[]` lists so the server only sees
 * the sections that are actually changing.
 */
export function finalizeSharedFolderUpdateRequest(
  req: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {
    ...req,
    pt: typeof req.pt === "string" ? req.pt : "",
  };
  for (const key of Object.keys(out)) {
    const v = out[key];
    if (Array.isArray(v) && v.length === 0) {
      delete out[key];
    }
  }
  return out;
}

export async function sendSharedFolderUpdate(
  auth: Auth,
  request: Record<string, unknown>,
): Promise<KeeperResponse> {
  return auth.executeRestCommand(
    sharedFolderUpdateCommand(finalizeSharedFolderUpdateRequest(request)),
  );
}

export function isSuccessResponse(r: KeeperResponse): boolean {
  return (
    r.result === "success" ||
    (r as { result_code?: string }).result_code === "success"
  );
}

/**
 * Re-encrypt the shared folder display name for `shared_folder_update` (same pattern as `folder_update`).
 */
export async function encryptedSharedFolderNameB64(
  sf: DSharedFolder,
  folderKey: Uint8Array,
): Promise<string> {
  const displayName = (sf.name || sf.uid).trim() || sf.uid;
  const nameBytes = new TextEncoder().encode(displayName);
  const encName = await platform.aesCbcEncrypt(nameBytes, folderKey, true);
  return webSafe64FromBytes(encName);
}

export async function getSharedFolderKeyOrThrow(
  storage: InMemoryStorage,
  sharedFolderUid: string,
): Promise<Uint8Array> {
  const k = await storage.getKeyBytes(sharedFolderUid);
  if (!k) {
    throw new KeeperSdkError(
      "Shared folder encryption key not available. Sync the vault and try again.",
      "shared_folder_key_missing",
    );
  }
  return k;
}

import {
  Auth,
  Authentication,
  getPublicKeysMessage,
  platform,
  webSafe64FromBytes,
} from "@keeper-security/keeperapi";
import { KeeperSdkError, extractErrorMessage } from "../utils";

type UserKeys = {
  rsaPublicKey: Uint8Array | null;
  eccPublicKey: Uint8Array | null;
};

export async function loadUserPublicKeyForSharedFolder(
  auth: Auth,
  email: string,
): Promise<UserKeys> {
  const msg = getPublicKeysMessage({ usernames: [email] });
  let response: Authentication.IGetPublicKeysResponse;

  try {
    response = await auth.executeRest(msg);
  } catch (err) {
    throw new KeeperSdkError(
      `Failed to fetch public key for ${email}: ${extractErrorMessage(err)}`,
    );
  }

  const keyResponses = response.keyResponses || [];
  if (keyResponses.length === 0) {
    throw new KeeperSdkError(
      `No public key returned for ${email}`,
      "missing_public_key",
    );
  }

  const entry = keyResponses[0];
  if (entry.errorCode) {
    throw new KeeperSdkError(
      `Public key lookup failed for ${email}: ${entry.errorCode} - ${entry.message || ""}`,
      entry.errorCode,
    );
  }

  return {
    rsaPublicKey:
      entry.publicKey && entry.publicKey.length > 0
        ? (entry.publicKey as Uint8Array)
        : null,
    eccPublicKey:
      entry.publicEccKey && entry.publicEccKey.length > 0
        ? (entry.publicEccKey as Uint8Array)
        : null,
  };
}

/**
 * Encrypt the shared folder AES key for a user (RSA or EC public key from `get_public_keys`).
 */
export async function encryptSharedFolderKeyForUser(
  auth: Auth,
  email: string,
  sharedFolderKey: Uint8Array,
): Promise<string> {
  const userKeys = await loadUserPublicKeyForSharedFolder(auth, email);
  if (userKeys.eccPublicKey) {
    const enc = await platform.publicEncryptEC(
      sharedFolderKey,
      userKeys.eccPublicKey,
    );
    return webSafe64FromBytes(enc);
  }
  if (userKeys.rsaPublicKey) {
    const rsaKeyBase64 = platform.bytesToBase64(userKeys.rsaPublicKey);
    const enc = platform.publicEncrypt(sharedFolderKey, rsaKeyBase64);
    return webSafe64FromBytes(enc);
  }
  throw new KeeperSdkError(
    `No usable public key available to share the folder with ${email}`,
    "missing_public_key",
  );
}

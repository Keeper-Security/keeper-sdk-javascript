import type { Auth } from "@keeper-security/keeperapi";
import {
  Folder,
  getShareObjectsMessage,
  normal64Bytes,
  platform,
  teamGetKeysCommand,
  webSafe64FromBytes,
  type TeamGetKeysResponse,
  type Records,
} from "@keeper-security/keeperapi";
import * as crypto from "crypto";
import type { InMemoryStorage } from "../storage/InMemoryStorage";
import {
  KeeperSdkError,
  ResultCodes,
  extractErrorMessage,
  isValidEmail,
  logger,
} from "../utils";
import { TeamGetKeysResponseKeyType } from "./nsfConstants";
import type { NsfResolvedShareRecipient, NsfTeamPublicKeys } from "./nsfTypes";

const SHARE_ERROR = ResultCodes.NSF_SHARE_FAILED;

type TeamGetKeyEntry = NonNullable<TeamGetKeysResponse["keys"]>[number];

// TODO(browser): Replace Node crypto with platform-safe PKCS#1 public-key derivation
// so team vault-storage fallback works in browser builds.
function deriveRsaPublicKeyFromPkcs1PrivateKey(
  privateKeyDer: Uint8Array,
): Uint8Array {
  const privateKey = crypto.createPrivateKey({
    key: Buffer.from(privateKeyDer),
    format: "der",
    type: "pkcs1",
  });
  const publicKey = crypto.createPublicKey(privateKey);
  return new Uint8Array(publicKey.export({ format: "der", type: "pkcs1" }));
}

function hasAsymmetricTeamPublicKeys(keys: NsfTeamPublicKeys): boolean {
  return Boolean(keys.rsaPublicKey?.length || keys.eccPublicKey?.length);
}

async function decryptTeamGetKeysEntry(
  auth: Auth,
  entry: TeamGetKeyEntry,
): Promise<Partial<NsfTeamPublicKeys>> {
  if (!entry.key) return {};

  const keyBytes = normal64Bytes(entry.key);
  const partial: Partial<NsfTeamPublicKeys> = {};

  switch (entry.type) {
    case TeamGetKeysResponseKeyType.EccPublicKey:
      partial.eccPublicKey = keyBytes;
      break;
    case TeamGetKeysResponseKeyType.RsaPublicKey:
      partial.rsaPublicKey = keyBytes;
      break;
    case TeamGetKeysResponseKeyType.EncryptedAesTeamKeyByDataKey:
      if (auth.dataKey?.length) {
        partial.aesTeamKey = await platform.aesCbcDecrypt(
          keyBytes,
          auth.dataKey,
          true,
        );
      }
      break;
    case TeamGetKeysResponseKeyType.EncryptedAesTeamKeyByRsa:
      if (auth.privateKey?.length) {
        partial.aesTeamKey = platform.privateDecrypt(keyBytes, auth.privateKey);
      }
      break;
    case TeamGetKeysResponseKeyType.EncryptedAesTeamKeyByDataKeyGcm:
      if (auth.dataKey?.length) {
        partial.aesTeamKey = await platform.aesGcmDecrypt(
          keyBytes,
          auth.dataKey,
        );
      }
      break;
    case TeamGetKeysResponseKeyType.EncryptedAesTeamKeyByEcc:
      if (auth.eccPrivateKey?.length) {
        partial.aesTeamKey = await platform.privateDecryptEC(
          keyBytes,
          auth.eccPrivateKey,
        );
      }
      break;
  }

  return partial;
}

async function parseTeamGetKeysApiResponse(
  auth: Auth,
  teamUid: string,
  response: TeamGetKeysResponse,
): Promise<NsfTeamPublicKeys> {
  const keys: NsfTeamPublicKeys = {};

  for (const entry of response.keys ?? []) {
    if (entry.team_uid && entry.team_uid !== teamUid) continue;
    Object.assign(keys, await decryptTeamGetKeysEntry(auth, entry));
  }

  return keys;
}

async function fetchNsfTeamPublicKeysFromVaultStorage(
  storage: InMemoryStorage,
  teamUid: string,
): Promise<NsfTeamPublicKeys> {
  const teamPrivateKey = await storage.getKeyBytes(`${teamUid}_priv`);
  if (!teamPrivateKey?.length) return {};

  try {
    return {
      rsaPublicKey: deriveRsaPublicKeyFromPkcs1PrivateKey(teamPrivateKey),
    };
  } catch (err) {
    logger.debug(
      `Could not derive team RSA public key from vault storage for ${teamUid}: ${extractErrorMessage(err)}`,
    );
    return {};
  }
}

function findMatchingShareTeams(
  teams: Records.IShareTeam[],
  query: string,
): Records.IShareTeam[] {
  const lower = query.toLowerCase();
  return teams.filter((team) => {
    const uid = team.teamUid?.length ? webSafe64FromBytes(team.teamUid) : "";
    const name = team.teamname?.trim() ?? "";
    return uid === query || name.toLowerCase() === lower;
  });
}

export async function fetchNsfTeamPublicKeys(
  auth: Auth,
  teamUid: string,
  storage?: InMemoryStorage,
): Promise<NsfTeamPublicKeys> {
  const trimmed = teamUid.trim();
  if (!trimmed) {
    throw new KeeperSdkError(
      "Team UID is required.",
      ResultCodes.TEAM_NOT_FOUND,
    );
  }

  try {
    const response = await auth.executeRestCommand(
      teamGetKeysCommand({ teams: [trimmed] }),
    );
    let keys = await parseTeamGetKeysApiResponse(auth, trimmed, response);

    if (!hasAsymmetricTeamPublicKeys(keys) && storage) {
      const storageKeys = await fetchNsfTeamPublicKeysFromVaultStorage(
        storage,
        trimmed,
      );
      keys = {
        rsaPublicKey: keys.rsaPublicKey ?? storageKeys.rsaPublicKey,
        eccPublicKey: keys.eccPublicKey ?? storageKeys.eccPublicKey,
        aesTeamKey: keys.aesTeamKey ?? storageKeys.aesTeamKey,
      };
    }

    if (!hasAsymmetricTeamPublicKeys(keys)) {
      throw new KeeperSdkError(
        `No public key found for team ${trimmed}.`,
        ResultCodes.TEAM_NOT_FOUND,
      );
    }

    return keys;
  } catch (err) {
    if (err instanceof KeeperSdkError) throw err;
    throw new KeeperSdkError(
      `Failed to load team keys for ${trimmed}: ${extractErrorMessage(err)}`,
      SHARE_ERROR,
    );
  }
}

export async function encryptNsfFolderKeyForTeam(
  folderKey: Uint8Array,
  teamPublicKeys: NsfTeamPublicKeys,
): Promise<Folder.IEncryptedDataKey> {
  if (teamPublicKeys.rsaPublicKey?.length) {
    return Folder.EncryptedDataKey.create({
      encryptedKey: platform.publicEncrypt(
        folderKey,
        platform.bytesToBase64(teamPublicKeys.rsaPublicKey),
      ),
      encryptedKeyType: Folder.EncryptedKeyType.encrypted_by_public_key,
    });
  }
  if (teamPublicKeys.eccPublicKey?.length) {
    return Folder.EncryptedDataKey.create({
      encryptedKey: await platform.publicEncryptEC(
        folderKey,
        teamPublicKeys.eccPublicKey,
      ),
      encryptedKeyType: Folder.EncryptedKeyType.encrypted_by_public_key_ecc,
    });
  }
  throw new KeeperSdkError("No public key found for team.", SHARE_ERROR);
}

export async function resolveNsfShareRecipient(
  auth: Auth,
  recipient: string,
): Promise<NsfResolvedShareRecipient | null> {
  const trimmed = recipient.trim();
  if (!trimmed) return null;

  if (isValidEmail(trimmed)) {
    return { recipient: trimmed.toLowerCase(), isTeam: false };
  }

  const response = await auth.executeRest(getShareObjectsMessage({}));
  const teams = [
    ...(response.shareTeams ?? []),
    ...(response.shareMCTeams ?? []),
  ];
  const matches = findMatchingShareTeams(teams, trimmed);

  if (matches.length === 1) {
    const teamUid = webSafe64FromBytes(matches[0].teamUid!);
    return {
      recipient: teamUid,
      isTeam: true,
      accountUid: matches[0].teamUid as Uint8Array,
    };
  }
  if (matches.length > 1) {
    throw new KeeperSdkError(
      `Multiple teams match '${trimmed}'. Use the team UID instead.`,
      ResultCodes.MULTIPLE_NSF_MATCHES,
    );
  }

  throw new KeeperSdkError(
    `Recipient '${trimmed}' could not be resolved as an email or team.`,
    SHARE_ERROR,
  );
}

import type { Auth } from "@keeper-security/keeperapi";
import {
  Folder,
  folderAddMessage,
  generateEncryptionKey,
  generateUid,
  normal64Bytes,
  platform,
} from "@keeper-security/keeperapi";
import type { InMemoryStorage } from "../storage/InMemoryStorage";
import { KeeperSdkError, ResultCodes, extractErrorMessage } from "../utils";
import { NSF_FOLDER_COLORS, type NsfFolderColor } from "./nsfConstants";
import {
  buildFolderOwnerInfo,
  cacheNewNsfFolder,
  findExistingChildFolder,
  isNestedShareFolder,
  parseFolderModifyStatus,
  parseNsfPath,
  requireAuthDataKey,
  resolveKeeperDriveParentUid,
} from "./nsfHelpers";
import type {
  FolderCreatePayload,
  FolderSegmentCreateSpec,
  MkdirNsfInput,
  MkdirNsfResult,
  NsfFolderColorInput,
} from "./nsfTypes";

type NsfFolderMetadata = {
  name: string;
  color?: string;
};

function normalizeColor(
  color?: NsfFolderColorInput,
): NsfFolderColor | undefined {
  if (!color) return undefined;
  if (!NSF_FOLDER_COLORS.some((candidate) => candidate === color)) {
    throw new KeeperSdkError(
      `Invalid color '${color}'. Use: ${NSF_FOLDER_COLORS.join(", ")}.`,
      ResultCodes.NSF_MKDIR_FAILED,
    );
  }
  return color;
}

function resolveBaseFolderUid(
  storage: InMemoryStorage,
  baseFolderUid: string | null | undefined,
): string | null {
  if (!baseFolderUid) return null;
  return isNestedShareFolder(storage, baseFolderUid) ? baseFolderUid : null;
}

async function resolveFolderKeyEncryptionKey(
  storage: InMemoryStorage,
  auth: Auth,
  parentUid: string | null,
): Promise<Uint8Array> {
  if (parentUid) {
    const parentKey = await storage.getKeyBytes(parentUid);
    if (parentKey) return parentKey;
  }
  return requireAuthDataKey(auth);
}

async function buildFolderCreatePayload(
  storage: InMemoryStorage,
  auth: Auth,
  folderName: string,
  parentUid: string | null,
  color: NsfFolderColor | undefined,
  inheritPermissions: boolean,
): Promise<FolderCreatePayload> {
  const folderUid = generateUid();
  const folderKey = generateEncryptionKey();
  await storage.saveKeyBytes(folderUid, folderKey);

  const metadata: NsfFolderMetadata = { name: folderName };
  if (color && color !== "none") metadata.color = color;

  const resolvedParentUid = resolveKeeperDriveParentUid(storage, parentUid);
  const encryptedData = await platform.aesGcmEncrypt(
    platform.stringToBytes(JSON.stringify(metadata)),
    folderKey,
  );
  const encryptionKey = await resolveFolderKeyEncryptionKey(
    storage,
    auth,
    resolvedParentUid,
  );
  const encryptedFolderKey = await platform.aesGcmEncrypt(
    folderKey,
    encryptionKey,
  );

  return {
    folderUid,
    folderName,
    parentUid,
    inheritPermissions,
    folderData: Folder.FolderData.create({
      folderUid: normal64Bytes(folderUid),
      parentUid: resolvedParentUid
        ? normal64Bytes(resolvedParentUid)
        : undefined,
      data: encryptedData,
      folderKey: encryptedFolderKey,
      type: Folder.FolderUsageType.UT_NORMAL,
      inheritUserPermissions: inheritPermissions
        ? Folder.SetBooleanValue.BOOLEAN_TRUE
        : Folder.SetBooleanValue.BOOLEAN_FALSE,
      ownerInfo: buildFolderOwnerInfo(auth),
    }),
  };
}

async function createFolderSegmentsBatch(
  storage: InMemoryStorage,
  auth: Auth,
  segments: FolderSegmentCreateSpec[],
  parentUid: string | null,
): Promise<{ folderUid: string }> {
  let currentParentUid = parentUid;
  const payloads: FolderCreatePayload[] = [];

  for (const segment of segments) {
    const payload = await buildFolderCreatePayload(
      storage,
      auth,
      segment.segmentName,
      currentParentUid,
      segment.color,
      segment.inheritPermissions,
    );
    payloads.push(payload);
    currentParentUid = payload.folderUid;
  }

  const response = await auth.executeRest(
    folderAddMessage({ folderData: payloads.map((entry) => entry.folderData) }),
  );

  for (let index = 0; index < payloads.length; index++) {
    const payload = payloads[index];
    parseFolderModifyStatus(
      response.folderAddResults?.[index],
      ResultCodes.NSF_MKDIR_FAILED,
    );
    await cacheNewNsfFolder(
      storage,
      auth,
      payload.folderUid,
      payload.folderName,
      payload.parentUid,
      payload.inheritPermissions,
    );
  }

  return { folderUid: payloads[payloads.length - 1].folderUid };
}

export async function mkdirNestedShareFolder(
  storage: InMemoryStorage,
  auth: Auth,
  input: MkdirNsfInput,
): Promise<MkdirNsfResult> {
  const folderPath = (input.folder ?? "").trim();
  if (!folderPath) {
    throw new KeeperSdkError(
      "Folder name is required.",
      ResultCodes.NSF_MKDIR_FAILED,
    );
  }

  const color = normalizeColor(input.color);
  const inheritPermissions = !input.noInheritPermissions;
  const segments = parseNsfPath(folderPath);
  let parentUid: string | null = resolveBaseFolderUid(
    storage,
    input.baseFolderUid,
  );
  const lastIdx = segments.length - 1;
  let createdUid: string | undefined;
  const pendingSegments: FolderSegmentCreateSpec[] = [];

  const flushPendingSegments = async (): Promise<void> => {
    if (pendingSegments.length === 0) return;
    const result = await createFolderSegmentsBatch(
      storage,
      auth,
      pendingSegments,
      parentUid,
    );
    createdUid = result.folderUid;
    parentUid = result.folderUid;
    pendingSegments.length = 0;
  };

  try {
    for (let idx = 0; idx < segments.length; idx++) {
      const segment = segments[idx];
      const isLeaf = idx === lastIdx;
      const existingUid = findExistingChildFolder(storage, segment, parentUid);

      if (existingUid) {
        await flushPendingSegments();
        if (isLeaf) {
          return {
            folderUid: existingUid,
            created: false,
            message: `Folder "${segment}" already exists.`,
          };
        }
        parentUid = existingUid;
        continue;
      }

      pendingSegments.push({
        segmentName: segment,
        color: isLeaf ? color : undefined,
        inheritPermissions: isLeaf ? inheritPermissions : true,
      });
    }

    await flushPendingSegments();

    if (!createdUid) {
      throw new KeeperSdkError(
        "Folder creation did not return a UID.",
        ResultCodes.NSF_MKDIR_FAILED,
      );
    }

    return {
      folderUid: createdUid,
      created: true,
      message:
        segments.length > 1
          ? `Created folder path "${folderPath}".`
          : `Created folder "${segments[lastIdx]}".`,
    };
  } catch (err) {
    if (err instanceof KeeperSdkError) throw err;
    throw new KeeperSdkError(
      `Failed to create nested share folder: ${extractErrorMessage(err)}`,
      ResultCodes.NSF_MKDIR_FAILED,
    );
  }
}

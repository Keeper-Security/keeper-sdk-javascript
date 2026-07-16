import type { Auth, DRecord } from "@keeper-security/keeperapi";
import {
  keeperDriveRecordsUpdate,
  normal64Bytes,
  platform,
} from "@keeper-security/keeperapi";
import type { InMemoryStorage } from "../storage/InMemoryStorage";
import { VaultObjectKind } from "../folders/folderHelpers";
import { KeeperSdkError, ResultCodes, extractErrorMessage } from "../utils";
import { NSF_MAX_RECORD_BATCH } from "./nsfConstants";
import { resolveRecordKeyBytes } from "./nsfRecordCrypto";
import { getPaddedJsonBytes, mergeNsfRecordData } from "./nsfRecordData";
import {
  checkRecordEditPermission,
  ensureNestedShareRecord,
  nsfToNumber,
  parseRecordModifyStatus,
  requireAuthAccountUid,
  resolveNsfRecordIdentifier,
} from "./nsfHelpers";
import { validateNsfRecordType } from "./nsfRecordTypes";
import type {
  RecordUpdatePayload,
  UpdateNsfRecordInput,
  UpdateNsfRecordItemInput,
  UpdateNsfRecordsInput,
  UpdateNsfRecordResult,
  UpdateNsfRecordResultItem,
} from "./nsfTypes";

type UpdateNsfRecordChanges = Omit<UpdateNsfRecordItemInput, "record">;

function loadStoredRecordData(
  storage: InMemoryStorage,
  recordUid: string,
): Record<string, unknown> {
  const record = storage.getByUid<DRecord>(VaultObjectKind.Record, recordUid);
  if (record?.data && typeof record.data === "object") {
    return structuredClone(record.data) as Record<string, unknown>;
  }
  return { fields: [] };
}

function isPerRecordUpdateInput(
  input: UpdateNsfRecordInput | UpdateNsfRecordsInput,
): input is UpdateNsfRecordsInput {
  const first = input.records[0];
  return first != null && typeof first === "object" && "record" in first;
}

function toUpdateItems(
  input: UpdateNsfRecordInput | UpdateNsfRecordsInput,
): UpdateNsfRecordItemInput[] {
  if (isPerRecordUpdateInput(input)) {
    return input.records;
  }
  const { records, ...changes } = input;
  return records.map((record) => ({ record, ...changes }));
}

function hasUpdateChanges(changes: UpdateNsfRecordChanges): boolean {
  return !!(
    changes.title?.trim() ||
    changes.recordType?.trim() ||
    changes.notes?.trim() ||
    changes.fieldEntries?.length ||
    changes.customEntries?.length
  );
}

async function buildRecordUpdatePayload(
  storage: InMemoryStorage,
  auth: Auth,
  recordUid: string,
  changes: UpdateNsfRecordChanges,
): Promise<RecordUpdatePayload> {
  const storedRecord = storage.getByUid<DRecord>(
    VaultObjectKind.Record,
    recordUid,
  );
  const recordKey = await resolveRecordKeyBytes(storage, auth, recordUid);
  if (!recordKey) {
    throw new KeeperSdkError(
      `Record key not available for ${recordUid}. Run sync() first.`,
      ResultCodes.NSF_MISSING_KEY,
    );
  }

  const mergedRecordData = mergeNsfRecordData(
    loadStoredRecordData(storage, recordUid),
    changes,
  );
  return {
    recordUid,
    storedRecord,
    mergedRecordData,
    recordUpdate: {
      recordUid: normal64Bytes(recordUid),
      clientModifiedTime: Date.now(),
      revision: storedRecord?.revision ?? 0,
      data: await platform.aesGcmEncrypt(
        getPaddedJsonBytes(mergedRecordData),
        recordKey,
      ),
    },
  };
}

export async function updateNestedShareRecords(
  storage: InMemoryStorage,
  auth: Auth,
  input: UpdateNsfRecordInput | UpdateNsfRecordsInput,
): Promise<UpdateNsfRecordResult> {
  const items = toUpdateItems(input);
  if (items.length === 0) {
    throw new KeeperSdkError(
      "Record UID is required.",
      ResultCodes.NSF_UPDATE_FAILED,
    );
  }
  if (items.length > NSF_MAX_RECORD_BATCH) {
    throw new KeeperSdkError(
      `Maximum ${NSF_MAX_RECORD_BATCH} records per request.`,
      ResultCodes.NSF_TOO_MANY_RECORDS,
    );
  }

  for (const item of items) {
    if (!hasUpdateChanges(item)) {
      throw new KeeperSdkError(
        `At least one field to update is required for record '${item.record}'.`,
        ResultCodes.NSF_UPDATE_FAILED,
      );
    }
  }

  const recordTypes = new Set<string>();
  for (const item of items) {
    if (item.recordType?.trim()) {
      recordTypes.add(item.recordType.trim());
    }
  }
  for (const recordType of recordTypes) {
    await validateNsfRecordType(
      auth,
      recordType,
      ResultCodes.NSF_UPDATE_FAILED,
    );
  }

  const accountUid = requireAuthAccountUid(auth);

  try {
    const payloads: RecordUpdatePayload[] = [];
    for (const item of items) {
      const { record: identifier, ...changes } = item;
      const recordUid = resolveNsfRecordIdentifier(storage, identifier);
      if (!recordUid) {
        throw new KeeperSdkError(
          `Record '${identifier}' not found`,
          ResultCodes.NSF_NOT_FOUND,
        );
      }
      ensureNestedShareRecord(storage, recordUid, identifier);
      checkRecordEditPermission(storage, recordUid, auth.username, accountUid);
      payloads.push(
        await buildRecordUpdatePayload(storage, auth, recordUid, changes),
      );
    }

    const response = await auth.executeRest(
      keeperDriveRecordsUpdate({
        records: payloads.map((entry) => entry.recordUpdate),
        clientTime: Date.now(),
      }),
    );
    const revision = nsfToNumber(response.revision);

    const updated: UpdateNsfRecordResultItem[] = [];
    for (let index = 0; index < payloads.length; index++) {
      const payload = payloads[index];
      const { statusName, message } = parseRecordModifyStatus(
        response.records?.[index],
        ResultCodes.NSF_UPDATE_FAILED,
      );
      const itemRevision = revision ?? payload.storedRecord?.revision;

      if (payload.storedRecord) {
        await storage.put({
          ...payload.storedRecord,
          data: payload.mergedRecordData,
          revision: itemRevision ?? payload.storedRecord.revision,
          clientModifiedTime: Date.now(),
        });
      }

      updated.push({
        recordUid: payload.recordUid,
        success: true,
        status: statusName,
        message,
        revision: itemRevision,
      });
    }

    return { updated };
  } catch (err) {
    if (err instanceof KeeperSdkError) throw err;
    throw new KeeperSdkError(
      `Failed to update nested share record(s): ${extractErrorMessage(err)}`,
      ResultCodes.NSF_UPDATE_FAILED,
    );
  }
}

export async function updateNestedShareRecord(
  storage: InMemoryStorage,
  auth: Auth,
  input: UpdateNsfRecordItemInput,
): Promise<UpdateNsfRecordResultItem> {
  const { updated } = await updateNestedShareRecords(storage, auth, {
    records: [input],
  });
  if (!updated[0]) {
    throw new KeeperSdkError(
      "Failed to update nested share record.",
      ResultCodes.NSF_UPDATE_FAILED,
    );
  }
  return updated[0];
}

import type { InMemoryStorage } from "../storage/InMemoryStorage";
import {
  NsfItemType,
  displayNsfParentUid,
  findRecordFolderParentUid,
  getKeeperDriveFolders,
  getKeeperDriveRecords,
  getRecordDescription,
  nsfFolderHasPamUserWithRotation,
  nsfRecordIsRoeEligible,
} from "./nsfHelpers";
import { getRecordTitle, getRecordType } from "../records/RecordUtils";
import {
  NSF_LIST_DEFAULT_COLUMN_WIDTH,
  NSF_LIST_FULL_HEADERS,
  NSF_LIST_MIN_TRUNCATE_PREFIX,
  NSF_LIST_TABLE_HEADERS,
} from "./nsfConstants";
import type { ListNsfFormatInput, ListNsfOptions, ListNsfRow } from "./nsfTypes";

export enum ListNsfFormat {
  Table = "table",
  CSV = "csv",
  JSON = "json",
}

export type { ListNsfFormatInput, ListNsfOptions, ListNsfRow };

export type FormattedListNsfTable = {
  headers: string[];
  rows: string[][];
};

function compareRows(a: ListNsfRow, b: ListNsfRow): number {
  const typeCompare = a.itemType.localeCompare(b.itemType);
  return typeCompare !== 0
    ? typeCompare
    : a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
}

function collectFolderRows(storage: InMemoryStorage): ListNsfRow[] {
  return getKeeperDriveFolders(storage).map((folder) => ({
    itemType: NsfItemType.Folder,
    uid: folder.uid,
    title: folder.data.name || "Unnamed",
    type: "",
    description: "",
    parentOrFolder: displayNsfParentUid(storage, folder.parentUid),
  }));
}

function collectRecordRows(storage: InMemoryStorage): ListNsfRow[] {
  return getKeeperDriveRecords(storage).map((record) => ({
    itemType: NsfItemType.Record,
    uid: record.uid,
    title: getRecordTitle(record),
    type: getRecordType(record),
    description: getRecordDescription(record),
    parentOrFolder: findRecordFolderParentUid(storage, record.uid),
  }));
}

export function listNestedShareFolders(
  storage: InMemoryStorage,
  options: ListNsfOptions = {},
): ListNsfRow[] {
  const showFolders = options.folders ?? options.records == null;
  const showRecords = options.records ?? options.folders == null;
  const roeEligible = options.roeEligible ?? false;
  const rows: ListNsfRow[] = [];
  if (showFolders) {
    const folderRows = collectFolderRows(storage);
    rows.push(
      ...(roeEligible
        ? folderRows.filter((row) =>
            nsfFolderHasPamUserWithRotation(storage, row.uid),
          )
        : folderRows),
    );
  }
  if (showRecords) {
    const recordRows = collectRecordRows(storage);
    rows.push(
      ...(roeEligible
        ? recordRows.filter((row) => nsfRecordIsRoeEligible(storage, row.uid))
        : recordRows),
    );
  }
  return rows.sort(compareRows);
}

function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  if (maxLength <= NSF_LIST_MIN_TRUNCATE_PREFIX)
    return text.slice(0, maxLength);
  return `${text.slice(0, maxLength - NSF_LIST_MIN_TRUNCATE_PREFIX)}...`;
}

export function formatListNsfTable(
  rows: ListNsfRow[],
  options: { columnWidth?: number } = {},
): FormattedListNsfTable {
  const columnWidth = options.columnWidth ?? NSF_LIST_DEFAULT_COLUMN_WIDTH;
  const outRows = rows.map((row, index) => [
    String(index + 1),
    row.itemType,
    truncateText(row.uid, columnWidth),
    truncateText(row.title, columnWidth),
    truncateText(row.type, columnWidth),
    truncateText(row.description, columnWidth),
  ]);
  return { headers: [...NSF_LIST_TABLE_HEADERS], rows: outRows };
}

export function renderListNsfAsciiTable(
  table: FormattedListNsfTable,
  options: { minColWidth?: number } = {},
): string {
  const { minColWidth = 2 } = options;
  const { headers, rows } = table;
  const columnCount = headers.length;
  const columnWidths = headers.map((header, columnIndex) => {
    let width = Math.max(header.length, minColWidth);
    for (const row of rows) {
      width = Math.max(width, (row[columnIndex] || "").length, minColWidth);
    }
    return width;
  });
  const padCell = (cell: string, columnIndex: number) =>
    cell + " ".repeat(columnWidths[columnIndex] - cell.length);
  const formatRow = (cells: string[]) =>
    cells.map((cell, columnIndex) => padCell(cell, columnIndex)).join("  ");
  const ruleRow = columnWidths
    .map((width, columnIndex) => padCell("-".repeat(width), columnIndex))
    .join("  ");
  return [formatRow(headers), ruleRow, ...rows.map(formatRow)].join("\n");
}

function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function formatListNsfCsv(rows: ListNsfRow[]): string {
  const lines = [NSF_LIST_FULL_HEADERS.join(",")];
  for (const row of rows) {
    lines.push(
      [
        row.itemType,
        row.uid,
        row.title,
        row.type,
        row.description,
        row.parentOrFolder,
      ]
        .map(escapeCsvCell)
        .join(","),
    );
  }
  return lines.join("\n");
}

export function formatListNsfJson(rows: ListNsfRow[]): string {
  return JSON.stringify(
    rows.map((row) => ({
      "Item Type": row.itemType,
      UID: row.uid,
      Title: row.title,
      Type: row.type,
      Description: row.description,
      "Parent/Folder": row.parentOrFolder,
    })),
    null,
    2,
  );
}

export function formatListNsfOutput(
  rows: ListNsfRow[],
  format: ListNsfFormatInput = ListNsfFormat.Table,
): string {
  switch (format) {
    case ListNsfFormat.CSV:
      return formatListNsfCsv(rows);
    case ListNsfFormat.JSON:
      return formatListNsfJson(rows);
    default:
      return renderListNsfAsciiTable(formatListNsfTable(rows));
  }
}

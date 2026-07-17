import { writeFileSync } from "fs";
import {
  cleanup,
  extractErrorMessage,
  login,
  logger,
  prompt,
  suppressLogs,
} from "@keeper-security/keeper-sdk-javascript";
import type {
  DownloadMembershipOptions,
  MembershipData,
} from "@keeper-security/keeper-sdk-javascript";
import { runExample } from "../utils/runner";
import { isYes } from "../utils/format";

async function downloadMembershipCommand() {
  const vault = await login();

  try {
    const outputPath =
      (
        await prompt("Output JSON file path (default membership.json): ")
      ).trim() || "membership.json";
    const foldersOnly = isYes(
      await prompt("Folders only (skip enterprise team membership)? [y/N]: "),
    );
    const folderFilter = (
      await prompt("Filter by shared folder name/uid (leave blank for all): ")
    ).trim();

    const options: DownloadMembershipOptions = { foldersOnly };
    if (folderFilter) options.folderFilter = folderFilter;

    let data: MembershipData;
    const restore = suppressLogs();
    try {
      data = await vault.downloadMembership(options);
    } finally {
      restore();
    }

    writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf8");

    logger.info(
      `Wrote ${data.shared_folders.length} shared folder(s) to "${outputPath}".`,
    );
    if (data.teams) {
      logger.info(`Included ${data.teams.length} enterprise team(s).`);
    }
  } catch (err) {
    logger.error(`Operation failed: ${extractErrorMessage(err)}`);
    process.exitCode = 1;
  } finally {
    cleanup(vault);
  }
}

runExample(downloadMembershipCommand);

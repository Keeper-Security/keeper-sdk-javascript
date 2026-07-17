import { readFileSync } from "fs";
import {
  cleanup,
  extractErrorMessage,
  login,
  logger,
  prompt,
  suppressLogs,
} from "@keeper-security/keeper-sdk-javascript";
import type {
  ApplyMembershipInput,
  ApplyMembershipOptions,
  ApplyMembershipResult,
} from "@keeper-security/keeper-sdk-javascript";
import { runExample } from "../utils/runner";
import { isYes } from "../utils/format";

function summarize(result: ApplyMembershipResult): void {
  for (const folder of result.folders) {
    const label = folder.sharedFolderUid
      ? `${folder.path} (${folder.sharedFolderUid})`
      : folder.path;
    if (folder.success) {
      logger.info(
        `${label}: users +${folder.counts.usersAdded}/~${folder.counts.usersUpdated}/-${folder.counts.usersRemoved}` +
          `  teams +${folder.counts.teamsAdded}/~${folder.counts.teamsUpdated}/-${folder.counts.teamsRemoved}`,
      );
    } else {
      logger.error(
        `${label}: FAILED${folder.message ? ` - ${folder.message}` : ""}`,
      );
    }
  }
  for (const team of result.teamMembership) {
    const label = team.teamUid ? `${team.name} (${team.teamUid})` : team.name;
    if (team.success) {
      logger.info(
        `Team "${label}" membership: +${team.added}/-${team.removed}`,
      );
    } else {
      logger.error(
        `Team "${label}" membership: FAILED${team.message ? ` - ${team.message}` : ""}`,
      );
    }
  }
  const t = result.totals;
  logger.info(
    `Totals: users +${t.usersAdded}/~${t.usersUpdated}/-${t.usersRemoved}` +
      `  teams +${t.teamsAdded}/~${t.teamsUpdated}/-${t.teamsRemoved}` +
      `  team members +${t.teamMembersAdded}/-${t.teamMembersRemoved}`,
  );
}

async function applyMembershipCommand() {
  const vault = await login();

  try {
    const inputPath =
      (
        await prompt("Input JSON file path (default membership.json): ")
      ).trim() || "membership.json";
    const fullSync = isYes(
      await prompt(
        "Full sync (also update permissions and remove extras not in the file)? [y/N]: ",
      ),
    );

    let raw: string;
    try {
      raw = readFileSync(inputPath, "utf8");
    } catch (err) {
      logger.error(
        `Could not read "${inputPath}": ${extractErrorMessage(err)}`,
      );
      process.exitCode = 1;
      return;
    }

    let data: ApplyMembershipInput;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      logger.error(
        `Could not parse "${inputPath}" as JSON: ${extractErrorMessage(err)}`,
      );
      process.exitCode = 1;
      return;
    }

    const options: ApplyMembershipOptions = { fullSync };

    let result: ApplyMembershipResult;
    const restore = suppressLogs();
    try {
      result = await vault.applyMembership(data, options);
    } finally {
      restore();
    }

    summarize(result);
    if (!result.success) {
      logger.error(
        "Some shared folders or teams could not be fully synced. See details above.",
      );
      process.exitCode = 1;
    }
  } catch (err) {
    logger.error(`Operation failed: ${extractErrorMessage(err)}`);
    process.exitCode = 1;
  } finally {
    cleanup(vault);
  }
}

runExample(applyMembershipCommand);

import {
  cleanup,
  extractErrorMessage,
  login,
  logger,
  prompt,
  RotationProfile,
  PasswordComplexityInput,
  ScheduleData,
  suppressLogs,
} from "@keeper-security/keeper-sdk-javascript";
import { runExample } from "../../utils/runner";
import { isYes } from "../../utils/format";

async function editRotationExample() {
  const vault = await login();

  try {
    // Get record UID or NSF record title
    const recordUidInput = await prompt(
      "Record UID or NSF record title to edit (-r): ",
    );
    const recordUid = recordUidInput.trim();
    if (!recordUid) {
      logger.info("Record UID or NSF record title is required.");
      process.exitCode = 1;
      return;
    }

    // Get optional parameters
    const configUidInput = await prompt(
      "PAM Configuration UID or NSF record title (-c): ",
    );
    const configUid = configUidInput.trim() || undefined;

    const resourceUidInput = await prompt(
      "PAM Resource UID or NSF record title (-rs): ",
    );
    const resourceUid = resourceUidInput.trim() || undefined;

    const iamAadConfigUidInput = await prompt(
      "IAM/AAD Configuration UID (-iac): ",
    );
    const iamAadConfigUid = iamAadConfigUidInput.trim() || undefined;

    const saasConfigUidInput = await prompt("SaaS Configuration UID: ");
    const saasConfigUid = saasConfigUidInput.trim() || undefined;

    const adminUserUidInput = await prompt("Admin User UID (-a): ");
    const adminUserUid = adminUserUidInput.trim() || undefined;

    // Get rotation profile
    let rotationProfile: RotationProfile | undefined;
    const profileInputRaw = await prompt(
      "Rotation Profile [general|iam_user|scripts_only|saas] (optional): ",
    );
    const profileInput = profileInputRaw.trim().toLowerCase();
    if (
      profileInput &&
      ["general", "iam_user", "scripts_only", "saas"].includes(profileInput)
    ) {
      rotationProfile = profileInput as RotationProfile;
    }

    // Get schedule options
    const scheduleOptionsRaw = await prompt(
      "Schedule type [on-demand|json|cron|config] (optional): ",
    );
    const scheduleOptions = scheduleOptionsRaw.trim().toLowerCase();

    let onDemand = false;
    let scheduleJson: ScheduleData[] | undefined;
    let scheduleCron: string | undefined;
    let scheduleConfig = false;

    if (scheduleOptions === "on-demand") {
      onDemand = true;
    } else if (scheduleOptions === "json") {
      const jsonStrInput = await prompt("Schedule JSON: ");
      const jsonStr = jsonStrInput.trim();
      if (jsonStr) {
        try {
          const parsed = JSON.parse(jsonStr);
          // Wrap single object in array if needed
          scheduleJson = Array.isArray(parsed) ? parsed : [parsed];
        } catch (e) {
          logger.error("Invalid schedule JSON.");
          process.exitCode = 1;
          return;
        }
      }
    } else if (scheduleOptions === "cron") {
      const cronInput = await prompt(
        "Cron expression (6 fields, e.g. 0 0 4 * * ?): ",
      );
      scheduleCron = cronInput.trim() || undefined;
    } else if (scheduleOptions === "config") {
      scheduleConfig = true;
    }

    // Get password complexity
    let passwordComplexity: PasswordComplexityInput | undefined;
    const setPwdInput = await prompt("Set password complexity? [y/N]: ");
    if (isYes(setPwdInput)) {
      const lengthInput = await prompt("Password length: ");
      const length = parseInt(lengthInput) || 32;

      const capsInput = await prompt("Capital letters: ");
      const caps = parseInt(capsInput) || 5;

      const lowercaseInput = await prompt("Lowercase letters: ");
      const lowercase = parseInt(lowercaseInput) || 5;

      const digitsInput = await prompt("Digits: ");
      const digits = parseInt(digitsInput) || 5;

      const specialInput = await prompt("Special characters: ");
      const special = parseInt(specialInput) || 5;

      const specialCharsInput = await prompt(
        "Special characters set (optional): ",
      );
      const specialChars = specialCharsInput.trim() || undefined;

      passwordComplexity = {
        length,
        caps,
        lowercase,
        digits,
        special,
        specialChars,
      };
    }

    // Get enable/disable state
    const enableInput = await prompt("Enable rotation? [y/N]: ");
    const enable = isYes(enableInput);

    const disableInput = await prompt("Disable rotation? [y/N]: ");
    const disable = !enable && isYes(disableInput);

    const scheduleOnlyInput = await prompt("Update schedule only? [y/N]: ");
    const scheduleOnly = isYes(scheduleOnlyInput);

    const forceInput = await prompt("Skip confirmation? (-f/--force) [y/N]: ");
    const force = isYes(forceInput);

    const input = {
      recordUid,
      configUid,
      resourceUid,
      iamAadConfigUid,
      saasConfigUid,
      adminUserUid,
      rotationProfile,
      onDemand,
      scheduleJson,
      scheduleCron,
      scheduleConfig,
      passwordComplexity,
      enable,
      disable,
      scheduleOnly,
      force,
    };

    // Show confirmation before updating (unless force flag is set)
    if (!force) {
      logger.info("");
      logger.info("=== The following record will be updated ===");
      logger.info(`  Record UID: ${recordUid}`);
      if (configUid) logger.info(`  Config UID: ${configUid}`);
      if (resourceUid) logger.info(`  Resource UID: ${resourceUid}`);
      if (input.scheduleJson || input.scheduleCron || input.onDemand) {
        logger.info(`  Schedule: ${input.onDemand ? "On-Demand" : "Custom"}`);
      }
      if (passwordComplexity) {
        logger.info("  Complexity: configured");
      }
      if (enable || disable) {
        logger.info(`  Enabled: ${enable === true}`);
      }
      logger.info("");

      // Ask for confirmation
      const confirmInput = await prompt(
        "Do you want to update rotation? [Y/n]: ",
      );
      if (confirmInput.trim().toLowerCase().startsWith("n")) {
        logger.info("Update cancelled.");
        process.exitCode = 0;
        return;
      }
    }

    let result;
    const restore = suppressLogs();
    try {
      result = await vault.editRotation(input);
    } finally {
      restore();
    }

    logger.info("");
    logger.info(
      `Operation Result: ${result.successful ? "SUCCESS" : "FAILED"}`,
    );
    logger.info(`Updated ${result.validRecords.length} record(s)`);
    if (result.skippedRecords.length > 0) {
      logger.info(`Skipped ${result.skippedRecords.length} record(s)`);
    }
    logger.info(result.message || "");
    logger.info("");

    if (result.validRecords.length > 0) {
      logger.info("Updated Records:");
      result.validRecords.forEach((record) => {
        logger.info(`  - ${record.recordTitle} (${record.recordUid})`);
        logger.info(`    Enabled: ${record.enabled}`);
        logger.info(`    Config UID: ${record.configUid || "N/A"}`);
        logger.info(`    Resource UID: ${record.resourceUid || "N/A"}`);
        logger.info(`    Schedule: ${record.schedule}`);
        if (record.complexity) logger.info("    Complexity: configured");
      });
    }

    if (result.skippedRecords.length > 0) {
      logger.info("");
      logger.info("Skipped Records:");
      result.skippedRecords.forEach((record) => {
        logger.info(`  - ${record.recordTitle} (${record.recordUid})`);
        logger.info(`    Problem: ${record.problem}`);
        logger.info(`    Description: ${record.description}`);
      });
    }
  } catch (err) {
    logger.error(`Operation failed: ${extractErrorMessage(err)}`);
    process.exitCode = 1;
  } finally {
    cleanup(vault);
  }
}

runExample(editRotationExample);

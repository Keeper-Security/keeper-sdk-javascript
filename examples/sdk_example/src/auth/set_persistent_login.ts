import {
  KeeperVault,
  KeeperSdkError,
  loadKeeperConfig,
  resolveServer,
  prompt,
  suppressLogs,
  cleanup,
  logger,
  extractResultCode,
  SdkDefaults,
  ResultCodes,
  setPersistentLogin as applyPersistentLogin,
  DEFAULT_PERSISTENT_LOGIN_TIMEOUT_MINUTES,
} from "@keeper-security/keeper-sdk-javascript";
import { runExample } from "../utils/runner";

const MAX_ATTEMPTS = 5;
async function setPersistentLogin() {
  const config = await loadKeeperConfig();
  const defaultUsername = config.last_login || config.user || "";

  let username: string;
  if (defaultUsername) {
    logger.info(`Enter master password for ${defaultUsername}`);
    username = defaultUsername;
  } else {
    username = await prompt("Username (email): ");
    if (!username)
      throw new KeeperSdkError(
        "Username is required.",
        ResultCodes.MISSING_USERNAME,
      );
  }

  const host = await resolveServer(username);
  const vault = new KeeperVault({
    host,
    clientVersion: SdkDefaults.CLIENT_VERSION,
  });

  try {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      const password = await prompt("Password: ", true);
      if (!password)
        throw new KeeperSdkError(
          "Password is required.",
          ResultCodes.MISSING_PASSWORD,
        );

      const restore = suppressLogs();
      try {
        await vault.login(username, password);
        restore();
        break;
      } catch (err) {
        restore();
        const resultCode = extractResultCode(err);
        if (resultCode === ResultCodes.INVALID_CREDENTIALS) {
          const remaining = MAX_ATTEMPTS - attempt;
          if (remaining > 0) {
            logger.warn(
              `Incorrect password (${remaining} attempt${remaining === 1 ? "" : "s"} remaining)`,
            );
            continue;
          }
          throw new KeeperSdkError(
            `Maximum login attempts (${MAX_ATTEMPTS}) exceeded.`,
            ResultCodes.MAX_ATTEMPTS_EXCEEDED,
          );
        }
        throw KeeperSdkError.from(err);
      }
    }

    const choice = (
      await prompt("Persistent login: enable or disable? [e/d]: ")
    )
      .trim()
      .toLowerCase();
    if (
      choice !== "e" &&
      choice !== "enable" &&
      choice !== "d" &&
      choice !== "disable"
    ) {
      throw new KeeperSdkError(
        "Please choose enable or disable.",
        ResultCodes.USER_CANCELLED,
      );
    }

    const enabled = choice === "e" || choice === "enable";
    await applyPersistentLogin(
      vault.getAuth(),
      enabled,
      DEFAULT_PERSISTENT_LOGIN_TIMEOUT_MINUTES,
    );
    logger.info(
      `Persistent login ${enabled ? "enabled" : "disabled"} successfully.`,
    );
  } finally {
    cleanup(vault);
  }
}

runExample(setPersistentLogin);

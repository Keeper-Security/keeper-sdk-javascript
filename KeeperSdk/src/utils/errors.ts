import type { KeeperError } from "@keeper-security/keeperapi";

function parseJsonObjectIfPresent(s: string): Record<string, unknown> | null {
  const t = s.trim();
  if (t.length === 0 || (t[0] !== "{" && t[0] !== "[")) return null;
  try {
    const parsed: unknown = JSON.parse(s);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      !Array.isArray(parsed)
    ) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    /* not JSON */
  }
  return null;
}

export function isKeeperError(err: unknown): err is KeeperError {
  return (
    err != null &&
    typeof err === "object" &&
    !(err instanceof Error) &&
    ("result_code" in err || "error" in err || "response_code" in err)
  );
}

export function extractResultCode(err: unknown): string | undefined {
  if (isKeeperError(err)) {
    return err.result_code || err.error;
  }
  if (err instanceof Error) {
    const msg = err.message;
    if (msg.length > 0 && (msg[0] === "{" || msg[0] === "[")) {
      try {
        const parsed = JSON.parse(msg);
        return parsed.result_code || parsed.error;
      } catch {}
    }
  }
  if (typeof err === "string") {
    const parsed = parseJsonObjectIfPresent(err);
    if (parsed) {
      if (typeof parsed.result_code === "string") return parsed.result_code;
      if (typeof parsed.error === "string") return parsed.error;
    }
    return err;
  }
  if (typeof err === "object" && err !== null) {
    const obj = err as Record<string, unknown>;
    if (typeof obj.result_code === "string") return obj.result_code;
    if (typeof obj.error === "string") return obj.error;
  }
  return undefined;
}

export function extractErrorMessage(err: unknown): string {
  if (isKeeperError(err)) {
    return (
      err.message || err.result_code || err.error || "Unknown Keeper error"
    );
  }
  if (err instanceof Error) {
    const parsed = parseJsonObjectIfPresent(err.message);
    if (parsed) {
      if (typeof parsed.message === "string") return parsed.message;
      if (typeof parsed.result_code === "string") return parsed.result_code;
      if (typeof parsed.error === "string") return parsed.error;
    }
    return err.message;
  }
  if (typeof err === "string") {
    const parsed = parseJsonObjectIfPresent(err);
    if (parsed) {
      if (typeof parsed.message === "string") return parsed.message;
      if (typeof parsed.result_code === "string") return parsed.result_code;
      if (typeof parsed.error === "string") return parsed.error;
    }
    return err;
  }
  if (typeof err === "object" && err !== null) {
    const obj = err as Record<string, unknown>;
    if (typeof obj.message === "string") return obj.message;
    if (typeof obj.result_code === "string") return obj.result_code;
  }
  return String(err);
}

export class KeeperSdkError extends Error {
  readonly resultCode?: string;
  readonly keeperError?: KeeperError;

  constructor(message: string, resultCode?: string, keeperError?: KeeperError) {
    super(message);
    this.name = "KeeperSdkError";
    this.resultCode = resultCode;
    this.keeperError = keeperError;
  }

  static from(err: unknown): KeeperSdkError {
    if (err instanceof KeeperSdkError) return err;
    if (isKeeperError(err)) {
      return new KeeperSdkError(
        err.message || err.result_code || err.error || "Unknown Keeper error",
        err.result_code || err.error,
        err,
      );
    }
    if (err instanceof Error) return new KeeperSdkError(err.message);
    return new KeeperSdkError(extractErrorMessage(err));
  }
}

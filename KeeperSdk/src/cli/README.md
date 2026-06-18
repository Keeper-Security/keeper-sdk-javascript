# Keeper SDK — CLI layer

Commander-aligned shell commands for browser shell.
Entry point: `dispatchCliLine(line, host)` or `createKeeperCliParser()`.

## Commands

### Before login

| Command | Aliases | Notes |
|---------|---------|--------|
| `help` | `?` | All commands or `help <cmd>` |
| `login` | | Interactive / flags |
| `restore-session` | | Extension JSON / env |
| `register-device` | | Device token for session login |

### After login

| Area | Commands |
|------|----------|
| Session | `logout`, `sync` (`syncdown`, `sync-down`, `d`), `whoami` |
| Records | `list` (`l`), `search` (`s`), `get` (`g`) |
| Folders | `ls`, `cd`, `tree`, `mkdir` |
| Shared folders | `list-sf` (`lsf`) |
| Vault counts | `vault summary` |

Every command supports `--help` / `-h`.

Record/folder **writes** (`add`, `update`, `delete`, `share`, …) are SDK API only — not CLI commands yet.

## Embedding (`KeeperCliHost`)

Implement `KeeperCliHost` and expose a `KeeperCliVault` adapter (usually wrapping `KeeperVault`).

**Required:** `isLoggedIn`, `login`, `loginWithSessionToken`, `logout`, `sync`, `getRecords`, `getSharedFolders`, `restoreSession`.

**Optional** (command fails with a clear message if missing):

| Method | Commands |
|--------|----------|
| `findRecord`, `findRecords` | `get`, `search` |
| `getRecordShareInfo` | `get` (share sections in detail output — planned) |
| `getWhoamiInfo` | `whoami` |
| `getSummary` | `vault summary` |
| `listFolder`, `changeDirectory`, `tree`, `mkdir`, … | folder navigation |
| `listSharedFolders` | `list-sf` |

Types: `types.ts`.

```typescript
import { dispatchCliLine, type KeeperCliHost } from '@keeper-security/keeper-sdk-javascript'

const result = await dispatchCliLine('whoami', host)
process.stdout.write(result.out)
if (result.err) process.stderr.write(result.err)
```

## Commander parity

### `whoami`

Uses `vault.getWhoamiInfo()` → account summary API (user, server, data center, admin, license, storage, BreachWatch).

- `--verbose` / `-v` — syncs vault, adds record/shared-folder/team counts and reporting status
- `--json` — Commander-compatible field names (`data_center`, `breachwatch`, …)

Formatting: `account/whoamiFormat.ts`.

### `get`

| `--format` | Behavior |
|------------|----------|
| `detail` (default) | Record fields via `formatRecord` |
| `json` | Full `DRecord` JSON |
| `password` | Password field only |
| `fields` | Field name/value JSON |

Target resolution: shared folder UID → folder path/UID → record UID/title.

**Target Commander detail output** (UID/Type/Title + User Permissions + Shared Folder Permissions + Share Admins) requires wiring `getRecordShareInfo` in the host and a dedicated formatter — tracked below.

### `search` vs `get`

- **`get <uid>`** — exact UID (record, shared folder, or folder)
- **`search <terms>`** — text match across record title/fields (not raw UID lookup)

## Extending

```typescript
import { registerCliCommand, type CliCommandDefinition } from '@keeper-security/keeper-sdk-javascript'

registerCliCommand({
    name: 'my-cmd',
    description: '…',
    usage: 'my-cmd',
    help: { description: '…' },
    async run(host, parsed) {
        return { code: 0, out: 'ok\n', err: '' }
    },
})
```

Call `ensureKeeperCliRegistry()` before dispatch if you register commands after import.

## Changelog (CLI)

Track CLI-only changes here — not in the package root `KeeperSdk/README.md`.

### Unreleased

- **`whoami`** — Commander-style sections (User Info / Account); data in `account/whoamiInfo.ts`, format in `cli/account/whoamiFormat.ts`; `--verbose`, `--json`
- **`getDetailedHelpPage`** — exported from `help.ts` / `cli/index.ts` for public API (`getDetailedHelpPageForRegistry` for filtered registries)
- **Help system** — argparse-style `--help` via `formatArgparseHelp` (`help.ts`)

### Planned / in progress

- **`get --format detail`** — Commander layout with permissions and share admins (`getRecordShareInfo`)
- **Report commands** — `reportOutput.ts` helpers for table/csv/json; PDF not supported in JS CLI host

### Conventions

- Commander parity formatters live under `cli/commander/` or `cli/account/`
- Domain data builders stay outside `cli/` when used by `KeeperVault`
- Update this changelog when adding or changing commands, flags, or output format

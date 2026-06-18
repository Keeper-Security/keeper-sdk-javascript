# @keeper-security/keeper-sdk-javascript

Keeper JavaScript SDK for **Node** and **browser** — vault API, sharing, folders, and a Commander-style CLI (`dispatchCliLine`).

[![NPM](https://img.shields.io/npm/v/@keeper-security/keeper-sdk-javascript?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/@keeper-security/keeper-sdk-javascript)

## Install

```bash
npm install @keeper-security/keeper-sdk-javascript
```

## Entry points

| Environment | Import | Notes |
|-------------|--------|--------|
| Node | `@keeper-security/keeper-sdk-javascript` → `dist/index.js` | `ConsoleAuthUI`, `FileConfigLoader`, full auth |
| Browser | same package → `dist/browser.js` | Platform shim only; use in-memory session + `restore-session` |

## Quickstart (Node)

```typescript
import { KeeperVault, ConsoleAuthUI, FileConfigLoader } from '@keeper-security/keeper-sdk-javascript'

const vault = new KeeperVault({
    authUI: new ConsoleAuthUI(),
    sessionStorage: new FileConfigLoader('./keeper-config.json'),
})

await vault.login('user@example.com', 'password')
await vault.sync()

console.log(`Loaded ${vault.getRecords().length} records`)
```

## Built-in shell CLI

**CLI docs & changelog:** [`src/cli/README.md`](src/cli/README.md)

Commander-aligned commands via `dispatchCliLine(line, host)` or `createKeeperCliParser()`.

### Before login

`help`, `login`, `restore-session`, `register-device`

### After login

| Area | Commands |
|------|----------|
| Session | `logout`, `sync` (`syncdown`, `sync-down`, `d`), `whoami` |
| Records | `list` (`l`), `search` (`s`), `get` (`g`) |
| Folders | `ls`, `cd`, `tree`, `mkdir`, `list-sf` (`lsf`) |
| Vault info | `vault summary` |

Every command supports `--help` / `-h`. Record/folder **write** operations (`add`, `update`, `delete`, `share`, …) are SDK API only — see [`examples/sdk_example`](../examples/sdk_example).

### Finding records and folders

| Goal | Command |
|------|---------|
| Record by UID (exact) | `get <record-uid>` |
| Record by title | `get "Gmail Login"` |
| Text in title/fields | `search <terms…>` (all terms must match; not for raw UID paste) |
| Shared folder by UID | `get <sf-uid>` or `list-sf <pattern>` |
| Folder by path/UID | `get <folder-uid>`, `ls`, `cd`, `tree` |
| All records (table) | `list` or `list --verbose` |

`search` covers **vault records** only (title, fields, UID substring). For exact UID lookup use **`get`**, not `search`.

### `get` (Commander-style detail)

Default `--format detail` prints aligned fields and, when the host exposes `getRecordShareInfo`, fetches share metadata:

```text
                 UID: DAqb-wR89VrcdUxzrcW6ww
                Type: login
               Title: TestingParam

User Permissions:

  User: user@example.com
  Owner: Yes
  Shareable: Yes
  Read-Only: No

Shared Folder Permissions:

  Shared Folder UID: cYEzoDium40DV9VlBwmRJQ

Share Admins (9):
  admin1@example.com
  ...
```

Other formats: `--format json`, `--format password`, `--format fields`, `--unmask`.

Implementation: `src/cli/commander/getFormat.ts` + `getCore.ts`.

### `whoami`

Uses `vault.getWhoamiInfo()` (account summary, server, data center, license). `--verbose` / `-v` syncs and includes vault counts; `--json` emits Commander-compatible JSON.

Hosts **must** wire `getWhoamiInfo` on `KeeperCliVault` (see below).

### CLI usage

```typescript
import { dispatchCliLine, type KeeperCliHost } from '@keeper-security/keeper-sdk-javascript'

const result = await dispatchCliLine('get DAqb-wR89VrcdUxzrcW6ww', host)
console.log(result.out)
```

Shell parity example:

```bash
cd examples/sdk_example
npm run records:list:shell-cli -- --from-json /path/to/session.json
```

## Embedding the CLI (`KeeperCliHost`)

Thin hosts (browser shell, tests) implement `KeeperCliHost` and expose a `KeeperCliVault` adapter around `KeeperVault`.

**Required for session commands:** `isLoggedIn`, `login`, `loginWithSessionToken`, `logout`, `sync`, `getRecords`, `getSharedFolders`, `restoreSession`.

**Optional — commands fail with a clear message if missing:**

| Method | Commands |
|--------|----------|
| `findRecord`, `findRecords` | `get`, `search` |
| `getRecordShareInfo` | `get` (share sections in detail output) |
| `getWhoamiInfo` | `whoami` |
| `getSummary` | `vault summary` |
| `listFolder`, `cd`, `tree`, `mkdir`, … | folder navigation |
| `listSharedFolders` | `list-sf` |

Full type: `src/cli/types.ts` (`KeeperCliVault`, `KeeperCliHost`).

A full `KeeperVault` adapter should forward **all** optional methods used by built-in commands — do not omit `getWhoamiInfo` or `getRecordShareInfo` if you want parity with Commander.

## Supported vault API

`KeeperVault` exposes auth, records, folders, sharing, and enterprise helpers (teams/users require admin). See `src/vault/KeeperVault.ts` and [`examples/sdk_example`](../examples/sdk_example).

## Examples

```bash
cd examples/sdk_example
npm install
npm run auth:login
npm run records:list
npm run records:get        # interactive; similar to CLI get + share info
npm run folders:ls
npm run shared-folders:list-sf
```

## Local development

From repo root, build keeperapi first:

```bash
cd keeperapi && npm install && npm run build
cd ../KeeperSdk && npm install && npm run link-local && npm run build
```

Watch types: `npm run types` (in `KeeperSdk/`).

## Related

- [`keeperapi/README.md`](../keeperapi/README.md) — core client
- [`../README.md`](../README.md) — monorepo overview

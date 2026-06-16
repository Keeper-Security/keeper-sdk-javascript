# @keeper-security/keeper-sdk-javascript

Keeper Javascript SDK for Node.js.

[![NPM](https://img.shields.io/npm/v/@keeper-security/keeper-sdk-javascript?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/@keeper-security/keeper-sdk-javascript)

## Install

```bash
npm install @keeper-security/keeper-sdk-javascript
```

## Quickstart

```typescript
import { KeeperVault, ConsoleAuthUI, FileConfigLoader } from '@keeper-security/keeper-sdk-javascript'

const vault = new KeeperVault({
    authUI: new ConsoleAuthUI(),
    configLoader: new FileConfigLoader('./keeper-config.json'),
})

await vault.login()
await vault.syncDown()

console.log(`Loaded ${vault.records.size} records`)
```

## Supported functionality

`KeeperVault` exposes vault operations. Enterprise features require an enterprise administrator account.

- **Authentication**: Login, session token login, resume session, sync, logout
- **Records**: List, search, add, update, delete, move, history
- **Folders**: List, get, create, rename, delete, change directory, folder tree
- **Shared folders**: List shared folders, share with users, update permissions
- **Sharing**: Share and unshare records, check share info
- **Teams / users / roles** (enterprise admin): Available via the SDK API; not exposed as shell commands in this release

## Built-in shell CLI

The package includes a Commander-style CLI (`dispatchCliLine`, `createKeeperCliParser`) for auth, records, and folders.

**Before login:** `help`, `login`, `restore-session`

**After login:**

| Area | Commands |
|------|----------|
| Session | `logout`, `sync` (`syncdown`, `sync-down`, `d`), `whoami` |
| Records | `list` (`l`), `search` (`s`), `get` (`g`) |
| Folders | `ls`, `cd`, `tree`, `mkdir`, `list-sf` (`lsf`) |
| Vault info | `vault summary` |

Every command supports `--help`. Record/folder write operations (`add`, `update`, `delete`, `share`, …) are SDK-only — see the examples below.

### Finding records and folders

| Goal | Command |
|------|---------|
| Record by UID (exact) | `get <record-uid>` |
| Record by title | `get "Gmail Login"` or `search gmail` |
| Text in title/fields | `search <terms…>` (all terms must match) |
| Shared folder by UID | `get <sf-uid>` or `list-sf <pattern>` |
| Folder by path/UID | `get <folder-uid>`, `ls`, `cd`, `tree` |
| All records (table) | `list` or `list --verbose` |
| Account summary | `whoami` or `vault summary` |

`search` only covers **vault records** (title, fields, UID). It does not search teams or enterprise users — use the SDK API (`vault.viewTeam`, `vault.listTeams`, …) or `examples/sdk_example` scripts for those.

```typescript
import { dispatchCliLine, type KeeperCliHost } from '@keeper-security/keeper-sdk-javascript'

await dispatchCliLine('restore-session --from-json session.json', host)
await dispatchCliLine('list', host)
await dispatchCliLine('ls', host)
```

## Examples

Runnable SDK scripts are in [`examples/sdk_example`](../examples/sdk_example):

```bash
cd examples/sdk_example
npm install
npm run auth:login
npm run records:list
npm run folders:ls
npm run shared-folders:list-sf
```

Shell CLI parity (same dispatch path as the vault shell):

```bash
npm run records:list:shell-cli -- --from-json /path/to/session.json
```

## Local development

From the `KeeperSdk/` directory:

```bash
npm install
npm run link-local
npm run build
```

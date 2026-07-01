# @keeper-security/keeper-sdk-javascript

Keeper JavaScript SDK for **Node** and **browser** — vault API, sharing, folders, and enterprise admin APIs.

> **CLI:** Commander-style shell commands (`dispatchCliLine`, `help`, `get`, `ls`, …) live in [**@keeper-security/keeper-shell-component**](https://www.npmjs.com/package/@keeper-security/keeper-shell-component) (or this monorepo’s `commander-javascript-cli` package). This SDK package is API-only.

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

## Supported functionality

`KeeperVault` exposes vault operations. Enterprise features require an enterprise administrator account.

- **Authentication**: Login, session token login, resume session, sync, logout
- **Records**: List, search, add, update, delete, move, history
- **Folders**: List, get, create, rename, delete, change directory, folder tree
- **Shared folders**: List shared folders, share with users, update permissions
- **Sharing**: Share and unshare records, check share info
- **Teams / users / roles** (enterprise admin): Available via the SDK API

## Examples

Shell CLI (`dispatchCliLine`, categorized `help`, record/folder commands) is provided by **@keeper-security/keeper-shell-component** — see that package’s `src/keeper-cli/README.md`.

Runnable SDK scripts are in [`examples/sdk_example`](../examples/sdk_example):

```bash
cd examples/sdk_example
npm install
npm run auth:login
npm run records:list
npm run records:get        # interactive; similar to CLI get + share info
npm run folders:ls
npm run shared-folders:list-sf
```

Shell CLI parity (same dispatch path as the vault shell):

```bash
npm run records:list:shell-cli -- --from-json /path/to/session.json
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

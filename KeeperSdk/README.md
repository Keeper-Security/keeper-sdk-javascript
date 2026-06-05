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

`KeeperVault` exposes the operations below. Enterprise features require an enterprise administrator account.

- **Authentication**: Login, session token login, resume session, sync, logout
- **Records**: List, search, add, update, delete, move, history
- **Folders**: List, get, create, rename, delete, change directory, folder tree
- **Shared folders**: List shared folders, share with users, update permissions
- **Sharing**: Share and unshare records, check share info
- **Teams**: List, view, add, update, delete teams
- **Users**: List, view, add, update, delete users; lock/unlock accounts; expire passwords; manage aliases and team membership

Enterprise features need an enterprise administrator account.

## Examples

Runnable scripts for the areas above are in [`examples/sdk_example`](../examples/sdk_example):

```bash
cd examples/sdk_example
npm install
npm run auth:login
npm run records:list
npm run folders:ls
npm run shared-folders:list-sf
npm run teams:list
npm run users:list
```

## Local development

From the `KeeperSdk/` directory:

```bash
npm install
npm run link-local
npm run build
```

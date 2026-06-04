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

For end-to-end runnable scripts (login, records CRUD, folder management, sharing, teams, users, user-team), see [`examples/sdk_example`](../examples/sdk_example):

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

![Keeper Javascript SDK Header](https://github.com/user-attachments/assets/45eba9d8-9afc-49e6-b05b-fd1600bd495a)

# Keeper Javascript SDK

This repository contains npm packages for interacting with the Keeper backend from JavaScript or TypeScript.

| Package | Purpose |
|---------|---------|
| [`@keeper-security/keeper-sdk-javascript`](KeeperSdk) | High-level API + Commander-style in-process CLI (`dispatchCliLine`) |
| [`@keeper-security/keeperapi`](keeperapi) | Low-level REST/protobuf client (direct use not recommended) |

[![keeper-sdk-javascript on npm](https://img.shields.io/npm/v/@keeper-security/keeper-sdk-javascript?label=%40keeper-security%2Fkeeper-sdk-javascript&style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/@keeper-security/keeper-sdk-javascript)
[![keeperapi on npm](https://img.shields.io/npm/v/@keeper-security/keeperapi?label=%40keeper-security%2Fkeeperapi&style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/@keeper-security/keeperapi)

## Repository layout

```
keeper-sdk-javascript/
├── KeeperSdk/              # @keeper-security/keeper-sdk-javascript
├── keeperapi/              # @keeper-security/keeperapi
└── examples/
    └── sdk_example/        # Runnable Node scripts (auth, records, folders, …)
```

**Start here for CLI / vault behavior:** [`KeeperSdk/README.md`](KeeperSdk/README.md) — built-in commands, `get` / `whoami` output, and `KeeperCliHost` adapter requirements.

Browser embedders (e.g. `@keeper-security/keeper-shell-component`) consume this repo via npm or a local path. Fix CLI formatting and vault surface issues in **KeeperSdk first**, then rebuild the shell against the updated SDK.

## Quick development

Build **keeperapi** before **KeeperSdk** (SDK depends on keeperapi):

```bash
cd keeperapi && npm install && npm run build
cd ../KeeperSdk && npm install && npm run link-local && npm run build
```

- **Node** entry: `KeeperSdk/dist/index.js`
- **Browser** entry: `KeeperSdk/dist/browser.js` (via `src/browser.ts` — no Node `readline` / console auth)

Run SDK examples:

```bash
cd examples/sdk_example && npm install
npm run auth:restore-session -- --from-json /path/to/session.json
npm run records:list:shell-cli -- --from-json /path/to/session.json
```

## Package docs

- [`KeeperSdk/README.md`](KeeperSdk/README.md) — API, CLI commands, host adapter
- [`keeperapi/README.md`](keeperapi/README.md) — core client

## Contributing

To ignore formatting-only commits in `git blame`:

```bash
git config blame.ignoreRevsFile .git-blame-ignore-revs
```

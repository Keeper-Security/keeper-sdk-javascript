![Keeper Javascript SDK Header](https://github.com/user-attachments/assets/45eba9d8-9afc-49e6-b05b-fd1600bd495a)

# Keeper Javascript SDK

This repository contains npm packages for interacting with the Keeper backend from JavaScript or TypeScript.

[`@keeper-security/keeper-sdk-javascript`](KeeperSdk) has an easy-to-use API with high-level helpers for auth, records, folders, sharing, and teams, plus runnable examples.

[`@keeper-security/keeperapi`](keeperapi) is the underlying core API client. Direct use is not recommended.

[![keeper-sdk-javascript on npm](https://img.shields.io/npm/v/@keeper-security/keeper-sdk-javascript?label=%40keeper-security%2Fkeeper-sdk-javascript&style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/@keeper-security/keeper-sdk-javascript)
[![keeperapi on npm](https://img.shields.io/npm/v/@keeper-security/keeperapi?label=%40keeper-security%2Fkeeperapi&style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/@keeper-security/keeperapi)

## Repository layout

```
KeeperSdk/         # JS SDK (@keeper-security/keeper-sdk-javascript)
keeperapi/         # core API client (@keeper-security/keeperapi)
examples/
└── sdk_example/   # runnable scripts demonstrating the SDK
```

See each package's README for installation and usage:

- [`KeeperSdk/README.md`](KeeperSdk/README.md)
- [`keeperapi/README.md`](keeperapi/README.md)

## Contributing

To ignore formatting-only commits in `git blame`, run:

```bash
git config blame.ignoreRevsFile .git-blame-ignore-revs
```

![Keeper Javascript SDK Header](https://github.com/user-attachments/assets/45eba9d8-9afc-49e6-b05b-fd1600bd495a)

### Keeper Javascript SDK

This Javascript SDK allows you to interact with the Keeper backend API service - login, sync Vault, manage data etc.

This SDK can be used from Node or from the browser

[![NPM](https://img.shields.io/npm/v/@keeper-security/keeperapi?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/@keeper-security/keeperapi)

Usage:

```bash
npm install @keeper-security/keeperapi
```

## Examples

Check out the example projects to see the SDK in action:

- [Node.js Example](examples/print-vault-node) - Print vault contents using Node.js
- [Browser Example](examples/print-vault-browser) - Print vault contents in a React web app

## Local Development

```bash
npm run build
```
 from "keeperapi" folder, then

```bash
npm link ../../keeperapi
```

from your client folder

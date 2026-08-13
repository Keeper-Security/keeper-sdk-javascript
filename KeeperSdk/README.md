![Keeper JavaScript SDK Header](https://github.com/user-attachments/assets/45eba9d8-9afc-49e6-b05b-fd1600bd495a)

[![keeper-sdk-javascript on npm](https://img.shields.io/npm/v/@keeper-security/keeper-sdk-javascript?label=%40keeper-security%2Fkeeper-sdk-javascript&style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/@keeper-security/keeper-sdk-javascript)
[![keeperapi on npm](https://img.shields.io/npm/v/@keeper-security/keeperapi?label=%40keeper-security%2Fkeeperapi&style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/@keeper-security/keeperapi)
[![License](https://img.shields.io/npm/l/@keeper-security/keeper-sdk-javascript)](https://www.npmjs.com/package/@keeper-security/keeper-sdk-javascript)
![Node](https://img.shields.io/node/v/@keeper-security/keeperapi)

# Keeper SDK for JavaScript / TypeScript

## Overview

The Keeper SDK for JavaScript provides developers with a toolkit for integrating Keeper Security's password management and secrets management capabilities into Node.js and browser applications. This repository contains two primary packages:

| Package | Purpose |
|---------|---------|
| [`@keeper-security/keeper-sdk-javascript`](.) | High-level vault and enterprise API (`KeeperVault`) for Node.js and the browser |
| [`@keeper-security/keeperapi`](../keeperapi) | Low-level REST/protobuf client (direct use not recommended for most apps) |

Use the high-level SDK for vault operations, sharing, nested shared folders, and enterprise administration. Runnable examples live under [`examples/sdk_example`](../examples/sdk_example).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Keeper SDK](#keeper-sdk)
  - [About Keeper SDK](#about-keeper-sdk)
  - [Implemented Functionality](#implemented-functionality)
  - [SDK Installation](#sdk-installation)
  - [SDK Environment Setup](#sdk-environment-setup)
  - [SDK Configuration](#sdk-configuration)
  - [Persistent Login](#persistent-login)
  - [SDK Usage Example](#sdk-usage-example)
- [Examples](#examples)
- [Development Setup](#development-setup)
- [Repository Layout](#repository-layout)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## Prerequisites

Before installing the Keeper JavaScript SDK, ensure your system meets the following requirements:

- **Node.js**: 24 LTS or newer (examples target Node 20+; also check the `engines` field on `@keeper-security/keeperapi`)
- **Package Manager**: npm (or a compatible client such as yarn / pnpm)
- **Operating System**: Windows, macOS, or Linux
- **Language**: JavaScript or TypeScript
- **Keeper Account**: A Keeper vault account (enterprise admin features require an administrator account)

To verify your Node.js version:

```bash
node --version
npm --version
```

---

## Keeper SDK

### About Keeper SDK

The Keeper SDK (`@keeper-security/keeper-sdk-javascript`) provides programmatic access to Keeper Security's platform. It enables developers to:

- Authenticate users and manage sessions (master password, session token, persistent login, session restore)
- Access and manipulate vault records (passwords, typed records, history, move)
- Manage user folders and shared folders
- Work with nested shared folders (NSF): create, share, link, transfer, and manage permissions
- Administer enterprise console operations (users, teams, roles, nodes)
- Run enterprise reports (audit, action, password)
- Integrate Keeper's zero-knowledge security model into Node.js scripts and applications

The primary entry point is the `KeeperVault` class. Domain managers (`FolderManager`, `TeamManager`, `RoleManager`, and others) are available through `KeeperVault` when you need lower-level control.

### Implemented Functionality

`KeeperVault` and the supporting modules expose the operations below. Enterprise features require an enterprise administrator account.

| Area | Capabilities |
|------|----------------|
| **Authentication** | Master password login, session token login, device registration, resume persistent session, restore exported session, sync down, logout, whoami |
| **Records** | List, search/find, add, update, delete, move, history, print/format helpers |
| **Folders** | List, get, mkdir, rename/update, rmdir, change directory, folder tree |
| **Shared folders** | List, share with users/teams, update membership, download/apply membership |
| **Sharing** | Share and unshare records, inspect record share info |
| **Nested shared folders (NSF)** | List/get, mkdir/rmdir/rename, add/update/remove records, link, shortcut, share folder/record, transfer, record permissions |
| **Teams** | List, view, add, update, delete, change team roles |
| **Users** | List, view, add, update, delete; lock/unlock and related actions; aliases; team membership |
| **Roles** | List, view, add, update, delete, copy, enforcements, role users, managed nodes, privileges |
| **Nodes** | List, view, add, update, delete |
| **Enterprise reports** | Audit report, action report, password report |
| **Utilities** | Config loaders, console auth UI (Node), password generator, logging, typed error codes |

Browser builds use `KeeperSdk/dist/browser.js` (via `src/browser.ts`) and do not include Node-only helpers such as `readline`-based console auth or `~/.keeper` file config. Pass an in-memory `ConfigLoader` / `SessionManager` when embedding in the browser.

### SDK Installation

#### From npm (Recommended)

Install the latest stable release from the npm registry:

```bash
npm install @keeper-security/keeper-sdk-javascript
```

This pulls in `@keeper-security/keeperapi` as a dependency. Most applications should import only from `@keeper-security/keeper-sdk-javascript`.

#### From Source

To install from source for development or testing:

```bash
# Clone the repository
git clone https://github.com/Keeper-Security/keeper-sdk-javascript
cd keeper-sdk-javascript

# Build keeperapi first (SDK depends on it)
cd keeperapi
npm install
npm run build

# Build the high-level SDK
cd ../KeeperSdk
npm install
# Optional when developing against a local KeeperSdk build:
npm run link-local
npm run build
```

- **Node** entry: `KeeperSdk/dist/index.js`
- **Browser** entry: `KeeperSdk/dist/browser.js`

### SDK Environment Setup

For local development against this repository:

**Step 1: Clone and install keeperapi**

```bash
git clone https://github.com/Keeper-Security/keeper-sdk-javascript
cd keeper-sdk-javascript/keeperapi
npm install
npm run build
```

**Step 2: Install and link KeeperSdk**

```bash
cd ../KeeperSdk
npm install
npm run link-local
npm run build
```

**Step 3 (optional): Run examples against the local build**

```bash
cd ../examples/sdk_example
npm install
```

Your environment is then ready for SDK development and example scripts.

### SDK Configuration

The SDK stores device and session settings so credentials are not hardcoded in client code. On Node.js, the default location is:

```text
~/.keeper/config.json
```

You can use:

- **`FileConfigLoader`**: Reads/writes `config.json` under `~/.keeper` (or a custom directory)
- **`SessionManager`**: Manages device tokens, clone codes, and session parameters (uses `FileConfigLoader` by default on Node)
- **Custom `ConfigLoader`**: Implement `load()` / `save()` for in-memory or alternate storage (required for browser)

#### Requirement for client applications

If you are accessing the SDK from a new device, ensure a config file is available (or complete an interactive login once so the SDK can create one). Create a `.keeper` folder under the current user home directory if needed.

Alternatively, run the sample login script and provide username and password at runtime. A successful login can enable persistent login for subsequent runs within the timeout window.

A sample structure of `~/.keeper/config.json`:

```json
{
  "last_login": "username@yourcompany.com",
  "last_server": "keepersecurity.com",
  "users": [
    {
      "user": "username@yourcompany.com",
      "server": "keepersecurity.com",
      "last_device": {
        "device_token": ""
      }
    }
  ],
  "devices": [
    {
      "device_token": "",
      "private_key": "",
      "server_info": [
        {
          "server": "keepersecurity.com",
          "clone_code": ""
        }
      ]
    }
  ]
}
```

**Available Keeper regions** (`KEEPER_PUBLIC_HOSTS`):

| Region | Host |
|--------|------|
| US | `keepersecurity.com` |
| EU | `keepersecurity.eu` |
| AU | `keepersecurity.com.au` |
| CA | `keepersecurity.ca` |
| JP | `keepersecurity.jp` |
| GOV | `govcloud.keepersecurity.us` |

### Persistent Login

Persistent login lets you authenticate once and resume later without entering the master password on every run. This is useful for scripts and long-running jobs.

**Key features:**

- One-time interactive login (or device registration) stores device credentials and clone code
- Later calls to `vault.resumeSession()` or the example `login()` helper can skip the password prompt
- Device registration is per host/device
- Enterprise policies may restrict persistent login

**When to use:**

- Automated scripts and background services
- Development and testing workflows
- Applications where interactive password entry is not always possible

**Important notes:**

- Persistent login must be established after a successful normal login on the device
- Clone codes can expire; fall back to master password login when resume fails
- Always follow your organization's security policies

**Example: interactive login with persistent resume**

```typescript
import {
    KeeperVault,
    loadKeeperConfig,
    resolveServer,
    login,
    cleanup,
    logger,
} from '@keeper-security/keeper-sdk-javascript'

// Preferred for scripts: tries persistent login, then prompts for password
const vault = await login()
try {
    await vault.sync()
    logger.info(`Records: ${vault.getSummary().recordCount}`)
} finally {
    cleanup(vault)
}
```

**Example: resume session explicitly**

```typescript
import { KeeperVault, SdkDefaults } from '@keeper-security/keeper-sdk-javascript'

const vault = new KeeperVault({
    host: 'keepersecurity.com',
    clientVersion: SdkDefaults.CLIENT_VERSION,
})

await vault.resumeSession()
await vault.sync()
```

**Example: session token login** (device must already be registered for the host):

```typescript
await vault.loginWithSessionToken(username, sessionToken)
await vault.sync()
```

### SDK Usage Example

Below is a complete example demonstrating authentication, vault synchronization, and record listing:

```typescript
import {
    KeeperVault,
    KeeperSdkError,
    loadKeeperConfig,
    resolveServer,
    prompt,
    suppressLogs,
    cleanup,
    logger,
    extractResultCode,
    SdkDefaults,
    ResultCodes,
    formatRecord,
} from '@keeper-security/keeper-sdk-javascript'

const MAX_ATTEMPTS = 5

async function main() {
    const config = await loadKeeperConfig()
    const defaultUsername = config.last_login || config.user || ''

    let username: string
    if (defaultUsername) {
        logger.info(`Enter master password for ${defaultUsername}`)
        username = defaultUsername
    } else {
        username = await prompt('Username (email): ')
        if (!username) {
            throw new KeeperSdkError('Username is required.', ResultCodes.MISSING_USERNAME)
        }
    }

    const host = await resolveServer(username)
    const vault = new KeeperVault({ host, clientVersion: SdkDefaults.CLIENT_VERSION })

    try {
        for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
            const password = await prompt('Password: ', true)
            if (!password) {
                throw new KeeperSdkError('Password is required.', ResultCodes.MISSING_PASSWORD)
            }

            const restore = suppressLogs()
            try {
                await vault.login(username, password)
                restore()
                break
            } catch (err) {
                restore()
                const resultCode = extractResultCode(err)
                if (resultCode === ResultCodes.INVALID_CREDENTIALS) {
                    const remaining = MAX_ATTEMPTS - attempt
                    if (remaining > 0) {
                        logger.warn(`Incorrect Password (${remaining} attempt(s) remaining)`)
                        continue
                    }
                    throw new KeeperSdkError(
                        `Maximum login attempts (${MAX_ATTEMPTS}) exceeded.`,
                        ResultCodes.MAX_ATTEMPTS_EXCEEDED
                    )
                }
                throw KeeperSdkError.from(err)
            }
        }

        logger.info('Syncing vault...')
        await vault.sync()

        const summary = vault.getSummary()
        logger.info(`Username: ${vault.getAuth().username}`)
        logger.info(`Server:   ${vault.host}`)
        logger.info(`Records:  ${summary.recordCount}`)

        for (const record of vault.getRecords()) {
            logger.info(formatRecord(record))
        }
    } finally {
        cleanup(vault)
    }
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
```

**Quickstart (minimal):**

```typescript
import { KeeperVault, SdkDefaults } from '@keeper-security/keeper-sdk-javascript'

const vault = new KeeperVault({
    host: 'keepersecurity.com',
    clientVersion: SdkDefaults.CLIENT_VERSION,
})

await vault.login('user@company.com', 'master-password')
await vault.sync()

console.log(`Loaded ${vault.getRecords().length} records`)
```

**Important security notes:**

- Never hardcode credentials in production code
- Prefer `~/.keeper/config.json` or a secure secrets store for device/session material
- Use device approval and 2FA flows when prompted by `ConsoleAuthUI`
- Follow enterprise policies for persistent login and session lifetime

---

## Examples

Runnable scripts for authentication, records, folders, sharing, teams, users, roles, nested shared folders, and reports are in [`examples/sdk_example`](../examples/sdk_example).

```bash
cd ../examples/sdk_example
npm install

npm run auth:login
npm run records:list
npm run folders:ls
npm run shared-folders:list-sf
npm run nsf:list
npm run teams:list
npm run users:list
npm run roles:list
npm run reports:audit-report
```

Most examples call the shared `login()` helper, which attempts persistent login via `~/.keeper/config.json` and falls back to an interactive password prompt.

See [`examples/sdk_example/README.md`](../examples/sdk_example/README.md) for the full command list.

---

## Development Setup

Build **keeperapi** before **KeeperSdk** (the SDK depends on keeperapi). From the repository root:

```bash
cd keeperapi && npm install && npm run build
cd ../KeeperSdk && npm install && npm run link-local && npm run build
```

Useful scripts in this package (`KeeperSdk/`):

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run link-local` | `npm link` the local `keeperapi` package |
| `npm run format` | Format sources with Prettier |
| `npm test` | Run tests (when configured) |

Package-level docs:

- [`README.md`](.) — this file (high-level SDK quickstart)
- [`keeperapi/README.md`](../keeperapi/README.md) — core client and protobuf regeneration notes
- [Root README](../README.md) — repository overview

Browser embedders that consume this repo via npm or a local path should fix vault/CLI surface issues in **KeeperSdk first**, then rebuild consumers against the updated SDK.

---

## Repository Layout

```text
keeper-sdk-javascript/
├── KeeperSdk/                 # @keeper-security/keeper-sdk-javascript
├── keeperapi/                 # @keeper-security/keeperapi
└── examples/
    ├── sdk_example/           # Runnable Node scripts (auth, records, folders, …)
    ├── print-vault-node/      # Additional Node sample
    └── print-vault-browser/   # Browser sample
```

---

## Contributing

We welcome contributions from the community. Please submit pull requests, report issues, or suggest enhancements through the [GitHub repository](https://github.com/Keeper-Security/keeper-sdk-javascript).

To ignore formatting-only commits in `git blame`:

```bash
git config blame.ignoreRevsFile .git-blame-ignore-revs
```

---

## License

This project is licensed under the ISC License (see package metadata on npm and the repository license file when present).

---

## Support

For support, documentation, and additional resources:

- **Documentation**: [Keeper Security Developer Portal](https://docs.keeper.io/)
- **Support**: [Keeper Security Support](https://www.keepersecurity.com/support.html)
- **Community**: [Keeper Security GitHub](https://github.com/Keeper-Security)
- **npm**: [@keeper-security/keeper-sdk-javascript](https://www.npmjs.com/package/@keeper-security/keeper-sdk-javascript)

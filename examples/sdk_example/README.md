# Keeper SDK Examples

Interactive examples demonstrating the Keeper JavaScript SDK.

## Prerequisites

- Node.js 16+
- A Keeper account with credentials

## Setup

```bash
# From the repository root
cd examples/sdk_example

# Install dependencies
npm install

# Link the local SDK (if developing against the local KeeperSdk)
npm run link-local
```

## Configuration

Examples use `~/.keeper/config.json` for saved credentials and persistent login. If the file is not found, you will be prompted for server, username, and password.

## Available Examples

### Authentication

| Command | Description |
|---|---|
| `npm run auth:login` | Master password login with retry logic, masked input, and vault sync. Automatically attempts persistent login (via clone code from `~/.keeper/config.json`) before falling back to the password prompt. |
| `npm run auth:session-token` | Login using an existing session token for pre-authenticated workflows. Prompts for username, host, and session token. |

### Records

| Command | Description |
|---|---|
| `npm run records:list` | List all records in the vault |
| `npm run records:get` | Get details of a specific record by UID or title |
| `npm run records:add` | Add a new typed record to the vault |
| `npm run records:update` | Update fields on an existing record |
| `npm run records:delete` | Delete a record (with confirmation prompt) |
| `npm run records:history` | View revision history for a record |
| `npm run records:find-password` | Find a record's password and copy it to clipboard |
| `npm run records:move` | Move a record to a different folder |

### Sharing

| Command | Description |
|---|---|
| `npm run sharing:share-record` | Share a record with another Keeper user |

## Usage

Run any example with `npm run <script>`:

```bash
npm run auth:login
npm run records:list
npm run records:get
```

Most examples will log in automatically using persistent login (if configured) or prompt for credentials. After authentication, follow the interactive prompts.

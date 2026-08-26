# Keeper Vault REPL

An interactive shell for the Keeper Vault: log in once, then run `ls`, `cd`, `get`, `find`, and
other commands against your vault until you exit.

## Prerequisites

- Node.js 20 LTS or newer
- A Keeper account with credentials

## Setup

This example depends on the sibling `KeeperSdk` and `keeperapi` packages by local path
(`file:../../KeeperSdk`, `file:../../keeperapi`), so those need to be built once before the REPL
can resolve `@keeper-security/keeperapi` at runtime:

```bash
# From the repository root
cd keeperapi && npm install && npm run build
cd ../KeeperSdk && npm install && npm run link-local && npm run build

# Now the REPL itself
cd ../examples/repl
npm install
```

## Run

```bash
npm start
```

There's no config file to set up first — on first run you'll be prompted interactively for
server, username, and password. Credentials/session are then saved to `~/.keeper/config.json` for
persistent login on subsequent runs (same file used by the other examples in this repo).

## Commands

Type `help` inside the REPL for the live list. Summary:

| Command | Description |
|---|---|
| `help` | List available commands |
| `whoami` | Show current session info |
| `pwd` | Print current working folder |
| `ls [path]` | List contents of the current (or given) folder |
| `cd [path]` | Change the current working folder (`cd /` for vault root) |
| `tree [path]` | Show the folder tree from the current (or given) folder |
| `list` | List every record in the vault |
| `find <text>` | Search records by title, login, or URL |
| `get <uid\|title>` | Show details for a single record |
| `sync` | Re-sync the vault with the server |
| `get_controllers` | Call the PAM router API (`pam/get_controllers`) and list enterprise gateways |
| `get_online_controllers` | Call the PAM router API (`loadOnlineControllers`) and list connected gateways |
| `run <script.ts> [args...]` | Execute a TypeScript file exporting `default async function(vault, args)` — see [`scripts/README.md`](scripts/README.md) |
| `history` | Show command history |
| `clear` | Clear the screen |
| `exit` / `quit` | Log out and quit the REPL |

Command history persists across sessions in `~/.keeper/repl_history` (excluding `history`, `exit`,
`quit`, `clear`); use `!<n>` to re-run entry `n` from `history`, bash-style.

## Extending

Drop a `.ts` file under [`scripts/`](scripts/README.md) and run it with `run scripts/<file>.ts` for
one-off tasks against the live, authenticated `vault` — no rebuild needed. Promote anything that
turns out to be a permanent command into `src/commands.ts`.

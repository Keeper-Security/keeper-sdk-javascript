# Scripts

These are sample scripts showing how to extend the REPL without touching its main code
(`src/index.ts`, `src/commands.ts`). Each one is a small, self-contained example of a task built on
top of the KeeperSdk — a starting point to copy and adapt for your own workflows.

Run any of them from inside the REPL with the built-in `run` command:

```
run scripts/<file>.ts [args...]
```

`run` loads the file with `require()` (so it's re-compiled by `ts-node` on the fly — no build step)
and calls its default export with the live, already-authenticated `vault` plus whatever arguments
followed the file path on the command line.

## Contract

A script is any `.ts` file with a default export matching:

```ts
export default async function myScript(vault: KeeperVault, args: string[]): Promise<void> {
    // ...
}
```

- `vault` is the same `KeeperVault` instance the REPL logged in with — already authenticated and
  synced, so there's no separate login/sync step to write.
- `args` is everything typed after the script path, split on whitespace (e.g.
  `run scripts/lock_unlock_user.ts unlock alice@example.com` → `args = ['unlock', 'alice@example.com']`).
- Errors thrown from the script are caught by the `run` command and printed with `logger.warn` —
  the REPL session keeps going either way, so it's safe to experiment.

## Samples in this folder

- **`get_online_controllers.ts`** — calls the PAM router directly (`pamGetOnlineControllersMessage`)
  to list connected gateways, independent of the built-in `get_online_controllers` command.
- **`send_controller_message.ts`** — sends a `RouterControllerMessage` to a specific gateway and
  pretty-prints its (doubly-JSON-encoded) reply. Shows how to call a lower-level `keeperapi`
  `restMessages.ts` helper directly from a script.
- **`lock_unlock_user.ts`** — locks or unlocks one or more enterprise users via
  `vault.actionUsers(...)`, reusing the same formatting helpers as the `sdk_example` CLI.

None of these are REPL commands — they're the "customize without recompiling the tool" escape
hatch. If something you build here turns out to be useful as a permanent command, promote it into
`src/commands.ts` instead.

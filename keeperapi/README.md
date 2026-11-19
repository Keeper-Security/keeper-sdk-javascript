# @keeper-security/keeperapi

Keeper API client for Node.js and the browser.

## Install

```bash
npm install @keeper-security/keeperapi
```

## Master-password login policy

Before deriving or submitting an authentication hash, the SDK requires the selected
server-supplied PBKDF2 salt to be exactly 16 bytes and the iteration count to be a
safe integer of at least 100,000. This applies to normal and alternate passwords;
legacy accounts below this minimum are rejected.

Invalid parameters raise the exported `InvalidKdfParametersError`, with code
`invalid_kdf_parameters`. During `loginV3`, an `onCommandFailure` handler receives
that code as `result_code`, and login stops with `NOT_LOGGED_IN` instead of retrying.
Without that handler, the error is thrown. Callers can distinguish this failure
for future account-policy reporting; the SDK currently sends no additional server
message and never submits a password hash for rejected parameters.

Applications implementing authenticated master-password reentry must call the
exported `validateKdfParameters(parameters)` before deriving a verifier from the
response to `requestSaltAndIterations()`. It accepts an object with `salt` and
`iterations`, enforces the same policy as SDK login, and throws
`InvalidKdfParametersError` on failure. The REST message helpers and low-level
cryptographic functions do not enforce this authentication policy automatically.
Applications must stop verification on this error and must not retry with weaker
parameters. Consumers must update their installed SDK to a version containing
these exports; modifying a separate SDK checkout does not update an installed package.

## Local development

From the `keeperapi/` directory:

```bash
npm install
npm run build
npm test
```

## Protobuf Regeneration

Manual protobuf regeneration is not recommended. Instead, use the **Update Protobuf** GitHub Actions workflow, which clones the latest `keeperapp-protobuf` master branch and regenerates `proto.js` and `proto.d.ts` automatically.

Trigger it manually via Actions → Update Protobuf → Run workflow.

If there are changes, the workflow opens a PR from `bot/update-proto`. If a PR is already open, it updates the branch in place instead of creating a duplicate.

### Modifying the generation script

If you need to change the protobuf generation script itself (e.g. `scripts/generate-proto.mjs`), push your changes to a feature branch first, then trigger the **Update Protobuf** workflow from that branch. This ensures the workflow runs with your updated script and the generated output reflects your changes correctly. See [#199](https://github.com/Keeper-Security/keeper-sdk-javascript/pull/199) as an example.

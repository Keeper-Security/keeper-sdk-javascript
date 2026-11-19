# @keeper-security/keeperapi

Keeper API client for Node.js and the browser.

## Install

```bash
npm install @keeper-security/keeperapi
```

## Master-password login policy

Before deriving or submitting a normal or alternate password authentication hash,
the SDK requires a 16-byte PBKDF2 salt and a safe integer iteration count:

| Iterations        | Login behavior                                                                                                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Below 10,000      | Always rejected with `kdf_iterations_below_minimum`, reported as a security concern.                                                                                                           |
| 10,000 to 999,999 | The SDK awaits `authUI3.approveLowKdfIterations(iterations)`. The application supplies the UI. Only `true` continues login; otherwise the SDK rejects with `kdf_iterations_approval_required`. |
| 1,000,000 or more | No approval required.                                                                                                                                                                          |

Malformed parameters are rejected with `invalid_kdf_parameters`. During `loginV3`,
`onCommandFailure` receives the rejection code as `result_code`, and login stops
with `NOT_LOGGED_IN`. Without a handler, the SDK throws the typed error.
Rejected parameters do not trigger verifier submission or a server report.

After an approved, unrestricted primary-password sign-in, the SDK uses the
same password and the unlocked data key to request a server-side increase to
1,000,000 iterations. It does not attempt this update for alternate or SSO
passwords or restricted sessions. If the upgrade cannot be confirmed, the SDK
logs a warning without treating the successful sign-in as a password failure.

Applications implementing authenticated master-password reentry must call the
exported `validateKdfParameters(parameters)` before deriving a verifier from the
response to `requestSaltAndIterations()`. It accepts an object with `salt` and
`iterations`, requires a 16-byte salt and at least 100,000 safe-integer iterations, and throws
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

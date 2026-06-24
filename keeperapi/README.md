# @keeper-security/keeperapi

Keeper API client for Node.js and the browser.

## Install

```bash
npm install @keeper-security/keeperapi
```

## Local development

From the `keeperapi/` directory:

```bash
npm install
npm run build
npm test
```

## Protobuf Regeneration

Manual protobuf regeneration is not recommended. Instead, use the **Update Protobuf** GitHub Actions workflow, which clones the latest `keeperapp-protobuf` master branch and regenerates `proto.js` and `proto.d.ts` automatically.

The workflow can be triggered in two ways:

- **Manually** — go to Actions → Update Protobuf → Run workflow
- **Automatically** — triggered on every push to `main`

If there are changes, the workflow opens a PR from `bot/update-proto`. If a PR is already open, it updates the branch in place instead of creating a duplicate.

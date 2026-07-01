import * as pbjs from 'protobufjs-cli/pbjs.js'
import * as pbts from 'protobufjs-cli/pbts.js'
import { writeFileSync, mkdirSync, rmSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PROTO_DIR = join(ROOT, '../../keeperapp-protobuf')

const PROTO_FILES = [
    'APIRequest.proto',
    'AccountSummary.proto',
    'automator.proto',
    'breachwatch.proto',
    'client.proto',
    'externalservice.proto',
    'folder.proto',
    'push.proto',
    'record.proto',
    'servicelogger.proto',
    'ssocloud.proto',
    'token.proto',
    'upsell.proto',
    'SyncDown.proto',
    'BI.proto',
    'router.proto',
    'record_endpoints.proto',
    'remove.proto',
    'workflow.proto',
]

// Explicit filename overrides. 'folder' (lowercase) collides with 'Folder' on case-insensitive
// filesystems — renamed to Remove.js since its content is entirely folder.v3.remove.
const FILENAME_OVERRIDES = {
    folder: 'Remove',
}

const run = (tool, args) =>
    new Promise((resolve, reject) => tool.main(args, (err, output) => (err ? reject(err) : resolve(output))))

async function main() {
    if (!existsSync(PROTO_DIR)) {
        console.error(`keeperapp-protobuf not found at ${PROTO_DIR}`)
        console.error('Clone it alongside keeper-sdk-javascript before running this script.')
        process.exit(1)
    }

    // --- pbjs -----------------------------------------------------------------

    console.log('Running pbjs...')
    const combined = await run(pbjs, [
        '--target',
        'static-module',
        '--force-number',
        '--no-verify',
        '--no-delimited',
        '--wrap',
        'es6',
        '--path',
        PROTO_DIR,
        ...PROTO_FILES,
    ])

    // --- pbts -----------------------------------------------------------------

    console.log('Running pbts...')
    const tmpFile = join(ROOT, 'src/_proto_tmp.js')
    writeFileSync(tmpFile, combined)
    const declarations = await run(pbts, [tmpFile])
    rmSync(tmpFile)
    writeFileSync(join(ROOT, 'src/proto.d.ts'), declarations)
    console.log('Generated src/proto.d.ts')

    // --- Split combined output into per-namespace files -----------------------

    const lines = combined.split('\n')
    const ESLINT_HEADER = lines[0]
    const NAMESPACE_RE = /^export const (\w+) = \$root\.\w+ = \(\(\) => \{/

    const splits = []
    for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(NAMESPACE_RE)
        if (m) splits.push({ name: m[1], startLine: i })
    }

    if (splits.length === 0) throw new Error('No namespaces found — pbjs output format may have changed')

    const protoDir = join(ROOT, 'src/proto')
    mkdirSync(protoDir, { recursive: true })
    for (const f of readdirSync(protoDir)) {
        if (f !== 'root.js' && f !== 'index.js') rmSync(join(protoDir, f))
    }

    // One file per namespace
    for (let i = 0; i < splits.length; i++) {
        const { name, startLine } = splits[i]
        const endLine = i + 1 < splits.length ? splits[i + 1].startLine : lines.length
        const body = lines.slice(startLine, endLine).filter(l => l !== 'export { $root as default };').join('\n')
        const filename = FILENAME_OVERRIDES[name] ?? name

        writeFileSync(
            join(protoDir, `${filename}.js`),
            [ESLINT_HEADER, `import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';`, '', body].join(
                '\n'
            )
        )
    }

    // index.js — re-exports all namespaces in pbjs output order (= dependency order)
    writeFileSync(
        join(protoDir, 'index.js'),
        splits.map(({ name }) => `export { ${name} } from './${FILENAME_OVERRIDES[name] ?? name}.js';`).join('\n') +
            '\n'
    )

    console.log(`Split into ${splits.length} namespace files: ${splits.map((s) => s.name).join(', ')}`)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})

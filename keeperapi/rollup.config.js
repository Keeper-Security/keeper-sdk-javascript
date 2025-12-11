import typescript from "rollup-plugin-typescript2"
import pkg from './package.json'
import sourcemaps from "rollup-plugin-sourcemaps";
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default [
    {
        input: 'src/browser/index.ts',
        output: [
            {
                file: pkg.browser,
                format: 'es',
                sourcemap: true
            },
            // {
            //     file: pkg.browsertest,
            //     format: 'cjs',
            // },
        ],
        external: [
            ...Object.keys(pkg.dependencies || {}),
            "protobufjs/minimal",
            "@noble/post-quantum/ml-kem.js"
        ],
        plugins: [
            typescript({
                tsconfig: "tsconfig.rollup.json"
            }),
            sourcemaps()
        ]
    },
    {
        input: 'src/browser/browserWorker.ts',
        output: [{
            file: 'dist/worker/browserWorker.js',
            format: 'iife',
            sourcemap: true
        }],
        plugins: [
            typescript({
                tsconfig: "tsconfig.rollup.json"
            }),
            resolve(),
            commonjs(),
            sourcemaps()
        ]
    },
    {
        input: 'src/node/index.ts',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true
            }
        ],
        external: [
            ...Object.keys(pkg.dependencies || {}),
            "crypto", "constants", "https", "protobufjs/minimal",
            "@noble/post-quantum/ml-kem.js"
        ],
        plugins: [
            typescript({
                tsconfig: "tsconfig.rollup.json"
            }),
            sourcemaps()
        ]
    }
];

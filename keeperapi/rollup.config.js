import typescript from "rollup-plugin-typescript2"
import pkg from './package.json'
import sourcemaps from "rollup-plugin-sourcemaps";

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
            "protobufjs/minimal"
        ],
        plugins: [
            typescript({
                tsconfig: "tsconfig.rollup.json"
            }),
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
            "crypto", "constants", "https", "protobufjs/minimal"
        ],
        plugins: [
            typescript({
                tsconfig: "tsconfig.rollup.json"
            }),
            sourcemaps()
        ]
    }
];

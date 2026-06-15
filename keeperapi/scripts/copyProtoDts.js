const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, '../src/proto.d.ts')
const distDir = path.resolve(__dirname, '../dist')
const dst = path.resolve(distDir, 'proto.d.ts')

if (!fs.existsSync(src)) {
    throw new Error(`Source file not found: ${src}`)
}

fs.mkdirSync(distDir, { recursive: true })
fs.copyFileSync(src, dst)

console.log(`Copied ${src} -> ${dst}`)

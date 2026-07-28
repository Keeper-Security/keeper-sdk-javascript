const fs = require('fs')
const path = require('path')

const src = path.join(__dirname, '..', 'src', 'proto.d.ts')
const dest = path.join(__dirname, '..', 'dist', 'proto.d.ts')

fs.copyFileSync(src, dest)
